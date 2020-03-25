import { EditorState, Modifier } from "draft-js";

export function findEvaluatedEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges(character => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === "EVALUATED"
    );
  }, callback);
}

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
