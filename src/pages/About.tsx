import { Info } from 'lucide-react';

const About = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">About</h2>
      
      <div className="ios-card">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-[var(--ios-blue)] p-4 rounded-full">
            <Info size={32} color="white" />
          </div>
        </div>
        <h3 className="text-xl font-medium text-center mb-2">iOS PWA App</h3>
        <p className="text-center text-[var(--ios-gray)]">
          Version 1.0.0
        </p>
      </div>
      
      <div className="ios-card">
        <h3 className="text-lg font-medium mb-2">Features</h3>
        <ul className="space-y-2">
          <li className="flex items-start">
            <span className="text-[var(--ios-blue)] mr-2">•</span>
            <span>Responsive design with iOS aesthetics</span>
          </li>
          <li className="flex items-start">
            <span className="text-[var(--ios-blue)] mr-2">•</span>
            <span>Fixed header with dropdown menu</span>
          </li>
          <li className="flex items-start">
            <span className="text-[var(--ios-blue)] mr-2">•</span>
            <span>Fixed footer with navigation tabs</span>
          </li>
          <li className="flex items-start">
            <span className="text-[var(--ios-blue)] mr-2">•</span>
            <span>Supabase integration for backend</span>
          </li>
          <li className="flex items-start">
            <span className="text-[var(--ios-blue)] mr-2">•</span>
            <span>Progressive Web App capabilities</span>
          </li>
        </ul>
      </div>
      
      <div className="ios-card">
        <img 
          src="https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
          alt="Mobile app development" 
          className="w-full h-48 object-cover rounded-lg mb-3"
        />
        <h3 className="text-lg font-medium">Built with modern technologies</h3>
        <p className="text-[var(--ios-gray)]">React, TypeScript, Tailwind CSS, Framer Motion, and Supabase</p>
      </div>
    </div>
  );
};

export default About;
