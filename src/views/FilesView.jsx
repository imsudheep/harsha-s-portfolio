import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  FolderOpen, 
  Upload, 
  Lock, 
  Globe, 
  Trash2, 
  Eye, 
  Download,
  Plus
} from 'lucide-react';

export const FilesView = () => {
  const { files, addFile, updateFilePrivacy, deleteFile, projects } = useApp();
  const [activeFilter, setActiveFilter] = useState('ALL');

  const filteredFiles = files.filter(f => {
    if (activeFilter === 'ALL') return true;
    return f.privacy === activeFilter;
  });

  const handleUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      addFile({
        projectId: projects[0]?.id || '',
        fileName: file.name,
        fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        fileType: file.type || 'application/octet-stream',
        privacy: 'PRIVATE'
      });
    }
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', paddingBottom: '3rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: '800', fontFamily: 'var(--font-display)' }}>
            FILES VAULT
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            Private raw files & shared deliverable exports.
          </p>
        </div>

        <label className="btn-primary" style={{ cursor: 'pointer' }}>
          <Upload size={16} /> Upload File to My Space
          <input type="file" onChange={handleUpload} style={{ display: 'none' }} />
        </label>
      </div>

      {/* Privacy Filters */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem' }}>
        {[
          { id: 'ALL', label: 'ALL FILES' },
          { id: 'PRIVATE', label: 'PRIVATE (MY SPACE ONLY)' },
          { id: 'SHARED', label: 'SHARED WITH CLIENTS' },
          { id: 'CLIENT_UPLOADED', label: 'CLIENT UPLOADS' },
          { id: 'FINAL', label: 'FINAL EXPORTS' }
        ].map(filter => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            style={{
              fontSize: '0.75rem',
              fontWeight: activeFilter === filter.id ? '700' : '500',
              padding: '0.4rem 0.75rem',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: activeFilter === filter.id ? 'var(--bg-card-hover)' : 'transparent',
              color: activeFilter === filter.id ? 'var(--text-primary)' : 'var(--text-muted)',
              border: activeFilter === filter.id ? '1px solid var(--border-medium)' : '1px solid transparent'
            }}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Files Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {filteredFiles.length === 0 ? (
          <div className="card" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            No files found in this section.
          </div>
        ) : (
          filteredFiles.map(f => (
            <div
              key={f.id}
              className="card"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem',
                flexWrap: 'wrap',
                gap: '1rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                <FolderOpen size={22} style={{ color: 'var(--text-secondary)' }} />
                <div>
                  <div style={{ fontWeight: '700', fontSize: '0.95rem' }}>{f.fileName}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {f.fileSize} • Uploaded by {f.uploadedBy} on {f.uploadDate}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <select
                  value={f.privacy}
                  onChange={(e) => updateFilePrivacy(f.id, e.target.value)}
                  style={{
                    width: 'auto',
                    fontSize: '0.725rem',
                    padding: '0.2rem 0.5rem',
                    fontWeight: '600'
                  }}
                >
                  <option value="PRIVATE">🔒 PRIVATE</option>
                  <option value="SHARED">🌐 SHARED WITH CLIENT</option>
                  <option value="CLIENT_UPLOADED">📥 CLIENT UPLOADED</option>
                  <option value="FINAL">✓ FINAL EXPORT</option>
                </select>

                <button onClick={() => deleteFile(f.id)} className="btn-ghost" style={{ padding: '0.35rem', color: 'var(--status-blocked-text)' }}>
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
