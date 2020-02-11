import React, { Component } from "react";
import styled from "styled-components/macro";
import List from "./List";
import { SClangContext } from "../../../context/sclang-context";
import { Editor, EditorState, getDefaultKeyBinding } from "draft-js";

const StyledWrapper = styled.div`
  flex: 0 1 25%;
  position: relative;
  background: black;
  padding: 10px;
  color: rgb(0, 255, 0);
  font-size: 12px;
  font-family: monospace;
`;

const StyledInner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

const StyledContainer = styled.div`
  flex: 1;
  cursor: text;
  display: flex;
  padding-bottom: 50px;
`;

class Console extends Component {
  static contextType = SClangContext;

  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty()
    };
    this.onChange = this.onChange.bind(this);
    this.focus = this.focus.bind(this);
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
  }

  componentDidMount() {
    this.focus();
  }

  onChange = editorState => {
    this.setState({
      editorState
    });
  };

  focus = () => {
    this.editor.focus();
  };

  handleKeyCommand(command) {
    if (command === "execute") {
      const contentState = this.state.editorState.getCurrentContent();
      const text = contentState.getPlainText();

      // Evaluate input text.
      this.context.evaluate(text);

      // Clear content of editor.
      const cleared = EditorState.createEmpty();
      this.onChange(EditorState.moveFocusToEnd(cleared));
      return "handled";
    }
    if (command === "clear") {
      this.context.dispatch({ type: "clear_log" });
      return "handled";
    }
    return "not-handled";
  }

  render() {
    const { logs } = this.context.state;

    return (
      <StyledWrapper className={this.props.className}>
        <StyledInner
          ref={element => {
            this.container = element;
          }}
        >
          <List logs={logs} container={this.container} />
          <StyledContainer onClick={this.focus}>
            <Editor
              editorState={this.state.editorState}
              onChange={this.onChange}
              handleKeyCommand={this.handleKeyCommand}
              keyBindingFn={myKeyBindingFn}
              ref={element => {
                this.editor = element;
              }}
            />
          </StyledContainer>
        </StyledInner>
      </StyledWrapper>
    );
  }
}

export default Console;

function myKeyBindingFn(e) {
  // ENTER executes code, SHIFT+ENTER doesn't.
  if (e.keyCode === 13 && !e.shiftKey) {
    return "execute";
  }
  // CMD+K clears the console.
  if (e.keyCode === 75 && e.metaKey) {
    return "clear";
  }
  return getDefaultKeyBinding(e);
}
