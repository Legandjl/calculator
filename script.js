let numbers = document.querySelectorAll(".numberButton");
let display = document.querySelector("#displayBottom");
let overallCalculationDisplay = document.querySelector("#displayTop");
let operators = document.querySelectorAll(".operator");

let canUseOperator = false;
overallCalculationDisplay.innerText = "";
display.innerText = "";
let currentInput = 0;
let overallTotal = 0;
const operatorsList = ["+", "-", "*", "/", "="];
let currentEval = [];
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
 
    canUseOperator = true;
    display.innerText += e.target.innerText;    

    if (display.innerText.length > 15) {

        display.innerText = display.innerText.slice(1)
    }    

}

function equals(e) {

    if(currentEval.length < 2) {

        return;
    }
    
}

function operatorClick(e) { 

}

function udateDisplay(number) {


}


function isNotOperator(target) {

    for (i = 0; i <= operatorsList.length; i++) {

        if (operatorsList[i] === target) {

            
            return false;
        }
    }

    return true;
}

function isInt(n) {

    return n % 1 === 0;
}
