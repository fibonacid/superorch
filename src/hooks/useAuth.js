import { useState } from 'react';

function useAuth() {
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [tokenExpiration, setTokenExpiration] = useState(null);
  
    const login = (token, userId, tokenExpiration) => {
      setToken(token);
      setUserId(userId);
      setTokenExpiration(tokenExpiration);
    };
  
    const logout = () => {
      setToken(null);
      setUserId(null);
      setTokenExpiration(null);
    };

    return {token, userId, tokenExpiration, login, logout}
}

export default useAuth;