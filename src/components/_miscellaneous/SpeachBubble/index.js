import styled, {css} from 'styled-components/macro';

const SpeachBubble = styled.div`
  position: relative;
  background: white;
  border-radius: .4em;
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
    ${props =>
      props.right
        ? css`
            right: 0;
            border: 0.813em solid transparent;
            border-left-color: white;
            border-right: 0;
            border-bottom: 0;
            margin-right: -0.562em;
          `
        : css`
            left: 0;
            border-right-color: white;
            border-left: 0;
            border-bottom: 0;
            margin-left: -0.562em;
          `}
`;

export default SpeachBubble;
