export interface CustomDate {
    year: number;
    month: number;
    day: number;
}

export const parseDate = (dateStr?: string): CustomDate | undefined => {
    if (dateStr) {
        const year = parseInt(dateStr.substring(0, 4), 10);
        const month = parseInt(dateStr.substring(4, 6), 10);
        const day = parseInt(dateStr.substring(6, 8), 10);

        return {
            year,
            month,
            day,
        };
    }

    return undefined;
};
