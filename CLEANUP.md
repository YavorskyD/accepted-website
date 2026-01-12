# 🧹 Очистка проекта: оставить только важные файлы

## ✅ ВАЖНЫЕ ФАЙЛЫ (оставить):

### Основные файлы сайта:
- ✅ `index.html` - главная страница
- ✅ `projects.html` - страница проектов
- ✅ `contacts.html` - страница контактов
- ✅ `style.css` - стили
- ✅ `script.js` - JavaScript
- ✅ `send.php` - обработчик формы
- ✅ `.htaccess` - настройки Apache

### Ресурсы:
- ✅ `assets/` - папка с логотипами и изображениями

### Git файлы:
- ✅ `.gitignore` - исключения для Git
- ✅ `.gitattributes` - настройки Git

### Опционально (можно оставить):
- ✅ `README.md` - основная документация проекта
- ✅ `deploy.sh` - скрипт для деплоя (если используете)

---

## ❌ ФАЙЛЫ ДЛЯ УДАЛЕНИЯ (документация):

### Инструкции по деплою:
- ❌ `DEPLOY.md`
- ❌ `TIMEWEB-DEPLOY.md`
- ❌ `TIMEWEB-QUICKSTART.md`
- ❌ `DOMAIN-SETUP.md`
- ❌ `DOMAIN-QUICK-START.md`
- ❌ `SSL-TIMEWEB.md`
- ❌ `NEXT-STEPS.md`
- ❌ `FILES-TO-UPLOAD.txt`

### Инструкции по Git:
- ❌ `GIT-WORKFLOW.md`
- ❌ `GITHUB-UPLOAD.md`
- ❌ `QUICK-START-GIT.md`

### Другие:
- ❌ `LOGO-UPDATE-INSTRUCTIONS.md`
- ❌ `CLEANUP.md` (этот файл)
- ❌ `prepare-for-hosting.sh` - временный скрипт

### Временные файлы:
- ❌ `acceptedgroup-upload/` - временная папка
- ❌ `acceptedgroup-upload.zip` - временный архив

### Опционально (можно удалить, если не используете):
- ❌ `netlify.toml` - только если не деплоите на Netlify
- ❌ `vercel.json` - только если не деплоите на Vercel

---

## 📁 Итоговая структура проекта:

```
acceptedgroup/
├── index.html              ✅
├── projects.html           ✅
├── contacts.html           ✅
├── style.css               ✅
├── script.js               ✅
├── send.php                ✅
├── .htaccess               ✅
├── .gitignore              ✅
├── .gitattributes          ✅
├── README.md               ✅ (опционально)
├── deploy.sh               ✅ (опционально)
└── assets/                 ✅
    └── images/
        ├── logo-black.svg
        ├── logo-white.svg
        └── logo-accepted.png (если добавили)
```

---

## 🗑️ Команды для очистки:

```bash
# Удалить документацию
rm DEPLOY.md TIMEWEB-DEPLOY.md TIMEWEB-QUICKSTART.md
rm DOMAIN-SETUP.md DOMAIN-QUICK-START.md SSL-TIMEWEB.md
rm NEXT-STEPS.md FILES-TO-UPLOAD.txt
rm GIT-WORKFLOW.md GITHUB-UPLOAD.md QUICK-START-GIT.md
rm LOGO-UPDATE-INSTRUCTIONS.md CLEANUP.md

# Удалить временные файлы
rm -rf acceptedgroup-upload/
rm acceptedgroup-upload.zip

# Удалить временный скрипт
rm prepare-for-hosting.sh

# Опционально (если не используете):
# rm netlify.toml vercel.json
```