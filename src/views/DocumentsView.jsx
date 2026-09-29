import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  FileText, 
  Plus, 
  Copy, 
  Trash2, 
  Edit3, 
  Search
} from 'lucide-react';

export const DocumentsView = () => {
  const { 
    documents, 
    contacts, 
    projects, 
    duplicateDocument, 
    deleteDocument, 
    setEditingDocument, 
    setActiveView 
  } = useApp();

  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const docTypes = [
    'All',
    'Invoice',
    'Welcome Note',
    'Proposal',
    'Quotation',
    'Agreement',
    'Project Delivery Note',
    'Payment Receipt',
    'Thank You Note'
  ];

  // Filter logic
  const filteredDocs = documents.filter(doc => {
    const matchesTab = activeTab === 'All' || doc.type === activeTab;
    const client = contacts.find(c => c.id === doc.contactId);
    const proj = projects.find(p => p.id === doc.projectId);
    const q = searchQuery.toLowerCase();

    const matchesSearch = !q || 
      doc.title.toLowerCase().includes(q) || 
      doc.type.toLowerCase().includes(q) ||
      (doc.docNumber && doc.docNumber.toLowerCase().includes(q)) ||
      (client && client.name.toLowerCase().includes(q)) ||
      (proj && proj.name.toLowerCase().includes(q));

    return matchesTab && matchesSearch;
  });

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', paddingBottom: '3rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: '800', fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
            DOCUMENTS HUB
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Invoices, Proposals, Agreements, and Delivery Notes written once &amp; organized automatically.
          </p>
        </div>

        <button 
          onClick={() => {
            setEditingDocument({
              type: 'Invoice',
              title: 'New Invoice',
              date: new Date().toISOString().split('T')[0],
              contactId: contacts[0]?.id || '',
              projectId: projects[0]?.id || '',
              items: [{ id: 'i1', description: 'Video Editing Service', quantity: 1, rate: 10000, amount: 10000 }],
              subtotal: 10000,
              total: 10000
            });
            setActiveView('DOCUMENT_EDITOR');
          }} 
          className="btn-primary"
        >
          <Plus size={15} /> Create Document
        </button>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1rem',
        marginBottom: '1.5rem',
        paddingBottom: '1rem',
        borderBottom: '1px solid var(--border-subtle)'
      }}>
        {/* Type Tabs */}
        <div style={{ display: 'flex', gap: '0.35rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
          {docTypes.map(tab => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  fontSize: '0.775rem',
                  fontWeight: isActive ? '600' : '400',
                  padding: '0.35rem 0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: isActive ? 'var(--bg-elevated)' : 'transparent',
                  color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
                  border: isActive ? '1px solid var(--border-medium)' : '1px solid transparent',
                  whiteSpace: 'nowrap'
                }}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div style={{ position: 'relative', width: '220px' }}>
          <Search size={14} style={{ position: 'absolute', left: '10px', top: '10px', color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search documents..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{ paddingLeft: '30px', fontSize: '0.8rem' }}
          />
        </div>
      </div>

      {/* Documents Grid */}
      {filteredDocs.length === 0 ? (
        <div className="card" style={{ padding: '3rem', textAlign: 'center' }}>
          <FileText size={36} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.5rem' }}>No documents found.</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
            {searchQuery ? `No document matching "${searchQuery}"` : `No ${activeTab} created yet.`}
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {filteredDocs.map(doc => {
            const client = contacts.find(c => c.id === doc.contactId);
            const proj = projects.find(p => p.id === doc.projectId);

            return (
              <div key={doc.id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  {/* Top Line */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span className="badge badge-queue">
                        {doc.type}
                      </span>
                      {doc.docNumber && (
                        <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                          #{doc.docNumber}
                        </span>
                      )}
                    </div>

                    <div style={{ display: 'flex', gap: '0.25rem' }}>
                      <button
                        title="Duplicate document"
                        onClick={() => duplicateDocument(doc.id)}
                        className="btn-ghost"
                        style={{ padding: '0.35rem' }}
                      >
                        <Copy size={14} />
                      </button>
                      <button
                        title="Delete document"
                        onClick={() => deleteDocument(doc.id)}
                        className="btn-ghost"
                        style={{ padding: '0.35rem', color: 'var(--text-muted)' }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.35rem' }}>
                    {doc.title}
                  </h3>

                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.875rem' }}>
                    Client: <strong style={{ color: 'var(--text-primary)' }}>{client?.name || 'Client'}</strong> ({client?.company})
                    {proj && <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>Project: {proj.name}</div>}
                  </div>
                </div>

                {/* Footer Actions & Price */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '0.75rem',
                  borderTop: '1px solid var(--border-subtle)',
                  fontSize: '0.775rem'
                }}>
                  <div style={{ color: 'var(--text-muted)' }}>
                    {doc.total ? (
                      <strong style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>
                        ${Number(doc.total).toLocaleString()}
                      </strong>
                    ) : (
                      <span>Date: {doc.date}</span>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      setEditingDocument(doc);
                      setActiveView('DOCUMENT_EDITOR');
                    }}
                    className="btn-secondary"
                    style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }}
                  >
                    <Edit3 size={13} /> Edit &amp; Preview
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
