import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Artisans from './pages/Artisans';
import ArtisanDetail from './pages/ArtisanDetail';

// PWA registration
import { registerSW } from 'virtual:pwa-register';

function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    // Register service worker for PWA
    const updateSW = registerSW({
      onNeedRefresh() {
        if (confirm('New content available. Reload?')) {
          updateSW(true);
        }
      },
      onOfflineReady() {
        console.log('App is ready for offline use');
      },
    });

    // Monitor online status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <Router>
      <div className="app-container">
        <Header />
        
        {!isOnline && (
          <div className="fixed top-[var(--header-height)] left-0 right-0 bg-yellow-500 text-white text-center py-1 z-20">
            You are currently offline
          </div>
        )}
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/artisans" element={<Artisans />} />
            <Route path="/artisans/:id" element={<ArtisanDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;
