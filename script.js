let numbers = document.querySelectorAll(".numberButton");
let display = document.querySelector("#displayBottom");
let overallCalculationDisplay = document.querySelector("#displayTop");
let operators = document.querySelectorAll(".operator");

let overallCalculation = "";
let canUseOperator = false;
overallCalculationDisplay.innerText = "";

display.innerText = "";
let currentInput = "";
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

    return num1/num2;
}

function operate(operator, num1, num2) {


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

    currentInput += e.target.innerText; 
    overallCalculation += e.target.innerText;
    canUseOperator = true;
    display.innerText += e.target.innerText;
    

    if (display.innerText.length > 15) {

        display.innerText = display.innerText.slice(1)
    }    
    

    console.log(currentInput + "this is the inpuit")
    

}

function operatorClick(e) { 

    
    if(canUseOperator == false) { 

        return;
    }

    
    
    currentEval.push(parseInt(currentInput)); 




    if(currentEval.length< 2) {      
        
        currentInput = 0;
        lastOp = e.target.innerText;  
        display.innerText += lastOp;
        canUseOperator = false;  //
        
        return;
    } 

   

    if (currentEval.length == 2) {       

        overallTotal = operate(lastOp, parseInt(currentEval[0]), parseInt(currentEval[1]));
        currentEval= [];
        currentEval.push(overallTotal);
        lastOp = e.target.innerText;       
        
    }   

    
    
    currentInput = 0; 
   

    if (isInt(overallTotal) == true) {

        display.innerText = overallTotal + lastOp;
    }

    else {

    display.innerText = Number.parseFloat(overallTotal).toPrecision(3) + lastOp;

    }

    canUseOperator = false; //calculation performed so next input should not be an operator
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
