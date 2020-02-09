import React from "react";
import styled from "styled-components/macro";
import { Link, useHistory } from "react-router-dom";

const StyledList = styled.ul`
  margin-top: 30px;
  font-size: 15px;
`;

const StyledItem = styled.li`
  color: grey;
  padding: 5px 0;
  a {
    font-weight: ${props => (props.current ? "bold" : "normal")};
  }
`;

export default function ChannelList({ orchestra }) {
  const { location } = useHistory();
  const base = `/orchestras/${orchestra._id}/chats`;

  return (
    <StyledList>
      {orchestra.channels.map((channel, index) => {
        const slug = `channel-${channel._id}`;
        const url = base + "/" + slug;
        const match = location?.pathname?.includes(slug);
        return (
          <StyledItem key={index} current={match}>
            <Link to={url}>{channel.name}</Link>
          </StyledItem>
        );
      })}
    </StyledList>
  );
}
