const GROUP_ID = 32017543;
const POST_COUNT = 10;
const ACCESS_TOKEN = 'c58190fdc58190fdc58190fdcec6946871cc581c58190fda0adb4649d72d5ee2333409f';

let offset = 0;
let postsData = [];
const localStorageKey = 'cachedPostsData';

const wiget = document.querySelector('.vk-wiget');
const postList = document.querySelector('.vk-wiget__post-list');

// Функция для выполнения JSONP-запроса
function makeJSONPRequest(callback) {
  const script = document.createElement('SCRIPT');
  script.src = `https://api.vk.com/method/wall.get?owner_id=-${GROUP_ID}&count=${POST_COUNT}&offset=${offset}&access_token=${ACCESS_TOKEN}&v=5.131&callback=${callback.name}`;
  document.head.appendChild(script);
  offset += POST_COUNT;
}

// Функция для обработки JSONP-ответа
function handleJSONPResponse(response) {
  if (response && response.response) {
    const posts = response.response.items;
    postsData = postsData.concat(posts);
    saveDataToLocalStorage(localStorageKey, postsData);
    displayPosts(postsData);
  } else {
    console.error('Произошла ошибка при запросе VK API:', response);
  }
}

// Функция для отображения постов
function displayPosts(posts) {
  postList.innerHTML = '';
  posts.forEach((post) => {
    const postDate = new Date(post.date * 1000).toLocaleDateString();
    const postTime = new Date(post.date * 1000).toLocaleTimeString();
    const text = post.text;
    postList.innerHTML += `
      <li class="vk-wiget__post post">
        <h3 class="post__title">${text}</h3>
        <p class="post__date">Дата публикации: ${postDate}</p>
        <p class="post__time">Время публикации: ${postTime}</p>
      </li>
    `;
  });
}

function estimateLocalStorageSpace() {
  const storage = window.localStorage;
  const testKey = 'testKey';
  let testData = '0';
  const oneMegabyte = 1024 * 1024; // 1 мегабайт в байтах

  while (true) {
    storage.setItem(testKey, testData);

    // Попытка добавить 1 мегабайт данных
    try {
      const megabyteData = '0'.repeat(oneMegabyte);
      testData += megabyteData;
      storage.setItem(testKey, testData);
    } catch (e) {
      testData = storage.getItem(testKey);
      localStorage.removeItem(testKey);
      break; // Если вставка вызывает ошибку, перестаем увеличивать данные
    }
  }

  return testData.length; // Оценка размера данных в байтах
}

// Получаем размер занятой памяти в хранилище
function getLocalStorageSize() {
  let totalSize = 0;

  for (let key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      totalSize += localStorage[key].length + key.length;
    }
  }

  return totalSize;
}

const localStorageMaxSize = estimateLocalStorageSpace();

function showLocalStorageSizeInfo() {
  const localStorageSize = getLocalStorageSize();

  console.log(`Максимальный разер хранилища: ${localStorageMaxSize}`);
  console.log(`Объем занятой памяти: ${localStorageSize}`);
}

// Функция для сохранения данных в локальное хранилище с учетом переполнения
function saveDataToLocalStorage(key, data) {
  showLocalStorageSizeInfo();
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    // Обработка переполнения localStorage
    if (e.name === 'QuotaExceededError') {
      // Удаляем старые данные и повторно сохраняем новые
      postsData.shift(); // Удаляем старые данные
      saveDataToLocalStorage(key, data);
    } else {
      console.error('Ошибка локального хранилища:', e);
    }
  }
}

// Функция для загрузки данных из локального хранилища при перезагрузке
function loadDataFromLocalStorage(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}

// Загружаем ранее кэшированные данные
postsData = loadDataFromLocalStorage(localStorageKey);
if (!postsData.length) {
  makeJSONPRequest(handleJSONPResponse);
}

displayPosts(postsData);

wiget.addEventListener('scroll', function () {
  if (wiget.scrollTop + wiget.clientHeight + 1 >= wiget.scrollHeight) {
    makeJSONPRequest(handleJSONPResponse);
  }
});
