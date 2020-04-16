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

const displayPrevious = document.querySelector('.displayPrevious');
const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.btn');
const clear = document.querySelector('.clear');
const clearAll = document.querySelector('.clearAll');
const equalSign = document.querySelector('.equalSign');
const operator = document.querySelectorAll('.operator');

var expression;
var expressionPostfix;
var currentDisplay;
var solution;

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

    if (display.textContent == '') {
        alert("No expression detected. Please enter a valid expression");
    }

    else {

        if (displayPrevious.textContent != '') {
            displayPrevious.textContent = '';
        }

        expression = display.textContent;
        console.log(expression);

        display.textContent += equalSign.textContent;

        expressionPostfix = infixToPostfix(expression);
        console.log("This is the postfix: " + expressionPostfix);

        solution = processExpression(expressionPostfix);
        console.log(solution);

        displayPrevious.textContent += display.textContent;
        display.textContent = solution;

    }
    

});

function isOperator (character) {

    if (character == '+' || character == '-' || character == '*' || character == '/') {
        return true;
    }

    return false;
}

function peak(arr) {
    return arr[arr.length - 1];
}

function hasHigherPrecedence(currentOp, stackOp) {
    if (currentOp == '*' && (stackOp == '+' || stackOp == '-')) {
        return true;
    }

    if (currentOp == '/' && (stackOp == '+' || stackOp == '-')) {
        return true;
    }

    return false;

}

function infixToPostfix (infix) {

    let postfix ='';
    let temp = '';
    let opArr = [];

    for (let i = 0; i < infix.length; i++) {

        if (!isOperator(infix[i])) {
            temp += infix[i];
        }

        else {

            if (temp != '') {
                postfix += temp + ' ';
                temp = '';
            }

            while (opArr.length > 0 && !hasHigherPrecedence(infix[i], peak(opArr))) {
                postfix += opArr.pop() + ' ';
            }

            opArr.push(infix[i]);
        }
    }

    if (temp != '') {
        postfix += temp + ' ';
    }

    while (opArr.length != 0) {
        postfix += opArr.pop() + ' ';
    }

    return postfix;

}

function processExpression(expressionPostfix) {

    let result = 0;
    let numArr = [];

    let expArr = expressionPostfix.split(' ');

    for (let i = 0; i < expArr.length-1; i++) {

        if (!isOperator(expArr[i])) {
            numArr.push(expArr[i]);
        }

        else {
            let num2 = Number(numArr.pop());
            let num1 = Number(numArr.pop());

            if (expArr[i] == '/' && num2 == 0) {
                alert("You might be dividing by 0. Be aware!");
                break;
            }

            result = operate(num1, expArr[i], num2);

            numArr.push(result);
        }
    }

    return (numArr.pop().toFixed(3));
   
}

/*let test = [0,1,2];
console.log(peak(test));*/

/*console.log(hasHigherPrecedence('*', '-'));
console.log(hasHigherPrecedence('/', '*'));
console.log(hasHigherPrecedence('-', '*'));
console.log(hasHigherPrecedence('-', '+'));*/
