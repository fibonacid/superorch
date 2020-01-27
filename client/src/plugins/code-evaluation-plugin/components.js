import React from "react";

export function EvaluatedSpan({ entityKey, contentState, children }) {
  const entity = contentState.getEntity(entityKey);

  console.log({ data: entity.data });

  return (
    <span
      style={{
        background: "yellow"
      }}
    >
      {children}
    </span>
  );
}
