const problem = document.querySelector(".problem");
const solution = document.querySelector(".solution");
const buttons = document.querySelectorAll("button");

let decimalPressed = false

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (!button.classList.contains("function")) {
      appendDigit(button.innerHTML, button.classList[0]);
    } else {
      executeFunction(button.id);
    }
  });
});

// A function that clears the screen
const clearScreen = () => {
  problem.innerHTML = "0";
  solution.innerHTML = "0";
  decimalPressed = false
};

const appendDigit = (digit, type) => {
  if (problem.innerHTML !== "0" && type === "numeric") {
    if (digit === ".") {
        if (decimalPressed) {
            return
        }
        decimalPressed = true
    }
    problem.innerHTML += digit;
    return;
  }
  if (type === "operator") {
    decimalPressed = digit === "=" ? decimalPressed : false
    if (
      problem.innerHTML.slice(-1) !== "+" &&
      problem.innerHTML.slice(-1) !== "-" &&
      problem.innerHTML.slice(-1) !== "*" &&
      problem.innerHTML.slice(-1) !== "/" &&
      digit !== "="
    ) {
      problem.innerHTML += digit;
      return;
    } else if (digit == "=") {
      calculate();
      return;
    }
    return;
  }
  if (digit !== '.') {
    problem.innerHTML = digit;
  }
};

const executeFunction = (func) => {
  switch (func) {
    case "ac":
      clearScreen();
      break;
    case "del":
      problem.innerHTML =
        problem.innerHTML.length == 1 ? "0" : problem.innerHTML.slice(0, -1);
      break;
    default:
      break;
  }
};

const calculate = () => {
  let ans;
  try {
    ans = eval(problem.innerHTML);
    {
      console.log("question: ", problem.innerHTML);
      console.log("After eval: ", eval(problem.innerHTML));
      console.log("Type of after eval: ", eval(problem.innerHTML).isInteger);
    }
    solution.innerHTML = parseInt(ans).isInteger ? ans : ans.toFixed(4);
  } catch (err) {
    solution.innerHTML = "Error";
  }
};
