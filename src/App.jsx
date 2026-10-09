import React from 'react';
import { useApp } from './context/AppContext';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { MobileNav } from './components/MobileNav';
import { SearchModal } from './components/SearchModal';
import { SpaceSwitcherModal } from './components/SpaceSwitcherModal';

import { HomeView } from './views/HomeView';
import { ProjectsView } from './views/ProjectsView';
import { ContactsView } from './views/ContactsView';
import { DocumentsView } from './views/DocumentsView';
import { DocumentEditorView } from './views/DocumentEditorView';
import { ProfileBrandView } from './views/ProfileBrandView';
import { SharedSpaceView } from './views/SharedSpaceView';
import { FilesView } from './views/FilesView';
import { PortfolioView } from './views/PortfolioView';

export const AppContent = () => {
  const { 
    activeSpaceId, 
    activeView, 
    setActiveView, 
    setEditingDocument, 
    contacts, 
    projects 
  } = useApp();

  const handleQuickNewDocument = () => {
    setEditingDocument({
      type: 'Invoice',
      title: 'New Invoice',
      date: new Date().toISOString().split('T')[0],
      contactId: contacts[0]?.id || '',
      projectId: projects[0]?.id || '',
      items: [{ id: 'i1', description: 'Freelance Service', quantity: 1, rate: 10000, amount: 10000 }],
      subtotal: 10000,
      total: 10000
    });
    setActiveView('DOCUMENT_EDITOR');
  };

  const renderCurrentView = () => {
    // If inside a Shared Space
    if (activeSpaceId !== 'MY_SPACE') {
      return <SharedSpaceView />;
    }

    // Inside MY SPACE
    switch (activeView) {
      case 'HOME':
        return <HomeView onQuickNew={handleQuickNewDocument} />;
      case 'PROJECTS':
      case 'PROJECT_DETAIL':
        return <ProjectsView />;
      case 'CONTACTS':
        return <ContactsView />;
      case 'DOCUMENTS':
        return <DocumentsView />;
      case 'DOCUMENT_EDITOR':
        return <DocumentEditorView />;
      case 'FILES':
        return <FilesView />;
      case 'PORTFOLIO':
        return <PortfolioView />;
      case 'PROFILE_BRAND':
        return <ProfileBrandView />;
      default:
        return <HomeView onQuickNew={handleQuickNewDocument} />;
    }
  };

  return (
    <div className="app-viewport">
      {/* Mobile Header & Bottom Navigation Bar (Active on Mobile Phones <= 768px) */}
      <MobileNav onQuickNew={handleQuickNewDocument} />

      {/* Left Navigation Sidebar (Active on Laptops & Desktops > 768px) */}
      <Sidebar onQuickNew={handleQuickNewDocument} />

      {/* Main Content Area */}
      <div className="app-main-wrapper" style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, minHeight: 0, height: '100%', overflow: 'hidden' }}>
        <Header onQuickNew={handleQuickNewDocument} />

        <main style={{ flex: 1, padding: '2rem 2.5rem 4rem 2.5rem', overflowY: 'auto' }}>
          {renderCurrentView()}
        </main>
      </div>

      {/* Global Modals */}
      <SearchModal />
      <SpaceSwitcherModal />
    </div>
  );
};
