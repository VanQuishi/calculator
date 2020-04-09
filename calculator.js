function add (a,b) {
	return a+b;
}

function subtract (a,b) {
	return a-b;
}

function multiply (a,b) {
    return a*b;
}

function divide (a,b) {
    return a/b;
}

function operate (a,operator,b) {

    switch (operator) {
        case '+':
            return add(a,b);
        case '-':
            return subtract(a,b);
        case '*':
            return multiply(a,b);
        case '/':
            return divide(a,b);

    }
}

const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.btn');
const clear = document.querySelector('.clear');
const clearAll = document.querySelector('.clearAll');
const equalSign = document.querySelector('.equalSign');
var a = 0;
var b = 0;
var operator;
var expression;
var currentDisplay;

buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
        display.textContent += button.textContent;
        currentDisplay = display.textContent;
        expression = display.textContent;
    });
});

clear.addEventListener('click', (e) =>
{
    currentDisplay = currentDisplay.slice(0, currentDisplay.length - 1);
    display.textContent = currentDisplay;
    expression = display.textContent;
});

clearAll.addEventListener('click', (e) =>
{
    display.textContent ='';
});

equalSign.addEventListener('click',(e) => {
    display.textContent += equalSign.textContent;
    expression = display.textContent;
    //processExpression(expression);
});

function isOperator (character) {

    if (character == '+' || character == '-' || character == '*' || character == '/') {
        return true;
    }

    return false;
}

function processExpression(expression) {

    let i = 0;
    let numArr = [];
    let opArr = [];
    let temp = '';

    while (expression[i] != '=') {

        if (!isOperator(expression[i])) {
            temp += expression[i];
            //console.log(temp);
        }

        else {
            if (temp != '') {
                numArr.push(temp);
            }

            if (opArr == []) {
                opArr.push(expression[i]);
            }
        }
        
        i++;
    }

    //===for debug purpose===
    
    /*console.log("In num stack: ");
    for (let j = 0; j < numArr.length; i++) {
        console.log(numArr[j]);
    }

    console.log("in operator stack: ");

    for (let j = 0; j < numArr.length; i++) {
        console.log(numArr[j]);
    }*/
}
