# Настройка переменных окружения

## Создание файла .env.local

Создайте файл `.env.local` в корне директории `frontend/` со следующим содержимым:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Описание переменных

- **NEXT_PUBLIC_API_URL** - URL адрес бэкенд API. По умолчанию `http://localhost:8000`

## Важно

- Файл `.env.local` не должен коммититься в git (он уже добавлен в `.gitignore`)
- Для продакшена используйте соответствующий URL вашего API сервера
- Все переменные с префиксом `NEXT_PUBLIC_` доступны в браузере

## Пример для продакшена

```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

