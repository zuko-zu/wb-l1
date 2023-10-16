/**
 * Функция для создания и добавляет элемент из шаблона в DOM.
 *
 * @param {string} templateId - ID элемента <template> в HTML.
 * @param {string} containerId - ID контейнера, куда нужно добавить созданный элемент.
 * @param {object} data - Данные для заполнения шаблона (опционально).
 */
function createModal(templateId, containerId, data) {
  // Сохраняем шаблон
  const template = document.getElementById(templateId);

  // Проверяем существует ли в Dom элемент с переданным id.
  // Если нет, выводим соответствующую ошибку, выходим из функции
  if (!template) {
    console.error(`Шаблон с ID '${templateId}' не найден.`);
    return;
  }

  // Копируем и сохраняем содержимое шаблона.
  const templateContent = document.importNode(template.content, true);

  // Получаем контейнер для добавления шаблона
  const container = document.getElementById(containerId);

  if (!container) {
    console.error(`Контейнер с ID '${containerId}' не найден.`);
    return;
  }

  // Пользовательская настройка содержимого элемента (если переданы данные).
  if (data) {
    const title = templateContent.querySelector('.modal__title');
    title.textContent = data.title;
    const text = templateContent.querySelector('.modal__text');
    text.textContent = data.text;
  }

  // Добавляем скопированный элемент в контейнер.
  container.appendChild(templateContent);
}

// Пример использования:
createModal('template', 'container', {
  title: 'Это заголовок',
  text: 'А это какой-то текст с описанием',
});

createModal('template', 'container', {
  title: 'Это другой заголовок',
  text: 'А это какой-то другой текст с описанием',
});
