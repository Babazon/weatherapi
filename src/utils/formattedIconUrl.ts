import { Maybe } from "../services/weatherApi/weatherTypes";

export const formatIconUrl = (icon: Maybe<string>) => {
    return 'https:' + icon;
}