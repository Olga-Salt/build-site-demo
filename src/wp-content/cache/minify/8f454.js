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
