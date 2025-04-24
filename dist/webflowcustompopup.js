function f() {
  const t = document.getElementById("popup-modal"), d = t.querySelector("[close-popup]"), r = document.querySelector("[open-popup]");
  let o = null;
  if (!t)
    return;
  const i = {
    timeToTrigger: Math.abs(parseInt(t.getAttribute("time-to-trigger") || "0")) * 1e3,
    popupId: t.getAttribute("popup-id") || ""
  }, p = () => {
    const e = /* @__PURE__ */ new Date();
    e.setTime(e.getTime() + 365 * 24 * 60 * 60 * 1e3);
    const u = "expires=" + e.toUTCString();
    document.cookie = `popup-id-${i.popupId}=seen; ${u}; path=/`;
  }, a = () => {
    const e = "popup-id-" + i.popupId + "=seen", l = decodeURIComponent(document.cookie).split(";");
    for (let s = 0; s < l.length; s++)
      if (l[s].trim().indexOf(e) === 0)
        return !0;
    return !1;
  }, n = () => {
    const e = document.activeElement;
    e && e.blur(), t.style.display = "none", t.setAttribute("aria-hidden", "true"), t.setAttribute("tabindex", "-1"), t.setAttribute("aria-modal", "false"), document.body.style.overflow = "auto", o && (clearTimeout(o), o = null);
  }, c = () => {
    t.style.display = "flex", t.classList.add("show"), t.setAttribute("aria-hidden", "false"), t.setAttribute("tabindex", "0"), document.body.style.overflow = "hidden", p(), o && (clearTimeout(o), o = null);
  };
  t.addEventListener("click", (e) => {
    e.target === t && n();
  }), d && d.addEventListener("click", (e) => {
    e.preventDefault(), n();
  }), r && r.addEventListener("click", (e) => {
    e.preventDefault(), c();
  }), i.timeToTrigger > 0 && !a() && (o = setTimeout(() => {
    c();
  }, i.timeToTrigger)), document.addEventListener("keydown", (e) => {
    e.key === "Escape" && t.style.display === "flex" && n();
  });
}
export {
  f as setupPopupModal
};
