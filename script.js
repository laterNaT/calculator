let userInput = [];

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(operator, num1, num2) {
  if (operator === '+') {
    return add(num1, num2);
  }

  if (operator === '-') {
    return subtract(num1, num2);
  }

  if (operator === 'X') {
    return multiply(num1, num2);
  }

  if (operator === '/') {
    return divide(num1, num2);
  }

  return 'Error';
}

function isValidOperator(operator) {
  if (typeof operator === 'string') {
    return operator.match(/[/X+-]/) != null;
  }
  return false;
}

function isValidNumber(str) {
  return str.match(/\d/) != null;
}

function isValidOperation() {
  return userInput.length === 4
    && isValidNumber(userInput[0])
    && isValidOperator(userInput[1])
    && isValidNumber(userInput[2]);
}

function adjustOperand(value) {
  userInput.push(value);

  if (userInput.length < 2) {
    // no need to adjust operand if only one number entered
    return value;
  }

  const operatorIndex = userInput.findIndex(e => isValidOperator(e));

  if (operatorIndex === -1) {
    // no operator, just add the two numbers
    userInput[0] += userInput.pop();
    return userInput[0];
  } else {
    // left side already reduced, fix right side
    let rightSide = userInput.slice(operatorIndex + 1);
    if (rightSide.length === 2) {
      rightSide[0] += rightSide.pop();
      userInput = [
        ...userInput.slice(0, operatorIndex + 1),
        ...rightSide
      ];
    }
    return rightSide[0];
  }
}

function setScreenText(operand) {
  const screenText = document.getElementById('screen-text');
  screenText.innerText = operand;
}

function operatorExists() {
  return isValidOperator(userInput[userInput.length - 1]);
}

function handleOperatorInput(value) {
  if (userInput.length === 0) {
    // operator without operand not allowed
    return;
  }

  if (operatorExists()) {
    // multiple operators now allowed,
    // replace the latest operator with new operator
    userInput[userInput.length - 1] = value;
    return;
  }

  userInput.push(value);
  if (isValidOperation()) {
    const result = operate(userInput[1], Number(userInput[0]), Number(userInput[2]));
    setScreenText(result);
    userInput = [result.toString(), value];
  }
}

function evaluateExpression() {
  if (userInput.length === 3
    && isValidNumber(userInput[0])
    && isValidOperator(userInput[1])
    && isValidNumber(userInput[2])) {
    const result = operate(userInput[1], Number(userInput[0]), Number(userInput[2]));
    setScreenText(result);
    userInput = [result.toString()];
  }
}

function handleNumberInput(value) {
  if (isValidNumber(value)) {
    const operand = adjustOperand(value);
    setScreenText(operand);
  }
}

function deleteInput() {
  // removes the number to the far most right
  if (userInput.length < 1) {
    return;
  }

  if (userInput.length === 1 && userInput[0].length > 1) {
    userInput[0] = userInput[0].substring(0,userInput[0].length - 1);
    setScreenText(userInput[0]);
  }

  if (userInput.length === 3 && userInput[2].length > 1) {
    userInput[2] = userInput[2].substring(0,userInput[2].length - 1);
    setScreenText(userInput[2]);
  }
}

function btnClickHandler(e) {
  const value = e.target.textContent;

  if (isValidOperator(value)) {
    handleOperatorInput(value);
    document.getElementById('screen-history-text').innerText = userInput.join(' ');
    return;
  }

  if (isValidNumber(value)) {
    handleNumberInput(value);
    document.getElementById('screen-history-text').innerText = userInput.join(' ');
    return;
  }

  if (value === '=') {
    evaluateExpression();
  }

  if (value === '.') {
    // handle floats
  }

  if (value === 'CLEAR') {
    userInput = [];
    document.getElementById('screen-history-text').innerText = '';
    setScreenText(0);
  }

  if (value === 'DEL') {
    deleteInput();
  }
}

const btns = document.querySelectorAll('.buttons button');
btns.forEach((btn) => {
  btn.addEventListener('click', btnClickHandler);
});
