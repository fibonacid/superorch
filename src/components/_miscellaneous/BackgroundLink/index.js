import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function BackgroundLink(props) {
  const location = useLocation();

  return (
    <Link
      className={props.className}
      to={{
        pathname: props.to,
        // This is the trick! This link sets
        // the `background` in location state.
        state: { background: location }
      }}
    >
      {props.children}
    </Link>
  );
}
