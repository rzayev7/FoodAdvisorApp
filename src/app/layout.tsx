import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: "%s | Fooderra",
    default:'Fooderra',
  },
  description: 'Your personal food advisor',
  icons: {
    icon: [
      { url: '/images/favicon.png' },
    ],
    shortcut: ['/images/favicon.png'],
    apple: [
      { url: '/images/favicon.png' },
      { url: '/images/favicon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'apple-touch-icon-precomposed',
        url: '/images/favicon.png',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
