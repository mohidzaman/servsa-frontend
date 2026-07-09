export default function StatusBadge({ status, size = 'sm' }) {
  const styles = {
    new: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    in_review: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    contacted: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    completed: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    read: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    unread: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    replied: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    published: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    draft: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    featured: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    super_admin: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    admin: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    editor: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
    active: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    inactive: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
  };

  const labels = {
    new: 'New',
    in_review: 'In Review',
    contacted: 'Contacted',
    completed: 'Completed',
    read: 'Read',
    unread: 'Unread',
    replied: 'Replied',
    published: 'Published',
    draft: 'Draft',
    featured: 'Featured',
    super_admin: 'Super Admin',
    admin: 'Admin',
    editor: 'Editor',
    active: 'Active',
    inactive: 'Inactive',
  };

  const sizeClasses = size === 'lg' ? 'px-3 py-1 text-xs' : 'px-2.5 py-0.5 text-[11px]';

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full font-medium border ${styles[status] || 'bg-slate-500/10 text-slate-400 border-slate-500/20'} ${sizeClasses}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${status === 'new' || status === 'unread' || status === 'draft' ? 'bg-current animate-pulse' : 'bg-current'}`} />
      {labels[status] || status}
    </span>
  );
}
