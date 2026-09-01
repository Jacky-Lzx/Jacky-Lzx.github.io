/* 打字机效果 */
(function () {
  const el = document.getElementById("typed");
  if (!el) return;

  const roles = [
    "PhD Candidate @ SJTU",
    "Stochastic & Approximate Computing",
    "Circuit & Architecture Design",
    "Neural Network Accelerators",
    "Milk Tea Driven Researcher 🧋",
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function tick() {
    const word = roles[wordIndex];
    el.textContent = word.slice(0, charIndex);

    let delay = deleting ? 40 : 80;

    if (!deleting && charIndex === word.length) {
      deleting = true;
      delay = 1800;
    } else if (deleting && charIndex === 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % roles.length;
      delay = 400;
    } else {
      charIndex += deleting ? -1 : 1;
    }

    setTimeout(tick, delay);
  }

  tick();
})();
