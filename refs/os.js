const os = require('os');

console.log(os.platform()); // узнать платформу
console.log(os.arch()); // узнать архитектуру
console.log(os.cpus()); // узнать количество ядер
console.log(os.freemem()); // узнать свободную память
console.log(os.totalmem()); // узнать общее количество памяти
console.log(os.uptime()); // узнать время работы
console.log(os.homedir()); // узнать главную директорию