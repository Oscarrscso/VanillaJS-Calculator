let operator = '';
let buttons = document.querySelectorAll("button");
let currentValue = '';
let previousValue = '';
let subDisplay = document.getElementById("prevD");
let mainDisplay = document.getElementById("currD");
let result = '';

// Attach click event listeners to buttons
buttons.forEach(button => {
    button.addEventListener("click", event => {
        let id = event.target.id;
        switch (id) {
            case '+':
            case '-':
            case '×':
            case '÷':
                operatorPressed(id);
                break;
            case 'AC':
                reset();
                break;
            case 'DEL':
                deleteLastChar();
                break;
            case 'equal':
                calculateResult();
                break;
            default:
                appendNumberToDisplay(id);
        }
    });
});


const appendNumberToDisplay = key => {
    if (currentValue.length < 10) {
        if (key !== '0' || currentValue !== '0') {
            if (key !== '.' || !currentValue.includes('.')) {
                currentValue += key;
                mainDisplay.innerHTML = currentValue;
            }
        }
    }
};


const reset = () => {
    currentValue = '';
    previousValue = '';
    mainDisplay.innerHTML = '0';
    subDisplay.innerHTML = '';
    operator = '';
};


const deleteLastChar = () => {
    if (mainDisplay.innerHTML === 'error' || mainDisplay.innerHTML === '0') return;
    currentValue = currentValue.slice(0, -1);
    mainDisplay.innerHTML = currentValue || '0';
};

// Update the operator and store the current value as the previous value
const operatorPressed = oper => {
    if (currentValue.slice(-1) === '.' || mainDisplay.innerHTML === '0') return;
    if (currentValue && previousValue && operator) calculateResult();
    if (!subDisplay.innerHTML && mainDisplay.innerHTML) previousValue = currentValue;
    
    operator = oper;
    subDisplay.innerHTML = `${previousValue}${oper}`;
    mainDisplay.innerHTML = '';
    currentValue = '';
};


const calculateResult = () => {
    if (!currentValue || !previousValue || !operator || mainDisplay.innerHTML === '.') return;
    currentValue = parseFloat(currentValue);
    previousValue = parseFloat(previousValue);
    switch (operator) {
        case '+':
            result = previousValue + currentValue;
            break;
        case '-':
            result = previousValue - currentValue;
            break;
        case '×':
            result = previousValue * currentValue;
            break;
        case '÷':
            result = previousValue / currentValue;
            break;
    }
    renderResult();
};

// Display the calculated result
const renderResult = () => {
    currentValue = result.toString();
    if (currentValue.length > 10 && !currentValue.includes('.')) {
        mainDisplay.innerHTML = "error";
        return;
    }
    currentValue = currentValue.substring(0, 10);
    mainDisplay.innerHTML = currentValue;
    subDisplay.innerHTML = '';
    previousValue = '';
};

// Handle keyboard input
document.addEventListener('keydown', event => {
    let key = event.key;
    if (key === 'Enter') calculateResult();
    if (key === 'Backspace') deleteLastChar();
    if (['+', '-', '*', '/'].includes(key)) {
        key = key === '/' ? '÷' : key;
        key = key === '*' ? '×' : key;
        operatorPressed(key);
    }
    if (key === '.') appendNumberToDisplay(key);
    key = parseInt(key).toString();
    if (key !== 'NaN') appendNumberToDisplay(key);
});