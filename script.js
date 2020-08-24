var acc = document.querySelector(".accordion");
var panel = document.getElementsByClassName("panel");


for (let i = 0; i < panel.length; i++) {

    panel[i].addEventListener("click", function () {
        this.classList.toggle("active");
        /*panel[(i + 1) % panel.length].classList.remove("active");
        panel[(i + 2) % panel.length].classList.remove("active");
        */
    });
}

acc.addEventListener("click", function () {
    /* Toggle between adding and removing the "active" class,
    to highlight the button that controls the panel */
    this.classList.toggle("active");
    document.getElementById("caret-down").classList.toggle("hidden");
    document.getElementById("caret-right").classList.toggle("hidden");

    for (let i = 0; i < panel.length; i++) {
        panel[i].classList.toggle("hidden");
    }

});