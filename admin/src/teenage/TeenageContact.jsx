import React, { useState, useEffect } from 'react';
import { 
  Mail, Phone, MapPin, Eye, Trash2, CheckCircle, Clock, 
  MessageCircle, Users, Download, RefreshCw, Search, 
  ChevronLeft, ChevronRight, X, Filter
} from 'lucide-react';
import axiosInstance from '../api/axiosInstance';

const TeenageContact = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    read: 0,
    replied: 0
  });

  // Fetch all contacts
  const fetchContacts = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/teenage/contacts');
      if (response.data.success) {
        setContacts(response.data.data);
        calculateStats(response.data.data);
      }
    } catch (err) {
      console.error('Error fetching contacts:', err);
      setError('Failed to load contacts. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Calculate statistics
  const calculateStats = (data) => {
    const pending = data.filter(c => c.status === 'pending').length;
    const read = data.filter(c => c.status === 'read').length;
    const replied = data.filter(c => c.status === 'replied').length;
    setStats({
      total: data.length,
      pending,
      read,
      replied
    });
  };

  // Update contact status
  const updateStatus = async (id, newStatus) => {
    try {
      const response = await axiosInstance.put(`/teenage/contact/${id}/status`, { status: newStatus });
      if (response.data.success) {
        fetchContacts(); // Refresh list
        if (selectedContact && selectedContact._id === id) {
          setSelectedContact({ ...selectedContact, status: newStatus });
        }
      }
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Failed to update status');
    }
  };

  // Delete contact
  const deleteContact = async (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        const response = await axiosInstance.delete(`/teenage/contact/${id}`);
        if (response.data.success) {
          fetchContacts();
          if (selectedContact && selectedContact._id === id) {
            setShowModal(false);
            setSelectedContact(null);
          }
        }
      } catch (err) {
        console.error('Error deleting contact:', err);
        alert('Failed to delete contact');
      }
    }
  };

  // View contact details
  const viewContact = async (contact) => {
    setSelectedContact(contact);
    setShowModal(true);
    
    // Mark as read if pending
    if (contact.status === 'pending') {
      await updateStatus(contact._id, 'read');
    }
  };

  // Filter and search contacts
  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = 
      contact.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.phone.includes(searchTerm) ||
      contact.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || contact.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredContacts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredContacts.length / itemsPerPage);

  // Export to CSV
  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Address', 'Message', 'Status', 'Date'];
    const csvData = filteredContacts.map(contact => [
      contact.fullName,
      contact.email,
      contact.phone,
      contact.address,
      contact.message,
      contact.status,
      new Date(contact.createdAt).toLocaleString()
    ]);
    
    const csvContent = [headers, ...csvData].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `contacts_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // Get status badge color
  const getStatusBadge = (status) => {
    switch(status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'read':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'replied':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-md border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <p className="text-slate-600 text-sm">Manage Contact Form Submissions</p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={exportToCSV}
                className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all duration-200 text-sm"
              >
                <Download className="w-4 h-4" />
                <span>Export CSV</span>
              </button>
              <button
                onClick={fetchContacts}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 text-sm"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Refresh</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-md p-4 border border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm">Total Messages</p>
                <p className="text-2xl font-bold text-slate-800">{stats.total}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-4 border border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-4 border border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm">Read</p>
                <p className="text-2xl font-bold text-blue-600">{stats.read}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Eye className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-4 border border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm">Replied</p>
                <p className="text-2xl font-bold text-emerald-600">{stats.replied}</p>
              </div>
              <div className="p-3 bg-emerald-100 rounded-lg">
                <MessageCircle className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name, email, phone, or message..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="read">Read</option>
                <option value="replied">Replied</option>
              </select>
            </div>
          </div>
        </div>

        {/* Contacts Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : error ? (
            <div className="text-center py-12 text-red-600">{error}</div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Contact</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Message</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-200">
                    {currentItems.map((contact) => (
                      <tr key={contact._id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-medium text-slate-900">{contact.fullName}</div>
                          <div className="text-sm text-slate-500">{contact.address.split(',')[0]}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-slate-900">{contact.email}</div>
                          <div className="text-sm text-slate-500">{contact.phone}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-slate-600 max-w-xs truncate">
                            {contact.message}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <select
                            value={contact.status}
                            onChange={(e) => updateStatus(contact._id, e.target.value)}
                            className={`px-2 py-1 text-xs rounded-full border ${getStatusBadge(contact.status)} focus:outline-none`}
                          >
                            <option value="pending">Pending</option>
                            <option value="read">Read</option>
                            <option value="replied">Replied</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-500">
                          {new Date(contact.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => viewContact(contact)}
                              className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                              title="View Details"
                            >
                              <Eye className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => deleteContact(contact._id)}
                              className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="px-6 py-4 border-t border-slate-200 flex justify-between items-center">
                  <div className="text-sm text-slate-500">
                    Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredContacts.length)} of {filteredContacts.length} entries
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Modal for viewing contact details */}
      {showModal && selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-800">Contact Details</h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 hover:bg-slate-100 rounded transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase">Full Name</label>
                  <p className="text-slate-900 font-medium">{selectedContact.fullName}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase">Status</label>
                  <div>
                    <select
                      value={selectedContact.status}
                      onChange={(e) => updateStatus(selectedContact._id, e.target.value)}
                      className={`mt-1 px-2 py-1 text-xs rounded-full border ${getStatusBadge(selectedContact.status)} focus:outline-none`}
                    >
                      <option value="pending">Pending</option>
                      <option value="read">Read</option>
                      <option value="replied">Replied</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase">Email</label>
                <p className="text-slate-900">{selectedContact.email}</p>
              </div>
              
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase">Phone</label>
                <p className="text-slate-900">{selectedContact.phone}</p>
              </div>
              
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase">Address</label>
                <p className="text-slate-900">{selectedContact.address}</p>
              </div>
              
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase">Message</label>
                <div className="mt-1 p-3 bg-slate-50 rounded-lg">
                  <p className="text-slate-700 whitespace-pre-wrap">{selectedContact.message}</p>
                </div>
              </div>
              
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase">Submitted On</label>
                <p className="text-slate-900">{new Date(selectedContact.createdAt).toLocaleString()}</p>
              </div>
              
              <div className="pt-4 border-t border-slate-200 flex justify-end space-x-3">
                <button
                  onClick={() => {
                    window.location.href = `mailto:${selectedContact.email}`;
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Reply via Email
                </button>
                <button
                  onClick={() => deleteContact(selectedContact._id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeenageContact;