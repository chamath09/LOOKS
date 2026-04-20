import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="w-full bg-white border-t border-black/5 mt-auto">
      <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-10 min-h-[40px] py-4 md:py-0 text-[10px] text-muted tracking-wide gap-4 uppercase font-bold">
        <div>© {new Date().getFullYear()} LOOKS FASHION. ALL RIGHTS RESERVED.</div>
        
        <div className="flex gap-6">
          <a href="#" className="hover:text-ink transition-colors">Pinterest</a>
          <a href="#" className="hover:text-ink transition-colors">Instagram</a>
          <a href="#" className="hover:text-ink transition-colors">TikTok</a>
        </div>
      </div>
    </footer>
  );
}
