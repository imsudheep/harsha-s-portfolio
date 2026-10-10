import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FlovAppIcon, FlovWordmark } from './FlovLogo';
import { 
  Home, 
  FolderKanban, 
  Users, 
  FileText, 
  FolderOpen,
  UserCheck, 
  Menu, 
  X, 
  Plus, 
  Search,
  Sun,
  Moon,
  Shield,
  Sparkles,
  Briefcase
} from 'lucide-react';

export const MobileNav = ({ onQuickNew }) => {
  const { 
    activeView, 
    setActiveView, 
    theme, 
    toggleTheme,
    setIsSearchOpen,
    activeSpaceId,
    switchSpace,
    sharedSpaces,
    profile
  } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  const bottomNavItems = [
    { id: 'HOME', label: 'Home', icon: Home },
    { id: 'PROJECTS', label: 'Projects', icon: FolderKanban },
    { id: 'CONTACTS', label: 'Clients', icon: Users },
    { id: 'DOCUMENTS', label: 'Docs', icon: FileText },
    { id: 'FILES', label: 'Vault', icon: FolderOpen }
  ];

  return (
    <>
      {/* Mobile Top Header (Notion Style) */}
      <div className="mobile-header no-print">
        <div 
          onClick={() => setActiveView('HOME')}
          style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', cursor: 'pointer' }}
        >
          <FlovAppIcon size={30} bg="var(--accent-blue)" iconColor="#FFFFFF" />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <FlovWordmark height={18} color="var(--text-primary)" />
            <div style={{ fontSize: '0.55rem', color: 'var(--text-muted)', fontWeight: '600', letterSpacing: '0.05em', marginTop: '0.15rem' }}>DIGITAL OFFICE</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <button 
            onClick={() => setIsSearchOpen(true)} 
            className="btn-ghost" 
            style={{ padding: '0.4rem' }}
            title="Search"
          >
            <Search size={18} />
          </button>
          <button 
            onClick={onQuickNew} 
            className="btn-primary" 
            style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem', borderRadius: '8px' }}
          >
            <Plus size={14} /> NEW
          </button>
          <button 
            onClick={() => setIsOpen(true)} 
            className="btn-ghost" 
            style={{ padding: '0.4rem' }}
            title="Menu Drawer"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* Floating Bottom Capsule Navigation Bar (Matching Reference Mockup) */}
      <div className="mobile-bottom-bar floating-capsule-bar no-print">
        {bottomNavItems.map(item => {
          const Icon = item.icon;
          const isActive = activeView === item.id || 
                           (activeView === 'PROJECT_DETAIL' && item.id === 'PROJECTS') || 
                           (activeView === 'DOCUMENT_EDITOR' && item.id === 'DOCUMENTS');
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`floating-capsule-item ${isActive ? 'floating-capsule-active' : ''}`}
              title={item.label}
            >
              <Icon size={20} strokeWidth={isActive ? 2.2 : 1.8} />
            </button>
          );
        })}
      </div>

      {/* Mobile Full Slide-in Drawer */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)} 
          className="modal-overlay no-print"
          style={{ justifyContent: 'flex-start', padding: 0 }}
        >
          <div 
            onClick={e => e.stopPropagation()}
            style={{
              width: '84%',
              maxWidth: '310px',
              height: '100%',
              backgroundColor: 'var(--bg-card)',
              borderRight: '1px solid var(--border-subtle)',
              padding: '1.25rem 1rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              overflowY: 'auto'
            }}
          >
            <div>
              {/* Drawer Top Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    backgroundColor: 'var(--accent-blue)',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '800',
                    fontSize: '0.9rem'
                  }}>
                    F
                  </div>
                  <span style={{ fontWeight: '800', fontSize: '1.05rem', fontFamily: 'var(--font-display)' }}>FLOV Workspace</span>
                </div>
                <button onClick={() => setIsOpen(false)} className="btn-ghost" style={{ padding: '0.35rem' }}>
                  <X size={18} />
                </button>
              </div>

              {/* Private / Shared Workspace Section */}
              <div style={{ padding: '0.75rem', backgroundColor: 'var(--bg-elevated)', borderRadius: 'var(--radius-md)', marginBottom: '1.25rem' }}>
                <div style={{ fontSize: '0.625rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>
                  ACTIVE WORKSPACE
                </div>
                <button
                  onClick={() => {
                    switchSpace('MY_SPACE');
                    setIsOpen(false);
                  }}
                  className="nav-pill"
                  style={{ backgroundColor: activeSpaceId === 'MY_SPACE' ? 'var(--bg-card)' : 'transparent', marginBottom: '0.35rem' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Shield size={15} style={{ color: 'var(--accent-blue)' }} />
                    <span style={{ fontSize: '0.825rem', fontWeight: '600' }}>My Space (Private)</span>
                  </div>
                </button>
                {sharedSpaces.map(s => (
                  <button
                    key={s.id}
                    onClick={() => {
                      switchSpace(s.id);
                      setIsOpen(false);
                    }}
                    className="nav-pill"
                    style={{ backgroundColor: activeSpaceId === s.id ? 'var(--bg-card)' : 'transparent' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Sparkles size={14} style={{ color: 'var(--accent-blue)' }} />
                      <span style={{ fontSize: '0.825rem' }}>{s.name}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* All Navigation Links */}
              <div style={{ fontSize: '0.65rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', padding: '0 0.5rem', marginBottom: '0.5rem' }}>
                NAVIGATION
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <button onClick={() => { setActiveView('HOME'); setIsOpen(false); }} className={`nav-pill ${activeView === 'HOME' ? 'nav-pill-active' : ''}`}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}><Home size={16} /> <span>Command Center</span></div>
                </button>
                <button onClick={() => { setActiveView('PROJECTS'); setIsOpen(false); }} className={`nav-pill ${activeView === 'PROJECTS' || activeView === 'PROJECT_DETAIL' ? 'nav-pill-active' : ''}`}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}><FolderKanban size={16} /> <span>Projects Tracker</span></div>
                </button>
                <button onClick={() => { setActiveView('CONTACTS'); setIsOpen(false); }} className={`nav-pill ${activeView === 'CONTACTS' ? 'nav-pill-active' : ''}`}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}><Users size={16} /> <span>Client Contacts</span></div>
                </button>
                <button onClick={() => { setActiveView('DOCUMENTS'); setIsOpen(false); }} className={`nav-pill ${activeView === 'DOCUMENTS' || activeView === 'DOCUMENT_EDITOR' ? 'nav-pill-active' : ''}`}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}><FileText size={16} /> <span>Documents &amp; Invoices</span></div>
                </button>
                <button onClick={() => { setActiveView('FILES'); setIsOpen(false); }} className={`nav-pill ${activeView === 'FILES' ? 'nav-pill-active' : ''}`}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}><FolderOpen size={16} /> <span>Files Vault</span></div>
                </button>
                <button onClick={() => { setActiveView('PORTFOLIO'); setIsOpen(false); }} className={`nav-pill ${activeView === 'PORTFOLIO' ? 'nav-pill-active' : ''}`}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}><Briefcase size={16} /> <span>Portfolio Showcase</span></div>
                </button>
                <button onClick={() => { setActiveView('PROFILE_BRAND'); setIsOpen(false); }} className={`nav-pill ${activeView === 'PROFILE_BRAND' ? 'nav-pill-active' : ''}`}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}><UserCheck size={16} /> <span>Profile &amp; Brand</span></div>
                </button>
              </div>
            </div>

            {/* Bottom Footer Options */}
            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-secondary)' }}>
                {profile.fullName || 'Harsha'}
              </div>
              <button onClick={toggleTheme} className="btn-ghost" style={{ padding: '0.35rem' }}>
                {theme === 'dark' ? <Sun size={16} style={{ color: '#FBBF24' }} /> : <Moon size={16} style={{ color: '#1D4ED8' }} />}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
