window.addEventListener("load", () => {
    localStorage.getItem("user") === null ? window.location.href = "/pages/register.html" : "/index.html";
})