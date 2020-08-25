var acc = document.querySelector(".accordion");

var customListSelector = document.querySelector(".custom-list");
var lists = document.querySelectorAll(".panel-list");
var panelClick = document.getElementsByClassName("panel-click");
var panelTask = document.getElementsByClassName("panel-task");
var taskTitle = document.querySelector(".task-title");
var filterTodo = document.getElementById("filter-todo");
var filterCompleted = document.getElementById("filter-completed");



var modal = document.querySelector(".modal");
var btnModal = document.querySelector(".new-task");
var btnCloseModal = document.getElementById("close-modal");


var inputTitle = document.getElementById("input-title");
var inputDescription = document.getElementById("input-description");
var inputCompleted = document.getElementById("input-completed");
var inputImportant = document.getElementById("input-important");

var btnCreateTask = document.getElementById("create-event");
var btnCancelTask = document.getElementById("cancel-event");

btnModal.addEventListener("click", toggleModal);
btnCloseModal.addEventListener("click", toggleModal);
btnCreateTask.addEventListener("click", submitTask)
btnCancelTask.addEventListener("click", cancelTask)
document.addEventListener('keydown', handleKeyDown);

for (let i = 0; i < panelClick.length; i++) {
    panelClick[i].addEventListener("click", function () {
        for (let j = 0; j < panelClick.length; j++) {
            panelClick[j].classList.remove("active");
        }
        this.classList.toggle("active");
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


function toggleModal() {
    modal.classList.toggle("show-modal");
}


function windowOnClick() {
    modal.classList.remove("show-modal");
}

function handleKeyDown(event) {
    if (event.keyCodioe === 27) { // hide modal on esc key pressed
        modal.classList.remove("show-modal");
    }
}


function cancelTask() {

    toggleModal();

    resetForm();
}

function submitTask() {
    if (validate()) {
        console.log("validation suceeded")

    }
}


function resetForm() {

    inputTitle.value = "";
    inputDescription.value = "";
    inputImportant.checked = false;
    inputCompleted.checked = false;
}

function validate() {
    let validation = true;

    let dateEnd;
    var TitleRegEx = /\b.{3,50}\b/ // literally whatever between 3 and 50 chars
    var DescRegEx = /\b.{1,500}\b/ // literally whatever between 1 and 500 chars
    clearErrors();
    if (!TitleRegEx.test(inputTitle.value)) {
        inputTitle.parentElement.insertAdjacentHTML(
            "beforeend",
            "<div class='error-msg' style = ' margin-left: 100px; margin-top:25px'><p>Title must be between 1 and 60 characters</p></div>"
        );
        inputTitle.classList.add("error-input")
        validation = false;
    }


    if (!DescRegEx.test(inputDescription.textContent)) {

        console.log("description failed")
        inputDescription.parentElement.insertAdjacentHTML(
            "afterend",
            "<div class='error-msg' style = ' margin-top:85px';><p>The description must have a maximum of 500 characters</p></div>"
        );
        inputDescription.classList.add("error-input");
        validation = false;
    }
    return validation; // true if validation passed, else false
}

function clearErrors() {
    var errorMsg = document.querySelectorAll(".error-msg");
    var errorInput = document.querySelectorAll(".error-input");
    for (div of errorMsg) {
        div.remove();
    }
    for (div of errorInput) {
        div.classList.remove("error-input");
    }
}