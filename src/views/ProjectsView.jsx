import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Plus, 
  FolderKanban, 
  Video, 
  FileText, 
  ArrowLeft, 
  Edit3, 
  Check, 
  X, 
  Trash2,
  ExternalLink,
  ChevronDown
} from 'lucide-react';

export const ProjectsView = () => {
  const { 
    projects, 
    contacts, 
    documents, 
    activeView, 
    setActiveView, 
    selectedProjectId, 
    setSelectedProjectId,
    updateDeliverableStatus,
    addDeliverable,
    addProject,
    updateProject,
    deleteProject,
    setEditingDocument
  } = useApp();

  // Create Project Modal state
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [newProjName, setNewProjName] = useState('');
  const [newProjClient, setNewProjClient] = useState(contacts[0]?.id || '');
  const [newProjService, setNewProjService] = useState('Short-form video editing');
  const [newProjPrice, setNewProjPrice] = useState(20000);
  const [newProjDeadline, setNewProjDeadline] = useState('');
  const [newProjVideoCount, setNewProjVideoCount] = useState(5);

  // Add Deliverable state inside detail view
  const [newDelTitle, setNewDelTitle] = useState('');

  const currentProject = projects.find(p => p.id === selectedProjectId);

  const handleCreateProject = (e) => {
    e.preventDefault();
    if (!newProjName.trim() || !newProjClient) return;

    // Generate initial deliverables array
    const deliverables = [];
    for (let i = 1; i <= Number(newProjVideoCount || 1); i++) {
      deliverables.push({
        id: `del-${Date.now()}-${i}`,
        title: `Episode ${String(i).padStart(2, '0')}`,
        status: i === 1 ? 'WORKING' : 'QUEUED',
        dueDate: newProjDeadline || '',
        notes: ''
      });
    }

    const created = addProject({
      name: newProjName,
      contactId: newProjClient,
      service: newProjService,
      price: Number(newProjPrice),
      deadline: newProjDeadline || new Date().toISOString().split('T')[0],
      startDate: new Date().toISOString().split('T')[0],
      currentTask: `Editing ${deliverables[0]?.title || 'video'}`,
      nextAction: 'First draft export',
      lastContacted: new Date().toISOString().split('T')[0],
      notes: '',
      deliverables
    });

    setIsCreatingProject(false);
    setSelectedProjectId(created.id);
    setActiveView('PROJECT_DETAIL');
  };

  const handleAddDeliverable = (e) => {
    e.preventDefault();
    if (!newDelTitle.trim() || !currentProject) return;
    addDeliverable(currentProject.id, { title: newDelTitle });
    setNewDelTitle('');
  };

  // --- PROJECT DETAIL VIEW ---
  if (activeView === 'PROJECT_DETAIL' && currentProject) {
    const client = contacts.find(c => c.id === currentProject.contactId);
    const connectedDocs = documents.filter(d => d.projectId === currentProject.id);

    return (
      <div style={{ maxWidth: '1000px', margin: '0 auto', paddingBottom: '3rem' }}>
        {/* Back Button */}
        <button
          onClick={() => setActiveView('PROJECTS')}
          className="btn-ghost"
          style={{ marginBottom: '1.25rem', fontSize: '0.8rem' }}
        >
          <ArrowLeft size={16} /> Back to Projects
        </button>

        {/* Project Header Card */}
        <div className="card" style={{ marginBottom: '1.5rem', padding: '1.75rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.375rem' }}>
                <span className={`badge badge-${currentProject.status.toLowerCase().replace('/', '').replace(' ', '')}`}>
                  {currentProject.status}
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Client: <strong style={{ color: 'var(--text-primary)' }}>{client?.name || 'Client'}</strong> ({client?.company})
                </span>
              </div>
              <h1 style={{ fontSize: '1.75rem', fontWeight: '800', fontFamily: 'var(--font-display)' }}>
                {currentProject.name}
              </h1>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                {currentProject.service}
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: '800', fontFamily: 'var(--font-mono)' }}>
                {currentProject.currency}{currentProject.price.toLocaleString()}
              </div>
              <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>
                Deadline: {currentProject.deadline}
              </div>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: '1rem',
            padding: '1rem',
            backgroundColor: 'var(--bg-main)',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.8rem'
          }}>
            <div>
              <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.7rem' }}>START DATE</span>
              <strong>{currentProject.startDate || 'N/A'}</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.7rem' }}>LAST CONTACTED</span>
              <strong>{currentProject.lastContacted || 'N/A'}</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.7rem' }}>NEXT ACTION</span>
              <strong>{currentProject.nextAction || 'None'}</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.7rem' }}>VIDEOS COUNT</span>
              <strong>{currentProject.deliverables?.length || 0} Videos</strong>
            </div>
          </div>
        </div>

        {/* ==================================================
            VIDEO / DELIVERABLE TRACKING SECTION
           ================================================== */}
        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700' }}>VIDEOS / DELIVERABLES TRACKER</h3>
              <p style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>
                Click status pill to quickly change video status.
              </p>
            </div>

            {/* Quick Add Video Form */}
            <form onSubmit={handleAddDeliverable} style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                placeholder="Add video title (e.g. Episode 05)"
                value={newDelTitle}
                onChange={e => setNewDelTitle(e.target.value)}
                style={{ padding: '0.35rem 0.65rem', fontSize: '0.775rem', width: '220px' }}
              />
              <button type="submit" className="btn-secondary" style={{ padding: '0.35rem 0.65rem', fontSize: '0.775rem' }}>
                <Plus size={14} /> Add Video
              </button>
            </form>
          </div>

          {/* Deliverables List Table */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-medium)', textAlign: 'left', color: 'var(--text-muted)', fontSize: '0.725rem' }}>
                  <th style={{ padding: '0.5rem', width: '40px' }}>#</th>
                  <th style={{ padding: '0.5rem' }}>VIDEO TITLE</th>
                  <th style={{ padding: '0.5rem' }}>DUE DATE</th>
                  <th style={{ padding: '0.5rem' }}>STATUS (CLICK TO CHANGE)</th>
                </tr>
              </thead>
              <tbody>
                {currentProject.deliverables?.map((del, idx) => (
                  <tr key={del.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '0.625rem 0.5rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                      {String(idx + 1).padStart(2, '0')}
                    </td>
                    <td style={{ padding: '0.625rem 0.5rem', fontWeight: '600' }}>
                      {del.title}
                    </td>
                    <td style={{ padding: '0.625rem 0.5rem', color: 'var(--text-muted)' }}>
                      {del.dueDate || currentProject.deadline}
                    </td>
                    <td style={{ padding: '0.625rem 0.5rem' }}>
                      <select
                        value={del.status}
                        onChange={(e) => updateDeliverableStatus(currentProject.id, del.id, e.target.value)}
                        style={{
                          width: 'auto',
                          padding: '0.2rem 0.5rem',
                          fontSize: '0.725rem',
                          fontWeight: '600',
                          borderRadius: '9999px',
                          cursor: 'pointer',
                          backgroundColor: del.status === 'WORKING' ? 'var(--status-working-bg)' :
                                           del.status === 'REVISION' ? 'var(--status-revision-bg)' :
                                           del.status === 'COMPLETED' ? 'var(--status-completed-bg)' : 'var(--status-queue-bg)',
                          color: del.status === 'WORKING' ? 'var(--status-working-text)' :
                                 del.status === 'REVISION' ? 'var(--status-revision-text)' :
                                 del.status === 'COMPLETED' ? 'var(--status-completed-text)' : 'var(--status-queue-text)',
                          border: '1px solid var(--border-medium)'
                        }}
                      >
                        <option value="QUEUED">QUEUED</option>
                        <option value="WORKING">WORKING</option>
                        <option value="REVISION">REVISION</option>
                        <option value="COMPLETED">COMPLETED</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ==================================================
            CONNECTED DOCUMENTS SECTION
           ================================================== */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700' }}>PROJECT DOCUMENTS</h3>
              <p style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>
                Invoices, Proposals, Agreements, and Delivery Notes associated with this project.
              </p>
            </div>

            {/* Document Creation Options */}
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={() => {
                  setEditingDocument({
                    type: 'Invoice',
                    contactId: currentProject.contactId,
                    projectId: currentProject.id,
                    docNumber: `INV-00${documents.length + 1}`,
                    title: `Invoice — ${currentProject.name}`,
                    date: new Date().toISOString().split('T')[0],
                    dueDate: currentProject.deadline,
                    items: [
                      { id: 'i1', description: `${currentProject.service} (${currentProject.deliverables.length} Videos)`, quantity: currentProject.deliverables.length, rate: Math.round(currentProject.price / (currentProject.deliverables.length || 1)), amount: currentProject.price }
                    ],
                    subtotal: currentProject.price,
                    total: currentProject.price
                  });
                  setActiveView('DOCUMENT_EDITOR');
                }}
                className="btn-primary"
                style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }}
              >
                + Invoice
              </button>
              <button
                onClick={() => {
                  setEditingDocument({
                    type: 'Project Delivery Note',
                    contactId: currentProject.contactId,
                    projectId: currentProject.id,
                    docNumber: `DEL-00${documents.length + 1}`,
                    title: `Delivery Note — ${currentProject.name}`,
                    date: new Date().toISOString().split('T')[0],
                    deliveredItems: currentProject.deliverables.map(d => `${d.title} (1080p Export)`),
                    customNotes: 'All final video edits uploaded to client Google Drive folder.'
                  });
                  setActiveView('DOCUMENT_EDITOR');
                }}
                className="btn-secondary"
                style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }}
              >
                + Delivery Note
              </button>
            </div>
          </div>

          {connectedDocs.length === 0 ? (
            <div style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              No documents created for this project yet. Click above to generate an Invoice or Delivery Note.
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.75rem' }}>
              {connectedDocs.map(doc => (
                <div 
                  key={doc.id}
                  onClick={() => {
                    setEditingDocument(doc);
                    setActiveView('DOCUMENT_EDITOR');
                  }}
                  style={{
                    padding: '0.875rem',
                    backgroundColor: 'var(--bg-main)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                  className="btn-ghost"
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                    <FileText size={16} style={{ color: 'var(--text-secondary)' }} />
                    <div>
                      <div style={{ fontWeight: '600', fontSize: '0.85rem' }}>{doc.title}</div>
                      <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>{doc.type} • {doc.date}</div>
                    </div>
                  </div>
                  <ExternalLink size={14} style={{ color: 'var(--text-muted)' }} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // --- ALL PROJECTS LIST VIEW ---
  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', paddingBottom: '3rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: '800', fontFamily: 'var(--font-display)' }}>
            PROJECTS
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            Every editing job organized with deliverables and documents.
          </p>
        </div>

        <button 
          onClick={() => setIsCreatingProject(true)} 
          className="btn-primary"
        >
          <Plus size={16} /> CREATE PROJECT
        </button>
      </div>

      {/* Projects Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
        {projects.map(proj => {
          const client = contacts.find(c => c.id === proj.contactId);
          const completedCount = proj.deliverables.filter(d => d.status === 'COMPLETED').length;

          return (
            <div 
              key={proj.id} 
              className="card"
              onClick={() => {
                setSelectedProjectId(proj.id);
                setActiveView('PROJECT_DETAIL');
              }}
              style={{ cursor: 'pointer' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                <span className={`badge badge-${proj.status.toLowerCase().replace('/', '').replace(' ', '')}`}>
                  {proj.status}
                </span>
                <span style={{ fontSize: '0.9rem', fontWeight: '700', fontFamily: 'var(--font-mono)' }}>
                  {proj.currency}{proj.price.toLocaleString()}
                </span>
              </div>

              <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginBottom: '0.25rem' }}>
                {proj.name}
              </h3>
              <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                Client: <strong>{client?.name || 'Client'}</strong> ({client?.company})
              </div>

              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                Service: {proj.service}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)', fontSize: '0.775rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>
                  Deliverables: {completedCount}/{proj.deliverables.length} done
                </span>
                <span style={{ fontWeight: '600' }}>
                  Deadline: {proj.deadline}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Project Modal */}
      {isCreatingProject && (
        <div className="modal-overlay" onClick={() => setIsCreatingProject(false)}>
          <div className="card" onClick={e => e.stopPropagation()} style={{ width: '100%', maxWidth: '500px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1rem' }}>
              Create New Editing Project
            </h2>

            <form onSubmit={handleCreateProject} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>
                  PROJECT NAME
                </label>
                <input
                  type="text"
                  placeholder="e.g. Founder Video Series"
                  value={newProjName}
                  onChange={e => setNewProjName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>
                  SELECT CLIENT
                </label>
                <select
                  value={newProjClient}
                  onChange={e => setNewProjClient(e.target.value)}
                  required
                >
                  {contacts.map(c => (
                    <option key={c.id} value={c.id}>{c.name} ({c.company})</option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>
                    SERVICE
                  </label>
                  <input
                    type="text"
                    value={newProjService}
                    onChange={e => setNewProjService(e.target.value)}
                    placeholder="e.g. Short-form video editing"
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>
                    TOTAL PRICE (₹)
                  </label>
                  <input
                    type="number"
                    value={newProjPrice}
                    onChange={e => setNewProjPrice(e.target.value)}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>
                    NUMBER OF VIDEOS
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={newProjVideoCount}
                    onChange={e => setNewProjVideoCount(e.target.value)}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>
                    DEADLINE
                  </label>
                  <input
                    type="date"
                    value={newProjDeadline}
                    onChange={e => setNewProjDeadline(e.target.value)}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button type="button" onClick={() => setIsCreatingProject(false)} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
