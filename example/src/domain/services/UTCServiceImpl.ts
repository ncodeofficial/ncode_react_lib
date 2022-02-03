import { UTCService } from "./UTCService";
import { UTCRepository } from "../../data/repositories/UTCRepository";
import { UTCTime } from "../models/UTCTime";
import { UTCEntity } from "../../data/entities/UTCEntity";
import { NCLog, NCCache, NCDate } from "@ncodedcode/ncode_react_lib";

export class UTCServiceImpl implements UTCService {
  private readonly utcRepository: UTCRepository;

  constructor(utcRepository: UTCRepository) {
    this.utcRepository = utcRepository;
  }

  async getUtcNow(): Promise<UTCTime> {
    const cached = await new NCCache().getObject<UTCEntity>("cached_utc_time");
    NCLog.d("time cached", cached);
    if (cached) {
      return this.mapEntityToModel(cached);
    }

    const fetched = await this.utcRepository.fetchUTC();
    NCLog.d("time fetched", fetched);
    await new NCCache().putObject("cached_utc_time", fetched, 50 * 1000);

    return this.mapEntityToModel(fetched);
  }

  private mapEntityToModel(entity: UTCEntity): UTCTime {
    return new UTCTime(entity.timezone, NCDate.parse(entity.utc_datetime));
  }
}
