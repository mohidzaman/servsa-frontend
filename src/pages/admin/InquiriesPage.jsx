import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { contactApi } from '../../api/contact.api';
import { Trash2, Eye, EyeOff, Mail, Phone, Building, Calendar } from 'lucide-react';
import DataTable from '../../components/admin/DataTable';
import StatusBadge from '../../components/admin/StatusBadge';
import FormModal from '../../components/admin/FormModal';
import ConfirmDialog from '../../components/admin/ConfirmDialog';

export default function InquiriesPage() {
  const [viewId, setViewId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['contact', 'messages'],
    queryFn: () => contactApi.getMessages({ limit: 100 }).then(r => r.data),
  });

  const messages = data?.data || [];

  const { data: messageData } = useQuery({
    queryKey: ['contact', 'message', viewId],
    queryFn: () => contactApi.getMessage(viewId).then(r => r.data),
    enabled: !!viewId,
  });

  const markRead = useMutation({
    mutationFn: (id) => contactApi.markRead(id).then(r => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['contact', 'messages'] }),
  });

  const deleteMsg = useMutation({
    mutationFn: (id) => contactApi.deleteMessage(id).then(r => r.data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['contact', 'messages'] }); setDeleteId(null); },
  });

  const columns = [
    { header: 'Name', accessor: 'firstName', cell: (r) => <span className="font-medium text-white">{r.firstName} {r.lastName}</span> },
    { header: 'Email', accessor: 'email', cell: (r) => <span className="text-white/60">{r.email}</span> },
    { header: 'Subject', accessor: 'subject', cell: (r) => <span className="text-white/80 max-w-[200px] truncate block">{r.subject}</span> },
    { header: 'Status', accessor: 'isRead', cell: (r) => r.isRead ? <StatusBadge status="read" /> : <StatusBadge status="unread" /> },
    { header: 'Date', accessor: 'createdAt', cell: (r) => <span className="text-white/50 text-xs">{new Date(r.createdAt).toLocaleDateString()}</span> },
    {
      header: '', accessor: 'actions', sortable: false,
      cell: (r) => (
        <div className="flex items-center gap-1">
          <button onClick={(e) => { e.stopPropagation(); setViewId(r.id); }}
            className="p-1.5 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition-all">
            <Eye size={15} />
          </button>
          {!r.isRead && (
            <button onClick={(e) => { e.stopPropagation(); markRead.mutate(r.id); }}
              className="p-1.5 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition-all">
              <EyeOff size={15} />
            </button>
          )}
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
        <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Inquiries</h2>
        <p className="text-white/50 text-sm mt-1">Manage contact form submissions</p>
      </div>

      <DataTable
        columns={columns}
        data={messages}
        isLoading={isLoading}
        searchPlaceholder="Search inquiries..."
        emptyTitle="No inquiries yet"
        emptyDescription="Contact form submissions will appear here."
        onRowClick={(r) => setViewId(r.id)}
      />

      <FormModal open={!!viewId} onClose={() => setViewId(null)} title="Inquiry Details" maxWidth="md">
        {messageData?.data ? (
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Mail, label: 'Email', value: messageData.data.email },
                { icon: Phone, label: 'Phone', value: messageData.data.phone || '—' },
                { icon: Building, label: 'Company', value: messageData.data.company || '—' },
                { icon: Calendar, label: 'Date', value: new Date(messageData.data.createdAt).toLocaleString() },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="p-3 rounded-xl bg-white/5">
                  <div className="flex items-center gap-2 text-xs text-white/40 mb-1">
                    <Icon size={12} /> {label}
                  </div>
                  <p className="text-sm text-white/80">{value}</p>
                </div>
              ))}
            </div>
            <div>
              <p className="text-xs text-white/40 font-semibold uppercase tracking-wider mb-1">Subject</p>
              <p className="text-sm font-medium text-white">{messageData.data.subject}</p>
            </div>
            <div>
              <p className="text-xs text-white/40 font-semibold uppercase tracking-wider mb-1">Message</p>
              <p className="text-sm text-white/70 leading-relaxed bg-white/5 p-4 rounded-xl">{messageData.data.message}</p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <StatusBadge status={messageData.data.isRead ? 'read' : 'unread'} size="lg" />
              {messageData.data.isReplied && <StatusBadge status="replied" size="lg" />}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center py-10"><div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" /></div>
        )}
      </FormModal>

      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={() => deleteMsg.mutate(deleteId)}
        title="Delete Inquiry"
        message="This will permanently delete this inquiry. Are you sure?"
        loading={deleteMsg.isPending}
      />
    </div>
  );
}
