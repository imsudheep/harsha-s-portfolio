import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  initialProfile, 
  initialContacts, 
  initialProjects, 
  initialSharedSpaces,
  initialFiles,
  initialMessages,
  initialActivityFeed,
  initialDocuments,
  initialPortfolio 
} from '../data/sampleData';

const AppContext = createContext();

const STORAGE_KEYS = {
  PROFILE: 'flov_user_profile',
  CONTACTS: 'flov_contacts',
  PROJECTS: 'flov_projects',
  SHARED_SPACES: 'flov_shared_spaces',
  FILES: 'flov_files',
  MESSAGES: 'flov_messages',
  ACTIVITY: 'flov_activity',
  DOCUMENTS: 'flov_documents',
  PORTFOLIO: 'flov_portfolio',
  THEME: 'flov_theme'
};

export const AppProvider = ({ children }) => {
  // Load state from localStorage or seed sample data
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PROFILE);
    return saved ? JSON.parse(saved) : initialProfile;
  });

  const [contacts, setContacts] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CONTACTS);
    return saved ? JSON.parse(saved) : initialContacts;
  });

  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    return saved ? JSON.parse(saved) : initialProjects;
  });

  const [sharedSpaces, setSharedSpaces] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SHARED_SPACES);
    return saved ? JSON.parse(saved) : initialSharedSpaces;
  });

  const [files, setFiles] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.FILES);
    return saved ? JSON.parse(saved) : initialFiles;
  });

  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.MESSAGES);
    return saved ? JSON.parse(saved) : initialMessages;
  });

  const [activityFeed, setActivityFeed] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ACTIVITY);
    return saved ? JSON.parse(saved) : initialActivityFeed;
  });

  const [documents, setDocuments] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.DOCUMENTS);
    return saved ? JSON.parse(saved) : initialDocuments;
  });

  const [portfolio, setPortfolio] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PORTFOLIO);
    return saved ? JSON.parse(saved) : initialPortfolio;
  });

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem(STORAGE_KEYS.THEME) || 'light';
  });

  // Space & Navigation State
  const [activeSpaceId, setActiveSpaceId] = useState('MY_SPACE'); // 'MY_SPACE' or 'space-1', etc.
  const [currentRole, setCurrentRole] = useState('FREELANCER'); // 'FREELANCER' | 'CLIENT'
  const [activeView, setActiveView] = useState('HOME');
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [selectedContactId, setSelectedContactId] = useState(null);
  const [editingDocument, setEditingDocument] = useState(null);
  
  // Modals & UI Controls
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCreateSpaceOpen, setIsCreateSpaceOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Sync state to LocalStorage
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile)); }, [profile]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.CONTACTS, JSON.stringify(contacts)); }, [contacts]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects)); }, [projects]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.SHARED_SPACES, JSON.stringify(sharedSpaces)); }, [sharedSpaces]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.FILES, JSON.stringify(files)); }, [files]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages)); }, [messages]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.ACTIVITY, JSON.stringify(activityFeed)); }, [activityFeed]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.DOCUMENTS, JSON.stringify(documents)); }, [documents]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.PORTFOLIO, JSON.stringify(portfolio)); }, [portfolio]);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Toast notification helper
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Switch between MY SPACE and SHARED SPACES
  const switchSpace = (spaceId) => {
    setActiveSpaceId(spaceId);
    if (spaceId === 'MY_SPACE') {
      setActiveView('HOME');
      setCurrentRole('FREELANCER');
    } else {
      setActiveView('SHARED_SPACE_OVERVIEW');
    }
  };

  const toggleRole = () => {
    setCurrentRole(prev => {
      const next = prev === 'FREELANCER' ? 'CLIENT' : 'FREELANCER';
      showToast(`Switched view to ${next === 'CLIENT' ? 'Client View (Preview)' : 'Freelancer View'}`);
      return next;
    });
  };

  // Reset Workspace to Sample Data
  const resetToSampleData = () => {
    setProfile(initialProfile);
    setContacts(initialContacts);
    setProjects(initialProjects);
    setSharedSpaces(initialSharedSpaces);
    setFiles(initialFiles);
    setMessages(initialMessages);
    setActivityFeed(initialActivityFeed);
    setDocuments(initialDocuments);
    setPortfolio(initialPortfolio);
    setActiveSpaceId('MY_SPACE');
    setCurrentRole('FREELANCER');
    setActiveView('HOME');
    showToast('Workspace reset to sample data.');
  };

  // --- SHARED SPACE ACTIONS ---
  const createSharedSpace = ({ name, contactId, projectId }) => {
    const contact = contacts.find(c => c.id === contactId);
    const newSpace = {
      id: `space-${Date.now()}`,
      name: name || `${contact?.name || 'Client'} × ${profile.fullName}`,
      subtitle: `Collaborative Digital Office`,
      contactId,
      projectId,
      members: [
        { name: profile.fullName, role: 'Freelancer', email: profile.email },
        { name: contact?.name || 'Client', role: 'Client', email: contact?.email || '' }
      ],
      createdAt: new Date().toISOString().split('T')[0]
    };
    setSharedSpaces(prev => [newSpace, ...prev]);

    // Link project if provided
    if (projectId) {
      setProjects(prev => prev.map(p => p.id === projectId ? { ...p, sharedSpaceId: newSpace.id } : p));
    }

    logActivity(newSpace.id, profile.fullName, `created Shared Space "${newSpace.name}"`);
    showToast(`Shared Space "${newSpace.name}" created!`);
    switchSpace(newSpace.id);
    return newSpace;
  };

  // Log Activity Event
  const logActivity = (sharedSpaceId, actorName, actionText) => {
    const newAct = {
      id: `act-${Date.now()}`,
      sharedSpaceId,
      actorName,
      actionText,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };
    setActivityFeed(prev => [newAct, ...prev]);
  };

  // --- DELIVERABLE APPROVALS & STATUS ---
  const updateDeliverableApproval = (projectId, deliverableId, approvalStatus, notes = '') => {
    setProjects(prev => prev.map(p => {
      if (p.id !== projectId) return p;
      const updatedDeliverables = p.deliverables.map(d => {
        if (d.id !== deliverableId) return d;
        let status = d.status;
        if (approvalStatus === 'APPROVED') status = 'COMPLETED';
        if (approvalStatus === 'REVISION_REQUESTED') status = 'REVISION';
        return {
          ...d,
          approvalStatus,
          status,
          notes: notes ? `${d.notes} [Feedback: ${notes}]` : d.notes
        };
      });

      // Log Activity if in shared space
      if (p.sharedSpaceId) {
        const del = p.deliverables.find(d => d.id === deliverableId);
        const actor = currentRole === 'CLIENT' ? 'Client' : profile.fullName;
        const verb = approvalStatus === 'APPROVED' ? 'approved' : 'requested revision for';
        logActivity(p.sharedSpaceId, actor, `${verb} ${del?.title || 'deliverable'}`);
      }

      return { ...p, deliverables: updatedDeliverables };
    }));

    showToast(`Deliverable ${approvalStatus === 'APPROVED' ? 'approved ✓' : 'revision requested 💬'}`);
  };

  const updateDeliverableStatus = (projectId, deliverableId, newStatus) => {
    setProjects(prev => prev.map(p => {
      if (p.id !== projectId) return p;
      const updatedDeliverables = p.deliverables.map(d => 
        d.id === deliverableId ? { ...d, status: newStatus } : d
      );
      return { ...p, deliverables: updatedDeliverables };
    }));
    showToast(`Deliverable status updated to ${newStatus}`);
  };

  const addDeliverable = (projectId, deliverableData) => {
    setProjects(prev => prev.map(p => {
      if (p.id !== projectId) return p;
      const newDel = {
        id: `del-${Date.now()}`,
        category: 'Task',
        status: 'QUEUED',
        approvalStatus: 'PENDING',
        dueDate: p.deadline || '',
        notes: '',
        ...deliverableData
      };
      return { ...p, deliverables: [...p.deliverables, newDel] };
    }));
    showToast('Deliverable added.');
  };

  // --- FILE ACTIONS ---
  const addFile = (fileData) => {
    const newFile = {
      id: `file-${Date.now()}`,
      uploadDate: new Date().toISOString().split('T')[0],
      uploadedBy: currentRole === 'CLIENT' ? 'Client' : profile.fullName,
      privacy: currentRole === 'CLIENT' ? 'CLIENT_UPLOADED' : 'SHARED',
      fileUrl: '#',
      ...fileData
    };
    setFiles(prev => [newFile, ...prev]);

    if (newFile.sharedSpaceId) {
      logActivity(newFile.sharedSpaceId, newFile.uploadedBy, `uploaded file ${newFile.fileName}`);
    }

    showToast(`File "${newFile.fileName}" uploaded.`);
    return newFile;
  };

  const updateFilePrivacy = (fileId, newPrivacy) => {
    setFiles(prev => prev.map(f => f.id === fileId ? { ...f, privacy: newPrivacy } : f));
    showToast(`File access level set to ${newPrivacy}`);
  };

  const deleteFile = (fileId) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
    showToast('File removed.');
  };

  // --- MESSAGING ACTIONS ---
  const sendMessage = ({ sharedSpaceId, projectId, deliverableId, text }) => {
    const newMsg = {
      id: `msg-${Date.now()}`,
      sharedSpaceId,
      projectId,
      deliverableId,
      senderName: currentRole === 'CLIENT' ? 'Client' : profile.fullName,
      senderRole: currentRole === 'CLIENT' ? 'Client' : 'Freelancer',
      text,
      timestamp: 'Just now'
    };
    setMessages(prev => [...prev, newMsg]);
  };

  // --- PROJECT CRUD ---
  const addProject = (projectData) => {
    const newProj = {
      id: `proj-${Date.now()}`,
      deliverables: [],
      currency: "₹",
      status: "WORKING",
      category: "General",
      ...projectData
    };
    setProjects(prev => [newProj, ...prev]);
    showToast(`Project "${newProj.name}" created.`);
    return newProj;
  };

  const updateProject = (id, projectData) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, ...projectData } : p));
    showToast('Project updated.');
  };

  const deleteProject = (id) => {
    setProjects(prev => prev.filter(p => p.id !== id));
    showToast('Project deleted.');
  };

  // --- CONTACT CRUD ---
  const addContact = (contactData) => {
    const newContact = {
      id: `contact-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      ...contactData
    };
    setContacts(prev => [newContact, ...prev]);
    showToast(`Client "${newContact.name}" added.`);
    return newContact;
  };

  const updateContact = (id, contactData) => {
    setContacts(prev => prev.map(c => c.id === id ? { ...c, ...contactData } : c));
    showToast('Client info updated.');
  };

  const deleteContact = (id) => {
    setContacts(prev => prev.filter(c => c.id !== id));
    showToast('Client deleted.');
  };

  // --- DOCUMENT ACTIONS ---
  const saveDocument = (docData) => {
    if (docData.id) {
      setDocuments(prev => prev.map(d => d.id === docData.id ? { ...docData, updatedAt: new Date().toISOString() } : d));
      showToast(`${docData.type} updated.`);
    } else {
      const newDoc = {
        id: `doc-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: docData.type === 'Invoice' ? 'Sent' : 'Draft',
        privacy: docData.privacy || 'PRIVATE_DRAFT',
        ...docData
      };
      setDocuments(prev => [newDoc, ...prev]);
      showToast(`${newDoc.type} created.`);
      return newDoc;
    }
  };

  const duplicateDocument = (id) => {
    const original = documents.find(d => d.id === id);
    if (!original) return;

    const duplicate = {
      ...original,
      id: `doc-${Date.now()}`,
      docNumber: original.docNumber ? `${original.docNumber}-COPY` : 'COPY',
      title: `${original.title} (Copy)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setDocuments(prev => [duplicate, ...prev]);
    showToast(`Duplicated ${original.type}.`);
  };

  const deleteDocument = (id) => {
    setDocuments(prev => prev.filter(d => d.id !== id));
    showToast('Document deleted.');
  };

  // --- PORTFOLIO ACTIONS ---
  const addPortfolioItem = (itemData) => {
    const newItem = {
      id: `port-${Date.now()}`,
      visibility: 'PUBLIC',
      ...itemData
    };
    setPortfolio(prev => [newItem, ...prev]);
    showToast('Portfolio item created.');
  };

  const updatePortfolioItem = (id, itemData) => {
    setPortfolio(prev => prev.map(p => p.id === id ? { ...p, ...itemData } : p));
    showToast('Portfolio updated.');
  };

  const deletePortfolioItem = (id) => {
    setPortfolio(prev => prev.filter(p => p.id !== id));
    showToast('Portfolio item removed.');
  };

  const updateProfile = (profileData) => {
    setProfile(prev => ({ ...prev, ...profileData }));
    showToast('Profile & Brand settings saved.');
  };

  return (
    <AppContext.Provider value={{
      profile,
      contacts,
      projects,
      sharedSpaces,
      files,
      messages,
      activityFeed,
      documents,
      portfolio,
      theme,
      toggleTheme,
      activeSpaceId,
      switchSpace,
      currentRole,
      toggleRole,
      activeView,
      setActiveView,
      selectedProjectId,
      setSelectedProjectId,
      selectedContactId,
      setSelectedContactId,
      editingDocument,
      setEditingDocument,
      isSearchOpen,
      setIsSearchOpen,
      isCreateSpaceOpen,
      setIsCreateSpaceOpen,
      toastMessage,
      showToast,
      resetToSampleData,
      createSharedSpace,
      updateDeliverableApproval,
      updateDeliverableStatus,
      addDeliverable,
      addFile,
      updateFilePrivacy,
      deleteFile,
      sendMessage,
      addProject,
      updateProject,
      deleteProject,
      addContact,
      updateContact,
      deleteContact,
      saveDocument,
      duplicateDocument,
      deleteDocument,
      addPortfolioItem,
      updatePortfolioItem,
      deletePortfolioItem,
      updateProfile
    }}>
      {children}

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '1.5rem',
          right: '1.5rem',
          backgroundColor: 'var(--text-primary)',
          color: 'var(--bg-main)',
          padding: '0.625rem 1.25rem',
          borderRadius: 'var(--radius-sm)',
          fontSize: '0.875rem',
          fontWeight: '600',
          boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
          zIndex: 9999,
          animation: 'fadeIn 0.2s ease'
        }}>
          {toastMessage}
        </div>
      )}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
