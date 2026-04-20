import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-bg-soft text-ink font-sans selection:bg-accent">
      <Navbar />
      <main className="flex-1 w-full px-6 py-6" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
