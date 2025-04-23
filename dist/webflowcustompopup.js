function r() {
  const e = document.getElementById("popup-modal"), n = e.querySelector("[close-popup]"), s = document.querySelector("[open-popup]");
  let o = null;
  if (!e)
    return;
  const l = {
    timeToTrigger: Math.abs(parseInt(e.getAttribute("time-to-trigger") || "0")) * 1e3
  }, i = () => {
    const t = document.activeElement;
    t && t.blur(), e.style.display = "none", e.setAttribute("aria-hidden", "true"), e.setAttribute("tabindex", "-1"), e.setAttribute("aria-modal", "false"), document.body.style.overflow = "auto", o && (clearTimeout(o), o = null);
  }, d = () => {
    e.style.display = "flex", e.classList.add("show"), e.setAttribute("aria-hidden", "false"), e.setAttribute("tabindex", "0"), document.body.style.overflow = "hidden";
  };
  e.addEventListener("click", (t) => {
    t.target === e && i();
  }), n && n.addEventListener("click", (t) => {
    t.preventDefault(), i();
  }), s && s.addEventListener("click", (t) => {
    t.preventDefault(), d();
  }), l.timeToTrigger > 0 && (o = setTimeout(() => {
    d();
  }, l.timeToTrigger)), document.addEventListener("keydown", (t) => {
    t.key === "Escape" && e.style.display === "flex" && i();
  });
}
export {
  r as setupPopupModal
};
