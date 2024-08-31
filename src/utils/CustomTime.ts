export interface CustomTime {
    hours?: number;
    minutes?: number;
    seconds?: number;
    milliseconds?: number;
}

export const parseTime = (timeStr?: string): CustomTime | undefined => {
    if (!timeStr) {
        return undefined;
    }

    // Удаление пробелов в конце строки
    timeStr = timeStr.trim();

    // Регулярное выражение для проверки и разбора строки времени
    const timeRegex = /^(\d{2})(\d{2})(?:(\d{2})(?:\.(\d{1,6}))?)?$/;
    const match = timeStr.match(timeRegex);

    if (!match) {
        return undefined;
    }

    const [, hoursStr, minutesStr, secondsStr, fractionStr] = match;

    // Преобразование строковых значений в числа
    const hours = parseInt(hoursStr, 10);
    const minutes = parseInt(minutesStr, 10);
    const seconds = secondsStr ? parseInt(secondsStr, 10) : undefined;
    const milliseconds = fractionStr ? parseFloat('0.' + fractionStr) * 1000 : undefined;

    // // Валидация диапазонов значений
    // if (
    //     hours < 0 ||
    //     hours > 23 ||
    //     minutes < 0 ||
    //     minutes > 59 ||
    //     seconds < 0 ||
    //     seconds > 60 ||
    //     (seconds === 60 && (hours !== 23 || minutes !== 59)) || // допускается только в 23:59:60
    //     (milliseconds !== undefined && (milliseconds < 0 || milliseconds > 999999))
    // ) {
    //     return undefined;
    // }

    // Формирование объекта CustomTime
    const result: CustomTime = {};
    if (hours !== undefined) result.hours = hours;
    if (minutes !== undefined) result.minutes = minutes;
    if (seconds !== undefined) result.seconds = seconds;
    if (milliseconds !== undefined) result.milliseconds = milliseconds; // Преобразование микросекунд в миллисекунды

    return result;
};
