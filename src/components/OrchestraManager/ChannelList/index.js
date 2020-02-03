import React from 'react';
import styled from 'styled-components/macro';
import {Link} from 'react-router-dom';

const StyledList = styled.ul`
   margin-top: 30px;
   font-size: 15px;
`;

const StyledItem = styled.li`
   color: grey;
   padding: 5px 0;
`;

export default function ChannelList({ orchestra }) {

   return (
      <StyledList>
         {
            orchestra.channels.map((channel, index) => (
               <StyledItem key={index}>
                  <Link to={`/orchestras/${orchestra._id}/chat?type=channel&id=${channel._id}`}>
                     # {channel.name}
                  </Link>
               </StyledItem>
            ))
         }
      </StyledList>
   )
}