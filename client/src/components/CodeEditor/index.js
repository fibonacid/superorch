import React, { Component } from "react";
import styled from "styled-components/macro";
import Editor from "draft-js-plugins-editor";
import { EditorState, CompositeDecorator, ContentState } from "draft-js";
import { createCodeEvaluationPlugin } from "../../plugins/code-evaluation-plugin";
import { interpretWithSclang } from "../../helpers/electron";

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

const text = `1 + 1`;

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
    interpretWithSclang(text)
      .then(res => {
        console.group("sclang");
        console.log(text);
        console.log(res);
        console.groupEnd();
      })
      .catch(err => {
        console.group("sclang");
        console.log(text);
        console.error(err.message);
        console.groupEnd();
      });
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
