import { EditorState } from "draft-js";
import { getSelectionText, getSelectionEntity } from "draftjs-utils";
import { EvaluatedSpan } from "./components";
import { findEvaluatedEntities, createEvaluatedEntity } from "./entities";

export function createCodeEvaluationPlugin({ onEvaluate = () => {} }) {
  return {
    decorators: [
      {
        strategy: findEvaluatedEntities,
        component: EvaluatedSpan
      }
    ],

    keyBindingFn: e => {
      // CMD + ENTER
      if (e.metaKey && e.keyCode === 13) {
        return "evaluate";
      }
    },

    handleKeyCommand: (command, editorState, _, { setEditorState }) => {
      if (command === "evaluate") {
        const selectionState = editorState.getSelection();
        const contentState = editorState.getCurrentContent();

        const entityKey = getSelectionEntity(editorState);

        // If selection contains an entity:
        if (!entityKey) {
          // Create new entity and update editor.
          setEditorState(createEvaluatedEntity(editorState, selectionState));
        } else {
          // Modify entity data.
          const entity = contentState.getEntity(entityKey);
          const nextContentState = contentState.mergeEntityData(entityKey, {
            evaluatedTimes: entity.data.evaluatedTimes + 1
          });

          const newEditorState = EditorState.push(
            editorState,
            nextContentState,
            "change-block-data"
          );
          const decorator = editorState.getDecorator();

          // Update editor.
          setEditorState(EditorState.set(newEditorState, { decorator }));
        }

        // Pass text to callback handle
        const selectionText = getSelectionText(editorState);
        onEvaluate(selectionText);

        return "handled";
      }
      return "not-handled";
    }
  };
}
