const path = require('path');

console.log(path.dirname(__filename)); // получить название каталога
console.log(path.basename(__filename)); // получить название файла
console.log(path.extname(__filename)); // получить расширение
console.log(path.parse(__filename)); // получить информацию о файле
console.log(path.resolve(__dirname, '..', './modules', './app.js')); // получить полный путь к файлу из другой папки

console.log(path.join(__dirname, '..', './modules', './app.js')); // получить полный путь к файлу из другой папки

// разница join и resolve в том, что resolve работает с абсолютными путями