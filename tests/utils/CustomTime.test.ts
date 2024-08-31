import { expect, test } from 'vitest';
import { parseTime, CustomTime } from '../../src/utils/CustomTime';

test(`time = '070907.0705'`, () => {
    const result: CustomTime = { hours: 7, minutes: 9, seconds: 7, milliseconds: 70.5 };
    expect(parseTime('070907.0705')).toEqual(result);
});

test(`time = '1010'`, () => {
    const result: CustomTime = { hours: 10, minutes: 10 };
    expect(parseTime('1010')).toEqual(result);
});

test(`time = '143359'`, () => {
    const result: CustomTime = { hours: 14, minutes: 33, seconds: 59 };
    expect(parseTime('143359')).toEqual(result);
});
