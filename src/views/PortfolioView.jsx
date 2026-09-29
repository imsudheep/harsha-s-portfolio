import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Briefcase, Plus, Eye, Globe, Lock, Trash2, Edit2 } from 'lucide-react';

export const PortfolioView = () => {
  const { portfolio, addPortfolioItem, updatePortfolioItem, deletePortfolioItem } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [title, setTitle] = useState('');
  const [clientName, setClientName] = useState('');
  const [category, setCategory] = useState('Video Editing');
  const [description, setDescription] = useState('');
  const [visibility, setVisibility] = useState('PUBLIC');

  const openNewModal = () => {
    setEditingId(null);
    setTitle('');
    setClientName('');
    setCategory('Video Editing');
    setDescription('');
    setVisibility('PUBLIC');
    setIsModalOpen(true);
  };

  const openEditModal = (p) => {
    setEditingId(p.id);
    setTitle(p.title || '');
    setClientName(p.clientName || '');
    setCategory(p.category || 'Video Editing');
    setDescription(p.description || '');
    setVisibility(p.visibility || 'PUBLIC');
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const payload = { title, clientName, category, description, visibility };
    if (editingId) {
      updatePortfolioItem(editingId, payload);
    } else {
      addPortfolioItem(payload);
    }
    setIsModalOpen(false);
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', paddingBottom: '3rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: '800', fontFamily: 'var(--font-display)' }}>
            PORTFOLIO SHOWCASE
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            Showcase your best client work with customizable access controls.
          </p>
        </div>

        <button onClick={openNewModal} className="btn-primary">
          <Plus size={16} /> ADD PORTFOLIO ITEM
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
        {portfolio.map(item => (
          <div key={item.id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.625rem' }}>
                <span className="badge badge-queue">{item.category}</span>
                <span style={{ fontSize: '0.725rem', fontWeight: '600', color: item.visibility === 'PUBLIC' ? '#4ADE80' : 'var(--text-muted)' }}>
                  {item.visibility === 'PUBLIC' ? '🌐 PUBLIC' : item.visibility === 'SHARED' ? '🤝 SHARED' : '🔒 PRIVATE'}
                </span>
              </div>

              <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginBottom: '0.25rem' }}>{item.title}</h3>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.875rem' }}>
                Client: <strong>{item.clientName}</strong>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{item.description}</p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)' }}>
              <button onClick={() => openEditModal(item)} className="btn-ghost" style={{ padding: '0.3rem' }}>
                <Edit2 size={14} /> Edit
              </button>
              <button onClick={() => deletePortfolioItem(item.id)} className="btn-ghost" style={{ padding: '0.3rem', color: 'var(--status-blocked-text)' }}>
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="card" onClick={e => e.stopPropagation()} style={{ width: '100%', maxWidth: '480px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1rem' }}>
              {editingId ? 'Edit Portfolio Item' : 'Add Portfolio Item'}
            </h3>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>PROJECT TITLE *</label>
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} required />
              </div>
              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>CLIENT NAME</label>
                <input type="text" value={clientName} onChange={e => setClientName(e.target.value)} />
              </div>
              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>CATEGORY</label>
                <input type="text" value={category} onChange={e => setCategory(e.target.value)} />
              </div>
              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>DESCRIPTION</label>
                <textarea rows={3} value={description} onChange={e => setDescription(e.target.value)} />
              </div>
              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>VISIBILITY</label>
                <select value={visibility} onChange={e => setVisibility(e.target.value)}>
                  <option value="PUBLIC">PUBLIC (Everyone with link)</option>
                  <option value="SHARED">SHARED (Shared Spaces only)</option>
                  <option value="PRIVATE">PRIVATE (My Space only)</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn-secondary">Cancel</button>
                <button type="submit" className="btn-primary">Save Item</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
