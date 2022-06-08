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
    return operator.match(/[/X+-](?!\d)/) != null;
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

function setScreenHistoryText() {
  const screenHistoryText = document.getElementById('screen-history-text');
  screenHistoryText.innerText = userInput.join(' ');
}

function operatorExists() {
  return isValidOperator(userInput[userInput.length - 1]);
}

function handleOperatorInput(value) {
  if (userInput.length === 0) {
    // operator without operand not allowed
    return;
  }

  if (userInput.length === 2 && isValidOperator(userInput[1])) {
    // multiple operators not allowed,
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

  if (userInput.length === 1) { // delete from left operand
    if (userInput[0].length === 1) {
      userInput.pop();
      setScreenText('');
      return;
    }
    userInput[0] = userInput[0].substring(0, userInput[0].length - 1);
    setScreenText(userInput[0]);
  }

  if (userInput.length === 3) { // delete from right operand
    if (userInput[2].length === 1) {
      userInput.pop();
      setScreenText('');
      return;
    }
    userInput[2] = userInput[2].substring(0, userInput[2].length - 1);
    setScreenText(userInput[2]);
  }
}

function convertToFloat() {
  if (userInput.length === 1) {
    if (!userInput[0].includes('.')) {
      userInput[0] += '.';
      setScreenText(userInput[0]);
    }
  } else if (userInput.length === 3) {
    if (!userInput[2].includes('.')) {
      userInput[2] += '.';
      setScreenText(userInput[2]);
    }
  }
}

function logicHandler(value) {
  const screenHistoryText = document.getElementById('screen-history-text');

  if (isValidOperator(value)) {
    handleOperatorInput(value);
    setScreenHistoryText();
    return;
  }

  if (isValidNumber(value)) {
    handleNumberInput(value);
    setScreenHistoryText();
    return;
  }

  if (value === '=') {
    evaluateExpression();
  }

  if (value === '.') {
    convertToFloat();
    setScreenHistoryText();
  }

  if (value === 'CLEAR') {
    userInput = [];
    screenHistoryText.innerText = '';
    setScreenText(0);
  }

  if (value === 'DEL') {
    deleteInput();
  }
}

function btnClickHandler(e) {
  const value = e.target.textContent;
  logicHandler(value);
}

const btns = document.querySelectorAll('.buttons button');
btns.forEach((btn) => {
  btn.addEventListener('click', btnClickHandler);
});

document.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'Enter':
      logicHandler('=');
      break;
    case 'Backspace':
      logicHandler('DEL');
      break;
    case '*':
      logicHandler('X');
      break;
    case ',':
      logicHandler('.');
      break;
    default:
      logicHandler(e.key);
  }
});
