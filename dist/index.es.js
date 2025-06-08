const i = {
  mounted(e, t) {
    const o = () => {
      navigator.clipboard.writeText(t.value).then(() => console.log("Copied:", t.value)).catch((n) => console.error("Copy failed", n));
    };
    e.__copyHandler__ = o, e.addEventListener("click", o);
  },
  unmounted(e) {
    e.removeEventListener("click", e.__copyHandler__), delete e.__copyHandler__;
  }
}, l = {
  mounted(e, t) {
    let o = null;
    const n = t.arg || "input", r = t.value.delay || 300, c = t.value.callback, s = (d) => {
      o && clearTimeout(o), o = setTimeout(() => c(d), r);
    };
    e.__debounceHandler__ = s, e.addEventListener(n, s);
  },
  unmounted(e, t) {
    const o = t.arg || "input";
    e.removeEventListener(o, e.__debounceHandler__), delete e.__debounceHandler__;
  }
}, _ = {
  mounted(e, t) {
    const o = new IntersectionObserver(([n]) => {
      n.isIntersecting && (e.src = t.value, o.disconnect());
    });
    o.observe(e), e.__lazyObserver__ = o;
  },
  unmounted(e) {
    var t;
    (t = e.__lazyObserver__) == null || t.disconnect(), delete e.__lazyObserver__;
  }
}, u = {
  mounted(e, t) {
    let o = null;
    const n = () => {
      o = setTimeout(() => t.value(), 800);
    }, r = () => {
      o && clearTimeout(o);
    };
    e.addEventListener("mousedown", n), e.addEventListener("touchstart", n), e.addEventListener("mouseup", r), e.addEventListener("mouseleave", r), e.addEventListener("touchend", r), e.__longpressCancel__ = r;
  },
  unmounted(e) {
    var t;
    (t = e.__longpressCancel__) == null || t.call(e), delete e.__longpressCancel__;
  }
}, v = {
  mounted(e, t) {
    ["admin", "editor"].includes(t.value) || (e.style.display = "none");
  }
}, a = {
  mounted(e, t) {
    const o = new ResizeObserver(() => t.value());
    o.observe(e), e.__resizeObserver__ = o;
  },
  unmounted(e) {
    var t;
    (t = e.__resizeObserver__) == null || t.disconnect(), delete e.__resizeObserver__;
  }
}, m = {
  mounted(e, t) {
    document.body.style.overflow = t.value ? "hidden" : "";
  },
  updated(e, t) {
    document.body.style.overflow = t.value ? "hidden" : "";
  },
  unmounted() {
    document.body.style.overflow = "";
  }
}, y = {
  mounted(e, t) {
    const o = () => {
      const n = document.querySelector(t.value);
      n && n.scrollIntoView({ behavior: "smooth" });
    };
    e.__scrollHandler__ = o, e.addEventListener("click", o);
  },
  unmounted(e) {
    e.removeEventListener("click", e.__scrollHandler__), delete e.__scrollHandler__;
  }
}, b = {
  mounted(e, t) {
    e.setAttribute("title", t.value);
  },
  updated(e, t) {
    e.setAttribute("title", t.value);
  }
}, L = {
  install(e) {
    e.directive("copy", i), e.directive("debounce", l), e.directive("lazy", _), e.directive("longpress", u), e.directive("permission", v), e.directive("resize", a), e.directive("scroll-lock", m), e.directive("scroll-to", y), e.directive("tooltip", b);
  }
};
export {
  L as default
};
