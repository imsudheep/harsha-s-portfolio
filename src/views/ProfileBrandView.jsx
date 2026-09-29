import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SignatureCanvas } from '../components/SignatureCanvas';
import { 
  UserCheck, 
  Save, 
  RotateCcw, 
  CreditCard, 
  Building, 
  Image,
  Check
} from 'lucide-react';

export const ProfileBrandView = () => {
  const { profile, updateProfile, resetToSampleData } = useApp();

  const [fullName, setFullName] = useState(profile.fullName || '');
  const [businessName, setBusinessName] = useState(profile.businessName || '');
  const [title, setTitle] = useState(profile.title || '');
  const [email, setEmail] = useState(profile.email || '');
  const [phone, setPhone] = useState(profile.phone || '');
  const [website, setWebsite] = useState(profile.website || '');
  const [address, setAddress] = useState(profile.address || '');
  const [logoUrl, setLogoUrl] = useState(profile.logoUrl || '');
  const [signatureUrl, setSignatureUrl] = useState(profile.signatureUrl || '');

  // Payment info
  const [upiId, setUpiId] = useState(profile.paymentInfo?.upiId || '');
  const [bankName, setBankName] = useState(profile.paymentInfo?.bankName || '');
  const [accountNumber, setAccountNumber] = useState(profile.paymentInfo?.accountNumber || '');
  const [ifscCode, setIfscCode] = useState(profile.paymentInfo?.ifscCode || '');
  const [instructions, setInstructions] = useState(profile.paymentInfo?.instructions || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile({
      fullName,
      businessName,
      title,
      email,
      phone,
      website,
      address,
      logoUrl,
      signatureUrl,
      paymentInfo: {
        upiId,
        bankName,
        accountNumber,
        ifscCode,
        instructions
      }
    });
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        setLogoUrl(evt.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', paddingBottom: '3rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: '800', fontFamily: 'var(--font-display)' }}>
            PROFILE / BRAND SETTINGS
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            Set your information once. FLOV automatically populates all documents.
          </p>
        </div>

        <button onClick={resetToSampleData} className="btn-secondary" style={{ fontSize: '0.775rem' }}>
          <RotateCcw size={14} /> Reset Sample Data
        </button>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* 1. Basic Info Card */}
        <div className="card">
          <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <UserCheck size={18} /> Editor & Business Information
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>FULL NAME</label>
              <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Harsha" required />
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>BUSINESS / STUDIO NAME</label>
              <input type="text" value={businessName} onChange={e => setBusinessName(e.target.value)} placeholder="Harsha Studio" />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>PROFESSIONAL TITLE</label>
              <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Freelance Video Editor" />
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>EMAIL ADDRESS</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="harsha@example.com" />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>PHONE / WHATSAPP</label>
              <input type="text" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+91 98765 43210" />
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>WEBSITE</label>
              <input type="text" value={website} onChange={e => setWebsite(e.target.value)} placeholder="harshastudio.com" />
            </div>
          </div>
        </div>

        {/* 2. Brand Logo Upload */}
        <div className="card">
          <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Image size={18} /> Brand Logo
          </h3>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            {logoUrl ? (
              <div style={{ backgroundColor: '#FFFFFF', padding: '0.5rem', borderRadius: 'var(--radius-sm)' }}>
                <img src={logoUrl} alt="Brand Logo" style={{ maxHeight: '60px', objectFit: 'contain' }} />
              </div>
            ) : (
              <div style={{
                width: '80px',
                height: '60px',
                border: '1px dashed var(--border-medium)',
                borderRadius: 'var(--radius-sm)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.7rem',
                color: 'var(--text-muted)'
              }}>
                No Logo
              </div>
            )}

            <div>
              <input type="file" accept="image/*" onChange={handleLogoUpload} style={{ fontSize: '0.8rem' }} />
              <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.375rem' }}>
                Recommended PNG/JPEG logo for invoice header.
              </p>
            </div>
          </div>
        </div>

        {/* 3. Payment Information Card */}
        <div className="card">
          <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CreditCard size={18} /> Payment Information (UPI & Bank Details)
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>UPI ID</label>
              <input type="text" value={upiId} onChange={e => setUpiId(e.target.value)} placeholder="harsha@okicici" />
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>BANK NAME</label>
              <input type="text" value={bankName} onChange={e => setBankName(e.target.value)} placeholder="HDFC Bank" />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>ACCOUNT NUMBER</label>
              <input type="text" value={accountNumber} onChange={e => setAccountNumber(e.target.value)} placeholder="50100234567890" />
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>IFSC / ROUTING CODE</label>
              <input type="text" value={ifscCode} onChange={e => setIfscCode(e.target.value)} placeholder="HDFC0001234" />
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>PAYMENT INSTRUCTIONS</label>
            <input type="text" value={instructions} onChange={e => setInstructions(e.target.value)} placeholder="Please send payment screenshot on WhatsApp after transfer." />
          </div>
        </div>

        {/* 4. Interactive Digital Signature */}
        <SignatureCanvas value={signatureUrl} onChange={setSignatureUrl} />

        {/* Submit Save Button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button type="submit" className="btn-primary" style={{ padding: '0.75rem 1.5rem' }}>
            <Save size={16} /> Save Profile & Brand Settings
          </button>
        </div>
      </form>
    </div>
  );
};
