// login.js
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission

        // Display error message
        errorMessage.textContent = 'Incorrect email or password.';

        // Optionally, you can add a class to style the error message
        // errorMessage.classList.add('show');
    });
});
