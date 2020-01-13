import React, { useState } from "react";
import ActivityContext from "../../../context/activity-context";

export default function Activity(props) {
  const [orchestra, selectOrchestra] = useState(null);

  return (
    <ActivityContext.Provider
      value={{
        orchestra,
        selectOrchestra
      }}
    >
      {props.children}
    </ActivityContext.Provider>
  );
}
