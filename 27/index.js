/**
 * Функция для создания анимации движения элемента внутри контейнера.
 *
 * @param {HTMLElement} element - Элемент, который нужно анимировать.
 * @param {HTMLElement} container - Контейнер, в котором должна происходить анимация.
 */
function animateDVDLogo(element, container) {
  // Получаем начальные размеры элемента и контейнера.
  const elementWidth = element.offsetWidth;
  const elementHeight = element.offsetHeight;
  const containerWidth = container.offsetWidth;
  const containerHeight = container.offsetHeight;

  // Начальное положение элемента (в левом верхнем углу контейнера).
  let x = 0;
  let y = 0;

  // Начальное направление движения по горизонтали и вертикали.

  // 1 для движения вправо, -1 для движения влево
  let xDirection = 1;
  // 1 для движения вниз, -1 для движения вверх
  let yDirection = 1;

  // Функция для обновления положения элемента.
  function updatePosition() {
    // Изменяем положение элемента на заданные величины направления.
    x += xDirection;
    y += yDirection;

    // Проверка на столкновение с границами контейнера.
    if (x + elementWidth > containerWidth || x < 0) {
      // Если элемент выходит за границы по горизонтали, меняем направление.
      xDirection *= -1;
    }
    if (y + elementHeight > containerHeight || y < 0) {
      // Если элемент выходит за границы по вертикали, меняем направление.
      yDirection *= -1;
    }

    // Установка нового положения элемента с помощью CSS-свойства 'transform'.
    element.style.transform = `translate(${x}px, ${y}px)`;
  }

  // Запуск анимации: функция updatePosition будет вызываться каждые 10 миллисекунд.
  setInterval(updatePosition, 10);
}

// Пример использования:
const dvdLogo = document.querySelector('#dvdLogo');
const animationContainer = document.querySelector('#animationContainer');

animateDVDLogo(dvdLogo, animationContainer);
