let numbers = document.querySelectorAll(".numberButton");
let display = document.querySelector("#displayBottom");
let operators = document.querySelectorAll(".operator");
let clearButton = document.querySelector("#clear");
let deleteButton = document.querySelector("#delete");


display.innerText = "";
let currentInput = "";
const operatorsList = ["+", "-", "*", "/", "="];
let currentEval = {};
let lastOp = "";

numbers.forEach(function (number) {

    number.addEventListener("click", buttonclick);
});

operators.forEach(function (operator) {

    operator.addEventListener("click", operatorClick)

});

clearButton.addEventListener("click", clear);
deleteButton.addEventListener("click", undo);

//calculator functionality

let add = function (num1, num2) {

    return num1 + num2;

}

let subtract = function (num1, num2) {


    return num1 - num2;
}

let multiply = function (num1, num2) {

    return num1 * num2;
}

let divide = function (num1, num2) {

    return (num1 / num2)
}

function operate(operator, num1, num2) {

    let operators = {
        "+": add,
        "*": multiply,
        "/": divide,
        "-": subtract,
    }

    let calc = operators[operator];

    let result = calc(parseFloat(num1), parseFloat(num2));

    if (isInt(result)) {

        return parseInt(result);
    }


    return parseFloat(result).toPrecision(4);
}

//gui

function buttonclick(e) {

    currentInput += e.target.innerText;
    updateDisplayText(e.target.innerText);

    if (display.innerText.length > 15) {

        setDisplay(display.innerText.slice(1));
    }

}

function operatorClick(e) {


    if (e.target.innerText == "=" && currentInput != "") {

        handleEvaluation(getLastOp());
        setLastOp("");
        return;
    }

    if (checkEvalForNum1() == true && getCurrentEval().num1 == "") {

        getCurrentEval().num1 = parseInt(currentInput);
    }

    if (checkEvalForNum1() === false && currentInput != "") {

        getCurrentEval().num1 = currentInput;
        setLastOp(e.target.innerText);
        setDisplay(getCurrentEval().num1 + e.target.innerText)
        currentInput = "";
        return;
    }

    if (checkEvalForNum1() == true && currentInput == "" && e.target.innerText != "=") {




        setLastOp(e.target.innerText);
        setDisplay(getCurrentEval().num1 + e.target.innerText)
        return;

    } else if ((checkEvalForNum1() === true && currentInput != "")) {

        handleEvaluation(e.target.innerText);
        setLastOp(e.target.innerText);
        updateDisplayText(getLastOp());
        return;

    }

}


//helper functions

function handleEvaluation(op) {

    getCurrentEval().num2 = currentInput;
    getCurrentEval().operator = getLastOp();
    let total = calculate(getCurrentEval());
    resetValues();
    getCurrentEval().num1 = total;
    setDisplay(total);
}

function calculate(number) {

    let num1 = parseFloat(number.num1);
    let num2 = parseFloat(number.num2);
    let operator = number.operator;
    return operate(operator, num1, num2);

}

function isInt(n) {

    return n % 1 === 0;
}

function resetValues() {

    currentEval = new Object;
    currentInput = "";
}

function setLastOp(operator) {

    lastOp = operator;
}

function getLastOp() {

    return lastOp;
}

function getCurrentInput() {

    return currentInput;
}

function getCurrentEval() {

    return currentEval;
}

function checkEvalForOperator() {

    let evaluation = getCurrentEval();

    return ("operator" in evaluation);
}

function checkEvalForNum1() {

    let evaluation = getCurrentEval();

    return ("num1" in evaluation);
}

function setDisplay(text) {

    display.innerText = text;

    if (display.innerText.length > 15) {

        setDisplay(display.innerText.slice(1));
    }

}

function updateDisplayText(text) {

    display.innerText += text;

    if (display.innerText.length > 15) {

        setDisplay(display.innerText.slice(1));
    }

}

function clear() {

    resetValues();
    setDisplay("");
    currentInput = "";
}

function undo() {


}