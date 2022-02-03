export enum ServiceScope {
  factory,
  single,
}

class InstanceFactory<T> {
  scope: ServiceScope;
  creator: ((locator: ServiceLocator) => T) | null;
  instance: T | null;

  constructor(scope: ServiceScope, creator: (locator: ServiceLocator) => T) {
    this.scope = scope;
    this.creator = creator;
    this.instance = null;
  }
}

export class ServiceLocator {
  private static _instances: { [key: string]: InstanceFactory<any> } = {};

  regist<T>(
    scope: ServiceScope,
    name: string,
    creator: (locator: ServiceLocator) => T
  ) {
    const factory = new InstanceFactory(scope, creator);
    ServiceLocator._instances[name] = factory;
  }

  resolve<T>(name: string): T {
    const instance = ServiceLocator._instances[name];
    if (!instance) {
      throw new Error(`regist ${name} first!!`);
    }

    const factory = instance as InstanceFactory<T>;
    if (factory.scope === ServiceScope.single) {
      if (factory.instance == null && factory.creator != null) {
        factory.instance = factory.creator(this);
        factory.creator = null;
      }
      return factory.instance as T;
    }

    if (factory.creator != null) {
      return factory.creator(this) as T;
    }

    throw new Error(`regist ${name} first!!`);
  }

  registFactory<T>(name: string, creator: (locator: ServiceLocator) => T) {
    this.regist(ServiceScope.factory, name, creator);
  }

  registSingle<T>(name: string, creator: (locator: ServiceLocator) => T) {
    this.regist(ServiceScope.single, name, creator);
  }
}
