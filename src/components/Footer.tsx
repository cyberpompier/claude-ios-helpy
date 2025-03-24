import { Home, User, Settings, Info, Briefcase } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <footer className="fixed bottom-0 left-0 right-0 h-[var(--footer-height)] bg-white shadow-[0_-1px_3px_rgba(0,0,0,0.1)] z-10">
      <div className="h-full flex items-center justify-around">
        <Link to="/" className="flex flex-col items-center justify-center">
          <Home size={24} color={isActive('/') ? 'var(--ios-blue)' : 'var(--ios-gray)'} />
          <span className={`text-xs mt-1 ${isActive('/') ? 'text-[var(--ios-blue)]' : 'text-[var(--ios-gray)]'}`}>Home</span>
        </Link>
        
        <Link to="/artisans" className="flex flex-col items-center justify-center">
          <Briefcase size={24} color={isActive('/artisans') ? 'var(--ios-blue)' : 'var(--ios-gray)'} />
          <span className={`text-xs mt-1 ${isActive('/artisans') ? 'text-[var(--ios-blue)]' : 'text-[var(--ios-gray)]'}`}>Artisans</span>
        </Link>
        
        <Link to="/about" className="flex flex-col items-center justify-center">
          <Info size={24} color={isActive('/about') ? 'var(--ios-blue)' : 'var(--ios-gray)'} />
          <span className={`text-xs mt-1 ${isActive('/about') ? 'text-[var(--ios-blue)]' : 'text-[var(--ios-gray)]'}`}>About</span>
        </Link>
        
        <Link to="/profile" className="flex flex-col items-center justify-center">
          <User size={24} color={isActive('/profile') ? 'var(--ios-blue)' : 'var(--ios-gray)'} />
          <span className={`text-xs mt-1 ${isActive('/profile') ? 'text-[var(--ios-blue)]' : 'text-[var(--ios-gray)]'}`}>Profile</span>
        </Link>
        
        <Link to="/settings" className="flex flex-col items-center justify-center">
          <Settings size={24} color={isActive('/settings') ? 'var(--ios-blue)' : 'var(--ios-gray)'} />
          <span className={`text-xs mt-1 ${isActive('/settings') ? 'text-[var(--ios-blue)]' : 'text-[var(--ios-gray)]'}`}>Settings</span>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
