function p() {
  const e = document.getElementById("popup-modal"), s = e.querySelector("[close-popup]"), r = document.querySelector("[open-popup]");
  let o = null;
  if (!e)
    return;
  const i = {
    timeToTrigger: Math.abs(parseInt(e.getAttribute("time-to-trigger") || "0")) * 1e3,
    popupId: e.getAttribute("popup-id") || ""
  }, u = () => {
    const t = /* @__PURE__ */ new Date();
    t.setTime(t.getTime() + 365 * 24 * 60 * 60 * 1e3);
    const a = "expires=" + t.toUTCString();
    document.cookie = `popup-id-${i.popupId}=seen; ${a}; path=/`;
  }, l = () => !1, n = () => {
    const t = document.activeElement;
    t && t.blur(), e.style.display = "none", e.setAttribute("aria-hidden", "true"), e.setAttribute("tabindex", "-1"), e.setAttribute("aria-modal", "false"), document.body.style.overflow = "auto", o && (clearTimeout(o), o = null);
  }, d = () => {
    e.style.display = "flex", e.classList.add("show"), e.setAttribute("aria-hidden", "false"), e.setAttribute("tabindex", "0"), document.body.style.overflow = "hidden", u(), o && (clearTimeout(o), o = null);
  };
  e.addEventListener("click", (t) => {
    t.target === e && n();
  }), s && s.addEventListener("click", (t) => {
    t.preventDefault(), n();
  }), r && r.addEventListener("click", (t) => {
    t.preventDefault(), d();
  }), i.timeToTrigger > 0 && !l() && (o = setTimeout(() => {
    d();
  }, i.timeToTrigger)), document.addEventListener("keydown", (t) => {
    t.key === "Escape" && e.style.display === "flex" && n();
  });
}
export {
  p as setupPopupModal
};
