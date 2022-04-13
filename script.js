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

window.addEventListener("keydown", (e) => {
  e.preventDefault();
  console.log(e.key);
  if ((+e.key >= 0 && +e.key <= 9) || e.key === ".") {
    appendNumber(e.key);
    updateDisplay();
  }
  if (e.key === "=" || e.key === "Enter") {
    operate(selectedOperator, previousOperand, currentOperand);
    updateDisplay();
  }
  if (e.key === "/" || e.key === "+" || e.key === "-" || e.key === "*") {
    selectOperation(convertKey(e.key));
    updateDisplay();
  }
  if (e.key === "Backspace") {
    backOne();
    updateDisplay();
  }
  if (e.key === "Escape" || e.key === "Delete") {
    clear();
    updateDisplay();
  }
});

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

clearBtn.addEventListener("click", () => {
  clear();
  updateDisplay();
});

deleteBtn.addEventListener("click", () => {
  backOne();
  updateDisplay();
});

function convertKey(key) {
  if (key === "/") return "÷";
  if (key === "*") return "x";
  if (key === "-") return "-";
  if (key === "+") return "+";
}

function selectOperation(operation) {
  let result;
  if (currentOperand === "") return;
  if (previousOperand !== "") {
    result = operate(selectedOperator, previousOperand, currentOperand);
  }
  if (result === "ERROR") return;
  selectedOperator = operation;
  previousOperand = currentOperand;
  currentOperand = "";
}

function operate(operator, firstOperand, secondOperand) {
  let result;
  let prev = parseFloat(firstOperand);
  let current = parseFloat(secondOperand);
  if (current === 0 && operator === "÷") {
    alert("UNABLE TO DIVIDE BY ZERO!");
    return "ERROR";
  }
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
  return Math.round((firstOperand + secondOperand) * 100) / 100;
}

function subtract(firstOperand, secondOperand) {
  return Math.round((firstOperand - secondOperand) * 100) / 100;
}

function multiply(firstOperand, secondOperand) {
  return Math.round(firstOperand * secondOperand * 100) / 100;
}

function divide(firstOperand, secondOperand) {
  return Math.round((firstOperand / secondOperand) * 100) / 100;
}

function appendNumber(number) {
  if (currentOperand.includes(".") && number === ".") return;
  currentOperand = currentOperand.toString() + number.toString();
}

function updateDisplay() {
  currentTextElement.innerText = currentOperand;
  if (selectedOperator != null) {
    previousTextElement.innerText = `${previousOperand} ${selectedOperator} `;
  } else {
    previousTextElement.innerText = "";
  }
}

function clear() {
  previousOperand = "";
  currentOperand = "";
  selectedOperator = null;
}

function backOne() {
  currentOperand = currentOperand.toString().slice(0, -1);
}
