var acc = document.querySelector(".accordion");
var customListSelector = document.querySelector(".custom-list");
var lists = document.querySelectorAll(".panel-list");
var panelClick = document.getElementsByClassName("panel-click");
var panelTask = document.getElementsByClassName("panel-task");
var taskTitle = document.querySelector(".task-title");
var filterTodo = document.getElementById("filter-todo");
var taskWrapper = document.querySelector(".task-wrapper");
var filterCompleted = document.getElementById("filter-completed");
var modal = document.querySelector(".modal");
var btnModal = document.querySelector(".new-task");
var btnCloseModal = document.getElementById("close-modal");
var inputTitle = document.getElementById("input-title");
var inputDescription = document.getElementById("input-description");
var modalCompleted = document.getElementById("inputCompleted");
var modalImportant = document.getElementById("inputImportant");
var inputColor = document.getElementById("select-task-color");
var inputCustomList = document.getElementById("select-custom-list");
var btnCreateTask = document.getElementById("create-event");
var btnCancelTask = document.getElementById("cancel-event");

// window used for delivering information to the user

var infoWindow = document.querySelector(".info-window");
btnModal.addEventListener("click", toggleModal);
btnCloseModal.addEventListener("click", toggleModal);
btnCreateTask.addEventListener("click", submitTask);
btnCancelTask.addEventListener("click", cancelTask);
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



initialize();


function initialize() {

    displayTODO();
}

function toggleInfoWindow() {
    infoWindow.classList.toggle("show-info");
}

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
        console.log("validation suceeded");
        var newTask = createTask();
        toggleModal();
        try {
            localStorage.setItem(newTask.id, JSON.stringify(createTask()));
        } catch {
            message("Task could not be stored");
            return;
        }

        displayTask(newTask);
        message("Task successfully created!");
    }
}


function createTask() {
    console.log(inputImportant.checked);
    console.log(inputColor.value);

    var colorChosen = inputColor.value ? inputColor.value : '#add8e6';

    return {
        title: inputTitle.value.trim(),
        description: inputDescription.value.trim(),
        important: inputImportant.checked,
        completed: inputCompleted.checked,
        color: colorChosen,
        list: inputCustomList.value,
        id: idTask()
    }
}


function displayTask(task) {
    var elemTask = document.createElement('div');
    elemTask.id = task.id;
    elemTask.classList.add('task');
    elemTask.style.borderColor = task.color;
    var complete = document.createElement('div');
    complete.classList.add("wrapper-input-complete");
    complete.innerHTML = "<input class = 'input-complete' type = 'checkbox'>";
    var taskName = document.createElement('span');
    taskName.classList.add('task-name');
    taskName.textContent = task.title;

    console.log(task.title);
    var important = document.createElement('div');
    important.classList.add('wrapper-input-important');
    important.innerHTML = "<input class = 'input-important' type = 'checkbox'>";
    elemTask.appendChild(complete);
    elemTask.appendChild(taskName);
    elemTask.appendChild(important);
    taskWrapper.appendChild(elemTask);

}


function displayTODO() {

    clearPanel();
    var tasks = allStorage();
    console.log(tasks)
    for (let i = 0; i < tasks.length; i++) {
        if (!tasks[i].completed && !tasks[i].important) {
            displayTask(tasks[i]);
        }
    }
}

function clearPanel() {
    taskWrapper.innerHTML = "";
}

function resetForm() {
    inputTitle.value = "";
    inputDescription.value = "";
    inputImportant.checked = false;
    inputCompleted.checked = false;
}

function validate() {
    let validation = true;
    var TitleRegEx = /\b.{3,50}\b/ //  whatever between 3 and 50 chars
    var DescRegEx = /\b.{1,500}\b/ //  whatever between 1 and 500 chars
    clearErrors();
    if (!TitleRegEx.test(inputTitle.value)) {
        inputTitle.parentElement.insertAdjacentHTML(
            "beforeend",
            "<div class='error-msg' style = ' margin-left: 100px; margin-top:25px'><p>Title must be between 1 and 60 characters</p></div>"
        );
        inputTitle.classList.add("error-input")
        validation = false;
    }
    if (!DescRegEx.test(inputDescription.value)) {
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


function message(msg) {
    infoWindow.textContent = msg;
    toggleInfoWindow();
    setTimeout(toggleInfoWindow, 1500);
}

function idTask() {
    var id = Math.floor(Math.random() * Math.floor(10000000)); // 1 in ten millions
    if (localStorage.getItem(id)) {
        idTask();
    } else {
        return id;
    }
}


function allStorage() {
    var values = [];
    var keys = Object.keys(localStorage);
    var i = keys.length;
    var j = 0;
    while (i) {
        values.push(JSON.parse(localStorage.getItem(keys[j])));
        i--;
        j++;
    }
    return values;
}