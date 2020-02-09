import React from "react";
import { useHistory } from "react-router-dom";
import Icon from "./Icon";

function SelectorIcon(props) {
  const history = useHistory();
  const targetUrl = `/orchestras/${props.orchestra._id}`;
  const match = history?.location?.pathname?.includes(targetUrl);

  function handleClick() {
    history.push(targetUrl);

    props.onClick();
  }

  const letter = props.orchestra.name.charAt(0).toUpperCase();

  return (
    <Icon 
      letter={letter}
      onClick={handleClick} 
      active={props.active || match} 
    />
  )
}

export default SelectorIcon;
