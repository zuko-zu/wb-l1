// 1. C помощью метода JSON.stringify()

/**
 * Функция конвертирует объект JSON в строку.
 *
 * @param {Object} jsonObject - Объект JSON, который нужно преобразовать в строку.
 * @returns {string} - Строка, представляющая JSON.
 */
function convertJSONToString(jsonObject) {
  // Используем метод JSON.stringify() для преобразования объекта JSON в строку.
  const jsonString = JSON.stringify(jsonObject);

  // Возвращаем полученную строку.
  return jsonString;
}

// 2. Используем рекурсию

/**
 * Функция конвертирует объект JSON в строку.
 *
 * @param {Object} jsonObj - Объект JSON для конвертации.
 * @returns {string} - Строковое представление объекта JSON.
 */
function convertJSONToString2(jsonObj) {
  // Выполняем преобразование в зависимости от типа данных переданного параметра
  if (jsonObj === null) {
    return 'null';
  } else if (typeof jsonObj === "undefined") {
    return "undefined";
  } else if (typeof jsonObj === 'string') {
    return `"${jsonObj}"`;
  } else if (typeof jsonObj === 'number' || typeof jsonObj === 'boolean') {
    return `${jsonObj}`;
  } else if (Array.isArray(jsonObj)) {
    return `[${jsonObj.map(convertJSONToString2)}]`;
  } else if (typeof jsonObj === 'object') {
    let result = '{';

    // Если jsonObj является объектом, начинаем создавать строку JSON
    // Формируем строку, добавляя начальное значение "{"

    // Перебираем все ключи объекта
    for (const key in jsonObj) {
      // Проверка hasOwnProperty используется для обеспечения того, что мы обрабатываем только собственные свойства объекта,
      // а не свойства, унаследованные из его прототипа.

      // Если мы не сделаем проверку на hasOwnProperty, могут быть включены свойства, которые не являются собственными для объекта,
      // также включатся функции или другие специфические свойства, которые не имеют смысла в JSON-представлении данных (в данной реализации точно).
      if (jsonObj.hasOwnProperty(key)) {
        // Сохраняем значение свойства в отдельную переменную для удобства.
        const value = jsonObj[key];
        // Добавляем ключ и значение в результатирующую строку JSON, также не забываем добавить разделитель ":" и пробел после запятой.
        result += `"${key}":${convertJSONToString2(value)},`;
      }
    }

    // Удаляем последний лишний разделитель и закрываем объект JSON
    if (result !== '{') {
      result = result.slice(0, -1);
    }
    result += '}';

    // Возвращаем результат
    return result;
  }
}

// Пример использования:

const jsonData = {
  name: 'Zu',
  age: 30,
  isStudent: false,
  address: {
    street: 'Some street',
    city: {
      1: 'some city',
      2: 'another city',
    },
  },
};

console.log(typeof convertJSONToString(jsonData));
console.log(convertJSONToString(jsonData));
// string

console.log(typeof convertJSONToString2(jsonData));
console.log(convertJSONToString2(jsonData));
