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

// ▼ ここからスライダーの処理を追加
let currentSlide = 0;
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slider img');
const totalSlides = slides.length;

// スライドを移動させる関数
function showSlide(index) {
  if (index < 0) {
    currentSlide = totalSlides - 1;
  } else if (index >= totalSlides) {
    currentSlide = 0;
  } else {
    currentSlide = index;
  }
  slider.style.transform = `translateX(-${currentSlide * 100}%)`;
}

// 次・前ボタンのイベント
document.getElementById('nextBtn').addEventListener('click', () => {
  showSlide(currentSlide + 1);
});
document.getElementById('prevBtn').addEventListener('click', () => {
  showSlide(currentSlide - 1);
});

// スワイプ操作の処理
let startX = 0;
let endX = 0;

slider.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
});
slider.addEventListener('touchend', (e) => {
  endX = e.changedTouches[0].clientX;
  if (startX - endX > 50) {
    showSlide(currentSlide + 1);
  } else if (endX - startX > 50) {
    showSlide(currentSlide - 1);
  }
});
