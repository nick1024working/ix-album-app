const FADE_IN_TIME = 50;
const FADE_OUT_TIME = 150;

$(function () {
  // 事件委派給父層，這樣後面 append 的也能觸發
  // 綁定 .lightbox 元素的點擊事件
  $(document).on('click', '.lightbox', function (e) {
    // 防止點擊時跳轉到 href 指定的 URL
    e.preventDefault();
    // 取得被點擊的圖片 URL
    var imageUrl = $(this).attr('href');
    // 設置 .lightbox-image 元素的 src 屬性為所點擊圖片的 URL
    $('.lightbox-image').attr('src', imageUrl);
    // 顯示 .lightbox-overlay 元素，以顯示圖片
    $('.lightbox-overlay').fadeIn(FADE_IN_TIME);
  });

  // 綁定 .lightbox-close 元素的點擊事件
  $('.lightbox-close').on('click', function () {
    // 隱藏 .lightbox-overlay 元素，以關閉圖片顯示
    $('.lightbox-overlay').fadeOut(FADE_OUT_TIME);
  });

  // 點背景關閉燈箱
  $('.lightbox-overlay').on('click', function (e) {
    if (e.target === this) $(this).fadeOut(FADE_OUT_TIME);
  });

  // Esc 鍵關閉
  $(document).on('keydown', function (e) {
    if (e.key === 'Escape') $('.lightbox-overlay').fadeOut(FADE_OUT_TIME);
  });
});