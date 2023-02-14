const input = document.querySelector(`#add`);

const adicionarItem = (e) => {
  if (e.key == `Enter`) {
    const texto = input.value;
    const ul = document.querySelector(`.item-list`);

    const newItem = document.createElement(`li`);
    const newDiv = document.createElement(`div`);
    const newCheck = document.createElement(`input`);
    const newSpan = document.createElement(`span`);

    const removeButton = document.createElement(`a`);

    removeButton.setAttribute(`href`, "#");
    removeButton.classList.add(`btn`);
    removeButton.innerHTML = `⛔`;
    removeButton.addEventListener(`click`, (item) => {
      alertar(item);
    });

    newDiv.classList.add(`item--content`);
    newCheck.setAttribute(`type`, `checkbox`);
    newDiv.append(newCheck);
    newSpan.innerText = texto;
    newDiv.append(newSpan);

    newItem.append(newDiv);
    newItem.append(removeButton);
    newItem.classList.add(`item`);
    ul.append(newItem);
    input.value = ``;
  }
};

//funcao de remover
function alertar(el) {
  const atualLi = el.currentTarget.closest(`li`);
  atualLi.remove();
}

input.addEventListener(`keyup`, adicionarItem);
