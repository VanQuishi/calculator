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
var expression;
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
    display.textContent += equalSign.textContent;
    expression = display.textContent;
    console.log(expression);
    solution = processExpression(expression);
    console.log(solution);
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

function hasHigherPrecedence (currentOp, stackOp) {
    if (currentOp == '*' || currentOp == '/' && stackOp == '+' || stackOp == '-') {
        return true;
    }
    
    return false;
}

function processExpression(expression) {

    //check if the expression has a number before equal sign or not
    //this check prevents invalid expression from user
    if (isOperator(expression[expression.length - 2])) {
        console.log("invalid expression");
        return;
    }

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
                console.log("inserting in numArr: " + temp);
                temp = '';
               
            }

            if (opArr.length == 0) {
                opArr.push(expression[i]);
                console.log("inserting in opArr: " + expression[i]);
            }

            else if (opArr.length != 0) {
                if (!hasHigherPrecedence(expression[i], peak(opArr))) {
                    let num2 = Number(numArr.pop());
                    console.log("removing in numArr: " + num2);
                    let num1 = Number(numArr.pop());
                    console.log("removing in numArr: " + num1);

                    let op = opArr.pop();
                    console.log("removing in opArr: " + op);

                    let result = operate(num1,op,num2);
                    //console.log("perform: " + num1 + op + num2 + " equals " + result);

                    numArr.push(result);
                    console.log("inserting in numArr: " + result);

                    opArr.push(expression[i]);
                    console.log("inserting in opArr: " + expression[i]);
                }

                else {
                    opArr.push(expression[i]);
                    console.log("inserting in opArr: " + expression[i]);
                }
            }
        }
        
        i++;
    }

    if (!isOperator(temp) && temp != '') {
        numArr.push(temp);
        console.log("inserting in numArr: " + temp);
        temp='';
    }

     //===for debug purpose===
    
    /*console.log("In num stack: ");
    for (let j = 0; j < numArr.length; j++) {
        console.log(numArr[j]);
    }

    console.log("in operator stack: ");

    for (let j = 0; j < opArr.length; j++) {
        console.log(opArr[j]);
    }*/

    /*while (numArr.length > 1) {
        let num2 = Number(numArr.pop());
        console.log("removing in numArr: " + num2);
        let num1 = Number(numArr.pop());
        console.log("removing in numArr: " + num1);

        let op = opArr.pop();
        console.log("removing in opArr: " + op);

        let result = operate(num1,op,num2);

        numArr.push(result);
        console.log("inserting in numArr: " + result);
    }*/

    return result;

   
}

/*let test = [0,1,2];
console.log(peak(test));*/

/*console.log(hasHigherPrecedence('*', '-'));
console.log(hasHigherPrecedence('/', '*'));
console.log(hasHigherPrecedence('-', '*'));
console.log(hasHigherPrecedence('-', '+'));*/
