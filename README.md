# React CRUD App

Простое приложение на React для демонстрации CRUD-операций с пользователями.

## Функциональность

- Получение пользователя по ID
- Создание нового пользователя
- Редактирование данных пользователя
- Удаление пользователя
- Отображение списка всех пользователей

## Технологии

- React
- Axios
- Python 3.12.7
- Flask

## Структура запросов

- `src/querries/GET/getUsers.js` — запросы на получение пользователей
- `src/querries/POST/createUser.js` — запросы на создание пользователя
- `src/querries/PUT/editUser.js` — запросы на редактирование пользователя
- `src/querries/DELETE/deleteUser.js` — запросы на удаление пользователя

## Инструкция по запуску
### Предварительные требования
- Node.js (версия 16 или выше)
- Python (версия 3.8 или выше)
- pip (менеджер пакетов Python)

1. Клонирование репозитория

```bash
git clone <ваш-репозиторий>
cd <ваш-репозиторий>
```

2. Настройка бэкенда (Flask)
- Создайте и активируйте виртуальное окружение (рекомендуется):

```bash
python -m venv venv
source venv/bin/activate  # Linux/MacOS
venv\Scripts\activate     # Windows
```

- Установите зависимости:

```bash
pip install -r requirements.txt
```

3. Настройка фронтенда (Vite + React)
- Перейдите в папку фронтенда:

```bash
cd client
```

- Установите зависимости:

```bash
npm install
```

4. Запуск в режиме разработки

- Вариант 1: Запуск отдельно
Запустите бэкенд (из корневой папки):

```bash
python main.py
```
Запустите фронтенд (из папки client):

```bash
npm run dev
```

## Структура проекта
```structure
.
├── app/                  # Flask приложение
│   ├── main.py
│   ├── fake_data.py
│   └── ...
├── client/             # Vite + React приложение
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── ...
├── requirements.txt      # Python зависимости
└── README.md
```

## Файл конфигурации
В корневой директории необходимо создать конфигурационный файл такой структуры:

```env
DEV_PREFIX = "http://localhost:"
PROD_PREFIX = "/"
PORT = 3000
PRODUCTION = False
DEBUG = True
HOST = localhost
```