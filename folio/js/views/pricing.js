/* ==========================================================================
   FOLIO OFFICE - PRICING & SUBSCRIPTION VIEW
   ========================================================================== */

import { stateManager } from '../state.js';

export function renderPricingView() {
  const state = stateManager.get();
  const plan = state.subscription.plan;

  return `
    <div class="view-header" style="text-align: center; display: block; margin-bottom: 40px;">
      <h1 class="view-title" style="font-size: 32px; margin-bottom: 8px;">Private Workspace Subscription</h1>
      <p class="view-subtitle" style="font-size: 15px;">Simple, honest pricing for independent professionals. No ads. No client portals.</p>
    </div>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 32px; max-width: 900px; margin: 0 auto;">
      <!-- Free Tier Card -->
      <div class="panel" style="display: flex; flex-direction: column; justify-content: space-between; border-color: ${plan === 'free' ? 'var(--text-primary)' : 'var(--border-subtle)'}">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <span style="font-size: 14px; font-weight: 700; uppercase; letter-spacing: 1px;">FREE TIER</span>
            ${plan === 'free' ? '<span class="badge">Current Plan</span>' : ''}
          </div>
          <div style="font-size: 36px; font-weight: 800; color: var(--text-primary); margin-bottom: 16px;">$0 <span style="font-size: 14px; color: var(--text-muted); font-weight: 400;">/ month forever</span></div>
          <p style="font-size: 13px; color: var(--text-secondary); margin-bottom: 24px;">Essential tools for starting freelancers creating occasional business documents.</p>

          <div style="display: flex; flex-direction: column; gap: 12px; font-size: 13px; color: var(--text-primary);">
            <div>✓ Single Brand Profile setup</div>
            <div>✓ Standard professional document formats</div>
            <div>✓ Maximum 5 document creations / month</div>
            <div>✓ High-resolution PDF exports</div>
            <div>✓ Basic private workspace</div>
          </div>
        </div>

        <div style="margin-top: 32px;">
          <button class="btn btn-secondary" style="width: 100%;" ${plan === 'free' ? 'disabled' : ''} id="btnSelectFree">
            ${plan === 'free' ? 'Active Plan' : 'Downgrade to Free'}
          </button>
        </div>
      </div>

      <!-- Premium Tier Card -->
      <div class="panel" style="display: flex; flex-direction: column; justify-content: space-between; background: var(--bg-surface-hover); border: 2px solid var(--text-primary);">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <span style="font-size: 14px; font-weight: 700; uppercase; letter-spacing: 1px;">DOTSPACE PRO</span>
            ${plan === 'premium' ? '<span class="badge">Current Plan</span>' : '<span class="badge" style="background: var(--text-primary); color: var(--bg-app);">Recommended</span>'}
          </div>
          <div style="font-size: 36px; font-weight: 800; color: var(--text-primary); margin-bottom: 16px;">$19 <span style="font-size: 14px; color: var(--text-muted); font-weight: 400;">/ month</span></div>
          <p style="font-size: 13px; color: var(--text-secondary); margin-bottom: 24px;">Complete private digital office for active independent professionals.</p>

          <div style="display: flex; flex-direction: column; gap: 12px; font-size: 13px; color: var(--text-primary);">
            <div>✓ <strong>Unlimited document creations</strong></div>
            <div>✓ Full chronological activity history timeline</div>
            <div>✓ Contacts CRM directory & history linkage</div>
            <div>✓ Kanban Work Board tracking</div>
            <div>✓ Follow-up reminders & deadline calendar</div>
            <div>✓ Verified Digital Signatures & audit stamp</div>
            <div>✓ Document style & font customization</div>
            <div>✓ Advanced document types</div>
          </div>
        </div>

        <div style="margin-top: 32px;">
          <button class="btn btn-primary" style="width: 100%; font-size: 14px; padding: 12px;" id="btnSelectPremium">
            ${plan === 'premium' ? 'Current Pro Member' : 'Upgrade to Pro — $19/mo'}
          </button>
        </div>
      </div>
    </div>
  `;
}

export function attachPricingEvents(container, showToast) {
  const btnPrem = container.querySelector('#btnSelectPremium');
  if (btnPrem) {
    btnPrem.addEventListener('click', () => {
      stateManager.update(s => {
        s.subscription.plan = 'premium';
      });
      showToast('🎉 Upgraded to dotspace Pro! Unlimited features unlocked.');
      // Re-render
      const contentBody = document.getElementById('contentBody');
      contentBody.innerHTML = renderPricingView();
      attachPricingEvents(contentBody, showToast);
    });
  }

  const btnFree = container.querySelector('#btnSelectFree');
  if (btnFree) {
    btnFree.addEventListener('click', () => {
      stateManager.update(s => {
        s.subscription.plan = 'free';
      });
      showToast('Switched to Free plan.');
      const contentBody = document.getElementById('contentBody');
      contentBody.innerHTML = renderPricingView();
      attachPricingEvents(contentBody, showToast);
    });
  }
}
