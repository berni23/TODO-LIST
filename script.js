var acc = document.querySelector(".accordion");

var customListSelector = document.querySelector(".custom-list");
var lists = document.querySelectorAll(".panel-list");
var panelClick = document.getElementsByClassName("panel-click");
var panelTask = document.getElementsByClassName("panel-task");
var taskTitle = document.querySelector(".task-title");
var filterTodo = document.getElementById("filter-todo");
var filterCompleted = document.getElementById("filter-completed");

for (let i = 0; i < panelClick.length; i++) {
    panelClick[i].addEventListener("click", function () {



        for (let j = 0; j < panelClick.length; j++) {


            panelClick[j].classList.remove("active");

        }
        this.classList.toggle("active");



        panelClick[(i + 1) % panelClick.length].classList.remove("active");
        panelClick[(i + 2) % panelClick.length].classList.remove("active");

    });
}


customListSelector.addEventListener("click", function () {
    /* Toggle between adding and removing the "active" class,
    to highlight the button that controls the panel */
    document.getElementById("caret-down-custom").classList.toggle("hidden");
    document.getElementById("caret-right-custom").classList.toggle("hidden");

    for (let i = 0; i < lists.length; i++) {
        lists[i].classList.toggle("hidden");
    }

});