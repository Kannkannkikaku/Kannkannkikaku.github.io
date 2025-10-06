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

<script>
  const slider = document.getElementById("slider");
  const slides = slider.children;
  let currentIndex = 0;
  const totalSlides = slides.length;

  // スライド更新
  function updateSlide() {
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  // 次へ
  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlide();
  }

  // 前へ
  function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSlide();
  }

  // ===== スワイプ対応 =====
  let startX = 0;
  let endX = 0;

  slider.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  slider.addEventListener("touchend", (e) => {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
  });

  function handleSwipe() {
    if (startX - endX > 50) {
      nextSlide();
    } else if (endX - startX > 50) {
      prevSlide();
    }
  }
</script>
