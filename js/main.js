function initMainApp() {
    renderNavbar();
    renderSidebar();
    renderDashboard();
}

window.onload = () => {
    renderLoginScreen();
    console.log("%c✅ IBP Dagupan Chapter CMS Prototype Loaded Successfully", "color:#003087; font-weight:bold");
};