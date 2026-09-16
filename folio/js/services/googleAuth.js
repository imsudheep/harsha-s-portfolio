/* ==========================================================================
   DOTSPACE - GOOGLE ACCOUNT AUTHENTICATION SERVICE
   ========================================================================== */

import { stateManager } from '../state.js';

export class GoogleAuthService {
  constructor(appInstance) {
    this.app = appInstance;
    this.init();
  }

  init() {
    // Check if Google GSI SDK script is loaded
    if (window.google && window.google.accounts) {
      this.initGoogleIdSDK();
    } else {
      window.addEventListener('load', () => {
        if (window.google && window.google.accounts) {
          this.initGoogleIdSDK();
        }
      });
    }
  }

  initGoogleIdSDK() {
    try {
      window.google.accounts.id.initialize({
        client_id: '108283921829-dotspace.apps.googleusercontent.com',
        callback: (response) => this.handleCredentialResponse(response),
        auto_select: false
      });
    } catch (err) {
      console.warn('Google Identity SDK init note:', err);
    }
  }

  handleCredentialResponse(response) {
    if (!response || !response.credential) return;
    try {
      // Decode JWT token payload
      const base64Url = response.credential.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      const user = JSON.parse(jsonPayload);
      this.loginWithGoogleUser({
        name: user.name || user.given_name || 'Google User',
        email: user.email,
        picture: user.picture
      });
    } catch (e) {
      console.error('Failed to parse Google JWT payload:', e);
    }
  }

  loginWithGoogleUser(googleUser) {
    const current = stateManager.get().brandProfile;
    stateManager.updateBrandProfile({
      ...current,
      name: googleUser.name || current.name,
      email: googleUser.email || current.email,
      company: googleUser.name ? `${googleUser.name.split(' ')[0]} Studio` : current.company
    });

    // Update UI elements
    const authOverlay = document.getElementById('authOverlay');
    if (authOverlay) {
      authOverlay.classList.add('hidden');
    }

    const firstName = (googleUser.name || 'User').split(' ')[0];
    if (this.app && this.app.showToast) {
      this.app.showToast(`Signed in with Google as ${googleUser.email}. Welcome!`);
    }

    // Refresh current view to display updated Google credentials
    if (this.app && this.app.navigateTo) {
      this.app.navigateTo(stateManager.get().activeView || 'home');
    }
  }

  promptGoogleSignIn() {
    // Try Google Identity Services One Tap prompt if available
    if (window.google && window.google.accounts && window.google.accounts.id) {
      window.google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          this.openGoogleAccountModal();
        }
      });
    } else {
      this.openGoogleAccountModal();
    }
  }

  openGoogleAccountModal() {
    const s = stateManager.get();
    const existingEmail = s.brandProfile.email || 'harsha@gmail.com';
    const existingName = s.brandProfile.name || 'Harsha Vardhan';

    const modalHtml = `
      <div class="modal-header">
        <div style="display: flex; align-items: center; gap: 10px;">
          <svg width="24" height="24" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.616z" fill="#4285F4"/>
            <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
            <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
            <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
          </svg>
          <h2 class="modal-title">Sign in with Google</h2>
        </div>
        <button class="modal-close" id="closeGoogleModal">✕</button>
      </div>

      <div class="modal-body">
        <p style="font-size: 13px; color: var(--text-secondary); margin-bottom: 16px;">
          Choose a Google Account to continue to <strong>dotspace</strong>.
        </p>

        <!-- Quick Google Account Card 1 -->
        <div class="google-account-item" id="googleAccountItem1" style="display: flex; align-items: center; gap: 12px; padding: 12px 16px; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); background: var(--bg-surface); cursor: pointer; margin-bottom: 10px; transition: all 0.2s;">
          <div style="width: 36px; height: 36px; border-radius: 50%; background: #4285f4; color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px;">
            ${existingName.charAt(0)}
          </div>
          <div style="flex: 1; text-align: left;">
            <div style="font-size: 13px; font-weight: 600; color: var(--text-primary);">${escapeHtml(existingName)}</div>
            <div style="font-size: 11px; color: var(--text-muted);">${escapeHtml(existingEmail)}</div>
          </div>
          <span class="badge" style="font-size: 10px;">Google</span>
        </div>

        <form id="googleCustomLoginForm" style="display: flex; flex-direction: column; gap: 12px; margin-top: 16px; text-align: left;">
          <div class="form-group">
            <label class="form-label" style="font-size: 11px;">Or enter any Google Mail address</label>
            <input type="email" class="form-input" id="googleCustomEmail" placeholder="yourname@gmail.com" value="${escapeHtml(existingEmail)}" required />
          </div>
          <button type="submit" class="btn btn-primary" style="width: 100%; font-size: 13px; padding: 12px;">
            Sign In with this Google Account
          </button>
        </form>
      </div>
    `;

    if (this.app && this.app.openCustomModal) {
      this.app.openCustomModal(modalHtml);

      const closeBtn = document.getElementById('closeGoogleModal');
      if (closeBtn) closeBtn.addEventListener('click', () => this.app.closeModal());

      const item1 = document.getElementById('googleAccountItem1');
      if (item1) {
        item1.addEventListener('click', () => {
          this.app.closeModal();
          this.loginWithGoogleUser({
            name: existingName,
            email: existingEmail
          });
        });
      }

      const customForm = document.getElementById('googleCustomLoginForm');
      if (customForm) {
        customForm.addEventListener('submit', (e) => {
          e.preventDefault();
          const email = document.getElementById('googleCustomEmail').value;
          if (!email) return;
          const namePart = email.split('@')[0].replace(/[._]/g, ' ');
          const formattedName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
          
          this.app.closeModal();
          this.loginWithGoogleUser({
            name: formattedName,
            email: email
          });
        });
      }
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
