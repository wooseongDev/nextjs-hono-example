import './globals.css'

import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Next.js + Hono',
}

type Props = {
  children: ReactNode
}

const RootLayout = (props: Props) => {
  const { children } = props

  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  )
}

export default RootLayout
