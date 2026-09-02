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
  /* 高亮期间（active）保持按钮可见，避免回顶滚动途中被隐藏而看不到高亮 */
  const toggleTop = () =>
    toTop &&
    toTop.classList.toggle(
      "show",
      window.scrollY > 400 || toTop.classList.contains("active")
    );
  let flashTimer;
  /* 高亮跟随回顶动画，落到顶部即结束（按钮随即隐藏），不留额外延迟；1500ms 兜底 */
  function flashTop() {
    if (!toTop) return () => {};
    toTop.classList.add("active");
    toTop.classList.add("show");
    const stop = () => {
      toTop.classList.remove("active");
      clearTimeout(flashTimer);
      toggleTop();
    };
    flashTimer = setTimeout(stop, 1500);
    return stop;
  }
  /* 回顶/到底：固定 300ms ease-out，比浏览器默认平滑滚动更快 */
  const JUMP_DURATION = 300;
  function goToTop() {
    cancelMotion();
    const stop = flashTop();
    animateScroll(-window.scrollY, JUMP_DURATION, stop);
  }
  if (toTop) toTop.addEventListener("click", goToTop);
  window.addEventListener("scroll", toggleTop, { passive: true });
  toggleTop();

  /* 数字键 0-7 跳转（0 回到顶端） */
  window.addEventListener("keydown", (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const t = e.target;
    if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;

    const n = parseInt(e.key, 10);
    if (n === 0) {
      e.preventDefault();
      cancelMotion();
      goToTop();
    } else if (n >= 1 && n <= links.length) {
      e.preventDefault();
      cancelMotion();
      links[n - 1].click();
    }
  });

  /* vim 风格移动：j/k 小步（长按匀速），Ctrl+u/d 半屏，Ctrl+b/f 整屏（快速动画），G 到底，gg 到顶 */
  const SPEED_SMALL = 800; // px/s，j/k 长按速度
  let gTimer;
  let rafId = null;
  let holdSafety = null;
  let holdVel = 0;
  let holdLast = 0;
  const isTyping = (t) =>
    t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable);

  function stopHold() {
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
    clearTimeout(holdSafety);
  }

  function refreshHoldSafety() {
    clearTimeout(holdSafety);
    holdSafety = setTimeout(stopHold, 400);
  }

  function holdFrame(now) {
    const dt = Math.min((now - holdLast) / 1000, 0.1);
    holdLast = now;
    const before = window.scrollY;
    window.scrollBy({ top: holdVel * dt, behavior: "instant" });
    if (window.scrollY === before) {
      stopHold();
      return;
    }
    rafId = requestAnimationFrame(holdFrame);
  }

  function holdScroll(key) {
    const down = key === "j";
    holdVel = (down ? 1 : -1) * SPEED_SMALL;
    stopHold();
    holdLast = performance.now();
    rafId = requestAnimationFrame(holdFrame);
    refreshHoldSafety();
  }

  /* Ctrl 翻页：一次按键一次动画；动画进行中忽略，结束后仍按着则继续下一步 */
  let ctrlAnim = false;
  let ctrlRaf = null;
  let ctrlHeld = null;
  let ctrlHeldTimer;

  function animateScroll(delta, duration, onDone) {
    const start = window.scrollY;
    const t0 = performance.now();
    const ease = (t) => 1 - Math.pow(1 - t, 3);
    function frame(now) {
      const p = Math.min((now - t0) / duration, 1);
      window.scrollTo({ top: start + delta * ease(p), behavior: "instant" });
      if (p < 1) {
        ctrlRaf = requestAnimationFrame(frame);
      } else {
        ctrlRaf = null;
        onDone && onDone();
      }
    }
    ctrlRaf = requestAnimationFrame(frame);
  }

  function ctrlStep(k) {
    if (ctrlAnim) return;
    const down = k === "d" || k === "f";
    const small = k === "u" || k === "d";
    const dist = (small ? 0.5 : 1) * window.innerHeight;
    const atEdge = down
      ? window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2
      : window.scrollY <= 2;
    if (atEdge) return;
    ctrlAnim = true;
    animateScroll(
      (down ? 1 : -1) * dist,
      small ? 150 : 300,
      () => {
        ctrlAnim = false;
        if (ctrlHeld) ctrlStep(ctrlHeld);
      }
    );
  }

  function markCtrlHeld(k) {
    ctrlHeld = k;
    clearTimeout(ctrlHeldTimer);
    ctrlHeldTimer = setTimeout(() => (ctrlHeld = null), 400);
  }

  function releaseCtrl() {
    ctrlHeld = null;
    clearTimeout(ctrlHeldTimer);
  }

  /* 取消正在进行的 j/k 长按滚动与 Ctrl 翻页动画，避免其 rAF 循环打断后续跳转 */
  function cancelMotion() {
    stopHold();
    if (ctrlRaf) {
      cancelAnimationFrame(ctrlRaf);
      ctrlRaf = null;
    }
    ctrlAnim = false;
    releaseCtrl();
  }

  window.addEventListener("keydown", (e) => {
    if (e.metaKey || e.altKey) return;
    if (isTyping(e.target)) return;

    if (e.ctrlKey) {
      const k = e.key.toLowerCase();
      if (["d", "u", "f", "b"].includes(k)) {
        e.preventDefault();
        markCtrlHeld(k);
        ctrlStep(k);
      }
      return;
    }

    if (e.key === "j" || e.key === "k") {
      e.preventDefault();
      if (e.repeat) refreshHoldSafety();
      else holdScroll(e.key);
    } else if (e.key === "G") {
      e.preventDefault();
      cancelMotion();
      animateScroll(
        document.documentElement.scrollHeight - window.scrollY,
        JUMP_DURATION
      );
    } else if (e.key === "g") {
      if (gTimer) {
        clearTimeout(gTimer);
        gTimer = null;
        goToTop();
      } else {
        gTimer = setTimeout(() => (gTimer = null), 800);
      }
    }
  });

  window.addEventListener("keyup", (e) => {
    if (["j", "k"].includes(e.key)) stopHold();
    if (e.ctrlKey && ["u", "d", "f", "b"].includes(e.key.toLowerCase())) releaseCtrl();
  });
  window.addEventListener("blur", () => {
    stopHold();
    releaseCtrl();
  });
})();
