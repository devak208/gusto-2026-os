import type { Theme } from '../types';

export const themes: Theme[] = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean and refined with warm gray tones',
    iconConfig: {
      library: 'lucide',
      strokeWidth: 1.5,
      filled: false,
    },
    recommendedWallpaper: 'img-architecture',
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional desktop with soft shadows',
    iconConfig: {
      library: 'lucide',
      strokeWidth: 2,
      filled: false,
    },
    recommendedWallpaper: 'img-vintage',
  },
  {
    id: 'terminal',
    name: 'Terminal',
    description: 'Hacker aesthetic with sharp edges',
    iconConfig: {
      library: 'phosphor',
      strokeWidth: 2,
      filled: false,
    },
    recommendedWallpaper: 'img-minimal',
  },
  {
    id: 'nordic',
    name: 'Nordic',
    description: 'Cool minimalist Scandinavian design',
    iconConfig: {
      library: 'lucide',
      strokeWidth: 1,
      filled: false,
    },
    recommendedWallpaper: 'img-aurora',
  },
  {
    id: 'retro',
    name: 'Retro',
    description: 'Nostalgic computing with amber tones',
    iconConfig: {
      library: 'phosphor',
      strokeWidth: 2,
      filled: true,
    },
    recommendedWallpaper: 'img-concrete',
  },
];

export function getThemeById(id: string): Theme {
  return themes.find((t) => t.id === id) || themes[0];
}
