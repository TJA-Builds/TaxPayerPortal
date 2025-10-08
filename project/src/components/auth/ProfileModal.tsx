import React, { useState } from 'react';
import { X } from 'lucide-react';
import { User } from '../../types/auth';
import { auth } from '../../lib/supabaseClient';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose, user }) => {
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length === 0) return value;
    if (numbers.length <= 3) return `(${numbers}`;
    if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatPhoneNumber(e.target.value);
    setPhone(formattedValue);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!firstName.trim() || !lastName.trim()) {
      setError('Please fill in all required fields');
      return;
    }

    if (phone && !/^\(\d{3}\) \d{3}-\d{4}$/.test(phone)) {
      setError('Please enter a valid phone number');
      return;
    }

    setLoading(true);

    try {
      // In a real app, this would call an API to update the profile
      console.log('Profile updated successfully');
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-semibold mb-2 text-gray-900">Profile Settings</h2>
        <p className="text-gray-600 mb-6">Update your personal information</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              First Name
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-sm text-gray-900"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Last Name
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-sm text-gray-900"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              disabled
              className="w-full px-3 py-2 border rounded-lg text-sm bg-gray-50 text-gray-600"
            />
            <p className="text-xs text-gray-500 mt-1">Email address cannot be changed</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={handlePhoneChange}
              placeholder="(123) 456-7890"
              className="w-full px-3 py-2 border rounded-lg text-sm text-gray-900"
            />
            <p className="text-xs text-gray-500 mt-1">Format: (123) 456-7890</p>
          </div>

          {error && (
            <p className="text-red-600 text-sm">{error}</p>
          )}

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm bg-[#002B5B] text-white rounded-lg hover:bg-[#003875] disabled:opacity-50"
            >
              {loading ? 'Saving Changes...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileModal;