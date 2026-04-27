import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { fetchAccessoire, updateAccessoire, fetchCategories, fetchMarques } from '@/services/api'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function EditAccessoire() {
  const router = useRouter()
  const { id } = router.query
  const [accessoire, setAccessoire] = useState<any>(null)
  const [categories, setCategories] = useState<any[]>([])
  const [marques, setMarques] = useState<any[]>([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      Promise.all([
        fetchAccessoire(Number(id)),
        fetchCategories(),
        fetchMarques()
      ]).then(([acc, cats, marks]) => {
        setAccessoire(acc)
        setCategories(cats)
        setMarques(marks)
      }).catch(err => setError(err.message))
        .finally(() => setLoading(false))
    }
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const data = {
        ...accessoire,
        categorie: accessoire.categorieId ? { id: Number(accessoire.categorieId) } : accessoire.categorie,
        marque: accessoire.marqueId ? { id: Number(accessoire.marqueId) } : accessoire.marque
      }
      await updateAccessoire(Number(id), data)
      router.push('/accessoires/list')
    } catch (err: any) {
      setError(err.message)
    }
  }

  if (loading) return (
    <div className="bg-[#0b0f1a] min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-indigo-500"></div>
    </div>
  )
  
  if (!accessoire) return (
    <div className="bg-[#0b0f1a] min-h-screen flex flex-col items-center justify-center gap-10">
      <div className="text-9xl font-black text-slate-800 tracking-tighter opacity-10">404</div>
      <p className="text-slate-500 font-black uppercase tracking-[0.4em] text-xs">Produit non localisé</p>
      <Link href="/accessoires/list" className="bg-white text-black px-10 py-4 rounded-2xl font-black tracking-widest text-xs uppercase shadow-xl hover:-translate-y-1 transition-transform">RETOUR</Link>
    </div>
  )

  return (
    <div className="bg-[#0b0f1a] min-h-screen text-slate-200">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-20">
        <header className="mb-16">
          <Link href="/accessoires/list" className="text-indigo-400 font-black hover:underline mb-4 inline-block tracking-[0.2em] text-[10px] uppercase">
            ← ANNULER LES MODIFICATIONS
          </Link>
          <h1 className="text-6xl font-black text-white uppercase tracking-tighter">Optimiser l'Article</h1>
          <p className="text-slate-500 font-medium mt-4 text-xl tracking-tight leading-relaxed">Ajustez les détails de votre produit {accessoire.nom}.</p>
        </header>

        {error && (
          <div className="bg-rose-500/10 border border-rose-500/50 p-8 rounded-[3rem] mb-12 text-rose-400 font-black shadow-2xl backdrop-blur-xl">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-slate-900/40 border border-slate-800 p-16 rounded-[4rem] shadow-[0_0_80px_rgba(0,0,0,0.5)] backdrop-blur-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="md:col-span-2 group">
              <label className="block text-[10px] font-black text-slate-700 uppercase tracking-[0.3em] mb-4 group-focus-within:text-indigo-400 transition-colors">Nom du produit</label>
              <input
                type="text"
                className="w-full bg-[#0b0f1a] p-6 rounded-3xl border border-slate-700 focus:border-indigo-500 focus:ring-8 focus:ring-indigo-500/5 outline-none transition-all font-black text-2xl text-white"
                value={accessoire.nom}
                onChange={e => setAccessoire({ ...accessoire, nom: e.target.value })}
                required
              />
            </div>

            <div className="group">
              <label className="block text-[10px] font-black text-slate-700 uppercase tracking-[0.3em] mb-4 group-focus-within:text-indigo-400 transition-colors">Prix (€)</label>
              <input
                type="number"
                step="0.01"
                className="w-full bg-[#0b0f1a] p-6 rounded-3xl border border-slate-700 focus:border-indigo-500 outline-none transition-all font-black text-xl text-white"
                value={accessoire.prix}
                onChange={e => setAccessoire({ ...accessoire, prix: Number(e.target.value) })}
                required
              />
            </div>

            <div className="group">
              <label className="block text-[10px] font-black text-slate-700 uppercase tracking-[0.3em] mb-4 group-focus-within:text-indigo-400 transition-colors">Stock</label>
              <input
                type="number"
                className="w-full bg-[#0b0f1a] p-6 rounded-3xl border border-slate-700 focus:border-indigo-500 outline-none transition-all font-black text-xl text-white"
                value={accessoire.stock}
                onChange={e => setAccessoire({ ...accessoire, stock: Number(e.target.value) })}
                required
              />
            </div>

            <div className="group">
              <label className="block text-[10px] font-black text-slate-700 uppercase tracking-[0.3em] mb-4 group-focus-within:text-indigo-400 transition-colors">Catégorie</label>
              <select
                className="w-full bg-[#0b0f1a] p-6 rounded-3xl border border-slate-700 focus:border-indigo-500 outline-none transition-all font-black text-lg text-white appearance-none cursor-pointer"
                value={accessoire.categorie?.id || ''}
                onChange={e => setAccessoire({ ...accessoire, categorie: { id: Number(e.target.value) } })}
                required
              >
                <option value="">Sélectionner...</option>
                {categories.map(c => <option key={c.id} value={c.id} className="bg-slate-900">{c.nom}</option>)}
              </select>
            </div>

            <div className="group">
              <label className="block text-[10px] font-black text-slate-700 uppercase tracking-[0.3em] mb-4 group-focus-within:text-indigo-400 transition-colors">Marque</label>
              <select
                className="w-full bg-[#0b0f1a] p-6 rounded-3xl border border-slate-700 focus:border-indigo-500 outline-none transition-all font-black text-lg text-white appearance-none cursor-pointer"
                value={accessoire.marque?.id || ''}
                onChange={e => setAccessoire({ ...accessoire, marque: { id: Number(e.target.value) } })}
                required
              >
                <option value="">Sélectionner...</option>
                {marques.map(m => <option key={m.id} value={m.id} className="bg-slate-900">{m.nom}</option>)}
              </select>
            </div>

            <div className="md:col-span-2 group">
              <label className="block text-[10px] font-black text-slate-700 uppercase tracking-[0.3em] mb-4 group-focus-within:text-indigo-400 transition-colors">Modèle / Type</label>
              <input
                type="text"
                className="w-full bg-[#0b0f1a] p-6 rounded-3xl border border-slate-700 focus:border-indigo-500 outline-none transition-all font-black text-lg text-white"
                value={accessoire.type}
                onChange={e => setAccessoire({ ...accessoire, type: e.target.value })}
              />
            </div>

            <div className="md:col-span-2 group">
              <label className="block text-[10px] font-black text-slate-700 uppercase tracking-[0.3em] mb-4 group-focus-within:text-indigo-400 transition-colors">URL de l'Image</label>
              <input
                type="text"
                className="w-full bg-[#0b0f1a] p-6 rounded-3xl border border-slate-700 focus:border-indigo-500 outline-none transition-all font-bold text-slate-200 placeholder:text-slate-800 shadow-inner"
                value={accessoire.imageUrl || ''}
                onChange={e => setAccessoire({ ...accessoire, imageUrl: e.target.value })}
              />
            </div>

            <div className="md:col-span-2 group">
              <label className="block text-[10px] font-black text-slate-700 uppercase tracking-[0.3em] mb-4 group-focus-within:text-indigo-400 transition-colors">Description / Vision</label>
              <textarea
                className="w-full bg-[#0b0f1a] p-8 rounded-3xl border border-slate-700 h-64 focus:border-indigo-500 outline-none transition-all font-bold text-slate-200 text-lg shadow-inner"
                value={accessoire.description || ''}
                onChange={e => setAccessoire({ ...accessoire, description: e.target.value })}
              />
            </div>

            <button type="submit" className="md:col-span-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white py-8 rounded-[3rem] font-black text-2xl transition-all shadow-[0_20px_50px_rgba(37,99,235,0.1)] hover:-translate-y-2 active:scale-95 uppercase tracking-[0.3em]">
              Confirmer les Modifications
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  )
}