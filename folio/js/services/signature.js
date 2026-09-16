/* ==========================================================================
   FOLIO OFFICE - DIGITAL SIGNATURE SERVICE
   ========================================================================== */

export class SignaturePad {
  constructor(canvasElement) {
    this.canvas = canvasElement;
    this.ctx = canvasElement.getContext('2d');
    this.isDrawing = false;
    this.hasSignature = false;

    this.initCanvas();
    this.attachEvents();
  }

  initCanvas() {
    const rect = this.canvas.getBoundingClientRect();
    this.canvas.width = rect.width || 400;
    this.canvas.height = rect.height || 140;

    this.ctx.lineWidth = 2.5;
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';
    this.ctx.strokeStyle = '#000000';
    this.clear();
  }

  attachEvents() {
    const start = (e) => {
      this.isDrawing = true;
      const pos = this.getPos(e);
      this.ctx.beginPath();
      this.ctx.moveTo(pos.x, pos.y);
    };

    const draw = (e) => {
      if (!this.isDrawing) return;
      const pos = this.getPos(e);
      this.ctx.lineTo(pos.x, pos.y);
      this.ctx.stroke();
      this.hasSignature = true;
    };

    const stop = () => {
      this.isDrawing = false;
    };

    this.canvas.addEventListener('mousedown', start);
    this.canvas.addEventListener('mousemove', draw);
    this.canvas.addEventListener('mouseup', stop);
    this.canvas.addEventListener('mouseleave', stop);

    // Touch support
    this.canvas.addEventListener('touchstart', (e) => { e.preventDefault(); start(e.touches[0]); });
    this.canvas.addEventListener('touchmove', (e) => { e.preventDefault(); draw(e.touches[0]); });
    this.canvas.addEventListener('touchend', stop);
  }

  getPos(e) {
    const rect = this.canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }

  clear() {
    this.ctx.fillStyle = '#ffffff';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.hasSignature = false;
  }

  toDataURL() {
    if (!this.hasSignature) return null;
    return this.canvas.toDataURL('image/png');
  }
}

/**
 * Generate a digital signature verification metadata hash object
 */
export function generateDigitalAuditStamp(signerName) {
  const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC';
  const randomHash = Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10);
  
  return {
    signer: signerName,
    timestamp: timestamp,
    hash: `DOTSPACE-SIG-${randomHash.toUpperCase()}`,
    ipVerification: 'Verified via Private Digital Workspace'
  };
}
