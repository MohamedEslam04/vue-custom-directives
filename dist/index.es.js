const vCopy = {
  mounted(el, binding) {
    const copyText = () => {
      navigator.clipboard.writeText(binding.value).then(() => console.log("Copied:", binding.value)).catch((err) => console.error("Copy failed", err));
    };
    el.__copyHandler__ = copyText;
    el.addEventListener("click", copyText);
  },
  unmounted(el) {
    el.removeEventListener("click", el.__copyHandler__);
    delete el.__copyHandler__;
  }
};
const vDebounce = {
  mounted(el, binding) {
    let timeout = null;
    const event = binding.arg || "input";
    const delay = binding.value.delay || 300;
    const handler = binding.value.callback;
    const listener = (e) => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => handler(e), delay);
    };
    el.__debounceHandler__ = listener;
    el.addEventListener(event, listener);
  },
  unmounted(el, binding) {
    const event = binding.arg || "input";
    el.removeEventListener(event, el.__debounceHandler__);
    delete el.__debounceHandler__;
  }
};
const vLazy = {
  mounted(el, binding) {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.src = binding.value;
        observer.disconnect();
      }
    });
    observer.observe(el);
    el.__lazyObserver__ = observer;
  },
  unmounted(el) {
    var _a;
    (_a = el.__lazyObserver__) == null ? void 0 : _a.disconnect();
    delete el.__lazyObserver__;
  }
};
const vLongpress = {
  mounted(el, binding) {
    let pressTimer = null;
    const start = () => {
      pressTimer = setTimeout(() => binding.value(), 800);
    };
    const cancel = () => {
      if (pressTimer) clearTimeout(pressTimer);
    };
    el.addEventListener("mousedown", start);
    el.addEventListener("touchstart", start);
    el.addEventListener("mouseup", cancel);
    el.addEventListener("mouseleave", cancel);
    el.addEventListener("touchend", cancel);
    el.__longpressCancel__ = cancel;
  },
  unmounted(el) {
    var _a;
    (_a = el.__longpressCancel__) == null ? void 0 : _a.call(el);
    delete el.__longpressCancel__;
  }
};
const vPermission = {
  mounted(el, binding) {
    const userRoles = ["admin", "editor"];
    if (!userRoles.includes(binding.value)) {
      el.style.display = "none";
    }
  }
};
const vResize = {
  mounted(el, binding) {
    const observer = new ResizeObserver(() => binding.value());
    observer.observe(el);
    el.__resizeObserver__ = observer;
  },
  unmounted(el) {
    var _a;
    (_a = el.__resizeObserver__) == null ? void 0 : _a.disconnect();
    delete el.__resizeObserver__;
  }
};
const vScrollLock = {
  mounted(_, binding) {
    document.body.style.overflow = binding.value ? "hidden" : "";
  },
  updated(_, binding) {
    document.body.style.overflow = binding.value ? "hidden" : "";
  },
  unmounted() {
    document.body.style.overflow = "";
  }
};
const vScrollTo = {
  mounted(el, binding) {
    const handler = () => {
      const target = document.querySelector(binding.value);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    };
    el.__scrollHandler__ = handler;
    el.addEventListener("click", handler);
  },
  unmounted(el) {
    el.removeEventListener("click", el.__scrollHandler__);
    delete el.__scrollHandler__;
  }
};
const vTooltip = {
  mounted(el, binding) {
    el.setAttribute("title", binding.value);
  },
  updated(el, binding) {
    el.setAttribute("title", binding.value);
  }
};
const vClickOutside = {
  mounted(el, binding) {
    if (typeof binding.value !== "function") {
      console.warn("v-click-outside directive expects a function as value");
      return;
    }
    el.dataset.clickOutside = "true";
    const handler = (event) => {
      if (!el.contains(event.target) && el !== event.target) {
        binding.value(event);
      }
    };
    el._clickOutside = handler;
    document.addEventListener("click", handler, { passive: true });
  },
  unmounted(el) {
    if (el._clickOutside) {
      document.removeEventListener("click", el._clickOutside);
      delete el._clickOutside;
    }
  }
};
const vDraggable = {
  mounted(el) {
    el.style.position = "absolute";
    el.style.cursor = "move";
    el.style.userSelect = "none";
    let offsetX = 0;
    let offsetY = 0;
    let isDragging = false;
    const onMouseDown = (e) => {
      isDragging = true;
      offsetX = e.clientX - el.offsetLeft;
      offsetY = e.clientY - el.offsetTop;
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
      e.preventDefault();
    };
    const onMouseMove = (e) => {
      if (!isDragging) return;
      el.style.left = `${e.clientX - offsetX}px`;
      el.style.top = `${e.clientY - offsetY}px`;
    };
    const onMouseUp = () => {
      isDragging = false;
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
    el._dragHandlers = { onMouseDown, onMouseMove, onMouseUp };
    el.addEventListener("mousedown", onMouseDown);
  },
  unmounted(el) {
    if (el._dragHandlers) {
      el.removeEventListener("mousedown", el._dragHandlers.onMouseDown);
      delete el._dragHandlers;
    }
  }
};
const vFocus = {
  mounted(el) {
    setTimeout(() => {
      if (el.focus && typeof el.focus === "function") {
        el.focus();
      }
    }, 0);
  }
};
const vRipple = {
  mounted(el) {
    el.style.position = "relative";
    el.style.overflow = "hidden";
    if (!document.querySelector("#ripple-styles")) {
      const style = document.createElement("style");
      style.id = "ripple-styles";
      style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
      document.head.appendChild(style);
    }
    const handler = (e) => {
      const ripple = document.createElement("span");
      const size = Math.max(el.clientWidth, el.clientHeight);
      const rect = el.getBoundingClientRect();
      ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                top: ${e.clientY - rect.top - size / 2}px;
                left: ${e.clientX - rect.left - size / 2}px;
                background: rgba(0, 0, 0, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
                z-index: 1000;
            `;
      el.appendChild(ripple);
      ripple.addEventListener("animationend", () => {
        if (ripple.parentNode) {
          ripple.parentNode.removeChild(ripple);
        }
      });
    };
    el._rippleHandler = handler;
    el.addEventListener("click", handler);
  },
  unmounted(el) {
    if (el._rippleHandler) {
      el.removeEventListener("click", el._rippleHandler);
      delete el._rippleHandler;
    }
  }
};
const vUppercase = {
  mounted(el) {
    if (el.tagName !== "INPUT" && el.tagName !== "TEXTAREA") {
      console.warn("v-uppercase directive should be used on input or textarea elements");
      return;
    }
    const handler = (e) => {
      const target = e.target;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      target.value = target.value.toUpperCase();
      if (start !== null && end !== null) {
        target.setSelectionRange(start, end);
      }
      target.dispatchEvent(new Event("input", { bubbles: true }));
    };
    el._uppercaseHandler = handler;
    el.addEventListener("input", handler);
  },
  unmounted(el) {
    if (el._uppercaseHandler) {
      el.removeEventListener("input", el._uppercaseHandler);
      delete el._uppercaseHandler;
    }
  }
};
const index = {
  install(app) {
    app.directive("copy", vCopy);
    app.directive("debounce", vDebounce);
    app.directive("lazy", vLazy);
    app.directive("longpress", vLongpress);
    app.directive("permission", vPermission);
    app.directive("resize", vResize);
    app.directive("scroll-lock", vScrollLock);
    app.directive("scroll-to", vScrollTo);
    app.directive("tooltip", vTooltip);
    app.directive("click-outside", vClickOutside);
    app.directive("draggable", vDraggable);
    app.directive("focus", vFocus);
    app.directive("ripple", vRipple);
    app.directive("uppercase", vUppercase);
  }
};
export {
  index as default,
  vClickOutside,
  vCopy,
  vDebounce,
  vDraggable,
  vFocus,
  vLazy,
  vLongpress,
  vPermission,
  vResize,
  vRipple,
  vScrollLock,
  vScrollTo,
  vTooltip,
  vUppercase
};
//# sourceMappingURL=index.es.js.map
