import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, UserCircle, Settings, Key } from 'lucide-react';
import { auth } from '../lib/supabaseClient';
import AuthModal from './auth/AuthModal';
import ResetPasswordModal from './auth/ResetPasswordModal';
import ProfileModal from './auth/ProfileModal';
import { User } from '../types/auth';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [user, setUser] = useState<User | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    // Check for current user on mount
    const currentUser = auth.getCurrentUser();
    setUser(currentUser);

    // Listen for auth state changes
    const handleAuthChange = (event: CustomEvent) => {
      setUser(event.detail.user);
    };

    window.addEventListener('authStateChange', handleAuthChange as EventListener);

    return () => {
      window.removeEventListener('authStateChange', handleAuthChange as EventListener);
    };
  }, []);

  const handleSignOut = async () => {
    await auth.signOut();
    setUser(null);
    setShowUserMenu(false);
  };

  const handleManageSubscriptions = () => {
    navigate('/account/subscriptions');
    setShowUserMenu(false);
  };

  const handleProfile = () => {
    setShowProfileModal(true);
    setShowUserMenu(false);
  };

  const handleResetPassword = () => {
    setShowResetPasswordModal(true);
    setShowUserMenu(false);
  };

  return (
    <header className="bg-[#002B5B] text-white py-4 fixed top-0 left-0 right-0 z-50 print:bg-white print:text-black">
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <h1 
            onClick={() => navigate('/')} 
            className="text-xl font-semibold cursor-pointer hover:text-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#002B5B]"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                navigate('/');
              }
            }}
            role="button"
            aria-label="Go to home page"
          >
            Taxpayer Portal
          </h1>
          <div className="flex items-center gap-4 print-hide">
            <span className="text-xs opacity-80">County Logo</span>
            <nav className="flex items-center gap-3" role="navigation" aria-label="Main navigation">
              <a href="#" className="text-xs opacity-80 hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#002B5B]">Home</a>
              <a href="#" className="text-xs opacity-80 hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#002B5B]">Services</a>
              <a href="#" className="text-xs opacity-80 hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#002B5B]">Departments</a>
            </nav>
          </div>
        </div>
        <nav className="flex items-center gap-6 print-hide" role="navigation" aria-label="Secondary navigation">
          <a href="#" className="text-xs opacity-80 hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#002B5B]">
            About
          </a>
          <a href="#" className="text-xs opacity-80 hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#002B5B]">
            Help
          </a>
          <a href="#" className="text-xs opacity-80 hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#002B5B]">
            Contact
          </a>
          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 text-sm hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#002B5B]"
                aria-expanded={showUserMenu}
                aria-haspopup="true"
                aria-label={`User menu for ${user.firstName || user.email}`}
              >
                <UserCircle className="w-5 h-5" aria-hidden="true" />
                <span>{user.firstName || user.email}</span>
              </button>
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 text-gray-800" role="menu" aria-label="User menu">
                  <button
                    onClick={handleProfile}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                    role="menuitem"
                  >
                    <div className="flex items-center gap-2">
                      <Settings className="w-4 h-4" aria-hidden="true" />
                      Profile
                    </div>
                  </button>
                  <button
                    onClick={handleResetPassword}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                    role="menuitem"
                  >
                    <div className="flex items-center gap-2">
                      <Key className="w-4 h-4" aria-hidden="true" />
                      Reset Password
                    </div>
                  </button>
                  <button
                    onClick={handleManageSubscriptions}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 border-t focus:outline-none focus:bg-gray-100"
                    role="menuitem"
                  >
                    Manage Subscriptions
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 border-t focus:outline-none focus:bg-gray-100"
                    role="menuitem"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => {
                setAuthMode('signin');
                setShowAuthModal(true);
              }}
              className="text-sm hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#002B5B]"
              aria-label="Sign in to your account"
            >
              Sign In
            </button>
          )}
        </nav>
      </div>
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
      />
      <ResetPasswordModal
        isOpen={showResetPasswordModal}
        onClose={() => setShowResetPasswordModal(false)}
      />
      <ProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        user={user}
      />
    </header>
  );
};

export default Header;