'use client';

import { useState, useRef } from 'react';
import {
  Folder,
  FileText,
  File,
  Terminal,
  Mail,
  Trash2,
  Image,
  Bomb,
} from 'lucide-react';
import { useDesktop } from '../../contexts/DesktopContext';
import type { DesktopItem } from '../../types';
import { findFileById } from '../../data/filesystem';

interface DesktopIconProps {
  item: DesktopItem;
  isMobile?: boolean;
}

const iconMap: Record<string, typeof Folder> = {
  folder: Folder,
  file: FileText,
  text: FileText,
  markdown: File,
  pdf: FileText,
  image: Image,
  terminal: Terminal,
  mail: Mail,
  trash: Trash2,
  minesweeper: Bomb,
};

export function DesktopIcon({ item, isMobile = false }: DesktopIconProps) {
  const { state, selectDesktopItem, openFile, openApp, deselectAll } = useDesktop();
  const [isJiggling, setIsJiggling] = useState(false);
  const lastClickTime = useRef(0);
  const isSelected = state.selectedDesktopItems.includes(item.id);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const now = Date.now();
    const timeSinceLastClick = now - lastClickTime.current;

    if (timeSinceLastClick < 300) {
      handleDoubleClick();
    } else {
      selectDesktopItem(item.id);
    }

    lastClickTime.current = now;
  };

  const handleDoubleClick = () => {
    deselectAll();

    if (item.appId) {
      openApp(item.appId);
    } else if (item.fileId) {
      const file = findFileById(item.fileId);
      if (file) {
        openFile(file);
      }
    }
  };

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', item.id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const triggerJiggle = () => {
    setIsJiggling(true);
    setTimeout(() => setIsJiggling(false), 300);
  };

  const IconComponent = iconMap[item.icon] || iconMap[item.type] || Folder;

  const getIconColor = () => {
    if (item.icon === 'trash') {
      return state.trashedItems.length > 0 ? 'text-warm-400' : 'text-warm-500';
    }
    return 'text-warm-400';
  };

  const positionStyle: React.CSSProperties = isMobile
    ? {}
    : { position: 'absolute', left: item.x, top: item.y };

  return (
    <div
      className={`desktop-icon flex flex-col items-center justify-center p-2 cursor-default ${
        isMobile ? 'w-full' : 'w-20'
      } ${isSelected ? 'selected' : ''} ${isJiggling ? 'animate-icon-jiggle' : ''}`}
      style={positionStyle}
      onClick={handleClick}
      draggable={!isMobile}
      onDragStart={isMobile ? undefined : handleDragStart}
      onContextMenu={(e) => {
        e.preventDefault();
        triggerJiggle();
      }}
    >
      <div className={`flex items-center justify-center ${getIconColor()} ${isMobile ? 'w-12 h-12' : 'w-14 h-14'}`}>
        <IconComponent size={isMobile ? 40 : 48} strokeWidth={1.5} />
      </div>
      <span className={`text-warm-200 text-center mt-1 leading-tight px-1 break-words ${isMobile ? 'text-[10px]' : 'text-xs'}`}>
        {item.name}
      </span>
    </div>
  );
}
