import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { Trash2 } from 'lucide-react';

const AdminOPDConsents = () => {
  const [consents, setConsents] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchConsents = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get('/opd-consent/all?limit=200');
      if (res?.data?.success) setConsents(res.data.data || []);
    } catch (err) {
      console.error('Fetch consents error', err);
      alert('Error fetching consents');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConsents();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Delete this record?')) return;
    try {
      const res = await axiosInstance.delete(`/opd-consent/${id}`);
      if (res?.data?.success) setConsents(prev => prev.filter(c => c._id !== id));
    } catch (err) {
      console.error('Delete error', err);
      alert('Delete failed');
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">OPD Consent Submissions (Admin)</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="space-y-4">
          {consents.length === 0 && <div>No records found.</div>}
          {consents.map(c => (
            <div key={c._id} className="border rounded p-4 bg-white shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-semibold">{c.patientName} {c.age ? `(${c.age})` : ''}</div>
                  <div className="text-sm text-gray-600">{c.mobile} • {c.relativeName || ''}</div>
                  <div className="text-xs text-gray-500 mt-2">Submitted: {new Date(c.createdAt).toLocaleString()}</div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleDelete(c._id)} className="text-red-500 p-2 rounded hover:bg-red-50">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="mt-3 text-sm">
                <div><strong>Address:</strong> {c.address}</div>
                <div><strong>Signature Method:</strong> {c.signatureMethod}</div>
                <div><strong>Typed Signature:</strong> {c.digitalSignatureText}</div>
                <div className="mt-2"><strong>Consent Clauses:</strong>
                  <ul className="list-disc ml-5 mt-1 text-sm text-gray-700">
                    {c.consentClauses && c.consentClauses.map(cl => (
                      <li key={cl.number}>{cl.number}. {cl.hindi} / {cl.english}</li>
                    ))}
                  </ul>
                </div>
                {c.signatureImage && (
                  <div className="mt-2">
                    <strong>Signature Image:</strong>
                    <div className="mt-1"><img src={c.signatureImage} alt="sig" className="max-h-28 border" /></div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOPDConsents;
