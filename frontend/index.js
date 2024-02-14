const nameInput = document.getElementById("validationCustom01");
const lastNameInput = document.getElementById("validationCustom02");
const emailInput = document.getElementById("validationCustomUsername");
const passwordInput = document.getElementById("validationCustom03");
const telefonInput = document.getElementById("validationCustom04");
const btn = document.getElementById("submit");

btn.addEventListener("click", (e) => {
    e.preventDefault()
  const data = {
    name: nameInput.value,
    email: emailInput.value,
    lastName : lastNameInput.value,
    phone : telefonInput.value, 
    password: passwordInput.value,
  };
  fetch("http://localhost:3000/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
});