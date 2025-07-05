document.addEventListener('click', (event) => {
  switch (event.target.dataset.type) {
    case 'remove':
      const id = event.target.dataset.id;
      remove(id).then(() => {
        event.target.closest('li').remove();
      });
      break;
    case 'edit':
      const idTitle = event.target.dataset.id;
      const liElement = event.target.closest('li');
      const spanElement = liElement.querySelector('.note-title');

      const title = spanElement.textContent.trim();
      const newTitle = prompt('Введите новое название', title);

      if (newTitle)
        edit(idTitle, newTitle).then(() => {
          liElement.firstChild.textContent = newTitle;
        });
      break;
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
