import { useState } from 'react';
import { Moon, Bell, Lock, Globe, ChevronRight } from 'lucide-react';

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Settings</h2>
      
      <div className="ios-card">
        <h3 className="text-lg font-medium mb-3">Appearance</h3>
        
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
              <Moon size={18} color="var(--ios-gray)" />
            </div>
            <span>Dark Mode</span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer" 
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--ios-blue)]"></div>
          </label>
        </div>
      </div>
      
      <div className="ios-card">
        <h3 className="text-lg font-medium mb-3">Notifications</h3>
        
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
              <Bell size={18} color="var(--ios-gray)" />
            </div>
            <span>Push Notifications</span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer" 
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--ios-blue)]"></div>
          </label>
        </div>
      </div>
      
      <div className="ios-card">
        <h3 className="text-lg font-medium mb-3">More Settings</h3>
        
        <div className="divide-y divide-gray-100">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                <Lock size={18} color="var(--ios-gray)" />
              </div>
              <span>Privacy & Security</span>
            </div>
            <ChevronRight size={18} color="var(--ios-gray)" />
          </div>
          
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                <Globe size={18} color="var(--ios-gray)" />
              </div>
              <span>Language & Region</span>
            </div>
            <ChevronRight size={18} color="var(--ios-gray)" />
          </div>
        </div>
      </div>
      
      <div className="ios-card">
        <button className="w-full py-2 text-[var(--ios-blue)] font-medium">
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Settings;
