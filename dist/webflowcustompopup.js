function r() {
  const e = document.getElementById("popup-modal"), s = e.querySelector("[close-popup]"), d = document.querySelector("[open-popup]");
  let o = null;
  const n = {
    timeToTrigger: Math.abs(parseInt(e.getAttribute("time-to-trigger") || "0")) * 1e3,
    closeButton: s
  }, i = () => {
    const t = document.activeElement;
    t && t.blur(), e.style.display = "none", e.setAttribute("aria-hidden", "true"), e.setAttribute("tabindex", "-1"), e.setAttribute("aria-modal", "false"), document.body.style.overflow = "auto", o && (clearTimeout(o), o = null);
  }, l = () => {
    e.style.display = "flex", e.classList.add("show"), e.setAttribute("aria-hidden", "false"), e.setAttribute("tabindex", "0"), document.body.style.overflow = "hidden";
  };
  e.addEventListener("click", (t) => {
    t.target === e && i();
  }), s.addEventListener("click", (t) => {
    t.preventDefault(), i();
  }), d.addEventListener("click", (t) => {
    t.preventDefault(), l();
  }), n.timeToTrigger > 0 && (o = setTimeout(() => {
    l();
  }, n.timeToTrigger)), document.addEventListener("keydown", (t) => {
    t.key === "Escape" && e.style.display === "flex" && i();
  }), console.log(n);
}
export {
  r as setupPopupModal
};
