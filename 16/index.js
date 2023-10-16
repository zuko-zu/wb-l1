// Приняла решение использовать подключение через CDN.
// Данная реализация работает корректно в браузерной среде.
// Для среды Node.js нужно будет установить Moment.js через npm 

// Импортирируем дефолтную функцию изmomentModule.js
import getDayOfWeek from "./momentModule.js";

const date = new Date()
console.log(getDayOfWeek(date))
// Выводит текущий день недели