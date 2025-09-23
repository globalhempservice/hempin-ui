// playground/app/layout.tsx
import './globals.css'
import '../../src/styles/index.css' // pull the library tokens/utilities into the playground
import type { Metadata } from 'next'
import ClientShell from './ClientShell'

export const metadata: Metadata = {
  title: 'hempin-ui playground',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-black">
      <body>
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  )
}