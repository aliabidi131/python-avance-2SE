import { useState } from 'react'
import { useRouter } from 'next/router'
import { createCategorie } from '@/services/api'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function AddCategorie() {
  const [nom, setNom] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createCategorie({ nom, description })
      router.push('/categories/list')
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <div className="bg-[#0b0f1a] min-h-screen text-slate-200">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-24">
        <header className="mb-16">
          <Link href="/categories/list" className="text-indigo-400 font-bold hover:underline mb-4 inline-block tracking-[0.2em] text-[10px] uppercase">
            ← RETOUR AUX CATÉGORIES
          </Link>
          <h1 className="text-6xl font-black text-white uppercase tracking-tighter">Créer l'Univers</h1>
          <p className="text-slate-500 font-medium mt-4 text-xl tracking-tight leading-relaxed">Définissez une nouvelle catégorie stratégique pour vos produits.</p>
        </header>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 p-8 rounded-[4rem] mb-12 text-red-400 font-bold shadow-2xl backdrop-blur-2xl">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-slate-900/40 border border-slate-800 p-20 rounded-[4.5rem] shadow-[0_0_100px_rgba(0,0,0,0.6)] backdrop-blur-3xl">
          <div className="space-y-16">
            <div className="group text-center">
              <label className="block text-[10px] font-black text-slate-700 uppercase tracking-[0.4em] mb-6 group-focus-within:text-indigo-400 transition-colors text-center">Nom de la Catégorie</label>
              <input
                type="text"
                className="w-full bg-[#0b0f1a] p-8 rounded-3xl border border-slate-700/50 focus:border-indigo-500 focus:ring-12 focus:ring-indigo-500/5 outline-none transition-all font-black text-3xl text-white placeholder:text-slate-800 text-center uppercase tracking-tighter"
                placeholder="ex: PROTECTION LUXE"
                value={nom}
                onChange={e => setNom(e.target.value)}
                required
              />
            </div>

            <div className="group">
              <label className="block text-[10px] font-black text-slate-700 uppercase tracking-[0.4em] mb-6 group-focus-within:text-indigo-400 transition-colors">Vision Stratégique</label>
              <textarea
                className="w-full bg-[#0b0f1a] p-10 rounded-3xl border border-slate-700/50 h-80 focus:border-indigo-500 outline-none transition-all font-bold text-white text-lg placeholder:text-slate-800 shadow-inner"
                placeholder="Décrivez l'univers de cette catégorie..."
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </div>

            <button type="submit" className="w-full bg-white hover:bg-slate-200 text-black py-8 rounded-[3rem] font-black text-3xl transition-all shadow-[0_30px_60px_rgba(255,255,255,0.05)] hover:-translate-y-2 active:scale-95 uppercase tracking-[0.4em]">
              Générer la Catégorie
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  )
}
