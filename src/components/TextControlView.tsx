import React from "react";
import { observer } from "mobx-react-lite";
import TextControlViewModel, { Button } from "./TextControlViewModel";

interface Props {
    viewModel: TextControlViewModel;
}

const TextControlView = observer(({ viewModel }: Props) => {
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        viewModel.setInputValue(event.target.value);
    };

    const handleButtonClick = (button: Button) => {
        button.onClick();
    };

    return (
        <div>
            {viewModel.leftButtons.map((button, index) => (
                <button
                    key={index}
                    onClick={() => handleButtonClick(button)}
                >
                    {button.text}
                </button>
            ))}
            <input
                type="text"
                value={viewModel.inputValue}
                onChange={handleInputChange}
            />
            {viewModel.rightButtons.map((button, index) => (
                <button
                    key={index}
                    onClick={() => handleButtonClick(button)}
                >
                    {button.text}
                </button>
            ))}
        </div>
    );
});

export default TextControlView;