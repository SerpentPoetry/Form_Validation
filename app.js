//DOM elements
const form = document.querySelector("#form");
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirm-password");

//Functions
const showError = function (input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
};

const showSuccess = function (input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
};

const checkEmail = function (input) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const isEmailValid = re.test(input.value.toLowerCase().trim());
  if (isEmailValid) {
    showSuccess(input);
  } else {
    showError(input, "Email is not valid.");
  }
};

const checkRequired = function (...input) {
  const label = document.querySelectorAll("label");
  for (let i = 0; i < input.length; i++) {
    const message = `${label[i].innerText} is required`;
    console.log(input[i]);
    console.log(label[i].innerText);
    if (input[i].value.trim() === "") {
      showError(input[i], message);
    } else {
      showSuccess(input[i]);
    }
  }
};

const checkLength = function (input, min, max) {
  const text = input.parentElement.querySelector("label").innerText;
  if (input.value.length < min) {
    showError(input, `${text} requires at least ${min}`);
  } else if (input.value.length > max) {
    showError(input, `${text} requires less than ${max}`);
  }
};

const checkPasswordMatch = function (input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, "Passwords do not match");
  } else {
    showSuccess(input2);
  }
};

//Event
form.addEventListener("submit", function (e) {
  e.preventDefault();

  checkRequired(username, email, password, confirmPassword);
  checkLength(username, 3, 15);
  checkLength(password, 6, 15);
  checkEmail(email);
  checkPasswordMatch(password, confirmPassword);
});
