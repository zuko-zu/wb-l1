/**
 * Функция ожидания заданного количества миллисекунд.
 *
 * @param {number} ms - Количество миллисекунд для ожидания.
 * @returns {Promise} Промис, который завершится после заданной задержки.
 */
function timeoutFunction(ms) {
  // Создаем и возвращаем промис, который завершится через определенное количество милисекунд.
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Таймаут выполнился!')
      resolve()
    }, ms);
  });
}

/**
 * Функция, выполняющая асинхронную операцию, ожидая 2 секунды перед завершением.
 *
 * @returns {Promise} Промис, который завершится с сообщением "Готово!" после завершения операции.
 */
async function asyncFunction() {
  console.log('Начало выполнения асинхронной функции');
  // Ждем 5 секунд
  await timeoutFunction(5000);
  return 'Готово!';
}

// Пример использования
asyncFunction()
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error('что-то пошло не так', error);
  });