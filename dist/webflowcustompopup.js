function m() {
  const e = document.getElementById("popup-modal"), s = e.querySelector("[close-popup]"), r = document.querySelector("[open-popup]");
  let i = null;
  if (!e)
    return;
  const o = {
    timeToTrigger: Math.abs(parseInt(e.getAttribute("time-to-trigger") || "0")) * 1e3,
    popupId: e.getAttribute("popup-id") || "",
    popupCache: e.getAttribute("popup-cache") === "true"
  }, a = () => {
    const t = /* @__PURE__ */ new Date();
    if (!o.popupId) {
      console.warn("Popup ID is not set. Cannot set seen cookie.");
      return;
    }
    if (!o.popupCache) {
      console.warn("Popup cache is disabled. Not setting seen cookie.");
      return;
    }
    t.setTime(t.getTime() + 24 * 60 * 60 * 1e3);
    const c = "expires=" + t.toUTCString();
    document.cookie = `popup-id-${o.popupId}=seen; ${c}; path=/`;
  }, l = () => {
    if (!o.popupId || !o.popupCache)
      return !1;
    const t = "popup-id-" + o.popupId + "=seen", d = decodeURIComponent(document.cookie).split(";");
    for (let p = 0; p < d.length; p++)
      if (d[p].trim().indexOf(t) === 0)
        return !0;
    return !1;
  }, n = () => {
    const t = document.activeElement;
    t && t.blur(), e.style.display = "none", e.setAttribute("aria-hidden", "true"), e.setAttribute("tabindex", "-1"), e.setAttribute("aria-modal", "false"), document.body.style.overflow = "auto", i && (clearTimeout(i), i = null);
  }, u = () => {
    e.style.display = "flex", e.classList.add("show"), e.setAttribute("aria-hidden", "false"), e.setAttribute("tabindex", "0"), document.body.style.overflow = "hidden", a(), i && (clearTimeout(i), i = null);
  };
  e.addEventListener("click", (t) => {
    t.target === e && n();
  }), s && s.addEventListener("click", (t) => {
    t.preventDefault(), n();
  }), r && r.addEventListener("click", (t) => {
    t.preventDefault(), u();
  }), o.timeToTrigger > 0 && !l() && (i = setTimeout(() => {
    u();
  }, o.timeToTrigger)), document.addEventListener("keydown", (t) => {
    t.key === "Escape" && e.style.display === "flex" && n();
  });
}
export {
  m as setupPopupModal
};
