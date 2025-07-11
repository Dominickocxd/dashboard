
document.getElementById('show-login').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('login-section').classList.remove('hidden');
    document.getElementById('register-section').classList.add('hidden');
    document.getElementById('forgot-section').classList.add('hidden');
});

document.getElementById('show-forgot').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('login-section').classList.add('hidden');
    document.getElementById('register-section').classList.add('hidden');
    document.getElementById('forgot-section').classList.remove('hidden');
});

document.getElementById('back-to-login').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('login-section').classList.remove('hidden');
    document.getElementById('register-section').classList.add('hidden');
    document.getElementById('forgot-section').classList.add('hidden');
});


