import { EditorState, Modifier } from "draft-js";
import { getSelectionText } from "draftjs-utils";

export default function createFlashyEvalPlugin(config) {
  return {
    customStyleMap: {
      HIGHLIGHT: {
        background: "rgb(255,255,0)",
        transition: "background 1s"
      }
    },
    keyBindingFn: e => {
      // CMD + ENTER
      if (e.metaKey && e.keyCode === 13) {
        return "highlight";
      }
    },
    handleKeyCommand: (command, editorState, _, { setEditorState }) => {
      if (command === "highlight") {
        const contentState = editorState.getCurrentContent();
        const selectionState = editorState.getSelection();

        const contentWithStyle = Modifier.applyInlineStyle(
          contentState,
          selectionState,
          "HIGHLIGHT"
        );

        const selectionText = getSelectionText(editorState);
        config.onTextEval(selectionText);

        setEditorState(
          EditorState.push(editorState, contentWithStyle, "change-inline-style")
        );
        return true;
      }
    }
  };
}
