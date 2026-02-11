'use client';

import { useEffect, useRef, useState, useMemo, useLayoutEffect } from 'react';
import { DesktopIcon } from './DesktopIcon';
import { MenuBar } from './MenuBar';
import { Dock } from './Dock';
import { WindowManager } from './WindowManager';
import { MatrixEffect } from '../effects/MatrixEffect';
import { ConfettiEffect } from '../effects/ConfettiEffect';
import { Screensaver } from '../effects/Screensaver';
import { useDesktop } from '../../contexts/DesktopContext';
import { useIsMobile } from '../../hooks/useIsMobile';
import type { DesktopItem } from '../../types';

const desktopItems: DesktopItem[] = [
  { id: 'about-me', name: 'About Me', icon: 'folder', type: 'folder', fileId: 'about-me', x: 40, y: 60 },
  { id: 'experience', name: 'Experience', icon: 'folder', type: 'folder', fileId: 'experience', x: 40, y: 160 },
  { id: 'projects', name: 'Projects', icon: 'folder', type: 'folder', fileId: 'projects', x: 40, y: 260 },
  { id: 'playground', name: 'Playground', icon: 'folder', type: 'folder', fileId: 'playground', x: 40, y: 360 },
  { id: 'cv', name: 'cv.pdf', icon: 'pdf', type: 'file', fileType: 'pdf', fileId: 'cv', x: 40, y: 460 },
];

export function Desktop() {
  const { state, deselectAll, setMatrixMode, setPartyMode } = useDesktop();
  const { isMobile } = useIsMobile();
  const desktopRef = useRef<HTMLDivElement>(null);
  const konamiSequence = useRef<string[]>([]);
  const tripleClickCount = useRef(0);
  const tripleClickTimer = useRef<ReturnType<typeof setTimeout>>();
  const [iconsJiggling, setIconsJiggling] = useState(false);

  const wallpaperStyle = useMemo((): React.CSSProperties => {
    const { wallpaper } = state;
    if (wallpaper.type === 'image') {
      return {
        backgroundImage: `url(${wallpaper.value})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      };
    } else if (wallpaper.type === 'gradient') {
      return { background: wallpaper.value };
    }
    return { backgroundColor: wallpaper.value };
  }, [state.wallpaper]);

  const handleDesktopClick = (e: React.MouseEvent) => {
    if (e.target === desktopRef.current) {
      deselectAll();

      tripleClickCount.current++;
      if (tripleClickTimer.current) {
        clearTimeout(tripleClickTimer.current);
      }

      if (tripleClickCount.current >= 3) {
        setIconsJiggling(true);
        setTimeout(() => setIconsJiggling(false), 500);
        tripleClickCount.current = 0;
      } else {
        tripleClickTimer.current = setTimeout(() => {
          tripleClickCount.current = 0;
        }, 500);
      }
    }
  };

  useEffect(() => {
    const konamiCode = [
      'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
      'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
      'KeyB', 'KeyA',
    ];

    const handleKeyDown = (e: KeyboardEvent) => {
      konamiSequence.current.push(e.code);
      konamiSequence.current = konamiSequence.current.slice(-10);

      if (konamiSequence.current.join(',') === konamiCode.join(',')) {
        document.body.classList.add('crt-effect');
        setTimeout(() => document.body.classList.remove('crt-effect'), 5000);
        konamiSequence.current = [];
      }

      if (e.metaKey && e.key === 'w') {
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useLayoutEffect(() => {
    const themeClasses = ['theme-modern', 'theme-classic', 'theme-terminal', 'theme-nordic', 'theme-retro'];
    themeClasses.forEach((cls) => document.body.classList.remove(cls));
    document.body.classList.add(`theme-${state.theme.id}`);
  }, [state.theme.id]);

  return (
    <div
      ref={desktopRef}
      className="w-full h-full relative transition-all duration-500"
      style={wallpaperStyle}
      onClick={handleDesktopClick}
    >
      <MenuBar />

      <div className={`absolute inset-0 pt-10 pb-20 px-4 pointer-events-none ${isMobile ? 'mobile-icons-container' : ''}`}>
        <div className={`pointer-events-auto ${isMobile ? 'mobile-icons-grid' : ''}`}>
          {desktopItems.map((item) => (
            <div
              key={item.id}
              className={iconsJiggling ? 'animate-icon-jiggle' : ''}
            >
              <DesktopIcon item={item} isMobile={isMobile} />
            </div>
          ))}
        </div>
      </div>

      <WindowManager />
      <Dock />

      {state.isMatrixMode && (
        <MatrixEffect onComplete={() => setMatrixMode(false)} />
      )}
      {state.isPartyMode && (
        <ConfettiEffect onComplete={() => setPartyMode(false)} />
      )}
      <Screensaver />
    </div>
  );
}
