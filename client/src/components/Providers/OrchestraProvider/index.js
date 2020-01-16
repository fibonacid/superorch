import React, { useState } from "react";
import OrchestraContext from "../../../context/orchestra-context";

const fakeOrchestra = {
  _id: "5e1f9a55e323790bc9b40211",
  name: "Fake Orchestra",
  owner: {
    nickname: "Fake Steve",
    _id: "5e1f9a24e323790bc9b40210"
  },
  members: [
    {
      _id: "5e1f9a55e323790bc9b40214",
      user: {
        _id: "5e1f9a24e323790bc9b40210",
        nickname: "Fake Ryan"
      }
    }
  ]
};

export default function OrchestraProvider(props) {
  const [orchestra, setOrchestra] = useState(fakeOrchestra);

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
