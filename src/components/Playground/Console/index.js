import React, { Component } from "react";
import styled from "styled-components/macro";
import List from "./List";
import { SClangContext } from "../../../context/sclang-context";
import { Editor, EditorState } from "draft-js";

const StyledWrapper = styled.div`
  flex: 0 1 25%;
  position: relative;
  background: black;
  padding: 10px;
  color: rgb(0,255,0);
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

class Console extends Component {
  static contextType = SClangContext;

  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty()
    };
    this.onChange = this.onChange.bind(this);
    this.focus = this.focus.bind(this);
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

  render() {
    const { logs } = this.context.state;

    return (
      <StyledWrapper onClick={this.focus} className={this.props.className}>
        <StyledInner>
          <List logs={logs} />
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            ref={element => {
              this.editor = element;
            }}
          />
        </StyledInner>
      </StyledWrapper>
    );
  }
}

export default Console;
