/**
 * 捲動到指定元素的位置（使用 smooth 動畫）
 * @param {string} id - 要捲動到的 DOM 元素 id
 * @param {number} offset - 從頁面頂部保留的距離（預設為 100px，例如避開固定的 navbar）
 */
export function scrollToElement(id, offset = 100) {
    const target = document.getElementById(id);
    const offsetTop = target.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
    });
}