// Вспомогательные функции

/**
 * функцию конвертации строки в JSON.
 *
 * @param {string} jsonString - JSON-строка для парсинга.
 * @returns {object|array|string|number|boolean|null} - Результат парсинга JSON.
 * @throws {SyntaxError} - В случае некорректного JSON.
 */
function parseJson(jsonString) {
  // Объявляем переменную для указания на текущей позиции в строке.
  let index = 0;

  // Функция для пропуска пробелов и других символов разделителей. Нужна чтобы работать с данными разных форматов (как с пробелами после раздлителей и запятых, так и без)
  function skipWhitespace() {
    while (/\s/.test(jsonString[index])) {
      index++;
    }
  }

  /**
   * Функия для парсинга объекта JSON.
   *
   * @returns {object} - Объект, созданный из JSON-строки.
   */
  function parseObject() {
    // Инициализируем пустой объект, в который будем помещать свойства со значениями
    const obj = {};
    // Сразу пропускаем открывающую фигурную скобку '{'.
    index++;
    skipWhitespace();
    // Проходимся по строке, пока не дойдем до закрывающей скобки
    while (jsonString[index] !== '}') {
      // Парсим ключ
      const key = parseString();
      // Пропускаем двоеточие ':'
      index++;
      skipWhitespace();
      // Парсим значение
      const value = parseValue();
      // Добавляем ключ и значение в объект
      obj[key] = value;
      skipWhitespace();
      // Пропускаем висящую запятую ','
      if (jsonString[index] === ',') {
        index++;
        skipWhitespace();
      }
    }
    // Пропускаем закрывающую фигурную скобку '}'.
    index++;
    return obj;
  }

  /**
   * Функция для парсинга массива JSON.
   *
   * @returns {array} - Массив, созданный из JSON-строки.
   */
  function parseArray() {
    // Инициализируем массив, в который будет помещать его элементы
    const arr = [];
    // Пропускаем открывающую скобку '['.
    index++;
    skipWhitespace();
    // Проходимся по строке, пока не дойдем до закрывающей скобки
    while (jsonString[index] !== ']') {
      // Парсим элемент массива
      const value = parseValue();
      // Добавляем элемент в массив
      arr.push(value);
      skipWhitespace();
      // Пропускаем висящую запятую ','
      if (jsonString[index] === ',') {
        index++;
        skipWhitespace();
      }
    }
    // Пропускаем закрывающую квадратную скобку ']'.
    index++;
    // Возвращаем результатирующий массив
    return arr;
  }

  /**
   * Функция для парсинга строки JSON.
   *
   * @returns {string} - Строка, созданная из JSON-строки.
   */
  function parseString() {
    // Инициализируем строку
    let str = '';
    // Пропускаем открывающую кавычку
    index++;
    // Проходимся по строке пока не дойдем до закрывающей кавычки.
    while (jsonString[index] !== '"') {
      // Добавляем символы к строке
      str += jsonString[index];
      index++;
    }
    // Пропускаем закрывающую кавычку
    index++;
    // Возвращаем готовую строку
    return str;
  }

  /**
   * Функция для парсинга числа JSON.
   *
   * @returns {number} - Число, созданное из JSON-строки.
   * @throws {SyntaxError} - В случае некорректного формата числа.
   */
  function parseNumber() {
    let numStr = '';
    // Пока текущий символ является допустимым символом для числа и пока не дойдем до конца строки
    // добавляем символ к резултатирующей строке
    while (/[0-9.eE+\-]/.test(jsonString[index]) && index < jsonString.length) {
      numStr += jsonString[index];
      index++;
    }
    // Преобразуем строку в число
    const num = parseFloat(numStr);
    // Если преобразование вернуло NaN, выкидываем синтаксическую ошибку.
    if (isNaN(num)) {
      throw new SyntaxError('Invalid number format');
    }
    // Возвращаем результат.
    return num;
  }

  // Основная функция

  /**
   * Функцию конвертации строки в JSON со всеми необходимыми проверками и валидациями.
   *
   * @returns {object|array|string|number|boolean|null} - Результат парсинга JSON.
   * @throws {SyntaxError} - В случае неожиданного символа или некорректного JSON.
   */
  function parseValue() {
    // Определяем тип текущего значения и вызываем соответствующую функцию для парсинга.
    const char = jsonString[index];
    if (char === '{') {
      return parseObject();
    } else if (char === '[') {
      return parseArray();
    } else if (char === '"') {
      return parseString();
    } else if (char === '-' || /[0-9]/.test(char)) {
      return parseNumber();
    } else if (jsonString.startsWith('true', index)) {
      // Пропускаем "true"
      index += 4;
      return true;
    } else if (jsonString.startsWith('false', index)) {
      // Пропускаем "false"
      index += 5;
      return false;
    } else if (jsonString.startsWith('null', index)) {
      // Пропускаем "null"
      index += 4;
      return null;
    } else {
      throw new SyntaxError('Unexpected character: ' + char);
    }
  }

  try {
    // Пробуем выполнить следующий код.

    // Пропускаем пробелы и символы-разделители.
    skipWhitespace();
    // Пытаемся разобрать JSON-строку.
    const result = parseValue();
    // Пропускаем пробелы и символы-разделители после разбора.
    skipWhitespace();
    if (index !== jsonString.length) {
      // Если после разбора остались непрочитанные символы, выбрасываем синтаксическую ошибку.
      throw new SyntaxError('Unexpected characters at the end of input');
    }
    // Возвращаем успешно разобранный JSON.
    return result;
  } catch (error) {
    // Если произошла ошибка (например, некорректный JSON), она будет перехвачена и обработана здесь.
    throw new SyntaxError('Invalid JSON: ' + error.message);
  }
}

// Пример использования
const jsonString = '[1,5,"false"]';
const jsonStringWithSpaces = '[1, 5, "false"]';

console.log(parseJson(jsonString));
// [ 1, 5, 'false' ]
console.log(parseJson(jsonStringWithSpaces));
// [ 1, 5, 'false' ]
