import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Users, FolderKanban, Plus, X } from 'lucide-react';

export const SpaceSwitcherModal = () => {
  const { 
    isCreateSpaceOpen, 
    setIsCreateSpaceOpen, 
    contacts, 
    projects, 
    profile, 
    createSharedSpace 
  } = useApp();

  const [selectedContactId, setSelectedContactId] = useState(contacts[0]?.id || '');
  const [selectedProjectId, setSelectedProjectId] = useState(projects[0]?.id || '');
  const [spaceName, setSpaceName] = useState('');

  if (!isCreateSpaceOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const contact = contacts.find(c => c.id === selectedContactId);
    createSharedSpace({
      name: spaceName || `${contact?.name || 'Client'} × ${profile.fullName}`,
      contactId: selectedContactId,
      projectId: selectedProjectId
    });
    setIsCreateSpaceOpen(false);
  };

  return (
    <div className="modal-overlay no-print" onClick={() => setIsCreateSpaceOpen(false)}>
      <div className="card" onClick={e => e.stopPropagation()} style={{ width: '100%', maxWidth: '480px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: '700' }}>Create Shared Space</h2>
            <p style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>
              Collaborative digital office shared between you and your client.
            </p>
          </div>
          <button onClick={() => setIsCreateSpaceOpen(false)} className="btn-ghost" style={{ padding: '0.25rem' }}>
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>
              SELECT CLIENT / COLLABORATOR *
            </label>
            <select
              value={selectedContactId}
              onChange={e => {
                setSelectedContactId(e.target.value);
                const firstProj = projects.find(p => p.contactId === e.target.value);
                if (firstProj) setSelectedProjectId(firstProj.id);
              }}
              required
            >
              {contacts.map(c => (
                <option key={c.id} value={c.id}>{c.name} ({c.company})</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>
              ASSOCIATED PROJECT (OPTIONAL)
            </label>
            <select
              value={selectedProjectId}
              onChange={e => setSelectedProjectId(e.target.value)}
            >
              <option value="">No linked project</option>
              {projects.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>
              SHARED SPACE NAME (OPTIONAL)
            </label>
            <input
              type="text"
              placeholder={`e.g. ${contacts.find(c => c.id === selectedContactId)?.name || 'Client'} × ${profile.fullName}`}
              value={spaceName}
              onChange={e => setSpaceName(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
            <button type="button" onClick={() => setIsCreateSpaceOpen(false)} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              <Plus size={14} /> Create Space
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
