document.addEventListener('click', (event) => {
  const type = event.target.dataset.type;
  const id = event.target.dataset.id;
  const li = event.target.closest('li');

  switch (type) {
    case 'remove':
      remove(id).then(() => li.remove());
      break;
    case 'edit':
      const span = li.querySelector('.note-title');
      const oldTitle = span.textContent.trim();

      const input = document.createElement('input');
      input.className = 'form-control w-50';
      input.value = oldTitle;

      // меням span на input
      span.replaceWith(input);
      console.log(input.value.trim());
      // меняем блок кнопок
      const buttonsDiv = li.querySelector('.buttons');
      buttonsDiv.innerHTML = `
      <button class="btn btn-success" data-type="save" data-id="${id}"> Сохранить </button>
      <button class="btn btn-danger" data-type="cancel" data-id="${id}"> Отменить </button>
      `;
      break;
    case 'save':
      const inputElement = li.querySelector('input');
      const newTitle = inputElement.value.trim();

      if (newTitle)
        edit(id, newTitle).then(() => {
          const span = document.createElement('span');
          span.className = 'note-title';
          span.textContent = newTitle;

          inputElement.replaceWith(span);

          location.reload();
        });
      break;
    case 'cancel':
      location.reload();
      break;
    default:
    // ничего не делаем
  }
});

async function remove(id) {
  await fetch(`/${id}`, {
    method: 'DELETE',
  });
}

async function edit(id, title) {
  await fetch(`/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify({
      title,
      id,
    }),
  });
}
