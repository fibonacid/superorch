import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
   padding: 5px 10px;
   background: whitesmoke;
   border-bottom: solid 1px lightgrey;
   font-size: 18px;
   display: flex;
   justify-content: space-between;
   align-items: center;
`;

export const Container = styled.div`
  flex: 1;
  display: flex;
`;

export const Icon = styled(FontAwesomeIcon)`
  font-size: 30px;
  cursor: pointer;
  margin-left: 5px;
`;