import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const SystemRequirements: React.FC = () => {
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

      <section className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4" id="main-heading">System Requirements</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" role="list" aria-labelledby="main-heading">
          <section className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">UI/UX Functionality</h2>
            <ul className="list-disc pl-4 space-y-1 text-sm text-gray-600">
              <li>Multi-select rows with bulk actions, Advanced filtering with multiple criteria</li>
              <li>Column sorting (single and multi-column), Save and load custom query presets</li>
              <li>Customizable column visibility</li>
              <li>Export functionality (CSV, Excel)</li>
              <li>ADA Compliance</li>
              <li>Mobile Responsiveness & Touch Support</li>
              <li>Personalization (Logos, Themes, Header, Footer)</li>
            </ul>
          </section>

          <section className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">License</h2>
            <p className="text-gray-600">TBD</p>
          </section>

          <section className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Single Sign-On</h2>
            <p className="text-sm text-gray-600">Must support SSO for staff users</p>
          </section>

          <section className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">System Technology</h2>
            <p className="text-sm text-gray-600">Multi-Tenant Cloud Native SaaS</p>
          </section>

          <section className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Security & Sync</h2>
            <ul className="list-disc pl-4 space-y-1 text-sm text-gray-600">
              <li>Encrypt sensitive data in transit and at rest</li>
              <li>Store all data within the United States</li>
              <li>Follow Mecklenburg County security guidelines</li>
              <li>Regular data sync with backend systems</li>
            </ul>
          </section>

          <section className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Integration</h2>
            <p className="text-sm text-gray-600">Integration with deed, mapping, permit, payments, and appeals systems</p>
          </section>

          <section className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Configurations</h2>
            <p className="text-sm text-gray-600">Customer specific configurations</p>
          </section>

          <section className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Technical Support</h2>
            <p className="text-sm text-gray-600">TBD</p>
          </section>

          <section className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Additional Requirements</h2>
            <ul className="list-disc pl-4 space-y-1 text-sm text-gray-600">
              <li>Follow SaaS Application Check List</li>
              <li>Meet all security requirements</li>
              <li>Regular performance monitoring</li>
            </ul>
          </section>
        </div>
      </section>
    </main>
  );
};

export default SystemRequirements;