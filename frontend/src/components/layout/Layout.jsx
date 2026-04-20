import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import BottomNav from './BottomNav';
import Footer from './Footer';

export default function Layout({ title }) {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar title={title} />
      <main className="flex-1 pt-14 pb-20">
        <Outlet />
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
}
