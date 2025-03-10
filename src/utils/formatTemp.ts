import { Maybe } from "../services/weatherApi/weatherTypes"

export const formatTemp = (temp: Maybe<number|string>) => {
    if (temp == null || isNaN(Number(temp))) return '';
    return `${Number(temp).toFixed(0)}°C`;
}