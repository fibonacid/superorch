import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components/macro'
import {Editor, EditorState} from 'draft-js';

// Editor Wrapper
const StyledWrapper = styled.div`
    height: 100%;
    cursor: text;
    padding: 10px;
`;

// -----------------------------------
// SuperCollider Editor
// -----------------------------------

class SCEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = editorState => this.setState({editorState});
    this.setDomEditorRef = ref => this.domEditor = ref;
    this.focus = () => this.domEditor.focus();
  }

  componentDidMount(){
    this.domEditor.focus()
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

export default SCEditor;