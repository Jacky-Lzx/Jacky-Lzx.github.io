/* 编程语言使用时间线（年点热力图）
 * 每一年一个圆点：点亮 = 当年使用过，闪烁 = 至今仍在用
 * start/end 格式："YYYY"（年份），end 为 "now" 时视为至今
 */
(function () {
  const root = document.getElementById("langTimelineGrid");
  if (!root) return;

  const START = 2015;
  const END_YEAR = 2026; // 今年的年份

  const LANGS = [
    { name: "Rust", start: "2024", end: "now", hue: "green" },
    { name: "Verilog", start: "2019", end: "now", hue: "blue" },
    { name: "Python", start: "2019", end: "now", hue: "yellow" },
    { name: "LaTeX", start: "2019", end: "now", hue: "mauve" },
    { name: "C++", start: "2018", end: "now", hue: "teal" },
    { name: "MATLAB", start: "2018", end: "2019", hue: "pink" },
    { name: "Java", start: "2015", end: "2018", hue: "peach" },
  ];

  const fmtEnd = (e) => (e === "now" ? "至今" : e);

  const axis = document.createElement("div");
  axis.className = "lt-axis";
  for (let y = START; y <= END_YEAR; y++) {
    const label = document.createElement("span");
    label.className = "lt-axis-label";
    label.textContent = String(y).slice(-2);
    axis.appendChild(label);
  }

  const axisRow = document.createElement("div");
  axisRow.className = "lt-row lt-axis-row";
  axisRow.appendChild(document.createElement("div"));
  axisRow.appendChild(axis);

  const frag = document.createDocumentFragment();
  frag.appendChild(axisRow);

  for (const lang of LANGS) {
    const s = Number(lang.start);
    const e = lang.end === "now" ? END_YEAR : Number(lang.end);

    const row = document.createElement("div");
    row.className = "lt-row lt-" + lang.hue;

    const name = document.createElement("div");
    name.className = "lt-name";
    name.textContent = lang.name;

    const strip = document.createElement("div");
    strip.className = "lt-strip";
    strip.title = lang.name + ": " + lang.start + " — " + fmtEnd(lang.end);
    for (let y = START; y <= END_YEAR; y++) {
      const used = y >= s && y <= e;
      const live = lang.end === "now" && y === END_YEAR;

      const cell = document.createElement("span");
      cell.className = "lt-cell" + (used ? " on" : "") + (live ? " live" : "");

      const dot = document.createElement("i");
      dot.className = "lt-dot";
      dot.style.setProperty("--d", (y - START) * 40 + "ms");
      cell.appendChild(dot);
      strip.appendChild(cell);
    }

    row.appendChild(name);
    row.appendChild(strip);
    frag.appendChild(row);
  }

  root.appendChild(frag);
})();
