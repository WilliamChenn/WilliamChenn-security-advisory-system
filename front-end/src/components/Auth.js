import React, { useEffect } from 'react';

function Auth() {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  useEffect(() => {
    window.location.href = `${backendUrl}/auth/saml`;
  }, []);

  return (
    <div>
      <h1>Redirecting to login...</h1>
    </div>
  );
}

export default Auth;