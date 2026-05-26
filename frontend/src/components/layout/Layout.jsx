import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import BottomNav from './BottomNav';
import Footer from './Footer';
import Chatbot from '../ui/Chatbot';

export default function Layout({ title }) {
  return (
    <div className="min-h-screen bg-white flex flex-col md:bg-white md:bg-guide-lines relative">
      <Navbar title={title} />
      
      {/* Contenido principal con padding móvil, en desktop se maneja internamente */}
      <main className="flex-grow pt-14 pb-20 md:pt-0 md:pb-0 relative z-10 w-full mx-auto max-w-7xl">
        <Outlet />
      </main>

      <Footer />

      {/* Chatbot flotante con IA */}
      <Chatbot />

      <div className="md:hidden">
        <BottomNav />
      </div>
    </div>
  );
}

