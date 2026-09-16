/* ==========================================================================
   FOLIO OFFICE - CHRONOLOGICAL ACTIVITY HISTORY VIEW
   ========================================================================== */

import { stateManager } from '../state.js';

export function renderHistoryView(activeFilter = 'All', searchQuery = '') {
  const state = stateManager.get();
  let historyList = [...state.history];

  // Apply Category Filter
  if (activeFilter !== 'All') {
    historyList = historyList.filter(h => h.category === activeFilter);
  }

  // Apply Client Search Filter
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    historyList = historyList.filter(h => 
      (h.contactName && h.contactName.toLowerCase().includes(q)) ||
      (h.action && h.action.toLowerCase().includes(q))
    );
  }

  // Group by Date
  const grouped = {};
  historyList.forEach(item => {
    const dateStr = item.date || 'Earlier';
    if (!grouped[dateStr]) grouped[dateStr] = [];
    grouped[dateStr].push(item);
  });

  const dates = Object.keys(grouped).sort((a, b) => new Date(b) - new Date(a));

  return `
    <div class="view-header">
      <div class="view-title-group">
        <h1 class="view-title">Activity History</h1>
        <p class="view-subtitle">Your digital professional memory timeline.</p>
      </div>

      <div style="display: flex; gap: 12px; align-items: center;">
        <input type="text" class="form-input" id="historyClientSearch" value="${escapeHtml(searchQuery)}" placeholder="Search client name..." style="width: 220px;" />
      </div>
    </div>

    <!-- Category Filter Tabs -->
    <div style="display: flex; gap: 8px; margin-bottom: 24px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 12px;">
      ${['All', 'Documents', 'Contacts', 'Projects', 'Payments', 'Agreements'].map(cat => `
        <button class="btn btn-sm ${activeFilter === cat ? 'btn-primary' : 'btn-ghost'} history-filter-btn" data-cat="${cat}">
          ${cat}
        </button>
      `).join('')}
    </div>

    <!-- History Timeline Group -->
    ${dates.length === 0 ? `
      <div class="empty-state">
        <div class="empty-state-title">No history records found</div>
        <div class="empty-state-sub">Your activity log will record documents created, agreements signed, and project updates.</div>
      </div>
    ` : `
      <div class="history-timeline">
        ${dates.map(d => `
          <div class="history-date-group">
            <div class="history-date-label">${formatDisplayDate(d)}</div>
            <div class="list-group">
              ${grouped[d].map(item => `
                <div class="list-item">
                  <div class="list-item-main">
                    <div class="list-item-icon">
                      <i data-lucide="${getCategoryIcon(item.category)}" style="width: 17px; height: 17px;"></i>
                    </div>
                    <div>
                      <div class="list-item-title">${escapeHtml(item.action)}</div>
                      <div class="list-item-subtitle">${item.contactName ? `Client: ${escapeHtml(item.contactName)} • ` : ''}${item.category}</div>
                    </div>
                  </div>
                  <span class="badge">${item.category}</span>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    `}
  `;
}

export function attachHistoryEvents(container, showToast, openModal, navigateTo) {
  // Category Filter Buttons
  container.querySelectorAll('.history-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.getAttribute('data-cat');
      const searchInput = container.querySelector('#historyClientSearch');
      const query = searchInput ? searchInput.value : '';
      const contentBody = document.getElementById('contentBody');
      contentBody.innerHTML = renderHistoryView(cat, query);
      attachHistoryEvents(contentBody, showToast, openModal, navigateTo);
    });
  });

  // Client Search Input
  const searchInput = container.querySelector('#historyClientSearch');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value;
      const activeBtn = container.querySelector('.history-filter-btn.btn-primary');
      const cat = activeBtn ? activeBtn.getAttribute('data-cat') : 'All';
      const contentBody = document.getElementById('contentBody');
      contentBody.innerHTML = renderHistoryView(cat, query);
      attachHistoryEvents(contentBody, showToast, openModal, navigateTo);
    });
  }
}

function getCategoryIcon(cat) {
  switch(cat) {
    case 'Documents': return 'file-text';
    case 'Contacts': return 'user';
    case 'Projects': return 'kanban';
    case 'Payments': return 'credit-card';
    case 'Agreements': return 'file-signature';
    default: return 'activity';
  }
}

function formatDisplayDate(dateStr) {
  if (!dateStr || dateStr === 'Earlier') return 'Earlier Activity';
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  } catch (e) {
    return dateStr;
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
