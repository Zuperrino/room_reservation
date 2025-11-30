# Быстрый старт

Инструкция по быстрому запуску приложения для разработки.

## Предварительные требования

- Python 3.10+
- Node.js 18+
- npm или yarn

## Шаг 1: Запуск Backend

```bash
# Создать и активировать виртуальное окружение
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows

# Установить зависимости
pip install -r requirements.txt

# Создать .env файл (опционально)
# Если не создавать, будут использованы значения по умолчанию
echo "first_superuser_email=admin@example.com" > .env
echo "first_superuser_password=admin" >> .env
echo "SECRET=your-secret-key-here" >> .env

# Применить миграции
alembic upgrade head

# Запустить сервер
uvicorn app.main:app --reload
```

Backend будет доступен на `http://localhost:8000`

## Шаг 2: Запуск Frontend

Откройте новый терминал:

```bash
# Перейти в директорию frontend
cd frontend

# Установить зависимости
npm install

# Создать .env.local файл
echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local

# Запустить dev сервер
npm run dev
```

Frontend будет доступен на `http://localhost:3000`

## Шаг 3: Использование

1. Откройте браузер и перейдите на `http://localhost:3000`
2. Зарегистрируйте нового пользователя или войдите с учетными данными суперпользователя (если настроили в .env)
3. Просмотрите доступные переговорки
4. Создайте бронирование

## Полезные ссылки

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Документация**: http://localhost:8000/docs
- **Админ-панель**: http://localhost:8000/admin

## Тестовые данные

Если вы настроили суперпользователя в `.env`:
- Email: `admin@example.com`
- Password: `admin`

## Troubleshooting

### Backend не запускается
- Проверьте, что виртуальное окружение активировано
- Убедитесь, что все зависимости установлены: `pip install -r requirements.txt`
- Проверьте, что порт 8000 свободен

### Frontend не запускается
- Убедитесь, что Node.js версии 18 или выше: `node --version`
- Удалите `node_modules` и переустановите: `rm -rf node_modules && npm install`
- Проверьте, что порт 3000 свободен

### Ошибки подключения
- Убедитесь, что backend запущен и доступен на `http://localhost:8000`
- Проверьте файл `.env.local` в директории `frontend/`
- Проверьте консоль браузера на наличие ошибок CORS

### База данных
- Если возникают проблемы с БД, удалите файл `fastapi.db` и выполните миграции заново:
  ```bash
  rm fastapi.db
  alembic upgrade head
  ```

