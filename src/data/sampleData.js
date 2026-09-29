// Realistic Seed Dataset for FLOV Digital Office Platform

export const initialProfile = {
  fullName: "Harsha",
  businessName: "Harsha Studio",
  title: "Freelance Digital Creator & Editor",
  email: "harsha@example.com",
  phone: "+91 98765 43210",
  website: "harshastudio.com",
  address: "Bengaluru, Karnataka, India",
  logoUrl: "",
  signatureUrl: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='60' viewBox='0 0 200 60'><path d='M10,40 Q40,5 70,35 T130,20 T180,45' stroke='%23111827' stroke-width='2.5' fill='none'/><text x='130' y='52' font-family='sans-serif' font-size='12' font-weight='bold' fill='%23111827'>Harsha</text></svg>",
  paymentInfo: {
    upiId: "harsha@okicici",
    bankName: "HDFC Bank",
    accountNumber: "50100234567890",
    ifscCode: "HDFC0001234",
    instructions: "Please send payment screenshot on WhatsApp after transfer."
  },
  primaryTextColor: "#111827",
  accentColor: "#2563EB"
};

export const initialContacts = [
  {
    id: "contact-1",
    name: "Rahul Sharma",
    company: "ABC Media",
    role: "Founder",
    email: "rahul@example.com",
    phone: "+91 91234 56789",
    instagram: "@rahulsharma",
    linkedIn: "linkedin.com/in/rahulsharma",
    website: "abcmedia.co",
    notes: "Prefers fast cuts, clean captions, bold color contrast, and minimal visual effects.",
    lastContacted: "2026-09-28",
    nextFollowUp: "2026-10-02",
    createdAt: "2026-09-15"
  },
  {
    id: "contact-2",
    name: "Arjun Media",
    company: "Arjun Podcast Network",
    role: "Podcast Host",
    email: "arjun@example.com",
    phone: "+91 99887 76655",
    instagram: "@arjunmedia",
    linkedIn: "linkedin.com/in/arjunmedia",
    website: "arjunpodcast.com",
    notes: "Requires 16:9 main cut + 9:16 short clips with custom animated captions.",
    lastContacted: "2026-09-25",
    nextFollowUp: "2026-10-05",
    createdAt: "2026-09-10"
  },
  {
    id: "contact-3",
    name: "Priya",
    company: "Priya Studio",
    role: "Brand Strategist",
    email: "priya@example.com",
    phone: "+91 97766 55443",
    instagram: "@priyadesign",
    linkedIn: "linkedin.com/in/priyadesign",
    website: "priyastudio.design",
    notes: "Focuses on high-end fashion and lifestyle reels. Warm color grading essential.",
    lastContacted: "2026-09-20",
    nextFollowUp: "2026-10-08",
    createdAt: "2026-09-01"
  }
];

export const initialProjects = [
  {
    id: "proj-1",
    contactId: "contact-1",
    sharedSpaceId: "space-1",
    name: "Founder Video Series",
    category: "Video Production",
    service: "Short-form video editing",
    price: 25000,
    currency: "₹",
    startDate: "2026-09-20",
    deadline: "2026-10-10",
    status: "WORKING",
    currentTask: "Episode 04 - Applying client caption styling",
    nextAction: "Send revision to Rahul",
    lastContacted: "2026-09-28",
    notes: "Client prefers fast cuts, clean captions, and minimal effects.",
    deliverables: [
      { id: "del-1-1", title: "Episode 01", category: "Video Edit", status: "COMPLETED", approvalStatus: "APPROVED", dueDate: "2026-09-21", notes: "Approved by client" },
      { id: "del-1-2", title: "Episode 02", category: "Video Edit", status: "COMPLETED", approvalStatus: "APPROVED", dueDate: "2026-09-22", notes: "Approved by client" },
      { id: "del-1-3", title: "Episode 03", category: "Video Edit", status: "COMPLETED", approvalStatus: "APPROVED", dueDate: "2026-09-23", notes: "Approved by client" },
      { id: "del-1-4", title: "Episode 04", category: "Video Edit", status: "WORKING", approvalStatus: "PENDING", dueDate: "2026-10-01", notes: "Currently editing fast pacing" },
      { id: "del-1-5", title: "Episode 05", category: "Video Edit", status: "QUEUED", approvalStatus: "PENDING", dueDate: "2026-10-03", notes: "Raw footage received" },
      { id: "del-1-6", title: "Episode 06", category: "Video Edit", status: "QUEUED", approvalStatus: "PENDING", dueDate: "2026-10-05", notes: "" }
    ]
  },
  {
    id: "proj-2",
    contactId: "contact-2",
    sharedSpaceId: "space-2",
    name: "Podcast Network Redesign",
    category: "Web & Media",
    service: "Podcast Clips & Landing Page",
    price: 35000,
    currency: "₹",
    startDate: "2026-09-15",
    deadline: "2026-10-15",
    status: "REVISION",
    currentTask: "Episode 08 - Fixing audio sync & intro title",
    nextAction: "Apply client feedback",
    lastContacted: "2026-09-25",
    notes: "Always export in ProRes 422 + H.264 web version.",
    deliverables: [
      { id: "del-2-1", title: "Podcast Audio Master", category: "Audio", status: "COMPLETED", approvalStatus: "APPROVED", dueDate: "2026-09-18", notes: "" },
      { id: "del-2-2", title: "Episode 08 Video Cut", category: "Video Edit", status: "REVISION", approvalStatus: "REVISION_REQUESTED", dueDate: "2026-10-02", notes: "Client requested intro title adjustment" },
      { id: "del-2-3", title: "Landing Page Mockup", category: "Web Design", status: "WORKING", approvalStatus: "PENDING", dueDate: "2026-10-08", notes: "" }
    ]
  },
  {
    id: "proj-3",
    contactId: "contact-3",
    sharedSpaceId: "space-3",
    name: "Brand Reels Campaign",
    category: "Brand & Social",
    service: "Instagram Reel Editing & Graphics",
    price: 18000,
    currency: "₹",
    startDate: "2026-09-18",
    deadline: "2026-10-12",
    status: "WORKING",
    currentTask: "Reel 02 - Color grading and sound design",
    nextAction: "Render v1 preview",
    lastContacted: "2026-09-20",
    notes: "Aesthetic grain and kinetic typography.",
    deliverables: [
      { id: "del-3-1", title: "Reel 01 - Launch Cut", category: "Reel", status: "COMPLETED", approvalStatus: "APPROVED", dueDate: "2026-09-22", notes: "" },
      { id: "del-3-2", title: "Reel 02 - Product Spotlight", category: "Reel", status: "WORKING", approvalStatus: "PENDING", dueDate: "2026-10-04", notes: "Color grade in progress" }
    ]
  }
];

export const initialSharedSpaces = [
  {
    id: "space-1",
    name: "Rahul × Harsha",
    subtitle: "Founder Video Project Workspace",
    contactId: "contact-1",
    projectId: "proj-1",
    members: [
      { name: "Harsha", role: "Freelancer", email: "harsha@example.com" },
      { name: "Rahul Sharma", role: "Client (Founder)", email: "rahul@example.com" }
    ],
    createdAt: "2026-09-20"
  },
  {
    id: "space-2",
    name: "ABC Studio × Harsha",
    subtitle: "Podcast Network & Landing Page Collaboration",
    contactId: "contact-2",
    projectId: "proj-2",
    members: [
      { name: "Harsha", role: "Freelancer", email: "harsha@example.com" },
      { name: "Arjun", role: "Client (Podcast Host)", email: "arjun@example.com" }
    ],
    createdAt: "2026-09-15"
  },
  {
    id: "space-3",
    name: "Priya × Harsha",
    subtitle: "Brand Reels Campaign Room",
    contactId: "contact-3",
    projectId: "proj-3",
    members: [
      { name: "Harsha", role: "Freelancer", email: "harsha@example.com" },
      { name: "Priya", role: "Client (Brand Lead)", email: "priya@example.com" }
    ],
    createdAt: "2026-09-18"
  }
];

export const initialFiles = [
  {
    id: "file-1",
    projectId: "proj-1",
    sharedSpaceId: "space-1",
    fileName: "Episode_04_Draft_V1.mp4",
    fileSize: "142 MB",
    fileType: "video/mp4",
    uploadDate: "2026-09-28",
    uploadedBy: "Harsha",
    privacy: "SHARED", // 'PRIVATE' | 'SHARED' | 'CLIENT_UPLOADED' | 'FINAL'
    fileUrl: "#"
  },
  {
    id: "file-2",
    projectId: "proj-1",
    sharedSpaceId: "space-1",
    fileName: "ABC_Media_Brand_Assets.zip",
    fileSize: "48 MB",
    fileType: "application/zip",
    uploadDate: "2026-09-21",
    uploadedBy: "Rahul Sharma",
    privacy: "CLIENT_UPLOADED",
    fileUrl: "#"
  },
  {
    id: "file-3",
    projectId: "proj-1",
    sharedSpaceId: "",
    fileName: "Internal_Project_Backup.prproj",
    fileSize: "12 MB",
    fileType: "application/xml",
    uploadDate: "2026-09-20",
    uploadedBy: "Harsha",
    privacy: "PRIVATE",
    fileUrl: "#"
  },
  {
    id: "file-4",
    projectId: "proj-1",
    sharedSpaceId: "space-1",
    fileName: "Episode_03_Final_Export.mp4",
    fileSize: "215 MB",
    fileType: "video/mp4",
    uploadDate: "2026-09-23",
    uploadedBy: "Harsha",
    privacy: "FINAL",
    fileUrl: "#"
  }
];

export const initialMessages = [
  {
    id: "msg-1",
    sharedSpaceId: "space-1",
    projectId: "proj-1",
    deliverableId: "del-1-4",
    senderName: "Rahul Sharma",
    senderRole: "Client",
    text: "Can we make the caption font slightly bolder for Episode 04?",
    timestamp: "Yesterday, 4:15 PM"
  },
  {
    id: "msg-2",
    sharedSpaceId: "space-1",
    projectId: "proj-1",
    deliverableId: "del-1-4",
    senderName: "Harsha",
    senderRole: "Freelancer",
    text: "Sure Rahul! Updating to Inter Bold and re-rendering now.",
    timestamp: "Yesterday, 4:20 PM"
  }
];

export const initialActivityFeed = [
  {
    id: "act-1",
    sharedSpaceId: "space-1",
    actorName: "Harsha",
    actionText: "uploaded Episode_04_Draft_V1.mp4",
    timestamp: "2026-09-28 14:14"
  },
  {
    id: "act-2",
    sharedSpaceId: "space-1",
    actorName: "Rahul Sharma",
    actionText: "requested revision for Episode 04",
    timestamp: "2026-09-28 16:15"
  },
  {
    id: "act-3",
    sharedSpaceId: "space-1",
    actorName: "Rahul Sharma",
    actionText: "approved Episode 03",
    timestamp: "2026-09-23 11:30"
  }
];

export const initialDocuments = [
  {
    id: "doc-1",
    docNumber: "INV-001",
    type: "Invoice",
    contactId: "contact-1",
    projectId: "proj-1",
    sharedSpaceId: "space-1",
    privacy: "SHARED_FINAL", // 'PRIVATE_DRAFT' | 'SHARED_FINAL'
    title: "Invoice #001 — Founder Video Series",
    date: "2026-09-20",
    dueDate: "2026-10-05",
    status: "Sent",
    items: [
      { id: "i1", description: "Short-form Video Edits (Episodes 01 to 06)", quantity: 6, rate: 3500, amount: 21000 },
      { id: "i2", description: "Priority Turnaround & Motion Captions", quantity: 1, rate: 4000, amount: 4000 }
    ],
    subtotal: 25000,
    taxRate: 0,
    total: 25000,
    customNotes: "Thank you for your business! Payment due within 15 days of invoice date.",
    createdAt: "2026-09-20T10:00:00Z",
    updatedAt: "2026-09-20T10:00:00Z"
  },
  {
    id: "doc-2",
    docNumber: "PROP-002",
    type: "Proposal",
    contactId: "contact-2",
    projectId: "proj-2",
    sharedSpaceId: "space-2",
    privacy: "SHARED_FINAL",
    title: "Proposal — Podcast Network Redesign",
    date: "2026-09-15",
    dueDate: "2026-09-30",
    status: "Accepted",
    problemStatement: "Arjun Network requires a dedicated video podcast workflow and conversion landing page.",
    proposedScope: "Podcast video editing, audio mastering, custom thumbnails, and responsive web design.",
    timeline: "3 weeks delivery starting Sept 15, 2026.",
    total: 35000,
    termsAndConditions: "50% advance before start of project, 50% upon final delivery.",
    createdAt: "2026-09-15T11:00:00Z",
    updatedAt: "2026-09-16T08:00:00Z"
  },
  {
    id: "doc-3",
    docNumber: "AGR-003",
    type: "Agreement",
    contactId: "contact-1",
    projectId: "proj-1",
    sharedSpaceId: "space-1",
    privacy: "SHARED_FINAL",
    title: "Master Services Agreement — Founder Video Series",
    date: "2026-09-19",
    status: "Accepted",
    proposedScope: "6 short-form video deliverables, 2 rounds of revision included per deliverable.",
    termsAndConditions: "All rights & master files transferred upon full invoice settlement.",
    createdAt: "2026-09-19T16:00:00Z",
    updatedAt: "2026-09-19T16:00:00Z"
  }
];

export const initialPortfolio = [
  {
    id: "port-1",
    title: "Founder Video Series Campaign",
    clientName: "ABC Media",
    category: "Video Editing",
    description: "High-impact short form video series with kinetic captions and clean cuts.",
    thumbnailUrl: "",
    visibility: "PUBLIC" // 'PRIVATE' | 'SHARED' | 'PUBLIC'
  },
  {
    id: "port-2",
    title: "Podcast Network Brand Kit",
    clientName: "Arjun Media",
    category: "Branding & Audio",
    description: "Complete visual identity and audio mastering setup for tech podcast.",
    thumbnailUrl: "",
    visibility: "PUBLIC"
  }
];
