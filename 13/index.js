// Создаем абстрактный базовый класс Shape, от которого будем наследоваться
class Shape {
  constructor() {
    // Тип фигуры по умолчанию "Shape".
    this.type = 'Shape';
  }

  // Методы в базовом классе Shape не возвращают числовые значения, потому что они ожидают,
  // что подклассы предоставят конкретную реализацию для каждой фигуры.
  // Пока мы просто указываем на необходимость переопределения этих методов в подклассах.

  // абстрактный метод расчета площади.
  calculateArea() {
    return 'Площадь должна быть переопределена';
  }

  // абстрактный метод для расчета периметра фигуры.
  calculatePerimeter() {
    return 'Периметр должен быть переопределен';
  }
}

// Создаем подкласс Rectangle
class Rectangle extends Shape {
  constructor(width, height) {
    // Вызываем конструктор базового класса.
    super();
    // Устанавливаем необходимые свойства.
    this.type = 'Rectangle';
    this.width = width;
    this.height = height;
  }

  // Метод расчета площади.
  calculateArea() {
    return this.width * this.height;
  }

  // Метод расчета периметра.
  calculatePerimeter() {
    return 2 * (this.width + this.height);
  }
}

// Создаем подкласс Circle
class Circle extends Shape {
  constructor(radius) {
    // Вызываем конструктор базового класса.
    super();
    // Устанавливаем необходимые свойства.
    this.type = 'Circle';
    this.radius = radius;
  }

  // Метод расчета площади.
  calculateArea() {
    return Math.PI * this.radius * this.radius;
  }

  // Метод расчета периметра.
  calculatePerimeter() {
    return 2 * Math.PI * this.radius;
  }
}

// Создаем подкласс Triangle.
class Triangle extends Shape {
  constructor(a, b, c) {
    // Вызываем конструктор базового класса.
    super();
    this.type = 'Triangle';
    this.sideA = a;
    this.sideB = b;
    this.sideC = c;
  }

  // Метод расчета площади.
  calculateArea() {
    const s = (this.sideA + this.sideB + this.sideC) / 2;
    return Math.sqrt(s * (s - this.sideA) * (s - this.sideB) * (s - this.sideC));
  }

  // Метод расчета периметра.
  calculatePerimeter() {
    return this.sideA + this.sideB + this.sideC;
  }
}

// Пример использования:
const rectangle = new Rectangle(10, 4);
console.log(rectangle.calculateArea());
console.log(rectangle.calculatePerimeter());
// 40
// 28

const circle = new Circle(5);
console.log(circle.calculateArea());
console.log(circle.calculatePerimeter());
// 78.53981633974483
// 31.41592653589793

const triangle = new Triangle(3, 4, 5);
console.log(triangle.calculateArea());
console.log(triangle.calculatePerimeter());
// 6
// 12
