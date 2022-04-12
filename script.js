let previousOperand = "";
let currentOperand = "";
let selectedOperator = null;

const numberBtns = document.querySelectorAll("[data-number]");
const operationBtns = document.querySelectorAll("[data-operation]");
const clearBtn = document.querySelector("[data-clear]");
const deleteBtn = document.querySelector("[data-delete]");
const equalBtn = document.querySelector("[data-equal]");
const previousTextElement = document.querySelector("[data-previous-operand]");
const currentTextElement = document.querySelector("[data-current-operand]");

numberBtns.forEach((numberBtn) => {
  numberBtn.addEventListener("click", () => {
    appendNumber(numberBtn.innerText);
    updateDisplay();
  });
});

operationBtns.forEach((operationBtn) => {
  operationBtn.addEventListener("click", () => {
    selectOperation(operationBtn.innerText);
    updateDisplay();
  });
});

equalBtn.addEventListener("click", () => {
  operate(selectedOperator, previousOperand, currentOperand);
  updateDisplay();
});

function selectOperation(operation) {
  if (currentOperand === "") return;
  if (previousOperand !== "") {
    operate(selectedOperator, previousOperand, currentOperand);
  }
  selectedOperator = operation;
  previousOperand = currentOperand;
  currentOperand = "";
}

function operate(operator, firstOperand, secondOperand) {
  let result;
  let prev = parseFloat(firstOperand);
  let current = parseFloat(secondOperand);
  if (isNaN(prev) || isNaN(current)) return;
  switch (operator) {
    case "+":
      result = add(prev, current);
      break;
    case "-":
      result = subtract(prev, current);
      break;
    case "x":
      result = multiply(prev, current);
      break;
    case "÷":
      result = divide(prev, current);
      break;
    default:
      return;
  }
  currentOperand = result;
  selectedOperator = null;
  previousOperand = "";
}

function add(firstOperand, secondOperand) {
  return firstOperand + secondOperand;
}

function subtract(firstOperand, secondOperand) {
  return firstOperand - secondOperand;
}

function multiply(firstOperand, secondOperand) {
  return firstOperand * secondOperand;
}

function divide(firstOperand, secondOperand) {
  return firstOperand / secondOperand;
}

function appendNumber(number) {
  if (currentOperand.includes(".") && number === ".") return;
  currentOperand = currentOperand.toString() + number.toString();
}

function updateDisplay() {
  currentTextElement.innerText = currentOperand;
  previousTextElement.innerText = previousOperand;
}
