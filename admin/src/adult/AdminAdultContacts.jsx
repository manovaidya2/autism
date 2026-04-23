// src/components/admin/AdminAdultContacts.jsx
import React, { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
import {
  Search,
  Trash2,
  Eye,
  Mail,
  Phone,
  MapPin,
  User,
  MessageSquare,
  CheckCircle,
  Clock,
  XCircle,
  RefreshCw,
  Download,
  ChevronLeft,
  ChevronRight,
  Calendar,
  AlertTriangle,
  Loader,
} from "lucide-react";

const AdminAdultContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalContacts, setTotalContacts] = useState(0);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    contacted: 0,
    resolved: 0,
    spam: 0,
    unread: 0,
    today: 0,
  });
  const [selectedContact, setSelectedContact] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);
  const [showBulkDeleteModal, setShowBulkDeleteModal] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(null);

  const itemsPerPage = 10;

  const fetchContacts = async () => {
    setLoading(true);
    setError(null);
    try {
      let url = `/adult-contact/all?page=${currentPage}&limit=${itemsPerPage}`;
      if (searchTerm) url += `&search=${encodeURIComponent(searchTerm)}`;
      if (selectedStatus !== "all") url += `&status=${selectedStatus}`;

      const response = await axiosInstance.get(url);
      if (response.data.success) {
        setContacts(response.data.data || []);
        setTotalPages(response.data.pagination?.pages || 1);
        setTotalContacts(response.data.pagination?.total || 0);
      }
    } catch (err) {
      console.error("Error fetching contacts:", err);
      setError("Failed to fetch contacts");
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axiosInstance.get("/adult-contact/stats");
      if (response.data.success) {
        setStats(response.data.data);
      }
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  };

  const deleteContact = async (id) => {
    try {
      await axiosInstance.delete(`/adult-contact/${id}`);
      fetchContacts();
      fetchStats();
      setShowDeleteModal(false);
      setContactToDelete(null);
    } catch (err) {
      console.error("Error deleting contact:", err);
      alert("Failed to delete contact");
    }
  };

  const bulkDeleteContacts = async () => {
    if (selectedContacts.length === 0) return;

    try {
      await axiosInstance.delete("/adult-contact/bulk-delete", {
        data: { ids: selectedContacts },
      });
      setSelectedContacts([]);
      fetchContacts();
      fetchStats();
      setShowBulkDeleteModal(false);
    } catch (err) {
      console.error("Error bulk deleting contacts:", err);
      alert("Failed to delete contacts");
    }
  };

  const updateStatus = async (id, status) => {
    setUpdatingStatus(id);
    try {
      await axiosInstance.put(`/adult-contact/${id}/status`, { status });
      fetchContacts();
      fetchStats();
      if (selectedContact && selectedContact._id === id) {
        setSelectedContact({ ...selectedContact, status });
      }
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to update status");
    } finally {
      setUpdatingStatus(null);
    }
  };

  const viewContact = async (id) => {
    try {
      const response = await axiosInstance.get(`/adult-contact/${id}`);
      if (response.data.success) {
        setSelectedContact(response.data.data);
        setShowDetailModal(true);
      }
    } catch (err) {
      console.error("Error fetching contact details:", err);
      alert("Failed to fetch contact details");
    }
  };

  const exportToCSV = () => {
    const headers = [
      "Full Name",
      "Email",
      "Phone",
      "Address",
      "Message",
      "Status",
      "Submitted At",
    ];

    const csvData = contacts.map((contact) => [
      `"${contact.fullName || ""}"`,
      `"${contact.email || ""}"`,
      `"${contact.phone || ""}"`,
      `"${contact.address || ""}"`,
      `"${(contact.message || "").replace(/"/g, '""')}"`,
      contact.status || "",
      contact.submittedAt ? new Date(contact.submittedAt).toLocaleString() : "",
    ]);

    const csvContent = [headers, ...csvData]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob(["\uFEFF" + csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `adult-contacts-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const selectAll = () => {
    if (selectedContacts.length === contacts.length) {
      setSelectedContacts([]);
    } else {
      setSelectedContacts(contacts.map((c) => c._id));
    }
  };

  const toggleSelectContact = (id) => {
    if (selectedContacts.includes(id)) {
      setSelectedContacts(selectedContacts.filter((cid) => cid !== id));
    } else {
      setSelectedContacts([...selectedContacts, id]);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return (
          <span className="inline-flex items-center px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800 whitespace-nowrap">
            <Clock size={12} className="mr-1" /> Pending
          </span>
        );
      case "contacted":
        return (
          <span className="inline-flex items-center px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 whitespace-nowrap">
            <Phone size={12} className="mr-1" /> Contacted
          </span>
        );
      case "resolved":
        return (
          <span className="inline-flex items-center px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 whitespace-nowrap">
            <CheckCircle size={12} className="mr-1" /> Resolved
          </span>
        );
      case "spam":
        return (
          <span className="inline-flex items-center px-2 py-1 text-xs rounded-full bg-red-100 text-red-800 whitespace-nowrap">
            <XCircle size={12} className="mr-1" /> Spam
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
            {status}
          </span>
        );
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [currentPage, selectedStatus]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPage(1);
      fetchContacts();
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    fetchStats();
  }, []);

  const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="w-full min-w-0 bg-white rounded-xl p-4 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
        <div className={`shrink-0 p-3 ${color} rounded-xl`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>
    </div>
  );

  if (loading && contacts.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading contacts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gray-100">
      <div className="w-full max-w-[calc(100vw-2rem)] xl:max-w-[960px] mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="w-full border-b border-gray-200 bg-white px-4 sm:px-6 py-5">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Adult Contact Management
            </h1>
            <p className="text-gray-500 text-sm sm:text-base mt-1">
              Manage and track all adult contact form submissions
            </p>
          </div>

          <div className="p-4 sm:p-6">
            {/* Error */}
            {error && (
              <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-7 gap-4 mb-6">
              <StatCard title="Total" value={stats.total} icon={Mail} color="bg-gray-600" />
              <StatCard title="Pending" value={stats.pending} icon={Clock} color="bg-yellow-500" />
              <StatCard title="Contacted" value={stats.contacted} icon={Phone} color="bg-blue-500" />
              <StatCard title="Resolved" value={stats.resolved} icon={CheckCircle} color="bg-green-500" />
              <StatCard title="Spam" value={stats.spam} icon={XCircle} color="bg-red-500" />
              <StatCard title="Unread" value={stats.unread} icon={Eye} color="bg-purple-500" />
              <StatCard title="Today" value={stats.today} icon={Calendar} color="bg-indigo-500" />
            </div>

            {/* Filters */}
            <div className="bg-gray-50 rounded-2xl border border-gray-200 p-4 mb-6">
              <div className="flex flex-col xl:flex-row gap-3 xl:items-center">
                <div className="flex-1 min-w-0 flex flex-col lg:flex-row gap-3">
                  <div className="relative flex-1 min-w-0">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search by name, email, phone..."
                      value={searchTerm}
                      onChange={(e) => {
                        setCurrentPage(1);
                        setSearchTerm(e.target.value);
                      }}
                      className="w-full min-w-0 pl-10 pr-4 py-3 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <select
                    value={selectedStatus}
                    onChange={(e) => {
                      setCurrentPage(1);
                      setSelectedStatus(e.target.value);
                    }}
                    className="w-full lg:w-[180px] px-4 py-3 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="contacted">Contacted</option>
                    <option value="resolved">Resolved</option>
                    <option value="spam">Spam</option>
                  </select>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={fetchContacts}
                    className="px-4 py-3 text-sm bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-100 flex items-center gap-2"
                  >
                    <RefreshCw size={16} />
                    <span>Refresh</span>
                  </button>

                  <button
                    onClick={exportToCSV}
                    className="px-4 py-3 text-sm bg-green-600 text-white rounded-xl hover:bg-green-700 flex items-center gap-2"
                  >
                    <Download size={16} />
                    <span>Export</span>
                  </button>

                  {selectedContacts.length > 0 && (
                    <button
                      onClick={() => setShowBulkDeleteModal(true)}
                      className="px-4 py-3 text-sm bg-red-600 text-white rounded-xl hover:bg-red-700 flex items-center gap-2"
                    >
                      <Trash2 size={16} />
                      <span>Delete ({selectedContacts.length})</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="w-full max-w-full rounded-2xl border border-gray-200 bg-white overflow-hidden">
              <div className="w-full overflow-x-auto">
                <table className="w-full min-w-[1150px] table-fixed">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="w-[50px] px-4 py-4 text-left">
                        <input
                          type="checkbox"
                          checked={
                            selectedContacts.length === contacts.length &&
                            contacts.length > 0
                          }
                          onChange={selectAll}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </th>
                      <th className="w-[70px] px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                        S.No
                      </th>
                      <th className="w-[260px] px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                        Name
                      </th>
                      <th className="w-[160px] px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                        Contact
                      </th>
                      <th className="w-[220px] px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                        Address
                      </th>
                      <th className="w-[240px] px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                        Message
                      </th>
                      <th className="w-[150px] px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                        Status
                      </th>
                      <th className="w-[120px] px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                        Date
                      </th>
                      <th className="w-[100px] px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200">
                    {contacts.map((contact, index) => (
                      <tr key={contact._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-4 align-top">
                          <input
                            type="checkbox"
                            checked={selectedContacts.includes(contact._id)}
                            onChange={() => toggleSelectContact(contact._id)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                        </td>

                        <td className="px-4 py-4 text-sm text-gray-600 align-top">
                          {(currentPage - 1) * itemsPerPage + index + 1}
                        </td>

                        <td className="px-4 py-4 align-top">
                          <div className="flex items-start gap-3 min-w-0">
                            <div className="w-10 h-10 shrink-0 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                              {contact.fullName?.charAt(0)?.toUpperCase() || "A"}
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-gray-800 break-words">
                                {contact.fullName}
                              </p>
                              <p
                                className="text-xs text-gray-500 truncate"
                                title={contact.email}
                              >
                                {contact.email}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-4 py-4 align-top">
                          <div className="flex items-center gap-2 text-sm text-gray-600 min-w-0">
                            <Phone size={14} className="text-gray-400 shrink-0" />
                            <span className="truncate" title={contact.phone}>
                              {contact.phone}
                            </span>
                          </div>
                        </td>

                        <td className="px-4 py-4 align-top">
                          <div className="flex items-start gap-2 text-sm text-gray-600 min-w-0">
                            <MapPin size={14} className="text-gray-400 shrink-0 mt-0.5" />
                            <span
                              className="block truncate"
                              title={contact.address}
                            >
                              {contact.address}
                            </span>
                          </div>
                        </td>

                        <td className="px-4 py-4 align-top">
                          <div className="flex items-start gap-2 text-sm text-gray-600 min-w-0">
                            <MessageSquare
                              size={14}
                              className="text-gray-400 shrink-0 mt-0.5"
                            />
                            <span
                              className="block truncate"
                              title={contact.message}
                            >
                              {contact.message || "-"}
                            </span>
                          </div>
                        </td>

                        <td className="px-4 py-4 align-top">
                          <div className="flex items-center gap-2">
                            <select
                              value={contact.status}
                              onChange={(e) => updateStatus(contact._id, e.target.value)}
                              disabled={updatingStatus === contact._id}
                              className="w-full text-xs border border-gray-200 rounded-lg px-2 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                            >
                              <option value="pending">Pending</option>
                              <option value="contacted">Contacted</option>
                              <option value="resolved">Resolved</option>
                              <option value="spam">Spam</option>
                            </select>
                            {updatingStatus === contact._id && (
                              <Loader size={12} className="animate-spin text-blue-500 shrink-0" />
                            )}
                          </div>
                        </td>

                        <td className="px-4 py-4 text-xs text-gray-500 whitespace-nowrap align-top">
                          {contact.submittedAt
                            ? new Date(contact.submittedAt).toLocaleDateString()
                            : "-"}
                        </td>

                        <td className="px-4 py-4 align-top">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => viewContact(contact._id)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="View Details"
                            >
                              <Eye size={16} />
                            </button>
                            <button
                              onClick={() => {
                                setContactToDelete(contact);
                                setShowDeleteModal(true);
                              }}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {totalPages > 1 && (
                <div className="px-4 py-4 bg-gray-50 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-3">
                  <p className="text-sm text-gray-600 text-center md:text-left">
                    Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                    {Math.min(currentPage * itemsPerPage, totalContacts)} of{" "}
                    {totalContacts} entries
                  </p>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      disabled={currentPage === 1}
                      className="p-2 text-gray-600 hover:bg-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft size={16} />
                    </button>

                    <span className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg">
                      {currentPage} / {totalPages}
                    </span>

                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                      className="p-2 text-gray-600 hover:bg-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {contacts.length === 0 && !loading && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center mt-6">
                <Mail className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-700 mb-1">
                  No contacts found
                </h3>
                <p className="text-sm text-gray-500">
                  No adult contact submissions match your filters.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedContact && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
              <h2 className="text-lg font-bold text-gray-800">Contact Details</h2>
              <button
                onClick={() => setShowDetailModal(false)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <XCircle size={20} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-500 uppercase">Full Name</label>
                  <p className="text-sm font-medium text-gray-800 flex items-center gap-2 mt-1 break-words">
                    <User size={14} /> {selectedContact.fullName}
                  </p>
                </div>

                <div>
                  <label className="text-xs text-gray-500 uppercase">Email</label>
                  <p className="text-sm text-gray-800 flex items-center gap-2 mt-1 break-all">
                    <Mail size={14} /> {selectedContact.email}
                  </p>
                </div>

                <div>
                  <label className="text-xs text-gray-500 uppercase">Phone</label>
                  <p className="text-sm text-gray-800 flex items-center gap-2 mt-1 break-words">
                    <Phone size={14} /> {selectedContact.phone}
                  </p>
                </div>

                <div>
                  <label className="text-xs text-gray-500 uppercase">Status</label>
                  <div className="mt-1">{getStatusBadge(selectedContact.status)}</div>
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-500 uppercase">Address</label>
                <p className="text-sm text-gray-800 mt-1 break-words">
                  {selectedContact.address}
                </p>
              </div>

              <div>
                <label className="text-xs text-gray-500 uppercase">Message</label>
                <p className="text-sm text-gray-800 mt-1 p-3 bg-gray-50 rounded-lg whitespace-pre-wrap break-words">
                  {selectedContact.message}
                </p>
              </div>

              <div>
                <label className="text-xs text-gray-500 uppercase">Submitted At</label>
                <p className="text-sm text-gray-800 mt-1">
                  {selectedContact.submittedAt
                    ? new Date(selectedContact.submittedAt).toLocaleString()
                    : "-"}
                </p>
              </div>

              {selectedContact.ipAddress && (
                <div>
                  <label className="text-xs text-gray-500 uppercase">IP Address</label>
                  <p className="text-sm text-gray-800 mt-1 break-all">
                    {selectedContact.ipAddress}
                  </p>
                </div>
              )}

              {selectedContact.notes && (
                <div>
                  <label className="text-xs text-gray-500 uppercase">Admin Notes</label>
                  <p className="text-sm text-gray-800 mt-1 break-words">
                    {selectedContact.notes}
                  </p>
                </div>
              )}
            </div>

            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-4 flex justify-end">
              <button
                onClick={() => setShowDetailModal(false)}
                className="px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && contactToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>

              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Delete Contact
              </h3>

              <p className="text-sm text-gray-600 mb-4">
                Are you sure you want to delete the contact from{" "}
                <strong>{contactToDelete.fullName}</strong>? This action cannot be
                undone.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>

                <button
                  onClick={() => deleteContact(contactToDelete._id)}
                  className="flex-1 px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Delete Modal */}
      {showBulkDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>

              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Bulk Delete Contacts
              </h3>

              <p className="text-sm text-gray-600 mb-4">
                Are you sure you want to delete{" "}
                <strong>{selectedContacts.length}</strong> selected contacts? This
                action cannot be undone.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowBulkDeleteModal(false)}
                  className="flex-1 px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>

                <button
                  onClick={bulkDeleteContacts}
                  className="flex-1 px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Delete All
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAdultContacts;