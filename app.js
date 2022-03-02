const buttons = document.querySelectorAll('button');
const screenCurrentVal = document.querySelector('.value');
const screenStoredVal = document.querySelector('.stored');

let storedVal = 0;
let currentVal = 0;
let operator = "";
let displayVal = "";
let isDecimalDisabled = false;

function init() {
    buttons.forEach(button => {
        button.addEventListener("click", e => {
            const clicked = e.target.dataset;
            if (clicked?.input) {
                updateDisplay(clicked.input);
            } else if (clicked?.task) {
                performTask(clicked.task)
            } else if (clicked?.func) {
                addOperator(clicked.func);
            } else {
                console.log("Unknown input");
            }         
        })
    })

    screenCurrentVal.textContent = currentVal;
    screenStoredVal.textContent = " ";
}

function updateDisplay(input) {
    if (isDecimalDisabled && input === ".") {
        return
    } else {
        if (input === ".") {
            isDecimalDisabled = true;
        }
        displayVal += input;
        screenCurrentVal.textContent = displayVal;
    }
    
}

function updateStoredDisplay() {
    let operatorSymbol = "";
    switch(operator) {
        case "add":
            operatorSymbol = "+";
            break;
        case "subtract":
            operatorSymbol = "-";
            break;
        case "multiply":
            operatorSymbol = "x";
            break;
        case "divide":
            operatorSymbol = "÷";
            break;
        default:
            console.error("Unknown operator");
            operatorSymbol = "";
    }
    screenStoredVal.textContent = `${storedVal} ${operatorSymbol}`;
}

function addOperator(input) {
    storedVal = Number.parseFloat(displayVal);
    operator = input;
    displayVal = "";
    isDecimalDisabled = false;
    updateStoredDisplay();

    console.log(storedVal);
    console.log(operator);
}

function performTask(task) {
    switch(task) {
        case "clear":
            clearAll();
            break;
        case "backspace":
            break;
        case "operate":
            break;
    }
}

// Tasks

function clearAll() {
    displayVal = "";
    storedVal = 0;
    currentVal = 0;
    operator = "";
    isDecimalDisabled = false;
    screenCurrentVal.textContent = currentVal;
    screenStoredVal.textContent = " ";
}



function operate(operator, a, b) {
    switch(operator) {
        case "add":
            return add(a, b);
        case "subtract":
            return subtract(a, b);
        case "multiply":
            return multiply(a, b);
        case "divide":
            return divide(a, b);
        default:
            console.error("Unknown operator");
    }
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

init();