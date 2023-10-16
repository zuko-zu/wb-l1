// Экспортируем функцию getDayOfWeek по дефолту

/**
 * Функция для получения дня недели в виде строки для указанной даты.
 * @param {Date} date - Дата, для которой нужно получить день недели.
 * @returns {string} - День недели в виде строки.
 */

export default function getDayOfWeek(date) {
  return moment(date).format('dddd')
}
