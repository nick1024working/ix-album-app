export class TermsModal {
    constructor() {
        this.modalId = 'dynamic-terms-modal';
        this.init();
    }

    init() {
        document.getElementById(this.modalId)?.remove();

        const modalHtml = `
        <div class="modal fade" tabindex="-1" id="${this.modalId}">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">使用條款</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-4">
                            <p class="mb-2">進入本網頁即表示閣下同意接受下列使用/免責條款。</p>
                            <p class="mb-2">如閣下不同意接受本使用條款，請勿繼續使用本網頁。</p>
                        </div>
                        <h5>1. 上傳的圖片</h5>
                        <ul>
                            <li>禁止上傳任何猥褻、暴力、會讓我們的伺服器不好過的圖片。</li>
                            <li>但其實資料皆是儲存在 IndexedDB 所以到頭來不好過的是閣下你自己的電腦。</li>
                        </ul>
                        <h5>2. 上傳的資料</h5>
                        <ul>
                            <li>我們不會販售閣下的資料，因為沒有人想買它。</li>
                        </ul>
                        <h5>3. 條款變更</h5>
                        <ul>
                            <li>本使用條款及網頁內容的其他訊息及資料可在未經通知下不定期修改。</li>
                            <li>我們從未擁有或保留任何權利，或我們的靈魂</li>
                        </ul>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">同意</button>
                        <a href="https://challenge.benesse.com.tw/" target="_blank" class="btn btn-warning animate__animated animate__bounce animate__delay-2s animate__repeat-2">我拒絕</a>
                    </div>
                </div>
            </div>
        </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHtml);

        const modalElement = document.getElementById(this.modalId);
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
    }
}