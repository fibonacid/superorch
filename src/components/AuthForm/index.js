import React, { useCallback, useState, useContext } from "react";
import styled from 'styled-components';
import Api from '../../data/api';
import AuthContext from "../../context/auth-context";

const StyledWrap = styled.div`
  padding: 10px;
`;

const StyledTitle = styled.h1`
  text-align: center;
  font-size: 25px;
  font-weight: bold;
`;

const StyledField = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
`;

const StyledInput = styled.input`
  margin-top: 5px;
`;

const StyledBtnWrap = styled.div`
  margin-top: 10px;
  display: flex;
  & button {
    flex: 1;
  }
`;

//
// Authenticate user on the server.
//
function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const authContext = useContext(AuthContext);

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

        const { data } = await res.json();

        if(isLogin) {
          authContext.login(
            data.login.token,
            data.login.userId,
            data.login.tokenExpiration,
          );
        } else {

        }
        console.log(data);

      } catch(err) {
        console.log(err);
      }
    },
    [email, password, isLogin]
  );

  const handleSwitchMode = useCallback(() => {
    setIsLogin(!isLogin);
  }, [isLogin]);

  return (
    <StyledWrap>
      <StyledTitle>{isLogin ? "Sign in" : "Sign up"}</StyledTitle>
      <form onSubmit={handleSubmit}>
        <StyledField>
          <label htmlFor="email">Email</label>
          <StyledInput
            type="text"
            name="email"
            onChange={handleChange}
            value={email}
          />
        </StyledField>
        <StyledField>
          <label htmlFor="password">Password</label>
          <StyledInput
            type="password"
            name="password"
            onChange={handleChange}
            value={password}
          />
        </StyledField>
        <StyledBtnWrap>
          <button
            type="button"
            onClick={handleSwitchMode}
          >
            Switch to {isLogin ? "Sign up" : "Log in"}
          </button>
          <button type="submit">Submit</button>
        </StyledBtnWrap>
      </form>
    </StyledWrap>
  );
}

export default AuthForm;
