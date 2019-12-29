import React, { useCallback, useState } from "react";
import Api from '../../data/api';

function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const handleChange = useCallback(event => {
    //
    // Update state values
    //
    switch (event.target.name) {
      case "email":
        return setEmail(event.target.value);
      case "password":
        return setPassword(event.target.value);
    }
  }, []);

  const handleSubmit = useCallback(
    async event => {
      //
      // If credentials are valid
      // send a request to the server.
      //
      event.preventDefault();

      // If email or password are empty do nothing.
      if (email.trim().length === 0 || password.trim().length === 0) {
        return;
      }
      console.log(email, password);

      try {
        const res = isLogin
          ? await Api.signIn(email, password)
          : await Api.signUp(email, password);

        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Request failed')
        }

        const data = await res.json();
        console.log(data);

      } catch(err) {
        console.log(err);
      }
    },
    [email, password]
  );

  const handleSwitchMode = useCallback(() => {
    setIsLogin(!isLogin);
  }, [isLogin]);

  return (
    <form onSubmit={handleSubmit}>
      <h2>{isLogin ? "Log in" : "Sign up"}</h2>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          onChange={handleChange}
          value={email}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          value={password}
        />
      </div>
      <div>
        <button
          type="button"
          onClick={handleSwitchMode}
        >
          Switch to {isLogin ? "Sign up" : "Log in"}
        </button>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}

export default AuthForm;
