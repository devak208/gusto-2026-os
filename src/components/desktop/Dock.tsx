'use client';

import { useState } from 'react';
import { useDesktop } from '../../contexts/DesktopContext';
import { ThemedIcon } from '../ui/ThemedIcon';
import { useIsMobile } from '../../hooks/useIsMobile';

interface DockItem {
  id: string;
  name: string;
  iconName: string;
  appId: string;
}

const dockItems: DockItem[] = [
  { id: 'finder', name: 'Finder', iconName: 'folder', appId: 'finder' },
  { id: 'terminal', name: 'Terminal', iconName: 'terminal', appId: 'terminal' },
  { id: 'mail', name: 'Mail', iconName: 'mail', appId: 'email' },
  { id: 'minesweeper', name: 'Minesweeper', iconName: 'bomb', appId: 'minesweeper' },
  { id: 'snake', name: 'Snake', iconName: 'gamepad', appId: 'snake' },
  { id: 'spotify', name: 'Spotify', iconName: 'music', appId: 'spotify' },
];

export function Dock() {
  const { state, openApp, focusWindow } = useDesktop();
  const { isMobile, isTouchDevice } = useIsMobile();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [bouncingApp, setBouncingApp] = useState<string | null>(null);

  const handleDockItemClick = (appId: string) => {
    const existingWindow = state.windows.find(
      (w) => w.appId === appId && !w.isMinimized
    );

    if (existingWindow) {
      focusWindow(existingWindow.id);
    } else {
      setBouncingApp(appId);
      setTimeout(() => setBouncingApp(null), 500);
      openApp(appId);
    }
  };

  const handleTrashClick = () => {
    openApp('trash');
  };

  const getScale = (index: number) => {
    if (isTouchDevice || hoveredIndex === null) return 1;
    const distance = Math.abs(index - hoveredIndex);
    if (distance === 0) return 1.4;
    if (distance === 1) return 1.2;
    if (distance === 2) return 1.1;
    return 1;
  };

  const iconSize = isMobile ? 32 : 40;

  const handleTrashDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleTrashDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const itemId = e.dataTransfer.getData('text/plain');
    if (itemId) {
      console.log('Trashed item:', itemId);
    }
  };

  const isAppRunning = (appId: string) => {
    return state.windows.some((w) => w.appId === appId);
  };

  const trashScale = isTouchDevice ? 1 : (hoveredIndex !== null && hoveredIndex >= dockItems.length ? 1.4 : 1);

  return (
    <div className={`fixed left-1/2 -translate-x-1/2 z-[9998] ${isMobile ? 'bottom-2' : 'bottom-3'}`}>
      <div className={`dock-container flex items-end shadow-dock ${isMobile ? 'gap-0.5 px-1.5 py-1' : 'gap-1 px-2 py-1.5'}`}>
        {dockItems.map((item, index) => {
          const scale = getScale(index);
          const isRunning = isAppRunning(item.appId);
          const isBouncing = bouncingApp === item.appId;

          return (
            <div key={item.id} className="relative group">
              <button
                className={`dock-item hover:bg-white/10 transition-colors ${
                  isBouncing ? 'animate-dock-bounce' : ''
                } ${isMobile ? 'p-1.5' : 'p-2'}`}
                style={{
                  transform: `scale(${scale})`,
                  transformOrigin: 'bottom center',
                  borderRadius: 'var(--button-radius)',
                }}
                onMouseEnter={() => !isTouchDevice && setHoveredIndex(index)}
                onMouseLeave={() => !isTouchDevice && setHoveredIndex(null)}
                onClick={() => handleDockItemClick(item.appId)}
              >
                <ThemedIcon name={item.iconName} size={iconSize} className="transition-colors" style={{ color: 'var(--text-secondary)' }} />
              </button>
              {isRunning && (
                <div
                  className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                  style={{ backgroundColor: 'var(--accent-color)' }}
                />
              )}
              {!isTouchDevice && (
                <div
                  className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 backdrop-blur-xl rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  style={{ backgroundColor: 'var(--surface-elevated)', color: 'var(--text-primary)' }}
                >
                  {item.name}
                </div>
              )}
            </div>
          );
        })}

        <div className={`w-px self-center ${isMobile ? 'h-8 mx-0.5' : 'h-10 mx-1'}`} style={{ backgroundColor: 'var(--border-color)' }} />

        <div className="relative group">
          <button
            className={`dock-item hover:bg-white/10 transition-colors ${isMobile ? 'p-1.5' : 'p-2'}`}
            style={{
              transform: `scale(${trashScale})`,
              transformOrigin: 'bottom center',
              borderRadius: 'var(--button-radius)',
            }}
            onMouseEnter={() => !isTouchDevice && setHoveredIndex(dockItems.length)}
            onMouseLeave={() => !isTouchDevice && setHoveredIndex(null)}
            onClick={handleTrashClick}
            onDragOver={isMobile ? undefined : handleTrashDragOver}
            onDrop={isMobile ? undefined : handleTrashDrop}
          >
            <ThemedIcon
              name="trash"
              size={iconSize}
              className="transition-colors"
              style={{ color: state.trashedItems.length > 0 ? 'var(--text-secondary)' : 'var(--text-muted)' }}
            />
          </button>
          {!isTouchDevice && (
            <div
              className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 backdrop-blur-xl rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
              style={{ backgroundColor: 'var(--surface-elevated)', color: 'var(--text-primary)' }}
            >
              Trash
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
