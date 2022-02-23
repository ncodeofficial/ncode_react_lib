import React from "react";
import { useNavigate } from "react-router-dom";
import { NavigateFunction } from "react-router";
import { NCNavigator } from "@ncodedcode/ncode_react_lib";

const withRouter = (Component: any) => {
  return (props: any) => {
    const navigate: NavigateFunction = useNavigate();

    new NCNavigator("/", navigate);

    return <Component {...props} />;
  };
};

export default withRouter;
