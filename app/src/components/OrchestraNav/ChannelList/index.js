import React from "react";
import styled from "styled-components/macro";
import ListItem from "../ListItem";

const StyledContainer = styled.div`
  margin: 30px 0 5px 0;
  font-size: 14px;
`;

const StyledList = styled.ul`
  margin: 15px 0;
`;

export default function ChannelList({ orchestra }) {
  const url = `/orchestras/${orchestra._id}/chats`;
  return (
    <StyledContainer>
      <StyledList>
        {orchestra.channels.map((channel, index) => (
          <ListItem key={index} url={`${url}/channel-${channel._id}`}>
            # {channel.name}
          </ListItem>
        ))}
      </StyledList>
    </StyledContainer>
  );
}
