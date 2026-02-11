'use client';

import { useState, useRef, useEffect, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { useDesktop } from '../../contexts/DesktopContext';
import { useIsMobile } from '../../hooks/useIsMobile';
import type { WindowState } from '../../types';

interface WindowProps {
  window: WindowState;
  children: ReactNode;
  minWidth?: number;
  minHeight?: number;
}

type ResizeDirection = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw' | null;

export function Window({ window: win, children, minWidth = 300, minHeight = 200 }: WindowProps) {
  const { closeWindow, focusWindow, minimizeWindow, maximizeWindow, moveWindow, resizeWindow } = useDesktop();
  const { isMobile, isTouchDevice } = useIsMobile();
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState<ResizeDirection>(null);
  const [isClosing, setIsClosing] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const resizeStart = useRef({ x: 0, y: 0, width: 0, height: 0, windowX: 0, windowY: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const newX = e.clientX - dragOffset.current.x;
      const newY = Math.max(28, e.clientY - dragOffset.current.y);
      moveWindow(win.id, newX, newY);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, moveWindow, win.id]);

  useEffect(() => {
    if (!isResizing) return;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - resizeStart.current.x;
      const deltaY = e.clientY - resizeStart.current.y;

      let newWidth = resizeStart.current.width;
      let newHeight = resizeStart.current.height;
      let newX = resizeStart.current.windowX;
      let newY = resizeStart.current.windowY;

      if (isResizing.includes('e')) {
        newWidth = Math.max(minWidth, resizeStart.current.width + deltaX);
      }
      if (isResizing.includes('w')) {
        const widthDelta = Math.min(deltaX, resizeStart.current.width - minWidth);
        newWidth = resizeStart.current.width - widthDelta;
        newX = resizeStart.current.windowX + widthDelta;
      }
      if (isResizing.includes('s')) {
        newHeight = Math.max(minHeight, resizeStart.current.height + deltaY);
      }
      if (isResizing.includes('n')) {
        const heightDelta = Math.min(deltaY, resizeStart.current.height - minHeight);
        newHeight = resizeStart.current.height - heightDelta;
        newY = Math.max(28, resizeStart.current.windowY + heightDelta);
      }

      resizeWindow(win.id, newWidth, newHeight);
      if (newX !== win.x || newY !== win.y) {
        moveWindow(win.id, newX, newY);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(null);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, minWidth, minHeight, resizeWindow, moveWindow, win.id, win.x, win.y]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.traffic-light')) return;
    focusWindow(win.id);
    if (isMobile || isTouchDevice) return;
    setIsDragging(true);
    dragOffset.current = {
      x: e.clientX - win.x,
      y: e.clientY - win.y,
    };
  };

  const handleResizeStart = (direction: ResizeDirection) => (e: React.MouseEvent) => {
    e.stopPropagation();
    focusWindow(win.id);
    setIsResizing(direction);
    resizeStart.current = {
      x: e.clientX,
      y: e.clientY,
      width: win.width,
      height: win.height,
      windowX: win.x,
      windowY: win.y,
    };
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => closeWindow(win.id), 150);
  };

  if (win.isMinimized) return null;

  const mobileInset = 8;
  const mobileWindowStyle: React.CSSProperties = {
    top: 28 + mobileInset,
    left: mobileInset,
    width: `calc(100vw - ${mobileInset * 2}px)`,
    height: `calc(100vh - 28px - 60px - ${mobileInset * 2}px)`,
    zIndex: win.zIndex,
  };

  const windowStyle: React.CSSProperties = isMobile
    ? mobileWindowStyle
    : win.isMaximized
    ? {
        top: 28,
        left: 0,
        width: '100vw',
        height: 'calc(100vh - 28px - 80px)',
        zIndex: win.zIndex,
      }
    : {
        top: win.y,
        left: win.x,
        width: win.width,
        height: win.height,
        zIndex: win.zIndex,
      };

  const resizeHandleClass = 'absolute bg-transparent hover:bg-warm-500/10 transition-colors';

  const trafficLightSize = isMobile ? 'w-4 h-4' : 'w-3 h-3';
  const showResizeHandles = !win.isMaximized && !isMobile && !isTouchDevice;

  const windowContent = (
    <div
      ref={windowRef}
      className={`fixed flex flex-col overflow-hidden shadow-window ${
        isClosing ? 'animate-window-close' : 'animate-window-open'
      }`}
      style={{ ...windowStyle, borderRadius: 'var(--window-radius)' }}
      onClick={() => focusWindow(win.id)}
    >
      <div
        className={`window-header flex items-center cursor-default flex-shrink-0 ${isMobile ? 'h-10 px-2' : 'h-12 px-3'}`}
        onMouseDown={handleMouseDown}
      >
        <div className={`flex items-center ${isMobile ? 'gap-1.5' : 'gap-2'}`}>
          <button
            className={`traffic-light traffic-light-red ${trafficLightSize} rounded-full`}
            onClick={handleClose}
          />
          <button
            className={`traffic-light traffic-light-yellow ${trafficLightSize} rounded-full`}
            onClick={() => minimizeWindow(win.id)}
          />
          <button
            className={`traffic-light traffic-light-green ${trafficLightSize} rounded-full`}
            onClick={() => !isMobile && maximizeWindow(win.id)}
          />
        </div>
        <span className={`absolute left-1/2 -translate-x-1/2 font-medium ${isMobile ? 'text-xs' : 'text-sm'}`} style={{ color: 'var(--text-secondary)' }}>
          {win.title}
        </span>
      </div>
      <div className="flex-1 overflow-hidden" style={{ backgroundColor: 'var(--surface-bg)' }}>{children}</div>

      {showResizeHandles && (
        <>
          <div
            className={`${resizeHandleClass} top-0 left-3 right-3 h-1 cursor-n-resize`}
            onMouseDown={handleResizeStart('n')}
          />
          <div
            className={`${resizeHandleClass} bottom-0 left-3 right-3 h-1 cursor-s-resize`}
            onMouseDown={handleResizeStart('s')}
          />
          <div
            className={`${resizeHandleClass} left-0 top-3 bottom-3 w-1 cursor-w-resize`}
            onMouseDown={handleResizeStart('w')}
          />
          <div
            className={`${resizeHandleClass} right-0 top-3 bottom-3 w-1 cursor-e-resize`}
            onMouseDown={handleResizeStart('e')}
          />
          <div
            className={`${resizeHandleClass} top-0 left-0 w-3 h-3 cursor-nw-resize rounded-tl-xl`}
            onMouseDown={handleResizeStart('nw')}
          />
          <div
            className={`${resizeHandleClass} top-0 right-0 w-3 h-3 cursor-ne-resize rounded-tr-xl`}
            onMouseDown={handleResizeStart('ne')}
          />
          <div
            className={`${resizeHandleClass} bottom-0 left-0 w-3 h-3 cursor-sw-resize rounded-bl-xl`}
            onMouseDown={handleResizeStart('sw')}
          />
          <div
            className={`${resizeHandleClass} bottom-0 right-0 w-3 h-3 cursor-se-resize rounded-br-xl`}
            onMouseDown={handleResizeStart('se')}
          />
        </>
      )}
    </div>
  );

  return createPortal(windowContent, document.body);
}
