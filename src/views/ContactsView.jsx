import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Users, 
  Plus, 
  Mail, 
  Phone, 
  Instagram, 
  Linkedin, 
  Globe, 
  FolderKanban,
  Edit2,
  Trash2,
  Calendar
} from 'lucide-react';

export const ContactsView = () => {
  const { 
    contacts, 
    projects, 
    addContact, 
    updateContact, 
    deleteContact,
    setSelectedProjectId,
    setActiveView
  } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingContactId, setEditingContactId] = useState(null);

  // Form State
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [instagram, setInstagram] = useState('');
  const [linkedIn, setLinkedIn] = useState('');
  const [website, setWebsite] = useState('');
  const [notes, setNotes] = useState('');
  const [lastContacted, setLastContacted] = useState(new Date().toISOString().split('T')[0]);
  const [nextFollowUp, setNextFollowUp] = useState('');

  const openNewModal = () => {
    setEditingContactId(null);
    setName('');
    setCompany('');
    setRole('');
    setEmail('');
    setPhone('');
    setInstagram('');
    setLinkedIn('');
    setWebsite('');
    setNotes('');
    setLastContacted(new Date().toISOString().split('T')[0]);
    setNextFollowUp('');
    setIsModalOpen(true);
  };

  const openEditModal = (c) => {
    setEditingContactId(c.id);
    setName(c.name || '');
    setCompany(c.company || '');
    setRole(c.role || '');
    setEmail(c.email || '');
    setPhone(c.phone || '');
    setInstagram(c.instagram || '');
    setLinkedIn(c.linkedIn || '');
    setWebsite(c.website || '');
    setNotes(c.notes || '');
    setLastContacted(c.lastContacted || '');
    setNextFollowUp(c.nextFollowUp || '');
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const payload = {
      name,
      company,
      role,
      email,
      phone,
      instagram,
      linkedIn,
      website,
      notes,
      lastContacted,
      nextFollowUp
    };

    if (editingContactId) {
      updateContact(editingContactId, payload);
    } else {
      addContact(payload);
    }

    setIsModalOpen(false);
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', paddingBottom: '3rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: '800', fontFamily: 'var(--font-display)' }}>
            CLIENT CONTACTS
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            Lightweight client database for your freelance video projects.
          </p>
        </div>

        <button onClick={openNewModal} className="btn-primary">
          <Plus size={16} /> ADD CLIENT
        </button>
      </div>

      {contacts.length === 0 ? (
        <div className="card" style={{ padding: '3rem', textAlign: 'center' }}>
          <Users size={36} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.5rem' }}>No clients yet.</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
            Add a client to start organizing your projects and documents.
          </p>
          <button onClick={openNewModal} className="btn-primary">
            <Plus size={16} /> Add Your First Client
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(330px, 1fr))', gap: '1.25rem' }}>
          {contacts.map(c => {
            const clientProjects = projects.filter(p => p.contactId === c.id);

            return (
              <div key={c.id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  {/* Top Bar */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                    <div>
                      <h3 style={{ fontSize: '1.2rem', fontWeight: '700' }}>{c.name}</h3>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        {c.role ? `${c.role} at ` : ''}<strong>{c.company || 'Independent'}</strong>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.25rem' }}>
                      <button onClick={() => openEditModal(c)} className="btn-ghost" style={{ padding: '0.25rem' }}>
                        <Edit2 size={14} />
                      </button>
                      <button onClick={() => deleteContact(c.id)} className="btn-ghost" style={{ padding: '0.25rem', color: 'var(--status-blocked-text)' }}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Contact Info Pills */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                    {c.email && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Mail size={13} style={{ color: 'var(--text-muted)' }} />
                        <a href={`mailto:${c.email}`} style={{ color: 'inherit', textDecoration: 'none' }}>{c.email}</a>
                      </div>
                    )}
                    {c.phone && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Phone size={13} style={{ color: 'var(--text-muted)' }} />
                        <span>{c.phone}</span>
                      </div>
                    )}
                    {c.instagram && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Instagram size={13} style={{ color: 'var(--text-muted)' }} />
                        <span>{c.instagram}</span>
                      </div>
                    )}
                  </div>

                  {/* Notes Callout */}
                  {c.notes && (
                    <div style={{
                      backgroundColor: 'var(--bg-main)',
                      padding: '0.625rem 0.875rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-subtle)',
                      fontSize: '0.775rem',
                      color: 'var(--text-muted)',
                      marginBottom: '1rem'
                    }}>
                      "{c.notes}"
                    </div>
                  )}

                  {/* Connected Projects */}
                  <div style={{ marginBottom: '1rem' }}>
                    <div style={{ fontSize: '0.7rem', fontWeight: '700', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '0.375rem' }}>
                      CONNECTED PROJECTS ({clientProjects.length})
                    </div>
                    {clientProjects.length === 0 ? (
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>No projects linked yet.</span>
                    ) : (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                        {clientProjects.map(p => (
                          <span
                            key={p.id}
                            onClick={() => {
                              setSelectedProjectId(p.id);
                              setActiveView('PROJECT_DETAIL');
                            }}
                            style={{
                              fontSize: '0.725rem',
                              padding: '0.2rem 0.5rem',
                              backgroundColor: 'var(--bg-elevated)',
                              borderRadius: '4px',
                              border: '1px solid var(--border-subtle)',
                              cursor: 'pointer'
                            }}
                            className="btn-ghost"
                          >
                            <FolderKanban size={11} /> {p.name}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Dates */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  paddingTop: '0.75rem',
                  borderTop: '1px solid var(--border-subtle)',
                  fontSize: '0.725rem',
                  color: 'var(--text-muted)'
                }}>
                  <span>Last contacted: {c.lastContacted || 'N/A'}</span>
                  <span>Follow-up: {c.nextFollowUp || 'N/A'}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add / Edit Client Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="card" onClick={e => e.stopPropagation()} style={{ width: '100%', maxWidth: '520px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1rem' }}>
              {editingContactId ? 'Edit Client' : 'Add New Client'}
            </h2>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>CLIENT NAME *</label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Rahul Sharma" required />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>COMPANY / BRAND</label>
                  <input type="text" value={company} onChange={e => setCompany(e.target.value)} placeholder="ABC Media" />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>ROLE / TITLE</label>
                  <input type="text" value={role} onChange={e => setRole(e.target.value)} placeholder="Founder" />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>EMAIL ADDRESS</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="rahul@example.com" />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>PHONE / WHATSAPP</label>
                  <input type="text" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+91 98765 43210" />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>INSTAGRAM</label>
                  <input type="text" value={instagram} onChange={e => setInstagram(e.target.value)} placeholder="@rahulsharma" />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>NOTES / EDITING PREFERENCES</label>
                <textarea rows={2} value={notes} onChange={e => setNotes(e.target.value)} placeholder="Client prefers fast cuts, clean captions, bold color grading..." />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>LAST CONTACTED</label>
                  <input type="date" value={lastContacted} onChange={e => setLastContacted(e.target.value)} />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>NEXT FOLLOW-UP</label>
                  <input type="date" value={nextFollowUp} onChange={e => setNextFollowUp(e.target.value)} />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  {editingContactId ? 'Save Changes' : 'Add Client'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
