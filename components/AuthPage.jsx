import React, { useState } from 'react';
import { registerBiometric } from '../utils/biometricAuth';

export default function AuthPage({ onLogin }) {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [useBiometric, setUseBiometric] = useState(false);
  const [showPasswordReset, setShowPasswordReset] = useState(false);
  const [resetUsername, setResetUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [resetError, setResetError] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);
  const [showBiometricSetup, setShowBiometricSetup] = useState(false);
  const [biometricUsername, setBiometricUsername] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.username || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    if (isSignup) {
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters');
        return;
      }

      // Check if username already exists
      const users = JSON.parse(localStorage.getItem('fitnessUsers') || '{}');
      if (users[formData.username]) {
        setError('Username already exists');
        return;
      }

      // Create new user
      users[formData.username] = {
        email: formData.email || '',
        password: formData.password, // In production, this should be hashed
        createdAt: new Date().toISOString()
      };
      localStorage.setItem('fitnessUsers', JSON.stringify(users));
      localStorage.setItem('lastLoggedInUser', formData.username);
      
      // Offer biometric setup after successful signup
      if (window.PublicKeyCredential) {
        setBiometricUsername(formData.username);
        setShowBiometricSetup(true);
      } else {
        // If biometric not supported, just log in
        onLogin(formData.username);
      }
    } else {
      // Login
      const users = JSON.parse(localStorage.getItem('fitnessUsers') || '{}');
      const user = users[formData.username];
      
      if (!user || user.password !== formData.password) {
        setError('Invalid username or password');
        return;
      }
      
      localStorage.setItem('lastLoggedInUser', formData.username);
      
      // Check if biometric is already set up, if not offer to set it up
      const hasBiometric = localStorage.getItem(`biometric_${formData.username}`);
      if (!hasBiometric && window.PublicKeyCredential) {
        setBiometricUsername(formData.username);
        setShowBiometricSetup(true);
      } else {
        onLogin(formData.username);
      }
    }
  };

  const handlePasswordReset = (e) => {
    e.preventDefault();
    setResetError('');
    
    if (!resetUsername) {
      setResetError('Please enter your username');
      return;
    }
    
    if (!newPassword || !confirmNewPassword) {
      setResetError('Please enter and confirm your new password');
      return;
    }
    
    if (newPassword !== confirmNewPassword) {
      setResetError('Passwords do not match');
      return;
    }
    
    if (newPassword.length < 6) {
      setResetError('Password must be at least 6 characters');
      return;
    }
    
    // Check if user exists
    const users = JSON.parse(localStorage.getItem('fitnessUsers') || '{}');
    if (!users[resetUsername]) {
      setResetError('Username not found');
      return;
    }
    
    // Update password
    users[resetUsername].password = newPassword;
    localStorage.setItem('fitnessUsers', JSON.stringify(users));
    
    setResetSuccess(true);
    setTimeout(() => {
      setShowPasswordReset(false);
      setResetSuccess(false);
      setResetUsername('');
      setNewPassword('');
      setConfirmNewPassword('');
    }, 2000);
  };

  const handleBiometricLogin = async () => {
    try {
      // Check if WebAuthn is supported
      if (!window.PublicKeyCredential) {
        setError('Biometric login is not supported on this device');
        return;
      }

      const lastUser = localStorage.getItem('lastLoggedInUser');
      if (!lastUser) {
        setError('No previous login found. Please login with password first.');
        return;
      }

      // Check if user has biometric credentials stored
      const credentialId = localStorage.getItem(`biometric_${lastUser}`);
      if (!credentialId) {
        setError('Biometric login not set up. Please login with password first.');
        return;
      }

      // Create authentication options
      const challenge = new Uint8Array(32);
      window.crypto.getRandomValues(challenge);

      const publicKeyCredentialRequestOptions = {
        challenge: challenge,
        allowCredentials: [{
          id: Uint8Array.from(atob(credentialId), c => c.charCodeAt(0)),
          type: 'public-key',
          transports: ['internal']
        }],
        timeout: 60000,
        userVerification: 'preferred'
      };

      const assertion = await navigator.credentials.get({
        publicKey: publicKeyCredentialRequestOptions
      });

      if (assertion) {
        onLogin(lastUser);
      }
    } catch (err) {
      console.error('Biometric authentication failed:', err);
      setError('Biometric authentication failed. Please use password.');
    }
  };

  return (
    <div className="min-h-screen bg-neutralBg flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Personal Performance Dashboard</h1>
          <p className="text-gray-600">
            {isSignup ? 'Create your account' : 'Welcome back'}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter your username"
            />
          </div>

          {isSignup && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter your password"
            />
            {!isSignup && (
              <div className="mt-1 text-right">
                <button
                  type="button"
                  onClick={() => setShowPasswordReset(true)}
                  className="text-sm text-primary hover:text-opacity-80 transition-colors"
                >
                  Forgot Password?
                </button>
              </div>
            )}
          </div>

          {isSignup && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Confirm your password"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-md hover:bg-opacity-90 transition-colors font-semibold"
          >
            {isSignup ? 'Create Account' : 'Login'}
          </button>
        </form>

        {!isSignup && localStorage.getItem('lastLoggedInUser') && (
          <div className="mt-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleBiometricLogin}
              className="mt-4 w-full bg-accent text-primary py-3 rounded-md hover:bg-opacity-90 transition-colors font-semibold flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
              </svg>
              Login with Biometric
            </button>
          </div>
        )}

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => {
              setIsSignup(!isSignup);
              setError('');
              setFormData({ username: '', email: '', password: '', confirmPassword: '' });
            }}
            className="text-primary hover:underline text-sm"
          >
            {isSignup ? 'Already have an account? Login' : "Don't have an account? Sign up"}
          </button>
        </div>
      </div>

      {/* Password Reset Modal */}
      {showPasswordReset && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-primary">Reset Password</h2>
              <button
                onClick={() => {
                  setShowPasswordReset(false);
                  setResetError('');
                  setResetUsername('');
                  setNewPassword('');
                  setConfirmNewPassword('');
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {resetSuccess ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Password Reset Successful!</h3>
                <p className="text-gray-600">You can now login with your new password.</p>
              </div>
            ) : (
              <>
                {resetError && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
                    {resetError}
                  </div>
                )}

                <form onSubmit={handlePasswordReset} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Username
                    </label>
                    <input
                      type="text"
                      value={resetUsername}
                      onChange={(e) => setResetUsername(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Enter your username"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Enter new password"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Confirm new password"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary text-white py-3 rounded-md hover:bg-opacity-90 transition-colors font-semibold"
                  >
                    Reset Password
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* Biometric Setup Modal */}
      {showBiometricSetup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-accent bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-primary mb-2">Set Up Biometric Login</h2>
              <p className="text-gray-600 text-sm">
                Would you like to enable fingerprint or face recognition for faster, more secure login?
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
              <h3 className="font-semibold text-blue-900 text-sm mb-2">Benefits:</h3>
              <ul className="text-blue-800 text-sm space-y-1">
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Quick login with your fingerprint or face
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  More secure than passwords alone
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  You can always use your password instead
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <button
                onClick={async () => {
                  try {
                    await registerBiometric(biometricUsername);
                    setShowBiometricSetup(false);
                    onLogin(biometricUsername);
                  } catch (err) {
                    console.error('Failed to set up biometric:', err);
                    // If setup fails, just proceed with normal login
                    setShowBiometricSetup(false);
                    onLogin(biometricUsername);
                  }
                }}
                className="w-full bg-primary text-white py-3 rounded-md hover:bg-opacity-90 transition-colors font-semibold"
              >
                Set Up Now
              </button>
              <button
                onClick={() => {
                  setShowBiometricSetup(false);
                  onLogin(biometricUsername);
                }}
                className="w-full bg-gray-200 text-gray-700 py-3 rounded-md hover:bg-gray-300 transition-colors font-semibold"
              >
                Skip for Now
              </button>
            </div>

            <p className="text-xs text-gray-500 text-center mt-4">
              You can enable this later in your account settings
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
