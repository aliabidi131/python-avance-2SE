import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Navbar() {
  const router = useRouter()
  
  const isActive = (path: string) => router.pathname.startsWith(path) ? 'text-cyan-300 font-semibold' : 'text-slate-300'

  return (
    <nav className="fixed w-full top-0 left-0 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/70 px-8 py-4 z-[100] transition-all shadow-[0_12px_30px_rgba(0,0,0,0.25)]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <Link href="/" className="text-2xl font-black text-cyan-300 tracking-tight hover:text-cyan-200 transition-colors flex items-center gap-2">
          PHONELUX
          <span className="w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_16px_rgba(56,189,248,0.7)]"></span>
        </Link>

        <ul className="flex flex-wrap justify-center gap-8 font-medium text-sm uppercase tracking-[0.2em]">
          <li>
            <Link href="/" className={`transition-colors duration-300 ${router.pathname === '/' ? 'text-cyan-300' : 'text-slate-400 hover:text-cyan-200'}`}>
              Accueil
            </Link>
          </li>
          <li>
            <Link href="/accessoires/list" className={`transition-colors duration-300 ${isActive('/accessoires') ? 'text-cyan-300' : 'text-slate-400 hover:text-cyan-200'}`}>
              Accessoires
            </Link>
          </li>
          <li>
            <Link href="/categories/list" className={`transition-colors duration-300 ${isActive('/categories') ? 'text-cyan-300' : 'text-slate-400 hover:text-cyan-200'}`}>
              Catégories
            </Link>
          </li>
          <li>
            <Link href="/marques/list" className={`transition-colors duration-300 ${isActive('/marques') ? 'text-cyan-300' : 'text-slate-400 hover:text-cyan-200'}`}>
              Marques
            </Link>
          </li>
        </ul>

        <div>
          <button className="bg-cyan-500/10 text-cyan-200 px-5 py-2 rounded-full border border-cyan-500/20 text-xs font-bold hover:bg-cyan-500/15 hover:text-white transition-all uppercase tracking-[0.2em] shadow-sm shadow-cyan-500/10">
            ADMIN PANEL
          </button>
        </div>
      </div>
    </nav>
  )
}
