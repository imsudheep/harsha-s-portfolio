import React, { useRef, useState, useEffect } from 'react';
import { Edit2, RotateCcw, Upload, Check } from 'lucide-react';

export const SignatureCanvas = ({ value, onChange }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [mode, setMode] = useState('draw'); // 'draw' or 'upload'

  useEffect(() => {
    if (mode === 'draw' && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.strokeStyle = '#111827';
      ctx.lineWidth = 2.5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    }
  }, [mode]);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
    const y = (e.clientY || e.touches?.[0]?.clientY) - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
    setHasDrawn(true);
  };

  const draw = (e) => {
    if (!isDrawing || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
    const y = (e.clientY || e.touches?.[0]?.clientY) - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (isDrawing && canvasRef.current) {
      setIsDrawing(false);
      const dataUrl = canvasRef.current.toDataURL('image/png');
      onChange(dataUrl);
    }
  };

  const clearCanvas = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      setHasDrawn(false);
      onChange('');
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onChange(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-sm)',
      padding: '1rem',
      backgroundColor: 'var(--bg-card)'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '0.75rem'
      }}>
        <div style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-secondary)' }}>
          DIGITAL SIGNATURE
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            type="button"
            onClick={() => setMode('draw')}
            className={mode === 'draw' ? 'btn-primary' : 'btn-ghost'}
            style={{ fontSize: '0.725rem', padding: '0.25rem 0.5rem' }}
          >
            <Edit2 size={12} /> Draw
          </button>
          <button
            type="button"
            onClick={() => setMode('upload')}
            className={mode === 'upload' ? 'btn-primary' : 'btn-ghost'}
            style={{ fontSize: '0.725rem', padding: '0.25rem 0.5rem' }}
          >
            <Upload size={12} /> Upload
          </button>
        </div>
      </div>

      {mode === 'draw' && (
        <div>
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-sm)',
            border: '1px dashed #D1D5DB',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative'
          }}>
            <canvas
              ref={canvasRef}
              width={380}
              height={120}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              style={{ cursor: 'crosshair', touchAction: 'none' }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              Sign inside the box using mouse or touch screen.
            </span>
            <button
              type="button"
              onClick={clearCanvas}
              className="btn-ghost"
              style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}
            >
              <RotateCcw size={12} /> Clear
            </button>
          </div>
        </div>
      )}

      {mode === 'upload' && (
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ fontSize: '0.8rem' }}
          />
          <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.375rem' }}>
            Upload a transparent PNG signature image.
          </p>
        </div>
      )}

      {/* Signature Preview */}
      {value && (
        <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)' }}>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
            CURRENT SAVED SIGNATURE:
          </div>
          <div style={{
            backgroundColor: '#FFFFFF',
            padding: '0.5rem',
            borderRadius: '4px',
            display: 'inline-block'
          }}>
            <img src={value} alt="Signature Preview" style={{ maxHeight: '45px', objectFit: 'contain' }} />
          </div>
        </div>
      )}
    </div>
  );
};
