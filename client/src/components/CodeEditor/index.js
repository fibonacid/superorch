import React, { Component } from "react";
import styled from "styled-components/macro";
import Editor from "draft-js-plugins-editor";
import { EditorState, CompositeDecorator, ContentState } from "draft-js";
import { createCodeEvaluationPlugin } from "../../plugins/code-evaluation-plugin";

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

const text = `Hello world`;

// -----------------------------------
// SuperCollider Editor
// -----------------------------------
export default class CodeEditor extends Component {
  constructor(props) {
    super(props);

    const codeEvaluationPlugin = createCodeEvaluationPlugin({
      onEvaluate: this.onEvaluate
    });

    const decorators = [...codeEvaluationPlugin.decorators];

    this.state = {
      editorState: EditorState.createWithContent(
        ContentState.createFromText(text),
        new CompositeDecorator(decorators)
      ),
      plugins: [
        createCodeEvaluationPlugin({
          onEvaluate: this.onEvaluate
        })
      ]
    };
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

  onEvaluate(text) {
    console.log(text);
  }

  render() {
    return (
      <StyledContainer className={this.props.className} onClick={this.focus}>
        <StyledInner>
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            plugins={this.state.plugins}
            ref={element => {
              this.editor = element;
            }}
          />
        </StyledInner>
      </StyledContainer>
    );
  }
}
