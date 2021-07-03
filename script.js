let numbers = document.querySelectorAll(".numberButton");
let display = document.querySelector("#display");
let operators = document.querySelectorAll(".operator");
display.innerText = "";
let currentTotal = 0;
let overallTotal = 0;
let currentCalculation = [];
let operatorsList = ["+", "-", "*", "/", "="];
let currentEval = [];

numbers.forEach(function(number) {

 
    number.addEventListener("click", buttonclick);
});

operators.forEach(function(operator) {

    operator.addEventListener("click", operatorClick)
    operator.addEventListener("click", buttonclick);
});

let add = function(num1, num2) {

    return num1 + num2;

}

let subtract = function(num1, num2) {

    return num1 - num2;
}

let multiply = function(num1, num2) {

    return num1 * num2;
}

let divide = function(num1, num2) {

    return num1/num2;
}

function operate(operator, num1, num2) {

    console.log(operator + "this is it")

    let operators = {
        "+": add,
        "*": multiply,
        "/": divide,
        "-": subtract,
    }
    let calc = operators[operator];

    return calc(parseInt(num1), parseInt(num2));
}

function buttonclick(e) {  

    

    console.log(e.target.innerText)

    if(isNotOperator(e.target.innerText)) {

        currentTotal += e.target.innerText;
        console.log(currentTotal);




    }

    display.innerText += e.target.innerText;

    

    if (display.innerText.length > 15) {

        display.innerText = display.innerText.slice(1)
    }


    

}



function operatorClick(e) {

    let op = e.target.innerText;
    let num1 = currentTotal;
    let num2 = overallTotal;

    overallTotal = operate(op, num1, num2);
    currentTotal = 0;
    console.log(overallTotal + "totaql");  
}


function isNotOperator(target) {

    for (i = 0; i <= operatorsList.length; i++) {

        if (operatorsList[i] === target) {

            
            return false;
        }
    }

    return true;
}

