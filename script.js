const inputEl = document.querySelector("#input");
const buttonEl = document.querySelector("#delete");
const outputEl = document.querySelector("#list-container");
const form = document.querySelector("form");

//get tasks
const getTasks = () => {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    //display to DOM
    let output;
    const allTasks = tasks.map((task) => {
        return `
        <li id="item">
            <span>${task.title}</span>
            <button onclick="removeTask('${task.id}')" id="delete">X</button>
            </li>
        `;
    });
    output = allTasks.join("");
    outputEl.innerHTML = output;
};
getTasks();
// add task and save into local storage
const addTask = (e) => {
    e.preventDefault();
    //checking if input is epmty
    if (inputEl.value === "") {
        alert("please enter the task")
    }
    //get item
    const task = inputEl.value;
    if (task) {
        let tasks;
        if (localStorage.getItem("tasks") === null) {
            tasks = [];
        } else {
            tasks = JSON.parse(localStorage.getItem("tasks"));
        }
        tasks.unshift({
            id: Date.now(),
            title: task,
        });
        //save to storage
        localStorage.setItem("tasks", JSON.stringify(tasks));
        //empty the input after submit
        inputEl.value = "";
    }
    getTasks();
};
//remove tasks
const removeTask = id => {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks", tasks));
    }
    tasks = tasks.filter(task => {
        return task.id !== +id; //convert id to number
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    getTasks();
};
//event listener
form.addEventListener("submit", addTask);