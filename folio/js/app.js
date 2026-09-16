/* ==========================================================================
   FOLIO OFFICE - MAIN APPLICATION ORCHESTRATOR
   ========================================================================== */

import { stateManager } from './state.js';
import { renderHomeView, attachHomeEvents } from './views/home.js';
import { renderDocumentsView, attachDocumentsEvents } from './views/documents.js';
import { renderWorkView, attachWorkEvents } from './views/work.js';
import { renderContactsView, attachContactsEvents } from './views/contacts.js';
import { renderHistoryView, attachHistoryEvents } from './views/history.js';
import { renderCalendarView, attachCalendarEvents } from './views/calendar.js';
import { renderProfileView, attachProfileEvents } from './views/profile.js';
import { renderPricingView, attachPricingEvents } from './views/pricing.js';
import { improveText } from './services/aiAssist.js';
import { GoogleAuthService } from './services/googleAuth.js';

class App {
  constructor() {
    this.contentBody = document.getElementById('contentBody');
    this.pageTitle = document.getElementById('pageTitle');
    this.modalBackdrop = document.getElementById('modalBackdrop');
    this.modalContainer = document.getElementById('modalContainer');
    this.toastContainer = document.getElementById('toastContainer');
    
    this.sidebar = document.getElementById('appSidebar');
    this.sidebarBackdrop = document.getElementById('sidebarBackdrop');
    this.currentView = 'home';
    this.viewParams = {};

    this.init();
  }

  init() {
    // Apply saved theme
    const state = stateManager.get();
    document.documentElement.setAttribute('data-theme', state.theme || 'dark');
    this.updateThemeButton();

    // Subscribe to state changes for tier widget updates
    stateManager.subscribe((s) => {
      this.updateSidebarTierWidget(s);
    });
    this.updateSidebarTierWidget(state);

    // Mobile Menu Drawer Toggles
    const mobileToggle = document.getElementById('mobileMenuToggle');
    const mobileClose = document.getElementById('mobileMenuClose');
    if (mobileToggle) {
      mobileToggle.addEventListener('click', () => this.toggleMobileMenu());
    }
    if (mobileClose) {
      mobileClose.addEventListener('click', () => this.closeMobileMenu());
    }
    if (this.sidebarBackdrop) {
      this.sidebarBackdrop.addEventListener('click', () => this.closeMobileMenu());
    }

    // Attach navigation clicks
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const view = item.getAttribute('data-view');
        this.navigateTo(view);
        this.closeMobileMenu();
      });
    });

    // Header Quick New Doc Button
    const quickDocBtn = document.getElementById('quickNewDocBtn');
    if (quickDocBtn) {
      quickDocBtn.addEventListener('click', () => {
        if (!stateManager.canCreateDocument()) {
          this.openModal('upgradeModal');
          this.showToast('Document limit reached on Free plan.');
          return;
        }
        const s = stateManager.get();
        const count = s.documents.length + 1;
        const numStr = String(count).padStart(3, '0');
        const newDoc = {
          id: 'doc-' + Date.now(),
          docNumber: `DOC-2026-${numStr}`,
          type: 'Welcome Note',
          title: `New Welcome Note #${numStr}`,
          contactId: '',
          contactName: '',
          contactCompany: '',
          contactEmail: '',
          date: new Date().toISOString().split('T')[0],
          dueDate: '',
          status: 'Draft',
          content: 'Type your document content here...',
          items: [],
          signatureIncluded: true
        };
        stateManager.update(st => st.documents.unshift(newDoc));
        stateManager.incrementDocCount();
        this.navigateTo('documents', { docId: newDoc.id });
        this.showToast('New document initialized.');
      });
    }

    // Sidebar Upgrade Button
    const upgradeBtn = document.getElementById('upgradeBtn');
    if (upgradeBtn) {
      upgradeBtn.addEventListener('click', () => this.navigateTo('pricing'));
    }

    // Theme Toggle Button
    const themeBtn = document.getElementById('themeToggleBtn');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        stateManager.update(s => s.theme = next);
        this.updateThemeButton();
        this.showToast(`Switched to ${next === 'dark' ? 'Dark' : 'Light'} Mode`);
      });
    }

    // Global Search Input
    const searchInput = document.getElementById('globalSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value;
        if (query.trim()) {
          this.navigateTo('history', { searchQuery: query });
        }
      });
    }

    // Auth Overlay & Lock Office Handlers
    this.authOverlay = document.getElementById('authOverlay');
    if (this.authOverlay) {
      this.authOverlay.classList.add('hidden');
    }
    const authForm = document.getElementById('authLoginForm');
    const lockBtn = document.getElementById('btnLockOffice');

    // Populate user profile info on Auth Badge
    const uName = state.brandProfile.name || 'Harsha Vardhan';
    const uEmail = state.brandProfile.email || 'harsha@dotspace.office';
    const uInitials = uName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

    const nameEl = document.getElementById('authUserName');
    const emailEl = document.getElementById('authUserEmail');
    const avatarEl = document.getElementById('authAvatar');

    if (nameEl) nameEl.textContent = uName;
    if (emailEl) emailEl.textContent = uEmail;
    if (avatarEl) avatarEl.textContent = uInitials;

    // Initialize Google Auth Service
    this.googleAuth = new GoogleAuthService(this);

    const btnGoogleSignIn = document.getElementById('btnGoogleSignIn');
    if (btnGoogleSignIn) {
      btnGoogleSignIn.addEventListener('click', () => {
        this.googleAuth.promptGoogleSignIn();
      });
    }

    if (authForm) {
      authForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (this.authOverlay) {
          this.authOverlay.classList.add('hidden');
        }
        this.showToast(`Welcome back, ${uName.split(' ')[0]}! Office Unlocked.`);
      });
    }

    if (lockBtn) {
      lockBtn.addEventListener('click', () => {
        if (this.authOverlay) {
          this.authOverlay.classList.remove('hidden');
        }
        this.showToast('Workspace Locked.');
      });
    }

    // Modal backdrop click to close
    this.modalBackdrop.addEventListener('click', (e) => {
      if (e.target === this.modalBackdrop) {
        this.closeModal();
      }
    });

    // Render initial view
    this.navigateTo('home');
  }

  toggleMobileMenu() {
    if (this.sidebar) this.sidebar.classList.toggle('mobile-open');
    if (this.sidebarBackdrop) this.sidebarBackdrop.classList.toggle('mobile-open');
  }

  closeMobileMenu() {
    if (this.sidebar) this.sidebar.classList.remove('mobile-open');
    if (this.sidebarBackdrop) this.sidebarBackdrop.classList.remove('mobile-open');
  }

  updateThemeButton() {
    const theme = document.documentElement.getAttribute('data-theme');
    const label = document.getElementById('themeLabel');
    const icon = document.getElementById('themeIcon');
    if (label) label.textContent = theme === 'dark' ? 'Dark Mode' : 'Light Mode';
    if (icon) icon.setAttribute('data-lucide', theme === 'dark' ? 'moon' : 'sun');
    if (window.lucide) window.lucide.createIcons();
  }

  updateSidebarTierWidget(state) {
    const sub = state.subscription;
    const badge = document.getElementById('tierBadge');
    const text = document.getElementById('docCountText');
    const fill = document.getElementById('tierProgressFill');

    if (sub.plan === 'premium') {
      if (badge) badge.textContent = 'PREMIUM PLAN';
      if (text) text.textContent = 'UNLIMITED';
      if (fill) fill.style.width = '100%';
    } else {
      if (badge) badge.textContent = 'FREE PLAN';
      if (text) text.textContent = `${sub.docsCreatedThisMonth}/${sub.maxFreeDocs} DOCS`;
      const pct = Math.min(100, Math.round((sub.docsCreatedThisMonth / sub.maxFreeDocs) * 100));
      if (fill) fill.style.width = `${pct}%`;
    }
  }

  navigateTo(viewName, params = {}) {
    this.currentView = viewName;
    this.viewParams = params;

    // Update nav active states
    document.querySelectorAll('.nav-item').forEach(item => {
      if (item.getAttribute('data-view') === viewName) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // Render view HTML
    switch(viewName) {
      case 'home':
        this.pageTitle.textContent = 'Home Workspace';
        this.contentBody.innerHTML = renderHomeView();
        attachHomeEvents(this.contentBody, (v) => this.navigateTo(v), (m, p) => this.openModal(m, p));
        break;

      case 'documents':
        this.pageTitle.textContent = 'Document Generator';
        this.contentBody.innerHTML = renderDocumentsView(params, (msg) => this.showToast(msg), (m, p) => this.openModal(m, p), (v, p) => this.navigateTo(v, p));
        attachDocumentsEvents(this.contentBody, (msg) => this.showToast(msg), (m, p) => this.openModal(m, p), (v, p) => this.navigateTo(v, p));
        break;

      case 'work':
        this.pageTitle.textContent = 'Work Board';
        this.contentBody.innerHTML = renderWorkView();
        attachWorkEvents(this.contentBody, (msg) => this.showToast(msg), (m, p) => this.openModal(m, p));
        break;

      case 'contacts':
        this.pageTitle.textContent = 'Contacts Directory';
        this.contentBody.innerHTML = renderContactsView();
        attachContactsEvents(this.contentBody, (msg) => this.showToast(msg), (m, p) => this.openModal(m, p), (v, p) => this.navigateTo(v, p));
        break;

      case 'history':
        this.pageTitle.textContent = 'Activity History';
        this.contentBody.innerHTML = renderHistoryView('All', params.searchQuery || '');
        attachHistoryEvents(this.contentBody, (msg) => this.showToast(msg), (m, p) => this.openModal(m, p), (v, p) => this.navigateTo(v, p));
        break;

      case 'calendar':
        this.pageTitle.textContent = 'Follow-ups & Calendar';
        this.contentBody.innerHTML = renderCalendarView();
        attachCalendarEvents(this.contentBody, (msg) => this.showToast(msg), (m, p) => this.openModal(m, p));
        break;

      case 'profile':
        this.pageTitle.textContent = 'Brand Profile';
        this.contentBody.innerHTML = renderProfileView();
        attachProfileEvents(this.contentBody, (msg) => this.showToast(msg));
        break;

      case 'pricing':
        this.pageTitle.textContent = 'Subscription Tiers';
        this.contentBody.innerHTML = renderPricingView();
        attachPricingEvents(this.contentBody, (msg) => this.showToast(msg));
        break;

      default:
        this.navigateTo('home');
        return;
    }

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i data-lucide="check-circle" style="width: 16px; height: 16px;"></i> ${escapeHtml(message)}`;
    this.toastContainer.appendChild(toast);
    if (window.lucide) window.lucide.createIcons();

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  openModal(modalType, props = {}) {
    if (!this.modalContainer || !this.modalBackdrop) return;
    this.modalContainer.innerHTML = this.renderModalContent(modalType, props);
    this.modalBackdrop.classList.add('active');
    if (window.lucide) window.lucide.createIcons();
    this.attachModalEvents(modalType, props);
  }

  openCustomModal(htmlContent) {
    if (!this.modalContainer || !this.modalBackdrop) return;
    this.modalContainer.innerHTML = htmlContent;
    this.modalBackdrop.classList.add('active');
    if (window.lucide) window.lucide.createIcons();
  }

  closeModal() {
    if (!this.modalBackdrop) return;
    this.modalBackdrop.classList.remove('active');
    setTimeout(() => {
      this.modalContainer.innerHTML = '';
    }, 200);
  }

  renderModalContent(modalType, props) {
    const state = stateManager.get();

    switch(modalType) {
      case 'addContact':
        return `
          <div class="modal-header">
            <h3 class="modal-title">Add New Contact</h3>
            <button class="btn btn-ghost btn-sm" id="modalClose">✕</button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label class="form-label">Full Name</label>
              <input type="text" class="form-input" id="mCntName" placeholder="Rahul Sharma" required />
            </div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Company</label>
                <input type="text" class="form-input" id="mCntCompany" placeholder="ABC Media" />
              </div>
              <div class="form-group">
                <label class="form-label">Role</label>
                <input type="text" class="form-input" id="mCntRole" placeholder="Founder" />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Email</label>
                <input type="email" class="form-input" id="mCntEmail" placeholder="rahul@abcmedia.com" />
              </div>
              <div class="form-group">
                <label class="form-label">Phone</label>
                <input type="text" class="form-input" id="mCntPhone" placeholder="+1 (555) 000-0000" />
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Service / Project Discussed</label>
              <input type="text" class="form-input" id="mCntService" placeholder="Personal Brand Video" />
            </div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Last Contacted Date</label>
                <input type="date" class="form-input" id="mCntLast" value="${new Date().toISOString().split('T')[0]}" />
              </div>
              <div class="form-group">
                <label class="form-label">Next Follow-up Date</label>
                <input type="date" class="form-input" id="mCntNext" />
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Notes</label>
              <textarea class="form-textarea" id="mCntNotes" rows="3" placeholder="Sent portfolio. Waiting for response."></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" id="modalCancel">Cancel</button>
            <button class="btn btn-primary" id="mSaveContactBtn">Save Contact</button>
          </div>
        `;

      case 'addWorkCard':
        return `
          <div class="modal-header">
            <h3 class="modal-title">Track Work Item</h3>
            <button class="btn btn-ghost btn-sm" id="modalClose">✕</button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label class="form-label">Project / Work Title</label>
              <input type="text" class="form-input" id="mWrkTitle" placeholder="Rahul - Personal Brand Video" required />
            </div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Company / Client</label>
                <input type="text" class="form-input" id="mWrkCompany" placeholder="ABC Media" />
              </div>
              <div class="form-group">
                <label class="form-label">Service Type</label>
                <input type="text" class="form-input" id="mWrkService" placeholder="Video Editing" />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Initial Status</label>
                <select class="form-select" id="mWrkStatus">
                  <option value="TO CONTACT">TO CONTACT</option>
                  <option value="CONTACTED">CONTACTED</option>
                  <option value="WAITING">WAITING</option>
                  <option value="WORKING" selected>WORKING</option>
                  <option value="COMPLETED">COMPLETED</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Next Follow-up</label>
                <input type="date" class="form-input" id="mWrkFollowUp" />
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Project Notes & Details</label>
              <textarea class="form-textarea" id="mWrkNotes" rows="3" placeholder="What was discussed or sent..."></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" id="modalCancel">Cancel</button>
            <button class="btn btn-primary" id="mSaveWorkBtn">Add to Work Board</button>
          </div>
        `;

      case 'addCalendarTask':
        return `
          <div class="modal-header">
            <h3 class="modal-title">Schedule Follow-up Reminder</h3>
            <button class="btn btn-ghost btn-sm" id="modalClose">✕</button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label class="form-label">Reminder Title</label>
              <input type="text" class="form-input" id="mCalTitle" placeholder="Follow up with Rahul (ABC Media)" required />
            </div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Date</label>
                <input type="date" class="form-input" id="mCalDate" value="${new Date().toISOString().split('T')[0]}" />
              </div>
              <div class="form-group">
                <label class="form-label">Type</label>
                <select class="form-select" id="mCalType">
                  <option value="Follow-up">Follow-up</option>
                  <option value="Deadline">Deadline</option>
                  <option value="Payment">Payment Due</option>
                  <option value="Meeting">Meeting</option>
                </select>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" id="modalCancel">Cancel</button>
            <button class="btn btn-primary" id="mSaveCalBtn">Set Reminder</button>
          </div>
        `;

      case 'aiAssistModal':
        return `
          <div class="modal-header">
            <h3 class="modal-title" style="display: flex; align-items: center; gap: 8px;">
              <i data-lucide="sparkles" style="width: 18px; height: 18px;"></i> Writing Assistance (Assist)
            </h3>
            <button class="btn btn-ghost btn-sm" id="modalClose">✕</button>
          </div>
          <div class="modal-body">
            <p style="font-size: 12px; color: var(--text-muted);">Select an explicit improvement action to refine your document text. Your content is never automatically modified without your approval.</p>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 12px 0;">
              <button class="btn btn-secondary btn-sm assist-action-btn" data-action="fix_grammar">Fix Grammar</button>
              <button class="btn btn-secondary btn-sm assist-action-btn" data-action="make_professional">Make Professional</button>
              <button class="btn btn-secondary btn-sm assist-action-btn" data-action="make_clearer">Make Clearer</button>
              <button class="btn btn-secondary btn-sm assist-action-btn" data-action="shorten">Shorten</button>
              <button class="btn btn-secondary btn-sm assist-action-btn" data-action="expand">Expand</button>
              <button class="btn btn-secondary btn-sm assist-action-btn" data-action="rewrite">Full Rewrite</button>
            </div>

            <div class="form-group">
              <label class="form-label">Preview Refined Text</label>
              <textarea class="form-textarea" id="assistPreviewText" rows="6">${escapeHtml(props.currentText || '')}</textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" id="modalCancel">Discard</button>
            <button class="btn btn-primary" id="mApplyAssistBtn">Apply to Document</button>
          </div>
        `;

      case 'upgradeModal':
        return `
          <div class="modal-header">
            <h3 class="modal-title">Upgrade to dotspace Pro</h3>
            <button class="btn btn-ghost btn-sm" id="modalClose">✕</button>
          </div>
          <div class="modal-body" style="text-align: center; padding: 32px 24px;">
            <i data-lucide="sparkles" style="width: 48px; height: 48px; margin-bottom: 16px;"></i>
            <h2 style="font-size: 20px; font-weight: 700; margin-bottom: 8px;">Unlock Unlimited Private Office Features</h2>
            <p style="font-size: 13px; color: var(--text-secondary); margin-bottom: 24px; max-width: 400px; margin-left: auto; margin-right: auto;">
              You have reached your 5 free document limit this month. Upgrade to Premium for $19/mo for unlimited documents, CRM contacts, work board, and verified digital signatures.
            </p>
          </div>
          <div class="modal-footer" style="justify-content: center;">
            <button class="btn btn-secondary" id="modalCancel">Maybe Later</button>
            <button class="btn btn-primary" id="mGoToPricingBtn">View Subscription Plans</button>
          </div>
        `;

      default:
        return '';
    }
  }

  attachModalEvents(modalType, props) {
    const closeBtn = document.getElementById('modalClose');
    const cancelBtn = document.getElementById('modalCancel');
    if (closeBtn) closeBtn.addEventListener('click', () => this.closeModal());
    if (cancelBtn) cancelBtn.addEventListener('click', () => this.closeModal());

    switch(modalType) {
      case 'addContact':
        const saveCnt = document.getElementById('mSaveContactBtn');
        if (saveCnt) {
          saveCnt.addEventListener('click', () => {
            const name = document.getElementById('mCntName').value;
            if (!name) return;
            const newCnt = {
              id: 'cnt-' + Date.now(),
              name,
              company: document.getElementById('mCntCompany').value,
              role: document.getElementById('mCntRole').value,
              email: document.getElementById('mCntEmail').value,
              phone: document.getElementById('mCntPhone').value,
              serviceDiscussed: document.getElementById('mCntService').value,
              lastContacted: document.getElementById('mCntLast').value,
              nextFollowUp: document.getElementById('mCntNext').value,
              notes: document.getElementById('mCntNotes').value
            };
            stateManager.update(s => s.contacts.unshift(newCnt));
            stateManager.addHistory(`Added new contact ${name} (${newCnt.company})`, name, 'Contacts');
            this.closeModal();
            this.showToast(`Saved contact ${name}`);
            this.navigateTo('contacts');
          });
        }
        break;

      case 'addWorkCard':
        const saveWrk = document.getElementById('mSaveWorkBtn');
        if (saveWrk) {
          saveWrk.addEventListener('click', () => {
            const title = document.getElementById('mWrkTitle').value;
            if (!title) return;
            const newCard = {
              id: 'wrk-' + Date.now(),
              title,
              company: document.getElementById('mWrkCompany').value,
              service: document.getElementById('mWrkService').value,
              status: document.getElementById('mWrkStatus').value,
              nextFollowUp: document.getElementById('mWrkFollowUp').value,
              notes: document.getElementById('mWrkNotes').value
            };
            stateManager.update(s => s.workCards.unshift(newCard));
            stateManager.addHistory(`Added work card "${title}"`, newCard.company, 'Projects');
            this.closeModal();
            this.showToast(`Added card to Work Board`);
            this.navigateTo('work');
          });
        }
        break;

      case 'addCalendarTask':
        const saveCal = document.getElementById('mSaveCalBtn');
        if (saveCal) {
          saveCal.addEventListener('click', () => {
            const title = document.getElementById('mCalTitle').value;
            if (!title) return;
            const newTask = {
              id: 'cal-' + Date.now(),
              title,
              date: document.getElementById('mCalDate').value,
              type: document.getElementById('mCalType').value,
              completed: false
            };
            stateManager.update(s => s.calendarEvents.unshift(newTask));
            this.closeModal();
            this.showToast(`Reminder scheduled for ${newTask.date}`);
            this.navigateTo('calendar');
          });
        }
        break;

      case 'aiAssistModal':
        let currentAssistedText = props.currentText || '';
        const previewEl = document.getElementById('assistPreviewText');

        document.querySelectorAll('.assist-action-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            const act = btn.getAttribute('data-action');
            currentAssistedText = improveText(currentAssistedText, act);
            if (previewEl) previewEl.value = currentAssistedText;
          });
        });

        const applyAssist = document.getElementById('mApplyAssistBtn');
        if (applyAssist) {
          applyAssist.addEventListener('click', () => {
            if (props.onApply) {
              props.onApply(previewEl ? previewEl.value : currentAssistedText);
            }
            this.closeModal();
          });
        }
        break;

      case 'upgradeModal':
        const goPricing = document.getElementById('mGoToPricingBtn');
        if (goPricing) {
          goPricing.addEventListener('click', () => {
            this.closeModal();
            this.navigateTo('pricing');
          });
        }
        break;
    }
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

// Bootstrap application on window load
window.addEventListener('DOMContentLoaded', () => {
  window.folioApp = new App();
});
