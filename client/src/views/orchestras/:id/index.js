import React from "react";
import { useParams } from "react-router-dom";
import Playground from "../../../components/Playground";
import PrimaryLayout from "../../../components/_layouts/PrimaryLayout";

function OrchestraIndexView() {
  const params = useParams();

  return (
    <PrimaryLayout>
      <Playground key={params.id} />
    </PrimaryLayout>
  );
}

export default OrchestraIndexView;
