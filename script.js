var sidebarContent = document.querySelector(".sidebar-content")
var customListSelector = document.querySelector(".custom-list");
var dataCustomList = document.getElementById("data-customList");
var lists = document.querySelectorAll(".panel-list");
var panelClick = document.getElementsByClassName("panel-click");
var panelTask = document.getElementsByClassName("panel-task");
var taskTitle = document.querySelector(".task-title");
var btnTitleWrapper = document.querySelector(".btn-title-wrapper");
var titleWrapper = document.querySelector(".title-wrapper")
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
var colorsList = ["purple", "green", "yellow", "orange", "grey", "pink", "blue"];
var btnCreateList = document.getElementById("list-created");
var btnCancelList = document.getElementById("list-canceled");
var confirmRemoveListWindow = document.querySelector(".confirm-remove-list-window");
var btnCloseConfirmRemove = document.getElementById("close-confirm-remove");
var btnRemoveListConfirmed = document.getElementById("remove-list-confirmed");
var inputChangeList = document.getElementById("input-changeList");

// Modal for checking task info (on task title clicked)
var checkModal = document.querySelector(".check-modal");
var closeCheckModal = document.getElementById("close-check-modal");
var checkTitle = document.getElementById("check-input-title");
var checkDescription = document.getElementById("check-description");
var checkCompleted = document.getElementById("check-completed");
var checkImportant = document.getElementById("check-important");
var checkCustomList = document.getElementById("selected-custom-list");
var checkColorSelected = document.getElementById("check-task-color");
var bntSaveChangesTask = document.getElementById("save-changes-task");
var cancelChangesTasK = document.getElementById("cancel-changes-task");
var btnRemoveTask = document.getElementById("remove-task");

// remove window
var removeWindow = document.querySelector(".remove-window");
var confirmRemove = document.getElementById("confirm-remove");
var cancelRemove = document.getElementById("cancel-remove");

// remove list window
var btnRenameList = document.getElementById("button-rename-list");
var btnRemoveList = document.getElementById("button-remove-list");
var btnCloseListWindow = document.getElementById("close-list-window");
var removeListWindow = document.querySelector(".remove-list-window");
var listNameWindow = document.querySelector(".change-listName-window");
var listChangeName = document.getElementById("list-changeName");
var listCancelName = document.getElementById("list-cancelName");

// searchbar
var inputSearch = document.querySelector(".searchbar");

/*----------------------
Event listeners
-----------------------*/

newCustomList.addEventListener("click", toggleNewListPanel);
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

btnCloseListWindow.addEventListener("click", function () {
    windowListClosed = false;
    setTimeout(() => windowListClosed = true, 1000);
    toggleRemoveListWindow();

})

btnRemoveList.addEventListener("click", toggleConfirmRemoveListWindow);
btnRenameList.addEventListener("click", toggleListNameWindow);

for (let i = 0; i < panelClick.length; i++) {
    panelClick[i].addEventListener("click", panelClickActive);
}

inputSearch.addEventListener("input", handleSearch);
customListSelector.addEventListener("click", function () {
    lists = document.querySelectorAll(".panel-list");
    document.getElementById("caret-down-custom").classList.toggle("hidden");
    document.getElementById("caret-right-custom").classList.toggle("hidden");
    newCustomList.classList.toggle("hidden");
    for (let i = 0; i < lists.length; i++) {
        lists[i].classList.toggle("hidden");
    }
});

cancelRemove.addEventListener("click", function () {
    toggleRemoveWindow();
    toggleConfirmRemoveListWindow();
});
confirmRemove.addEventListener("click", removeTask);
closeCheckModal.addEventListener("click", toggleCheckModal);
bntSaveChangesTask.addEventListener("click", saveChangesTask);
btnRemoveTask.addEventListener("click", toggleRemoveWindow);
cancelChangesTasK.addEventListener("click", toggleCheckModal);
listChangeName.addEventListener("click", changeListName);
listCancelName.addEventListener("click", function () {

    toggleListNameWindow();
    toggleRemoveListWindow();
})
btnRemoveListConfirmed.addEventListener("click", removeList);
btnCloseConfirmRemove.addEventListener("click", function () {
    toggleConfirmRemoveListWindow();
    toggleRemoveListWindow();

})

/*----------------------------
initialize list
 -------------------------- */

initialize();

function initialize() {
    displayTODO();
    displayAllLists();
}

/*----------------------------------------
check which filter is active ( important, completed, to do , or a custom list )
------------------------------------*/

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
            break;
        }
    }
}

/*-----------------------------------------------------------
Apply the different filters, controlled by  the 'checkFilter' function
------------------------------------------------------------*/

function displayTODO() {
    clearPanel();
    var tasks = getAll();
    for (let i = 0; i < tasks.length; i++) {
        if (!tasks[i].completed && !tasks[i].important && !tasks[i].list) {
            displayTask(tasks[i]);
        }
    }
    taskTitle.textContent = "TASK LIST";
    taskTitle.dataset.id = null;
    titleWrapper.removeEventListener("click", showRemoveListWindow);
}

function displayCompleted() {
    clearPanel();
    var tasks = getAll();
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].completed) {
            displayTask(tasks[i], completed = true);
        }
    }
    taskTitle.textContent = "COMPLETED";
    taskTitle.dataset.id = null;
    titleWrapper.removeEventListener("click", showRemoveListWindow);

}

function displayImportant() {
    clearPanel();
    var tasks = getAll();
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].important && !tasks[i].completed) {
            displayTask(tasks[i]);
        }
    }
    taskTitle.textContent = "IMPORTANT";
    taskTitle.dataset.id = null;
    titleWrapper.removeEventListener("click", showRemoveListWindow);
}

var windowListClosed = true

function displayTasksFromlist(idList) {

    clearPanel();
    var tasks = getAll();
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].list == idList && !tasks[i].completed) {
            displayTask(tasks[i]);
        }
    }
    taskTitle.textContent = idList.toUpperCase();
    taskTitle.dataset.id = idList;
    titleWrapper.addEventListener("mouseover", function () {

        if (windowListClosed)
            showRemoveListWindow();
    })

}
/* ---------------------
Search tasks
----------------------*/

function handleSearch(event) {
    clearPanel();
    var inputText = event.target.value.trim().toLowerCase();
    var tasks = getAll();

    for (task of tasks) {
        var title = task.title.trim().toLowerCase();
        if (title.startsWith(inputText)) {

            displayTask(task);
        }
    }
}

/* -------------------------
Task logic
-------------------------*/

// Display a task
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
    var taskName = document.createElement('span');
    taskName.classList.add('task-name');
    taskName.textContent = task.title;
    elemTask.addEventListener("click", showTaskInfo);
    var important = document.createElement('div');
    important.classList.add('wrapper-input-important');
    var inputImportant = document.createElement("input");
    inputImportant.type = "checkbox";
    inputImportant.classList.add("input-important");
    inputImportant.addEventListener("change", setImportant)
    inputImportant.checked = task.important;
    important.appendChild(inputImportant);
    elemTask.appendChild(complete);
    elemTask.appendChild(taskName);
    elemTask.appendChild(important);
    if (inputComplete.checked) elemTask.classList.add("completed");
    if (inputImportant.checked) elemTask.classList.add("important");
    taskWrapper.appendChild(elemTask);
}

// cancel task
function cancelTask() {
    toggleModal();
    resetForm();
}

// submit task
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

// create task object
function createTask() {
    var colorChosen = inputColor.value ? inputColor.value : 'lightblue'; //#add8e6';
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

// validate task inputs
function validate() {
    let validation = true;
    var TitleRegEx = /\b.{3,50}\b/ //  whatever between 3 and 50 chars
    var DescRegEx = /\b.{1,500}\b/ //  whatever between 1 and 500 chars
    clearErrors();
    if (!TitleRegEx.test(inputTitle.value)) {
        inputTitle.parentElement.insertAdjacentHTML(
            "beforeend",
            "<div class='error-msg' style = 'margin-left: 100px; margin-top:25px'><p>Title must be between 3 and 50 characters</p></div>"
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

    var listNames = getListNames();
    if (!listNames.includes(inputCustomList.value) && inputCustomList.value != "") {

        inputCustomList.parentElement.insertAdjacentHTML(
            "beforeEnd",
            "<div class='error-msg' style = 'margin-left:100px;margin-top:25px';><p>Please choose an existing list name or leave it blank</p></div>");
        inputCustomList.classList.add("error-input");
        validation = false;
    }

    if (!colorsList.includes(inputColor.value) && inputColor.value != "") {

        inputColor.parentElement.insertAdjacentHTML(
            "beforeEnd",
            "<div class='error-msg' style = 'margin-left:100px;margin-top:25px';><p>Please choose an existing color or leave it blank</p></div>");
        inputColor.classList.add("error-input");
        validation = false
    }

    return validation; // true if validation passed, else false
}

/* ---------------------------
List logic
-----------------------------*/

// create a list
function createList() {

    var listNameRegEx = /\b.{1,25}\b/ //  whatever between 1 and 25 chars
    clearErrors();
    var arrayListNames = getListNames();
    var nameList = inputList.value;
    if (!listNameRegEx.test(nameList)) {
        inputList.insertAdjacentHTML('beforeBegin', "<div style ='margin-right:100px; width:150px' class='error-msg' ><p>List name must be between 1 and 25 characters</p></div>")
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

function chosenList(event) {
    var id = event.target.textContent;
    displayTasksFromlist(id);
}

// Display a list on the sidebar
function displayList(listName) {
    var list = document.createElement('div');
    list.classList.add('panel');
    list.classList.add('panel-list');
    list.classList.add('panel-click');
    list.textContent = listName;
    if (newCustomList.classList.contains("hidden"))
        list.classList.add("hidden")
    list.addEventListener("click", panelClickActive);
    sidebarContent.appendChild(list);
    var optionList = document.createElement("option");

    optionList.value = listName;
    optionList.classList.add("option" + listName.replace(/ /g, ''));
    list.addEventListener("click", chosenList);
    dataCustomList.appendChild(optionList);
}

// display all lists on the sidebar
function displayAllLists() {
    dataCustomList = document.getElementById("data-customList");
    dataCustomList.innerHTML = "";
    var names = getListNames();
    for (name of names) {
        displayList(name);
    }
}

// change list name
function changeListName() {
    var currentListName = taskTitle.dataset.id;
    clearErrors();
    var listNames = getListNames();
    var nameList = inputChangeList.value;
    if (nameList == "") {
        inputList.insertAdjacentHTML('beforeBegin', "<div style ='margin-right:100px; width:150px' class='error-msg' ><p>List name can't be blank</p></div>")
        inputList.classList.add("error-input");
        return;
    }
    if (listNames.includes(nameList)) {
        inputList.insertAdjacentHTML('beforeBegin', "<div class='error-msg' ><p>List name already exists</p></div>")
        inputList.classList.add("error-input")
        return;
    }
    var index = listNames.findIndex(x => x == currentListName);
    listNames[index] = nameList;
    localStorage.setItem("listNames", JSON.stringify(listNames));
    toggleListNameWindow();
    toggleRemoveListWindow();
    inputList.value = "";
    message("List  name successfully modified");
    clearErrors();
    var displayedList = document.getElementById(currentListName);
    displayedList.textContent = nameList;
    var optionsList = document.querySelectorAll(".option" + currentListName.replace(/ /g, ''));
    console.log(optionsList);
    console.log("outside for");
    for (option of optionsList) {
        console.log(option.value);
        option.value = nameList;
        console.log(option.value);
    }
    checkFilter();
}

// remove list
function removeList() {
    var tasks = getAll();
    var listNames = getListNames();
    var listName = taskTitle.dataset.id;

    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].list === listName) {
            tasks.splice(i, 1);
        }
    }
    setAll(tasks);
    var listIndex = listNames.findIndex(x => listName);
    listNames.splice(listIndex, 1);
    setListNames(listNames);
    document.getElementById(listName).remove();
    filterTodo.classList.add("active");
    checkFilter();
    toggleConfirmRemoveListWindow();
    toggleRemoveListWindow();
    message("list sucessfully removed");
}

/*------------------------------
LocalStorage
-----------------------------*/

// set and get tasks
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

// remove a task
function removeItem(id) {
    var tasks = getAll();
    var index = tasks.findIndex(x => x.id === id);
    tasks.splice(index, 1);
    localStorage.setItem('todo', JSON.stringify(tasks));
}

// get array of tasks
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

// set array of tasks
function setAll(tasks) {
    localStorage.setItem('todo', JSON.stringify(tasks))
}

// change the property important of a task and update in in localStorage
function setImportant(event) {
    var id = event.target.parentElement.parentElement.id;
    var task = getItem(id);
    if (event.target.checked) task.important = true;
    else task.important = false;
    setItem(task);
    checkFilter();
    checkModal.classList.remove("show-modal");

}

// change the property complete of a task and update in in localStorage
function setComplete(event) {
    var id = event.target.parentElement.parentElement.id;
    var task = getItem(id);
    if (event.target.checked) task.completed = true;
    else task.completed = false;
    setItem(task);
    checkFilter();
}

// get and set listnames
function getListNames() {
    var arrayListNames = JSON.parse(localStorage.getItem("listNames"));
    if (!arrayListNames) arrayListNames = [];
    return arrayListNames;
}

function setListNames(arrayListNames) {
    localStorage.setItem("listNames", JSON.stringify(arrayListNames));
}

/*-------------------------
Task updating logic
---------------------------*/

// open a modal where task info is displayed
function showTaskInfo(event) {
    if (event.target.classList.contains("task") || event.target.classList.contains("task-name")) {
        var id = event.currentTarget.id
        var task = getItem(id);
        checkTitle.value = task.title;
        checkTitle.dataset.id = id;
        checkDescription.value = task.description;
        checkCompleted.checked = task.completed;
        checkImportant.checked = task.important;
        checkCustomList.value = task.list;
        if (task.color == 'lightblue')
            checkColorSelected.value = "";
        else
            checkColorSelected.value = task.color;
        toggleCheckModal();
    }
}

// save  changes on task properties
function saveChangesTask() {
    if (validateUpdate()) {
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
        message("task sucessfully updated!");
    }
}

// remove a task
function removeTask() {
    var id = checkTitle.dataset.id;
    removeItem(id);
    checkFilter();
    message('Task successfully removed');
    toggleCheckModal();
    toggleRemoveWindow();
}

// validate task updating
function validateUpdate() {
    let validation = true;
    var TitleRegEx = /\b.{3,50}\b/ //  whatever between 3 and 50 chars
    var DescRegEx = /\b.{1,500}\b/ //  whatever between 1 and 500 chars
    clearErrors();
    if (!TitleRegEx.test(checkTitle.value)) {
        checkTitle.parentElement.insertAdjacentHTML(
            "beforeend",
            "<div class='error-msg' style = 'margin-left: 100px; margin-top:25px'><p>Title must be between 1 and 50 characters</p></div>"
        );
        checkTitle.classList.add("error-input")
        validation = false;
    }
    if (!DescRegEx.test(checkDescription.value)) {
        checkDescription.parentElement.insertAdjacentHTML(
            "afterEnd",
            "<div class='error-msg' style = ' margin-left:100px;margin-top:85px';><p>Description required and with a maximum of 500 characters</p></div>"
        );
        checkDescription.classList.add("error-input");
        validation = false;
    }

    var listNames = getListNames();
    if (!listNames.includes(checkCustomList.value) && checkCustomList.value != "") {
        checkCustomList.parentElement.insertAdjacentHTML(
            "beforeEnd",
            "<div class='error-msg' style = 'margin-left:100px;margin-top:25px';><p>Please choose an existing list name or leave it blank</p></div>");
        checkCustomList.classList.add("error-input");
        validation = false;
    }

    if (!colorsList.includes(checkColorSelected.value) && checkColorSelected.value != "") {
        checkColorSelected.parentElement.insertAdjacentHTML(
            "beforeEnd",
            "<div class='error-msg' style = 'margin-left:100px;margin-top:25px';><p>Please choose an existing color or leave it blank</p></div>");
        checkColorSelected.classList.add("error-input");
        validation = false
    }
    return validation; // true if validation passed, else false
}

/*--------------------------------------------
Functions for toggling between show and hide
---------------------------------------------*/

function panelClickActive(event) {
    var activeOption = document.querySelector(".active");
    if (activeOption) activeOption.classList.remove("active");
    event.target.classList.toggle("active");

}

function showRemoveListWindow() {
    if (taskTitle.dataset.id != "null") {
        removeListWindow.classList.add("show-info");
        removeListWindow.classList.remove("hidden");
        removeListWindow.classList.add("high-z");;
    }
}

function toggleNewListPanel() {
    newListWindow.classList.toggle("show-info");
}

function toggleRemoveWindow() {
    removeWindow.classList.toggle("show-info");
}

function toggleCheckModal() {
    checkModal.classList.toggle("show-info");
}

function toggleRemoveListWindow() {
    removeListWindow.classList.toggle("show-info");
    removeListWindow.classList.toggle("hidden")
}

function toggleConfirmRemoveListWindow() {
    confirmRemoveListWindow.classList.toggle("hidden");
    confirmRemoveListWindow.classList.toggle("show-info");
}

function toggleListNameWindow() {
    listNameWindow.classList.toggle("show-info");
    listNameWindow.classList.toggle("high-z");
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
/*-------------------------
Utilities
-----------------------*/

// clear task panel
function clearPanel() {
    taskWrapper.innerHTML = "";
}
// reset form
function resetForm() {
    inputTitle.value = "";
    inputDescription.value = "";
    inputImportant.checked = false;
    inputCompleted.checked = false;
}
// clear form errors
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
// display a message to the user
function message(msg) {
    infoWindow.textContent = msg;
    toggleInfoWindow();
    setTimeout(toggleInfoWindow, 1500);
}
// create a random id for the tasks
function idTask() {
    var id = Math.floor(Math.random() * Math.floor(10000000)); // 1 in ten millions
    if (getItem(id)) {
        idTask();
    } else {
        return id;
    }
}