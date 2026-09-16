/* ==========================================================================
   FOLIO SPACE - ULTRA-SPACIOUS MINIMALIST DIGITAL DESK (PURE BLACK/WHITE)
   ========================================================================== */

import { stateManager } from '../state.js';
import { NotebookEditorService } from '../services/notebookEditor.js';

export function renderHomeView() {
  const state = stateManager.get();
  const firstName = state.brandProfile.name ? state.brandProfile.name.split(' ')[0] : 'Harsha';
  
  // Active Working On projects
  const workingOnList = state.workCards.filter(w => w.status === 'WORKING');
  const activeItems = workingOnList.length > 0 ? workingOnList : [
    {
      id: 'wrk-1',
      title: 'Personal Brand Video',
      contactName: 'Rahul Sharma',
      company: 'ABC Media',
      workingOn: 'Episode 04 — Final Edit',
      why: 'Founder personal-brand content',
      currentTask: 'Final color correction and subtitles',
      lastActivity: 'Today',
      nextAction: 'Send first review',
      deadline: '20 August',
      notes: 'Working on Episode 04 rough cut. Need high-res logos from Rahul.'
    },
    {
      id: 'wrk-2',
      title: 'Founder Interview',
      contactName: 'Sarah Chen',
      company: 'Venture Labs',
      workingOn: 'Q4 Launch Video',
      why: 'Series A Launch Campaign',
      currentTask: 'Final edit & sound design',
      lastActivity: 'Today',
      nextAction: 'Deliver 4K master file',
      deadline: '22 August',
      notes: 'Proposal submitted ($6,500). Finalizing 4K export.'
    }
  ];

  // Work Status Counts
  const statusCounts = {
    toContact: state.workCards.filter(w => w.status === 'TO CONTACT').length || 8,
    contacted: state.workCards.filter(w => w.status === 'CONTACTED').length || 5,
    next: state.workCards.filter(w => w.status === 'WAITING' || w.status === 'NEXT').length || 3,
    completed: state.workCards.filter(w => w.status === 'COMPLETED').length || 14,
    blocked: state.workCards.filter(w => w.status === 'BLOCKED').length || 2
  };

  const todos = state.todos || [
    { id: 't1', text: '@Rahul Send invoice', done: false },
    { id: 't2', text: 'Finish subtitle correction', done: false },
    { id: 't3', text: 'Call ABC Media', done: false },
    { id: 't4', text: 'Send portfolio', done: true },
    { id: 't5', text: 'Review script', done: false }
  ];

  const notes = state.notes || [
    { id: 'n1', title: 'VIDEO IDEA', color: 'yellow', text: 'Try opening the video with the result.' },
    { id: 'n2', title: 'CLIENT IDEA', color: 'pink', text: 'Ask @Rahul if he wants the vertical version.' },
    { id: 'n3', title: 'PORTFOLIO', color: 'blue', text: 'Change homepage headline.' }
  ];

  const journal = (state.journals && state.journals[0]) || {
    id: 'j-1',
    title: 'Founder video script — Episode 04',
    updatedAt: 'Updated 2 hours ago',
    preview: 'Most founders think personal branding is about posting every day, but real authority comes from cinematic storytelling and concise narrative architecture. In this episode with @Rahul...'
  };

  const reminders = state.reminders || [
    { id: 'r1', time: 'Tomorrow — 10:30 AM', text: 'Follow up with @Rahul', contact: 'Rahul Sharma' },
    { id: 'r2', time: 'Thursday — 9:00 AM', text: 'Send proposal', contact: 'Sarah Chen' },
    { id: 'r3', time: 'Friday — 2:00 PM', text: 'Review final edit', contact: 'DevCorp Operations' }
  ];

  const history = (state.history || []).slice(0, 4);

  // Today Date String
  const todayStr = new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  return `
    <div class="spacious-desk-container">
      
      <!-- 1. HEADER (ULTRA MINIMAL & SPACIOUS) -->
      <header class="spacious-header">
        <div class="header-main-title">
          <h1 class="spacious-greeting">Good morning, ${escapeHtml(firstName)}.</h1>
          <p class="spacious-subline">Here's what you're working on.</p>
        </div>

        <div class="spacious-header-meta">
          <span class="spacious-date-pill">${todayStr}</span>
          <button class="spacious-icon-btn" id="deskReminderBell" title="Reminders">
            <i data-lucide="bell" style="width: 16px; height: 16px;"></i>
          </button>
          <div class="spacious-user-pill" id="deskProfileBtn">
            <div class="spacious-avatar">${firstName.charAt(0)}</div>
            <span class="user-pill-name">${escapeHtml(firstName)}</span>
          </div>
        </div>
      </header>


      <!-- 2. WORKING ON (EXPANSIVE HERO WORKSPACE) -->
      <section class="spacious-section working-on-hero-section">
        <div class="spacious-section-hdr">
          <div class="spacious-section-title">
            <span class="hairline-dot"></span>
            <span>WORKING ON</span>
          </div>
          <span class="spacious-section-sub">Active primary workspace</span>
        </div>

        <div class="spacious-working-grid">
          ${activeItems.map(item => `
            <div class="spacious-working-card">
              <div class="spacious-card-top">
                <div class="client-company-tag">${escapeHtml(item.contactName || 'Client')} • ${escapeHtml(item.company || 'Company')}</div>
                <span class="hairline-badge">ACTIVE</span>
              </div>

              <h2 class="spacious-project-title">${escapeHtml(item.title)}</h2>

              <div class="spacious-detail-table">
                <div class="detail-row">
                  <span class="detail-key">Working on</span>
                  <span class="detail-value highlight">${escapeHtml(item.workingOn || item.service || 'Episode 04 — Final Edit')}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-key">Why</span>
                  <span class="detail-value">${escapeHtml(item.why || 'Founder personal-brand content')}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-key">Current task</span>
                  <span class="detail-value task-pill">${escapeHtml(item.currentTask || item.notes)}</span>
                </div>
              </div>

              <div class="spacious-card-foot">
                <div class="foot-meta-trio">
                  <div><span class="meta-label">Last activity:</span> <span class="meta-data">${item.lastActivity || 'Today'}</span></div>
                  <div><span class="meta-label">Next action:</span> <span class="meta-data action-link">${item.nextAction || 'Send review'}</span></div>
                  <div><span class="meta-label">Deadline:</span> <span class="meta-data">${item.deadline || '20 August'}</span></div>
                </div>

                <div class="spacious-card-actions">
                  <button class="btn-hairline btn-open-doc" data-id="${item.id}">Invoice / Doc</button>
                  <button class="btn-hairline-primary btn-open-work" data-id="${item.id}">
                    Open Project <i data-lucide="arrow-right" style="width: 14px; height: 14px;"></i>
                  </button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </section>


      <!-- 3. SMALL WORK STATUS CELLS -->
      <section class="spacious-section status-section">
        <div class="spacious-section-hdr">
          <span class="spacious-section-title">WORK STATUS OVERVIEW</span>
          <a class="spacious-link" data-nav="work">View Work Section →</a>
        </div>

        <div class="spacious-status-row">
          <div class="hairline-status-cell status-to-contact" data-nav="work">
            <span class="status-cell-name">TO CONTACT</span>
            <span class="status-cell-num">${statusCounts.toContact}</span>
          </div>
          <div class="hairline-status-cell status-contacted" data-nav="work">
            <span class="status-cell-name">CONTACTED</span>
            <span class="status-cell-num">${statusCounts.contacted}</span>
          </div>
          <div class="hairline-status-cell status-next" data-nav="work">
            <span class="status-cell-name">NEXT / QUEUE</span>
            <span class="status-cell-num">${statusCounts.next}</span>
          </div>
          <div class="hairline-status-cell status-completed" data-nav="work">
            <span class="status-cell-name">COMPLETED</span>
            <span class="status-cell-num">${statusCounts.completed}</span>
          </div>
          <div class="hairline-status-cell status-blocked" data-nav="work">
            <span class="status-cell-name">BLOCKED</span>
            <span class="status-cell-num">${statusCounts.blocked}</span>
          </div>
        </div>
      </section>


      <!-- 4 & 5. TWO-COLUMN GRID (TO-DO & NOTES) -->
      <div class="spacious-two-col-grid">
        
        <!-- 4. TO-DO (FAST TASK LIST) -->
        <section class="spacious-section todo-section">
          <div class="spacious-section-hdr">
            <div class="spacious-section-title">
              <i data-lucide="check-square" style="width: 15px; height: 15px;"></i>
              <span>TO-DO</span>
            </div>
            <span class="spacious-section-sub">Type → Press Enter</span>
          </div>

          <form id="deskAddTodoForm" class="hairline-input-wrapper">
            <input type="text" id="deskTodoInput" class="hairline-todo-input" placeholder="+ Add a task... (Use @Name to connect)" autocomplete="off" />
          </form>

          <div class="spacious-todo-list">
            ${todos.length === 0 ? `
              <div class="spacious-empty">Nothing waiting for you.</div>
            ` : todos.map((t, idx) => `
              <div class="spacious-todo-item">
                <input type="checkbox" class="hairline-chk" data-idx="${idx}" ${t.done ? 'checked' : ''} />
                <span class="todo-text ${t.done ? 'done' : ''}">${renderRefText(t.text)}</span>
              </div>
            `).join('')}
          </div>
        </section>

        <!-- 5. NOTES (DIGITAL STICKY NOTES) -->
        <section class="spacious-section notes-section">
          <div class="spacious-section-hdr">
            <div class="spacious-section-title">
              <i data-lucide="sticky-note" style="width: 15px; height: 15px;"></i>
              <span>NOTES</span>
            </div>
            <button class="spacious-btn-text" id="btnAddDeskNote">+ New Note</button>
          </div>

          <div class="spacious-notes-grid">
            ${notes.length === 0 ? `
              <div class="spacious-empty">Capture something before you forget it.</div>
            ` : notes.map((n, idx) => `
              <div class="hairline-note-card note-color-${n.color || 'white'}">
                <div class="note-card-hdr">
                  <span class="note-card-title">${escapeHtml(n.title || 'NOTE')}</span>
                  <span class="note-pin">📌</span>
                </div>
                <textarea class="hairline-note-textarea" data-idx="${idx}">${escapeHtml(n.text)}</textarea>
              </div>
            `).join('')}
          </div>
        </section>

      </div>


      <!-- 6. NOTEBOOK (LARGE CREATIVE WRITING SURFACE PREVIEW) -->
      <section class="spacious-section notebook-section">
        <div class="spacious-section-hdr">
          <div class="spacious-section-title">
            <i data-lucide="book-open" style="width: 15px; height: 15px;"></i>
            <span>NOTEBOOK</span>
          </div>
          <span class="spacious-section-sub">${escapeHtml(journal.updatedAt || 'Updated recently')}</span>
        </div>

        <div class="spacious-notebook-surface" id="btnOpenNotebookArea">
          <div class="nb-surface-hdr">
            <h3 class="nb-surface-title">"${escapeHtml(journal.title || 'Founder video script — Episode 04')}"</h3>
            <span class="nb-surface-tag">Blank Creative Sheet</span>
          </div>
          <p class="nb-surface-snippet">"${escapeHtml(journal.preview || journal.content)}"</p>

          <div class="nb-surface-foot">
            <span class="nb-surface-hint">✏️ Pencil • 🖊️ Pen • T Text • 🖍️ Highlight • 🎨 Color Sketches</span>
            <button class="btn-hairline-primary" id="btnOpenNotebook">
              Open Notebook <i data-lucide="edit-3" style="width: 14px; height: 14px;"></i>
            </button>
          </div>
        </div>
      </section>


      <!-- 7 & 8. TWO-COLUMN GRID (REMINDERS & RECENT ACTIVITY) -->
      <div class="spacious-two-col-grid">
        
        <!-- 7. REMINDERS -->
        <section class="spacious-section reminders-section">
          <div class="spacious-section-hdr">
            <div class="spacious-section-title">
              <i data-lucide="bell" style="width: 15px; height: 15px;"></i>
              <span>REMINDERS</span>
            </div>
            <button class="spacious-btn-text" id="btnAddReminderBtn">+ Add reminder</button>
          </div>

          <div class="spacious-reminder-list">
            ${reminders.length === 0 ? `
              <div class="spacious-empty">No reminders.</div>
            ` : reminders.map((r, idx) => `
              <div class="hairline-reminder-item">
                <span class="reminder-time-tag">${escapeHtml(r.time)}</span>
                <span class="reminder-body-text">${renderRefText(r.text)}</span>
                <button class="spacious-icon-btn-xs btn-email-alert" data-idx="${idx}" title="Email notification enabled">
                  <i data-lucide="mail" style="width: 13px; height: 13px;"></i>
                </button>
              </div>
            `).join('')}
          </div>
        </section>

        <!-- 8. RECENT ACTIVITY -->
        <section class="spacious-section activity-section">
          <div class="spacious-section-hdr">
            <div class="spacious-section-title">
              <i data-lucide="clock" style="width: 15px; height: 15px;"></i>
              <span>RECENT ACTIVITY</span>
            </div>
            <a class="spacious-link" data-nav="history">View History →</a>
          </div>

          <div class="spacious-activity-list">
            ${history.length === 0 ? `
              <div class="spacious-empty">No recent activity.</div>
            ` : history.map(h => `
              <div class="hairline-activity-row">
                <span class="activity-pip"></span>
                <div class="activity-meta">
                  <span class="activity-action-name">${escapeHtml(h.action)}</span>
                  <span class="activity-date-tag">${escapeHtml(h.date)}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </section>

      </div>

    </div>
  `;
}

export function attachHomeEvents(container, navigateTo, openModal, showToast) {
  const notebookService = new NotebookEditorService();

  // Navigation triggers
  container.querySelectorAll('[data-nav]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo(el.getAttribute('data-nav'));
    });
  });

  // Open Project / Doc
  container.querySelectorAll('.btn-open-work').forEach(btn => {
    btn.addEventListener('click', () => navigateTo('work'));
  });

  container.querySelectorAll('.btn-open-doc').forEach(btn => {
    btn.addEventListener('click', () => navigateTo('documents'));
  });

  // Open Notebook Modal
  const openNbBtn = container.querySelector('#btnOpenNotebook') || container.querySelector('#btnOpenNotebookArea');
  if (openNbBtn) {
    openNbBtn.addEventListener('click', () => {
      notebookService.openNotebook();
    });
  }

  // Profile Pill
  const profileBtn = container.querySelector('#deskProfileBtn');
  if (profileBtn) profileBtn.addEventListener('click', () => navigateTo('profile'));

  // Quick Add To-Do (Type -> Enter -> Done)
  const todoForm = container.querySelector('#deskAddTodoForm');
  const todoInput = container.querySelector('#deskTodoInput');
  if (todoForm && todoInput) {
    todoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = todoInput.value.trim();
      if (!val) return;

      const newTodo = { id: 'todo-' + Date.now(), text: val, done: false, date: 'Today' };
      stateManager.update(s => {
        if (!s.todos) s.todos = [];
        s.todos.unshift(newTodo);
      });

      todoInput.value = '';
      if (showToast) showToast('Task added to To-Do.');

      const contentBody = document.getElementById('contentBody');
      contentBody.innerHTML = renderHomeView();
      attachHomeEvents(contentBody, navigateTo, openModal, showToast);
    });
  }

  // To-Do Checkbox toggle
  container.querySelectorAll('.hairline-chk').forEach(chk => {
    chk.addEventListener('change', (e) => {
      const idx = chk.getAttribute('data-idx');
      stateManager.update(s => {
        if (s.todos && s.todos[idx]) {
          s.todos[idx].done = e.target.checked;
        }
      });
      const label = chk.nextElementSibling;
      if (label) {
        if (e.target.checked) label.classList.add('done');
        else label.classList.remove('done');
      }
    });
  });

  // Add Note Button
  const addNoteBtn = container.querySelector('#btnAddDeskNote');
  if (addNoteBtn) {
    addNoteBtn.addEventListener('click', () => {
      const title = prompt('Enter note title (e.g. VIDEO IDEA, CLIENT IDEA):', 'NOTE IDEA');
      if (!title) return;
      const text = prompt('Enter note content:');
      if (!text) return;
      const color = prompt('Choose color (yellow, pink, blue, green, orange, white):', 'yellow');

      stateManager.update(s => {
        if (!s.notes) s.notes = [];
        s.notes.unshift({ id: 'note-' + Date.now(), title, text, color: color || 'yellow' });
      });

      if (showToast) showToast('Sticky note added.');
      const contentBody = document.getElementById('contentBody');
      contentBody.innerHTML = renderHomeView();
      attachHomeEvents(contentBody, navigateTo, openModal, showToast);
    });
  }

  // Sticky Note edit text
  container.querySelectorAll('.hairline-note-textarea').forEach(txt => {
    txt.addEventListener('change', (e) => {
      const idx = txt.getAttribute('data-idx');
      stateManager.update(s => {
        if (s.notes && s.notes[idx]) {
          s.notes[idx].text = e.target.value;
        }
      });
      if (showToast) showToast('Note updated.');
    });
  });

  // Add Reminder Button
  const addRemBtn = container.querySelector('#btnAddReminderBtn');
  if (addRemBtn) {
    addRemBtn.addEventListener('click', () => {
      const text = prompt('Enter reminder (e.g. Follow up with @Rahul):');
      if (!text) return;
      const time = prompt('Enter time (e.g. Tomorrow — 10:30 AM):', 'Tomorrow — 10:30 AM');

      stateManager.update(s => {
        if (!s.reminders) s.reminders = [];
        s.reminders.unshift({ id: 'rem-' + Date.now(), time: time || 'Tomorrow', text, completed: false });
      });

      if (showToast) showToast(`Reminder set! Email notification scheduled.`);
      const contentBody = document.getElementById('contentBody');
      contentBody.innerHTML = renderHomeView();
      attachHomeEvents(contentBody, navigateTo, openModal, showToast);
    });
  }

  // Email Notification alert button
  container.querySelectorAll('.btn-email-alert').forEach(btn => {
    btn.addEventListener('click', () => {
      const email = stateManager.get().brandProfile.email || 'user@dotspace.office';
      if (showToast) showToast(`📧 Reminder notification enabled for ${email}`);
    });
  });
}

function renderRefText(str) {
  if (!str) return '';
  const escaped = escapeHtml(str);
  return escaped.replace(/@([A-Za-z0-9_]+)/g, '<span class="hairline-ref-badge">@$1</span>');
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
