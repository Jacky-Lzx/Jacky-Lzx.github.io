/* 亮/暗主题切换：Catppuccin Mocha（暗）/ Latte（亮），选择持久化到 localStorage */
(function () {
  const KEY = "theme";
  const root = document.documentElement;
  const current = () => (root.dataset.theme === "latte" ? "latte" : "mocha");

  function apply(theme) {
    root.dataset.theme = theme;
    try {
      localStorage.setItem(KEY, theme);
    } catch (e) {}
  }

  const toggle = () => apply(current() === "latte" ? "mocha" : "latte");

  const btn = document.getElementById("themeToggle");
  if (btn) btn.addEventListener("click", toggle);

  /* 快捷键 t 切换 */
  window.addEventListener("keydown", (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const t = e.target;
    if (
      t &&
      (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)
    )
      return;
    if (e.key === "t" || e.key === "T") {
      e.preventDefault();
      toggle();
    }
  });

  /* 跟随系统偏好变化（仅当用户未手动选择过） */
  const mq = window.matchMedia("(prefers-color-scheme: light)");
  const handler = (e) => {
    let stored = null;
    try {
      stored = localStorage.getItem(KEY);
    } catch (err) {}
    if (!stored) root.dataset.theme = e.matches ? "latte" : "mocha";
  };
  if (mq.addEventListener) mq.addEventListener("change", handler);
  else if (mq.addListener) mq.addListener(handler);
})();
