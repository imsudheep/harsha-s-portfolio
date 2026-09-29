import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Home, 
  FolderKanban, 
  Users, 
  FileText, 
  FolderOpen,
  Briefcase,
  UserCheck,
  Plus,
  Shield,
  MessageSquare,
  Activity,
  CheckCircle2,
  Sparkles,
  Sun,
  Moon,
  ChevronsUpDown,
  Settings
} from 'lucide-react';

export const Sidebar = ({ onQuickNew }) => {
  const { 
    activeSpaceId, 
    switchSpace, 
    sharedSpaces, 
    contacts, 
    projects,
    documents,
    files,
    activeView, 
    setActiveView, 
    profile, 
    theme, 
    toggleTheme,
    setIsCreateSpaceOpen
  } = useApp();

  const [isSwitcherOpen, setIsSwitcherOpen] = useState(false);

  // Counts
  const workingDeliverablesCount = projects.reduce((acc, p) => acc + (p.deliverables?.filter(d => d.status === 'WORKING' || d.status === 'REVISION').length || 0), 0);
  const activeProjectsCount = projects.length;
  const clientsCount = contacts.length;
  const documentsCount = documents.length;
  const filesCount = files.length;

  const mySpaceNav = [
    { id: 'HOME', label: 'Command Center', icon: Home, count: workingDeliverablesCount || 3 },
    { id: 'PROJECTS', label: 'Projects', icon: FolderKanban, count: activeProjectsCount },
    { id: 'CONTACTS', label: 'Clients', icon: Users, count: clientsCount },
    { id: 'DOCUMENTS', label: 'Documents', icon: FileText, count: documentsCount },
    { id: 'FILES', label: 'Files Vault', icon: FolderOpen, count: filesCount },
    { id: 'PORTFOLIO', label: 'Portfolio', icon: Briefcase, count: 2 },
    { id: 'PROFILE_BRAND', label: 'Profile / Brand', icon: UserCheck }
  ];

  const sharedSpaceNav = [
    { id: 'SHARED_SPACE_OVERVIEW', label: 'Overview', icon: Home },
    { id: 'SHARED_SPACE_DELIVERABLES', label: 'Deliverables', icon: CheckCircle2, count: 6 },
    { id: 'SHARED_SPACE_FILES', label: 'Shared Files', icon: FolderOpen, count: 4 },
    { id: 'SHARED_SPACE_DOCUMENTS', label: 'Documents', icon: FileText, count: 2 },
    { id: 'SHARED_SPACE_MESSAGES', label: 'Messages', icon: MessageSquare, count: 2 },
    { id: 'SHARED_SPACE_ACTIVITY', label: 'Activity Feed', icon: Activity }
  ];

  const currentSpace = sharedSpaces.find(s => s.id === activeSpaceId);
  const activeNavItems = activeSpaceId === 'MY_SPACE' ? mySpaceNav : sharedSpaceNav;

  return (
    <div style={{ display: 'flex', height: '100%' }} className="no-print">
      {/* ==================================================
          1. CURVED ROYAL BLUE LEFT RAIL BAR (Matching Image)
         ================================================== */}
      <div className="rail-sidebar">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            backgroundColor: '#FFFFFF',
            color: '#1D4ED8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: '900',
            fontSize: '1.15rem',
            marginBottom: '1rem',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
          }}>
            F
          </div>

          {/* Quick Icon Navigation Buttons */}
          <button 
            title="Command Center"
            onClick={() => setActiveView('HOME')}
            className={`rail-icon-btn ${activeView === 'HOME' ? 'rail-icon-btn-active' : ''}`}
          >
            <Home size={20} />
          </button>

          <button 
            title="Projects"
            onClick={() => setActiveView('PROJECTS')}
            className={`rail-icon-btn ${activeView === 'PROJECTS' || activeView === 'PROJECT_DETAIL' ? 'rail-icon-btn-active' : ''}`}
          >
            <FolderKanban size={20} />
          </button>

          <button 
            title="Clients"
            onClick={() => setActiveView('CONTACTS')}
            className={`rail-icon-btn ${activeView === 'CONTACTS' ? 'rail-icon-btn-active' : ''}`}
          >
            <Users size={20} />
          </button>

          <button 
            title="Documents Hub"
            onClick={() => setActiveView('DOCUMENTS')}
            className={`rail-icon-btn ${activeView === 'DOCUMENTS' || activeView === 'DOCUMENT_EDITOR' ? 'rail-icon-btn-active' : ''}`}
          >
            <FileText size={20} />
          </button>

          <button 
            title="Files Vault"
            onClick={() => setActiveView('FILES')}
            className={`rail-icon-btn ${activeView === 'FILES' ? 'rail-icon-btn-active' : ''}`}
          >
            <FolderOpen size={20} />
          </button>
        </div>

        {/* Rail Bottom Settings & Theme */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
          <button 
            title="Profile & Brand Settings"
            onClick={() => setActiveView('PROFILE_BRAND')}
            className={`rail-icon-btn ${activeView === 'PROFILE_BRAND' ? 'rail-icon-btn-active' : ''}`}
          >
            <Settings size={20} />
          </button>
        </div>
      </div>

      {/* ==================================================
          2. SECONDARY SIDEBAR NAVIGATION PANEL
         ================================================== */}
      <aside className="sidebar-panel">
        <div>
          {/* Brand Title */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', padding: '0 0.25rem' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: '800', fontSize: '1.2rem', letterSpacing: '-0.02em', lineHeight: 1 }}>
                FLOV
              </div>
              <div style={{ fontSize: '0.625rem', color: 'var(--text-muted)', fontWeight: '600', letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: '0.2rem' }}>
                DIGITAL OFFICE
              </div>
            </div>
            <span style={{ fontSize: '0.625rem', fontWeight: '700', padding: '0.15rem 0.45rem', borderRadius: '6px', background: 'var(--bg-elevated)', color: 'var(--accent-blue)', border: '1px solid var(--border-subtle)' }}>
              PRO
            </span>
          </div>

          {/* Workspace Switcher Pill */}
          <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
            <div 
              className="profile-switcher-pill"
              onClick={() => setIsSwitcherOpen(!isSwitcherOpen)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', overflow: 'hidden' }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '8px',
                  backgroundColor: 'var(--accent-blue)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '700',
                  fontSize: '0.775rem',
                  flexShrink: 0
                }}>
                  {activeSpaceId === 'MY_SPACE' ? (profile.fullName ? profile.fullName.charAt(0) : 'H') : 'S'}
                </div>
                <div style={{ overflow: 'hidden' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: '700', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {activeSpaceId === 'MY_SPACE' ? (profile.fullName || 'Harsha') : currentSpace?.name}
                  </div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {activeSpaceId === 'MY_SPACE' ? (profile.email || 'harsha@example.com') : 'Shared Space'}
                  </div>
                </div>
              </div>
              <ChevronsUpDown size={14} style={{ color: 'var(--text-muted)' }} />
            </div>

            {/* Switcher Dropdown */}
            {isSwitcherOpen && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                marginTop: '4px',
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-medium)',
                borderRadius: 'var(--radius-md)',
                boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                zIndex: 50,
                padding: '0.5rem',
                overflow: 'hidden'
              }}>
                <div style={{ fontSize: '0.625rem', fontWeight: '700', color: 'var(--text-muted)', letterSpacing: '0.08em', padding: '0.25rem 0.5rem', textTransform: 'uppercase' }}>
                  PRIVATE OFFICE
                </div>
                <button
                  onClick={() => {
                    switchSpace('MY_SPACE');
                    setIsSwitcherOpen(false);
                  }}
                  className="btn-ghost"
                  style={{ width: '100%', justifyContent: 'flex-start', fontSize: '0.8rem', padding: '0.45rem 0.5rem', fontWeight: activeSpaceId === 'MY_SPACE' ? '700' : '400', gap: '0.5rem' }}
                >
                  <Shield size={14} style={{ color: 'var(--accent-blue)' }} /> MY SPACE
                </button>

                <div style={{ fontSize: '0.625rem', fontWeight: '700', color: 'var(--text-muted)', letterSpacing: '0.08em', padding: '0.5rem 0.5rem 0.25rem 0.5rem', textTransform: 'uppercase', marginTop: '0.25rem', borderTop: '1px solid var(--border-subtle)' }}>
                  SHARED SPACES
                </div>
                {sharedSpaces.map(s => (
                  <button
                    key={s.id}
                    onClick={() => {
                      switchSpace(s.id);
                      setIsSwitcherOpen(false);
                    }}
                    className="btn-ghost"
                    style={{ width: '100%', justifyContent: 'flex-start', fontSize: '0.8rem', padding: '0.45rem 0.5rem', fontWeight: activeSpaceId === s.id ? '700' : '400', gap: '0.5rem' }}
                  >
                    <Sparkles size={13} style={{ color: 'var(--accent-cyan)' }} /> {s.name}
                  </button>
                ))}

                <button
                  onClick={() => {
                    setIsCreateSpaceOpen(true);
                    setIsSwitcherOpen(false);
                  }}
                  className="btn-ghost"
                  style={{ width: '100%', justifyContent: 'flex-start', fontSize: '0.775rem', padding: '0.45rem 0.5rem', marginTop: '0.25rem', borderTop: '1px solid var(--border-subtle)', fontWeight: '600', color: 'var(--accent-blue)' }}
                >
                  <Plus size={14} /> + Create Shared Space
                </button>
              </div>
            )}
          </div>

          {/* Navigation Pills */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginBottom: '1.5rem' }}>
            {activeNavItems.map(item => {
              const Icon = item.icon;
              const isActive = activeView === item.id || 
                               (activeView === 'PROJECT_DETAIL' && item.id === 'PROJECTS') || 
                               (activeView === 'DOCUMENT_EDITOR' && item.id === 'DOCUMENTS');
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  className={`nav-pill ${isActive ? 'nav-pill-active' : ''}`}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <Icon size={16} strokeWidth={isActive ? 2.2 : 1.7} />
                    <span>{item.label}</span>
                  </div>
                  {item.count !== undefined && (
                    <span className="nav-count-badge">{item.count}</span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Theme Footer */}
        <div style={{
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: '0.75rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)', fontWeight: '500' }}>FLOV v2.0</span>
          <button
            onClick={toggleTheme}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className="btn-ghost"
            style={{ padding: '0.35rem' }}
          >
            {theme === 'dark' ? <Sun size={15} style={{ color: '#FBBF24' }} /> : <Moon size={15} style={{ color: '#1D4ED8' }} />}
          </button>
        </div>
      </aside>
    </div>
  );
};
