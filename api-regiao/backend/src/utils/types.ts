export interface ICountry {
    name: string;
    region: Eregion;
    capital: string;
    population: number;
    flags: string;
}

export enum Eregion {
    Africa = "Africa",
    Americas = "Americas",
    Asia = "Asia",
    Europe = "Europe",
    Oceania = "Oceania",
}

export const listCountries: ICountry[] = []
