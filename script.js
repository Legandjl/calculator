let numbers = document.querySelectorAll(".numberButton");
let display = document.querySelector("#displayBottom");
let operators = document.querySelectorAll(".operator");
let clearButton = document.querySelector("#clear");
let deleteButton = document.querySelector("#delete");
let decimal = document.querySelector("#decimal");
document.addEventListener("keydown", keyPressed);

display.innerText = "";
let currentInput = "";
let currentEval = {};
let lastOp = "";

numbers.forEach(function (number) {

    number.addEventListener("click", buttonclick);
    number.addEventListener("transitionend", removeClasses);
});

operators.forEach(function (operator) {
    operator.addEventListener("click", operatorClick)
    operator.addEventListener("transitionend", removeClasses)

});

clearButton.addEventListener("click", clear);
clearButton.addEventListener("transitionend", removeClasses);
deleteButton.addEventListener("click", undo);
deleteButton.addEventListener("transitionend", removeClasses);
decimal.addEventListener("click", addDec);
decimal.addEventListener("transitionend", removeClasses);

//gui

function buttonclick(e) {

    let text;    

    if(e.type == "click") {

         text = e.target.innerText;
    }

    else {

        text = e.key.toString();
    }

    currentInput += text;
    updateDisplayText(text);

    if (display.innerText.length > 15) {

        setDisplay(display.innerText.slice(1));
    }

}

function addDec(e) {

    let dec;

    if(e.type == "click") {

        dec = e.target.innerText;
    }

    else {

        dec = e.key.toString();
    }

    if (currentInput.includes(dec)) {

        return;

    } else {

        currentInput += dec;
        updateDisplayText(dec);

    }

}

function operatorClick(e) {

    let op;

    if(e.type == "click") {

        op = e.target.innerText;
    }

    else {

        op = e.key.toString();
    }

    if (op == "=" && currentInput != "") { //if user selects "=" try to evaluate
        // return if user is trying to evaluate a non expression such as "33 =". 

        try {

            handleEvaluation(op);
            setLastOp("");
            return;

        } catch {

            console.log("Try inputting a number.")
            return;
        }
    }

    if (checkEvalForProp("num1") == false && currentInput != "") { //we dont yet have a num1, but we know that an operator was pressed
        //and the currentInput is not empty - we set num1 to currentinput and store the operator for use when we get our next input,
        getCurrentEval().num1 = currentInput;
        setLastOp(op);
        setDisplay(getCurrentEval().num1 + op)
        currentInput = "";
        return;

    } else if (checkEvalForProp("num1") == true && currentInput == "" && op != "=") { //we have num1, so we are waiting for num2
        //we set the operator to the one triggering the event, giving us num1 + operator, so you can switch between operators until you add a num2, 
        //prevents multi operators being inputted and stored,
        setLastOp(op);
        setDisplay(getCurrentEval().num1 + op)
        return;

    } else if ((checkEvalForProp("num1") === true && currentInput != "")) { //we know that we have number one ready to evaluate
        //and we know currentInput contains a value, so we can put them together for evaluation,
        handleEvaluation(op);
        setLastOp(op);
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

    return (num1 * num2);
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

function keyPressed(e) { 


    let keys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9",];
    let ops = ["+", "-", "*", "/", "="];    
    let del = "Delete";
    let wipe = "c";
    let dec = ".";

    if(e.key == ".") {

        decimal.classList.add("clicked");
        addDec(e);
    }

    if (del == (e.key)) {

        deleteButton.classList.add("clicked");
        undo();
        return;
    }

    if(wipe == e.key) {

        clearButton.classList.add("clicked");
        clear();
        return;        
    }
    
    if (keys.includes(e.key)) {

        numbers.forEach(function(number) {            

            if(number.innerText == e.key.toString()) {

                number.classList.add("clicked");
              
            }
        });

       buttonclick(e);      
       
    }

    else if(ops.includes(e.key)) {

        operators.forEach(function (currentOp) {
           
            if(currentOp.innerText == e.key.toString()) {

                currentOp.classList.add("clicked");
            }
        });

        operatorClick(e);
    }
}

function removeClasses(e) {

    e.target.classList.remove("clicked");

}