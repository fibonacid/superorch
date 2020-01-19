import React, { Component } from "react";
import styled from "styled-components/macro";
import { Editor, EditorState } from "draft-js";

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
      <StyledContainer className={this.props.className} onClick={this.focus}>
        <StyledInner>
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            ref={this.setDomEditorRef}
          />
        </StyledInner>
      </StyledContainer>
    );
  }
}
