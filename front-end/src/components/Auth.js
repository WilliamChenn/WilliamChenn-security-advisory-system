import React, { useEffect } from 'react';

function Auth() {
  useEffect(() => {
    window.location.href = 'http://localhost:3001/auth/saml';
  }, []);

  return (
    <div>
      <h1>Redirecting to login...</h1>
    </div>
  );
}

export default Auth;