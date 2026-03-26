// js/dashboard.js - Complete with Documents Page + All Role Dashboards

function renderNavbar() {
    const user = window.appData.getCurrentUser();
    const navbarHTML = `
        <div class="px-8 py-4 flex items-center justify-between bg-white border-b border-slate-200 shadow-sm">
            <div class="flex items-center gap-4">
                <div class="w-9 h-9 bg-[#003087] rounded-2xl flex items-center justify-center text-white text-2xl">⚖️</div>
                <div>
                    <h1 class="font-semibold text-xl">IBP Case Management</h1>
                    <p class="text-xs text-emerald-600">Dagupan Chapter • Prototype</p>
                </div>
            </div>

            <div class="flex items-center gap-6">
                <div id="role-badge" class="px-5 py-1.5 rounded-3xl text-sm font-semibold"></div>

                <div onclick="toggleNotifications()" class="relative cursor-pointer">
                    <i class="fa-solid fa-bell text-xl text-slate-600"></i>
                    <span class="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">2</span>
                </div>

                <div class="relative group">
                    <div onclick="toggleUserDropdown()" class="flex items-center gap-3 cursor-pointer hover:bg-slate-50 px-3 py-2 rounded-2xl">
                        <div class="text-right">
                            <div class="font-semibold text-sm">${user.name}</div>
                            <div class="text-xs text-slate-500">${user.email}</div>
                        </div>
                        <div class="w-9 h-9 bg-slate-200 rounded-2xl flex items-center justify-center text-xl">👤</div>
                        <i class="fa-solid fa-chevron-down text-slate-400"></i>
                    </div>

                    <div id="user-dropdown" class="hidden absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50">
                        <div class="px-4 py-3 border-b">
                            <div class="font-medium">${user.name}</div>
                            <div class="text-xs text-slate-500">${user.email}</div>
                        </div>
                        <div onclick="navigateTo('profile')" class="flex items-center gap-3 px-5 py-3 hover:bg-slate-50 cursor-pointer">
                            <i class="fa-solid fa-user"></i><span>Profile</span>
                        </div>
                        <div onclick="navigateTo('settings')" class="flex items-center gap-3 px-5 py-3 hover:bg-slate-50 cursor-pointer">
                            <i class="fa-solid fa-gear"></i><span>Settings</span>
                        </div>
                        <div class="border-t my-1"></div>
                        <div onclick="logout()" class="flex items-center gap-3 px-5 py-3 hover:bg-red-50 text-red-600 cursor-pointer">
                            <i class="fa-solid fa-arrow-right-from-bracket"></i><span>Logout</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.getElementById('navbar').innerHTML = navbarHTML;
    renderRoleBadge();
}

function renderRoleBadge() {
    const user = window.appData.getCurrentUser();
    const colors = { admin: 'bg-[#003087]', lawyer: 'bg-amber-600', clerk: 'bg-emerald-600', viewer: 'bg-purple-600' };
    document.getElementById('role-badge').innerHTML = `<span class="${colors[user.role]} text-white px-6 py-1 rounded-3xl">${user.role.toUpperCase()}</span>`;
}

function renderSidebar() {
    const user = window.appData.getCurrentUser();
    let html = `<div class="p-6">`;
    html += `<div onclick="navigateTo('dashboard')" class="sidebar-link flex items-center gap-3 px-6 py-4 rounded-2xl cursor-pointer active"><i class="fa-solid fa-gauge-high"></i><span class="font-medium">Dashboard</span></div>`;

    if (user.role === 'admin' || user.role === 'clerk') {
        html += `<div onclick="navigateTo('cases')" class="sidebar-link flex items-center gap-3 px-6 py-4 rounded-2xl cursor-pointer"><i class="fa-solid fa-briefcase"></i><span class="font-medium">All Cases</span></div>`;
    }
    if (user.role === 'lawyer') {
        html += `<div onclick="navigateTo('my-cases')" class="sidebar-link flex items-center gap-3 px-6 py-4 rounded-2xl cursor-pointer"><i class="fa-solid fa-gavel"></i><span class="font-medium">My Cases</span></div>`;
    }
    if (user.role === 'clerk') {
        html += `<div onclick="navigateTo('encode-case')" class="sidebar-link flex items-center gap-3 px-6 py-4 rounded-2xl cursor-pointer"><i class="fa-solid fa-keyboard"></i><span class="font-medium">Encode New Case</span></div>`;
    }
    if (user.role === 'admin') {
        html += `<div onclick="navigateTo('users')" class="sidebar-link flex items-center gap-3 px-6 py-4 rounded-2xl cursor-pointer"><i class="fa-solid fa-users"></i><span class="font-medium">Manage Users</span></div>`;
    }

    html += `
        <div onclick="navigateTo('documents')" class="sidebar-link flex items-center gap-3 px-6 py-4 rounded-2xl cursor-pointer"><i class="fa-solid fa-folder-open"></i><span class="font-medium">Documents</span></div>
        <div onclick="navigateTo('reports')" class="sidebar-link flex items-center gap-3 px-6 py-4 rounded-2xl cursor-pointer"><i class="fa-solid fa-chart-bar"></i><span class="font-medium">Reports</span></div>
    </div>`;
    document.getElementById('sidebar').innerHTML = html;
}

/* ==================== DOCUMENTS PAGE (Shows your two PDFs) ==================== */
function renderDocumentsPage() {
    const content = document.getElementById('content-area');
    content.innerHTML = `
        <h1 class="text-3xl font-semibold mb-8">Secure Document Vault</h1>
        <div class="grid grid-cols-2 gap-6">
            <div onclick="viewDocument(1)" class="bg-white p-6 rounded-3xl border border-slate-100 hover:shadow-xl cursor-pointer">
                <div class="text-emerald-600 text-sm mb-2">Vol.65-Recent-Jurisprudence_2020-2021.pdf</div>
                <h3 class="font-medium">Landmark Cases 2020-2021</h3>
                <p class="text-xs text-slate-500 mt-6">Uploaded: 2026-03-26 • Size: 1.65 MB</p>
            </div>

            <div onclick="viewDocument(2)" class="bg-white p-6 rounded-3xl border border-slate-100 hover:shadow-xl cursor-pointer">
                <div class="text-emerald-600 text-sm mb-2">Case-Digest.pdf</div>
                <h3 class="font-medium">Supreme Court Water Jurisprudence 1901-2010</h3>
                <p class="text-xs text-slate-500 mt-6">Uploaded: 2026-03-26 • Size: 12.1 MB</p>
            </div>
        </div>
    `;
}

function viewDocument(id) {
    const files = {
        1: "Vol.65-Recent-Jurisprudence_2020-2021.pdf",
        2: "Case-Digest.pdf"
    };
    alert(`📄 Opening secure document:\n${files[id]}\n\n(This simulates secure PDF viewer in the real system)`);
}

/* ==================== ENCODE NEW CASE (with your dropdowns) ==================== */
function renderEncodeCasePage() {
    const content = document.getElementById('content-area');
    content.innerHTML = `
        <div class="max-w-2xl mx-auto">
            <h1 class="text-3xl font-semibold mb-2">Encode New Case</h1>
            <p class="text-slate-500 mb-8">IBP Dagupan Chapter</p>
            
            <div class="bg-white rounded-3xl p-8">
                <div class="space-y-6">
                    <div>
                        <label class="block text-sm font-medium mb-2">Case Title</label>
                        <input id="case-title" type="text" value="Disciplinary Complaint vs. Atty. Reyes" class="w-full px-5 py-4 border border-slate-300 rounded-2xl focus:outline-none focus:border-[#003087]">
                    </div>

                    <div>
                        <label class="block text-sm font-medium mb-2">Case Type</label>
                        <select id="case-type" onchange="updateSubtypes()" class="w-full px-5 py-4 border border-slate-300 rounded-2xl focus:outline-none focus:border-[#003087]">
                            <option value="">Select Case Type</option>
                            <option value="Civil">Civil</option>
                            <option value="Criminal">Criminal</option>
                            <option value="Labor">Labor</option>
                            <option value="Family Law">Family Law</option>
                            <option value="Land/Property">Land / Property</option>
                        </select>
                    </div>

                    <div>
                        <label class="block text-sm font-medium mb-2">Case Subtype</label>
                        <select id="case-subtype" class="w-full px-5 py-4 border border-slate-300 rounded-2xl focus:outline-none focus:border-[#003087]">
                            <option value="">Select Subtype</option>
                        </select>
                    </div>

                    <div>
                        <label class="block text-sm font-medium mb-2">Description</label>
                        <textarea id="case-desc" rows="4" class="w-full px-5 py-4 border border-slate-300 rounded-2xl focus:outline-none focus:border-[#003087]">Brief description of the case...</textarea>
                    </div>

                    <button onclick="encodeNewCase()" class="w-full py-5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-3xl flex items-center justify-center gap-3">
                        <i class="fa-solid fa-paper-plane"></i>
                        ENCODE CASE & TRIGGER AUTO-ASSIGNMENT
                    </button>
                </div>
            </div>
        </div>
    `;
}

window.updateSubtypes = function() {
    const type = document.getElementById('case-type').value;
    const subtypeSelect = document.getElementById('case-subtype');
    subtypeSelect.innerHTML = '<option value="">Select Subtype</option>';

    const map = {
        "Civil": ["Annulment / Legal Separation", "Contract disputes", "Property disputes", "Damages / Claims"],
        "Criminal": ["Estafa", "Theft / Robbery", "Physical injury", "Cybercrime"],
        "Labor": ["Illegal dismissal", "Wage disputes", "Employee benefits"],
        "Family Law": ["Child support", "Custody", "Domestic violence (VAWC)"],
        "Land/Property": ["Land title issues", "Boundary disputes", "Ejectment"]
    };

    if (type && map[type]) {
        map[type].forEach(sub => {
            const opt = document.createElement('option');
            opt.value = sub;
            opt.textContent = sub;
            subtypeSelect.appendChild(opt);
        });
    }
};

function encodeNewCase() {
    alert("✅ Case successfully encoded and auto-assigned!\n\n(Real system would save to PostgreSQL)");
    navigateTo('dashboard');
}

/* ==================== SIMPLE NAVIGATION ==================== */
function navigateTo(page) {
    document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
    const area = document.getElementById('content-area');

    if (page === 'dashboard') renderDashboard();
    else if (page === 'cases' || page === 'my-cases') area.innerHTML = `<h1 class="text-3xl font-semibold">${page === 'my-cases' ? 'My Assigned Cases' : 'All Cases'}</h1>`;
    else if (page === 'encode-case') renderEncodeCasePage();
    else if (page === 'documents') renderDocumentsPage();
    else if (page === 'reports') area.innerHTML = `<h1 class="text-3xl font-semibold">Reports & Analytics</h1>`;
    else if (page === 'users') area.innerHTML = `<h1 class="text-3xl font-semibold">Manage Users (Admin)</h1>`;
    else if (page === 'profile') area.innerHTML = `<h1 class="text-3xl font-semibold">Profile</h1>`;
    else if (page === 'settings') area.innerHTML = `<h1 class="text-3xl font-semibold">Settings</h1>`;

    // Highlight active sidebar
    const links = document.querySelectorAll('.sidebar-link');
    links.forEach(link => {
        if (link.getAttribute('onclick') && link.getAttribute('onclick').includes(`'${page}'`)) {
            link.classList.add('active');
        }
    });
}

/* Basic placeholder functions */
function renderDashboard() {
    const area = document.getElementById('content-area');
    area.innerHTML = `<h1 class="text-3xl font-semibold">Welcome to Dashboard</h1><p class="text-slate-500 mt-4">Select any menu item on the left to begin.</p>`;
}

function toggleUserDropdown() { document.getElementById('user-dropdown').classList.toggle('hidden'); }
function toggleNotifications() { alert("📬 No new notifications"); }
function logout() { if(confirm("Logout?")) location.reload(); }

window.renderNavbar = renderNavbar;
window.renderSidebar = renderSidebar;
window.navigateTo = navigateTo;
window.toggleUserDropdown = toggleUserDropdown;
window.toggleNotifications = toggleNotifications;
window.logout = logout;
window.renderDocumentsPage = renderDocumentsPage;
window.renderEncodeCasePage = renderEncodeCasePage;
window.updateSubtypes = updateSubtypes;
window.encodeNewCase = encodeNewCase;