const taskList = document.querySelector('.list__tasks');
const taskTemplate = document.querySelector('#template').content.querySelector('.list__task');
const taskForm = document.querySelector('.tasks__form');
const taskInput = taskForm.querySelector('.tasks__input');
const taskListDefault = taskList.querySelector('.list__default');


const addTask = function (event) {
  event.preventDefault();

  const taskElement = taskTemplate.cloneNode(true);
  const taskTitle = taskElement.querySelector('.list__name');
  taskTitle.textContent = taskInput.value;

  if (taskList.children.length > 0) {
    taskListDefault.classList.add('list__delete');
  };


  taskList.insertAdjacentElement('beforeend', taskElement);
  taskForm.reset();
};


function deleteTask (event) {
  if (event.target.dataset.action !== 'delete') return;

    event.target.closest('.list__task').remove();

    if (taskList.children.length === 1) {

    taskListDefault.classList.remove('list__delete');

  };
};

function completedTask (event) {
  if (event.target.dataset.action !== 'done') return;

    const taskName = event.target.closest('.list__task').querySelector('.list__name');

    taskName.classList.toggle('list__task-done');
};


taskList.addEventListener('click', completedTask);
taskList.addEventListener('click', deleteTask);
taskForm.addEventListener('submit', addTask);
