# Navigate Instructions

**Inedx**

1. [Create an NavigateHOC](#use1)
2. [Use the function where you want to use it.](#use2)
    - [Functional Component](#use2-1)
    - [Class Component](#use2-2)
3. [Now you can use the Navigate function anywhere you want.](#use3)

---

## 1. Create an NavigateHOC <a id="use1"></a>

```tsx
// example
import React from "react";
import { useNavigate } from "react-router-dom";
import { NavigateFunction } from "react-router";
import { NCNavigator } from "@ncodedcode/ncode_react_lib";

const withRouter: <T>(
  Component: React.ComponentType<T>
) => (props: any) => JSX.Element = (Component: any) => {
  return (props: any) => {
    const navigate: NavigateFunction = useNavigate();

    new NCNavigator("/", navigate);

    return <Component {...props} />;
  };
};

export default withRouter;
```



## 2. Use the function where you want to use it.  <a id="use2"></a>
- recommend "App.tsx" for global use.
- Please note the hierarchy where the HOC was used.


### Functional Component  <a id="use2-1"></a>

```tsx
// example

import React from "react";
import { Link } from "react-router-dom";
import { Route, Routes } from "react-router";
import { Counter } from "./pages/counter/Counter";
import { Watch } from "./pages/watch/Watch";
import { observer } from "mobx-react";
import { Center, HStack, VStack } from "@ncodedcode/ncode_react_lib";
import withRouter from "../data/test/withRouter";

const App = () => {
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
};

export default observer(withRouter(App)); // It's important.
```

### Class Component  <a id="use2-2"></a>

```tsx
// example

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

export default observer(withRouter(App)); // It's important.
```



## 3. Now you can use the Navigate function anywhere you want.  <a id="use3"></a>

```tsx
import { NCNavigator } from "@ncodedcode/ncode_react_lib";

const goToAnyPage: (path: string) => void = (path: string) => {
  NCNavigator.moveTo(path);
}
```

