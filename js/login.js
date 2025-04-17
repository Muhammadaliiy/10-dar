import { login } from "./request.js";
import { validator } from "./utils.js";


const loginForm = document.getElementById("form");
const toastSuccess = document.getElementById("toast-success");
const toastDanger = document.getElementById("toast-danger");
const toastWarning = document.getElementById("toast-warning");
const successText = document.getElementById("successText");
const warningText = document.getElementById("warningText");
const dangerText = document.getElementById("dangerText");
const spinner = document.getElementById("spinner");
const buttonText = document.getElementById("button-text");

const hideToast = (toast) => {
    setTimeout(() => {
        toast.classList.add("hidden");
    }, 3000);
};

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const result = {};

    for (const [key, value] of formData.entries()) {
        result[key] = value;
    }

    const error = validator(result);

    if (error) {
        toastWarning.classList.remove("hidden");
        warningText.innerText = error.message;
        e.target[error.target].focus();
        hideToast(toastWarning);
        return;
    }

    e.target.dataset.state = "pending";
    spinner.classList.remove("hidden");
    buttonText.classList.add("hidden");
    loginForm.querySelector("button").disabled = true;

    try {
        console.log("Attempting to login with:", result);
        const res = await login(result);
        localStorage.setItem("user", JSON.stringify(res));
        toastSuccess.classList.remove("hidden");
        successText.innerText = "Login successful";
        hideToast(toastSuccess);
        setTimeout(() => {
            window.location.href = "/index.html";
        }, 1500);
    } catch (err) {
        toastDanger.classList.remove("hidden");
        dangerText.innerText = err.message || "User not found";
        hideToast(toastDanger);
        setTimeout(() => {
            window.location.href = "/pages/register.html";
        }, 2000);
    } finally {
        e.target.dataset.state = "normal";
        spinner.classList.add("hidden");
        buttonText.classList.remove("hidden");
        loginForm.querySelector("button").disabled = false;
    }
});