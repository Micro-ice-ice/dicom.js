import { expect, test } from 'vitest';
import { parseDate, CustomDate } from '../../src/utils/CustomDate';

test(`date = '19590629'`, () => {
    const result: CustomDate = { year: 1959, month: 6, day: 29 };
    expect(parseDate('19590629')).toEqual(result);
});

test(`date = '19930822'`, () => {
    const result: CustomDate = { year: 1993, month: 8, day: 22 };
    expect(parseDate('19930822')).toEqual(result);
});
