import React from "react";
import { useNavigate } from "react-router-dom";
import { NavigateFunction } from "react-router";
import { NCNavigator } from "./NCNavigator";

const withNavigateHook = (Component: any) => {
  return (props: any) => {
    const navigate: NavigateFunction = useNavigate();

    new NCNavigator("/", navigate);

    return <Component {...props} />;
  };
};

export default withNavigateHook;
