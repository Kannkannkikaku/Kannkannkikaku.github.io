// ページ遷移用のシンプルなアニメーション
(function() {
  const pageContent = document.getElementById('page-content');
  if (pageContent) {
    // visibleクラスを追加して、CSSで設定したアニメーションを開始
    pageContent.classList.add('visible');
  }
})();