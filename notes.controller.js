const fs = require('fs/promises'); // С помощью этого модуля можно записать и прочитать текст в файле
const path = require('path'); // Для работы с путями к файлам и каталогам
const chalk = require('chalk'); // Для стилизации консольных сообщений

const notesPath = path.join(__dirname, 'db.json');

async function saveNotes(notes) {
  await fs.writeFile(notesPath, JSON.stringify(notes));
}

// Добавляем новую заметку
async function addNote(title) {
  const notes = await getNotes();

  const note = {
    title,
    id: Date.now().toString(),
  };

  notes.push(note);

  await saveNotes(notes);
  console.log(chalk.bgGreen('Note was added'));
}

// Удаляем заметку
async function removeNote(id) {
  const notes = await getNotes();

  const filtered = notes.filter((note) => note.id !== id);

  await saveNotes(filtered);
  console.log(chalk.bgGreen('Note was deleted'));
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

async function editNote(id, title) {
  const notes = await getNotes();
  
  const note = notes.find((note) => note.id === id);
  note.title = title;
  await saveNotes(notes);
  console.log(chalk.bgGreen('Note was edited'));
}

module.exports = {
  addNote,
  getNotes,
  removeNote,
  editNote,
};
