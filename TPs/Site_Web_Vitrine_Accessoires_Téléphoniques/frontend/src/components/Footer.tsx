export default function Footer() {
  return (
    <footer className="bg-slate-950/90 px-8 py-16 border-t border-white/10 relative z-10 shadow-[0_-30px_80px_rgba(0,0,0,0.24)]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 text-slate-300">
        <div>
          <h2 className="text-2xl font-black text-cyan-300 mb-6 tracking-tighter flex items-center gap-2">
            PHONELUX
            <span className="w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(34,211,238,0.6)]" />
          </h2>
          <p className="text-slate-400 text-sm font-medium leading-relaxed mb-6">
            Une vitrine élégante pour vos accessoires, avec un style unique et une navigation fluide.
          </p>
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-500 hover:text-cyan-300 hover:bg-slate-800 transition border border-slate-800">✕</div>
            <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-500 hover:text-cyan-300 hover:bg-slate-800 transition border border-slate-800">in</div>
            <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-500 hover:text-cyan-300 hover:bg-slate-800 transition border border-slate-800">ig</div>
          </div>
        </div>
        <div>
          <h3 className="text-slate-200 font-bold mb-6 tracking-widest uppercase text-sm">Navigation</h3>
          <ul className="space-y-3 text-sm font-medium text-slate-400">
            <li><a href="/" className="hover:text-cyan-300 transition">Accueil</a></li>
            <li><a href="/accessoires/list" className="hover:text-cyan-300 transition">Accessoires</a></li>
            <li><a href="/categories/list" className="hover:text-cyan-300 transition">Catégories</a></li>
            <li><a href="/marques/list" className="hover:text-cyan-300 transition">Marques</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-slate-200 font-bold mb-6 tracking-widest uppercase text-sm">Contact</h3>
          <p className="text-slate-400 text-sm font-medium space-y-2">
            <span className="block">Email: <span className="text-cyan-300 font-semibold">contact@phonelux.io</span></span>
            <span className="block">Phone: <span className="text-cyan-300 font-semibold">+33 1 88 44 22 11</span></span>
            <span className="block">Paris, France</span>
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/10 text-center text-slate-500 text-xs font-medium">
        <p>&copy; {new Date().getFullYear()} PhoneLux Vision. Designed for the Future.</p>
      </div>
    </footer>
  )
}
