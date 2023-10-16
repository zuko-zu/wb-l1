/**
 * Функция для обработки данных из формы и отправки их на сервер.
 * @param {Event} event - Объект события отправки формы.
 */
async function handleFormSubmit(event) {
  try {
    // Отменяем дефолтное событие.
    event.preventDefault();
    // Получаем форму, на которой произошло событие отправки.
    const form = event.target;

    // Преобразуем данные в объект
    const formData = new FormData(form);
    const formValues = {};
    formData.forEach((value, key) => {
      formValues[key] = value;
    });

    const serverURL = 'https://jsonplaceholder.typicode.com/posts';
    // Вызываем функцию для отпраки запроса и сохраняем результат
    const response = await sendDataToServer(formValues, serverURL);

    if (response.status === 201) {
      // Обработка успешного ответа.
      form.reset();
      console.log('Данные успешно отправлены на сервер:', response);
      alert('Данные успешно отправлены на сервер!');
    } else {
      // Обработка других HTTP статусов.
      console.error('Ошибка при отправке на сервер. HTTP статус:', response.status);
      alert('Что-то пошло не так, попробуйте отправить данные позже :(');
    }
  } catch (error) {
    alert('Что-то пошло не так :(');
    console.error('Ошибка при отправке на сервер:', error);
  }
}

/**
 * Функция для отправки данных на сервер.
 *
 * @param {Object} data - Данные для отправки на сервер (в формате JSON).
 * @param {string} serverURL - URL сервера, на который отправляются данные.
 * @returns {Promise<Response>} - Обещание с объектом Response от сервера.
 *
 * @throws {Error} Если произошла сетевая ошибка или ошибка сервера.
 */
async function sendDataToServer(data, serverURL) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    // Преобразуем данные в формат JSON и устанавливаем в тело запроса
    body: JSON.stringify(data),
  };
  // Отправляем запрос на указанный сервер URL с заданными параметрами.
  const response = await fetch(serverURL, requestOptions);
  // Возвращаем объект Response для последующей обработки.
  return response;
}

// Пример использования:
const form = document.querySelector('form');
form.addEventListener('submit', handleFormSubmit);

// Пример body

// {
//   "username": "Vanya",
//   "usermail": "example@gmail.com",
//   "usercard": "visa",
//   "cardnumber": "24438304863",
//   "id": 101
// }
