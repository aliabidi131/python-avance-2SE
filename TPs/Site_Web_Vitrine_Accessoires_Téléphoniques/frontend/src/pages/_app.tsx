// src/pages/_app.tsx
// Point d'entrée Next.js qui englobe toutes les pages
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}