import React, { useState, useEffect } from 'react';
import { GripVertical } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onWidthChange: (width: number) => void;
  width: number;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onWidthChange, width }) => {
  const [isResizing, setIsResizing] = useState(false);
  const minWidth = 50;
  const maxWidth = 300;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isResizing) {
        const newWidth = Math.min(Math.max(e.clientX, minWidth), maxWidth);
        onWidthChange(newWidth);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, onWidthChange]);

  return (
    <div 
      className={`
        bg-white border-r border-gray-200 h-[calc(100vh-8rem)] fixed left-0 top-16 
        transition-transform duration-300 z-40
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}
      style={{ width: `${width}px` }}
    >
      <nav className="p-4">
        {/* Blank sidebar as requested */}
      </nav>
      
      <div
        className={`
          absolute top-0 right-0 w-2 h-full cursor-col-resize
          hover:bg-gray-100 group flex items-center justify-center
          border-l border-gray-20
          ${isResizing ? 'bg-gray-10' : ''}
        `}
        onMouseDown={() => setIsResizing(true)}
      >
        <div className="flex items-center justify-center w-full h-12 pointer-events-none">
          <GripVertical 
            className={`
              text-gray-400 transform transition-transform
              ${isResizing ? 'scale-110' : 'group-hover:scale-110'}
            `} 
            size={5} 
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;