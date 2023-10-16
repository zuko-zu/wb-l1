// 1. Используем рекурсию

/**
 * Вызываем функции из массива поочередно и выводит их порядковый номер с помощью рекурсии.
 *
 * @param {Function[]} functions - Массив функций для вызова.
 * @param {number} [i=0] - Начальный индекс функции в массиве (по умолчанию 0).
 */

function callFunctions(functions, i = 0) {
  // Функция будет повторно вызываться лишь в том случае, если пройдет проверку
  // Т.е. до тех пор, пока в массиве есть невызванные функции (определяем по i)
  if (i < functions.length) {
    // Находим и вызываем текущую функцию по индексу
    const currentFunction = functions[i];
    currentFunction(i);
    // Запускаем функцию снова, с другими аргументами
    callFunctions(functions, i + 1);
  }
}

// 2. С помощью цикла

/**
 * Вызываем функции из массива последовательно с помощью цикла for.
 *
 * @param {Function[]} functions - Массив функций для вызова.
 */

function callFunctions2(functions) {
  // Проходимся по массиву функций с помощью цикла for
  for (let i = 0; i < functions.length; i++) {
    // Вызываем текущую функцию в массиве
    functions[i](i);
  }
}

// 3. Используем async/await для асинхронных операций

/**
 * Выполняем массив асинхронных функций последовательно, ожидая завершения каждой функции перед выполнением следующей.
 *
 * @param {Function[]} functions - Массив функций для вызова.
 * @returns {Promise} - Promise, который будет разрешен после выполнения всех функций.
 */

async function callFunctionsAsync(functions) {
  for (const func of functions) {
    // Выполняем асинхронную функцию и ожидаем её завершения.
    await func();
  }
}

// Пример использования: создаем массив функций.
const functionsArray = [
  function first(i) {
    console.log(`Выполнилась ${i + 1} функция`);
  },
  function second(i) {
    console.log(`Выполнилась ${i + 1} функция`);
  },
  function third(i) {
    console.log(`Выполнилась ${i + 1} функция`);
  },
];

// Примеры использования:

callFunctions(functionsArray);
// Выполнилась 1 функция
// Выполнилась 2 функция
// Выполнилась 3 функция

callFunctions2(functionsArray);
// Выполнилась 1 функция
// Выполнилась 2 функция
// Выполнилась 3 функция

const asyncFunctionsArray = [
  async function first(i) {
    console.log(`Выполнилась 1 функция`);
  },
  async function second(i) {
    console.log(`Выполнилась 2 функция`);
    await new Promise((resolve) => {
      setTimeout(() => {
        console.log('Hi');
        // Разрешаем promise после завершения setTimeout
        resolve();
      }, 5000);
    });
  },
  async function third(i) {
    console.log(`Выполнилась 3 функция`);
  },
];

callFunctionsAsync(asyncFunctionsArray);
// Выполнилась 1 функция
// Выполнилась 2 функция
// Hi
// Выполнилась 3 функция
