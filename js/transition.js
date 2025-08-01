// ページが読み込まれたら、すぐにアニメーションを開始する
document.addEventListener('DOMContentLoaded', function() {
  const pageContent = document.getElementById('page-content');
  if (pageContent) {
    pageContent.classList.add('visible');
  }
});