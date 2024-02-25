let isOpen = false;
document.addEventListener("DOMContentLoaded", async () => {
  const userData = JSON.parse(localStorage.getItem("user"));
  const informationDiv = document.querySelector(".information");
  const name = document.getElementById("name");
  const phone = document.getElementById("userPhone");

  if (!userData) {
    alert("Please login first");
  }
  name.textContent = userData?.name;
  phone.textContent = userData?.phone;

  const userRendevus = await getRendevu(userData.id);
  informationDiv.insertAdjacentHTML("beforeend", userRendevus);

  setTimeout(async () => {
    const userBtn = document.getElementById("userProfileName");

    userBtn.addEventListener("click", () => {
      console.log(userBtn + "clicked");
      isOpen = !isOpen;
      if (isOpen) {
        informationDiv.style.transition = "all 0.5s ease";
        informationDiv.style.left = "0%";
        document.addEventListener("click", (e) => {
          handleClickOutside(e, informationDiv, userBtn);
        });
      } else {
        informationDiv.style.transition = "all 0.5s ease";
        informationDiv.style.left = "-100%";
        document.removeEventListener("click", handleClickOutside);
      }
    });
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

              <div class="randevuDetails">
                <div class="detail delete-button" onclick="deleteRendevu('${rendevu._id}', '${rendevu.person}', '${userID}')">
                  <i class="fa-solid fa-trash"></i>
                  <span class="value">Rendevu Sil</span>
                </div>
              </div>
            `;
    });

    return html;
  } catch (error) {
    console.log(error);
  }
}

function deleteRendevu(id, personID, userID) {
  if (personID !== userID) {
    alert("Bu randevuyu silemezsiniz");
    return;
  }

  fetch(`http://localhost:3000/api/rendevu/delete/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((data) => {
      if (data) {
        alert("Rendevu başarıyla silindi");
        window.location.reload();
      } else {
        alert("");
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleClickOutside(event, informationDiv, userBtn) {
  console.log("clicked outside");
  if (
    !informationDiv.contains(event.target) &&
    !userBtn.contains(event.target)
  ) {
    isOpen = false;
    informationDiv.style.transition = "all 0.5s ease";
    informationDiv.style.left = "-100%";
  }
  document.removeEventListener("click", handleClickOutside);
}
