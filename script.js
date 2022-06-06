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
  // TODO: check if operatorIndex is length - 1 ?

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

function btnClickHandler(e) {
  const value = e.target.textContent;

  if (isValidOperator(value) && userInput.length === 0) {
    return;
  }

  if (isValidOperator(value) && operatorExists()) {
    // replace the latest operator with new operator
    userInput[userInput.length - 1] = value;
    return;
  }

  if (value === '=' && userInput.length === 3) {
    userInput.push(value);
    if (isValidOperation()) {
      const result = operate(userInput[1], Number(userInput[0]), Number(userInput[2]));
      setScreenText(result);
      userInput = [result.toString()];
    }
    console.log(userInput);
    return;
  }

  if (isValidNumber(value)) {
    const operand = adjustOperand(value);
    setScreenText(operand);
  } else if (isValidOperator(value)) {
    userInput.push(value);
    if (isValidOperation()) {
      const result = operate(userInput[1], Number(userInput[0]), Number(userInput[2]));
      setScreenText(result);
      userInput = [result.toString(), value];
    }
  }
  console.log(userInput);
}

const btns = document.querySelectorAll('.buttons button');
btns.forEach((btn) => {
  btn.addEventListener('click', btnClickHandler);
});
