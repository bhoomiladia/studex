// @ts-nocheck

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setPending(false);
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (res.status === 403) {
          setPending(true);
          setError(null);
          return;
        }
        throw new Error(data?.error || 'Login failed');
      }
      router.push('/student-dashboard');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const refreshStatus = async () => {
    setLoading(true);
    setError(null);
    try {
      // Try login silently again to check if approved now
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (res.ok) {
        router.push('/student-dashboard');
        return;
      }
      const data = await res.json().catch(() => ({}));
      if (res.status !== 403) setError(data?.error || 'Still not approved');
    } catch (e: any) {
      setError(e.message || 'Error checking status');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Student Login</h1>
        {!pending ? (
          <>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="you@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="••••••••" />
              </div>
              {error && <div className="text-sm text-red-600">{error}</div>}
              <button type="submit" disabled={loading} className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-60">
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
            <p className="text-xs text-gray-500 mt-4">Note: You can login only after your application is approved by Admin.</p>
          </>
        ) : (
          <div className="text-center">
            <div className="text-green-700 bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="font-semibold mb-1">Your application is pending approval</div>
              <div className="text-sm text-green-800">Please wait for the admin to approve your request. You can refresh status after some time.</div>
            </div>
            {error && <div className="text-sm text-red-600 mt-3">{error}</div>}
            <button onClick={refreshStatus} disabled={loading} className="mt-4 w-full py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 disabled:opacity-60">
              {loading ? 'Checking...' : 'Refresh Status'}
            </button>
            <button onClick={() => { setPending(false); setError(null); }} className="mt-2 w-full py-2 text-gray-600 hover:text-gray-800">
              Back to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
