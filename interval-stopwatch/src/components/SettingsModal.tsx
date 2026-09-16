import React, { useState } from 'react';
import { X, Check, RefreshCw, Activity } from 'lucide-react';
import { AppSettings, SoundType } from '../types/timer';
import { audioService } from '../services/audioService';
import { wakeLockService } from '../services/wakeLockService';

interface SettingsModalProps {
  isOpen: boolean;
  settings: AppSettings;
  onClose: () => void;
  onUpdateSettings: (newSettings: AppSettings) => void;
}

const PALETTES = [
  { name: 'Gold (#E8E942)', bg: '#080a06', glow: '#E8E942', text: '#fef08a' },
  { name: 'Sage', bg: '#070f08', glow: '#4ade80', text: '#f0fdf4' },
  { name: 'Cyan', bg: '#04131a', glow: '#2dd4bf', text: '#f0fdfa' },
  { name: 'Purple', bg: '#0b0717', glow: '#a855f7', text: '#faf5ff' },
  { name: 'Rose', bg: '#16080f', glow: '#f43f5e', text: '#fff1f2' },
];

const SOUND_TONES: { id: SoundType; label: string }[] = [
  { id: 'double_beep', label: '2 Beeps' },
  { id: 'beep', label: '1 Beep' },
  { id: 'chime', label: 'Chime' },
  { id: 'ping', label: 'Ping' },
];

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  settings,
  onClose,
  onUpdateSettings,
}) => {
  const [showColorWheel, setShowColorWheel] = useState(false);

  if (!isOpen) return null;

  const handleToggle = (key: keyof AppSettings) => {
    const updated = { ...settings, [key]: !settings[key] };
    onUpdateSettings(updated);

    if (key === 'keepScreenAwake') {
      wakeLockService.requestWakeLock(updated.keepScreenAwake);
    }
  };

  const handleSoundChange = (sound: SoundType) => {
    const updated = { ...settings, alertSound: sound };
    onUpdateSettings(updated);
    audioService.playSound(sound, true);
  };

  const handleApplyPalette = (bg: string, glow: string, text: string) => {
    onUpdateSettings({
      ...settings,
      theme: 'custom',
      customBgColor: bg,
      customGlowColor: glow,
      customTextColor: text,
    });
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="settings-minimal-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="settings-header-minimal">
          <h2 className="font-sans font-bold text-lg">Settings</h2>
          <button className="icon-close-btn" onClick={onClose} aria-label="Close">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="settings-body-minimal">
          {/* THEMES - INDIVIDUAL BUTTONS */}
          <div className="setting-group-minimal">
            <label className="setting-label-minimal">Theme</label>
            <div className="button-group-row">
              {PALETTES.map((p) => {
                const isSelected = settings.customGlowColor === p.glow;
                return (
                  <button
                    key={p.name}
                    type="button"
                    className={`setting-pill-btn ${isSelected ? 'active' : ''}`}
                    onClick={() => handleApplyPalette(p.bg, p.glow, p.text)}
                  >
                    <span className="color-dot" style={{ backgroundColor: p.glow }}></span>
                    <span>{p.name}</span>
                  </button>
                );
              })}

              <button
                type="button"
                className={`setting-pill-btn ${showColorWheel ? 'active' : ''}`}
                onClick={() => setShowColorWheel(!showColorWheel)}
              >
                Color Wheel
              </button>
            </div>

            {/* Custom Color Pickers */}
            {showColorWheel && (
              <div className="color-picker-row mt-2">
                <div className="color-picker-item">
                  <label>Background</label>
                  <input
                    type="color"
                    value={settings.customBgColor}
                    onChange={(e) =>
                      onUpdateSettings({
                        ...settings,
                        theme: 'custom',
                        customBgColor: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="color-picker-item">
                  <label>Glow</label>
                  <input
                    type="color"
                    value={settings.customGlowColor}
                    onChange={(e) =>
                      onUpdateSettings({
                        ...settings,
                        theme: 'custom',
                        customGlowColor: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="color-picker-item">
                  <label>Text</label>
                  <input
                    type="color"
                    value={settings.customTextColor}
                    onChange={(e) =>
                      onUpdateSettings({
                        ...settings,
                        theme: 'custom',
                        customTextColor: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            )}
          </div>

          {/* SOUND ALERTS - INDIVIDUAL BUTTONS */}
          <div className="setting-group-minimal">
            <label className="setting-label-minimal">Sound</label>
            <div className="button-group-row">
              <button
                type="button"
                className={`setting-pill-btn ${settings.soundEnabled ? 'active' : ''}`}
                onClick={() => handleToggle('soundEnabled')}
              >
                Sound {settings.soundEnabled ? 'ON' : 'OFF'}
              </button>

              {settings.soundEnabled &&
                SOUND_TONES.map((sound) => {
                  const isSelected = settings.alertSound === sound.id;
                  return (
                    <button
                      key={sound.id}
                      type="button"
                      className={`setting-pill-btn ${isSelected ? 'active' : ''}`}
                      onClick={() => handleSoundChange(sound.id)}
                    >
                      {sound.label}
                    </button>
                  );
                })}
            </div>
          </div>

          {/* VIBRATION - INDIVIDUAL BUTTONS */}
          <div className="setting-group-minimal">
            <label className="setting-label-minimal">Vibration</label>
            <div className="button-group-row">
              <button
                type="button"
                className={`setting-pill-btn ${settings.vibrationEnabled ? 'active' : ''}`}
                onClick={() => handleToggle('vibrationEnabled')}
              >
                Vibration {settings.vibrationEnabled ? 'ON' : 'OFF'}
              </button>

              {settings.vibrationEnabled && (
                <button
                  type="button"
                  className="setting-pill-btn"
                  onClick={() => audioService.triggerVibration(true)}
                >
                  <Activity className="w-3.5 h-3.5 mr-1" />
                  Test Vibration
                </button>
              )}
            </div>
          </div>

          {/* SCREEN AWAKE - INDIVIDUAL BUTTON */}
          <div className="setting-group-minimal">
            <label className="setting-label-minimal">Display</label>
            <div className="button-group-row">
              <button
                type="button"
                className={`setting-pill-btn ${settings.keepScreenAwake ? 'active' : ''}`}
                onClick={() => handleToggle('keepScreenAwake')}
              >
                Screen Awake {settings.keepScreenAwake ? 'ON' : 'OFF'}
              </button>
            </div>
          </div>
        </div>

        {/* Done Button */}
        <div className="settings-footer-minimal mt-3">
          <button className="setting-pill-btn active w-full justify-center text-center font-bold" onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
