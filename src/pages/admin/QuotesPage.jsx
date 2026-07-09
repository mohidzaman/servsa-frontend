import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { contactApi } from '../../api/contact.api';
import { FileText, Trash2, Eye, Calendar, DollarSign, Clock, Download } from 'lucide-react';
import DataTable from '../../components/admin/DataTable';
import StatusBadge from '../../components/admin/StatusBadge';
import FormModal from '../../components/admin/FormModal';
import ConfirmDialog from '../../components/admin/ConfirmDialog';

export default function QuotesPage() {
  const [viewId, setViewId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['contact', 'quotes'],
    queryFn: () => contactApi.getQuotes({ limit: 100 }).then(r => r.data),
  });

  const quotes = data?.data || [];

  const { data: quoteData } = useQuery({
    queryKey: ['contact', 'quote', viewId],
    queryFn: () => contactApi.getQuote(viewId).then(r => r.data),
    enabled: !!viewId,
  });

  const updateStatus = useMutation({
    mutationFn: ({ id, status }) => contactApi.updateQuoteStatus(id, { status }).then(r => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['contact', 'quotes'] }),
  });

  const deleteQuote = useMutation({
    mutationFn: (id) => contactApi.deleteQuote(id).then(r => r.data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['contact', 'quotes'] }); setDeleteId(null); },
  });

  const columns = [
    { header: 'ID', accessor: 'quoteId', cell: (r) => <span className="font-mono text-xs text-white/80">{r.quoteId}</span> },
    { header: 'Name', accessor: 'firstName', cell: (r) => <span className="font-medium text-white">{r.firstName} {r.lastName}</span> },
    { header: 'Email', accessor: 'email', cell: (r) => <span className="text-white/60">{r.email}</span> },
    { header: 'Service', accessor: 'serviceType', cell: (r) => <span className="capitalize text-white/70">{r.serviceType?.replace(/-/g, ' ') || '—'}</span> },
    { header: 'Status', accessor: 'status', cell: (r) => <StatusBadge status={r.status} /> },
    { header: 'Date', accessor: 'createdAt', cell: (r) => <span className="text-white/50 text-xs">{new Date(r.createdAt).toLocaleDateString()}</span> },
    {
      header: '', accessor: 'actions', sortable: false,
      cell: (r) => (
        <div className="flex items-center gap-1">
          <button onClick={(e) => { e.stopPropagation(); setViewId(r.id); }}
            className="p-1.5 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition-all">
            <Eye size={15} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); setDeleteId(r.id); }}
            className="p-1.5 rounded-lg hover:bg-red-500/20 text-white/50 hover:text-red-400 transition-all">
            <Trash2 size={15} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Quote Requests</h2>
        <p className="text-white/50 text-sm mt-1">Manage and respond to incoming quote requests</p>
      </div>

      <DataTable
        columns={columns}
        data={quotes}
        isLoading={isLoading}
        searchPlaceholder="Search quotes..."
        emptyTitle="No quote requests yet"
        emptyDescription="Quote requests from the website will appear here."
        onRowClick={(r) => setViewId(r.id)}
      />

      <FormModal open={!!viewId} onClose={() => setViewId(null)} title="Quote Request Details" maxWidth="md">
        {quoteData?.data ? (
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: FileText, label: 'Quote ID', value: quoteData.data.quoteId },
                { icon: Calendar, label: 'Date', value: new Date(quoteData.data.createdAt).toLocaleString() },
                { icon: DollarSign, label: 'Budget', value: quoteData.data.budgetRange || 'Not specified' },
                { icon: Clock, label: 'Timeline', value: quoteData.data.timeline || 'Not specified' },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="p-3 rounded-xl bg-white/5">
                  <div className="flex items-center gap-2 text-xs text-white/40 mb-1"><Icon size={12} /> {label}</div>
                  <p className="text-sm text-white/80">{value}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'First Name', value: quoteData.data.firstName },
                { label: 'Last Name', value: quoteData.data.lastName },
                { label: 'Email', value: quoteData.data.email },
                { label: 'Phone', value: quoteData.data.phone || '—' },
                { label: 'Company', value: quoteData.data.company || '—' },
                { label: 'Service', value: quoteData.data.serviceType?.replace(/-/g, ' ') || '—' },
              ].map(({ label, value }) => (
                <div key={label} className="p-3 rounded-xl bg-white/5">
                  <p className="text-xs text-white/40 mb-1">{label}</p>
                  <p className="text-sm text-white/80">{value}</p>
                </div>
              ))}
            </div>
            <div>
              <p className="text-xs text-white/40 font-semibold uppercase tracking-wider mb-1">Project Description</p>
              <p className="text-sm text-white/70 leading-relaxed bg-white/5 p-4 rounded-xl">{quoteData.data.projectDescription}</p>
            </div>
            {quoteData.data.files?.length > 0 && (
              <div>
                <p className="text-xs text-white/40 font-semibold uppercase tracking-wider mb-2">Attachments ({quoteData.data.files.length})</p>
                <div className="flex flex-wrap gap-2">
                  {quoteData.data.files.map((f, i) => (
                    <a key={i} href={f.fileUrl} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 text-xs text-white/70 hover:bg-white/20 transition-all">
                      <Download size={12} /> {f.fileName}
                    </a>
                  ))}
                </div>
              </div>
            )}
            <div>
              <p className="text-xs text-white/40 font-semibold uppercase tracking-wider mb-2">Status</p>
              <div className="flex flex-wrap gap-2">
                {['new', 'in_review', 'contacted', 'completed'].map((s) => (
                  <button key={s} onClick={() => updateStatus.mutate({ id: quoteData.data.id, status: s })}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                      quoteData.data.status === s
                        ? 'bg-primary text-white border-primary'
                        : 'bg-white/5 text-white/50 border-white/10 hover:border-white/30'
                    }`}>
                    {s.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center py-10"><div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" /></div>
        )}
      </FormModal>

      <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)}
        onConfirm={() => deleteQuote.mutate(deleteId)}
        title="Delete Quote Request" message="This will permanently delete this quote request. Are you sure?" loading={deleteQuote.isPending} />
    </div>
  );
}
