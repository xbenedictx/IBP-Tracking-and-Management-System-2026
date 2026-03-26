function renderNavbar() {
    const navbarHTML = `
        <div class="px-8 py-4 flex items-center justify-between">
            <div class="flex items-center gap-4">
                <div class="w-9 h-9 bg-[#003087] rounded-2xl flex items-center justify-center text-white text-2xl">⚖️</div>
                <div>
                    <h1 class="font-semibold text-xl">IBP Case Management</h1>
                    <p class="text-xs text-emerald-600">Dagupan City Chapter • Prototype</p>
                </div>
            </div>
            
            <div class="flex items-center gap-6">
                <div id="role-badge" class="px-5 py-1.5 rounded-3xl text-sm font-semibold"></div>
                
                <div onclick="toggleNotifications()" class="relative cursor-pointer">
                    <i class="fa-solid fa-bell text-xl text-slate-600"></i>
                    <span class="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">2</span>
                </div>
                
                <div class="flex items-center gap-3 cursor-pointer" onclick="logout()">
                    <div class="text-right">
                        <div class="font-semibold text-sm">${window.appData.getCurrentUser().name}</div>
                        <div class="text-xs text-slate-500">${window.appData.getCurrentUser().email}</div>
                    </div>
                    <div class="w-8 h-8 bg-slate-200 rounded-2xl flex items-center justify-center text-lg">👤</div>
                </div>
            </div>
        </div>
    `;
    document.getElementById('navbar').innerHTML = navbarHTML;
    renderRoleBadge();
}

function renderRoleBadge() {
    const user = window.appData.getCurrentUser();
    const badge = document.getElementById('role-badge');
    const colors = {
        admin: 'bg-[#003087] text-white',
        lawyer: 'bg-amber-600 text-white',
        clerk: 'bg-emerald-600 text-white',
        viewer: 'bg-purple-600 text-white'
    };
    
    badge.innerHTML = `
        <span class="${colors[user.role]} px-6 py-1 rounded-3xl">${user.role.toUpperCase()}</span>
    `;
}

function renderSidebar() {
    const user = window.appData.getCurrentUser();
    let html = `
        <div class="p-6">
            <div onclick="navigateTo('dashboard')" class="sidebar-link flex items-center gap-3 px-6 py-4 rounded-2xl cursor-pointer active">
                <i class="fa-solid fa-gauge-high"></i>
                <span class="font-medium">Dashboard</span>
            </div>
    `;

    if (user.role === 'admin' || user.role === 'clerk') {
        html += `
            <div onclick="navigateTo('cases')" class="sidebar-link flex items-center gap-3 px-6 py-4 rounded-2xl cursor-pointer">
                <i class="fa-solid fa-briefcase"></i>
                <span class="font-medium">All Cases</span>
            </div>
        `;
    }

    if (user.role === 'lawyer') {
        html += `
            <div onclick="navigateTo('my-cases')" class="sidebar-link flex items-center gap-3 px-6 py-4 rounded-2xl cursor-pointer">
                <i class="fa-solid fa-gavel"></i>
                <span class="font-medium">My Cases</span>
            </div>
        `;
    }

    if (user.role === 'clerk') {
        html += `
            <div onclick="navigateTo('encode-case')" class="sidebar-link flex items-center gap-3 px-6 py-4 rounded-2xl cursor-pointer">
                <i class="fa-solid fa-keyboard"></i>
                <span class="font-medium">Encode New Case</span>
            </div>
        `;
    }

    if (user.role === 'admin') {
        html += `
            <div onclick="navigateTo('users')" class="sidebar-link flex items-center gap-3 px-6 py-4 rounded-2xl cursor-pointer">
                <i class="fa-solid fa-users"></i>
                <span class="font-medium">Manage Users</span>
            </div>
        `;
    }

    html += `
            <div onclick="navigateTo('documents')" class="sidebar-link flex items-center gap-3 px-6 py-4 rounded-2xl cursor-pointer">
                <i class="fa-solid fa-folder-open"></i>
                <span class="font-medium">Documents</span>
            </div>
            <div onclick="navigateTo('reports')" class="sidebar-link flex items-center gap-3 px-6 py-4 rounded-2xl cursor-pointer">
                <i class="fa-solid fa-chart-bar"></i>
                <span class="font-medium">Reports</span>
            </div>
        </div>
    `;

    document.getElementById('sidebar').innerHTML = html;
}

// Make functions global
window.renderNavbar = renderNavbar;
window.renderSidebar = renderSidebar;