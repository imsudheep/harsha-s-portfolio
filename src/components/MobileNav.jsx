import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Home, FolderKanban, Users, FileText, UserCheck, Menu, X, Plus } from 'lucide-react';

export const MobileNav = ({ onQuickNew }) => {
  const { activeView, setActiveView } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'HOME', label: 'HOME', icon: Home },
    { id: 'PROJECTS', label: 'PROJECTS', icon: FolderKanban },
    { id: 'CONTACTS', label: 'CONTACTS', icon: Users },
    { id: 'DOCUMENTS', label: 'DOCUMENTS', icon: FileText },
    { id: 'PROFILE_BRAND', label: 'PROFILE / BRAND', icon: UserCheck }
  ];

  return (
    <>
      {/* Mobile Top Header */}
      <div className="mobile-header no-print" style={{
        display: 'none',
        height: '56px',
        borderBottom: '1px solid var(--border-subtle)',
        backgroundColor: 'var(--bg-sidebar)',
        padding: '0 1rem',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 40
      }}>
        <div 
          onClick={() => setActiveView('HOME')}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}
        >
          <div style={{
            width: '28px',
            height: '28px',
            backgroundColor: 'var(--text-primary)',
            color: 'var(--bg-main)',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: '800',
            fontSize: '0.9rem'
          }}>
            F
          </div>
          <span style={{ fontWeight: '700', letterSpacing: '0.05em', fontSize: '1rem' }}>FLOV</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button onClick={onQuickNew} className="btn-primary" style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem' }}>
            <Plus size={14} /> NEW
          </button>
          <button onClick={() => setIsOpen(!isOpen)} className="btn-ghost" style={{ padding: '0.4rem' }}>
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Drawer Overlay */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)} 
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.7)',
            zIndex: 45
          }}
          className="no-print"
        >
          <div 
            onClick={e => e.stopPropagation()}
            style={{
              width: '75%',
              maxWidth: '280px',
              height: '100%',
              backgroundColor: 'var(--bg-sidebar)',
              padding: '1.5rem 1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem'
            }}
          >
            <div style={{ fontWeight: '700', letterSpacing: '0.1em', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              NAVIGATION
            </div>
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveView(item.id);
                    setIsOpen(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: isActive ? 'var(--bg-card-hover)' : 'transparent',
                    color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                    fontWeight: isActive ? '600' : '400',
                    fontSize: '0.85rem'
                  }}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* CSS Rule for mobile header toggle */}
      <style>{`
        @media (max-width: 768px) {
          aside { display: none !important; }
          header { display: none !important; }
          .mobile-header { display: flex !important; }
        }
      `}</style>
    </>
  );
};
