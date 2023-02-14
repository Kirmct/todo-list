const input = document.querySelector(`#add`);
let data = 0;
let lista = [];
let dataAtual;

const adicionarItem = (e) => {
  if (e.key == `Enter`) {
    const texto = input.value;
    if (texto.length > 0) {
      const ul = document.querySelector(`.item-list`);

      const newItem = document.createElement(`li`);
      const newDiv = document.createElement(`div`);
      const newCheck = document.createElement(`input`);
      const newSpan = document.createElement(`span`);

      const newDivButton = document.createElement(`div`);
      const removeButton = document.createElement(`a`);
      const newEdtButton = document.createElement(`a`);

      newDivButton.classList.add(`item--btns`);
      removeButton.setAttribute(`href`, "#");
      removeButton.classList.add(`btn`);
      removeButton.innerHTML = `⛔`;
      removeButton.addEventListener(`click`, (item) => {
        alertar(item);
      });

      newEdtButton.setAttribute(`href`, "#");
      newEdtButton.classList.add(`btn`);
      newEdtButton.innerHTML = `✏️`;
      newEdtButton.addEventListener(`click`, (item) => {
        modificar(item);
      });

      newDivButton.append(newEdtButton);
      newDivButton.append(removeButton);

      newDiv.classList.add(`item--content`);
      newCheck.setAttribute(`type`, `checkbox`);
      newDiv.append(newCheck);
      newSpan.innerText = texto;
      newDiv.append(newSpan);

      newItem.setAttribute(`data-key`, data);
      newItem.append(newDiv);
      newItem.append(newDivButton);
      newItem.classList.add(`item`);
      ul.append(newItem);
      input.value = ``;
      data++;
      lista.push({ id: data, text: texto });
    }
  }
};

//funcao de remover
function alertar(el) {
  const atualLi = el.currentTarget.closest(`li`);
  atualLi.remove();
}

function modificar(el) {
  let container = document.querySelector(`.container`);
  let modal = document.querySelector(`.modals`);
  let key;

  let parentElement = el.currentTarget.closest(`li`);

  if (parentElement && parentElement.getAttribute(`data-key`)) {
    key = parentElement.getAttribute(`data-key`);
    dataAtual = key;
  }
  modal.style.opacity = 0;
  setTimeout(() => {
    modal.style.opacity = 1;
    container.style.opacity = `0`;
  }, 200);
  modal.style.display = `flex`;

  modal.querySelector(`input`).addEventListener(`keyup`, (e) => {
    if (e.key == `Enter`) {
      const newText = document.querySelector(`#modificar`).value;
      updateTodo(newText);
      container.style.opacity = `1`;
      modal.style.display = `none`;
    }
  });
  modal.querySelector(`input`).value = ``;
}

const updateTodo = (text) => {
  const todos = document.querySelectorAll(`li`);

  todos.forEach((todo) => {
    const dkey = todo.getAttribute(`data-key`);

    if (dataAtual == dkey) {
      todo.querySelector(`span`).innerHTML = text;
    }
  });
};

input.addEventListener(`keyup`, adicionarItem);
