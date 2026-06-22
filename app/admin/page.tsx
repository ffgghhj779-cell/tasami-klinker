"use client";

import { useState, useEffect, useCallback } from 'react';
import type { ContactSubmission } from '@/lib/types/database';
import { Loader2, LogOut, RefreshCw, Mail, Phone, Building2 } from 'lucide-react';
import { Logo } from '@/components/brand/Logo';

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginLoading, setLoginLoading] = useState(false);
  const [leads, setLeads] = useState<ContactSubmission[]>([]);
  const [leadsLoading, setLeadsLoading] = useState(false);
  const [leadsError, setLeadsError] = useState<string | null>(null);
  const [selectedLead, setSelectedLead] = useState<ContactSubmission | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLeads = leads.filter((lead) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      lead.reference_id.toLowerCase().includes(q) ||
      lead.company.toLowerCase().includes(q) ||
      lead.country_port.toLowerCase().includes(q) ||
      lead.email.toLowerCase().includes(q)
    );
  });

  const exportCsv = () => {
    if (leads.length === 0) return;
    const headers = ['reference_id', 'company', 'country_port', 'quantity', 'email', 'phone', 'notes', 'lang', 'created_at'];
    const rows = leads.map((l) =>
      headers.map((h) => {
        const val = String(l[h as keyof ContactSubmission] ?? '');
        return `"${val.replace(/"/g, '""')}"`;
      }).join(',')
    );
    const csv = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tasami-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const fetchLeads = useCallback(async () => {
    setLeadsLoading(true);
    setLeadsError(null);
    try {
      const res = await fetch('/api/admin/leads');
      if (res.status === 401) {
        setIsAuthenticated(false);
        return;
      }
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to load leads');
      setLeads(data.leads ?? []);
    } catch (err) {
      setLeadsError(err instanceof Error ? err.message : 'Failed to load leads');
    } finally {
      setLeadsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch('/api/admin/session')
      .then((r) => r.json())
      .then((data) => {
        if (data.authenticated) {
          setIsAuthenticated(true);
        }
      })
      .finally(() => setIsCheckingSession(false));
  }, []);

  useEffect(() => {
    if (isAuthenticated) fetchLeads();
  }, [isAuthenticated, fetchLeads]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setLoginLoading(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setLoginError(data.message || 'Incorrect password');
        return;
      }
      setIsAuthenticated(true);
      setPassword('');
    } catch {
      setLoginError('Connection error. Please try again.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    setIsAuthenticated(false);
    setLeads([]);
    setSelectedLead(null);
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString('en-GB', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });

  if (isCheckingSession) {
    return (
      <div className="min-h-screen bg-bg-alt flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-bg-alt flex items-center justify-center p-4" dir="rtl">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl border border-border-main shadow-lg">
          <div className="text-center mb-6">
            <div className="flex justify-center mb-4">
              <Logo layout="official-full" variant="color" size="sm" />
            </div>
            <h1 className="text-2xl font-bold text-text-main">تسامي — لوحة الإدارة</h1>
            <p className="text-sm text-text-secondary mt-2 font-english">TASAMI Admin</p>
          </div>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <label htmlFor="admin-password" className="block text-sm font-bold text-text-secondary mb-2">
                كلمة المرور / Password
              </label>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-border-main outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                autoComplete="current-password"
                required
              />
            </div>
            {loginError && (
              <p className="text-sm text-red-600 font-medium" role="alert">{loginError}</p>
            )}
            <button
              type="submit"
              disabled={loginLoading}
              className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-[#e06d15] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loginLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'دخول / Sign In'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-alt p-4 sm:p-8" dir="rtl">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-border-main shadow-sm mb-6">
          <div className="flex items-center gap-4">
            <Logo layout="mark" variant="color" size="md" />
            <div>
            <h1 className="text-2xl font-bold text-text-main">طلبات عروض الأسعار</h1>
            <p className="text-sm text-text-secondary mt-1 font-english">
              RFQ Leads — {filteredLeads.length} of {leads.length}
            </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="بحث / Search..."
              className="px-3 py-2 rounded-lg border border-border-main text-sm w-full sm:w-48 outline-none focus:border-primary"
            />
            <button
              type="button"
              onClick={exportCsv}
              disabled={leads.length === 0}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border-main text-sm font-bold text-text-main hover:border-text-main transition-colors disabled:opacity-50"
            >
              CSV
            </button>
            <button
              type="button"
              onClick={fetchLeads}
              disabled={leadsLoading}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border-main text-sm font-bold text-text-main hover:border-primary hover:text-primary transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${leadsLoading ? 'animate-spin' : ''}`} />
              تحديث
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-text-main text-white text-sm font-bold hover:bg-primary transition-colors"
            >
              <LogOut className="w-4 h-4" />
              خروج
            </button>
          </div>
        </header>

        {leadsError && (
          <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm font-medium">
            {leadsError}
          </div>
        )}

        <div className="grid lg:grid-cols-[1fr_360px] gap-6">
          <div className="bg-white rounded-2xl border border-border-main shadow-sm overflow-hidden">
            {leadsLoading && leads.length === 0 ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : leads.length === 0 ? (
              <div className="text-center py-20 px-6 text-text-secondary">
                <p className="font-bold text-text-main mb-2">لا توجد طلبات بعد</p>
                <p className="text-sm font-english">No submissions yet. Leads from the contact form will appear here.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-start border-collapse">
                  <thead className="bg-[#FCFCFD] border-b border-border-main">
                    <tr>
                      {['المرجع', 'الشركة', 'الدولة', 'الكمية', 'التاريخ'].map((h) => (
                        <th key={h} className="p-4 text-[11px] font-black text-text-secondary uppercase tracking-wider text-start whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-main/60">
                    {filteredLeads.map((lead) => (
                      <tr
                        key={lead.id}
                        onClick={() => setSelectedLead(lead)}
                        className={`cursor-pointer transition-colors hover:bg-primary/5 ${
                          selectedLead?.id === lead.id ? 'bg-primary/5' : ''
                        }`}
                      >
                        <td className="p-4 text-xs font-mono font-bold text-primary whitespace-nowrap">
                          {lead.reference_id}
                        </td>
                        <td className="p-4 text-sm font-semibold text-text-main whitespace-nowrap">
                          {lead.company}
                        </td>
                        <td className="p-4 text-sm text-text-secondary whitespace-nowrap">
                          {lead.country_port}
                        </td>
                        <td className="p-4 text-sm font-mono text-text-main whitespace-nowrap">
                          {lead.quantity}
                        </td>
                        <td className="p-4 text-xs text-text-secondary whitespace-nowrap dir-ltr" style={{ direction: 'ltr' }}>
                          {formatDate(lead.created_at)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <aside className="bg-white rounded-2xl border border-border-main shadow-sm p-6 h-fit lg:sticky lg:top-6">
            {selectedLead ? (
              <div className="flex flex-col gap-5">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-text-secondary mb-1">Reference</p>
                  <p className="font-mono font-bold text-primary">{selectedLead.reference_id}</p>
                </div>

                <div className="flex items-start gap-3">
                  <Building2 className="w-4 h-4 text-primary mt-1 shrink-0" />
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-text-secondary mb-1">Company</p>
                    <p className="font-semibold text-text-main">{selectedLead.company}</p>
                  </div>
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-text-secondary mb-1">Country & Port</p>
                  <p className="text-sm text-text-main">{selectedLead.country_port}</p>
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-text-secondary mb-1">Quantity</p>
                  <p className="text-sm font-mono font-semibold">{selectedLead.quantity}</p>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-primary mt-1 shrink-0" />
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-text-secondary mb-1">Email</p>
                    <a href={`mailto:${selectedLead.email}`} className="text-sm font-semibold text-primary hover:underline break-all">
                      {selectedLead.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-primary mt-1 shrink-0" />
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-text-secondary mb-1">Phone</p>
                    <p className="text-sm font-semibold dir-ltr" style={{ direction: 'ltr' }}>{selectedLead.phone}</p>
                  </div>
                </div>

                {selectedLead.notes && (
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-text-secondary mb-1">Notes</p>
                    <p className="text-sm text-text-secondary leading-relaxed">{selectedLead.notes}</p>
                  </div>
                )}

                <div className="pt-4 border-t border-border-main text-xs text-text-secondary">
                  <span className="font-bold uppercase tracking-wider">Lang:</span> {selectedLead.lang ?? '—'}
                  <br />
                  <span className="font-bold uppercase tracking-wider">Submitted:</span>{' '}
                  <span className="dir-ltr" style={{ direction: 'ltr' }}>{formatDate(selectedLead.created_at)}</span>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-text-secondary text-sm">
                <p className="font-semibold text-text-main mb-2">اختر طلباً لعرض التفاصيل</p>
                <p className="font-english">Select a lead to view details</p>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
