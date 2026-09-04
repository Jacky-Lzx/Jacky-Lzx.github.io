/* 从 GitHub API 动态拉取 star 数（失败时保留页面里的静态回退值） */
(function () {
  const OWNER = "Jacky-Lzx";
  const els = document.querySelectorAll(".os-star[data-repo]");
  if (!els.length) return;

  const seen = new Set();
  const repos = [...els].map((el) => el.dataset.repo).filter((r) => !seen.has(r) && seen.add(r));

  const update = (repo, count) => {
    document
      .querySelectorAll(`.os-star[data-repo="${CSS.escape(repo)}"]`)
      .forEach((el) => (el.textContent = `★ ${count.toLocaleString()}`));
  };

  repos.forEach((repo) => {
    fetch(`https://api.github.com/repos/${OWNER}/${repo}`, {
      headers: { Accept: "application/vnd.github+json" },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => update(repo, data.stargazers_count))
      .catch(() => {
        /* 网络失败或超出 API 限流：保留静态值 */
      });
  });
})();
