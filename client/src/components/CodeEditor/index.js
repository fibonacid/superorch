import React, { Component } from "react";
import styled from "styled-components/macro";
import { Editor, EditorState } from "draft-js";

// Editor Wrapper
const StyledWrapper = styled.div`
  cursor: text;
  padding: 10px;
  flex: 1;
  font-size: 13px;
  font-family: monospace;
`;

// -----------------------------------
// SuperCollider Editor
// -----------------------------------

export default class CodeEditor extends Component {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };
    this.onChange = editorState => this.setState({ editorState });
    this.setDomEditorRef = ref => (this.domEditor = ref);
    this.focus = () => this.domEditor.focus();
  }

  componentDidMount() {
    this.domEditor.focus();
  }

  render() {
    return (
      <StyledWrapper onClick={this.focus}>
        <Editor
          editorState={this.state.editorState}
          onChange={this.onChange}
          ref={this.setDomEditorRef}
        />
      </StyledWrapper>
    );
  }
}
