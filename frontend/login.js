const emailInput = document.getElementById(validationCustom01);
const sifreInput = document.getElementById(validationCustom02);
const btn = document.getElementById(submit);

btn.addEventListener("click", (e) => {
    e.preventDefault()
  const data = {
    
    email: emailInput.value,    
    password: sifreInput.value,
  };
  fetch("http://localhost:3000/api/auth/login", {
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