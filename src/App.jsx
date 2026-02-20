import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Sidebar from './components/Sidebar';
import ThreeBackground from './components/ThreeBackground';
import Analytics from './pages/Analytics';
import Crypto from './pages/Crypto';
import SocialMedia from './pages/SocialMedia';
import AdminPanel from './pages/AdminPanel';
import './index.css';

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ThreeBackground />
        <div className="app-layout" style={{ position: 'relative', zIndex: 1 }}>
          <Sidebar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Analytics />} />
              <Route path="/crypto" element={<Crypto />} />
              <Route path="/social" element={<SocialMedia />} />
              <Route path="/admin" element={<AdminPanel />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}
