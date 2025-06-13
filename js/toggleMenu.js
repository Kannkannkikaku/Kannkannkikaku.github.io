function toggleMenu() {
    document.getElementById('menu').classList.toggle('open');
}

window.addEventListener('DOMContentLoaded', function () {
    document.getElementById('menu').classList.remove('open');
});