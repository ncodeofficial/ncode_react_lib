import {JSDateDating} from "../JSDateDating";

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
        })
    });
});