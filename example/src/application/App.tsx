import React from "react";
import { Link } from "react-router-dom";
import { Route, Routes } from "react-router";
import { Counter } from "./pages/counter/Counter";
import { Watch } from "./pages/watch/Watch";
import { observer } from "mobx-react";
import { Center, HStack, VStack } from "@ncodedcode/ncode_react_lib";
import withRouter from "../data/test/withRouter";

class App extends React.Component {
  render() {
    return (
      <VStack className="app">
        <HStack className={"header"}>
          <Link to="/">Home</Link> |<Link to="/counter">Counter</Link> |
          <Link to="/watch">Watch</Link>
        </HStack>

        <Routes>
          <Route
            path={"/"}
            element={
              <Center>
                <h1>n.code react application template</h1>
              </Center>
            }
          />
          <Route path={"/counter"} element={<Counter />} />
          <Route path={"/watch"} element={<Watch />} />
        </Routes>
      </VStack>
    );
  }
}

export default observer(App);
