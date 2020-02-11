import React, { Component } from "react";
import styled from "styled-components/macro";
import Editor from "draft-js-plugins-editor";
import { EditorState, CompositeDecorator, ContentState } from "draft-js";
import { createCodeEvaluationPlugin } from "./code-evaluation-plugin";
import { SClangContext } from "../../../context/sclang-context";

const StyledWrapper = styled.div`
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
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
`;

const StyledContainer = styled.div`
  padding: 10px 0 0 10px;
  position: absolute;
`;

const text = `// Start the server
s.boot`;

// -----------------------------------
// SuperCollider Editor
// -----------------------------------
export default class CodeEditor extends Component {
  static contextType = SClangContext;

  state = {
    editorState: EditorState.createEmpty(),
    plugins: []
  }

  componentDidMount() {
    this.focus();
    
    const codeEvaluationPlugin = createCodeEvaluationPlugin({
      onEvaluate: this.onEvaluation.bind(this)
    });
    const decorators = [...codeEvaluationPlugin.decorators];

    // CodeEvaluationPlugin needs to be loaded
    // after context has been attached to "this"
    this.setState({
      editorState: EditorState.createWithContent(
        ContentState.createFromText(text),
        new CompositeDecorator(decorators)
      ),
      plugins: [
        ...this.state.plugins,
        codeEvaluationPlugin
      ]
    });
  }

  onEvaluation = (text) => {
    // Feed code to the supercollider interpreter
    this.context.evaluate(text)
    // Send code to other users
    this.props.onEvaluate(text);
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
      <StyledWrapper className={this.props.className} onClick={this.focus}>
        <StyledInner>
          <StyledContainer>
            <Editor
              editorState={this.state.editorState}
              onChange={this.onChange}
              plugins={this.state.plugins}
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
