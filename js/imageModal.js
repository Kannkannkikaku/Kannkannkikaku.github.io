// クリックした画像をそのまま前面に表示するモーダル
(function() {
  document.addEventListener('DOMContentLoaded', function () {
    const imgs = document.querySelectorAll('.letter-img');
    if (!imgs.length) return;

    // モーダルを作成
    let modal = document.getElementById('imgModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'imgModal';
      modal.className = 'modal';
      modal.innerHTML = '<img id="modalLetter" src="" alt="">';
      document.body.appendChild(modal);
    }

    const modalImg = modal.querySelector('#modalLetter');

    imgs.forEach(img => {
      img.addEventListener('click', function() {
        // クリックした画像のsrcをそのまま表示
        modalImg.src = this.src;
        modalImg.alt = this.alt; // altも元画像と同じに
        modal.classList.add('active');

        // 背景スクロールを防ぐ
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

    // Escキーでも閉じる
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });

    function closeModal() {
      modal.classList.remove('active');
      modalImg.src = '';
      modalImg.alt = '';
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }
  });
})();
