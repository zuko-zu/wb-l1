// Класс CustomNode представляет узел в связанном списке.

class CustomNode {
  constructor(item) {
    // Сохраняем переданный объект данных в текущем узле
    this.item = item;
    // Указатель на следующий узел (по умолчанию null)
    this.nextNode = null;
  }
}

/**
 * Функция jsonToLinkedList преобразует JSON-строку в связанный список.
 * @param {string} jsonString - JSON-строка, содержащая массив объектов данных.
 * @returns {CustomNode|null} - head (первый элемент) связанного списка или null, если входные данные пусты.
 * @throws {Error} - Выбрасывает ошибку, если JSON-строка некорректна.
 */

function jsonToLinkedList(jsonString) {
  const dataObjects = JSON.parse(jsonString);
  // Проверяем, что пришел именно массив объектов.
  if (!Array.isArray(dataObjects)) {
    throw new Error('JSON должен быть массивом объектов');
  }

  // Если массив пуст, вернем null, так как нет данных для списка
  if (dataObjects.length === 0) {
    return null;
  }

  // Создаем первый узел списка, используя первый объект из массива данных
  let headNode = new CustomNode(dataObjects[0]);
  // Устанавливаем текущий узел на начало списка
  let currentNode = headNode;

  // Проходимся по каждому объекту json и добавляем его в список.
  for (let i = 1; i < dataObjects.length; i++) {
    // Создаем новый узел для следующего объекта данных.
    const newNode = new CustomNode(dataObjects[i]);
    // Устанавливаем указатель текущего узла на новый узел.
    currentNode.nextNode = newNode;
    // Обновляем текущий узел на новый узел
    currentNode = newNode;
  }

  // Возвращаем head списка
  return headNode;
}

// Пример использования функции

const jsonData = '[{"data1": 1}, {"data2": 2}, {"data3": 3}]';
// Результатирующий объект.
const linkedList = jsonToLinkedList(jsonData);

console.log(linkedList.item); // { data1: 1 }
console.log(linkedList.nextNode.item); // { data2: 2 }
console.log(linkedList.nextNode.nextNode.item); // { data3: 3 }
