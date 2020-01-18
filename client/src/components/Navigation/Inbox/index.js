import React, { useState } from "react";
import Widget from "../../_ui/Widget";

function Inbox(props) {
  const [visible, setVisible] = useState(false);

  const toggle = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <button onClick={toggle}>inbox</button>
      {visible && (
        <Widget close={toggle}>
          <h1>Notifications</h1>
          <ul>
            <li>John invited you to this</li>
            <li>Mary invited you to that</li>
            <li>...</li>
          </ul>
        </Widget>
      )}
    </div>
  );
}

export default Inbox;
