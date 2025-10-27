// 画像クリックで拡大表示（モーダル表示機能）
(function() {
    document.addEventListener('DOMContentLoaded', function () {
        const imgs = document.querySelectorAll('.letter-img');
        if (!imgs.length) return;

        // --- 新規追加: タッチ位置と許容誤差の変数 ---
        let startX, startY;
        // 許容する移動距離（これ以上動いたらスクロールとみなす）
        const THRESHOLD = 10; // 例: 10ピクセル

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
            
            // ------------------------------------------------------------------
            // ★★★ 変更箇所 1: touchstartからe.preventDefault()を削除 ★★★
            // ページスクロールを許可するために、ここでは何もしません。
            // ------------------------------------------------------------------
            img.addEventListener('touchstart', function(e) {
                // 指の初期位置を記録
                startX = e.touches[0].clientX;
                startY = e.touches[0].clientY;
                // e.preventDefault() は削除（スクロールを許可するため）
            });
            
            // ------------------------------------------------------------------
            // ★★★ 変更箇所 2: touchendでタップと判定されたらズームを防止し、モーダルを開く ★★★
            // ------------------------------------------------------------------
            img.addEventListener('touchend', function(e) {
                const endX = e.changedTouches[0].clientX;
                const endY = e.changedTouches[0].clientY;

                const deltaX = Math.abs(startX - endX);
                const deltaY = Math.abs(startY - endY);

                // 許容誤差（THRESHOLD）を超えていたらスクロールとみなし、処理を終了
                if (deltaX > THRESHOLD || deltaY > THRESHOLD) {
                    return; 
                }
                
                // 許容誤差内（タップとみなす）の場合のみモーダル表示処理へ
                
                // ★★★ ここで e.preventDefault() を呼ぶことで、タップ時のズームを防止 ★★★
                e.preventDefault(); 
                
                modalImg.src = this.src;
                modal.style.display = 'flex'; 
                modal.classList.add('active');
                document.documentElement.style.overflow = 'hidden';
                document.body.style.overflow = 'hidden';
            });
            
            // ------------------------------------------------------------------
            // ★★★ 変更箇所 3: clickイベントは残す（PC向け） ★★★
            // ------------------------------------------------------------------
            img.addEventListener('click', function(e) {
                // touchstart/touchend が発火しないPC環境でのみ実行
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