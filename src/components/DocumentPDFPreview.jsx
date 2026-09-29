import React, { useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Download, Printer } from 'lucide-react';
import html2pdf from 'html2pdf.js';

export const DocumentPDFPreview = ({ documentData }) => {
  const { profile, contacts, projects } = useApp();
  const printRef = useRef(null);

  if (!documentData) return null;

  // Resolve client & project info
  const client = contacts.find(c => c.id === documentData.contactId) || {
    name: "Client Name",
    company: "Client Company",
    email: "client@example.com",
    address: ""
  };

  const project = projects.find(p => p.id === documentData.projectId) || {
    name: "General Video Project",
    service: "Video Editing"
  };

  const handleDownloadPDF = () => {
    const element = printRef.current;
    if (!element) return;

    const opt = {
      margin: 10,
      filename: `${documentData.docNumber || 'Document'}_${documentData.type}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, logging: false },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      {/* Action Toolbar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1rem',
        padding: '0.75rem 1rem',
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-sm)'
      }} className="no-print">
        <div style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-secondary)' }}>
          A4 DOCUMENT PREVIEW
        </div>
        <div style={{ display: 'flex', gap: '0.625rem' }}>
          <button onClick={handlePrint} className="btn-secondary" style={{ fontSize: '0.775rem' }}>
            <Printer size={14} /> Print
          </button>
          <button onClick={handleDownloadPDF} className="btn-primary" style={{ fontSize: '0.775rem' }}>
            <Download size={14} /> DOWNLOAD PDF
          </button>
        </div>
      </div>

      {/* A4 Printable Document Container */}
      <div ref={printRef} className="a4-document-container">
        {/* Document Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '30px', borderBottom: '2px solid #111827', paddingBottom: '20px' }}>
          <div>
            {profile.logoUrl ? (
              <img src={profile.logoUrl} alt="Logo" style={{ maxHeight: '50px', marginBottom: '10px', objectFit: 'contain' }} />
            ) : (
              <div style={{ fontSize: '24px', fontWeight: '800', letterSpacing: '-0.02em', color: '#111827' }}>
                {profile.businessName || profile.fullName || 'FLOV STUDIO'}
              </div>
            )}
            <div style={{ fontSize: '12px', color: '#4B5563', marginTop: '4px' }}>{profile.title || 'Freelance Video Editor'}</div>
            <div style={{ fontSize: '11px', color: '#6B7280', marginTop: '2px' }}>
              {profile.email} {profile.phone ? `• ${profile.phone}` : ''} {profile.website ? `• ${profile.website}` : ''}
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '20px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#111827' }}>
              {documentData.type}
            </div>
            {documentData.docNumber && (
              <div style={{ fontSize: '13px', fontWeight: '600', color: '#374151', marginTop: '4px' }}>
                #{documentData.docNumber}
              </div>
            )}
            <div style={{ fontSize: '11px', color: '#6B7280', marginTop: '4px' }}>
              Date: <strong>{documentData.date}</strong>
            </div>
            {documentData.dueDate && (
              <div style={{ fontSize: '11px', color: '#DC2626', marginTop: '2px' }}>
                Due Date: <strong>{documentData.dueDate}</strong>
              </div>
            )}
          </div>
        </div>

        {/* Client & Project Info Block */}
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px', marginBottom: '30px', backgroundColor: '#F9FAFB', padding: '15px', borderRadius: '6px', border: '1px solid #E5E7EB' }}>
          <div style={{ width: '48%' }}>
            <div style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#6B7280', marginBottom: '6px' }}>
              PREPARED FOR (CLIENT)
            </div>
            <div style={{ fontSize: '14px', fontWeight: '700', color: '#111827' }}>{client.name}</div>
            <div style={{ fontSize: '12px', color: '#374151' }}>{client.company}</div>
            <div style={{ fontSize: '11px', color: '#6B7280', marginTop: '2px' }}>{client.email}</div>
          </div>

          <div style={{ width: '48%' }}>
            <div style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#6B7280', marginBottom: '6px' }}>
              PROJECT DETAILS
            </div>
            <div style={{ fontSize: '14px', fontWeight: '700', color: '#111827' }}>{project.name}</div>
            <div style={{ fontSize: '12px', color: '#374151' }}>Service: {project.service}</div>
          </div>
        </div>

        {/* Dynamic Document Specific Content */}

        {/* 1. INVOICE & QUOTATION LAYOUT */}
        {(documentData.type === 'Invoice' || documentData.type === 'Quotation') && (
          <div>
            <table style={{ marginBottom: '25px' }}>
              <thead>
                <tr>
                  <th style={{ width: '50%' }}>Description</th>
                  <th style={{ width: '15%', textAlign: 'center' }}>Qty</th>
                  <th style={{ width: '15%', textAlign: 'right' }}>Rate ({project.currency || '₹'})</th>
                  <th style={{ width: '20%', textAlign: 'right' }}>Amount ({project.currency || '₹'})</th>
                </tr>
              </thead>
              <tbody>
                {(documentData.items || []).map((item, idx) => (
                  <tr key={idx}>
                    <td style={{ fontWeight: '500' }}>{item.description}</td>
                    <td style={{ textAlign: 'center' }}>{item.quantity}</td>
                    <td style={{ textAlign: 'right' }}>{Number(item.rate).toLocaleString()}</td>
                    <td style={{ textAlign: 'right', fontWeight: '600' }}>{Number(item.amount).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Totals */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '30px' }}>
              <div style={{ width: '240px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #E5E7EB', fontSize: '12px' }}>
                  <span>Subtotal:</span>
                  <span>{project.currency || '₹'}{Number(documentData.subtotal || 0).toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '2px solid #111827', fontSize: '15px', fontWeight: '800' }}>
                  <span>Total Amount:</span>
                  <span>{project.currency || '₹'}{Number(documentData.total || 0).toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Payment Info Box */}
            {profile.paymentInfo && (
              <div style={{ backgroundColor: '#F3F4F6', padding: '15px', borderRadius: '6px', marginBottom: '25px', border: '1px dashed #CBD5E1' }}>
                <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#111827', marginBottom: '6px' }}>
                  PAYMENT INSTRUCTIONS
                </div>
                <div style={{ display: 'flex', gap: '30px', fontSize: '12px' }}>
                  {profile.paymentInfo.upiId && <div>UPI ID: <strong>{profile.paymentInfo.upiId}</strong></div>}
                  {profile.paymentInfo.bankName && <div>Bank: <strong>{profile.paymentInfo.bankName}</strong></div>}
                  {profile.paymentInfo.accountNumber && <div>A/C: <strong>{profile.paymentInfo.accountNumber}</strong></div>}
                  {profile.paymentInfo.ifscCode && <div>IFSC: <strong>{profile.paymentInfo.ifscCode}</strong></div>}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 2. WELCOME NOTE */}
        {documentData.type === 'Welcome Note' && (
          <div style={{ marginBottom: '30px', fontSize: '13px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '12px', color: '#111827' }}>Welcome to the Project!</h3>
            <p style={{ marginBottom: '12px' }}>Dear {client.name},</p>
            <p style={{ marginBottom: '16px' }}>
              Thank you for trusting me with <strong>{project.name}</strong>. I'm excited to collaborate with you to deliver world-class video content.
            </p>
            <div style={{ backgroundColor: '#F9FAFB', padding: '15px', borderRadius: '6px', borderLeft: '4px solid #111827', marginBottom: '20px' }}>
              <div style={{ fontWeight: '700', marginBottom: '6px' }}>NEXT STEPS & WORKFLOW:</div>
              <ul style={{ paddingLeft: '20px' }}>
                <li>Raw footage upload to shared Drive folder.</li>
                <li>First rough cut review within promised timeline.</li>
                <li>Revision rounds & final delivery exports.</li>
              </ul>
            </div>
          </div>
        )}

        {/* 3. PROPOSAL */}
        {documentData.type === 'Proposal' && (
          <div style={{ marginBottom: '30px', fontSize: '13px' }}>
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ fontSize: '13px', fontWeight: '700', color: '#111827', borderBottom: '1px solid #E5E7EB', paddingBottom: '4px', marginBottom: '8px' }}>1. PROJECT REQUIREMENT & OBJECTIVE</h4>
              <p>{documentData.problemStatement || 'Delivering high-performance video editing tailored to brand goals.'}</p>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ fontSize: '13px', fontWeight: '700', color: '#111827', borderBottom: '1px solid #E5E7EB', paddingBottom: '4px', marginBottom: '8px' }}>2. PROPOSED SCOPE & DELIVERABLES</h4>
              <p>{documentData.proposedScope || 'Full post-production video editing.'}</p>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ fontSize: '13px', fontWeight: '700', color: '#111827', borderBottom: '1px solid #E5E7EB', paddingBottom: '4px', marginBottom: '8px' }}>3. TIMELINE & ESTIMATED INVESTMENT</h4>
              <p style={{ marginBottom: '8px' }}>Timeline: <strong>{documentData.timeline || '2 weeks'}</strong></p>
              <p style={{ fontSize: '16px', fontWeight: '800', color: '#111827' }}>Total Investment: {project.currency || '₹'}{Number(documentData.total || 0).toLocaleString()}</p>
            </div>
          </div>
        )}

        {/* 4. AGREEMENT */}
        {documentData.type === 'Agreement' && (
          <div style={{ marginBottom: '30px', fontSize: '12px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '12px' }}>VIDEO EDITING SERVICES AGREEMENT</h3>
            <p style={{ marginBottom: '12px' }}>
              This agreement is made between <strong>{profile.fullName || profile.businessName}</strong> ("Editor") and <strong>{client.name} / {client.company}</strong> ("Client") for the project <strong>{project.name}</strong>.
            </p>
            
            <div style={{ marginBottom: '12px' }}>
              <strong>SCOPE OF WORK:</strong> {documentData.proposedScope || 'Video editing as agreed.'}
            </div>
            
            <div style={{ marginBottom: '12px' }}>
              <strong>TERMS & COPYRIGHT:</strong> {documentData.termsAndConditions || 'Full rights transferred upon payment.'}
            </div>
          </div>
        )}

        {/* 5. PROJECT DELIVERY NOTE */}
        {documentData.type === 'Project Delivery Note' && (
          <div style={{ marginBottom: '30px', fontSize: '13px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '12px' }}>FINAL DELIVERABLES SHEET</h3>
            <p style={{ marginBottom: '15px' }}>The following deliverables for <strong>{project.name}</strong> have been completed and delivered:</p>
            <ul style={{ paddingLeft: '20px', marginBottom: '20px' }}>
              {(documentData.deliveredItems || ['Completed Video Exports']).map((item, idx) => (
                <li key={idx} style={{ marginBottom: '6px', fontWeight: '600' }}>✓ {item}</li>
              ))}
            </ul>
          </div>
        )}

        {/* 6. PAYMENT RECEIPT */}
        {documentData.type === 'Payment Receipt' && (
          <div style={{ marginBottom: '30px', fontSize: '13px' }}>
            <div style={{ backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0', padding: '15px', borderRadius: '6px', marginBottom: '20px' }}>
              <div style={{ fontSize: '11px', color: '#166534', fontWeight: '700', uppercase: 'true' }}>PAYMENT RECEIVED ACKNOWLEDGMENT</div>
              <div style={{ fontSize: '20px', fontWeight: '800', color: '#15803D', marginTop: '4px' }}>
                {project.currency || '₹'}{Number(documentData.amountReceived || documentData.total || 0).toLocaleString()}
              </div>
            </div>
            <p>Received with thanks from <strong>{client.name} ({client.company})</strong> for <strong>{project.name}</strong>.</p>
          </div>
        )}

        {/* 7. THANK YOU NOTE */}
        {documentData.type === 'Thank You Note' && (
          <div style={{ marginBottom: '30px', fontSize: '13px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '10px' }}>Thank You for Working Together!</h3>
            <p style={{ marginBottom: '12px' }}>Dear {client.name},</p>
            <p style={{ marginBottom: '16px' }}>
              It has been a pleasure editing <strong>{project.name}</strong> for you. I hope the videos perform amazingly for your audience!
            </p>
            <p>If you need any future edits or clips, feel free to reach out anytime.</p>
          </div>
        )}

        {/* Custom Notes Section */}
        {documentData.customNotes && (
          <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: '15px', marginBottom: '30px' }}>
            <div style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#6B7280', marginBottom: '4px' }}>
              NOTES & REMARKS
            </div>
            <div style={{ fontSize: '12px', color: '#374151' }}>{documentData.customNotes}</div>
          </div>
        )}

        {/* Document Footer & Signature */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '40px', borderTop: '1px solid #E5E7EB', paddingTop: '20px' }}>
          <div>
            <div style={{ fontSize: '11px', fontWeight: '700', color: '#111827' }}>{profile.businessName || profile.fullName}</div>
            <div style={{ fontSize: '10px', color: '#6B7280' }}>FLOV Certified Freelance Video Editor</div>
          </div>

          <div style={{ textAlign: 'right' }}>
            {profile.signatureUrl ? (
              <img src={profile.signatureUrl} alt="Signature" style={{ maxHeight: '45px', marginBottom: '5px', objectFit: 'contain' }} />
            ) : (
              <div style={{ fontFamily: 'cursive', fontSize: '18px', fontWeight: 'bold', height: '40px' }}>
                {profile.fullName}
              </div>
            )}
            <div style={{ fontSize: '10px', fontWeight: '700', borderTop: '1px solid #111827', paddingTop: '3px', width: '160px', marginLeft: 'auto' }}>
              AUTHORIZED SIGNATURE
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
