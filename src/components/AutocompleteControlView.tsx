import React from "react";
import { observer } from "mobx-react-lite";
import AutocompleteControlViewModel from "./AutocompleteControlViewModel";

interface Props {
    viewModel: AutocompleteControlViewModel;
}

const AutocompleteControlView = observer(({ viewModel }: Props) => {
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        viewModel.setInputValue(event.target.value);
    };

    const handleSuggestionClick = (index: number) => {
        viewModel.selectSuggestion(index);
    };

    return (
        <div>
            <input
                type="text"
                value={viewModel.inputValue}
                onChange={handleInputChange}
            />
            {viewModel.showSuggestions &&
                <ul>
                    {viewModel.suggestions.map((suggestion, index) => (
                        <li key={index} onClick={() => handleSuggestionClick(index)}>
                            {suggestion.name} - {suggestion.fullName} - {suggestion.flag}
                        </li>
                    ))}
                </ul>
            }
        </div>
    );
});

export default AutocompleteControlView;