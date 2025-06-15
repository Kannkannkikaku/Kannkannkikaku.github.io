function toggleMenu() {
  document.getElementById('menu').classList.toggle('open');
}

function closeMenu() {
  document.getElementById('menu').classList.remove('open');
}

window.addEventListener('DOMContentLoaded', function () {
  const menu = document.getElementById('menu');
  menu.classList.remove('open');

  // サイドメニュー自体をクリックで閉じる
  menu.addEventListener('click', function () {
    closeMenu();
  });

  // メニュー内のリンクをクリックしたときに閉じないようにする
  const links = menu.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('click', function (event) {
      event.stopPropagation(); // 閉じるイベントが発動しないようにする
    });
  });
});
