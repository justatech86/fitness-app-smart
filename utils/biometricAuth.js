// WebAuthn biometric authentication utilities

export async function registerBiometric(username) {
  try {
    // Check if WebAuthn is supported
    if (!window.PublicKeyCredential) {
      throw new Error('Biometric authentication is not supported on this device');
    }

    // Create a challenge
    const challenge = new Uint8Array(32);
    window.crypto.getRandomValues(challenge);

    // Create credential creation options
    const publicKeyCredentialCreationOptions = {
      challenge: challenge,
      rp: {
        name: '12-Week Fitness Plan',
        id: window.location.hostname
      },
      user: {
        id: new TextEncoder().encode(username),
        name: username,
        displayName: username
      },
      pubKeyCredParams: [
        { alg: -7, type: 'public-key' },  // ES256
        { alg: -257, type: 'public-key' } // RS256
      ],
      authenticatorSelection: {
        authenticatorAttachment: 'platform', // Use device biometric (fingerprint, face)
        userVerification: 'preferred',
        requireResidentKey: false
      },
      timeout: 60000,
      attestation: 'none'
    };

    // Create the credential
    const credential = await navigator.credentials.create({
      publicKey: publicKeyCredentialCreationOptions
    });

    if (credential) {
      // Store the credential ID for this user
      const credentialId = btoa(String.fromCharCode(...new Uint8Array(credential.rawId)));
      localStorage.setItem(`biometric_${username}`, credentialId);
      localStorage.setItem('lastLoggedInUser', username);
      return true;
    }
    
    return false;
  } catch (err) {
    console.error('Biometric registration failed:', err);
    
    // Handle specific errors
    if (err.name === 'NotAllowedError') {
      throw new Error('Biometric registration was cancelled');
    } else if (err.name === 'NotSupportedError') {
      throw new Error('Biometric authentication is not supported on this device');
    } else {
      throw new Error('Failed to register biometric authentication');
    }
  }
}

export function hasBiometricCredential(username) {
  return localStorage.getItem(`biometric_${username}`) !== null;
}

export function clearBiometricCredential(username) {
  localStorage.removeItem(`biometric_${username}`);
}
