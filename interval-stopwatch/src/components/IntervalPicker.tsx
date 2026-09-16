import React, { useState, useEffect } from 'react';
import { Sliders } from 'lucide-react';

interface IntervalPickerProps {
  currentIntervalSeconds: number;
  disabled: boolean;
  onSelectInterval: (seconds: number) => void;
}

const PRESETS = [
  { label: '30s', seconds: 30 },
  { label: '1m', seconds: 60 },
  { label: '5m', seconds: 300 },
  { label: '10m', seconds: 600 },
  { label: '15m', seconds: 900 },
  { label: '30m', seconds: 1800 },
  { label: '1h', seconds: 3600 },
];

export const IntervalPicker: React.FC<IntervalPickerProps> = ({
  currentIntervalSeconds,
  disabled,
  onSelectInterval,
}) => {
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [customHours, setCustomHours] = useState(0);
  const [customMinutes, setCustomMinutes] = useState(10);
  const [customSeconds, setCustomSeconds] = useState(0);

  const activePreset = PRESETS.find((p) => p.seconds === currentIntervalSeconds);

  useEffect(() => {
    if (!activePreset) {
      setIsCustomMode(true);
      const h = Math.floor(currentIntervalSeconds / 3600);
      const m = Math.floor((currentIntervalSeconds % 3600) / 60);
      const s = currentIntervalSeconds % 60;
      setCustomHours(h);
      setCustomMinutes(m);
      setCustomSeconds(s);
    }
  }, [currentIntervalSeconds, activePreset]);

  const handleCustomApply = () => {
    const total = customHours * 3600 + customMinutes * 60 + customSeconds;
    if (total > 0) {
      onSelectInterval(total);
    }
  };

  return (
    <div className={`interval-picker-minimal ${disabled ? 'disabled-section' : ''}`}>
      <div className="picker-title-minimal">Interval Frequency</div>

      {/* Individual Standalone Preset Pills */}
      <div className="individual-preset-pills">
        {PRESETS.map((preset) => {
          const isSelected = !isCustomMode && currentIntervalSeconds === preset.seconds;
          return (
            <button
              key={preset.seconds}
              type="button"
              disabled={disabled}
              className={`preset-pill-individual ${isSelected ? 'active' : ''}`}
              onClick={() => {
                setIsCustomMode(false);
                onSelectInterval(preset.seconds);
              }}
            >
              {preset.label}
            </button>
          );
        })}

        <button
          type="button"
          disabled={disabled}
          className={`preset-pill-individual custom-pill ${isCustomMode ? 'active' : ''}`}
          onClick={() => setIsCustomMode(!isCustomMode)}
        >
          <Sliders className="w-3.5 h-3.5 mr-1" />
          <span>Custom</span>
        </button>
      </div>

      {/* Individual Custom Inputs */}
      {isCustomMode && (
        <div className="custom-input-individual-box">
          <div className="time-input-group">
            <div className="field">
              <label>H</label>
              <input
                type="number"
                min="0"
                max="99"
                disabled={disabled}
                value={customHours}
                onChange={(e) => setCustomHours(Math.max(0, parseInt(e.target.value) || 0))}
              />
            </div>
            <span className="colon">:</span>
            <div className="field">
              <label>M</label>
              <input
                type="number"
                min="0"
                max="59"
                disabled={disabled}
                value={customMinutes}
                onChange={(e) => setCustomMinutes(Math.min(59, Math.max(0, parseInt(e.target.value) || 0)))}
              />
            </div>
            <span className="colon">:</span>
            <div className="field">
              <label>S</label>
              <input
                type="number"
                min="0"
                max="59"
                disabled={disabled}
                value={customSeconds}
                onChange={(e) => setCustomSeconds(Math.min(59, Math.max(0, parseInt(e.target.value) || 0)))}
              />
            </div>
          </div>
          <button
            type="button"
            disabled={disabled || (customHours === 0 && customMinutes === 0 && customSeconds === 0)}
            className="preset-pill-individual w-full mt-3 justify-center"
            onClick={handleCustomApply}
          >
            Apply Custom Interval
          </button>
        </div>
      )}
    </div>
  );
};
