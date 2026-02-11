'use client';

import { useState, useEffect, useRef } from 'react';
import { Wifi, Battery, Volume2, VolumeX, Trophy, RotateCcw } from 'lucide-react';
import { useDesktop } from '../../contexts/DesktopContext';
import { useAchievements } from '../../contexts/AchievementsContext';
import { useIsMobile } from '../../hooks/useIsMobile';

export function MenuBar() {
  const { getActiveWindow, openApp } = useDesktop();
  const { state: achievementsState, toggleSound, openAchievementsWindow, pendingNotification, resetAchievements } = useAchievements();
  const { isMobile } = useIsMobile();
  const [time, setTime] = useState(new Date());
  const [showAppleMenu, setShowAppleMenu] = useState(false);
  const [showRestartConfirm, setShowRestartConfirm] = useState(false);
  const [, setLogoClickCount] = useState(0);
  const logoClickTimer = useRef<ReturnType<typeof setTimeout>>();
  const menuRef = useRef<HTMLDivElement>(null);

  const hasNewAchievement = pendingNotification !== null;

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowAppleMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogoClick = () => {
    setLogoClickCount((prev) => {
      const newCount = prev + 1;
      if (newCount >= 5) {
        document.body.classList.toggle('dark-theme');
        return 0;
      }
      return newCount;
    });

    if (logoClickTimer.current) {
      clearTimeout(logoClickTimer.current);
    }
    logoClickTimer.current = setTimeout(() => {
      setLogoClickCount(0);
    }, 2000);

    setShowAppleMenu((prev) => !prev);
  };

  const activeWindow = getActiveWindow();
  const activeAppName = activeWindow?.title || 'Finder';

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className={`menu-bar fixed top-0 left-0 right-0 h-7 flex items-center justify-between z-[9999] ${isMobile ? 'px-2' : 'px-4'}`}>
      <div className={`flex items-center ${isMobile ? 'gap-2' : 'gap-5'}`} ref={menuRef}>
        <div className="relative">
          <button
            className={`font-semibold transition-colors ${isMobile ? 'text-xs' : 'text-sm'}`}
            style={{ color: 'var(--text-primary)' }}
            onClick={handleLogoClick}
          >
            {isMobile ? 'POS' : 'Portfolio OS'}
          </button>
          {showAppleMenu && (
            <div className="absolute top-full left-0 mt-1 w-56 bg-desktop-surface/95 backdrop-blur-xl rounded-lg shadow-menu overflow-hidden animate-slide-down">
              <div className="py-1">
                <button className="w-full px-3 py-1.5 text-left text-sm text-warm-200 hover:bg-warm-600/30">
                  About This Portfolio
                </button>
                <div className="h-px bg-warm-700/50 my-1" />
                <button
                  className="w-full px-3 py-1.5 text-left text-sm text-warm-200 hover:bg-warm-600/30"
                  onClick={() => {
                    openApp('systemPreferences');
                    setShowAppleMenu(false);
                  }}
                >
                  System Preferences...
                </button>
                <div className="h-px bg-warm-700/50 my-1" />
                <button className="w-full px-3 py-1.5 text-left text-sm text-warm-400">
                  Sleep
                </button>
                <button
                  className="w-full px-3 py-1.5 text-left text-sm text-warm-200 hover:bg-warm-600/30"
                  onClick={() => {
                    setShowRestartConfirm(true);
                    setShowAppleMenu(false);
                  }}
                >
                  Restart...
                </button>
                <button className="w-full px-3 py-1.5 text-left text-sm text-warm-400">
                  Shut Down...
                </button>
              </div>
            </div>
          )}
        </div>
        {!isMobile && (
          <>
            <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{activeAppName}</span>
            <div className="flex items-center gap-4 text-sm" style={{ color: 'var(--text-muted)' }}>
              <button className="hover:opacity-80 transition-opacity">File</button>
              <button className="hover:opacity-80 transition-opacity">Edit</button>
              <button className="hover:opacity-80 transition-opacity">View</button>
              <button className="hover:opacity-80 transition-opacity">Window</button>
              <button className="hover:opacity-80 transition-opacity">Help</button>
            </div>
          </>
        )}
      </div>

      <div className={`flex items-center ${isMobile ? 'gap-1.5' : 'gap-3'}`}>
        <div className={`flex items-center ${isMobile ? 'gap-1.5' : 'gap-2'}`} style={{ color: 'var(--text-secondary)' }}>
          {!isMobile && <Battery size={18} />}
          {!isMobile && <Wifi size={16} />}
          <button
            onClick={toggleSound}
            className="hover:opacity-80 transition-opacity"
            title={achievementsState.soundEnabled ? 'Mute sounds' : 'Unmute sounds'}
          >
            {achievementsState.soundEnabled ? <Volume2 size={isMobile ? 14 : 16} /> : <VolumeX size={isMobile ? 14 : 16} style={{ opacity: 0.5 }} />}
          </button>
          <button
            onClick={openAchievementsWindow}
            className={`hover:opacity-80 transition-opacity relative ${hasNewAchievement ? 'achievement-pulse' : ''}`}
            title="Achievements"
          >
            <Trophy size={isMobile ? 14 : 16} />
          </button>
        </div>
        <div className={`${isMobile ? 'text-xs' : 'text-sm'}`} style={{ color: 'var(--text-primary)' }}>
          {!isMobile && <span>{formatDate(time)}</span>}
          <span className={isMobile ? '' : 'ml-2'}>{formatTime(time)}</span>
        </div>
      </div>

      {showRestartConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[10000]">
          <div className="bg-desktop-surface rounded-xl p-5 max-w-sm mx-4 shadow-2xl border border-warm-700/50">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-9 h-9 rounded-full bg-warm-700/50 flex items-center justify-center flex-shrink-0">
                <RotateCcw size={18} className="text-warm-300" />
              </div>
              <div>
                <h3 className="text-warm-200 font-medium">Restart Portfolio OS?</h3>
                <p className="text-warm-400 text-sm mt-1">All achievements and progress will be reset. You will start fresh.</p>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                className="px-4 py-2 text-sm text-warm-300 hover:text-warm-200 transition-colors"
                onClick={() => setShowRestartConfirm(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 text-sm bg-warm-700 hover:bg-warm-600 text-warm-200 rounded transition-colors"
                onClick={() => {
                  resetAchievements();
                  setShowRestartConfirm(false);
                }}
              >
                Restart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
