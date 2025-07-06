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
                        <button id="confirm-destroy-btn" type="button" class="fs-3 fw-bold button-49">關閉</button>
                    </div>
                </div>
            </div>
        </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHtml);

        const modal = new bootstrap.Modal(document.getElementById(this.modalId));
        modal.show();

        const modalElement = document.getElementById(this.modalId);
        modalElement.querySelector('#confirm-destroy-btn')?.addEventListener('click', () => {
            this.onConfirm?.();
            modal.hide();
        });
    }
}