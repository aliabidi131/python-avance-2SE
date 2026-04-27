import { useEffect, useState } from 'react'
import { fetchAccessoires, deleteAccessoire } from '@/services/api'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function ListAccessoires() {
  const [accessoires, setAccessoires] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadAccessoires()
  }, [])

  const loadAccessoires = async () => {
    try {
      const data = await fetchAccessoires()
      setAccessoires(data)
    } catch (err: any) {
      setError(err?.message || 'Impossible de joindre le backend. Vérifiez que le service backend est démarré sur http://localhost:8082.')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (confirm('Supprimer cet accessoire définitvement ?')) {
      try {
        await deleteAccessoire(id)
        setAccessoires(accessoires.filter(a => a.id !== id))
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
      <div className="max-w-7xl mx-auto px-6 py-20">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-24">
          <div className="max-w-2xl">
            <h1 className="text-7xl font-black text-white mb-6 uppercase tracking-tighter">Inventaire <span className="text-indigo-400">Flux</span></h1>
            <p className="text-slate-500 font-medium text-xl leading-relaxed tracking-tight">
               Gérez vos références haut de gamme avec une précision absolue. Architecture synchronisée PostgreSQL/Redis sur Port 8082.
            </p>
          </div>
          <Link href="/accessoires/add">
            <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-12 py-5 rounded-2xl font-black transition-all shadow-[0_20px_40px_rgba(79,70,229,0.2)] hover:-translate-y-2 active:scale-95 text-xs tracking-[0.2em]">
               + NOUVEL ARTICLE
            </button>
          </Link>
        </header>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 p-10 rounded-[3rem] mb-16 flex items-center gap-8 text-red-100 backdrop-blur-3xl shadow-2xl">
            <div className="w-16 h-16 rounded-3xl bg-red-500/20 flex items-center justify-center text-3xl">⚠️</div>
            <div>
              <p className="font-black text-xs uppercase tracking-widest opacity-50 mb-1">Rapport d'incident système</p>
              <p className="font-bold text-xl">{error}</p>
            </div>
          </div>
        )}

        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {accessoires.map(a => (
            <div key={a.id} className="group bg-slate-900/40 border border-slate-800/50 p-3 rounded-[3.5rem] hover:border-indigo-500/40 transition-all duration-700 shadow-[0_0_50px_rgba(0,0,0,0.3)] backdrop-blur-sm">
              <div className="h-80 bg-[#0b1324]/50 rounded-[3rem] flex items-center justify-center p-12 overflow-hidden mb-8 relative">
                <div className="absolute inset-0 bg-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity blur-[100px]"></div>
                {a.imageUrl ? (
                  <img src={a.imageUrl} alt={a.nom} className="max-h-full object-contain filter drop-shadow-[0_30px_50px_rgba(0,0,0,0.7)] group-hover:scale-110 transition-transform duration-700" />
                ) : (
                  <div className="text-9xl opacity-5 filter grayscale group-hover:opacity-20 transition-opacity duration-700">📱</div>
                )}
              </div>
              
              <div className="p-8 pt-0">
                <div className="flex justify-between items-start mb-8">
                  <h3 className="font-black text-2xl text-white truncate max-w-[75%] tracking-tighter" title={a.nom}>{a.nom}</h3>
                  <div className="bg-white/5 border border-white/10 text-white px-4 py-2 rounded-2xl text-sm font-black shadow-inner">
                    {a.prix}€
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-6 mb-10 text-[10px] font-black tracking-[0.3em] text-slate-600">
                  <div className="flex flex-col gap-2">
                     <span className="opacity-30">UNIVERS</span>
                     <span className="text-slate-400 bg-slate-800/50 px-3 py-1.5 rounded-lg truncate">{a.categorie?.nom || "—"}</span>
                  </div>
                  <div className="flex flex-col gap-2">
                     <span className="opacity-30">SIGNATURE</span>
                     <span className="text-slate-400 bg-slate-800/50 px-3 py-1.5 rounded-lg truncate">{a.marque?.nom || "—"}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-8 border-t border-slate-800/50 mb-10">
                   <div className="flex flex-col">
                      <span className="text-[9px] font-black text-slate-700 tracking-widest uppercase mb-1">Stock Flux</span>
                      <span className={`text-2xl font-black ${a.stock > 0 ? 'text-emerald-400' : 'text-rose-500'} tracking-tighter`}>{a.stock} UNITES</span>
                   </div>
                   <div className="text-right">
                      <span className="text-[9px] font-black text-slate-700 tracking-widest uppercase mb-1">Architecture</span>
                      <span className="text-sm font-bold text-slate-400 uppercase tracking-tighter block">{a.type || "MASTER"}</span>
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Link href={`/accessoires/edit/${a.id}`}>
                    <button className="w-full bg-slate-800 hover:bg-slate-700 text-white py-5 rounded-[1.5rem] font-black transition-all uppercase tracking-[0.2em] text-[10px] border border-white/5 shadow-xl hover:-translate-y-1 active:scale-95">
                      OPTIMISER
                    </button>
                  </Link>
                  <button onClick={() => handleDelete(a.id)} className="w-full bg-rose-500/5 hover:bg-rose-500/10 text-rose-500/40 hover:text-rose-500 py-5 rounded-[1.5rem] font-black transition-all border border-rose-500/10 text-[10px] tracking-[0.2em] active:scale-95 uppercase">
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {accessoires.length === 0 && !error && (
          <div className="text-center py-60 border-2 border-dashed border-slate-800/50 rounded-[5rem] bg-indigo-500/[0.02]">
            <div className="text-9xl mb-12 grayscale opacity-10">📂</div>
            <h2 className="text-4xl font-black text-slate-800 mb-8 tracking-tighter uppercase">Initialisation requise</h2>
            <Link href="/accessoires/add">
               <button className="text-indigo-500 font-black hover:text-indigo-400 underline underline-offset-[16px] tracking-[0.3em] text-[11px] uppercase transition-all">Connecter le premier asset</button>
            </Link>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}