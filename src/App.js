import { useState } from 'react';
import './App.css';

function App() {
  const [displayValue, setDisplayValue] = useState('0');
  const [operator, setOperator] = useState(null);
  const [firstValue, setFirstValue] = useState('');
  const [waitingForSecondValue, setWaitingForSecondValue] = useState(false);

  const handleDigitClick = (digit) => {
    if (waitingForSecondValue) {
      setDisplayValue(String(digit));
      setWaitingForSecondValue(false);
    } else {
      setDisplayValue((prevValue) =>
        prevValue === '0' ? String(digit) : prevValue + digit
      );
    }
  };

  const calculateResult = () => {
    const firstNum = parseFloat(firstValue);
    const secondNum = parseFloat(displayValue);

    switch (operator) {
      case '+':
        return String(firstNum + secondNum);
      case '-':
        return String(firstNum - secondNum);
      case '*':
        return String(firstNum * secondNum);
      case '/':
        return secondNum !== 0 ? String(firstNum / secondNum) : 'Error';
      case '√':
        return firstNum >= 0 ? String(Math.sqrt(firstNum)) : 'Error';
      case '³√':
        return String(Math.cbrt(firstNum));
      case 'exp':
        return String(Math.exp(firstNum));
      case 'sin':
        return String(Math.sin(firstNum));
      case 'cos':
        return String(Math.cos(firstNum));
      case 'tan':
        return String(Math.tan(firstNum));
      default:
        return displayValue;
    }
  };

  const handleOperatorClick = (clickedOperator) => {
    if (operator && firstValue) {
      setDisplayValue(calculateResult());
      setOperator(clickedOperator);
      setFirstValue(displayValue);
      setWaitingForSecondValue(true);
    } else {
      setOperator(clickedOperator);
      setFirstValue(displayValue);
      setWaitingForSecondValue(true);
    }
  };

  const handleEqualsClick = () => {
    if (operator && firstValue) {
      setDisplayValue(calculateResult());
      setOperator(null);
      setFirstValue('');
      setWaitingForSecondValue(true);
    } else {
      setWaitingForSecondValue(true);
    }
  };

  const handleDecimalClick = () => {
    if (!displayValue.includes('.')) {
      setDisplayValue((prevValue) => prevValue + '.');
    }
  };

  const handleDeleteClick = () => {
    if (displayValue.length === 1) {
      setDisplayValue('0');
    } else {
      setDisplayValue((prevValue) => prevValue.slice(0, -1));
    }
  };

  const handleClearClick = () => {
    setDisplayValue('0');
  };

  return (
    <div className="calculator">
      <div className="display">{displayValue}</div>
      <div className="buttons">
        <button onClick={() => handleDigitClick(1)}>1</button>
        <button onClick={() => handleDigitClick(2)}>2</button>
        <button onClick={() => handleDigitClick(3)}>3</button>
        <button onClick={() => handleOperatorClick('+')}>+</button>
        <button onClick={() => handleDigitClick(4)}>4</button>
        <button onClick={() => handleDigitClick(5)}>5</button>
        <button onClick={() => handleDigitClick(6)}>6</button>
        <button onClick={() => handleOperatorClick('-')}>-</button>
        <button onClick={() => handleDigitClick(7)}>7</button>
        <button onClick={() => handleDigitClick(8)}>8</button>
        <button onClick={() => handleDigitClick(9)}>9</button>
        <button onClick={() => handleOperatorClick('*')}>*</button>
        <button onClick={() => handleDecimalClick()}>.</button>
        <button onClick={() => handleDigitClick(0)}>0</button>
        <button onClick={() => handleEqualsClick()}>=</button>
        <button onClick={() => handleOperatorClick('/')}>/</button>
        <button onClick={() => handleDeleteClick()}>DEL</button>
        <button onClick={() => handleClearClick()}>C</button>
        <button onClick={() => handleOperatorClick('√')}>√</button>
        <button onClick={() => handleOperatorClick('³√')}>³√</button>
        <button onClick={() => handleOperatorClick('exp')}>exp</button>
        <button onClick={() => handleOperatorClick('sin')}>sin</button>
        <button onClick={() => handleOperatorClick('cos')}>cos</button>
        <button onClick={() => handleOperatorClick('tan')}>tan</button>
      </div>
    </div>
  );
}

export default App;
