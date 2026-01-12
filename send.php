<?php
/**
 * Обработка формы обратной связи для Timeweb
 * Замените email на ваш реальный email адрес
 */

// Настройки
$to_email = "info@accepted.ru"; // ЗАМЕНИТЕ НА ВАШ EMAIL
$subject_prefix = "Новое сообщение с сайта Accepted";

// Проверка метода запроса
if ($_SERVER["REQUEST_METHOD"] != "POST") {
    header("Location: /contacts.html");
    exit;
}

// Получение и очистка данных
$name = isset($_POST['name']) ? htmlspecialchars(trim($_POST['name'])) : '';
$phone = isset($_POST['phone']) ? htmlspecialchars(trim($_POST['phone'])) : '';
$email = isset($_POST['email']) ? htmlspecialchars(trim($_POST['email'])) : '';
$subject = isset($_POST['subject']) ? htmlspecialchars(trim($_POST['subject'])) : '';
$message = isset($_POST['message']) ? htmlspecialchars(trim($_POST['message'])) : '';

// Валидация обязательных полей
if (empty($name) || empty($phone) || empty($email) || empty($message)) {
    header("Location: /contacts.html?error=empty");
    exit;
}

// Валидация email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    header("Location: /contacts.html?error=email");
    exit;
}

// Формирование письма
$email_subject = $subject_prefix . ($subject ? " - " . $subject : "");
$email_body = "Новое сообщение с сайта Accepted\n\n";
$email_body .= "Имя: $name\n";
$email_body .= "Телефон: $phone\n";
$email_body .= "Email: $email\n";
if ($subject) {
    $email_body .= "Тема: $subject\n";
}
$email_body .= "\nСообщение:\n$message\n";
$email_body .= "\n---\n";
$email_body .= "Дата: " . date("Y-m-d H:i:s") . "\n";
$email_body .= "IP: " . $_SERVER['REMOTE_ADDR'] . "\n";

// Заголовки письма
$headers = "From: Accepted Website <noreply@" . $_SERVER['HTTP_HOST'] . ">\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Отправка письма
$mail_sent = mail($to_email, $email_subject, $email_body, $headers);

// Перенаправление после отправки
if ($mail_sent) {
    header("Location: /contacts.html?success=1");
} else {
    header("Location: /contacts.html?error=send");
}
exit;
?>