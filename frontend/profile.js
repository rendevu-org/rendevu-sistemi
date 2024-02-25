document.addEventListener("DOMContentLoaded", async () => {
  const userData = JSON.parse(localStorage.getItem("user"));
  const informationDiv = document.querySelector(".information");
  const name = document.getElementById("name");
  const phone = document.getElementById("userPhone");
  let isOpen = false;

  if (!userData) {
    alert("Please login first");
  }
  name.textContent = userData?.name;
  phone.textContent = userData?.phone;

  //   const userRendevus = await getRendevu(userData.id);
  //   informationDiv.insertAdjacentHTML("beforeend", userRendevus);

  setTimeout(async () => {
    const userBtn = document.getElementById("userProfileName");
    const userRendevus = await getRendevu(userData.id);

    userBtn.addEventListener("click", () => {
      console.log(userBtn + "clicked");
      isOpen = !isOpen;
      if (isOpen) {
        informationDiv.style.transition = "all 0.5s ease";
        informationDiv.style.left = "0%";
      } else {
        informationDiv.style.transition = "all 0.5s ease";
        informationDiv.style.left = "-100%";
      }
    });

    informationDiv.insertAdjacentHTML("beforeend", userRendevus);
  }, 500);
});

async function getRendevu(userID) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/rendevu/getRendevu/${userID}`
    );
    const data = await response.json();
    let html = "";

    data.forEach((rendevu) => {
      html += `
            <div class="divider"></div>
            <div class="randevuDetails">
                <div class="detail">
                  <i class="fa-solid fa-clock"></i>
                  <span class="value" id="userTime">${rendevu?.date} ${rendevu?.time}</span>
                </div>
              </div>
        
              <div class="randevuDetails">
                <div class="detail">
                  <img src="images/checked (1).png" style="width: 15px" />
                  <span class="value" id="userAvailable">Mevcut</span>
                </div>
              </div>
            `;
    });

    return html;
  } catch (error) {
    console.log(error);
  }
}
