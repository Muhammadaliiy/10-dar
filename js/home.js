window.addEventListener("load", () => {
    localStorage.getItem("user") === null ? window.location.href = "/pages/register.html" : "/index.html";
})


const malumotlar = document.querySelector(".malumotlar");

if (malumotlar) {
    fetch("https://json-api.uz/api/project/fn37/cars")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Tarmoqda xato bor: " + response.status);
            }
            return response.json();
        })
        .then((data) => {
            console.log("Kegan narsa:", data);
            data.data.forEach((car) => {
                malumotlar.innerHTML += `
          <div class="card">
            <h3>${car.name}</h3>
            <p>${car.price}</p>
            <p>${car.description}</p>
          </div>
        `;
            });
        })
        .catch((error) => {
            console.error("Xatolik yuz berdi:", error);
        });
};

// document.addEventListener("DOMContentLoaded", () => {
//     // tokenni tekshirish
//     const token = localStorage.getItem("token");
//     if (!token) {
//         window.location.href = "index.html";
//     }

//     const cars = JSON.parse(localStorage.getItem("cars")) || [];
//     const container = document.getElementById("carList");

//     if (cars.length === 0) {
//         container.innerHTML = "<p class='text-gray-500'>Mashinalar yo‘q.</p>";
//         return;
//     }

//     const html = cars.map(car => `
//       <div class="bg-white rounded-lg shadow p-4">
//         <img src="${car.image}" alt="${car.name}" class="w-full h-40 object-cover rounded mb-2" />
//         <h3 class="text-lg font-bold">${car.name}</h3>
//         <p class="text-gray-600">${car.price} USD</p>
//       </div>
//     `).join("");

//     container.innerHTML = html;
// });
