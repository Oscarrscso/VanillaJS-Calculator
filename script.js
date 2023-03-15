// Variables
const btns = document.querySelectorAll("button");
const subDisplay = document.getElementById("prevD");
const mainDisplay = document.getElementById("currD");

let operator = '';
let currentValue = '';
let previousValue = '';

// Functions
const updateMainDisplay = () => {
  mainDisplay.innerHTML = currentValue || '0';
};

const updateSubDisplay = () => {
  subDisplay.innerHTML = previousValue ? `${previousValue}${operator}` : '';
};

const handleNumberInput = key => {
  if (currentValue.length >= 10) return;
  if (key === '0' && currentValue === '0') return;
  if (key === '.' && currentValue.includes('.')) return;

  currentValue += key;
  updateMainDisplay();
};

const ac = () => {
  currentValue = '';
  previousValue = '';
  operator = '';
  updateMainDisplay();
  updateSubDisplay();
};

const del = () => {
  if (mainDisplay.innerHTML === 'error' || mainDisplay.innerHTML === '0') return;
  currentValue = currentValue.slice(0, -1);
  updateMainDisplay();
};

const operatorPressed = oper => {
  if (currentValue.slice(-1) === '.' || mainDisplay.innerHTML === '0') return;
  if (currentValue !== '' && previousValue !== '' && operator !== '') evaluate();

  if (subDisplay.innerHTML === '' && mainDisplay.innerHTML !== '') {
    previousValue = currentValue;
  }

  operator = oper;
  updateSubDisplay();
  currentValue = '';
  updateMainDisplay();
};

const evaluate = () => {
  if (!currentValue || !previousValue || !operator || mainDisplay.innerHTML === '.') return;

  const num1 = parseFloat(previousValue);
  const num2 = parseFloat(currentValue);
  let result;

  switch (operator) {
    case '+':
      result = num1 + num2;
      break;
    case '-':
      result = num1 - num2;
      break;
    case '×':
      result = num1 * num2;
      break;
    case '÷':
      result = num1 / num2;
      break;
    default:
      return;
  }

  currentValue = result.toString();

  if (currentValue.length > 10 && !currentValue.includes('.')) {
    mainDisplay.innerHTML = 'error';
    return;
  }

  currentValue = currentValue.substring(0, 10);
  updateMainDisplay();
  previousValue = '';
  updateSubDisplay();
};

// Event listeners
btns.forEach(el => {
  el.addEventListener("click", e => {
    const id = e.target.id;

    switch (id) {
      case '+':
      case '-':
      case '×':
      case '÷':
        operatorPressed(id);
        break;
      case 'AC':
        ac();
        break;
      case 'DEL':
        del();
        break;
      case 'equal':
        evaluate();
        break;
      default:
        handleNumberInput(id);
    }
  })
});

document.addEventListener('keydown', event => {
  const key = event.key;

  if (key === 'Enter') evaluate();
  if (key === 'Backspace') del();

  if (['+', '-', '*', '/'].includes(key)) {
    const operatorKey = key === '*' ? '×' : key === '/' ? '÷' : key;
    operatorPressed(operatorKey);
  }

  if (key === '.' || !isNaN(parseInt(key))) {
    handleNumberInput(key);
  }
});