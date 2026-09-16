/* ==========================================================================
   DOTSPACE - STATE MANAGEMENT & STORAGE
   ========================================================================== */

const STORAGE_KEY = 'DOTSPACE_WORKSPACE_STATE_V1';

// Default initial state with realistic freelancer sample data
const defaultState = {
  theme: 'dark',
  activeView: 'home',
  subscription: {
    plan: 'free', // 'free' or 'premium'
    docsCreatedThisMonth: 3,
    maxFreeDocs: 5
  },
  brandProfile: {
    name: 'Harsha Vardhan',
    company: 'Dotspace Studio',
    title: 'Structural Video Engineer & Brand Architect',
    email: 'harsha@dotspace.office',
    phone: '+1 (555) 019-2831',
    website: 'https://harshavardhan.design',
    address: '100 Innovation Way, Suite 400\nSan Francisco, CA 94105',
    logoUrl: '', // fallback to initial badge
    signatureText: 'Harsha Vardhan',
    signatureDataUrl: '',
    paymentDetails: 'Bank: Silicon Valley Bank\nAccount: XXXX-XXXX-4819\nSwift/BIC: SVBKUS6S\nUPI/PayPal: harsha@paypal.me',
    taxId: 'EIN 84-2910381',
    accentFont: 'Inter',
    layoutSpacing: 'standard'
  },
  contacts: [
    {
      id: 'cnt-1',
      name: 'Rahul Sharma',
      company: 'ABC Media',
      role: 'Founder & CEO',
      email: 'rahul@abcmedia.com',
      phone: '+1 (555) 234-5678',
      website: 'https://abcmedia.com',
      socialUrl: 'https://linkedin.com/in/rahulsharma',
      serviceDiscussed: 'Personal Brand Video Editing & Strategy',
      lastContacted: '2026-08-15',
      nextFollowUp: '2026-08-20',
      notes: 'Sent portfolio and initial welcome note. Waiting for video asset uploads.'
    },
    {
      id: 'cnt-2',
      name: 'Arjun Rao',
      company: 'Studio Minimal',
      role: 'Design Director',
      email: 'arjun@studiominimal.io',
      phone: '+1 (555) 876-5432',
      website: 'https://studiominimal.io',
      socialUrl: 'https://twitter.com/arjunrao',
      serviceDiscussed: 'Design Architecture & Master Services Agreement',
      lastContacted: '2026-08-14',
      nextFollowUp: '2026-08-22',
      notes: 'Agreement signed. Kickoff scheduled for next Tuesday.'
    },
    {
      id: 'cnt-3',
      name: 'Sarah Chen',
      company: 'Venture Labs',
      role: 'Marketing Lead',
      email: 'sarah@venturelabs.io',
      phone: '+1 (555) 345-6789',
      website: 'https://venturelabs.io',
      socialUrl: 'https://linkedin.com/in/sarahchen',
      serviceDiscussed: 'Q4 Product Launch Video Campaign',
      lastContacted: '2026-08-12',
      nextFollowUp: '2026-08-19',
      notes: 'Sent proposal quotation for $6,500. Needs board signoff.'
    }
  ],
  documents: [
    {
      id: 'doc-1',
      docNumber: 'DOC-2026-001',
      type: 'Welcome Note',
      title: 'Welcome Note - Rahul Sharma',
      contactId: 'cnt-1',
      contactName: 'Rahul Sharma',
      contactCompany: 'ABC Media',
      contactEmail: 'rahul@abcmedia.com',
      date: '2026-08-15',
      dueDate: '',
      status: 'Sent',
      content: 'Dear Rahul,\n\nWe are thrilled to welcome you to Harsha Creative Studio! We are excited to collaborate with you on your Personal Brand Video Campaign.\n\nOur team is dedicated to producing high-impact, refined visual narratives tailored to your audience. We will walk you through each phase of production with total clarity.\n\nThank you for trusting us with your vision.',
      items: [],
      signatureIncluded: true,
      customFont: 'Inter',
      customSpacing: 'standard'
    },
    {
      id: 'doc-2',
      docNumber: 'DOC-2026-002',
      type: 'Invoice',
      title: 'Invoice - ABC Media',
      contactId: 'cnt-1',
      contactName: 'Rahul Sharma',
      contactCompany: 'ABC Media',
      contactEmail: 'rahul@abcmedia.com',
      date: '2026-08-15',
      dueDate: '2026-08-30',
      status: 'Paid',
      content: 'Payment terms: Net 15. Please remit payment via bank transfer or PayPal details below.',
      items: [
        { description: 'Personal Brand Video Editing (4 Episodes)', qty: 4, rate: 850, amount: 3400 },
        { description: 'Motion Design & Sound Engineering', qty: 1, rate: 1100, amount: 1100 }
      ],
      signatureIncluded: true,
      customFont: 'Inter',
      customSpacing: 'standard'
    },
    {
      id: 'doc-3',
      docNumber: 'DOC-2026-003',
      type: 'Agreement',
      title: 'Master Services Agreement - Arjun Rao',
      contactId: 'cnt-2',
      contactName: 'Arjun Rao',
      contactCompany: 'Studio Minimal',
      contactEmail: 'arjun@studiominimal.io',
      date: '2026-08-14',
      dueDate: '',
      status: 'Signed',
      content: '1. SERVICES & SCOPE\nHarsha Creative Studio agrees to provide structural branding and video production services as specified in Project Orders.\n\n2. INTELLECTUAL PROPERTY\nUpon receipt of full payment, all work product created under this Agreement shall belong exclusively to Studio Minimal.\n\n3. CONFIDENTIALITY\nBoth parties agree to protect proprietary information disclosed during the engagement.',
      items: [],
      signatureIncluded: true,
      digitallySigned: true,
      signedTimestamp: '2026-08-14 16:42 UTC',
      signedAuditHash: 'a7f92b49c08e1d3e2a',
      customFont: 'Inter',
      customSpacing: 'standard'
    }
  ],
  workCards: [
    {
      id: 'wrk-1',
      title: 'Personal Brand Video',
      contactId: 'cnt-1',
      contactName: 'Rahul Sharma',
      company: 'ABC Media',
      service: 'Video Editing & Motion Graphics',
      status: 'WORKING', // TO CONTACT, CONTACTED, WAITING, WORKING, COMPLETED, BLOCKED
      workingOn: 'Episode 04 — Final Edit',
      why: 'Founder personal-brand content',
      currentTask: 'Final color correction and subtitles',
      lastActivity: 'Today',
      nextAction: 'Send first review',
      deadline: '20 August',
      lastContacted: '2026-08-15',
      nextFollowUp: '2026-08-20',
      url: 'https://frame.io/project-123',
      notes: 'Working on Episode 04 rough cut. Need high-res logos from Rahul.'
    },
    {
      id: 'wrk-2',
      title: 'Founder Interview',
      contactId: 'cnt-3',
      contactName: 'Sarah Chen',
      company: 'Venture Labs',
      service: 'Q4 Launch Video',
      status: 'WORKING',
      workingOn: 'Final Cut & Audio Master',
      why: 'Series A Launch Campaign',
      currentTask: 'Final edit & sound design',
      lastActivity: 'Today',
      nextAction: 'Deliver 4K master file',
      deadline: '22 August',
      lastContacted: '2026-08-12',
      nextFollowUp: '2026-08-19',
      url: 'https://venturelabs.io/video',
      notes: 'Proposal submitted ($6,500). Finalizing 4K export.'
    },
    {
      id: 'wrk-3',
      title: 'Maya Lin - Portfolio Reel',
      contactId: '',
      contactName: 'Maya Lin',
      company: 'Architectural Digest',
      service: 'Showreel Production',
      status: 'TO CONTACT',
      workingOn: 'Outreach & Proposal',
      why: 'Architectural documentary showcase',
      currentTask: 'Initial email pitch',
      lastActivity: '2 days ago',
      nextAction: 'Follow up email',
      deadline: '25 August',
      lastContacted: '2026-08-01',
      nextFollowUp: '2026-08-18',
      url: 'https://mayalin.design',
      notes: 'Initial outreach for new architectural documentary showcase.'
    },
    {
      id: 'wrk-4',
      title: 'DevCorp Rebrand Production',
      contactId: '',
      contactName: 'DevCorp Operations',
      company: 'DevCorp Inc',
      service: 'Corporate Rebrand Video Suite',
      status: 'COMPLETED',
      workingOn: 'Delivered',
      why: 'Brand identity refresh',
      currentTask: 'All masters delivered',
      lastActivity: '1 week ago',
      nextAction: 'Project closed',
      deadline: '10 August',
      lastContacted: '2026-08-10',
      nextFollowUp: '',
      url: 'https://devcorp.com/brand',
      notes: 'Delivered final 4K masters and signed off.'
    }
  ],
  history: [
    {
      id: 'hist-1',
      date: 'Today',
      contactName: 'Rahul Sharma',
      category: 'Documents',
      action: 'Created invoice for Rahul'
    },
    {
      id: 'hist-2',
      date: 'Today',
      contactName: 'Sarah Chen',
      category: 'Projects',
      action: 'Moved ABC Media / Sarah project to Working'
    },
    {
      id: 'hist-3',
      date: 'Yesterday',
      contactName: 'Arjun Rao',
      category: 'Agreements',
      action: 'Agreement signed'
    },
    {
      id: 'hist-4',
      date: 'Yesterday',
      contactName: 'Rahul Sharma',
      category: 'Documents',
      action: 'Created Welcome Note'
    }
  ],
  calendarEvents: [
    {
      id: 'cal-1',
      title: 'Follow up with Rahul (ABC Media)',
      date: '2026-08-20',
      contactName: 'Rahul Sharma',
      type: 'Follow-up',
      completed: false
    }
  ],
  todos: [
    { id: 'todo-1', text: '@Rahul Send invoice', done: false, date: 'Today' },
    { id: 'todo-2', text: 'Finish subtitle correction', done: false, date: 'Today' },
    { id: 'todo-3', text: 'Call ABC Media', done: false, date: 'Today' },
    { id: 'todo-4', text: 'Send portfolio', done: true, date: 'Yesterday' },
    { id: 'todo-5', text: 'Review script', done: false, date: 'Today' },
    { id: 'todo-6', text: 'Buy hard drive', done: false, date: 'Aug 19' }
  ],
  notes: [
    { id: 'note-1', title: 'VIDEO IDEA', color: 'yellow', text: 'Try opening the video with the result.' },
    { id: 'note-2', title: 'CLIENT IDEA', color: 'pink', text: 'Ask @Rahul if he wants the vertical version.' },
    { id: 'note-3', title: 'PORTFOLIO', color: 'blue', text: 'Change homepage headline.' }
  ],
  journals: [
    {
      id: 'j-1',
      title: 'Founder video script — Episode 04',
      updatedAt: 'Updated 2 hours ago',
      preview: 'Most founders think personal branding is about posting every day, but real authority comes from cinematic storytelling and concise narrative architecture...',
      content: 'Most founders think personal branding is about posting every day, but real authority comes from cinematic storytelling and concise narrative architecture. In this episode with @Rahul, we open on a 3-second hook establishing the core vision before transitioning to the product demo.'
    }
  ],
  reminders: [
    { id: 'rem-1', time: 'Today 10:30 AM', text: 'Follow up with @Rahul', contact: 'Rahul Sharma', completed: false },
    { id: 'rem-2', time: 'Thursday 09:00 AM', text: 'Send ABC Media proposal', contact: 'Sarah Chen', completed: false },
    { id: 'rem-3', time: 'Friday 02:00 PM', text: 'Submit final project masters', contact: 'DevCorp Operations', completed: false }
  ]
};

class StateManager {
  constructor() {
    this.listeners = [];
    this.data = this.loadState();
  }

  loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...defaultState, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn('Could not read state from localStorage', e);
    }
    return JSON.parse(JSON.stringify(defaultState));
  }

  saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
    } catch (e) {
      console.error('Could not save state to localStorage', e);
    }
    this.notify();
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach(fn => fn(this.data));
  }

  get() {
    return this.data;
  }

  update(patchFn) {
    patchFn(this.data);
    this.saveState();
  }

  // Helper actions
  addHistory(actionText, contactName = '', category = 'Documents') {
    const today = new Date().toISOString().split('T')[0];
    const newEntry = {
      id: 'hist-' + Date.now(),
      date: today,
      contactName,
      category,
      action: actionText
    };
    this.data.history.unshift(newEntry);
    this.saveState();
  }

  canCreateDocument() {
    if (this.data.subscription.plan === 'premium') return true;
    return this.data.subscription.docsCreatedThisMonth < this.data.subscription.maxFreeDocs;
  }

  incrementDocCount() {
    if (this.data.subscription.plan === 'free') {
      this.data.subscription.docsCreatedThisMonth++;
      this.saveState();
    }
  }

  resetToDefault() {
    this.data = JSON.parse(JSON.stringify(defaultState));
    this.saveState();
  }
}

export const stateManager = new StateManager();
