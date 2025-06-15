function toggleMenu() {
  const menu = document.getElementById('menu');
  const overlay = document.getElementById('overlay');
  menu.classList.toggle('open');
  overlay.classList.toggle('show');
}

function closeMenu() {
  const menu = document.getElementById('menu');
  const overlay = document.getElementById('overlay');
  menu.classList.remove('open');
  overlay.classList.remove('show');
}

window.addEventListener('DOMContentLoaded', function () {
  closeMenu(); // 初期化
});
