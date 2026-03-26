let currentUser = null;
let currentRole = null;

const cases = [
    {
        id: 1,
        number: "IBP-DAG-2026-001",
        title: "Annulment of Marriage - Reyes vs. Santos",
        type: "Family Law",
        subtype: "Annulment / Legal Separation",
        status: "In Progress",
        assignedTo: "Atty. Maria Santos",
        assignedToId: 2,
        expertise: "Family",
        dateCreated: "2026-03-20",
        documents: [{ name: "Complaint.pdf", date: "2026-03-20" }]
    },
    {
        id: 2,
        number: "G.R. No. 246816",
        title: "ANGKLA v. COMMISSION ON ELECTIONS (Vol.65)",
        type: "Political Law",
        subtype: "Party-List System",
        status: "Decided",
        assignedTo: "Atty. Maria Santos",
        assignedToId: 2,
        expertise: "Political",
        dateCreated: "2026-03-25",
        documents: [{ name: "Vol.65-Recent-Jurisprudence_2020-2021.pdf", date: "2026-03-26" }]
    }
];

const lawyers = [
    { id: 2, name: "Atty. Maria Santos", expertise: "Family", workload: 3 },
    { id: 4, name: "Atty. Jose Morales", expertise: "Political", workload: 2 }
];

const notifications = [
    { id: 1, message: "New case from Vol.65 Jurisprudence requires assignment", time: "5 min ago" }
];

const users = [
    { id: 1, name: "Admin User", email: "admin@ibpdagupan.ph", role: "admin" },
    { id: 2, name: "Atty. Maria Santos", email: "attorney.santos@ibpdagupan.ph", role: "lawyer" },
    { id: 3, name: "Clerk Garcia", email: "clerk.garcia@ibpdagupan.ph", role: "clerk" },
    { id: 5, name: "Viewer Account", email: "viewer@ibpdagupan.ph", role: "viewer" }
];

window.appData = {
    cases,
    lawyers,
    notifications,
    users,
    getCurrentUser: () => currentUser,
    setCurrentUser: (user) => { currentUser = user; currentRole = user.role; }
};