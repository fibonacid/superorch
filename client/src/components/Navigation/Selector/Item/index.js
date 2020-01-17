import React from "react";
import { useHistory } from "react-router-dom";
import Icon from "./Icon";

function SelectorIcon(props) {
  const history = useHistory();

  function handleClick() {
    history.push(`/orchestras/${props.orchestra._id}`);

    props.onClick();
  }

  const letter = props.orchestra.name.charAt(0).toUpperCase();

  return <Icon onClick={handleClick} letter={letter} active={props.active} />;
}

export default SelectorIcon;
