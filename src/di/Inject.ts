import { NCApplicationContext } from "../NCApplicationContext";

export const Inject = <T>(type: any) =>
  NCApplicationContext.global.container.resolve<T>(type);
