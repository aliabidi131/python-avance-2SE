import type { FormEvent } from 'react'
import { useState, useEffect } from 'react'
import { createAccessoire, fetchCategories, fetchMarques } from '@/services/api'
import { useRouter } from 'next/router'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function AddAccessoire() {
  const [nom, setNom] = useState('')
  const [prix, setPrix] = useState(0)
  const [description, setDescription] = useState('')
  const [type, setType] = useState('')
  const [stock, setStock] = useState(0)
  const [imageUrl, setImageUrl] = useState('')
  const [categorieId, setCategorieId] = useState('')
  const [marqueId, setMarqueId] = useState('')

  const [categories, setCategories] = useState<any[]>([])
  const [marques, setMarques] = useState<any[]>([])
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    fetchCategories().then(setCategories).catch(err => setError(err.message))
    fetchMarques().then(setMarques).catch(err => setError(err.message))
  }, [])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const data = {
        nom,
        prix: Number(prix),
        description,
        type,
        stock: Number(stock),
        imageUrl,
        categorie: categorieId ? { id: Number(categorieId) } : null,
        marque: marqueId ? { id: Number(marqueId) } : null
      }
      await createAccessoire(data)
      router.push('/accessoires/list')
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <div className="page-shell min-h-screen text-slate-200">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-20">
        <header className="mb-16">
          <Link href="/accessoires/list" className="text-indigo-400 font-black hover:underline mb-4 inline-block tracking-widest text-[10px] uppercase">
            ← RETOUR A L'INVENTAIRE
          </Link>
          <h1 className="text-6xl font-black text-white uppercase tracking-tighter">Nouveau Produit</h1>
          <p className="text-slate-500 font-medium mt-4 text-xl tracking-tight leading-relaxed">Définissez les caractéristiques de votre prochain succès commercial.</p>
        </header>

        {error && (
          <div className="bg-rose-500/10 border border-rose-500/50 p-8 rounded-[3rem] mb-12 text-rose-400 font-black shadow-2xl backdrop-blur-xl">
             <div className="flex items-center gap-4">
                <span className="text-2xl">⚡</span>
                <p>{error}</p>
             </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-slate-900/40 border border-slate-800 p-16 rounded-[4rem] shadow-[0_0_80px_rgba(0,0,0,0.5)] backdrop-blur-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="md:col-span-2 group">
              <label className="block text-[10px] font-black text-slate-700 uppercase tracking-[0.3em] mb-4 group-focus-within:text-indigo-400 transition-colors">Nom de l'Article</label>
              <input
                type="text"
                className="w-full bg-[#0b0f1a] p-6 rounded-3xl border border-slate-700 focus:border-indigo-500 focus:ring-8 focus:ring-indigo-500/5 outline-none transition-all font-black text-2xl text-white placeholder:text-slate-800"
                placeholder="ex: PHONE LUXE CASE - TITANIUM WHITE"
                value={nom}
                onChange={e => setNom(e.target.value)}
                required
              />
            </div>

            <div className="group">
              <label className="block text-[10px] font-black text-slate-700 uppercase tracking-[0.3em] mb-4 group-focus-within:text-indigo-400 transition-colors">Prix de Vente (€)</label>
              <input
                type="number"
                step="0.01"
                className="w-full bg-[#0b0f1a] p-6 rounded-3xl border border-slate-700 focus:border-indigo-500 outline-none transition-all font-black text-xl text-white"
                value={prix}
                onChange={e => setPrix(Number(e.target.value))}
                required
              />
            </div>

            <div className="group">
              <label className="block text-[10px] font-black text-slate-700 uppercase tracking-[0.3em] mb-4 group-focus-within:text-indigo-400 transition-colors">Stock Initial</label>
              <input
                type="number"
                className="w-full bg-[#0b0f1a] p-6 rounded-3xl border border-slate-700 focus:border-indigo-500 outline-none transition-all font-black text-xl text-white"
                value={stock}
                onChange={e => setStock(Number(e.target.value))}
                required
              />
            </div>

            <div className="group">
               <label className="block text-[10px] font-black text-slate-700 uppercase tracking-[0.3em] mb-4 group-focus-within:text-indigo-400 transition-colors">Catégorie</label>
               <select
                  className="w-full bg-[#0b0f1a] p-6 rounded-3xl border border-slate-700 focus:border-indigo-500 outline-none transition-all font-black text-lg text-white appearance-none cursor-pointer"
                  value={categorieId}
                  onChange={e => setCategorieId(e.target.value)}
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
                  value={marqueId}
                  onChange={e => setMarqueId(e.target.value)}
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
                placeholder="ex: COQUE SILICONE / PROTECTION ÉCRAN"
                className="w-full bg-[#0b0f1a] p-6 rounded-3xl border border-slate-700 focus:border-indigo-500 outline-none transition-all font-black text-lg text-white placeholder:text-slate-800"
                value={type}
                onChange={e => setType(e.target.value)}
              />
            </div>

            <div className="md:col-span-2 group">
              <label className="block text-[10px] font-black text-slate-700 uppercase tracking-[0.3em] mb-4 group-focus-within:text-indigo-400 transition-colors">URL de l'Image</label>
              <input
                type="text"
                className="w-full bg-[#0b0f1a] p-6 rounded-3xl border border-slate-700 focus:border-indigo-500 outline-none transition-all font-bold text-slate-200 placeholder:text-slate-800"
                placeholder="https://images.unsplash.com/..."
                value={imageUrl}
                onChange={e => setImageUrl(e.target.value)}
              />
            </div>

            <div className="md:col-span-2 group">
              <label className="block text-[10px] font-black text-slate-700 uppercase tracking-[0.3em] mb-4 group-focus-within:text-indigo-400 transition-colors">Vision Stratégique / Description</label>
              <textarea
                className="w-full bg-[#0b0f1a] p-8 rounded-3xl border border-slate-700 h-64 focus:border-indigo-500 outline-none transition-all font-bold text-slate-200 text-lg shadow-inner"
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </div>

            <button type="submit" className="md:col-span-2 bg-white hover:bg-slate-200 text-black py-8 rounded-[2.5rem] font-black text-2xl transition-all shadow-[0_25px_50px_rgba(255,255,255,0.05)] hover:-translate-y-2 active:scale-95 uppercase tracking-[0.3em]">
              Générer le Produit
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  )
}