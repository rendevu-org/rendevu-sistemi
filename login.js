const emailInput = document.getElementById("validationCustom01");
const sifreInput = document.getElementById("validationCustom02");
const btn = document.getElementById("submit");

btn.addEventListener("click", (e) => {
  e.preventDefault();
  const body = {
    email: emailInput.value,
    password: sifreInput.value,
  };
  fetch("http://localhost:3000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((data) => {
      const userData = {
        name: data.name + " " + data.lastName,
        phone: data.phone,
        email: data.email,
        id: data._id,
      };

      if (data) {
        localStorage.setItem("user", JSON.stringify(userData));
        window.location.href = "index.html";
      } else {
        alert("Kullanıcı adı veya şifre hatalı!");
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
