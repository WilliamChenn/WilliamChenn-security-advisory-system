import React, { useEffect } from 'react';
import { BACKEND_URL } from '../components/Config.js'

function Auth() {
  useEffect(() => {
    window.location.href = '${BACKEND_URL}/auth/saml';
  }, []);

  return (
    <div>
      <h1>Redirecting to login...</h1>
    </div>
  );
}

export default Auth;