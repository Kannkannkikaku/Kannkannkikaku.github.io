// js/main.js (最終版)

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