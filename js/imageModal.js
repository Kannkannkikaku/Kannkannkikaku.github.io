// 画像クリックで拡大表示（モーダル表示機能）
(function() {
  document.addEventListener('DOMContentLoaded', function () {
    const imgs = document.querySelectorAll('.letter-img');
    if (!imgs.length) return;

    // モーダル作成
    let modal = document.getElementById('imgModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'imgModal';
      modal.className = 'modal'; // CSSと統一
      modal.innerHTML = '<img id="modalLetter" src="" alt="拡大画像">';
      document.body.appendChild(modal);
    }

    const modalImg = modal.querySelector('#modalLetter');

    // 画像クリックでモーダル表示
    imgs.forEach(img => {
      img.addEventListener('click', function() {
        modalImg.src = this.src;
        modal.classList.add('active');
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
      });
    });

    // 背景クリックで閉じる
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        closeModal();
      }
    });

    // Escキーで閉じる
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });

    function closeModal() {
      modal.classList.remove('active');
      modalImg.src = '';
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }
  });
})();
