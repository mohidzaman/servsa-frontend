import { useState, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { portfolioApi } from '../../api/portfolio.api';
import { servicesApi } from '../../api/services.api';
import { mediaApi } from '../../api/media.api';
import {
  Plus, Edit3, Trash2, Eye, EyeOff, Star, Calendar,
  Upload, X, FileImage, Loader2, Save, FileText
} from 'lucide-react';
import DataTable from '../../components/admin/DataTable';
import StatusBadge from '../../components/admin/StatusBadge';
import FormModal from '../../components/admin/FormModal';
import ConfirmDialog from '../../components/admin/ConfirmDialog';
import { useToast, ToastContainer } from '../../components/ui/Toast';

const emptyForm = {
  title: '', shortDescription: '', description: '', category: '', categoryId: '',
  technologies: [], projectUrl: '', clientName: '',
  metaTitle: '', metaDescription: '', metaKeywords: '',
  imageUrl: '', coverFile: null,
  isPublished: true, isFeatured: false, completedAt: '', sortOrder: 0,
  images: [], newGalleryFiles: [], removedImageIds: [],
};

const validate = (form) => {
  const errors = {};
  if (!form.title?.trim()) errors.title = 'Title is required';
  else if (form.title.length > 255) errors.title = 'Max 255 characters';
  if (!form.categoryId) errors.categoryId = 'Category is required';
  if (!form.shortDescription?.trim()) errors.shortDescription = 'Short description is required';
  else if (form.shortDescription.length > 500) errors.shortDescription = 'Max 500 characters';
  if (!form.imageUrl && !form.coverFile) errors.imageUrl = 'Cover image is required';
  if (form.imageUrl && form.imageUrl.startsWith('http') && !/^https?:\/\/.+/.test(form.imageUrl)) {
    errors.imageUrl = 'Invalid cover image URL';
  }
  if (form.coverFile && form.coverFile.size > 10 * 1024 * 1024) {
    errors.imageUrl = 'Cover image must be under 10MB';
  }
  if (form.projectUrl && !/^https?:\/\/.+/.test(form.projectUrl)) {
    errors.projectUrl = 'Must be a valid URL starting with http:// or https://';
  }
  if (form.clientName?.length > 255) errors.clientName = 'Max 255 characters';
  if (form.metaTitle?.length > 255) errors.metaTitle = 'Max 255 characters';
  return errors;
};

export default function PortfolioPage() {
  const [editItem, setEditItem] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const galleryInputRef = useRef(null);
  const coverInputRef = useRef(null);
  const { toasts, toast, remove } = useToast();
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['portfolio', 'list'],
    queryFn: () => portfolioApi.getAll({ limit: 100 }).then(r => r.data),
  });
  const { data: catsData } = useQuery({
    queryKey: ['services', 'categories'],
    queryFn: () => servicesApi.getCategories().then(r => r.data),
  });
  const projects = data?.data || [];
  const categories = catsData?.data || [];

  const invalidate = () => qc.invalidateQueries({ queryKey: ['portfolio', 'list'] });

  const createMut = useMutation({
    mutationFn: (data) => portfolioApi.create(data).then(r => r.data),
    onSuccess: () => { invalidate(); },
  });
  const updateMut = useMutation({
    mutationFn: ({ id, data }) => portfolioApi.update(id, data).then(r => r.data),
    onSuccess: () => { invalidate(); },
  });
  const deleteMut = useMutation({
    mutationFn: (id) => portfolioApi.delete(id).then(r => r.data),
    onSuccess: () => { invalidate(); setDeleteId(null); },
  });
  const addImageMut = useMutation({
    mutationFn: ({ id, data }) => portfolioApi.addImage(id, data).then(r => r.data),
    onSuccess: () => { invalidate(); },
  });
  const deleteImageMut = useMutation({
    mutationFn: ({ id, imageId }) => portfolioApi.deleteImage(id, imageId).then(r => r.data),
    onSuccess: () => { invalidate(); },
  });
  const togglePub = useMutation({
    mutationFn: (id) => portfolioApi.togglePublish(id).then(r => r.data),
    onSuccess: () => invalidate(),
  });
  const toggleFeat = useMutation({
    mutationFn: (id) => portfolioApi.toggleFeatured(id).then(r => r.data),
    onSuccess: () => invalidate(),
  });

  const uploadFile = async (file) => {
    const fd = new FormData();
    fd.append('file', file);
    const res = await mediaApi.upload(fd);
    return res.data?.fileUrl || res.data?.url || res.data?.data?.url;
  };

  const doSave = async (publishedOverride) => {
    const isPublished = publishedOverride !== undefined ? publishedOverride : form.isPublished;
    const payload = {
      ...form,
      isPublished,
      coverFile: undefined,
      newGalleryFiles: undefined,
      removedImageIds: undefined,
      images: undefined,
    };
    delete payload.coverFile;
    if (!payload.completedAt) delete payload.completedAt;
    if (!payload.category) delete payload.category;
    if (!payload.projectUrl) delete payload.projectUrl;
    if (!payload.metaTitle) delete payload.metaTitle;
    if (!payload.metaDescription) delete payload.metaDescription;
    if (!payload.metaKeywords) delete payload.metaKeywords;
    if (!payload.clientName) delete payload.clientName;

    const fieldErrors = validate({ ...form, isPublished });
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) {
      toast('Please fix the validation errors', 'error');
      return;
    }

    setSaving(true);
    try {
      let coverUrl = form.imageUrl;

      if (form.coverFile) {
        coverUrl = await uploadFile(form.coverFile);
      }

      const projectPayload = { ...payload, imageUrl: coverUrl || null };

      let projectId;
      if (editItem) {
        await updateMut.mutateAsync({ id: editItem.id, data: projectPayload });
        projectId = editItem.id;
      } else {
        const res = await createMut.mutateAsync(projectPayload);
        projectId = res?.data?.id || res?.id;
      }

      const newFiles = form.newGalleryFiles || [];
      for (const file of newFiles) {
        const url = await uploadFile(file);
        if (url) {
          await addImageMut.mutateAsync({ id: projectId, data: { imageUrl: url } });
        }
      }

      const removedIds = form.removedImageIds || [];
      for (const imageId of removedIds) {
        await deleteImageMut.mutateAsync({ id: projectId, imageId });
      }

      toast(editItem ? 'Project updated successfully' : 'Project created successfully', 'success');
      setShowForm(false);
    } catch (err) {
      const detail = err?.response?.data;
      const msg = detail?.errors?.length ? `${detail.message}: ${detail.errors.map(e => e.message).join(', ')}` : detail?.message || 'Save failed. Please try again.';
      toast(msg, 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveProject = () => doSave(undefined);
  const handleSaveDraft = () => doSave(false);

  const handleDelete = async () => {
    try {
      await deleteMut.mutateAsync(deleteId);
      toast('Project deleted', 'success');
    } catch {
      toast('Failed to delete project', 'error');
    }
  };

  const openCreate = () => {
    setEditItem(null);
    setForm(emptyForm);
    setErrors({});
    setShowForm(true);
  };
  const openEdit = (item) => {
    setEditItem(item);
    setForm({
      ...emptyForm,
      ...item,
      categoryId: item.categoryId || '',
      technologies: item.technologies || [],
      images: item.images || [],
      imageUrl: item.imageUrl || '',
      coverFile: null,
      newGalleryFiles: [],
      removedImageIds: [],
      completedAt: item.completedAt ? item.completedAt.split('T')[0] : '',
    });
    setErrors({});
    setShowForm(true);
  };

  const handleCoverFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      toast('Cover image must be under 10MB', 'error');
      if (coverInputRef.current) coverInputRef.current.value = '';
      return;
    }
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowed.includes(file.type)) {
      toast('Only JPG, PNG, WebP, and GIF images are allowed', 'error');
      if (coverInputRef.current) coverInputRef.current.value = '';
      return;
    }
    setForm(prev => ({ ...prev, coverFile: file, imageUrl: URL.createObjectURL(file) }));
  };
  const removeCover = () => {
    setForm(prev => ({ ...prev, coverFile: null, imageUrl: '' }));
    if (coverInputRef.current) coverInputRef.current.value = '';
  };

  const handleGalleryFiles = (e) => {
    const files = Array.from(e.target.files || []);
    const maxSize = 10 * 1024 * 1024;
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    const valid = files.filter(f => {
      if (f.size > maxSize) { toast(`"${f.name}" exceeds 10MB limit`, 'error'); return false; }
      if (!allowed.includes(f.type)) { toast(`"${f.name}" has an unsupported file type`, 'error'); return false; }
      return true;
    });
    setForm(prev => ({ ...prev, newGalleryFiles: [...prev.newGalleryFiles, ...valid] }));
    if (galleryInputRef.current) galleryInputRef.current.value = '';
  };
  const removeNewGalleryFile = (index) => {
    setForm(prev => ({ ...prev, newGalleryFiles: prev.newGalleryFiles.filter((_, i) => i !== index) }));
  };
  const removeExistingImage = (imageId) => {
    setForm(prev => ({ ...prev, removedImageIds: [...prev.removedImageIds, imageId] }));
  };

  const set = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

  const columns = [
    {
      header: 'Project Name', accessor: 'title',
      cell: (r) => (
        <div className="flex items-center gap-3">
          {r.imageUrl && <img src={r.imageUrl} alt="" className="w-9 h-9 rounded-lg object-cover shrink-0" />}
          <span className="font-medium text-white truncate max-w-[200px]">{r.title}</span>
        </div>
      ),
    },
    {
      header: 'Category', accessor: 'category',
      cell: (r) => {
        const cat = categories.find(c => c.id === r.categoryId);
        return <span className="text-white/60 text-xs capitalize">{cat?.name || r.category || '—'}</span>;
      },
    },
    { header: 'Client', accessor: 'clientName', cell: (r) => <span className="text-white/60">{r.clientName || '—'}</span> },
    { header: 'Published', accessor: 'isPublished', cell: (r) => r.isPublished ? <StatusBadge status="published" /> : <StatusBadge status="draft" /> },
    { header: 'Featured', accessor: 'isFeatured', cell: (r) => r.isFeatured ? <Star size={14} className="text-yellow-400 fill-yellow-400" /> : null },
    {
      header: 'Created', accessor: 'createdAt',
      cell: (r) => r.createdAt ? <span className="text-white/40 text-xs flex items-center gap-1"><Calendar size={12} />{new Date(r.createdAt).toLocaleDateString()}</span> : null,
    },
    {
      header: '', accessor: 'actions', sortable: false,
      cell: (r) => (
        <div className="flex items-center gap-1">
          <button onClick={(e) => { e.stopPropagation(); togglePub.mutate(r.id); }}
            className="p-1.5 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition-all">
            {r.isPublished ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
          <button onClick={(e) => { e.stopPropagation(); toggleFeat.mutate(r.id); }}
            className={`p-1.5 rounded-lg transition-all ${r.isFeatured ? 'text-yellow-400 bg-yellow-500/20' : 'text-white/50 hover:bg-white/10 hover:text-white'}`}>
            <Star size={15} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); openEdit(r); }}
            className="p-1.5 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition-all"><Edit3 size={15} /></button>
          <button onClick={(e) => { e.stopPropagation(); setDeleteId(r.id); }}
            className="p-1.5 rounded-lg hover:bg-red-500/20 text-white/50 hover:text-red-400 transition-all"><Trash2 size={15} /></button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <ToastContainer toasts={toasts} remove={remove} />
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Portfolio</h2>
          <p className="text-white/50 text-sm mt-1">Manage portfolio projects</p>
        </div>
        <button onClick={openCreate}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-all">
          <Plus size={16} /> Add Project
        </button>
      </div>

      <DataTable columns={columns} data={projects} isLoading={isLoading}
        searchPlaceholder="Search projects..." emptyTitle="No projects yet"
        emptyDescription="Create your first portfolio project to showcase your work." onRowClick={(r) => openEdit(r)} />

      <FormModal
        open={showForm}
        onClose={() => { if (!saving) setShowForm(false); }}
        title={editItem ? 'Edit Project' : 'Add Project'}
        maxWidth="xl"
        loading={saving}
        footer={
          <>
            <button onClick={(e) => { e.stopPropagation(); handleSaveDraft(); }}
              disabled={saving}
              className="px-4 py-2 rounded-xl border border-white/20 text-white/70 text-sm hover:bg-white/5 transition-all disabled:opacity-40 flex items-center gap-2">
              <FileText size={15} /> Save Draft
            </button>
            <button onClick={(e) => { e.stopPropagation(); setDeleteId(editItem?.id); setShowForm(false); }}
              disabled={saving || !editItem}
              className="px-4 py-2 rounded-xl border border-red-500/30 text-red-400 text-sm hover:bg-red-500/10 transition-all disabled:opacity-40 flex items-center gap-2">
              <Trash2 size={15} /> Delete
            </button>
            <button onClick={(e) => { e.stopPropagation(); handleSaveProject(); }}
              disabled={saving}
              className="px-5 py-2 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-all disabled:opacity-50 flex items-center gap-2">
              {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
              {editItem ? 'Update Project' : 'Save Project'}
            </button>
          </>
        }
      >
        <div className="space-y-5">
          {/* Cover Image */}
          <div>
            <label className="block text-xs text-white/50 mb-1.5">Cover Image *</label>
            {form.imageUrl ? (
              <div className="relative w-full h-44 rounded-xl overflow-hidden border border-white/10 bg-white/5 group">
                <img src={form.imageUrl} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <button type="button" onClick={() => coverInputRef.current?.click()}
                    className="p-2 rounded-lg bg-white/20 text-white hover:bg-white/30 transition-all"><Upload size={16} /></button>
                  <button type="button" onClick={removeCover}
                    className="p-2 rounded-lg bg-red-500/30 text-white hover:bg-red-500/50 transition-all"><X size={16} /></button>
                </div>
              </div>
            ) : (
              <button type="button" onClick={() => coverInputRef.current?.click()}
                className="w-full h-44 rounded-xl border-2 border-dashed border-white/10 hover:border-primary/50 transition-all bg-white/5 flex flex-col items-center justify-center gap-2 text-white/40 hover:text-white/70">
                <FileImage size={28} />
                <span className="text-xs">Click to upload cover image</span>
              </button>
            )}
            <input ref={coverInputRef} type="file" accept="image/*" onChange={handleCoverFile} className="hidden" />
            {errors.imageUrl && <p className="text-xs text-red-400 mt-1">{errors.imageUrl}</p>}
          </div>

          {/* Title + Category */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-white/50 mb-1">Title *</label>
              <input value={form.title} onChange={(e) => set('title', e.target.value)}
                className={`w-full px-3 py-2 bg-white/5 border rounded-xl text-sm text-white focus:outline-none focus:border-primary/50 ${errors.title ? 'border-red-500/50' : 'border-white/10'}`} />
              {errors.title && <p className="text-xs text-red-400 mt-1">{errors.title}</p>}
            </div>
            <div>
              <label className="block text-xs text-white/50 mb-1">Category *</label>
              <select value={form.categoryId} onChange={(e) => {
                const cat = categories.find(c => c.id === e.target.value);
                set('categoryId', e.target.value);
                set('category', cat?.name || '');
              }}
                className={`w-full px-3 py-2 bg-white/5 border rounded-xl text-sm text-white focus:outline-none focus:border-primary/50 ${errors.categoryId ? 'border-red-500/50' : 'border-white/10'}`}>
                <option value="">Select category</option>
                {(categories || []).map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              {errors.categoryId && <p className="text-xs text-red-400 mt-1">{errors.categoryId}</p>}
            </div>
          </div>

          {/* Client */}
          <div>
            <label className="block text-xs text-white/50 mb-1">Client Name</label>
            <input value={form.clientName} onChange={(e) => set('clientName', e.target.value)}
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-primary/50" />
          </div>

          {/* Short Description */}
          <div>
            <label className="block text-xs text-white/50 mb-1">Short Description *</label>
            <input value={form.shortDescription} onChange={(e) => set('shortDescription', e.target.value)}
              className={`w-full px-3 py-2 bg-white/5 border rounded-xl text-sm text-white focus:outline-none focus:border-primary/50 ${errors.shortDescription ? 'border-red-500/50' : 'border-white/10'}`} />
            {errors.shortDescription && <p className="text-xs text-red-400 mt-1">{errors.shortDescription}</p>}
          </div>

          {/* Full Description */}
          <div>
            <label className="block text-xs text-white/50 mb-1">Full Description</label>
            <textarea rows={4} value={form.description} onChange={(e) => set('description', e.target.value)}
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-primary/50 resize-none" />
          </div>

          {/* Technologies + URL */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-white/50 mb-1">Technologies (comma separated)</label>
              <input value={(form.technologies || []).join(', ')}
                onChange={(e) => set('technologies', (e.target.value || '').split(',').map(s => s.trim()).filter(Boolean))}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-primary/50" />
            </div>
            <div>
              <label className="block text-xs text-white/50 mb-1">Project URL</label>
              <input value={form.projectUrl} onChange={(e) => set('projectUrl', e.target.value)}
                className={`w-full px-3 py-2 bg-white/5 border rounded-xl text-sm text-white focus:outline-none focus:border-primary/50 ${errors.projectUrl ? 'border-red-500/50' : 'border-white/10'}`} />
              {errors.projectUrl && <p className="text-xs text-red-400 mt-1">{errors.projectUrl}</p>}
            </div>
          </div>

          {/* Date + Sort */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-white/50 mb-1">Completed Date</label>
              <input type="date" value={form.completedAt} onChange={(e) => set('completedAt', e.target.value)}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-primary/50" />
            </div>
            <div>
              <label className="block text-xs text-white/50 mb-1">Sort Order</label>
              <input type="number" value={form.sortOrder} onChange={(e) => set('sortOrder', parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-primary/50" />
            </div>
          </div>

          {/* Gallery Images */}
          <div>
            <label className="block text-xs text-white/50 mb-1.5">Gallery Images</label>
            <div className="grid grid-cols-3 gap-3">
              {(form.images || []).filter(img => img && !(form.removedImageIds || []).includes(img.id)).map((img) => (
                <div key={img.id} className="relative w-full h-24 rounded-xl overflow-hidden border border-white/10 group">
                  <img src={img.imageUrl} alt={img.altText || ''} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button type="button" onClick={() => removeExistingImage(img.id)}
                      className="p-1.5 rounded-lg bg-red-500/30 text-white hover:bg-red-500/50 transition-all">
                      <X size={14} />
                    </button>
                  </div>
                </div>
              ))}
              {(form.newGalleryFiles || []).map((file, i) => (
                <div key={`new-${i}`} className="relative w-full h-24 rounded-xl overflow-hidden border border-white/10 group">
                  <img src={URL.createObjectURL(file)} alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button type="button" onClick={() => removeNewGalleryFile(i)}
                      className="p-1.5 rounded-lg bg-red-500/30 text-white hover:bg-red-500/50 transition-all">
                      <X size={14} />
                    </button>
                  </div>
                </div>
              ))}
              <button type="button" onClick={() => galleryInputRef.current?.click()}
                className="w-full h-24 rounded-xl border-2 border-dashed border-white/10 hover:border-primary/50 transition-all bg-white/5 flex items-center justify-center text-white/40 hover:text-white/70">
                <Plus size={20} />
              </button>
            </div>
            <input ref={galleryInputRef} type="file" accept="image/*" multiple onChange={handleGalleryFiles} className="hidden" />
          </div>

          {/* SEO */}
          <details className="border border-white/10 rounded-xl p-3">
            <summary className="text-xs text-white/50 cursor-pointer hover:text-white/70">SEO Settings</summary>
            <div className="mt-3 space-y-3">
              <input placeholder="Meta Title" value={form.metaTitle} onChange={(e) => set('metaTitle', e.target.value)}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-primary/50" />
              <textarea placeholder="Meta Description" rows={2} value={form.metaDescription} onChange={(e) => set('metaDescription', e.target.value)}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-primary/50 resize-none" />
            </div>
          </details>

          {/* Published + Featured */}
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.isPublished} onChange={(e) => set('isPublished', e.target.checked)}
                className="w-4 h-4 rounded border-white/20 bg-white/5" />
              <span className="text-sm text-white/70">Published</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.isFeatured} onChange={(e) => set('isFeatured', e.target.checked)}
                className="w-4 h-4 rounded border-white/20 bg-white/5" />
              <span className="text-sm text-white/70">Featured</span>
            </label>
          </div>
        </div>
      </FormModal>

      <ConfirmDialog
        open={!!deleteId && !showForm}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Project"
        message="This will permanently delete this project. Are you sure?"
        loading={deleteMut.isPending}
      />
    </div>
  );
}
