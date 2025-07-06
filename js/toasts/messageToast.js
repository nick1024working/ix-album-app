/**
 * 建立通用 message toast 服務。
 * 載入時將建立單例 toast 容器 + toast 樣板 的DOM元素，
 * 建立的DOM元素僅使用 id: toast-container, template-toast。
 * 使用 .push(string message) 顯示 toast。
 */
export class MessageToast {
    constructor() {
        this.containerId = 'toast-container';
        this.templateId = 'template-toast';

        this.ensureContainer();
        this.ensureTemplate();
    }

    // 建立 toast 容器（只建立一次）
    ensureContainer() {
        if (!document.getElementById(this.containerId)) {
            const html = `
                <div id="${this.containerId}" class="position-fixed bottom-0 end-0 p-3" style="z-index: 1100;"></div>
            `;
            document.body.insertAdjacentHTML('beforeend', html);
        }
    }

    // 建立 toast 樣板（只建立一次）
    ensureTemplate() {
        if (!document.getElementById(this.templateId)) {
            const html = `
                <div id="${this.templateId}" class="toast d-none mt-2" role="alert" data-bs-delay="2000">
                    <div class="d-flex text-black">
                        <div class="toast-body">[訊息]</div>
                        <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', html);
        }
    }

    /**
     * 建立並顯示一則 Toast 訊息
     * @param {string} message - 要顯示的文字
     */
    push(message) {
        const template = document.getElementById(this.templateId);
        const clone = template.cloneNode(true);

        clone.classList.remove('d-none');
        clone.id = ''; // 清除 ID，避免 DOM 衝突
        clone.querySelector('.toast-body').textContent = message;

        const container = document.getElementById(this.containerId);
        container.appendChild(clone);

        const toast = new bootstrap.Toast(clone);
        toast.show();

        // 顯示完移除，避免 DOM 堆積
        clone.addEventListener('hidden.bs.toast', () => {
            clone.remove();
        });
    }
}