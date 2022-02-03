import { UTCTime } from "../models/UTCTime";

export const UTCServiceClassName = "UTCService";

export interface UTCService {
  getUtcNow(): Promise<UTCTime>;
}
