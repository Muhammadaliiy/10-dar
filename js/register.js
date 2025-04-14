import { register } from "./request.js";
import { validator } from "./utils.js";


const elForm = document.getElementById("form");
const toastSuccess = document.getElementById("toast-success");
const toastDanger = document.getElementById("toast-danger");
const toastWarning = document.getElementById("toast-warning");
const succesText = document.getElementById("succesText");
const warningText = document.getElementById("warningText");
const dangerText = document.getElementById("dangerText");
elForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const result = {};

    for (const [key, value] of formData.entries()) {
        result[key] = value;
    }
    const error = validator(result);

    if (error) {
        toastWarning.classList.remove("noShow");
        warningText.innerText = error.message;
        e.target[error.target].focus();
    } else {
        e.target.dataset.state = "pending";
        register(result).then(() => {
            toastSuccess.classList.remove("noShow");
            succesText.innerText = "Register successful";
            setInterval(() => {
                window.location.href = "/pages/login.html";
            }, 1500)

        }).catch((err) => {
            toastDanger.classList.remove("noShow");
            dangerText.innerText = "User already exists";
            setInterval(() => {
                window.location.href = "/pages/login.html";
            }, 2000)

        }).finally(() => {
            e.target.dataset.state = "normal";
        })
    }
})