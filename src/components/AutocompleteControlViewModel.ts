import { makeObservable, observable, action, runInAction } from "mobx";
import { getCountryByName, CountryInfo } from "../api/apiService";

interface Suggestion extends CountryInfo {
    index: number;
}

export default class AutocompleteControlViewModel {
    inputValue = "";
    showSuggestions = false;
    suggestions: Suggestion[] = [];

    constructor(private maxSuggestions: number) {
        makeObservable(this, {
            inputValue: observable,
            showSuggestions: observable,
            suggestions: observable,
            setInputValue: action,
            selectSuggestion: action,
        });
    }

    async setInputValue(value: string) {
        this.inputValue = value;
        this.showSuggestions = false;

        if (value.length > 0) {
            const suggestions = await getCountryByName(value);

            runInAction(() => {
                this.suggestions = suggestions
                .slice(0, this.maxSuggestions)
                .map((suggestion, index) => ({ ...suggestion, index }));
                this.showSuggestions = true;
            });
        }
    }

    selectSuggestion(index: number) {
        const suggestion = this.suggestions.find((s) => s.index === index);

        if (suggestion) {
            this.inputValue = suggestion.name;
            this.showSuggestions = false;
        }
    }
}