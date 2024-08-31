export interface Age {
    value: number;
    unit: string;
}

export const parseAge = (ageStr?: string): Age | undefined => {
    if (ageStr) {
        const value = parseInt(ageStr.slice(0, 3));
        const unit = ageStr[3];

        return {
            value,
            unit,
        };
    }

    return undefined;
};
