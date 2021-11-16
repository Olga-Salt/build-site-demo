// Magnific Popup v1.1.0 by Dmitry Semenov
// http://bit.ly/magnific-popup#build=inline+image+ajax+iframe+gallery+retina+imagezoom
(function (a) {
  typeof define == 'function' && define.amd
    ? define(['jquery'], a)
    : typeof exports == 'object'
    ? a(require('jquery'))
    : a(window.jQuery || window.Zepto);
})(function (a) {
  var b = 'Close',
    c = 'BeforeClose',
    d = 'AfterClose',
    e = 'BeforeAppend',
    f = 'MarkupParse',
    g = 'Open',
    h = 'Change',
    i = 'mfp',
    j = '.' + i,
    k = 'mfp-ready',
    l = 'mfp-removing',
    m = 'mfp-prevent-close',
    n,
    o = function () {},
    p = !!window.jQuery,
    q,
    r = a(window),
    s,
    t,
    u,
    v,
    w = function (a, b) {
      n.ev.on(i + a + j, b);
    },
    x = function (b, c, d, e) {
      var f = document.createElement('div');
      return (
        (f.className = 'mfp-' + b),
        d && (f.innerHTML = d),
        e ? c && c.appendChild(f) : ((f = a(f)), c && f.appendTo(c)),
        f
      );
    },
    y = function (b, c) {
      n.ev.triggerHandler(i + b, c),
        n.st.callbacks &&
          ((b = b.charAt(0).toLowerCase() + b.slice(1)),
          n.st.callbacks[b] && n.st.callbacks[b].apply(n, a.isArray(c) ? c : [c]));
    },
    z = function (b) {
      if (b !== v || !n.currTemplate.closeBtn)
        (n.currTemplate.closeBtn = a(n.st.closeMarkup.replace('%title%', n.st.tClose))), (v = b);
      return n.currTemplate.closeBtn;
    },
    A = function () {
      a.magnificPopup.instance || ((n = new o()), n.init(), (a.magnificPopup.instance = n));
    },
    B = function () {
      var a = document.createElement('p').style,
        b = ['ms', 'O', 'Moz', 'Webkit'];
      if (a.transition !== undefined) return !0;
      while (b.length) if (b.pop() + 'Transition' in a) return !0;
      return !1;
    };
  (o.prototype = {
    constructor: o,
    init: function () {
      var b = navigator.appVersion;
      (n.isLowIE = n.isIE8 = document.all && !document.addEventListener),
        (n.isAndroid = /android/gi.test(b)),
        (n.isIOS = /iphone|ipad|ipod/gi.test(b)),
        (n.supportsTransition = B()),
        (n.probablyMobile =
          n.isAndroid ||
          n.isIOS ||
          /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(
            navigator.userAgent,
          )),
        (s = a(document)),
        (n.popupsCache = {});
    },
    open: function (b) {
      var c;
      if (b.isObj === !1) {
        (n.items = b.items.toArray()), (n.index = 0);
        var d = b.items,
          e;
        for (c = 0; c < d.length; c++) {
          (e = d[c]), e.parsed && (e = e.el[0]);
          if (e === b.el[0]) {
            n.index = c;
            break;
          }
        }
      } else (n.items = a.isArray(b.items) ? b.items : [b.items]), (n.index = b.index || 0);
      if (n.isOpen) {
        n.updateItemHTML();
        return;
      }
      (n.types = []),
        (u = ''),
        b.mainEl && b.mainEl.length ? (n.ev = b.mainEl.eq(0)) : (n.ev = s),
        b.key
          ? (n.popupsCache[b.key] || (n.popupsCache[b.key] = {}),
            (n.currTemplate = n.popupsCache[b.key]))
          : (n.currTemplate = {}),
        (n.st = a.extend(!0, {}, a.magnificPopup.defaults, b)),
        (n.fixedContentPos =
          n.st.fixedContentPos === 'auto' ? !n.probablyMobile : n.st.fixedContentPos),
        n.st.modal &&
          ((n.st.closeOnContentClick = !1),
          (n.st.closeOnBgClick = !1),
          (n.st.showCloseBtn = !1),
          (n.st.enableEscapeKey = !1)),
        n.bgOverlay ||
          ((n.bgOverlay = x('bg').on('click' + j, function () {
            n.close();
          })),
          (n.wrap = x('wrap')
            .attr('tabindex', -1)
            .on('click' + j, function (a) {
              n._checkIfClose(a.target) && n.close();
            })),
          (n.container = x('container', n.wrap))),
        (n.contentContainer = x('content')),
        n.st.preloader && (n.preloader = x('preloader', n.container, n.st.tLoading));
      var h = a.magnificPopup.modules;
      for (c = 0; c < h.length; c++) {
        var i = h[c];
        (i = i.charAt(0).toUpperCase() + i.slice(1)), n['init' + i].call(n);
      }
      y('BeforeOpen'),
        n.st.showCloseBtn &&
          (n.st.closeBtnInside
            ? (w(f, function (a, b, c, d) {
                c.close_replaceWith = z(d.type);
              }),
              (u += ' mfp-close-btn-in'))
            : n.wrap.append(z())),
        n.st.alignTop && (u += ' mfp-align-top'),
        n.fixedContentPos
          ? n.wrap.css({
              overflow: n.st.overflowY,
              overflowX: 'hidden',
              overflowY: n.st.overflowY,
            })
          : n.wrap.css({
              top: r.scrollTop(),
              position: 'absolute',
            }),
        (n.st.fixedBgPos === !1 || (n.st.fixedBgPos === 'auto' && !n.fixedContentPos)) &&
          n.bgOverlay.css({
            height: s.height(),
            position: 'absolute',
          }),
        n.st.enableEscapeKey &&
          s.on('keyup' + j, function (a) {
            a.keyCode === 27 && n.close();
          }),
        r.on('resize' + j, function () {
          n.updateSize();
        }),
        n.st.closeOnContentClick || (u += ' mfp-auto-cursor'),
        u && n.wrap.addClass(u);
      var l = (n.wH = r.height()),
        m = {};
      if (n.fixedContentPos && n._hasScrollBar(l)) {
        var o = n._getScrollbarSize();
        o && (m.marginRight = o);
      }
      n.fixedContentPos &&
        (n.isIE7 ? a('body, html').css('overflow', 'hidden') : (m.overflow = 'hidden'));
      var p = n.st.mainClass;
      return (
        n.isIE7 && (p += ' mfp-ie7'),
        p && n._addClassToMFP(p),
        n.updateItemHTML(),
        y('BuildControls'),
        a('html').css(m),
        n.bgOverlay.add(n.wrap).prependTo(n.st.prependTo || a(document.body)),
        (n._lastFocusedEl = document.activeElement),
        setTimeout(function () {
          n.content ? (n._addClassToMFP(k), n._setFocus()) : n.bgOverlay.addClass(k),
            s.on('focusin' + j, n._onFocusIn);
        }, 16),
        (n.isOpen = !0),
        n.updateSize(l),
        y(g),
        b
      );
    },
    close: function () {
      if (!n.isOpen) return;
      y(c),
        (n.isOpen = !1),
        n.st.removalDelay && !n.isLowIE && n.supportsTransition
          ? (n._addClassToMFP(l),
            setTimeout(function () {
              n._close();
            }, n.st.removalDelay))
          : n._close();
    },
    _close: function () {
      y(b);
      var c = l + ' ' + k + ' ';
      n.bgOverlay.detach(),
        n.wrap.detach(),
        n.container.empty(),
        n.st.mainClass && (c += n.st.mainClass + ' '),
        n._removeClassFromMFP(c);
      if (n.fixedContentPos) {
        var e = {
          marginRight: '',
        };
        n.isIE7 ? a('body, html').css('overflow', '') : (e.overflow = ''), a('html').css(e);
      }
      s.off('keyup' + j + ' focusin' + j),
        n.ev.off(j),
        n.wrap.attr('class', 'mfp-wrap').removeAttr('style'),
        n.bgOverlay.attr('class', 'mfp-bg'),
        n.container.attr('class', 'mfp-container'),
        n.st.showCloseBtn &&
          (!n.st.closeBtnInside || n.currTemplate[n.currItem.type] === !0) &&
          n.currTemplate.closeBtn &&
          n.currTemplate.closeBtn.detach(),
        n.st.autoFocusLast && n._lastFocusedEl && a(n._lastFocusedEl).focus(),
        (n.currItem = null),
        (n.content = null),
        (n.currTemplate = null),
        (n.prevHeight = 0),
        y(d);
    },
    updateSize: function (a) {
      if (n.isIOS) {
        var b = document.documentElement.clientWidth / window.innerWidth,
          c = window.innerHeight * b;
        n.wrap.css('height', c), (n.wH = c);
      } else n.wH = a || r.height();
      n.fixedContentPos || n.wrap.css('height', n.wH), y('Resize');
    },
    updateItemHTML: function () {
      var b = n.items[n.index];
      n.contentContainer.detach(),
        n.content && n.content.detach(),
        b.parsed || (b = n.parseEl(n.index));
      var c = b.type;
      y('BeforeChange', [n.currItem ? n.currItem.type : '', c]), (n.currItem = b);
      if (!n.currTemplate[c]) {
        var d = n.st[c] ? n.st[c].markup : !1;
        y('FirstMarkupParse', d), d ? (n.currTemplate[c] = a(d)) : (n.currTemplate[c] = !0);
      }
      t && t !== b.type && n.container.removeClass('mfp-' + t + '-holder');
      var e = n['get' + c.charAt(0).toUpperCase() + c.slice(1)](b, n.currTemplate[c]);
      n.appendContent(e, c),
        (b.preloaded = !0),
        y(h, b),
        (t = b.type),
        n.container.prepend(n.contentContainer),
        y('AfterChange');
    },
    appendContent: function (a, b) {
      (n.content = a),
        a
          ? n.st.showCloseBtn && n.st.closeBtnInside && n.currTemplate[b] === !0
            ? n.content.find('.mfp-close').length || n.content.append(z())
            : (n.content = a)
          : (n.content = ''),
        y(e),
        n.container.addClass('mfp-' + b + '-holder'),
        n.contentContainer.append(n.content);
    },
    parseEl: function (b) {
      var c = n.items[b],
        d;
      c.tagName
        ? (c = {
            el: a(c),
          })
        : ((d = c.type),
          (c = {
            data: c,
            src: c.src,
          }));
      if (c.el) {
        var e = n.types;
        for (var f = 0; f < e.length; f++)
          if (c.el.hasClass('mfp-' + e[f])) {
            d = e[f];
            break;
          }
        (c.src = c.el.attr('data-mfp-src')), c.src || (c.src = c.el.attr('href'));
      }
      return (
        (c.type = d || n.st.type || 'inline'),
        (c.index = b),
        (c.parsed = !0),
        (n.items[b] = c),
        y('ElementParse', c),
        n.items[b]
      );
    },
    addGroup: function (a, b) {
      var c = function (c) {
        (c.mfpEl = this), n._openClick(c, a, b);
      };
      b || (b = {});
      var d = 'click.magnificPopup';
      (b.mainEl = a),
        b.items
          ? ((b.isObj = !0), a.off(d).on(d, c))
          : ((b.isObj = !1),
            b.delegate ? a.off(d).on(d, b.delegate, c) : ((b.items = a), a.off(d).on(d, c)));
    },
    _openClick: function (b, c, d) {
      var e = d.midClick !== undefined ? d.midClick : a.magnificPopup.defaults.midClick;
      if (!e && (b.which === 2 || b.ctrlKey || b.metaKey || b.altKey || b.shiftKey)) return;
      var f = d.disableOn !== undefined ? d.disableOn : a.magnificPopup.defaults.disableOn;
      if (f)
        if (a.isFunction(f)) {
          if (!f.call(n)) return !0;
        } else if (r.width() < f) return !0;
      b.type && (b.preventDefault(), n.isOpen && b.stopPropagation()),
        (d.el = a(b.mfpEl)),
        d.delegate && (d.items = c.find(d.delegate)),
        n.open(d);
    },
    updateStatus: function (a, b) {
      if (n.preloader) {
        q !== a && n.container.removeClass('mfp-s-' + q),
          !b && a === 'loading' && (b = n.st.tLoading);
        var c = {
          status: a,
          text: b,
        };
        y('UpdateStatus', c),
          (a = c.status),
          (b = c.text),
          n.preloader.html(b),
          n.preloader.find('a').on('click', function (a) {
            a.stopImmediatePropagation();
          }),
          n.container.addClass('mfp-s-' + a),
          (q = a);
      }
    },
    _checkIfClose: function (b) {
      if (a(b).hasClass(m)) return;
      var c = n.st.closeOnContentClick,
        d = n.st.closeOnBgClick;
      if (c && d) return !0;
      if (!n.content || a(b).hasClass('mfp-close') || (n.preloader && b === n.preloader[0]))
        return !0;
      if (b !== n.content[0] && !a.contains(n.content[0], b)) {
        if (d && a.contains(document, b)) return !0;
      } else if (c) return !0;
      return !1;
    },
    _addClassToMFP: function (a) {
      n.bgOverlay.addClass(a), n.wrap.addClass(a);
    },
    _removeClassFromMFP: function (a) {
      this.bgOverlay.removeClass(a), n.wrap.removeClass(a);
    },
    _hasScrollBar: function (a) {
      return (n.isIE7 ? s.height() : document.body.scrollHeight) > (a || r.height());
    },
    _setFocus: function () {
      (n.st.focus ? n.content.find(n.st.focus).eq(0) : n.wrap).focus();
    },
    _onFocusIn: function (b) {
      if (b.target !== n.wrap[0] && !a.contains(n.wrap[0], b.target)) return n._setFocus(), !1;
    },
    _parseMarkup: function (b, c, d) {
      var e;
      d.data && (c = a.extend(d.data, c)),
        y(f, [b, c, d]),
        a.each(c, function (c, d) {
          if (d === undefined || d === !1) return !0;
          e = c.split('_');
          if (e.length > 1) {
            var f = b.find(j + '-' + e[0]);
            if (f.length > 0) {
              var g = e[1];
              g === 'replaceWith'
                ? f[0] !== d[0] && f.replaceWith(d)
                : g === 'img'
                ? f.is('img')
                  ? f.attr('src', d)
                  : f.replaceWith(a('<img>').attr('src', d).attr('class', f.attr('class')))
                : f.attr(e[1], d);
            }
          } else b.find(j + '-' + c).html(d);
        });
    },
    _getScrollbarSize: function () {
      if (n.scrollbarSize === undefined) {
        var a = document.createElement('div');
        (a.style.cssText =
          'width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;'),
          document.body.appendChild(a),
          (n.scrollbarSize = a.offsetWidth - a.clientWidth),
          document.body.removeChild(a);
      }
      return n.scrollbarSize;
    },
  }),
    (a.magnificPopup = {
      instance: null,
      proto: o.prototype,
      modules: [],
      open: function (b, c) {
        return (
          A(),
          b ? (b = a.extend(!0, {}, b)) : (b = {}),
          (b.isObj = !0),
          (b.index = c || 0),
          this.instance.open(b)
        );
      },
      close: function () {
        return a.magnificPopup.instance && a.magnificPopup.instance.close();
      },
      registerModule: function (b, c) {
        c.options && (a.magnificPopup.defaults[b] = c.options),
          a.extend(this.proto, c.proto),
          this.modules.push(b);
      },
      defaults: {
        disableOn: 0,
        key: null,
        midClick: !1,
        mainClass: '',
        preloader: !0,
        focus: '',
        closeOnContentClick: !1,
        closeOnBgClick: !0,
        closeBtnInside: !0,
        showCloseBtn: !0,
        enableEscapeKey: !0,
        modal: !1,
        alignTop: !1,
        removalDelay: 0,
        prependTo: null,
        fixedContentPos: 'auto',
        fixedBgPos: 'auto',
        overflowY: 'auto',
        closeMarkup: '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
        tClose: 'Close (Esc)',
        tLoading: 'Loading...',
        autoFocusLast: !0,
      },
    }),
    (a.fn.magnificPopup = function (b) {
      A();
      var c = a(this);
      if (typeof b == 'string')
        if (b === 'open') {
          var d,
            e = p ? c.data('magnificPopup') : c[0].magnificPopup,
            f = parseInt(arguments[1], 10) || 0;
          e.items
            ? (d = e.items[f])
            : ((d = c), e.delegate && (d = d.find(e.delegate)), (d = d.eq(f))),
            n._openClick(
              {
                mfpEl: d,
              },
              c,
              e,
            );
        } else n.isOpen && n[b].apply(n, Array.prototype.slice.call(arguments, 1));
      else
        (b = a.extend(!0, {}, b)),
          p ? c.data('magnificPopup', b) : (c[0].magnificPopup = b),
          n.addGroup(c, b);
      return c;
    });
  var C = 'inline',
    D,
    E,
    F,
    G = function () {
      F && (E.after(F.addClass(D)).detach(), (F = null));
    };
  a.magnificPopup.registerModule(C, {
    options: {
      hiddenClass: 'hide',
      markup: '',
      tNotFound: 'Content not found',
    },
    proto: {
      initInline: function () {
        n.types.push(C),
          w(b + '.' + C, function () {
            G();
          });
      },
      getInline: function (b, c) {
        G();
        if (b.src) {
          var d = n.st.inline,
            e = a(b.src);
          if (e.length) {
            var f = e[0].parentNode;
            f &&
              f.tagName &&
              (E || ((D = d.hiddenClass), (E = x(D)), (D = 'mfp-' + D)),
              (F = e.after(E).detach().removeClass(D))),
              n.updateStatus('ready');
          } else n.updateStatus('error', d.tNotFound), (e = a('<div>'));
          return (b.inlineElement = e), e;
        }
        return n.updateStatus('ready'), n._parseMarkup(c, {}, b), c;
      },
    },
  });
  var H = 'ajax',
    I,
    J = function () {
      I && a(document.body).removeClass(I);
    },
    K = function () {
      J(), n.req && n.req.abort();
    };
  a.magnificPopup.registerModule(H, {
    options: {
      settings: null,
      cursor: 'mfp-ajax-cur',
      tError: '<a href="%url%">The content</a> could not be loaded.',
    },
    proto: {
      initAjax: function () {
        n.types.push(H), (I = n.st.ajax.cursor), w(b + '.' + H, K), w('BeforeChange.' + H, K);
      },
      getAjax: function (b) {
        I && a(document.body).addClass(I), n.updateStatus('loading');
        var c = a.extend(
          {
            url: b.src,
            success: function (c, d, e) {
              var f = {
                data: c,
                xhr: e,
              };
              y('ParseAjax', f),
                n.appendContent(a(f.data), H),
                (b.finished = !0),
                J(),
                n._setFocus(),
                setTimeout(function () {
                  n.wrap.addClass(k);
                }, 16),
                n.updateStatus('ready'),
                y('AjaxContentAdded');
            },
            error: function () {
              J(),
                (b.finished = b.loadError = !0),
                n.updateStatus('error', n.st.ajax.tError.replace('%url%', b.src));
            },
          },
          n.st.ajax.settings,
        );
        return (n.req = a.ajax(c)), '';
      },
    },
  });
  var L,
    M = function (b) {
      if (b.data && b.data.title !== undefined) return b.data.title;
      var c = n.st.image.titleSrc;
      if (c) {
        if (a.isFunction(c)) return c.call(n, b);
        if (b.el) return b.el.attr(c) || '';
      }
      return '';
    };
  a.magnificPopup.registerModule('image', {
    options: {
      markup:
        '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
      cursor: 'mfp-zoom-out-cur',
      titleSrc: 'title',
      verticalFit: !0,
      tError: '<a href="%url%">The image</a> could not be loaded.',
    },
    proto: {
      initImage: function () {
        var c = n.st.image,
          d = '.image';
        n.types.push('image'),
          w(g + d, function () {
            n.currItem.type === 'image' && c.cursor && a(document.body).addClass(c.cursor);
          }),
          w(b + d, function () {
            c.cursor && a(document.body).removeClass(c.cursor), r.off('resize' + j);
          }),
          w('Resize' + d, n.resizeImage),
          n.isLowIE && w('AfterChange', n.resizeImage);
      },
      resizeImage: function () {
        var a = n.currItem;
        if (!a || !a.img) return;
        if (n.st.image.verticalFit) {
          var b = 0;
          n.isLowIE &&
            (b =
              parseInt(a.img.css('padding-top'), 10) + parseInt(a.img.css('padding-bottom'), 10)),
            a.img.css('max-height', n.wH - b);
        }
      },
      _onImageHasSize: function (a) {
        a.img &&
          ((a.hasSize = !0),
          L && clearInterval(L),
          (a.isCheckingImgSize = !1),
          y('ImageHasSize', a),
          a.imgHidden && (n.content && n.content.removeClass('mfp-loading'), (a.imgHidden = !1)));
      },
      findImageSize: function (a) {
        var b = 0,
          c = a.img[0],
          d = function (e) {
            L && clearInterval(L),
              (L = setInterval(function () {
                if (c.naturalWidth > 0) {
                  n._onImageHasSize(a);
                  return;
                }
                b > 200 && clearInterval(L),
                  b++,
                  b === 3 ? d(10) : b === 40 ? d(50) : b === 100 && d(500);
              }, e));
          };
        d(1);
      },
      getImage: function (b, c) {
        var d = 0,
          e = function () {
            b &&
              (b.img[0].complete
                ? (b.img.off('.mfploader'),
                  b === n.currItem && (n._onImageHasSize(b), n.updateStatus('ready')),
                  (b.hasSize = !0),
                  (b.loaded = !0),
                  y('ImageLoadComplete'))
                : (d++, d < 200 ? setTimeout(e, 100) : f()));
          },
          f = function () {
            b &&
              (b.img.off('.mfploader'),
              b === n.currItem &&
                (n._onImageHasSize(b), n.updateStatus('error', g.tError.replace('%url%', b.src))),
              (b.hasSize = !0),
              (b.loaded = !0),
              (b.loadError = !0));
          },
          g = n.st.image,
          h = c.find('.mfp-img');
        if (h.length) {
          var i = document.createElement('img');
          (i.className = 'mfp-img'),
            b.el && b.el.find('img').length && (i.alt = b.el.find('img').attr('alt')),
            (b.img = a(i).on('load.mfploader', e).on('error.mfploader', f)),
            (i.src = b.src),
            h.is('img') && (b.img = b.img.clone()),
            (i = b.img[0]),
            i.naturalWidth > 0 ? (b.hasSize = !0) : i.width || (b.hasSize = !1);
        }
        return (
          n._parseMarkup(
            c,
            {
              title: M(b),
              img_replaceWith: b.img,
            },
            b,
          ),
          n.resizeImage(),
          b.hasSize
            ? (L && clearInterval(L),
              b.loadError
                ? (c.addClass('mfp-loading'),
                  n.updateStatus('error', g.tError.replace('%url%', b.src)))
                : (c.removeClass('mfp-loading'), n.updateStatus('ready')),
              c)
            : (n.updateStatus('loading'),
              (b.loading = !0),
              b.hasSize || ((b.imgHidden = !0), c.addClass('mfp-loading'), n.findImageSize(b)),
              c)
        );
      },
    },
  });
  var N,
    O = function () {
      return (
        N === undefined && (N = document.createElement('p').style.MozTransform !== undefined), N
      );
    };
  a.magnificPopup.registerModule('zoom', {
    options: {
      enabled: !1,
      easing: 'ease-in-out',
      duration: 300,
      opener: function (a) {
        return a.is('img') ? a : a.find('img');
      },
    },
    proto: {
      initZoom: function () {
        var a = n.st.zoom,
          d = '.zoom',
          e;
        if (!a.enabled || !n.supportsTransition) return;
        var f = a.duration,
          g = function (b) {
            var c = b
                .clone()
                .removeAttr('style')
                .removeAttr('class')
                .addClass('mfp-animated-image'),
              d = 'all ' + a.duration / 1e3 + 's ' + a.easing,
              e = {
                position: 'fixed',
                zIndex: 9999,
                left: 0,
                top: 0,
                '-webkit-backface-visibility': 'hidden',
              },
              f = 'transition';
            return (e['-webkit-' + f] = e['-moz-' + f] = e['-o-' + f] = e[f] = d), c.css(e), c;
          },
          h = function () {
            n.content.css('visibility', 'visible');
          },
          i,
          j;
        w('BuildControls' + d, function () {
          if (n._allowZoom()) {
            clearTimeout(i), n.content.css('visibility', 'hidden'), (e = n._getItemToZoom());
            if (!e) {
              h();
              return;
            }
            (j = g(e)),
              j.css(n._getOffset()),
              n.wrap.append(j),
              (i = setTimeout(function () {
                j.css(n._getOffset(!0)),
                  (i = setTimeout(function () {
                    h(),
                      setTimeout(function () {
                        j.remove(), (e = j = null), y('ZoomAnimationEnded');
                      }, 16);
                  }, f));
              }, 16));
          }
        }),
          w(c + d, function () {
            if (n._allowZoom()) {
              clearTimeout(i), (n.st.removalDelay = f);
              if (!e) {
                e = n._getItemToZoom();
                if (!e) return;
                j = g(e);
              }
              j.css(n._getOffset(!0)),
                n.wrap.append(j),
                n.content.css('visibility', 'hidden'),
                setTimeout(function () {
                  j.css(n._getOffset());
                }, 16);
            }
          }),
          w(b + d, function () {
            n._allowZoom() && (h(), j && j.remove(), (e = null));
          });
      },
      _allowZoom: function () {
        return n.currItem.type === 'image';
      },
      _getItemToZoom: function () {
        return n.currItem.hasSize ? n.currItem.img : !1;
      },
      _getOffset: function (b) {
        var c;
        b ? (c = n.currItem.img) : (c = n.st.zoom.opener(n.currItem.el || n.currItem));
        var d = c.offset(),
          e = parseInt(c.css('padding-top'), 10),
          f = parseInt(c.css('padding-bottom'), 10);
        d.top -= a(window).scrollTop() - e;
        var g = {
          width: c.width(),
          height: (p ? c.innerHeight() : c[0].offsetHeight) - f - e,
        };
        return (
          O()
            ? (g['-moz-transform'] = g.transform = 'translate(' + d.left + 'px,' + d.top + 'px)')
            : ((g.left = d.left), (g.top = d.top)),
          g
        );
      },
    },
  });
  var P = 'iframe',
    Q = '//about:blank',
    R = function (a) {
      if (n.currTemplate[P]) {
        var b = n.currTemplate[P].find('iframe');
        b.length && (a || (b[0].src = Q), n.isIE8 && b.css('display', a ? 'block' : 'none'));
      }
    };
  a.magnificPopup.registerModule(P, {
    options: {
      markup:
        '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
      srcAction: 'iframe_src',
      patterns: {
        youtube: {
          index: 'youtube.com',
          id: 'v=',
          src: '//www.youtube.com/embed/%id%?autoplay=1',
        },
        vimeo: {
          index: 'vimeo.com/',
          id: '/',
          src: '//player.vimeo.com/video/%id%?autoplay=1',
        },
        gmaps: {
          index: '//maps.google.',
          src: '%id%&output=embed',
        },
      },
    },
    proto: {
      initIframe: function () {
        n.types.push(P),
          w('BeforeChange', function (a, b, c) {
            b !== c && (b === P ? R() : c === P && R(!0));
          }),
          w(b + '.' + P, function () {
            R();
          });
      },
      getIframe: function (b, c) {
        var d = b.src,
          e = n.st.iframe;
        a.each(e.patterns, function () {
          if (d.indexOf(this.index) > -1)
            return (
              this.id &&
                (typeof this.id == 'string'
                  ? (d = d.substr(d.lastIndexOf(this.id) + this.id.length, d.length))
                  : (d = this.id.call(this, d))),
              (d = this.src.replace('%id%', d)),
              !1
            );
        });
        var f = {};
        return (
          e.srcAction && (f[e.srcAction] = d), n._parseMarkup(c, f, b), n.updateStatus('ready'), c
        );
      },
    },
  });
  var S = function (a) {
      var b = n.items.length;
      return a > b - 1 ? a - b : a < 0 ? b + a : a;
    },
    T = function (a, b, c) {
      return a.replace(/%curr%/gi, b + 1).replace(/%total%/gi, c);
    };
  a.magnificPopup.registerModule('gallery', {
    options: {
      enabled: !1,
      arrowMarkup:
        '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
      preload: [0, 2],
      navigateByImgClick: !0,
      arrows: !0,
      tPrev: 'Previous (Left arrow key)',
      tNext: 'Next (Right arrow key)',
      tCounter: '%curr% of %total%',
    },
    proto: {
      initGallery: function () {
        var c = n.st.gallery,
          d = '.mfp-gallery';
        n.direction = !0;
        if (!c || !c.enabled) return !1;
        (u += ' mfp-gallery'),
          w(g + d, function () {
            c.navigateByImgClick &&
              n.wrap.on('click' + d, '.mfp-img', function () {
                if (n.items.length > 1) return n.next(), !1;
              }),
              s.on('keydown' + d, function (a) {
                a.keyCode === 37 ? n.prev() : a.keyCode === 39 && n.next();
              });
          }),
          w('UpdateStatus' + d, function (a, b) {
            b.text && (b.text = T(b.text, n.currItem.index, n.items.length));
          }),
          w(f + d, function (a, b, d, e) {
            var f = n.items.length;
            d.counter = f > 1 ? T(c.tCounter, e.index, f) : '';
          }),
          w('BuildControls' + d, function () {
            if (n.items.length > 1 && c.arrows && !n.arrowLeft) {
              var b = c.arrowMarkup,
                d = (n.arrowLeft = a(
                  b.replace(/%title%/gi, c.tPrev).replace(/%dir%/gi, 'left'),
                ).addClass(m)),
                e = (n.arrowRight = a(
                  b.replace(/%title%/gi, c.tNext).replace(/%dir%/gi, 'right'),
                ).addClass(m));
              d.click(function () {
                n.prev();
              }),
                e.click(function () {
                  n.next();
                }),
                n.container.append(d.add(e));
            }
          }),
          w(h + d, function () {
            n._preloadTimeout && clearTimeout(n._preloadTimeout),
              (n._preloadTimeout = setTimeout(function () {
                n.preloadNearbyImages(), (n._preloadTimeout = null);
              }, 16));
          }),
          w(b + d, function () {
            s.off(d), n.wrap.off('click' + d), (n.arrowRight = n.arrowLeft = null);
          });
      },
      next: function () {
        (n.direction = !0), (n.index = S(n.index + 1)), n.updateItemHTML();
      },
      prev: function () {
        (n.direction = !1), (n.index = S(n.index - 1)), n.updateItemHTML();
      },
      goTo: function (a) {
        (n.direction = a >= n.index), (n.index = a), n.updateItemHTML();
      },
      preloadNearbyImages: function () {
        var a = n.st.gallery.preload,
          b = Math.min(a[0], n.items.length),
          c = Math.min(a[1], n.items.length),
          d;
        for (d = 1; d <= (n.direction ? c : b); d++) n._preloadItem(n.index + d);
        for (d = 1; d <= (n.direction ? b : c); d++) n._preloadItem(n.index - d);
      },
      _preloadItem: function (b) {
        b = S(b);
        if (n.items[b].preloaded) return;
        var c = n.items[b];
        c.parsed || (c = n.parseEl(b)),
          y('LazyLoad', c),
          c.type === 'image' &&
            (c.img = a('<img class="mfp-img" />')
              .on('load.mfploader', function () {
                c.hasSize = !0;
              })
              .on('error.mfploader', function () {
                (c.hasSize = !0), (c.loadError = !0), y('LazyLoadError', c);
              })
              .attr('src', c.src)),
          (c.preloaded = !0);
      },
    },
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
