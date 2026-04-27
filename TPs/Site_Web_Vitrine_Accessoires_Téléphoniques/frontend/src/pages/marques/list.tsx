import { useEffect, useState } from 'react'
import { fetchMarques, deleteMarque } from '@/services/api'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function ListMarques() {
  const [marques, setMarques] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadMarques()
  }, [])

  const loadMarques = async () => {
    try {
      const data = await fetchMarques()
      setMarques(data)
    } catch (err: any) {
      setError(err?.message || 'Impossible de joindre le backend. Vérifiez que le service backend est démarré sur http://localhost:8082.')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (confirm('Voulez-vous supprimer cette marque de votre catalogue ?')) {
      try {
        await deleteMarque(id)
        setMarques(marques.filter(m => m.id !== id))
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
    <div className="bg-[#0b0f1a] min-h-screen text-slate-200 uppercase tracking-tight font-sans">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-20">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-20 text-left">
          <div className="max-w-2xl">
            <h1 className="text-8xl font-black text-white mb-6 uppercase tracking-tighter">
               Les <br/>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-400 to-orange-400">Marques.</span>
            </h1>
            <p className="text-slate-500 font-medium text-xl md:text-2xl leading-relaxed tracking-tight">
              Le prestige de votre catalogue commence avec nos partenaires. Architecture synchronisée sur Port 8082.
            </p>
          </div>
          <Link href="/marques/add">
            <button className="bg-gradient-to-br from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white px-12 py-5 rounded-[2.5rem] font-black transition-all shadow-[0_15px_40px_rgba(244,63,94,0.2)] hover:-translate-y-2 active:scale-95 text-[10px] tracking-[0.2em]">
               + AJOUTER UNE MARQUE
            </button>
          </Link>
        </header>

        {error && (
          <div className="bg-rose-500/10 border border-rose-500/50 p-10 rounded-[3rem] mb-12 flex items-center gap-6 text-rose-100 backdrop-blur-xl shadow-2xl">
            <div className="w-14 h-14 rounded-2xl bg-rose-500/20 flex items-center justify-center text-2xl">⚡</div>
            <p className="font-black text-lg uppercase tracking-tight">{error}</p>
          </div>
        )}

        <div className="grid gap-10 md:grid-cols-2">
          {marques.map(m => (
            <div key={m.id} className="group relative bg-slate-900/40 border border-slate-800 p-12 rounded-[4rem] hover:border-pink-500/30 transition-all duration-700 shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/5 blur-[100px] -z-10 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="flex justify-between items-start mb-10">
                <div className="w-24 h-24 rounded-[2rem] bg-slate-950 flex items-center justify-center text-5xl shadow-inner border border-white/5 group-hover:scale-110 transition-transform duration-700">
                  🏷️
                </div>
                <div className="flex flex-col items-end gap-4 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-500">
                  <Link href={`/marques/edit?id=${m.id}`} className="text-pink-400 font-black text-[10px] uppercase tracking-[0.3em] hover:text-pink-300">
                    Optimiser
                  </Link>
                  <button onClick={() => handleDelete(m.id)} className="text-slate-700 font-black text-[10px] uppercase tracking-[0.3em] hover:text-rose-500 transition-colors">
                    Révoquer
                  </button>
                </div>
              </div>

              <div className="text-left">
                <h3 className="text-4xl font-black text-white mb-6 uppercase tracking-tighter">{m.nom}</h3>
                <p className="text-slate-500 font-medium leading-relaxed h-24 overflow-hidden line-clamp-3 text-lg normal-case tracking-normal">
                  {m.description || "Aucun manifeste stratégique défini pour ce partenaire."}
                </p>
              </div>
              
              <div className="mt-10 pt-10 border-t border-slate-800/50 flex justify-between items-center">
                 <div className="flex gap-1.5 items-center">
                    <div className="w-2 h-2 rounded-full bg-pink-500 animate-pulse"></div>
                    <span className="text-[10px] uppercase text-pink-500/60 font-black tracking-[0.3em]">Signature Active</span>
                 </div>
                 <span className="text-[10px] uppercase text-slate-700 font-black tracking-[0.2em] italic">PhoneLux Exclusive</span>
              </div>
            </div>
          ))}
        </div>

        {marques.length === 0 && !error && (
           <div className="text-center py-60 opacity-10 grayscale">
              <div className="text-[10rem] mb-12">💎</div>
              <h2 className="text-4xl font-black text-white uppercase tracking-tighter">Partenaires en attente</h2>
              <Link href="/marques/add" className="text-rose-500 font-black hover:underline underline-offset-[16px] tracking-[0.3em] text-[10px] uppercase mt-10 block">ACTIVER LE PREMIER</Link>
           </div>
        )}
      </div>
      <Footer />
    </div>
  )
}
