import React from 'react';
import styled from 'styled-components/macro';
import Icon from './Icon';

const StyledPlusIcon = styled(Icon)`
   margin-top: 10px;
   border: none;
   font-size: 25px;
`;

export default function MyOrchestras() {
   return (
      <div>
         <ul>
            <Icon letter="L"/>
            <Icon letter="O"/>
            <Icon letter="R"/>
            <Icon letter="E"/>
            <Icon letter="N"/>
         </ul>
         <StyledPlusIcon letter="+"/>
      </div>
   )
}