// Определение элементов таблицы
const tableContainer = document.getElementById('tableContainer');
const tableBody = document.getElementById('tableBody');
const pagination = document.getElementById('pagination');
const data = [];
let currentPage = 1;
const itemsPerPage = 50;
const columns = document.querySelectorAll('th[data-column]');

// Функция для сортировки данных
/**
 * Сортирует данные по указанной колонке и направлению.
 * @param {string} column - Название колонки для сортировки.
 * @param {boolean} descending - Направление сортировки (по убыванию).
 */
function sortTable(column, descending = false) {
  data.sort((a, b) => {
    const valueA = a[column];
    const valueB = b[column];
    if (typeof valueA === 'string' && typeof valueB === 'string') {
      return descending ? valueB.localeCompare(valueA) : valueA.localeCompare(valueB);
    }
    return descending ? valueB - valueA : valueA - valueB;
  });

  displayData(currentPage);
}

// Добавление обработчиков событий для сортировки
function addSortEventListeners() {
  columns.forEach((column) => {
    const sortButtons = column.querySelectorAll('.sort-button');

    sortButtons.forEach((button) => {
      button.addEventListener('click', () => {
        handleSortClick(button, column);
      });
    });
  });
}

// Обработка клика на кнопке сортировки
/**
 * Обрабатывает клик на кнопке сортировки, устанавливает класс активности и вызывает функцию сортировки.
 * @param {HTMLElement} button - Нажатая кнопка сортировки.
 * @param {HTMLElement} column - Колонка, к которой относится кнопка сортировки.
 */
function handleSortClick(button, column) {
  // Проверяем, есть ли уже класс активности
  const isActive = button.classList.contains('active');

  // Удаляем класс активности у всех кнопок сортировки
  columns.forEach((col) => {
    col.querySelectorAll('.sort-button').forEach((btn) => btn.classList.remove('active'));
  });

  if (!isActive) {
    // Если на кнопке нет класса активности, устанавливаем его
    button.classList.add('active');
  }

  const columnId = column.dataset.column;
  const isDescending = button.classList.contains('sort-button--desc');

  sortTable(columnId, isDescending);
}

// Загрузка данных и отображение при загрузке страницы
async function loadDataAndDisplay() {
  await loadData();
  addSortEventListeners();
}

// Загрузка данных с удаленного сервера
/**
 * Загружает данные с удаленного сервера и сохраняет их в массив данных.
 */
async function loadData() {
  try {
    const response = await fetch(
      'http://www.filltext.com/?rows=1000&fname=%7BfirstName%7D&lname=%7BlastName%7D&tel=%7Bphone%7Cformat%7D&address=%7BstreetAddress%7D&city=%7Bcity%7D&state=%7BusState%7Cabbr%7D&zip=%7Bzip%7D&pretty=true',
    );
    data.push(...(await response.json()));
    displayData(currentPage);
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error);
  }
}

// Отображение данных на текущей странице
/**
 * Отображает данные на текущей странице с учетом пагинации.
 * @param {number} page - Номер текущей страницы.
 */
function displayData(page) {
  const start = (page - 1) * itemsPerPage;
  const end = Math.min(start + itemsPerPage, data.length);
  const paginatedData = data.slice(start, end);

  tableBody.innerHTML = '';

  for (const item of paginatedData) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.fname}</td>
      <td>${item.lname}</td>
      <td>${item.tel}</td>
      <td>${item.address}</td>
      <td>${item.city}</td>
      <td>${item.state}</td>
      <td>${item.zip}</td>
    `;
    tableBody.appendChild(row);
  }

  updatePagination();
}

// Обновление пагинации
function updatePagination() {
  const totalPages = Math.ceil(data.length / itemsPerPage);
  let pageButtons = '';
  for (let i = 1; i <= totalPages; i++) {
    pageButtons += `<button
        class="page-button"
        data-page="${i}">
        ${i}
      </button>`;
  }
  pagination.innerHTML = pageButtons;

  // Добавим обработчик события для кнопок пагинации
  const pageButtonsList = document.querySelectorAll('.page-button');
  pageButtonsList.forEach((button) => {
    button.addEventListener('click', () => {
      const page = button.dataset.page;
      displayData(parseInt(page));
    });
  });
}

// Инициализация при загрузке страницы
loadDataAndDisplay();
