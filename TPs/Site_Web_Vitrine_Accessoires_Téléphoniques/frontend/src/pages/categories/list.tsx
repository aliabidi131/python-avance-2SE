import { useEffect, useState } from 'react'
import { fetchCategories, deleteCategorie } from '@/services/api'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function ListCategories() {
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = async () => {
    try {
      const data = await fetchCategories()
      setCategories(data)
    } catch (err: any) {
      setError(err?.message || 'Impossible de joindre le backend. Vérifiez que le service backend est démarré sur http://localhost:8082.')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (confirm('Supprimer cette catégorie ?')) {
      try {
        await deleteCategorie(id)
        setCategories(categories.filter(c => c.id !== id))
      } catch (err: any) {
        alert(err.message)
      }
    }
  }

  if (loading) return (
    <div className="bg-[#0b0f1a] min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-indigo-500"></div>
    </div>
  )

  return (
    <div className="bg-[#0b0f1a] min-h-screen text-slate-200 uppercase tracking-tight font-sans text-center">
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 py-20">
        <header className="flex flex-col md:flex-row justify-between items-end gap-10 mb-20 text-left">
          <div className="max-w-xl">
            <h1 className="text-7xl font-black text-white mb-6 uppercase tracking-tighter">Univers</h1>
            <p className="text-slate-500 font-medium text-xl leading-relaxed">
              Structurez votre catalogue avec une hiérarchie précise. Architecture synchronisée sur Port 8082.
            </p>
          </div>
          <Link href="/categories/add">
            <button className="bg-white hover:bg-slate-200 text-black px-12 py-5 rounded-2xl font-black transition-all shadow-[0_15px_40px_rgba(255,255,255,0.05)] hover:-translate-y-2 active:scale-95 text-xs tracking-[0.2em]">
               + AJOUTER
            </button>
          </Link>
        </header>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 p-10 rounded-[3rem] mb-12 flex items-center gap-6 text-red-100 backdrop-blur-3xl shadow-2xl text-left">
            <div className="w-14 h-14 rounded-2xl bg-red-500/20 flex items-center justify-center text-2xl">⚠️</div>
            <p className="font-black text-lg uppercase tracking-tight">{error}</p>
          </div>
        )}

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {categories.map(c => (
            <div key={c.id} className="group bg-slate-900/60 backdrop-blur-md border border-slate-800 p-10 rounded-[3.5rem] hover:border-indigo-500/40 transition-all duration-700 shadow-2xl overflow-hidden relative">
              <div className="absolute inset-0 bg-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity blur-[80px] -z-10"></div>
              <div className="mb-10 text-left">
                <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition-transform duration-700 border border-white/5">
                   📂
                </div>
                <h3 className="text-3xl font-black text-white mb-4 uppercase tracking-tighter">{c.nom}</h3>
                <p className="text-slate-500 text-sm leading-relaxed h-20 overflow-hidden line-clamp-3 normal-case tracking-normal font-medium">
                  {c.description || 'Synthèse stratégique non définie.'}
                </p>
              </div>
              
              <div className="flex items-center gap-8 pt-8 border-t border-slate-800/50">
                <Link href={`/categories/edit?id=${c.id}`} className="text-indigo-400 font-black text-[10px] uppercase tracking-[0.3em] hover:text-indigo-300 transition-colors">
                  Optimiser
                </Link>
                <button onClick={() => handleDelete(c.id)} className="text-slate-700 font-black text-[10px] uppercase tracking-[0.3em] hover:text-rose-500 transition-colors">
                  Révoquer
                </button>
              </div>
            </div>
          ))}
        </div>

        {categories.length === 0 && !error && (
           <div className="text-center py-60 grayscale opacity-10">
              <div className="text-9xl mb-12">📦</div>
              <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Catalogue Vierge</h2>
              <Link href="/categories/add" className="text-indigo-500 font-black hover:underline underline-offset-[16px] tracking-[0.3em] text-[10px] uppercase mt-10 block">CREER LA PREMIERE UNITE</Link>
           </div>
        )}
      </div>
      <Footer />
    </div>
  )
}
