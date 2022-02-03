import { UTCEntity } from "../entities/UTCEntity";

export const UTCRepositoryClassName = "UTCRepository";

export interface UTCRepository {
  fetchUTC(): Promise<UTCEntity>;
}
