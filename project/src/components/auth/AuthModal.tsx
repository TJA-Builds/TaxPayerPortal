import React, { useState, useEffect } from 'react';
import { X, Eye, EyeOff, Mail, Phone, ArrowLeft } from 'lucide-react';
import { auth } from '../../lib/supabaseClient';
import { useLocation, useNavigate } from 'react-router-dom';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'signin' | 'signup';
}

interface SignUpForm {
  firstName: string;
  lastName: string;
  emailOrPhone: string;
  password: string;
  confirmPassword: string;
  smsNotifications: boolean;
  termsAccepted: boolean;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, mode: initialMode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mode, setMode] = useState(initialMode);
  const [emailOrPhone, setEmailOrPhone] = useState('demo@example.com');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetMethod, setResetMethod] = useState<'email' | 'phone'>('email');
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [resetPhoneSent, setResetPhoneSent] = useState(false);

  const [signUpForm, setSignUpForm] = useState<SignUpForm>({
    firstName: '',
    lastName: '',
    emailOrPhone: '',
    password: '',
    confirmPassword: '',
    smsNotifications: false,
    termsAccepted: false
  });

  useEffect(() => {
    if (mode === 'signin') {
      setEmailOrPhone('demo@example.com');
      setPassword('demo1234');
    } else {
      setEmailOrPhone('');
      setPassword('');
      setSignUpForm({
        firstName: '',
        lastName: '',
        emailOrPhone: '',
        password: '',
        confirmPassword: '',
        smsNotifications: false,
        termsAccepted: false
      });
    }
  }, [mode, isOpen]);

  const validateInput = (input: string, type: 'email' | 'phone' | 'both') => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;

    if (type === 'email') return emailRegex.test(input);
    if (type === 'phone') return phoneRegex.test(input);
    return emailRegex.test(input) || phoneRegex.test(input);
  };

  const isPhoneNumber = (value: string) => {
    return /^\(\d{3}\) \d{3}-\d{4}$/.test(value);
  };

  const formatPhoneNumber = (value: string) => {
    if (value.includes('@')) return value;
    const numbers = value.replace(/\D/g, '');
    if (numbers.length === 0) return value;
    if (numbers.length <= 3) return `(${numbers}`;
    if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
  };

  const handleEmailOrPhoneInput = (e: React.ChangeEvent<HTMLInputElement>, isSignUp = false) => {
    const value = e.target.value;
    const formattedValue = value.includes('@') || !value ? value : formatPhoneNumber(value);
    
    if (isSignUp) {
      setSignUpForm(prev => ({ ...prev, emailOrPhone: formattedValue }));
    } else {
      setEmailOrPhone(formattedValue);
    }
  };

  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!signUpForm.firstName.trim() || !signUpForm.lastName.trim()) {
      setError('Please enter your first and last name');
      return;
    }

    if (!validateInput(signUpForm.emailOrPhone, 'both')) {
      setError('Please enter a valid email or phone number');
      return;
    }

    if (signUpForm.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    if (signUpForm.password !== signUpForm.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!signUpForm.termsAccepted) {
      setError('Please accept the Terms of Service and Privacy Policy');
      return;
    }

    setLoading(true);

    try {
      const { error: signUpError } = await auth.signUp({
        email: signUpForm.emailOrPhone,
        password: signUpForm.password,
        options: {
          data: {
            firstName: signUpForm.firstName,
            lastName: signUpForm.lastName,
            notificationPreferences: {
              smsNotifications: signUpForm.smsNotifications
            }
          }
        }
      });

      if (signUpError) throw signUpError;

      setMode('signin');
      setEmailOrPhone(signUpForm.emailOrPhone);
      setPassword('');
      
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateInput(emailOrPhone, 'both')) {
      setError('Please enter a valid email or phone number');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    setLoading(true);

    try {
      const { error: signInError } = await auth.signInWithPassword({
        email: emailOrPhone,
        password
      });

      if (signInError) throw signInError;

      // Check if the current path is one of the protected routes
      const protectedRoutes = [
        '/taxpayer-apps/bill-search',
        '/taxpayer-apps/payment',
        '/taxpayer-apps/reports',
        '/taxpayer-apps/bill'
      ];
      
      const isProtectedRoute = protectedRoutes.some(route => 
        location.pathname.startsWith(route)
      );

      onClose();

      if (!isProtectedRoute) {
        navigate('/');
      }
      
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (resetMethod === 'email' && !validateInput(emailOrPhone, 'email')) {
      setError('Please enter a valid email address');
      return;
    }

    if (resetMethod === 'phone' && !validateInput(emailOrPhone, 'phone')) {
      setError('Please enter a valid phone number');
      return;
    }

    if (resetMethod === 'email') {
      setResetEmailSent(true);
    } else {
      setResetPhoneSent(true);
    }
  };

  const handleResendReset = () => {
    setResetEmailSent(false);
    setResetPhoneSent(false);
  };

  const handleSocialLogin = async (provider: 'google' | 'facebook') => {
    setError(null);
    setLoading(true);

    try {
      const { error } = await auth.signInWithSocial(provider);
      if (error) throw error;

      const protectedRoutes = [
        '/taxpayer-apps/bill-search',
        '/taxpayer-apps/payment',
        '/taxpayer-apps/reports',
        '/taxpayer-apps/bill'
      ];
      
      const isProtectedRoute = protectedRoutes.some(route => 
        location.pathname.startsWith(route)
      );

      onClose();

      if (!isProtectedRoute) {
        navigate('/');
      }
      
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  if (showForgotPassword) {
    if (resetEmailSent || resetPhoneSent) {
      return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
            <button
              onClick={() => {
                setShowForgotPassword(false);
                setResetEmailSent(false);
                setResetPhoneSent(false);
                setError(null);
              }}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center">
              <div className="mb-4 text-blue-600">
                {resetMethod === 'email' ? (
                  <Mail className="w-16 h-16 mx-auto" />
                ) : (
                  <Phone className="w-16 h-16 mx-auto" />
                )}
              </div>
              <h3 className="text-xl font-medium mb-2 text-gray-900">
                Check your {resetMethod}
              </h3>
              <p className="text-gray-900 mb-4">
                We have sent a {resetMethod === 'email' ? 'password reset link' : 'verification code'} to<br />
                <span className="font-medium">{emailOrPhone}</span>
              </p>
              <div className="space-y-2">
                <button
                  onClick={() => {
                    setShowForgotPassword(false);
                    setResetEmailSent(false);
                    setResetPhoneSent(false);
                  }}
                  className="w-full bg-[#002B5B] text-white py-2 rounded-lg hover:bg-[#003875]"
                >
                  Close
                </button>
                <button
                  onClick={handleResendReset}
                  className="text-sm text-[#002B5B] hover:text-[#003875]"
                >
                  Didn't receive the {resetMethod === 'email' ? 'email' : 'code'}? Click to resend
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
          <button
            onClick={() => {
              setShowForgotPassword(false);
              setResetEmailSent(false);
              setResetPhoneSent(false);
              setError(null);
            }}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-6">
            <button
              onClick={() => {
                setShowForgotPassword(false);
                setResetMethod('email');
              }}
              className="flex items-center text-[#002B5B] hover:text-[#003875]"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to login
            </button>
          </div>

          <h2 className="text-2xl font-semibold mb-2 text-gray-900">Forgot Password?</h2>
          <p className="text-gray-900 mb-6">Select how you want to reset your password.</p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <button
              onClick={() => {
                setResetMethod('email');
                setEmailOrPhone('');
                setError(null);
              }}
              className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 ${
                resetMethod === 'email'
                  ? 'border-[#002B5B] bg-blue-50'
                  : 'border-gray-200 hover:border-[#002B5B]'
              }`}
            >
              <Mail className={`w-6 h-6 ${resetMethod === 'email' ? 'text-[#002B5B]' : 'text-gray-400'}`} />
              <span className={`mt-2 ${resetMethod === 'email' ? 'text-[#002B5B]' : 'text-gray-600'}`}>Email</span>
            </button>
            <button
              onClick={() => {
                setResetMethod('phone');
                setEmailOrPhone('(191) 433-2345');
                setError(null);
              }}
              className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 ${
                resetMethod === 'phone'
                  ? 'border-[#002B5B] bg-blue-50'
                  : 'border-gray-200 hover:border-[#002B5B]'
              }`}
            >
              <Phone className={`w-6 h-6 ${resetMethod === 'phone' ? 'text-[#002B5B]' : 'text-gray-400'}`} />
              <span className={`mt-2 ${resetMethod === 'phone' ? 'text-[#002B5B]' : 'text-gray-600'}`}>Phone</span>
            </button>
          </div>

          <form onSubmit={handleForgotPassword}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-900 mb-1">
                {resetMethod === 'email' ? 'Email Address' : 'Phone Number'}
              </label>
              <input
                type={resetMethod === 'email' ? 'email' : 'tel'}
                value={emailOrPhone}
                onChange={resetMethod === 'phone' ? handleEmailOrPhoneInput : (e) => setEmailOrPhone(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg text-sm text-gray-900"
                placeholder={resetMethod === 'email' ? 'Enter your email' : 'Enter your phone number'}
                required
              />
            </div>

            {error && (
              <p className="text-red-600 text-sm mb-4">{error}</p>
            )}

            <button
              type="submit"
              className="w-full bg-[#002B5B] text-white py-2 rounded-lg hover:bg-[#003875] transition-colors"
            >
              {resetMethod === 'email' ? 'Send Reset Link' : 'Send Verification Code'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (mode === 'signup') {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>

          <h2 className="text-2xl font-semibold mb-2 text-gray-900">Create an Account</h2>
          <p className="text-sm text-gray-900 mb-6">
            If you are a new user, please create an account first.
          </p>

          <form onSubmit={handleSignUpSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  value={signUpForm.firstName}
                  onChange={(e) => setSignUpForm(prev => ({ ...prev, firstName: e.target.value }))}
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
                  value={signUpForm.lastName}
                  onChange={(e) => setSignUpForm(prev => ({ ...prev, lastName: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg text-sm text-gray-900"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Email or Phone
              </label>
              <input
                type="text"
                value={signUpForm.emailOrPhone}
                onChange={(e) => handleEmailOrPhoneInput(e, true)}
                className="w-full px-3 py-2 border rounded-lg text-sm text-gray-900"
                placeholder="Enter your email or phone"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={signUpForm.password}
                  onChange={(e) => setSignUpForm(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg text-sm text-gray-900 pr-10"
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-600 mt-1">Must be at least 8 characters long</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={signUpForm.confirmPassword}
                  onChange={(e) => setSignUpForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg text-sm text-gray-900 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {isPhoneNumber(signUpForm.emailOrPhone) && (
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={signUpForm.smsNotifications}
                    onChange={(e) => setSignUpForm(prev => ({ ...prev, smsNotifications: e.target.checked }))}
                    className="rounded border-gray-300 text-[#002B5B] focus:ring-[#002B5B] mr-2"
                  />
                  <span className="text-sm text-gray-900">I agree to receive SMS notifications and updates</span>
                </label>
              )}

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={signUpForm.termsAccepted}
                  onChange={(e) => setSignUpForm(prev => ({ ...prev, termsAccepted: e.target.checked }))}
                  className="rounded border-gray-300 text-[#002B5B] focus:ring-[#002B5B] mr-2"
                />
                <span className="text-sm text-gray-900">
                  I agree to the{' '}
                  <a href="#" className="text-[#002B5B] hover:underline">Terms of Service</a>
                  {' '}and{' '}
                  <a href="#" className="text-[#002B5B] hover:underline">Privacy Policy</a>
                </span>
              </label>
            </div>

            {error && (
              <p className="text-red-600 text-sm">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#002B5B] text-white py-2 rounded-lg hover:bg-[#003875] transition-colors disabled:opacity-50"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>

            <div className="text-center text-sm">
              <p className="text-gray-600">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setMode('signin')}
                  className="text-[#002B5B] hover:text-[#003875]"
                >
                  Sign In
                </button>
              </p>
            </div>

            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>Important:</strong> After submitting this form, you will receive a verification code via email or Phone. Please enter this code to confirm your identity and complete your account creation. Your account will only be activated after successful verification.
              </p>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-semibold mb-6 text-gray-900">
          Login to your Account
        </h2>

        <div className="space-y-4">
          <button
            onClick={() => handleSocialLogin('google')}
            className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg px-4 py-2.5 hover:bg-gray-50 relative"
          >
            <img 
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
              alt="Google" 
              className="w-5 h-5 absolute left-4"
            />
            <span className="text-gray-700">Continue with Google</span>
          </button>

          <button
            onClick={() => handleSocialLogin('facebook')}
            className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg px-4 py-2.5 hover:bg-gray-50 relative"
          >
            <img 
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/facebook.svg" 
              alt="Facebook" 
              className="w-5 h-5 absolute left-4"
            />
            <span className="text-gray-700">Continue with Facebook</span>
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Email or Phone
              </label>
              <input
                type="text"
                value={emailOrPhone}
                onChange={handleEmailOrPhoneInput}
                className="w-full px-3 py-2 border rounded-lg text-sm text-gray-900"
                placeholder="Enter your email or phone"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg text-sm text-gray-900 pr-10"
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              
              <div className="flex items-center justify-between text-sm mt-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-gray-300 text-[#002B5B] focus:ring-[#002B5B] mr-2"
                  />
                  <span className="text-gray-700">Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-[#002B5B] hover:text-[#003875]"
                >
                  Forgot Password?
                </button>
              </div>
            </div>

            {error && (
              <p className="text-red-600 text-sm">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#002B5B] text-white py-2 rounded-lg hover:bg-[#003875] transition-colors disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>

            <div className="text-center text-sm">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => setMode('signup')}
                  className="text-[#002B5B] hover:text-[#003875]"
                >
                  Sign Up
                </button>
              </p>
            </div>

            <div className="text-center text-sm text-gray-600">
              <p>Demo credentials are pre-filled</p>
              <p>Just click Sign In to continue</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;