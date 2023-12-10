import { makeObservable, observable, action } from "mobx";

export interface Button {
    text: string;
    onClick: () => void;
}

export default class TextControlViewModel {
    inputValue = "";
    leftButtons: Button[] = [];
    rightButtons: Button[] = [];

    constructor(private maxButtons: number, private buttonsConfig?: { leftButtons?: Button[]; rightButtons?: Button[] }) {
        makeObservable(this, {
            inputValue: observable,
            leftButtons: observable,
            rightButtons: observable,
            setInputValue: action,
        });

        if (buttonsConfig?.leftButtons) {
            this.leftButtons = buttonsConfig.leftButtons.slice(0, this.maxButtons);
        }

        if (buttonsConfig?.rightButtons) {
            this.rightButtons = buttonsConfig.rightButtons.slice(0, this.maxButtons);
            }
        }

    setInputValue(value: string) {
        this.inputValue = value;
    }
}