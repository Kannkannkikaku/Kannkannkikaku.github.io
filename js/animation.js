//ローディングアニメーション

setTimeout(function() {
  // 要素を取得
  const loadingScreen = document.getElementById('loading-screen');
  const pageContent = document.getElementById('page-content');

  // ロード画面を非表示にするクラスを追加
  loadingScreen.classList.add('hidden');

  // コンテンツを表示するクラスを追加
  pageContent.classList.add('visible');
}, 3000); // 3000ミリ秒 = 3秒