function renderDashboard() {
    const content = document.getElementById('dashboard-content') || document.getElementById('content-area');
    content.innerHTML = `<div class="text-3xl font-semibold">Welcome to Dashboard</div>`;
    // You can expand this later
}

function renderCasesPage() {
    document.getElementById('content-area').innerHTML = `<h1 class="text-3xl font-semibold">All Cases</h1>`;
}

function renderEncodeCasePage() {
    document.getElementById('content-area').innerHTML = `<h1 class="text-3xl font-semibold">Encode New Case</h1>`;
}

function renderUsersPage() {
    document.getElementById('content-area').innerHTML = `<h1 class="text-3xl font-semibold">Manage Users (Admin Only)</h1>`;
}

function renderDocumentsPage() {
    document.getElementById('content-area').innerHTML = `<h1 class="text-3xl font-semibold">Documents</h1>`;
}

function renderReportsPage() {
    document.getElementById('content-area').innerHTML = `<h1 class="text-3xl font-semibold">Reports</h1>`;
}

function showCaseModal() { alert("Case details modal"); }
function logout() { location.reload(); }
function toggleNotifications() { alert("Notifications"); }

window.renderDashboard = renderDashboard;
window.renderCasesPage = renderCasesPage;
window.renderEncodeCasePage = renderEncodeCasePage;
window.renderUsersPage = renderUsersPage;
window.renderDocumentsPage = renderDocumentsPage;
window.renderReportsPage = renderReportsPage;