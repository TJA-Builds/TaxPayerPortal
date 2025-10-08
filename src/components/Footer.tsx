import React from 'react';
import { Phone, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 text-gray-600 py-3 fixed bottom-0 left-0 right-0 z-30 print-hide" role="contentinfo">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-xs whitespace-nowrap">
              <Phone size={14} aria-hidden="true" />
              <span>(555) 444-5555</span>
            </div>
            <div className="flex items-center gap-2 text-xs whitespace-nowrap">
              <Mail size={14} aria-hidden="true" />
              <span>tax@abc.nc.gov</span>
            </div>
          </div>
          <nav className="flex items-center gap-4 text-xs" role="navigation" aria-label="Footer navigation">
            <a href="#" className="hover:text-[#002B5B] focus:outline-none focus:ring-2 focus:ring-[#002B5B] focus:ring-offset-2">Privacy</a>
            <a href="#" className="hover:text-[#002B5B] focus:outline-none focus:ring-2 focus:ring-[#002B5B] focus:ring-offset-2">Terms</a>
            <a href="#" className="hover:text-[#002B5B] focus:outline-none focus:ring-2 focus:ring-[#002B5B] focus:ring-offset-2">Help</a>
            <span>&copy; 2024 County Tax Office</span>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;