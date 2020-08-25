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
        this.classList.toggle("active");
        if (this == filterTodo) {
            filterCompleted.classList.remove("active");

        } else if (this == filterCompleted) {
            filterTodo.classList.remove("active");
        }
        /*panel[(i + 1) % panel.length].classList.remove("active");
        panel[(i + 2) % panel.length].classList.remove("active");
        */
    });
}


acc.addEventListener("click", function () {
    /* Toggle between adding and removing the "active" class,
    to highlight the button that controls the panel */
    document.getElementById("caret-down-acc").classList.toggle("hidden");
    document.getElementById("caret-right-acc").classList.toggle("hidden");

    for (let i = 0; i < panelTask.length; i++) {
        panelTask[i].classList.toggle("hidden");
    }

});


customListSelector.addEventListener("click", function () {
    /* Toggle between adding and removing the "active" class,
    to highlight the button that controls the panel */
    document.getElementById("caret-down-custom").classList.toggle("hidden");
    document.getElementById("caret-right-custom").classList.toggle("hidden");

    for (let i = 0; i < lists.length; i++) {
        lists[i].classList.toggle("hidden");
    }

});