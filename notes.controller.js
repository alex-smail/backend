const fs = require('fs/promises'); // С помощью этого модуля можно записать и прочитать текст в файле
const path = require('path'); // Для работы с путями к файлам и каталогам
const chalk = require('chalk'); // Для стилизации консольных сообщений

const notesPath = path.join(__dirname, 'db.json');

// Добавляем новую заметку
async function addNote(title) {
  const notes = await getNotes();

  const note = {
    title,
    id: Date.now().toString(),
  };

  notes.push(note);
  console.log(chalk.bgGreen('Note was added'));
  await fs.writeFile(notesPath, JSON.stringify(notes));
}

// Удаляем заметку
async function removeNote(id) {
  const notes = await getNotes();

  const noteIndex = notes.findIndex((note) => note.id === id);
  if (noteIndex !== -1) notes.splice(noteIndex, 1);

  console.log(chalk.bgGreen('Note was deleted'));
  await fs.writeFile(notesPath, JSON.stringify(notes));
}

// Получаем массив всех заметок
async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: 'utf-8' });
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

// Выводим все заметки
async function printNotes() {
  const notes = await getNotes();

  console.log(chalk.bgBlue('Here is the list of notes:'));
  notes.forEach(({ id }) => {
    console.log(chalk.blue(id));
  });
}

module.exports = {
  addNote,
  getNotes,
  removeNote,
};
