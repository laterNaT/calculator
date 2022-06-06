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
  return userInput.length === 3
    && typeof userInput[0] === 'number'
    && isValidOperator(userInput[1])
    && typeof userInput[2] === 'number';
}

function btnClickHandler(e) {
  const value = e.target.textContent;
  if (isValidNumber(value)) {
    userInput.push(Number(value));
  } else if (isValidOperator(value)) {
    userInput.push(value);
  }

  if (isValidOperation()) {
    const result = operate(userInput[1], userInput[0], userInput[2]);
    document.getElementById('screen-text').innerText = result;
    userInput = [];
  }
}

const btns = document.querySelectorAll('.buttons button');
btns.forEach((btn) => {
  btn.addEventListener('click', btnClickHandler);
});
