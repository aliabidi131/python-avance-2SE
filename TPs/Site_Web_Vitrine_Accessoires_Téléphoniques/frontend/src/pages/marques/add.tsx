import { useState } from 'react'
import { useRouter } from 'next/router'
import { createMarque } from '@/services/api'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function AddMarque() {
  const [nom, setNom] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createMarque({ nom, description })
      router.push('/marques/list')
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <div className="bg-[#0b0f1a] min-h-screen text-slate-200">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-24">
        <header className="mb-16 text-left">
          <Link href="/marques/list" className="text-pink-400 font-bold hover:underline mb-4 inline-block tracking-[0.2em] text-[10px] uppercase">
            ← RETOUR AUX PARTENAIRES
          </Link>
          <h1 className="text-7xl font-black text-white uppercase tracking-tighter">Signature Marque</h1>
          <p className="text-slate-500 font-medium mt-4 text-xl tracking-tight leading-relaxed">Définissez l'ADN d'une marque qui fera vibrer vos clients.</p>
        </header>

        {error && (
          <div className="bg-rose-500/10 border border-rose-500/50 p-10 rounded-[4rem] mb-12 text-rose-400 font-bold shadow-2xl backdrop-blur-2xl text-left">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-slate-900/40 border border-slate-800 p-20 rounded-[4.5rem] shadow-[0_0_100px_rgba(0,0,0,0.6)] backdrop-blur-3xl text-center">
          <div className="space-y-16">
            <div className="group text-center">
              <label className="block text-[10px] font-black text-slate-700 uppercase tracking-[0.4em] mb-6 group-focus-within:text-pink-400 transition-colors">Nom de la Marque</label>
              <input
                type="text"
                className="w-full bg-[#0b0f1a] p-8 rounded-3xl border border-slate-700/50 focus:border-pink-500 focus:ring-12 focus:ring-pink-500/5 outline-none transition-all font-black text-4xl text-white text-center uppercase tracking-tighter"
                placeholder="ex: APPLE / SAMSUNG"
                value={nom}
                onChange={e => setNom(e.target.value)}
                required
              />
            </div>

            <div className="group text-left">
              <label className="block text-[10px] font-black text-slate-700 uppercase tracking-[0.4em] mb-6 group-focus-within:text-pink-400 transition-colors">Histoire / Manifeste</label>
              <textarea
                className="w-full bg-[#0b0f1a] p-10 rounded-3xl border border-slate-700/50 h-80 focus:border-pink-500 outline-none transition-all font-bold text-white text-lg placeholder:text-slate-800 shadow-inner normal-case tracking-normal"
                placeholder="Racontez l'histoire de cette marque..."
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </div>

            <button type="submit" className="w-full bg-gradient-to-br from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white py-8 rounded-[3rem] font-black text-3xl transition-all shadow-[0_30px_60px_rgba(244,63,94,0.1)] hover:-translate-y-2 active:scale-95 uppercase tracking-[0.4em]">
              Activer le Partenariat
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  )
}
