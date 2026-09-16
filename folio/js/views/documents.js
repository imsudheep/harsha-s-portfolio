/* ==========================================================================
   FOLIO OFFICE - DOCUMENTS MODULE (MAIN FEATURE)
   ========================================================================== */

import { stateManager } from '../state.js';
import { exportDocumentToPDF } from '../services/pdf.js';
import { improveText } from '../services/aiAssist.js';
import { generateDigitalAuditStamp } from '../services/signature.js';

export function renderDocumentsView(params = {}, showToast, openModal, navigateTo) {
  const state = stateManager.get();
  let currentDoc = null;

  if (params.docId) {
    currentDoc = state.documents.find(d => d.id === params.docId);
  }

  // If no document selected, open the first document or initialize a default draft
  if (!currentDoc) {
    currentDoc = state.documents[0] || createNewDraft(state);
  }

  const brand = state.brandProfile;
  const contacts = state.contacts;

  return `
    <div class="view-header" style="margin-bottom: 16px;">
      <div class="view-title-group">
        <h1 class="view-title">Document Generator</h1>
        <p class="view-subtitle">Write it. We make it professional.</p>
      </div>

      <div style="display: flex; align-items: center; gap: 10px;">
        <button class="btn btn-secondary btn-sm" id="btnNewBlankDoc">
          <i data-lucide="plus"></i> New Document
        </button>
        <button class="btn btn-secondary btn-sm" id="btnCustomizationToggle">
          <i data-lucide="sliders"></i> Style Options
        </button>
        <button class="btn btn-primary" id="btnDownloadPDF">
          <i data-lucide="download"></i> Download PDF
        </button>
      </div>
    </div>

    <!-- Document Types Selector Tabs -->
    <div style="display: flex; gap: 6px; overflow-x: auto; padding-bottom: 12px; margin-bottom: 16px; border-bottom: 1px solid var(--border-subtle);">
      ${['Welcome Note', 'Proposal', 'Quotation', 'Invoice', 'Agreement', 'Contract', 'Receipt', 'Project Delivery Note', 'Thank You Note', 'Custom Document'].map(type => `
        <button class="btn btn-sm ${currentDoc.type === type ? 'btn-primary' : 'btn-ghost'} doc-type-tab" data-type="${type}">
          ${type}
        </button>
      `).join('')}
    </div>

    <!-- Editor Split Pane Layout -->
    <div class="doc-editor-wrapper">
      <!-- Left Pane: Professional Editor -->
      <div class="editor-pane">
        <div class="editor-toolbar">
          <div class="toolbar-group">
            <span style="font-size: 11px; font-weight: 600; text-transform: uppercase; color: var(--text-muted);">Editor</span>
          </div>

          <div class="toolbar-group">
            <!-- Optional Assist Dropdown -->
            <button class="btn btn-secondary btn-sm" id="btnAiAssist" title="Optional Writing Assistance">
              <i data-lucide="sparkles" style="width: 14px; height: 14px;"></i> Assist
            </button>

            <!-- Digital Signature Action -->
            <button class="btn btn-secondary btn-sm" id="btnSignDocument">
              <i data-lucide="file-signature" style="width: 14px; height: 14px;"></i> ${currentDoc.digitallySigned ? 'Signed Audit' : 'Add Signature'}
            </button>
          </div>
        </div>

        <div class="editor-form-scroll">
          <!-- Document General Details -->
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Document Title</label>
              <input type="text" class="form-input" id="fieldDocTitle" value="${escapeHtml(currentDoc.title || '')}" placeholder="e.g. Welcome Note - Rahul" />
            </div>
            <div class="form-group">
              <label class="form-label">Document #</label>
              <input type="text" class="form-input" id="fieldDocNumber" value="${escapeHtml(currentDoc.docNumber || 'DOC-2026-001')}" />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Select Contact / Client</label>
              <select class="form-select" id="fieldContactSelect">
                <option value="">-- Choose Existing Contact --</option>
                ${contacts.map(c => `
                  <option value="${c.id}" ${currentDoc.contactId === c.id ? 'selected' : ''}>
                    ${escapeHtml(c.name)} (${escapeHtml(c.company || 'Individual')})
                  </option>
                `).join('')}
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Client Name</label>
              <input type="text" class="form-input" id="fieldClientName" value="${escapeHtml(currentDoc.contactName || '')}" placeholder="Rahul Sharma" />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Client Company</label>
              <input type="text" class="form-input" id="fieldClientCompany" value="${escapeHtml(currentDoc.contactCompany || '')}" placeholder="ABC Media" />
            </div>
            <div class="form-group">
              <label class="form-label">Client Email</label>
              <input type="email" class="form-input" id="fieldClientEmail" value="${escapeHtml(currentDoc.contactEmail || '')}" placeholder="rahul@abcmedia.com" />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Issue Date</label>
              <input type="date" class="form-input" id="fieldDate" value="${currentDoc.date || new Date().toISOString().split('T')[0]}" />
            </div>
            <div class="form-group">
              <label class="form-label">Due Date / Valid Until (Optional)</label>
              <input type="date" class="form-input" id="fieldDueDate" value="${currentDoc.dueDate || ''}" />
            </div>
          </div>

          <!-- Document Content Body -->
          <div class="form-group">
            <label class="form-label">Document Content / Terms</label>
            <textarea class="form-textarea" id="fieldContent" rows="8" placeholder="Type your document content here...">${escapeHtml(currentDoc.content || '')}</textarea>
          </div>

          <!-- Line Items Table (For Invoice, Quotation, Proposal, Receipt) -->
          ${isFinancialDoc(currentDoc.type) ? `
            <div class="form-group">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <label class="form-label">Line Items & Pricing</label>
                <button class="btn btn-ghost btn-sm" id="btnAddLineItem">+ Add Item</button>
              </div>
              <table class="line-items-table">
                <thead>
                  <tr>
                    <th>Description</th>
                    <th style="width: 60px;">Qty</th>
                    <th style="width: 100px;">Rate ($)</th>
                    <th style="width: 90px; text-align: right;">Amount</th>
                    <th style="width: 40px;"></th>
                  </tr>
                </thead>
                <tbody id="lineItemsTbody">
                  ${(currentDoc.items && currentDoc.items.length > 0 ? currentDoc.items : [{ description: 'Professional Services', qty: 1, rate: 500, amount: 500 }]).map((item, idx) => `
                    <tr class="line-item-row">
                      <td><input type="text" class="form-input item-desc" value="${escapeHtml(item.description)}" style="padding: 6px 8px;" /></td>
                      <td><input type="number" class="form-input item-qty" value="${item.qty}" style="padding: 6px 8px;" min="1" /></td>
                      <td><input type="number" class="form-input item-rate" value="${item.rate}" style="padding: 6px 8px;" /></td>
                      <td style="text-align: right; font-weight: 600; font-size: 12.5px;" class="item-amount">$${(item.qty * item.rate).toLocaleString()}</td>
                      <td><button class="btn btn-ghost btn-sm btn-delete-item" style="color: #ef4444; padding: 4px;">✕</button></td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          ` : ''}

          <!-- Status & Signature Toggles -->
          <div class="form-row" style="margin-top: 10px;">
            <div class="form-group">
              <label class="form-label">Document Status</label>
              <select class="form-select" id="fieldStatus">
                <option value="Draft" ${currentDoc.status === 'Draft' ? 'selected' : ''}>Draft</option>
                <option value="Sent" ${currentDoc.status === 'Sent' ? 'selected' : ''}>Sent to Client</option>
                <option value="Signed" ${currentDoc.status === 'Signed' ? 'selected' : ''}>Signed</option>
                <option value="Paid" ${currentDoc.status === 'Paid' ? 'selected' : ''}>Paid</option>
                <option value="Completed" ${currentDoc.status === 'Completed' ? 'selected' : ''}>Completed</option>
              </select>
            </div>
            <div class="form-group" style="justify-content: flex-end;">
              <label style="display: flex; align-items: center; gap: 8px; font-size: 13px; cursor: pointer;">
                <input type="checkbox" id="fieldIncludeSignature" ${currentDoc.signatureIncluded ? 'checked' : ''} />
                Include Brand Signature
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Pane: Real-time Live PDF Preview -->
      <div class="preview-pane">
        <div class="preview-toolbar">
          <div style="font-size: 12px; font-weight: 600; color: var(--text-secondary); display: flex; align-items: center; gap: 8px;">
            <i data-lucide="eye" style="width: 15px; height: 15px;"></i> Live Professional Preview
          </div>
          <span class="badge" id="previewDocStatusBadge"><span class="badge-dot"></span>${currentDoc.status}</span>
        </div>

        <div class="preview-scroll">
          <div class="document-paper" id="documentPaper">
            <!-- Brand Header -->
            <div class="doc-header-block">
              <div>
                ${brand.logoUrl ? `<img src="${brand.logoUrl}" style="max-height: 44px; margin-bottom: 8px;" />` : ''}
                <div class="doc-brand-title" id="pBrandName">${escapeHtml(brand.company || brand.name || 'Harsha Creative Studio')}</div>
                <div class="doc-brand-sub" id="pBrandTitle">${escapeHtml(brand.title || 'Freelance Workspace')}</div>
                <div class="doc-brand-sub" id="pBrandContact">${escapeHtml(brand.email)} • ${escapeHtml(brand.phone)}</div>
              </div>
              <div>
                <div class="doc-type-badge" id="pDocType">${escapeHtml(currentDoc.type).toUpperCase()}</div>
                <div class="doc-meta-info" id="pDocNum">${escapeHtml(currentDoc.docNumber || 'DOC-2026-001')}</div>
                <div class="doc-meta-info" id="pDocDate">Date: ${currentDoc.date || ''}</div>
                ${currentDoc.dueDate ? `<div class="doc-meta-info" id="pDocDueDate">Due: ${currentDoc.dueDate}</div>` : ''}
              </div>
            </div>

            <!-- Recipient Information -->
            <div class="doc-recipient-section">
              <div class="doc-address-box">
                <h4>Prepared For</h4>
                <strong id="pClientName" style="font-size: 14px; color: #000;">${escapeHtml(currentDoc.contactName || 'Valued Client')}</strong><br/>
                <span id="pClientCompany">${escapeHtml(currentDoc.contactCompany || '')}</span><br/>
                <span id="pClientEmail">${escapeHtml(currentDoc.contactEmail || '')}</span>
              </div>
              <div class="doc-address-box" style="text-align: right;">
                <h4>Prepared By</h4>
                <strong style="color: #000;">${escapeHtml(brand.name)}</strong><br/>
                <span>${escapeHtml(brand.address ? brand.address.split('\n')[0] : '')}</span><br/>
                <span>${escapeHtml(brand.website || '')}</span>
              </div>
            </div>

            <!-- Content Body -->
            <div class="doc-content-body" id="pDocContent">
              ${formatContentText(currentDoc.content)}
            </div>

            <!-- Financial Table (If Applicable) -->
            ${isFinancialDoc(currentDoc.type) ? renderPreviewTable(currentDoc.items) : ''}

            <!-- Digital Signature & Stamp Block -->
            <div class="doc-signature-block">
              <div>
                ${brand.paymentDetails && isFinancialDoc(currentDoc.type) ? `
                  <div style="font-size: 10px; color: #666; max-width: 280px;">
                    <strong>Payment Details:</strong><br/>
                    ${escapeHtml(brand.paymentDetails).replace(/\n/g, '<br/>')}
                  </div>
                ` : ''}
              </div>

              ${currentDoc.signatureIncluded !== false ? `
                <div style="text-align: right;">
                  ${brand.signatureDataUrl ? `<img src="${brand.signatureDataUrl}" class="signature-img" />` : `<div style="font-family: 'Playfair Display', serif; font-size: 20px; font-style: italic; margin-bottom: 4px;">${escapeHtml(brand.signatureText || brand.name)}</div>`}
                  <div class="signature-line">
                    Authorized Signature<br/>
                    <strong>${escapeHtml(brand.name)}</strong>
                  </div>
                </div>
              ` : ''}
            </div>

            ${currentDoc.digitallySigned ? `
              <div style="margin-top: 24px; padding: 10px 14px; border: 1px dashed #333; background: #fafafa; border-radius: 4px; font-size: 10px; color: #444;">
                <div style="font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 2px;">✓ Digitally Signed & Verified</div>
                <div>Signed By: ${escapeHtml(currentDoc.signedAuditStamp?.signer || brand.name)} | Time: ${currentDoc.signedTimestamp || '2026-08-16 UTC'}</div>
                <div style="font-family: monospace; font-size: 9px; color: #777;">Audit Hash: ${currentDoc.signedAuditStamp?.hash || 'DOTSPACE-VERIFIED-2026'}</div>
              </div>
            ` : ''}

            <!-- Document Footer -->
            <div class="doc-footer">
              <span>dotspace Private Workspace</span>
              <span>Page 1 of 1</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function attachDocumentsEvents(container, showToast, openModal, navigateTo) {
  const state = stateManager.get();
  let activeDoc = state.documents[0] || createNewDraft(state);

  // Tab switcher
  container.querySelectorAll('.doc-type-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.getAttribute('data-type');
      activeDoc.type = type;
      // Provide default text template for selected type if content is short
      activeDoc.content = getDefaultTemplateContent(type, activeDoc.contactName);
      stateManager.saveState();
      navigateTo('documents', { docId: activeDoc.id });
    });
  });

  // New Blank Doc Button
  const btnNew = container.querySelector('#btnNewBlankDoc');
  if (btnNew) {
    btnNew.addEventListener('click', () => {
      if (!stateManager.canCreateDocument()) {
        openModal('upgradeModal');
        showToast('Document limit reached on Free plan.');
        return;
      }
      const newDoc = createNewDraft(state);
      stateManager.update(s => s.documents.unshift(newDoc));
      stateManager.incrementDocCount();
      stateManager.addHistory(`Created new ${newDoc.type}`, newDoc.contactName, 'Documents');
      navigateTo('documents', { docId: newDoc.id });
      showToast('New document created.');
    });
  }

  // Live input sync
  const bindInput = (id, prop, updatePreviewId, transformFn) => {
    const el = container.querySelector(id);
    if (!el) return;
    el.addEventListener('input', (e) => {
      let val = e.target.value;
      activeDoc[prop] = val;
      stateManager.saveState();

      if (updatePreviewId) {
        const prevEl = container.querySelector(updatePreviewId);
        if (prevEl) prevEl.innerHTML = transformFn ? transformFn(val) : escapeHtml(val);
      }
    });
  };

  bindInput('#fieldDocTitle', 'title');
  bindInput('#fieldDocNumber', 'docNumber', '#pDocNum');
  bindInput('#fieldClientName', 'contactName', '#pClientName');
  bindInput('#fieldClientCompany', 'contactCompany', '#pClientCompany');
  bindInput('#fieldClientEmail', 'contactEmail', '#pClientEmail');
  bindInput('#fieldDate', 'date', '#pDocDate', v => `Date: ${v}`);
  bindInput('#fieldDueDate', 'dueDate', '#pDocDueDate', v => v ? `Due: ${v}` : '');
  bindInput('#fieldContent', 'content', '#pDocContent', formatContentText);

  // Contact Dropdown Selector
  const contactSelect = container.querySelector('#fieldContactSelect');
  if (contactSelect) {
    contactSelect.addEventListener('change', (e) => {
      const cntId = e.target.value;
      const cnt = state.contacts.find(c => c.id === cntId);
      if (cnt) {
        activeDoc.contactId = cnt.id;
        activeDoc.contactName = cnt.name;
        activeDoc.contactCompany = cnt.company;
        activeDoc.contactEmail = cnt.email;
        stateManager.saveState();
        navigateTo('documents', { docId: activeDoc.id });
      }
    });
  }

  // Status Selector
  const statusSelect = container.querySelector('#fieldStatus');
  if (statusSelect) {
    statusSelect.addEventListener('change', (e) => {
      activeDoc.status = e.target.value;
      stateManager.saveState();
      const badge = container.querySelector('#previewDocStatusBadge');
      if (badge) badge.innerHTML = `<span class="badge-dot"></span>${activeDoc.status}`;
    });
  }

  // Include Signature Checkbox
  const sigCheck = container.querySelector('#fieldIncludeSignature');
  if (sigCheck) {
    sigCheck.addEventListener('change', (e) => {
      activeDoc.signatureIncluded = e.target.checked;
      stateManager.saveState();
      navigateTo('documents', { docId: activeDoc.id });
    });
  }

  // Line items dynamic table calculations
  const tbody = container.querySelector('#lineItemsTbody');
  if (tbody) {
    const updateItemsFromDOM = () => {
      const items = [];
      tbody.querySelectorAll('.line-item-row').forEach(row => {
        const desc = row.querySelector('.item-desc').value;
        const qty = parseFloat(row.querySelector('.item-qty').value) || 0;
        const rate = parseFloat(row.querySelector('.item-rate').value) || 0;
        const amount = qty * rate;
        row.querySelector('.item-amount').textContent = `$${amount.toLocaleString()}`;
        items.push({ description: desc, qty, rate, amount });
      });
      activeDoc.items = items;
      stateManager.saveState();

      // Refresh preview financial block
      const prevTable = container.querySelector('#previewFinancialTable');
      if (prevTable) {
        prevTable.outerHTML = renderPreviewTable(items);
      }
    };

    tbody.addEventListener('input', updateItemsFromDOM);

    // Delete row
    tbody.querySelectorAll('.btn-delete-item').forEach((btn, idx) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (tbody.querySelectorAll('.line-item-row').length > 1) {
          btn.closest('.line-item-row').remove();
          updateItemsFromDOM();
        }
      });
    });

    // Add row button
    const btnAddItem = container.querySelector('#btnAddLineItem');
    if (btnAddItem) {
      btnAddItem.addEventListener('click', (e) => {
        e.preventDefault();
        const tr = document.createElement('tr');
        tr.className = 'line-item-row';
        tr.innerHTML = `
          <td><input type="text" class="form-input item-desc" value="New Service" style="padding: 6px 8px;" /></td>
          <td><input type="number" class="form-input item-qty" value="1" style="padding: 6px 8px;" min="1" /></td>
          <td><input type="number" class="form-input item-rate" value="250" style="padding: 6px 8px;" /></td>
          <td style="text-align: right; font-weight: 600; font-size: 12.5px;" class="item-amount">$250</td>
          <td><button class="btn btn-ghost btn-sm btn-delete-item" style="color: #ef4444; padding: 4px;">✕</button></td>
        `;
        tbody.appendChild(tr);
        updateItemsFromDOM();
      });
    }
  }

  // Writing Assistance ("Assist") Modal
  const btnAssist = container.querySelector('#btnAiAssist');
  if (btnAssist) {
    btnAssist.addEventListener('click', () => {
      openModal('aiAssistModal', {
        currentText: activeDoc.content,
        onApply: (newText) => {
          activeDoc.content = newText;
          stateManager.saveState();
          navigateTo('documents', { docId: activeDoc.id });
          showToast('Text updated via Assist.');
        }
      });
    });
  }

  // Digital Signature Action
  const btnSign = container.querySelector('#btnSignDocument');
  if (btnSign) {
    btnSign.addEventListener('click', () => {
      const stamp = generateDigitalAuditStamp(state.brandProfile.name);
      activeDoc.digitallySigned = true;
      activeDoc.signedTimestamp = stamp.timestamp;
      activeDoc.signedAuditStamp = stamp;
      activeDoc.status = 'Signed';
      stateManager.saveState();
      stateManager.addHistory(`Digitally signed ${activeDoc.title}`, activeDoc.contactName, 'Agreements');
      navigateTo('documents', { docId: activeDoc.id });
      showToast('Document digitally signed & verified.');
    });
  }

  // Download PDF Button
  const btnPdf = container.querySelector('#btnDownloadPDF');
  if (btnPdf) {
    btnPdf.addEventListener('click', async () => {
      btnPdf.disabled = true;
      btnPdf.innerHTML = `<i data-lucide="loader" style="animation: spin 1s linear infinite;"></i> Generating PDF...`;
      showToast('Generating high-resolution document PDF...');
      
      const safeFilename = `${activeDoc.title.replace(/[^a-z0-9]/gi, '_')}.pdf`;
      await exportDocumentToPDF('documentPaper', safeFilename);
      
      btnPdf.disabled = false;
      btnPdf.innerHTML = `<i data-lucide="download"></i> Download PDF`;
      showToast('PDF Downloaded successfully!');
    });
  }
}

function createNewDraft(state) {
  const count = state.documents.length + 1;
  const numStr = String(count).padStart(3, '0');
  return {
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
    content: getDefaultTemplateContent('Welcome Note', 'Valued Client'),
    items: [],
    signatureIncluded: true
  };
}

function isFinancialDoc(type) {
  return ['Invoice', 'Quotation', 'Proposal', 'Receipt'].includes(type);
}

function getDefaultTemplateContent(type, clientName) {
  const cName = clientName || 'Valued Client';
  switch (type) {
    case 'Welcome Note':
      return `Welcome ${cName},\n\nWe are excited to work with you on your upcoming project. Our goal is to ensure a smooth, professional, and transparent experience from day one.\n\nPlease review the attached orientation details and feel free to reach out with any questions.`;
    case 'Proposal':
      return `PROJECT PROPOSAL FOR ${cName.toUpperCase()}\n\n1. OBJECTIVE & SCOPE\nDeliver a high-impact, professional media and engineering solution tailored to your target deliverables.\n\n2. TIMELINE & MILESTONES\n- Phase 1: Discovery & Strategy (Week 1)\n- Phase 2: Execution & Production (Week 2-3)\n- Phase 3: Final Delivery (Week 4)`;
    case 'Quotation':
      return `ESTIMATE & QUOTATION\n\nBelow is the broken-down fee structure for your requested scope. This quotation remains valid for 30 days from the date of issue.`;
    case 'Invoice':
      return `Thank you for your business! Please find the detailed itemized invoice for professional services rendered below.\n\nPayment terms: Net 15 days.`;
    case 'Agreement':
      return `MASTER SERVICES AGREEMENT\n\nThis Agreement is entered into by and between the Service Provider and ${cName}.\n\n1. SCOPE OF SERVICES: Provider agrees to perform deliverables in accordance with agreed specifications.\n2. PAYMENT: Client agrees to pay invoices within 15 days of issue date.\n3. CONFIDENTIALITY: Both parties agree to protect proprietary knowledge.`;
    case 'Contract':
      return `INDEPENDENT CONTRACTOR AGREEMENT\n\n1. ENGAGEMENT: Client engages Contractor to render creative and technical services.\n2. OWNERSHIP: Work product transfers to Client upon complete payment satisfaction.`;
    case 'Receipt':
      return `OFFICIAL PAYMENT RECEIPT\n\nThis document confirms full receipt of payment for invoice services rendered. Account balance is fully settled.`;
    case 'Project Delivery Note':
      return `PROJECT DELIVERY NOTE\n\nAll final assets, 4K masters, and project files have been delivered and uploaded to your workspace repository. Please verify signoff.`;
    case 'Thank You Note':
      return `Dear ${cName},\n\nThank you for working with us! It has been an absolute pleasure collaborating on this project. We look forward to working together again soon.`;
    default:
      return `Type custom document notes and terms here...`;
  }
}

function formatContentText(text) {
  if (!text) return '';
  return escapeHtml(text).replace(/\n/g, '<br/>');
}

function renderPreviewTable(items) {
  if (!items || items.length === 0) return '';
  const total = items.reduce((sum, i) => sum + (i.qty * i.rate), 0);
  return `
    <div id="previewFinancialTable">
      <table class="doc-table">
        <thead>
          <tr>
            <th>Description</th>
            <th style="width: 50px; text-align: center;">Qty</th>
            <th style="width: 90px; text-align: right;">Rate</th>
            <th style="width: 90px; text-align: right;">Amount</th>
          </tr>
        </thead>
        <tbody>
          ${items.map(item => `
            <tr>
              <td>${escapeHtml(item.description)}</td>
              <td style="text-align: center;">${item.qty}</td>
              <td style="text-align: right;">$${item.rate.toLocaleString()}</td>
              <td style="text-align: right; font-weight: 600;">$${(item.qty * item.rate).toLocaleString()}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <div class="doc-totals">
        <div class="doc-totals-row">
          <span>Subtotal:</span>
          <span>$${total.toLocaleString()}</span>
        </div>
        <div class="doc-totals-row">
          <span>Tax (0%):</span>
          <span>$0.00</span>
        </div>
        <div class="doc-totals-row final">
          <span>Total Amount Due:</span>
          <span>$${total.toLocaleString()}</span>
        </div>
      </div>
    </div>
  `;
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
