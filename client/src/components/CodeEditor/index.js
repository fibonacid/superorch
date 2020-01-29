import React, { Component } from "react";
import styled from "styled-components/macro";
import Editor from "draft-js-plugins-editor";
import { EditorState, CompositeDecorator, ContentState } from "draft-js";
import { createCodeEvaluationPlugin } from "../../plugins/code-evaluation-plugin";
import { interpretWithSclang } from "../../helpers/electron";
import SCLogContext from "../../context/sclog-context";

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
  margin: 10px;
  position: absolute;
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
