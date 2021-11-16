window.NodeList &&
  !NodeList.prototype.forEach &&
  (NodeList.prototype.forEach = function (e, t) {
    var o,
      n = this.length;
    for (t = t || window, o = 0; o < n; o++) e.call(t, this[o], o, this);
  }),
  (function () {
    'use strict';
    function e() {
      var e = window,
        t = document;
      if (
        !('scrollBehavior' in t.documentElement.style) ||
        !0 === e.__forceSmoothScrollPolyfill__
      ) {
        var o,
          n = e.HTMLElement || e.Element,
          i = 468,
          a = {
            scroll: e.scroll || e.scrollTo,
            scrollBy: e.scrollBy,
            elementScroll: n.prototype.scroll || s,
            scrollIntoView: n.prototype.scrollIntoView,
          },
          r = e.performance && e.performance.now ? e.performance.now.bind(e.performance) : Date.now,
          l =
            ((o = e.navigator.userAgent),
            new RegExp(['MSIE ', 'Trident/', 'Edge/'].join('|')).test(o) ? 1 : 0);
        (e.scroll = e.scrollTo =
          function () {
            void 0 !== arguments[0] &&
              (!0 !== d(arguments[0])
                ? g.call(
                    e,
                    t.body,
                    void 0 !== arguments[0].left ? ~~arguments[0].left : e.scrollX || e.pageXOffset,
                    void 0 !== arguments[0].top ? ~~arguments[0].top : e.scrollY || e.pageYOffset,
                  )
                : a.scroll.call(
                    e,
                    void 0 !== arguments[0].left
                      ? arguments[0].left
                      : 'object' != typeof arguments[0]
                      ? arguments[0]
                      : e.scrollX || e.pageXOffset,
                    void 0 !== arguments[0].top
                      ? arguments[0].top
                      : void 0 !== arguments[1]
                      ? arguments[1]
                      : e.scrollY || e.pageYOffset,
                  ));
          }),
          (e.scrollBy = function () {
            void 0 !== arguments[0] &&
              (d(arguments[0])
                ? a.scrollBy.call(
                    e,
                    void 0 !== arguments[0].left
                      ? arguments[0].left
                      : 'object' != typeof arguments[0]
                      ? arguments[0]
                      : 0,
                    void 0 !== arguments[0].top
                      ? arguments[0].top
                      : void 0 !== arguments[1]
                      ? arguments[1]
                      : 0,
                  )
                : g.call(
                    e,
                    t.body,
                    ~~arguments[0].left + (e.scrollX || e.pageXOffset),
                    ~~arguments[0].top + (e.scrollY || e.pageYOffset),
                  ));
          }),
          (n.prototype.scroll = n.prototype.scrollTo =
            function () {
              if (void 0 !== arguments[0])
                if (!0 !== d(arguments[0])) {
                  var e = arguments[0].left,
                    t = arguments[0].top;
                  g.call(
                    this,
                    this,
                    void 0 === e ? this.scrollLeft : ~~e,
                    void 0 === t ? this.scrollTop : ~~t,
                  );
                } else {
                  if ('number' == typeof arguments[0] && void 0 === arguments[1])
                    throw new SyntaxError('Value could not be converted');
                  a.elementScroll.call(
                    this,
                    void 0 !== arguments[0].left
                      ? ~~arguments[0].left
                      : 'object' != typeof arguments[0]
                      ? ~~arguments[0]
                      : this.scrollLeft,
                    void 0 !== arguments[0].top
                      ? ~~arguments[0].top
                      : void 0 !== arguments[1]
                      ? ~~arguments[1]
                      : this.scrollTop,
                  );
                }
            }),
          (n.prototype.scrollBy = function () {
            void 0 !== arguments[0] &&
              (!0 !== d(arguments[0])
                ? this.scroll({
                    left: ~~arguments[0].left + this.scrollLeft,
                    top: ~~arguments[0].top + this.scrollTop,
                    behavior: arguments[0].behavior,
                  })
                : a.elementScroll.call(
                    this,
                    void 0 !== arguments[0].left
                      ? ~~arguments[0].left + this.scrollLeft
                      : ~~arguments[0] + this.scrollLeft,
                    void 0 !== arguments[0].top
                      ? ~~arguments[0].top + this.scrollTop
                      : ~~arguments[1] + this.scrollTop,
                  ));
          }),
          (n.prototype.scrollIntoView = function () {
            if (!0 !== d(arguments[0])) {
              var o = (function (e) {
                  for (
                    ;
                    e !== t.body &&
                    !1 ===
                      ((n = c((o = e), 'Y') && u(o, 'Y')), (i = c(o, 'X') && u(o, 'X')), n || i);

                  )
                    e = e.parentNode || e.host;
                  var o, n, i;
                  return e;
                })(this),
                n = o.getBoundingClientRect(),
                i = this.getBoundingClientRect();
              o !== t.body
                ? (g.call(this, o, o.scrollLeft + i.left - n.left, o.scrollTop + i.top - n.top),
                  'fixed' !== e.getComputedStyle(o).position &&
                    e.scrollBy({
                      left: n.left,
                      top: n.top,
                      behavior: 'smooth',
                    }))
                : e.scrollBy({
                    left: i.left,
                    top: i.top,
                    behavior: 'smooth',
                  });
            } else a.scrollIntoView.call(this, void 0 === arguments[0] || arguments[0]);
          });
      }
      function s(e, t) {
        (this.scrollLeft = e), (this.scrollTop = t);
      }
      function d(e) {
        if (
          null === e ||
          'object' != typeof e ||
          void 0 === e.behavior ||
          'auto' === e.behavior ||
          'instant' === e.behavior
        )
          return !0;
        if ('object' == typeof e && 'smooth' === e.behavior) return !1;
        throw new TypeError(
          'behavior member of ScrollOptions ' +
            e.behavior +
            ' is not a valid value for enumeration ScrollBehavior.',
        );
      }
      function c(e, t) {
        return 'Y' === t
          ? e.clientHeight + l < e.scrollHeight
          : 'X' === t
          ? e.clientWidth + l < e.scrollWidth
          : void 0;
      }
      function u(t, o) {
        var n = e.getComputedStyle(t, null)['overflow' + o];
        return 'auto' === n || 'scroll' === n;
      }
      function f(t) {
        var o,
          n,
          a,
          l,
          s = (r() - t.startTime) / i;
        (l = s = s > 1 ? 1 : s),
          (o = 0.5 * (1 - Math.cos(Math.PI * l))),
          (n = t.startX + (t.x - t.startX) * o),
          (a = t.startY + (t.y - t.startY) * o),
          t.method.call(t.scrollable, n, a),
          (n === t.x && a === t.y) || e.requestAnimationFrame(f.bind(e, t));
      }
      function g(o, n, i) {
        var l,
          d,
          c,
          u,
          g = r();
        o === t.body
          ? ((l = e),
            (d = e.scrollX || e.pageXOffset),
            (c = e.scrollY || e.pageYOffset),
            (u = a.scroll))
          : ((l = o), (d = o.scrollLeft), (c = o.scrollTop), (u = s)),
          f({
            scrollable: l,
            method: u,
            startTime: g,
            startX: d,
            startY: c,
            x: n,
            y: i,
          });
      }
    }
    'object' == typeof exports && 'undefined' != typeof module
      ? (module.exports = {
          polyfill: e,
        })
      : e();
  })(),
  (function () {
    'use strict';
    (window.kadence = {
      initOutlineToggle: function () {
        document.body.addEventListener('keydown', function () {
          document.body.classList.remove('hide-focus-outline');
        }),
          document.body.addEventListener('mousedown', function () {
            document.body.classList.add('hide-focus-outline');
          });
      },
      getOffset: function (e) {
        if (e instanceof HTMLElement) {
          var t = e.getBoundingClientRect();
          return {
            top: t.top + window.pageYOffset,
            left: t.left + window.pageXOffset,
          };
        }
        return {
          top: null,
          left: null,
        };
      },
      findParents: function (e, t) {
        var o = [];
        return (
          (function e(n) {
            var i = n.parentNode;
            i instanceof HTMLElement && (i.matches(t) && o.push(i), e(i));
          })(e),
          o
        );
      },
      toggleAttribute: function (e, t, o, n) {
        void 0 === o && (o = !0),
          void 0 === n && (n = !1),
          e.getAttribute(t) !== o ? e.setAttribute(t, o) : e.setAttribute(t, n);
      },
      initNavToggleSubmenus: function () {
        var e = document.querySelectorAll('.nav--toggle-sub');
        if (e.length)
          for (let t = 0; t < e.length; t++) window.kadence.initEachNavToggleSubmenu(e[t]);
      },
      initEachNavToggleSubmenu: function (e) {
        var t = e.querySelectorAll('.menu ul');
        if (t.length)
          for (let n = 0; n < t.length; n++) {
            var o = t[n].parentNode;
            let e = o.querySelector('.dropdown-nav-toggle');
            e &&
              (e.addEventListener('click', function (e) {
                e.preventDefault(),
                  e.target.parentNode.parentNode.parentNode.parentNode.classList.contains(
                    'menu-item',
                  )
                    ? window.kadence.toggleSubMenu(
                        e.target.parentNode.parentNode.parentNode.parentNode,
                      )
                    : window.kadence.toggleSubMenu(e.target.parentNode.parentNode.parentNode);
              }),
              (e.tabIndex = 0),
              e.setAttribute('role', 'button'),
              e.addEventListener('keypress', function (e) {
                'Enter' === e.key &&
                  window.kadence.toggleSubMenu(e.target.parentNode.parentNode.parentNode);
              }),
              o.addEventListener('mouseleave', function (e) {
                window.kadence.toggleSubMenu(e.target, !1);
              }),
              o.querySelector('a').addEventListener('focus', function (e) {
                var t = e.target.parentNode.parentNode.querySelectorAll('li.menu-item--toggled-on');
                for (let o = 0; o < t.length; o++) window.kadence.toggleSubMenu(t[o], !1);
              }),
              t[n].addEventListener('keydown', function (e) {
                var o = 'ul.toggle-show > li > a, ul.toggle-show > li > a .dropdown-nav-toggle';
                9 === e.keyCode &&
                  (e.shiftKey
                    ? window.kadence.isfirstFocusableElement(t[n], document.activeElement, o) &&
                      window.kadence.toggleSubMenu(t[n].parentNode, !1)
                    : window.kadence.islastFocusableElement(t[n], document.activeElement, o) &&
                      window.kadence.toggleSubMenu(t[n].parentNode, !1));
              }),
              t[n].parentNode.classList.add('menu-item--has-toggle'));
          }
      },
      toggleSubMenu: function (e, t) {
        var o = e.querySelector('.dropdown-nav-toggle'),
          n = e.querySelector('ul');
        let i = e.classList.contains('menu-item--toggled-on');
        if (
          (void 0 !== t && 'boolean' == typeof t && (i = !t),
          o.setAttribute('aria-expanded', (!i).toString()),
          i)
        ) {
          e.classList.remove('menu-item--toggled-on'),
            n.classList.remove('toggle-show'),
            o.setAttribute('aria-label', kadenceConfig.screenReader.expand);
          var a = e.querySelectorAll('.menu-item--toggled-on');
          for (let e = 0; e < a.length; e++) window.kadence.toggleSubMenu(a[e], !1);
        } else {
          var r = e.parentNode.querySelectorAll('li.menu-item--toggled-on');
          for (let e = 0; e < r.length; e++) window.kadence.toggleSubMenu(r[e], !1);
          e.classList.add('menu-item--toggled-on'),
            n.classList.add('toggle-show'),
            o.setAttribute('aria-label', kadenceConfig.screenReader.collapse);
        }
      },
      isfirstFocusableElement: function (e, t, o) {
        var n = e.querySelectorAll(o);
        return 0 < n.length && t === n[0];
      },
      islastFocusableElement: function (e, t, o) {
        var n = e.querySelectorAll(o);
        return 0 < n.length && t === n[n.length - 1];
      },
      toggleDrawer: function (e, t) {
        t = void 0 === t || t;
        var o = e,
          n = document.querySelector(o.dataset.toggleTarget),
          i = document,
          a = o.dataset.toggleDuration ? o.dataset.toggleDuration : 250;
        if (
          (window.kadence.toggleAttribute(o, 'aria-expanded', 'true', 'false'),
          n.classList.contains('show-drawer'))
        )
          o.dataset.toggleBodyClass && i.body.classList.remove(o.dataset.toggleBodyClass),
            n.classList.remove('active'),
            n.classList.remove('pop-animated'),
            setTimeout(function () {
              if ((n.classList.remove('show-drawer'), o.dataset.setFocus && t)) {
                var e = document.querySelector(o.dataset.setFocus);
                e &&
                  (e.focus(),
                  e.hasAttribute('aria-expanded') &&
                    window.kadence.toggleAttribute(e, 'aria-expanded', 'true', 'false'));
              }
            }, a);
        else if (
          (n.classList.add('show-drawer'),
          o.dataset.toggleBodyClass && i.body.classList.toggle(o.dataset.toggleBodyClass),
          setTimeout(function () {
            if ((n.classList.add('active'), o.dataset.setFocus, t)) {
              var e = document.querySelector(o.dataset.setFocus);
              if (e) {
                e.hasAttribute('aria-expanded') &&
                  window.kadence.toggleAttribute(e, 'aria-expanded', 'true', 'false');
                var i = e.value;
                (e.value = ''), e.focus(), (e.value = i);
              }
            }
          }, 10),
          setTimeout(function () {
            n.classList.add('pop-animated');
          }, a),
          n.classList.contains('popup-drawer'))
        ) {
          var r = n.querySelectorAll(
              'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
            ),
            l = r[0],
            s = r[r.length - 1];
          document.addEventListener('keydown', function (e) {
            ('Tab' === e.key || 9 === e.keyCode) &&
              (e.shiftKey
                ? document.activeElement === l && (s.focus(), e.preventDefault())
                : document.activeElement === s && (l.focus(), e.preventDefault()));
          });
        }
      },
      initToggleDrawer: function () {
        var e = document.querySelectorAll('.drawer-toggle');
        if (e.length) {
          for (let t = 0; t < e.length; t++)
            e[t].addEventListener('click', function (o) {
              o.preventDefault(), window.kadence.toggleDrawer(e[t]);
            });
          document.addEventListener('keyup', function (e) {
            27 === e.keyCode &&
              (e.preventDefault(),
              document.querySelectorAll('.show-drawer.active').forEach(function (e) {
                window.kadence.toggleDrawer(
                  document.querySelector(
                    '*[data-toggle-target="' + e.dataset.drawerTargetString + '"]',
                  ),
                );
              }));
          }),
            document.addEventListener('click', function (e) {
              var t = e.target,
                o = document.querySelector('.show-drawer.active .drawer-overlay');
              t === o &&
                window.kadence.toggleDrawer(
                  document.querySelector(
                    '*[data-toggle-target="' + o.dataset.drawerTargetString + '"]',
                  ),
                );
            });
        }
      },
      initMobileToggleSub: function () {
        document.querySelectorAll('.has-collapse-sub-nav').forEach(function (e) {
          var t = e.querySelector('.current-menu-item');
          t &&
            window.kadence.findParents(t, 'li').forEach(function (e) {
              var t = e.querySelector('.drawer-sub-toggle');
              t && window.kadence.toggleDrawer(t, !0);
            });
        });
        var e = document.querySelectorAll('.drawer-sub-toggle');
        if (e.length)
          for (let t = 0; t < e.length; t++)
            e[t].addEventListener('click', function (o) {
              o.preventDefault(), window.kadence.toggleDrawer(e[t]);
            });
      },
      initMobileToggleAnchor: function () {
        var e = document.getElementById('mobile-drawer');
        if (e) {
          var t = e.querySelectorAll('a');
          if (t.length)
            for (let o = 0; o < t.length; o++)
              t[o].addEventListener('click', function (t) {
                window.kadence.toggleDrawer(e.querySelector('.menu-toggle-close'), !1);
              });
        }
      },
      initTransHeaderPadding: function () {
        if (
          !document.body.classList.contains('no-header') &&
          document.body.classList.contains('transparent-header') &&
          document.body.classList.contains('mobile-transparent-header')
        ) {
          var e = document.querySelector('.entry-hero-container-inner'),
            t = document.querySelector('#masthead'),
            o = function (o) {
              kadenceConfig.breakPoints.desktop <= window.innerWidth
                ? document.body.classList.contains('transparent-header')
                  ? (e.style.paddingTop = t.offsetHeight + 'px')
                  : (e.style.paddingTop = 0)
                : document.body.classList.contains('mobile-transparent-header')
                ? (e.style.paddingTop = t.offsetHeight + 'px')
                : (e.style.paddingTop = 0);
            };
          e &&
            (window.addEventListener('resize', o, !1),
            window.addEventListener('scroll', o, !1),
            window.addEventListener('load', o, !1),
            o());
        }
      },
      initStickyHeader: function () {
        var e = document.querySelector('#main-header .kadence-sticky-header'),
          t = document.querySelector('#mobile-header .kadence-sticky-header'),
          o = document.getElementById('wrapper'),
          n = document.querySelectorAll('.kadence-pro-fixed-above'),
          i = document.querySelectorAll('.kadence-before-wrapper-item'),
          a = 'mobile',
          r = 0,
          l = 0;
        kadenceConfig.breakPoints.desktop <= window.innerWidth
          ? ((a = 'desktop'),
            e &&
              ((e.style.position = 'static'),
              (l = window.kadence.getOffset(e).top),
              (e.style.position = null)))
          : t &&
            ((t.style.position = 'static'),
            (l = window.kadence.getOffset(t).top),
            (t.style.position = null));
        var s,
          d,
          c,
          u = function (s) {
            var d,
              c = window.kadence.getOffset(o).top;
            if (document.body.classList.toString().includes('boom_bar-static-top')) {
              var u = document.querySelector('.boom_bar');
              c = window.kadence.getOffset(o).top - u.offsetHeight;
            }
            if (i.length) {
              var f = 0;
              for (let e = 0; e < i.length; e++) f += i[e].offsetHeight;
              c = window.kadence.getOffset(o).top - f;
            }
            if (n.length) {
              var g = 0;
              for (let e = 0; e < n.length; e++) g += n[e].offsetHeight;
              c = window.kadence.getOffset(o).top + g;
            }
            if ((d = kadenceConfig.breakPoints.desktop <= window.innerWidth ? e : t)) {
              kadenceConfig.breakPoints.desktop <= window.innerWidth
                ? 'mobile' === a
                  ? ((l = window.kadence.getOffset(d).top), (a = 'desktop'))
                  : s &&
                    'updateActive' === s &&
                    ((d.style.top = 'auto'), (l = window.kadence.getOffset(d).top), (a = 'desktop'))
                : 'desktop' === a
                ? ((l = window.kadence.getOffset(d).top), (a = 'mobile'))
                : s &&
                  'updateActive' === s &&
                  ((d.style.top = 'auto'), (l = window.kadence.getOffset(d).top), (a = 'mobile'));
              var h = d.parentNode,
                p = d.getAttribute('data-shrink'),
                w = d.getAttribute('data-reveal-scroll-up'),
                m = parseInt(d.getAttribute('data-start-height'));
              if (
                ((!m || (s && void 0 !== s.type && 'orientationchange' === s.type)) &&
                  (d.setAttribute('data-start-height', d.offsetHeight),
                  (m = d.offsetHeight),
                  h.classList.contains('site-header-upper-inner-wrap')
                    ? ((h.style.height = null),
                      s && void 0 !== s.type && 'orientationchange' === s.type
                        ? d.classList.contains('item-is-fixed')
                          ? setTimeout(function () {
                              h.style.height = Math.floor(h.offsetHeight + d.offsetHeight) + 'px';
                            }, 21)
                          : setTimeout(function () {
                              h.style.height = h.offsetHeight + 'px';
                            }, 21)
                        : (h.style.height = h.offsetHeight + 'px'))
                    : h.classList.contains('site-header-inner-wrap')
                    ? ((h.style.height = null), (h.style.height = h.offsetHeight + 'px'))
                    : (h.style.height = d.offsetHeight + 'px')),
                'true' === p)
              ) {
                var v = d.getAttribute('data-shrink-height');
                if (v) {
                  if ('true' === w)
                    if (window.scrollY > r)
                      var y = Math.floor(Math.floor(l) - Math.floor(c) + Math.floor(m));
                    else y = Math.floor(l - c);
                  else y = Math.floor(l - c);
                  var b = d.querySelector('.custom-logo'),
                    k = d.querySelector('.kadence-sticky-logo'),
                    L = d.querySelector('.site-main-header-inner-wrap'),
                    S = parseInt(L.getAttribute('data-start-height'));
                  if (
                    (S ||
                      (L.setAttribute('data-start-height', L.offsetHeight), (S = L.offsetHeight)),
                    window.scrollY <= y)
                  )
                    (L.style.height = S + 'px'),
                      (L.style.minHeight = S + 'px'),
                      (L.style.maxHeight = S + 'px'),
                      b && (b.style.maxHeight = '100%'),
                      k && (k.style.maxHeight = '100%');
                  else if (window.scrollY > y) {
                    var x = Math.max(v, S - (window.scrollY - (l - c)));
                    (L.style.height = x + 'px'),
                      (L.style.minHeight = x + 'px'),
                      (L.style.maxHeight = x + 'px'),
                      b && (b.style.maxHeight = x + 'px'),
                      k && (k.style.maxHeight = x + 'px');
                  }
                }
              }
              if ('true' === w) {
                var E = Math.floor(l - c),
                  T = window.scrollY,
                  A = d.offsetHeight,
                  M = r - T,
                  q = window
                    .getComputedStyle(d)
                    .getPropertyValue('transform')
                    .match(/(-?[0-9\.]+)/g);
                if (q && void 0 !== q[5] && q[5]) var H = parseInt(q[5]) + M;
                else H = 0;
                var N = T > r;
                if (T <= E) d.style.transform = 'translateY(0px)';
                else if (N)
                  d.classList.add('item-hidden-above'),
                    (d.style.transform = 'translateY(' + (Math.abs(H) > A ? -A : H) + 'px)');
                else {
                  E = Math.floor(l - c);
                  (d.style.transform = 'translateY(' + (H > 0 ? 0 : H) + 'px)'),
                    d.classList.remove('item-hidden-above');
                }
                r = T;
              } else E = Math.floor(l - c);
              window.scrollY == E
                ? ((d.style.top = c + 'px'),
                  d.classList.add('item-is-fixed'),
                  d.classList.add('item-at-start'),
                  d.classList.remove('item-is-stuck'),
                  h.classList.add('child-is-fixed'),
                  document.body.classList.add('header-is-fixed'))
                : window.scrollY > E
                ? ((d.style.top = c + 'px'),
                  d.classList.add('item-is-fixed'),
                  d.classList.add('item-is-stuck'),
                  d.classList.remove('item-at-start'),
                  h.classList.add('child-is-fixed'),
                  document.body.classList.add('header-is-fixed'))
                : d.classList.contains('item-is-fixed') &&
                  (d.classList.remove('item-is-fixed'),
                  d.classList.remove('item-at-start'),
                  d.classList.remove('item-is-stuck'),
                  (d.style.height = null),
                  (d.style.top = null),
                  h.classList.remove('child-is-fixed'),
                  document.body.classList.remove('header-is-fixed'));
            }
          };
        if (
          (e || t) &&
          (window.addEventListener('resize', u, !1),
          window.addEventListener('scroll', u, !1),
          window.addEventListener('load', u, !1),
          window.addEventListener('orientationchange', u),
          'complete' === document.readyState && u('updateActive'),
          document.body.classList.contains('woocommerce-demo-store') &&
            document.body.classList.contains('kadence-store-notice-placement-above'))
        ) {
          (s = document.querySelector('.woocommerce-store-notice')),
            (d = e => {
              u('updateActive');
            }),
            (c = {
              root: document.documentElement,
            }),
            new IntersectionObserver((e, t) => {
              e.forEach(e => {
                d(e.intersectionRatio > 0);
              });
            }, c).observe(s);
        }
      },
      getTopOffset: function () {
        var e = document.querySelector(
            '#main-header .kadence-sticky-header:not([data-reveal-scroll-up="true"])',
          ),
          t = document.querySelector(
            '#mobile-header .kadence-sticky-header:not([data-reveal-scroll-up="true"])',
          ),
          o = 0,
          n = 0;
        if (kadenceConfig.breakPoints.desktop <= window.innerWidth) {
          if (e)
            o =
              'true' !== e.getAttribute('data-shrink') ||
              e.classList.contains('site-header-inner-wrap')
                ? Math.floor(e.offsetHeight)
                : Math.floor(e.getAttribute('data-shrink-height'));
          else o = 0;
          document.body.classList.contains('admin-bar') && (n = 32);
        } else {
          if (t)
            o =
              'true' === t.getAttribute('data-shrink')
                ? Math.floor(t.getAttribute('data-shrink-height'))
                : Math.floor(t.offsetHeight);
          else o = 0;
          document.body.classList.contains('admin-bar') && (n = 46);
        }
        return Math.floor(o + n);
      },
      scrollToElement: function (e, t) {
        t = void 0 === t || t;
        var o = window.kadence.getTopOffset(),
          n = Math.floor(e.getBoundingClientRect().top) - o;
        window.scrollBy({
          top: n,
          left: 0,
          behavior: 'smooth',
        });
        var i = setInterval(function () {
          var n = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 2;
          (Math.floor(e.getBoundingClientRect().top) - o == 0 || n) &&
            (e.focus(),
            e.classList.contains('kt-title-item') && e.firstElementChild.click(),
            t && window.history.pushState('', '', '#' + e.id),
            clearInterval(i));
        }, 100);
      },
      anchorScrollToCheck: function (e, t) {
        if (((t = void 0 !== t ? t : null), e.target.getAttribute('href'))) var o = e.target;
        else {
          if (!(o = e.target.closest('a'))) return;
          if (!o.getAttribute('href')) return;
        }
        if (
          !o.parentNode ||
          !o.parentNode.hasAttribute('role') ||
          'tab' !== o.parentNode.getAttribute('role')
        ) {
          var n;
          n = t
            ? t.getAttribute('href').substring(t.getAttribute('href').indexOf('#'))
            : o.getAttribute('href').substring(o.getAttribute('href').indexOf('#'));
          var i = document.getElementById(n.replace('#', ''));
          i && (e.preventDefault(), window.kadence.scrollToElement(i));
        }
      },
      initStickySidebarWidget: function () {
        if (document.body.classList.contains('has-sticky-sidebar-widget')) {
          var e = window.kadence.getTopOffset(),
            t = document.querySelector('#secondary .sidebar-inner-wrap .widget:last-child');
          t &&
            ((t.style.top = Math.floor(e + 20) + 'px'),
            (t.style.maxHeight = 'calc( 100vh - ' + Math.floor(e + 20) + 'px )'));
        }
      },
      initStickySidebar: function () {
        if (document.body.classList.contains('has-sticky-sidebar')) {
          var e = window.kadence.getTopOffset(),
            t = document.querySelector('#secondary .sidebar-inner-wrap');
          t &&
            ((t.style.top = Math.floor(e + 20) + 'px'),
            (t.style.maxHeight = 'calc( 100vh - ' + Math.floor(e + 20) + 'px )'));
        }
      },
      initAnchorScrollTo: function () {
        if (!document.body.classList.contains('no-anchor-scroll')) {
          if ('' != window.location.hash) {
            var e,
              t = location.hash.substring(1);
            if (!/^[A-z0-9_-]+$/.test(t)) return;
            (e = document.getElementById(t)) &&
              window.setTimeout(function () {
                window.kadence.scrollToElement(e, !1);
              }, 100);
          }
          var o = document.querySelectorAll(
            'a[href*=\\#]:not([href=\\#]):not(.scroll-ignore):not([data-tab]):not([data-toggle])',
          );
          o.length &&
            o.forEach(function (e) {
              e.addEventListener('click', function (e) {
                window.kadence.anchorScrollToCheck(e);
              });
            });
        }
      },
      initScrollToTop: function () {
        var e = document.getElementById('kt-scroll-up');
        if (e) {
          var t = function () {
            window.scrollY > 100
              ? e.classList.add('scroll-visible')
              : e.classList.remove('scroll-visible');
          };
          window.addEventListener('scroll', t),
            t(),
            e.addEventListener('click', function (e) {
              e.preventDefault(),
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth',
                }),
                document.activeElement.blur();
            });
        }
      },
      init: function () {
        window.kadence.initNavToggleSubmenus(),
          window.kadence.initToggleDrawer(),
          window.kadence.initMobileToggleAnchor(),
          window.kadence.initMobileToggleSub(),
          window.kadence.initOutlineToggle(),
          window.kadence.initStickyHeader(),
          window.kadence.initStickySidebar(),
          window.kadence.initStickySidebarWidget(),
          window.kadence.initTransHeaderPadding(),
          window.kadence.initAnchorScrollTo(),
          window.kadence.initScrollToTop();
      },
    }),
      'loading' === document.readyState
        ? document.addEventListener('DOMContentLoaded', window.kadence.init)
        : window.kadence.init();
  })();
function _toConsumableArray(t) {
  return _arrayWithoutHoles(t) || _iterableToArray(t) || _nonIterableSpread();
}
function _nonIterableSpread() {
  throw new TypeError('Invalid attempt to spread non-iterable instance');
}
function _iterableToArray(t) {
  if (Symbol.iterator in Object(t) || '[object Arguments]' === Object.prototype.toString.call(t))
    return Array.from(t);
}
function _arrayWithoutHoles(t) {
  if (Array.isArray(t)) {
    for (var e = 0, n = new Array(t.length); e < t.length; e++) n[e] = t[e];
    return n;
  }
}
function _extends() {
  return (_extends =
    Object.assign ||
    function (t) {
      for (var e = 1; e < arguments.length; e++) {
        var n = arguments[e];
        for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
      }
      return t;
    }).apply(this, arguments);
}
function _typeof(t) {
  return (_typeof =
    'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
      ? function (t) {
          return typeof t;
        }
      : function (t) {
          return t &&
            'function' == typeof Symbol &&
            t.constructor === Symbol &&
            t !== Symbol.prototype
            ? 'symbol'
            : typeof t;
        })(t);
}
!(function (t, e) {
  'object' === ('undefined' == typeof exports ? 'undefined' : _typeof(exports)) &&
  'undefined' != typeof module
    ? (module.exports = e())
    : 'function' == typeof define && define.amd
    ? define(e)
    : (t.LazyLoad = e());
})(this, function () {
  'use strict';
  var t = 'undefined' != typeof window,
    e =
      (t && !('onscroll' in window)) ||
      ('undefined' != typeof navigator &&
        /(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent)),
    n = t && 'IntersectionObserver' in window,
    r = t && 'classList' in document.createElement('p'),
    o = {
      elements_selector: 'img',
      container: e || t ? document : null,
      threshold: 300,
      thresholds: null,
      data_src: 'src',
      data_srcset: 'srcset',
      data_sizes: 'sizes',
      data_bg: 'bg',
      class_loading: 'loading',
      class_loaded: 'loaded',
      class_error: 'error',
      load_delay: 0,
      auto_unobserve: !0,
      callback_enter: null,
      callback_exit: null,
      callback_reveal: null,
      callback_loaded: null,
      callback_error: null,
      callback_finish: null,
      use_native: !1,
    },
    a = function (t, e) {
      var n,
        r = new t(e);
      try {
        n = new CustomEvent('LazyLoad::Initialized', {
          detail: {
            instance: r,
          },
        });
      } catch (t) {
        (n = document.createEvent('CustomEvent')).initCustomEvent('LazyLoad::Initialized', !1, !1, {
          instance: r,
        });
      }
      window.dispatchEvent(n);
    };
  var i = function (t, e) {
      return t.getAttribute('data-' + e);
    },
    s = function (t, e, n) {
      var r = 'data-' + e;
      null !== n ? t.setAttribute(r, n) : t.removeAttribute(r);
    },
    c = function (t) {
      return 'true' === i(t, 'was-processed');
    },
    l = function (t, e) {
      return s(t, 'll-timeout', e);
    },
    u = function (t) {
      return i(t, 'll-timeout');
    },
    f = function (t, e) {
      t && t(e);
    },
    d = function (t, e) {
      (t._loadingCount += e),
        0 === t._elements.length && 0 === t._loadingCount && f(t._settings.callback_finish);
    },
    _ = function (t) {
      for (var e, n = [], r = 0; (e = t.children[r]); r += 1) 'SOURCE' === e.tagName && n.push(e);
      return n;
    },
    v = function (t, e, n) {
      n && t.setAttribute(e, n);
    },
    b = function (t, e) {
      v(t, 'sizes', i(t, e.data_sizes)),
        v(t, 'srcset', i(t, e.data_srcset)),
        v(t, 'src', i(t, e.data_src));
    },
    m = {
      IMG: function (t, e) {
        var n = t.parentNode;
        n &&
          'PICTURE' === n.tagName &&
          _(n).forEach(function (t) {
            b(t, e);
          });
        b(t, e);
      },
      IFRAME: function (t, e) {
        v(t, 'src', i(t, e.data_src));
      },
      VIDEO: function (t, e) {
        _(t).forEach(function (t) {
          v(t, 'src', i(t, e.data_src));
        }),
          v(t, 'src', i(t, e.data_src)),
          t.load();
      },
    },
    g = function (t, e) {
      var n,
        r,
        o = e._settings,
        a = t.tagName,
        s = m[a];
      if (s)
        return (
          s(t, o),
          d(e, 1),
          void (e._elements =
            ((n = e._elements),
            (r = t),
            n.filter(function (t) {
              return t !== r;
            })))
        );
      !(function (t, e) {
        var n = i(t, e.data_src),
          r = i(t, e.data_bg);
        n && (t.style.backgroundImage = 'url("'.concat(n, '")')),
          r && (t.style.backgroundImage = r);
      })(t, o);
    },
    y = function (t, e) {
      r ? t.classList.add(e) : (t.className += (t.className ? ' ' : '') + e);
    },
    h = function (t, e) {
      r
        ? t.classList.remove(e)
        : (t.className = t.className
            .replace(new RegExp('(^|\\s+)' + e + '(\\s+|$)'), ' ')
            .replace(/^\s+/, '')
            .replace(/\s+$/, ''));
    },
    p = function (t, e, n) {
      t.addEventListener(e, n);
    },
    E = function (t, e, n) {
      t.removeEventListener(e, n);
    },
    w = function (t, e, n) {
      E(t, 'load', e), E(t, 'loadeddata', e), E(t, 'error', n);
    },
    A = function (t, e, n) {
      var r = n._settings,
        o = e ? r.class_loaded : r.class_error,
        a = e ? r.callback_loaded : r.callback_error,
        i = t.target;
      h(i, r.class_loading), y(i, o), f(a, i), d(n, -1);
    },
    I = function (t, e) {
      var n = function n(o) {
          A(o, !0, e), w(t, n, r);
        },
        r = function r(o) {
          A(o, !1, e), w(t, n, r);
        };
      !(function (t, e, n) {
        p(t, 'load', e), p(t, 'loadeddata', e), p(t, 'error', n);
      })(t, n, r);
    },
    k = ['IMG', 'IFRAME', 'VIDEO'],
    L = function (t, e) {
      var n = e._observer;
      S(t, e), n && e._settings.auto_unobserve && n.unobserve(t);
    },
    O = function (t) {
      var e = u(t);
      e && (clearTimeout(e), l(t, null));
    },
    x = function (t, e) {
      var n = e._settings.load_delay,
        r = u(t);
      r ||
        ((r = setTimeout(function () {
          L(t, e), O(t);
        }, n)),
        l(t, r));
    },
    S = function (t, e, n) {
      var r = e._settings;
      (!n && c(t)) ||
        (k.indexOf(t.tagName) > -1 && (I(t, e), y(t, r.class_loading)),
        g(t, e),
        (function (t) {
          s(t, 'was-processed', 'true');
        })(t),
        f(r.callback_reveal, t),
        f(r.callback_set, t));
    },
    z = function (t) {
      return (
        !!n &&
        ((t._observer = new IntersectionObserver(
          function (e) {
            e.forEach(function (e) {
              return (function (t) {
                return t.isIntersecting || t.intersectionRatio > 0;
              })(e)
                ? (function (t, e) {
                    var n = e._settings;
                    f(n.callback_enter, t), n.load_delay ? x(t, e) : L(t, e);
                  })(e.target, t)
                : (function (t, e) {
                    var n = e._settings;
                    f(n.callback_exit, t), n.load_delay && O(t);
                  })(e.target, t);
            });
          },
          {
            root: (e = t._settings).container === document ? null : e.container,
            rootMargin: e.thresholds || e.threshold + 'px',
          },
        )),
        !0)
      );
      var e;
    },
    C = ['IMG', 'IFRAME'],
    N = function (t, e) {
      return (function (t) {
        return t.filter(function (t) {
          return !c(t);
        });
      })(
        ((n =
          t ||
          (function (t) {
            return t.container.querySelectorAll(t.elements_selector);
          })(e)),
        Array.prototype.slice.call(n)),
      );
      var n;
    },
    M = function (t) {
      var e = t._settings;
      _toConsumableArray(e.container.querySelectorAll('.' + e.class_error)).forEach(function (t) {
        h(t, e.class_error),
          (function (t) {
            s(t, 'was-processed', null);
          })(t);
      }),
        t.update();
    },
    R = function (e, n) {
      var r;
      (this._settings = (function (t) {
        return _extends({}, o, t);
      })(e)),
        (this._loadingCount = 0),
        z(this),
        this.update(n),
        (r = this),
        t &&
          window.addEventListener('online', function (t) {
            M(r);
          });
    };
  return (
    (R.prototype = {
      update: function (t) {
        var n,
          r = this,
          o = this._settings;
        ((this._elements = N(t, o)), !e && this._observer)
          ? ((function (t) {
              return t.use_native && 'loading' in HTMLImageElement.prototype;
            })(o) &&
              ((n = this)._elements.forEach(function (t) {
                -1 !== C.indexOf(t.tagName) && (t.setAttribute('loading', 'lazy'), S(t, n));
              }),
              (this._elements = N(t, o))),
            this._elements.forEach(function (t) {
              r._observer.observe(t);
            }))
          : this.loadAll();
      },
      destroy: function () {
        var t = this;
        this._observer &&
          (this._elements.forEach(function (e) {
            t._observer.unobserve(e);
          }),
          (this._observer = null)),
          (this._elements = null),
          (this._settings = null);
      },
      load: function (t, e) {
        S(t, this, e);
      },
      loadAll: function () {
        var t = this;
        this._elements.forEach(function (e) {
          L(e, t);
        });
      },
    }),
    t &&
      (function (t, e) {
        if (e)
          if (e.length) for (var n, r = 0; (n = e[r]); r += 1) a(t, n);
          else a(t, e);
      })(R, window.lazyLoadOptions),
    R
  );
});
  });
  var U = 'retina';
  a.magnificPopup.registerModule(U, {
    options: {
      replaceSrc: function (a) {
        return a.src.replace(/\.\w+$/, function (a) {
          return '@2x' + a;
        });
      },
      ratio: 1,
    },
    proto: {
      initRetina: function () {
        if (window.devicePixelRatio > 1) {
          var a = n.st.retina,
            b = a.ratio;
          (b = isNaN(b) ? b() : b),
            b > 1 &&
              (w('ImageHasSize.' + U, function (a, c) {
                c.img.css({
                  'max-width': c.img[0].naturalWidth / b,
                  width: '100%',
                });
              }),
              w('ElementParse.' + U, function (c, d) {
                d.src = a.replaceSrc(d, b);
              }));
        }
      },
    },
  }),
    A();
});
/**
 * Video Pop
 */
jQuery(document).ready(function ($) {
  function kbProGetParameterByName(name, url = '') {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }
  $('.kadence-video-popup-link.kadence-video-type-external').magnificPopup({
    type: 'iframe',
    removalDelay: 400,
    mainClass: 'mfp-kt-blocks',
    iframe: {
      markup:
        '<div class="mfp-iframe-scaler kb-class">' +
        '<div class="mfp-close"></div>' +
        '<iframe class="mfp-iframe" frameborder="0" allow="autoplay; fullscreen *" allowfullscreen="true"></iframe>' +
        '</div>',
      patterns: {
        youtube: {
          index: 'youtube.com/',
          id: 'v=',
          src: 'https://www.youtube.com/embed/%id%?autoplay=1&rel=0',
        },
        youtu: {
          index: 'youtu.be',
          id: function (url) {
            var start_time = kbProGetParameterByName('t', url);
            // Capture everything after the hostname, excluding possible querystrings.
            var m = url.match(/^.+youtu.be\/([^?]+)/);
            if (null !== m) {
              if (start_time) {
                return m[1] + '?autoplay=1&rel=0&start=' + start_time;
              } else {
                return m[1] + '?autoplay=1&rel=0';
              }
            }
            return null;
          },
          // Use the captured video ID in an embed URL.
          // Add/remove querystrings as desired.
          src: '//www.youtube.com/embed/%id%',
        },
        youtubenocookiewatch: {
          index: 'youtube-nocookie.com/watch',
          id: 'v=',
          // 	// Capture everything after the hostname, excluding possible querystrings.
          // 	var m = url.match( /^.+youtube-nocookie.com\/([^?]+)/ );
          // 	if ( null !== m ) {
          // 		return m[1];
          // 	}
          // 	return null;
          // },
          // Use the captured video ID in an embed URL.
          // Add/remove querystrings as desired.
          src: '//www.youtube-nocookie.com/embed/%id%?autoplay=1&rel=0',
        },
        youtubenocookie: {
          index: 'youtube-nocookie.com/embed',
          id: function (url) {
            // Capture everything after the hostname, excluding possible querystrings.
            var m = url.match(/^.+youtube-nocookie.com\/([^?]+)/);
            if (null !== m) {
              return m[1];
            }
            return null;
          },
          // // Use the captured video ID in an embed URL.
          // // Add/remove querystrings as desired.
          src: '//www.youtube-nocookie.com/%id%?autoplay=1&rel=0',
        },
      },
    },
    callbacks: {
      beforeOpen: function () {
        this.st.iframe.markup = '<div class="mfp-with-anim">' + this.st.iframe.markup + '</div>';
        this.st.mainClass =
          this.st.mainClass +
          ' kadence-vpop-anim-' +
          this.st.el.attr('data-effect') +
          ' ' +
          this.st.el.attr('data-popup-class');
      },
    },
  });
  $('.kadence-video-popup-link.kadence-video-type-local').each(function () {
    var id = $(this).attr('data-popup-id');
    var auto = $(this).attr('data-popup-auto');
    $(this).magnificPopup({
      mainClass: 'mfp-kt-blocks',
      removalDelay: 400,
      items: {
        src: '#' + id,
        type: 'inline',
      },
      callbacks: {
        beforeOpen: function () {
          this.st.mainClass =
            this.st.mainClass +
            ' kadence-vpop-anim-' +
            this.st.el.attr('data-effect') +
            ' ' +
            this.st.el.attr('data-popup-class');
        },
        open: function () {
          // Play video on open:
          if ('true' == auto) {
            $(this.content).find('video')[0].play();
          }
        },
        close: function () {
          // Pause video on close:
          $(this.content).find('video')[0].pause();
        },
      },
    });
  });
}); /*! This file is auto-generated */

!(function (c, d) {
  'use strict';
  var e = !1,
    n = !1;
  if (d.querySelector) if (c.addEventListener) e = !0;
  if (((c.wp = c.wp || {}), !c.wp.receiveEmbedMessage))
    if (
      ((c.wp.receiveEmbedMessage = function (e) {
        var t = e.data;
        if (t)
          if (t.secret || t.message || t.value)
            if (!/[^a-zA-Z0-9]/.test(t.secret)) {
              for (
                var r,
                  a,
                  i,
                  s = d.querySelectorAll('iframe[data-secret="' + t.secret + '"]'),
                  n = d.querySelectorAll('blockquote[data-secret="' + t.secret + '"]'),
                  o = 0;
                o < n.length;
                o++
              )
                n[o].style.display = 'none';
              for (o = 0; o < s.length; o++)
                if (((r = s[o]), e.source === r.contentWindow)) {
                  if ((r.removeAttribute('style'), 'height' === t.message)) {
                    if (1e3 < (i = parseInt(t.value, 10))) i = 1e3;
                    else if (~~i < 200) i = 200;
                    r.height = i;
                  }
                  if ('link' === t.message)
                    if (
                      ((a = d.createElement('a')),
                      (i = d.createElement('a')),
                      (a.href = r.getAttribute('src')),
                      (i.href = t.value),
                      i.host === a.host)
                    )
                      if (d.activeElement === r) c.top.location.href = t.value;
                }
            }
      }),
      e)
    )
      c.addEventListener('message', c.wp.receiveEmbedMessage, !1),
        d.addEventListener('DOMContentLoaded', t, !1),
        c.addEventListener('load', t, !1);
  function t() {
    if (!n) {
      n = !0;
      for (
        var e,
          t,
          r = -1 !== navigator.appVersion.indexOf('MSIE 10'),
          a = !!navigator.userAgent.match(/Trident.*rv:11\./),
          i = d.querySelectorAll('iframe.wp-embedded-content'),
          s = 0;
        s < i.length;
        s++
      ) {
        if (!(e = i[s]).getAttribute('data-secret'))
          (t = Math.random().toString(36).substr(2, 10)),
            (e.src += '#?secret=' + t),
            e.setAttribute('data-secret', t);
        if (r || a)
          (t = e.cloneNode(!0)).removeAttribute('security'), e.parentNode.replaceChild(t, e);
      }
    }
  }
})(window, document);
!(function (e) {
  var t = !0;
  (e.flexslider = function (a, n) {
    var i = e(a);
    void 0 === n.rtl && 'rtl' == e('html').attr('dir') && (n.rtl = !0),
      (i.vars = e.extend({}, e.flexslider.defaults, n));
    var s,
      r = i.vars.namespace,
      o = window.navigator && window.navigator.msPointerEnabled && window.MSGesture,
      l =
        ('ontouchstart' in window ||
          o ||
          (window.DocumentTouch && document instanceof DocumentTouch)) &&
        i.vars.touch,
      d = 'click touchend MSPointerUp',
      c = '',
      u = 'vertical' === i.vars.direction,
      v = i.vars.reverse,
      p = i.vars.itemWidth > 0,
      m = 'fade' === i.vars.animation,
      f = '' !== i.vars.asNavFor,
      h = {};
    e.data(a, 'flexslider', i),
      (h = {
        init: function () {
          (i.animating = !1),
            (i.currentSlide = parseInt(i.vars.startAt ? i.vars.startAt : 0, 10)),
            isNaN(i.currentSlide) && (i.currentSlide = 0),
            (i.animatingTo = i.currentSlide),
            (i.atEnd = 0 === i.currentSlide || i.currentSlide === i.last),
            (i.containerSelector = i.vars.selector.substr(0, i.vars.selector.search(' '))),
            (i.slides = e(i.vars.selector, i)),
            (i.container = e(i.containerSelector, i)),
            (i.count = i.slides.length),
            (i.syncExists = e(i.vars.sync).length > 0),
            'slide' === i.vars.animation && (i.vars.animation = 'swing'),
            (i.prop = u ? 'top' : i.vars.rtl ? 'marginRight' : 'marginLeft'),
            (i.args = {}),
            (i.manualPause = !1),
            (i.stopped = !1),
            (i.started = !1),
            (i.startTimeout = null),
            (i.transitions =
              !i.vars.video &&
              !m &&
              i.vars.useCSS &&
              (function () {
                var e = document.createElement('div'),
                  t = [
                    'perspectiveProperty',
                    'WebkitPerspective',
                    'MozPerspective',
                    'OPerspective',
                    'msPerspective',
                  ];
                for (var a in t)
                  if (void 0 !== e.style[t[a]])
                    return (
                      (i.pfx = t[a].replace('Perspective', '').toLowerCase()),
                      (i.prop = '-' + i.pfx + '-transform'),
                      !0
                    );
                return !1;
              })()),
            (i.isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1),
            (i.ensureAnimationEnd = ''),
            '' !== i.vars.controlsContainer &&
              (i.controlsContainer =
                e(i.vars.controlsContainer).length > 0 && e(i.vars.controlsContainer)),
            '' !== i.vars.manualControls &&
              (i.manualControls = e(i.vars.manualControls).length > 0 && e(i.vars.manualControls)),
            '' !== i.vars.customDirectionNav &&
              (i.customDirectionNav =
                2 === e(i.vars.customDirectionNav).length && e(i.vars.customDirectionNav)),
            i.vars.randomize &&
              (i.slides.sort(function () {
                return Math.round(Math.random()) - 0.5;
              }),
              i.container.empty().append(i.slides)),
            i.doMath(),
            i.setup('init'),
            i.vars.controlNav && h.controlNav.setup(),
            i.vars.directionNav && h.directionNav.setup(),
            i.vars.keyboard &&
              (1 === e(i.containerSelector).length || i.vars.multipleKeyboard) &&
              e(document).bind('keyup', function (e) {
                var t = e.keyCode;
                if (!i.animating && (39 === t || 37 === t)) {
                  var a = i.vars.rtl
                    ? 37 === t
                      ? i.getTarget('next')
                      : 39 === t && i.getTarget('prev')
                    : 39 === t
                    ? i.getTarget('next')
                    : 37 === t && i.getTarget('prev');
                  i.flexAnimate(a, i.vars.pauseOnAction);
                }
              }),
            i.vars.mousewheel &&
              i.bind('mousewheel', function (e, t, a, n) {
                e.preventDefault();
                var s = t < 0 ? i.getTarget('next') : i.getTarget('prev');
                i.flexAnimate(s, i.vars.pauseOnAction);
              }),
            i.vars.pausePlay && h.pausePlay.setup(),
            i.vars.slideshow && i.vars.pauseInvisible && h.pauseInvisible.init(),
            i.vars.slideshow &&
              (i.vars.pauseOnHover &&
                i.hover(
                  function () {
                    i.manualPlay || i.manualPause || i.pause();
                  },
                  function () {
                    i.manualPause || i.manualPlay || i.stopped || i.play();
                  },
                ),
              (i.vars.pauseInvisible && h.pauseInvisible.isHidden()) ||
                (i.vars.initDelay > 0
                  ? (i.startTimeout = setTimeout(i.play, i.vars.initDelay))
                  : i.play())),
            f && h.asNav.setup(),
            l && i.vars.touch && h.touch(),
            (!m || (m && i.vars.smoothHeight)) &&
              e(window).on('resize orientationchange focus', h.resize),
            i.find('img').attr('draggable', 'false'),
            setTimeout(function () {
              i.vars.start(i);
            }, 200);
        },
        asNav: {
          setup: function () {
            (i.asNav = !0),
              (i.animatingTo = Math.floor(i.currentSlide / i.move)),
              (i.currentItem = i.currentSlide),
              i.slides
                .removeClass(r + 'active-slide')
                .eq(i.currentItem)
                .addClass(r + 'active-slide'),
              o
                ? ((a._slider = i),
                  i.slides.each(function () {
                    (this._gesture = new MSGesture()),
                      (this._gesture.target = this),
                      this.addEventListener(
                        'MSPointerDown',
                        function (e) {
                          e.preventDefault(),
                            e.currentTarget._gesture &&
                              e.currentTarget._gesture.addPointer(e.pointerId);
                        },
                        {
                          passive: !0,
                        },
                      ),
                      this.addEventListener(
                        'MSGestureTap',
                        function (t) {
                          t.preventDefault();
                          var a = e(this),
                            n = a.index();
                          e(i.vars.asNavFor).data('flexslider').animating ||
                            a.hasClass('active') ||
                            ((i.direction = i.currentItem < n ? 'next' : 'prev'),
                            i.flexAnimate(n, i.vars.pauseOnAction, !1, !0, !0));
                        },
                        {
                          passive: !0,
                        },
                      );
                  }))
                : i.slides.on(d, function (t) {
                    t.preventDefault();
                    var a = e(this),
                      n = a.index();
                    (i.vars.rtl
                      ? -1 * (a.offset().right - e(i).scrollLeft())
                      : a.offset().left - e(i).scrollLeft()) <= 0 && a.hasClass(r + 'active-slide')
                      ? i.flexAnimate(i.getTarget('prev'), !0)
                      : e(i.vars.asNavFor).data('flexslider').animating ||
                        a.hasClass(r + 'active-slide') ||
                        ((i.direction = i.currentItem < n ? 'next' : 'prev'),
                        i.flexAnimate(n, i.vars.pauseOnAction, !1, !0, !0));
                  });
          },
        },
        controlNav: {
          setup: function () {
            i.manualControls ? h.controlNav.setupManual() : h.controlNav.setupPaging();
          },
          setupPaging: function () {
            var t,
              a,
              n = 'thumbnails' === i.vars.controlNav ? 'control-thumbs' : 'control-paging',
              s = 1;
            if (
              ((i.controlNavScaffold = e('<ol class="' + r + 'control-nav ' + r + n + '"></ol>')),
              i.pagingCount > 1)
            )
              for (var o = 0; o < i.pagingCount; o++) {
                void 0 === (a = i.slides.eq(o)).attr('data-thumb-alt') &&
                  a.attr('data-thumb-alt', '');
                var l =
                  '' !== a.attr('data-thumb-alt')
                    ? (l = ' alt="' + a.attr('data-thumb-alt') + '"')
                    : '';
                if (
                  ((t =
                    'thumbnails' === i.vars.controlNav
                      ? '<img src="' + a.attr('data-thumb') + '"' + l + '/>'
                      : '<a href="#">' + s + '</a>'),
                  'thumbnails' === i.vars.controlNav && !0 === i.vars.thumbCaptions)
                ) {
                  var u = a.attr('data-thumbcaption');
                  '' !== u &&
                    void 0 !== u &&
                    (t += '<span class="' + r + 'caption">' + u + '</span>');
                }
                i.controlNavScaffold.append('<li>' + t + '</li>'), s++;
              }
            i.controlsContainer
              ? e(i.controlsContainer).append(i.controlNavScaffold)
              : i.append(i.controlNavScaffold),
              h.controlNav.set(),
              h.controlNav.active(),
              i.controlNavScaffold.delegate('a, img', d, function (t) {
                if ((t.preventDefault(), '' === c || c === t.type)) {
                  var a = e(this),
                    n = i.controlNav.index(a);
                  a.hasClass(r + 'active') ||
                    ((i.direction = n > i.currentSlide ? 'next' : 'prev'),
                    i.flexAnimate(n, i.vars.pauseOnAction));
                }
                '' === c && (c = t.type), h.setToClearWatchedEvent();
              });
          },
          setupManual: function () {
            (i.controlNav = i.manualControls),
              h.controlNav.active(),
              i.controlNav.bind(d, function (t) {
                if ((t.preventDefault(), '' === c || c === t.type)) {
                  var a = e(this),
                    n = i.controlNav.index(a);
                  a.hasClass(r + 'active') ||
                    (n > i.currentSlide ? (i.direction = 'next') : (i.direction = 'prev'),
                    i.flexAnimate(n, i.vars.pauseOnAction));
                }
                '' === c && (c = t.type), h.setToClearWatchedEvent();
              });
          },
          set: function () {
            var t = 'thumbnails' === i.vars.controlNav ? 'img' : 'a';
            i.controlNav = e(
              '.' + r + 'control-nav li ' + t,
              i.controlsContainer ? i.controlsContainer : i,
            );
          },
          active: function () {
            i.controlNav
              .removeClass(r + 'active')
              .eq(i.animatingTo)
              .addClass(r + 'active');
          },
          update: function (t, a) {
            i.pagingCount > 1 && 'add' === t
              ? i.controlNavScaffold.append(e('<li><a href="#"></a></li>'))
              : 1 === i.pagingCount
              ? i.controlNavScaffold.find('li').remove()
              : i.controlNav.eq(a).closest('li').remove(),
              i.controlNavScaffold.find('li').each(function (t, a) {
                e(a)
                  .find('a')
                  .text(t + 1);
              }),
              h.controlNav.set(),
              i.pagingCount > 1 && i.pagingCount !== i.controlNav.length
                ? i.update(a, t)
                : h.controlNav.active();
          },
        },
        directionNav: {
          setup: function () {
            var t = e(
              '<ul class="' +
                r +
                'direction-nav"><li class="' +
                r +
                'nav-prev"><a class="' +
                r +
                'prev" href="#">' +
                i.vars.prevText +
                '</a></li><li class="' +
                r +
                'nav-next"><a class="' +
                r +
                'next" href="#">' +
                i.vars.nextText +
                '</a></li></ul>',
            );
            i.customDirectionNav
              ? (i.directionNav = i.customDirectionNav)
              : i.controlsContainer
              ? (e(i.controlsContainer).append(t),
                (i.directionNav = e('.' + r + 'direction-nav li a', i.controlsContainer)))
              : (i.append(t), (i.directionNav = e('.' + r + 'direction-nav li a', i))),
              h.directionNav.update(),
              i.directionNav.bind(d, function (t) {
                var a;
                t.preventDefault(),
                  ('' !== c && c !== t.type) ||
                    ((a = e(this).hasClass(r + 'next') ? i.getTarget('next') : i.getTarget('prev')),
                    i.flexAnimate(a, i.vars.pauseOnAction)),
                  '' === c && (c = t.type),
                  h.setToClearWatchedEvent();
              });
          },
          update: function () {
            var e = r + 'disabled';
            1 === i.pagingCount
              ? i.directionNav.addClass(e).attr('tabindex', '-1')
              : i.vars.animationLoop
              ? i.directionNav.removeClass(e).removeAttr('tabindex')
              : 0 === i.animatingTo
              ? i.directionNav
                  .removeClass(e)
                  .filter('.' + r + 'prev')
                  .addClass(e)
                  .attr('tabindex', '-1')
              : i.animatingTo === i.last
              ? i.directionNav
                  .removeClass(e)
                  .filter('.' + r + 'next')
                  .addClass(e)
                  .attr('tabindex', '-1')
              : i.directionNav.removeClass(e).removeAttr('tabindex');
          },
        },
        pausePlay: {
          setup: function () {
            var t = e('<div aria-live="polite" class="' + r + 'pauseplay"><a href="#"></a></div>');
            i.controlsContainer
              ? (i.controlsContainer.append(t),
                (i.pausePlay = e('.' + r + 'pauseplay a', i.controlsContainer)))
              : (i.append(t), (i.pausePlay = e('.' + r + 'pauseplay a', i))),
              h.pausePlay.update(i.vars.slideshow ? r + 'pause' : r + 'play'),
              i.pausePlay.bind(d, function (t) {
                t.preventDefault(),
                  ('' !== c && c !== t.type) ||
                    (e(this).hasClass(r + 'pause')
                      ? ((i.manualPause = !0), (i.manualPlay = !1), i.pause())
                      : ((i.manualPause = !1), (i.manualPlay = !0), i.play())),
                  '' === c && (c = t.type),
                  h.setToClearWatchedEvent();
              });
          },
          update: function (e) {
            'play' === e
              ? i.pausePlay
                  .removeClass(r + 'pause')
                  .addClass(r + 'play')
                  .html(i.vars.playText)
              : i.pausePlay
                  .removeClass(r + 'play')
                  .addClass(r + 'pause')
                  .html(i.vars.pauseText);
          },
        },
        touch: function () {
          var e,
            t,
            n,
            s,
            r,
            l,
            d,
            c,
            f,
            h = !1,
            g = 0,
            S = 0,
            x = 0;
          if (o) {
            (a.style.msTouchAction = 'none'),
              (a._gesture = new MSGesture()),
              (a._gesture.target = a),
              a.addEventListener(
                'MSPointerDown',
                function (e) {
                  e.stopPropagation(),
                    i.animating
                      ? e.preventDefault()
                      : (i.pause(),
                        a._gesture.addPointer(e.pointerId),
                        (x = 0),
                        (s = u ? i.h : i.w),
                        (l = Number(new Date())),
                        (n =
                          p && v && i.animatingTo === i.last
                            ? 0
                            : p && v
                            ? i.limit - (i.itemW + i.vars.itemMargin) * i.move * i.animatingTo
                            : p && i.currentSlide === i.last
                            ? i.limit
                            : p
                            ? (i.itemW + i.vars.itemMargin) * i.move * i.currentSlide
                            : v
                            ? (i.last - i.currentSlide + i.cloneOffset) * s
                            : (i.currentSlide + i.cloneOffset) * s));
                },
                {
                  passive: !0,
                },
              ),
              (a._slider = i),
              a.addEventListener(
                'MSGestureChange',
                function (e) {
                  e.stopPropagation();
                  var t = e.target._slider;
                  if (!t) return;
                  var i = -e.translationX,
                    o = -e.translationY;
                  if (
                    ((x += u ? o : i),
                    (r = (t.vars.rtl ? -1 : 1) * x),
                    (h = u ? Math.abs(x) < Math.abs(-i) : Math.abs(x) < Math.abs(-o)),
                    e.detail === e.MSGESTURE_FLAG_INERTIA)
                  )
                    return void setImmediate(function () {
                      a._gesture.stop();
                    });
                  (!h || Number(new Date()) - l > 500) &&
                    (e.preventDefault(),
                    !m &&
                      t.transitions &&
                      (t.vars.animationLoop ||
                        (r =
                          x /
                          ((0 === t.currentSlide && x < 0) || (t.currentSlide === t.last && x > 0)
                            ? Math.abs(x) / s + 2
                            : 1)),
                      t.setProps(n + r, 'setTouch')));
                },
                {
                  passive: !0,
                },
              ),
              a.addEventListener(
                'MSGestureEnd',
                function (a) {
                  a.stopPropagation();
                  var i = a.target._slider;
                  if (!i) return;
                  if (i.animatingTo === i.currentSlide && !h && null !== r) {
                    var o = v ? -r : r,
                      d = o > 0 ? i.getTarget('next') : i.getTarget('prev');
                    i.canAdvance(d) &&
                    ((Number(new Date()) - l < 550 && Math.abs(o) > 50) || Math.abs(o) > s / 2)
                      ? i.flexAnimate(d, i.vars.pauseOnAction)
                      : m || i.flexAnimate(i.currentSlide, i.vars.pauseOnAction, !0);
                  }
                  r && h
                    ? i.vars.slideshow && i.play()
                    : r
                    ? (!i.vars.pauseOnAction && i.play()) || (i.vars.slideshow = !1)
                    : (i.vars.slideshow && !i.vars.pauseOnAction && i.play()) ||
                      (i.vars.slideshow = !1);
                  (e = null), (t = null), (r = null), (n = null), (x = 0);
                },
                {
                  passive: !0,
                },
              );
          } else
            (d = function (r) {
              i.animating
                ? r.preventDefault()
                : (window.navigator.msPointerEnabled || 1 === r.touches.length) &&
                  (i.pause(),
                  (s = u ? i.h : i.w),
                  (l = Number(new Date())),
                  (g = r.touches[0].pageX),
                  (S = r.touches[0].pageY),
                  (n =
                    p && v && i.animatingTo === i.last
                      ? 0
                      : p && v
                      ? i.limit - (i.itemW + i.vars.itemMargin) * i.move * i.animatingTo
                      : p && i.currentSlide === i.last
                      ? i.limit
                      : p
                      ? (i.itemW + i.vars.itemMargin) * i.move * i.currentSlide
                      : v
                      ? (i.last - i.currentSlide + i.cloneOffset) * s
                      : (i.currentSlide + i.cloneOffset) * s),
                  (e = u ? S : g),
                  (t = u ? g : S),
                  a.addEventListener('touchmove', c, {
                    passive: !0,
                  }),
                  a.addEventListener('touchend', f, {
                    passive: !0,
                  }));
            }),
              (c = function (a) {
                (g = a.touches[0].pageX),
                  (S = a.touches[0].pageY),
                  (r = u ? e - S : (i.vars.rtl ? -1 : 1) * (e - g));
                (!(h = u ? Math.abs(r) < Math.abs(g - t) : Math.abs(r) < Math.abs(S - t)) ||
                  Number(new Date()) - l > 500) &&
                  (a.preventDefault(),
                  !m &&
                    i.transitions &&
                    (i.vars.animationLoop ||
                      (r /=
                        (0 === i.currentSlide && r < 0) || (i.currentSlide === i.last && r > 0)
                          ? Math.abs(r) / s + 2
                          : 1),
                    i.setProps(n + r, 'setTouch')));
              }),
              (f = function (o) {
                if (
                  (a.removeEventListener('touchmove', c, !1),
                  i.animatingTo === i.currentSlide && !h && null !== r)
                ) {
                  var d = v ? -r : r,
                    u = d > 0 ? i.getTarget('next') : i.getTarget('prev');
                  i.canAdvance(u) &&
                  ((Number(new Date()) - l < 550 && Math.abs(d) > 50) || Math.abs(d) > s / 2)
                    ? i.flexAnimate(u, i.vars.pauseOnAction)
                    : m || i.flexAnimate(i.currentSlide, i.vars.pauseOnAction, !0);
                }
                a.removeEventListener('touchend', f, !1),
                  r && h
                    ? i.vars.slideshow && i.play()
                    : r
                    ? (!i.vars.pauseOnAction && i.play()) || (i.vars.slideshow = !1)
                    : (i.vars.slideshow && !i.vars.pauseOnAction && i.play()) ||
                      (i.vars.slideshow = !1),
                  (e = null),
                  (t = null),
                  (r = null),
                  (n = null);
              }),
              a.addEventListener('touchstart', d, {
                passive: !0,
              });
        },
        resize: function () {
          !i.animating &&
            i.is(':visible') &&
            (p || i.doMath(),
            m
              ? h.smoothHeight()
              : p
              ? (i.slides.width(i.computedW), i.update(i.pagingCount), i.setProps())
              : u
              ? (i.viewport.height(i.h), i.setProps(i.h, 'setTotal'))
              : (i.vars.smoothHeight && h.smoothHeight(),
                i.newSlides.width(i.computedW),
                i.setProps(i.computedW, 'setTotal')));
        },
        smoothHeight: function (e) {
          if (!u || m) {
            var t = m ? i : i.viewport;
            e
              ? t.animate(
                  {
                    height: i.slides.eq(i.animatingTo).innerHeight(),
                  },
                  e,
                )
              : t.innerHeight(i.slides.eq(i.animatingTo).innerHeight());
          }
        },
        sync: function (t) {
          var a = e(i.vars.sync).data('flexslider'),
            n = i.animatingTo;
          switch (t) {
            case 'animate':
              a.flexAnimate(n, i.vars.pauseOnAction, !1, !0);
              break;
            case 'play':
              a.playing || a.asNav || a.play();
              break;
            case 'pause':
              a.pause();
          }
        },
        uniqueID: function (t) {
          return (
            t
              .filter('[id]')
              .add(t.find('[id]'))
              .each(function () {
                var t = e(this);
                t.attr('id', t.attr('id') + '_clone');
              }),
            t
          );
        },
        pauseInvisible: {
          visProp: null,
          init: function () {
            var e = h.pauseInvisible.getHiddenProp();
            if (e) {
              var t = e.replace(/[H|h]idden/, '') + 'visibilitychange';
              document.addEventListener(t, function () {
                h.pauseInvisible.isHidden()
                  ? i.startTimeout
                    ? clearTimeout(i.startTimeout)
                    : i.pause()
                  : i.started
                  ? i.play()
                  : i.vars.initDelay > 0
                  ? setTimeout(i.play, i.vars.initDelay)
                  : i.play();
              });
            }
          },
          isHidden: function () {
            var e = h.pauseInvisible.getHiddenProp();
            return !!e && document[e];
          },
          getHiddenProp: function () {
            var e = ['webkit', 'moz', 'ms', 'o'];
            if ('hidden' in document) return 'hidden';
            for (var t = 0; t < e.length; t++)
              if (e[t] + 'Hidden' in document) return e[t] + 'Hidden';
            return null;
          },
        },
        setToClearWatchedEvent: function () {
          clearTimeout(s),
            (s = setTimeout(function () {
              c = '';
            }, 3e3));
        },
      }),
      (i.flexAnimate = function (t, a, n, s, o) {
        if (
          (i.vars.animationLoop ||
            t === i.currentSlide ||
            (i.direction = t > i.currentSlide ? 'next' : 'prev'),
          f && 1 === i.pagingCount && (i.direction = i.currentItem < t ? 'next' : 'prev'),
          !i.animating && (i.canAdvance(t, o) || n) && i.is(':visible'))
        ) {
          if (f && s) {
            var d = e(i.vars.asNavFor).data('flexslider');
            if (
              ((i.atEnd = 0 === t || t === i.count - 1),
              d.flexAnimate(t, !0, !1, !0, o),
              (i.direction = i.currentItem < t ? 'next' : 'prev'),
              (d.direction = i.direction),
              Math.ceil((t + 1) / i.visible) - 1 === i.currentSlide || 0 === t)
            )
              return (
                (i.currentItem = t),
                i.slides
                  .removeClass(r + 'active-slide')
                  .eq(t)
                  .addClass(r + 'active-slide'),
                i.slides.attr('aria-hidden', 'true').eq(t).removeAttr('aria-hidden'),
                !1
              );
            (i.currentItem = t),
              i.slides
                .removeClass(r + 'active-slide')
                .eq(t)
                .addClass(r + 'active-slide'),
              i.slides.attr('aria-hidden', 'true').eq(t).removeAttr('aria-hidden'),
              (t = Math.floor(t / i.visible));
          }
          if (
            ((i.animating = !0),
            (i.animatingTo = t),
            a && i.pause(),
            i.vars.before(i),
            i.syncExists && !o && h.sync('animate'),
            i.vars.controlNav && h.controlNav.active(),
            p ||
              (i.slides
                .removeClass(r + 'active-slide')
                .eq(t)
                .addClass(r + 'active-slide'),
              i.slides.attr('aria-hidden', 'true').eq(t).removeAttr('aria-hidden')),
            (i.atEnd = 0 === t || t === i.last),
            i.vars.directionNav && h.directionNav.update(),
            t === i.last && (i.vars.end(i), i.vars.animationLoop || i.pause()),
            m)
          )
            l
              ? (i.slides.eq(i.currentSlide).css({
                  opacity: 0,
                  zIndex: 1,
                }),
                i.slides.eq(t).css({
                  opacity: 1,
                  zIndex: 2,
                }),
                i.wrapup(x))
              : (i.slides
                  .eq(i.currentSlide)
                  .css({
                    zIndex: 1,
                  })
                  .animate(
                    {
                      opacity: 0,
                    },
                    i.vars.animationSpeed,
                    i.vars.easing,
                  ),
                i.slides
                  .eq(t)
                  .css({
                    zIndex: 2,
                  })
                  .animate(
                    {
                      opacity: 1,
                    },
                    i.vars.animationSpeed,
                    i.vars.easing,
                    i.wrapup,
                  ));
          else {
            var c,
              g,
              S,
              x = u ? i.slides.filter(':first').height() : i.computedW;
            p
              ? ((c = i.vars.itemMargin),
                (g =
                  (S = (i.itemW + c) * i.move * i.animatingTo) > i.limit && 1 !== i.visible
                    ? i.limit
                    : S))
              : (g =
                  0 === i.currentSlide &&
                  t === i.count - 1 &&
                  i.vars.animationLoop &&
                  'next' !== i.direction
                    ? v
                      ? (i.count + i.cloneOffset) * x
                      : 0
                    : i.currentSlide === i.last &&
                      0 === t &&
                      i.vars.animationLoop &&
                      'prev' !== i.direction
                    ? v
                      ? 0
                      : (i.count + 1) * x
                    : v
                    ? (i.count - 1 - t + i.cloneOffset) * x
                    : (t + i.cloneOffset) * x),
              i.setProps(g, '', i.vars.animationSpeed),
              i.transitions
                ? ((i.vars.animationLoop && i.atEnd) ||
                    ((i.animating = !1), (i.currentSlide = i.animatingTo)),
                  i.container.unbind('webkitTransitionEnd transitionend'),
                  i.container.bind('webkitTransitionEnd transitionend', function () {
                    clearTimeout(i.ensureAnimationEnd), i.wrapup(x);
                  }),
                  clearTimeout(i.ensureAnimationEnd),
                  (i.ensureAnimationEnd = setTimeout(function () {
                    i.wrapup(x);
                  }, i.vars.animationSpeed + 100)))
                : i.container.animate(i.args, i.vars.animationSpeed, i.vars.easing, function () {
                    i.wrapup(x);
                  });
          }
          i.vars.smoothHeight && h.smoothHeight(i.vars.animationSpeed);
        }
      }),
      (i.wrapup = function (e) {
        m ||
          p ||
          (0 === i.currentSlide && i.animatingTo === i.last && i.vars.animationLoop
            ? i.setProps(e, 'jumpEnd')
            : i.currentSlide === i.last &&
              0 === i.animatingTo &&
              i.vars.animationLoop &&
              i.setProps(e, 'jumpStart')),
          (i.animating = !1),
          (i.currentSlide = i.animatingTo),
          i.vars.after(i);
      }),
      (i.animateSlides = function () {
        !i.animating && t && i.flexAnimate(i.getTarget('next'));
      }),
      (i.pause = function () {
        clearInterval(i.animatedSlides),
          (i.animatedSlides = null),
          (i.playing = !1),
          i.vars.pausePlay && h.pausePlay.update('play'),
          i.syncExists && h.sync('pause');
      }),
      (i.play = function () {
        i.playing && clearInterval(i.animatedSlides),
          (i.animatedSlides =
            i.animatedSlides || setInterval(i.animateSlides, i.vars.slideshowSpeed)),
          (i.started = i.playing = !0),
          i.vars.pausePlay && h.pausePlay.update('pause'),
          i.syncExists && h.sync('play');
      }),
      (i.stop = function () {
        i.pause(), (i.stopped = !0);
      }),
      (i.canAdvance = function (e, t) {
        var a = f ? i.pagingCount - 1 : i.last;
        return (
          !!t ||
          !(!f || i.currentItem !== i.count - 1 || 0 !== e || 'prev' !== i.direction) ||
          ((!f || 0 !== i.currentItem || e !== i.pagingCount - 1 || 'next' === i.direction) &&
            !(e === i.currentSlide && !f) &&
            (!!i.vars.animationLoop ||
              ((!i.atEnd || 0 !== i.currentSlide || e !== a || 'next' === i.direction) &&
                (!i.atEnd || i.currentSlide !== a || 0 !== e || 'next' !== i.direction))))
        );
      }),
      (i.getTarget = function (e) {
        return (
          (i.direction = e),
          'next' === e
            ? i.currentSlide === i.last
              ? 0
              : i.currentSlide + 1
            : 0 === i.currentSlide
            ? i.last
            : i.currentSlide - 1
        );
      }),
      (i.setProps = function (e, t, a) {
        var n,
          s =
            ((n = e || (i.itemW + i.vars.itemMargin) * i.move * i.animatingTo),
            (function () {
              if (p)
                return 'setTouch' === t
                  ? e
                  : v && i.animatingTo === i.last
                  ? 0
                  : v
                  ? i.limit - (i.itemW + i.vars.itemMargin) * i.move * i.animatingTo
                  : i.animatingTo === i.last
                  ? i.limit
                  : n;
              switch (t) {
                case 'setTotal':
                  return v
                    ? (i.count - 1 - i.currentSlide + i.cloneOffset) * e
                    : (i.currentSlide + i.cloneOffset) * e;
                case 'setTouch':
                  return e;
                case 'jumpEnd':
                  return v ? e : i.count * e;
                case 'jumpStart':
                  return v ? i.count * e : e;
                default:
                  return e;
              }
            })() *
              (i.vars.rtl ? 1 : -1) +
              'px');
        i.transitions &&
          ((s = i.isFirefox
            ? u
              ? 'translate3d(0,' + s + ',0)'
              : 'translate3d(' + parseInt(s) + 'px,0,0)'
            : u
            ? 'translate3d(0,' + s + ',0)'
            : 'translate3d(' + (i.vars.rtl ? -1 : 1) * parseInt(s) + 'px,0,0)'),
          (a = void 0 !== a ? a / 1e3 + 's' : '0s'),
          i.container.css('-' + i.pfx + '-transition-duration', a),
          i.container.css('transition-duration', a)),
          (i.args[i.prop] = s),
          (i.transitions || void 0 === a) && i.container.css(i.args),
          i.container.css('transform', s);
      }),
      (i.setup = function (t) {
        var a, n;
        m
          ? (i.vars.rtl
              ? i.slides.css({
                  width: '100%',
                  float: 'right',
                  marginLeft: '-100%',
                  position: 'relative',
                })
              : i.slides.css({
                  width: '100%',
                  float: 'left',
                  marginRight: '-100%',
                  position: 'relative',
                }),
            'init' === t &&
              (l
                ? i.slides
                    .css({
                      opacity: 0,
                      display: 'block',
                      webkitTransition: 'opacity ' + i.vars.animationSpeed / 1e3 + 's ease',
                      zIndex: 1,
                    })
                    .eq(i.currentSlide)
                    .css({
                      opacity: 1,
                      zIndex: 2,
                    })
                : 0 == i.vars.fadeFirstSlide
                ? i.slides
                    .css({
                      opacity: 0,
                      display: 'block',
                      zIndex: 1,
                    })
                    .eq(i.currentSlide)
                    .css({
                      zIndex: 2,
                    })
                    .css({
                      opacity: 1,
                    })
                : i.slides
                    .css({
                      opacity: 0,
                      display: 'block',
                      zIndex: 1,
                    })
                    .eq(i.currentSlide)
                    .css({
                      zIndex: 2,
                    })
                    .animate(
                      {
                        opacity: 1,
                      },
                      i.vars.animationSpeed,
                      i.vars.easing,
                    )),
            i.vars.smoothHeight && h.smoothHeight())
          : ('init' === t &&
              ((i.viewport = e('<div class="' + r + 'viewport"></div>')
                .css({
                  overflow: 'hidden',
                  position: 'relative',
                })
                .appendTo(i)
                .append(i.container)),
              (i.cloneCount = 0),
              (i.cloneOffset = 0),
              v &&
                ((n = e.makeArray(i.slides).reverse()),
                (i.slides = e(n)),
                i.container.empty().append(i.slides))),
            i.vars.animationLoop &&
              !p &&
              (i.doMath(),
              i.slides.css({
                width: i.computedW,
                marginRight: i.computedM,
                float: 'left',
                display: 'block',
              }),
              (i.cloneCount = 2),
              (i.cloneOffset = 1),
              'init' !== t && i.container.find('.clone').remove(),
              i.container
                .append(
                  h
                    .uniqueID(i.slides.first().clone().addClass('clone'))
                    .attr('aria-hidden', 'true'),
                )
                .prepend(
                  h.uniqueID(i.slides.last().clone().addClass('clone')).attr('aria-hidden', 'true'),
                )),
            (i.newSlides = e(i.vars.selector, i)),
            (a = v ? i.count - 1 - i.currentSlide + i.cloneOffset : i.currentSlide + i.cloneOffset),
            u && !p
              ? (i.container
                  .height(200 * (i.count + i.cloneCount) + '%')
                  .css('position', 'absolute')
                  .width('100%'),
                setTimeout(
                  function () {
                    i.newSlides.css({
                      display: 'block',
                    }),
                      i.doMath(),
                      i.viewport.height(i.h),
                      i.setProps(a * i.h, 'init');
                  },
                  'init' === t ? 100 : 0,
                ))
              : (i.container.width(200 * (i.count + i.cloneCount) + '%'),
                i.setProps(a * i.computedW, 'init'),
                setTimeout(
                  function () {
                    i.doMath(),
                      i.vars.rtl && i.isFirefox
                        ? i.newSlides.css({
                            width: i.computedW,
                            marginRight: i.computedM,
                            float: 'right',
                            display: 'block',
                          })
                        : i.newSlides.css({
                            width: i.computedW,
                            marginRight: i.computedM,
                            float: 'left',
                            display: 'block',
                          }),
                      i.vars.smoothHeight && h.smoothHeight();
                  },
                  'init' === t ? 100 : 0,
                )));
        p ||
          (i.slides
            .removeClass(r + 'active-slide')
            .eq(i.currentSlide)
            .addClass(r + 'active-slide'),
          i.slides.attr('aria-hidden', 'true').eq(i.currentSlide).removeAttr('aria-hidden')),
          i.vars.init(i),
          i.doMath();
      }),
      (i.doMath = function () {
        var e = i.slides.first(),
          t = i.vars.itemMargin,
          a = i.vars.minItems,
          n = i.vars.maxItems;
        (i.w = void 0 === i.viewport ? i.width() : i.viewport.width()),
          i.isFirefox && (i.w = i.width()),
          (i.h = e.height()),
          (i.boxPadding = e.outerWidth() - e.width()),
          p
            ? ((i.itemT = i.vars.itemWidth + t),
              (i.itemM = t),
              (i.minW = a ? a * i.itemT : i.w),
              (i.maxW = n ? n * i.itemT - t : i.w),
              (i.itemW =
                i.minW > i.w
                  ? (i.w - t * (a - 1)) / a
                  : i.maxW < i.w
                  ? (i.w - t * (n - 1)) / n
                  : i.vars.itemWidth > i.w
                  ? i.w
                  : i.vars.itemWidth),
              (i.itemWPlusMargin = i.itemW + i.itemM),
              (i.visible = Math.floor(i.w / i.itemWPlusMargin)),
              (i.visible = i.visible > 0 ? i.visible : 1),
              (i.move = i.vars.move > 0 && i.vars.move < i.visible ? i.vars.move : i.visible),
              (i.pagingCount = Math.ceil((i.count - i.visible) / i.move + 1)),
              (i.last = i.pagingCount - 1),
              (i.limit =
                1 === i.pagingCount
                  ? 0
                  : i.vars.itemWidth > i.w
                  ? i.itemW * (i.count - 1) + t * (i.count - 1)
                  : (i.itemW + t) * i.count - i.w - t))
            : ((i.itemW = i.w), (i.itemM = t), (i.pagingCount = i.count), (i.last = i.count - 1)),
          (i.computedW = i.itemW - i.boxPadding),
          (i.computedM = i.itemM);
      }),
      (i.update = function (e, t) {
        i.doMath(),
          p ||
            (e < i.currentSlide
              ? (i.currentSlide += 1)
              : e <= i.currentSlide && 0 !== e && (i.currentSlide -= 1),
            (i.animatingTo = i.currentSlide)),
          i.vars.controlNav &&
            !i.manualControls &&
            (('add' === t && !p) || i.pagingCount > i.controlNav.length
              ? h.controlNav.update('add')
              : (('remove' === t && !p) || i.pagingCount < i.controlNav.length) &&
                (p && i.currentSlide > i.last && ((i.currentSlide -= 1), (i.animatingTo -= 1)),
                h.controlNav.update('remove', i.last))),
          i.vars.directionNav && h.directionNav.update();
      }),
      (i.addSlide = function (t, a) {
        var n = e(t);
        (i.count += 1),
          (i.last = i.count - 1),
          u && v
            ? void 0 !== a
              ? i.slides.eq(i.count - a).after(n)
              : i.container.prepend(n)
            : void 0 !== a
            ? i.slides.eq(a).before(n)
            : i.container.append(n),
          i.update(a, 'add'),
          (i.slides = e(i.vars.selector + ':not(.clone)', i)),
          i.setup(),
          i.vars.added(i);
      }),
      (i.removeSlide = function (t) {
        var a = isNaN(t) ? i.slides.index(e(t)) : t;
        (i.count -= 1),
          (i.last = i.count - 1),
          isNaN(t)
            ? e(t, i.slides).remove()
            : u && v
            ? i.slides.eq(i.last).remove()
            : i.slides.eq(t).remove(),
          i.doMath(),
          i.update(a, 'remove'),
          (i.slides = e(i.vars.selector + ':not(.clone)', i)),
          i.setup(),
          i.vars.removed(i);
      }),
      h.init();
  }),
    e(window)
      .blur(function (e) {
        t = !1;
      })
      .focus(function (e) {
        t = !0;
      }),
    (e.flexslider.defaults = {
      namespace: 'flex-',
      selector: '.slides > li',
      animation: 'fade',
      easing: 'swing',
      direction: 'horizontal',
      reverse: !1,
      animationLoop: !0,
      smoothHeight: !1,
      startAt: 0,
      slideshow: !0,
      slideshowSpeed: 7e3,
      animationSpeed: 600,
      initDelay: 0,
      randomize: !1,
      fadeFirstSlide: !0,
      thumbCaptions: !1,
      pauseOnAction: !0,
      pauseOnHover: !1,
      pauseInvisible: !0,
      useCSS: !0,
      touch: !0,
      video: !1,
      controlNav: !0,
      directionNav: !0,
      prevText: 'Previous',
      nextText: 'Next',
      keyboard: !0,
      multipleKeyboard: !1,
      mousewheel: !1,
      pausePlay: !1,
      pauseText: 'Pause',
      playText: 'Play',
      controlsContainer: '',
      manualControls: '',
      customDirectionNav: '',
      sync: '',
      asNavFor: '',
      itemWidth: 0,
      itemMargin: 0,
      minItems: 1,
      maxItems: 0,
      move: 0,
      allowOneSlide: !0,
      isFirefox: !1,
      start: function () {},
      before: function () {},
      after: function () {},
      end: function () {},
      added: function () {},
      removed: function () {},
      init: function () {},
      rtl: !1,
    }),
    (e.fn.flexslider = function (t) {
      if ((void 0 === t && (t = {}), 'object' == typeof t))
        return this.each(function () {
          var a = e(this),
            n = t.selector ? t.selector : '.slides > li',
            i = a.find(n);
          (1 === i.length && !1 === t.allowOneSlide) || 0 === i.length
            ? (i.fadeIn(400), t.start && t.start(a))
            : void 0 === a.data('flexslider') && new e.flexslider(this, t);
        });
      var a = e(this).data('flexslider');
      switch (t) {
        case 'play':
          a.play();
          break;
        case 'pause':
          a.pause();
          break;
        case 'stop':
          a.stop();
          break;
        case 'next':
          a.flexAnimate(a.getTarget('next'), !0);
          break;
        case 'prev':
        case 'previous':
          a.flexAnimate(a.getTarget('prev'), !0);
          break;
        default:
          'number' == typeof t && a.flexAnimate(t, !0);
      }
    });
})(jQuery);
