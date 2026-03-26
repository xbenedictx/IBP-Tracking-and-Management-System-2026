function initMainApp() {
    renderNavbar();
    renderSidebar();
    renderDashboard();   // from dashboard.js
}

function navigateTo(page) {
    // Remove active class from all sidebar links
    document.querySelectorAll('.sidebar-link').forEach(link => link.classList.remove('active'));
    
    // Simple routing
    if (page === 'dashboard') {
        renderDashboard();
    } else if (page === 'cases' || page === 'my-cases') {
        renderCasesPage(page);
    } else if (page === 'encode-case') {
        renderEncodeCasePage();
    } else if (page === 'users') {
        renderUsersPage();
    } else if (page === 'documents') {
        renderDocumentsPage();
    } else if (page === 'reports') {
        renderReportsPage();
    }
    
    // Find and activate the clicked link
    const links = document.querySelectorAll('.sidebar-link');
    links.forEach(link => {
        if (link.getAttribute('onclick') && link.getAttribute('onclick').includes(`'${page}'`)) {
            link.classList.add('active');
        }
    });
}

// Initialize login screen on load
window.onload = () => {
    renderLoginScreen();
    
    // Tailwind script already loaded via CDN
    console.log("%c✅ IBP Case Management Prototype (Multi-file) initialized", 
                "color:#003087; font-weight:bold");
};