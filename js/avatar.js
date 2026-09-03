/* 头像硬币翻转：点击 / 回车 / 空格 切换正反面 */
(function () {
  const frame = document.getElementById("avatarFlip");
  if (!frame) return;

  const toggle = () => {
    const flipped = frame.classList.toggle("flipped");
    frame.setAttribute("aria-pressed", String(flipped));
  };

  frame.addEventListener("click", toggle);
  frame.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
    }
  });
})();
