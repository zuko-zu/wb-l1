/**
 * Функция запускает код после полной загрузки DOM.
 */
document.addEventListener('DOMContentLoaded', () => {
  // Находим необходимые элементы DOM и сохраняем их в переменные.
  const passwordInput = document.querySelector('input');
  const checkButton = document.querySelector('button');
  const resultParagraph = document.querySelector('p');
  const improvementsList = document.querySelector('ul');

  /**
   * Обработчик события "click" для кнопки проверки пароля.
   */
  checkButton.addEventListener('click', () => {
    // Получаем значение введенного пароля.
    const password = passwordInput.value;

    // Убеждаемся, что пароль не пустой.
    if (!password) {
      return;
    }

    // Проверяем пароль и сохраняем результат проверки.
    const checkResult = checkPassword(password);

    // Отображаем результат проверки.
    displayResult(checkResult, resultParagraph, improvementsList);
  });
});

/**
 * Функция анализа пароля.
 * @param {string} password - Пароль для анализа.
 * @returns {object} - Объект с оценкой сложности пароля и рекомендациями для улучшения.
 */
function checkPassword(password) {
  // Инициализируем переменные для оценки и рекомендаций.

  // Надежность пароля будет оцениваться по количеству баллов. Изначально score === 0
  let score = 0;
  // На основе score будет выводиться фидбек с сообщением о степени надежности пароля.
  let message = '';
  // На основе введенных данных в массив будут добавляться рекомендации по улучшению.
  let improvements = [];

  // Проверяем длину пароля и увеличиваем оценку.
  if (password.length >= 8 && password.length < 10) {
    score += 1;
  }
  if (password.length >= 10) {
    score += 2;
  }

  // Проверяем наличие цифр, букв в нижнем и верхнем регистрах, а также специальных символов.
  if (/[0-9]/.test(password)) {
    score += 1;
  }
  if (/[a-z]/.test(password)) {
    score += 1;
  }
  if (/[A-Z]/.test(password)) {
    score += 1;
  }
  if (/[!@#$%^&*()_\-+=<>?:]/.test(password)) {
    score += 1;
  }

  // Определяем общий отзыв на основе оценки.
  if (score >= 6) {
    message = 'Отлично! Ваш пароль соответствует всем требованиям надежности!';
  } else if (score >= 5) {
    message = 'Пароль средней надежности, можно улучшить.';
  } else {
    message = 'Слабый пароль. Попробуйте улучшить его.';
  }

  // Добавляем рекомендации в зависимости от отсутствующих элементов.
  if (password.length < 10) {
    improvements.push('Увеличьте длину пароля.');
  }
  if (!/[0-9]/.test(password)) {
    improvements.push('Добавьте хотя бы одну цифру.');
  }
  if (!/[a-z]/.test(password)) {
    improvements.push('Добавьте хотя бы одну букву в нижнем регистре.');
  }
  if (!/[A-Z]/.test(password)) {
    improvements.push('Добавьте хотя бы одну букву в верхнем регистре.');
  }
  if (!/[!@#$%^&*()_\-+=<>?:]/.test(password)) {
    improvements.push('Добавьте хотя бы один специальный символ.');
  }

  // Возвращаем результат анализа в виде объекта.
  return { score, message, improvements };
}

/**
 * Функция отображения результата анализа пароля.
 * @param {object} result - Результат анализа пароля.
 * @param {HTMLElement} resultParagraph - Элемент для отображения оценки.
 * @param {HTMLElement} improvementsList - Элемент для отображения рекомендаций.
 */
function displayResult(result, resultParagraph, improvementsList) {
  // Устанавливаем текст оценки сложности пароля.
  resultParagraph.textContent = `Оценка сложности пароля: ${result.message}`;
  improvementsList.innerHTML = '';

  // Если оценка не максимальная, отображаем рекомендации.
  if (result.score !== 6) {
    result.improvements.forEach((improvement) => {
      const listItem = document.createElement('li');
      listItem.textContent = improvement;
      improvementsList.appendChild(listItem);
    });
  }
}
