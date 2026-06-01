document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Очищення попередніх помилок
    clearErrors();

    let isValid = true;

    // 1. Валідація імені користувача
    const username = document.getElementById('username');
    if (!username.value.trim()) {
        showError(username, 'usernameError', "Ім'я користувача є обов'язковим");
        isValid = false;
    }

    // 2. Валідація Email
    const email = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
        showError(email, 'emailError', "Email є обов'язковим");
        isValid = false;
    } else if (!emailRegex.test(email.value)) {
        showError(email, 'emailError', "Некоректний формат email");
        isValid = false;
    }

    // 3. Валідація Паролю (Мінімум 8 символів, цифра, велика літера)
    const password = document.getElementById('password');
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!password.value) {
        showError(password, 'passwordError', "Пароль є обов'язковим");
        isValid = false;
    } else if (!passwordRegex.test(password.value)) {
        showError(password, 'passwordError', "Пароль має містити мінімум 8 символів, цифру та велику літеру");
        isValid = false;
    }

    // 4. Співпадіння паролів
    const confirmPassword = document.getElementById('confirmPassword');
    if (!confirmPassword.value) {
        showError(confirmPassword, 'confirmPasswordError', "Підтвердіть пароль");
        isValid = false;
    } else if (password.value !== confirmPassword.value) {
        showError(confirmPassword, 'confirmPasswordError', "Паролі не співпадають");
        isValid = false;
    }

    // 5. Валідація телефону (Формат України: +380 і 9 цифр)
    const phone = document.getElementById('phone');
    const phoneRegex = /^\+380\d{9}$/;
    if (!phone.value.trim()) {
        showError(phone, 'phoneError', "Телефон є обов'язковим");
        isValid = false;
    } else if (!phoneRegex.test(phone.value.trim())) {
        showError(phone, 'phoneError', "Формат телефону повинен бути +380XXXXXXXXX");
        isValid = false;
    }

    // 6. Перевірка віку (18+)
    const birthdate = document.getElementById('birthdate');
    if (!birthdate.value) {
        showError(birthdate, 'birthdateError', "Дата народження є обов'язковою");
        isValid = false;
    } else {
        const today = new Date();
        const birthDateObj = new Date(birthdate.value);
        let age = today.getFullYear() - birthDateObj.getFullYear();
        const monthDiff = today.getMonth() - birthDateObj.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
            age--;
        }

        if (age < 18) {
            showError(birthdate, 'birthdateError', "Реєстрація дозволена тільки особам від 18 років");
            isValid = false;
        }
    }

    // 7. Згода з умовами
    const terms = document.getElementById('terms');
    if (!terms.checked) {
        document.getElementById('termsError').textContent = "Необхідно погодитися з умовами";
        isValid = false;
    }

    // Дія при успішній валідації
    if (isValid) {
        alert('Форму успішно відправлено!');
        // Тут можна викликати: this.submit();
    }
});

// Допоміжна функція для відображення помилки
function showError(inputElement, errorId, message) {
    inputElement.classList.add('invalid');
    document.getElementById(errorId).textContent = message;
}

// Допоміжна функція для очищення попередніх помилок
function clearErrors() {
    const errors = document.querySelectorAll('.error');
    errors.forEach(error => error.textContent = '');
    
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => input.classList.remove('invalid'));
}