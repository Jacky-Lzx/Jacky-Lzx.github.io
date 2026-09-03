/* 打字机效果 */
(function () {
  const el = document.getElementById("typed");
  if (!el) return;

  const iconSoda =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: inline-block; width: 1.2em; height: 1.2em; vertical-align: -0.25em; margin-left: 4px" aria-hidden="true"><path d="m6 8 1.75 12.28a2 2 0 0 0 2 1.72h4.54a2 2 0 0 0 2-1.72L18 8"></path><path d="M5 8h14"></path><path d="M7 15a6.47 6.47 0 0 1 5 0 6.47 6.47 0 0 0 5 0"></path><path d="m12 8 1-6h2"></path></svg>';

  const roles = [
    "PhD Candidate @ SJTU",
    "Stochastic & Approximate Computing",
    "Circuit & Architecture Design",
    "Neural Network Accelerators",
    "Talk is cheap, show me the code",
    { text: "Milk Tea Driven Researcher", icon: iconSoda },
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function tick() {
    const role = roles[wordIndex];
    const word = typeof role === "string" ? role : role.text;
    const icon = typeof role === "string" ? null : role.icon;
    const total = word.length + (icon ? 1 : 0);

    let html = word.slice(0, Math.min(charIndex, word.length));
    if (icon && charIndex > word.length) html += icon;
    el.innerHTML = html;

    let delay = deleting ? 40 : 80;

    if (!deleting && charIndex === total) {
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
