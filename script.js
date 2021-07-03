let numbers = document.querySelectorAll(".numberButton");
let display = document.querySelector("#display");
let operators = document.querySelectorAll(".operator");
display.innerText = "";
let currentTotal = 0;
let currentCalculation = [];


console.log(numbers);
numbers.forEach(function(number) {

    number.addEventListener("click", numberClick);
});

operators.forEach(function(operator) {

    operator.addEventListener("click", operatorClick)
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

    let operators = {
        "add": add,
        "times": multiply,
        "divide": divide,
        "subtract": subtract,
    }
    let calc = operators[operator];
    return calc(num1, num2);
}

function numberClick(e) {

    let number = e.target.innerText;
    currentTotal += e.target.innerText;

    display.innerText += number;

    if (display.innerText.length > 15) {

        display.innerText = display.innerText.slice(1)
    }

}

function operatorClick(e) {

    if (currentCalculation.length === 0) {

        currentCalculation.push(display.innerText);
        currentCalculation.push(e.target.innerText);
        
    }

    console.log(currentCalculation);

  
}

function updateDisplay(data) {

    
}