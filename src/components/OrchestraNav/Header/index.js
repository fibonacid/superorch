import React, { useCallback } from "react";
import styled from "styled-components/macro";
import { Link, useHistory } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { GET_USER_QUERY } from "../../../api/users";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";

const StyledContainer = styled.div`
  padding: 15px 0 10px 0;
  font-size: 20px;
  display: flex;
  justify-content: space-between;
  a {
    color: black;
    text-decoration: none;
  }
`;

const StyledIcon = styled(FontAwesomeIcon)`
  margin-left: 5px;
  cursor: pointer;
  color: ${props => props.color};
  &:hover { color: black }
  transition: color 50ms ease-in;
`;

const StyledTitle = styled.h2`
  font-size: 27px;
`;

const StyledSubtitle = styled.p`
  font-size: 16px;
`;

function Header({ orchestra }) {
  const { data } = useQuery(GET_USER_QUERY);
  const history = useHistory();

  const baseSlug = `/orchestras/${orchestra._id}`;
  const editUrl = `${baseSlug}/edit`;

  const redirect = useCallback(
    function() {
      history.push(editUrl);
    },
    [editUrl]
  );

  const matchEdit = history?.location?.pathname === editUrl;

  return (
    <StyledContainer>
      <div>
        {data && <StyledSubtitle>{data.user.name}</StyledSubtitle>}
        <Link to={`/orchestras/${orchestra._id}`}>
          <StyledTitle>{orchestra.name}</StyledTitle>
        </Link>
      </div>
      <StyledIcon
        onClick={redirect}
        icon={faCog}
        size="sm"
        color={matchEdit ? "black" : "lightgrey"}
      />
    </StyledContainer>
  );
}

export default Header;
