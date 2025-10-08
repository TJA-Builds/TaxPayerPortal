import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText } from 'lucide-react';

function Home() {
  const navigate = useNavigate();

  return (
    <main className="min-h-[calc(100vh-8rem)]" role="main">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold text-gray-800 mb-2" id="main-heading">Welcome to Taxpayer Portal</h1>
          <button
            onClick={() => navigate('/system-requirements')}
            className="flex items-center text-sm text-[#002B5B] hover:text-[#003875] focus:outline-none focus:ring-2 focus:ring-[#002B5B] focus:ring-offset-2"
            aria-label="View system requirements"
          >
            <FileText className="w-4 h-4 mr-1" />
            System Requirements
          </button>
        </div>
        <p className="text-gray-600">A comprehensive platform for managing tax-related operations and services.</p>
      </div>
      
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6" aria-labelledby="main-heading">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <article className="p-6 h-full flex flex-col">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Farragut Admin</h3>
            <p className="text-gray-600 mb-4">
              Administrative portal for Farragut staff to manage system-wide configurations, 
              onboard new counties, and oversee platform operations.
            </p>
            <button 
              onClick={() => navigate('/farragut-admin')}
              className="w-full bg-[#002B5B] text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-[#003875] transition-colors mt-auto focus:outline-none focus:ring-2 focus:ring-[#002B5B] focus:ring-offset-2"
              aria-describedby="farragut-admin-desc"
            >
              Access Farragut Admin
            </button>
            <div id="farragut-admin-desc" className="sr-only">
              Navigate to Farragut Admin portal for system-wide administration
            </div>
          </article>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <article className="p-6 h-full flex flex-col">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">County Admin</h3>
            <p className="text-gray-600 mb-4">
              Dedicated portal for county administrators to manage local tax operations,
              configure settings, and handle county-specific requirements.
            </p>
            <button 
              onClick={() => navigate('/county-admin')}
              className="w-full bg-[#002B5B] text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-[#003875] transition-colors mt-auto focus:outline-none focus:ring-2 focus:ring-[#002B5B] focus:ring-offset-2"
              aria-describedby="county-admin-desc"
            >
              Access County Admin
            </button>
            <div id="county-admin-desc" className="sr-only">
              Navigate to County Admin portal for local tax operations management
            </div>
          </article>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <article className="p-6 h-full flex flex-col">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Taxpayer Apps</h3>
            <p className="text-gray-600 mb-4">
              Public-facing applications for taxpayers to search bills, view property information,
              and access various tax-related services.
            </p>
            <button 
              onClick={() => navigate('/taxpayer-apps')}
              className="w-full bg-[#002B5B] text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-[#003875] transition-colors mt-auto focus:outline-none focus:ring-2 focus:ring-[#002B5B] focus:ring-offset-2"
              aria-describedby="taxpayer-apps-desc"
            >
              Access Taxpayer Apps
            </button>
            <div id="taxpayer-apps-desc" className="sr-only">
              Navigate to Taxpayer Apps for bill search and tax services
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}

export default Home;