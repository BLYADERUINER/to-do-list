const taskList = document.querySelector('.list__tasks');
// const taskTemplate = document.querySelector('#template').content.querySelector('.list__task');
const taskForm = document.querySelector('.tasks__form');
const taskInput = taskForm.querySelector('.tasks__input');
const taskListDefault = taskList.querySelector('.list__default');

let tasks = [];


if (localStorage.getItem('tasks')) {
  tasks = JSON.parse(localStorage.getItem('tasks'));
  tasks.forEach((task) => renderTask (task));
};


checkEmptyList();


const addTask = function (event) {
  event.preventDefault();

  // const taskElement = taskTemplate.cloneNode(true);
  // const taskTitle = taskElement.querySelector('.list__name');
  // taskTitle.textContent = taskInput.value;
  const taskText = taskInput.value;



  const newTask = {
    id: Date.now(),
    text: taskText,
    done: false
  };

  renderTask (newTask);
  tasks.push(newTask);
  taskForm.reset();
  checkEmptyList();
  saveToLocalStorage();
};


function deleteTask (event) {
  if (event.target.dataset.action !== 'delete') return;

    const parentTask = event.target.closest('.list__task');
    const id = Number(parentTask.id);

    const index = tasks.findIndex((task) => task.id === id);

    // tasks = tasks.filter(function (task) {
    //   if (task.id === id) {
    //     return false;
    //   } else {
    //     return true;
    //   }
    // });

    // tasks = tasks.filter((task) => task.id !== id);

    tasks.splice(index, 1);
    parentTask.remove();
    checkEmptyList();
    saveToLocalStorage();
};


function completedTask (event) {
  if (event.target.dataset.action !== 'done') return;

    const parentTask = event.target.closest('.list__task');

    const id = Number(parentTask.id);
    const task =  tasks.find( (task) => task.id === id );
    task.done = !task.done;

    const taskName = parentTask.querySelector('.list__name');
    taskName.classList.toggle('list__task-done');
    saveToLocalStorage();
};


function checkEmptyList () {
  if (tasks.length === 0) {
    const listDefaultHtml = `
    <li class="list__default">
      <img
        class="list__image"
        src="./images/list/iconlist.png"
        alt="иконка"
      />
      <h2 class="list__name">Список дел пуст</h2>
    </li>`;

    taskList.insertAdjacentHTML('afterbegin', listDefaultHtml);
  };

  if (tasks.length > 0) {
    const listDefaultElement = document.querySelector('.list__default');
    listDefaultElement ? listDefaultElement.remove() : null;
  };
};


function saveToLocalStorage () {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};


function renderTask (task) {
  const classText = task.done ? 'list__name list__task-done' : 'list__name';

  const taskHtml = `
  <li id="${task.id}" class="list__task">
     <h2 class="${classText}">${task.text}</h2>
     <div class="list__container">
       <button
         class="button list__button-completed"
         data-action="done"
         type="button"
       ></button>
       <button
         class="button list__button-bin"
         data-action="delete"
         type="button"
       ></button>
     </div>
   </li>`;

  taskList.insertAdjacentHTML('beforeend', taskHtml);
};


taskList.addEventListener('click', completedTask);
taskList.addEventListener('click', deleteTask);
taskForm.addEventListener('submit', addTask);
