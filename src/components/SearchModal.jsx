import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Search, X, Users, FolderKanban, FileText, Video, ArrowRight } from 'lucide-react';

export const SearchModal = () => {
  const { 
    isSearchOpen, 
    setIsSearchOpen, 
    contacts, 
    projects, 
    documents,
    setActiveView,
    setSelectedProjectId,
    setSelectedContactId,
    setEditingDocument
  } = useApp();

  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  // Cmd+K / Ctrl+K keyboard shortcut handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const q = query.trim().toLowerCase();

  // Search Results Filtering
  const matchingContacts = q ? contacts.filter(c => 
    c.name.toLowerCase().includes(q) || 
    c.company.toLowerCase().includes(q) || 
    c.email.toLowerCase().includes(q)
  ) : [];

  const matchingProjects = q ? projects.filter(p => 
    p.name.toLowerCase().includes(q) || 
    p.service.toLowerCase().includes(q)
  ) : [];

  const matchingVideos = [];
  if (q) {
    projects.forEach(p => {
      p.deliverables.forEach(d => {
        if (d.title.toLowerCase().includes(q) || d.status.toLowerCase().includes(q)) {
          matchingVideos.push({ ...d, projectName: p.name, projectId: p.id });
        }
      });
    });
  }

  const matchingDocuments = q ? documents.filter(d => 
    d.title.toLowerCase().includes(q) || 
    d.docNumber?.toLowerCase().includes(q) || 
    d.type.toLowerCase().includes(q)
  ) : [];

  const hasResults = matchingContacts.length > 0 || matchingProjects.length > 0 || matchingVideos.length > 0 || matchingDocuments.length > 0;

  return (
    <div 
      className="modal-overlay no-print"
      onClick={() => setIsSearchOpen(false)}
    >
      <div 
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '560px',
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-medium)',
          borderRadius: 'var(--radius-md)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
          overflow: 'hidden'
        }}
      >
        {/* Search Input Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '1rem 1.25rem',
          borderBottom: '1px solid var(--border-subtle)'
        }}>
          <Search size={18} style={{ color: 'var(--text-muted)' }} />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search clients, projects, videos, documents..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              padding: 0,
              fontSize: '0.95rem',
              color: 'var(--text-primary)'
            }}
          />
          <button onClick={() => setIsSearchOpen(false)} className="btn-ghost" style={{ padding: '0.2rem' }}>
            <X size={16} />
          </button>
        </div>

        {/* Results Container */}
        <div style={{ maxHeight: '380px', overflowY: 'auto', padding: '0.75rem' }}>
          {!q && (
            <div style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.825rem' }}>
              Type a client name, project, video episode, or invoice number...
            </div>
          )}

          {q && !hasResults && (
            <div style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              No results found for "{query}".
            </div>
          )}

          {/* Contacts Section */}
          {matchingContacts.length > 0 && (
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: '700', letterSpacing: '0.08em', color: 'var(--text-muted)', padding: '0.375rem 0.5rem' }}>
                CLIENTS
              </div>
              {matchingContacts.map(c => (
                <div
                  key={c.id}
                  onClick={() => {
                    setSelectedContactId(c.id);
                    setActiveView('CONTACTS');
                    setIsSearchOpen(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.5rem 0.75rem',
                    borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer'
                  }}
                  className="btn-ghost"
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                    <Users size={15} style={{ color: 'var(--text-secondary)' }} />
                    <div>
                      <div style={{ fontWeight: '600', fontSize: '0.85rem' }}>{c.name}</div>
                      <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>{c.company} • {c.email}</div>
                    </div>
                  </div>
                  <ArrowRight size={14} style={{ color: 'var(--text-muted)' }} />
                </div>
              ))}
            </div>
          )}

          {/* Projects Section */}
          {matchingProjects.length > 0 && (
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: '700', letterSpacing: '0.08em', color: 'var(--text-muted)', padding: '0.375rem 0.5rem' }}>
                PROJECTS
              </div>
              {matchingProjects.map(p => (
                <div
                  key={p.id}
                  onClick={() => {
                    setSelectedProjectId(p.id);
                    setActiveView('PROJECT_DETAIL');
                    setIsSearchOpen(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.5rem 0.75rem',
                    borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer'
                  }}
                  className="btn-ghost"
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                    <FolderKanban size={15} style={{ color: 'var(--text-secondary)' }} />
                    <div>
                      <div style={{ fontWeight: '600', fontSize: '0.85rem' }}>{p.name}</div>
                      <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>{p.service} • {p.deliverables?.length || 0} videos</div>
                    </div>
                  </div>
                  <ArrowRight size={14} style={{ color: 'var(--text-muted)' }} />
                </div>
              ))}
            </div>
          )}

          {/* Videos Section */}
          {matchingVideos.length > 0 && (
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: '700', letterSpacing: '0.08em', color: 'var(--text-muted)', padding: '0.375rem 0.5rem' }}>
                VIDEOS / DELIVERABLES
              </div>
              {matchingVideos.map(v => (
                <div
                  key={v.id}
                  onClick={() => {
                    setSelectedProjectId(v.projectId);
                    setActiveView('PROJECT_DETAIL');
                    setIsSearchOpen(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.5rem 0.75rem',
                    borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer'
                  }}
                  className="btn-ghost"
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                    <Video size={15} style={{ color: 'var(--text-secondary)' }} />
                    <div>
                      <div style={{ fontWeight: '600', fontSize: '0.85rem' }}>{v.title}</div>
                      <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>Project: {v.projectName}</div>
                    </div>
                  </div>
                  <span className={`badge badge-${v.status.toLowerCase().replace(' ', '')}`}>
                    {v.status}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Documents Section */}
          {matchingDocuments.length > 0 && (
            <div>
              <div style={{ fontSize: '0.7rem', fontWeight: '700', letterSpacing: '0.08em', color: 'var(--text-muted)', padding: '0.375rem 0.5rem' }}>
                DOCUMENTS
              </div>
              {matchingDocuments.map(d => (
                <div
                  key={d.id}
                  onClick={() => {
                    setEditingDocument(d);
                    setActiveView('DOCUMENT_EDITOR');
                    setIsSearchOpen(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.5rem 0.75rem',
                    borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer'
                  }}
                  className="btn-ghost"
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                    <FileText size={15} style={{ color: 'var(--text-secondary)' }} />
                    <div>
                      <div style={{ fontWeight: '600', fontSize: '0.85rem' }}>{d.title}</div>
                      <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>{d.type} • {d.date}</div>
                    </div>
                  </div>
                  <ArrowRight size={14} style={{ color: 'var(--text-muted)' }} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
