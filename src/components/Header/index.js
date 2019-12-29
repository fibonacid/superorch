import React, {useContext} from 'react';
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
      </ul>
    </div>
  )
}

export default Header;
