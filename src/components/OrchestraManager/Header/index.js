import React from "react";
import styled from "styled-components/macro";
import { Link, useHistory } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { userDocument } from "../../../config/documents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";

const StyledContainer = styled.div`
  padding: 15px 0 10px 0;
  font-size: 20px;
  display: flex;
  justify-content: space-between;
`;

const StyledIcon = styled(FontAwesomeIcon)`
  color: grey;
  margin-left: 5px;
  cursor: pointer;
`;

const StyledTitle = styled.h2`
  font-size: 24px;
`;

const StyledSubtitle = styled.p`
  font-size: 18px;
`;

function Header({ orchestra }) {
  const history = useHistory();
  const { data } = useQuery(userDocument);

  const redirect = () => {
    history.push(`/orchestras/${orchestra._id}/edit`);
  };

  return (
    <StyledContainer>
      <div>
        {data && <StyledSubtitle>{data.user.name}</StyledSubtitle>}
        <Link to={`/orchestras/${orchestra._id}`}>
          <StyledTitle>{orchestra.name}</StyledTitle>
        </Link>
      </div>
      <StyledIcon onClick={redirect} icon={faCog} size="sm" />
    </StyledContainer>
  );
}

export default Header;
