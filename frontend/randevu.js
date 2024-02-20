var availability = document.querySelectorAll(".nav_item3");
const submitBtns = document.querySelectorAll(".button-23");

availability.forEach(function(element){
    element.addEventListener("click",function() {
        element.textContent = "not available";
        element.style.backgroundColor = "red";
    });
});

submitBtns.forEach(button => {
    button.addEventListener("click", e => {
        e.preventDefault();
        document.querySelector(".modal").style.display = "block";
    })
})