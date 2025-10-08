import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Settings, FolderSync as Sync, Palette } from 'lucide-react';

const FarragutAdmin: React.FC = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-[calc(100vh-8rem)]" role="main">
      <button 
        onClick={() => navigate('/')}
        className="flex items-center text-[#002B5B] hover:text-[#003875] mb-6 focus:outline-none focus:ring-2 focus:ring-[#002B5B] focus:ring-offset-2"
        aria-label="Go back to home page"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Home
      </button>
      
      <h1 className="text-3xl font-semibold text-gray-800 mb-8" id="main-heading">Farragut Admin Dashboard</h1>
      
      <section className="bg-white rounded-lg shadow-md p-6" aria-labelledby="main-heading">
        <p className="text-gray-600 mb-6">Welcome to the Farragut Admin Dashboard</p>
        
        <div className="space-y-6" role="region" aria-label="Configuration options">
          <h2 className="text-xl font-medium text-gray-800 mb-4">County Configuration Options</h2>
          <p className="text-gray-600 mb-6">
            Farragut Admin can onboard or configure a county by selecting it from a list and performing several actions:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" role="list">
            <article className="p-4 border border-gray-200 rounded-lg" role="listitem">
              <div className="flex items-center mb-3">
                <Palette className="w-5 h-5 text-[#002B5B] mr-2" aria-hidden="true" />
                <h3 className="text-lg font-medium text-gray-800">Personalization</h3>
              </div>
              <p className="text-gray-600">Customize county-specific elements including logos, header design, and menu items</p>
            </article>
            
            <article className="p-4 border border-gray-200 rounded-lg" role="listitem">
              <div className="flex items-center mb-3">
                <Sync className="w-5 h-5 text-[#002B5B] mr-2" aria-hidden="true" />
                <h3 className="text-lg font-medium text-gray-800">Data Synchronization</h3>
              </div>
              <p className="text-gray-600">Configure and manage data synchronization settings and schedules</p>
            </article>
            
            <article className="p-4 border border-gray-200 rounded-lg" role="listitem">
              <div className="flex items-center mb-3">
                <Settings className="w-5 h-5 text-[#002B5B] mr-2" aria-hidden="true" />
                <h3 className="text-lg font-medium text-gray-800">County Settings</h3>
              </div>
              <p className="text-gray-600">Set up and manage county-specific configurations and preferences</p>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
};

export default FarragutAdmin;