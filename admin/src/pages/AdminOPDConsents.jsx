import React, { useEffect, useMemo, useState, useRef } from 'react';
import axiosInstance from '../api/axiosInstance';
import { Trash2, Search, Eye, Download, Printer, FileText } from 'lucide-react';

const StatCard = ({ title, value, accent }) => (
  <div className="bg-white shadow rounded-lg p-4 flex-1">
    <div className="flex items-center justify-between">
      <div>
        <div className="text-sm text-gray-500">{title}</div>
        <div className={`text-2xl font-bold ${accent || 'text-gray-900'}`}>{value}</div>
      </div>
    </div>
  </div>
);

const AdminOPDConsents = () => {
  const [consents, setConsents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [selected, setSelected] = useState(null);
  const [query, setQuery] = useState('');
  const modalContentRef = useRef(null);

  const fetchConsents = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get('/opd-consent/all?limit=1000');
      if (res?.data?.success) setConsents(res.data.data || []);
    } catch (err) {
      console.error('Fetch consents error', err);
      alert('Error fetching consents');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchConsents(); }, []);

  const stats = useMemo(() => {
    const total = consents.length;
    const withImage = consents.filter(c => c.signatureImage).length;
    const draw = consents.filter(c => c.signatureMethod === 'draw').length;
    const upload = consents.filter(c => c.signatureMethod === 'upload').length;
    const recent7 = consents.filter(c => new Date(c.createdAt) >= new Date(Date.now() - 7*24*60*60*1000)).length;
    return { total, withImage, draw, upload, recent7 };
  }, [consents]);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this record?')) return;
    try {
      const res = await axiosInstance.delete(`/opd-consent/${id}`);
      if (res?.data?.success) setConsents(prev => prev.filter(c => c._id !== id));
    } catch (err) {
      console.error('Delete error', err);
      alert('Delete failed');
    }
  };

  const filtered = useMemo(() => {
    if (!query.trim()) return consents;
    const q = query.toLowerCase();
    return consents.filter(c => (
      (c.patientName || '').toLowerCase().includes(q) ||
      (c.mobile || '').toLowerCase().includes(q) ||
      (c.digitalSignatureText || '').toLowerCase().includes(q)
    ));
  }, [consents, query]);

  const exportCSV = () => {
    const rows = filtered.map(r => ({
      id: r._id,
      name: r.patientName,
      mobile: r.mobile,
      age: r.age,
      signatureMethod: r.signatureMethod,
      typedSignature: r.digitalSignatureText,
      submittedAt: r.createdAt
    }));
    if (rows.length === 0) return alert('No rows to export');
    const csv = [Object.keys(rows[0] || {}).join(','), ...rows.map(r => Object.values(r).map(v => `"${(v||'').toString().replace(/"/g,'""')}"`).join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'opd_consents.csv'; a.click(); URL.revokeObjectURL(url);
  };

  // Function to print the modal content
  const printConsent = () => {
    if (!modalContentRef.current) return;
    
    const printWindow = window.open('', '_blank');
    const content = modalContentRef.current.cloneNode(true);
    
    // Add styles for print
    const styles = document.querySelectorAll('style, link[rel="stylesheet"]');
    let styleHTML = '';
    styles.forEach(style => {
      if (style.tagName === 'STYLE') {
        styleHTML += style.innerHTML;
      } else if (style.tagName === 'LINK') {
        styleHTML += `<link href="${style.href}" rel="stylesheet">`;
      }
    });
    
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Consent Form - ${selected?.patientName || 'Patient'}</title>
          <meta charset="UTF-8">
          ${styleHTML}
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
              margin: 0;
              background: white;
            }
            .no-print {
              display: none !important;
            }
            .print-container {
              max-width: 800px;
              margin: 0 auto;
            }
            button, .close-btn {
              display: none;
            }
            img {
              max-width: 100%;
              height: auto;
            }
            @media print {
              body {
                padding: 0;
              }
              .print-header {
                margin-bottom: 20px;
              }
            }
          </style>
        </head>
        <body>
          <div class="print-container">
            ${content.innerHTML}
            <div style="margin-top: 30px; text-align: center; font-size: 12px; color: #999;">
              Generated on: ${new Date().toLocaleString()}
            </div>
          </div>
        </body>
      </html>
    `);
    
    printWindow.document.close();
    printWindow.focus();
    
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  };

  // Function to download as PDF from backend
  const downloadPDF = async () => {
    if (!selected?._id) return;
    setDownloading(true);

    try {
      const response = await axiosInstance.get(`/opd-consent/download/${selected._id}`, {
        responseType: 'blob'
      });

      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      const patientName = (selected.patientName || 'patient').replace(/[^a-z0-9_-]+/gi, '_');

      link.href = url;
      link.download = `OPD_Consent_${patientName}_${selected._id}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('PDF download error:', error);
      alert('Error downloading PDF. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">OPD Consent Submissions</h1>
          <p className="text-sm text-gray-500">Manage patient consent records and view full details.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search name, mobile or typed signature" className="pl-10 pr-4 py-2 rounded-lg border w-80" />
            <div className="absolute left-3 top-2.5 text-gray-400"><Search size={16} /></div>
          </div>
          <button onClick={exportCSV} className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-blue-500 text-white px-4 py-2 rounded-lg"><Download size={16} /> Export CSV</button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Submissions" value={stats.total} accent="text-indigo-600" />
        <StatCard title="Signatures (image)" value={stats.withImage} accent="text-emerald-600" />
        <StatCard title="Draw / Upload" value={`${stats.draw} / ${stats.upload}`} accent="text-purple-600" />
        <StatCard title="Last 7 days" value={stats.recent7} accent="text-yellow-600" />
      </div>

      <div className="bg-white shadow rounded">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mobile</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Age</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Signature</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Submitted</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-sm text-gray-500">No records.</td>
              </tr>
            )}
            {filtered.map((c) => (
              <tr key={c._id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-800">{c.patientName}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{c.mobile}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{c.age || '-'}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{c.signatureMethod}{c.signatureImage ? ' • Image' : ''}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{new Date(c.createdAt).toLocaleString()}</td>
                <td className="px-4 py-3 text-sm">
                  <div className="flex items-center gap-3">
                    <button onClick={() => setSelected(c)} className="text-indigo-600 hover:underline flex items-center gap-2"><Eye size={14} /> View</button>
                    <button onClick={() => handleDelete(c._id)} className="text-red-600 hover:underline flex items-center gap-2"><Trash2 size={14} /> Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-40" onClick={() => setSelected(null)}></div>
          <div className="relative bg-white rounded-lg shadow-lg w-[95%] md:w-3/5 max-h-[90vh] overflow-auto p-6 z-10">
            <div ref={modalContentRef}>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{selected.patientName}</h3>
                  <p className="text-sm text-gray-500">{selected.mobile} • {selected.age ? `${selected.age} yrs` : ''}</p>
                </div>
                <div className="flex gap-2 no-print">
                  <button 
                    onClick={printConsent}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1.5 rounded-lg flex items-center gap-2 text-sm"
                  >
                    <Printer size={16} /> Print
                  </button>
                  <button 
                    onClick={downloadPDF}
                    disabled={downloading}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg flex items-center gap-2 text-sm"
                  >
                    <FileText size={16} /> {downloading ? 'Downloading...' : 'Download PDF'}
                  </button>
                  <button 
                    onClick={() => setSelected(null)} 
                    className="text-gray-500 hover:text-gray-700"
                  >
                    Close
                  </button>
                </div>
              </div>

              <div className="mt-4 text-sm text-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div><strong>Address:</strong> <div className="text-gray-800">{selected.address || '-'}</div></div>
                  <div><strong>Relative:</strong> <div className="text-gray-800">{selected.relativeName || '-'} • {selected.relativeMobile || '-'}</div></div>
                </div>
                <div className="mt-3"><strong>Typed Signature:</strong> <div className="text-gray-800">{selected.digitalSignatureText}</div></div>
                <div className="mt-3"><strong>Signature Method:</strong> <div className="text-gray-800">{selected.signatureMethod}</div></div>
                {selected.signatureImage && (
                  <div className="mt-3">
                    <strong>Signature Image:</strong>
                    <div className="mt-2"><img src={selected.signatureImage} alt="signature" className="max-h-44 border" /></div>
                  </div>
                )}

                <div className="mt-4"><strong>Consent Clauses:</strong>
                  <ol className="list-decimal ml-5 mt-2 text-sm text-gray-700">
                    {selected.consentClauses && selected.consentClauses.map(cl => (
                      <li key={cl.number} className="mb-3">
                        <div className="font-medium">{cl.number}.</div>
                        <div className="text-gray-800 font-devanagari">{cl.hindi}</div>
                        <div className="text-gray-500 text-sm mt-1">{cl.english}</div>
                      </li>
                    ))}
                  </ol>
                </div>
                
                <div className="mt-4 pt-3 border-t text-xs text-gray-400">
                  <strong>Submission ID:</strong> {selected._id}<br />
                  <strong>Submitted on:</strong> {new Date(selected.createdAt).toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOPDConsents;
