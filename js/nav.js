/* 滚动时高亮当前导航项 */
(function () {
  const links = Array.from(document.querySelectorAll(".nav-links a"));
  if (!links.length) return;

  const sections = links.map(
    (link) => document.querySelector(link.getAttribute("href"))
  );

  function update() {
    const atBottom =
      window.innerHeight + Math.ceil(window.scrollY) >=
      document.documentElement.scrollHeight - 2;
    let current = atBottom ? sections.length - 1 : 0;
    if (!atBottom) {
      sections.forEach((section, index) => {
        if (section && section.getBoundingClientRect().top <= 120) {
          current = index;
        }
      });
    }
    links.forEach((link, index) =>
      link.classList.toggle("active", index === current)
    );
  }

  window.addEventListener("scroll", update, { passive: true });
  update();

  /* 回到顶端按钮：下滑超过阈值后显示 */
  const toTop = document.getElementById("toTop");
  const toggleTop = () => toTop && toTop.classList.toggle("show", window.scrollY > 400);
  let flashTimer;
  function flashTop() {
    if (!toTop) return;
    toTop.classList.add("active");
    const stop = () => {
      toTop.classList.remove("active");
      clearTimeout(flashTimer);
    };
    window.addEventListener("scrollend", stop, { once: true });
    flashTimer = setTimeout(stop, 1500);
  }
  function goToTop() {
    flashTop();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  if (toTop) toTop.addEventListener("click", goToTop);
  window.addEventListener("scroll", toggleTop, { passive: true });
  toggleTop();

  /* 数字键 0-6 跳转（0 回到顶端） */
  window.addEventListener("keydown", (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const t = e.target;
    if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;

    const n = parseInt(e.key, 10);
    if (n === 0) {
      e.preventDefault();
      goToTop();
    } else if (n >= 1 && n <= links.length) {
      e.preventDefault();
      links[n - 1].click();
    }
  });
})();
