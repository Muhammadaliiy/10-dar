window.addEventListener("load", () => {
    localStorage.getItem("user") === null ? window.location.href = "/pages/login.html" : "/index.html";
})