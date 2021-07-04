let numbers = document.querySelectorAll(".numberButton");
let display = document.querySelector("#display");
let operators = document.querySelectorAll(".operator");
display.innerText = "";
let currentTotal = "";
let overallTotal = 0;
let operatorsList = ["+", "-", "*", "/", "="];
let currentEval = [];
let lastOp = "";


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

    console.log("here");

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
  

     if(isNotOperator(e.target.innerText) == true) {

    currentTotal += e.target.innerText; 

    }

    display.innerText += e.target.innerText;

    if (display.innerText.length > 15) {

        display.innerText = display.innerText.slice(1)
    }      

}



function operatorClick(e) {
    
    currentEval.push(parseInt(currentTotal));   

    if(currentEval.length< 2) {

        display.innerText = currentTotal;
        currentTotal = 0;
        lastOp = e.target.innerText;        
        return;
    } 

    if (currentEval.length == 2) {    

        overallTotal = operate(lastOp, parseInt(currentEval[0]), parseInt(currentEval[1]));
        currentEval= [];
        currentEval.push(overallTotal);
        lastOp = e.target.innerText;       
        
    }   
    
    currentTotal = 0;   
    display.innerText = overallTotal;
    
}


function isNotOperator(target) {

    for (i = 0; i <= operatorsList.length; i++) {

        if (operatorsList[i] === target) {

            
            return false;
        }
    }

    return true;
}


