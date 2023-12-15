export interface CountryInfo {
    name: string;
    fullName: string;
    flag: string;
}

// 4. а автокомплите не учитывается возможная гонка состояний.
// Вместо использования общего ресурса countries, можно передавать его как параметр в функцию getCountryByName.
// Таким образом, каждый вызов функции будет работать с собственной копией countries, и состояние гонки будет исключено.

export async function getCountryByName(countryName: string, countriesData: CountryInfo[]): Promise<CountryInfo[]> {
    return new Promise((resolve) => {
        setTimeout(resolve, getRandom(100, 800));
    }).then(() => {
        if (typeof countryName !== "string" || !countryName) {
            return [];
        }

        const searchText = countryName.toLocaleLowerCase();

        const filteredCountries = countriesData.filter(
            (x) =>
                x.name.toLocaleLowerCase().startsWith(searchText) ||
                x.fullName.toLocaleLowerCase().startsWith(searchText)
        );

        // 2. в автокомплите данные от api могут дублироваться, это нужно учитывать.
        // Переписал код ниже с учетом замечания.

        const uniqueCountries = filteredCountries.reduce((accumulator: CountryInfo[], currentValue: CountryInfo) => {
            const existingCountry = accumulator.find((item) => item.name === currentValue.name);

            if (!existingCountry) {
                accumulator.push(currentValue);
            }

            return accumulator;
        }, []);

        return uniqueCountries;
    });
}

function getRandom(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
