const input = document.querySelector(`#add`);
let data = 0;
let lista = [];
let dataAtual;
let taskAtual;

const load = () => {
  if (lista.length > 0) {
    lista.forEach((li) => {
      const texto = li.text;
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
        removerItem(item);
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

      newItem.setAttribute(`data-key`, li.id);
      newItem.append(newDiv);
      newItem.append(newDivButton);
      newItem.classList.add(`item`);
      ul.append(newItem);
      input.value = ``;
      data++;
    });
  }
};

if (localStorage.hasOwnProperty("data")) {
  data = JSON.parse(localStorage.getItem(`data`)) || {};
}

if (localStorage.hasOwnProperty("lista")) {
  lista = JSON.parse(localStorage.getItem(`lista`)) || {};
  load();
}

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
        removerItem(item);
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
      lista.push({ id: data, text: texto });
      save();
      data++;
    }
  }
};

//funcao de remover
function removerItem(el) {
  const parentElement = el.currentTarget.closest(`li`);
  let key = parentElement.getAttribute(`data-key`);
  console.log(`data key ${key}`);
  let index = 0;
  lista.forEach((list, i) => {
    if (list.id == key) {
      console.log(`indice ${i}`);
      console.log(list.text);

      index = i;
    }
  });
  lista.splice(index, 1);
  parentElement.remove();
  save();
}

function modificar(el) {
  let container = document.querySelector(`.container`);
  let modal = document.querySelector(`.modals`);
  let key;

  let parentElement = el.currentTarget.closest(`li`);
  taskAtual = parentElement.querySelector(`span`).innerText;
  modal.querySelector(`span`).innerHTML = taskAtual;
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
  save();
};

input.addEventListener(`keyup`, adicionarItem);

//salvar no local storage
function save() {
  let newList = Object.assign(lista);
  localStorage.setItem(`lista`, JSON.stringify(newList));
  localStorage.setItem(`data`, JSON.stringify(data));
}
