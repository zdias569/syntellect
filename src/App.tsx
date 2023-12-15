import { observer } from 'mobx-react-lite';

import TextControlView from "./components/TextControlView";
import TextControlViewModel from "./components/TextControlViewModel";
import AutocompleteControlView from "./components/AutocompleteControlView";
import AutocompleteControlViewModel from "./components/AutocompleteControlViewModel";

import "./App.css";

const autocompleteViewModel1 = new AutocompleteControlViewModel(3);
const autocompleteViewModel2 = new AutocompleteControlViewModel(10);

// 1. почему обьектные модели для текстового контрола создаются в самом компоненте и следовательно могут пересоздаваться?
// Объектные модели для текстового контрола не должны создаваться в самом компоненте,
// так как это может привести к их пересозданию при каждом рендере компонента.
// Не заметил когда отправлял...

const textControlViewModel1: TextControlViewModel = new TextControlViewModel(2, {
    rightButtons: [
        {
            text: "Clear",
            onClick: () => textControlViewModel1.setInputValue(""),
        },
        {
            text: "Hello",
            onClick: () => textControlViewModel1.setInputValue("Hello world!"),
        },
    ],
});

const textControlViewModel2: TextControlViewModel = new TextControlViewModel(1, {
    leftButtons: [
        {
            text: "Alert",
            onClick: () => alert(textControlViewModel2.inputValue),
        },
    ],
    rightButtons: [
        {
            text: "Check",
            onClick: () => {
                const num = Number(textControlViewModel2.inputValue);
                if (!isNaN(num)) {
                    alert(num);
                }
            },
        },
    ],
});

const App = observer(() => {
    return (
        <div className='app-container'>
            <h2>
                Текстовые контролы
            </h2>
            <div>
                <h3>
                    Контрол с 2 кнопками справа
                </h3>
                <p>
                    При нажатии на первую кнопку очищается содерживое в контроле;
                    <br />
                    При нажатии на вторую кнопку текст в контроле меняется на 'Hello world!';
                </p>
                <TextControlView viewModel={textControlViewModel1} />
                <h3>
                    Контрол с 1 кнопкой справа и 1 кнопкой слева
                </h3>
                <p>
                    При нажатии на кнопку справа вызывается alert с текстом в контроле;
                    <br />
                    При нажатии на кнопку слева проверяем, что в контроле введено число и если это так, то выводим число через alert;
                </p>
                <TextControlView viewModel={textControlViewModel2} />
            </div>
            <br />
            <br />
            <div>
                <h2>
                    Контрол-автокомплит
                </h2>
                <h3>
                    Максимальное кол-во подсказок - 3
                </h3>
                <AutocompleteControlView viewModel={autocompleteViewModel1} />
                <h3>
                    Максимальное кол-во подсказок - 10
                </h3>
                <AutocompleteControlView viewModel={autocompleteViewModel2} />
            </div>
        </div>
    )
});

export default App;
