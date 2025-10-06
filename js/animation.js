(function() {
  const loadingScreen = document.getElementById('loading-screen');
  const pageContent = document.getElementById('page-content');

  if (sessionStorage.getItem('hasVisited')) {
    if (loadingScreen) {
      loadingScreen.style.display = 'none';
    }
  } else {
    // [順序1] 3秒後：パルスアニメーション終了 → アイコンをフェードアウト
    setTimeout(function() {
      loadingScreen.classList.add('fade-icon');
    }, 3000);

    // [順序2] 3.5秒後：アイコンが消えた頃 → カーテンが「閉じる」
    setTimeout(function() {
      loadingScreen.classList.add('curtain-close');
    }, 3500);

    // [順序3] 4.5秒後：カーテンが閉じた後 → カーテンが「開く」
    setTimeout(function() {
      loadingScreen.classList.add('curtain-open');
      sessionStorage.setItem('hasVisited', 'true');
    }, 4500);
  }
})();

//イラストスライド
document.addEventListener('DOMContentLoaded', (event) => {
    // スライダーの初期化
    const swiper = new Swiper('.mySwiper', {
        
        // --- 必須要件の設定 ---
        
        // 4枚目から1枚目へシームレスに戻る「無限ループ」を有効化
        loop: true, 

        // 4秒ごとの自動遷移を有効化
        autoplay: {
            delay: 6000,             // 4000ミリ秒 (4秒) の間隔で遷移
            disableOnInteraction: false, // ユーザーがスワイプした後も自動再生を継続
        },

        // 横スワイプ（マウスドラッグ/タッチ）での操作を有効化 (デフォルトで有効)
        grabCursor: true, 

        // --- オプション（ナビゲーション） ---
        speed: 800,

        // ページネーション（下部のドット）
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },

        // ナビゲーションボタン（左右の矢印）
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
});