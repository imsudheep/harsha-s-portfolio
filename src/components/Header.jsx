import React from 'react';
import { useApp } from '../context/AppContext';
import { Search, Grid, Plus } from 'lucide-react';

export const Header = ({ onQuickNew }) => {
  const { 
    activeSpaceId, 
    sharedSpaces, 
    activeView, 
    setIsSearchOpen,
    profile
  } = useApp();

  const currentSpace = sharedSpaces.find(s => s.id === activeSpaceId);

  const getBreadcrumb = () => {
    if (activeSpaceId !== 'MY_SPACE') {
      return `SHARED SPACES / ${currentSpace?.name || 'Collaboration Room'}`;
    }
    switch (activeView) {
      case 'HOME': return 'COMMAND CENTER';
      case 'PROJECTS': return 'PROJECTS OVERVIEW';
      case 'PROJECT_DETAIL': return 'PROJECT TRACKER';
      case 'CONTACTS': return 'CLIENT CONTACTS';
      case 'DOCUMENTS': return 'DOCUMENTS HUB';
      case 'DOCUMENT_EDITOR': return 'DOCUMENT BUILDER';
      case 'FILES': return 'FILES VAULT';
      case 'PORTFOLIO': return 'PORTFOLIO SHOWCASE';
      case 'PROFILE_BRAND': return 'PROFILE & BRAND';
      default: return 'MY SPACE';
    }
  };

  return (
    <header style={{
      height: '64px',
      backgroundColor: 'var(--bg-main)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 2rem',
      position: 'sticky',
      top: 0,
      zIndex: 30
    }} className="no-print">
      {/* Location Title */}
      <div>
        <div style={{
          fontSize: '0.725rem',
          fontWeight: '700',
          letterSpacing: '0.08em',
          color: 'var(--text-muted)',
          textTransform: 'uppercase'
        }}>
          {getBreadcrumb()}
        </div>
      </div>

      {/* Header Right Actions (Search & User Profile Avatar Pill matching reference image) */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        {/* Search Trigger Input Pill */}
        <button
          onClick={() => setIsSearchOpen(true)}
          style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-medium)',
            color: 'var(--text-secondary)',
            padding: '0.5rem 1rem',
            borderRadius: '9999px',
            fontSize: '0.8rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem'
          }}
          className="btn-secondary"
        >
          <Search size={15} style={{ color: 'var(--accent-blue)' }} />
          <span>Search...</span>
          <kbd style={{
            backgroundColor: 'var(--bg-elevated)',
            border: '1px solid var(--border-medium)',
            padding: '0.1rem 0.35rem',
            borderRadius: '4px',
            fontSize: '0.625rem',
            fontFamily: 'var(--font-mono)',
            color: 'var(--text-muted)',
            fontWeight: '600'
          }}>
            ⌘K
          </kbd>
        </button>

        {/* Create Invoice Action Button (Coral Red button inspired by reference image) */}
        <button onClick={onQuickNew} className="btn-primary" style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}>
          <Plus size={15} /> + New
        </button>

        {/* User Profile Avatar Pill (Matching top right of reference image) */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          backgroundColor: 'var(--bg-card)',
          padding: '0.35rem 0.75rem 0.35rem 0.35rem',
          borderRadius: '9999px',
          border: '1px solid var(--border-subtle)'
        }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: 'var(--accent-blue)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: '700',
            fontSize: '0.85rem',
            position: 'relative'
          }}>
            {profile.fullName ? profile.fullName.charAt(0) : 'H'}
            <span style={{
              width: '9px',
              height: '9px',
              borderRadius: '50%',
              backgroundColor: '#10B981',
              border: '2px solid var(--bg-card)',
              position: 'absolute',
              top: 0,
              right: 0
            }}></span>
          </div>
          <div style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-primary)' }}>
            {profile.fullName || 'Harsha'}
          </div>
          <Grid size={15} style={{ color: 'var(--text-muted)', marginLeft: '0.25rem' }} />
        </div>
      </div>
    </header>
  );
};
