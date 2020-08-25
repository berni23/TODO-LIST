var acc = document.querySelector(".accordion");
var customListSelector = document.querySelector(".custom-list");
var lists = document.querySelectorAll(".panel-list");
var panelClick = document.getElementsByClassName("panel-click");
var panelTask = document.getElementsByClassName("panel-task");
var taskTitle = document.querySelector(".task-title");
var filterTodo = document.getElementById("filter-todo");
var filterImportant = document.getElementById("filter-important");
var filterCompleted = document.getElementById("filter-completed");
var taskWrapper = document.querySelector(".task-wrapper");

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


filterTodo.addEventListener("click", displayTODO);
filterImportant.addEventListener("click", displayImportant);
filterCompleted.addEventListener("click", displayCompleted);

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


function checkFilter() {

    var filterId = document.querySelector(".active").id;

    console.log(filterId);
    switch (filterId) {
        case "filter-todo": {
            displayTODO();
            break;
        }
        case "filter-completed": {
            displayCompleted();
            break;
        }
        case "filter-important": {
            displayImportant();
            break;
        }
    }
}

function initialize() {
    displayTODO();
}

function displayTODO() {
    clearPanel();
    var tasks = getAll();
    for (let i = 0; i < tasks.length; i++) {
        if (!tasks[i].completed && !tasks[i].important && !tasks[i].list) {
            displayTask(tasks[i]);
        }
    }
}

function displayCompleted() {
    clearPanel();
    var tasks = getAll();
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].completed) {
            displayTask(tasks[i]);
        }
    }
}

function displayImportant() {
    clearPanel();
    var tasks = getAll();
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].important && !tasks[i].completed) {
            displayTask(tasks[i]);
        }
    }

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
        var newTask = createTask();
        toggleModal();
        resetForm();
        try {
            setItem(newTask);
        } catch {
            message("Task could not be stored");
            return;
        }
        displayTask(newTask);
        message("Task successfully created!");
    }
}

function setItem(item) {
    var arrayTodo = getAll();
    var index = arrayTodo.findIndex(x => x.id === item.id);
    if (index === -1) arrayTodo.push(item);
    else arrayTodo[index] = item
    localStorage.setItem('todo', JSON.stringify(arrayTodo));

}

function getItem(id) {
    var arrayTodo = getAll();

    var item;

    for (elem of arrayTodo) {

        if (elem.id == id) item = elem;
    }

    return item;
}

function getAll() {
    try {
        var arrayTodo = JSON.parse(localStorage.getItem('todo'));
        if (!arrayTodo) {
            arrayTodo = [];
        }
    } catch {
        var arrayTodo = [];
    }

    return arrayTodo;

}

function createTask() {
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
    var inputComplete = document.createElement("input");
    inputComplete.type = "checkbox";
    inputComplete.classList.add("input-complete");
    inputComplete.addEventListener("change", setComplete)
    inputComplete.checked = task.completed;
    complete.appendChild(inputComplete);
    //complete.innerHTML = "<input class = 'input-complete' type = 'checkbox'>";
    var taskName = document.createElement('span');
    taskName.classList.add('task-name');
    taskName.textContent = task.title;
    var important = document.createElement('div');
    important.classList.add('wrapper-input-important');
    var inputImportant = document.createElement("input");
    inputImportant.type = "checkbox";
    inputImportant.classList.add("input-important");
    inputImportant.addEventListener("change", setImportant)
    inputImportant.checked = task.important;
    important.appendChild(inputImportant);
    // important.innerHTML = "<input class = 'input-important' type = 'checkbox'>";
    elemTask.appendChild(complete);
    elemTask.appendChild(taskName);
    elemTask.appendChild(important);
    taskWrapper.appendChild(elemTask);
}

function setImportant(event) {
    var id = event.target.parentElement.parentElement.id;
    var task = getItem(id);
    if (event.target.checked) task.important = true;
    else task.important = false;
    setItem(task);
    checkFilter();
}



function setComplete(event) {
    var id = event.target.parentElement.parentElement.id;
    var task = getItem(id);
    if (event.target.checked) task.completed = true;
    else task.completed = false;
    setItem(task);
    checkFilter();
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
    if (getItem(id)) {
        idTask();
    } else {
        return id;
    }
}

/*function allStorage() {
    var values = [];
    var keys = Object.keys(localStorage);
    console.log(keys);
    var i = 0;
    while (i < keys.length) {
        values.push(JSON.parse(localStorage.getItem(keys[i])));
        i++;
    }
    return values;
    //return keys;
}

*/