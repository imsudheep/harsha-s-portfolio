/* ==========================================================================
   FOLIO OFFICE - BRAND PROFILE VIEW
   ========================================================================== */

import { stateManager } from '../state.js';
import { SignaturePad } from '../services/signature.js';

export function renderProfileView() {
  const state = stateManager.get();
  const brand = state.brandProfile;

  return `
    <div class="view-header">
      <div class="view-title-group">
        <h1 class="view-title">Brand & Professional Profile</h1>
        <p class="view-subtitle">Set up your professional identity once. Auto-populated on all generated documents.</p>
      </div>
      <div>
        <button class="btn btn-primary" id="btnSaveProfile">
          <i data-lucide="check"></i> Save Brand Profile
        </button>
      </div>
    </div>

    <div class="dashboard-grid">
      <!-- Left Column: Primary Identity Fields -->
      <div class="panel">
        <div class="panel-header">
          <div class="panel-title">
            <i data-lucide="user" style="width: 16px; height: 16px;"></i>
            Freelancer & Business Identity
          </div>
        </div>

        <form id="profileForm" style="display: flex; flex-direction: column; gap: 16px;">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Full Name</label>
              <input type="text" class="form-input" id="profName" value="${escapeHtml(brand.name)}" required />
            </div>
            <div class="form-group">
              <label class="form-label">Business / Studio Name</label>
              <input type="text" class="form-input" id="profCompany" value="${escapeHtml(brand.company)}" required />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Professional Title / Role</label>
              <input type="text" class="form-input" id="profTitle" value="${escapeHtml(brand.title)}" />
            </div>
            <div class="form-group">
              <label class="form-label">Tax ID / Business Reg</label>
              <input type="text" class="form-input" id="profTaxId" value="${escapeHtml(brand.taxId)}" />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Email Address</label>
              <input type="email" class="form-input" id="profEmail" value="${escapeHtml(brand.email)}" required />
            </div>
            <div class="form-group">
              <label class="form-label">Phone Number</label>
              <input type="text" class="form-input" id="profPhone" value="${escapeHtml(brand.phone)}" />
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Website URL</label>
            <input type="url" class="form-input" id="profWebsite" value="${escapeHtml(brand.website)}" />
          </div>

          <div class="form-group">
            <label class="form-label">Business Address</label>
            <textarea class="form-textarea" id="profAddress" rows="3">${escapeHtml(brand.address)}</textarea>
          </div>

          <div class="form-group">
            <label class="form-label">Payment & Bank Information (Appears on Invoices)</label>
            <textarea class="form-textarea" id="profPaymentDetails" rows="4">${escapeHtml(brand.paymentDetails)}</textarea>
          </div>
        </form>
      </div>

      <!-- Right Column: Logo & Digital Signature Pad -->
      <div class="grid-stack">
        <!-- Logo Setup -->
        <div class="panel">
          <div class="panel-header">
            <div class="panel-title">
              <i data-lucide="image" style="width: 16px; height: 16px;"></i>
              Brand Logo
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Logo Image URL</label>
            <input type="url" class="form-input" id="profLogoUrl" value="${escapeHtml(brand.logoUrl)}" placeholder="https://example.com/logo.png" />
            <span style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">Leave blank to use elegant typographic brand header.</span>
          </div>
        </div>

        <!-- Digital Signature Setup -->
        <div class="panel">
          <div class="panel-header">
            <div class="panel-title">
              <i data-lucide="pen-tool" style="width: 16px; height: 16px;"></i>
              Digital Signature
            </div>
            <button class="btn btn-ghost btn-sm" id="btnClearSig">Clear Canvas</button>
          </div>

          <div class="form-group">
            <label class="form-label">Draw Signature below</label>
            <canvas class="signature-canvas" id="profileSigCanvas"></canvas>
          </div>

          <div class="form-group" style="margin-top: 10px;">
            <label class="form-label">Or Formal Typed Signature Text</label>
            <input type="text" class="form-input" id="profSigText" value="${escapeHtml(brand.signatureText)}" />
          </div>
        </div>
      </div>
    </div>
  `;
}

export function attachProfileEvents(container, showToast) {
  const canvas = container.querySelector('#profileSigCanvas');
  let sigPad = null;

  if (canvas) {
    sigPad = new SignaturePad(canvas);
    const btnClear = container.querySelector('#btnClearSig');
    if (btnClear) {
      btnClear.addEventListener('click', (e) => {
        e.preventDefault();
        sigPad.clear();
      });
    }
  }

  const btnSave = container.querySelector('#btnSaveProfile');
  if (btnSave) {
    btnSave.addEventListener('click', (e) => {
      e.preventDefault();

      stateManager.update(s => {
        const b = s.brandProfile;
        b.name = container.querySelector('#profName').value;
        b.company = container.querySelector('#profCompany').value;
        b.title = container.querySelector('#profTitle').value;
        b.taxId = container.querySelector('#profTaxId').value;
        b.email = container.querySelector('#profEmail').value;
        b.phone = container.querySelector('#profPhone').value;
        b.website = container.querySelector('#profWebsite').value;
        b.address = container.querySelector('#profAddress').value;
        b.paymentDetails = container.querySelector('#profPaymentDetails').value;
        b.logoUrl = container.querySelector('#profLogoUrl').value;
        b.signatureText = container.querySelector('#profSigText').value;

        if (sigPad && sigPad.hasSignature) {
          b.signatureDataUrl = sigPad.toDataURL();
        }
      });

      showToast('Brand profile updated successfully!');
    });
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
