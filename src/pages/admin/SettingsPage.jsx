import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { settingsApi } from '../../api/settings.api';
import { Save, Globe, Palette, Mail, Search, Code } from 'lucide-react';
import ImagePicker from '../../components/admin/ImagePicker';
import { useToast, ToastContainer } from '../../components/ui/Toast';

const TABS = [
  { id: 'company', icon: Globe, label: 'Company' },
  { id: 'branding', icon: Palette, label: 'Branding' },
  { id: 'social', icon: Mail, label: 'Social' },
  { id: 'seo', icon: Search, label: 'SEO' },
  { id: 'advanced', icon: Code, label: 'Advanced' },
];

const COMPANY_FIELDS = [
  { key: 'company_name', label: 'Company Name', type: 'text' },
  { key: 'company_email', label: 'Company Email', type: 'text' },
  { key: 'company_phone', label: 'Company Phone', type: 'text' },
  { key: 'company_address', label: 'Company Address', type: 'text' },
];

const SOCIAL_FIELDS = [
  { key: 'social_facebook', label: 'Facebook URL' },
  { key: 'social_instagram', label: 'Instagram URL' },
  { key: 'social_linkedin', label: 'LinkedIn URL' },
  { key: 'social_twitter', label: 'Twitter/X URL' },
];

const SEO_PAGES = [
  { slug: 'home', label: 'Home' },
  { slug: 'about', label: 'About' },
  { slug: 'services', label: 'Services' },
  { slug: 'portfolio', label: 'Portfolio' },
  { slug: 'contact', label: 'Contact' },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('company');
  const [settings, setSettings] = useState({});
  const [seoData, setSeoData] = useState({});
  const [activeSeoPage, setActiveSeoPage] = useState('home');
  const [validationErrors, setValidationErrors] = useState({});
  const qc = useQueryClient();
  const { toast, toasts, remove } = useToast();

  const { data, isLoading } = useQuery({
    queryKey: ['settings'],
    queryFn: () => settingsApi.getAll().then(r => r.data),
  });

  const { data: seoList } = useQuery({
    queryKey: ['settings', 'seo'],
    queryFn: () => settingsApi.getSeoList({ limit: 50 }).then(r => r.data),
  });

  useEffect(() => {
    if (data?.data?.grouped) {
      const flat = {};
      Object.values(data.data.grouped).forEach((group) => {
        Object.entries(group).forEach(([key, val]) => {
          flat[key] = val;
        });
      });
      setSettings(flat);
    }
    if (seoList?.data) {
      const map = {};
      seoList.data.forEach((s) => { map[s.pageSlug] = s; });
      setSeoData(map);
    }
  }, [data, seoList]);

  const bulkMut = useMutation({
    mutationFn: (payload) => settingsApi.bulkUpdate(payload).then(r => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['settings'] }),
  });

  const upsertSeoMut = useMutation({
    mutationFn: ({ pageSlug, payload }) => settingsApi.upsertPageSeo(pageSlug, payload).then(r => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['settings', 'seo'] }),
  });

  const validateEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const validateUrl = (v) => v === '' || /^https?:\/\/.+/.test(v);
  const validateGaId = (v) => v === '' || /^(UA-\d{4,}-\d|G-[A-Z0-9]{10,})$/.test(v);
  const validatePort = (v) => v === '' || /^\d{2,5}$/.test(v);

  const handleSaveSettings = () => {
    const errors = {};
    if (settings.company_email && !validateEmail(settings.company_email)) errors.company_email = 'Invalid email format';
    ['social_facebook', 'social_instagram', 'social_linkedin', 'social_twitter'].forEach(k => {
      if (settings[k] && !validateUrl(settings[k])) errors[k] = 'Must be a valid URL (https://...)';
    });
    if (settings.favicon_url && !validateUrl(settings.favicon_url)) errors.favicon_url = 'Must be a valid URL (https://...)';
    if (settings.google_analytics_id && !validateGaId(settings.google_analytics_id)) errors.google_analytics_id = 'Expected format: G-XXXXXXXXXX or UA-XXXXX-X';
    if (settings.smtp_port && !validatePort(settings.smtp_port)) errors.smtp_port = 'Must be a valid port number (2-5 digits)';
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      toast('Please fix the validation errors before saving', 'error');
      return;
    }
    setValidationErrors({});
    const items = Object.entries(settings).map(([key, value]) => ({ key, value }));
    bulkMut.mutate({ settings: items });
  };

  const handleSaveSeo = () => {
    const page = seoData[activeSeoPage];
    if (!page) { toast('No SEO data to save', 'error'); return; }
    const errors = {};
    if (page.canonicalUrl && !validateUrl(page.canonicalUrl)) errors.canonicalUrl = 'Must be a valid URL';
    if (page.ogImage && !validateUrl(page.ogImage)) errors.ogImage = 'Must be a valid URL';
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      toast('Please fix the validation errors before saving', 'error');
      return;
    }
    setValidationErrors({});
    upsertSeoMut.mutate({ pageSlug: activeSeoPage, payload: page });
    toast('SEO settings saved', 'success');
  };

  const seo = seoData[activeSeoPage] || {};

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Settings</h2>
          <p className="text-white/50 text-sm mt-1">Manage website configuration</p>
        </div>
      </div>

      <div className="flex gap-6">
        <div className="w-44 shrink-0 space-y-1">
          {TABS.map((t) => (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-all ${
                activeTab === t.id ? 'bg-primary/20 text-primary' : 'text-white/60 hover:bg-white/5 hover:text-white/80'
              }`}>
              <t.icon size={15} /> {t.label}
            </button>
          ))}
        </div>

        <div className="flex-1">
          {isLoading ? (
            <div className="flex items-center justify-center py-16"><div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" /></div>
          ) : (
            <div className="p-6 rounded-2xl bg-dark-card border border-white/10">
              {activeTab === 'company' && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Company Information</h3>
                    <button onClick={handleSaveSettings} disabled={bulkMut.isPending}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-all disabled:opacity-50">
                      {bulkMut.isPending ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save size={16} />}
                      Save
                    </button>
                  </div>
                  <div className="space-y-4">
                    {COMPANY_FIELDS.map((f) => (
                      <div key={f.key}>
                        <label className="block text-xs text-white/50 mb-1">{f.label}</label>
                        <input value={settings[f.key] || ''} onChange={(e) => { setSettings({ ...settings, [f.key]: e.target.value }); setValidationErrors(prev => ({ ...prev, [f.key]: undefined })); }}
                          className={`w-full px-3 py-2 bg-white/5 border rounded-xl text-sm text-white focus:outline-none ${validationErrors[f.key] ? 'border-red-500' : 'border-white/10 focus:border-primary/50'}`} />
                        {validationErrors[f.key] && <p className="text-xs text-red-400 mt-1">{validationErrors[f.key]}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'branding' && (
                <div>
                  <h3 className="font-bold text-white mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Branding</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs text-white/50 mb-1">Logo</label>
                      <ImagePicker value={settings.logo_url} onChange={(url) => setSettings({ ...settings, logo_url: url })} />
                    </div>
                    <div>
                      <label className="block text-xs text-white/50 mb-1">Favicon URL</label>
                      <input value={settings.favicon_url || ''} onChange={(e) => { setSettings({ ...settings, favicon_url: e.target.value }); setValidationErrors(prev => ({ ...prev, favicon_url: undefined })); }}
                        className={`w-full px-3 py-2 bg-white/5 border rounded-xl text-sm text-white focus:outline-none ${validationErrors.favicon_url ? 'border-red-500' : 'border-white/10 focus:border-primary/50'}`} />
                      {validationErrors.favicon_url && <p className="text-xs text-red-400 mt-1">{validationErrors.favicon_url}</p>}
                    </div>
                    <button onClick={handleSaveSettings} disabled={bulkMut.isPending}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-all disabled:opacity-50">
                      {bulkMut.isPending ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save size={16} />}
                      Save
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'social' && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Social Links</h3>
                    <button onClick={handleSaveSettings} disabled={bulkMut.isPending}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-all disabled:opacity-50">
                      {bulkMut.isPending ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save size={16} />}
                      Save
                    </button>
                  </div>
                  <div className="space-y-4">
                    {SOCIAL_FIELDS.map((f) => (
                      <div key={f.key}>
                        <label className="block text-xs text-white/50 mb-1">{f.label}</label>
                        <input value={settings[f.key] || ''} onChange={(e) => { setSettings({ ...settings, [f.key]: e.target.value }); setValidationErrors(prev => ({ ...prev, [f.key]: undefined })); }}
                          className={`w-full px-3 py-2 bg-white/5 border rounded-xl text-sm text-white focus:outline-none ${validationErrors[f.key] ? 'border-red-500' : 'border-white/10 focus:border-primary/50'}`} />
                        {validationErrors[f.key] && <p className="text-xs text-red-400 mt-1">{validationErrors[f.key]}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'seo' && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>SEO Settings</h3>
                    <button onClick={handleSaveSeo} disabled={upsertSeoMut.isPending}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-all disabled:opacity-50">
                      {upsertSeoMut.isPending ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save size={16} />}
                      Save Page SEO
                    </button>
                  </div>
                  <div className="flex gap-4 mb-4">
                    {SEO_PAGES.map((p) => (
                      <button key={p.slug} onClick={() => setActiveSeoPage(p.slug)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          activeSeoPage === p.slug ? 'bg-primary text-white' : 'bg-white/5 text-white/50 hover:bg-white/10'
                        }`}>
                        {p.label}
                      </button>
                    ))}
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs text-white/50 mb-1">Meta Title</label>
                      <input value={seo.metaTitle || ''} onChange={(e) => setSeoData({ ...seoData, [activeSeoPage]: { ...seo, metaTitle: e.target.value } })}
                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-primary/50" />
                    </div>
                    <div>
                      <label className="block text-xs text-white/50 mb-1">Meta Description</label>
                      <textarea rows={3} value={seo.metaDescription || ''} onChange={(e) => setSeoData({ ...seoData, [activeSeoPage]: { ...seo, metaDescription: e.target.value } })}
                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-primary/50 resize-none" />
                    </div>
                    <div>
                      <label className="block text-xs text-white/50 mb-1">Meta Keywords</label>
                      <input value={seo.metaKeywords || ''} onChange={(e) => setSeoData({ ...seoData, [activeSeoPage]: { ...seo, metaKeywords: e.target.value } })}
                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-primary/50" />
                    </div>
                    <div>
                      <label className="block text-xs text-white/50 mb-1">OG Image URL</label>
                      <input value={seo.ogImage || ''} onChange={(e) => { setSeoData({ ...seoData, [activeSeoPage]: { ...seo, ogImage: e.target.value } }); setValidationErrors(prev => ({ ...prev, ogImage: undefined })); }}
                        className={`w-full px-3 py-2 bg-white/5 border rounded-xl text-sm text-white focus:outline-none ${validationErrors.ogImage ? 'border-red-500' : 'border-white/10 focus:border-primary/50'}`} />
                      {validationErrors.ogImage && <p className="text-xs text-red-400 mt-1">{validationErrors.ogImage}</p>}
                    </div>
                    <div>
                      <label className="block text-xs text-white/50 mb-1">Canonical URL</label>
                      <input value={seo.canonicalUrl || ''} onChange={(e) => { setSeoData({ ...seoData, [activeSeoPage]: { ...seo, canonicalUrl: e.target.value } }); setValidationErrors(prev => ({ ...prev, canonicalUrl: undefined })); }}
                        className={`w-full px-3 py-2 bg-white/5 border rounded-xl text-sm text-white focus:outline-none ${validationErrors.canonicalUrl ? 'border-red-500' : 'border-white/10 focus:border-primary/50'}`} />
                      {validationErrors.canonicalUrl && <p className="text-xs text-red-400 mt-1">{validationErrors.canonicalUrl}</p>}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'advanced' && (
                <div>
                  <h3 className="font-bold text-white mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Advanced Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs text-white/50 mb-1">Google Analytics ID</label>
                      <input value={settings.google_analytics_id || ''} onChange={(e) => { setSettings({ ...settings, google_analytics_id: e.target.value }); setValidationErrors(prev => ({ ...prev, google_analytics_id: undefined })); }}
                        className={`w-full px-3 py-2 bg-white/5 border rounded-xl text-sm text-white focus:outline-none ${validationErrors.google_analytics_id ? 'border-red-500' : 'border-white/10 focus:border-primary/50'}`} placeholder="G-XXXXXXXXXX" />
                      {validationErrors.google_analytics_id && <p className="text-xs text-red-400 mt-1">{validationErrors.google_analytics_id}</p>}
                    </div>
                    <div>
                      <label className="block text-xs text-white/50 mb-1">SMTP Host</label>
                      <input value={settings.smtp_host || ''} onChange={(e) => setSettings({ ...settings, smtp_host: e.target.value })}
                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-primary/50" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-white/50 mb-1">SMTP Port</label>
                        <input value={settings.smtp_port || ''} onChange={(e) => { setSettings({ ...settings, smtp_port: e.target.value }); setValidationErrors(prev => ({ ...prev, smtp_port: undefined })); }}
                          className={`w-full px-3 py-2 bg-white/5 border rounded-xl text-sm text-white focus:outline-none ${validationErrors.smtp_port ? 'border-red-500' : 'border-white/10 focus:border-primary/50'}`} />
                        {validationErrors.smtp_port && <p className="text-xs text-red-400 mt-1">{validationErrors.smtp_port}</p>}
                      </div>
                      <div>
                        <label className="block text-xs text-white/50 mb-1">SMTP User</label>
                        <input value={settings.smtp_user || ''} onChange={(e) => setSettings({ ...settings, smtp_user: e.target.value })}
                          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-primary/50" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs text-white/50 mb-1">SMTP Password</label>
                      <input type="password" value={settings.smtp_pass || ''} onChange={(e) => setSettings({ ...settings, smtp_pass: e.target.value })}
                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-primary/50" />
                    </div>
                    <button onClick={handleSaveSettings} disabled={bulkMut.isPending}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-all disabled:opacity-50">
                      {bulkMut.isPending ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save size={16} />}
                      Save
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <ToastContainer toasts={toasts} remove={remove} />
    </div>
  );
}
