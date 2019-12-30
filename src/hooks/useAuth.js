import { useState, useEffect } from 'react';

function todayPlusHours(h) {
  const today = new Date();
  today.setHours(today.getHours() + h);
  return today;
}

function useAuth() {

    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [tokenExpiration, setTokenExpiration] = useState(null);
    
    // Intialize auth variables with
    // values from local storage.
    useEffect(() => {
      setToken(localStorage.getItem("token"));
      setUserId(localStorage.getItem("userId"));
      setTokenExpiration(localStorage.getItem("tokenExpiration"));
    }, [])

    const login = (token, userId, tokenExpiration) => {
      setToken(token);
      setUserId(userId);
      setTokenExpiration(tokenExpiration);
    };
  
    const logout = () => {
      setToken(null);
      setUserId(null);
      setTokenExpiration(null);
      localStorage.clear();
    };

    // When new auth data is retrieved:
    useEffect(() => {
      if (token && userId && tokenExpiration) {        
        console.log('Logged in')
        localStorage.setItem('token', token)
        localStorage.setItem('userId', userId)
        localStorage.setItem('tokenExpiration', tokenExpiration)
      }
    }, [token, userId, tokenExpiration]);


    return {token, userId, tokenExpiration, login, logout}
}

export default useAuth;