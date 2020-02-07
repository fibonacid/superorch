import styled, {css} from 'styled-components/macro';

const right = css`
   right: 0;
   border: 0.813em solid transparent;
   border-left-color: ${props => props.color};
   border-right: 0;
   border-bottom: 0;
   margin-right: -0.562em;
`;

const left = css`
   left: 0;
   border-right-color: ${props => props.color};
   border-left: 0;
   border-bottom: 0;
   margin-left: -0.562em;
`;

const SpeachBubble = styled.div`
  position: relative;
  background: ${props => props.color};
  border-radius: .4em;
  overflow-wrap: break-word;
  min-width: 0;
  padding: 8px;

  &:after {
    content: "";
    position: absolute;
    top: 50%;
    width: 0;
    height: 0;
    border: 0.813em solid transparent;
    margin-top: -0.281em;
    ${props => props.direction === "right" && right};
    ${props => props.direction === "left" && left};
`;

export default SpeachBubble;
