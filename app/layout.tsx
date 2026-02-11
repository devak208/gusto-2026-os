import type { Metadata } from 'next';
import '@/index.css';

export const metadata: Metadata = {
  title: 'macOS Portfolio OS Simulator',
  description: 'Interactive portfolio experience',
  openGraph: {
    images: ['https://bolt.new/static/og_default.png'],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['https://bolt.new/static/og_default.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
