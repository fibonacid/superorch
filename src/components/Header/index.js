import React, {useCallback, useContext} from 'react';
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth-context";

function Header(props) {

  const context = useContext(AuthContext);

  return (
    <div>
      <ul>
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        {!context.token && <li>
          <Link to={"/auth"} >Login</Link>
        </li>}
        {context.token && <li>
          <a href="#" onClick={context.logout}>Logout</a>
        </li>}
      </ul>
    </div>
  )
}

export default Header;
