import React from "react";
import { useParams } from "react-router-dom";
//import styled from 'styled-components/macro';
import PrimaryLayout from "../../../components/_layouts/PrimaryLayout";

function InvitesOrchestraView() {
  const params = useParams();

  return (
    <PrimaryLayout back={true} rootpath={"/orchestras/" + params.id}>
      Invite to orchestra
    </PrimaryLayout>
  );
}

export default InvitesOrchestraView;
