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
let overallTotal = ""; //unused

numbers.forEach(function (number) {

    number.addEventListener("click", buttonclick);
});

operators.forEach(function (operator) {

    operator.addEventListener("click", operatorClick)

});

clearButton.addEventListener("click", clear);
//deleteButton.addEventListener("click", undo);

//calculator logic

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

    //problem starts when we try to add more numbers to the returned result after evaluation
    /* 22 + 22 = 44
    at this point our evaluation has num1: 44;
    then if i press 4 again
    eval num1 still = 44
    and current input = 4 (just pressed)
    if i call an operator we get to line 126 and an error gets thrown
    seemingly because its trying to evaluate with num1: 44 num2: curreninput and lastop as ""
    error throws because last op is blank
    need num1 to become num1 + 4 (string) so 444
    and last op needs to become the operator just pressed
    so its like starting back from the beginning wuth num2: blank


    if(num1 and num2 exist and lastop = "")

    num1 = num1 to string + num2 
    num2 = nothing
    last op = event
    return

    or

    problem begins after evaluation

    so if we have just completed an evaluation
    set currentinput to the result
    then if we type more numbers add them to current input until we press an operator
    then proceed as normal
    that way we start fresh with an empty object


    */

   /* if(checkEvalForNum1() && getLastOp() == "") {

        console.log("trig")

        resetAfterEval(e.target.innerText);
        return;


    }
*/

  

    if (e.target.innerText == "=" && currentInput != "") { //if user selects "=" try to evaluate
        // return if user is trying to evaluate a non expression such as "33=". 

        try {

            handleEvaluation("=");
            setLastOp("");
            return;

        } catch {

            console.log("put another number in dummy")
            return;
        }
    }

    if (checkEvalForNum1() == false && currentInput != "") { //we dont yet have a num1, but we know that an operator was pressed
        //and the currentInput is not empty - we set num1 to currentinput and store the operator for use when we get our next input,
        getCurrentEval().num1 = currentInput;
        setLastOp(e.target.innerText);
        setDisplay(getCurrentEval().num1 + e.target.innerText)
        currentInput = "";
        return;
    }

    if (checkEvalForNum1() == true && currentInput == "" && e.target.innerText != "=") { //we have num1, so we are waiting for num2
        //we set the operator to the one triggering the event, giving us num1 + operator, so you can switch between operators until you add a num2, 
        //prevents multi operators being inputted and stored,
        setLastOp(e.target.innerText);
        setDisplay(getCurrentEval().num1 + e.target.innerText)
        return;

    } else if ((checkEvalForNum1() === true && currentInput != "")) { //we know that we have number one ready to evaluate
        //and we know currentInput contains a value, so we can put them together for evaluation,
        handleEvaluation(e.target.innerText);
        setLastOp(e.target.innerText);
        updateDisplayText(getLastOp());
        return;

    }


    /*

    if (checkEvalForNum1() == true && getCurrentEval().num1 == "") {

        console.log("reached 1")

        getCurrentEval().num1 = parseInt(currentInput);
    }

    */

}


//helper functions




function handleEvaluation(op) {

    getCurrentEval().num2 = currentInput;
    getCurrentEval().operator = getLastOp();
    let total = calculate(getCurrentEval());
    resetValues();

    if(op == "=") {
        
        currentInput = total;
    }

    else {

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

function resetAfterEval(op) {

    let obj = getCurrentEval();
    obj.num1 = obj.num1.toString() + obj.num2.toString();
    delete obj.num2;
    setLastOp(op);
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

function checkEvalForNum2() {

    let evaluation = getCurrentEval();

    return ("num2" in evaluation);
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

