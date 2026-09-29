import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Home, 
  CheckCircle2, 
  FolderOpen, 
  FileText, 
  MessageSquare, 
  Activity, 
  Upload, 
  Send, 
  ThumbsUp, 
  MessageCircle,
  Eye
} from 'lucide-react';

export const SharedSpaceView = () => {
  const { 
    activeSpaceId, 
    sharedSpaces, 
    projects, 
    contacts, 
    files, 
    documents, 
    messages, 
    activityFeed, 
    updateDeliverableApproval, 
    addFile, 
    sendMessage,
    setEditingDocument,
    setActiveView,
    currentRole,
    toggleRole
  } = useApp();

  const space = sharedSpaces.find(s => s.id === activeSpaceId);
  const project = projects.find(p => p.id === space?.projectId || p.sharedSpaceId === space?.id) || projects[0];
  const client = contacts.find(c => c.id === space?.contactId);

  const [activeTab, setActiveTab] = useState('OVERVIEW');
  const [newMsgText, setNewMsgText] = useState('');
  const [selectedDelivId, setSelectedDelivId] = useState(project?.deliverables?.[0]?.id || '');

  // Revision Request Modal
  const [revisionModalDeliv, setRevisionModalDeliv] = useState(null);
  const [revisionNotes, setRevisionNotes] = useState('');

  if (!space) return null;

  const spaceFiles = files.filter(f => f.sharedSpaceId === space.id || (project && f.projectId === project.id && f.privacy !== 'PRIVATE'));
  const spaceDocs = documents.filter(d => d.sharedSpaceId === space.id || (project && d.projectId === project.id && d.privacy !== 'PRIVATE_DRAFT'));
  const spaceMessages = messages.filter(m => m.sharedSpaceId === space.id);
  const spaceActivities = activityFeed.filter(a => a.sharedSpaceId === space.id);

  const completedCount = project?.deliverables?.filter(d => d.status === 'COMPLETED' || d.approvalStatus === 'APPROVED').length || 0;
  const progressPct = project?.deliverables?.length ? Math.round((completedCount / project.deliverables.length) * 100) : 0;

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMsgText.trim()) return;
    sendMessage({
      sharedSpaceId: space.id,
      projectId: project?.id,
      deliverableId: selectedDelivId,
      text: newMsgText
    });
    setNewMsgText('');
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      addFile({
        projectId: project?.id,
        sharedSpaceId: space.id,
        fileName: file.name,
        fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        fileType: file.type || 'application/octet-stream'
      });
    }
  };

  const handleConfirmRevision = () => {
    if (revisionModalDeliv) {
      updateDeliverableApproval(project.id, revisionModalDeliv.id, 'REVISION_REQUESTED', revisionNotes);
      setRevisionModalDeliv(null);
      setRevisionNotes('');
    }
  };

  return (
    <div style={{ maxWidth: '1050px', margin: '0 auto', paddingBottom: '3rem' }}>
      {/* Shared Space Banner */}
      <div className="card" style={{ padding: '1.75rem', marginBottom: '1.5rem', backgroundColor: 'var(--bg-card)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.375rem' }}>
              <span className="badge badge-queue">SHARED SPACE</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Collaborative Digital Office
              </span>
            </div>

            <h1 style={{ fontSize: '1.75rem', fontWeight: '800', fontFamily: 'var(--font-display)' }}>
              {space.name}
            </h1>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              {project?.name ? `${project.name} • ${space.subtitle}` : space.subtitle}
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Participant Avatars */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {space.members?.map((m, idx) => (
                <div
                  key={idx}
                  title={`${m.name} (${m.role})`}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: idx === 0 ? 'var(--text-primary)' : 'var(--bg-elevated)',
                    color: idx === 0 ? 'var(--bg-main)' : 'var(--text-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.8rem',
                    fontWeight: '700',
                    border: '2px solid var(--bg-card)',
                    marginLeft: idx > 0 ? '-8px' : '0'
                  }}
                >
                  {m.name.charAt(0)}
                </div>
              ))}
            </div>

            {/* Client View Simulator Toggle */}
            <button
              onClick={toggleRole}
              className="btn-secondary"
              style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }}
            >
              <Eye size={13} /> {currentRole === 'CLIENT' ? 'Client View (Active)' : 'Client View Preview'}
            </button>
          </div>
        </div>

        {/* Sub-tabs Navigation */}
        <div style={{
          display: 'flex',
          gap: '0.375rem',
          borderTop: '1px solid var(--border-subtle)',
          marginTop: '1.25rem',
          paddingTop: '0.75rem',
          overflowX: 'auto'
        }}>
          {[
            { id: 'OVERVIEW', label: 'OVERVIEW', icon: Home },
            { id: 'DELIVERABLES', label: 'DELIVERABLES & APPROVALS', icon: CheckCircle2 },
            { id: 'FILES', label: 'SHARED FILES', icon: FolderOpen },
            { id: 'DOCUMENTS', label: 'DOCUMENTS', icon: FileText },
            { id: 'MESSAGES', label: 'MESSAGES', icon: MessageSquare },
            { id: 'ACTIVITY', label: 'ACTIVITY', icon: Activity }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  fontSize: '0.75rem',
                  fontWeight: isActive ? '700' : '500',
                  padding: '0.4rem 0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: isActive ? 'var(--bg-card-hover)' : 'transparent',
                  color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
                  border: isActive ? '1px solid var(--border-medium)' : '1px solid transparent',
                  whiteSpace: 'nowrap'
                }}
              >
                <Icon size={14} /> {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ==================================================
          1. OVERVIEW SUB-TAB
         ================================================== */}
      {activeTab === 'OVERVIEW' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '1.5rem' }}>
          <div>
            {/* Progress Card */}
            <div className="card" style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: '700' }}>PROJECT PROGRESS</h3>
                <span style={{ fontSize: '0.875rem', fontWeight: '800', fontFamily: 'var(--font-mono)' }}>
                  {completedCount} / {project?.deliverables?.length || 0} Completed ({progressPct}%)
                </span>
              </div>
              <div style={{ height: '6px', backgroundColor: 'var(--bg-main)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: `${progressPct}%`, height: '100%', backgroundColor: 'var(--text-primary)', transition: 'width 0.3s ease' }} />
              </div>
            </div>

            {/* Active Deliverable */}
            <div className="card" style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: '700', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                ACTIVE DELIVERABLE
              </div>
              <div style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '0.25rem' }}>
                {project?.deliverables?.find(d => d.status === 'WORKING' || d.status === 'REVISION')?.title || project?.deliverables?.[0]?.title || 'All Completed'}
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Target Deadline: {project?.deadline}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="card">
              <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '0.75rem' }}>COLLABORATION ACTIVITY</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                {spaceActivities.slice(0, 4).map(act => (
                  <div key={act.id} style={{ fontSize: '0.8rem', padding: '0.5rem 0', borderBottom: '1px solid var(--border-subtle)' }}>
                    <strong>{act.actorName}</strong> {act.actionText}
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', marginTop: '2px' }}>{act.timestamp}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Members Column */}
          <div>
            <div className="card">
              <h3 style={{ fontSize: '0.9rem', fontWeight: '700', marginBottom: '0.75rem' }}>SPACE MEMBERS</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem', fontSize: '0.8rem', marginBottom: '1.25rem' }}>
                {space.members?.map((m, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'var(--bg-elevated)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700' }}>
                      {m.name.charAt(0)}
                    </div>
                    <div>
                      <div style={{ fontWeight: '600' }}>{m.name}</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{m.role}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '0.75rem' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>PRIVACY GUARANTEE</div>
                <div style={{ fontSize: '0.775rem', marginTop: '0.25rem', color: 'var(--text-secondary)' }}>
                  🔒 Shared Space contents are restricted to invited members. Private files in My Space remain private.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================
          2. DELIVERABLES & APPROVALS SUB-TAB
         ================================================== */}
      {activeTab === 'DELIVERABLES' && (
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700' }}>DELIVERABLES & CLIENT APPROVALS</h3>
              <p style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>
                Review exports and click Approve or Request Revision.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            {project?.deliverables?.map(del => (
              <div
                key={del.id}
                style={{
                  padding: '1rem',
                  backgroundColor: 'var(--bg-main)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '1rem'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <span className={`badge badge-${del.status.toLowerCase().replace(' ', '')}`}>
                      {del.status}
                    </span>
                    {del.approvalStatus && (
                      <span style={{ fontSize: '0.725rem', fontWeight: '600', color: del.approvalStatus === 'APPROVED' ? '#4ADE80' : del.approvalStatus === 'REVISION_REQUESTED' ? '#F59E0B' : 'var(--text-muted)' }}>
                        • {del.approvalStatus === 'APPROVED' ? '✓ APPROVED BY CLIENT' : del.approvalStatus === 'REVISION_REQUESTED' ? '💬 REVISION REQUESTED' : 'PENDING REVIEW'}
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '1.05rem', fontWeight: '700' }}>{del.title}</div>
                  {del.notes && <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)', marginTop: '2px' }}>{del.notes}</div>}
                </div>

                {/* Approval Action Buttons */}
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {del.approvalStatus !== 'APPROVED' && (
                    <>
                      <button
                        onClick={() => updateDeliverableApproval(project.id, del.id, 'APPROVED')}
                        className="btn-primary"
                        style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }}
                      >
                        <ThumbsUp size={13} /> Approve
                      </button>
                      <button
                        onClick={() => setRevisionModalDeliv(del)}
                        className="btn-secondary"
                        style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }}
                      >
                        <MessageCircle size={13} /> Request Revision
                      </button>
                    </>
                  )}
                  {del.approvalStatus === 'APPROVED' && (
                    <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#4ADE80', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <CheckCircle2 size={16} /> Approved
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Revision Request Modal */}
      {revisionModalDeliv && (
        <div className="modal-overlay" onClick={() => setRevisionModalDeliv(null)}>
          <div className="card" onClick={e => e.stopPropagation()} style={{ width: '100%', maxWidth: '450px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.5rem' }}>
              Request Revision: {revisionModalDeliv.title}
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              Describe the adjustments needed for this deliverable.
            </p>
            <textarea
              rows={4}
              placeholder="e.g. Please make the title font bolder and adjust audio level."
              value={revisionNotes}
              onChange={e => setRevisionNotes(e.target.value)}
              style={{ marginBottom: '1rem' }}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
              <button onClick={() => setRevisionModalDeliv(null)} className="btn-secondary">Cancel</button>
              <button onClick={handleConfirmRevision} className="btn-primary">Submit Feedback</button>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================
          3. SHARED FILES SUB-TAB
         ================================================== */}
      {activeTab === 'FILES' && (
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700' }}>SHARED FILES EXCHANGE</h3>
              <p style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>
                Files exchanged between freelancer and client.
              </p>
            </div>

            <label className="btn-primary" style={{ fontSize: '0.775rem', cursor: 'pointer' }}>
              <Upload size={14} /> Upload File to Space
              <input type="file" onChange={handleFileUpload} style={{ display: 'none' }} />
            </label>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
            {spaceFiles.length === 0 ? (
              <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                No files uploaded to this space yet.
              </div>
            ) : (
              spaceFiles.map(f => (
                <div key={f.id} style={{ padding: '0.75rem 1rem', backgroundColor: 'var(--bg-main)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <FolderOpen size={18} style={{ color: 'var(--text-secondary)' }} />
                    <div>
                      <div style={{ fontWeight: '600', fontSize: '0.85rem' }}>{f.fileName}</div>
                      <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
                        {f.fileSize} • Uploaded by {f.uploadedBy} on {f.uploadDate}
                      </div>
                    </div>
                  </div>
                  <span className="badge badge-queue">{f.privacy}</span>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* ==================================================
          4. DOCUMENTS SUB-TAB
         ================================================== */}
      {activeTab === 'DOCUMENTS' && (
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700' }}>SHARED DOCUMENTS</h3>
              <p style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>
                Invoices, Agreements, and Proposals shared in this space.
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            {spaceDocs.map(doc => (
              <div
                key={doc.id}
                className="card"
                onClick={() => {
                  setEditingDocument(doc);
                  setActiveView('DOCUMENT_EDITOR');
                }}
                style={{ cursor: 'pointer' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span className="badge badge-queue">{doc.type}</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: '700', fontFamily: 'var(--font-mono)' }}>₹{doc.total?.toLocaleString() || 0}</span>
                </div>
                <div style={{ fontWeight: '700', fontSize: '1rem', marginBottom: '0.25rem' }}>{doc.title}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Date: {doc.date}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==================================================
          5. MESSAGES SUB-TAB
         ================================================== */}
      {activeTab === 'MESSAGES' && (
        <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '480px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.75rem' }}>CONTEXTUAL DISCUSSION</h3>
          
          <div style={{ flex: 1, overflowY: 'auto', padding: '0.75rem', backgroundColor: 'var(--bg-main)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {spaceMessages.length === 0 ? (
              <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '2rem' }}>
                No messages yet. Send a message below.
              </div>
            ) : (
              spaceMessages.map(m => (
                <div key={m.id} style={{ alignSelf: m.senderRole === (currentRole === 'CLIENT' ? 'Client' : 'Freelancer') ? 'flex-end' : 'flex-start', maxWidth: '75%' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '2px' }}>
                    {m.senderName} ({m.senderRole}) • {m.timestamp}
                  </div>
                  <div style={{
                    padding: '0.625rem 0.875rem',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--bg-card-hover)',
                    color: 'var(--text-primary)',
                    fontSize: '0.85rem',
                    border: '1px solid var(--border-subtle)'
                  }}>
                    {m.text}
                  </div>
                </div>
              ))
            )}
          </div>

          <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '0.5rem' }}>
            <input
              type="text"
              placeholder="Type message..."
              value={newMsgText}
              onChange={e => setNewMsgText(e.target.value)}
            />
            <button type="submit" className="btn-primary">
              <Send size={15} /> Send
            </button>
          </form>
        </div>
      )}

      {/* ==================================================
          6. ACTIVITY FEED SUB-TAB
         ================================================== */}
      {activeTab === 'ACTIVITY' && (
        <div className="card">
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1rem' }}>WORKSPACE ACTIVITY LOG</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {spaceActivities.map(act => (
              <div key={act.id} style={{ padding: '0.75rem 1rem', backgroundColor: 'var(--bg-main)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', fontSize: '0.85rem' }}>
                <strong>{act.actorName}</strong> {act.actionText}
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '3px' }}>{act.timestamp}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
