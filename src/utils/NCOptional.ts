export class NCOptional<T> {
  private value: T | undefined;

  private constructor(value: T | undefined) {
    this.value = value;
  }

  static of<U>(value: U): NCOptional<U> {
    return new NCOptional<U>(value);
  }

  static ofNullable<U>(value: U | undefined | null): NCOptional<U> {
    if (value === undefined || value === null) return NCOptional.empty<U>();
    return new NCOptional<U>(value);
  }

  static try<U>(f: () => U): NCOptional<U> {
    try {
      return NCOptional.of(f());
    } catch (e) {
      return NCOptional.empty<U>();
    }
  }

  static empty<U>(): NCOptional<U> {
    return new NCOptional<U>(undefined);
  }

  isPresent(): boolean {
    return this.value !== undefined && this.value !== null;
  }

  isEmpty(): boolean {
    return this.value === undefined || this.value === null;
  }

  ifPresent(action: (value: T) => void) {
    if (this.isPresent()) action(this.value as T);
  }

  ifPresentOrElse(action: (value: T) => void, orElse: () => void) {
    if (this.isPresent()) {
      action(this.value as T);
    } else {
      orElse();
    }
  }

  get(): T {
    if (this.isEmpty()) throw Error("value has empty");
    return this.value as T;
  }

  orUndefined(): T | undefined {
    if (this.isEmpty()) return undefined;
    return this.get();
  }

  orElse(other: T): T {
    if (this.isEmpty()) return other;
    return this.get();
  }

  orElseGet(other: () => T): T {
    if (this.isEmpty()) return other();
    return this.get();
  }

  orElseThrow(error: () => Error): T {
    if (this.isEmpty()) throw error();
    return this.get();
  }

  do(f: (value: T) => void): NCOptional<T> {
    if (this.isEmpty()) return this;
    f(this.get());
    return this;
  }

  map<U>(mapper: (value: T) => U): NCOptional<U> {
    if (this.isEmpty()) return NCOptional.empty<U>();
    return NCOptional.of(mapper(this.get()));
  }

  try<U>(f: (t: T) => U): NCOptional<U> {
    if (this.isEmpty()) return NCOptional.empty<U>();
    try {
      return NCOptional.ofNullable(f(this.get()));
    } catch (e) {
      return NCOptional.empty<U>();
    }
  }

  flatMap<U>(mapper: (value: T) => NCOptional<U>): NCOptional<U> {
    if (this.isEmpty()) return NCOptional.empty<U>();

    const optV = mapper(this.get());
    if (optV.isPresent()) return NCOptional.of<U>(optV.get());

    return NCOptional.empty<U>();
  }

  filter(predicate: (value: T) => boolean): NCOptional<T> {
    if (this.isPresent() && predicate(this.get())) return this;
    return NCOptional.empty<T>();
  }

  equals(other: NCOptional<T>): boolean {
    return this.value === other.value;
  }

  toString(): string {
    if (this.isEmpty()) return "empty";
    return `${this.get()}`;
  }
}
