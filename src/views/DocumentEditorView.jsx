import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { DocumentPDFPreview } from '../components/DocumentPDFPreview';
import { 
  ArrowLeft, 
  Save, 
  Eye, 
  Edit3, 
  Plus, 
  Trash2, 
  Download,
  FileText
} from 'lucide-react';

export const DocumentEditorView = () => {
  const { 
    editingDocument, 
    contacts, 
    projects, 
    profile, 
    saveDocument, 
    setActiveView 
  } = useApp();

  const [activeTab, setActiveTab] = useState('edit'); // 'edit' or 'preview'
  const [formData, setFormData] = useState(() => {
    if (editingDocument) return editingDocument;
    return {
      type: 'Invoice',
      docNumber: 'INV-001',
      title: 'Invoice',
      contactId: contacts[0]?.id || '',
      projectId: projects[0]?.id || '',
      date: new Date().toISOString().split('T')[0],
      dueDate: '',
      items: [{ id: 'i1', description: 'Video Editing Service', quantity: 1, rate: 10000, amount: 10000 }],
      subtotal: 10000,
      total: 10000,
      customNotes: ''
    };
  });

  // When selected Client or Project changes, auto-fill document info
  const handleClientChange = (contactId) => {
    const matchedProjects = projects.filter(p => p.contactId === contactId);
    const firstProj = matchedProjects[0];

    setFormData(prev => ({
      ...prev,
      contactId,
      projectId: firstProj ? firstProj.id : prev.projectId
    }));
  };

  const handleProjectChange = (projectId) => {
    const proj = projects.find(p => p.id === projectId);
    if (!proj) return;

    setFormData(prev => {
      let items = prev.items;
      let total = prev.total;
      let subtotal = prev.subtotal;

      if (prev.type === 'Invoice' || prev.type === 'Quotation') {
        items = [{
          id: `i-${Date.now()}`,
          description: `${proj.service} (${proj.deliverables.length} Videos)`,
          quantity: proj.deliverables.length || 1,
          rate: Math.round(proj.price / (proj.deliverables.length || 1)),
          amount: proj.price
        }];
        subtotal = proj.price;
        total = proj.price;
      }

      return {
        ...prev,
        projectId,
        title: `${prev.type} — ${proj.name}`,
        dueDate: proj.deadline || prev.dueDate,
        items,
        subtotal,
        total
      };
    });
  };

  const handleTypeChange = (type) => {
    const numPrefix = type === 'Invoice' ? 'INV' :
                      type === 'Proposal' ? 'PROP' :
                      type === 'Agreement' ? 'AGR' :
                      type === 'Project Delivery Note' ? 'DEL' :
                      type === 'Quotation' ? 'QUOTE' : 'DOC';

    setFormData(prev => ({
      ...prev,
      type,
      docNumber: `${numPrefix}-00${Math.floor(Math.random() * 90 + 10)}`,
      title: `${type} — ${projects.find(p => p.id === prev.projectId)?.name || 'Project'}`
    }));
  };

  // Line Item Handlers
  const handleItemChange = (idx, field, val) => {
    const updatedItems = [...(formData.items || [])];
    const item = { ...updatedItems[idx], [field]: val };

    if (field === 'quantity' || field === 'rate') {
      item.amount = Number(item.quantity || 0) * Number(item.rate || 0);
    }
    updatedItems[idx] = item;

    const subtotal = updatedItems.reduce((acc, curr) => acc + Number(curr.amount || 0), 0);

    setFormData(prev => ({
      ...prev,
      items: updatedItems,
      subtotal,
      total: subtotal
    }));
  };

  const addItemRow = () => {
    setFormData(prev => ({
      ...prev,
      items: [
        ...(prev.items || []),
        { id: `i-${Date.now()}`, description: 'Video Edit Item', quantity: 1, rate: 2000, amount: 2000 }
      ]
    }));
  };

  const removeItemRow = (idx) => {
    const updatedItems = (formData.items || []).filter((_, i) => i !== idx);
    const subtotal = updatedItems.reduce((acc, curr) => acc + Number(curr.amount || 0), 0);
    setFormData(prev => ({ ...prev, items: updatedItems, subtotal, total: subtotal }));
  };

  const handleSave = () => {
    saveDocument(formData);
    setActiveView('DOCUMENTS');
  };

  const docTypesList = [
    'Invoice',
    'Welcome Note',
    'Proposal',
    'Quotation',
    'Agreement',
    'Project Delivery Note',
    'Payment Receipt',
    'Thank You Note'
  ];

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', paddingBottom: '3rem' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <button onClick={() => setActiveView('DOCUMENTS')} className="btn-ghost" style={{ fontSize: '0.8rem' }}>
          <ArrowLeft size={16} /> Back to Documents Hub
        </button>

        <div style={{ display: 'flex', gap: '0.625rem' }}>
          <button
            onClick={() => setActiveTab('edit')}
            className={activeTab === 'edit' ? 'btn-primary' : 'btn-secondary'}
            style={{ fontSize: '0.8rem' }}
          >
            <Edit3 size={15} /> Edit Content
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={activeTab === 'preview' ? 'btn-primary' : 'btn-secondary'}
            style={{ fontSize: '0.8rem' }}
          >
            <Eye size={15} /> Live A4 Preview
          </button>
          <button onClick={handleSave} className="btn-primary" style={{ backgroundColor: '#10B981', color: '#FFF' }}>
            <Save size={15} /> Save Document
          </button>
        </div>
      </div>

      {/* ==================================================
          EDIT TAB FORM
         ================================================== */}
      {activeTab === 'edit' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '1.5rem' }}>
          {/* Main Form Area */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* 1. Document Configuration */}
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.05em', color: 'var(--text-muted)', display: 'block', marginBottom: '0.375rem' }}>
                DOCUMENT TYPE
              </label>
              <select
                value={formData.type}
                onChange={e => handleTypeChange(e.target.value)}
                style={{ fontWeight: '600', fontSize: '0.9rem' }}
              >
                {docTypesList.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Title & Document Number */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '0.75rem' }}>
              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>DOCUMENT TITLE</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>NUMBER / REF</label>
                <input
                  type="text"
                  value={formData.docNumber || ''}
                  onChange={e => setFormData({ ...formData, docNumber: e.target.value })}
                />
              </div>
            </div>

            {/* Client & Project Selection (Write Once, Auto-Fill) */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', padding: '1rem', backgroundColor: 'var(--bg-main)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.25rem' }}>
                  SELECT CLIENT
                </label>
                <select
                  value={formData.contactId}
                  onChange={e => handleClientChange(e.target.value)}
                >
                  {contacts.map(c => (
                    <option key={c.id} value={c.id}>{c.name} ({c.company})</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.25rem' }}>
                  SELECT PROJECT
                </label>
                <select
                  value={formData.projectId}
                  onChange={e => handleProjectChange(e.target.value)}
                >
                  {projects.filter(p => p.contactId === formData.contactId).map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Date Fields */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>DOCUMENT DATE</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={e => setFormData({ ...formData, date: e.target.value })}
                />
              </div>
              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>DUE / VALID DATE</label>
                <input
                  type="date"
                  value={formData.dueDate || ''}
                  onChange={e => setFormData({ ...formData, dueDate: e.target.value })}
                />
              </div>
            </div>

            {/* DYNAMIC EDIT FIELDS BASED ON DOCUMENT TYPE */}

            {/* INVOICE & QUOTATION LINE ITEMS TABLE */}
            {(formData.type === 'Invoice' || formData.type === 'Quotation') && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>
                    LINE ITEMS
                  </label>
                  <button type="button" onClick={addItemRow} className="btn-ghost" style={{ fontSize: '0.75rem' }}>
                    <Plus size={14} /> Add Row
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
                  {(formData.items || []).map((item, idx) => (
                    <div key={item.id || idx} style={{ display: 'grid', gridTemplateColumns: '3fr 1fr 1.5fr 1.5fr auto', gap: '0.5rem', alignItems: 'center' }}>
                      <input
                        type="text"
                        placeholder="Description"
                        value={item.description}
                        onChange={e => handleItemChange(idx, 'description', e.target.value)}
                      />
                      <input
                        type="number"
                        placeholder="Qty"
                        value={item.quantity}
                        onChange={e => handleItemChange(idx, 'quantity', e.target.value)}
                      />
                      <input
                        type="number"
                        placeholder="Rate (₹)"
                        value={item.rate}
                        onChange={e => handleItemChange(idx, 'rate', e.target.value)}
                      />
                      <div style={{ fontWeight: '600', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', textAlign: 'right', padding: '0.5rem' }}>
                        ₹{Number(item.amount || 0).toLocaleString()}
                      </div>
                      <button type="button" onClick={() => removeItemRow(idx)} className="btn-ghost" style={{ padding: '0.3rem', color: 'var(--status-blocked-text)' }}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>

                <div style={{ textAlign: 'right', fontSize: '1.1rem', fontWeight: '800', fontFamily: 'var(--font-mono)' }}>
                  Total: ₹{Number(formData.total || 0).toLocaleString()}
                </div>
              </div>
            )}

            {/* PROPOSAL TEXT FIELDS */}
            {formData.type === 'Proposal' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>PROBLEM / REQUIREMENT</label>
                  <textarea rows={2} value={formData.problemStatement || ''} onChange={e => setFormData({ ...formData, problemStatement: e.target.value })} />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>PROPOSED SCOPE & DELIVERABLES</label>
                  <textarea rows={3} value={formData.proposedScope || ''} onChange={e => setFormData({ ...formData, proposedScope: e.target.value })} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>TIMELINE</label>
                    <input type="text" value={formData.timeline || ''} onChange={e => setFormData({ ...formData, timeline: e.target.value })} placeholder="2 weeks delivery" />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>TOTAL INVESTMENT (₹)</label>
                    <input type="number" value={formData.total || 0} onChange={e => setFormData({ ...formData, total: Number(e.target.value) })} />
                  </div>
                </div>
              </div>
            )}

            {/* AGREEMENT TEXT FIELDS */}
            {formData.type === 'Agreement' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>AGREED SCOPE & REVISION POLICY</label>
                  <textarea rows={3} value={formData.proposedScope || ''} onChange={e => setFormData({ ...formData, proposedScope: e.target.value })} />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>TERMS & COPYRIGHT CONDITIONS</label>
                  <textarea rows={3} value={formData.termsAndConditions || ''} onChange={e => setFormData({ ...formData, termsAndConditions: e.target.value })} />
                </div>
              </div>
            )}

            {/* Custom Notes */}
            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>REMARKS / CUSTOM NOTES</label>
              <textarea rows={2} value={formData.customNotes || ''} onChange={e => setFormData({ ...formData, customNotes: e.target.value })} placeholder="Payment instructions, extra notes..." />
            </div>
          </div>

          {/* Right Column: Mini Preview & Info */}
          <div>
            <div className="card" style={{ position: 'sticky', top: '80px' }}>
              <h3 style={{ fontSize: '0.9rem', fontWeight: '700', marginBottom: '0.75rem', letterSpacing: '0.04em' }}>
                AUTOMATIC BRANDING
              </h3>
              <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem' }}>
                <div>Business Name: <strong style={{ color: 'var(--text-primary)' }}>{profile.businessName || profile.fullName}</strong></div>
                <div>UPI ID: <strong style={{ color: 'var(--text-primary)' }}>{profile.paymentInfo?.upiId || 'Not set'}</strong></div>
                <div>Signature: <strong style={{ color: 'var(--text-primary)' }}>{profile.signatureUrl ? 'Saved Signature' : 'Digital Sign'}</strong></div>
              </div>

              <button
                onClick={() => setActiveTab('preview')}
                className="btn-primary"
                style={{ width: '100%', marginBottom: '0.5rem' }}
              >
                <Eye size={15} /> Preview A4 PDF
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================
          LIVE PREVIEW TAB
         ================================================== */}
      {activeTab === 'preview' && (
        <DocumentPDFPreview documentData={formData} />
      )}
    </div>
  );
};
