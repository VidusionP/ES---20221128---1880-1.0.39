(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[10],{

/***/ "./assets/js/theme/halothemes/haloAddOptionForProductCard.js":
/*!*******************************************************************!*\
  !*** ./assets/js/theme/halothemes/haloAddOptionForProductCard.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");

var fetch = __webpack_require__(/*! node-fetch */ "./node_modules/node-fetch/browser.js");
/* harmony default export */ __webpack_exports__["default"] = (function (context, wrapper) {
  if (context.themeSettings.haloAddOptionForProduct == true) {
    var callProductOption = function callProductOption() {
      product_class.each(function (index, element) {
        var productId = $(element).data("product-id");
        list.push(productId.toString());
      });
      if (list.length > 0) {
        getProductOption(list).then(function (data) {
          renderOption(data);
          $.each(list, function (idx, item) {
            var arr = {},
              productId = list[idx];
            product_wrapper.find('.card-option-' + productId + ' .form-option-swatch').each(function (index, element) {
              var txt = $(element).data('product-swatch-value');
              if (arr[txt]) {
                $(element).remove();
              } else {
                arr[txt] = true;
              }
            });
            if (product_wrapper.find('.card-option-' + productId + ' .form-option-swatch').length > 4) {
              var countMoreOption = product_wrapper.find('.card-option-' + productId + ' .form-option-swatch').length - 4,
                productLink = product_wrapper.find('[data-product-id="' + productId + '"]').find('.card-link').attr('href');
              product_wrapper.find('.card-option-' + productId + ' .form-option-swatch').each(function (index, element) {
                if (index >= 4) {
                  $(element).remove();
                }
              });
              if (product_wrapper.find('.card-option-' + productId + ' .form-field .showmore').length < 1) {
                product_wrapper.find('.card-option-' + productId + ' .form-field:not(.form-field--size)').append('<a href="' + productLink + '" class="showmore">+' + countMoreOption + '</a>');
              }
            }
          });
        });
      }
    };
    var getProductOption = function getProductOption(list) {
      return fetch('/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
          query: "\n                    query SeveralProductsByID {\n                      site {\n                        products(entityIds: [" + list + "], first: 50) {\n                          edges {\n                            node {\n                              entityId\n                              name\n                               productOptions(first: 50) {\n                                edges {\n                                  node {\n                                    entityId\n                                    displayName\n                                    isRequired\n                                    ... on MultipleChoiceOption {\n                                      displayStyle\n                                      values {\n                                        edges {\n                                          node {\n                                            entityId\n                                            label\n                                            isDefault\n                                            ... on SwatchOptionValue {\n                                              hexColors\n                                              imageUrl(width: 50)\n                                            }\n                                          }\n                                        }\n                                      }\n                                    }\n                                  }\n                                }\n                              }\n                            }\n                          }\n                        }\n                      }\n                    }\n                  "
        })
      }).then(function (res) {
        return res.json();
      }).then(function (res) {
        return res.data;
      });
    };
    var renderOption = function renderOption(data) {
      var aFilter = data.site.products.edges;
      $.each(aFilter, function (index, element) {
        var productId = aFilter[index].node.entityId,
          productFieldColor = product_wrapper.find('.card-option-' + productId + ' .form-field:not(.form-field--size)'),
          productFieldSize = product_wrapper.find('.card-option-' + productId + ' .form-field--size'),
          aFilter2 = aFilter[index].node.productOptions.edges;
        var aFilter3 = aFilter2.filter(function (item) {
          return item.node.displayStyle === 'Swatch';
        });
        var aFilter5 = aFilter2.filter(function (item) {
          return item.node.displayName === context.themeSettings.haloAddOptionForProduct2;
        });
        if (aFilter3.length > 0) {
          var aFilter4 = aFilter3[0].node.values.edges;
          $.each(aFilter4, function (idx, element) {
            var titleVar = aFilter4[idx].node.label,
              idVar = aFilter4[idx].node.entityId,
              lengthColorVar = aFilter4[idx].node.hexColors.length,
              color1 = aFilter4[idx].node.hexColors[0],
              color2 = aFilter4[idx].node.hexColors[1],
              color3 = aFilter4[idx].node.hexColors[2],
              img = aFilter4[idx].node.imageUrl;
            if (lengthColorVar == 2) {
              productFieldColor.append('<label class="form-option form-option-swatch" data-product-swatch-value="' + idVar + '"><span class="form-option-tooltip">' + titleVar + '</span><span class="form-option-variant form-option-variant--color form-option-variant--color2" title="' + titleVar + '"><span style="background-color:' + color1 + '"></span><span style="background-color:' + color2 + '"></span></span></label>');
            } else if (lengthColorVar === 3) {
              productFieldColor.append('<label class="form-option form-option-swatch" data-product-swatch-value="' + idVar + '"><span class="form-option-tooltip">' + titleVar + '</span><span class="form-option-variant form-option-variant--color form-option-variant--color2" title="' + titleVar + '"><span style="background-color:' + color1 + '"></span><span style="background-color:' + color2 + '"></span><span style="background-color:' + color3 + '"></span></span></label>');
            } else if (Boolean(color1)) {
              productFieldColor.append('<label class="form-option form-option-swatch" data-product-swatch-value="' + idVar + '"><span class="form-option-tooltip">' + titleVar + '</span><span class="form-option-variant form-option-variant--color" title="' + titleVar + '" style="background-color: ' + color1 + '"></span></label>');
            } else if (Boolean(img)) {
              productFieldColor.append('<label class="form-option form-option-swatch" data-product-swatch-value="' + idVar + '"><span class="form-option-tooltip">' + titleVar + '</span><span class="form-option-variant form-option-variant--pattern" title="' + titleVar + '" style="background-image: url(' + img + ')"></span></label>');
            }
          });
        } else {
          productFieldColor.remove();
        }
        if (aFilter5.length > 0) {
          if (productFieldSize.length < 1) {
            product_wrapper.find('.card-option-' + productId + '').append('<div class="form-field form-field--size"><label class="form-option">' + context.themeSettings.haloAddOptionForProductText.toString() + '</label></div>');
          }
        }
        if (aFilter5.length == 0 && aFilter3.length == 0) {
          product_wrapper.find('.card-option-' + productId + '').remove();
        }
      });
    };
    var token = context.token,
      product_wrapper = $('#' + wrapper),
      product_class = product_wrapper.find('.card');
    var list = [];
    callProductOption();
  }
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/halothemes/parallax/jquery.parallax-scroll.min.js":
/*!***************************************************************************!*\
  !*** ./assets/js/theme/halothemes/parallax/jquery.parallax-scroll.min.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {$(function () {
  ParallaxScroll.init();
});
var ParallaxScroll = {
  showLogs: !1,
  round: 1e3,
  init: function init() {
    return this._log("init"), this._inited ? (this._log("Already Inited"), void (this._inited = !0)) : (this._requestAnimationFrame = function () {
      return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (a, b) {
        window.setTimeout(a, 1e3 / 60);
      };
    }(), void this._onScroll(!0));
  },
  _inited: !1,
  _properties: ["x", "y", "z", "rotateX", "rotateY", "rotateZ", "scaleX", "scaleY", "scaleZ", "scale"],
  _requestAnimationFrame: null,
  _log: function _log(a) {
    this.showLogs && console.log("Parallax Scroll / " + a);
  },
  _onScroll: function _onScroll(a) {
    var b = $(document).scrollTop(),
      c = $(window).height();
    this._log("onScroll " + b), $("[data-parallax]").each($.proxy(function (d, e) {
      var f = $(e),
        g = [],
        h = !1,
        i = f.data("style");
      void 0 == i && (i = f.attr("style") || "", f.data("style", i));
      var k,
        j = [f.data("parallax")];
      for (k = 2; f.data("parallax" + k); k++) {
        j.push(f.data("parallax-" + k));
      }
      var l = j.length;
      for (k = 0; k < l; k++) {
        var m = j[k],
          n = m["from-scroll"];
        void 0 == n && (n = Math.max(0, $(e).offset().top - c)), n = 0 | n;
        var o = m.distance,
          p = m["to-scroll"];
        void 0 == o && void 0 == p && (o = c), o = Math.max(0 | o, 1);
        var q = m.easing,
          r = m["easing-return"];
        if (void 0 != q && $.easing && $.easing[q] || (q = null), void 0 != r && $.easing && $.easing[r] || (r = q), q) {
          var s = m.duration;
          void 0 == s && (s = o), s = Math.max(0 | s, 1);
          var t = m["duration-return"];
          void 0 == t && (t = s), o = 1;
          var u = f.data("current-time");
          void 0 == u && (u = 0);
        }
        void 0 == p && (p = n + o), p = 0 | p;
        var v = m.smoothness;
        void 0 == v && (v = 30), v = 0 | v, (a || 0 == v) && (v = 1), v = 0 | v;
        var w = b;
        w = Math.max(w, n), w = Math.min(w, p), q && (void 0 == f.data("sens") && f.data("sens", "back"), w > n && ("back" == f.data("sens") ? (u = 1, f.data("sens", "go")) : u++), w < p && ("go" == f.data("sens") ? (u = 1, f.data("sens", "back")) : u++), a && (u = s), f.data("current-time", u)), this._properties.map($.proxy(function (a) {
          var b = 0,
            c = m[a];
          if (void 0 != c) {
            "scale" == a || "scaleX" == a || "scaleY" == a || "scaleZ" == a ? b = 1 : c = 0 | c;
            var d = f.data("_" + a);
            void 0 == d && (d = b);
            var e = (c - b) * ((w - n) / (p - n)) + b,
              i = d + (e - d) / v;
            if (q && u > 0 && u <= s) {
              var j = b;
              "back" == f.data("sens") && (j = c, c = -c, q = r, s = t), i = $.easing[q](null, u, j, c, s);
            }
            i = Math.ceil(i * this.round) / this.round, i == d && e == c && (i = c), g[a] || (g[a] = 0), g[a] += i, d != g[a] && (f.data("_" + a, g[a]), h = !0);
          }
        }, this));
      }
      if (h) {
        if (void 0 != g.z) {
          var x = m.perspective;
          void 0 == x && (x = 800);
          var y = f.parent();
          y.data("style") || y.data("style", y.attr("style") || ""), y.attr("style", "perspective:" + x + "px; -webkit-perspective:" + x + "px; " + y.data("style"));
        }
        void 0 == g.scaleX && (g.scaleX = 1), void 0 == g.scaleY && (g.scaleY = 1), void 0 == g.scaleZ && (g.scaleZ = 1), void 0 != g.scale && (g.scaleX *= g.scale, g.scaleY *= g.scale, g.scaleZ *= g.scale);
        var z = "translate3d(" + (g.x ? g.x : 0) + "px, " + (g.y ? g.y : 0) + "px, " + (g.z ? g.z : 0) + "px)",
          A = "rotateX(" + (g.rotateX ? g.rotateX : 0) + "deg) rotateY(" + (g.rotateY ? g.rotateY : 0) + "deg) rotateZ(" + (g.rotateZ ? g.rotateZ : 0) + "deg)",
          B = "scaleX(" + g.scaleX + ") scaleY(" + g.scaleY + ") scaleZ(" + g.scaleZ + ")",
          C = z + " " + A + " " + B + ";";
        this._log(C), f.attr("style", "transform:" + C + " -webkit-transform:" + C + " " + i);
      }
    }, this)), window.requestAnimationFrame ? window.requestAnimationFrame($.proxy(this._onScroll, this, !1)) : this._requestAnimationFrame($.proxy(this._onScroll, this, !1));
  }
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/home.js":
/*!*********************************!*\
  !*** ./assets/js/theme/home.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Home; });
/* harmony import */ var foundation_sites_js_foundation_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! foundation-sites/js/foundation/foundation */ "./node_modules/foundation-sites/js/foundation/foundation.js");
/* harmony import */ var foundation_sites_js_foundation_foundation__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(foundation_sites_js_foundation_foundation__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var foundation_sites_js_foundation_foundation_dropdown__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! foundation-sites/js/foundation/foundation.dropdown */ "./node_modules/foundation-sites/js/foundation/foundation.dropdown.js");
/* harmony import */ var foundation_sites_js_foundation_foundation_dropdown__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(foundation_sites_js_foundation_foundation_dropdown__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _halothemes_jquery_fancybox_min__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./halothemes/jquery.fancybox.min */ "./assets/js/theme/halothemes/jquery.fancybox.min.js");
/* harmony import */ var _halothemes_jquery_fancybox_min__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_halothemes_jquery_fancybox_min__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./page-manager */ "./assets/js/theme/page-manager.js");
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _halothemes_haloAddOptionForProductCard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./halothemes/haloAddOptionForProductCard */ "./assets/js/theme/halothemes/haloAddOptionForProductCard.js");
/* harmony import */ var _halothemes_parallax_jquery_parallax_scroll_min__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./halothemes/parallax/jquery.parallax-scroll.min */ "./assets/js/theme/halothemes/parallax/jquery.parallax-scroll.min.js");
/* harmony import */ var _halothemes_parallax_jquery_parallax_scroll_min__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_halothemes_parallax_jquery_parallax_scroll_min__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _common_product_details__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./common/product-details */ "./assets/js/theme/common/product-details.js");
/* harmony import */ var _global_modal__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./global/modal */ "./assets/js/theme/global/modal.js");
/* harmony import */ var _halothemes_haloVideo__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./halothemes/haloVideo */ "./assets/js/theme/halothemes/haloVideo.js");
/* harmony import */ var _halothemes_haloNotifyMe__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./halothemes/haloNotifyMe */ "./assets/js/theme/halothemes/haloNotifyMe.js");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }











var Home = /*#__PURE__*/function (_PageManager) {
  _inheritsLoose(Home, _PageManager);
  function Home(context) {
    return _PageManager.call(this, context) || this;
  }
  var _proto = Home.prototype;
  _proto.onReady = function onReady() {
    this.countDownHeroCarousel();
    this.customPaging();
    this.loadProductByCategory();
    this.loadProductTabByCategory();
    this.loadProductByCategoryWithBanner();
    this.fancyboxVideoBanner();
    this.faqsToggle();
    this.recentBlogSlider();
    this.homeSpecialProduct();
    this.homeParallaxBanner();
    this.loadOptionForProductCard();
    this.customerReviewCarousel();
    this.homeProductRecommended();
    this.reviewCarousel();
  };
  _proto.countDownHeroCarousel = function countDownHeroCarousel() {
    $('.heroCarousel-countdown').each(function (index, element) {
      $(element).parents('.slick-slide').addClass('has-count-down');
      var countDown = $(element).data('carousel-countdown'),
        countDownDate = new Date(countDown).getTime(),
        seft = $(element);
      var countdownfunction = setInterval(function () {
        var now = new Date().getTime(),
          distance = countDownDate - now;
        if (distance < 0) {
          clearInterval(countdownfunction);
          seft.html('');
        } else {
          var days = Math.floor(distance / (1000 * 60 * 60 * 24)),
            hours = Math.floor(distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)),
            minutes = Math.floor(distance % (1000 * 60 * 60) / (1000 * 60)),
            seconds = Math.floor(distance % (1000 * 60) / 1000);
          var strCountDown = "<span class='num'>" + days + "<span>DAYS</span></span><span class='num'>" + hours + "<span>HOURS</span></span><span class='num'>" + minutes + "<span>MINS</span></span><span class='num'>" + seconds + "<span>SECS</span></span>";
          seft.html(strCountDown);
        }
      }, 1000);
    });
  };
  _proto.customPaging = function customPaging() {
    var heroCustom = $('.heroCarousel-custom');
    var heroCustomSlide = $('.heroCarousel-custom .slick-dots li');
    heroCustom.slick({
      dots: true,
      arrows: false,
      mobileFirst: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: false,
      autoplaySpeed: heroCustom.data('autoplay'),
      infinite: true,
      asNavFor: ".heroCarousel"
    });
    //ADA
    $('.heroCarousel-custom .slick-dots li').each(function (i) {
      var slide = $(this).find('button').text();
      $(this).find('button').text('0' + slide).addClass('slick-dots-item');
    });
    heroCustom.on('afterChange', function (event, slider, i) {
      var pos = $(slider.$slides[i]).find('div[data-position]').data('position');
      if (pos === 'right') {
        heroCustom.removeClass('heroCarousel-customLeft').addClass('heroCarousel-customRight');
      } else {
        heroCustom.removeClass('heroCarousel-customRight').addClass('heroCarousel-customLeft');
      }
    });
    if ($('.heroCarousel-slide--first .heroCarousel-content-wrapper .heroCarousel-content--right').length) {
      heroCustom.removeClass('heroCarousel-customLeft').addClass('heroCarousel-customRight');
    }
  };
  _proto.loadProductByCategory = function loadProductByCategory() {
    var context = this.context;
    var options = {
      template: 'products/carousel-2'
    };
    if ($('.halo-block[data-category-id]').length > 0) {
      var header_height = $('.header').height();
      $(window).on('scroll load', function () {
        var scroll = $(window).scrollTop(),
          setFlag = false;
        if (scroll > header_height) {
          setFlag = true;
        }
        if (setFlag) {
          $('.halo-block[data-category-id]').each(function (index, element) {
            var wrap = $(element).find('.productCarousel'),
              catId = $(element).data('data-category'),
              catUrl = $(element).data('category-url'),
              blockId = $(element).attr('id');
            if (!$('#product-by-cate-' + catId + ' .productCarousel .productCarousel-slide').length) {
              loadCategory(catId, catUrl, options, wrap, blockId);
            }
          });
          setFlag = false;
        }
      });
    }
    function loadCategory(id, url, option, wrap, blockId) {
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__["default"].api.getPage(url, option, function (err, response) {
        if (!wrap.find('.productCarousel-slide').length) {
          wrap.html(response);
          slickCarousel(wrap);
          wrap.parents('.halo-block[data-category-id]').find('.loadingOverlay').remove();
          Object(_halothemes_haloAddOptionForProductCard__WEBPACK_IMPORTED_MODULE_5__["default"])(context, blockId);
        }
      });
    }
    function slickCarousel(wrap) {
      wrap.slick({
        dots: true,
        arrows: false,
        infinite: false,
        mobileFirst: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        nextArrow: "<svg class='slick-next slick-arrow slick-arrow-large' aria-label='Next Slide'><use xlink:href=#slick-arrow-next></use></svg>",
        prevArrow: "<svg class='slick-prev slick-arrow slick-arrow-large' aria-label='Previous Slide'><use xlink:href=#slick-arrow-prev></use></svg>",
        responsive: [{
          breakpoint: 1024,
          settings: {
            arrows: true,
            slidesToShow: parseInt(context.themeSettings.home_product_block_col)
          }
        }, {
          breakpoint: 991,
          settings: {
            slidesToShow: parseInt(context.themeSettings.home_product_block_col) - 1
          }
        }, {
          breakpoint: 767,
          settings: {
            slidesToShow: parseInt(context.themeSettings.home_product_block_col) - 2
          }
        }]
      });
    }
  };
  _proto.loadProductTabByCategory = function loadProductTabByCategory() {
    var context = this.context;
    var options = {
      template: 'products/carousel-3'
    };
    if ($('.productCarousel-tabs').length > 0) {
      if (!$('.productCarousel-tabs .tab-content.is-active .productCarousel .productCarousel-slide').length) {
        Array.from($('.tab-content.is-active')).forEach(function (item) {
          var $itemEle = $(item);
          var block = $itemEle,
            wrap = block.find('.productCarousel'),
            catId = block.data('tab-category-id'),
            catUrl = block.data('tab-category-url'),
            blockId = block.attr('id');
          if (catUrl.includes("http")) {
            if (location.host.includes("en.superhairpieces.es")) {
              catUrl = catUrl.replace("//superhairpieces.es", "//en.superhairpieces.es");
            }
          }
          if (!$('.productCarousel-tabs .tab-content.is-active .productCarousel .productCarousel-slide').length) {
            block.find('.loadingOverlay').show();
            loadCategory(catId, catUrl, options, wrap, blockId);
          }
        });
      }
    }
    function reviewShow(x) {
      var limit = document.querySelectorAll('.reviewCard1');
      var review2 = [];
      Promise.all([fetch("https://www.teamdesk.net/secure/api/v2/56554/BEA2566590EF4D14AA8D35AD0E2CEA77/Review/select.json").then(function (r) {
        return r.json();
      }).then(function (r) {
        review2.push.apply(review2, r);
      }), fetch("https://www.teamdesk.net/secure/api/v2/56554/BEA2566590EF4D14AA8D35AD0E2CEA77/Review/select.json?skip=500").then(function (r) {
        return r.json();
      }).then(function (r) {
        review2.push.apply(review2, r);
      }), fetch("https://www.teamdesk.net/secure/api/v2/56554/BEA2566590EF4D14AA8D35AD0E2CEA77/Review/select.json?skip=1000").then(function (r) {
        return r.json();
      }).then(function (r) {
        review2.push.apply(review2, r);
      }), fetch("https://www.teamdesk.net/secure/api/v2/56554/BEA2566590EF4D14AA8D35AD0E2CEA77/Review/select.json?skip=1500").then(function (r) {
        return r.json();
      }).then(function (r) {
        review2.push.apply(review2, r);
      })]).then(function (r) {
        limit.forEach(function (item1) {
          $(item1.nextElementSibling).empty();
          if (item1.innerHTML == 'M106') {
            item1.innerHTML = 'M106#1';
          } else if (item1.innerHTML == 'M106L') {
            item1.innerHTML = 'M106L#1';
          } else if (item1.innerHTML == 'Queen_18') {
            item1.innerHTML = 'Q18';
          }
          var review3 = [];
          var vidu = review2.filter(function (item) {
            return item['Product SKU'] === item1.innerHTML;
          });
          vidu.forEach(function (goku) {
            review3.push(goku['Review rate']);
          });
          var reviewAvg = Math.round(review3.reduce(function (a, b) {
            return a + b;
          }, 0) / review3.length * 10) / 10;
          $(item1.nextElementSibling).append("\n                    <style>    .checked {\n                        color: rgb(255, 210, 0);\n                \n                }\n                .fa-star-o {\n                    color: rgb(255, 210, 0);\n            \n                }\n                @media (min-width: 768px) {\n                    .productReview2 {\n                        display: flex;\n                    }\n                }\n                @media (min-width: 1025px) {\n                    .productReview2 {\n                        display: unset;\n                    }\n                }\n                @media (min-width: 1400px) {\n                    .productReview2 {\n                        display: flex;\n                    }\n                }\n                </style>\n    <link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css\">\n                    \n                    <span>\n                    <span class=\"fa fa-star" + (0.5 <= reviewAvg ? ' checked' : ' fa-star-o') + "\"></span>\n                    <span class=\"fa fa-star" + (1.5 <= reviewAvg ? ' checked' : ' fa-star-o') + "\"></span>\n                    <span class=\"fa fa-star" + (2.5 <= reviewAvg ? ' checked' : ' fa-star-o') + "\"></span>\n                    <span class=\"fa fa-star" + (3.5 <= reviewAvg ? ' checked' : ' fa-star-o') + "\"></span>\n                    <span class=\"fa fa-star" + (4.5 <= reviewAvg ? ' checked' : ' fa-star-o') + ("\"></span>      \n                </span>\n                <div style=padding-left:5px;>\n                    " + review3.length + " Rese\xF1as\n                </div>"));
          // $(item1.nextElementSibling).append(`<div>${reviewAvg}</div>`)
        });
      }).catch(function (err) {
        console.log(err);
      });
    }
    //     function reviewShow(x) {
    //         var limit = document.querySelectorAll('.reviewCard1');

    //         for (let i = 0; i < limit.length; i++) {
    //             let review3=[]
    //             let review2 = []
    //             // console.log(limit[i].innerHTML)
    //             fetch(`https://shp-webserver.glitch.me/get-teamdesk`, {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     'Accept': 'application/json'
    //                 },
    //                 body: JSON.stringify({
    //                     "table": "Review",
    //                     "options":`?filter=[Product SKU]='${limit[i].innerHTML}'`
    //                 })
    //             })
    //             .then(r=>r.json())

    //             .then(r=> review2.push(...r))
    //             .then(r => {
    //                 $(limit[i].nextElementSibling).empty()
    //                 // const goku1 = review2.filter(item => item['Product SKU'] === limit[i].innerHTML)
    //                 // console.log(review2)
    //                 // console.log(review2.length)
    //                 for (let i=0; i<review2.length; i++) {
    //                     review3.push(review2[i]['Review rate'])

    //                 }
    //                 // review2.forEach((rev) => {
    //                 //     review3.push(rev['Review rate'])
    //                 // })
    //                 const reviewAvg = Math.round((review3.reduce((a,b ) => a+ b, 0)/review3.length) * 10)/10
    //                 $(limit[i].nextElementSibling).append(`
    //                 <style>    .checked {
    //                     color: rgb(255, 210, 0);

    //             }
    //             .fa-star-o {
    //                 color: rgb(255, 210, 0);

    //             }
    //             @media (min-width: 768px) {
    //                 .productReview2 {
    //                     display: flex;
    //                 }
    //             }
    //             @media (min-width: 1025px) {
    //                 .productReview2 {
    //                     display: unset;
    //                 }
    //             }
    //             @media (min-width: 1400px) {
    //                 .productReview2 {
    //                     display: flex;
    //                 }
    //             }
    //             </style>
    // <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

    //                 <span>
    //                 <span class="fa fa-star`+(0.5 <= reviewAvg? ' checked': ' fa-star-o') + `"></span>
    //                 <span class="fa fa-star`+(1.5 <= reviewAvg? ' checked': ' fa-star-o') + `"></span>
    //                 <span class="fa fa-star`+(2.5 <= reviewAvg? ' checked': ' fa-star-o') + `"></span>
    //                 <span class="fa fa-star`+(3.5 <= reviewAvg? ' checked': ' fa-star-o') + `"></span>
    //                 <span class="fa fa-star`+(4.5 <= reviewAvg? ' checked': ' fa-star-o') + `"></span>      
    //             </span>
    //             <div style=padding-left:5px;>
    //                 ${review3.length} Reseñas
    //             </div>`)
    //             })
    //         }
    // //         limit.forEach((item1) => {

    // //             let review3=[]
    // //             let review2 = []

    // //             fetch(`https://shp-webserver.glitch.me/get-teamdesk`, {
    // //                 method: 'POST',
    // //                 headers: {
    // //                     'Content-Type': 'application/json',
    // //                     'Accept': 'application/json'
    // //                 },
    // //                 body: JSON.stringify({
    // //                     "table": "Review",
    // //                     "options":`?filter=[Product SKU]='${item1.innerHTML}'`
    // //                 })
    // //             })
    // //             .then(r=>r.json())

    // //             .then(r=> review2.push(...r))
    // //             .then(r => {
    // //                 $(item1.nextElementSibling).empty()
    // //                 const goku1 = review2.filter(item => item['Product SKU'] === item1.innerHTML)
    // //                 goku1.forEach((rev) => {
    // //                                         review3.push(rev['Review rate'])
    // //                                     })
    // //                 const reviewAvg = Math.round((review3.reduce((a,b ) => a+ b, 0)/review3.length) * 10)/10
    // //                 $(item1.nextElementSibling).append(`
    // //                 <style>    .checked {
    // //                     color: rgb(255, 210, 0);

    // //             }
    // //             .fa-star-o {
    // //                 color: rgb(255, 210, 0);

    // //             }
    // //             @media (min-width: 768px) {
    // //                 .productReview2 {
    // //                     display: flex;
    // //                 }
    // //             }
    // //             @media (min-width: 1025px) {
    // //                 .productReview2 {
    // //                     display: unset;
    // //                 }
    // //             }
    // //             @media (min-width: 1400px) {
    // //                 .productReview2 {
    // //                     display: flex;
    // //                 }
    // //             }
    // //             </style>
    // // <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

    // //                 <span>
    // //                 <span class="fa fa-star`+(0.5 <= reviewAvg? ' checked': ' fa-star-o') + `"></span>
    // //                 <span class="fa fa-star`+(1.5 <= reviewAvg? ' checked': ' fa-star-o') + `"></span>
    // //                 <span class="fa fa-star`+(2.5 <= reviewAvg? ' checked': ' fa-star-o') + `"></span>
    // //                 <span class="fa fa-star`+(3.5 <= reviewAvg? ' checked': ' fa-star-o') + `"></span>
    // //                 <span class="fa fa-star`+(4.5 <= reviewAvg? ' checked': ' fa-star-o') + `"></span>      
    // //             </span>
    // //             <div style=padding-left:5px;>
    // //                 ${review3.length} Reseñas
    // //             </div>`)
    // //             })

    // //         })

    // //         let review2 = []
    // //         fetch(`https://shp-webserver.glitch.me/get-teamdesk`, {
    // //             method: 'POST',
    // //             headers: {
    // //                 'Content-Type': 'application/json',
    // //                 'Accept': 'application/json'
    // //             },
    // //             body: JSON.stringify({
    // //                 "table": "Review",
    // //                 "options":``
    // //             })
    // //         })
    // //         .then(r=>r.json())
    // //         .then(r=> review2.push(...r))
    // //         .then((r) => {
    // //             limit.forEach((item1) => {
    // //                 $(item1.nextElementSibling).empty()

    // //                 let review3 = []

    // //                 const filteredAr = review2.filter(item => item['Product SKU'] === item1.innerHTML)
    // //                 filteredAr.forEach((rev) => {
    // //                     review3.push(rev['Review rate'])
    // //                 })
    // //                 const reviewAvg = Math.round((review3.reduce((a,b ) => a+ b, 0)/review3.length) * 10)/10

    // //                 $(item1.nextElementSibling).append(`
    // //                 <style>    .checked {
    // //                     color: rgb(255, 210, 0);

    // //             }
    // //             .fa-star-o {
    // //                 color: rgb(255, 210, 0);

    // //             }
    // //             @media (min-width: 768px) {
    // //                 .productReview2 {
    // //                     display: flex;
    // //                 }
    // //             }
    // //             @media (min-width: 1025px) {
    // //                 .productReview2 {
    // //                     display: unset;
    // //                 }
    // //             }
    // //             @media (min-width: 1400px) {
    // //                 .productReview2 {
    // //                     display: flex;
    // //                 }
    // //             }
    // //             </style>
    // // <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

    // //                 <span>
    // //                 <span class="fa fa-star`+(0.5 <= reviewAvg? ' checked': ' fa-star-o') + `"></span>
    // //                 <span class="fa fa-star`+(1.5 <= reviewAvg? ' checked': ' fa-star-o') + `"></span>
    // //                 <span class="fa fa-star`+(2.5 <= reviewAvg? ' checked': ' fa-star-o') + `"></span>
    // //                 <span class="fa fa-star`+(3.5 <= reviewAvg? ' checked': ' fa-star-o') + `"></span>
    // //                 <span class="fa fa-star`+(4.5 <= reviewAvg? ' checked': ' fa-star-o') + `"></span>      
    // //             </span>
    // //             <div style=padding-left:5px;>
    // //                 ${review3.length} Reseñas
    // //             </div>`)
    // //                 // $(item1.nextElementSibling).append(`<div>${reviewAvg}</div>`)
    // //             })

    // //           })

    // //           .catch((err) => {
    // //               console.log(err);
    // //           });
    //     }
    function loadCategory(id, url, option, wrap, blockId) {
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__["default"].api.getPage(url, option, function (err, response) {
        if (!wrap.find('.productCarousel-slide').length) {
          wrap.html(response);
          slickCarousel(wrap);
          wrap.parents('.tab-content').find('.loadingOverlay').remove();
          Object(_halothemes_haloAddOptionForProductCard__WEBPACK_IMPORTED_MODULE_5__["default"])(context, blockId);
          reviewShow();
        }
      });
    }
    function slickCarousel(wrap) {
      wrap.slick({
        dots: false,
        arrows: true,
        infinite: false,
        mobileFirst: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        nextArrow: "<svg class='slick-tab1 slick-next slick-arrow slick-arrow-large' aria-label='Next Slide'><use xlink:href=#slick-arrow-next></use></svg>",
        prevArrow: "<svg class='slick-tab2 slick-prev slick-arrow slick-arrow-large' aria-label='Previous Slide'><use xlink:href=#slick-arrow-prev></use></svg>",
        responsive: [{
          breakpoint: 1024,
          settings: {
            arrows: true,
            slidesToShow: parseInt(context.themeSettings.home_product_block_tab_col)
          }
        }, {
          breakpoint: 991,
          settings: {
            slidesToShow: parseInt(context.themeSettings.home_product_block_tab_col) - 1
          }
        }, {
          breakpoint: 767,
          settings: {
            slidesToShow: parseInt(context.themeSettings.home_product_block_tab_col) - 2
          }
        }]
      });
    }
  };
  _proto.loadProductByCategoryWithBanner = function loadProductByCategoryWithBanner() {
    var context = this.context;
    var options = {
      template: 'products/carousel-4'
    };
    if ($('.halo-block[data-category-with-banner-id]').length > 0) {
      var header_height = $('.header').height();
      var $tabSorting = $('.tab-sorting .tab-title');
      $(window).on('scroll load', function () {
        var scroll = $(window).scrollTop(),
          setFlag = false;
        if (scroll > header_height) {
          setFlag = true;
        }
        if (setFlag) {
          $('.halo-block[data-category-with-banner-id]').each(function (index, element) {
            if ($('.home-layout-2').length && !$(element).hasClass('home2-flash-deals')) {
              var wrap = $(element).find('.tabContent-new .productCarousel');
            } else {
              var wrap = $(element).find('.productCarousel');
            }
            var catId = $(element).data('category-with-banner-id'),
              catUrl = $(element).data('category-with-banner-url'),
              blockId = $(element).attr('id');
            if (!$('#product-with-banner-' + catId + ' .productCarousel .productCarousel-slide').length) {
              loadCategory(catId, catUrl, options, wrap, blockId);
            }
          });
          setFlag = false;
        }
      });
      $tabSorting.on('click', function (e) {
        e.preventDefault();
        var $target = $(e.currentTarget);
        var dataTab = $target.data('tab');
        var $thisBlock = $target.closest('.halo-block-product');
        var wrap = $thisBlock.find('.tabContent-' + dataTab + ' .productCarousel'),
          catId = $target.data('cate-id'),
          catUrl = $target.data('cate-url'),
          blockId = $thisBlock.find('.tabContent-' + dataTab).attr('id');
        if (dataTab == 'viewall') {
          window.location.href = $target.attr('href');
          return;
        }
        $thisBlock.find('.tab-sorting').removeClass('is-active');
        $target.parent().addClass('is-active');
        $thisBlock.find('.tab-content').removeClass('is-active');
        $thisBlock.find('.tabContent-' + dataTab).addClass('is-active');
        console.log('aff');
        if (!$target.hasClass('is-loaded')) {
          $target.addClass('is-loaded');
          loadCategory(catId, catUrl, options, wrap, blockId);
        } else {
          $thisBlock.find('.tabContent-' + dataTab + ' .productCarousel').slick('refresh');
        }
      });
      if ($('.countDowntimer').length) {
        var countDownDate = new Date($('.countDowntimer').attr('data-count-down')).getTime();
        var countdownfunction = setInterval(function () {
          var now = new Date().getTime();
          var distance = countDownDate - now;
          if (distance < 0) {
            clearInterval(countdownfunction);
            $(".countDowntimer").html('');
          } else {
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor(distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
            var minutes = Math.floor(distance % (1000 * 60 * 60) / (1000 * 60));
            var seconds = Math.floor(distance % (1000 * 60) / 1000);
            var strCountDown = "<div class='clock-item'><span class='num'>" + days + "</span><span class='text'>d</span></div><div class='clock-item'><span class='num'>" + hours + ":</span></div><div class='clock-item'><span class='num'>" + minutes + ":</span></div><div class='clock-item'><span class='num'>" + seconds + "</span></div>";
            $(".countDowntimer").html(strCountDown);
          }
        }, 1000);
      }
    }
    function loadCategory(id, url, option, wrap, blockId) {
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__["default"].api.getPage(url, option, function (err, response) {
        if (!wrap.find('.productCarousel-slide').length) {
          wrap.html(response);
          if (wrap.parents('.halo-block[data-category-with-banner-id]').hasClass('halo-block-product-banners')) {
            if ($('.home-layout-2').length) {
              if (wrap.parents('.halo-block[data-category-with-banner-id]').hasClass('home2-flash-deals')) {
                labelFlashDeals(wrap);
                slickCarousel4(wrap);
              } else {
                slickCarousel3(wrap);
              }
            } else {
              slickCarousel(wrap);
            }
          } else if (wrap.parents('.halo-block[data-category-with-banner-id]').hasClass('halo-block-product-banners2')) {
            slickCarousel2(wrap);
          }
          wrap.parents('.halo-block[data-category-with-banner-id]').find('.loadingOverlay').remove();
          Object(_halothemes_haloAddOptionForProductCard__WEBPACK_IMPORTED_MODULE_5__["default"])(context, blockId);
        }
      });
    }
    function slickCarousel(wrap) {
      wrap.slick({
        dots: true,
        arrows: false,
        infinite: false,
        mobileFirst: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        nextArrow: "<svg class='slick-next slick-arrow slick-arrow-large' aria-label='Next Slide'><use xlink:href=#slick-arrow-next></use></svg>",
        prevArrow: "<svg class='slick-prev slick-arrow slick-arrow-large' aria-label='Previous Slide'><use xlink:href=#slick-arrow-prev></use></svg>",
        responsive: [{
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1
          }
        }, {
          breakpoint: 991,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1
          }
        }, {
          breakpoint: 767,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        }]
      });
    }
    function slickCarousel2(wrap) {
      wrap.slick({
        dots: true,
        arrows: false,
        infinite: false,
        mobileFirst: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        nextArrow: "<svg class='slick-next slick-arrow slick-arrow-large' aria-label='Next Slide'><use xlink:href=#slick-arrow-next></use></svg>",
        prevArrow: "<svg class='slick-prev slick-arrow slick-arrow-large' aria-label='Previous Slide'><use xlink:href=#slick-arrow-prev></use></svg>",
        responsive: [{
          breakpoint: 1024,
          settings: {
            arrows: true,
            slidesToShow: parseInt(context.themeSettings.home_product_block_with_banner_col)
          }
        }, {
          breakpoint: 991,
          settings: {
            slidesToShow: parseInt(context.themeSettings.home_product_block_with_banner_col) - 1
          }
        }, {
          breakpoint: 767,
          settings: {
            slidesToShow: parseInt(context.themeSettings.home_product_block_with_banner_col) - 2
          }
        }]
      });
    }
    function slickCarousel3(wrap) {
      wrap.slick({
        dots: true,
        arrows: false,
        infinite: false,
        mobileFirst: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        nextArrow: "<svg class='slick-next slick-arrow slick-arrow-large' aria-label='Next Slide'><use xlink:href=#slick-arrow-next></use></svg>",
        prevArrow: "<svg class='slick-prev slick-arrow slick-arrow-large' aria-label='Previous Slide'><use xlink:href=#slick-arrow-prev></use></svg>",
        responsive: [{
          breakpoint: 1199,
          settings: {
            dots: false,
            arrows: true,
            slidesToShow: 3,
            slidesToScroll: 1
          }
        }, {
          breakpoint: 767,
          settings: {
            dots: false,
            arrows: true,
            slidesToShow: 2,
            slidesToScroll: 1
          }
        }]
      });
    }
    function slickCarousel4(wrap) {
      wrap.slick({
        dots: true,
        arrows: false,
        infinite: false,
        mobileFirst: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        nextArrow: "<svg class='slick-next slick-arrow slick-arrow-large' aria-label='Next Slide'><use xlink:href=#slick-arrow-next></use></svg>",
        prevArrow: "<svg class='slick-prev slick-arrow slick-arrow-large' aria-label='Previous Slide'><use xlink:href=#slick-arrow-prev></use></svg>",
        responsive: [{
          breakpoint: 1199,
          settings: {
            dots: false,
            arrows: true,
            slidesToShow: 5,
            slidesToScroll: 1
          }
        }, {
          breakpoint: 992,
          settings: {
            dots: false,
            arrows: true,
            slidesToShow: 4,
            slidesToScroll: 1
          }
        }, {
          breakpoint: 767,
          settings: {
            dots: false,
            arrows: true,
            slidesToShow: 3,
            slidesToScroll: 1
          }
        }]
      });
    }
    function labelFlashDeals(wrap) {
      var $itemSide = wrap.find('.productCarousel-slide');
      $itemSide.each(function (index, element) {
        var $thisLabel = $(element).find('.sale-badge');
        if ($thisLabel.length) {
          var label = $thisLabel.find('.text').data('sale');
          $(element).find('.card-price').addClass('has-labelSale').append('<div class="card-label-sale"><span>-' + label + '</span></div>');
          $thisLabel.remove();
        }
      });
    }
  };
  _proto.fancyboxVideoBanner = function fancyboxVideoBanner() {
    if ($(".video-block-image[data-fancybox]").length > 0) {
      $(".video-block-image[data-fancybox]").fancybox({
        'autoDimensions': false,
        'padding': 0,
        'width': 970,
        'height': 600,
        'autoScale': false,
        'transitionIn': 'none',
        'transitionOut': 'none'
      });
    }
    if ($(".button-popup-video[data-fancybox]").length > 0) {
      $(".button-popup-video[data-fancybox]").fancybox({
        'autoDimensions': false,
        'padding': 0,
        'width': 970,
        'height': 600,
        'autoScale': false,
        'transitionIn': 'none',
        'transitionOut': 'none'
      });
    }
  };
  _proto.faqsToggle = function faqsToggle() {
    $('.halo-short-faqs .card .title').on('click', function (event) {
      event.preventDefault();
      var $target = $(event.currentTarget);
      $('.halo-short-faqs .card .title').not($target).removeClass('collapsed');
      if ($target.hasClass('collapsed')) {
        $target.removeClass('collapsed');
      } else {
        $target.addClass('collapsed');
      }
      $('.halo-short-faqs .card').each(function (index, element) {
        if ($(element).find('.title').hasClass('collapsed')) {
          $(element).find('.collapse').slideDown("slow");
        } else {
          $(element).find('.collapse').slideUp("slow");
        }
      });
    });
  };
  _proto.recentBlogSlider = function recentBlogSlider() {
    if ($(window).width() <= 1024) {
      if ($('.halo-recent-post').length) {
        if ($('.halo-recent-post').hasClass('slick-slider')) {
          $('.halo-recent-post').slick('unslick');
        }
      }
    } else {
      if ($('.halo-recent-post').length) {
        if (!$('.halo-recent-post').hasClass('slick-slider')) {
          $('.halo-recent-post').slick();
        }
      }
    }
    $(window).resize(function () {
      if ($(window).width() <= 1024) {
        if ($('.halo-recent-post').length) {
          if ($('.halo-recent-post').hasClass('slick-slider')) {
            $('.halo-recent-post').slick('unslick');
          }
        }
      } else {
        if ($('.halo-recent-post').length) {
          if (!$('.halo-recent-post').hasClass('slick-slider')) {
            $('.halo-recent-post').slick();
          }
        }
      }
    });
  };
  _proto.homeSpecialProduct = function homeSpecialProduct() {
    var context = this.context;
    if (context.themeSettings.home_product_block_special == true) {
      var productId = $('[data-special-product-id]').data('special-product-id'),
        setFlag = false;
      var options = {
        template: 'halothemes/products/halo-special-product-tmp'
      };
      $(window).on('scroll load', function () {
        var scroll = $(window).scrollTop(),
          header_height = $('.header').height();
        if (scroll > header_height) {
          setFlag = true;
        }
        if (setFlag) {
          if (!$('.halo-spacial-product .productView').length) {
            var viewingProduct = function viewingProduct(wrapper) {
              if (wrapper.length > 0) {
                var viewerText = context.themeSettings.product_viewingProduct_text,
                  numbersViewer_text = context.themeSettings.product_viewingProduct_viewer,
                  numbersViewerList = JSON.parse("[" + numbersViewer_text + "]");
                setInterval(function () {
                  var numbersViewerItem = Math.floor(Math.random() * numbersViewerList.length);
                  wrapper.html('<svg class="icon" aria-hidden="true"><use xlink:href="#icon-eye"/></svg>' + numbersViewerList[numbersViewerItem] + " " + viewerText);
                  wrapper.removeClass('u-hiddenVisually');
                }, 10000);
              }
            };
            var countDownProduct = function countDownProduct(wrapper) {
              if (wrapper.length > 0) {
                var countDown = wrapper.data('countdown'),
                  countDownDate = new Date(countDown).getTime(),
                  seft = wrapper;
                var countdownfunction = setInterval(function () {
                  var now = new Date().getTime(),
                    distance = countDownDate - now;
                  if (distance < 0) {
                    clearInterval(countdownfunction);
                    seft.remove();
                  } else {
                    var days = Math.floor(distance / (1000 * 60 * 60 * 24)),
                      hours = Math.floor(distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)),
                      minutes = Math.floor(distance % (1000 * 60 * 60) / (1000 * 60)),
                      seconds = Math.floor(distance % (1000 * 60) / 1000),
                      strCountDown = '<svg class="icon" aria-hidden="true"><use xlink:href="#icon-bell"/></svg><span class="text"><span>Limited time offer, end in:</span></span> <span class="num">' + days + 'd :</span> <span class="num">' + hours + 'h :</span> <span class="num">' + minutes + 'm :</span> <span class="num">' + seconds + 's</span>';
                    seft.html(strCountDown);
                  }
                }, 1000);
              }
            };
            var soldProduct = function soldProduct(wrapper) {
              if (wrapper.length > 0) {
                var numbersProduct_text = context.themeSettings.product_soldProduct_products,
                  numbersHours_text = context.themeSettings.product_soldProduct_hours,
                  soldProductText = context.themeSettings.product_soldProduct_text,
                  soldProductText2 = context.themeSettings.product_soldProduct_hours_text;
                var numbersProductList = JSON.parse("[" + numbersProduct_text + "]"),
                  numbersProductItem = Math.floor(Math.random() * numbersProductList.length),
                  numbersHoursList = JSON.parse("[" + numbersHours_text + "]"),
                  numbersHoursItem = Math.floor(Math.random() * numbersHoursList.length);
                wrapper.html('<svg class="icon" aria-hidden="true"><use xlink:href="#icon-fire"/></svg><span>' + numbersProductList[numbersProductItem] + " " + soldProductText + " " + numbersHoursList[numbersHoursItem] + " " + soldProductText2 + '</span>');
                wrapper.removeClass('u-hiddenVisually').show();
              }
            };
            var initThumbnailsHeight = function initThumbnailsHeight($scope) {
              var el = $($scope);
              var $carousel_nav = el.find('.productView-nav'),
                $carousel_for = el.find('.productView-for');
              if ($carousel_for.find('.slick-arrow').length > 0) {
                $carousel_for.parent().addClass('arrows-visible');
              } else {
                $carousel_for.parent().addClass('arrows-disable');
              }
            };
            _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__["default"].api.product.getById(productId, options, function (err, response) {
              setFlag = false;
              var scope = '.halo-spacial-product';
              if (!$(scope).find('.productView').length) {
                $(scope).html(response);
                soldProduct($(scope).find('.productView-soldProduct'));
                viewingProduct($(scope).find('.productView-ViewingProduct'));
                countDownProduct($(scope).find('.productView-countDown'));
                $(scope).find('[data-slick]').slick();
                $(scope).find('.productView-for').get(0).slick.setPosition();
                initThumbnailsHeight(scope);
                Object(_halothemes_haloNotifyMe__WEBPACK_IMPORTED_MODULE_10__["default"])($(scope), context);
                Object(_halothemes_haloVideo__WEBPACK_IMPORTED_MODULE_9__["default"])($(scope).find('[data-slick]'));
                $(scope).on('click', '.dropdown-menu-button', function (event) {
                  var $target = $(event.currentTarget);
                  if ($target.hasClass('is-open')) {
                    $target.removeClass('is-open').attr('aria-expanded', false);
                    $target.siblings('.dropdown-menu').removeClass('is-open').attr('aria-hidden', true);
                  } else {
                    $target.addClass('is-open').attr('aria-expanded', true);
                    $target.siblings('.dropdown-menu').addClass('is-open').attr('aria-hidden', false);
                  }
                  event.stopPropagation();
                });
                $(document).on('click', function (event) {
                  if ($(scope).find('.dropdown-menu-button').hasClass('is-open')) {
                    if ($(event.target).closest('.dropdown-menu-button').length === 0 && $(event.target).closest('.dropdown-menu').length === 0) {
                      $(scope).find('.dropdown-menu-button').removeClass('is-open').attr('aria-expanded', false);
                      $(scope).find('.dropdown-menu-button').siblings('.dropdown-menu').removeClass('is-open').attr('aria-hidden', true);
                    }
                  }
                });
                var productDetails = new _common_product_details__WEBPACK_IMPORTED_MODULE_7__["default"]($(scope), context);
                productDetails.setProductVariant();
                return productDetails;
              }
            });
          }
          setFlag = false;
        }
      });
    }
  };
  _proto.homeParallaxBanner = function homeParallaxBanner() {
    if ($('#halo_parralax_banners').length > 0) {
      var wrap = $('#halo_parralax_banners'),
        image = wrap.find('[data-image]').data('image');
      wrap.find('[data-image]').css('background-image', 'url(' + image + ')');
    }
  };
  _proto.loadOptionForProductCard = function loadOptionForProductCard() {
    var context = this.context;
    if ($('.productCarousel').length > 0) {
      $('.productCarousel').each(function (index, element) {
        var $prodWrapId = $(element).attr('id');
        Object(_halothemes_haloAddOptionForProductCard__WEBPACK_IMPORTED_MODULE_5__["default"])(context, $prodWrapId);
      });
    }
    if ($('.halo-block .productGrid').length > 0) {
      $('.halo-block .productGrid').each(function (index, element) {
        var $prodWrapId = $(element).attr('id');
        Object(_halothemes_haloAddOptionForProductCard__WEBPACK_IMPORTED_MODULE_5__["default"])(context, $prodWrapId);
      });
    }
  }

  // Banner parallax 2
  ;
  _proto.customerReviewCarousel = function customerReviewCarousel() {
    if ($('#halo_parralax_banners .halo-row').length) {
      if (!$('#halo_parralax_banners .halo-row').hasClass('slick-slider')) {
        $('#halo_parralax_banners .halo-row').slick({
          dots: true,
          arrows: false,
          infinite: false,
          mobileFirst: true,
          adaptiveHeight: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          nextArrow: "<svg class='slick-next slick-arrow' aria-label='Next Slide'><use xlink:href=#slick-arrow-next></use></svg>",
          prevArrow: "<svg class='slick-prev slick-arrow' aria-label='Previous Slide'><use xlink:href=#slick-arrow-prev></use></svg>",
          responsive: [{
            breakpoint: 1024,
            settings: {
              arrows: true
            }
          }]
        });
      }
    }
  };
  _proto.reviewCarousel = function reviewCarousel() {
    $(window).on("resize orientationchange", function () {
      $(".blocktiktok").css('display', 'none');
    });
    var productIds = $("[function=list-product]").data("ids").toString().split(",").map(function (item) {
      return parseInt(item, 10);
    });
    // let stoken = $("[name=store-token]").val();
    var skus = ['M101', 'HD111', 'M111', 'HD111', 'M105'];
    $('#r-test1').slick({
      "dots": false,
      "arrows": false,
      "infinite": true,
      "asNavFor": "#r-test2",
      "swipe": false,
      "pauseOnFocus": false,
      "pauseOnHover": false,
      "fade": true,
      "autoplay": true,
      "slidesToShow": 1,
      "slidesToScroll": 1
    });
    $('#r-test3').slick({
      "dots": false,
      "arrows": false,
      "infinite": true,
      "asNavFor": "#r-test2",
      "autoplay": true,
      "pauseOnFocus": false,
      "pauseOnHover": false,
      "swipe": false,
      "slidesToShow": 1,
      "slidesToScroll": 1,
      "fade": true
    });
    $('#r-test2').slick({
      "dots": false,
      "arrows": true,
      "infinite": true,
      "swipe": false,
      "pauseOnFocus": false,
      "pauseOnHover": false,
      "autoplay": true,
      "adaptiveHeight": true,
      "asNavFor": ".reviewSlider",
      "slidesToShow": 1,
      "slidesToScroll": 1,
      "fade": true,
      "appendArrows": "#gokuvidu6"
    });
    $('#reviewblock1').slick({
      "dots": false,
      "arrows": true,
      "pauseOnFocus": false,
      "pauseOnHover": false,
      "infinite": true,
      "swipe": false,
      "autoplay": true,
      "asNavFor": ".reviewSlider",
      "adaptiveHeight": true,
      "slidesToShow": 1,
      "slidesToScroll": 1,
      "nextArrow": "<svg id=slick-next class=slick-next test1 slick-arrow aria-label=Next Slide><use xlink:href=#slick-arrow-next></use></svg>",
      "prevArrow": "<svg class=slick-prev slick-arrow aria-label=Previous Slide><use xlink:href=#slick-arrow-prev></use></svg>",
      "appendArrows": "#arr1"
    });
    skus.map(function (item, i) {
      var rev = [];
      // fetch(`https://shp-webserver.glitch.me/get-teamdesk`, {
      //     method: 'POST',
      //     headers: {
      //         'Content-Type': 'application/json',
      //         'Accept': 'application/json'
      //     },
      //     body: JSON.stringify({
      //         "table": "Inventory",
      //         "filter":`Any([SKU], '${item}')`
      //     })
      // })
      // .then(r=> r.json())
      // .then(r=> console.log(r))
      fetch("https://shp-webserver.glitch.me/get-teamdesk", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          "table": "Review",
          "options": "?filter=[Product SKU]= '" + item + "'"
        })
      }).then(function (r) {
        return r.json();
      }).then(function (r) {
        r.forEach(function (item) {
          rev.push(item['Review rate']);
        });
        var reviewAvg = Math.round(rev.reduce(function (a, b) {
          return a + b;
        }, 0) / rev.length * 10) / 10;
        var content = "<style>    .checked {\n                                    color: rgb(255, 210, 0);\n                                    \n                            }\n                            .fa-star-o {\n                                color: rgb(255, 210, 0);\n                        \n                            }\n                            .fa {\n                                font-size:20px !important;\n                            }\n                            @media (min-width: 768px) {\n                                .productReview2 {\n                                    display: flex;\n                                }\n                            }\n                            @media (min-width: 1025px) {\n                                .productReview2 {\n                                    display: unset;\n                                }\n                            }\n                            @media (min-width: 1400px) {\n                                .productReview2 {\n                                    display: flex;\n                                }\n                            }\n                            </style>\n                <link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css\">\n                                \n                                <span>\n                                <span class=\"fa fa-star" + (0.5 <= reviewAvg ? ' checked' : ' fa-star-o') + "\"></span>\n                                <span class=\"fa fa-star" + (1.5 <= reviewAvg ? ' checked' : ' fa-star-o') + "\"></span>\n                                <span class=\"fa fa-star" + (2.5 <= reviewAvg ? ' checked' : ' fa-star-o') + "\"></span>\n                                <span class=\"fa fa-star" + (3.5 <= reviewAvg ? ' checked' : ' fa-star-o') + "\"></span>\n                                <span class=\"fa fa-star" + (4.5 <= reviewAvg ? ' checked' : ' fa-star-o') + ("\"></span>      \n                            </span>\n                            <div style=\"padding-left:5px;color:#5a5a5a;\">\n                                " + rev.length + " Rese\xF1as\n                            </div>");
        $('.vidujen').eq(i).html(content);
        $('.vidujen1').eq(i).html(content);
      }).catch(function (err) {
        console.log(err);
      });
    });
    // console.log($('.thingIWant'))
    //     fetch('/graphql', {

    //         method: 'POST',
    //         headers: {
    //           'Content-Type': 'application/json',
    //           'Authorization': `Bearer ${stoken}`
    //         },
    //         body: JSON.stringify({ 
    //             query: `
    //             query productsById {
    //                 site {
    //                     products  (entityIds: [${productIds}]) {    
    //                         edges {
    //                             node {
    //                                 sku                    
    //                                 name
    //                                 addToCartUrl
    //                                 path
    //                                 id
    //                                 entityId
    //                                 inventory {
    //                                     isInStock
    //                                 }
    //                                 prices {
    //                                     price {
    //                                         value
    //                                         currencyCode
    //                                     }
    //                                     salePrice {
    //                                         ...MoneyFields
    //                                     }
    //                                 }
    //                                 brand {

    //                                     name
    //                                   }
    //                                 defaultImage {
    //                                     url (width: 200)
    //                                 }                                    
    //                                 productOptions {

    //                                     ...OptionFields
    //                                 }         
    //                             }
    //                         }

    //                     }
    //                 }
    //             }
    //             fragment MoneyFields on Money {
    //                 value
    //                 currencyCode
    //             }
    //             fragment OptionFields on ProductOptionConnection {
    //                 edges {
    //                     node {
    //                         entityId
    //                         displayName

    //                         ... on MultipleChoiceOption {
    //                             values {
    //                                 edges {
    //                                     node {
    //                                         entityId
    //                                         label                                                                    
    //                                     }
    //                                 }
    //                             }
    //                         }
    //                     }
    //                 }
    //             }`                
    //         })
    //     })
    //     .then(r=>r.json())
    //     .then(r=> {
    //         if (r.data) {
    //             // console.log(r.data.site.products.edges)
    //             let content="";
    //             let content1="";
    //             const skus=[]
    //             const filterArr = r.data.site.products.edges
    //             // console.log(filterArr)
    //             $('.thingIWant').each((i,item1) => {
    //                 // console.log(item1)
    //                 filterArr.forEach((item) => {
    //                     if(item.node.entityId == parseInt(item1.value)) {
    //                         console.log(item)
    //                     }
    //             })
    //         })
    //     }
    // })
    //                     skus.push(item.node.sku)
    //             // console.log(item.node.sku)
    //             content += `
    //                     <a class=r-item href=${item.node.path}>
    //                         <div>
    //                             <img src=${item.node.defaultImage.url}>
    //                         </div>
    //                         <div>
    //                             <div>
    //                                 <div class='vidujen'></div>
    //                                 <div class=r-name style="-webkit-box-orient: vertical">${item.node.name}</div>
    //                                 <div class=r-price>${item.node.prices.price.value},00€</div>
    //                             </div>
    //                         </div>
    //                     </a>

    //                 `
    //                 content1 += `
    //                 <a class=r-item href=${item.node.path}>
    //                     <div>
    //                         <img src=${item.node.defaultImage.url}>
    //                     </div>
    //                     <div>
    //                         <div>
    //                             <div class='vidujen1'></div>
    //                             <div class=r-name style="-webkit-box-orient: vertical">${item.node.name}</div>
    //                             <div class=r-price>${item.node.prices.price.value},00€</div>
    //                         </div>
    //                     </div>
    //                 </a>

    //             `
    //                 }
    //             })
    //         })

    //         $("#r-test1").html(content)
    //                 $('#r-test1').slick({
    //                     "dots": false,
    //                     "arrows": false,
    //                     "infinite": true,
    //                     "asNavFor": "#r-test2",
    //                     "swipe": false,
    //                     "pauseOnFocus" : false,
    //                     "pauseOnHover": false,
    //                     "fade": true,
    //                     "autoplay": true,
    //                     "slidesToShow": 1, 
    //                     "slidesToScroll": 1
    //                     })
    //             $("#r-test3").html(content1)
    //                     $('#r-test3').slick({
    //                         "dots": false,
    //                         "arrows": false,
    //                         "infinite": true,
    //                         "asNavFor": "#r-test2",
    //                         "autoplay": true,
    //                         "pauseOnFocus" : false,
    //                     "pauseOnHover": false,
    //                         "swipe": false,
    //                         "slidesToShow": 1, 
    //                         "slidesToScroll": 1,        
    //                         "fade": true
    //                         })
    //                         $('#r-test2').slick({
    //                             "dots": false,
    //                         "arrows": true,
    //                         "infinite": true,
    //                         "swipe": false,
    //                         "pauseOnFocus" : false,
    //                     "pauseOnHover": false,
    //                         "autoplay": true,
    //                         "adaptiveHeight": true,
    //                         "asNavFor": ".reviewSlider",
    //                         "slidesToShow": 1,
    //                         "slidesToScroll": 1,
    //                         "fade": true,
    //                         "appendArrows": "#gokuvidu6"
    //                             })
    //                             $('#reviewblock1').slick({
    //                                 "dots": false,
    //                                 "arrows": true,
    //                                 "pauseOnFocus" : false,
    //                     "pauseOnHover": false,
    //                                 "infinite": true,
    //                                 "swipe": false,
    //                                 "autoplay": true,
    //                                 "asNavFor": ".reviewSlider",

    //                                 "adaptiveHeight": true,
    //                                 "slidesToShow": 1,
    //                                 "slidesToScroll": 1,
    //                                 "nextArrow": "<svg id=slick-next class=slick-next test1 slick-arrow aria-label=Next Slide><use xlink:href=#slick-arrow-next></use></svg>", 
    //                                 "prevArrow": "<svg class=slick-prev slick-arrow aria-label=Previous Slide><use xlink:href=#slick-arrow-prev></use></svg>",
    //                                 "appendArrows": "#arr1"
    //                                 })
    //         skus.map((item, i) => {
    //             const rev =[]
    //             fetch(`https://shp-webserver.glitch.me/get-teamdesk`, {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     'Accept': 'application/json'
    //                 },
    //                 body: JSON.stringify({
    //                     "table": "Review",
    //                     "options":`?filter=[Product SKU]= '${item}'`
    //                 })
    //             })
    //             .then(r=> r.json())

    //             .then(r=> {
    //                 r.forEach((item) => {
    //                     rev.push(item['Review rate'])
    //                 })
    //                 const reviewAvg = Math.round((rev.reduce((a,b ) => a+ b, 0)/rev.length) * 10)/10
    //                 var content = `<style>    .checked {
    //                     color: rgb(255, 210, 0);

    //             }
    //             .fa-star-o {
    //                 color: rgb(255, 210, 0);

    //             }
    //             .fa {
    //                 font-size:20px !important;
    //             }
    //             @media (min-width: 768px) {
    //                 .productReview2 {
    //                     display: flex;
    //                 }
    //             }
    //             @media (min-width: 1025px) {
    //                 .productReview2 {
    //                     display: unset;
    //                 }
    //             }
    //             @media (min-width: 1400px) {
    //                 .productReview2 {
    //                     display: flex;
    //                 }
    //             }
    //             </style>
    // <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

    //                 <span>
    //                 <span class="fa fa-star`+(0.5 <= reviewAvg? ' checked': ' fa-star-o') + `"></span>
    //                 <span class="fa fa-star`+(1.5 <= reviewAvg? ' checked': ' fa-star-o') + `"></span>
    //                 <span class="fa fa-star`+(2.5 <= reviewAvg? ' checked': ' fa-star-o') + `"></span>
    //                 <span class="fa fa-star`+(3.5 <= reviewAvg? ' checked': ' fa-star-o') + `"></span>
    //                 <span class="fa fa-star`+(4.5 <= reviewAvg? ' checked': ' fa-star-o') + `"></span>      
    //             </span>
    //             <div style="padding-left:5px;color:#5a5a5a;">
    //                 ${rev.length} Reseñas
    //             </div>`

    //                 $('.vidujen').eq(i).html(content)
    //                 $('.vidujen1').eq(i).html(content)

    //             })
    //             .catch((err) => {
    //                 console.log(err);
    //             });
    //         })

    //     }
    // })

    $('.arr1 .slick-prev').on('click', function () {
      $('#r-test1').slick("slickPrev");
      $('#r-test2').slick("slickPrev");
      $('#r-test3').slick("slickPrev");
    });
    $('.arr1 .slick-next').on('click', function () {
      $('#r-test1').slick("slickNext");
      $('#r-test2').slick("slickNext");
      $('#r-test3').slick("slickNext");
    });
    $('.arr4 .slick-prev').on('click', function () {
      // $('#r-test1').slick("slickPrev");
      $('#r-test2').slick("slickPrev");
      $('#r-test3').slick("slickPrev");
    });
    $('.arr4 .slick-next .slick-arrow').on('click', function () {
      console.log('hoi');
      // $('#r-test1').slick("slickNext");
      $('#r-test2').slick("slickNext");
      $('#r-test3').slick("slickNext");
    });
  };
  _proto.homeProductRecommended = function homeProductRecommended() {
    var $homePGF = $('.home2-block-recommended');
    var $homePGF_grid = $homePGF.find('.productGrid');
    var homePGF_itemLength = $homePGF_grid.find('.product').length;
    var $homePGF_btnBlock = $('.homePGF_btn');
    var $homePGF_btn = $('.homePGF_btn a');
    var dataColumn = $homePGF_grid.data('columns');
    var tt_productShow;
    if ($homePGF.length && homePGF_itemLength > 0) {
      var fWidth = window.innerWidth;
      if (fWidth > 1279 && homePGF_itemLength > 10) {
        $homePGF_btnBlock.addClass('is-show');
      } else if (fWidth <= 1279 && fWidth > 991 && homePGF_itemLength > 8) {
        $homePGF_btnBlock.addClass('is-show');
      } else if (fWidth <= 991 && fWidth > 767 && homePGF_itemLength > 6) {
        $homePGF_btnBlock.addClass('is-show');
      } else if (fWidth <= 767 && homePGF_itemLength > 4) {
        $homePGF_btnBlock.addClass('is-show');
      }
      $homePGF_btn.on('click', function (e) {
        e.preventDefault();
        var wWidth = window.innerWidth;
        if (wWidth > 1279) {
          tt_productShow = 10;
        } else if (wWidth <= 1279 && wWidth > 991) {
          tt_productShow = 8;
        } else if (wWidth <= 991 && wWidth > 767) {
          tt_productShow = 6;
        } else {
          tt_productShow = 4;
        }
        if ($homePGF_grid.find('.product:hidden').length > 0) {
          $homePGF_grid.find('.product:hidden:lt(' + tt_productShow + ')').css('display', 'inline-block');
          if ($homePGF_grid.find('.product:hidden').length == 0) {
            $homePGF_btn.text('No More Products').attr('disabled', '').addClass('disable');
          }
        }
      });
    }
  };
  return Home;
}(_page_manager__WEBPACK_IMPORTED_MODULE_3__["default"]);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvaGFsb3RoZW1lcy9oYWxvQWRkT3B0aW9uRm9yUHJvZHVjdENhcmQuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3RoZW1lL2hhbG90aGVtZXMvcGFyYWxsYXgvanF1ZXJ5LnBhcmFsbGF4LXNjcm9sbC5taW4uanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3RoZW1lL2hvbWUuanMiXSwibmFtZXMiOlsiZmV0Y2giLCJyZXF1aXJlIiwiY29udGV4dCIsIndyYXBwZXIiLCJ0aGVtZVNldHRpbmdzIiwiaGFsb0FkZE9wdGlvbkZvclByb2R1Y3QiLCJjYWxsUHJvZHVjdE9wdGlvbiIsInByb2R1Y3RfY2xhc3MiLCJlYWNoIiwiaW5kZXgiLCJlbGVtZW50IiwicHJvZHVjdElkIiwiJCIsImRhdGEiLCJsaXN0IiwicHVzaCIsInRvU3RyaW5nIiwibGVuZ3RoIiwiZ2V0UHJvZHVjdE9wdGlvbiIsInRoZW4iLCJyZW5kZXJPcHRpb24iLCJpZHgiLCJpdGVtIiwiYXJyIiwicHJvZHVjdF93cmFwcGVyIiwiZmluZCIsInR4dCIsInJlbW92ZSIsImNvdW50TW9yZU9wdGlvbiIsInByb2R1Y3RMaW5rIiwiYXR0ciIsImFwcGVuZCIsIm1ldGhvZCIsImhlYWRlcnMiLCJ0b2tlbiIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwicXVlcnkiLCJyZXMiLCJqc29uIiwiYUZpbHRlciIsInNpdGUiLCJwcm9kdWN0cyIsImVkZ2VzIiwibm9kZSIsImVudGl0eUlkIiwicHJvZHVjdEZpZWxkQ29sb3IiLCJwcm9kdWN0RmllbGRTaXplIiwiYUZpbHRlcjIiLCJwcm9kdWN0T3B0aW9ucyIsImFGaWx0ZXIzIiwiZmlsdGVyIiwiZGlzcGxheVN0eWxlIiwiYUZpbHRlcjUiLCJkaXNwbGF5TmFtZSIsImhhbG9BZGRPcHRpb25Gb3JQcm9kdWN0MiIsImFGaWx0ZXI0IiwidmFsdWVzIiwidGl0bGVWYXIiLCJsYWJlbCIsImlkVmFyIiwibGVuZ3RoQ29sb3JWYXIiLCJoZXhDb2xvcnMiLCJjb2xvcjEiLCJjb2xvcjIiLCJjb2xvcjMiLCJpbWciLCJpbWFnZVVybCIsIkJvb2xlYW4iLCJoYWxvQWRkT3B0aW9uRm9yUHJvZHVjdFRleHQiLCJQYXJhbGxheFNjcm9sbCIsImluaXQiLCJzaG93TG9ncyIsInJvdW5kIiwiX2xvZyIsIl9pbml0ZWQiLCJfcmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwid2luZG93IiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwid2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwibW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwib1JlcXVlc3RBbmltYXRpb25GcmFtZSIsIm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiYSIsImIiLCJzZXRUaW1lb3V0IiwiX29uU2Nyb2xsIiwiX3Byb3BlcnRpZXMiLCJjb25zb2xlIiwibG9nIiwiZG9jdW1lbnQiLCJzY3JvbGxUb3AiLCJjIiwiaGVpZ2h0IiwicHJveHkiLCJkIiwiZSIsImYiLCJnIiwiaCIsImkiLCJrIiwiaiIsImwiLCJtIiwibiIsIk1hdGgiLCJtYXgiLCJvZmZzZXQiLCJ0b3AiLCJvIiwiZGlzdGFuY2UiLCJwIiwicSIsImVhc2luZyIsInIiLCJzIiwiZHVyYXRpb24iLCJ0IiwidSIsInYiLCJzbW9vdGhuZXNzIiwidyIsIm1pbiIsIm1hcCIsImNlaWwiLCJ6IiwieCIsInBlcnNwZWN0aXZlIiwieSIsInBhcmVudCIsInNjYWxlWCIsInNjYWxlWSIsInNjYWxlWiIsInNjYWxlIiwiQSIsInJvdGF0ZVgiLCJyb3RhdGVZIiwicm90YXRlWiIsIkIiLCJDIiwiSG9tZSIsIm9uUmVhZHkiLCJjb3VudERvd25IZXJvQ2Fyb3VzZWwiLCJjdXN0b21QYWdpbmciLCJsb2FkUHJvZHVjdEJ5Q2F0ZWdvcnkiLCJsb2FkUHJvZHVjdFRhYkJ5Q2F0ZWdvcnkiLCJsb2FkUHJvZHVjdEJ5Q2F0ZWdvcnlXaXRoQmFubmVyIiwiZmFuY3lib3hWaWRlb0Jhbm5lciIsImZhcXNUb2dnbGUiLCJyZWNlbnRCbG9nU2xpZGVyIiwiaG9tZVNwZWNpYWxQcm9kdWN0IiwiaG9tZVBhcmFsbGF4QmFubmVyIiwibG9hZE9wdGlvbkZvclByb2R1Y3RDYXJkIiwiY3VzdG9tZXJSZXZpZXdDYXJvdXNlbCIsImhvbWVQcm9kdWN0UmVjb21tZW5kZWQiLCJyZXZpZXdDYXJvdXNlbCIsInBhcmVudHMiLCJhZGRDbGFzcyIsImNvdW50RG93biIsImNvdW50RG93bkRhdGUiLCJEYXRlIiwiZ2V0VGltZSIsInNlZnQiLCJjb3VudGRvd25mdW5jdGlvbiIsInNldEludGVydmFsIiwibm93IiwiY2xlYXJJbnRlcnZhbCIsImh0bWwiLCJkYXlzIiwiZmxvb3IiLCJob3VycyIsIm1pbnV0ZXMiLCJzZWNvbmRzIiwic3RyQ291bnREb3duIiwiaGVyb0N1c3RvbSIsImhlcm9DdXN0b21TbGlkZSIsInNsaWNrIiwiZG90cyIsImFycm93cyIsIm1vYmlsZUZpcnN0Iiwic2xpZGVzVG9TaG93Iiwic2xpZGVzVG9TY3JvbGwiLCJhdXRvcGxheSIsImF1dG9wbGF5U3BlZWQiLCJpbmZpbml0ZSIsImFzTmF2Rm9yIiwic2xpZGUiLCJ0ZXh0Iiwib24iLCJldmVudCIsInNsaWRlciIsInBvcyIsIiRzbGlkZXMiLCJyZW1vdmVDbGFzcyIsIm9wdGlvbnMiLCJ0ZW1wbGF0ZSIsImhlYWRlcl9oZWlnaHQiLCJzY3JvbGwiLCJzZXRGbGFnIiwid3JhcCIsImNhdElkIiwiY2F0VXJsIiwiYmxvY2tJZCIsImxvYWRDYXRlZ29yeSIsImlkIiwidXJsIiwib3B0aW9uIiwidXRpbHMiLCJhcGkiLCJnZXRQYWdlIiwiZXJyIiwicmVzcG9uc2UiLCJzbGlja0Nhcm91c2VsIiwiaGFsb0FkZE9wdGlvbiIsIm5leHRBcnJvdyIsInByZXZBcnJvdyIsInJlc3BvbnNpdmUiLCJicmVha3BvaW50Iiwic2V0dGluZ3MiLCJwYXJzZUludCIsImhvbWVfcHJvZHVjdF9ibG9ja19jb2wiLCJBcnJheSIsImZyb20iLCJmb3JFYWNoIiwiJGl0ZW1FbGUiLCJibG9jayIsImluY2x1ZGVzIiwibG9jYXRpb24iLCJob3N0IiwicmVwbGFjZSIsInNob3ciLCJyZXZpZXdTaG93IiwibGltaXQiLCJxdWVyeVNlbGVjdG9yQWxsIiwicmV2aWV3MiIsIlByb21pc2UiLCJhbGwiLCJpdGVtMSIsIm5leHRFbGVtZW50U2libGluZyIsImVtcHR5IiwiaW5uZXJIVE1MIiwicmV2aWV3MyIsInZpZHUiLCJnb2t1IiwicmV2aWV3QXZnIiwicmVkdWNlIiwiY2F0Y2giLCJob21lX3Byb2R1Y3RfYmxvY2tfdGFiX2NvbCIsIiR0YWJTb3J0aW5nIiwiaGFzQ2xhc3MiLCJwcmV2ZW50RGVmYXVsdCIsIiR0YXJnZXQiLCJjdXJyZW50VGFyZ2V0IiwiZGF0YVRhYiIsIiR0aGlzQmxvY2siLCJjbG9zZXN0IiwiaHJlZiIsImxhYmVsRmxhc2hEZWFscyIsInNsaWNrQ2Fyb3VzZWw0Iiwic2xpY2tDYXJvdXNlbDMiLCJzbGlja0Nhcm91c2VsMiIsImhvbWVfcHJvZHVjdF9ibG9ja193aXRoX2Jhbm5lcl9jb2wiLCIkaXRlbVNpZGUiLCIkdGhpc0xhYmVsIiwiZmFuY3lib3giLCJub3QiLCJzbGlkZURvd24iLCJzbGlkZVVwIiwid2lkdGgiLCJyZXNpemUiLCJob21lX3Byb2R1Y3RfYmxvY2tfc3BlY2lhbCIsInZpZXdpbmdQcm9kdWN0Iiwidmlld2VyVGV4dCIsInByb2R1Y3Rfdmlld2luZ1Byb2R1Y3RfdGV4dCIsIm51bWJlcnNWaWV3ZXJfdGV4dCIsInByb2R1Y3Rfdmlld2luZ1Byb2R1Y3Rfdmlld2VyIiwibnVtYmVyc1ZpZXdlckxpc3QiLCJwYXJzZSIsIm51bWJlcnNWaWV3ZXJJdGVtIiwicmFuZG9tIiwiY291bnREb3duUHJvZHVjdCIsInNvbGRQcm9kdWN0IiwibnVtYmVyc1Byb2R1Y3RfdGV4dCIsInByb2R1Y3Rfc29sZFByb2R1Y3RfcHJvZHVjdHMiLCJudW1iZXJzSG91cnNfdGV4dCIsInByb2R1Y3Rfc29sZFByb2R1Y3RfaG91cnMiLCJzb2xkUHJvZHVjdFRleHQiLCJwcm9kdWN0X3NvbGRQcm9kdWN0X3RleHQiLCJzb2xkUHJvZHVjdFRleHQyIiwicHJvZHVjdF9zb2xkUHJvZHVjdF9ob3Vyc190ZXh0IiwibnVtYmVyc1Byb2R1Y3RMaXN0IiwibnVtYmVyc1Byb2R1Y3RJdGVtIiwibnVtYmVyc0hvdXJzTGlzdCIsIm51bWJlcnNIb3Vyc0l0ZW0iLCJpbml0VGh1bWJuYWlsc0hlaWdodCIsIiRzY29wZSIsImVsIiwiJGNhcm91c2VsX25hdiIsIiRjYXJvdXNlbF9mb3IiLCJwcm9kdWN0IiwiZ2V0QnlJZCIsInNjb3BlIiwiZ2V0Iiwic2V0UG9zaXRpb24iLCJoYWxvTm90aWZ5TWUiLCJoYWxvWW91dHViZUNhcm91c2VsIiwic2libGluZ3MiLCJzdG9wUHJvcGFnYXRpb24iLCJ0YXJnZXQiLCJwcm9kdWN0RGV0YWlscyIsIlByb2R1Y3REZXRhaWxzIiwic2V0UHJvZHVjdFZhcmlhbnQiLCJpbWFnZSIsImNzcyIsIiRwcm9kV3JhcElkIiwiYWRhcHRpdmVIZWlnaHQiLCJwcm9kdWN0SWRzIiwic3BsaXQiLCJza3VzIiwicmV2IiwiY29udGVudCIsImVxIiwiJGhvbWVQR0YiLCIkaG9tZVBHRl9ncmlkIiwiaG9tZVBHRl9pdGVtTGVuZ3RoIiwiJGhvbWVQR0ZfYnRuQmxvY2siLCIkaG9tZVBHRl9idG4iLCJkYXRhQ29sdW1uIiwidHRfcHJvZHVjdFNob3ciLCJmV2lkdGgiLCJpbm5lcldpZHRoIiwid1dpZHRoIiwiUGFnZU1hbmFnZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQStDO0FBQy9DLElBQU1BLEtBQUssR0FBR0MsbUJBQU8sQ0FBQyx3REFBWSxDQUFDO0FBRXBCLHlFQUFTQyxPQUFPLEVBQUVDLE9BQU8sRUFBRTtFQUN0QyxJQUFJRCxPQUFPLENBQUNFLGFBQWEsQ0FBQ0MsdUJBQXVCLElBQUksSUFBSSxFQUFFO0lBQUEsSUFNOUNDLGlCQUFpQixHQUExQixTQUFTQSxpQkFBaUIsR0FBRztNQUN6QkMsYUFBYSxDQUFDQyxJQUFJLENB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Q0E7O0lBR0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBOztJQUVBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0k7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBOztJQUVBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7O0lBRUE7SUFDQTtJQUNBO0lBQ0E7O0lBRUE7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7O0lBRUE7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBOztJQUVBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBOztJQUVBO0lBQ0E7SUFDQTs7SUFFQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFD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SSxRQUFRLENBQUMsU0FBUyxDQUFDO1VBQ2xGO1FBQ0o7TUFDSixDQUFDLENBQUM7SUFDTjtFQUNKLENBQUM7RUFBQTtBQUFBLEVBdmxENkIrSyxxREFBVyIsImZpbGUiOiJ0aGVtZS1idW5kbGUuY2h1bmsuMTAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdXRpbHMgZnJvbSAnQGJpZ2NvbW1lcmNlL3N0ZW5jaWwtdXRpbHMnO1xuY29uc3QgZmV0Y2ggPSByZXF1aXJlKCdub2RlLWZldGNoJyk7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGNvbnRleHQsIHdyYXBwZXIpIHtcbiAgICBpZiAoY29udGV4dC50aGVtZVNldHRpbmdzLmhhbG9BZGRPcHRpb25Gb3JQcm9kdWN0ID09IHRydWUpIHtcbiAgICAgICAgY29uc3QgdG9rZW4gPSBjb250ZXh0LnRva2VuLFxuICAgICAgICAgICAgcHJvZHVjdF93cmFwcGVyID0gJCgnIycrd3JhcHBlciksXG4gICAgICAgICAgICBwcm9kdWN0X2NsYXNzID0gcHJvZHVjdF93cmFwcGVyLmZpbmQoJy5jYXJkJyk7XG4gICAgICAgIHZhciAgbGlzdCA9IFtdO1xuXG4gICAgICAgIGZ1bmN0aW9uIGNhbGxQcm9kdWN0T3B0aW9uKCkge1xuICAgICAgICAgICAgcHJvZHVjdF9jbGFzcy5lYWNoKChpbmRleCwgZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgICAgIHZhciBwcm9kdWN0SWQgPSAkKGVsZW1lbnQpLmRhdGEoXCJwcm9kdWN0LWlkXCIpO1xuXG4gICAgICAgICAgICAgICAgbGlzdC5wdXNoKHByb2R1Y3RJZC50b1N0cmluZygpKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZihsaXN0Lmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgIGdldFByb2R1Y3RPcHRpb24obGlzdCkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVuZGVyT3B0aW9uKGRhdGEpO1xuXG4gICAgICAgICAgICAgICAgICAgICQuZWFjaChsaXN0LCAoaWR4LCBpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXJyID0ge30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvZHVjdElkID0gbGlzdFtpZHhdO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9kdWN0X3dyYXBwZXIuZmluZCgnLmNhcmQtb3B0aW9uLScrcHJvZHVjdElkKycgLmZvcm0tb3B0aW9uLXN3YXRjaCcpLmVhY2goKGluZGV4LCBlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHR4dCA9ICQoZWxlbWVudCkuZGF0YSgncHJvZHVjdC1zd2F0Y2gtdmFsdWUnKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhcnJbdHh0XSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoZWxlbWVudCkucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyW3R4dF0gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihwcm9kdWN0X3dyYXBwZXIuZmluZCgnLmNhcmQtb3B0aW9uLScrcHJvZHVjdElkKycgLmZvcm0tb3B0aW9uLXN3YXRjaCcpLmxlbmd0aCA+IDQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb3VudE1vcmVPcHRpb24gID0gcHJvZHVjdF93cmFwcGVyLmZpbmQoJy5jYXJkLW9wdGlvbi0nK3Byb2R1Y3RJZCsnIC5mb3JtLW9wdGlvbi1zd2F0Y2gnKS5sZW5ndGggLSA0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9kdWN0TGluayA9IHByb2R1Y3Rfd3JhcHBlci5maW5kKCdbZGF0YS1wcm9kdWN0LWlkPVwiJytwcm9kdWN0SWQrJ1wiXScpLmZpbmQoJy5jYXJkLWxpbmsnKS5hdHRyKCdocmVmJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9kdWN0X3dyYXBwZXIuZmluZCgnLmNhcmQtb3B0aW9uLScrcHJvZHVjdElkKycgLmZvcm0tb3B0aW9uLXN3YXRjaCcpLmVhY2goKGluZGV4LCBlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGluZGV4ID49IDQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJChlbGVtZW50KS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYocHJvZHVjdF93cmFwcGVyLmZpbmQoJy5jYXJkLW9wdGlvbi0nK3Byb2R1Y3RJZCsnIC5mb3JtLWZpZWxkIC5zaG93bW9yZScpLmxlbmd0aCA8IDEpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9kdWN0X3dyYXBwZXIuZmluZCgnLmNhcmQtb3B0aW9uLScrcHJvZHVjdElkKycgLmZvcm0tZmllbGQ6bm90KC5mb3JtLWZpZWxkLS1zaXplKScpLmFwcGVuZCgnPGEgaHJlZj1cIicrcHJvZHVjdExpbmsrJ1wiIGNsYXNzPVwic2hvd21vcmVcIj4rJytjb3VudE1vcmVPcHRpb24rJzwvYT4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBnZXRQcm9kdWN0T3B0aW9uKGxpc3Qpe1xuICAgICAgICAgICAgcmV0dXJuIGZldGNoKCcvZ3JhcGhxbCcsIHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiAnQmVhcmVyICcgKyB0b2tlblxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgICAgcXVlcnk6IGBcbiAgICAgICAgICAgICAgICAgICAgcXVlcnkgU2V2ZXJhbFByb2R1Y3RzQnlJRCB7XG4gICAgICAgICAgICAgICAgICAgICAgc2l0ZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9kdWN0cyhlbnRpdHlJZHM6IFtgK2xpc3QrYF0sIGZpcnN0OiA1MCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBlZGdlcyB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbnRpdHlJZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2R1Y3RPcHRpb25zKGZpcnN0OiA1MCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlZGdlcyB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbnRpdHlJZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheU5hbWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzUmVxdWlyZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLiBvbiBNdWx0aXBsZUNob2ljZU9wdGlvbiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlTdHlsZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXMge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVkZ2VzIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbnRpdHlJZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0RlZmF1bHRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4uIG9uIFN3YXRjaE9wdGlvblZhbHVlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZXhDb2xvcnNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWFnZVVybCh3aWR0aDogNTApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIGB9KSxcbiAgICAgICAgICAgIH0pLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpLnRoZW4ocmVzID0+IHJlcy5kYXRhKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHJlbmRlck9wdGlvbihkYXRhKXtcbiAgICAgICAgICAgIHZhciBhRmlsdGVyID0gZGF0YS5zaXRlLnByb2R1Y3RzLmVkZ2VzO1xuXG4gICAgICAgICAgICAkLmVhY2goYUZpbHRlciwgKGluZGV4LCBlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIHByb2R1Y3RJZCA9IGFGaWx0ZXJbaW5kZXhdLm5vZGUuZW50aXR5SWQsXG4gICAgICAgICAgICAgICAgICAgIHByb2R1Y3RGaWVsZENvbG9yID0gcHJvZHVjdF93cmFwcGVyLmZpbmQoJy5jYXJkLW9wdGlvbi0nK3Byb2R1Y3RJZCsnIC5mb3JtLWZpZWxkOm5vdCguZm9ybS1maWVsZC0tc2l6ZSknKSxcbiAgICAgICAgICAgICAgICAgICAgcHJvZHVjdEZpZWxkU2l6ZSA9IHByb2R1Y3Rfd3JhcHBlci5maW5kKCcuY2FyZC1vcHRpb24tJytwcm9kdWN0SWQrJyAuZm9ybS1maWVsZC0tc2l6ZScpLFxuICAgICAgICAgICAgICAgICAgICBhRmlsdGVyMiA9IGFGaWx0ZXJbaW5kZXhdLm5vZGUucHJvZHVjdE9wdGlvbnMuZWRnZXM7XG5cbiAgICAgICAgICAgICAgICB2YXIgYUZpbHRlcjMgPSBhRmlsdGVyMi5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0ubm9kZS5kaXNwbGF5U3R5bGUgPT09ICdTd2F0Y2gnO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgdmFyIGFGaWx0ZXI1ID0gYUZpbHRlcjIuZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLm5vZGUuZGlzcGxheU5hbWUgPT09IGNvbnRleHQudGhlbWVTZXR0aW5ncy5oYWxvQWRkT3B0aW9uRm9yUHJvZHVjdDI7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBpZihhRmlsdGVyMy5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFGaWx0ZXI0ID0gYUZpbHRlcjNbMF0ubm9kZS52YWx1ZXMuZWRnZXM7XG5cbiAgICAgICAgICAgICAgICAgICAgJC5lYWNoKGFGaWx0ZXI0LCAoaWR4LCBlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdGl0bGVWYXIgPSBhRmlsdGVyNFtpZHhdLm5vZGUubGFiZWwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWRWYXIgPSBhRmlsdGVyNFtpZHhdLm5vZGUuZW50aXR5SWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVuZ3RoQ29sb3JWYXIgPSBhRmlsdGVyNFtpZHhdLm5vZGUuaGV4Q29sb3JzLmxlbmd0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjEgPSBhRmlsdGVyNFtpZHhdLm5vZGUuaGV4Q29sb3JzWzBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yMiA9IGFGaWx0ZXI0W2lkeF0ubm9kZS5oZXhDb2xvcnNbMV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3IzID0gYUZpbHRlcjRbaWR4XS5ub2RlLmhleENvbG9yc1syXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWcgPSBhRmlsdGVyNFtpZHhdLm5vZGUuaW1hZ2VVcmw7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGxlbmd0aENvbG9yVmFyID09IDIpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2R1Y3RGaWVsZENvbG9yLmFwcGVuZCgnPGxhYmVsIGNsYXNzPVwiZm9ybS1vcHRpb24gZm9ybS1vcHRpb24tc3dhdGNoXCIgZGF0YS1wcm9kdWN0LXN3YXRjaC12YWx1ZT1cIicraWRWYXIrJ1wiPjxzcGFuIGNsYXNzPVwiZm9ybS1vcHRpb24tdG9vbHRpcFwiPicrdGl0bGVWYXIrJzwvc3Bhbj48c3BhbiBjbGFzcz1cImZvcm0tb3B0aW9uLXZhcmlhbnQgZm9ybS1vcHRpb24tdmFyaWFudC0tY29sb3IgZm9ybS1vcHRpb24tdmFyaWFudC0tY29sb3IyXCIgdGl0bGU9XCInK3RpdGxlVmFyKydcIj48c3BhbiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6Jytjb2xvcjErJ1wiPjwvc3Bhbj48c3BhbiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6Jytjb2xvcjIrJ1wiPjwvc3Bhbj48L3NwYW4+PC9sYWJlbD4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZihsZW5ndGhDb2xvclZhciA9PT0gMyl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvZHVjdEZpZWxkQ29sb3IuYXBwZW5kKCc8bGFiZWwgY2xhc3M9XCJmb3JtLW9wdGlvbiBmb3JtLW9wdGlvbi1zd2F0Y2hcIiBkYXRhLXByb2R1Y3Qtc3dhdGNoLXZhbHVlPVwiJytpZFZhcisnXCI+PHNwYW4gY2xhc3M9XCJmb3JtLW9wdGlvbi10b29sdGlwXCI+Jyt0aXRsZVZhcisnPC9zcGFuPjxzcGFuIGNsYXNzPVwiZm9ybS1vcHRpb24tdmFyaWFudCBmb3JtLW9wdGlvbi12YXJpYW50LS1jb2xvciBmb3JtLW9wdGlvbi12YXJpYW50LS1jb2xvcjJcIiB0aXRsZT1cIicrdGl0bGVWYXIrJ1wiPjxzcGFuIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjonK2NvbG9yMSsnXCI+PC9zcGFuPjxzcGFuIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjonK2NvbG9yMisnXCI+PC9zcGFuPjxzcGFuIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjonK2NvbG9yMysnXCI+PC9zcGFuPjwvc3Bhbj48L2xhYmVsPicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmKEJvb2xlYW4oY29sb3IxKSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvZHVjdEZpZWxkQ29sb3IuYXBwZW5kKCc8bGFiZWwgY2xhc3M9XCJmb3JtLW9wdGlvbiBmb3JtLW9wdGlvbi1zd2F0Y2hcIiBkYXRhLXByb2R1Y3Qtc3dhdGNoLXZhbHVlPVwiJytpZFZhcisnXCI+PHNwYW4gY2xhc3M9XCJmb3JtLW9wdGlvbi10b29sdGlwXCI+Jyt0aXRsZVZhcisnPC9zcGFuPjxzcGFuIGNsYXNzPVwiZm9ybS1vcHRpb24tdmFyaWFudCBmb3JtLW9wdGlvbi12YXJpYW50LS1jb2xvclwiIHRpdGxlPVwiJyt0aXRsZVZhcisnXCIgc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiAnK2NvbG9yMSsnXCI+PC9zcGFuPjwvbGFiZWw+Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYoQm9vbGVhbihpbWcpKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9kdWN0RmllbGRDb2xvci5hcHBlbmQoJzxsYWJlbCBjbGFzcz1cImZvcm0tb3B0aW9uIGZvcm0tb3B0aW9uLXN3YXRjaFwiIGRhdGEtcHJvZHVjdC1zd2F0Y2gtdmFsdWU9XCInK2lkVmFyKydcIj48c3BhbiBjbGFzcz1cImZvcm0tb3B0aW9uLXRvb2x0aXBcIj4nK3RpdGxlVmFyKyc8L3NwYW4+PHNwYW4gY2xhc3M9XCJmb3JtLW9wdGlvbi12YXJpYW50IGZvcm0tb3B0aW9uLXZhcmlhbnQtLXBhdHRlcm5cIiB0aXRsZT1cIicrdGl0bGVWYXIrJ1wiIHN0eWxlPVwiYmFja2dyb3VuZC1pbWFnZTogdXJsKCcraW1nKycpXCI+PC9zcGFuPjwvbGFiZWw+Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgcHJvZHVjdEZpZWxkQ29sb3IucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYoYUZpbHRlcjUubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAgICAgICAgIGlmKHByb2R1Y3RGaWVsZFNpemUubGVuZ3RoIDwgMSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9kdWN0X3dyYXBwZXIuZmluZCgnLmNhcmQtb3B0aW9uLScrcHJvZHVjdElkKycnKS5hcHBlbmQoJzxkaXYgY2xhc3M9XCJmb3JtLWZpZWxkIGZvcm0tZmllbGQtLXNpemVcIj48bGFiZWwgY2xhc3M9XCJmb3JtLW9wdGlvblwiPicrY29udGV4dC50aGVtZVNldHRpbmdzLmhhbG9BZGRPcHRpb25Gb3JQcm9kdWN0VGV4dC50b1N0cmluZygpKyc8L2xhYmVsPjwvZGl2PicpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYoKGFGaWx0ZXI1Lmxlbmd0aCA9PSAwKSAmJiAoYUZpbHRlcjMubGVuZ3RoID09IDApKXtcbiAgICAgICAgICAgICAgICAgICAgcHJvZHVjdF93cmFwcGVyLmZpbmQoJy5jYXJkLW9wdGlvbi0nK3Byb2R1Y3RJZCsnJykucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBjYWxsUHJvZHVjdE9wdGlvbigpO1xuICAgIH1cbn1cbiIsIiQoZnVuY3Rpb24oKXtQYXJhbGxheFNjcm9sbC5pbml0KCl9KTt2YXIgUGFyYWxsYXhTY3JvbGw9e3Nob3dMb2dzOiExLHJvdW5kOjFlMyxpbml0OmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuX2xvZyhcImluaXRcIiksdGhpcy5faW5pdGVkPyh0aGlzLl9sb2coXCJBbHJlYWR5IEluaXRlZFwiKSx2b2lkKHRoaXMuX2luaXRlZD0hMCkpOih0aGlzLl9yZXF1ZXN0QW5pbWF0aW9uRnJhbWU9ZnVuY3Rpb24oKXtyZXR1cm4gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZXx8d2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZXx8d2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZXx8d2luZG93Lm9SZXF1ZXN0QW5pbWF0aW9uRnJhbWV8fHdpbmRvdy5tc1JlcXVlc3RBbmltYXRpb25GcmFtZXx8ZnVuY3Rpb24oYSxiKXt3aW5kb3cuc2V0VGltZW91dChhLDFlMy82MCl9fSgpLHZvaWQgdGhpcy5fb25TY3JvbGwoITApKX0sX2luaXRlZDohMSxfcHJvcGVydGllczpbXCJ4XCIsXCJ5XCIsXCJ6XCIsXCJyb3RhdGVYXCIsXCJyb3RhdGVZXCIsXCJyb3RhdGVaXCIsXCJzY2FsZVhcIixcInNjYWxlWVwiLFwic2NhbGVaXCIsXCJzY2FsZVwiXSxfcmVxdWVzdEFuaW1hdGlvbkZyYW1lOm51bGwsX2xvZzpmdW5jdGlvbihhKXt0aGlzLnNob3dMb2dzJiZjb25zb2xlLmxvZyhcIlBhcmFsbGF4IFNjcm9sbCAvIFwiK2EpfSxfb25TY3JvbGw6ZnVuY3Rpb24oYSl7dmFyIGI9JChkb2N1bWVudCkuc2Nyb2xsVG9wKCksYz0kKHdpbmRvdykuaGVpZ2h0KCk7dGhpcy5fbG9nKFwib25TY3JvbGwgXCIrYiksJChcIltkYXRhLXBhcmFsbGF4XVwiKS5lYWNoKCQucHJveHkoZnVuY3Rpb24oZCxlKXt2YXIgZj0kKGUpLGc9W10saD0hMSxpPWYuZGF0YShcInN0eWxlXCIpO3ZvaWQgMD09aSYmKGk9Zi5hdHRyKFwic3R5bGVcIil8fFwiXCIsZi5kYXRhKFwic3R5bGVcIixpKSk7dmFyIGssaj1bZi5kYXRhKFwicGFyYWxsYXhcIildO2ZvcihrPTI7Zi5kYXRhKFwicGFyYWxsYXhcIitrKTtrKyspai5wdXNoKGYuZGF0YShcInBhcmFsbGF4LVwiK2spKTt2YXIgbD1qLmxlbmd0aDtmb3Ioaz0wO2s8bDtrKyspe3ZhciBtPWpba10sbj1tW1wiZnJvbS1zY3JvbGxcIl07dm9pZCAwPT1uJiYobj1NYXRoLm1heCgwLCQoZSkub2Zmc2V0KCkudG9wLWMpKSxuPTB8bjt2YXIgbz1tLmRpc3RhbmNlLHA9bVtcInRvLXNjcm9sbFwiXTt2b2lkIDA9PW8mJnZvaWQgMD09cCYmKG89Yyksbz1NYXRoLm1heCgwfG8sMSk7dmFyIHE9bS5lYXNpbmcscj1tW1wiZWFzaW5nLXJldHVyblwiXTtpZih2b2lkIDAhPXEmJiQuZWFzaW5nJiYkLmVhc2luZ1txXXx8KHE9bnVsbCksdm9pZCAwIT1yJiYkLmVhc2luZyYmJC5lYXNpbmdbcl18fChyPXEpLHEpe3ZhciBzPW0uZHVyYXRpb247dm9pZCAwPT1zJiYocz1vKSxzPU1hdGgubWF4KDB8cywxKTt2YXIgdD1tW1wiZHVyYXRpb24tcmV0dXJuXCJdO3ZvaWQgMD09dCYmKHQ9cyksbz0xO3ZhciB1PWYuZGF0YShcImN1cnJlbnQtdGltZVwiKTt2b2lkIDA9PXUmJih1PTApfXZvaWQgMD09cCYmKHA9bitvKSxwPTB8cDt2YXIgdj1tLnNtb290aG5lc3M7dm9pZCAwPT12JiYodj0zMCksdj0wfHYsKGF8fDA9PXYpJiYodj0xKSx2PTB8djt2YXIgdz1iO3c9TWF0aC5tYXgodyxuKSx3PU1hdGgubWluKHcscCkscSYmKHZvaWQgMD09Zi5kYXRhKFwic2Vuc1wiKSYmZi5kYXRhKFwic2Vuc1wiLFwiYmFja1wiKSx3Pm4mJihcImJhY2tcIj09Zi5kYXRhKFwic2Vuc1wiKT8odT0xLGYuZGF0YShcInNlbnNcIixcImdvXCIpKTp1KyspLHc8cCYmKFwiZ29cIj09Zi5kYXRhKFwic2Vuc1wiKT8odT0xLGYuZGF0YShcInNlbnNcIixcImJhY2tcIikpOnUrKyksYSYmKHU9cyksZi5kYXRhKFwiY3VycmVudC10aW1lXCIsdSkpLHRoaXMuX3Byb3BlcnRpZXMubWFwKCQucHJveHkoZnVuY3Rpb24oYSl7dmFyIGI9MCxjPW1bYV07aWYodm9pZCAwIT1jKXtcInNjYWxlXCI9PWF8fFwic2NhbGVYXCI9PWF8fFwic2NhbGVZXCI9PWF8fFwic2NhbGVaXCI9PWE/Yj0xOmM9MHxjO3ZhciBkPWYuZGF0YShcIl9cIithKTt2b2lkIDA9PWQmJihkPWIpO3ZhciBlPShjLWIpKigody1uKS8ocC1uKSkrYixpPWQrKGUtZCkvdjtpZihxJiZ1PjAmJnU8PXMpe3ZhciBqPWI7XCJiYWNrXCI9PWYuZGF0YShcInNlbnNcIikmJihqPWMsYz0tYyxxPXIscz10KSxpPSQuZWFzaW5nW3FdKG51bGwsdSxqLGMscyl9aT1NYXRoLmNlaWwoaSp0aGlzLnJvdW5kKS90aGlzLnJvdW5kLGk9PWQmJmU9PWMmJihpPWMpLGdbYV18fChnW2FdPTApLGdbYV0rPWksZCE9Z1thXSYmKGYuZGF0YShcIl9cIithLGdbYV0pLGg9ITApfX0sdGhpcykpfWlmKGgpe2lmKHZvaWQgMCE9Zy56KXt2YXIgeD1tLnBlcnNwZWN0aXZlO3ZvaWQgMD09eCYmKHg9ODAwKTt2YXIgeT1mLnBhcmVudCgpO3kuZGF0YShcInN0eWxlXCIpfHx5LmRhdGEoXCJzdHlsZVwiLHkuYXR0cihcInN0eWxlXCIpfHxcIlwiKSx5LmF0dHIoXCJzdHlsZVwiLFwicGVyc3BlY3RpdmU6XCIreCtcInB4OyAtd2Via2l0LXBlcnNwZWN0aXZlOlwiK3grXCJweDsgXCIreS5kYXRhKFwic3R5bGVcIikpfXZvaWQgMD09Zy5zY2FsZVgmJihnLnNjYWxlWD0xKSx2b2lkIDA9PWcuc2NhbGVZJiYoZy5zY2FsZVk9MSksdm9pZCAwPT1nLnNjYWxlWiYmKGcuc2NhbGVaPTEpLHZvaWQgMCE9Zy5zY2FsZSYmKGcuc2NhbGVYKj1nLnNjYWxlLGcuc2NhbGVZKj1nLnNjYWxlLGcuc2NhbGVaKj1nLnNjYWxlKTt2YXIgej1cInRyYW5zbGF0ZTNkKFwiKyhnLng/Zy54OjApK1wicHgsIFwiKyhnLnk/Zy55OjApK1wicHgsIFwiKyhnLno/Zy56OjApK1wicHgpXCIsQT1cInJvdGF0ZVgoXCIrKGcucm90YXRlWD9nLnJvdGF0ZVg6MCkrXCJkZWcpIHJvdGF0ZVkoXCIrKGcucm90YXRlWT9nLnJvdGF0ZVk6MCkrXCJkZWcpIHJvdGF0ZVooXCIrKGcucm90YXRlWj9nLnJvdGF0ZVo6MCkrXCJkZWcpXCIsQj1cInNjYWxlWChcIitnLnNjYWxlWCtcIikgc2NhbGVZKFwiK2cuc2NhbGVZK1wiKSBzY2FsZVooXCIrZy5zY2FsZVorXCIpXCIsQz16K1wiIFwiK0ErXCIgXCIrQitcIjtcIjt0aGlzLl9sb2coQyksZi5hdHRyKFwic3R5bGVcIixcInRyYW5zZm9ybTpcIitDK1wiIC13ZWJraXQtdHJhbnNmb3JtOlwiK0MrXCIgXCIraSl9fSx0aGlzKSksd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZT93aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCQucHJveHkodGhpcy5fb25TY3JvbGwsdGhpcywhMSkpOnRoaXMuX3JlcXVlc3RBbmltYXRpb25GcmFtZSgkLnByb3h5KHRoaXMuX29uU2Nyb2xsLHRoaXMsITEpKX19O1xuIiwiaW1wb3J0ICdmb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24vZm91bmRhdGlvbic7XHJcbmltcG9ydCAnZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uL2ZvdW5kYXRpb24uZHJvcGRvd24nO1xyXG5pbXBvcnQgZmFuY3lib3ggZnJvbSAnLi9oYWxvdGhlbWVzL2pxdWVyeS5mYW5jeWJveC5taW4nO1xyXG5pbXBvcnQgUGFnZU1hbmFnZXIgZnJvbSAnLi9wYWdlLW1hbmFnZXInO1xyXG5pbXBvcnQgdXRpbHMgZnJvbSAnQGJpZ2NvbW1lcmNlL3N0ZW5jaWwtdXRpbHMnO1xyXG5pbXBvcnQgaGFsb0FkZE9wdGlvbiBmcm9tICcuL2hhbG90aGVtZXMvaGFsb0FkZE9wdGlvbkZvclByb2R1Y3RDYXJkJztcclxuaW1wb3J0IHBhcmFsbGF4IGZyb20gJy4vaGFsb3RoZW1lcy9wYXJhbGxheC9qcXVlcnkucGFyYWxsYXgtc2Nyb2xsLm1pbic7XHJcbmltcG9ydCBQcm9kdWN0RGV0YWlscyBmcm9tICcuL2NvbW1vbi9wcm9kdWN0LWRldGFpbHMnO1xyXG5pbXBvcnQgeyBkZWZhdWx0TW9kYWwsIG1vZGFsVHlwZXMgfSBmcm9tICcuL2dsb2JhbC9tb2RhbCc7XHJcbmltcG9ydCBoYWxvWW91dHViZUNhcm91c2VsIGZyb20gJy4vaGFsb3RoZW1lcy9oYWxvVmlkZW8nO1xyXG5pbXBvcnQgaGFsb05vdGlmeU1lIGZyb20gJy4vaGFsb3RoZW1lcy9oYWxvTm90aWZ5TWUnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSG9tZSBleHRlbmRzIFBhZ2VNYW5hZ2VyIHtcclxuICAgIGNvbnN0cnVjdG9yKGNvbnRleHQpIHtcclxuICAgICAgICBzdXBlcihjb250ZXh0KTtcclxuICAgIH1cclxuXHJcbiAgICBvblJlYWR5KCkge1xyXG4gICAgICAgIHRoaXMuY291bnREb3duSGVyb0Nhcm91c2VsKCk7XHJcbiAgICAgICAgdGhpcy5jdXN0b21QYWdpbmcoKTtcclxuICAgICAgICB0aGlzLmxvYWRQcm9kdWN0QnlDYXRlZ29yeSgpO1xyXG4gICAgICAgIHRoaXMubG9hZFByb2R1Y3RUYWJCeUNhdGVnb3J5KCk7XHJcbiAgICAgICAgdGhpcy5sb2FkUHJvZHVjdEJ5Q2F0ZWdvcnlXaXRoQmFubmVyKCk7XHJcbiAgICAgICAgdGhpcy5mYW5jeWJveFZpZGVvQmFubmVyKCk7XHJcbiAgICAgICAgdGhpcy5mYXFzVG9nZ2xlKCk7XHJcbiAgICAgICAgdGhpcy5yZWNlbnRCbG9nU2xpZGVyKCk7XHJcbiAgICAgICAgdGhpcy5ob21lU3BlY2lhbFByb2R1Y3QoKTtcclxuICAgICAgICB0aGlzLmhvbWVQYXJhbGxheEJhbm5lcigpO1xyXG4gICAgICAgIHRoaXMubG9hZE9wdGlvbkZvclByb2R1Y3RDYXJkKCk7XHJcbiAgICAgICAgdGhpcy5jdXN0b21lclJldmlld0Nhcm91c2VsKCk7XHJcbiAgICAgICAgdGhpcy5ob21lUHJvZHVjdFJlY29tbWVuZGVkKCk7XHJcbiAgICAgICAgdGhpcy5yZXZpZXdDYXJvdXNlbCgpXHJcblxyXG4gICAgfVxyXG5cclxuICAgIGNvdW50RG93bkhlcm9DYXJvdXNlbCgpIHtcclxuICAgICAgICAkKCcuaGVyb0Nhcm91c2VsLWNvdW50ZG93bicpLmVhY2goKGluZGV4LCBlbGVtZW50KSA9PiB7XHJcbiAgICAgICAgICAgICQoZWxlbWVudCkucGFyZW50cygnLnNsaWNrLXNsaWRlJykuYWRkQ2xhc3MoJ2hhcy1jb3VudC1kb3duJyk7XHJcblxyXG4gICAgICAgICAgICB2YXIgY291bnREb3duID0gJChlbGVtZW50KS5kYXRhKCdjYXJvdXNlbC1jb3VudGRvd24nKSxcclxuICAgICAgICAgICAgICAgIGNvdW50RG93bkRhdGUgPSBuZXcgRGF0ZShjb3VudERvd24pLmdldFRpbWUoKSxcclxuICAgICAgICAgICAgICAgIHNlZnQgPSAkKGVsZW1lbnQpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGNvdW50ZG93bmZ1bmN0aW9uID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbm93ID0gbmV3IERhdGUoKS5nZXRUaW1lKCksXHJcbiAgICAgICAgICAgICAgICBkaXN0YW5jZSA9IGNvdW50RG93bkRhdGUgLSBub3c7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGRpc3RhbmNlIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoY291bnRkb3duZnVuY3Rpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlZnQuaHRtbCgnJyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkYXlzID0gTWF0aC5mbG9vcihkaXN0YW5jZSAvICgxMDAwICogNjAgKiA2MCAqIDI0KSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhvdXJzID0gTWF0aC5mbG9vcigoZGlzdGFuY2UgJSAoMTAwMCAqIDYwICogNjAgKiAyNCkpIC8gKDEwMDAgKiA2MCAqIDYwKSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pbnV0ZXMgPSBNYXRoLmZsb29yKChkaXN0YW5jZSAlICgxMDAwICogNjAgKiA2MCkpIC8gKDEwMDAgKiA2MCkpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWNvbmRzID0gTWF0aC5mbG9vcigoZGlzdGFuY2UgJSAoMTAwMCAqIDYwKSkgLyAxMDAwKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN0ckNvdW50RG93biA9IFwiPHNwYW4gY2xhc3M9J251bSc+XCIrZGF5cytcIjxzcGFuPkRBWVM8L3NwYW4+PC9zcGFuPjxzcGFuIGNsYXNzPSdudW0nPlwiK2hvdXJzK1wiPHNwYW4+SE9VUlM8L3NwYW4+PC9zcGFuPjxzcGFuIGNsYXNzPSdudW0nPlwiK21pbnV0ZXMrXCI8c3Bhbj5NSU5TPC9zcGFuPjwvc3Bhbj48c3BhbiBjbGFzcz0nbnVtJz5cIitzZWNvbmRzK1wiPHNwYW4+U0VDUzwvc3Bhbj48L3NwYW4+XCI7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNlZnQuaHRtbChzdHJDb3VudERvd24pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjdXN0b21QYWdpbmcoKXtcclxuICAgICAgICBjb25zdCBoZXJvQ3VzdG9tID0gJCgnLmhlcm9DYXJvdXNlbC1jdXN0b20nKTtcclxuICAgICAgICBjb25zdCBoZXJvQ3VzdG9tU2xpZGUgPSAkKCcuaGVyb0Nhcm91c2VsLWN1c3RvbSAuc2xpY2stZG90cyBsaScpO1xyXG4gICAgICAgIGhlcm9DdXN0b20uc2xpY2soe1xyXG4gICAgICAgICAgICBkb3RzOiB0cnVlLFxyXG4gICAgICAgICAgICBhcnJvd3M6IGZhbHNlLFxyXG4gICAgICAgICAgICBtb2JpbGVGaXJzdDogdHJ1ZSxcclxuICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxyXG4gICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcclxuICAgICAgICAgICAgYXV0b3BsYXk6IGZhbHNlLFxyXG4gICAgICAgICAgICBhdXRvcGxheVNwZWVkOiBoZXJvQ3VzdG9tLmRhdGEoJ2F1dG9wbGF5JyksXHJcbiAgICAgICAgICAgIGluZmluaXRlOiB0cnVlLFxyXG4gICAgICAgICAgICBhc05hdkZvcjogXCIuaGVyb0Nhcm91c2VsXCJcclxuICAgICAgICB9KTtcclxuICAgICAgICAvL0FEQVxyXG4gICAgICAgICQoJy5oZXJvQ2Fyb3VzZWwtY3VzdG9tIC5zbGljay1kb3RzIGxpJykuZWFjaChmdW5jdGlvbihpKXtcclxuICAgICAgICAgICAgdmFyIHNsaWRlID0gJCh0aGlzKS5maW5kKCdidXR0b24nKS50ZXh0KCk7XHJcbiAgICAgICAgICAgICQodGhpcykuZmluZCgnYnV0dG9uJykudGV4dCgnMCcgKyBzbGlkZSkuYWRkQ2xhc3MoJ3NsaWNrLWRvdHMtaXRlbScpO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGhlcm9DdXN0b20ub24oJ2FmdGVyQ2hhbmdlJywgKGV2ZW50LCBzbGlkZXIsIGkpID0+IHtcclxuICAgICAgICAgICAgdmFyIHBvcyA9ICQoc2xpZGVyLiRzbGlkZXNbaV0pLmZpbmQoJ2RpdltkYXRhLXBvc2l0aW9uXScpLmRhdGEoJ3Bvc2l0aW9uJyk7XHJcblxyXG4gICAgICAgICAgICBpZihwb3MgPT09ICdyaWdodCcpe1xyXG4gICAgICAgICAgICAgICAgaGVyb0N1c3RvbS5yZW1vdmVDbGFzcygnaGVyb0Nhcm91c2VsLWN1c3RvbUxlZnQnKS5hZGRDbGFzcygnaGVyb0Nhcm91c2VsLWN1c3RvbVJpZ2h0Jyk7XHJcbiAgICAgICAgICAgIH0gZWxzZXtcclxuICAgICAgICAgICAgICAgIGhlcm9DdXN0b20ucmVtb3ZlQ2xhc3MoJ2hlcm9DYXJvdXNlbC1jdXN0b21SaWdodCcpLmFkZENsYXNzKCdoZXJvQ2Fyb3VzZWwtY3VzdG9tTGVmdCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKCQoJy5oZXJvQ2Fyb3VzZWwtc2xpZGUtLWZpcnN0IC5oZXJvQ2Fyb3VzZWwtY29udGVudC13cmFwcGVyIC5oZXJvQ2Fyb3VzZWwtY29udGVudC0tcmlnaHQnKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgaGVyb0N1c3RvbS5yZW1vdmVDbGFzcygnaGVyb0Nhcm91c2VsLWN1c3RvbUxlZnQnKS5hZGRDbGFzcygnaGVyb0Nhcm91c2VsLWN1c3RvbVJpZ2h0Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGxvYWRQcm9kdWN0QnlDYXRlZ29yeSgpe1xyXG4gICAgICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzLmNvbnRleHQ7XHJcblxyXG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlOiAncHJvZHVjdHMvY2Fyb3VzZWwtMidcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBpZigkKCcuaGFsby1ibG9ja1tkYXRhLWNhdGVnb3J5LWlkXScpLmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICB2YXIgIGhlYWRlcl9oZWlnaHQgPSAkKCcuaGVhZGVyJykuaGVpZ2h0KCk7XHJcblxyXG4gICAgICAgICAgICAkKHdpbmRvdykub24oJ3Njcm9sbCBsb2FkJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc2Nyb2xsID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpLFxyXG4gICAgICAgICAgICAgICAgICAgIHNldEZsYWcgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoc2Nyb2xsID4gaGVhZGVyX2hlaWdodCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNldEZsYWcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmKHNldEZsYWcpe1xyXG4gICAgICAgICAgICAgICAgICAgICQoJy5oYWxvLWJsb2NrW2RhdGEtY2F0ZWdvcnktaWRdJykuZWFjaCgoaW5kZXgsIGVsZW1lbnQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHdyYXAgPSAkKGVsZW1lbnQpLmZpbmQoJy5wcm9kdWN0Q2Fyb3VzZWwnKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhdElkID0gJChlbGVtZW50KS5kYXRhKCdkYXRhLWNhdGVnb3J5JyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXRVcmwgPSAkKGVsZW1lbnQpLmRhdGEoJ2NhdGVnb3J5LXVybCcpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmxvY2tJZCA9ICQoZWxlbWVudCkuYXR0cignaWQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKCEkKCcjcHJvZHVjdC1ieS1jYXRlLScrY2F0SWQrJyAucHJvZHVjdENhcm91c2VsIC5wcm9kdWN0Q2Fyb3VzZWwtc2xpZGUnKS5sZW5ndGgpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9hZENhdGVnb3J5KGNhdElkLCBjYXRVcmwsIG9wdGlvbnMsIHdyYXAsIGJsb2NrSWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNldEZsYWcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBsb2FkQ2F0ZWdvcnkoaWQsIHVybCwgb3B0aW9uLCB3cmFwLCBibG9ja0lkKXtcclxuICAgICAgICAgICAgdXRpbHMuYXBpLmdldFBhZ2UodXJsLCBvcHRpb24sIChlcnIsIHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZighd3JhcC5maW5kKCcucHJvZHVjdENhcm91c2VsLXNsaWRlJykubGVuZ3RoKXtcclxuICAgICAgICAgICAgICAgICAgICB3cmFwLmh0bWwocmVzcG9uc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWNrQ2Fyb3VzZWwod3JhcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgd3JhcC5wYXJlbnRzKCcuaGFsby1ibG9ja1tkYXRhLWNhdGVnb3J5LWlkXScpLmZpbmQoJy5sb2FkaW5nT3ZlcmxheScpLnJlbW92ZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBoYWxvQWRkT3B0aW9uKGNvbnRleHQsIGJsb2NrSWQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTsgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBzbGlja0Nhcm91c2VsKHdyYXApe1xyXG4gICAgICAgICAgICB3cmFwLnNsaWNrKHtcclxuICAgICAgICAgICAgICAgIGRvdHM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBhcnJvd3M6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgaW5maW5pdGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgbW9iaWxlRmlyc3Q6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDIsXHJcbiAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcclxuICAgICAgICAgICAgICAgIG5leHRBcnJvdzogXCI8c3ZnIGNsYXNzPSdzbGljay1uZXh0IHNsaWNrLWFycm93IHNsaWNrLWFycm93LWxhcmdlJyBhcmlhLWxhYmVsPSdOZXh0IFNsaWRlJz48dXNlIHhsaW5rOmhyZWY9I3NsaWNrLWFycm93LW5leHQ+PC91c2U+PC9zdmc+XCIsIFxyXG4gICAgICAgICAgICAgICAgcHJldkFycm93OiBcIjxzdmcgY2xhc3M9J3NsaWNrLXByZXYgc2xpY2stYXJyb3cgc2xpY2stYXJyb3ctbGFyZ2UnIGFyaWEtbGFiZWw9J1ByZXZpb3VzIFNsaWRlJz48dXNlIHhsaW5rOmhyZWY9I3NsaWNrLWFycm93LXByZXY+PC91c2U+PC9zdmc+XCIsXHJcbiAgICAgICAgICAgICAgICByZXNwb25zaXZlOiBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogMTAyNCxcclxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcnJvd3M6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogcGFyc2VJbnQoY29udGV4dC50aGVtZVNldHRpbmdzLmhvbWVfcHJvZHVjdF9ibG9ja19jb2wpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiA5OTEsXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiBwYXJzZUludChjb250ZXh0LnRoZW1lU2V0dGluZ3MuaG9tZV9wcm9kdWN0X2Jsb2NrX2NvbCkgLSAxXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiA3NjcsXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiBwYXJzZUludChjb250ZXh0LnRoZW1lU2V0dGluZ3MuaG9tZV9wcm9kdWN0X2Jsb2NrX2NvbCkgLSAyXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfV1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGxvYWRQcm9kdWN0VGFiQnlDYXRlZ29yeSgpe1xyXG4gICAgICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzLmNvbnRleHQ7XHJcblxyXG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlOiAncHJvZHVjdHMvY2Fyb3VzZWwtMydcclxuICAgICAgICB9O1xyXG4gICAgICAgIGlmKCQoJy5wcm9kdWN0Q2Fyb3VzZWwtdGFicycpLmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICBpZighJCgnLnByb2R1Y3RDYXJvdXNlbC10YWJzIC50YWItY29udGVudC5pcy1hY3RpdmUgLnByb2R1Y3RDYXJvdXNlbCAucHJvZHVjdENhcm91c2VsLXNsaWRlJykubGVuZ3RoKXtcclxuICAgICAgICAgICAgICAgIEFycmF5LmZyb20oJCgnLnRhYi1jb250ZW50LmlzLWFjdGl2ZScpKS5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0ICRpdGVtRWxlID0gJChpdGVtKVxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBibG9jayA9ICRpdGVtRWxlLFxyXG4gICAgICAgICAgICAgICAgICAgIHdyYXAgPSBibG9jay5maW5kKCcucHJvZHVjdENhcm91c2VsJyksXHJcbiAgICAgICAgICAgICAgICAgICAgY2F0SWQgPSBibG9jay5kYXRhKCd0YWItY2F0ZWdvcnktaWQnKSxcclxuICAgICAgICAgICAgICAgICAgICBjYXRVcmwgPSBibG9jay5kYXRhKCd0YWItY2F0ZWdvcnktdXJsJyksXHJcbiAgICAgICAgICAgICAgICAgICAgYmxvY2tJZCA9IGJsb2NrLmF0dHIoJ2lkJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjYXRVcmwuaW5jbHVkZXMoXCJodHRwXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsb2NhdGlvbi5ob3N0LmluY2x1ZGVzKFwiZW4uc3VwZXJoYWlycGllY2VzLmVzXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXRVcmwgPSBjYXRVcmwucmVwbGFjZShcIi8vc3VwZXJoYWlycGllY2VzLmVzXCIsXCIvL2VuLnN1cGVyaGFpcnBpZWNlcy5lc1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKCEkKCcucHJvZHVjdENhcm91c2VsLXRhYnMgLnRhYi1jb250ZW50LmlzLWFjdGl2ZSAucHJvZHVjdENhcm91c2VsIC5wcm9kdWN0Q2Fyb3VzZWwtc2xpZGUnKS5sZW5ndGgpe1xyXG4gICAgICAgICAgICAgICAgICAgIGJsb2NrLmZpbmQoJy5sb2FkaW5nT3ZlcmxheScpLnNob3coKTtcclxuICAgICAgICAgICAgICAgICAgICBsb2FkQ2F0ZWdvcnkoY2F0SWQsIGNhdFVybCwgb3B0aW9ucywgd3JhcCwgYmxvY2tJZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiByZXZpZXdTaG93KHgpIHtcclxuICAgICAgICAgICAgdmFyIGxpbWl0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnJldmlld0NhcmQxJyk7XHJcbiAgICBcclxuICAgICAgICAgICAgbGV0IHJldmlldzIgPSBbXVxyXG4gICAgICAgICAgICBQcm9taXNlLmFsbChbXHJcbiAgICAgICAgICAgICAgICBmZXRjaChcImh0dHBzOi8vd3d3LnRlYW1kZXNrLm5ldC9zZWN1cmUvYXBpL3YyLzU2NTU0L0JFQTI1NjY1OTBFRjREMTRBQThEMzVBRDBFMkNFQTc3L1Jldmlldy9zZWxlY3QuanNvblwiKS50aGVuKHIgPT4gci5qc29uKCkpLnRoZW4ocj0+e1xyXG4gICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV2aWV3Mi5wdXNoKC4uLnIpfSksXHJcbiAgICAgICAgICAgICAgICBmZXRjaChcImh0dHBzOi8vd3d3LnRlYW1kZXNrLm5ldC9zZWN1cmUvYXBpL3YyLzU2NTU0L0JFQTI1NjY1OTBFRjREMTRBQThEMzVBRDBFMkNFQTc3L1Jldmlldy9zZWxlY3QuanNvbj9za2lwPTUwMFwiKS50aGVuKHIgPT4gci5qc29uKCkpLnRoZW4ocj0+e1xyXG4gICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV2aWV3Mi5wdXNoKC4uLnIpfSksXHJcbiAgICAgICAgICAgICAgICBmZXRjaChcImh0dHBzOi8vd3d3LnRlYW1kZXNrLm5ldC9zZWN1cmUvYXBpL3YyLzU2NTU0L0JFQTI1NjY1OTBFRjREMTRBQThEMzVBRDBFMkNFQTc3L1Jldmlldy9zZWxlY3QuanNvbj9za2lwPTEwMDBcIikudGhlbihyID0+IHIuanNvbigpKS50aGVuKHI9PntcclxuICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldmlldzIucHVzaCguLi5yKX0pLFxyXG4gICAgICAgICAgICAgICAgZmV0Y2goXCJodHRwczovL3d3dy50ZWFtZGVzay5uZXQvc2VjdXJlL2FwaS92Mi81NjU1NC9CRUEyNTY2NTkwRUY0RDE0QUE4RDM1QUQwRTJDRUE3Ny9SZXZpZXcvc2VsZWN0Lmpzb24/c2tpcD0xNTAwXCIpLnRoZW4ociA9PiByLmpzb24oKSkudGhlbihyPT57XHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXZpZXcyLnB1c2goLi4ucil9KSxcclxuICAgICAgICAgICAgICBdKVxyXG4gICAgICAgICAgICAgIC50aGVuKChyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsaW1pdC5mb3JFYWNoKChpdGVtMSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICQoaXRlbTEubmV4dEVsZW1lbnRTaWJsaW5nKS5lbXB0eSgpXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0xLmlubmVySFRNTCA9PSAnTTEwNicpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbTEuaW5uZXJIVE1MID0gJ00xMDYjMSdcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZiAoaXRlbTEuaW5uZXJIVE1MID09ICdNMTA2TCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbTEuaW5uZXJIVE1MID0gJ00xMDZMIzEnXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpdGVtMS5pbm5lckhUTUwgPT0gJ1F1ZWVuXzE4Jykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtMS5pbm5lckhUTUwgPSAnUTE4J1xyXG4gICAgICAgICAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJldmlldzMgPSBbXVxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZpZHUgPSByZXZpZXcyLmZpbHRlcihpdGVtID0+IGl0ZW1bJ1Byb2R1Y3QgU0tVJ10gPT09IGl0ZW0xLmlubmVySFRNTClcclxuICAgICAgICAgICAgICAgICAgICB2aWR1LmZvckVhY2goKGdva3UpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV2aWV3My5wdXNoKGdva3VbJ1JldmlldyByYXRlJ10pXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXZpZXdBdmcgPSBNYXRoLnJvdW5kKChyZXZpZXczLnJlZHVjZSgoYSxiICkgPT4gYSsgYiwgMCkvcmV2aWV3My5sZW5ndGgpICogMTApLzEwXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQoaXRlbTEubmV4dEVsZW1lbnRTaWJsaW5nKS5hcHBlbmQoYFxyXG4gICAgICAgICAgICAgICAgICAgIDxzdHlsZT4gICAgLmNoZWNrZWQge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogcmdiKDI1NSwgMjEwLCAwKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLmZhLXN0YXItbyB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6IHJnYigyNTUsIDIxMCwgMCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgQG1lZGlhIChtaW4td2lkdGg6IDc2OHB4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLnByb2R1Y3RSZXZpZXcyIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBAbWVkaWEgKG1pbi13aWR0aDogMTAyNXB4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLnByb2R1Y3RSZXZpZXcyIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogdW5zZXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgQG1lZGlhIChtaW4td2lkdGg6IDE0MDBweCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC5wcm9kdWN0UmV2aWV3MiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgPC9zdHlsZT5cclxuICAgIDxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiBocmVmPVwiaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvZm9udC1hd2Vzb21lLzQuNy4wL2Nzcy9mb250LWF3ZXNvbWUubWluLmNzc1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZmEgZmEtc3RhcmArKDAuNSA8PSByZXZpZXdBdmc/ICcgY2hlY2tlZCc6ICcgZmEtc3Rhci1vJykgKyBgXCI+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZmEgZmEtc3RhcmArKDEuNSA8PSByZXZpZXdBdmc/ICcgY2hlY2tlZCc6ICcgZmEtc3Rhci1vJykgKyBgXCI+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZmEgZmEtc3RhcmArKDIuNSA8PSByZXZpZXdBdmc/ICcgY2hlY2tlZCc6ICcgZmEtc3Rhci1vJykgKyBgXCI+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZmEgZmEtc3RhcmArKDMuNSA8PSByZXZpZXdBdmc/ICcgY2hlY2tlZCc6ICcgZmEtc3Rhci1vJykgKyBgXCI+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZmEgZmEtc3RhcmArKDQuNSA8PSByZXZpZXdBdmc/ICcgY2hlY2tlZCc6ICcgZmEtc3Rhci1vJykgKyBgXCI+PC9zcGFuPiAgICAgIFxyXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT1wYWRkaW5nLWxlZnQ6NXB4Oz5cclxuICAgICAgICAgICAgICAgICAgICAke3JldmlldzMubGVuZ3RofSBSZXNlw7Fhc1xyXG4gICAgICAgICAgICAgICAgPC9kaXY+YClcclxuICAgICAgICAgICAgICAgICAgICAvLyAkKGl0ZW0xLm5leHRFbGVtZW50U2libGluZykuYXBwZW5kKGA8ZGl2PiR7cmV2aWV3QXZnfTwvZGl2PmApXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICB9KVxyXG4gICAgXHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAvLyAgICAgZnVuY3Rpb24gcmV2aWV3U2hvdyh4KSB7XHJcbiAgICAvLyAgICAgICAgIHZhciBsaW1pdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5yZXZpZXdDYXJkMScpO1xyXG5cclxuICAgIC8vICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaW1pdC5sZW5ndGg7IGkrKykge1xyXG4gICAgLy8gICAgICAgICAgICAgbGV0IHJldmlldzM9W11cclxuICAgIC8vICAgICAgICAgICAgIGxldCByZXZpZXcyID0gW11cclxuICAgIC8vICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGxpbWl0W2ldLmlubmVySFRNTClcclxuICAgIC8vICAgICAgICAgICAgIGZldGNoKGBodHRwczovL3NocC13ZWJzZXJ2ZXIuZ2xpdGNoLm1lL2dldC10ZWFtZGVza2AsIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgIC8vICAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgIC8vICAgICAgICAgICAgICAgICB9LFxyXG4gICAgLy8gICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgXCJ0YWJsZVwiOiBcIlJldmlld1wiLFxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICBcIm9wdGlvbnNcIjpgP2ZpbHRlcj1bUHJvZHVjdCBTS1VdPScke2xpbWl0W2ldLmlubmVySFRNTH0nYFxyXG4gICAgLy8gICAgICAgICAgICAgICAgIH0pXHJcbiAgICAvLyAgICAgICAgICAgICB9KVxyXG4gICAgLy8gICAgICAgICAgICAgLnRoZW4ocj0+ci5qc29uKCkpXHJcblxyXG4gICAgLy8gICAgICAgICAgICAgLnRoZW4ocj0+IHJldmlldzIucHVzaCguLi5yKSlcclxuICAgIC8vICAgICAgICAgICAgIC50aGVuKHIgPT4ge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICQobGltaXRbaV0ubmV4dEVsZW1lbnRTaWJsaW5nKS5lbXB0eSgpXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgLy8gY29uc3QgZ29rdTEgPSByZXZpZXcyLmZpbHRlcihpdGVtID0+IGl0ZW1bJ1Byb2R1Y3QgU0tVJ10gPT09IGxpbWl0W2ldLmlubmVySFRNTClcclxuICAgIC8vICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXZpZXcyKVxyXG4gICAgLy8gICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJldmlldzIubGVuZ3RoKVxyXG4gICAgLy8gICAgICAgICAgICAgICAgIGZvciAobGV0IGk9MDsgaTxyZXZpZXcyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIHJldmlldzMucHVzaChyZXZpZXcyW2ldWydSZXZpZXcgcmF0ZSddKVxyXG5cclxuICAgIC8vICAgICAgICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgLy8gcmV2aWV3Mi5mb3JFYWNoKChyZXYpID0+IHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAvLyAgICAgcmV2aWV3My5wdXNoKHJldlsnUmV2aWV3IHJhdGUnXSlcclxuICAgIC8vICAgICAgICAgICAgICAgICAvLyB9KVxyXG4gICAgLy8gICAgICAgICAgICAgICAgIGNvbnN0IHJldmlld0F2ZyA9IE1hdGgucm91bmQoKHJldmlldzMucmVkdWNlKChhLGIgKSA9PiBhKyBiLCAwKS9yZXZpZXczLmxlbmd0aCkgKiAxMCkvMTBcclxuICAgIC8vICAgICAgICAgICAgICAgICAkKGxpbWl0W2ldLm5leHRFbGVtZW50U2libGluZykuYXBwZW5kKGBcclxuICAgIC8vICAgICAgICAgICAgICAgICA8c3R5bGU+ICAgIC5jaGVja2VkIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgY29sb3I6IHJnYigyNTUsIDIxMCwgMCk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgIC8vICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgICAgIC5mYS1zdGFyLW8ge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIGNvbG9yOiByZ2IoMjU1LCAyMTAsIDApO1xyXG4gICAgICAgICAgICBcclxuICAgIC8vICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgICAgIEBtZWRpYSAobWluLXdpZHRoOiA3NjhweCkge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIC5wcm9kdWN0UmV2aWV3MiB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICAgICAgQG1lZGlhIChtaW4td2lkdGg6IDEwMjVweCkge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIC5wcm9kdWN0UmV2aWV3MiB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IHVuc2V0O1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgICAgIEBtZWRpYSAobWluLXdpZHRoOiAxNDAwcHgpIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAucHJvZHVjdFJldmlldzIge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgICAgIDwvc3R5bGU+XHJcbiAgICAvLyA8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgaHJlZj1cImh0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL2ZvbnQtYXdlc29tZS80LjcuMC9jc3MvZm9udC1hd2Vzb21lLm1pbi5jc3NcIj5cclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgIC8vICAgICAgICAgICAgICAgICA8c3Bhbj5cclxuICAgIC8vICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZhIGZhLXN0YXJgKygwLjUgPD0gcmV2aWV3QXZnPyAnIGNoZWNrZWQnOiAnIGZhLXN0YXItbycpICsgYFwiPjwvc3Bhbj5cclxuICAgIC8vICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZhIGZhLXN0YXJgKygxLjUgPD0gcmV2aWV3QXZnPyAnIGNoZWNrZWQnOiAnIGZhLXN0YXItbycpICsgYFwiPjwvc3Bhbj5cclxuICAgIC8vICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZhIGZhLXN0YXJgKygyLjUgPD0gcmV2aWV3QXZnPyAnIGNoZWNrZWQnOiAnIGZhLXN0YXItbycpICsgYFwiPjwvc3Bhbj5cclxuICAgIC8vICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZhIGZhLXN0YXJgKygzLjUgPD0gcmV2aWV3QXZnPyAnIGNoZWNrZWQnOiAnIGZhLXN0YXItbycpICsgYFwiPjwvc3Bhbj5cclxuICAgIC8vICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZhIGZhLXN0YXJgKyg0LjUgPD0gcmV2aWV3QXZnPyAnIGNoZWNrZWQnOiAnIGZhLXN0YXItbycpICsgYFwiPjwvc3Bhbj4gICAgICBcclxuICAgIC8vICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgIC8vICAgICAgICAgICAgIDxkaXYgc3R5bGU9cGFkZGluZy1sZWZ0OjVweDs+XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgJHtyZXZpZXczLmxlbmd0aH0gUmVzZcOxYXNcclxuICAgIC8vICAgICAgICAgICAgIDwvZGl2PmApXHJcbiAgICAvLyAgICAgICAgICAgICB9KVxyXG4gICAgLy8gICAgICAgICB9XHJcbiAgICAvLyAvLyAgICAgICAgIGxpbWl0LmZvckVhY2goKGl0ZW0xKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgIC8vIC8vICAgICAgICAgICAgIGxldCByZXZpZXczPVtdXHJcbiAgICAvLyAvLyAgICAgICAgICAgICBsZXQgcmV2aWV3MiA9IFtdXHJcblxyXG4gICAgLy8gLy8gICAgICAgICAgICAgZmV0Y2goYGh0dHBzOi8vc2hwLXdlYnNlcnZlci5nbGl0Y2gubWUvZ2V0LXRlYW1kZXNrYCwge1xyXG4gICAgLy8gLy8gICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgLy8gLy8gICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgIC8vIC8vICAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgIC8vIC8vICAgICAgICAgICAgICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgLy8gLy8gICAgICAgICAgICAgICAgIH0sXHJcbiAgICAvLyAvLyAgICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgLy8gLy8gICAgICAgICAgICAgICAgICAgICBcInRhYmxlXCI6IFwiUmV2aWV3XCIsXHJcbiAgICAvLyAvLyAgICAgICAgICAgICAgICAgICAgIFwib3B0aW9uc1wiOmA/ZmlsdGVyPVtQcm9kdWN0IFNLVV09JyR7aXRlbTEuaW5uZXJIVE1MfSdgXHJcbiAgICAvLyAvLyAgICAgICAgICAgICAgICAgfSlcclxuICAgIC8vIC8vICAgICAgICAgICAgIH0pXHJcbiAgICAvLyAvLyAgICAgICAgICAgICAudGhlbihyPT5yLmpzb24oKSlcclxuXHJcbiAgICAvLyAvLyAgICAgICAgICAgICAudGhlbihyPT4gcmV2aWV3Mi5wdXNoKC4uLnIpKVxyXG4gICAgLy8gLy8gICAgICAgICAgICAgLnRoZW4ociA9PiB7XHJcbiAgICAvLyAvLyAgICAgICAgICAgICAgICAgJChpdGVtMS5uZXh0RWxlbWVudFNpYmxpbmcpLmVtcHR5KClcclxuICAgIC8vIC8vICAgICAgICAgICAgICAgICBjb25zdCBnb2t1MSA9IHJldmlldzIuZmlsdGVyKGl0ZW0gPT4gaXRlbVsnUHJvZHVjdCBTS1UnXSA9PT0gaXRlbTEuaW5uZXJIVE1MKVxyXG4gICAgLy8gLy8gICAgICAgICAgICAgICAgIGdva3UxLmZvckVhY2goKHJldikgPT4ge1xyXG4gICAgLy8gLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldmlldzMucHVzaChyZXZbJ1JldmlldyByYXRlJ10pXHJcbiAgICAvLyAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgLy8gLy8gICAgICAgICAgICAgICAgIGNvbnN0IHJldmlld0F2ZyA9IE1hdGgucm91bmQoKHJldmlldzMucmVkdWNlKChhLGIgKSA9PiBhKyBiLCAwKS9yZXZpZXczLmxlbmd0aCkgKiAxMCkvMTBcclxuICAgIC8vIC8vICAgICAgICAgICAgICAgICAkKGl0ZW0xLm5leHRFbGVtZW50U2libGluZykuYXBwZW5kKGBcclxuICAgIC8vIC8vICAgICAgICAgICAgICAgICA8c3R5bGU+ICAgIC5jaGVja2VkIHtcclxuICAgIC8vIC8vICAgICAgICAgICAgICAgICAgICAgY29sb3I6IHJnYigyNTUsIDIxMCwgMCk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgIC8vIC8vICAgICAgICAgICAgIH1cclxuICAgIC8vIC8vICAgICAgICAgICAgIC5mYS1zdGFyLW8ge1xyXG4gICAgLy8gLy8gICAgICAgICAgICAgICAgIGNvbG9yOiByZ2IoMjU1LCAyMTAsIDApO1xyXG4gICAgICAgICAgICBcclxuICAgIC8vIC8vICAgICAgICAgICAgIH1cclxuICAgIC8vIC8vICAgICAgICAgICAgIEBtZWRpYSAobWluLXdpZHRoOiA3NjhweCkge1xyXG4gICAgLy8gLy8gICAgICAgICAgICAgICAgIC5wcm9kdWN0UmV2aWV3MiB7XHJcbiAgICAvLyAvLyAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAvLyAvLyAgICAgICAgICAgICAgICAgfVxyXG4gICAgLy8gLy8gICAgICAgICAgICAgfVxyXG4gICAgLy8gLy8gICAgICAgICAgICAgQG1lZGlhIChtaW4td2lkdGg6IDEwMjVweCkge1xyXG4gICAgLy8gLy8gICAgICAgICAgICAgICAgIC5wcm9kdWN0UmV2aWV3MiB7XHJcbiAgICAvLyAvLyAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IHVuc2V0O1xyXG4gICAgLy8gLy8gICAgICAgICAgICAgICAgIH1cclxuICAgIC8vIC8vICAgICAgICAgICAgIH1cclxuICAgIC8vIC8vICAgICAgICAgICAgIEBtZWRpYSAobWluLXdpZHRoOiAxNDAwcHgpIHtcclxuICAgIC8vIC8vICAgICAgICAgICAgICAgICAucHJvZHVjdFJldmlldzIge1xyXG4gICAgLy8gLy8gICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgLy8gLy8gICAgICAgICAgICAgICAgIH1cclxuICAgIC8vIC8vICAgICAgICAgICAgIH1cclxuICAgIC8vIC8vICAgICAgICAgICAgIDwvc3R5bGU+XHJcbiAgICAvLyAvLyA8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgaHJlZj1cImh0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL2ZvbnQtYXdlc29tZS80LjcuMC9jc3MvZm9udC1hd2Vzb21lLm1pbi5jc3NcIj5cclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgIC8vIC8vICAgICAgICAgICAgICAgICA8c3Bhbj5cclxuICAgIC8vIC8vICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZhIGZhLXN0YXJgKygwLjUgPD0gcmV2aWV3QXZnPyAnIGNoZWNrZWQnOiAnIGZhLXN0YXItbycpICsgYFwiPjwvc3Bhbj5cclxuICAgIC8vIC8vICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZhIGZhLXN0YXJgKygxLjUgPD0gcmV2aWV3QXZnPyAnIGNoZWNrZWQnOiAnIGZhLXN0YXItbycpICsgYFwiPjwvc3Bhbj5cclxuICAgIC8vIC8vICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZhIGZhLXN0YXJgKygyLjUgPD0gcmV2aWV3QXZnPyAnIGNoZWNrZWQnOiAnIGZhLXN0YXItbycpICsgYFwiPjwvc3Bhbj5cclxuICAgIC8vIC8vICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZhIGZhLXN0YXJgKygzLjUgPD0gcmV2aWV3QXZnPyAnIGNoZWNrZWQnOiAnIGZhLXN0YXItbycpICsgYFwiPjwvc3Bhbj5cclxuICAgIC8vIC8vICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZhIGZhLXN0YXJgKyg0LjUgPD0gcmV2aWV3QXZnPyAnIGNoZWNrZWQnOiAnIGZhLXN0YXItbycpICsgYFwiPjwvc3Bhbj4gICAgICBcclxuICAgIC8vIC8vICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgIC8vIC8vICAgICAgICAgICAgIDxkaXYgc3R5bGU9cGFkZGluZy1sZWZ0OjVweDs+XHJcbiAgICAvLyAvLyAgICAgICAgICAgICAgICAgJHtyZXZpZXczLmxlbmd0aH0gUmVzZcOxYXNcclxuICAgIC8vIC8vICAgICAgICAgICAgIDwvZGl2PmApXHJcbiAgICAvLyAvLyAgICAgICAgICAgICB9KVxyXG5cclxuICAgIC8vIC8vICAgICAgICAgfSlcclxuICAgICAgICAgICAgXHJcbiAgICAvLyAvLyAgICAgICAgIGxldCByZXZpZXcyID0gW11cclxuICAgIC8vIC8vICAgICAgICAgZmV0Y2goYGh0dHBzOi8vc2hwLXdlYnNlcnZlci5nbGl0Y2gubWUvZ2V0LXRlYW1kZXNrYCwge1xyXG4gICAgLy8gLy8gICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAvLyAvLyAgICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAvLyAvLyAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgIC8vIC8vICAgICAgICAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAvLyAvLyAgICAgICAgICAgICB9LFxyXG4gICAgLy8gLy8gICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgLy8gLy8gICAgICAgICAgICAgICAgIFwidGFibGVcIjogXCJSZXZpZXdcIixcclxuICAgIC8vIC8vICAgICAgICAgICAgICAgICBcIm9wdGlvbnNcIjpgYFxyXG4gICAgLy8gLy8gICAgICAgICAgICAgfSlcclxuICAgIC8vIC8vICAgICAgICAgfSlcclxuICAgIC8vIC8vICAgICAgICAgLnRoZW4ocj0+ci5qc29uKCkpXHJcbiAgICAvLyAvLyAgICAgICAgIC50aGVuKHI9PiByZXZpZXcyLnB1c2goLi4ucikpXHJcbiAgICAvLyAvLyAgICAgICAgIC50aGVuKChyKSA9PiB7XHJcbiAgICAvLyAvLyAgICAgICAgICAgICBsaW1pdC5mb3JFYWNoKChpdGVtMSkgPT4ge1xyXG4gICAgLy8gLy8gICAgICAgICAgICAgICAgICQoaXRlbTEubmV4dEVsZW1lbnRTaWJsaW5nKS5lbXB0eSgpXHJcbiAgICBcclxuICAgIC8vIC8vICAgICAgICAgICAgICAgICBsZXQgcmV2aWV3MyA9IFtdXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAvLyAvLyAgICAgICAgICAgICAgICAgY29uc3QgZmlsdGVyZWRBciA9IHJldmlldzIuZmlsdGVyKGl0ZW0gPT4gaXRlbVsnUHJvZHVjdCBTS1UnXSA9PT0gaXRlbTEuaW5uZXJIVE1MKVxyXG4gICAgLy8gLy8gICAgICAgICAgICAgICAgIGZpbHRlcmVkQXIuZm9yRWFjaCgocmV2KSA9PiB7XHJcbiAgICAvLyAvLyAgICAgICAgICAgICAgICAgICAgIHJldmlldzMucHVzaChyZXZbJ1JldmlldyByYXRlJ10pXHJcbiAgICAvLyAvLyAgICAgICAgICAgICAgICAgfSlcclxuICAgIC8vIC8vICAgICAgICAgICAgICAgICBjb25zdCByZXZpZXdBdmcgPSBNYXRoLnJvdW5kKChyZXZpZXczLnJlZHVjZSgoYSxiICkgPT4gYSsgYiwgMCkvcmV2aWV3My5sZW5ndGgpICogMTApLzEwXHJcblxyXG4gICAgLy8gLy8gICAgICAgICAgICAgICAgICQoaXRlbTEubmV4dEVsZW1lbnRTaWJsaW5nKS5hcHBlbmQoYFxyXG4gICAgLy8gLy8gICAgICAgICAgICAgICAgIDxzdHlsZT4gICAgLmNoZWNrZWQge1xyXG4gICAgLy8gLy8gICAgICAgICAgICAgICAgICAgICBjb2xvcjogcmdiKDI1NSwgMjEwLCAwKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgLy8gLy8gICAgICAgICAgICAgfVxyXG4gICAgLy8gLy8gICAgICAgICAgICAgLmZhLXN0YXItbyB7XHJcbiAgICAvLyAvLyAgICAgICAgICAgICAgICAgY29sb3I6IHJnYigyNTUsIDIxMCwgMCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgLy8gLy8gICAgICAgICAgICAgfVxyXG4gICAgLy8gLy8gICAgICAgICAgICAgQG1lZGlhIChtaW4td2lkdGg6IDc2OHB4KSB7XHJcbiAgICAvLyAvLyAgICAgICAgICAgICAgICAgLnByb2R1Y3RSZXZpZXcyIHtcclxuICAgIC8vIC8vICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgIC8vIC8vICAgICAgICAgICAgICAgICB9XHJcbiAgICAvLyAvLyAgICAgICAgICAgICB9XHJcbiAgICAvLyAvLyAgICAgICAgICAgICBAbWVkaWEgKG1pbi13aWR0aDogMTAyNXB4KSB7XHJcbiAgICAvLyAvLyAgICAgICAgICAgICAgICAgLnByb2R1Y3RSZXZpZXcyIHtcclxuICAgIC8vIC8vICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogdW5zZXQ7XHJcbiAgICAvLyAvLyAgICAgICAgICAgICAgICAgfVxyXG4gICAgLy8gLy8gICAgICAgICAgICAgfVxyXG4gICAgLy8gLy8gICAgICAgICAgICAgQG1lZGlhIChtaW4td2lkdGg6IDE0MDBweCkge1xyXG4gICAgLy8gLy8gICAgICAgICAgICAgICAgIC5wcm9kdWN0UmV2aWV3MiB7XHJcbiAgICAvLyAvLyAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAvLyAvLyAgICAgICAgICAgICAgICAgfVxyXG4gICAgLy8gLy8gICAgICAgICAgICAgfVxyXG4gICAgLy8gLy8gICAgICAgICAgICAgPC9zdHlsZT5cclxuICAgIC8vIC8vIDxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiBocmVmPVwiaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvZm9udC1hd2Vzb21lLzQuNy4wL2Nzcy9mb250LWF3ZXNvbWUubWluLmNzc1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgLy8gLy8gICAgICAgICAgICAgICAgIDxzcGFuPlxyXG4gICAgLy8gLy8gICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZmEgZmEtc3RhcmArKDAuNSA8PSByZXZpZXdBdmc/ICcgY2hlY2tlZCc6ICcgZmEtc3Rhci1vJykgKyBgXCI+PC9zcGFuPlxyXG4gICAgLy8gLy8gICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZmEgZmEtc3RhcmArKDEuNSA8PSByZXZpZXdBdmc/ICcgY2hlY2tlZCc6ICcgZmEtc3Rhci1vJykgKyBgXCI+PC9zcGFuPlxyXG4gICAgLy8gLy8gICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZmEgZmEtc3RhcmArKDIuNSA8PSByZXZpZXdBdmc/ICcgY2hlY2tlZCc6ICcgZmEtc3Rhci1vJykgKyBgXCI+PC9zcGFuPlxyXG4gICAgLy8gLy8gICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZmEgZmEtc3RhcmArKDMuNSA8PSByZXZpZXdBdmc/ICcgY2hlY2tlZCc6ICcgZmEtc3Rhci1vJykgKyBgXCI+PC9zcGFuPlxyXG4gICAgLy8gLy8gICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZmEgZmEtc3RhcmArKDQuNSA8PSByZXZpZXdBdmc/ICcgY2hlY2tlZCc6ICcgZmEtc3Rhci1vJykgKyBgXCI+PC9zcGFuPiAgICAgIFxyXG4gICAgLy8gLy8gICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgLy8gLy8gICAgICAgICAgICAgPGRpdiBzdHlsZT1wYWRkaW5nLWxlZnQ6NXB4Oz5cclxuICAgIC8vIC8vICAgICAgICAgICAgICAgICAke3JldmlldzMubGVuZ3RofSBSZXNlw7Fhc1xyXG4gICAgLy8gLy8gICAgICAgICAgICAgPC9kaXY+YClcclxuICAgIC8vIC8vICAgICAgICAgICAgICAgICAvLyAkKGl0ZW0xLm5leHRFbGVtZW50U2libGluZykuYXBwZW5kKGA8ZGl2PiR7cmV2aWV3QXZnfTwvZGl2PmApXHJcbiAgICAvLyAvLyAgICAgICAgICAgICB9KVxyXG5cclxuICAgIC8vIC8vICAgICAgICAgICB9KVxyXG4gICAgXHJcbiAgICAgICAgICAgICAgXHJcbiAgICAvLyAvLyAgICAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcclxuICAgIC8vIC8vICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgIC8vIC8vICAgICAgICAgICB9KTtcclxuICAgIC8vICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gbG9hZENhdGVnb3J5KGlkLCB1cmwsIG9wdGlvbiwgd3JhcCwgYmxvY2tJZCl7XHJcbiAgICAgICAgICAgIHV0aWxzLmFwaS5nZXRQYWdlKHVybCwgb3B0aW9uLCAoZXJyLCByZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYoIXdyYXAuZmluZCgnLnByb2R1Y3RDYXJvdXNlbC1zbGlkZScpLmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICAgICAgd3JhcC5odG1sKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgICAgICAgICBzbGlja0Nhcm91c2VsKHdyYXApO1xyXG4gICAgICAgICAgICAgICAgICAgIHdyYXAucGFyZW50cygnLnRhYi1jb250ZW50JykuZmluZCgnLmxvYWRpbmdPdmVybGF5JykucmVtb3ZlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGhhbG9BZGRPcHRpb24oY29udGV4dCwgYmxvY2tJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV2aWV3U2hvdygpXHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTsgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBzbGlja0Nhcm91c2VsKHdyYXApe1xyXG4gICAgICAgICAgICB3cmFwLnNsaWNrKHtcclxuICAgICAgICAgICAgICAgIGRvdHM6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgYXJyb3dzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgaW5maW5pdGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgbW9iaWxlRmlyc3Q6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDIsXHJcbiAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcclxuICAgICAgICAgICAgICAgIG5leHRBcnJvdzogXCI8c3ZnIGNsYXNzPSdzbGljay10YWIxIHNsaWNrLW5leHQgc2xpY2stYXJyb3cgc2xpY2stYXJyb3ctbGFyZ2UnIGFyaWEtbGFiZWw9J05leHQgU2xpZGUnPjx1c2UgeGxpbms6aHJlZj0jc2xpY2stYXJyb3ctbmV4dD48L3VzZT48L3N2Zz5cIiwgXHJcbiAgICAgICAgICAgICAgICBwcmV2QXJyb3c6IFwiPHN2ZyBjbGFzcz0nc2xpY2stdGFiMiBzbGljay1wcmV2IHNsaWNrLWFycm93IHNsaWNrLWFycm93LWxhcmdlJyBhcmlhLWxhYmVsPSdQcmV2aW91cyBTbGlkZSc+PHVzZSB4bGluazpocmVmPSNzbGljay1hcnJvdy1wcmV2PjwvdXNlPjwvc3ZnPlwiLFxyXG4gICAgICAgICAgICAgICAgcmVzcG9uc2l2ZTogW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDEwMjQsXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IHBhcnNlSW50KGNvbnRleHQudGhlbWVTZXR0aW5ncy5ob21lX3Byb2R1Y3RfYmxvY2tfdGFiX2NvbClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDk5MSxcclxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IHBhcnNlSW50KGNvbnRleHQudGhlbWVTZXR0aW5ncy5ob21lX3Byb2R1Y3RfYmxvY2tfdGFiX2NvbCkgLSAxXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiA3NjcsXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiBwYXJzZUludChjb250ZXh0LnRoZW1lU2V0dGluZ3MuaG9tZV9wcm9kdWN0X2Jsb2NrX3RhYl9jb2wpIC0gMlxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBsb2FkUHJvZHVjdEJ5Q2F0ZWdvcnlXaXRoQmFubmVyKCl7XHJcbiAgICAgICAgY29uc3QgY29udGV4dCA9IHRoaXMuY29udGV4dDtcclxuXHJcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgdGVtcGxhdGU6ICdwcm9kdWN0cy9jYXJvdXNlbC00J1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGlmKCQoJy5oYWxvLWJsb2NrW2RhdGEtY2F0ZWdvcnktd2l0aC1iYW5uZXItaWRdJykubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgIHZhciAgaGVhZGVyX2hlaWdodCA9ICQoJy5oZWFkZXInKS5oZWlnaHQoKTtcclxuICAgICAgICAgICAgY29uc3QgJHRhYlNvcnRpbmcgPSAkKCcudGFiLXNvcnRpbmcgLnRhYi10aXRsZScpO1xyXG5cclxuICAgICAgICAgICAgJCh3aW5kb3cpLm9uKCdzY3JvbGwgbG9hZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHNjcm9sbCA9ICQod2luZG93KS5zY3JvbGxUb3AoKSxcclxuICAgICAgICAgICAgICAgICAgICBzZXRGbGFnID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHNjcm9sbCA+IGhlYWRlcl9oZWlnaHQpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXRGbGFnID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZihzZXRGbGFnKXtcclxuICAgICAgICAgICAgICAgICAgICAkKCcuaGFsby1ibG9ja1tkYXRhLWNhdGVnb3J5LXdpdGgtYmFubmVyLWlkXScpLmVhY2goKGluZGV4LCBlbGVtZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkKCcuaG9tZS1sYXlvdXQtMicpLmxlbmd0aCAmJiAhJChlbGVtZW50KS5oYXNDbGFzcygnaG9tZTItZmxhc2gtZGVhbHMnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHdyYXAgPSAkKGVsZW1lbnQpLmZpbmQoJy50YWJDb250ZW50LW5ldyAucHJvZHVjdENhcm91c2VsJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgd3JhcCA9ICQoZWxlbWVudCkuZmluZCgnLnByb2R1Y3RDYXJvdXNlbCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY2F0SWQgPSAkKGVsZW1lbnQpLmRhdGEoJ2NhdGVnb3J5LXdpdGgtYmFubmVyLWlkJyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXRVcmwgPSAkKGVsZW1lbnQpLmRhdGEoJ2NhdGVnb3J5LXdpdGgtYmFubmVyLXVybCcpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmxvY2tJZCA9ICQoZWxlbWVudCkuYXR0cignaWQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKCEkKCcjcHJvZHVjdC13aXRoLWJhbm5lci0nK2NhdElkKycgLnByb2R1Y3RDYXJvdXNlbCAucHJvZHVjdENhcm91c2VsLXNsaWRlJykubGVuZ3RoKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRDYXRlZ29yeShjYXRJZCwgY2F0VXJsLCBvcHRpb25zLCB3cmFwLCBibG9ja0lkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzZXRGbGFnID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJHRhYlNvcnRpbmcub24oJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0ICR0YXJnZXQgPSAkKGUuY3VycmVudFRhcmdldCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhVGFiID0gJHRhcmdldC5kYXRhKCd0YWInKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0ICR0aGlzQmxvY2sgPSAkdGFyZ2V0LmNsb3Nlc3QoJy5oYWxvLWJsb2NrLXByb2R1Y3QnKTtcclxuICAgICAgICAgICAgICAgIHZhciB3cmFwID0gJHRoaXNCbG9jay5maW5kKCcudGFiQ29udGVudC0nK2RhdGFUYWIrJyAucHJvZHVjdENhcm91c2VsJyksXHJcbiAgICAgICAgICAgICAgICAgICAgY2F0SWQgPSAkdGFyZ2V0LmRhdGEoJ2NhdGUtaWQnKSxcclxuICAgICAgICAgICAgICAgICAgICBjYXRVcmwgPSAkdGFyZ2V0LmRhdGEoJ2NhdGUtdXJsJyksXHJcbiAgICAgICAgICAgICAgICAgICAgYmxvY2tJZCA9ICR0aGlzQmxvY2suZmluZCgnLnRhYkNvbnRlbnQtJytkYXRhVGFiKS5hdHRyKCdpZCcpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChkYXRhVGFiID09ICd2aWV3YWxsJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJHRhcmdldC5hdHRyKCdocmVmJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICR0aGlzQmxvY2suZmluZCgnLnRhYi1zb3J0aW5nJykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgJHRhcmdldC5wYXJlbnQoKS5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAkdGhpc0Jsb2NrLmZpbmQoJy50YWItY29udGVudCcpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgICR0aGlzQmxvY2suZmluZCgnLnRhYkNvbnRlbnQtJytkYXRhVGFiKS5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnYWZmJylcclxuICAgICAgICAgICAgICAgIGlmKCEkdGFyZ2V0Lmhhc0NsYXNzKCdpcy1sb2FkZWQnKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgJHRhcmdldC5hZGRDbGFzcygnaXMtbG9hZGVkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9hZENhdGVnb3J5KGNhdElkLCBjYXRVcmwsIG9wdGlvbnMsIHdyYXAsIGJsb2NrSWQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHRoaXNCbG9jay5maW5kKCcudGFiQ29udGVudC0nK2RhdGFUYWIrJyAucHJvZHVjdENhcm91c2VsJykuc2xpY2soJ3JlZnJlc2gnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoJCgnLmNvdW50RG93bnRpbWVyJykubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY291bnREb3duRGF0ZSA9IG5ldyBEYXRlKCAkKCcuY291bnREb3dudGltZXInKS5hdHRyKCdkYXRhLWNvdW50LWRvd24nKSkuZ2V0VGltZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBjb3VudGRvd25mdW5jdGlvbiA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBub3cgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZGlzdGFuY2UgPSBjb3VudERvd25EYXRlIC0gbm93O1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkaXN0YW5jZSA8IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChjb3VudGRvd25mdW5jdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIuY291bnREb3dudGltZXJcIikuaHRtbCgnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRheXMgPSBNYXRoLmZsb29yKGRpc3RhbmNlIC8gKDEwMDAgKiA2MCAqIDYwICogMjQpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGhvdXJzID0gTWF0aC5mbG9vcigoZGlzdGFuY2UgJSAoMTAwMCAqIDYwICogNjAgKiAyNCkpIC8gKDEwMDAgKiA2MCAqIDYwKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtaW51dGVzID0gTWF0aC5mbG9vcigoZGlzdGFuY2UgJSAoMTAwMCAqIDYwICogNjApKSAvICgxMDAwICogNjApKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNlY29uZHMgPSBNYXRoLmZsb29yKChkaXN0YW5jZSAlICgxMDAwICogNjApKSAvIDEwMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3RyQ291bnREb3duID0gXCI8ZGl2IGNsYXNzPSdjbG9jay1pdGVtJz48c3BhbiBjbGFzcz0nbnVtJz5cIitkYXlzK1wiPC9zcGFuPjxzcGFuIGNsYXNzPSd0ZXh0Jz5kPC9zcGFuPjwvZGl2PjxkaXYgY2xhc3M9J2Nsb2NrLWl0ZW0nPjxzcGFuIGNsYXNzPSdudW0nPlwiK2hvdXJzK1wiOjwvc3Bhbj48L2Rpdj48ZGl2IGNsYXNzPSdjbG9jay1pdGVtJz48c3BhbiBjbGFzcz0nbnVtJz5cIittaW51dGVzK1wiOjwvc3Bhbj48L2Rpdj48ZGl2IGNsYXNzPSdjbG9jay1pdGVtJz48c3BhbiBjbGFzcz0nbnVtJz5cIitzZWNvbmRzK1wiPC9zcGFuPjwvZGl2PlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiLmNvdW50RG93bnRpbWVyXCIpLmh0bWwoc3RyQ291bnREb3duKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gbG9hZENhdGVnb3J5KGlkLCB1cmwsIG9wdGlvbiwgd3JhcCwgYmxvY2tJZCl7XHJcbiAgICAgICAgICAgIHV0aWxzLmFwaS5nZXRQYWdlKHVybCwgb3B0aW9uLCAoZXJyLCByZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYoIXdyYXAuZmluZCgnLnByb2R1Y3RDYXJvdXNlbC1zbGlkZScpLmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICAgICAgd3JhcC5odG1sKHJlc3BvbnNlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYod3JhcC5wYXJlbnRzKCcuaGFsby1ibG9ja1tkYXRhLWNhdGVnb3J5LXdpdGgtYmFubmVyLWlkXScpLmhhc0NsYXNzKCdoYWxvLWJsb2NrLXByb2R1Y3QtYmFubmVycycpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQoJy5ob21lLWxheW91dC0yJykubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAod3JhcC5wYXJlbnRzKCcuaGFsby1ibG9ja1tkYXRhLWNhdGVnb3J5LXdpdGgtYmFubmVyLWlkXScpLmhhc0NsYXNzKCdob21lMi1mbGFzaC1kZWFscycpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWxGbGFzaERlYWxzKHdyYXApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWNrQ2Fyb3VzZWw0KHdyYXApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpY2tDYXJvdXNlbDMod3JhcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlja0Nhcm91c2VsKHdyYXApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmKHdyYXAucGFyZW50cygnLmhhbG8tYmxvY2tbZGF0YS1jYXRlZ29yeS13aXRoLWJhbm5lci1pZF0nKS5oYXNDbGFzcygnaGFsby1ibG9jay1wcm9kdWN0LWJhbm5lcnMyJykpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlja0Nhcm91c2VsMih3cmFwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHdyYXAucGFyZW50cygnLmhhbG8tYmxvY2tbZGF0YS1jYXRlZ29yeS13aXRoLWJhbm5lci1pZF0nKS5maW5kKCcubG9hZGluZ092ZXJsYXknKS5yZW1vdmUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaGFsb0FkZE9wdGlvbihjb250ZXh0LCBibG9ja0lkKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7IFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gc2xpY2tDYXJvdXNlbCh3cmFwKXtcclxuICAgICAgICAgICAgd3JhcC5zbGljayh7XHJcbiAgICAgICAgICAgICAgICBkb3RzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgYXJyb3dzOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGluZmluaXRlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIG1vYmlsZUZpcnN0OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAyLFxyXG4gICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcbiAgICAgICAgICAgICAgICBuZXh0QXJyb3c6IFwiPHN2ZyBjbGFzcz0nc2xpY2stbmV4dCBzbGljay1hcnJvdyBzbGljay1hcnJvdy1sYXJnZScgYXJpYS1sYWJlbD0nTmV4dCBTbGlkZSc+PHVzZSB4bGluazpocmVmPSNzbGljay1hcnJvdy1uZXh0PjwvdXNlPjwvc3ZnPlwiLCBcclxuICAgICAgICAgICAgICAgIHByZXZBcnJvdzogXCI8c3ZnIGNsYXNzPSdzbGljay1wcmV2IHNsaWNrLWFycm93IHNsaWNrLWFycm93LWxhcmdlJyBhcmlhLWxhYmVsPSdQcmV2aW91cyBTbGlkZSc+PHVzZSB4bGluazpocmVmPSNzbGljay1hcnJvdy1wcmV2PjwvdXNlPjwvc3ZnPlwiLFxyXG4gICAgICAgICAgICAgICAgcmVzcG9uc2l2ZTogW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDEwMjQsXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiA0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogOTkxLFxyXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDFcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDc2NyxcclxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfV1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBzbGlja0Nhcm91c2VsMih3cmFwKXtcclxuICAgICAgICAgICAgd3JhcC5zbGljayh7XHJcbiAgICAgICAgICAgICAgICBkb3RzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgYXJyb3dzOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGluZmluaXRlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIG1vYmlsZUZpcnN0OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAyLFxyXG4gICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcbiAgICAgICAgICAgICAgICBuZXh0QXJyb3c6IFwiPHN2ZyBjbGFzcz0nc2xpY2stbmV4dCBzbGljay1hcnJvdyBzbGljay1hcnJvdy1sYXJnZScgYXJpYS1sYWJlbD0nTmV4dCBTbGlkZSc+PHVzZSB4bGluazpocmVmPSNzbGljay1hcnJvdy1uZXh0PjwvdXNlPjwvc3ZnPlwiLCBcclxuICAgICAgICAgICAgICAgIHByZXZBcnJvdzogXCI8c3ZnIGNsYXNzPSdzbGljay1wcmV2IHNsaWNrLWFycm93IHNsaWNrLWFycm93LWxhcmdlJyBhcmlhLWxhYmVsPSdQcmV2aW91cyBTbGlkZSc+PHVzZSB4bGluazpocmVmPSNzbGljay1hcnJvdy1wcmV2PjwvdXNlPjwvc3ZnPlwiLFxyXG4gICAgICAgICAgICAgICAgcmVzcG9uc2l2ZTogW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDEwMjQsXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IHBhcnNlSW50KGNvbnRleHQudGhlbWVTZXR0aW5ncy5ob21lX3Byb2R1Y3RfYmxvY2tfd2l0aF9iYW5uZXJfY29sKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogOTkxLFxyXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogcGFyc2VJbnQoY29udGV4dC50aGVtZVNldHRpbmdzLmhvbWVfcHJvZHVjdF9ibG9ja193aXRoX2Jhbm5lcl9jb2wpIC0gMVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNzY3LFxyXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogcGFyc2VJbnQoY29udGV4dC50aGVtZVNldHRpbmdzLmhvbWVfcHJvZHVjdF9ibG9ja193aXRoX2Jhbm5lcl9jb2wpIC0gMlxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gc2xpY2tDYXJvdXNlbDMod3JhcCl7XHJcbiAgICAgICAgICAgIHdyYXAuc2xpY2soe1xyXG4gICAgICAgICAgICAgICAgZG90czogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGFycm93czogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBpbmZpbml0ZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBtb2JpbGVGaXJzdDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMixcclxuICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG4gICAgICAgICAgICAgICAgbmV4dEFycm93OiBcIjxzdmcgY2xhc3M9J3NsaWNrLW5leHQgc2xpY2stYXJyb3cgc2xpY2stYXJyb3ctbGFyZ2UnIGFyaWEtbGFiZWw9J05leHQgU2xpZGUnPjx1c2UgeGxpbms6aHJlZj0jc2xpY2stYXJyb3ctbmV4dD48L3VzZT48L3N2Zz5cIiwgXHJcbiAgICAgICAgICAgICAgICBwcmV2QXJyb3c6IFwiPHN2ZyBjbGFzcz0nc2xpY2stcHJldiBzbGljay1hcnJvdyBzbGljay1hcnJvdy1sYXJnZScgYXJpYS1sYWJlbD0nUHJldmlvdXMgU2xpZGUnPjx1c2UgeGxpbms6aHJlZj0jc2xpY2stYXJyb3ctcHJldj48L3VzZT48L3N2Zz5cIixcclxuICAgICAgICAgICAgICAgIHJlc3BvbnNpdmU6IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiAxMTk5LFxyXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvdHM6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcnJvd3M6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDFcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDc2NyxcclxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb3RzOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfV1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBzbGlja0Nhcm91c2VsNCh3cmFwKXtcclxuICAgICAgICAgICAgd3JhcC5zbGljayh7XHJcbiAgICAgICAgICAgICAgICBkb3RzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgYXJyb3dzOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGluZmluaXRlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIG1vYmlsZUZpcnN0OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAyLFxyXG4gICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcbiAgICAgICAgICAgICAgICBuZXh0QXJyb3c6IFwiPHN2ZyBjbGFzcz0nc2xpY2stbmV4dCBzbGljay1hcnJvdyBzbGljay1hcnJvdy1sYXJnZScgYXJpYS1sYWJlbD0nTmV4dCBTbGlkZSc+PHVzZSB4bGluazpocmVmPSNzbGljay1hcnJvdy1uZXh0PjwvdXNlPjwvc3ZnPlwiLCBcclxuICAgICAgICAgICAgICAgIHByZXZBcnJvdzogXCI8c3ZnIGNsYXNzPSdzbGljay1wcmV2IHNsaWNrLWFycm93IHNsaWNrLWFycm93LWxhcmdlJyBhcmlhLWxhYmVsPSdQcmV2aW91cyBTbGlkZSc+PHVzZSB4bGluazpocmVmPSNzbGljay1hcnJvdy1wcmV2PjwvdXNlPjwvc3ZnPlwiLFxyXG4gICAgICAgICAgICAgICAgcmVzcG9uc2l2ZTogW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDExOTksXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZG90czogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFycm93czogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiA1LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogOTkyLFxyXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvdHM6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcnJvd3M6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogNCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDFcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDc2NyxcclxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb3RzOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfV1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBsYWJlbEZsYXNoRGVhbHMod3JhcCkge1xyXG4gICAgICAgICAgICBjb25zdCAkaXRlbVNpZGUgPSB3cmFwLmZpbmQoJy5wcm9kdWN0Q2Fyb3VzZWwtc2xpZGUnKTtcclxuXHJcbiAgICAgICAgICAgICRpdGVtU2lkZS5lYWNoKChpbmRleCwgZWxlbWVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgJHRoaXNMYWJlbCA9ICQoZWxlbWVudCkuZmluZCgnLnNhbGUtYmFkZ2UnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJHRoaXNMYWJlbC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBsYWJlbCA9ICR0aGlzTGFiZWwuZmluZCgnLnRleHQnKS5kYXRhKCdzYWxlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQoZWxlbWVudCkuZmluZCgnLmNhcmQtcHJpY2UnKS5hZGRDbGFzcygnaGFzLWxhYmVsU2FsZScpLmFwcGVuZCgnPGRpdiBjbGFzcz1cImNhcmQtbGFiZWwtc2FsZVwiPjxzcGFuPi0nK2xhYmVsKyc8L3NwYW4+PC9kaXY+Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJHRoaXNMYWJlbC5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZhbmN5Ym94VmlkZW9CYW5uZXIoKXtcclxuICAgICAgICBpZiAoJChcIi52aWRlby1ibG9jay1pbWFnZVtkYXRhLWZhbmN5Ym94XVwiKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICQoXCIudmlkZW8tYmxvY2staW1hZ2VbZGF0YS1mYW5jeWJveF1cIikuZmFuY3lib3goe1xyXG4gICAgICAgICAgICAgICAgJ2F1dG9EaW1lbnNpb25zJzogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAncGFkZGluZycgOiAwLFxyXG4gICAgICAgICAgICAgICAgJ3dpZHRoJyA6IDk3MCxcclxuICAgICAgICAgICAgICAgICdoZWlnaHQnIDogNjAwLFxyXG4gICAgICAgICAgICAgICAgJ2F1dG9TY2FsZScgOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICd0cmFuc2l0aW9uSW4nIDogJ25vbmUnLFxyXG4gICAgICAgICAgICAgICAgJ3RyYW5zaXRpb25PdXQnIDogJ25vbmUnXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCQoXCIuYnV0dG9uLXBvcHVwLXZpZGVvW2RhdGEtZmFuY3lib3hdXCIpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgJChcIi5idXR0b24tcG9wdXAtdmlkZW9bZGF0YS1mYW5jeWJveF1cIikuZmFuY3lib3goe1xyXG4gICAgICAgICAgICAgICAgJ2F1dG9EaW1lbnNpb25zJzogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAncGFkZGluZycgOiAwLFxyXG4gICAgICAgICAgICAgICAgJ3dpZHRoJyA6IDk3MCxcclxuICAgICAgICAgICAgICAgICdoZWlnaHQnIDogNjAwLFxyXG4gICAgICAgICAgICAgICAgJ2F1dG9TY2FsZScgOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICd0cmFuc2l0aW9uSW4nIDogJ25vbmUnLFxyXG4gICAgICAgICAgICAgICAgJ3RyYW5zaXRpb25PdXQnIDogJ25vbmUnXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmYXFzVG9nZ2xlKCl7XHJcbiAgICAgICAgJCgnLmhhbG8tc2hvcnQtZmFxcyAuY2FyZCAudGl0bGUnKS5vbignY2xpY2snLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgIHZhciAkdGFyZ2V0ID0gJChldmVudC5jdXJyZW50VGFyZ2V0KTtcclxuXHJcbiAgICAgICAgICAgICQoJy5oYWxvLXNob3J0LWZhcXMgLmNhcmQgLnRpdGxlJykubm90KCR0YXJnZXQpLnJlbW92ZUNsYXNzKCdjb2xsYXBzZWQnKTtcclxuXHJcbiAgICAgICAgICAgIGlmKCR0YXJnZXQuaGFzQ2xhc3MoJ2NvbGxhcHNlZCcpKXtcclxuICAgICAgICAgICAgICAgICR0YXJnZXQucmVtb3ZlQ2xhc3MoJ2NvbGxhcHNlZCcpO1xyXG4gICAgICAgICAgICB9IGVsc2V7XHJcbiAgICAgICAgICAgICAgICAkdGFyZ2V0LmFkZENsYXNzKCdjb2xsYXBzZWQnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgJCgnLmhhbG8tc2hvcnQtZmFxcyAuY2FyZCcpLmVhY2goKGluZGV4LCBlbGVtZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZigkKGVsZW1lbnQpLmZpbmQoJy50aXRsZScpLmhhc0NsYXNzKCdjb2xsYXBzZWQnKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgJChlbGVtZW50KS5maW5kKCcuY29sbGFwc2UnKS5zbGlkZURvd24oXCJzbG93XCIpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICQoZWxlbWVudCkuZmluZCgnLmNvbGxhcHNlJykuc2xpZGVVcChcInNsb3dcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJlY2VudEJsb2dTbGlkZXIoKXtcclxuICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPD0gMTAyNCkge1xyXG4gICAgICAgICAgICBpZiAoJCgnLmhhbG8tcmVjZW50LXBvc3QnKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIGlmICgkKCcuaGFsby1yZWNlbnQtcG9zdCcpLmhhc0NsYXNzKCdzbGljay1zbGlkZXInKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLmhhbG8tcmVjZW50LXBvc3QnKS5zbGljaygndW5zbGljaycpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNle1xyXG4gICAgICAgICAgICBpZiAoJCgnLmhhbG8tcmVjZW50LXBvc3QnKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIGlmICghJCgnLmhhbG8tcmVjZW50LXBvc3QnKS5oYXNDbGFzcygnc2xpY2stc2xpZGVyJykpe1xyXG4gICAgICAgICAgICAgICAgICAgICQoJy5oYWxvLXJlY2VudC1wb3N0Jykuc2xpY2soKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJCh3aW5kb3cpLnJlc2l6ZShmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpIDw9IDEwMjQpIHtcclxuICAgICAgICAgICAgICAgIGlmICgkKCcuaGFsby1yZWNlbnQtcG9zdCcpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkKCcuaGFsby1yZWNlbnQtcG9zdCcpLmhhc0NsYXNzKCdzbGljay1zbGlkZXInKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5oYWxvLXJlY2VudC1wb3N0Jykuc2xpY2soJ3Vuc2xpY2snKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoJCgnLmhhbG8tcmVjZW50LXBvc3QnKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISQoJy5oYWxvLXJlY2VudC1wb3N0JykuaGFzQ2xhc3MoJ3NsaWNrLXNsaWRlcicpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmhhbG8tcmVjZW50LXBvc3QnKS5zbGljaygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGhvbWVTcGVjaWFsUHJvZHVjdCgpe1xyXG4gICAgICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzLmNvbnRleHQ7XHJcblxyXG4gICAgICAgIGlmKGNvbnRleHQudGhlbWVTZXR0aW5ncy5ob21lX3Byb2R1Y3RfYmxvY2tfc3BlY2lhbCA9PSB0cnVlKXtcclxuICAgICAgICAgICAgdmFyIHByb2R1Y3RJZCA9ICQoJ1tkYXRhLXNwZWNpYWwtcHJvZHVjdC1pZF0nKS5kYXRhKCdzcGVjaWFsLXByb2R1Y3QtaWQnKSxcclxuICAgICAgICAgICAgICAgIHNldEZsYWcgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbnMgPXtcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlOiAnaGFsb3RoZW1lcy9wcm9kdWN0cy9oYWxvLXNwZWNpYWwtcHJvZHVjdC10bXAnXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICQod2luZG93KS5vbignc2Nyb2xsIGxvYWQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHZhciBzY3JvbGwgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCksXHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyX2hlaWdodCA9ICQoJy5oZWFkZXInKS5oZWlnaHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoc2Nyb2xsID4gaGVhZGVyX2hlaWdodCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNldEZsYWcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmKHNldEZsYWcpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKCEkKCcuaGFsby1zcGFjaWFsLXByb2R1Y3QgLnByb2R1Y3RWaWV3JykubGVuZ3RoKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHMuYXBpLnByb2R1Y3QuZ2V0QnlJZChwcm9kdWN0SWQsIG9wdGlvbnMsIChlcnIsIHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRGbGFnID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNjb3BlID0gJy5oYWxvLXNwYWNpYWwtcHJvZHVjdCc7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoISQoc2NvcGUpLmZpbmQoJy5wcm9kdWN0VmlldycpLmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJChzY29wZSkuaHRtbChyZXNwb25zZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvbGRQcm9kdWN0KCQoc2NvcGUpLmZpbmQoJy5wcm9kdWN0Vmlldy1zb2xkUHJvZHVjdCcpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWV3aW5nUHJvZHVjdCgkKHNjb3BlKS5maW5kKCcucHJvZHVjdFZpZXctVmlld2luZ1Byb2R1Y3QnKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY291bnREb3duUHJvZHVjdCgkKHNjb3BlKS5maW5kKCcucHJvZHVjdFZpZXctY291bnREb3duJykpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHNjb3BlKS5maW5kKCdbZGF0YS1zbGlja10nKS5zbGljaygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoc2NvcGUpLmZpbmQoJy5wcm9kdWN0Vmlldy1mb3InKS5nZXQoMCkuc2xpY2suc2V0UG9zaXRpb24oKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5pdFRodW1ibmFpbHNIZWlnaHQoc2NvcGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbG9Ob3RpZnlNZSgkKHNjb3BlKSwgY29udGV4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFsb1lvdXR1YmVDYXJvdXNlbCgkKHNjb3BlKS5maW5kKCdbZGF0YS1zbGlja10nKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoc2NvcGUpLm9uKCdjbGljaycsICcuZHJvcGRvd24tbWVudS1idXR0b24nLCBldmVudCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciAkdGFyZ2V0ID0gJChldmVudC5jdXJyZW50VGFyZ2V0KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKCR0YXJnZXQuaGFzQ2xhc3MoJ2lzLW9wZW4nKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkdGFyZ2V0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1vcGVuJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignYXJpYS1leHBhbmRlZCcsIGZhbHNlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkdGFyZ2V0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNpYmxpbmdzKCcuZHJvcGRvd24tbWVudScpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1vcGVuJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignYXJpYS1oaWRkZW4nLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHRhcmdldFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtb3BlbicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkdGFyZ2V0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNpYmxpbmdzKCcuZHJvcGRvd24tbWVudScpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1vcGVuJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignYXJpYS1oaWRkZW4nLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCBldmVudCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkKHNjb3BlKS5maW5kKCcuZHJvcGRvd24tbWVudS1idXR0b24nKS5oYXNDbGFzcygnaXMtb3BlbicpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKCQoZXZlbnQudGFyZ2V0KS5jbG9zZXN0KCcuZHJvcGRvd24tbWVudS1idXR0b24nKS5sZW5ndGggPT09IDApICYmICgkKGV2ZW50LnRhcmdldCkuY2xvc2VzdCgnLmRyb3Bkb3duLW1lbnUnKS5sZW5ndGggPT09IDApKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHNjb3BlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmRyb3Bkb3duLW1lbnUtYnV0dG9uJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1vcGVuJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCBmYWxzZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoc2NvcGUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcuZHJvcGRvd24tbWVudS1idXR0b24nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2libGluZ3MoJy5kcm9wZG93bi1tZW51JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1vcGVuJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2FyaWEtaGlkZGVuJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHByb2R1Y3REZXRhaWxzID0gbmV3IFByb2R1Y3REZXRhaWxzKCQoc2NvcGUpLCBjb250ZXh0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9kdWN0RGV0YWlscy5zZXRQcm9kdWN0VmFyaWFudCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJvZHVjdERldGFpbHM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gdmlld2luZ1Byb2R1Y3Qod3JhcHBlcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYod3JhcHBlci5sZW5ndGggPiAwKXsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZpZXdlclRleHQgPSBjb250ZXh0LnRoZW1lU2V0dGluZ3MucHJvZHVjdF92aWV3aW5nUHJvZHVjdF90ZXh0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudW1iZXJzVmlld2VyX3RleHQgPSBjb250ZXh0LnRoZW1lU2V0dGluZ3MucHJvZHVjdF92aWV3aW5nUHJvZHVjdF92aWV3ZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bWJlcnNWaWV3ZXJMaXN0ID0gIEpTT04ucGFyc2UoXCJbXCIgKyBudW1iZXJzVmlld2VyX3RleHQgKyBcIl1cIik7IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbnVtYmVyc1ZpZXdlckl0ZW0gPSAoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKm51bWJlcnNWaWV3ZXJMaXN0Lmxlbmd0aCkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd3JhcHBlci5odG1sKCc8c3ZnIGNsYXNzPVwiaWNvblwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjx1c2UgeGxpbms6aHJlZj1cIiNpY29uLWV5ZVwiLz48L3N2Zz4nICsgbnVtYmVyc1ZpZXdlckxpc3RbbnVtYmVyc1ZpZXdlckl0ZW1dICsgXCIgXCIgKyB2aWV3ZXJUZXh0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd3JhcHBlci5yZW1vdmVDbGFzcygndS1oaWRkZW5WaXN1YWxseScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIDEwMDAwKTsgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiBjb3VudERvd25Qcm9kdWN0KHdyYXBwZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHdyYXBwZXIubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvdW50RG93biA9IHdyYXBwZXIuZGF0YSgnY291bnRkb3duJyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50RG93bkRhdGUgPSBuZXcgRGF0ZShjb3VudERvd24pLmdldFRpbWUoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VmdCA9IHdyYXBwZXI7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb3VudGRvd25mdW5jdGlvbiA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbm93ID0gbmV3IERhdGUoKS5nZXRUaW1lKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXN0YW5jZSA9IGNvdW50RG93bkRhdGUgLSBub3c7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGlzdGFuY2UgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGNvdW50ZG93bmZ1bmN0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlZnQucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGF5cyA9IE1hdGguZmxvb3IoZGlzdGFuY2UgLyAoMTAwMCAqIDYwICogNjAgKiAyNCkpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhvdXJzID0gTWF0aC5mbG9vcigoZGlzdGFuY2UgJSAoMTAwMCAqIDYwICogNjAgKiAyNCkpIC8gKDEwMDAgKiA2MCAqIDYwKSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWludXRlcyA9IE1hdGguZmxvb3IoKGRpc3RhbmNlICUgKDEwMDAgKiA2MCAqIDYwKSkgLyAoMTAwMCAqIDYwKSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2Vjb25kcyA9IE1hdGguZmxvb3IoKGRpc3RhbmNlICUgKDEwMDAgKiA2MCkpIC8gMTAwMCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyQ291bnREb3duID0gJzxzdmcgY2xhc3M9XCJpY29uXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PHVzZSB4bGluazpocmVmPVwiI2ljb24tYmVsbFwiLz48L3N2Zz48c3BhbiBjbGFzcz1cInRleHRcIj48c3Bhbj5MaW1pdGVkIHRpbWUgb2ZmZXIsIGVuZCBpbjo8L3NwYW4+PC9zcGFuPiA8c3BhbiBjbGFzcz1cIm51bVwiPicrZGF5cysnZCA6PC9zcGFuPiA8c3BhbiBjbGFzcz1cIm51bVwiPicraG91cnMrJ2ggOjwvc3Bhbj4gPHNwYW4gY2xhc3M9XCJudW1cIj4nK21pbnV0ZXMrJ20gOjwvc3Bhbj4gPHNwYW4gY2xhc3M9XCJudW1cIj4nK3NlY29uZHMrJ3M8L3NwYW4+JztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWZ0Lmh0bWwoc3RyQ291bnREb3duKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIDEwMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiBzb2xkUHJvZHVjdCh3cmFwcGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih3cmFwcGVyLmxlbmd0aCA+IDApeyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbnVtYmVyc1Byb2R1Y3RfdGV4dCA9IGNvbnRleHQudGhlbWVTZXR0aW5ncy5wcm9kdWN0X3NvbGRQcm9kdWN0X3Byb2R1Y3RzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudW1iZXJzSG91cnNfdGV4dCA9IGNvbnRleHQudGhlbWVTZXR0aW5ncy5wcm9kdWN0X3NvbGRQcm9kdWN0X2hvdXJzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb2xkUHJvZHVjdFRleHQgPSBjb250ZXh0LnRoZW1lU2V0dGluZ3MucHJvZHVjdF9zb2xkUHJvZHVjdF90ZXh0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb2xkUHJvZHVjdFRleHQyID0gY29udGV4dC50aGVtZVNldHRpbmdzLnByb2R1Y3Rfc29sZFByb2R1Y3RfaG91cnNfdGV4dDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG51bWJlcnNQcm9kdWN0TGlzdCA9ICBKU09OLnBhcnNlKFwiW1wiICsgbnVtYmVyc1Byb2R1Y3RfdGV4dCArIFwiXVwiKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bWJlcnNQcm9kdWN0SXRlbSA9IChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqbnVtYmVyc1Byb2R1Y3RMaXN0Lmxlbmd0aCkpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudW1iZXJzSG91cnNMaXN0ID0gIEpTT04ucGFyc2UoXCJbXCIgKyBudW1iZXJzSG91cnNfdGV4dCArIFwiXVwiKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVtYmVyc0hvdXJzSXRlbSA9IChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqbnVtYmVyc0hvdXJzTGlzdC5sZW5ndGgpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd3JhcHBlci5odG1sKCc8c3ZnIGNsYXNzPVwiaWNvblwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjx1c2UgeGxpbms6aHJlZj1cIiNpY29uLWZpcmVcIi8+PC9zdmc+PHNwYW4+JyArIG51bWJlcnNQcm9kdWN0TGlzdFtudW1iZXJzUHJvZHVjdEl0ZW1dICsgXCIgXCIgKyBzb2xkUHJvZHVjdFRleHQgKyBcIiBcIiArIG51bWJlcnNIb3Vyc0xpc3RbbnVtYmVyc0hvdXJzSXRlbV0gKyBcIiBcIiArIHNvbGRQcm9kdWN0VGV4dDIgKyAnPC9zcGFuPicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdyYXBwZXIucmVtb3ZlQ2xhc3MoJ3UtaGlkZGVuVmlzdWFsbHknKS5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGluaXRUaHVtYm5haWxzSGVpZ2h0KCRzY29wZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZWwgPSAkKCRzY29wZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyICRjYXJvdXNlbF9uYXYgPSBlbC5maW5kKCcucHJvZHVjdFZpZXctbmF2JyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJGNhcm91c2VsX2ZvciA9IGVsLmZpbmQoJy5wcm9kdWN0Vmlldy1mb3InKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoJGNhcm91c2VsX2Zvci5maW5kKCcuc2xpY2stYXJyb3cnKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJGNhcm91c2VsX2Zvci5wYXJlbnQoKS5hZGRDbGFzcygnYXJyb3dzLXZpc2libGUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJGNhcm91c2VsX2Zvci5wYXJlbnQoKS5hZGRDbGFzcygnYXJyb3dzLWRpc2FibGUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0RmxhZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaG9tZVBhcmFsbGF4QmFubmVyKCl7XHJcbiAgICAgICAgaWYoJCgnI2hhbG9fcGFycmFsYXhfYmFubmVycycpLmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICB2YXIgd3JhcCA9ICQoJyNoYWxvX3BhcnJhbGF4X2Jhbm5lcnMnKSxcclxuICAgICAgICAgICAgICAgIGltYWdlID0gd3JhcC5maW5kKCdbZGF0YS1pbWFnZV0nKS5kYXRhKCdpbWFnZScpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgd3JhcC5maW5kKCdbZGF0YS1pbWFnZV0nKS5jc3MoJ2JhY2tncm91bmQtaW1hZ2UnLCAndXJsKCcraW1hZ2UrJyknKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbG9hZE9wdGlvbkZvclByb2R1Y3RDYXJkKCl7XHJcbiAgICAgICAgY29uc3QgY29udGV4dCA9IHRoaXMuY29udGV4dDtcclxuXHJcbiAgICAgICAgaWYoJCgnLnByb2R1Y3RDYXJvdXNlbCcpLmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICAkKCcucHJvZHVjdENhcm91c2VsJykuZWFjaCgoaW5kZXgsIGVsZW1lbnQpID0+IHtcclxuICAgICAgICAgICAgICAgIHZhciAkcHJvZFdyYXBJZCA9ICQoZWxlbWVudCkuYXR0cignaWQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBoYWxvQWRkT3B0aW9uKGNvbnRleHQsICRwcm9kV3JhcElkKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZigkKCcuaGFsby1ibG9jayAucHJvZHVjdEdyaWQnKS5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgJCgnLmhhbG8tYmxvY2sgLnByb2R1Y3RHcmlkJykuZWFjaCgoaW5kZXgsIGVsZW1lbnQpID0+IHtcclxuICAgICAgICAgICAgICAgIHZhciAkcHJvZFdyYXBJZCA9ICQoZWxlbWVudCkuYXR0cignaWQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBoYWxvQWRkT3B0aW9uKGNvbnRleHQsICRwcm9kV3JhcElkKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIEJhbm5lciBwYXJhbGxheCAyXHJcbiAgICBjdXN0b21lclJldmlld0Nhcm91c2VsKCkge1xyXG4gICAgICAgIGlmICgkKCcjaGFsb19wYXJyYWxheF9iYW5uZXJzIC5oYWxvLXJvdycpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBpZiAoISQoJyNoYWxvX3BhcnJhbGF4X2Jhbm5lcnMgLmhhbG8tcm93JykuaGFzQ2xhc3MoJ3NsaWNrLXNsaWRlcicpKSB7XHJcbiAgICAgICAgICAgICAgICAkKCcjaGFsb19wYXJyYWxheF9iYW5uZXJzIC5oYWxvLXJvdycpLnNsaWNrKHtcclxuICAgICAgICAgICAgICAgICAgICBkb3RzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGFycm93czogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5maW5pdGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vYmlsZUZpcnN0OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGFkYXB0aXZlSGVpZ2h0OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcclxuICAgICAgICAgICAgICAgICAgICBuZXh0QXJyb3c6IFwiPHN2ZyBjbGFzcz0nc2xpY2stbmV4dCBzbGljay1hcnJvdycgYXJpYS1sYWJlbD0nTmV4dCBTbGlkZSc+PHVzZSB4bGluazpocmVmPSNzbGljay1hcnJvdy1uZXh0PjwvdXNlPjwvc3ZnPlwiLCBcclxuICAgICAgICAgICAgICAgICAgICBwcmV2QXJyb3c6IFwiPHN2ZyBjbGFzcz0nc2xpY2stcHJldiBzbGljay1hcnJvdycgYXJpYS1sYWJlbD0nUHJldmlvdXMgU2xpZGUnPjx1c2UgeGxpbms6aHJlZj0jc2xpY2stYXJyb3ctcHJldj48L3VzZT48L3N2Zz5cIixcclxuICAgICAgICAgICAgICAgICAgICByZXNwb25zaXZlOiBbXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiAxMDI0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV2aWV3Q2Fyb3VzZWwoKSB7XHJcbiAgICAgICAgJCh3aW5kb3cpLm9uKFwicmVzaXplIG9yaWVudGF0aW9uY2hhbmdlXCIsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkKFwiLmJsb2NrdGlrdG9rXCIpLmNzcygnZGlzcGxheScsICdub25lJylcclxuIFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgbGV0IHByb2R1Y3RJZHMgPSAkKFwiW2Z1bmN0aW9uPWxpc3QtcHJvZHVjdF1cIikuZGF0YShcImlkc1wiKS50b1N0cmluZygpLnNwbGl0KFwiLFwiKS5tYXAoZnVuY3Rpb25cclxuICAgICAgICBcclxuICAgICAgICAgICAgKGl0ZW0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIHBhcnNlSW50KGl0ZW0sIDEwKTtcclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gbGV0IHN0b2tlbiA9ICQoXCJbbmFtZT1zdG9yZS10b2tlbl1cIikudmFsKCk7XHJcbiAgICAgICAgbGV0IHNrdXMgPSBbJ00xMDEnLCdIRDExMScsICdNMTExJywgJ0hEMTExJywgJ00xMDUnXVxyXG5cclxuICAgICAgICAkKCcjci10ZXN0MScpLnNsaWNrKHtcclxuICAgICAgICAgICAgXCJkb3RzXCI6IGZhbHNlLFxyXG4gICAgICAgICAgICBcImFycm93c1wiOiBmYWxzZSxcclxuICAgICAgICAgICAgXCJpbmZpbml0ZVwiOiB0cnVlLFxyXG4gICAgICAgICAgICBcImFzTmF2Rm9yXCI6IFwiI3ItdGVzdDJcIixcclxuICAgICAgICAgICAgXCJzd2lwZVwiOiBmYWxzZSxcclxuICAgICAgICAgICAgXCJwYXVzZU9uRm9jdXNcIiA6IGZhbHNlLFxyXG4gICAgICAgICAgICBcInBhdXNlT25Ib3ZlclwiOiBmYWxzZSxcclxuICAgICAgICAgICAgXCJmYWRlXCI6IHRydWUsXHJcbiAgICAgICAgICAgIFwiYXV0b3BsYXlcIjogdHJ1ZSxcclxuICAgICAgICAgICAgXCJzbGlkZXNUb1Nob3dcIjogMSwgXHJcbiAgICAgICAgICAgIFwic2xpZGVzVG9TY3JvbGxcIjogMVxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgJCgnI3ItdGVzdDMnKS5zbGljayh7XHJcbiAgICAgICAgICAgICAgICBcImRvdHNcIjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBcImFycm93c1wiOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIFwiaW5maW5pdGVcIjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIFwiYXNOYXZGb3JcIjogXCIjci10ZXN0MlwiLFxyXG4gICAgICAgICAgICAgICAgXCJhdXRvcGxheVwiOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgXCJwYXVzZU9uRm9jdXNcIiA6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgXCJwYXVzZU9uSG92ZXJcIjogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICAgICAgXCJzd2lwZVwiOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIFwic2xpZGVzVG9TaG93XCI6IDEsIFxyXG4gICAgICAgICAgICAgICAgXCJzbGlkZXNUb1Njcm9sbFwiOiAxLCAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBcImZhZGVcIjogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICQoJyNyLXRlc3QyJykuc2xpY2soe1xyXG4gICAgICAgICAgICAgICAgICAgIFwiZG90c1wiOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIFwiYXJyb3dzXCI6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBcImluZmluaXRlXCI6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBcInN3aXBlXCI6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgXCJwYXVzZU9uRm9jdXNcIiA6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgXCJwYXVzZU9uSG92ZXJcIjogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICAgICAgXCJhdXRvcGxheVwiOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgXCJhZGFwdGl2ZUhlaWdodFwiOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgXCJhc05hdkZvclwiOiBcIi5yZXZpZXdTbGlkZXJcIixcclxuICAgICAgICAgICAgICAgIFwic2xpZGVzVG9TaG93XCI6IDEsXHJcbiAgICAgICAgICAgICAgICBcInNsaWRlc1RvU2Nyb2xsXCI6IDEsXHJcbiAgICAgICAgICAgICAgICBcImZhZGVcIjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIFwiYXBwZW5kQXJyb3dzXCI6IFwiI2dva3V2aWR1NlwiXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAkKCcjcmV2aWV3YmxvY2sxJykuc2xpY2soe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImRvdHNcIjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYXJyb3dzXCI6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicGF1c2VPbkZvY3VzXCIgOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicGF1c2VPbkhvdmVyXCI6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJpbmZpbml0ZVwiOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInN3aXBlXCI6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImF1dG9wbGF5XCI6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYXNOYXZGb3JcIjogXCIucmV2aWV3U2xpZGVyXCIsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImFkYXB0aXZlSGVpZ2h0XCI6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwic2xpZGVzVG9TaG93XCI6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwic2xpZGVzVG9TY3JvbGxcIjogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJuZXh0QXJyb3dcIjogXCI8c3ZnIGlkPXNsaWNrLW5leHQgY2xhc3M9c2xpY2stbmV4dCB0ZXN0MSBzbGljay1hcnJvdyBhcmlhLWxhYmVsPU5leHQgU2xpZGU+PHVzZSB4bGluazpocmVmPSNzbGljay1hcnJvdy1uZXh0PjwvdXNlPjwvc3ZnPlwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwcmV2QXJyb3dcIjogXCI8c3ZnIGNsYXNzPXNsaWNrLXByZXYgc2xpY2stYXJyb3cgYXJpYS1sYWJlbD1QcmV2aW91cyBTbGlkZT48dXNlIHhsaW5rOmhyZWY9I3NsaWNrLWFycm93LXByZXY+PC91c2U+PC9zdmc+XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYXBwZW5kQXJyb3dzXCI6IFwiI2FycjFcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBza3VzLm1hcCgoaXRlbSwgaSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmV2ID1bXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZmV0Y2goYGh0dHBzOi8vc2hwLXdlYnNlcnZlci5nbGl0Y2gubWUvZ2V0LXRlYW1kZXNrYCwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBcInRhYmxlXCI6IFwiSW52ZW50b3J5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIFwiZmlsdGVyXCI6YEFueShbU0tVXSwgJyR7aXRlbX0nKWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIC50aGVuKHI9PiByLmpzb24oKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIC50aGVuKHI9PiBjb25zb2xlLmxvZyhyKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZldGNoKGBodHRwczovL3NocC13ZWJzZXJ2ZXIuZ2xpdGNoLm1lL2dldC10ZWFtZGVza2AsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0YWJsZVwiOiBcIlJldmlld1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm9wdGlvbnNcIjpgP2ZpbHRlcj1bUHJvZHVjdCBTS1VdPSAnJHtpdGVtfSdgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihyPT4gci5qc29uKCkpXHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihyPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHIuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXYucHVzaChpdGVtWydSZXZpZXcgcmF0ZSddKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmV2aWV3QXZnID0gTWF0aC5yb3VuZCgocmV2LnJlZHVjZSgoYSxiICkgPT4gYSsgYiwgMCkvcmV2Lmxlbmd0aCkgKiAxMCkvMTBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY29udGVudCA9IGA8c3R5bGU+ICAgIC5jaGVja2VkIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IHJnYigyNTUsIDIxMCwgMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZhLXN0YXItbyB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IHJnYigyNTUsIDIxMCwgMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZhIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb250LXNpemU6MjBweCAhaW1wb3J0YW50O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQG1lZGlhIChtaW4td2lkdGg6IDc2OHB4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnByb2R1Y3RSZXZpZXcyIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBAbWVkaWEgKG1pbi13aWR0aDogMTAyNXB4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnByb2R1Y3RSZXZpZXcyIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogdW5zZXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQG1lZGlhIChtaW4td2lkdGg6IDE0MDBweCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5wcm9kdWN0UmV2aWV3MiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zdHlsZT5cclxuICAgICAgICAgICAgICAgIDxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiBocmVmPVwiaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvZm9udC1hd2Vzb21lLzQuNy4wL2Nzcy9mb250LWF3ZXNvbWUubWluLmNzc1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZmEgZmEtc3RhcmArKDAuNSA8PSByZXZpZXdBdmc/ICcgY2hlY2tlZCc6ICcgZmEtc3Rhci1vJykgKyBgXCI+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZmEgZmEtc3RhcmArKDEuNSA8PSByZXZpZXdBdmc/ICcgY2hlY2tlZCc6ICcgZmEtc3Rhci1vJykgKyBgXCI+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZmEgZmEtc3RhcmArKDIuNSA8PSByZXZpZXdBdmc/ICcgY2hlY2tlZCc6ICcgZmEtc3Rhci1vJykgKyBgXCI+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZmEgZmEtc3RhcmArKDMuNSA8PSByZXZpZXdBdmc/ICcgY2hlY2tlZCc6ICcgZmEtc3Rhci1vJykgKyBgXCI+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZmEgZmEtc3RhcmArKDQuNSA8PSByZXZpZXdBdmc/ICcgY2hlY2tlZCc6ICcgZmEtc3Rhci1vJykgKyBgXCI+PC9zcGFuPiAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT1cInBhZGRpbmctbGVmdDo1cHg7Y29sb3I6IzVhNWE1YTtcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAke3Jldi5sZW5ndGh9IFJlc2XDsWFzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5gXHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnZpZHVqZW4nKS5lcShpKS5odG1sKGNvbnRlbnQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnZpZHVqZW4xJykuZXEoaSkuaHRtbChjb250ZW50KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAvLyBjb25zb2xlLmxvZygkKCcudGhpbmdJV2FudCcpKVxyXG4gICAgLy8gICAgIGZldGNoKCcvZ3JhcGhxbCcsIHtcclxuXHJcbiAgICAvLyAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgLy8gICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAvLyAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgIC8vICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6IGBCZWFyZXIgJHtzdG9rZW59YFxyXG4gICAgLy8gICAgICAgICB9LFxyXG4gICAgLy8gICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IFxyXG4gICAgLy8gICAgICAgICAgICAgcXVlcnk6IGBcclxuICAgIC8vICAgICAgICAgICAgIHF1ZXJ5IHByb2R1Y3RzQnlJZCB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgc2l0ZSB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIHByb2R1Y3RzICAoZW50aXR5SWRzOiBbJHtwcm9kdWN0SWRzfV0pIHsgICAgXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICBlZGdlcyB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZSB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNrdSAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWVcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRkVG9DYXJ0VXJsXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhdGhcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWRcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW50aXR5SWRcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW52ZW50b3J5IHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzSW5TdG9ja1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByaWNlcyB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmljZSB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW5jeUNvZGVcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNhbGVQcmljZSB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4uTW9uZXlGaWVsZHNcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmFuZCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWVcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRJbWFnZSB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmwgKHdpZHRoOiAyMDApXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvZHVjdE9wdGlvbnMge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi5PcHRpb25GaWVsZHNcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSAgICAgICAgIFxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgICAgIGZyYWdtZW50IE1vbmV5RmllbGRzIG9uIE1vbmV5IHtcclxuICAgIC8vICAgICAgICAgICAgICAgICB2YWx1ZVxyXG4gICAgLy8gICAgICAgICAgICAgICAgIGN1cnJlbmN5Q29kZVxyXG4gICAgLy8gICAgICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICAgICAgZnJhZ21lbnQgT3B0aW9uRmllbGRzIG9uIFByb2R1Y3RPcHRpb25Db25uZWN0aW9uIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICBlZGdlcyB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIG5vZGUge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgZW50aXR5SWRcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAuLi4gb24gTXVsdGlwbGVDaG9pY2VPcHRpb24ge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlcyB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVkZ2VzIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVudGl0eUlkXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICAgICAgfWAgICAgICAgICAgICAgICAgXHJcbiAgICAvLyAgICAgICAgIH0pXHJcbiAgICAvLyAgICAgfSlcclxuICAgIC8vICAgICAudGhlbihyPT5yLmpzb24oKSlcclxuICAgIC8vICAgICAudGhlbihyPT4ge1xyXG4gICAgLy8gICAgICAgICBpZiAoci5kYXRhKSB7XHJcbiAgICAvLyAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyLmRhdGEuc2l0ZS5wcm9kdWN0cy5lZGdlcylcclxuICAgIC8vICAgICAgICAgICAgIGxldCBjb250ZW50PVwiXCI7XHJcbiAgICAvLyAgICAgICAgICAgICBsZXQgY29udGVudDE9XCJcIjtcclxuICAgIC8vICAgICAgICAgICAgIGNvbnN0IHNrdXM9W11cclxuICAgIC8vICAgICAgICAgICAgIGNvbnN0IGZpbHRlckFyciA9IHIuZGF0YS5zaXRlLnByb2R1Y3RzLmVkZ2VzXHJcbiAgICAvLyAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhmaWx0ZXJBcnIpXHJcbiAgICAvLyAgICAgICAgICAgICAkKCcudGhpbmdJV2FudCcpLmVhY2goKGksaXRlbTEpID0+IHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhpdGVtMSlcclxuICAgIC8vICAgICAgICAgICAgICAgICBmaWx0ZXJBcnIuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICBpZihpdGVtLm5vZGUuZW50aXR5SWQgPT0gcGFyc2VJbnQoaXRlbTEudmFsdWUpKSB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhpdGVtKVxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgICAgICB9KVxyXG4gICAgLy8gICAgICAgICB9KVxyXG4gICAgLy8gICAgIH1cclxuICAgIC8vIH0pXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBza3VzLnB1c2goaXRlbS5ub2RlLnNrdSlcclxuICAgICAgICAvLyAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhpdGVtLm5vZGUuc2t1KVxyXG4gICAgICAgIC8vICAgICAgICAgICAgIGNvbnRlbnQgKz0gYFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3M9ci1pdGVtIGhyZWY9JHtpdGVtLm5vZGUucGF0aH0+XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9JHtpdGVtLm5vZGUuZGVmYXVsdEltYWdlLnVybH0+XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9J3ZpZHVqZW4nPjwvZGl2PlxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1yLW5hbWUgc3R5bGU9XCItd2Via2l0LWJveC1vcmllbnQ6IHZlcnRpY2FsXCI+JHtpdGVtLm5vZGUubmFtZX08L2Rpdj5cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9ci1wcmljZT4ke2l0ZW0ubm9kZS5wcmljZXMucHJpY2UudmFsdWV9LDAw4oKsPC9kaXY+XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgYFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBjb250ZW50MSArPSBgXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIDxhIGNsYXNzPXItaXRlbSBocmVmPSR7aXRlbS5ub2RlLnBhdGh9PlxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz0ke2l0ZW0ubm9kZS5kZWZhdWx0SW1hZ2UudXJsfT5cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSd2aWR1amVuMSc+PC9kaXY+XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9ci1uYW1lIHN0eWxlPVwiLXdlYmtpdC1ib3gtb3JpZW50OiB2ZXJ0aWNhbFwiPiR7aXRlbS5ub2RlLm5hbWV9PC9kaXY+XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9ci1wcmljZT4ke2l0ZW0ubm9kZS5wcmljZXMucHJpY2UudmFsdWV9LDAw4oKsPC9kaXY+XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIC8vICAgICAgICAgICAgIGBcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgLy8gICAgICAgICB9KVxyXG5cclxuICAgICAgICAvLyAgICAgICAgICQoXCIjci10ZXN0MVwiKS5odG1sKGNvbnRlbnQpXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICQoJyNyLXRlc3QxJykuc2xpY2soe1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgXCJkb3RzXCI6IGZhbHNlLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgXCJhcnJvd3NcIjogZmFsc2UsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBcImluZmluaXRlXCI6IHRydWUsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBcImFzTmF2Rm9yXCI6IFwiI3ItdGVzdDJcIixcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIFwic3dpcGVcIjogZmFsc2UsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBcInBhdXNlT25Gb2N1c1wiIDogZmFsc2UsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBcInBhdXNlT25Ib3ZlclwiOiBmYWxzZSxcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIFwiZmFkZVwiOiB0cnVlLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgXCJhdXRvcGxheVwiOiB0cnVlLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgXCJzbGlkZXNUb1Nob3dcIjogMSwgXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBcInNsaWRlc1RvU2Nyb2xsXCI6IDFcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgJChcIiNyLXRlc3QzXCIpLmh0bWwoY29udGVudDEpXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAkKCcjci10ZXN0MycpLnNsaWNrKHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICBcImRvdHNcIjogZmFsc2UsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgXCJhcnJvd3NcIjogZmFsc2UsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgXCJpbmZpbml0ZVwiOiB0cnVlLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXNOYXZGb3JcIjogXCIjci10ZXN0MlwiLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXV0b3BsYXlcIjogdHJ1ZSxcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICBcInBhdXNlT25Gb2N1c1wiIDogZmFsc2UsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBcInBhdXNlT25Ib3ZlclwiOiBmYWxzZSxcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICBcInN3aXBlXCI6IGZhbHNlLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIFwic2xpZGVzVG9TaG93XCI6IDEsIFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIFwic2xpZGVzVG9TY3JvbGxcIjogMSwgICAgICAgIFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIFwiZmFkZVwiOiB0cnVlXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAkKCcjci10ZXN0MicpLnNsaWNrKHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkb3RzXCI6IGZhbHNlLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXJyb3dzXCI6IHRydWUsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgXCJpbmZpbml0ZVwiOiB0cnVlLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIFwic3dpcGVcIjogZmFsc2UsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXVzZU9uRm9jdXNcIiA6IGZhbHNlLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgXCJwYXVzZU9uSG92ZXJcIjogZmFsc2UsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgXCJhdXRvcGxheVwiOiB0cnVlLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIFwiYWRhcHRpdmVIZWlnaHRcIjogdHJ1ZSxcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICBcImFzTmF2Rm9yXCI6IFwiLnJldmlld1NsaWRlclwiLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIFwic2xpZGVzVG9TaG93XCI6IDEsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgXCJzbGlkZXNUb1Njcm9sbFwiOiAxLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIFwiZmFkZVwiOiB0cnVlLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXBwZW5kQXJyb3dzXCI6IFwiI2dva3V2aWR1NlwiXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJyNyZXZpZXdibG9jazEnKS5zbGljayh7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRvdHNcIjogZmFsc2UsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFycm93c1wiOiB0cnVlLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXVzZU9uRm9jdXNcIiA6IGZhbHNlLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgXCJwYXVzZU9uSG92ZXJcIjogZmFsc2UsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImluZmluaXRlXCI6IHRydWUsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInN3aXBlXCI6IGZhbHNlLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhdXRvcGxheVwiOiB0cnVlLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhc05hdkZvclwiOiBcIi5yZXZpZXdTbGlkZXJcIixcclxuXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFkYXB0aXZlSGVpZ2h0XCI6IHRydWUsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNsaWRlc1RvU2hvd1wiOiAxLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzbGlkZXNUb1Njcm9sbFwiOiAxLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJuZXh0QXJyb3dcIjogXCI8c3ZnIGlkPXNsaWNrLW5leHQgY2xhc3M9c2xpY2stbmV4dCB0ZXN0MSBzbGljay1hcnJvdyBhcmlhLWxhYmVsPU5leHQgU2xpZGU+PHVzZSB4bGluazpocmVmPSNzbGljay1hcnJvdy1uZXh0PjwvdXNlPjwvc3ZnPlwiLCBcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicHJldkFycm93XCI6IFwiPHN2ZyBjbGFzcz1zbGljay1wcmV2IHNsaWNrLWFycm93IGFyaWEtbGFiZWw9UHJldmlvdXMgU2xpZGU+PHVzZSB4bGluazpocmVmPSNzbGljay1hcnJvdy1wcmV2PjwvdXNlPjwvc3ZnPlwiLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhcHBlbmRBcnJvd3NcIjogXCIjYXJyMVwiXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIC8vICAgICAgICAgc2t1cy5tYXAoKGl0ZW0sIGkpID0+IHtcclxuICAgICAgICAvLyAgICAgICAgICAgICBjb25zdCByZXYgPVtdXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgZmV0Y2goYGh0dHBzOi8vc2hwLXdlYnNlcnZlci5nbGl0Y2gubWUvZ2V0LXRlYW1kZXNrYCwge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgXCJ0YWJsZVwiOiBcIlJldmlld1wiLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgXCJvcHRpb25zXCI6YD9maWx0ZXI9W1Byb2R1Y3QgU0tVXT0gJyR7aXRlbX0nYFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIC8vICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgLnRoZW4ocj0+IHIuanNvbigpKVxyXG5cclxuICAgICAgICAvLyAgICAgICAgICAgICAudGhlbihyPT4ge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICByLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIHJldi5wdXNoKGl0ZW1bJ1JldmlldyByYXRlJ10pXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGNvbnN0IHJldmlld0F2ZyA9IE1hdGgucm91bmQoKHJldi5yZWR1Y2UoKGEsYiApID0+IGErIGIsIDApL3Jldi5sZW5ndGgpICogMTApLzEwXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIHZhciBjb250ZW50ID0gYDxzdHlsZT4gICAgLmNoZWNrZWQge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgY29sb3I6IHJnYigyNTUsIDIxMCwgMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAvLyAgICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgLmZhLXN0YXItbyB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGNvbG9yOiByZ2IoMjU1LCAyMTAsIDApO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICAgICAgICAgIC5mYSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGZvbnQtc2l6ZToyMHB4ICFpbXBvcnRhbnQ7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICAgICAgICAgIEBtZWRpYSAobWluLXdpZHRoOiA3NjhweCkge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAucHJvZHVjdFJldmlldzIge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgICAgICBAbWVkaWEgKG1pbi13aWR0aDogMTAyNXB4KSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIC5wcm9kdWN0UmV2aWV3MiB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiB1bnNldDtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgICAgICBAbWVkaWEgKG1pbi13aWR0aDogMTQwMHB4KSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIC5wcm9kdWN0UmV2aWV3MiB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICAgICAgICAgIDwvc3R5bGU+XHJcbiAgICAgICAgLy8gPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIGhyZWY9XCJodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9mb250LWF3ZXNvbWUvNC43LjAvY3NzL2ZvbnQtYXdlc29tZS5taW4uY3NzXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICA8c3Bhbj5cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmYSBmYS1zdGFyYCsoMC41IDw9IHJldmlld0F2Zz8gJyBjaGVja2VkJzogJyBmYS1zdGFyLW8nKSArIGBcIj48L3NwYW4+XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZmEgZmEtc3RhcmArKDEuNSA8PSByZXZpZXdBdmc/ICcgY2hlY2tlZCc6ICcgZmEtc3Rhci1vJykgKyBgXCI+PC9zcGFuPlxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZhIGZhLXN0YXJgKygyLjUgPD0gcmV2aWV3QXZnPyAnIGNoZWNrZWQnOiAnIGZhLXN0YXItbycpICsgYFwiPjwvc3Bhbj5cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmYSBmYS1zdGFyYCsoMy41IDw9IHJldmlld0F2Zz8gJyBjaGVja2VkJzogJyBmYS1zdGFyLW8nKSArIGBcIj48L3NwYW4+XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZmEgZmEtc3RhcmArKDQuNSA8PSByZXZpZXdBdmc/ICcgY2hlY2tlZCc6ICcgZmEtc3Rhci1vJykgKyBgXCI+PC9zcGFuPiAgICAgIFxyXG4gICAgICAgIC8vICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAvLyAgICAgICAgICAgICA8ZGl2IHN0eWxlPVwicGFkZGluZy1sZWZ0OjVweDtjb2xvcjojNWE1YTVhO1wiPlxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAke3Jldi5sZW5ndGh9IFJlc2XDsWFzXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgPC9kaXY+YFxyXG5cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgJCgnLnZpZHVqZW4nKS5lcShpKS5odG1sKGNvbnRlbnQpXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICQoJy52aWR1amVuMScpLmVxKGkpLmh0bWwoY29udGVudClcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICBcclxuICAgICAgICAvLyAgICAgICAgICAgICB9KVxyXG4gICAgICAgIC8vICAgICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyB9KVxyXG5cclxuXHJcbiAgICAgICAgJCgnLmFycjEgLnNsaWNrLXByZXYnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICQoJyNyLXRlc3QxJykuc2xpY2soXCJzbGlja1ByZXZcIik7XHJcbiAgICAgICAgICAgICQoJyNyLXRlc3QyJykuc2xpY2soXCJzbGlja1ByZXZcIilcclxuICAgICAgICAgICAgJCgnI3ItdGVzdDMnKS5zbGljayhcInNsaWNrUHJldlwiKVxyXG5cclxuICAgIH0pO1xyXG4gICAgJCgnLmFycjEgLnNsaWNrLW5leHQnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJCgnI3ItdGVzdDEnKS5zbGljayhcInNsaWNrTmV4dFwiKTtcclxuICAgICAgICAkKCcjci10ZXN0MicpLnNsaWNrKFwic2xpY2tOZXh0XCIpXHJcbiAgICAgICAgJCgnI3ItdGVzdDMnKS5zbGljayhcInNsaWNrTmV4dFwiKVxyXG5cclxuICAgIH0pO1xyXG4gICAgJCgnLmFycjQgLnNsaWNrLXByZXYnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8gJCgnI3ItdGVzdDEnKS5zbGljayhcInNsaWNrUHJldlwiKTtcclxuICAgICAgICAkKCcjci10ZXN0MicpLnNsaWNrKFwic2xpY2tQcmV2XCIpXHJcbiAgICAgICAgJCgnI3ItdGVzdDMnKS5zbGljayhcInNsaWNrUHJldlwiKVxyXG5cclxufSk7XHJcbiQoJy5hcnI0IC5zbGljay1uZXh0IC5zbGljay1hcnJvdycpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgIGNvbnNvbGUubG9nKCdob2knKVxyXG4gICAgLy8gJCgnI3ItdGVzdDEnKS5zbGljayhcInNsaWNrTmV4dFwiKTtcclxuICAgICQoJyNyLXRlc3QyJykuc2xpY2soXCJzbGlja05leHRcIilcclxuICAgICQoJyNyLXRlc3QzJykuc2xpY2soXCJzbGlja05leHRcIilcclxuXHJcbn0pO1xyXG4gICAgfVxyXG4gICAgaG9tZVByb2R1Y3RSZWNvbW1lbmRlZCgpIHtcclxuICAgICAgICBjb25zdCAkaG9tZVBHRiA9ICQoJy5ob21lMi1ibG9jay1yZWNvbW1lbmRlZCcpO1xyXG4gICAgICAgIGNvbnN0ICRob21lUEdGX2dyaWQgPSAkaG9tZVBHRi5maW5kKCcucHJvZHVjdEdyaWQnKTtcclxuICAgICAgICBjb25zdCBob21lUEdGX2l0ZW1MZW5ndGggPSAkaG9tZVBHRl9ncmlkLmZpbmQoJy5wcm9kdWN0JykubGVuZ3RoO1xyXG4gICAgICAgIGNvbnN0ICRob21lUEdGX2J0bkJsb2NrID0gJCgnLmhvbWVQR0ZfYnRuJyk7XHJcbiAgICAgICAgY29uc3QgJGhvbWVQR0ZfYnRuID0gJCgnLmhvbWVQR0ZfYnRuIGEnKTtcclxuICAgICAgICBjb25zdCBkYXRhQ29sdW1uID0gJGhvbWVQR0ZfZ3JpZC5kYXRhKCdjb2x1bW5zJyk7XHJcbiAgICAgICAgbGV0IHR0X3Byb2R1Y3RTaG93O1xyXG5cclxuICAgICAgICBpZiAoJGhvbWVQR0YubGVuZ3RoICYmIGhvbWVQR0ZfaXRlbUxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgY29uc3QgZldpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XHJcblxyXG4gICAgICAgICAgICBpZiAoZldpZHRoID4gMTI3OSAmJiBob21lUEdGX2l0ZW1MZW5ndGggPiAxMCkge1xyXG4gICAgICAgICAgICAgICAgJGhvbWVQR0ZfYnRuQmxvY2suYWRkQ2xhc3MoJ2lzLXNob3cnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChmV2lkdGggPD0gMTI3OSAmJiBmV2lkdGggPiA5OTEgJiYgaG9tZVBHRl9pdGVtTGVuZ3RoID4gOCkge1xyXG4gICAgICAgICAgICAgICAgJGhvbWVQR0ZfYnRuQmxvY2suYWRkQ2xhc3MoJ2lzLXNob3cnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChmV2lkdGggPD0gOTkxICYmIGZXaWR0aCA+IDc2NyAmJiBob21lUEdGX2l0ZW1MZW5ndGggPiA2KSB7XHJcbiAgICAgICAgICAgICAgICAkaG9tZVBHRl9idG5CbG9jay5hZGRDbGFzcygnaXMtc2hvdycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGZXaWR0aCA8PSA3NjcgJiYgaG9tZVBHRl9pdGVtTGVuZ3RoID4gNCkge1xyXG4gICAgICAgICAgICAgICAgJGhvbWVQR0ZfYnRuQmxvY2suYWRkQ2xhc3MoJ2lzLXNob3cnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgJGhvbWVQR0ZfYnRuLm9uKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB3V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAod1dpZHRoID4gMTI3OSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHR0X3Byb2R1Y3RTaG93ID0gMTA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh3V2lkdGggPD0gMTI3OSAmJiB3V2lkdGggPiA5OTEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0dF9wcm9kdWN0U2hvdyA9IDg7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh3V2lkdGggPD0gOTkxICYmIHdXaWR0aCA+IDc2Nykge1xyXG4gICAgICAgICAgICAgICAgICAgIHR0X3Byb2R1Y3RTaG93ID0gNjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHR0X3Byb2R1Y3RTaG93ID0gNDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJGhvbWVQR0ZfZ3JpZC5maW5kKCcucHJvZHVjdDpoaWRkZW4nKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJGhvbWVQR0ZfZ3JpZC5maW5kKCcucHJvZHVjdDpoaWRkZW46bHQoJyt0dF9wcm9kdWN0U2hvdysnKScpLmNzcygnZGlzcGxheScsICdpbmxpbmUtYmxvY2snKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCRob21lUEdGX2dyaWQuZmluZCgnLnByb2R1Y3Q6aGlkZGVuJykubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJGhvbWVQR0ZfYnRuLnRleHQoJ05vIE1vcmUgUHJvZHVjdHMnKS5hdHRyKCdkaXNhYmxlZCcsICcnKS5hZGRDbGFzcygnZGlzYWJsZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=