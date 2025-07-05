const express = require('express');
const chalk = require('chalk');
const path = require('path');
const { addNote, getNotes, removeNote, editNote } = require('./notes.controller');

const port = 3000;
const app = express();

app.set('view engine', 'ejs'); // устанавливаем view engine, указываем что работаем с ejs
app.set('views', 'pages');

app.use(express.json()); // для работы с json
app.use(express.static(path.resolve(__dirname, 'public'))); // для работы с статикой
app.use(express.urlencoded({ extended: true })); // для работы с формами

app.get('/', async (req, res) => {
  res.render('index', {
    title: 'Express App',
    notes: await getNotes(),
    created: false,
  });
});

app.post('/', async (req, res) => {
  await addNote(req.body.title);
  res.render('index', {
    title: 'Express App',
    notes: await getNotes(),
    created: true,
  });
});

app.delete('/:id', async (req, res) => {
  await removeNote(req.params.id);

  res.render('index', {
    title: 'Express App',
    notes: await getNotes(),
    created: false,
  });
});

app.put('/:id', async (req, res) => {
  await editNote(req.params.id, req.body.title);
  
  res.render('index', {
    title: 'Express App',
    notes: await getNotes(),
    created: false,
  });
});

app.listen(port, () => {
  console.log(
    chalk.green(`Server has been started on http://localhost:${port}`),
  );
});