let numbers = document.querySelectorAll(".numberButton");
let display = document.querySelector("#displayBottom");
let operators = document.querySelectorAll(".operator");


display.innerText = "";
let currentInput = "";
const operatorsList = ["+", "-", "*", "/", "="];
let currentEval = {};
let lastOp = "";

numbers.forEach(function(number) {

 
    number.addEventListener("click", buttonclick);
});

operators.forEach(function(operator) {

    operator.addEventListener("click", operatorClick)
    
});

let add = function(num1, num2) {

    return num1 + num2;

}

let subtract = function(num1, num2) {

    console.log("here");

    return num1 - num2;
}

let multiply = function(num1, num2) {

    return num1 * num2;
}

let divide = function(num1, num2) {

    return (num1/num2)
}

function operate(operator, num1, num2) {

    let operators = {
        "+": add,
        "*": multiply,
        "/": divide,
        "-": subtract,
    }
    let calc = operators[operator];

    return calc(parseFloat(num1), parseFloat(num2));
}


function buttonclick(e) {        

    currentInput += e.target.innerText; 
    display.innerText += e.target.innerText;    

    if (display.innerText.length > 15) {

        setDisplay(display.innerText.slice(1));
    }    

}

function operatorClick(e) {  
    
    if(e.target.innerText == "=") {

        handleEvaluation(getLastOp());
        setLastOp("");
        return;
    }

    if(checkEvalForNum1() === false && currentInput != "") {
        getCurrentEval().num1 = currentInput;
        setLastOp(e.target.innerText);     
        setDisplay(getCurrentEval().num1 + e.target.innerText)   
        currentInput = "";
        return;
    }

    if(checkEvalForNum1() == true && currentInput == "") {

        setLastOp(e.target.innerText);
        setDisplay(getCurrentEval().num1 + e.target.innerText)   
    }
  

    else if((checkEvalForNum1() === true && currentInput != "")) {   

        handleEvaluation(e.target.innerText);   
        setLastOp(e.target.innerText); 
        display.innerText += getLastOp();     
    
    }

}

function handleEvaluation(op) {

    getCurrentEval().num2 = currentInput;
    getCurrentEval().operator = getLastOp();  
    let total = calculate(getCurrentEval());
    resetValues();
    getCurrentEval().num1 = total;    

    if(isInt(total)){
        setDisplay(total );
    }

    else {

        setDisplay(total.toPrecision(4));
    }

}

function calculate(number) {  

    let num1 = parseFloat(number.num1);
    let num2 = parseFloat(number.num2);
    let operator = number.operator;
    return  operate(operator, num1, num2); 
  
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

function setDisplay(text){

    display.innerText = text;
}