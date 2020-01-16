import React, { useState } from "react";
import OrchestraContext from "../../../context/orchestra-context";

const INITIAL_STATE = {
  _id: null,
  name: null,
  owner: {
    _id: null,
    nickname: null
  },
  members: []
};

export default function OrchestraProvider(props) {
  const [orchestra, setOrchestra] = useState(INITIAL_STATE);

  return (
    <OrchestraContext.Provider
      value={{
        orchestra,
        setOrchestra
      }}
    >
      {props.children}
    </OrchestraContext.Provider>
  );
}
