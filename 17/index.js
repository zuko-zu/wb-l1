// получаем необходимые DOM элементы.

const addressInput = document.querySelector('#addressInput');
const addressList = document.querySelector('#addressList');

/**
 * Выполняет геокодирование указанного адреса и добавляет результаты в список адресов.
 *
 * @param {string} address - Адрес, который необходимо геокодировать.
 */
function geocodeAddress(address) {
  ymaps
    .geocode(address)
    .then((response) => {
      // Обработка результатов геокодинга
      response.geoObjects.each((item) => {
        // Добавляем в Dom каждый отдельный результат как элемент списка
        addressList.insertAdjacentHTML('beforeend', `<li>${item.getAddressLine()}</li>`);
      });
    })
    .catch((error) => {
      // Выводим ошибку если что-то пошло не так
      console.error(error);
    });
}

/**
 * Функция дебаунсинга.
 *
 * @param {function} func - Функция, которую нужно вызвать после задержки.
 * @param {number} delay - Задержка в миллисекундах перед вызовом функции.
 * @returns {function} - Функция-обертка с задержкой.
 */

// Функция замыкания, возвращает другую функцию, котороя сохраняет доступ к внешней переменной
// даже после завершения работы внешней функции
function debounce(func, delay) {
  let timeoutId;
  return function () {
    // Сбрасываем timeout, если он был установлен
    clearTimeout(timeoutId);
    // Устанавливаем новый таймаут для вызова функции
    timeoutId = setTimeout(func, delay);
  };
}

/**
 * Обрабатывает ввод пользователя в поле ввода адреса.
 */
function handleInput() {
  const inputText = addressInput.value;
  addressList.innerHTML = '';

  if (inputText.length > 2) {
    geocodeAddress(inputText);
  }
}

// Добавляем обработчик события input с дебаунсингом
addressInput.addEventListener('input', debounce(handleInput, 2000));
