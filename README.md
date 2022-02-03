# ncode_react_lib

[![npm version](https://badge.fury.io/js/@ncodedcode%2Fncode_react_lib.svg)](https://badge.fury.io/js/@ncodedcode%2Fncode_react_lib)

## Install

```shell
yarn add @ncodedcode/ncode_react_lib
```

- index.tsx

```typescript
import React from "react";

// add this
NCApplicationContext.createContext(new NCDefaultApplicationConfiguration()); 

ReactDOM.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>,
  document.getElementById("root")
);
```

## Custom Configuration

- implements NCApplicationConfiguration

```typescript
export class AppConfiguration implements NCApplicationConfiguration {
  application(app: NCApplicationContext): void {
    app.devMode = process.env.REACT_APP_ENV_TYPE === "dev";
    NCLog.setLogLevel(NCLogLevel.Debug);
  }

  config(container: ServiceLocator): void {
      // set up dependency injection
  }
}
```

- init Context with Custom Configuration

```typescript
NCApplicationContext.createContext(new AppConfiguration());
```

### Use LocalStorage as a default NCStorage

- implements NCStorage

```typescript
import { NCStorage } from "@ncodedcode/ncode_react_lib";

export class LocalStorage implements NCStorage {
  contains(key: string): Promise<boolean> {
    return Promise.resolve(!!localStorage.getItem(key));
  }

  delete(key: string): Promise<boolean> {
    return this.contains(key).then((exist) => {
      if (exist) localStorage.removeItem(key);
      return exist;
    });
  }

  load(key: string): Promise<string | null> {
    return Promise.resolve(localStorage.getItem(key) || null);
  }

  save(key: string, value: string): Promise<boolean> {
    if (!value) return this.delete(key);
    localStorage.setItem(key, value);
    return Promise.resolve(true);
  }
}
```

- regist instance

```typescript
export class AppConfiguration implements NCApplicationConfiguration {
  config(container: ServiceLocator): void {
    container.registFactory(NCStorageClassName, () => new LocalStorage());
  }
}
```

### Use dayjs as a default NCDating

- implements NCDating

```typescript
export class DayjsDating implements NCDating {
  private _day: Dayjs = dayjs();

  constructor() {
    dayjs.extend(utc);
    dayjs.extend(timezone);
    dayjs.extend(relativeTime);
    dayjs.extend(duration);
  }

  now(): NCDating {
    this._day = dayjs();
    return this;
  }

  create(m: number): NCDating {
    this._day = dayjs(m);
    return this;
  }
  ...
}
```

- regist instance

```typescript
export class AppConfiguration implements NCApplicationConfiguration {
  config(container: ServiceLocator): void {
    container.registFactory(NCDatingClassName, () => new DayjsDating());
  }
}
```

# TO-DO

[ ] Default FetchNetworking  
[ ] NCNetwork.setBaseUrl

# Example Project

- run

```shell
cd example
yarn install
yarn start
```