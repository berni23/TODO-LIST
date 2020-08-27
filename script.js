var sidebarContent = document.querySelector(".sidebar-content")
var customListSelector = document.querySelector(".custom-list");
var dataCustomList = document.getElementById("data-customList");
var lists = document.querySelectorAll(".panel-list");
var panelClick = document.getElementsByClassName("panel-click");
var panelTask = document.getElementsByClassName("panel-task");
var taskTitle = document.querySelector(".task-title");
var filterTodo = document.getElementById("filter-todo");
var filterImportant = document.getElementById("filter-important");
var filterCompleted = document.getElementById("filter-completed");
var taskWrapper = document.querySelector(".task-wrapper");
var modal = document.querySelector(".modal-create-form");
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
var newCustomList = document.getElementById("new-custom-list");
var inputList = document.getElementById("input-list");
var infoWindow = document.querySelector(".info-window");
var newListWindow = document.querySelector(".new-list-window");
newCustomList.addEventListener("click", toggleNewListPanel);

var btnCreateList = document.getElementById("list-created");
var btnCancelList = document.getElementById("list-canceled");

btnCreateList.addEventListener("click", createList);
btnCancelList.addEventListener("click", toggleNewListPanel);

// Window used for delivering information to the user

btnModal.addEventListener("click", toggleModal);
btnCloseModal.addEventListener("click", toggleModal);
btnCreateTask.addEventListener("click", submitTask);
btnCancelTask.addEventListener("click", cancelTask);
document.addEventListener('keydown', handleKeyDown);
filterTodo.addEventListener("click", displayTODO);
filterImportant.addEventListener("click", displayImportant);
filterCompleted.addEventListener("click", displayCompleted);

for (let i = 0; i < panelClick.length; i++) {
    panelClick[i].addEventListener("click", panelClickActive);
}

function panelClickActive(event) {
    var activeOption = document.querySelector(".active");
    if (activeOption) activeOption.classList.remove("active");
    event.target.classList.toggle("active");

}
customListSelector.addEventListener("click", function () {
    /* Toggle between adding and removing the "active" class,
    to highlight the button that controls the panel */
    lists = document.querySelectorAll(".panel-list");
    document.getElementById("caret-down-custom").classList.toggle("hidden");
    document.getElementById("caret-right-custom").classList.toggle("hidden");
    newCustomList.classList.toggle("hidden");
    for (let i = 0; i < lists.length; i++) {
        lists[i].classList.toggle("hidden");
    }
});

// Modal for checking task info (on task title clicked)
var checkModal = document.querySelector(".check-modal");
var closeCheckModal = document.getElementById("close-check-modal");
var checkTitle = document.getElementById("check-input-title");
var checkDescription = document.getElementById("check-description");
var checkCompleted = document.getElementById("check-completed");
var checkImportant = document.getElementById("check-important");
var checkCustomList = document.getElementById("check-customList");
var checkColorSelected = document.getElementById("check-task-color");
var bntSaveChangesTask = document.getElementById("save-changes-task");
var cancelChangesTasK = document.getElementById("cancel-changes-task");
var btnRemoveTask = document.getElementById("remove-task");

closeCheckModal.addEventListener("click", toggleCheckModal);
bntSaveChangesTask.addEventListener("click", saveChangesTask);
btnRemoveTask.addEventListener("click", toggleRemoveWindow)

// remove window

var removeWindow = document.querySelector(".remove-window");
var confirmRemove = document.getElementById("confirm-remove");
var cancelRemove = document.getElementById("cancel-remove");

cancelRemove.addEventListener("click", toggleRemoveWindow);
confirmRemove.addEventListener("click", removeTask);

function removeTask() {

    var id = checkTitle.dataset.id;
    removeItem(id);
    checkFilter();
    message('Task successfully removed');
    toggleCheckModal();
    toggleRemoveWindow();

}

function toggleRemoveWindow() {
    removeWindow.classList.toggle("show-info");
    removeWindow.classList.toggle("high-z")
}

function showTaskInfo(event) {
    var id = event.currentTarget.parentElement.id
    var task = getItem(id);
    checkTitle.value = task.title;
    checkTitle.dataset.id = id;
    checkDescription.value = task.description;
    checkCompleted.checked = task.completed;
    checkImportant.checked = task.important;
    checkCustomList.value = task.list;
    checkColorSelected.value = task.color;
    toggleCheckModal();

}

function saveChangesTask() {
    var id = checkTitle.dataset.id;
    var task = getItem(id);
    task.title = checkTitle.value;
    task.description = checkDescription.value
    task.completed = checkCompleted.checked;
    task.important = checkImportant.checked;
    task.list = checkCustomList.value;
    task.color = checkColorSelected.value;
    setItem(task);

    toggleCheckModal();
    checkFilter();
}

function toggleCheckModal() {
    checkModal.classList.toggle("show-info");
}

initialize();

function createList() {
    clearErrors();
    var arrayListNames = getListNames();
    var nameList = inputList.value;
    if (nameList == "") {
        inputList.insertAdjacentHTML('beforeBegin', "<div style ='margin-right:100px; width:150px' class='error-msg' ><p>List name can't be blank</p></div>")
        inputList.classList.add("error-input");
        return;
    }
    if (arrayListNames.includes(nameList)) {
        inputList.insertAdjacentHTML('beforeBegin', "<div class='error-msg' ><p>List name already exists</p></div>")
        inputList.classList.add("error-input")
        return;
    }
    arrayListNames.push(nameList);
    localStorage.setItem("listNames", JSON.stringify(arrayListNames));
    toggleNewListPanel();
    inputList.value = "";
    message("List successfully created!");
    clearErrors();
    displayList(nameList);
}

function getListNames() {
    try {
        var arrayListNames = JSON.parse(localStorage.getItem("listNames"));
        if (!arrayListNames) arrayListNames = [];
    } catch {
        var arrayListNames = [];
    }
    return arrayListNames;
}

function displayList(listName) {
    var list = document.createElement('div');
    list.classList.add('panel');
    list.classList.add('panel-list');
    list.classList.add('panel-click');
    list.textContent = listName;
    list.id = listName;
    if (newCustomList.classList.contains("hidden"))
        list.classList.add("hidden")
    list.addEventListener("click", panelClickActive);
    sidebarContent.appendChild(list);
    var optionList = document.createElement('option');
    optionList.value = listName;
    list.addEventListener("click", chosenList);
    dataCustomList.appendChild(optionList);
}

function displayAllLists() {
    var names = getListNames();
    for (name of names) {
        displayList(name);
    }
}

function toggleNewListPanel() {
    newListWindow.classList.toggle("show-info");
}


function checkFilter() {
    var filterId = document.querySelector(".active").id;
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

        default: {
            displayTasksFromlist(filterId);

            console.log(filterId);
            break;
        }
    }
}

function initialize() {
    displayTODO();
    displayAllLists();
}

function chosenList(event) {
    var id = event.target.id;
    displayTasksFromlist(id);
}

function displayTasksFromlist(idList) {

    clearPanel();
    var tasks = getAll();
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].list == idList) {
            displayTask(tasks[i]);
        }
    }
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
        checkFilter();
    }
}

function setItem(item) {
    var tasks = getAll();
    var index = tasks.findIndex(x => x.id === item.id);
    if (index === -1) tasks.push(item);
    else tasks[index] = item
    localStorage.setItem('todo', JSON.stringify(tasks));

}

function getItem(id) {
    var tasks = getAll();
    var item;
    for (elem of tasks) {
        if (elem.id == id) item = elem;
    }
    return item;
}


function removeItem(id) {

    var tasks = getAll();
    var index = tasks.findIndex(x => x.id === id);
    tasks.splice(index, 1);
    localStorage.setItem('todo', JSON.stringify(tasks));

}


function getAll() {
    try {
        var tasks = JSON.parse(localStorage.getItem('todo'));
        if (!tasks) {
            tasks = [];
        }
    } catch {
        var tasks = [];
    }
    return tasks;

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

    taskName.addEventListener("click", showTaskInfo);
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
            "<div class='error-msg' style = 'margin-left: 100px; margin-top:25px'><p>Title must be between 1 and 60 characters</p></div>"
        );
        inputTitle.classList.add("error-input")
        validation = false;
    }
    if (!DescRegEx.test(inputDescription.value)) {
        inputDescription.parentElement.insertAdjacentHTML(
            "afterEnd",
            "<div class='error-msg' style = ' margin-left:100px;margin-top:85px';><p>Description required and with a maximum of 500 characters</p></div>"
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