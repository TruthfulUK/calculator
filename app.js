const buttons = document.querySelectorAll('button');
const screenCurrentVal = document.querySelector('.value');
const screenStoredVal = document.querySelector('.stored');

let storedVal;                  // num
let currentVal;                 // num 
let operator;                   // string
let displayVal = "0";           // string
let isDecimalDisabled = false;  // bool

function init() {
    // Initialize button event listeners
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

    // Initialize screen
    screenCurrentVal.textContent = displayVal;
    screenStoredVal.textContent = "";
}

// Updates screen display on value inputs
function updateDisplay(input) {
    if (isDecimalDisabled && input === "." || displayVal.length > 13) {
        return
    } else {
        if (input === ".") {
            isDecimalDisabled = true;
        }
        if (displayVal[0] === "0" && displayVal.length <= 1 && input !== ".") {
            displayVal = input;
        } else {
            displayVal += input;
        }
        screenCurrentVal.textContent = displayVal;
    }
}

// Updates stored values line (storedVal and operator)
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

// Perform task on button event
function performTask(task) {
    switch(task) {
        case "clear":
            clearAll();
            break;
        case "backspace":
            backspace();
            break;
        case "operate":
            verifyOperate();
            break;
    }
}

// Set operator value or perform math operation (chaining)
function addOperator(input) {
    // Update operator variable and stored display if displayVal is empty
    if (storedVal !== undefined && displayVal === "") {
        operator = input;
        updateStoredDisplay();
    // Perform math operation if displayVal is not empty and user clicks another math func (chaining)
    } else if (storedVal !== undefined && displayVal !== "") {
        const calculation = operate(operator, storedVal, Number.parseFloat(displayVal));
        storedVal = calculation;
        operator = input;
        isDecimalDisabled = false;
        displayVal = "";
        screenCurrentVal.textContent = displayVal;
        updateStoredDisplay();
    // Default functionality is storedVal is not assigned a value
    } else {
        storedVal = Number.parseFloat(displayVal);
        operator = input;
        displayVal = "";
        screenCurrentVal.textContent = displayVal;
        isDecimalDisabled = false;
        updateStoredDisplay();
    }
}

/*
    Tasks
*/

// Perform math operation if "=" button is clicked (i.e not chained operation)
function verifyOperate() {
    function displayResult(calculation) {
        isDecimalDisabled = false;
        storedVal = undefined;
        operator = undefined;
        displayVal = calculation.toString();
        screenCurrentVal.textContent = displayVal;
        screenStoredVal.textContent = "";
    }
    if (storedVal !== undefined && displayVal === "") {
        const calculation = operate(operator, storedVal, storedVal);
        displayResult(calculation);
    } else if ((storedVal !== undefined && displayVal !== "")) {
        const calculation = operate(operator, storedVal, Number.parseFloat(displayVal));
        displayResult(calculation);
    }
    
}

// Reset calculator to initialization state
function clearAll() {
    storedVal = undefined;
    currentVal = undefined;
    operator = undefined;
    displayVal = "0";
    isDecimalDisabled = false;
    screenCurrentVal.textContent = displayVal;
    screenStoredVal.textContent = "";
}

// Remove last character in displayVal string & update screen - defaults to 0
function backspace() {
    if (displayVal.length <= 1) {
        displayVal = "0";
        screenCurrentVal.textContent = displayVal;
    } else {
        displayVal = displayVal.substring(0, displayVal.length - 1);
        if (displayVal[displayVal.length - 1] === ".") {
            isDecimalDisabled = false;
        }
        screenCurrentVal.textContent = displayVal;
    }
}

/* 
    Math functionality
*/

// Operate switch - only explicitly called by other functions
function operate(operator, a, b) {
    let result;
    switch(operator) {
        case "add":
            result = add(a, b);
            return Math.round((result + Number.EPSILON) * 10000000) / 10000000;
        case "subtract":
            result = subtract(a, b);
            return Math.round((result + Number.EPSILON) * 10000000) / 10000000;
        case "multiply":
            result = multiply(a, b);
            return Math.round((result + Number.EPSILON) * 10000000) / 10000000;
        case "divide":
            if (a === 0 || b === 0) {
                alert('Infinity - are you happy now?')
                clearAll();
                return;
            } else {
                result = divide(a, b);
                return Math.round((result + Number.EPSILON) * 10000000) / 10000000;
            }
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