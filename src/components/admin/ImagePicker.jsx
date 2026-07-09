import { useState, useRef } from 'react';
import { Upload, X, FileImage } from 'lucide-react';

export default function ImagePicker({ value, onChange, onRemove, accept = 'image/*', label = 'Upload Image', className = '' }) {
  const inputRef = useRef(null);
  const [preview, setPreview] = useState(value || null);

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      onChange?.(file);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    if (inputRef.current) inputRef.current.value = '';
    onRemove?.();
  };

  return (
    <div className={className}>
      {preview ? (
        <div className="relative w-full h-40 rounded-xl overflow-hidden border border-white/10 bg-white/5 group">
          <img src={preview} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <button type="button" onClick={() => inputRef.current?.click()}
              className="p-2 rounded-lg bg-white/20 text-white hover:bg-white/30 transition-all">
              <Upload size={16} />
            </button>
            <button type="button" onClick={handleRemove}
              className="p-2 rounded-lg bg-red-500/30 text-white hover:bg-red-500/50 transition-all">
              <X size={16} />
            </button>
          </div>
        </div>
      ) : (
        <button type="button" onClick={() => inputRef.current?.click()}
          className="w-full h-40 rounded-xl border-2 border-dashed border-white/10 hover:border-primary/50 transition-all bg-white/5 flex flex-col items-center justify-center gap-2 text-white/40 hover:text-white/70">
          <FileImage size={24} />
          <span className="text-xs">{label}</span>
        </button>
      )}
      <input ref={inputRef} type="file" accept={accept} onChange={handleFile} className="hidden" />
    </div>
  );
}
