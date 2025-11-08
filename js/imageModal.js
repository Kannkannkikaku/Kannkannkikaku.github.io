// 画像クリックで拡大表示（モーダル表示機能）
(function() {
    document.addEventListener('DOMContentLoaded', function () {
        // ★修正点 1: イベントリスナーの対象を親要素である .letterBook に設定★
        const letterBook = document.querySelector('.letterBook-viewport .letterBook');
        if (!letterBook) return;

        // --- タッチ位置と許容誤差の変数 ---
        let startX, startY;
        const THRESHOLD = 10; 

        // モーダル作成（変更なし）
        let modal = document.getElementById('imgModal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'imgModal';
            modal.className = 'modal';
            modal.innerHTML = '<img id="modalLetter" src="" alt="拡大画像">';
            document.body.appendChild(modal);
        }
        
        modal.style.display = 'none';

        const modalImg = modal.querySelector('#modalLetter');

        // --- モーダル表示を行う共通関数 ---
        const openModal = function(targetElement) {
            // 背景画像をCSSから取得
            let imageUrl = window.getComputedStyle(targetElement).getPropertyValue('background-image');
            
            imageUrl = imageUrl.replace(/^url\(['"]?/, '').replace(/['"]?\)$/, '');
            
            // ページがめくれ途中（シャドウ状態）でないことを確認し、画像が設定されているか確認
            if (targetElement.classList.contains('shadow') || imageUrl.trim() === 'none' || imageUrl.length < 5) {
                return;
            }

            modalImg.src = imageUrl;
            modal.style.display = 'flex'; 
            modal.classList.add('active');
            document.documentElement.style.overflow = 'hidden';
            document.body.style.overflow = 'hidden';
        };
        
        // --- モーダルを閉じる処理 (変更なし) ---
        function closeModal() {
            modal.classList.remove('active');
            modal.style.display = 'none'; 
            modalImg.src = '';
            document.documentElement.style.overflow = '';
            document.body.style.overflow = '';
        }

        // =======================================================
        // ★★★ 修正点 2: イベント委譲で動的な .page 要素に対応 ★★★
        // =======================================================
        
        // touchstartのリスナー（イベント委譲ではない）
        letterBook.addEventListener('touchstart', function(e) {
            // .page 要素でなければ処理しない
            if (!e.target.closest('.page')) return;
            
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        }, { passive: true });

        // touchendのリスナー（イベント委譲）
        letterBook.addEventListener('touchend', function(e) {
            const pageElement = e.target.closest('.page');
            if (!pageElement) return; // .page 要素でなければ処理しない

            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;

            const deltaX = Math.abs(startX - endX);
            const deltaY = Math.abs(startY - endY);

            // 許容誤差（THRESHOLD）を超えていたらスクロールとみなし、処理を終了
            if (deltaX > THRESHOLD || deltaY > THRESHOLD) {
                return; 
            }
            
            // タップとみなす場合
            e.preventDefault(); 
            openModal(pageElement); // タップされた要素を渡す
            
        }, { passive: false });
        
        // clickイベントのリスナー（イベント委譲: PC向け）
        letterBook.addEventListener('click', function(e) {
            const pageElement = e.target.closest('.page');
            if (!pageElement) return; // .page 要素でなければ処理しない

            // turn.js のページめくりと競合しないよう、処理を制御
            e.preventDefault();
            // ページがめくれていない（ターン操作中でない）ことを確認
            if (e.detail === 1) { 
                 openModal(pageElement); // クリックされた要素を渡す
            }
        });
        
        // --- モーダルを閉じる処理 (変更なし) ---
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
    });
})();