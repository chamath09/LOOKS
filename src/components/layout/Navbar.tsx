import { Link, NavLink } from 'react-router-dom';
import { Plus, Search, Menu } from 'lucide-react';
import { useState } from 'react';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'motion/react';

const CATEGORIES = ['Nails', 'Outfits', 'Streetwear', 'Accessories', 'Beauty'];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-black/5 h-[70px] flex items-center">
      <div className="w-full px-6 md:px-10 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="flex-shrink-0 flex items-center gap-2">
          <span className="text-2xl font-black tracking-[0.2em] uppercase text-ink">Looks</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {CATEGORIES.map((cat) => (
            <NavLink
              key={cat}
              to={`/category/${cat.toLowerCase()}`}
              className={({ isActive }) => clsx(
                "text-[11px] uppercase tracking-[0.1em] font-bold transition-colors pb-1 border-b border-transparent",
                isActive ? "text-ink border-ink" : "text-ink/60 hover:text-ink hover:border-ink/30"
              )}
            >
              {cat}
            </NavLink>
          ))}
          <NavLink
            to="/blog"
            className={({ isActive }) => clsx(
              "text-[11px] uppercase tracking-[0.1em] font-bold transition-colors pb-1 border-b border-transparent",
              isActive ? "text-ink border-ink" : "text-ink/60 hover:text-ink hover:border-ink/30"
            )}
          >
            Blog
          </NavLink>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button className="p-2 text-ink/60 hover:text-ink transition-colors hidden sm:block">
            <Search className="w-4 h-4" />
          </button>
          <Link
            to="/upload"
            className="inline-flex items-center justify-center bg-ink px-6 py-2 text-[10px] font-bold text-white uppercase tracking-[0.1em] hover:bg-black transition-colors"
          >
            Upload
          </Link>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 text-ink hover:text-black transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-white border-b border-stone-200"
          >
            <div className="px-4 py-4 space-y-2">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat}
                  to={`/category/${cat.toLowerCase()}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-stone-700 hover:text-stone-900 hover:bg-stone-50"
                >
                  {cat}
                </Link>
              ))}
              <Link
                to="/blog"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-stone-700 hover:text-stone-900 hover:bg-stone-50"
              >
                Blog
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
