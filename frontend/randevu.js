var availability = document.querySelectorAll(".nav_item3");
const submitBtns = document.querySelectorAll(".button-23");

availability.forEach(function (element) {
  element.addEventListener("click", function () {
    element.textContent = "not available";
    element.style.backgroundColor = "red";
  });
});

submitBtns.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    let parentDiv = button.parentNode.parentNode.parentNode;
    let date = parentDiv.children[0].childNodes[0].textContent;

    let modal = "";
    modal += `   
    <div class="modal">
        <div class="modal-content">
        <div class="modal-header">
            <span class="close-button">&times;</span>
            <h2>Rendevu Detaylar</h2>
        </div>
        <div class="modal-body">
            <div class="rendevu-detail">
            <div class="rendevu-detail-label">Rendevu Alan kişi</div>
            <h2 class="rendevu-detail-value">RED EL MA</h2>
            </div>
            <div class="rendevu-detail">
            <div class="rendevu-detail-label">Rendevu Saati</div>
            <h2 class="rendevu-detail-value">${date}</h2>
            </div>
            <div class="rendevu-detail">
            <div class="rendevu-detail-label">Rendevu Durumu</div>
            <h2 class="rendevu-detail-value">Empty</h2>
            </div>
        </div>
        <div class="modal-footer">
            <button class="modal-close-button" onclick="closeModal()">Kapat</button>
            <button class="modal-confirm-button">Onayla</button>
        </div>
        </div>
    </div>
    `;

    document.querySelector("body").insertAdjacentHTML("beforeend", modal);
    document.querySelector(".modal").style.display = "block";
  });
});

function closeModal() {
  document.querySelector(".modal").style.display = "none";
  document.querySelector(".modal").remove();
}
