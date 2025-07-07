export class DestroyAlbumModal {
    constructor(onConfirm) {
        this.modalId = 'dynamic-destroy-album-modal';
        this.cssId = 'dynamic-destroy-album-modal-css';
        this.onConfirm = onConfirm;
        this.loadCSS();
        this.init();
    }

    loadCSS() {
        if (document.getElementById(this.cssId))
            return;
        const link = document.createElement('link');
        link.id = this.cssId;
        link.rel = 'stylesheet';
        link.href = './js/modals/destroyAlbumModal.css';
        document.head.appendChild(link);
    }

    init() {
        document.getElementById(this.modalId)?.remove();

        const modalHtml = `
        <div class="modal fade" id="${this.modalId}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content bg-dark text-white">
                    <div class="modal-header position-relative">
                        <h5 class="modal-title mx-auto position-absolute start-50 translate-middle-x">摧毀相簿</h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body text-center">
                        <p class="fs-2 fw-bold">確定要捨棄所有回憶?</p>
                        <button id="confirm-destroy-btn" type="button" class="fs-3 fw-bold button-49" data-bs-dismiss="modal">確定</button>
                    </div>
                </div>
            </div>
        </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHtml);

        const modalElement = document.getElementById(this.modalId);
        this.modal = new bootstrap.Modal(modalElement);

        // 執行 callback 然後 hide
        modalElement.querySelector('#confirm-destroy-btn')
            .addEventListener('click', () => {
                document.activeElement.blur();
                this.onConfirm?.();
                this.modal.hide();
            });

        // 清除 DOM node
        modalElement.addEventListener('hidden.bs.modal', () => {
            document.activeElement.blur();
            modalElement.remove();
        });

        this.modal.show();
    }
}