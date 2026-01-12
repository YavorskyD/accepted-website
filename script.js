/**
 * ACCEPTED - JavaScript функциональность
 * Плавная прокрутка, мобильное меню, анимации при скролле
 */

(function() {
    'use strict';

    // ========================================
    // Инициализация
    // ========================================
    document.addEventListener('DOMContentLoaded', function() {
        initMobileMenu();
        initSmoothScroll();
        initScrollAnimations();
        initFormHandling();
        initParallax();
        initLazyLoading();
        initCookieNotice();
    });

    // ========================================
    // Мобильное меню
    // ========================================
    function initMobileMenu() {
        const burger = document.getElementById('burgerMenu');
        const nav = document.getElementById('mainNav');
        
        if (!burger || !nav) return;

        burger.addEventListener('click', function() {
            burger.classList.toggle('active');
            nav.classList.toggle('active');
            document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
        });

        // Закрытие меню при клике на ссылку
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                burger.classList.remove('active');
                nav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Закрытие меню при клике вне его
        document.addEventListener('click', function(e) {
            if (!nav.contains(e.target) && !burger.contains(e.target)) {
                burger.classList.remove('active');
                nav.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // ========================================
    // Плавная прокрутка
    // ========================================
    function initSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Пропускаем якоря без ID
                if (href === '#' || !href.startsWith('#')) return;
                
                const target = document.querySelector(href);
                if (!target) return;

                e.preventDefault();

                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            });
        });
    }

    // ========================================
    // Анимации при скролле
    // ========================================
    function initScrollAnimations() {
        const elements = document.querySelectorAll('.fade-in');
        
        if (!elements.length) return;

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        elements.forEach(element => {
            observer.observe(element);
        });
    }

    // ========================================
    // Обработка форм
    // ========================================
    function initFormHandling() {
        const forms = document.querySelectorAll('form');
        
        // Проверка URL параметров для сообщений
        checkUrlParams();

        forms.forEach(form => {
            // Если форма отправляется на сервер (PHP), не предотвращаем отправку
            const formAction = form.getAttribute('action');
            const isServerForm = formAction && formAction.endsWith('.php');

            if (!isServerForm) {
                form.addEventListener('submit', function(e) {
                    e.preventDefault();
                    
                    // Простая валидация
                    const inputs = form.querySelectorAll('input[required], textarea[required]');
                    let isValid = true;

                    inputs.forEach(input => {
                        if (!input.value.trim()) {
                            isValid = false;
                            input.style.borderColor = '#ff4444';
                        } else {
                            input.style.borderColor = '';
                        }
                    });

                    if (!isValid) {
                        showFormMessage('Пожалуйста, заполните все обязательные поля', 'error');
                        return;
                    }

                    // Форматирование телефона
                    const phoneInput = form.querySelector('input[type="tel"]');
                    if (phoneInput && phoneInput.value) {
                        phoneInput.value = formatPhone(phoneInput.value);
                    }

                    // Здесь можно добавить отправку через AJAX
                    showFormMessage('Спасибо за обращение! Мы свяжемся с вами в ближайшее время.', 'success');
                    form.reset();
                });
            } else {
                // Для серверных форм - только валидация и форматирование перед отправкой
                form.addEventListener('submit', function(e) {
                    const inputs = form.querySelectorAll('input[required], textarea[required]');
                    let isValid = true;

                    inputs.forEach(input => {
                        if (!input.value.trim()) {
                            isValid = false;
                            input.style.borderColor = '#ff4444';
                            e.preventDefault();
                        } else {
                            input.style.borderColor = '';
                        }
                    });

                    if (!isValid) {
                        showFormMessage('Пожалуйста, заполните все обязательные поля', 'error');
                        return;
                    }

                    // Форматирование телефона перед отправкой
                    const phoneInput = form.querySelector('input[type="tel"]');
                    if (phoneInput && phoneInput.value) {
                        phoneInput.value = formatPhone(phoneInput.value);
                    }
                });
            }
        });
    }

    // Проверка URL параметров для сообщений после отправки формы
    function checkUrlParams() {
        const urlParams = new URLSearchParams(window.location.search);
        const messageDiv = document.getElementById('formMessage');
        
        if (messageDiv) {
            if (urlParams.get('success') === '1') {
                showFormMessage('Спасибо за обращение! Мы свяжемся с вами в ближайшее время.', 'success');
                // Очистить URL от параметров
                window.history.replaceState({}, document.title, window.location.pathname);
            } else if (urlParams.get('error')) {
                let errorMsg = 'Произошла ошибка при отправке формы. Попробуйте еще раз.';
                if (urlParams.get('error') === 'empty') {
                    errorMsg = 'Пожалуйста, заполните все обязательные поля.';
                } else if (urlParams.get('error') === 'email') {
                    errorMsg = 'Пожалуйста, введите корректный email адрес.';
                }
                showFormMessage(errorMsg, 'error');
                window.history.replaceState({}, document.title, window.location.pathname);
            }
        }
    }

    // Показать сообщение формы
    function showFormMessage(message, type) {
        const messageDiv = document.getElementById('formMessage');
        if (!messageDiv) return;

        messageDiv.textContent = message;
        messageDiv.style.display = 'block';
        
        if (type === 'success') {
            messageDiv.style.backgroundColor = 'rgba(0, 255, 0, 0.1)';
            messageDiv.style.border = '1px solid #00ff00';
            messageDiv.style.color = '#00ff00';
        } else {
            messageDiv.style.backgroundColor = 'rgba(255, 0, 0, 0.1)';
            messageDiv.style.border = '1px solid #ff4444';
            messageDiv.style.color = '#ff4444';
        }

        // Автоматически скрыть через 5 секунд
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 5000);
    }

        // Маска телефона
        const phoneInputs = document.querySelectorAll('input[type="tel"]');
        phoneInputs.forEach(input => {
            input.addEventListener('input', function() {
                this.value = formatPhone(this.value);
            });
        });
    }

    // Форматирование телефона
    function formatPhone(value) {
        const phone = value.replace(/\D/g, '');
        if (phone.length === 0) return '';
        if (phone.length <= 1) return '+' + phone;
        if (phone.length <= 4) return '+' + phone.slice(0, 1) + ' (' + phone.slice(1);
        if (phone.length <= 7) return '+' + phone.slice(0, 1) + ' (' + phone.slice(1, 4) + ') ' + phone.slice(4);
        if (phone.length <= 9) return '+' + phone.slice(0, 1) + ' (' + phone.slice(1, 4) + ') ' + phone.slice(4, 7) + '-' + phone.slice(7);
        return '+' + phone.slice(0, 1) + ' (' + phone.slice(1, 4) + ') ' + phone.slice(4, 7) + '-' + phone.slice(7, 9) + '-' + phone.slice(9, 11);
    }

    // ========================================
    // Параллакс эффект
    // ========================================
    function initParallax() {
        const parallaxElements = document.querySelectorAll('.parallax');
        
        if (!parallaxElements.length) return;

        let ticking = false;

        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                    
                    parallaxElements.forEach(element => {
                        const speed = 0.5;
                        const yPos = -(scrollTop * speed);
                        element.style.transform = 'translateY(' + yPos + 'px)';
                    });

                    ticking = false;
                });

                ticking = true;
            }
        });
    }

    // ========================================
    // Lazy loading изображений
    // ========================================
    function initLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver(function(entries, observer) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                            observer.unobserve(img);
                        }
                    }
                });
            });

            const images = document.querySelectorAll('img[data-src]');
            images.forEach(img => imageObserver.observe(img));
        }
    }

    // ========================================
    // Изменение стиля хедера при скролле
    // ========================================
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (!header) return;

        if (window.scrollY > 100) {
            header.style.backgroundColor = 'rgba(0, 0, 0, 0.98)';
            header.style.borderBottomColor = 'rgba(255, 255, 255, 0.1)';
        } else {
            header.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
            header.style.borderBottomColor = 'rgba(255, 255, 255, 0.05)';
        }
    });

    // ========================================
    // Добавление класса fade-in к элементам
    // ========================================
    function addFadeInClass() {
        const sections = document.querySelectorAll('section');
        const cards = document.querySelectorAll('.project-card, .service-card, .subsection');
        
        sections.forEach(section => {
            if (!section.classList.contains('hero')) {
                section.classList.add('fade-in');
            }
        });

        cards.forEach(card => {
            card.classList.add('fade-in');
        });
    }

    // Запуск после загрузки DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', addFadeInClass);
    } else {
        addFadeInClass();
    }

    // ========================================
    // Cookie уведомление
    // ========================================
    function initCookieNotice() {
        const cookieNotice = document.getElementById('cookieNotice');
        const acceptBtn = document.getElementById('acceptCookies');
        const declineBtn = document.getElementById('declineCookies');

        if (!cookieNotice || !acceptBtn || !declineBtn) return;

        // Проверяем, было ли уже принято решение
        const cookieConsent = localStorage.getItem('cookieConsent');
        
        if (!cookieConsent) {
            // Показываем уведомление через небольшую задержку
            setTimeout(() => {
                cookieNotice.classList.add('show');
            }, 1000);
        }

        // Обработка принятия cookies
        acceptBtn.addEventListener('click', function() {
            localStorage.setItem('cookieConsent', 'accepted');
            hideCookieNotice();
        });

        // Обработка отклонения cookies
        declineBtn.addEventListener('click', function() {
            localStorage.setItem('cookieConsent', 'declined');
            hideCookieNotice();
        });

        function hideCookieNotice() {
            cookieNotice.classList.remove('show');
            setTimeout(() => {
                cookieNotice.style.display = 'none';
            }, 300);
        }
    }

})();