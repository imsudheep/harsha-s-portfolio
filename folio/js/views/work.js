/* ==========================================================================
   FOLIO OFFICE - KANBAN WORK BOARD VIEW
   ========================================================================== */

import { stateManager } from '../state.js';

const COLUMNS = ['TO CONTACT', 'CONTACTED', 'WAITING', 'WORKING', 'COMPLETED'];

export function renderWorkView() {
  const state = stateManager.get();
  const cards = state.workCards;

  return `
    <div class="view-header">
      <div class="view-title-group">
        <h1 class="view-title">Work Board</h1>
        <p class="view-subtitle">Track contacts, ongoing work, and project status at a glance.</p>
      </div>
      <div>
        <button class="btn btn-primary" id="btnNewWorkCard">
          <i data-lucide="plus"></i> Add Work Card
        </button>
      </div>
    </div>

    <!-- Kanban Columns Grid -->
    <div class="work-board" id="kanbanBoard">
      ${COLUMNS.map(col => {
        const colCards = cards.filter(c => c.status === col);
        return `
          <div class="kanban-col" data-col="${col}">
            <div class="kanban-col-header">
              <span>${col}</span>
              <span class="badge" style="font-size: 10px;">${colCards.length}</span>
            </div>

            <div class="kanban-card-list" data-col="${col}">
              ${colCards.length === 0 ? `
                <div style="padding: 20px 10px; text-align: center; color: var(--text-muted); font-size: 11px; border: 1px dashed var(--border-subtle); border-radius: var(--radius-md);">
                  Drop card here
                </div>
              ` : colCards.map(card => `
                <div class="kanban-card" draggable="true" data-id="${card.id}">
                  <div class="kanban-card-title">${escapeHtml(card.title)}</div>
                  <div class="kanban-card-sub">${escapeHtml(card.company || card.contactName || 'General')} • ${escapeHtml(card.service || 'Service')}</div>
                  ${card.notes ? `<div style="font-size: 11px; color: var(--text-secondary); max-height: 40px; overflow: hidden; text-overflow: ellipsis;">${escapeHtml(card.notes)}</div>` : ''}
                  
                  <div class="kanban-card-meta">
                    <span>${card.nextFollowUp ? `Next: ${card.nextFollowUp}` : 'No follow-up'}</span>
                    <button class="btn btn-ghost btn-sm btn-edit-card" data-id="${card.id}" style="padding: 2px 6px; font-size: 10px;">Edit</button>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

export function attachWorkEvents(container, showToast, openModal) {
  // New Card Button
  const btnNew = container.querySelector('#btnNewWorkCard');
  if (btnNew) {
    btnNew.addEventListener('click', () => openModal('addWorkCard'));
  }

  // Edit Card Buttons
  container.querySelectorAll('.btn-edit-card').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const cardId = btn.getAttribute('data-id');
      openModal('editWorkCard', { cardId });
    });
  });

  // Drag and Drop Logic
  let draggedCardId = null;

  container.querySelectorAll('.kanban-card').forEach(card => {
    card.addEventListener('dragstart', (e) => {
      draggedCardId = card.getAttribute('data-id');
      card.classList.add('dragging');
      e.dataTransfer.setData('text/plain', draggedCardId);
    });

    card.addEventListener('dragend', () => {
      card.classList.remove('dragging');
    });
  });

  container.querySelectorAll('.kanban-col-header, .kanban-card-list').forEach(zone => {
    zone.addEventListener('dragover', (e) => {
      e.preventDefault();
    });

    zone.addEventListener('drop', (e) => {
      e.preventDefault();
      const colEl = zone.closest('.kanban-col');
      if (!colEl || !draggedCardId) return;

      const targetCol = colEl.getAttribute('data-col');
      const state = stateManager.get();
      const targetCard = state.workCards.find(c => c.id === draggedCardId);

      if (targetCard && targetCard.status !== targetCol) {
        targetCard.status = targetCol;
        stateManager.saveState();
        stateManager.addHistory(`Moved "${targetCard.title}" to ${targetCol}`, targetCard.contactName, 'Projects');
        showToast(`Work card moved to ${targetCol}`);
        // Re-render
        const contentBody = document.getElementById('contentBody');
        contentBody.innerHTML = renderWorkView();
        attachWorkEvents(contentBody, showToast, openModal);
      }
    });
  });
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
