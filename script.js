let numbers = document.querySelectorAll(".numberButton");
let display = document.querySelector("#displayBottom");
let operators = document.querySelectorAll(".operator");


display.innerText = "";
let currentInput = 0;
let overallTotal = 0;
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

    console.log(operator + " oop")


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

function resetValues() {

    currentEval = new Object;
    currentInput = 0;
}

function setLastOp(operator) {

    lastOp = operator;


}


function operatorClick(e) {   


    

 

    if(!("num1" in currentEval)) {

        console.log("here")

    
        currentEval.num1 = currentInput;
        lastOp = e.target.innerText;
        currentInput = 0;
        return;
    }

  

    else if("num1" in currentEval) {

       

        currentEval.num2 = currentInput;
        currentEval.operator = lastOp;  

        let total = calculate(currentEval);

        resetValues();
        currentEval.num1 = total;  
        setLastOp(e.target.innerText);

        console.log(total);

    }
  

}


function calculate(number) {

    console.log("here")

    let num1 = parseFloat(number.num1);
    let num2 = parseFloat(number.num2);
    let operator = number.operator;
    console.log(operator);
    

    return  operate(operator, num1, num2);
 
 
  
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
