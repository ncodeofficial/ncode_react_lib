import { makeAutoObservable } from "mobx";
import { NCLog } from "@ncodedcode/ncode_react_lib";

export const CounterViewModelClassName = "CounterViewModel";
export const CounterViewModelClassName2 = "CounterViewModel2";

export interface CounterViewModel {
  value: number;
  increase(): void;
  decrease(): void;
}

export class CounterViewModelImpl implements CounterViewModel {
  constructor() {
    makeAutoObservable(this);
  }

  private count = 0;

  get value() {
    return this.count;
  }

  increase() {
    NCLog.d("increase");
    this.count += 1;
  }

  decrease() {
    NCLog.d("decrease");
    this.count -= 1;
  }
}
