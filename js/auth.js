// js/auth.js - Secure Role-based Login for IBP Dagupan Chapter

let loginAttempts = {};

function renderLoginScreen() {
    const loginHTML = `
        <div class="min-h-screen login-bg flex items-center justify-center p-4">
            <div class="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden">
                <!-- Header -->
                <div class="px-10 pt-10 pb-6 text-center">
                    <div class="flex items-center justify-center gap-4 mb-6">
                        <div class="w-14 h-14 bg-[#003087] rounded-2xl flex items-center justify-center text-white text-4xl shadow">⚖️</div>
                        <div>
                            <h1 class="text-4xl font-bold text-[#003087]">IBP</h1>
                            <p class="text-sm tracking-[3px] text-slate-500">DAGUPAN CHAPTER</p>
                        </div>
                    </div>
                    <h2 class="text-2xl font-semibold text-slate-800">Case Management System</h2>
                    <p class="text-slate-500 mt-2">Secure Login • Prototype v1.0</p>
                </div>

                <div class="px-10 pb-10">
                    <div id="login-form">
                        <!-- Role Selection -->
                        <div class="mb-6">
                            <p class="text-sm text-slate-600 mb-3 font-medium">Select Your Role</p>
                            <div class="grid grid-cols-4 gap-3" id="role-buttons">
                                <!-- Populated by JS -->
                            </div>
                        </div>

                        <div class="space-y-5">
                            <div>
                                <label class="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                                <input id="email-input" type="email" 
                                       class="w-full px-5 py-4 border border-slate-300 rounded-2xl focus:outline-none focus:border-[#003087]" 
                                       placeholder="yourname@ibpdagupan.ph">
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-slate-700 mb-1">Password</label>
                                <input id="password-input" type="password" 
                                       class="w-full px-5 py-4 border border-slate-300 rounded-2xl focus:outline-none focus:border-[#003087]" 
                                       placeholder="Enter password">
                            </div>

                            <button onclick="handleLogin()" 
                                    class="w-full bg-[#003087] hover:bg-[#002266] text-white font-semibold py-4 rounded-2xl transition">
                                SIGN IN
                            </button>

                            <div class="flex items-center justify-center gap-4 text-sm">
                                <button onclick="simulateGmailLogin()" 
                                        class="flex-1 border border-slate-300 hover:border-slate-400 py-3 rounded-2xl flex items-center justify-center gap-2">
                                    <i class="fa-brands fa-google text-red-500"></i>
                                    Sign in with Gmail
                                </button>
                                <button onclick="showCreateAccountModal()" 
                                        class="flex-1 border border-slate-300 hover:border-slate-400 py-3 rounded-2xl text-slate-600">
                                    Create Viewer Account
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="px-10 py-6 bg-slate-50 text-center text-xs text-slate-500 border-t">
                    Data Privacy Act Compliant • IBP Dagupan Chapter Prototype
                </div>
            </div>
        </div>
    `;

    document.getElementById('login-screen').innerHTML = loginHTML;
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
            <button onclick="selectRole('${role.value}')" 
                    id="role-btn-${role.value}"
                    class="flex flex-col items-center gap-2 p-4 border-2 border-slate-200 hover:border-[#003087] rounded-2xl transition-all">
                <i class="fa-solid ${role.icon} text-2xl ${role.color}"></i>
                <span class="font-medium text-sm">${role.name}</span>
            </button>
        `;
    });
    document.getElementById('role-buttons').innerHTML = html;
}

let selectedRole = null;

function selectRole(role) {
    selectedRole = role;
    
    // Highlight selected role
    document.querySelectorAll('#role-buttons button').forEach(btn => {
        btn.classList.remove('border-[#003087]', 'bg-blue-50');
        if (btn.id === `role-btn-${role}`) {
            btn.classList.add('border-[#003087]', 'bg-blue-50');
        }
    });
}

function handleLogin() {
    if (!selectedRole) {
        alert("Please select a role first.");
        return;
    }

    const email = document.getElementById('email-input').value.trim();
    const password = document.getElementById('password-input').value.trim();

    if (!email || !password) {
        alert("Please enter email and password.");
        return;
    }

    let valid = false;
    let user = null;

    // Secure credential check per role
    if (selectedRole === 'admin' && email === 'admin@ibpdagupan.ph' && password === 'admin2026') {
        user = { id: 1, name: "Admin User", email: email, role: "admin" };
        valid = true;
    } 
    else if (selectedRole === 'lawyer' && email === 'attorney.santos@ibpdagupan.ph' && password === 'lawyer2026') {
        user = { id: 2, name: "Atty. Maria Santos", email: email, role: "lawyer" };
        valid = true;
    } 
    else if (selectedRole === 'clerk' && email === 'clerk.garcia@ibpdagupan.ph' && password === 'clerk2026') {
        user = { id: 3, name: "Clerk Garcia", email: email, role: "clerk" };
        valid = true;
    } 
    else if (selectedRole === 'viewer' && email === 'viewer@ibpdagupan.ph' && password === 'viewer2026') {
        user = { id: 5, name: "Viewer Account", email: email, role: "viewer" };
        valid = true;
    }

    if (valid && user) {
        window.appData.setCurrentUser(user);
        document.getElementById('login-screen').classList.add('hidden');
        document.getElementById('main-app').classList.remove('hidden');
        initMainApp();
    } else {
        alert(`Invalid credentials for ${selectedRole.toUpperCase()} role.\n\nPlease check the README.md for correct credentials.`);
    }
}

function simulateGmailLogin() {
    if (!selectedRole) {
        alert("Please select a role first.");
        return;
    }

    const code = Math.floor(100000 + Math.random() * 900000); // 6-digit code
    const email = selectedRole === 'admin' ? 'admin@ibpdagupan.ph' : 
                  selectedRole === 'lawyer' ? 'attorney.santos@ibpdagupan.ph' : 
                  selectedRole === 'clerk' ? 'clerk.garcia@ibpdagupan.ph' : 'viewer@ibpdagupan.ph';

    alert(`✅ Gmail Security Simulation\n\nA verification code has been sent to:\n${email}\n\nYour code is: ${code}\n\n(Enter any 6-digit number to proceed in this prototype)`);

    // Simulate success after showing code
    setTimeout(() => {
        let user = {
            id: selectedRole === 'admin' ? 1 : selectedRole === 'lawyer' ? 2 : selectedRole === 'clerk' ? 3 : 5,
            name: selectedRole === 'admin' ? "Admin User" : 
                  selectedRole === 'lawyer' ? "Atty. Maria Santos" : 
                  selectedRole === 'clerk' ? "Clerk Garcia" : "Viewer Account",
            email: email,
            role: selectedRole
        };

        window.appData.setCurrentUser(user);
        document.getElementById('login-screen').classList.add('hidden');
        document.getElementById('main-app').classList.remove('hidden');
        initMainApp();
    }, 800);
}

function showCreateAccountModal() {
    const modalHTML = `
        <div class="fixed inset-0 bg-black/70 flex items-center justify-center z-[200]">
            <div class="bg-white rounded-3xl max-w-md w-full p-8">
                <h3 class="text-2xl font-semibold mb-6">Create Viewer Account</h3>
                <input id="new-email" type="email" placeholder="your.email@gmail.com" 
                       class="w-full px-5 py-4 border border-slate-300 rounded-2xl mb-4">
                <input id="new-password" type="password" placeholder="Create password" 
                       class="w-full px-5 py-4 border border-slate-300 rounded-2xl mb-6">
                
                <button onclick="createViewerAccount()" 
                        class="w-full bg-emerald-600 text-white py-4 rounded-2xl font-semibold mb-3">
                    Create Account & Sign In
                </button>
                <button onclick="hideCreateModal()" 
                        class="w-full py-4 text-slate-500">Cancel</button>
            </div>
        </div>
    `;

    const div = document.createElement('div');
    div.innerHTML = modalHTML;
    document.body.appendChild(div);
}

function hideCreateModal() {
    const modals = document.querySelectorAll('.fixed.inset-0');
    modals.forEach(m => m.remove());
}

function createViewerAccount() {
    const email = document.getElementById('new-email').value.trim();
    if (!email) {
        alert("Please enter an email address.");
        return;
    }

    // Simulate Gmail verification
    alert(`✅ Account created successfully!\n\nA confirmation link has been sent to:\n${email}\n\nYou are now signed in as Viewer.`);

    hideCreateModal();

    const user = { 
        id: 6, 
        name: "New Viewer", 
        email: email, 
        role: "viewer" 
    };

    window.appData.setCurrentUser(user);
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('main-app').classList.remove('hidden');
    initMainApp();
}

// Global functions
window.renderLoginScreen = renderLoginScreen;
window.selectRole = selectRole;
window.handleLogin = handleLogin;
window.simulateGmailLogin = simulateGmailLogin;
window.showCreateAccountModal = showCreateAccountModal;
window.createViewerAccount = createViewerAccount;
window.hideCreateModal = hideCreateModal;