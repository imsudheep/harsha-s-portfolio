import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ArrowRight, 
  CheckCircle2,
  FolderKanban,
  FileText,
  Video,
  Sparkles,
  Calendar,
  Clock,
  Search
} from 'lucide-react';

export const HomeView = ({ onQuickNew }) => {
  const { 
    projects, 
    contacts, 
    setActiveView, 
    setSelectedProjectId,
    profile
  } = useApp();

  const [selectedDay, setSelectedDay] = useState(14);

  const weekDays = [
    { day: 'Sun', date: 11 },
    { day: 'Mon', date: 12 },
    { day: 'Tue', date: 13 },
    { day: 'Wed', date: 14 },
    { day: 'Thu', date: 15 },
    { day: 'Fri', date: 16 },
    { day: 'Sat', date: 17 }
  ];

  // Find active working or revision deliverables
  const activeWorkingItems = [];
  projects.forEach(project => {
    const client = contacts.find(c => c.id === project.contactId);
    project.deliverables?.forEach(del => {
      if (del.status === 'WORKING' || del.status === 'REVISION') {
        activeWorkingItems.push({
          deliverable: del,
          project,
          client
        });
      }
    });
  });

  const primaryItem = activeWorkingItems[0] || (projects[0] ? {
    deliverable: projects[0].deliverables?.find(d => d.status === 'WORKING') || projects[0].deliverables?.[0],
    project: projects[0],
    client: contacts.find(c => c.id === projects[0].contactId)
  } : null);

  return (
    <div style={{ maxWidth: '1080px', margin: '0 auto', paddingBottom: '5rem' }}>
      {/* Top Greeting Header (Inspired by Reference Image Header) */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.85rem',
            fontWeight: '800',
            letterSpacing: '-0.025em',
            lineHeight: 1.1,
            marginBottom: '0.2rem',
            color: 'var(--text-primary)'
          }}>
            Hello {profile.fullName || 'Harsha'}
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: '500' }}>
            Today 14 May • Freelance Workspace &amp; Vault
          </p>
        </div>
      </div>

      {/* Horizontal Day/Date Capsule Selector (Matching Reference Image) */}
      <div className="calendar-capsule-row">
        {weekDays.map(item => {
          const isActive = selectedDay === item.date;
          return (
            <div
              key={item.date}
              onClick={() => setSelectedDay(item.date)}
              className={`calendar-capsule-item ${isActive ? 'calendar-capsule-active' : ''}`}
            >
              <span style={{ fontSize: '0.675rem', fontWeight: '600', color: isActive ? '#FFFFFF' : 'var(--text-muted)' }}>
                {item.day}
              </span>
              <span style={{ fontSize: '1rem', fontWeight: '800', fontFamily: 'var(--font-display)' }}>
                {item.date}
              </span>
            </div>
          );
        })}
      </div>

      {/* Section Header: Your Plan */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: '800', color: 'var(--text-primary)' }}>
          Your plan
        </h2>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' }}>
          May 2026
        </span>
      </div>

      {/* ==================================================
          SECTION 1: HERO & STACKED COLOR CARDS (Matching Image)
         ================================================== */}
      <div className="hero-grid-split">
        {/* Left Hero Card (Inspired by reference image left panel) */}
        {primaryItem && (
          <div className="card" style={{
            padding: '2.25rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: 'var(--bg-card)'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.25rem' }}>
                <span className={`badge badge-${primaryItem.deliverable.status.toLowerCase().replace(' ', '')}`}>
                  <CheckCircle2 size={12} /> {primaryItem.deliverable.status}
                </span>
                <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                  Client: <strong style={{ color: 'var(--text-primary)' }}>{primaryItem.client?.name}</strong>
                </span>
              </div>

              <h2 style={{
                fontSize: '1.85rem',
                fontWeight: '800',
                fontFamily: 'var(--font-display)',
                letterSpacing: '-0.02em',
                marginBottom: '0.5rem',
                color: 'var(--accent-blue)'
              }}>
                {primaryItem.project.name}
              </h2>

              <p style={{ fontSize: '1.1rem', fontWeight: '500', color: 'var(--text-secondary)', marginBottom: '1.75rem' }}>
                {primaryItem.deliverable.title} • <span style={{ color: 'var(--text-muted)' }}>{primaryItem.project.service}</span>
              </p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '1rem',
                padding: '1.25rem',
                backgroundColor: 'var(--bg-elevated)',
                borderRadius: 'var(--radius-md)',
                marginBottom: '1.75rem'
              }}>
                <div>
                  <div style={{ fontSize: '0.675rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>NEXT ACTION</div>
                  <div style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-primary)', marginTop: '0.2rem' }}>
                    {primaryItem.project.nextAction || 'Send revision'}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.675rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>DEADLINE</div>
                  <div style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--accent-blue)', fontFamily: 'var(--font-mono)', marginTop: '0.2rem' }}>
                    {primaryItem.deliverable.dueDate || primaryItem.project.deadline}
                  </div>
                </div>
              </div>
            </div>

            {/* Coral Red CTA Button (Matching "Place Order" button in reference image) */}
            <div>
              <button
                onClick={() => {
                  setSelectedProjectId(primaryItem.project.id);
                  setActiveView('PROJECT_DETAIL');
                }}
                className="btn-primary"
                style={{ padding: '0.85rem 1.75rem', fontSize: '0.95rem' }}
              >
                Open Project <ArrowRight size={17} />
              </button>
            </div>
          </div>
        )}

        {/* Right Stacked Color-Coded Cards (Matching reference image right panel) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Top Amber Card: Video Editing & Branding */}
          <div className="card card-service-amber" style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: '700', opacity: 0.9, textTransform: 'uppercase', letterSpacing: '0.05em' }}>SERVICE CATEGORY</div>
                <div style={{ fontSize: '1.35rem', fontWeight: '800', fontFamily: 'var(--font-display)' }}>Branding &amp; Video</div>
              </div>
              <Video size={24} style={{ opacity: 0.9 }} />
            </div>
            <p style={{ fontSize: '0.85rem', opacity: 0.9, marginBottom: '1rem' }}>
              16 Active Deliverables • High Priority Queue
            </p>
            <button
              onClick={() => setActiveView('PROJECTS')}
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.05)',
                color: 'inherit',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                padding: '0.45rem 0.9rem',
                borderRadius: '8px',
                fontSize: '0.775rem',
                fontWeight: '600'
              }}
            >
              View Projects →
            </button>
          </div>

          {/* Middle Blue Card: Web & App Design */}
          <div className="card card-service-blue" style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: '700', opacity: 0.9, textTransform: 'uppercase', letterSpacing: '0.05em' }}>SERVICE CATEGORY</div>
                <div style={{ fontSize: '1.35rem', fontWeight: '800', fontFamily: 'var(--font-display)' }}>App &amp; Web Design</div>
              </div>
              <FolderKanban size={24} style={{ opacity: 0.9 }} />
            </div>
            <p style={{ fontSize: '0.85rem', opacity: 0.9, marginBottom: '1rem' }}>
              8 Active Projects • Design Systems &amp; UX
            </p>
            <button
              onClick={() => setActiveView('PROJECTS')}
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.05)',
                color: 'inherit',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                padding: '0.45rem 0.9rem',
                borderRadius: '8px',
                fontSize: '0.775rem',
                fontWeight: '600'
              }}
            >
              View Projects →
            </button>
          </div>

          {/* Bottom Coral Card: Documents & Operations */}
          <div className="card card-service-coral" style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: '700', opacity: 0.9, textTransform: 'uppercase', letterSpacing: '0.05em' }}>VAULT &amp; DOCS</div>
                <div style={{ fontSize: '1.35rem', fontWeight: '800', fontFamily: 'var(--font-display)' }}>Documents Hub</div>
              </div>
              <FileText size={24} style={{ opacity: 0.9 }} />
            </div>
            <p style={{ fontSize: '0.85rem', opacity: 0.9, marginBottom: '1rem' }}>
              Invoices, Proposals &amp; Client Contracts
            </p>
            <button
              onClick={() => setActiveView('DOCUMENTS')}
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.05)',
                color: 'inherit',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                padding: '0.45rem 0.9rem',
                borderRadius: '8px',
                fontSize: '0.775rem',
                fontWeight: '600'
              }}
            >
              Open Vault →
            </button>
          </div>
        </div>
      </div>

      {/* ==================================================
          SECTION 2: ACTIVE PROJECTS QUEUE
         ================================================== */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: '800', letterSpacing: '0.08em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            ACTIVE PROJECTS QUEUE ({projects.length})
          </div>
          <button onClick={() => setActiveView('PROJECTS')} className="btn-ghost" style={{ fontSize: '0.8rem', color: 'var(--accent-blue)', fontWeight: '700' }}>
            View All Projects ({projects.length}) <ArrowRight size={14} />
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {projects.map(proj => {
            const client = contacts.find(c => c.id === proj.contactId);
            const completedCount = proj.deliverables?.filter(d => d.status === 'COMPLETED').length || 0;
            const progressPct = proj.deliverables?.length ? Math.round((completedCount / proj.deliverables.length) * 100) : 0;

            return (
              <div 
                key={proj.id} 
                className="card"
                onClick={() => {
                  setSelectedProjectId(proj.id);
                  setActiveView('PROJECT_DETAIL');
                }}
                style={{ cursor: 'pointer', padding: '1.5rem' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                  <span className={`badge badge-${proj.status.toLowerCase().replace('/', '').replace(' ', '')}`}>
                    {proj.status}
                  </span>
                  <span style={{ fontSize: '0.95rem', fontWeight: '800', fontFamily: 'var(--font-mono)', color: 'var(--accent-blue)' }}>
                    {proj.currency}{proj.price.toLocaleString()}
                  </span>
                </div>

                <div style={{ fontSize: '1.15rem', fontWeight: '700', marginBottom: '0.35rem', color: 'var(--text-primary)' }}>
                  {proj.name}
                </div>
                <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                  Client: <strong style={{ color: 'var(--text-primary)' }}>{client?.name || 'Client'}</strong> • {proj.service}
                </div>

                {/* Modern Progress Bar */}
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                    <span>Deliverables ({completedCount}/{proj.deliverables?.length || 0})</span>
                    <span style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{progressPct}%</span>
                  </div>
                  <div style={{ height: '6px', backgroundColor: 'var(--bg-elevated)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: `${progressPct}%`, height: '100%', backgroundColor: 'var(--accent-blue)', transition: 'width 0.3s ease' }} />
                  </div>
                </div>

                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between', paddingTop: '0.65rem', borderTop: '1px solid var(--border-subtle)' }}>
                  <span>Task: {proj.currentTask || 'In progress'}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: '600', color: 'var(--accent-blue)' }}>Due: {proj.deadline}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
