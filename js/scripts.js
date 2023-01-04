const Form = document.querySelector('#form');
const Input = document.querySelector('#input');
const List = document.querySelector('#list');
const EditForm = document.querySelector('#edit-form');
const EditInput = document.querySelector('#edit-input');
const TodoList = document.querySelector('#list');
const CancelBtn = document.querySelector('#cancel-edit-btn');

let oldInputValue;
// Functions

function saveTodo(text) {
  // create todo card
  const todo = document.createElement('div');
  todo.classList.add('todo');

  // create todo card title
  const todoTitle = document.createElement('h3');
  todoTitle.innerText = text;
  // insert title into the card
  todo.appendChild(todoTitle);

  //   create button
  const successBtn = document.createElement('button');
  successBtn.classList.add('finish-todo');
  successBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
  // insert title into the card
  todo.appendChild(successBtn);

  const editBtn = document.createElement('button');
  editBtn.classList.add('edit-todo');
  editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
  // insert title into the card
  todo.appendChild(editBtn);

  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('remove-todo');
  deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  // insert title into the card
  todo.appendChild(deleteBtn);

  TodoList.appendChild(todo);

  Input.value = '';
  Input.focus();
}

function changeForm() {
  EditForm.classList.toggle('hide');
  Form.classList.toggle('hide');
  TodoList.classList.toggle('hide');
}

const updateTodo = (text) => {
  const allTodo = document.querySelectorAll('.todo');

  allTodo.forEach((todo) => {
    let todoTitle = todo.querySelector('h3');

    if (todoTitle.value !== oldInputValue) {
      todoTitle.innerText = text;
    }
  });
};
// Actions
Form.addEventListener('submit', (e) => {
  e.preventDefault();

  const inputValue = Input.value;

  if (inputValue) {
    saveTodo(inputValue);
  } else {
    console.log('preencha um campo');
  }
});

document.addEventListener('click', (e) => {
  const trigger = e.target;
  const fatherDiv = trigger.closest('div');
  let todoTitle;

  if (fatherDiv && fatherDiv.querySelector('h3')) {
    todoTitle = fatherDiv.querySelector('h3').innerText;
  }

  if (trigger.classList.contains('finish-todo')) {
    fatherDiv.classList.toggle('done');
  }

  if (trigger.classList.contains('remove-todo')) {
    fatherDiv.remove();
  }

  if (trigger.classList.contains('edit-todo')) {
    changeForm();

    EditInput.value = todoTitle;
    oldInputValue = todoTitle;
  }
});

CancelBtn.addEventListener('click', (e) => {
  e.preventDefault();
  changeForm();
});

EditForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const editInputValue = EditInput.value;

  if (editInputValue) {
    updateTodo(editInputValue);
  }
  changeForm();
});
