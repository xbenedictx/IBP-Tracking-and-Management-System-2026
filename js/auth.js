let selectedRole = null;

function renderLoginScreen() {
    const html = `
        <div class="min-h-screen login-bg flex items-center justify-center p-4">
            <div class="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden">
                <div class="px-10 pt-10 pb-6 text-center">
                    <div class="flex items-center justify-center gap-4 mb-6">
                        <div class="w-14 h-14 bg-[#003087] rounded-2xl flex items-center justify-center text-white text-4xl shadow">⚖️</div>
                        <div>
                            <h1 class="text-4xl font-bold text-[#003087]">IBP</h1>
                            <p class="text-sm tracking-[3px] text-slate-500">DAGUPAN CHAPTER</p>
                        </div>
                    </div>
                    <h2 class="text-2xl font-semibold text-slate-800">Case Management System</h2>
                    <p class="text-slate-500 mt-2">Secure Role-Based Login • Prototype v1.0</p>
                </div>

                <div class="px-10 pb-10">
                    <div class="mb-8">
                        <p class="text-sm text-slate-600 mb-3 font-medium">Select Your Role</p>
                        <div class="grid grid-cols-4 gap-3" id="role-buttons"></div>
                    </div>

                    <div class="space-y-5">
                        <div>
                            <label class="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                            <input id="email-input" type="email" class="w-full px-5 py-4 border border-slate-300 rounded-2xl focus:outline-none focus:border-[#003087]" placeholder="yourname@ibpdagupan.ph">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-slate-700 mb-1">Password</label>
                            <input id="password-input" type="password" class="w-full px-5 py-4 border border-slate-300 rounded-2xl focus:outline-none focus:border-[#003087]" placeholder="Enter password">
                        </div>

                        <button onclick="handleLogin()" class="w-full bg-[#003087] hover:bg-[#002266] text-white font-semibold py-4 rounded-2xl transition-all">SIGN IN</button>

                        <div id="create-account-container" class="hidden">
                            <button onclick="showCreateViewerModal()" class="w-full py-4 border border-slate-300 hover:border-slate-400 text-slate-700 font-medium rounded-2xl">Create New Viewer Account</button>
                        </div>

                        <p id="error-message" class="text-red-600 text-sm text-center min-h-[24px]"></p>
                    </div>
                </div>

                <div class="px-10 py-6 bg-slate-50 text-center text-xs text-slate-500 border-t">
                    Data Privacy Act Compliant • IBP Dagupan Chapter Prototype
                </div>
            </div>
        </div>
    `;
    document.getElementById('login-screen').innerHTML = html;
    renderRoleButtons();
}

function renderRoleButtons() {
    const roles = [
        { name: "Admin", value: "admin", icon: "fa-shield-halved", color: "text-[#003087]" },
        { name: "Lawyer", value: "lawyer", icon: "fa-gavel", color: "text-amber-600" },
        { name: "Clerk", value: "clerk", icon: "fa-keyboard", color: "text-emerald-600" },
        { name: "Viewer", value: "viewer", icon: "fa-eye", color: "text-purple-600" }
    ];
    let html = '';
    roles.forEach(role => {
        html += `
            <button onclick="selectRole('${role.value}')" id="role-btn-${role.value}"
                    class="flex flex-col items-center gap-2 p-4 border-2 border-slate-200 hover:border-[#003087] rounded-2xl transition-all">
                <i class="fa-solid ${role.icon} text-2xl ${role.color}"></i>
                <span class="font-medium text-sm">${role.name}</span>
            </button>
        `;
    });
    document.getElementById('role-buttons').innerHTML = html;
}

function selectRole(role) {
    selectedRole = role;
    document.querySelectorAll('#role-buttons button').forEach(btn => {
        btn.classList.remove('border-[#003087]', 'bg-blue-50');
        if (btn.id === `role-btn-${role}`) btn.classList.add('border-[#003087]', 'bg-blue-50');
    });
    document.getElementById('create-account-container').classList.toggle('hidden', role !== 'viewer');
    document.getElementById('error-message').textContent = '';
}

function handleLogin() {
    const errorMsg = document.getElementById('error-message');
    errorMsg.textContent = '';

    if (!selectedRole) {
        errorMsg.textContent = "Please select a role first.";
        return;
    }

    const email = document.getElementById('email-input').value.trim();
    const password = document.getElementById('password-input').value.trim();

    if (!email || !password) {
        errorMsg.textContent = "Please enter both email and password.";
        return;
    }

    let user = null;

    if (selectedRole === 'admin' && email === 'admin@ibpdagupan.ph' && password === 'admin2026') user = { id: 1, name: "Admin User", email, role: "admin" };
    else if (selectedRole === 'lawyer' && email === 'attorney.santos@ibpdagupan.ph' && password === 'lawyer2026') user = { id: 2, name: "Atty. Maria Santos", email, role: "lawyer" };
    else if (selectedRole === 'clerk' && email === 'clerk.garcia@ibpdagupan.ph' && password === 'clerk2026') user = { id: 3, name: "Clerk Garcia", email, role: "clerk" };
    else if (selectedRole === 'viewer' && email === 'viewer@ibpdagupan.ph' && password === 'viewer2026') user = { id: 5, name: "Viewer Account", email, role: "viewer" };

    if (user) {
        window.appData.setCurrentUser(user);
        document.getElementById('login-screen').classList.add('hidden');
        document.getElementById('main-app').classList.remove('hidden');
        initMainApp();
    } else {
        errorMsg.textContent = `Invalid credentials for ${selectedRole.toUpperCase()} role.`;
    }
}

function showCreateViewerModal() {
    const modalHTML = `
        <div class="fixed inset-0 bg-black/70 flex items-center justify-center z-[200]">
            <div class="bg-white rounded-3xl max-w-md w-full p-8">
                <h3 class="text-2xl font-semibold mb-2">Create New Viewer Account</h3>
                <p class="text-slate-500 mb-6">Only Viewer accounts can be created here.</p>
                <div class="space-y-4">
                    <div><label class="block text-sm font-medium mb-1">Full Name</label><input id="new-name" type="text" placeholder="Juan Dela Cruz" class="w-full px-5 py-4 border border-slate-300 rounded-2xl"></div>
                    <div><label class="block text-sm font-medium mb-1">Email Address</label><input id="new-email" type="email" placeholder="your.email@gmail.com" class="w-full px-5 py-4 border border-slate-300 rounded-2xl"></div>
                    <div><label class="block text-sm font-medium mb-1">Password</label><input id="new-password" type="password" placeholder="Create a password" class="w-full px-5 py-4 border border-slate-300 rounded-2xl"></div>
                </div>
                <div class="mt-8 flex gap-3">
                    <button onclick="hideCreateModal()" class="flex-1 py-4 border border-slate-300 rounded-2xl font-medium">Cancel</button>
                    <button onclick="createNewViewerAccount()" class="flex-1 py-4 bg-emerald-600 text-white rounded-2xl font-semibold">Create Account</button>
                </div>
            </div>
        </div>
    `;
    const div = document.createElement('div');
    div.innerHTML = modalHTML;
    document.body.appendChild(div);
}

function hideCreateModal() {
    document.querySelectorAll('.fixed.inset-0').forEach(m => m.remove());
}

function createNewViewerAccount() {
    const name = document.getElementById('new-name').value.trim();
    const email = document.getElementById('new-email').value.trim();
    if (!name || !email) return alert("Please fill all fields");
    alert(`✅ New Viewer Account Created!\nName: ${name}\nEmail: ${email}`);
    hideCreateModal();
    const newUser = { id: Date.now(), name: name, email: email, role: "viewer" };
    window.appData.setCurrentUser(newUser);
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('main-app').classList.remove('hidden');
    initMainApp();
}

window.renderLoginScreen = renderLoginScreen;
window.selectRole = selectRole;
window.handleLogin = handleLogin;
window.showCreateViewerModal = showCreateViewerModal;
window.hideCreateModal = hideCreateModal;
window.createNewViewerAccount = createNewViewerAccount;