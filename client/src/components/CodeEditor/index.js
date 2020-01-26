import React, { Component } from "react";
import styled from "styled-components/macro";
import Editor from "draft-js-plugins-editor";
import { EditorState } from "draft-js";

const StyledContainer = styled.div`
  position: relative;
  cursor: text;
  padding: 10px;
  flex: 1;
  font-size: 13px;
  font-family: monospace;
`;

// Editor Wrapper
const StyledInner = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  right: 10px;
  bottom: 10px;
  overflow: auto;
`;

const plugins = [];

// -----------------------------------
// SuperCollider Editor
// -----------------------------------
export default class CodeEditor extends Component {
  state = {
    editorState: EditorState.createEmpty()
  };

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

  render() {
    return (
      <StyledContainer className={this.props.className} onClick={this.focus}>
        <StyledInner>
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            plugins={plugins}
            ref={element => {
              this.editor = element;
            }}
          />
        </StyledInner>
      </StyledContainer>
    );
  }
}
