/**
 * Функция для рекурсивного обхода DOM дерева.
 *
 * @param {HTMLElement} element - Начальный элемент для обхода.
 * @param {function} action - Функция, выполняемая над каждым узлом.
 */
function traverseDOM(element, action) {
  // Проверяем, сущуствует ли элемент и есть ли у него потомки.
  if (element && element.children) {
    // Выполняем указанное действие над текущим элементом.
    action(element);

    // Рекурсивно обходим все дочерние элементы.
    for (let i = 0; i < element.children.length; i++) {
      traverseDOM(element.children[i], action);
    }
  }
}

// Пример использования:
const rootElement = document.getElementById('form');
traverseDOM(rootElement, function (node) {
  console.log(node.tagName);
});
