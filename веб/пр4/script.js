document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Випадаюче меню ---
    const dropdownBtn = document.getElementById('dropdownBtn');
    const dropdownMenu = document.getElementById('dropdownMenu');

    dropdownBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdownMenu.classList.toggle('show');
    });

    // Закриття меню при кліку поза ним
    document.addEventListener('click', () => {
        dropdownMenu.classList.remove('show');
    });


    // --- 2. Модальне вікно ---
    const openModalBtn = document.getElementById('openModal');
    const closeModalBtn = document.getElementById('closeModal');
    const modalOverlay = document.getElementById('modalOverlay');

    const openModal = () => modalOverlay.classList.add('active');
    const closeModal = () => modalOverlay.classList.remove('active');

    openModalBtn.addEventListener('click', openModal);
    closeModalBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });


    // --- 3. Галерея зображень ---
    const mainImage = document.getElementById('mainImage');
    const thumbs = document.querySelectorAll('.thumb');

    thumbs.forEach(thumb => {
        thumb.addEventListener('click', function() {
            thumbs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Плавна зміна зображення через анімацію opacity
            mainImage.style.opacity = 0;
            setTimeout(() => {
                mainImage.src = this.getAttribute('data-src');
                mainImage.style.opacity = 1;
            }, 200);
        });
    });


    // --- 4. Валідація форми ---
    const form = document.getElementById('feedbackForm');
    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    const formSuccess = document.getElementById('formSuccess');

    const setError = (element, isError) => {
        const group = element.parentElement;
        if (isError) {
            group.classList.add('error');
        } else {
            group.classList.remove('error');
        }
    };

    const validateEmail = (emailVal) => {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return re.test(String(emailVal).toLowerCase());
    };

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let isFormValid = true;

        // Валідація імені
        if (username.value.trim().length < 3) {
            setError(username, true);
            isFormValid = false;
        } else {
            setError(username, false);
        }

        // Валідація Email
        if (!validateEmail(email.value.trim())) {
            setError(email, true);
            isFormValid = false;
        } else {
            setError(email, false);
        }

        // Валідація повідомлення
        if (message.value.trim() === '') {
            setError(message, true);
            isFormValid = false;
        } else {
            setError(message, false);
        }

        // Виведення результату (Зворотній зв'язок)
        if (isFormValid) {
            formSuccess.style.display = 'block';
            form.reset();
            setTimeout(() => {
                formSuccess.style.display = 'none';
            }, 5000);
        }
    });

    // Динамічне очищення помилок при введенні (input подія)
    [username, email, message].forEach(input => {
        input.addEventListener('input', () => {
            setError(input, false);
        });
    });


    // --- 5. Кнопка "Вгору" (Scroll-to-top) ---
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});