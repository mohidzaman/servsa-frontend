import { useState, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { servicesApi } from '../../api/services.api';
import { mediaApi } from '../../api/media.api';
import {
  Plus, Edit3, Trash2, Eye, EyeOff, Star, FolderPlus,
  Save, FileText, Loader2, Upload, X, FileImage
} from 'lucide-react';
import DataTable from '../../components/admin/DataTable';
import StatusBadge from '../../components/admin/StatusBadge';
import FormModal from '../../components/admin/FormModal';
import ConfirmDialog from '../../components/admin/ConfirmDialog';
import { useToast, ToastContainer } from '../../components/ui/Toast';

const emptyForm = {
  title: '', shortDescription: '', fullDescription: '', features: [],
  imageUrl: '', imageFile: null, icon: 'Briefcase', categoryId: '',
  metaTitle: '', metaDescription: '', metaKeywords: '',
  isPublished: true, isFeatured: false, sortOrder: 0,
};

const validate = (form) => {
  const errs = {};
  if (!form.title?.trim()) errs.title = 'Title is required';
  else if (form.title.length > 255) errs.title = 'Max 255 characters';
  if (!form.categoryId) errs.categoryId = 'Category is required';
  if (form.shortDescription?.length > 500) errs.shortDescription = 'Max 500 characters';
  if (form.icon?.length > 100) errs.icon = 'Max 100 characters';
  if (form.imageUrl && form.imageUrl.startsWith('http') && !/^https?:\/\/.+/.test(form.imageUrl)) {
    errs.imageUrl = 'Invalid image URL';
  }
  if (form.imageFile && form.imageFile.size > 10 * 1024 * 1024) {
    errs.imageUrl = 'Image must be under 10MB';
  }
  if (form.metaTitle?.length > 255) errs.metaTitle = 'Max 255 characters';
  return errs;
};

export default function ServicesPage() {
  const [editItem, setEditItem] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showCatModal, setShowCatModal] = useState(false);
  const [deleteCatId, setDeleteCatId] = useState(null);
  const [catName, setCatName] = useState('');
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const imageInputRef = useRef(null);
  const { toasts, toast, remove } = useToast();
  const qc = useQueryClient();

  const { data: servicesData, isLoading } = useQuery({
    queryKey: ['services', 'list'],
    queryFn: () => servicesApi.getAll({ limit: 100 }).then(r => r.data),
  });
  const { data: catsData } = useQuery({
    queryKey: ['services', 'categories'],
    queryFn: () => servicesApi.getCategories().then(r => r.data),
  });

  const services = servicesData?.data || [];
  const categories = catsData?.data || [];

  const invalidate = () => {
    qc.invalidateQueries({ queryKey: ['services', 'list'] });
    qc.invalidateQueries({ queryKey: ['services', 'categories'] });
  };

  const createMut = useMutation({
    mutationFn: (data) => servicesApi.create(data).then(r => r.data),
    onSuccess: () => invalidate(),
  });
  const updateMut = useMutation({
    mutationFn: ({ id, data }) => servicesApi.update(id, data).then(r => r.data),
    onSuccess: () => invalidate(),
  });
  const deleteMut = useMutation({
    mutationFn: (id) => servicesApi.delete(id).then(r => r.data),
    onSuccess: () => { invalidate(); setDeleteId(null); },
  });
  const togglePub = useMutation({
    mutationFn: (id) => servicesApi.togglePublish(id).then(r => r.data),
    onSuccess: () => invalidate(),
  });
  const toggleFeat = useMutation({
    mutationFn: (id) => servicesApi.toggleFeatured(id).then(r => r.data),
    onSuccess: () => invalidate(),
  });
  const createCat = useMutation({
    mutationFn: (data) => servicesApi.createCategory(data).then(r => r.data),
    onSuccess: () => { invalidate(); setCatName(''); setShowCatModal(false); },
  });
  const deleteCat = useMutation({
    mutationFn: (id) => servicesApi.deleteCategory(id).then(r => r.data),
    onSuccess: () => { invalidate(); setDeleteCatId(null); },
  });

  const uploadFile = async (file) => {
    const fd = new FormData();
    fd.append('file', file);
    const res = await mediaApi.upload(fd);
    return res.data?.fileUrl || res.data?.url || res.data?.data?.url;
  };

  const doSave = async (publishedOverride) => {
    const isPublished = publishedOverride !== undefined ? publishedOverride : form.isPublished;
    const fieldErrors = validate({ ...form, isPublished });
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) {
      toast('Please fix the validation errors', 'error');
      return;
    }

    setSaving(true);
    try {
      let imageUrl = form.imageUrl;
      if (form.imageFile) {
        imageUrl = await uploadFile(form.imageFile);
      }

      const payload = {
        title: form.title,
        shortDescription: form.shortDescription,
        fullDescription: form.fullDescription,
        features: form.features,
        icon: form.icon,
        categoryId: form.categoryId,
        metaTitle: form.metaTitle,
        metaDescription: form.metaDescription,
        metaKeywords: form.metaKeywords,
        isPublished,
        isFeatured: form.isFeatured,
        sortOrder: form.sortOrder,
        imageUrl: imageUrl || null,
      };

      if (editItem) {
        await updateMut.mutateAsync({ id: editItem.id, data: payload });
      } else {
        await createMut.mutateAsync(payload);
      }

      toast(editItem ? 'Service updated successfully' : 'Service created successfully', 'success');
      setShowForm(false);
    } catch (err) {
      toast(err?.response?.data?.message || 'Save failed. Please try again.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveService = () => doSave(undefined);
  const handleSaveDraft = () => doSave(false);

  const handleDelete = async () => {
    try {
      await deleteMut.mutateAsync(deleteId);
      toast('Service deleted', 'success');
    } catch {
      toast('Failed to delete service', 'error');
    }
  };

  const set = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

  const openCreate = () => {
    setEditItem(null);
    setForm(emptyForm);
    setErrors({});
    setShowForm(true);
  };
  const openEdit = (item) => {
    setEditItem(item);
    setForm({ ...emptyForm, ...item, features: item.features || [], imageFile: null, imageUrl: item.imageUrl || '' });
    setErrors({});
    setShowForm(true);
  };

  const handleImageFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      toast('Image must be under 10MB', 'error');
      if (imageInputRef.current) imageInputRef.current.value = '';
      return;
    }
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowed.includes(file.type)) {
      toast('Only JPG, PNG, WebP, and GIF images are allowed', 'error');
      if (imageInputRef.current) imageInputRef.current.value = '';
      return;
    }
    setForm(prev => ({ ...prev, imageFile: file, imageUrl: URL.createObjectURL(file) }));
  };
  const removeImage = () => {
    setForm(prev => ({ ...prev, imageFile: null, imageUrl: '' }));
    if (imageInputRef.current) imageInputRef.current.value = '';
  };

  const columns = [
    { header: 'Title', accessor: 'title', cell: (r) => <span className="font-medium text-white">{r.title}</span> },
    {
      header: 'Category', accessor: 'categoryId',
      cell: (r) => {
        const cat = categories.find(c => c.id === r.categoryId);
        return <span className="text-white/60 text-xs">{cat?.name || '—'}</span>;
      },
    },
    { header: 'Status', accessor: 'isPublished', cell: (r) => r.isPublished ? <StatusBadge status="published" /> : <StatusBadge status="draft" /> },
    { header: 'Featured', accessor: 'isFeatured', cell: (r) => r.isFeatured ? <Star size={14} className="text-yellow-400 fill-yellow-400" /> : null },
    { header: 'Order', accessor: 'sortOrder', cell: (r) => <span className="text-white/40 text-xs">{r.sortOrder}</span> },
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
          <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Services</h2>
          <p className="text-white/50 text-sm mt-1">Manage service offerings and categories</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setShowCatModal(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 text-white/70 text-sm hover:bg-white/20 transition-all">
            <FolderPlus size={15} /> Categories
          </button>
          <button onClick={openCreate}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-all">
            <Plus size={16} /> Add Service
          </button>
        </div>
      </div>

      <DataTable columns={columns} data={services} isLoading={isLoading}
        searchPlaceholder="Search services..." emptyTitle="No services yet"
        emptyDescription="Create your first service to get started." onRowClick={(r) => openEdit(r)} />

      <FormModal
        open={showForm}
        onClose={() => { if (!saving) setShowForm(false); }}
        title={editItem ? 'Edit Service' : 'Create Service'}
        maxWidth="lg"
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
            <button onClick={(e) => { e.stopPropagation(); handleSaveService(); }}
              disabled={saving}
              className="px-5 py-2 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-all disabled:opacity-50 flex items-center gap-2">
              {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
              {editItem ? 'Update Service' : 'Save Service'}
            </button>
          </>
        }
      >
        <div className="space-y-4">
          {/* Image */}
          <div>
            <label className="block text-xs text-white/50 mb-1.5">Image</label>
            {form.imageUrl ? (
              <div className="relative w-full h-44 rounded-xl overflow-hidden border border-white/10 bg-white/5 group">
                <img src={form.imageUrl} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <button type="button" onClick={() => imageInputRef.current?.click()}
                    className="p-2 rounded-lg bg-white/20 text-white hover:bg-white/30 transition-all"><Upload size={16} /></button>
                  <button type="button" onClick={removeImage}
                    className="p-2 rounded-lg bg-red-500/30 text-white hover:bg-red-500/50 transition-all"><X size={16} /></button>
                </div>
              </div>
            ) : (
              <button type="button" onClick={() => imageInputRef.current?.click()}
                className="w-full h-44 rounded-xl border-2 border-dashed border-white/10 hover:border-primary/50 transition-all bg-white/5 flex flex-col items-center justify-center gap-2 text-white/40 hover:text-white/70">
                <FileImage size={28} />
                <span className="text-xs">Click to upload image</span>
              </button>
            )}
            <input ref={imageInputRef} type="file" accept="image/*" onChange={handleImageFile} className="hidden" />
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
              <select value={form.categoryId} onChange={(e) => set('categoryId', e.target.value)}
                className={`w-full px-3 py-2 bg-white/5 border rounded-xl text-sm text-white focus:outline-none focus:border-primary/50 ${errors.categoryId ? 'border-red-500/50' : 'border-white/10'}`}>
                <option value="">Select category</option>
                {(categories || []).map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              {errors.categoryId && <p className="text-xs text-red-400 mt-1">{errors.categoryId}</p>}
            </div>
          </div>

          {/* Short Description */}
          <div>
            <label className="block text-xs text-white/50 mb-1">Short Description</label>
            <input value={form.shortDescription} onChange={(e) => set('shortDescription', e.target.value)}
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-primary/50" />
          </div>

          {/* Full Description */}
          <div>
            <label className="block text-xs text-white/50 mb-1">Full Description</label>
            <textarea rows={4} value={form.fullDescription} onChange={(e) => set('fullDescription', e.target.value)}
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-primary/50 resize-none" />
          </div>

          {/* Features */}
          <div>
            <label className="block text-xs text-white/50 mb-1">Features (one per line)</label>
            <textarea rows={3} value={(form.features || []).join('\n')}
              onChange={(e) => set('features', e.target.value.split('\n').filter(Boolean))}
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-primary/50 resize-none" />
          </div>

          {/* Icon + Sort */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-white/50 mb-1">Icon</label>
              <input value={form.icon} onChange={(e) => set('icon', e.target.value)}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-primary/50" />
            </div>
            <div>
              <label className="block text-xs text-white/50 mb-1">Sort Order</label>
              <input type="number" value={form.sortOrder} onChange={(e) => set('sortOrder', parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-primary/50" />
            </div>
          </div>

          {/* SEO */}
          <details className="border border-white/10 rounded-xl p-3">
            <summary className="text-xs text-white/50 cursor-pointer hover:text-white/70">SEO Settings</summary>
            <div className="mt-3 space-y-3">
              <input placeholder="Meta Title" value={form.metaTitle} onChange={(e) => set('metaTitle', e.target.value)}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-primary/50" />
              <textarea placeholder="Meta Description" rows={2} value={form.metaDescription} onChange={(e) => set('metaDescription', e.target.value)}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-primary/50 resize-none" />
              <input placeholder="Meta Keywords" value={form.metaKeywords} onChange={(e) => set('metaKeywords', e.target.value)}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-primary/50" />
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

      <FormModal open={showCatModal} onClose={() => setShowCatModal(false)} title="Manage Categories" maxWidth="sm">
        <div className="space-y-4">
          <div className="flex gap-2">
            <input placeholder="Category name" value={catName} onChange={(e) => setCatName(e.target.value)}
              className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-primary/50" />
            <button onClick={() => { if (catName.trim()) createCat.mutate({ name: catName }); }}
              disabled={createCat.isPending}
              className="px-4 py-2 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-all disabled:opacity-50 flex items-center gap-2">
              {createCat.isPending ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
              Add
            </button>
          </div>
          {categories.length === 0 ? (
            <p className="text-sm text-white/40 py-4 text-center">No categories yet</p>
          ) : (
            <div className="space-y-1">
              {(categories || []).map((c) => (
                <div key={c.id} className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                  <div>
                    <span className="text-sm text-white/80">{c.name}</span>
                    <span className="text-xs text-white/40 ml-2">({c._count?.services || 0} services)</span>
                  </div>
                  <button onClick={() => setDeleteCatId(c.id)}
                    className="p-1 rounded hover:bg-red-500/20 text-white/40 hover:text-red-400 transition-all">
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </FormModal>

      <ConfirmDialog open={!!deleteCatId} onClose={() => setDeleteCatId(null)}
        onConfirm={() => deleteCat.mutate(deleteCatId)} title="Delete Category"
        message="Are you sure? Categories with services cannot be deleted." loading={deleteCat.isPending} />

      <ConfirmDialog open={!!deleteId && !showForm} onClose={() => setDeleteId(null)}
        onConfirm={handleDelete} title="Delete Service"
        message="This will permanently delete this service. Are you sure?" loading={deleteMut.isPending} />
    </div>
  );
}
