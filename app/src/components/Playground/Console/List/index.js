import React, {useEffect} from "react";
import styled from "styled-components/macro";

const StyledSpan = styled.span`
  line-height: 1.2em;
  display: block;
`;

function List({ logs, container }) {

  useEffect(function() {
    if(container) {
      const y = container.scrollHeight;
      container.scroll(0,y);
    }
  }, [container, logs])
  
  return (
    <div>
      {logs.map((line, index) => (
        <React.Fragment key={index}>
          {line.type === "stdin" && <StyledSpan>> {line.value}</StyledSpan>}
          {line.type === "stdout" && <StyledSpan>{line.value}</StyledSpan>}
        </React.Fragment>
      ))}
    </div>
  );
}

export default List;
