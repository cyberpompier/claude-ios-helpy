import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-[var(--header-height)] bg-white shadow-sm z-10 flex items-center justify-between px-4">
        <div className="flex items-center">
          <h1 className="text-lg font-semibold">iOS PWA</h1>
        </div>
        <button 
          onClick={toggleMenu}
          className="p-2 rounded-full hover:bg-gray-100"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="fixed top-[var(--header-height)] left-0 right-0 bottom-[var(--footer-height)] bg-white z-20 overflow-y-auto"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <nav className="p-4">
              <ul className="space-y-1">
                {[
                  { to: '/', label: 'Home' },
                  { to: '/artisans', label: 'Artisans' },
                  { to: '/about', label: 'About' },
                  { to: '/profile', label: 'Profile' },
                  { to: '/settings', label: 'Settings' },
                  { to: '/login', label: 'Login' },
                  { to: '/register', label: 'Register' },
                ].map((item) => (
                  <li key={item.label}>
                    <Link 
                      to={item.to} 
                      className="block py-3 px-4 rounded-lg hover:bg-[var(--ios-light-gray)] transition-colors"
                      onClick={toggleMenu}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
