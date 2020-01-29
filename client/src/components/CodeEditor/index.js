import React, { Component } from "react";
import styled from "styled-components/macro";
import Editor from "draft-js-plugins-editor";
import { EditorState, CompositeDecorator, ContentState } from "draft-js";
import { createCodeEvaluationPlugin } from "../../plugins/code-evaluation-plugin";
import { interpretWithSclang } from "../../helpers/electron";
import SCLogContext from "../../context/sclog-context";

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

const text = `"Hello World"`;

// -----------------------------------
// SuperCollider Editor
// -----------------------------------
export default class CodeEditor extends Component {
  static contextType = SCLogContext;

  constructor(props) {
    super(props);

    const codeEvaluationPlugin = createCodeEvaluationPlugin({
      onEvaluate: this.onEvaluate.bind(this)
    });

    const decorators = [...codeEvaluationPlugin.decorators];

    this.state = {
      editorState: EditorState.createWithContent(
        ContentState.createFromText(text),
        new CompositeDecorator(decorators)
      ),
      plugins: []
    };
  }

  componentDidMount() {
    this.focus();

    // CodeEvaluationPlugin needs to be loaded
    // after context has been attached to "this"
    this.setState({
      plugins: [
        ...this.state.plugins,
        createCodeEvaluationPlugin({
          onEvaluate: this.onEvaluate.bind(this)
        })
      ]
    });
  }

  onChange = editorState => {
    this.setState({
      editorState
    });
  };

  focus = () => {
    this.editor.focus();
  };

  async onEvaluate(text) {
    // Add input to the console
    this.context.pushLine({
      type: "stdin",
      value: text
    });
    try {
      // Send text to interpreter.
      const result = await interpretWithSclang(text);
      // Log response.
      this.context.pushLine({
        type: "stdout",
        value: result.toString()
      });
    } catch (err) {
      // Log errors
      this.context.pushLine({
        type: "error",
        value: err.message
      });
    }
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
