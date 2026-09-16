/* ==========================================================================
   FOLIO OFFICE - CONTACTS CRM VIEW
   ========================================================================== */

import { stateManager } from '../state.js';

export function renderContactsView() {
  const state = stateManager.get();
  const contacts = state.contacts;

  return `
    <div class="view-header">
      <div class="view-title-group">
        <h1 class="view-title">Contacts Directory</h1>
        <p class="view-subtitle">Private record of clients, collaborators, and leads.</p>
      </div>
      <div>
        <button class="btn btn-primary" id="btnNewContact">
          <i data-lucide="user-plus"></i> Add Contact
        </button>
      </div>
    </div>

    ${contacts.length === 0 ? `
      <div class="empty-state">
        <div class="empty-state-title">No contacts yet</div>
        <div class="empty-state-sub">Keep the people you work with in one private, organized place.</div>
        <button class="btn btn-secondary btn-sm" id="emptyAddContactBtn">Add First Contact</button>
      </div>
    ` : `
      <div class="contacts-grid">
        ${contacts.map(c => `
          <div class="contact-card">
            <div style="display: flex; align-items: center; gap: 14px;">
              <div class="contact-avatar">${getInitials(c.name)}</div>
              <div class="contact-info">
                <div class="contact-name">${escapeHtml(c.name)}</div>
                <div class="contact-role">${escapeHtml(c.role || 'Client')} • ${escapeHtml(c.company || 'Independent')}</div>
              </div>
            </div>

            <div style="font-size: 12px; color: var(--text-secondary); display: flex; flex-direction: column; gap: 6px;">
              <div><strong>Email:</strong> ${escapeHtml(c.email || 'None')}</div>
              <div><strong>Phone:</strong> ${escapeHtml(c.phone || 'None')}</div>
              <div><strong>Interested In:</strong> ${escapeHtml(c.serviceDiscussed || 'General Freelance')}</div>
              <div><strong>Last Contacted:</strong> ${c.lastContacted || 'N/A'}</div>
              <div><strong>Next Follow-up:</strong> ${c.nextFollowUp ? `<span class="badge">${c.nextFollowUp}</span>` : 'None'}</div>
            </div>

            ${c.notes ? `
              <div style="font-size: 11.5px; color: var(--text-muted); background: var(--bg-surface-hover); padding: 8px 10px; border-radius: var(--radius-sm);">
                "${escapeHtml(c.notes)}"
              </div>
            ` : ''}

            <div style="display: flex; gap: 8px; margin-top: auto; padding-top: 12px; border-top: 1px solid var(--border-subtle);">
              <button class="btn btn-secondary btn-sm contact-doc-btn" data-id="${c.id}" style="flex: 1;">
                <i data-lucide="file-plus" style="width: 13px; height: 13px;"></i> Create Doc
              </button>
              <button class="btn btn-ghost btn-sm contact-edit-btn" data-id="${c.id}">
                Edit
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    `}
  `;
}

export function attachContactsEvents(container, showToast, openModal, navigateTo) {
  const btnAdd = container.querySelector('#btnNewContact') || container.querySelector('#emptyAddContactBtn');
  if (btnAdd) {
    btnAdd.addEventListener('click', () => openModal('addContact'));
  }

  // Edit Contact
  container.querySelectorAll('.contact-edit-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const contactId = btn.getAttribute('data-id');
      openModal('editContact', { contactId });
    });
  });

  // Create Doc for Contact
  container.querySelectorAll('.contact-doc-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const contactId = btn.getAttribute('data-id');
      const state = stateManager.get();
      const cnt = state.contacts.find(c => c.id === contactId);
      if (cnt) {
        // Create document draft prefilled for this contact
        const count = state.documents.length + 1;
        const numStr = String(count).padStart(3, '0');
        const newDoc = {
          id: 'doc-' + Date.now(),
          docNumber: `DOC-2026-${numStr}`,
          type: 'Welcome Note',
          title: `Welcome Note - ${cnt.name}`,
          contactId: cnt.id,
          contactName: cnt.name,
          contactCompany: cnt.company,
          contactEmail: cnt.email,
          date: new Date().toISOString().split('T')[0],
          dueDate: '',
          status: 'Draft',
          content: `Welcome ${cnt.name},\n\nWe are excited to collaborate with you on your upcoming project.`,
          items: [],
          signatureIncluded: true
        };
        stateManager.update(s => s.documents.unshift(newDoc));
        stateManager.incrementDocCount();
        navigateTo('documents', { docId: newDoc.id });
        showToast(`Started new document for ${cnt.name}`);
      }
    });
  });
}

function getInitials(name) {
  if (!name) return 'C';
  const parts = name.split(' ');
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
