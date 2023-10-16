// 1. Создаем объект book c помощью литерала объекта

const book = {
  title: 'Название книги',
  author: 'Имя автора',
  year: 2000,

  // Метод для получения названия книги
  getTitle: function () {
    return this.title;
  },

  // Метод для изменения названия книги
  setTitle: function (newTitle) {
    this.title = newTitle;
  },

  // Метод для получения имени автора
  getAuthor: function () {
    return this.author;
  },

  // Метод для изменения имени автора
  setAuthor: function (newAuthor) {
    this.author = newAuthor;
  },

  // Метод для получения года выпуска книги
  getYear: function () {
    return this.year;
  },

  // Метод для изменения года выпуска книги
  setYear: function (newYear) {
    this.year = newYear;
  },
};

// Пример использования методов
// Получаем свойства объектов
console.log(book.getTitle());
console.log(book.getAuthor());
console.log(book.getYear());
// Название книги
// Имя автора
// 2000

// Меняем свойства объектов
book.setTitle('Новое название книги');
book.setAuthor('Новый автор');
book.setYear(2023);

// Проверяем новые значения
console.log(book.getTitle());
console.log(book.getAuthor());
console.log(book.getYear());
// Новое название книги
// Новый автор
// 2023

// 2. Используем геттеры, сеттеры и синтаксис классов

// Создаем класс книги
class Book {
  // Конструктор кдасса, который выполняется при создании нового объекта
  constructor(title, author, year) {
    // Тут инициализируем приватные свойства объекта
    this._title = title;
    this._author = author;
    this._year = year;
  }

  // Далее геттеры и сеттеры для объекта
  get title() {
    return this._title;
  }

  set title(newTitle) {
    this._title = newTitle;
  }

  get author() {
    return this._author;
  }

  set author(newAuthor) {
    this._author = newAuthor;
  }

  get year() {
    return this._year;
  }

  set year(newYear) {
    this._year = newYear;
  }
}

// Пояснение:

// В этом коде свойства объекта скрыты как приватные (`_title`, _author, _yearPublished`).
// Нам не разрешено изменять их напрямую извне класса (`book._title = "Новое название книги" вызовет ошибку).
// Это пример инкапсуляции, где данные объекта защищены и могут быть изменены только через геттеры и сеттеры,
// что предотвращает неожиданные изменения.

// Создаем объект книги
const book2 = new Book('Название книги2', 'Имя автора2', 2020);

// Пример использования геттеров и сеттеров

// Выводим свойства с использованием геттеров
console.log(book2.title);
console.log(book2.author);
console.log(book2.year);

// Меняем свойства с использованием сеттеров
book2.title = 'Новое название книги2';
book2.author = 'Новый автор2';
book2.year = 2022;

// Выводим новые значеня с использованием геттеров
console.log(book2.title);
console.log(book2.author);
console.log(book2.year);

// 3. Используем синтаксис ES6

const book3 = {
  title: 'Название книги3',
  author: 'Имя автора3',
  year: 1999,

  // Метод для получения названия книги
  getTitle() {
    return this.title;
  },

  // Метод для изменения названия книги
  setTitle(newTitle) {
    this.title = newTitle;
  },

  // Метод для получения имени автора
  getAuthor() {
    return this.author;
  },

  // Метод для изменения имени автора
  setAuthor(newAuthor) {
    this.author = newAuthor;
  },

  // Метод для получения года выпуска книги
  getYear() {
    return this.year;
  },

  // Метод для изменения года выпуска книги
  setYear(newYear) {
    this.year = newYear;
  },
};

// Пример использования
// Получаем свойства объекта
console.log(book3.getTitle());
console.log(book3.getAuthor());
console.log(book3.getYear());

// Меняем свойства объекта
book3.setTitle('Новое название книги3');
book3.setAuthor('Новый автор3');
book3.setYear(2007);

// Проверяем новые значения
console.log(book3.getTitle());
console.log(book3.getAuthor());
console.log(book3.getYear());
