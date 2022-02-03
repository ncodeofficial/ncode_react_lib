import { UTCEntity } from "../entities/UTCEntity";
import { UTCRepository } from "./UTCRepository";
import { NCNetwork } from "@ncodedcode/ncode_react_lib";

export class UTCRepositoryImpl implements UTCRepository {
  fetchUTC(): Promise<UTCEntity> {
    const api = "http://worldtimeapi.org/api/timezone/Etc/UTC";
    return new NCNetwork().get(api).then((res) => res.data as UTCEntity);
  }
}
