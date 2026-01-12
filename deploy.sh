#!/bin/bash
# Скрипт для автоматического деплоя на Timeweb через FTP
# Использование: ./deploy.sh

echo "🚀 Деплой сайта Accepted на Timeweb..."
echo ""

# ========================================
# НАСТРОЙКИ FTP (ЗАМЕНИТЕ НА ВАШИ!)
# ========================================
FTP_HOST="ftp.timeweb.ru"
FTP_USER="ваш_ftp_логин"
FTP_PASS="ваш_ftp_пароль"
FTP_DIR="public_html"

# ========================================
# Файлы для загрузки
# ========================================
FILES_TO_UPLOAD=(
    "index.html"
    "projects.html"
    "contacts.html"
    "style.css"
    "script.js"
    ".htaccess"
    "send.php"
    "assets"
)

# Проверка наличия lftp
if ! command -v lftp &> /dev/null; then
    echo "❌ lftp не установлен!"
    echo "Установите: brew install lftp (Mac) или apt-get install lftp (Linux)"
    exit 1
fi

# Проверка настроек
if [ "$FTP_USER" == "ваш_ftp_логин" ]; then
    echo "⚠️  ВНИМАНИЕ: Настройте FTP данные в файле deploy.sh!"
    echo "Откройте deploy.sh и замените FTP_HOST, FTP_USER, FTP_PASS"
    exit 1
fi

echo "📤 Загрузка файлов на сервер..."
echo ""

# Создаем временный файл с командами для lftp
TEMP_SCRIPT=$(mktemp)

cat > "$TEMP_SCRIPT" << EOF
set ftp:ssl-allow no
set ftp:passive-mode yes
open -u $FTP_USER,$FTP_PASS $FTP_HOST
cd $FTP_DIR
lcd $(pwd)

# Загрузка файлов
$(for file in "${FILES_TO_UPLOAD[@]}"; do
    if [ -d "$file" ]; then
        echo "mirror -R --delete --verbose $file"
    else
        echo "put $file"
    fi
done)

bye
EOF

# Выполняем загрузку
lftp -f "$TEMP_SCRIPT"

# Удаляем временный файл
rm "$TEMP_SCRIPT"

echo ""
echo "✅ Деплой завершен!"
echo ""
echo "Проверьте сайт: https://ваш-домен.ru"