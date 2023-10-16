/**
 * Функция проверяет, является ли число странным.
 *
 * Странным числом считается число, которое равно сумме всех своих делителей, кроме самого себя.
 *
 * @param {number} num - Число для проверки, которое больше 0
 * @returns {boolean} - Возвращает true, если число странное, и false в противном случае.
 */

// 1. Использование цикла for

function isStrangeNumber(number) {
  // Не обрабатываем значения равные 0 и отрицательные значения
  if (number <= 0) {
    return false;
  }

  // Создаем переменную для хранения суммы всех делителей
  let divisorsSum = 0;

  // Используем цикл for для перебора чисел от 1 до num чтобы найти делители. num не включаем по условию задачи.
  for (let i = 1; i < number; i++) {
    // Проверяем, делится ли num на i без остатка
    if (number % i === 0) {
      // Если условие сработало, значит i является делителем num.
      // Прибавляем делитель к сумме всех делителей
      divisorsSum += i;
    }
  }

  // Проверяем, равны ли сумма делителей и num, возвращаем результат операции
  return divisorsSum === number;
}

// 2. Использование методов встроенных объектов JS

function isStrangeNumber2(number) {
  // Не обрабатываем значения равные 0 и отрицательные значения
  if (number == 0) {
    return false;
  }

  // Создаем массив, заполняем его числами от 1 до n - 1 (по условию не включаем само число)
  const nums = Array.from({ length: number - 1 }, (_, i) => i + 1);

  // Фильтруем массив, оставляю только делители
  const divisors = nums.filter((divisor) => number % divisor === 0);

  // Сравниваем число с суммой всех делителей
  return number === divisors.reduce((sum, divisor) => sum + divisor, 0);
}

// Примеры использования
console.log(isStrangeNumber(6)); // true
// 6 === 1 + 2 + 3
console.log(isStrangeNumber(2)); // false
// 24 !== 1 + 2 + 3 + 4 + 6 + 8 + 12
console.log(isStrangeNumber(1)); // false
// 1 не является ни простым, ни составным числом
console.log(isStrangeNumber(0)); // false
// у 0 нет делителей
console.log(isStrangeNumber(-6)); // false
// Не обрабатываем отрицательные числа

console.log(isStrangeNumber2(6)); // true
// 6 === 1 + 2 + 3
console.log(isStrangeNumber2(2)); // false
// 24 !== 1 + 2 + 3 + 4 + 6 + 8 + 12
console.log(isStrangeNumber2(1)); // false
// 1 не является ни простым, ни составным числом
console.log(isStrangeNumber2(0)); // false
// у 0 нет делителей
console.log(isStrangeNumber2(-6)); // false
// Не обрабатываем отрицательные числа
