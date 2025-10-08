import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import NotificationPreferences from '../components/subscription/NotificationPreferences';
import { auth } from '../lib/supabaseClient';
import { User } from '../types/auth';

const SubscriptionManagement: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const currentUser = auth.getCurrentUser();
    if (!currentUser) {
      navigate('/');
      return;
    }
    setUser(currentUser);
  }, [navigate]);

  const handlePreferencesUpdate = () => {
    const updatedUser = auth.getCurrentUser();
    setUser(updatedUser);
  };

  if (!user) return null;

  return (
    <div className="min-h-[calc(100vh-8rem)]">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-[#002B5B] hover:text-[#003875] mb-6"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back
      </button>

      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Subscription Management</h1>
      
      <NotificationPreferences 
        user={user}
        onUpdate={handlePreferencesUpdate}
      />
    </div>
  );
};

export default SubscriptionManagement;