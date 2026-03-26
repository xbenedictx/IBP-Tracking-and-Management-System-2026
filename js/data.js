// Mock Database - Updated for IBP Dagupan Chapter
let currentUser = null;
let currentRole = null;

const cases = [
    {
        id: 1,
        number: "IBP-DAG-2026-001",
        title: "Annulment of Marriage - Reyes vs. Santos",
        type: "Family Law",
        subtype: "Annulment / Legal Separation",
        description: "Petition for declaration of nullity of marriage",
        status: "In Progress",
        assignedTo: "Atty. Maria Santos",
        assignedToId: 2,
        expertise: "Family",
        dateCreated: "2026-03-20",
        documents: [
            { name: "Complaint.pdf", date: "2026-03-20" }
        ],
        timeline: [
            { date: "2026-03-20", action: "Case Encoded", by: "Clerk Garcia" },
            { date: "2026-03-21", action: "Auto-assigned", by: "System" }
        ]
    },
    {
        id: 2,
        number: "IBP-DAG-2026-002",
        title: "Estafa Case - Complainant vs. Accused",
        type: "Criminal",
        subtype: "Estafa",
        description: "Criminal complaint for estafa involving PHP 450,000",
        status: "Under Review",
        assignedTo: "Unassigned",
        assignedToId: null,
        expertise: "Criminal",
        dateCreated: "2026-03-25",
        documents: [],
        timeline: [
            { date: "2026-03-25", action: "Case Encoded", by: "Clerk Garcia" }
        ]
    },
    {
        id: 3,
        number: "IBP-DAG-2026-003",
        title: "Illegal Dismissal - Juan vs. ABC Company",
        type: "Labor",
        subtype: "Illegal dismissal",
        description: "Complaint for illegal dismissal and monetary claims",
        status: "Resolved",
        assignedTo: "Atty. Jose Morales",
        assignedToId: 4,
        expertise: "Labor",
        dateCreated: "2026-03-15",
        documents: [{ name: "Resolution.pdf", date: "2026-03-22" }],
        timeline: [
            { date: "2026-03-15", action: "Case Encoded", by: "Clerk Garcia" },
            { date: "2026-03-22", action: "Case Resolved", by: "Atty. Morales" }
        ]
    }
];

const lawyers = [
    { id: 2, name: "Atty. Maria Santos", expertise: "Family", workload: 3 },
    { id: 4, name: "Atty. Jose Morales", expertise: "Labor", workload: 4 },
    { id: 5, name: "Atty. Elena Lopez", expertise: "Criminal", workload: 2 }
];

const notifications = [
    { id: 1, message: "New case IBP-DAG-2026-002 requires assignment", time: "2 min ago" },
    { id: 2, message: "Document uploaded to case IBP-DAG-2026-001", time: "1 hour ago" }
];

const users = [
    { id: 1, name: "Admin User", email: "admin@ibp.ph", role: "admin" },
    { id: 2, name: "Atty. Maria Santos", email: "maria.santos@ibp.ph", role: "lawyer" },
    { id: 3, name: "Clerk Garcia", email: "clerk.garcia@ibp.ph", role: "clerk" },
    { id: 5, name: "Viewer Account", email: "viewer@ibp.ph", role: "viewer" }
];

window.appData = {
    cases,
    lawyers,
    notifications,
    users,
    getCurrentUser: () => currentUser,
    setCurrentUser: (user) => { currentUser = user; currentRole = user.role; }
};