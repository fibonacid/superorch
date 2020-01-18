import React, { useState } from "react";
import Widget from "./Widget";

function Inbox(props) {
  const [visible, setVisible] = useState(false);

  const click = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <button onClick={click}>inbox</button>
      {visible && <Widget />}
    </div>
  );
}

export default Inbox;
