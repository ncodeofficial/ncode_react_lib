import { UTCService } from "../../../domain/services/UTCService";
import { UTCTime } from "../../../domain/models/UTCTime";
import { makeAutoObservable } from "mobx";
import { NCDate, NCNavigator, NCOptional } from "@ncodedcode/ncode_react_lib";

export const WatchViewModelClassName = "WatchViewModel";

export interface WatchViewModel {
  displayTime: string;
  progress: boolean;

  now(): void;
  goToCounterPage(): void;
}

export class WatchViewModelImpl implements WatchViewModel {
  private readonly utcService: UTCService;

  constructor(utcService: UTCService) {
    makeAutoObservable(this);
    this.utcService = utcService;
  }

  private currentTime: NCOptional<UTCTime> = NCOptional.empty();

  progress = false;

  get displayTime() {
    return this.currentTime
      .map((c) => c.date.toString(NCDate.FORMAT_LOCAL_DATETIME))
      .orElse("");
  }

  now(): void {
    this.progress = true;

    this.utcService
      .getUtcNow()
      .then((time) => (this.currentTime = NCOptional.ofNullable(time)))
      .finally(() => (this.progress = false));
  }

  goToCounterPage(): void {
    NCNavigator.goBack();
  }
}
