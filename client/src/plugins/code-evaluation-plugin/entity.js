import React, { useEffect } from "react";
import { EditorState, Modifier } from "draft-js";
import { findEntities } from "../../helpers/draft-js";

export function createEvaluatedEntity(editorState, selectionState) {
  const contentState = editorState.getCurrentContent();
  const contentStateWithEntity = contentState.createEntity(
    "EVALUATED",
    "MUTABLE",
    { evaluatedTimes: 0 }
  );
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
  const contentStateWithLink = Modifier.applyEntity(
    contentStateWithEntity,
    selectionState,
    entityKey
  );
  return EditorState.push(editorState, contentStateWithLink, "apply-entity");
}

export const evaluatedStrategy = (contentBlock, callback, contentState) => {
  return findEntities("EVALUATED", contentBlock, callback, contentState);
};

//
//  Evaluated Entity
//
export function Evaluated({ entityKey, contentState, children }) {
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
