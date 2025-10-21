// 画像クリックで拡大表示（モーダル表示機能）
(function() {
    document.addEventListener('DOMContentLoaded', function () {
        const imgs = document.querySelectorAll('.letter-img');
        if (!imgs.length) return;

        // モーダル作成（ここは変更なし）
        let modal = document.getElementById('imgModal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'imgModal';
            modal.className = 'modal';
            modal.innerHTML = '<img id="modalLetter" src="" alt="拡大画像">';
            document.body.appendChild(modal);
        }
        
        // 初期表示のチラつき防止
        modal.style.display = 'none';

        const modalImg = modal.querySelector('#modalLetter');

        // ------------------------------------------------------------------
        // ★★★ 修正箇所: clickイベントを削除し、タッチイベントに置き換える ★★★
        // ------------------------------------------------------------------
        imgs.forEach(img => {
            // モバイル環境での意図しないズームを防ぐため、touchstartを使用
            img.addEventListener('touchstart', function(e) {
                // 1. デフォルトのイベント処理（ズームなど）を即座に停止
                e.preventDefault(); 
                
                // 2. タッチ終了後（タップ完了）の処理として、モーダルを開く関数を呼び出す
                //    => ここでモーダルを開くのではなく、e.preventDefault()が確実に機能した上で、
                //       clickイベントと同じように動作させるために以下の処理を追加します。
                
                // 3. 拡大処理
                modalImg.src = this.src;
                modal.style.display = 'flex';
                modal.classList.add('active');
                document.documentElement.style.overflow = 'hidden';
                document.body.style.overflow = 'hidden';
            
            // NOTE: touchstartで処理を終えると、長押し判定ができないなどの問題が起こる可能性もありますが、
            //       今回は「拡大防止」を最優先とします。
            });
            
            // PCでのクリック操作はclickイベントで処理を残します (念のため)
            img.addEventListener('click', function(e) {
                e.preventDefault();
                modalImg.src = this.src;
                modal.style.display = 'flex'; 
                modal.classList.add('active');
                document.documentElement.style.overflow = 'hidden';
                document.body.style.overflow = 'hidden';
            });
        });

        // ------------------------------------------------------------------
        // ... (モーダルを閉じる処理は変更なし) ...
        
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
            modal.style.display = 'none'; 
            modalImg.src = '';
            document.documentElement.style.overflow = '';
            document.body.style.overflow = '';
        }
    });
})();