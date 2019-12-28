import React, {useCallback, useState} from "react";

function AuthForm(props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = useCallback((event) => {
    switch(event.target.name) {
      case 'email':
        return setEmail(event.target.value);
      case 'password':
        return setPassword(event.target.value);
    }
  }, []);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    console.log(email, password);
  }, [email, password]);

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input type="text" name="email" onChange={handleChange} value={email}/>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" onChange={handleChange} value={password} />
        </div>
        <div>
          <button type="button">Switch to Sign up</button>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default AuthForm;
