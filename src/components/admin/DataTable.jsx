import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, ChevronLeft, ChevronRight, ArrowUpDown, ArrowUp, ArrowDown, Loader2 } from 'lucide-react';
import EmptyState from './EmptyState';

export default function DataTable({
  columns = [],
  data = [],
  isLoading,
  searchable = true,
  searchPlaceholder = 'Search...',
  pageSize = 10,
  emptyIcon,
  emptyTitle = 'No data',
  emptyDescription,
  emptyAction,
  onRowClick,
}) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState('asc');

  const safeColumns = columns || [];
  const safeData = Array.isArray(data) ? data : [];

  const filtered = useMemo(() => {
    if (!search.trim()) return safeData;
    const q = search.toLowerCase();
    return safeData.filter((row) =>
      safeColumns.some((col) => {
        const val = col.accessor ? row[col.accessor] : '';
        return String(val || '').toLowerCase().includes(q);
      })
    );
  }, [safeData, search, safeColumns]);

  const sorted = useMemo(() => {
    if (!sortKey) return filtered;
    return [...filtered].sort((a, b) => {
      const aVal = a[sortKey] ?? '';
      const bVal = b[sortKey] ?? '';
      const cmp = String(aVal).localeCompare(String(bVal), undefined, { numeric: true });
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [filtered, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const paginated = sorted.slice((page - 1) * pageSize, page * pageSize);

  const toggleSort = (key) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 size={24} className="text-primary animate-spin" />
      </div>
    );
  }

  if (!safeData.length && !search) {
    return <EmptyState icon={emptyIcon} title={emptyTitle} description={emptyDescription} action={emptyAction} />;
  }

  return (
    <div>
      {searchable && (
        <div className="relative mb-4 max-w-xs">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder={searchPlaceholder}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-white/10 bg-white/5 text-sm text-white outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-white/30"
          />
        </div>
      )}

      {sorted.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-sm text-white/50">No results matching "<span className="text-white/70">{search}</span>"</p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02]">
                  {safeColumns.map((col) => (
                    <th
                      key={col.accessor || col.header}
                      className={`px-4 py-3 text-left text-xs font-semibold text-white/50 uppercase tracking-wider ${col.sortable !== false && col.accessor ? 'cursor-pointer hover:text-white/80 select-none' : ''}`}
                      onClick={() => col.sortable !== false && col.accessor && toggleSort(col.accessor)}
                    >
                      <div className="flex items-center gap-1">
                        {col.header}
                        {col.sortable !== false && col.accessor && (
                          sortKey === col.accessor ? (
                            sortDir === 'asc' ? <ArrowUp size={12} /> : <ArrowDown size={12} />
                          ) : <ArrowUpDown size={12} className="opacity-30" />
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {(paginated || []).map((row, i) => (
                  <motion.tr
                    key={row.id || i}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.02 }}
                    onClick={() => onRowClick?.(row)}
                    className={`${onRowClick ? 'cursor-pointer' : ''} hover:bg-white/[0.02] transition-colors`}
                  >
                    {safeColumns.map((col) => (
                      <td key={col.accessor || col.header} className="px-4 py-3 text-white/80">
                        {col.cell ? col.cell(row) : row[col.accessor]}
                      </td>
                    ))}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4 text-sm">
              <span className="text-white/50">
                Page {page} of {totalPages}
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1}
                  className="p-2 rounded-lg hover:bg-white/5 disabled:opacity-30 text-white/70 transition-all"
                >
                  <ChevronLeft size={16} />
                </button>
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  const start = Math.max(1, page - 2);
                  const pg = start + i;
                  if (pg > totalPages) return null;
                  return (
                    <button
                      key={pg}
                      onClick={() => setPage(pg)}
                      className={`w-8 h-8 rounded-lg text-xs font-medium transition-all ${
                        pg === page ? 'bg-primary text-white' : 'text-white/60 hover:bg-white/5'
                      }`}
                    >
                      {pg}
                    </button>
                  );
                })}
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page >= totalPages}
                  className="p-2 rounded-lg hover:bg-white/5 disabled:opacity-30 text-white/70 transition-all"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
