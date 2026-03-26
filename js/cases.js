// This file handles case-related functions (view, modal, etc.)

function showCaseModal(id) {
    const caseData = window.appData.cases.find(c => c.id === id);
    if (!caseData) return;

    let modalHTML = `
        <div class="bg-white rounded-3xl max-w-3xl w-full mx-4 p-8 modal max-h-[90vh] overflow-y-auto">
            <div class="flex justify-between mb-6">
                <div>
                    <div class="mono text-sm text-slate-400">${caseData.number}</div>
                    <h2 class="text-2xl font-semibold">${caseData.title}</h2>
                </div>
                <button onclick="hideCaseModal()" class="text-3xl text-slate-300 hover:text-slate-600">✕</button>
            </div>
            
            <div class="grid grid-cols-2 gap-8">
                <div>
                    <p class="text-slate-500 mb-1">Status</p>
                    <div class="inline-flex px-6 py-2 rounded-3xl bg-emerald-100 text-emerald-700 font-medium">${caseData.status}</div>
                    
                    <p class="text-slate-500 mt-8 mb-2">Assigned Lawyer</p>
                    <div class="px-5 py-3 bg-slate-100 rounded-2xl">${caseData.assignedTo}</div>
                </div>
                
                <div>
                    <p class="text-slate-500 mb-3">Timeline</p>
                    <div class="space-y-4 pl-6 border-l-2 border-slate-200">
                        ${caseData.timeline.map(t => `
                            <div class="text-sm">
                                <span class="mono text-xs text-slate-400">${t.date}</span><br>
                                ${t.action} — <span class="text-slate-500">${t.by}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>

            <div class="mt-10 flex gap-4">
                <button onclick="hideCaseModal()" class="flex-1 py-4 border border-slate-300 rounded-2xl">Close</button>
                ${currentRole === 'lawyer' ? `
                <button onclick="updateCaseStatusDemo()" class="flex-1 py-4 bg-emerald-600 text-white rounded-2xl">Update Status</button>` : ''}
            </div>
        </div>
    `;

    document.getElementById('case-modal').innerHTML = modalHTML;
    document.getElementById('case-modal').classList.remove('hidden');
}

function hideCaseModal() {
    document.getElementById('case-modal').classList.add('hidden');
}

function updateCaseStatusDemo() {
    hideCaseModal();
    alert("✅ Case status updated successfully!\n(Simulates Node.js API + PostgreSQL update)");
}

// Global access
window.showCaseModal = showCaseModal;
window.hideCaseModal = hideCaseModal;
window.updateCaseStatusDemo = updateCaseStatusDemo;