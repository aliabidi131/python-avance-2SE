import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { fetchCategorie, updateCategorie } from '@/services/api'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function EditCategorie() {
  const router = useRouter()
  const { id } = router.query
  const [categorie, setCategorie] = useState<any>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      fetchCategorie(Number(id))
        .then(setCategorie)
        .catch(err => setError(err.message))
        .finally(() => setLoading(false))
    }
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await updateCategorie(Number(id), categorie)
      router.push('/categories/list')
    } catch (err: any) {
      setError(err.message)
    }
  }

  if (loading) return (
    <div className="bg-[#0b0f1a] min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-indigo-500"></div>
    </div>
  )
  
  if (!categorie) return (
    <div className="bg-[#0b0f1a] min-h-screen flex flex-col items-center justify-center text-slate-500 gap-10">
      <div className="text-9xl font-black opacity-10 tracking-[0.5em]">MISSING</div>
      <p className="font-black text-xs uppercase tracking-[0.4em]">Identité non reconnue</p>
      <Link href="/categories/list" className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black tracking-widest text-xs uppercase shadow-xl hover:-translate-y-1 transition-transform">RETOUR</Link>
    </div>
  )

  return (
    <div className="bg-[#0b0f1a] min-h-screen text-slate-200">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-24">
        <header className="mb-16">
          <Link href="/categories/list" className="text-indigo-400 font-bold hover:underline mb-4 inline-block tracking-[0.2em] text-[10px] uppercase">
            ← RETOUR SANS ENREGISTRER
          </Link>
          <h1 className="text-6xl font-black text-white uppercase tracking-tighter">Redéfinir le Segment</h1>
          <p className="text-slate-500 font-medium mt-4 text-xl tracking-tight leading-relaxed">Mise à jour stratégique : {categorie.nom}.</p>
        </header>

        {error && (
          <div className="bg-rose-500/10 border border-rose-500/50 p-8 rounded-[4rem] mb-12 text-red-400 font-bold shadow-2xl backdrop-blur-3xl">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-slate-900/40 border border-slate-800 p-20 rounded-[4.5rem] shadow-[0_0_100px_rgba(0,0,0,0.6)] backdrop-blur-3xl">
          <div className="space-y-16">
            <div className="group text-center">
              <label className="block text-[10px] font-black text-slate-700 uppercase tracking-[0.4em] mb-6 group-focus-within:text-blue-400 transition-colors">Nom du Segment</label>
              <input
                type="text"
                className="w-full bg-[#0b0f1a] p-8 rounded-3xl border border-slate-700/50 focus:border-blue-500 focus:ring-12 focus:ring-blue-500/5 outline-none transition-all font-black text-3xl text-white text-center uppercase tracking-tighter"
                value={categorie.nom}
                onChange={e => setCategorie({ ...categorie, nom: e.target.value })}
                required
              />
            </div>

            <div className="group">
              <label className="block text-[10px] font-black text-slate-700 uppercase tracking-[0.4em] mb-6 group-focus-within:text-blue-400 transition-colors">Vision Stratégique</label>
              <textarea
                className="w-full bg-[#0b0f1a] p-10 rounded-3xl border border-slate-700/50 h-80 focus:border-blue-500 outline-none transition-all font-bold text-white text-lg placeholder:text-slate-800 shadow-inner"
                value={categorie.description || ''}
                onChange={e => setCategorie({ ...categorie, description: e.target.value })}
              />
            </div>

            <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white py-8 rounded-[3rem] font-black text-2xl transition-all shadow-[0_25px_50px_rgba(37,99,235,0.1)] hover:-translate-y-2 active:scale-95 uppercase tracking-[0.3em]">
              Confirmer la Mise à Jour
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  )
}
