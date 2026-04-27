import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useEffect, useState } from 'react'

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="page-shell">
      <Navbar />

      <main className="relative pt-28 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.14),_transparent_22%),_radial-gradient(circle_at_bottom_right,_rgba(236,72,153,0.12),_transparent_20%)] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6">
          <section className="panel-card overflow-hidden p-14">
            <div className="mb-10 inline-flex items-center gap-3 rounded-full bg-white/10 px-5 py-3 text-xs uppercase tracking-[0.3em] text-cyan-300 border border-cyan-300/20">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-cyan-300/15">🌟</span>
              Design unique PhoneLux
            </div>
            <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
              <div>
                <h1 className="text-5xl md:text-[4.7rem] font-black tracking-tight text-white leading-tight">
                  Vitrine téléphonique moderne <br />
                  en mode <span className="text-cyan-300">noir poli</span>
                </h1>
                <p className="mt-8 max-w-3xl text-lg text-slate-300 leading-relaxed tracking-[0.02em]">
                  Une ligne graphique unique et homogène pour toutes les pages du site, avec des panneaux translucides et une navigation fluide.
                </p>
                <div className="mt-12 flex flex-wrap gap-4">
                  <Link href="/accessoires/list" className="btn-primary">Voir les accessoires</Link>
                  <Link href="/categories/list" className="btn-secondary">Explorer les catégories</Link>
                </div>
              </div>
              <div className="grid gap-6">
                {[
                  { title: 'Accessoires', description: 'Gestion complète de votre catalogue.' },
                  { title: 'Catégories', description: 'Organisation précise des univers produits.' },
                  { title: 'Marques', description: 'Gestion élégante de vos partenaires.' }
                ].map((item, index) => (
                  <div key={index} className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.24)]">
                    <span className="inline-flex items-center rounded-3xl bg-cyan-300/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.28em] text-cyan-200">
                      {item.title}
                    </span>
                    <p className="mt-6 text-slate-300 text-lg leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              { title: 'Clarté', desc: 'Contraste optimal et lisibilité renforcée.', icon: '💡' },
              { title: 'Cohérence', desc: 'Palette identique sur tout le site.', icon: '🎯' },
              { title: 'Calme', desc: 'Ambiance sombre avec touches lumineuses.', icon: '✨' }
            ].map((feature, index) => (
              <article key={index} className="panel-card p-10">
                <div className="text-4xl mb-6">{feature.icon}</div>
                <h2 className="text-3xl font-black mb-4 text-white">{feature.title}</h2>
                <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
              </article>
            ))}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}