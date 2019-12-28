import React from 'react';
import { Link } from "react-router-dom";

function Header(props) {
  return (
    <div>
      <ul>
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>
          <Link to={"/login"} >Login</Link>
        </li>
      </ul>
    </div>
  )
}

export default Header;
