import { makeObservable, observable, action, runInAction } from "mobx";
import { getCountryByName, CountryInfo } from "../api/apiService";
import DebounceTimer from "./DebounceTimer";
import countries from "../api/countries.json";

interface Suggestion extends CountryInfo {
    index: number;
}

export default class AutocompleteControlViewModel {
    inputValue = "";
    showSuggestions = false;
    suggestions: Suggestion[] = [];
    private debounceTimer = new DebounceTimer(500);

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
            this.debounceTimer.debounce(async () => {
                const suggestions = await getCountryByName(value, [...countries]);

                runInAction(() => {
                    this.suggestions = suggestions
                        .slice(0, this.maxSuggestions)
                        .map((suggestion, index) => ({ ...suggestion, index }));
                    this.showSuggestions = true;
                });
            });
        } else {
            this.debounceTimer.cancel();
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