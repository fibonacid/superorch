import React, {useCallback} from "react";
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const StyledContainer = styled.li`
  background: rgba(255, 255, 0, 0.9);
  border: solid 1px lightgrey;
  padding: 10px;
  margin-top: 5px;
  text-align: center;
  display: flex;
  cursor: pointer;
`;

const StyledBody = styled.div`
   flex: 1;
`;

const StyledIcon = styled(FontAwesomeIcon)`
   margin-left: 5px;
`;

export default function Message({ message, onRemove }) {
  const onClick = useCallback(onRemove.bind(null, message.id), [
    onRemove,
    message
  ]);

  return (
    <StyledContainer onClick={onClick}>
      <StyledBody>{message.value}</StyledBody>
      <StyledIcon icon={faTimes} />
    </StyledContainer>
  );
}
