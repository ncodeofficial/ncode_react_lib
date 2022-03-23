import {JSDateDating} from "../JSDateDating";
import {ENCTimezone} from "../enum/ENCTimezone";

describe('JSDateDating tests', () => {
    describe('format', () => {
        test('year', () => {
            const y1 = new Date().getFullYear().toString()

            const y2 = new JSDateDating().year().toString()
            expect(y1).toEqual(y2);

            const y3 = new JSDateDating().format("yyyy")
            expect(y1).toEqual(y3);

            const y4 = new JSDateDating().format("YYYY")
            expect(y1).toEqual(y4);
        });
    });
    describe('getStringWithTimezone', () =>{
        test('should be Europe/Rome', () =>{
            const localDate = new Date(); // 로컬시간
            const localTimeNumber = localDate.getTime();
            const timeZoneOffset = localDate.getTimezoneOffset();
            const utcTimeNumber = localTimeNumber + timeZoneOffset * 60 * 1000;
            const diff = 1 * 60 * 60 * 1000; // ENCTimezone.EUROPE_ROME diff

            const time1 = new JSDateDating().fromDate(new Date(utcTimeNumber + diff)).format('YYYY-MM-DD HH:mm:ss');
            const time2 = new JSDateDating().getStringWithTimezone(ENCTimezone.EUROPE_ROME, 'YYYY-MM-DD HH:mm:ss');

            expect(time1).toEqual(time2);
        })
    })
});