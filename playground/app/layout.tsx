import './globals.css';
import '../../src/styles/index.css';
import type { Metadata, Viewport } from 'next';
import ClientShell from './ClientShell';
import AuthGate from '@/auth/AuthGate';

export const metadata: Metadata = {
  title: 'Hemp’in Playground',
  description: 'Hemp’in unified UI shell',
  manifest: '/manifest.json',
  themeColor: '#10B981',
  icons: {
    icon: [
      { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' }
    ],
    apple: [{ url: '/icons/icon-192.png' }],
    other: [{ rel: 'mask-icon', url: '/icons/maskable-512.png', color: '#10B981' }]
  },
  appleWebApp: { capable: true, statusBarStyle: 'black-translucent', title: 'Hemp’in' }
};

export const viewport: Viewport = { themeColor: '#10B981' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-black">
      <body>
        <AuthGate>
          <ClientShell>{children}</ClientShell>
        </AuthGate>
      </body>
    </html>
  );
}