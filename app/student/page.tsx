"use client";
import { useEffect, useState } from "react";

export default function StudentDashboard() {
  const [me, setMe] = useState<any>(null);
  const [hostel, setHostel] = useState<any>(null);
  const [books, setBooks] = useState<any[]>([]);
  const [fees, setFees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/student/dashboard');
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || 'Failed to load');
        setMe(data.student);
        setHostel(data.hostel || null);
        setBooks(Array.isArray(data.books) ? data.books : []);
        setFees(Array.isArray(data.fees) ? data.fees : []);
      } catch (e: any) {
        setError(e.message || 'Failed to load');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/login';
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Welcome, {me?.firstName} {me?.lastName}</h1>
          <button onClick={logout} className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800">Logout</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 rounded-xl p-4">
            <h2 className="text-lg font-semibold mb-2">Profile</h2>
            <ul className="text-sm text-gray-700 space-y-1">
              <li><strong>Email:</strong> {me?.email}</li>
              <li><strong>Roll No:</strong> {me?.rollNumber || '—'}</li>
              <li><strong>Department:</strong> {me?.department}</li>
              <li><strong>Year:</strong> {me?.year}</li>
              <li><strong>Status:</strong> {me?.status ? 'Approved' : 'Pending'}</li>
            </ul>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <h2 className="text-lg font-semibold mb-2">Hostel Allocation</h2>
            {hostel ? (
              <ul className="text-sm text-gray-700 space-y-1">
                <li><strong>Hostel:</strong> {hostel.hostelName}</li>
                <li><strong>Room:</strong> {me?.roomNumber}</li>
                <li><strong>Type:</strong> {hostel.isAC ? 'AC' : 'Non-AC'}</li>
                <li><strong>Mess Preference:</strong> {me?.messPreference || '—'}</li>
                <li><strong>Room Preference:</strong> {me?.roomPreference || '—'}</li>
              </ul>
            ) : (
              <div className="text-sm text-gray-500">No hostel allocated yet.</div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-gray-50 rounded-xl p-4">
            <h2 className="text-lg font-semibold mb-2">Library History</h2>
            {books.length > 0 ? (
              <ul className="text-sm text-gray-700 divide-y">
                {books.map((b: any) => (
                  <li key={b._id} className="py-2 flex items-center justify-between">
                    <span>{b.bookTitle || b.bookId || 'Book'}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${b.status === 'Issued' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>{b.status}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-sm text-gray-500">No books issued.</div>
            )}
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <h2 className="text-lg font-semibold mb-2">Fees History</h2>
            {fees.length > 0 ? (
              <ul className="text-sm text-gray-700 divide-y">
                {fees.map((f: any) => (
                  <li key={f._id} className="py-2 flex items-center justify-between">
                    <span>₹{Number(f.amount || 0).toLocaleString()}</span>
                    <span className="text-xs text-gray-500">{f.date ? new Date(f.date).toLocaleDateString() : ''}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-sm text-gray-500">No fees records.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
