# HTTPS Security Configuration

## Проблема Mixed Content решена

Этот документ описывает решения для устранения предупреждений о "смешанном контенте" (mixed content).

## Что было сделано:

### 1. Content Security Policy (CSP)
Добавлена директива `upgrade-insecure-requests` которая автоматически обновляет HTTP запросы до HTTPS:

```html
<meta http-equiv="Content-Security-Policy" content="... upgrade-insecure-requests" />
```

### 2. HTTP Strict Transport Security (HSTS)
Добавлен заголовок HSTS для принуждения браузеров использовать только HTTPS:

```json
{
  "key": "Strict-Transport-Security",
  "value": "max-age=31536000; includeSubDomains; preload"
}
```

### 3. Проверенные ресурсы:
- ✅ Все изображения загружаются через HTTPS
- ✅ Все скрипты используют HTTPS
- ✅ Все внешние ресурсы (Telegram API, Yandex) используют HTTPS
- ✅ Все тестовые страницы не содержат HTTP ссылок

### 4. XML Namespaces
XML namespaces в sitemap.xml и SVG файлах используют HTTP URLs для идентификации схем - это нормально и не вызывает проблем безопасности.

## Результат:
После применения этих изменений браузер:
1. Автоматически обновит все HTTP запросы до HTTPS
2. Будет использовать только HTTPS для всех последующих запросов
3. Не будет показывать предупреждения о смешанном контенте

## Проверка:
Откройте Developer Tools (F12) → Console и убедитесь что нет предупреждений о mixed content.
