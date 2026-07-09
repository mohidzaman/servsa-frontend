import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { MessageSquare, FileText, Briefcase, Image, Calendar, Mail, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAdminStats, useAdminActivity } from '../../hooks/useAdmin';
import { contactApi } from '../../api/contact.api';
import Skeleton from '../../components/ui/Skeleton';
import StatusBadge from '../../components/admin/StatusBadge';

const StatCard = ({ label, value, icon: Icon, to }) => (
  <motion.div whileHover={{ y: -2 }}>
    <Link to={to} className="block p-6 rounded-2xl bg-dark-card border border-white/10 hover:border-primary/30 transition-all h-full">
      <div className="flex items-start justify-between mb-4">
        <div className="w-11 h-11 rounded-xl bg-blue-500/20 flex items-center justify-center">
          <Icon size={20} className="text-blue-400" />
        </div>
      </div>
      <p className="text-white/50 text-sm mb-1">{label}</p>
      <p className="text-3xl font-bold text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{value ?? '—'}</p>
    </Link>
  </motion.div>
);

export default function OverviewTab() {
  const { data: statsData, isLoading: statsLoading } = useAdminStats();
  const { data: activityData } = useAdminActivity({ limit: 5 });
  const { data: recentInquiries } = useQuery({
    queryKey: ['contact', 'messages', 'recent'],
    queryFn: () => contactApi.getMessages({ limit: 5, sortBy: 'created_at', sortOrder: 'desc' }).then(r => r.data),
  });

  const stats = statsData?.data;
  const messages = recentInquiries?.data || [];
  const activities = activityData?.data || [];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Overview</h2>
        <p className="text-white/50 text-sm">Your SERVSA dashboard at a glance</p>
      </div>

      {statsLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-36 w-full rounded-2xl" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard label="Total Inquiries" value={stats?.totalMessages ?? 0} icon={MessageSquare} to="/admin/inquiries" />
          <StatCard label="Quote Requests" value={stats?.totalQuotes ?? 0} icon={FileText} to="/admin/quotes" />
          <StatCard label="Services" value={stats?.totalServices ?? 0} icon={Briefcase} to="/admin/services" />
          <StatCard label="Portfolio Projects" value={stats?.totalProjects ?? 0} icon={Image} to="/admin/portfolio" />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-dark-card border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Recent Inquiries</h3>
            <Link to="/admin/inquiries" className="text-xs text-primary hover:text-primary/80 transition-all flex items-center gap-1">
              View all <ArrowRight size={12} />
            </Link>
          </div>
          {messages.length === 0 ? (
            <p className="text-sm text-white/50 py-6 text-center">No inquiries yet</p>
          ) : (
            <div className="space-y-2">
              {messages.map((msg) => (
                <div key={msg.id} className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0">
                  <div className={`w-2 h-2 rounded-full shrink-0 ${msg.isRead ? 'bg-white/20' : 'bg-blue-400'}`} />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-white/80 truncate">{msg.firstName} {msg.lastName}</p>
                    <p className="text-xs text-white/50 truncate">{msg.subject}</p>
                  </div>
                  <span className="text-[10px] text-white/30 whitespace-nowrap">{new Date(msg.createdAt).toLocaleDateString()}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-6 rounded-2xl bg-dark-card border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Recent Activity</h3>
            <Link to="/admin/activity" className="text-xs text-primary hover:text-primary/80 transition-all flex items-center gap-1">
              View all <ArrowRight size={12} />
            </Link>
          </div>
          {activities.length === 0 ? (
            <p className="text-sm text-white/50 py-6 text-center">No recent activity</p>
          ) : (
            <div className="space-y-2">
              {activities.map((item) => (
                <div key={item.id} className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0">
                  <div className="w-2 h-2 rounded-full bg-blue-400 shrink-0" />
                  <span className="text-sm text-white/70 capitalize">{item.action}</span>
                  {item.entityType && <span className="text-xs text-white/40">— {item.entityType}</span>}
                  <span className="ml-auto text-xs text-white/30 whitespace-nowrap">
                    {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : ''}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
