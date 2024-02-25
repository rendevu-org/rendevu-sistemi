async function getAllRendevus() {
  const response = await fetch("http://localhost:3000/api/rendevu/");
  const data = await response.json();
  return data;
}

const times = [
  ["8h-10h", false],
  ["10h-12h", false],
  ["12h-14h", false],
  ["14h-16h", false],
  ["16h-18h", false],
  ["18h-20h", false],
];

document.addEventListener("DOMContentLoaded", async () => {
  const allRendevuData = await getAllRendevus();

  for (let i = 0; i < allRendevuData.length; i++) {
    for (let j = 0; j < times.length; j++) {
      if (
        allRendevuData[i]?.time === times[j][0] &&
        allRendevuData[i]?.status === "active"
      ) {
        times[j][1] = true;
      }
    }
  }

  // get local storage and check if user is logged in
  const userData = JSON.parse(localStorage.getItem("user"));

  const oyeOlBtn = document.querySelector(".registerBtn");
  const girisYapBtn = document.querySelector(".loginBtn");
  const cikisYapBtn = document.querySelector(".logoutBtn");

  if (userData) {
    oyeOlBtn.style.display = "none";
    girisYapBtn.style.display = "none";
    cikisYapBtn.style.display = "block";

    let navlistHtml = "";
    navlistHtml += `
        <li class="registerBtn">
        <i class="fa-solid fa-user-plus" style="color: #ffffff"></i
        ><a href="#" class="nav_item" id="userProfileName">${userData.name}</a>
      </li>
        `;
    document
      .querySelector(".nav-list")
      .insertAdjacentHTML("afterbegin", navlistHtml);
  } else {
    oyeOlBtn.style.display = "block";
    girisYapBtn.style.display = "block";
    cikisYapBtn.style.display = "none";
  }

  const randevularDiv = document.querySelector(".randevular");
  let isAvailable = true;
  let saat = "";

  times.forEach((time, index) => {
    if (time[1]) {
      isAvailable = false;
    } else {
      isAvailable = true;
    }

    let html = "";
    html += `
        <div class="details-container">
            <ul class="app-list">
                <li><span class="nav_item">${time[0]}</span></li>
                <li>
                    <span class="nav_item nav_item2 nav_item3" style='${
                      time[1] ? "background-color: red;" : ""
                    }'>
                        ${isAvailable ? "mevcut" : "mevcut değil"}
                    </span>
                </li>
                <li class="hide"><span class="nav_item nav_item2">Abdelkader</span></li>
                <li class="hide"><span class="nav_item nav_item2">${
                  index + 1
                }</span></li>
                <li>
                    <a href="#">
                        <button class="button-23" role="button" data-time=${
                          time[0]
                        } data-availability=${isAvailable ? "true" : "false"} 
                        style='${
                          time[1] ? "background-color: red; color: white;" : ""
                        }'
                        >
                            ${
                              isAvailable
                                ? "Rezervasyon Yap"
                                : "Rezervasyon Sil"
                            }
                        </button>
                    </a>
                </li>
            </ul>
        </div>
        `;
    randevularDiv.insertAdjacentHTML("beforeend", html);
  });

  // const informationDiv = document.querySelector(".information");
  // const userRendevus = await getRendevu(userData.id);
  // let html2 = "";
  // let isOpen = false;
  // html2 += `
  //         <div class="randevuDetails">
  //          <div class="detail">
  //           <i class="fa-solid fa-user" ></i>
  //           <span style="font-size: 24px;" class="value" id="name">${userData.name}</span>        
          
  //         </div>
  //         </div>
  //         <div class="randevuDetails">
  //           <div class="detail">
  //             <i class="fa-solid fa-phone" ></i>
  //             <span style="font-size: 18px;" class="value">${userData.phone}</span>
  //           </div>
           
  //           <h3></h3>
  //         </div>
  //         <div class="randevuDetails">  
  //          <div class="detail">
  //           <i class="fa-solid fa-clock" ></i>
  //           <span class="value">10j</span>
  //          </div> 
  //          <h3></h3>
  //           <h3></h3>
  //         </div>
          
  //         <div class="randevuDetails">
  //           <div class="detail">
  //             <img src="images/checked (1).png" style="width: 15px">
  //             <span class="value">available</span>
  //           </div>
            
  //           <h3 class="value"></h3>
  //         </div>
  // `;
  // informationDiv.insertAdjacentHTML("afterbegin", html2);

  // const userBtn = document.getElementById("userName");
  // userBtn.addEventListener("click", () => {
  //   if (isOpen) {
  //     informationDiv.style.transition = "margin-left 0.5s ease";
  //     informationDiv.style.marginLeft = "0";
  //   } else {
  //     informationDiv.style.transition = "margin-left 0.5s ease";
  //     informationDiv.style.marginLeft = "100%";
  //   }
  //   isOpen = !isOpen;
  // });

  const submitBtns = document.querySelectorAll(".button-23");

  submitBtns.forEach((button, idx) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const userData = JSON.parse(localStorage.getItem("user"));
      const rendevuDataSingle = allRendevuData?.find(
        (item) =>
          item.person === userData.id && item.time === e.target.dataset.time
      );

      const dbTime = rendevuDataSingle?.time || "";
      const personID = rendevuDataSingle?.person || "";

      if (!userData) {
        alert("Lütfen giriş yapınız");
      } else {
        const { name, phone, id } = userData;

        saat = e.target.dataset.time;
        let availability = e.target.dataset.availability;
        let date = new Date().toLocaleDateString();
        let rendevuID = dbTime == saat ? rendevuDataSingle._id : "";

        let modal = "";
        modal += `
                <div class="modal">
                    <div class="modal-content">
                    <div class="modal-header">
                        <span class="close-button" onclick='closeModal()'>&times;</span>
                        <h2>Rendevu Detaylar</h2>
                    </div>
                    <div class="modal-body">
                        <div class="rendevu-detail">
                            <div class="rendevu-detail-label">Rendevu Alan kişi</div>
                            <h2 class="rendevu-detail-value">${name}</h2>
                        </div>
                        <div class="rendevu-detail">
                            <div class="rendevu-detail-label">Rendevu Saati</div>
                            <h2 class="rendevu-detail-value">${saat}</h2>
                        </div>
                        <div class="rendevu-detail">
                            <div class="rendevu-detail-label">Rendevu Durumu</div>
                            <h2 class="rendevu-detail-value">${
                              availability == "true" ? "Mevcut" : "Mevcut Değil"
                            }</h2>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="modal-close-button" onclick='closeModal()'>Kapat</button>
                        <button class="modal-confirm-button" onclick="${
                          availability === "true"
                            ? `createRendevu('${name}' , '${date}' , '${saat}' , '${phone}' , '${id}')`
                            : `deleteRendevu('${rendevuID}', '${personID}', '${id}')`
                        }">
                            ${
                              availability === "true"
                                ? "Rendevu Oluştur"
                                : "Rendevu Sil"
                            }
                        </button>
                    </div>
                    </div>
                </div>
                `;

        document.querySelector("body").insertAdjacentHTML("beforeend", modal);
        document.querySelector(".modal").style.display = "block";
      }
    });
  });
});

function closeModal() {
  document.querySelector(".modal").style.display = "none";
  document.querySelector(".modal").remove();
}

function createRendevu(name, date, time, phone, userID) {
  const body = {
    name,
    date,
    time,
    phone,
    status: "active",
    person: userID,
  };

  fetch("http://localhost:3000/api/rendevu/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data) {
        closeModal();
        window.location.reload();
      } else {
        alert("");
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function logout() {
  localStorage.removeItem("user");
  window.location.href = "index.html";
}

function deleteRendevu(id, personID, userID) {
  console.log(personID, userID);
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
        closeModal();
        window.location.reload();
      } else {
        alert("");
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
