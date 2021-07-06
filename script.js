let numbers = document.querySelectorAll(".numberButton");
let display = document.querySelector("#displayBottom");
let operators = document.querySelectorAll(".operator");
let clearButton = document.querySelector("#clear");
let deleteButton = document.querySelector("#delete");
let decimal = document.querySelector("#decimal");


display.innerText = "";
let currentInput = "";
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
decimal.addEventListener("click", addDec);

//gui

function buttonclick(e) {

    currentInput += e.target.innerText;
    updateDisplayText(e.target.innerText);

    if (display.innerText.length > 15) {

        setDisplay(display.innerText.slice(1));
    }

}

function addDec(e) {

    console.log("reached")

    if (currentInput.includes(e.target.innerText)) {

        return;
    } else {

        currentInput += e.target.innerText;

        updateDisplayText(e.target.innerText);

    }


}

function operatorClick(e) {

    if (e.target.innerText == "=" && currentInput != "") { //if user selects "=" try to evaluate
        // return if user is trying to evaluate a non expression such as "33 =". 

        try {

            handleEvaluation(e.target.innerText);
            setLastOp("");
            return;

        } catch {

            console.log("Try inputting a number")
            return;
        }
    }

    if (checkEvalForProp("num1") == false && currentInput != "") { //we dont yet have a num1, but we know that an operator was pressed
        //and the currentInput is not empty - we set num1 to currentinput and store the operator for use when we get our next input,
        getCurrentEval().num1 = currentInput;
        setLastOp(e.target.innerText);
        setDisplay(getCurrentEval().num1 + e.target.innerText)
        currentInput = "";
        return;

    } else if (checkEvalForProp("num1") == true && currentInput == "" && e.target.innerText != "=") { //we have num1, so we are waiting for num2
        //we set the operator to the one triggering the event, giving us num1 + operator, so you can switch between operators until you add a num2, 
        //prevents multi operators being inputted and stored,
        setLastOp(e.target.innerText);
        setDisplay(getCurrentEval().num1 + e.target.innerText)
        return;

    } else if ((checkEvalForProp("num1") === true && currentInput != "")) { //we know that we have number one ready to evaluate
        //and we know currentInput contains a value, so we can put them together for evaluation,
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

    if (op == "=") {
        currentInput = total.toString();
    } else {

        getCurrentEval().num1 = total;
    }

    setDisplay(total);
}

function calculate(number) {

    let num1 = parseFloat(number.num1);
    let num2 = parseFloat(number.num2);
    let operator = number.operator;
    return operate(operator, num1, num2);

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

function checkEvalForProp(prop) {

    let evaluation = getCurrentEval();

    return (prop in evaluation);
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

//calculator logic


function isInt(n) {

    return n % 1 === 0;
}


let add = function (num1, num2) {

    return num1 + num2;

}

let subtract = function (num1, num2) {

    return num1 - num2;
}

let multiply = function (num1, num2) {

    console.log(num1 + "in calc")

    console.log(num1 * num2)

    return (num1 * num2);
}

let divide = function (num1, num2) {

    return (num1 / num2)
}

function operate(operator, num1, num2) {

    console.log(parseFloat(num1))
    console.log(num2)

    let operators = {
        "+": add,
        "*": multiply,
        "/": divide,
        "-": subtract,
    }

    let calc = operators[operator];

    let result = calc(parseFloat(num1), parseFloat(num2));

    if (result % 1 === 0) {

        return result.toPrecision();
    }

    return (result.toPrecision(2));
}

//del, clear and reset functions


function undo() {

    if (currentInput.length > 0) {

        currentInput = currentInput.slice(0, -1);
        display.innerText = display.innerText.slice(0, -1)

    }
}

function clear() {

    resetValues();
    setDisplay("");
    currentInput = "";
}

function resetValues() {

    currentEval = new Object;
    currentInput = "";
}