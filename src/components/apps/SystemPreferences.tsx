'use client';

import { useState } from 'react';
import { Monitor, Clock, Check, Palette } from 'lucide-react';
import { useDesktop, wallpapers, themes } from '../../contexts/DesktopContext';
import type { Wallpaper, Theme } from '../../types';

type Tab = 'appearance' | 'wallpaper' | 'screensaver';

const themeColors: Record<string, { primary: string; accent: string; bg: string }> = {
  modern: { primary: '#f5f3f0', accent: '#8b7e74', bg: '#1a1a1a' },
  classic: { primary: '#f3f4f6', accent: '#60a5fa', bg: '#374151' },
  terminal: { primary: '#00ff00', accent: '#00ff00', bg: '#000000' },
  nordic: { primary: '#e2e8f0', accent: '#38bdf8', bg: '#0f172a' },
  retro: { primary: '#ffb000', accent: '#ffb000', bg: '#1a1200' },
};

function ThemePreviewChip({ theme }: { theme: Theme }) {
  const colors = themeColors[theme.id] || themeColors.modern;
  return (
    <div className="flex items-center gap-1.5">
      <div
        className="w-4 h-4 rounded"
        style={{ backgroundColor: colors.bg, border: `1px solid ${colors.primary}30` }}
      />
      <div
        className="w-4 h-4 rounded"
        style={{ backgroundColor: colors.primary }}
      />
      <div
        className="w-4 h-4 rounded"
        style={{ backgroundColor: colors.accent }}
      />
    </div>
  );
}

export function SystemPreferences() {
  const { state, setWallpaper, setScreensaver, setTheme } = useDesktop();
  const [activeTab, setActiveTab] = useState<Tab>('appearance');
  const [applyRecommendedWallpaper, setApplyRecommendedWallpaper] = useState(true);

  const solidWallpapers = wallpapers.filter(w => w.type === 'solid');
  const gradientWallpapers = wallpapers.filter(w => w.type === 'gradient');
  const imageWallpapers = wallpapers.filter(w => w.type === 'image');

  const timeoutOptions = [
    { value: 1, label: '1 minute' },
    { value: 2, label: '2 minutes' },
    { value: 5, label: '5 minutes' },
    { value: 10, label: '10 minutes' },
    { value: 15, label: '15 minutes' },
    { value: 30, label: '30 minutes' },
  ];

  const renderWallpaperOption = (wp: Wallpaper) => {
    const isSelected = state.wallpaper.id === wp.id;
    const style: React.CSSProperties = wp.type === 'image'
      ? { backgroundImage: `url(${wp.thumbnail || wp.value})`, backgroundSize: 'cover', backgroundPosition: 'center' }
      : wp.type === 'gradient'
        ? { background: wp.value }
        : { backgroundColor: wp.value };

    return (
      <button
        key={wp.id}
        onClick={() => setWallpaper(wp)}
        className={`relative w-20 h-14 rounded-lg overflow-hidden transition-all ${
          isSelected ? 'ring-2 ring-blue-500 ring-offset-2 ring-offset-desktop-surface' : 'hover:ring-1 hover:ring-warm-500'
        }`}
        style={style}
      >
        {isSelected && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <Check size={16} className="text-white" />
          </div>
        )}
      </button>
    );
  };

  return (
    <div className="h-full flex flex-col text-warm-200">
      <div className="flex border-b border-warm-700/50">
        <button
          onClick={() => setActiveTab('appearance')}
          className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors ${
            activeTab === 'appearance'
              ? 'text-warm-100 border-b-2 border-blue-500 -mb-px'
              : 'text-warm-400 hover:text-warm-200'
          }`}
        >
          <Palette size={16} />
          Appearance
        </button>
        <button
          onClick={() => setActiveTab('wallpaper')}
          className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors ${
            activeTab === 'wallpaper'
              ? 'text-warm-100 border-b-2 border-blue-500 -mb-px'
              : 'text-warm-400 hover:text-warm-200'
          }`}
        >
          <Monitor size={16} />
          Wallpaper
        </button>
        <button
          onClick={() => setActiveTab('screensaver')}
          className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors ${
            activeTab === 'screensaver'
              ? 'text-warm-100 border-b-2 border-blue-500 -mb-px'
              : 'text-warm-400 hover:text-warm-200'
          }`}
        >
          <Clock size={16} />
          Screen Saver
        </button>
      </div>

      <div className="flex-1 overflow-auto p-6">
        {activeTab === 'appearance' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xs font-semibold text-warm-400 uppercase tracking-wider mb-4">Theme</h3>
              <div className="grid grid-cols-1 gap-3">
                {themes.map((theme: Theme) => {
                  const isSelected = state.theme.id === theme.id;
                  return (
                    <button
                      key={theme.id}
                      onClick={() => setTheme(theme, applyRecommendedWallpaper)}
                      className={`relative p-4 rounded-lg text-left transition-all ${
                        isSelected
                          ? 'bg-blue-500/20 ring-2 ring-blue-500'
                          : 'bg-warm-700/30 hover:bg-warm-700/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-warm-100">{theme.name}</div>
                          <div className="text-xs text-warm-400 mt-0.5">{theme.description}</div>
                        </div>
                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                            <Check size={12} className="text-white" />
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2 mt-3">
                        <ThemePreviewChip theme={theme} />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-warm-700/50">
              <div>
                <h3 className="text-sm font-medium text-warm-200">Apply Recommended Wallpaper</h3>
                <p className="text-xs text-warm-400 mt-1">Automatically set wallpaper when changing themes</p>
              </div>
              <button
                onClick={() => setApplyRecommendedWallpaper(!applyRecommendedWallpaper)}
                className={`relative w-11 h-6 rounded-full transition-colors ${
                  applyRecommendedWallpaper ? 'bg-blue-500' : 'bg-warm-600'
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-all duration-200 ${
                    applyRecommendedWallpaper ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        )}

        {activeTab === 'wallpaper' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xs font-semibold text-warm-400 uppercase tracking-wider mb-3">Solid Colors</h3>
              <div className="flex gap-3 flex-wrap">
                {solidWallpapers.map(renderWallpaperOption)}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-warm-400 uppercase tracking-wider mb-3">Gradients</h3>
              <div className="flex gap-3 flex-wrap">
                {gradientWallpapers.map(renderWallpaperOption)}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-warm-400 uppercase tracking-wider mb-3">Images</h3>
              <div className="flex gap-3 flex-wrap">
                {imageWallpapers.map(renderWallpaperOption)}
              </div>
            </div>

            <div className="pt-4 border-t border-warm-700/50">
              <h3 className="text-xs font-semibold text-warm-400 uppercase tracking-wider mb-3">Preview</h3>
              <div
                className="w-full h-40 rounded-lg overflow-hidden border border-warm-700/50"
                style={
                  state.wallpaper.type === 'image'
                    ? { backgroundImage: `url(${state.wallpaper.value})`, backgroundSize: 'cover', backgroundPosition: 'center' }
                    : state.wallpaper.type === 'gradient'
                      ? { background: state.wallpaper.value }
                      : { backgroundColor: state.wallpaper.value }
                }
              >
                <div className="w-full h-full flex items-center justify-center">
                  <span className="px-3 py-1.5 bg-black/40 backdrop-blur-sm rounded text-sm text-white">
                    {state.wallpaper.name}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'screensaver' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-warm-200">Enable Screen Saver</h3>
                <p className="text-xs text-warm-400 mt-1">Activate after a period of inactivity</p>
              </div>
              <button
                onClick={() => setScreensaver({ ...state.screensaver, enabled: !state.screensaver.enabled })}
                className={`relative w-11 h-6 rounded-full transition-colors ${
                  state.screensaver.enabled ? 'bg-blue-500' : 'bg-warm-600'
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-all duration-200 ${
                    state.screensaver.enabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className={`transition-opacity ${state.screensaver.enabled ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
              <h3 className="text-xs font-semibold text-warm-400 uppercase tracking-wider mb-3">Start After</h3>
              <div className="grid grid-cols-3 gap-2">
                {timeoutOptions.map(option => (
                  <button
                    key={option.value}
                    onClick={() => setScreensaver({ ...state.screensaver, timeout: option.value })}
                    className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                      state.screensaver.timeout === option.value
                        ? 'bg-blue-500 text-white'
                        : 'bg-warm-700/50 text-warm-300 hover:bg-warm-600/50'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-warm-700/50">
              <h3 className="text-xs font-semibold text-warm-400 uppercase tracking-wider mb-3">Preview</h3>
              <div className="w-full h-40 rounded-lg overflow-hidden border border-warm-700/50 bg-black flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-light text-warm-200 mb-2">
                    {new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
                  </div>
                  <div className="text-sm text-warm-400">
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                  </div>
                </div>
              </div>
              <p className="text-xs text-warm-500 mt-2 text-center">
                Move mouse or press any key to exit screen saver
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
