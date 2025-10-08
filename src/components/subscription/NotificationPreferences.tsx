import React from 'react';
import { Bell, CreditCard, Home, Megaphone } from 'lucide-react';
import { User } from '../../types/auth';
import { auth } from '../../lib/supabaseClient';

interface NotificationPreferencesProps {
  user: User;
  onUpdate: () => void;
}

const NotificationPreferences: React.FC<NotificationPreferencesProps> = ({ user, onUpdate }) => {
  const handleToggle = async (preference: keyof User['notificationPreferences']) => {
    try {
      const { error } = await auth.updateUser({
        notificationPreferences: {
          ...user.notificationPreferences,
          [preference]: !user.notificationPreferences[preference]
        }
      });

      if (error) throw error;
      onUpdate();
    } catch (err) {
      console.error('Error updating preferences:', err);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Notification Preferences</h2>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5 text-[#002B5B]" />
            <div>
              <h3 className="font-medium">Bill Updates</h3>
              <p className="text-sm text-gray-600">Receive notifications about changes to your bills</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={user.notificationPreferences.billUpdates}
              onChange={() => handleToggle('billUpdates')}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#002B5B]"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
          <div className="flex items-center gap-3">
            <CreditCard className="w-5 h-5 text-[#002B5B]" />
            <div>
              <h3 className="font-medium">Payment Reminders</h3>
              <p className="text-sm text-gray-600">Get reminded about upcoming payment due dates</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={user.notificationPreferences.paymentReminders}
              onChange={() => handleToggle('paymentReminders')}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#002B5B]"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
          <div className="flex items-center gap-3">
            <Home className="w-5 h-5 text-[#002B5B]" />
            <div>
              <h3 className="font-medium">Property Changes</h3>
              <p className="text-sm text-gray-600">Stay informed about changes to your property records</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={user.notificationPreferences.propertyChanges}
              onChange={() => handleToggle('propertyChanges')}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#002B5B]"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
          <div className="flex items-center gap-3">
            <Megaphone className="w-5 h-5 text-[#002B5B]" />
            <div>
              <h3 className="font-medium">General Announcements</h3>
              <p className="text-sm text-gray-600">Receive important announcements and updates</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={user.notificationPreferences.generalAnnouncements}
              onChange={() => handleToggle('generalAnnouncements')}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#002B5B]"></div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default NotificationPreferences;