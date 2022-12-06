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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvaGFsb3RoZW1lcy9oYWxvQWRkT3B0aW9uRm9yUHJvZHVjdENhcmQuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3RoZW1lL2hhbG90aGVtZXMvcGFyYWxsYXgvanF1ZXJ5LnBhcmFsbGF4LXNjcm9sbC5taW4uanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3RoZW1lL2hvbWUuanMiXSwibmFtZXMiOlsiZmV0Y2giLCJyZXF1aXJlIiwiY29udGV4dCIsIndyYXBwZXIiLCJ0aGVtZVNldHRpbmdzIiwiaGFsb0FkZE9wdGlvbkZvclByb2R1Y3QiLCJjYWxsUHJvZHVjdE9wdGlvbiIsInByb2R1Y3RfY2xhc3MiLCJlYWNoIiwiaW5kZXgiLCJlbGVtZW50IiwicHJvZHVjdElkIiwiJCIsImRhdGEiLCJsaXN0IiwicHVzaCIsInRvU3RyaW5nIiwibGVuZ3RoIiwiZ2V0UHJvZHVjdE9wdGlvbiIsInRoZW4iLCJyZW5kZXJPcHRpb24iLCJpZHgiLCJpdGVtIiwiYXJyIiwicHJvZHVjdF93cmFwcGVyIiwiZmluZCIsInR4dCIsInJlbW92ZSIsImNvdW50TW9yZU9wdGlvbiIsInByb2R1Y3RMaW5rIiwiYXR0ciIsImFwcGVuZCIsIm1ldGhvZCIsImhlYWRlcnMiLCJ0b2tlbiIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwicXVlcnkiLCJyZXMiLCJqc29uIiwiYUZpbHRlciIsInNpdGUiLCJwcm9kdWN0cyIsImVkZ2VzIiwibm9kZSIsImVudGl0eUlkIiwicHJvZHVjdEZpZWxkQ29sb3IiLCJwcm9kdWN0RmllbGRTaXplIiwiYUZpbHRlcjIiLCJwcm9kdWN0T3B0aW9ucyIsImFGaWx0ZXIzIiwiZmlsdGVyIiwiZGlzcGxheVN0eWxlIiwiYUZpbHRlcjUiLCJkaXNwbGF5TmFtZSIsImhhbG9BZGRPcHRpb25Gb3JQcm9kdWN0MiIsImFGaWx0ZXI0IiwidmFsdWVzIiwidGl0bGVWYXIiLCJsYWJlbCIsImlkVmFyIiwibGVuZ3RoQ29sb3JWYXIiLCJoZXhDb2xvcnMiLCJjb2xvcjEiLCJjb2xvcjIiLCJjb2xvcjMiLCJpbWciLCJpbWFnZVVybCIsIkJvb2xlYW4iLCJoYWxvQWRkT3B0aW9uRm9yUHJvZHVjdFRleHQiLCJQYXJhbGxheFNjcm9sbCIsImluaXQiLCJzaG93TG9ncyIsInJvdW5kIiwiX2xvZyIsIl9pbml0ZWQiLCJfcmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwid2luZG93IiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwid2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwibW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwib1JlcXVlc3RBbmltYXRpb25GcmFtZSIsIm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiYSIsImIiLCJzZXRUaW1lb3V0IiwiX29uU2Nyb2xsIiwiX3Byb3BlcnRpZXMiLCJjb25zb2xlIiwibG9nIiwiZG9jdW1lbnQiLCJzY3JvbGxUb3AiLCJjIiwiaGVpZ2h0IiwicHJveHkiLCJkIiwiZSIsImYiLCJnIiwiaCIsImkiLCJrIiwiaiIsImwiLCJtIiwibiIsIk1hdGgiLCJtYXgiLCJvZmZzZXQiLCJ0b3AiLCJvIiwiZGlzdGFuY2UiLCJwIiwicSIsImVhc2luZyIsInIiLCJzIiwiZHVyYXRpb24iLCJ0IiwidSIsInYiLCJzbW9vdGhuZXNzIiwidyIsIm1pbiIsIm1hcCIsImNlaWwiLCJ6IiwieCIsInBlcnNwZWN0aXZlIiwieSIsInBhcmVudCIsInNjYWxlWCIsInNjYWxlWSIsInNjYWxlWiIsInNjYWxlIiwiQSIsInJvdGF0ZVgiLCJyb3RhdGVZIiwicm90YXRlWiIsIkIiLCJDIiwiSG9tZSIsIm9uUmVhZHkiLCJjb3VudERvd25IZXJvQ2Fyb3VzZWwiLCJjdXN0b21QYWdpbmciLCJsb2FkUHJvZHVjdEJ5Q2F0ZWdvcnkiLCJsb2FkUHJvZHVjdFRhYkJ5Q2F0ZWdvcnkiLCJsb2FkUHJvZHVjdEJ5Q2F0ZWdvcnlXaXRoQmFubmVyIiwiZmFuY3lib3hWaWRlb0Jhbm5lciIsImZhcXNUb2dnbGUiLCJyZWNlbnRCbG9nU2xpZGVyIiwiaG9tZVNwZWNpYWxQcm9kdWN0IiwiaG9tZVBhcmFsbGF4QmFubmVyIiwibG9hZE9wdGlvbkZvclByb2R1Y3RDYXJkIiwiY3VzdG9tZXJSZXZpZXdDYXJvdXNlbCIsImhvbWVQcm9kdWN0UmVjb21tZW5kZWQiLCJyZXZpZXdDYXJvdXNlbCIsInBhcmVudHMiLCJhZGRDbGFzcyIsImNvdW50RG93biIsImNvdW50RG93bkRhdGUiLCJEYXRlIiwiZ2V0VGltZSIsInNlZnQiLCJjb3VudGRvd25mdW5jdGlvbiIsInNldEludGVydmFsIiwibm93IiwiY2xlYXJJbnRlcnZhbCIsImh0bWwiLCJkYXlzIiwiZmxvb3IiLCJob3VycyIsIm1pbnV0ZXMiLCJzZWNvbmRzIiwic3RyQ291bnREb3duIiwiaGVyb0N1c3RvbSIsImhlcm9DdXN0b21TbGlkZSIsInNsaWNrIiwiZG90cyIsImFycm93cyIsIm1vYmlsZUZpcnN0Iiwic2xpZGVzVG9TaG93Iiwic2xpZGVzVG9TY3JvbGwiLCJhdXRvcGxheSIsImF1dG9wbGF5U3BlZWQiLCJpbmZpbml0ZSIsImFzTmF2Rm9yIiwic2xpZGUiLCJ0ZXh0Iiwib24iLCJldmVudCIsInNsaWRlciIsInBvcyIsIiRzbGlkZXMiLCJyZW1vdmVDbGFzcyIsIm9wdGlvbnMiLCJ0ZW1wbGF0ZSIsImhlYWRlcl9oZWlnaHQiLCJzY3JvbGwiLCJzZXRGbGFnIiwid3JhcCIsImNhdElkIiwiY2F0VXJsIiwiYmxvY2tJZCIsImxvYWRDYXRlZ29yeSIsImlkIiwidXJsIiwib3B0aW9uIiwidXRpbHMiLCJhcGkiLCJnZXRQYWdlIiwiZXJyIiwicmVzcG9uc2UiLCJzbGlja0Nhcm91c2VsIiwiaGFsb0FkZE9wdGlvbiIsIm5leHRBcnJvdyIsInByZXZBcnJvdyIsInJlc3BvbnNpdmUiLCJicmVha3BvaW50Iiwic2V0dGluZ3MiLCJwYXJzZUludCIsImhvbWVfcHJvZHVjdF9ibG9ja19jb2wiLCJBcnJheSIsImZyb20iLCJmb3JFYWNoIiwiJGl0ZW1FbGUiLCJibG9jayIsImluY2x1ZGVzIiwibG9jYXRpb24iLCJob3N0IiwicmVwbGFjZSIsInNob3ciLCJyZXZpZXdTaG93IiwibGltaXQiLCJxdWVyeVNlbGVjdG9yQWxsIiwicmV2aWV3MiIsIlByb21pc2UiLCJhbGwiLCJpdGVtMSIsIm5leHRFbGVtZW50U2libGluZyIsImVtcHR5IiwiaW5uZXJIVE1MIiwicmV2aWV3MyIsInZpZHUiLCJnb2t1IiwicmV2aWV3QXZnIiwicmVkdWNlIiwiY2F0Y2giLCJob21lX3Byb2R1Y3RfYmxvY2tfdGFiX2NvbCIsIiR0YWJTb3J0aW5nIiwiaGFzQ2xhc3MiLCJwcmV2ZW50RGVmYXVsdCIsIiR0YXJnZXQiLCJjdXJyZW50VGFyZ2V0IiwiZGF0YVRhYiIsIiR0aGlzQmxvY2siLCJjbG9zZXN0IiwiaHJlZiIsImxhYmVsRmxhc2hEZWFscyIsInNsaWNrQ2Fyb3VzZWw0Iiwic2xpY2tDYXJvdXNlbDMiLCJzbGlja0Nhcm91c2VsMiIsImhvbWVfcHJvZHVjdF9ibG9ja193aXRoX2Jhbm5lcl9jb2wiLCIkaXRlbVNpZGUiLCIkdGhpc0xhYmVsIiwiZmFuY3lib3giLCJub3QiLCJzbGlkZURvd24iLCJzbGlkZVVwIiwid2lkdGgiLCJyZXNpemUiLCJob21lX3Byb2R1Y3RfYmxvY2tfc3BlY2lhbCIsInZpZXdpbmdQcm9kdWN0Iiwidmlld2VyVGV4dCIsInByb2R1Y3Rfdmlld2luZ1Byb2R1Y3RfdGV4dCIsIm51bWJlcnNWaWV3ZXJfdGV4dCIsInByb2R1Y3Rfdmlld2luZ1Byb2R1Y3Rfdmlld2VyIiwibnVtYmVyc1ZpZXdlckxpc3QiLCJwYXJzZSIsIm51bWJlcnNWaWV3ZXJJdGVtIiwicmFuZG9tIiwiY291bnREb3duUHJvZHVjdCIsInNvbGRQcm9kdWN0IiwibnVtYmVyc1Byb2R1Y3RfdGV4dCIsInByb2R1Y3Rfc29sZFByb2R1Y3RfcHJvZHVjdHMiLCJudW1iZXJzSG91cnNfdGV4dCIsInByb2R1Y3Rfc29sZFByb2R1Y3RfaG91cnMiLCJzb2xkUHJvZHVjdFRleHQiLCJwcm9kdWN0X3NvbGRQcm9kdWN0X3RleHQiLCJzb2xkUHJvZHVjdFRleHQyIiwicHJvZHVjdF9zb2xkUHJvZHVjdF9ob3Vyc190ZXh0IiwibnVtYmVyc1Byb2R1Y3RMaXN0IiwibnVtYmVyc1Byb2R1Y3RJdGVtIiwibnVtYmVyc0hvdXJzTGlzdCIsIm51bWJlcnNIb3Vyc0l0ZW0iLCJpbml0VGh1bWJuYWlsc0hlaWdodCIsIiRzY29wZSIsImVsIiwiJGNhcm91c2VsX25hdiIsIiRjYXJvdXNlbF9mb3IiLCJwcm9kdWN0IiwiZ2V0QnlJZCIsInNjb3BlIiwiZ2V0Iiwic2V0UG9zaXRpb24iLCJoYWxvTm90aWZ5TWUiLCJoYWxvWW91dHViZUNhcm91c2VsIiwic2libGluZ3MiLCJzdG9wUHJvcGFnYXRpb24iLCJ0YXJnZXQiLCJwcm9kdWN0RGV0YWlscyIsIlByb2R1Y3REZXRhaWxzIiwic2V0UHJvZHVjdFZhcmlhbnQiLCJpbWFnZSIsImNzcyIsIiRwcm9kV3JhcElkIiwiYWRhcHRpdmVIZWlnaHQiLCJwcm9kdWN0SWRzIiwic3BsaXQiLCJza3VzIiwicmV2IiwiY29udGVudCIsImVxIiwiJGhvbWVQR0YiLCIkaG9tZVBHRl9ncmlkIiwiaG9tZVBHRl9pdGVtTGVuZ3RoIiwiJGhvbWVQR0ZfYnRuQmxvY2siLCIkaG9tZVBHRl9idG4iLCJkYXRhQ29sdW1uIiwidHRfcHJvZHVjdFNob3ciLCJmV2lkdGgiLCJpbm5lcldpZHRoIiwid1dpZHRoIiwiUGFnZU1hbmFnZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQStDO0FBQy9DLElBQU1BLEtBQUssR0FBR0MsbUJBQU8sQ0FBQyx3REFBWSxDQUFDO0FBRXBCLHlFQUFTQyxPQUFPLEVBQUVDLE9BQU8sRUFBRTtFQUN0QyxJQUFJRCxPQUFPLENBQUNFLGFBQWEsQ0FBQ0MsdUJBQXVCLElBQUksSUFBSSxFQUFFO0lBQUEsSUFNOUNDLGlCQUFpQixHQUExQixTQUFTQSxpQkFBaUIsR0FBRztNQUN6QkMsYUFBYSxDQUFDQyxJQUFJLENB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QTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNJO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTs7SUFFQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBOztJQUVBO0lBQ0E7SUFDQTtJQUNBOztJQUVBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBOztJQUVBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTs7SUFFQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTs7SUFFQTtJQUNBO0lBQ0E7O0lBRUE7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBOztJQUVBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBOztJQUVBO0lBQ0E7O0lBR0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTs7SUFFQTtJQUNBOztJQUdBeE0sQ0FBQyxDQUFD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aW1wb3J0IHV0aWxzIGZyb20gJ0BiaWdjb21tZXJjZS9zdGVuY2lsLXV0aWxzJztcbmNvbnN0IGZldGNoID0gcmVxdWlyZSgnbm9kZS1mZXRjaCcpO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihjb250ZXh0LCB3cmFwcGVyKSB7XG4gICAgaWYgKGNvbnRleHQudGhlbWVTZXR0aW5ncy5oYWxvQWRkT3B0aW9uRm9yUHJvZHVjdCA9PSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IHRva2VuID0gY29udGV4dC50b2tlbixcbiAgICAgICAgICAgIHByb2R1Y3Rfd3JhcHBlciA9ICQoJyMnK3dyYXBwZXIpLFxuICAgICAgICAgICAgcHJvZHVjdF9jbGFzcyA9IHByb2R1Y3Rfd3JhcHBlci5maW5kKCcuY2FyZCcpO1xuICAgICAgICB2YXIgIGxpc3QgPSBbXTtcblxuICAgICAgICBmdW5jdGlvbiBjYWxsUHJvZHVjdE9wdGlvbigpIHtcbiAgICAgICAgICAgIHByb2R1Y3RfY2xhc3MuZWFjaCgoaW5kZXgsIGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgcHJvZHVjdElkID0gJChlbGVtZW50KS5kYXRhKFwicHJvZHVjdC1pZFwiKTtcblxuICAgICAgICAgICAgICAgIGxpc3QucHVzaChwcm9kdWN0SWQudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYobGlzdC5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICAgICBnZXRQcm9kdWN0T3B0aW9uKGxpc3QpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlbmRlck9wdGlvbihkYXRhKTtcblxuICAgICAgICAgICAgICAgICAgICAkLmVhY2gobGlzdCwgKGlkeCwgaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFyciA9IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2R1Y3RJZCA9IGxpc3RbaWR4XTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvZHVjdF93cmFwcGVyLmZpbmQoJy5jYXJkLW9wdGlvbi0nK3Byb2R1Y3RJZCsnIC5mb3JtLW9wdGlvbi1zd2F0Y2gnKS5lYWNoKChpbmRleCwgZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0eHQgPSAkKGVsZW1lbnQpLmRhdGEoJ3Byb2R1Y3Qtc3dhdGNoLXZhbHVlJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXJyW3R4dF0pe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKGVsZW1lbnQpLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyclt0eHRdID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYocHJvZHVjdF93cmFwcGVyLmZpbmQoJy5jYXJkLW9wdGlvbi0nK3Byb2R1Y3RJZCsnIC5mb3JtLW9wdGlvbi1zd2F0Y2gnKS5sZW5ndGggPiA0KXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY291bnRNb3JlT3B0aW9uICA9IHByb2R1Y3Rfd3JhcHBlci5maW5kKCcuY2FyZC1vcHRpb24tJytwcm9kdWN0SWQrJyAuZm9ybS1vcHRpb24tc3dhdGNoJykubGVuZ3RoIC0gNCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvZHVjdExpbmsgPSBwcm9kdWN0X3dyYXBwZXIuZmluZCgnW2RhdGEtcHJvZHVjdC1pZD1cIicrcHJvZHVjdElkKydcIl0nKS5maW5kKCcuY2FyZC1saW5rJykuYXR0cignaHJlZicpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvZHVjdF93cmFwcGVyLmZpbmQoJy5jYXJkLW9wdGlvbi0nK3Byb2R1Y3RJZCsnIC5mb3JtLW9wdGlvbi1zd2F0Y2gnKS5lYWNoKChpbmRleCwgZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihpbmRleCA+PSA0KXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoZWxlbWVudCkucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHByb2R1Y3Rfd3JhcHBlci5maW5kKCcuY2FyZC1vcHRpb24tJytwcm9kdWN0SWQrJyAuZm9ybS1maWVsZCAuc2hvd21vcmUnKS5sZW5ndGggPCAxKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvZHVjdF93cmFwcGVyLmZpbmQoJy5jYXJkLW9wdGlvbi0nK3Byb2R1Y3RJZCsnIC5mb3JtLWZpZWxkOm5vdCguZm9ybS1maWVsZC0tc2l6ZSknKS5hcHBlbmQoJzxhIGhyZWY9XCInK3Byb2R1Y3RMaW5rKydcIiBjbGFzcz1cInNob3dtb3JlXCI+KycrY291bnRNb3JlT3B0aW9uKyc8L2E+Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gZ2V0UHJvZHVjdE9wdGlvbihsaXN0KXtcbiAgICAgICAgICAgIHJldHVybiBmZXRjaCgnL2dyYXBocWwnLCB7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzogJ0JlYXJlciAnICsgdG9rZW5cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICAgIHF1ZXJ5OiBgXG4gICAgICAgICAgICAgICAgICAgIHF1ZXJ5IFNldmVyYWxQcm9kdWN0c0J5SUQge1xuICAgICAgICAgICAgICAgICAgICAgIHNpdGUge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvZHVjdHMoZW50aXR5SWRzOiBbYCtsaXN0K2BdLCBmaXJzdDogNTApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZWRnZXMge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW50aXR5SWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9kdWN0T3B0aW9ucyhmaXJzdDogNTApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWRnZXMge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW50aXR5SWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc1JlcXVpcmVkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi4gb24gTXVsdGlwbGVDaG9pY2VPcHRpb24ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5U3R5bGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVzIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlZGdlcyB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW50aXR5SWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNEZWZhdWx0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLiBvbiBTd2F0Y2hPcHRpb25WYWx1ZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGV4Q29sb3JzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1hZ2VVcmwod2lkdGg6IDUwKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBgfSksXG4gICAgICAgICAgICB9KS50aGVuKHJlcyA9PiByZXMuanNvbigpKS50aGVuKHJlcyA9PiByZXMuZGF0YSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiByZW5kZXJPcHRpb24oZGF0YSl7XG4gICAgICAgICAgICB2YXIgYUZpbHRlciA9IGRhdGEuc2l0ZS5wcm9kdWN0cy5lZGdlcztcblxuICAgICAgICAgICAgJC5lYWNoKGFGaWx0ZXIsIChpbmRleCwgZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgICAgIHZhciBwcm9kdWN0SWQgPSBhRmlsdGVyW2luZGV4XS5ub2RlLmVudGl0eUlkLFxuICAgICAgICAgICAgICAgICAgICBwcm9kdWN0RmllbGRDb2xvciA9IHByb2R1Y3Rfd3JhcHBlci5maW5kKCcuY2FyZC1vcHRpb24tJytwcm9kdWN0SWQrJyAuZm9ybS1maWVsZDpub3QoLmZvcm0tZmllbGQtLXNpemUpJyksXG4gICAgICAgICAgICAgICAgICAgIHByb2R1Y3RGaWVsZFNpemUgPSBwcm9kdWN0X3dyYXBwZXIuZmluZCgnLmNhcmQtb3B0aW9uLScrcHJvZHVjdElkKycgLmZvcm0tZmllbGQtLXNpemUnKSxcbiAgICAgICAgICAgICAgICAgICAgYUZpbHRlcjIgPSBhRmlsdGVyW2luZGV4XS5ub2RlLnByb2R1Y3RPcHRpb25zLmVkZ2VzO1xuXG4gICAgICAgICAgICAgICAgdmFyIGFGaWx0ZXIzID0gYUZpbHRlcjIuZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLm5vZGUuZGlzcGxheVN0eWxlID09PSAnU3dhdGNoJztcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHZhciBhRmlsdGVyNSA9IGFGaWx0ZXIyLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS5ub2RlLmRpc3BsYXlOYW1lID09PSBjb250ZXh0LnRoZW1lU2V0dGluZ3MuaGFsb0FkZE9wdGlvbkZvclByb2R1Y3QyO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgaWYoYUZpbHRlcjMubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAgICAgICAgIHZhciBhRmlsdGVyNCA9IGFGaWx0ZXIzWzBdLm5vZGUudmFsdWVzLmVkZ2VzO1xuXG4gICAgICAgICAgICAgICAgICAgICQuZWFjaChhRmlsdGVyNCwgKGlkeCwgZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRpdGxlVmFyID0gYUZpbHRlcjRbaWR4XS5ub2RlLmxhYmVsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkVmFyID0gYUZpbHRlcjRbaWR4XS5ub2RlLmVudGl0eUlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlbmd0aENvbG9yVmFyID0gYUZpbHRlcjRbaWR4XS5ub2RlLmhleENvbG9ycy5sZW5ndGgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3IxID0gYUZpbHRlcjRbaWR4XS5ub2RlLmhleENvbG9yc1swXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjIgPSBhRmlsdGVyNFtpZHhdLm5vZGUuaGV4Q29sb3JzWzFdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yMyA9IGFGaWx0ZXI0W2lkeF0ubm9kZS5oZXhDb2xvcnNbMl0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1nID0gYUZpbHRlcjRbaWR4XS5ub2RlLmltYWdlVXJsO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihsZW5ndGhDb2xvclZhciA9PSAyKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9kdWN0RmllbGRDb2xvci5hcHBlbmQoJzxsYWJlbCBjbGFzcz1cImZvcm0tb3B0aW9uIGZvcm0tb3B0aW9uLXN3YXRjaFwiIGRhdGEtcHJvZHVjdC1zd2F0Y2gtdmFsdWU9XCInK2lkVmFyKydcIj48c3BhbiBjbGFzcz1cImZvcm0tb3B0aW9uLXRvb2x0aXBcIj4nK3RpdGxlVmFyKyc8L3NwYW4+PHNwYW4gY2xhc3M9XCJmb3JtLW9wdGlvbi12YXJpYW50IGZvcm0tb3B0aW9uLXZhcmlhbnQtLWNvbG9yIGZvcm0tb3B0aW9uLXZhcmlhbnQtLWNvbG9yMlwiIHRpdGxlPVwiJyt0aXRsZVZhcisnXCI+PHNwYW4gc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOicrY29sb3IxKydcIj48L3NwYW4+PHNwYW4gc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOicrY29sb3IyKydcIj48L3NwYW4+PC9zcGFuPjwvbGFiZWw+Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYobGVuZ3RoQ29sb3JWYXIgPT09IDMpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2R1Y3RGaWVsZENvbG9yLmFwcGVuZCgnPGxhYmVsIGNsYXNzPVwiZm9ybS1vcHRpb24gZm9ybS1vcHRpb24tc3dhdGNoXCIgZGF0YS1wcm9kdWN0LXN3YXRjaC12YWx1ZT1cIicraWRWYXIrJ1wiPjxzcGFuIGNsYXNzPVwiZm9ybS1vcHRpb24tdG9vbHRpcFwiPicrdGl0bGVWYXIrJzwvc3Bhbj48c3BhbiBjbGFzcz1cImZvcm0tb3B0aW9uLXZhcmlhbnQgZm9ybS1vcHRpb24tdmFyaWFudC0tY29sb3IgZm9ybS1vcHRpb24tdmFyaWFudC0tY29sb3IyXCIgdGl0bGU9XCInK3RpdGxlVmFyKydcIj48c3BhbiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6Jytjb2xvcjErJ1wiPjwvc3Bhbj48c3BhbiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6Jytjb2xvcjIrJ1wiPjwvc3Bhbj48c3BhbiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6Jytjb2xvcjMrJ1wiPjwvc3Bhbj48L3NwYW4+PC9sYWJlbD4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZihCb29sZWFuKGNvbG9yMSkpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2R1Y3RGaWVsZENvbG9yLmFwcGVuZCgnPGxhYmVsIGNsYXNzPVwiZm9ybS1vcHRpb24gZm9ybS1vcHRpb24tc3dhdGNoXCIgZGF0YS1wcm9kdWN0LXN3YXRjaC12YWx1ZT1cIicraWRWYXIrJ1wiPjxzcGFuIGNsYXNzPVwiZm9ybS1vcHRpb24tdG9vbHRpcFwiPicrdGl0bGVWYXIrJzwvc3Bhbj48c3BhbiBjbGFzcz1cImZvcm0tb3B0aW9uLXZhcmlhbnQgZm9ybS1vcHRpb24tdmFyaWFudC0tY29sb3JcIiB0aXRsZT1cIicrdGl0bGVWYXIrJ1wiIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjogJytjb2xvcjErJ1wiPjwvc3Bhbj48L2xhYmVsPicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmKEJvb2xlYW4oaW1nKSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvZHVjdEZpZWxkQ29sb3IuYXBwZW5kKCc8bGFiZWwgY2xhc3M9XCJmb3JtLW9wdGlvbiBmb3JtLW9wdGlvbi1zd2F0Y2hcIiBkYXRhLXByb2R1Y3Qtc3dhdGNoLXZhbHVlPVwiJytpZFZhcisnXCI+PHNwYW4gY2xhc3M9XCJmb3JtLW9wdGlvbi10b29sdGlwXCI+Jyt0aXRsZVZhcisnPC9zcGFuPjxzcGFuIGNsYXNzPVwiZm9ybS1vcHRpb24tdmFyaWFudCBmb3JtLW9wdGlvbi12YXJpYW50LS1wYXR0ZXJuXCIgdGl0bGU9XCInK3RpdGxlVmFyKydcIiBzdHlsZT1cImJhY2tncm91bmQtaW1hZ2U6IHVybCgnK2ltZysnKVwiPjwvc3Bhbj48L2xhYmVsPicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHByb2R1Y3RGaWVsZENvbG9yLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmKGFGaWx0ZXI1Lmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgICAgICBpZihwcm9kdWN0RmllbGRTaXplLmxlbmd0aCA8IDEpe1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvZHVjdF93cmFwcGVyLmZpbmQoJy5jYXJkLW9wdGlvbi0nK3Byb2R1Y3RJZCsnJykuYXBwZW5kKCc8ZGl2IGNsYXNzPVwiZm9ybS1maWVsZCBmb3JtLWZpZWxkLS1zaXplXCI+PGxhYmVsIGNsYXNzPVwiZm9ybS1vcHRpb25cIj4nK2NvbnRleHQudGhlbWVTZXR0aW5ncy5oYWxvQWRkT3B0aW9uRm9yUHJvZHVjdFRleHQudG9TdHJpbmcoKSsnPC9sYWJlbD48L2Rpdj4nKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmKChhRmlsdGVyNS5sZW5ndGggPT0gMCkgJiYgKGFGaWx0ZXIzLmxlbmd0aCA9PSAwKSl7XG4gICAgICAgICAgICAgICAgICAgIHByb2R1Y3Rfd3JhcHBlci5maW5kKCcuY2FyZC1vcHRpb24tJytwcm9kdWN0SWQrJycpLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgY2FsbFByb2R1Y3RPcHRpb24oKTtcbiAgICB9XG59XG4iLCIkKGZ1bmN0aW9uKCl7UGFyYWxsYXhTY3JvbGwuaW5pdCgpfSk7dmFyIFBhcmFsbGF4U2Nyb2xsPXtzaG93TG9nczohMSxyb3VuZDoxZTMsaW5pdDpmdW5jdGlvbigpe3JldHVybiB0aGlzLl9sb2coXCJpbml0XCIpLHRoaXMuX2luaXRlZD8odGhpcy5fbG9nKFwiQWxyZWFkeSBJbml0ZWRcIiksdm9pZCh0aGlzLl9pbml0ZWQ9ITApKToodGhpcy5fcmVxdWVzdEFuaW1hdGlvbkZyYW1lPWZ1bmN0aW9uKCl7cmV0dXJuIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWV8fHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWV8fHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWV8fHdpbmRvdy5vUmVxdWVzdEFuaW1hdGlvbkZyYW1lfHx3aW5kb3cubXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWV8fGZ1bmN0aW9uKGEsYil7d2luZG93LnNldFRpbWVvdXQoYSwxZTMvNjApfX0oKSx2b2lkIHRoaXMuX29uU2Nyb2xsKCEwKSl9LF9pbml0ZWQ6ITEsX3Byb3BlcnRpZXM6W1wieFwiLFwieVwiLFwielwiLFwicm90YXRlWFwiLFwicm90YXRlWVwiLFwicm90YXRlWlwiLFwic2NhbGVYXCIsXCJzY2FsZVlcIixcInNjYWxlWlwiLFwic2NhbGVcIl0sX3JlcXVlc3RBbmltYXRpb25GcmFtZTpudWxsLF9sb2c6ZnVuY3Rpb24oYSl7dGhpcy5zaG93TG9ncyYmY29uc29sZS5sb2coXCJQYXJhbGxheCBTY3JvbGwgLyBcIithKX0sX29uU2Nyb2xsOmZ1bmN0aW9uKGEpe3ZhciBiPSQoZG9jdW1lbnQpLnNjcm9sbFRvcCgpLGM9JCh3aW5kb3cpLmhlaWdodCgpO3RoaXMuX2xvZyhcIm9uU2Nyb2xsIFwiK2IpLCQoXCJbZGF0YS1wYXJhbGxheF1cIikuZWFjaCgkLnByb3h5KGZ1bmN0aW9uKGQsZSl7dmFyIGY9JChlKSxnPVtdLGg9ITEsaT1mLmRhdGEoXCJzdHlsZVwiKTt2b2lkIDA9PWkmJihpPWYuYXR0cihcInN0eWxlXCIpfHxcIlwiLGYuZGF0YShcInN0eWxlXCIsaSkpO3ZhciBrLGo9W2YuZGF0YShcInBhcmFsbGF4XCIpXTtmb3Ioaz0yO2YuZGF0YShcInBhcmFsbGF4XCIrayk7aysrKWoucHVzaChmLmRhdGEoXCJwYXJhbGxheC1cIitrKSk7dmFyIGw9ai5sZW5ndGg7Zm9yKGs9MDtrPGw7aysrKXt2YXIgbT1qW2tdLG49bVtcImZyb20tc2Nyb2xsXCJdO3ZvaWQgMD09biYmKG49TWF0aC5tYXgoMCwkKGUpLm9mZnNldCgpLnRvcC1jKSksbj0wfG47dmFyIG89bS5kaXN0YW5jZSxwPW1bXCJ0by1zY3JvbGxcIl07dm9pZCAwPT1vJiZ2b2lkIDA9PXAmJihvPWMpLG89TWF0aC5tYXgoMHxvLDEpO3ZhciBxPW0uZWFzaW5nLHI9bVtcImVhc2luZy1yZXR1cm5cIl07aWYodm9pZCAwIT1xJiYkLmVhc2luZyYmJC5lYXNpbmdbcV18fChxPW51bGwpLHZvaWQgMCE9ciYmJC5lYXNpbmcmJiQuZWFzaW5nW3JdfHwocj1xKSxxKXt2YXIgcz1tLmR1cmF0aW9uO3ZvaWQgMD09cyYmKHM9bykscz1NYXRoLm1heCgwfHMsMSk7dmFyIHQ9bVtcImR1cmF0aW9uLXJldHVyblwiXTt2b2lkIDA9PXQmJih0PXMpLG89MTt2YXIgdT1mLmRhdGEoXCJjdXJyZW50LXRpbWVcIik7dm9pZCAwPT11JiYodT0wKX12b2lkIDA9PXAmJihwPW4rbykscD0wfHA7dmFyIHY9bS5zbW9vdGhuZXNzO3ZvaWQgMD09diYmKHY9MzApLHY9MHx2LChhfHwwPT12KSYmKHY9MSksdj0wfHY7dmFyIHc9Yjt3PU1hdGgubWF4KHcsbiksdz1NYXRoLm1pbih3LHApLHEmJih2b2lkIDA9PWYuZGF0YShcInNlbnNcIikmJmYuZGF0YShcInNlbnNcIixcImJhY2tcIiksdz5uJiYoXCJiYWNrXCI9PWYuZGF0YShcInNlbnNcIik/KHU9MSxmLmRhdGEoXCJzZW5zXCIsXCJnb1wiKSk6dSsrKSx3PHAmJihcImdvXCI9PWYuZGF0YShcInNlbnNcIik/KHU9MSxmLmRhdGEoXCJzZW5zXCIsXCJiYWNrXCIpKTp1KyspLGEmJih1PXMpLGYuZGF0YShcImN1cnJlbnQtdGltZVwiLHUpKSx0aGlzLl9wcm9wZXJ0aWVzLm1hcCgkLnByb3h5KGZ1bmN0aW9uKGEpe3ZhciBiPTAsYz1tW2FdO2lmKHZvaWQgMCE9Yyl7XCJzY2FsZVwiPT1hfHxcInNjYWxlWFwiPT1hfHxcInNjYWxlWVwiPT1hfHxcInNjYWxlWlwiPT1hP2I9MTpjPTB8Yzt2YXIgZD1mLmRhdGEoXCJfXCIrYSk7dm9pZCAwPT1kJiYoZD1iKTt2YXIgZT0oYy1iKSooKHctbikvKHAtbikpK2IsaT1kKyhlLWQpL3Y7aWYocSYmdT4wJiZ1PD1zKXt2YXIgaj1iO1wiYmFja1wiPT1mLmRhdGEoXCJzZW5zXCIpJiYoaj1jLGM9LWMscT1yLHM9dCksaT0kLmVhc2luZ1txXShudWxsLHUsaixjLHMpfWk9TWF0aC5jZWlsKGkqdGhpcy5yb3VuZCkvdGhpcy5yb3VuZCxpPT1kJiZlPT1jJiYoaT1jKSxnW2FdfHwoZ1thXT0wKSxnW2FdKz1pLGQhPWdbYV0mJihmLmRhdGEoXCJfXCIrYSxnW2FdKSxoPSEwKX19LHRoaXMpKX1pZihoKXtpZih2b2lkIDAhPWcueil7dmFyIHg9bS5wZXJzcGVjdGl2ZTt2b2lkIDA9PXgmJih4PTgwMCk7dmFyIHk9Zi5wYXJlbnQoKTt5LmRhdGEoXCJzdHlsZVwiKXx8eS5kYXRhKFwic3R5bGVcIix5LmF0dHIoXCJzdHlsZVwiKXx8XCJcIikseS5hdHRyKFwic3R5bGVcIixcInBlcnNwZWN0aXZlOlwiK3grXCJweDsgLXdlYmtpdC1wZXJzcGVjdGl2ZTpcIit4K1wicHg7IFwiK3kuZGF0YShcInN0eWxlXCIpKX12b2lkIDA9PWcuc2NhbGVYJiYoZy5zY2FsZVg9MSksdm9pZCAwPT1nLnNjYWxlWSYmKGcuc2NhbGVZPTEpLHZvaWQgMD09Zy5zY2FsZVomJihnLnNjYWxlWj0xKSx2b2lkIDAhPWcuc2NhbGUmJihnLnNjYWxlWCo9Zy5zY2FsZSxnLnNjYWxlWSo9Zy5zY2FsZSxnLnNjYWxlWio9Zy5zY2FsZSk7dmFyIHo9XCJ0cmFuc2xhdGUzZChcIisoZy54P2cueDowKStcInB4LCBcIisoZy55P2cueTowKStcInB4LCBcIisoZy56P2cuejowKStcInB4KVwiLEE9XCJyb3RhdGVYKFwiKyhnLnJvdGF0ZVg/Zy5yb3RhdGVYOjApK1wiZGVnKSByb3RhdGVZKFwiKyhnLnJvdGF0ZVk/Zy5yb3RhdGVZOjApK1wiZGVnKSByb3RhdGVaKFwiKyhnLnJvdGF0ZVo/Zy5yb3RhdGVaOjApK1wiZGVnKVwiLEI9XCJzY2FsZVgoXCIrZy5zY2FsZVgrXCIpIHNjYWxlWShcIitnLnNjYWxlWStcIikgc2NhbGVaKFwiK2cuc2NhbGVaK1wiKVwiLEM9eitcIiBcIitBK1wiIFwiK0IrXCI7XCI7dGhpcy5fbG9nKEMpLGYuYXR0cihcInN0eWxlXCIsXCJ0cmFuc2Zvcm06XCIrQytcIiAtd2Via2l0LXRyYW5zZm9ybTpcIitDK1wiIFwiK2kpfX0sdGhpcykpLHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWU/d2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgkLnByb3h5KHRoaXMuX29uU2Nyb2xsLHRoaXMsITEpKTp0aGlzLl9yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoJC5wcm94eSh0aGlzLl9vblNjcm9sbCx0aGlzLCExKSl9fTtcbiIsImltcG9ydCAnZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uL2ZvdW5kYXRpb24nO1xyXG5pbXBvcnQgJ2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi9mb3VuZGF0aW9uLmRyb3Bkb3duJztcclxuaW1wb3J0IGZhbmN5Ym94IGZyb20gJy4vaGFsb3RoZW1lcy9qcXVlcnkuZmFuY3lib3gubWluJztcclxuaW1wb3J0IFBhZ2VNYW5hZ2VyIGZyb20gJy4vcGFnZS1tYW5hZ2VyJztcclxuaW1wb3J0IHV0aWxzIGZyb20gJ0BiaWdjb21tZXJjZS9zdGVuY2lsLXV0aWxzJztcclxuaW1wb3J0IGhhbG9BZGRPcHRpb24gZnJvbSAnLi9oYWxvdGhlbWVzL2hhbG9BZGRPcHRpb25Gb3JQcm9kdWN0Q2FyZCc7XHJcbmltcG9ydCBwYXJhbGxheCBmcm9tICcuL2hhbG90aGVtZXMvcGFyYWxsYXgvanF1ZXJ5LnBhcmFsbGF4LXNjcm9sbC5taW4nO1xyXG5pbXBvcnQgUHJvZHVjdERldGFpbHMgZnJvbSAnLi9jb21tb24vcHJvZHVjdC1kZXRhaWxzJztcclxuaW1wb3J0IHsgZGVmYXVsdE1vZGFsLCBtb2RhbFR5cGVzIH0gZnJvbSAnLi9nbG9iYWwvbW9kYWwnO1xyXG5pbXBvcnQgaGFsb1lvdXR1YmVDYXJvdXNlbCBmcm9tICcuL2hhbG90aGVtZXMvaGFsb1ZpZGVvJztcclxuaW1wb3J0IGhhbG9Ob3RpZnlNZSBmcm9tICcuL2hhbG90aGVtZXMvaGFsb05vdGlmeU1lJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhvbWUgZXh0ZW5kcyBQYWdlTWFuYWdlciB7XHJcbiAgICBjb25zdHJ1Y3Rvcihjb250ZXh0KSB7XHJcbiAgICAgICAgc3VwZXIoY29udGV4dCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25SZWFkeSgpIHtcclxuICAgICAgICB0aGlzLmNvdW50RG93bkhlcm9DYXJvdXNlbCgpO1xyXG4gICAgICAgIHRoaXMuY3VzdG9tUGFnaW5nKCk7XHJcbiAgICAgICAgdGhpcy5sb2FkUHJvZHVjdEJ5Q2F0ZWdvcnkoKTtcclxuICAgICAgICB0aGlzLmxvYWRQcm9kdWN0VGFiQnlDYXRlZ29yeSgpO1xyXG4gICAgICAgIHRoaXMubG9hZFByb2R1Y3RCeUNhdGVnb3J5V2l0aEJhbm5lcigpO1xyXG4gICAgICAgIHRoaXMuZmFuY3lib3hWaWRlb0Jhbm5lcigpO1xyXG4gICAgICAgIHRoaXMuZmFxc1RvZ2dsZSgpO1xyXG4gICAgICAgIHRoaXMucmVjZW50QmxvZ1NsaWRlcigpO1xyXG4gICAgICAgIHRoaXMuaG9tZVNwZWNpYWxQcm9kdWN0KCk7XHJcbiAgICAgICAgdGhpcy5ob21lUGFyYWxsYXhCYW5uZXIoKTtcclxuICAgICAgICB0aGlzLmxvYWRPcHRpb25Gb3JQcm9kdWN0Q2FyZCgpO1xyXG4gICAgICAgIHRoaXMuY3VzdG9tZXJSZXZpZXdDYXJvdXNlbCgpO1xyXG4gICAgICAgIHRoaXMuaG9tZVByb2R1Y3RSZWNvbW1lbmRlZCgpO1xyXG4gICAgICAgIHRoaXMucmV2aWV3Q2Fyb3VzZWwoKVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBjb3VudERvd25IZXJvQ2Fyb3VzZWwoKSB7XHJcbiAgICAgICAgJCgnLmhlcm9DYXJvdXNlbC1jb3VudGRvd24nKS5lYWNoKChpbmRleCwgZWxlbWVudCkgPT4ge1xyXG4gICAgICAgICAgICAkKGVsZW1lbnQpLnBhcmVudHMoJy5zbGljay1zbGlkZScpLmFkZENsYXNzKCdoYXMtY291bnQtZG93bicpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGNvdW50RG93biA9ICQoZWxlbWVudCkuZGF0YSgnY2Fyb3VzZWwtY291bnRkb3duJyksXHJcbiAgICAgICAgICAgICAgICBjb3VudERvd25EYXRlID0gbmV3IERhdGUoY291bnREb3duKS5nZXRUaW1lKCksXHJcbiAgICAgICAgICAgICAgICBzZWZ0ID0gJChlbGVtZW50KTtcclxuXHJcbiAgICAgICAgICAgIHZhciBjb3VudGRvd25mdW5jdGlvbiA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIG5vdyA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpLFxyXG4gICAgICAgICAgICAgICAgZGlzdGFuY2UgPSBjb3VudERvd25EYXRlIC0gbm93O1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChkaXN0YW5jZSA8IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGNvdW50ZG93bmZ1bmN0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICBzZWZ0Lmh0bWwoJycpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZGF5cyA9IE1hdGguZmxvb3IoZGlzdGFuY2UgLyAoMTAwMCAqIDYwICogNjAgKiAyNCkpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBob3VycyA9IE1hdGguZmxvb3IoKGRpc3RhbmNlICUgKDEwMDAgKiA2MCAqIDYwICogMjQpKSAvICgxMDAwICogNjAgKiA2MCkpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtaW51dGVzID0gTWF0aC5mbG9vcigoZGlzdGFuY2UgJSAoMTAwMCAqIDYwICogNjApKSAvICgxMDAwICogNjApKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2Vjb25kcyA9IE1hdGguZmxvb3IoKGRpc3RhbmNlICUgKDEwMDAgKiA2MCkpIC8gMTAwMCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdHJDb3VudERvd24gPSBcIjxzcGFuIGNsYXNzPSdudW0nPlwiK2RheXMrXCI8c3Bhbj5EQVlTPC9zcGFuPjwvc3Bhbj48c3BhbiBjbGFzcz0nbnVtJz5cIitob3VycytcIjxzcGFuPkhPVVJTPC9zcGFuPjwvc3Bhbj48c3BhbiBjbGFzcz0nbnVtJz5cIittaW51dGVzK1wiPHNwYW4+TUlOUzwvc3Bhbj48L3NwYW4+PHNwYW4gY2xhc3M9J251bSc+XCIrc2Vjb25kcytcIjxzcGFuPlNFQ1M8L3NwYW4+PC9zcGFuPlwiO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzZWZ0Lmh0bWwoc3RyQ291bnREb3duKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY3VzdG9tUGFnaW5nKCl7XHJcbiAgICAgICAgY29uc3QgaGVyb0N1c3RvbSA9ICQoJy5oZXJvQ2Fyb3VzZWwtY3VzdG9tJyk7XHJcbiAgICAgICAgY29uc3QgaGVyb0N1c3RvbVNsaWRlID0gJCgnLmhlcm9DYXJvdXNlbC1jdXN0b20gLnNsaWNrLWRvdHMgbGknKTtcclxuICAgICAgICBoZXJvQ3VzdG9tLnNsaWNrKHtcclxuICAgICAgICAgICAgZG90czogdHJ1ZSxcclxuICAgICAgICAgICAgYXJyb3dzOiBmYWxzZSxcclxuICAgICAgICAgICAgbW9iaWxlRmlyc3Q6IHRydWUsXHJcbiAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcclxuICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcbiAgICAgICAgICAgIGF1dG9wbGF5OiBmYWxzZSxcclxuICAgICAgICAgICAgYXV0b3BsYXlTcGVlZDogaGVyb0N1c3RvbS5kYXRhKCdhdXRvcGxheScpLFxyXG4gICAgICAgICAgICBpbmZpbml0ZTogdHJ1ZSxcclxuICAgICAgICAgICAgYXNOYXZGb3I6IFwiLmhlcm9DYXJvdXNlbFwiXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy9BREFcclxuICAgICAgICAkKCcuaGVyb0Nhcm91c2VsLWN1c3RvbSAuc2xpY2stZG90cyBsaScpLmVhY2goZnVuY3Rpb24oaSl7XHJcbiAgICAgICAgICAgIHZhciBzbGlkZSA9ICQodGhpcykuZmluZCgnYnV0dG9uJykudGV4dCgpO1xyXG4gICAgICAgICAgICAkKHRoaXMpLmZpbmQoJ2J1dHRvbicpLnRleHQoJzAnICsgc2xpZGUpLmFkZENsYXNzKCdzbGljay1kb3RzLWl0ZW0nKTtcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBoZXJvQ3VzdG9tLm9uKCdhZnRlckNoYW5nZScsIChldmVudCwgc2xpZGVyLCBpKSA9PiB7XHJcbiAgICAgICAgICAgIHZhciBwb3MgPSAkKHNsaWRlci4kc2xpZGVzW2ldKS5maW5kKCdkaXZbZGF0YS1wb3NpdGlvbl0nKS5kYXRhKCdwb3NpdGlvbicpO1xyXG5cclxuICAgICAgICAgICAgaWYocG9zID09PSAncmlnaHQnKXtcclxuICAgICAgICAgICAgICAgIGhlcm9DdXN0b20ucmVtb3ZlQ2xhc3MoJ2hlcm9DYXJvdXNlbC1jdXN0b21MZWZ0JykuYWRkQ2xhc3MoJ2hlcm9DYXJvdXNlbC1jdXN0b21SaWdodCcpO1xyXG4gICAgICAgICAgICB9IGVsc2V7XHJcbiAgICAgICAgICAgICAgICBoZXJvQ3VzdG9tLnJlbW92ZUNsYXNzKCdoZXJvQ2Fyb3VzZWwtY3VzdG9tUmlnaHQnKS5hZGRDbGFzcygnaGVyb0Nhcm91c2VsLWN1c3RvbUxlZnQnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICgkKCcuaGVyb0Nhcm91c2VsLXNsaWRlLS1maXJzdCAuaGVyb0Nhcm91c2VsLWNvbnRlbnQtd3JhcHBlciAuaGVyb0Nhcm91c2VsLWNvbnRlbnQtLXJpZ2h0JykubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGhlcm9DdXN0b20ucmVtb3ZlQ2xhc3MoJ2hlcm9DYXJvdXNlbC1jdXN0b21MZWZ0JykuYWRkQ2xhc3MoJ2hlcm9DYXJvdXNlbC1jdXN0b21SaWdodCcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBsb2FkUHJvZHVjdEJ5Q2F0ZWdvcnkoKXtcclxuICAgICAgICBjb25zdCBjb250ZXh0ID0gdGhpcy5jb250ZXh0O1xyXG5cclxuICAgICAgICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJ3Byb2R1Y3RzL2Nhcm91c2VsLTInXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgaWYoJCgnLmhhbG8tYmxvY2tbZGF0YS1jYXRlZ29yeS1pZF0nKS5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgdmFyICBoZWFkZXJfaGVpZ2h0ID0gJCgnLmhlYWRlcicpLmhlaWdodCgpO1xyXG5cclxuICAgICAgICAgICAgJCh3aW5kb3cpLm9uKCdzY3JvbGwgbG9hZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHNjcm9sbCA9ICQod2luZG93KS5zY3JvbGxUb3AoKSxcclxuICAgICAgICAgICAgICAgICAgICBzZXRGbGFnID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHNjcm9sbCA+IGhlYWRlcl9oZWlnaHQpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXRGbGFnID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZihzZXRGbGFnKXtcclxuICAgICAgICAgICAgICAgICAgICAkKCcuaGFsby1ibG9ja1tkYXRhLWNhdGVnb3J5LWlkXScpLmVhY2goKGluZGV4LCBlbGVtZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB3cmFwID0gJChlbGVtZW50KS5maW5kKCcucHJvZHVjdENhcm91c2VsJyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXRJZCA9ICQoZWxlbWVudCkuZGF0YSgnZGF0YS1jYXRlZ29yeScpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2F0VXJsID0gJChlbGVtZW50KS5kYXRhKCdjYXRlZ29yeS11cmwnKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJsb2NrSWQgPSAkKGVsZW1lbnQpLmF0dHIoJ2lkJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZighJCgnI3Byb2R1Y3QtYnktY2F0ZS0nK2NhdElkKycgLnByb2R1Y3RDYXJvdXNlbCAucHJvZHVjdENhcm91c2VsLXNsaWRlJykubGVuZ3RoKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRDYXRlZ29yeShjYXRJZCwgY2F0VXJsLCBvcHRpb25zLCB3cmFwLCBibG9ja0lkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzZXRGbGFnID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gbG9hZENhdGVnb3J5KGlkLCB1cmwsIG9wdGlvbiwgd3JhcCwgYmxvY2tJZCl7XHJcbiAgICAgICAgICAgIHV0aWxzLmFwaS5nZXRQYWdlKHVybCwgb3B0aW9uLCAoZXJyLCByZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYoIXdyYXAuZmluZCgnLnByb2R1Y3RDYXJvdXNlbC1zbGlkZScpLmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICAgICAgd3JhcC5odG1sKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgICAgICAgICBzbGlja0Nhcm91c2VsKHdyYXApO1xyXG4gICAgICAgICAgICAgICAgICAgIHdyYXAucGFyZW50cygnLmhhbG8tYmxvY2tbZGF0YS1jYXRlZ29yeS1pZF0nKS5maW5kKCcubG9hZGluZ092ZXJsYXknKS5yZW1vdmUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaGFsb0FkZE9wdGlvbihjb250ZXh0LCBibG9ja0lkKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7IFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gc2xpY2tDYXJvdXNlbCh3cmFwKXtcclxuICAgICAgICAgICAgd3JhcC5zbGljayh7XHJcbiAgICAgICAgICAgICAgICBkb3RzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgYXJyb3dzOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGluZmluaXRlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIG1vYmlsZUZpcnN0OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAyLFxyXG4gICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcbiAgICAgICAgICAgICAgICBuZXh0QXJyb3c6IFwiPHN2ZyBjbGFzcz0nc2xpY2stbmV4dCBzbGljay1hcnJvdyBzbGljay1hcnJvdy1sYXJnZScgYXJpYS1sYWJlbD0nTmV4dCBTbGlkZSc+PHVzZSB4bGluazpocmVmPSNzbGljay1hcnJvdy1uZXh0PjwvdXNlPjwvc3ZnPlwiLCBcclxuICAgICAgICAgICAgICAgIHByZXZBcnJvdzogXCI8c3ZnIGNsYXNzPSdzbGljay1wcmV2IHNsaWNrLWFycm93IHNsaWNrLWFycm93LWxhcmdlJyBhcmlhLWxhYmVsPSdQcmV2aW91cyBTbGlkZSc+PHVzZSB4bGluazpocmVmPSNzbGljay1hcnJvdy1wcmV2PjwvdXNlPjwvc3ZnPlwiLFxyXG4gICAgICAgICAgICAgICAgcmVzcG9uc2l2ZTogW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDEwMjQsXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IHBhcnNlSW50KGNvbnRleHQudGhlbWVTZXR0aW5ncy5ob21lX3Byb2R1Y3RfYmxvY2tfY29sKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogOTkxLFxyXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogcGFyc2VJbnQoY29udGV4dC50aGVtZVNldHRpbmdzLmhvbWVfcHJvZHVjdF9ibG9ja19jb2wpIC0gMVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNzY3LFxyXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogcGFyc2VJbnQoY29udGV4dC50aGVtZVNldHRpbmdzLmhvbWVfcHJvZHVjdF9ibG9ja19jb2wpIC0gMlxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBsb2FkUHJvZHVjdFRhYkJ5Q2F0ZWdvcnkoKXtcclxuICAgICAgICBjb25zdCBjb250ZXh0ID0gdGhpcy5jb250ZXh0O1xyXG5cclxuICAgICAgICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJ3Byb2R1Y3RzL2Nhcm91c2VsLTMnXHJcbiAgICAgICAgfTtcclxuICAgICAgICBpZigkKCcucHJvZHVjdENhcm91c2VsLXRhYnMnKS5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgaWYoISQoJy5wcm9kdWN0Q2Fyb3VzZWwtdGFicyAudGFiLWNvbnRlbnQuaXMtYWN0aXZlIC5wcm9kdWN0Q2Fyb3VzZWwgLnByb2R1Y3RDYXJvdXNlbC1zbGlkZScpLmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICBBcnJheS5mcm9tKCQoJy50YWItY29udGVudC5pcy1hY3RpdmUnKSkuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCAkaXRlbUVsZSA9ICQoaXRlbSlcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYmxvY2sgPSAkaXRlbUVsZSxcclxuICAgICAgICAgICAgICAgICAgICB3cmFwID0gYmxvY2suZmluZCgnLnByb2R1Y3RDYXJvdXNlbCcpLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhdElkID0gYmxvY2suZGF0YSgndGFiLWNhdGVnb3J5LWlkJyksXHJcbiAgICAgICAgICAgICAgICAgICAgY2F0VXJsID0gYmxvY2suZGF0YSgndGFiLWNhdGVnb3J5LXVybCcpLFxyXG4gICAgICAgICAgICAgICAgICAgIGJsb2NrSWQgPSBibG9jay5hdHRyKCdpZCcpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2F0VXJsLmluY2x1ZGVzKFwiaHR0cFwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobG9jYXRpb24uaG9zdC5pbmNsdWRlcyhcImVuLnN1cGVyaGFpcnBpZWNlcy5lc1wiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2F0VXJsID0gY2F0VXJsLnJlcGxhY2UoXCIvL3N1cGVyaGFpcnBpZWNlcy5lc1wiLFwiLy9lbi5zdXBlcmhhaXJwaWVjZXMuZXNcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZighJCgnLnByb2R1Y3RDYXJvdXNlbC10YWJzIC50YWItY29udGVudC5pcy1hY3RpdmUgLnByb2R1Y3RDYXJvdXNlbCAucHJvZHVjdENhcm91c2VsLXNsaWRlJykubGVuZ3RoKXtcclxuICAgICAgICAgICAgICAgICAgICBibG9jay5maW5kKCcubG9hZGluZ092ZXJsYXknKS5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9hZENhdGVnb3J5KGNhdElkLCBjYXRVcmwsIG9wdGlvbnMsIHdyYXAsIGJsb2NrSWQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gcmV2aWV3U2hvdyh4KSB7XHJcbiAgICAgICAgICAgIHZhciBsaW1pdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5yZXZpZXdDYXJkMScpO1xyXG4gICAgXHJcbiAgICAgICAgICAgIGxldCByZXZpZXcyID0gW11cclxuICAgICAgICAgICAgUHJvbWlzZS5hbGwoW1xyXG4gICAgICAgICAgICAgICAgZmV0Y2goXCJodHRwczovL3d3dy50ZWFtZGVzay5uZXQvc2VjdXJlL2FwaS92Mi81NjU1NC9CRUEyNTY2NTkwRUY0RDE0QUE4RDM1QUQwRTJDRUE3Ny9SZXZpZXcvc2VsZWN0Lmpzb25cIikudGhlbihyID0+IHIuanNvbigpKS50aGVuKHI9PntcclxuICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldmlldzIucHVzaCguLi5yKX0pLFxyXG4gICAgICAgICAgICAgICAgZmV0Y2goXCJodHRwczovL3d3dy50ZWFtZGVzay5uZXQvc2VjdXJlL2FwaS92Mi81NjU1NC9CRUEyNTY2NTkwRUY0RDE0QUE4RDM1QUQwRTJDRUE3Ny9SZXZpZXcvc2VsZWN0Lmpzb24/c2tpcD01MDBcIikudGhlbihyID0+IHIuanNvbigpKS50aGVuKHI9PntcclxuICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldmlldzIucHVzaCguLi5yKX0pLFxyXG4gICAgICAgICAgICAgICAgZmV0Y2goXCJodHRwczovL3d3dy50ZWFtZGVzay5uZXQvc2VjdXJlL2FwaS92Mi81NjU1NC9CRUEyNTY2NTkwRUY0RDE0QUE4RDM1QUQwRTJDRUE3Ny9SZXZpZXcvc2VsZWN0Lmpzb24/c2tpcD0xMDAwXCIpLnRoZW4ociA9PiByLmpzb24oKSkudGhlbihyPT57XHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXZpZXcyLnB1c2goLi4ucil9KSxcclxuICAgICAgICAgICAgICAgIGZldGNoKFwiaHR0cHM6Ly93d3cudGVhbWRlc2submV0L3NlY3VyZS9hcGkvdjIvNTY1NTQvQkVBMjU2NjU5MEVGNEQxNEFBOEQzNUFEMEUyQ0VBNzcvUmV2aWV3L3NlbGVjdC5qc29uP3NraXA9MTUwMFwiKS50aGVuKHIgPT4gci5qc29uKCkpLnRoZW4ocj0+e1xyXG4gICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV2aWV3Mi5wdXNoKC4uLnIpfSksXHJcbiAgICAgICAgICAgICAgXSlcclxuICAgICAgICAgICAgICAudGhlbigocikgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGltaXQuZm9yRWFjaCgoaXRlbTEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAkKGl0ZW0xLm5leHRFbGVtZW50U2libGluZykuZW1wdHkoKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtMS5pbm5lckhUTUwgPT0gJ00xMDYnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0xLmlubmVySFRNTCA9ICdNMTA2IzEnXHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYgKGl0ZW0xLmlubmVySFRNTCA9PSAnTTEwNkwnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0xLmlubmVySFRNTCA9ICdNMTA2TCMxJ1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaXRlbTEuaW5uZXJIVE1MID09ICdRdWVlbl8xOCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbTEuaW5uZXJIVE1MID0gJ1ExOCdcclxuICAgICAgICAgICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICAgICAgICAgIGxldCByZXZpZXczID0gW11cclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB2aWR1ID0gcmV2aWV3Mi5maWx0ZXIoaXRlbSA9PiBpdGVtWydQcm9kdWN0IFNLVSddID09PSBpdGVtMS5pbm5lckhUTUwpXHJcbiAgICAgICAgICAgICAgICAgICAgdmlkdS5mb3JFYWNoKChnb2t1KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldmlldzMucHVzaChnb2t1WydSZXZpZXcgcmF0ZSddKVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmV2aWV3QXZnID0gTWF0aC5yb3VuZCgocmV2aWV3My5yZWR1Y2UoKGEsYiApID0+IGErIGIsIDApL3JldmlldzMubGVuZ3RoKSAqIDEwKS8xMFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKGl0ZW0xLm5leHRFbGVtZW50U2libGluZykuYXBwZW5kKGBcclxuICAgICAgICAgICAgICAgICAgICA8c3R5bGU+ICAgIC5jaGVja2VkIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IHJnYigyNTUsIDIxMCwgMCk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC5mYS1zdGFyLW8ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiByZ2IoMjU1LCAyMTAsIDApO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIEBtZWRpYSAobWluLXdpZHRoOiA3NjhweCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC5wcm9kdWN0UmV2aWV3MiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgQG1lZGlhIChtaW4td2lkdGg6IDEwMjVweCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC5wcm9kdWN0UmV2aWV3MiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IHVuc2V0O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIEBtZWRpYSAobWluLXdpZHRoOiAxNDAwcHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAucHJvZHVjdFJldmlldzIge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIDwvc3R5bGU+XHJcbiAgICA8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgaHJlZj1cImh0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL2ZvbnQtYXdlc29tZS80LjcuMC9jc3MvZm9udC1hd2Vzb21lLm1pbi5jc3NcIj5cclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZhIGZhLXN0YXJgKygwLjUgPD0gcmV2aWV3QXZnPyAnIGNoZWNrZWQnOiAnIGZhLXN0YXItbycpICsgYFwiPjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZhIGZhLXN0YXJgKygxLjUgPD0gcmV2aWV3QXZnPyAnIGNoZWNrZWQnOiAnIGZhLXN0YXItbycpICsgYFwiPjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZhIGZhLXN0YXJgKygyLjUgPD0gcmV2aWV3QXZnPyAnIGNoZWNrZWQnOiAnIGZhLXN0YXItbycpICsgYFwiPjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZhIGZhLXN0YXJgKygzLjUgPD0gcmV2aWV3QXZnPyAnIGNoZWNrZWQnOiAnIGZhLXN0YXItbycpICsgYFwiPjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZhIGZhLXN0YXJgKyg0LjUgPD0gcmV2aWV3QXZnPyAnIGNoZWNrZWQnOiAnIGZhLXN0YXItbycpICsgYFwiPjwvc3Bhbj4gICAgICBcclxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9cGFkZGluZy1sZWZ0OjVweDs+XHJcbiAgICAgICAgICAgICAgICAgICAgJHtyZXZpZXczLmxlbmd0aH0gUmVzZcOxYXNcclxuICAgICAgICAgICAgICAgIDwvZGl2PmApXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gJChpdGVtMS5uZXh0RWxlbWVudFNpYmxpbmcpLmFwcGVuZChgPGRpdj4ke3Jldmlld0F2Z308L2Rpdj5gKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgfSlcclxuICAgIFxyXG4gICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgLy8gICAgIGZ1bmN0aW9uIHJldmlld1Nob3coeCkge1xyXG4gICAgLy8gICAgICAgICB2YXIgbGltaXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucmV2aWV3Q2FyZDEnKTtcclxuXHJcbiAgICAvLyAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGltaXQubGVuZ3RoOyBpKyspIHtcclxuICAgIC8vICAgICAgICAgICAgIGxldCByZXZpZXczPVtdXHJcbiAgICAvLyAgICAgICAgICAgICBsZXQgcmV2aWV3MiA9IFtdXHJcbiAgICAvLyAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhsaW1pdFtpXS5pbm5lckhUTUwpXHJcbiAgICAvLyAgICAgICAgICAgICBmZXRjaChgaHR0cHM6Ly9zaHAtd2Vic2VydmVyLmdsaXRjaC5tZS9nZXQtdGVhbWRlc2tgLCB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgfSxcclxuICAgIC8vICAgICAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIFwidGFibGVcIjogXCJSZXZpZXdcIixcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgXCJvcHRpb25zXCI6YD9maWx0ZXI9W1Byb2R1Y3QgU0tVXT0nJHtsaW1pdFtpXS5pbm5lckhUTUx9J2BcclxuICAgIC8vICAgICAgICAgICAgICAgICB9KVxyXG4gICAgLy8gICAgICAgICAgICAgfSlcclxuICAgIC8vICAgICAgICAgICAgIC50aGVuKHI9PnIuanNvbigpKVxyXG5cclxuICAgIC8vICAgICAgICAgICAgIC50aGVuKHI9PiByZXZpZXcyLnB1c2goLi4ucikpXHJcbiAgICAvLyAgICAgICAgICAgICAudGhlbihyID0+IHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAkKGxpbWl0W2ldLm5leHRFbGVtZW50U2libGluZykuZW1wdHkoKVxyXG4gICAgLy8gICAgICAgICAgICAgICAgIC8vIGNvbnN0IGdva3UxID0gcmV2aWV3Mi5maWx0ZXIoaXRlbSA9PiBpdGVtWydQcm9kdWN0IFNLVSddID09PSBsaW1pdFtpXS5pbm5lckhUTUwpXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmV2aWV3MilcclxuICAgIC8vICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXZpZXcyLmxlbmd0aClcclxuICAgIC8vICAgICAgICAgICAgICAgICBmb3IgKGxldCBpPTA7IGk8cmV2aWV3Mi5sZW5ndGg7IGkrKykge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICByZXZpZXczLnB1c2gocmV2aWV3MltpXVsnUmV2aWV3IHJhdGUnXSlcclxuXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICAgICAgICAgIC8vIHJldmlldzIuZm9yRWFjaCgocmV2KSA9PiB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgLy8gICAgIHJldmlldzMucHVzaChyZXZbJ1JldmlldyByYXRlJ10pXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgLy8gfSlcclxuICAgIC8vICAgICAgICAgICAgICAgICBjb25zdCByZXZpZXdBdmcgPSBNYXRoLnJvdW5kKChyZXZpZXczLnJlZHVjZSgoYSxiICkgPT4gYSsgYiwgMCkvcmV2aWV3My5sZW5ndGgpICogMTApLzEwXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgJChsaW1pdFtpXS5uZXh0RWxlbWVudFNpYmxpbmcpLmFwcGVuZChgXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgPHN0eWxlPiAgICAuY2hlY2tlZCB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiByZ2IoMjU1LCAyMTAsIDApO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAvLyAgICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgICAgICAuZmEtc3Rhci1vIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICBjb2xvcjogcmdiKDI1NSwgMjEwLCAwKTtcclxuICAgICAgICAgICAgXHJcbiAgICAvLyAgICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgICAgICBAbWVkaWEgKG1pbi13aWR0aDogNzY4cHgpIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAucHJvZHVjdFJldmlldzIge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgICAgIEBtZWRpYSAobWluLXdpZHRoOiAxMDI1cHgpIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAucHJvZHVjdFJldmlldzIge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiB1bnNldDtcclxuICAgIC8vICAgICAgICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgICAgICBAbWVkaWEgKG1pbi13aWR0aDogMTQwMHB4KSB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgLnByb2R1Y3RSZXZpZXcyIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgIC8vICAgICAgICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgICAgICA8L3N0eWxlPlxyXG4gICAgLy8gPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIGhyZWY9XCJodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9mb250LWF3ZXNvbWUvNC43LjAvY3NzL2ZvbnQtYXdlc29tZS5taW4uY3NzXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgPHNwYW4+XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmYSBmYS1zdGFyYCsoMC41IDw9IHJldmlld0F2Zz8gJyBjaGVja2VkJzogJyBmYS1zdGFyLW8nKSArIGBcIj48L3NwYW4+XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmYSBmYS1zdGFyYCsoMS41IDw9IHJldmlld0F2Zz8gJyBjaGVja2VkJzogJyBmYS1zdGFyLW8nKSArIGBcIj48L3NwYW4+XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmYSBmYS1zdGFyYCsoMi41IDw9IHJldmlld0F2Zz8gJyBjaGVja2VkJzogJyBmYS1zdGFyLW8nKSArIGBcIj48L3NwYW4+XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmYSBmYS1zdGFyYCsoMy41IDw9IHJldmlld0F2Zz8gJyBjaGVja2VkJzogJyBmYS1zdGFyLW8nKSArIGBcIj48L3NwYW4+XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmYSBmYS1zdGFyYCsoNC41IDw9IHJldmlld0F2Zz8gJyBjaGVja2VkJzogJyBmYS1zdGFyLW8nKSArIGBcIj48L3NwYW4+ICAgICAgXHJcbiAgICAvLyAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAvLyAgICAgICAgICAgICA8ZGl2IHN0eWxlPXBhZGRpbmctbGVmdDo1cHg7PlxyXG4gICAgLy8gICAgICAgICAgICAgICAgICR7cmV2aWV3My5sZW5ndGh9IFJlc2XDsWFzXHJcbiAgICAvLyAgICAgICAgICAgICA8L2Rpdj5gKVxyXG4gICAgLy8gICAgICAgICAgICAgfSlcclxuICAgIC8vICAgICAgICAgfVxyXG4gICAgLy8gLy8gICAgICAgICBsaW1pdC5mb3JFYWNoKChpdGVtMSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAvLyAvLyAgICAgICAgICAgICBsZXQgcmV2aWV3Mz1bXVxyXG4gICAgLy8gLy8gICAgICAgICAgICAgbGV0IHJldmlldzIgPSBbXVxyXG5cclxuICAgIC8vIC8vICAgICAgICAgICAgIGZldGNoKGBodHRwczovL3NocC13ZWJzZXJ2ZXIuZ2xpdGNoLm1lL2dldC10ZWFtZGVza2AsIHtcclxuICAgIC8vIC8vICAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgIC8vIC8vICAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAvLyAvLyAgICAgICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAvLyAvLyAgICAgICAgICAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgIC8vIC8vICAgICAgICAgICAgICAgICB9LFxyXG4gICAgLy8gLy8gICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcclxuICAgIC8vIC8vICAgICAgICAgICAgICAgICAgICAgXCJ0YWJsZVwiOiBcIlJldmlld1wiLFxyXG4gICAgLy8gLy8gICAgICAgICAgICAgICAgICAgICBcIm9wdGlvbnNcIjpgP2ZpbHRlcj1bUHJvZHVjdCBTS1VdPScke2l0ZW0xLmlubmVySFRNTH0nYFxyXG4gICAgLy8gLy8gICAgICAgICAgICAgICAgIH0pXHJcbiAgICAvLyAvLyAgICAgICAgICAgICB9KVxyXG4gICAgLy8gLy8gICAgICAgICAgICAgLnRoZW4ocj0+ci5qc29uKCkpXHJcblxyXG4gICAgLy8gLy8gICAgICAgICAgICAgLnRoZW4ocj0+IHJldmlldzIucHVzaCguLi5yKSlcclxuICAgIC8vIC8vICAgICAgICAgICAgIC50aGVuKHIgPT4ge1xyXG4gICAgLy8gLy8gICAgICAgICAgICAgICAgICQoaXRlbTEubmV4dEVsZW1lbnRTaWJsaW5nKS5lbXB0eSgpXHJcbiAgICAvLyAvLyAgICAgICAgICAgICAgICAgY29uc3QgZ29rdTEgPSByZXZpZXcyLmZpbHRlcihpdGVtID0+IGl0ZW1bJ1Byb2R1Y3QgU0tVJ10gPT09IGl0ZW0xLmlubmVySFRNTClcclxuICAgIC8vIC8vICAgICAgICAgICAgICAgICBnb2t1MS5mb3JFYWNoKChyZXYpID0+IHtcclxuICAgIC8vIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXZpZXczLnB1c2gocmV2WydSZXZpZXcgcmF0ZSddKVxyXG4gICAgLy8gLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgIC8vIC8vICAgICAgICAgICAgICAgICBjb25zdCByZXZpZXdBdmcgPSBNYXRoLnJvdW5kKChyZXZpZXczLnJlZHVjZSgoYSxiICkgPT4gYSsgYiwgMCkvcmV2aWV3My5sZW5ndGgpICogMTApLzEwXHJcbiAgICAvLyAvLyAgICAgICAgICAgICAgICAgJChpdGVtMS5uZXh0RWxlbWVudFNpYmxpbmcpLmFwcGVuZChgXHJcbiAgICAvLyAvLyAgICAgICAgICAgICAgICAgPHN0eWxlPiAgICAuY2hlY2tlZCB7XHJcbiAgICAvLyAvLyAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiByZ2IoMjU1LCAyMTAsIDApO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAvLyAvLyAgICAgICAgICAgICB9XHJcbiAgICAvLyAvLyAgICAgICAgICAgICAuZmEtc3Rhci1vIHtcclxuICAgIC8vIC8vICAgICAgICAgICAgICAgICBjb2xvcjogcmdiKDI1NSwgMjEwLCAwKTtcclxuICAgICAgICAgICAgXHJcbiAgICAvLyAvLyAgICAgICAgICAgICB9XHJcbiAgICAvLyAvLyAgICAgICAgICAgICBAbWVkaWEgKG1pbi13aWR0aDogNzY4cHgpIHtcclxuICAgIC8vIC8vICAgICAgICAgICAgICAgICAucHJvZHVjdFJldmlldzIge1xyXG4gICAgLy8gLy8gICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgLy8gLy8gICAgICAgICAgICAgICAgIH1cclxuICAgIC8vIC8vICAgICAgICAgICAgIH1cclxuICAgIC8vIC8vICAgICAgICAgICAgIEBtZWRpYSAobWluLXdpZHRoOiAxMDI1cHgpIHtcclxuICAgIC8vIC8vICAgICAgICAgICAgICAgICAucHJvZHVjdFJldmlldzIge1xyXG4gICAgLy8gLy8gICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiB1bnNldDtcclxuICAgIC8vIC8vICAgICAgICAgICAgICAgICB9XHJcbiAgICAvLyAvLyAgICAgICAgICAgICB9XHJcbiAgICAvLyAvLyAgICAgICAgICAgICBAbWVkaWEgKG1pbi13aWR0aDogMTQwMHB4KSB7XHJcbiAgICAvLyAvLyAgICAgICAgICAgICAgICAgLnByb2R1Y3RSZXZpZXcyIHtcclxuICAgIC8vIC8vICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgIC8vIC8vICAgICAgICAgICAgICAgICB9XHJcbiAgICAvLyAvLyAgICAgICAgICAgICB9XHJcbiAgICAvLyAvLyAgICAgICAgICAgICA8L3N0eWxlPlxyXG4gICAgLy8gLy8gPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIGhyZWY9XCJodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9mb250LWF3ZXNvbWUvNC43LjAvY3NzL2ZvbnQtYXdlc29tZS5taW4uY3NzXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAvLyAvLyAgICAgICAgICAgICAgICAgPHNwYW4+XHJcbiAgICAvLyAvLyAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmYSBmYS1zdGFyYCsoMC41IDw9IHJldmlld0F2Zz8gJyBjaGVja2VkJzogJyBmYS1zdGFyLW8nKSArIGBcIj48L3NwYW4+XHJcbiAgICAvLyAvLyAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmYSBmYS1zdGFyYCsoMS41IDw9IHJldmlld0F2Zz8gJyBjaGVja2VkJzogJyBmYS1zdGFyLW8nKSArIGBcIj48L3NwYW4+XHJcbiAgICAvLyAvLyAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmYSBmYS1zdGFyYCsoMi41IDw9IHJldmlld0F2Zz8gJyBjaGVja2VkJzogJyBmYS1zdGFyLW8nKSArIGBcIj48L3NwYW4+XHJcbiAgICAvLyAvLyAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmYSBmYS1zdGFyYCsoMy41IDw9IHJldmlld0F2Zz8gJyBjaGVja2VkJzogJyBmYS1zdGFyLW8nKSArIGBcIj48L3NwYW4+XHJcbiAgICAvLyAvLyAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmYSBmYS1zdGFyYCsoNC41IDw9IHJldmlld0F2Zz8gJyBjaGVja2VkJzogJyBmYS1zdGFyLW8nKSArIGBcIj48L3NwYW4+ICAgICAgXHJcbiAgICAvLyAvLyAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAvLyAvLyAgICAgICAgICAgICA8ZGl2IHN0eWxlPXBhZGRpbmctbGVmdDo1cHg7PlxyXG4gICAgLy8gLy8gICAgICAgICAgICAgICAgICR7cmV2aWV3My5sZW5ndGh9IFJlc2XDsWFzXHJcbiAgICAvLyAvLyAgICAgICAgICAgICA8L2Rpdj5gKVxyXG4gICAgLy8gLy8gICAgICAgICAgICAgfSlcclxuXHJcbiAgICAvLyAvLyAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIFxyXG4gICAgLy8gLy8gICAgICAgICBsZXQgcmV2aWV3MiA9IFtdXHJcbiAgICAvLyAvLyAgICAgICAgIGZldGNoKGBodHRwczovL3NocC13ZWJzZXJ2ZXIuZ2xpdGNoLm1lL2dldC10ZWFtZGVza2AsIHtcclxuICAgIC8vIC8vICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgLy8gLy8gICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgLy8gLy8gICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAvLyAvLyAgICAgICAgICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgLy8gLy8gICAgICAgICAgICAgfSxcclxuICAgIC8vIC8vICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcclxuICAgIC8vIC8vICAgICAgICAgICAgICAgICBcInRhYmxlXCI6IFwiUmV2aWV3XCIsXHJcbiAgICAvLyAvLyAgICAgICAgICAgICAgICAgXCJvcHRpb25zXCI6YGBcclxuICAgIC8vIC8vICAgICAgICAgICAgIH0pXHJcbiAgICAvLyAvLyAgICAgICAgIH0pXHJcbiAgICAvLyAvLyAgICAgICAgIC50aGVuKHI9PnIuanNvbigpKVxyXG4gICAgLy8gLy8gICAgICAgICAudGhlbihyPT4gcmV2aWV3Mi5wdXNoKC4uLnIpKVxyXG4gICAgLy8gLy8gICAgICAgICAudGhlbigocikgPT4ge1xyXG4gICAgLy8gLy8gICAgICAgICAgICAgbGltaXQuZm9yRWFjaCgoaXRlbTEpID0+IHtcclxuICAgIC8vIC8vICAgICAgICAgICAgICAgICAkKGl0ZW0xLm5leHRFbGVtZW50U2libGluZykuZW1wdHkoKVxyXG4gICAgXHJcbiAgICAvLyAvLyAgICAgICAgICAgICAgICAgbGV0IHJldmlldzMgPSBbXVxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgLy8gLy8gICAgICAgICAgICAgICAgIGNvbnN0IGZpbHRlcmVkQXIgPSByZXZpZXcyLmZpbHRlcihpdGVtID0+IGl0ZW1bJ1Byb2R1Y3QgU0tVJ10gPT09IGl0ZW0xLmlubmVySFRNTClcclxuICAgIC8vIC8vICAgICAgICAgICAgICAgICBmaWx0ZXJlZEFyLmZvckVhY2goKHJldikgPT4ge1xyXG4gICAgLy8gLy8gICAgICAgICAgICAgICAgICAgICByZXZpZXczLnB1c2gocmV2WydSZXZpZXcgcmF0ZSddKVxyXG4gICAgLy8gLy8gICAgICAgICAgICAgICAgIH0pXHJcbiAgICAvLyAvLyAgICAgICAgICAgICAgICAgY29uc3QgcmV2aWV3QXZnID0gTWF0aC5yb3VuZCgocmV2aWV3My5yZWR1Y2UoKGEsYiApID0+IGErIGIsIDApL3JldmlldzMubGVuZ3RoKSAqIDEwKS8xMFxyXG5cclxuICAgIC8vIC8vICAgICAgICAgICAgICAgICAkKGl0ZW0xLm5leHRFbGVtZW50U2libGluZykuYXBwZW5kKGBcclxuICAgIC8vIC8vICAgICAgICAgICAgICAgICA8c3R5bGU+ICAgIC5jaGVja2VkIHtcclxuICAgIC8vIC8vICAgICAgICAgICAgICAgICAgICAgY29sb3I6IHJnYigyNTUsIDIxMCwgMCk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgIC8vIC8vICAgICAgICAgICAgIH1cclxuICAgIC8vIC8vICAgICAgICAgICAgIC5mYS1zdGFyLW8ge1xyXG4gICAgLy8gLy8gICAgICAgICAgICAgICAgIGNvbG9yOiByZ2IoMjU1LCAyMTAsIDApO1xyXG4gICAgICAgICAgICBcclxuICAgIC8vIC8vICAgICAgICAgICAgIH1cclxuICAgIC8vIC8vICAgICAgICAgICAgIEBtZWRpYSAobWluLXdpZHRoOiA3NjhweCkge1xyXG4gICAgLy8gLy8gICAgICAgICAgICAgICAgIC5wcm9kdWN0UmV2aWV3MiB7XHJcbiAgICAvLyAvLyAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAvLyAvLyAgICAgICAgICAgICAgICAgfVxyXG4gICAgLy8gLy8gICAgICAgICAgICAgfVxyXG4gICAgLy8gLy8gICAgICAgICAgICAgQG1lZGlhIChtaW4td2lkdGg6IDEwMjVweCkge1xyXG4gICAgLy8gLy8gICAgICAgICAgICAgICAgIC5wcm9kdWN0UmV2aWV3MiB7XHJcbiAgICAvLyAvLyAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IHVuc2V0O1xyXG4gICAgLy8gLy8gICAgICAgICAgICAgICAgIH1cclxuICAgIC8vIC8vICAgICAgICAgICAgIH1cclxuICAgIC8vIC8vICAgICAgICAgICAgIEBtZWRpYSAobWluLXdpZHRoOiAxNDAwcHgpIHtcclxuICAgIC8vIC8vICAgICAgICAgICAgICAgICAucHJvZHVjdFJldmlldzIge1xyXG4gICAgLy8gLy8gICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgLy8gLy8gICAgICAgICAgICAgICAgIH1cclxuICAgIC8vIC8vICAgICAgICAgICAgIH1cclxuICAgIC8vIC8vICAgICAgICAgICAgIDwvc3R5bGU+XHJcbiAgICAvLyAvLyA8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgaHJlZj1cImh0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL2ZvbnQtYXdlc29tZS80LjcuMC9jc3MvZm9udC1hd2Vzb21lLm1pbi5jc3NcIj5cclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgIC8vIC8vICAgICAgICAgICAgICAgICA8c3Bhbj5cclxuICAgIC8vIC8vICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZhIGZhLXN0YXJgKygwLjUgPD0gcmV2aWV3QXZnPyAnIGNoZWNrZWQnOiAnIGZhLXN0YXItbycpICsgYFwiPjwvc3Bhbj5cclxuICAgIC8vIC8vICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZhIGZhLXN0YXJgKygxLjUgPD0gcmV2aWV3QXZnPyAnIGNoZWNrZWQnOiAnIGZhLXN0YXItbycpICsgYFwiPjwvc3Bhbj5cclxuICAgIC8vIC8vICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZhIGZhLXN0YXJgKygyLjUgPD0gcmV2aWV3QXZnPyAnIGNoZWNrZWQnOiAnIGZhLXN0YXItbycpICsgYFwiPjwvc3Bhbj5cclxuICAgIC8vIC8vICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZhIGZhLXN0YXJgKygzLjUgPD0gcmV2aWV3QXZnPyAnIGNoZWNrZWQnOiAnIGZhLXN0YXItbycpICsgYFwiPjwvc3Bhbj5cclxuICAgIC8vIC8vICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZhIGZhLXN0YXJgKyg0LjUgPD0gcmV2aWV3QXZnPyAnIGNoZWNrZWQnOiAnIGZhLXN0YXItbycpICsgYFwiPjwvc3Bhbj4gICAgICBcclxuICAgIC8vIC8vICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgIC8vIC8vICAgICAgICAgICAgIDxkaXYgc3R5bGU9cGFkZGluZy1sZWZ0OjVweDs+XHJcbiAgICAvLyAvLyAgICAgICAgICAgICAgICAgJHtyZXZpZXczLmxlbmd0aH0gUmVzZcOxYXNcclxuICAgIC8vIC8vICAgICAgICAgICAgIDwvZGl2PmApXHJcbiAgICAvLyAvLyAgICAgICAgICAgICAgICAgLy8gJChpdGVtMS5uZXh0RWxlbWVudFNpYmxpbmcpLmFwcGVuZChgPGRpdj4ke3Jldmlld0F2Z308L2Rpdj5gKVxyXG4gICAgLy8gLy8gICAgICAgICAgICAgfSlcclxuXHJcbiAgICAvLyAvLyAgICAgICAgICAgfSlcclxuICAgIFxyXG4gICAgICAgICAgICAgIFxyXG4gICAgLy8gLy8gICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICAvLyAvLyAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAvLyAvLyAgICAgICAgICAgfSk7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgICAgIGZ1bmN0aW9uIGxvYWRDYXRlZ29yeShpZCwgdXJsLCBvcHRpb24sIHdyYXAsIGJsb2NrSWQpe1xyXG4gICAgICAgICAgICB1dGlscy5hcGkuZ2V0UGFnZSh1cmwsIG9wdGlvbiwgKGVyciwgcmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmKCF3cmFwLmZpbmQoJy5wcm9kdWN0Q2Fyb3VzZWwtc2xpZGUnKS5sZW5ndGgpe1xyXG4gICAgICAgICAgICAgICAgICAgIHdyYXAuaHRtbChyZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpY2tDYXJvdXNlbCh3cmFwKTtcclxuICAgICAgICAgICAgICAgICAgICB3cmFwLnBhcmVudHMoJy50YWItY29udGVudCcpLmZpbmQoJy5sb2FkaW5nT3ZlcmxheScpLnJlbW92ZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBoYWxvQWRkT3B0aW9uKGNvbnRleHQsIGJsb2NrSWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldmlld1Nob3coKVxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7IFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gc2xpY2tDYXJvdXNlbCh3cmFwKXtcclxuICAgICAgICAgICAgd3JhcC5zbGljayh7XHJcbiAgICAgICAgICAgICAgICBkb3RzOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGFycm93czogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGluZmluaXRlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIG1vYmlsZUZpcnN0OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAyLFxyXG4gICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcbiAgICAgICAgICAgICAgICBuZXh0QXJyb3c6IFwiPHN2ZyBjbGFzcz0nc2xpY2stdGFiMSBzbGljay1uZXh0IHNsaWNrLWFycm93IHNsaWNrLWFycm93LWxhcmdlJyBhcmlhLWxhYmVsPSdOZXh0IFNsaWRlJz48dXNlIHhsaW5rOmhyZWY9I3NsaWNrLWFycm93LW5leHQ+PC91c2U+PC9zdmc+XCIsIFxyXG4gICAgICAgICAgICAgICAgcHJldkFycm93OiBcIjxzdmcgY2xhc3M9J3NsaWNrLXRhYjIgc2xpY2stcHJldiBzbGljay1hcnJvdyBzbGljay1hcnJvdy1sYXJnZScgYXJpYS1sYWJlbD0nUHJldmlvdXMgU2xpZGUnPjx1c2UgeGxpbms6aHJlZj0jc2xpY2stYXJyb3ctcHJldj48L3VzZT48L3N2Zz5cIixcclxuICAgICAgICAgICAgICAgIHJlc3BvbnNpdmU6IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiAxMDI0LFxyXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFycm93czogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiBwYXJzZUludChjb250ZXh0LnRoZW1lU2V0dGluZ3MuaG9tZV9wcm9kdWN0X2Jsb2NrX3RhYl9jb2wpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiA5OTEsXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiBwYXJzZUludChjb250ZXh0LnRoZW1lU2V0dGluZ3MuaG9tZV9wcm9kdWN0X2Jsb2NrX3RhYl9jb2wpIC0gMVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNzY3LFxyXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogcGFyc2VJbnQoY29udGV4dC50aGVtZVNldHRpbmdzLmhvbWVfcHJvZHVjdF9ibG9ja190YWJfY29sKSAtIDJcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbG9hZFByb2R1Y3RCeUNhdGVnb3J5V2l0aEJhbm5lcigpe1xyXG4gICAgICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzLmNvbnRleHQ7XHJcblxyXG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlOiAncHJvZHVjdHMvY2Fyb3VzZWwtNCdcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBpZigkKCcuaGFsby1ibG9ja1tkYXRhLWNhdGVnb3J5LXdpdGgtYmFubmVyLWlkXScpLmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICB2YXIgIGhlYWRlcl9oZWlnaHQgPSAkKCcuaGVhZGVyJykuaGVpZ2h0KCk7XHJcbiAgICAgICAgICAgIGNvbnN0ICR0YWJTb3J0aW5nID0gJCgnLnRhYi1zb3J0aW5nIC50YWItdGl0bGUnKTtcclxuXHJcbiAgICAgICAgICAgICQod2luZG93KS5vbignc2Nyb2xsIGxvYWQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHZhciBzY3JvbGwgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCksXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0RmxhZyA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChzY3JvbGwgPiBoZWFkZXJfaGVpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0RmxhZyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoc2V0RmxhZyl7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLmhhbG8tYmxvY2tbZGF0YS1jYXRlZ29yeS13aXRoLWJhbm5lci1pZF0nKS5lYWNoKChpbmRleCwgZWxlbWVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoJCgnLmhvbWUtbGF5b3V0LTInKS5sZW5ndGggJiYgISQoZWxlbWVudCkuaGFzQ2xhc3MoJ2hvbWUyLWZsYXNoLWRlYWxzJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB3cmFwID0gJChlbGVtZW50KS5maW5kKCcudGFiQ29udGVudC1uZXcgLnByb2R1Y3RDYXJvdXNlbCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHdyYXAgPSAkKGVsZW1lbnQpLmZpbmQoJy5wcm9kdWN0Q2Fyb3VzZWwnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNhdElkID0gJChlbGVtZW50KS5kYXRhKCdjYXRlZ29yeS13aXRoLWJhbm5lci1pZCcpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2F0VXJsID0gJChlbGVtZW50KS5kYXRhKCdjYXRlZ29yeS13aXRoLWJhbm5lci11cmwnKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJsb2NrSWQgPSAkKGVsZW1lbnQpLmF0dHIoJ2lkJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZighJCgnI3Byb2R1Y3Qtd2l0aC1iYW5uZXItJytjYXRJZCsnIC5wcm9kdWN0Q2Fyb3VzZWwgLnByb2R1Y3RDYXJvdXNlbC1zbGlkZScpLmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2FkQ2F0ZWdvcnkoY2F0SWQsIGNhdFVybCwgb3B0aW9ucywgd3JhcCwgYmxvY2tJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0RmxhZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICR0YWJTb3J0aW5nLm9uKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCAkdGFyZ2V0ID0gJChlLmN1cnJlbnRUYXJnZXQpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YVRhYiA9ICR0YXJnZXQuZGF0YSgndGFiJyk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCAkdGhpc0Jsb2NrID0gJHRhcmdldC5jbG9zZXN0KCcuaGFsby1ibG9jay1wcm9kdWN0Jyk7XHJcbiAgICAgICAgICAgICAgICB2YXIgd3JhcCA9ICR0aGlzQmxvY2suZmluZCgnLnRhYkNvbnRlbnQtJytkYXRhVGFiKycgLnByb2R1Y3RDYXJvdXNlbCcpLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhdElkID0gJHRhcmdldC5kYXRhKCdjYXRlLWlkJyksXHJcbiAgICAgICAgICAgICAgICAgICAgY2F0VXJsID0gJHRhcmdldC5kYXRhKCdjYXRlLXVybCcpLFxyXG4gICAgICAgICAgICAgICAgICAgIGJsb2NrSWQgPSAkdGhpc0Jsb2NrLmZpbmQoJy50YWJDb250ZW50LScrZGF0YVRhYikuYXR0cignaWQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YVRhYiA9PSAndmlld2FsbCcpIHtcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICR0YXJnZXQuYXR0cignaHJlZicpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAkdGhpc0Jsb2NrLmZpbmQoJy50YWItc29ydGluZycpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgICR0YXJnZXQucGFyZW50KCkuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgJHRoaXNCbG9jay5maW5kKCcudGFiLWNvbnRlbnQnKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAkdGhpc0Jsb2NrLmZpbmQoJy50YWJDb250ZW50LScrZGF0YVRhYikuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2FmZicpXHJcbiAgICAgICAgICAgICAgICBpZighJHRhcmdldC5oYXNDbGFzcygnaXMtbG9hZGVkJykpe1xyXG4gICAgICAgICAgICAgICAgICAgICR0YXJnZXQuYWRkQ2xhc3MoJ2lzLWxvYWRlZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxvYWRDYXRlZ29yeShjYXRJZCwgY2F0VXJsLCBvcHRpb25zLCB3cmFwLCBibG9ja0lkKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICR0aGlzQmxvY2suZmluZCgnLnRhYkNvbnRlbnQtJytkYXRhVGFiKycgLnByb2R1Y3RDYXJvdXNlbCcpLnNsaWNrKCdyZWZyZXNoJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKCQoJy5jb3VudERvd250aW1lcicpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNvdW50RG93bkRhdGUgPSBuZXcgRGF0ZSggJCgnLmNvdW50RG93bnRpbWVyJykuYXR0cignZGF0YS1jb3VudC1kb3duJykpLmdldFRpbWUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgY291bnRkb3duZnVuY3Rpb24gPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbm93ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRpc3RhbmNlID0gY291bnREb3duRGF0ZSAtIG5vdztcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGlzdGFuY2UgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoY291bnRkb3duZnVuY3Rpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiLmNvdW50RG93bnRpbWVyXCIpLmh0bWwoJycpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkYXlzID0gTWF0aC5mbG9vcihkaXN0YW5jZSAvICgxMDAwICogNjAgKiA2MCAqIDI0KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBob3VycyA9IE1hdGguZmxvb3IoKGRpc3RhbmNlICUgKDEwMDAgKiA2MCAqIDYwICogMjQpKSAvICgxMDAwICogNjAgKiA2MCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbWludXRlcyA9IE1hdGguZmxvb3IoKGRpc3RhbmNlICUgKDEwMDAgKiA2MCAqIDYwKSkgLyAoMTAwMCAqIDYwKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzZWNvbmRzID0gTWF0aC5mbG9vcigoZGlzdGFuY2UgJSAoMTAwMCAqIDYwKSkgLyAxMDAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN0ckNvdW50RG93biA9IFwiPGRpdiBjbGFzcz0nY2xvY2staXRlbSc+PHNwYW4gY2xhc3M9J251bSc+XCIrZGF5cytcIjwvc3Bhbj48c3BhbiBjbGFzcz0ndGV4dCc+ZDwvc3Bhbj48L2Rpdj48ZGl2IGNsYXNzPSdjbG9jay1pdGVtJz48c3BhbiBjbGFzcz0nbnVtJz5cIitob3VycytcIjo8L3NwYW4+PC9kaXY+PGRpdiBjbGFzcz0nY2xvY2staXRlbSc+PHNwYW4gY2xhc3M9J251bSc+XCIrbWludXRlcytcIjo8L3NwYW4+PC9kaXY+PGRpdiBjbGFzcz0nY2xvY2staXRlbSc+PHNwYW4gY2xhc3M9J251bSc+XCIrc2Vjb25kcytcIjwvc3Bhbj48L2Rpdj5cIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChcIi5jb3VudERvd250aW1lclwiKS5odG1sKHN0ckNvdW50RG93bik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGxvYWRDYXRlZ29yeShpZCwgdXJsLCBvcHRpb24sIHdyYXAsIGJsb2NrSWQpe1xyXG4gICAgICAgICAgICB1dGlscy5hcGkuZ2V0UGFnZSh1cmwsIG9wdGlvbiwgKGVyciwgcmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmKCF3cmFwLmZpbmQoJy5wcm9kdWN0Q2Fyb3VzZWwtc2xpZGUnKS5sZW5ndGgpe1xyXG4gICAgICAgICAgICAgICAgICAgIHdyYXAuaHRtbChyZXNwb25zZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHdyYXAucGFyZW50cygnLmhhbG8tYmxvY2tbZGF0YS1jYXRlZ29yeS13aXRoLWJhbm5lci1pZF0nKS5oYXNDbGFzcygnaGFsby1ibG9jay1wcm9kdWN0LWJhbm5lcnMnKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkKCcuaG9tZS1sYXlvdXQtMicpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHdyYXAucGFyZW50cygnLmhhbG8tYmxvY2tbZGF0YS1jYXRlZ29yeS13aXRoLWJhbm5lci1pZF0nKS5oYXNDbGFzcygnaG9tZTItZmxhc2gtZGVhbHMnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsRmxhc2hEZWFscyh3cmFwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlja0Nhcm91c2VsNCh3cmFwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWNrQ2Fyb3VzZWwzKHdyYXApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpY2tDYXJvdXNlbCh3cmFwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZih3cmFwLnBhcmVudHMoJy5oYWxvLWJsb2NrW2RhdGEtY2F0ZWdvcnktd2l0aC1iYW5uZXItaWRdJykuaGFzQ2xhc3MoJ2hhbG8tYmxvY2stcHJvZHVjdC1iYW5uZXJzMicpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpY2tDYXJvdXNlbDIod3JhcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB3cmFwLnBhcmVudHMoJy5oYWxvLWJsb2NrW2RhdGEtY2F0ZWdvcnktd2l0aC1iYW5uZXItaWRdJykuZmluZCgnLmxvYWRpbmdPdmVybGF5JykucmVtb3ZlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGhhbG9BZGRPcHRpb24oY29udGV4dCwgYmxvY2tJZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pOyBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHNsaWNrQ2Fyb3VzZWwod3JhcCl7XHJcbiAgICAgICAgICAgIHdyYXAuc2xpY2soe1xyXG4gICAgICAgICAgICAgICAgZG90czogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGFycm93czogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBpbmZpbml0ZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBtb2JpbGVGaXJzdDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMixcclxuICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG4gICAgICAgICAgICAgICAgbmV4dEFycm93OiBcIjxzdmcgY2xhc3M9J3NsaWNrLW5leHQgc2xpY2stYXJyb3cgc2xpY2stYXJyb3ctbGFyZ2UnIGFyaWEtbGFiZWw9J05leHQgU2xpZGUnPjx1c2UgeGxpbms6aHJlZj0jc2xpY2stYXJyb3ctbmV4dD48L3VzZT48L3N2Zz5cIiwgXHJcbiAgICAgICAgICAgICAgICBwcmV2QXJyb3c6IFwiPHN2ZyBjbGFzcz0nc2xpY2stcHJldiBzbGljay1hcnJvdyBzbGljay1hcnJvdy1sYXJnZScgYXJpYS1sYWJlbD0nUHJldmlvdXMgU2xpZGUnPjx1c2UgeGxpbms6aHJlZj0jc2xpY2stYXJyb3ctcHJldj48L3VzZT48L3N2Zz5cIixcclxuICAgICAgICAgICAgICAgIHJlc3BvbnNpdmU6IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiAxMDI0LFxyXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogNCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDFcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDk5MSxcclxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiA3NjcsXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gc2xpY2tDYXJvdXNlbDIod3JhcCl7XHJcbiAgICAgICAgICAgIHdyYXAuc2xpY2soe1xyXG4gICAgICAgICAgICAgICAgZG90czogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGFycm93czogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBpbmZpbml0ZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBtb2JpbGVGaXJzdDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMixcclxuICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG4gICAgICAgICAgICAgICAgbmV4dEFycm93OiBcIjxzdmcgY2xhc3M9J3NsaWNrLW5leHQgc2xpY2stYXJyb3cgc2xpY2stYXJyb3ctbGFyZ2UnIGFyaWEtbGFiZWw9J05leHQgU2xpZGUnPjx1c2UgeGxpbms6aHJlZj0jc2xpY2stYXJyb3ctbmV4dD48L3VzZT48L3N2Zz5cIiwgXHJcbiAgICAgICAgICAgICAgICBwcmV2QXJyb3c6IFwiPHN2ZyBjbGFzcz0nc2xpY2stcHJldiBzbGljay1hcnJvdyBzbGljay1hcnJvdy1sYXJnZScgYXJpYS1sYWJlbD0nUHJldmlvdXMgU2xpZGUnPjx1c2UgeGxpbms6aHJlZj0jc2xpY2stYXJyb3ctcHJldj48L3VzZT48L3N2Zz5cIixcclxuICAgICAgICAgICAgICAgIHJlc3BvbnNpdmU6IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiAxMDI0LFxyXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFycm93czogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiBwYXJzZUludChjb250ZXh0LnRoZW1lU2V0dGluZ3MuaG9tZV9wcm9kdWN0X2Jsb2NrX3dpdGhfYmFubmVyX2NvbClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDk5MSxcclxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IHBhcnNlSW50KGNvbnRleHQudGhlbWVTZXR0aW5ncy5ob21lX3Byb2R1Y3RfYmxvY2tfd2l0aF9iYW5uZXJfY29sKSAtIDFcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDc2NyxcclxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IHBhcnNlSW50KGNvbnRleHQudGhlbWVTZXR0aW5ncy5ob21lX3Byb2R1Y3RfYmxvY2tfd2l0aF9iYW5uZXJfY29sKSAtIDJcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHNsaWNrQ2Fyb3VzZWwzKHdyYXApe1xyXG4gICAgICAgICAgICB3cmFwLnNsaWNrKHtcclxuICAgICAgICAgICAgICAgIGRvdHM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBhcnJvd3M6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgaW5maW5pdGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgbW9iaWxlRmlyc3Q6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDIsXHJcbiAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcclxuICAgICAgICAgICAgICAgIG5leHRBcnJvdzogXCI8c3ZnIGNsYXNzPSdzbGljay1uZXh0IHNsaWNrLWFycm93IHNsaWNrLWFycm93LWxhcmdlJyBhcmlhLWxhYmVsPSdOZXh0IFNsaWRlJz48dXNlIHhsaW5rOmhyZWY9I3NsaWNrLWFycm93LW5leHQ+PC91c2U+PC9zdmc+XCIsIFxyXG4gICAgICAgICAgICAgICAgcHJldkFycm93OiBcIjxzdmcgY2xhc3M9J3NsaWNrLXByZXYgc2xpY2stYXJyb3cgc2xpY2stYXJyb3ctbGFyZ2UnIGFyaWEtbGFiZWw9J1ByZXZpb3VzIFNsaWRlJz48dXNlIHhsaW5rOmhyZWY9I3NsaWNrLWFycm93LXByZXY+PC91c2U+PC9zdmc+XCIsXHJcbiAgICAgICAgICAgICAgICByZXNwb25zaXZlOiBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogMTE5OSxcclxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb3RzOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiA3NjcsXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZG90czogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFycm93czogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gc2xpY2tDYXJvdXNlbDQod3JhcCl7XHJcbiAgICAgICAgICAgIHdyYXAuc2xpY2soe1xyXG4gICAgICAgICAgICAgICAgZG90czogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGFycm93czogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBpbmZpbml0ZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBtb2JpbGVGaXJzdDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMixcclxuICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG4gICAgICAgICAgICAgICAgbmV4dEFycm93OiBcIjxzdmcgY2xhc3M9J3NsaWNrLW5leHQgc2xpY2stYXJyb3cgc2xpY2stYXJyb3ctbGFyZ2UnIGFyaWEtbGFiZWw9J05leHQgU2xpZGUnPjx1c2UgeGxpbms6aHJlZj0jc2xpY2stYXJyb3ctbmV4dD48L3VzZT48L3N2Zz5cIiwgXHJcbiAgICAgICAgICAgICAgICBwcmV2QXJyb3c6IFwiPHN2ZyBjbGFzcz0nc2xpY2stcHJldiBzbGljay1hcnJvdyBzbGljay1hcnJvdy1sYXJnZScgYXJpYS1sYWJlbD0nUHJldmlvdXMgU2xpZGUnPjx1c2UgeGxpbms6aHJlZj0jc2xpY2stYXJyb3ctcHJldj48L3VzZT48L3N2Zz5cIixcclxuICAgICAgICAgICAgICAgIHJlc3BvbnNpdmU6IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiAxMTk5LFxyXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvdHM6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcnJvd3M6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogNSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDFcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDk5MixcclxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb3RzOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiA3NjcsXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZG90czogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFycm93czogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gbGFiZWxGbGFzaERlYWxzKHdyYXApIHtcclxuICAgICAgICAgICAgY29uc3QgJGl0ZW1TaWRlID0gd3JhcC5maW5kKCcucHJvZHVjdENhcm91c2VsLXNsaWRlJyk7XHJcblxyXG4gICAgICAgICAgICAkaXRlbVNpZGUuZWFjaCgoaW5kZXgsIGVsZW1lbnQpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0ICR0aGlzTGFiZWwgPSAkKGVsZW1lbnQpLmZpbmQoJy5zYWxlLWJhZGdlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCR0aGlzTGFiZWwubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbGFiZWwgPSAkdGhpc0xhYmVsLmZpbmQoJy50ZXh0JykuZGF0YSgnc2FsZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKGVsZW1lbnQpLmZpbmQoJy5jYXJkLXByaWNlJykuYWRkQ2xhc3MoJ2hhcy1sYWJlbFNhbGUnKS5hcHBlbmQoJzxkaXYgY2xhc3M9XCJjYXJkLWxhYmVsLXNhbGVcIj48c3Bhbj4tJytsYWJlbCsnPC9zcGFuPjwvZGl2PicpO1xyXG4gICAgICAgICAgICAgICAgICAgICR0aGlzTGFiZWwucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmYW5jeWJveFZpZGVvQmFubmVyKCl7XHJcbiAgICAgICAgaWYgKCQoXCIudmlkZW8tYmxvY2staW1hZ2VbZGF0YS1mYW5jeWJveF1cIikubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAkKFwiLnZpZGVvLWJsb2NrLWltYWdlW2RhdGEtZmFuY3lib3hdXCIpLmZhbmN5Ym94KHtcclxuICAgICAgICAgICAgICAgICdhdXRvRGltZW5zaW9ucyc6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgJ3BhZGRpbmcnIDogMCxcclxuICAgICAgICAgICAgICAgICd3aWR0aCcgOiA5NzAsXHJcbiAgICAgICAgICAgICAgICAnaGVpZ2h0JyA6IDYwMCxcclxuICAgICAgICAgICAgICAgICdhdXRvU2NhbGUnIDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAndHJhbnNpdGlvbkluJyA6ICdub25lJyxcclxuICAgICAgICAgICAgICAgICd0cmFuc2l0aW9uT3V0JyA6ICdub25lJ1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICgkKFwiLmJ1dHRvbi1wb3B1cC12aWRlb1tkYXRhLWZhbmN5Ym94XVwiKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICQoXCIuYnV0dG9uLXBvcHVwLXZpZGVvW2RhdGEtZmFuY3lib3hdXCIpLmZhbmN5Ym94KHtcclxuICAgICAgICAgICAgICAgICdhdXRvRGltZW5zaW9ucyc6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgJ3BhZGRpbmcnIDogMCxcclxuICAgICAgICAgICAgICAgICd3aWR0aCcgOiA5NzAsXHJcbiAgICAgICAgICAgICAgICAnaGVpZ2h0JyA6IDYwMCxcclxuICAgICAgICAgICAgICAgICdhdXRvU2NhbGUnIDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAndHJhbnNpdGlvbkluJyA6ICdub25lJyxcclxuICAgICAgICAgICAgICAgICd0cmFuc2l0aW9uT3V0JyA6ICdub25lJ1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZmFxc1RvZ2dsZSgpe1xyXG4gICAgICAgICQoJy5oYWxvLXNob3J0LWZhcXMgLmNhcmQgLnRpdGxlJykub24oJ2NsaWNrJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgJHRhcmdldCA9ICQoZXZlbnQuY3VycmVudFRhcmdldCk7XHJcblxyXG4gICAgICAgICAgICAkKCcuaGFsby1zaG9ydC1mYXFzIC5jYXJkIC50aXRsZScpLm5vdCgkdGFyZ2V0KS5yZW1vdmVDbGFzcygnY29sbGFwc2VkJyk7XHJcblxyXG4gICAgICAgICAgICBpZigkdGFyZ2V0Lmhhc0NsYXNzKCdjb2xsYXBzZWQnKSl7XHJcbiAgICAgICAgICAgICAgICAkdGFyZ2V0LnJlbW92ZUNsYXNzKCdjb2xsYXBzZWQnKTtcclxuICAgICAgICAgICAgfSBlbHNle1xyXG4gICAgICAgICAgICAgICAgJHRhcmdldC5hZGRDbGFzcygnY29sbGFwc2VkJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICQoJy5oYWxvLXNob3J0LWZhcXMgLmNhcmQnKS5lYWNoKChpbmRleCwgZWxlbWVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYoJChlbGVtZW50KS5maW5kKCcudGl0bGUnKS5oYXNDbGFzcygnY29sbGFwc2VkJykpe1xyXG4gICAgICAgICAgICAgICAgICAgICQoZWxlbWVudCkuZmluZCgnLmNvbGxhcHNlJykuc2xpZGVEb3duKFwic2xvd1wiKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAkKGVsZW1lbnQpLmZpbmQoJy5jb2xsYXBzZScpLnNsaWRlVXAoXCJzbG93XCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZWNlbnRCbG9nU2xpZGVyKCl7XHJcbiAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpIDw9IDEwMjQpIHtcclxuICAgICAgICAgICAgaWYgKCQoJy5oYWxvLXJlY2VudC1wb3N0JykubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoJCgnLmhhbG8tcmVjZW50LXBvc3QnKS5oYXNDbGFzcygnc2xpY2stc2xpZGVyJykpe1xyXG4gICAgICAgICAgICAgICAgICAgICQoJy5oYWxvLXJlY2VudC1wb3N0Jykuc2xpY2soJ3Vuc2xpY2snKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZXtcclxuICAgICAgICAgICAgaWYgKCQoJy5oYWxvLXJlY2VudC1wb3N0JykubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoISQoJy5oYWxvLXJlY2VudC1wb3N0JykuaGFzQ2xhc3MoJ3NsaWNrLXNsaWRlcicpKXtcclxuICAgICAgICAgICAgICAgICAgICAkKCcuaGFsby1yZWNlbnQtcG9zdCcpLnNsaWNrKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQod2luZG93KS5yZXNpemUoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA8PSAxMDI0KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoJCgnLmhhbG8tcmVjZW50LXBvc3QnKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoJCgnLmhhbG8tcmVjZW50LXBvc3QnKS5oYXNDbGFzcygnc2xpY2stc2xpZGVyJykpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuaGFsby1yZWNlbnQtcG9zdCcpLnNsaWNrKCd1bnNsaWNrJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKCQoJy5oYWxvLXJlY2VudC1wb3N0JykubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEkKCcuaGFsby1yZWNlbnQtcG9zdCcpLmhhc0NsYXNzKCdzbGljay1zbGlkZXInKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5oYWxvLXJlY2VudC1wb3N0Jykuc2xpY2soKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBob21lU3BlY2lhbFByb2R1Y3QoKXtcclxuICAgICAgICBjb25zdCBjb250ZXh0ID0gdGhpcy5jb250ZXh0O1xyXG5cclxuICAgICAgICBpZihjb250ZXh0LnRoZW1lU2V0dGluZ3MuaG9tZV9wcm9kdWN0X2Jsb2NrX3NwZWNpYWwgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgIHZhciBwcm9kdWN0SWQgPSAkKCdbZGF0YS1zcGVjaWFsLXByb2R1Y3QtaWRdJykuZGF0YSgnc3BlY2lhbC1wcm9kdWN0LWlkJyksXHJcbiAgICAgICAgICAgICAgICBzZXRGbGFnID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBvcHRpb25zID17XHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogJ2hhbG90aGVtZXMvcHJvZHVjdHMvaGFsby1zcGVjaWFsLXByb2R1Y3QtdG1wJ1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAkKHdpbmRvdykub24oJ3Njcm9sbCBsb2FkJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc2Nyb2xsID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpLFxyXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcl9oZWlnaHQgPSAkKCcuaGVhZGVyJykuaGVpZ2h0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHNjcm9sbCA+IGhlYWRlcl9oZWlnaHQpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXRGbGFnID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZihzZXRGbGFnKXtcclxuICAgICAgICAgICAgICAgICAgICBpZighJCgnLmhhbG8tc3BhY2lhbC1wcm9kdWN0IC5wcm9kdWN0VmlldycpLmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLmFwaS5wcm9kdWN0LmdldEJ5SWQocHJvZHVjdElkLCBvcHRpb25zLCAoZXJyLCByZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0RmxhZyA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzY29wZSA9ICcuaGFsby1zcGFjaWFsLXByb2R1Y3QnO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKCEkKHNjb3BlKS5maW5kKCcucHJvZHVjdFZpZXcnKS5sZW5ndGgpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoc2NvcGUpLmh0bWwocmVzcG9uc2UpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb2xkUHJvZHVjdCgkKHNjb3BlKS5maW5kKCcucHJvZHVjdFZpZXctc29sZFByb2R1Y3QnKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlld2luZ1Byb2R1Y3QoJChzY29wZSkuZmluZCgnLnByb2R1Y3RWaWV3LVZpZXdpbmdQcm9kdWN0JykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50RG93blByb2R1Y3QoJChzY29wZSkuZmluZCgnLnByb2R1Y3RWaWV3LWNvdW50RG93bicpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJChzY29wZSkuZmluZCgnW2RhdGEtc2xpY2tdJykuc2xpY2soKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHNjb3BlKS5maW5kKCcucHJvZHVjdFZpZXctZm9yJykuZ2V0KDApLnNsaWNrLnNldFBvc2l0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluaXRUaHVtYm5haWxzSGVpZ2h0KHNjb3BlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYWxvTm90aWZ5TWUoJChzY29wZSksIGNvbnRleHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbG9Zb3V0dWJlQ2Fyb3VzZWwoJChzY29wZSkuZmluZCgnW2RhdGEtc2xpY2tdJykpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHNjb3BlKS5vbignY2xpY2snLCAnLmRyb3Bkb3duLW1lbnUtYnV0dG9uJywgZXZlbnQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgJHRhcmdldCA9ICQoZXZlbnQuY3VycmVudFRhcmdldCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZigkdGFyZ2V0Lmhhc0NsYXNzKCdpcy1vcGVuJykpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHRhcmdldFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtb3BlbicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCBmYWxzZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHRhcmdldFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zaWJsaW5ncygnLmRyb3Bkb3duLW1lbnUnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtb3BlbicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2FyaWEtaGlkZGVuJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR0YXJnZXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLW9wZW4nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdhcmlhLWV4cGFuZGVkJywgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHRhcmdldFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zaWJsaW5ncygnLmRyb3Bkb3duLW1lbnUnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtb3BlbicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2FyaWEtaGlkZGVuJywgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoJChzY29wZSkuZmluZCgnLmRyb3Bkb3duLW1lbnUtYnV0dG9uJykuaGFzQ2xhc3MoJ2lzLW9wZW4nKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCgkKGV2ZW50LnRhcmdldCkuY2xvc2VzdCgnLmRyb3Bkb3duLW1lbnUtYnV0dG9uJykubGVuZ3RoID09PSAwKSAmJiAoJChldmVudC50YXJnZXQpLmNsb3Nlc3QoJy5kcm9wZG93bi1tZW51JykubGVuZ3RoID09PSAwKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJChzY29wZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5kcm9wZG93bi1tZW51LWJ1dHRvbicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtb3BlbicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdhcmlhLWV4cGFuZGVkJywgZmFsc2UpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHNjb3BlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmRyb3Bkb3duLW1lbnUtYnV0dG9uJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNpYmxpbmdzKCcuZHJvcGRvd24tbWVudScpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtb3BlbicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdhcmlhLWhpZGRlbicsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwcm9kdWN0RGV0YWlscyA9IG5ldyBQcm9kdWN0RGV0YWlscygkKHNjb3BlKSwgY29udGV4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvZHVjdERldGFpbHMuc2V0UHJvZHVjdFZhcmlhbnQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByb2R1Y3REZXRhaWxzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHZpZXdpbmdQcm9kdWN0KHdyYXBwZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHdyYXBwZXIubGVuZ3RoID4gMCl7IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2aWV3ZXJUZXh0ID0gY29udGV4dC50aGVtZVNldHRpbmdzLnByb2R1Y3Rfdmlld2luZ1Byb2R1Y3RfdGV4dCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVtYmVyc1ZpZXdlcl90ZXh0ID0gY29udGV4dC50aGVtZVNldHRpbmdzLnByb2R1Y3Rfdmlld2luZ1Byb2R1Y3Rfdmlld2VyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudW1iZXJzVmlld2VyTGlzdCA9ICBKU09OLnBhcnNlKFwiW1wiICsgbnVtYmVyc1ZpZXdlcl90ZXh0ICsgXCJdXCIpOyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG51bWJlcnNWaWV3ZXJJdGVtID0gKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSpudW1iZXJzVmlld2VyTGlzdC5sZW5ndGgpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdyYXBwZXIuaHRtbCgnPHN2ZyBjbGFzcz1cImljb25cIiBhcmlhLWhpZGRlbj1cInRydWVcIj48dXNlIHhsaW5rOmhyZWY9XCIjaWNvbi1leWVcIi8+PC9zdmc+JyArIG51bWJlcnNWaWV3ZXJMaXN0W251bWJlcnNWaWV3ZXJJdGVtXSArIFwiIFwiICsgdmlld2VyVGV4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdyYXBwZXIucmVtb3ZlQ2xhc3MoJ3UtaGlkZGVuVmlzdWFsbHknKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCAxMDAwMCk7ICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gY291bnREb3duUHJvZHVjdCh3cmFwcGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih3cmFwcGVyLmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb3VudERvd24gPSB3cmFwcGVyLmRhdGEoJ2NvdW50ZG93bicpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb3VudERvd25EYXRlID0gbmV3IERhdGUoY291bnREb3duKS5nZXRUaW1lKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlZnQgPSB3cmFwcGVyO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY291bnRkb3duZnVuY3Rpb24gPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5vdyA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzdGFuY2UgPSBjb3VudERvd25EYXRlIC0gbm93O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRpc3RhbmNlIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChjb3VudGRvd25mdW5jdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWZ0LnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRheXMgPSBNYXRoLmZsb29yKGRpc3RhbmNlIC8gKDEwMDAgKiA2MCAqIDYwICogMjQpKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBob3VycyA9IE1hdGguZmxvb3IoKGRpc3RhbmNlICUgKDEwMDAgKiA2MCAqIDYwICogMjQpKSAvICgxMDAwICogNjAgKiA2MCkpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pbnV0ZXMgPSBNYXRoLmZsb29yKChkaXN0YW5jZSAlICgxMDAwICogNjAgKiA2MCkpIC8gKDEwMDAgKiA2MCkpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlY29uZHMgPSBNYXRoLmZsb29yKChkaXN0YW5jZSAlICgxMDAwICogNjApKSAvIDEwMDApLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0ckNvdW50RG93biA9ICc8c3ZnIGNsYXNzPVwiaWNvblwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjx1c2UgeGxpbms6aHJlZj1cIiNpY29uLWJlbGxcIi8+PC9zdmc+PHNwYW4gY2xhc3M9XCJ0ZXh0XCI+PHNwYW4+TGltaXRlZCB0aW1lIG9mZmVyLCBlbmQgaW46PC9zcGFuPjwvc3Bhbj4gPHNwYW4gY2xhc3M9XCJudW1cIj4nK2RheXMrJ2QgOjwvc3Bhbj4gPHNwYW4gY2xhc3M9XCJudW1cIj4nK2hvdXJzKydoIDo8L3NwYW4+IDxzcGFuIGNsYXNzPVwibnVtXCI+JyttaW51dGVzKydtIDo8L3NwYW4+IDxzcGFuIGNsYXNzPVwibnVtXCI+JytzZWNvbmRzKydzPC9zcGFuPic7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VmdC5odG1sKHN0ckNvdW50RG93bik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gc29sZFByb2R1Y3Qod3JhcHBlcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYod3JhcHBlci5sZW5ndGggPiAwKXsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG51bWJlcnNQcm9kdWN0X3RleHQgPSBjb250ZXh0LnRoZW1lU2V0dGluZ3MucHJvZHVjdF9zb2xkUHJvZHVjdF9wcm9kdWN0cyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVtYmVyc0hvdXJzX3RleHQgPSBjb250ZXh0LnRoZW1lU2V0dGluZ3MucHJvZHVjdF9zb2xkUHJvZHVjdF9ob3VycyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc29sZFByb2R1Y3RUZXh0ID0gY29udGV4dC50aGVtZVNldHRpbmdzLnByb2R1Y3Rfc29sZFByb2R1Y3RfdGV4dCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc29sZFByb2R1Y3RUZXh0MiA9IGNvbnRleHQudGhlbWVTZXR0aW5ncy5wcm9kdWN0X3NvbGRQcm9kdWN0X2hvdXJzX3RleHQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBudW1iZXJzUHJvZHVjdExpc3QgPSAgSlNPTi5wYXJzZShcIltcIiArIG51bWJlcnNQcm9kdWN0X3RleHQgKyBcIl1cIiksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudW1iZXJzUHJvZHVjdEl0ZW0gPSAoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKm51bWJlcnNQcm9kdWN0TGlzdC5sZW5ndGgpKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVtYmVyc0hvdXJzTGlzdCA9ICBKU09OLnBhcnNlKFwiW1wiICsgbnVtYmVyc0hvdXJzX3RleHQgKyBcIl1cIiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bWJlcnNIb3Vyc0l0ZW0gPSAoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKm51bWJlcnNIb3Vyc0xpc3QubGVuZ3RoKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdyYXBwZXIuaHRtbCgnPHN2ZyBjbGFzcz1cImljb25cIiBhcmlhLWhpZGRlbj1cInRydWVcIj48dXNlIHhsaW5rOmhyZWY9XCIjaWNvbi1maXJlXCIvPjwvc3ZnPjxzcGFuPicgKyBudW1iZXJzUHJvZHVjdExpc3RbbnVtYmVyc1Byb2R1Y3RJdGVtXSArIFwiIFwiICsgc29sZFByb2R1Y3RUZXh0ICsgXCIgXCIgKyBudW1iZXJzSG91cnNMaXN0W251bWJlcnNIb3Vyc0l0ZW1dICsgXCIgXCIgKyBzb2xkUHJvZHVjdFRleHQyICsgJzwvc3Bhbj4nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3cmFwcGVyLnJlbW92ZUNsYXNzKCd1LWhpZGRlblZpc3VhbGx5Jykuc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiBpbml0VGh1bWJuYWlsc0hlaWdodCgkc2NvcGUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGVsID0gJCgkc2NvcGUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciAkY2Fyb3VzZWxfbmF2ID0gZWwuZmluZCgnLnByb2R1Y3RWaWV3LW5hdicpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRjYXJvdXNlbF9mb3IgPSBlbC5maW5kKCcucHJvZHVjdFZpZXctZm9yJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCRjYXJvdXNlbF9mb3IuZmluZCgnLnNsaWNrLWFycm93JykubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRjYXJvdXNlbF9mb3IucGFyZW50KCkuYWRkQ2xhc3MoJ2Fycm93cy12aXNpYmxlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRjYXJvdXNlbF9mb3IucGFyZW50KCkuYWRkQ2xhc3MoJ2Fycm93cy1kaXNhYmxlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNldEZsYWcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGhvbWVQYXJhbGxheEJhbm5lcigpe1xyXG4gICAgICAgIGlmKCQoJyNoYWxvX3BhcnJhbGF4X2Jhbm5lcnMnKS5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgdmFyIHdyYXAgPSAkKCcjaGFsb19wYXJyYWxheF9iYW5uZXJzJyksXHJcbiAgICAgICAgICAgICAgICBpbWFnZSA9IHdyYXAuZmluZCgnW2RhdGEtaW1hZ2VdJykuZGF0YSgnaW1hZ2UnKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHdyYXAuZmluZCgnW2RhdGEtaW1hZ2VdJykuY3NzKCdiYWNrZ3JvdW5kLWltYWdlJywgJ3VybCgnK2ltYWdlKycpJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGxvYWRPcHRpb25Gb3JQcm9kdWN0Q2FyZCgpe1xyXG4gICAgICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzLmNvbnRleHQ7XHJcblxyXG4gICAgICAgIGlmKCQoJy5wcm9kdWN0Q2Fyb3VzZWwnKS5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgJCgnLnByb2R1Y3RDYXJvdXNlbCcpLmVhY2goKGluZGV4LCBlbGVtZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgJHByb2RXcmFwSWQgPSAkKGVsZW1lbnQpLmF0dHIoJ2lkJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgaGFsb0FkZE9wdGlvbihjb250ZXh0LCAkcHJvZFdyYXBJZCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoJCgnLmhhbG8tYmxvY2sgLnByb2R1Y3RHcmlkJykubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgICQoJy5oYWxvLWJsb2NrIC5wcm9kdWN0R3JpZCcpLmVhY2goKGluZGV4LCBlbGVtZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgJHByb2RXcmFwSWQgPSAkKGVsZW1lbnQpLmF0dHIoJ2lkJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgaGFsb0FkZE9wdGlvbihjb250ZXh0LCAkcHJvZFdyYXBJZCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBCYW5uZXIgcGFyYWxsYXggMlxyXG4gICAgY3VzdG9tZXJSZXZpZXdDYXJvdXNlbCgpIHtcclxuICAgICAgICBpZiAoJCgnI2hhbG9fcGFycmFsYXhfYmFubmVycyAuaGFsby1yb3cnKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgaWYgKCEkKCcjaGFsb19wYXJyYWxheF9iYW5uZXJzIC5oYWxvLXJvdycpLmhhc0NsYXNzKCdzbGljay1zbGlkZXInKSkge1xyXG4gICAgICAgICAgICAgICAgJCgnI2hhbG9fcGFycmFsYXhfYmFubmVycyAuaGFsby1yb3cnKS5zbGljayh7XHJcbiAgICAgICAgICAgICAgICAgICAgZG90czogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBhcnJvd3M6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGluZmluaXRlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBtb2JpbGVGaXJzdDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBhZGFwdGl2ZUhlaWdodDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgbmV4dEFycm93OiBcIjxzdmcgY2xhc3M9J3NsaWNrLW5leHQgc2xpY2stYXJyb3cnIGFyaWEtbGFiZWw9J05leHQgU2xpZGUnPjx1c2UgeGxpbms6aHJlZj0jc2xpY2stYXJyb3ctbmV4dD48L3VzZT48L3N2Zz5cIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgcHJldkFycm93OiBcIjxzdmcgY2xhc3M9J3NsaWNrLXByZXYgc2xpY2stYXJyb3cnIGFyaWEtbGFiZWw9J1ByZXZpb3VzIFNsaWRlJz48dXNlIHhsaW5rOmhyZWY9I3NsaWNrLWFycm93LXByZXY+PC91c2U+PC9zdmc+XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2l2ZTogW1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogMTAyNCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFycm93czogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfV1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldmlld0Nhcm91c2VsKCkge1xyXG5cclxuICAgICAgICBsZXQgcHJvZHVjdElkcyA9ICQoXCJbZnVuY3Rpb249bGlzdC1wcm9kdWN0XVwiKS5kYXRhKFwiaWRzXCIpLnRvU3RyaW5nKCkuc3BsaXQoXCIsXCIpLm1hcChmdW5jdGlvblxyXG4gICAgICAgIFxyXG4gICAgICAgICAgICAoaXRlbSkge1xyXG4gICAgICAgICAgICByZXR1cm4gcGFyc2VJbnQoaXRlbSwgMTApO1xyXG5cclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyBsZXQgc3Rva2VuID0gJChcIltuYW1lPXN0b3JlLXRva2VuXVwiKS52YWwoKTtcclxuICAgICAgICBsZXQgc2t1cyA9IFsnTTEwMScsJ0hEMTExJywgJ00xMTEnLCAnSEQxMTEnLCAnTTEwNSddXHJcblxyXG4gICAgICAgICQoJyNyLXRlc3QxJykuc2xpY2soe1xyXG4gICAgICAgICAgICBcImRvdHNcIjogZmFsc2UsXHJcbiAgICAgICAgICAgIFwiYXJyb3dzXCI6IGZhbHNlLFxyXG4gICAgICAgICAgICBcImluZmluaXRlXCI6IHRydWUsXHJcbiAgICAgICAgICAgIFwiYXNOYXZGb3JcIjogXCIjci10ZXN0MlwiLFxyXG4gICAgICAgICAgICBcInN3aXBlXCI6IGZhbHNlLFxyXG4gICAgICAgICAgICBcInBhdXNlT25Gb2N1c1wiIDogZmFsc2UsXHJcbiAgICAgICAgICAgIFwicGF1c2VPbkhvdmVyXCI6IGZhbHNlLFxyXG4gICAgICAgICAgICBcImZhZGVcIjogdHJ1ZSxcclxuICAgICAgICAgICAgXCJhdXRvcGxheVwiOiB0cnVlLFxyXG4gICAgICAgICAgICBcInNsaWRlc1RvU2hvd1wiOiAxLCBcclxuICAgICAgICAgICAgXCJzbGlkZXNUb1Njcm9sbFwiOiAxXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAkKCcjci10ZXN0MycpLnNsaWNrKHtcclxuICAgICAgICAgICAgICAgIFwiZG90c1wiOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIFwiYXJyb3dzXCI6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgXCJpbmZpbml0ZVwiOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgXCJhc05hdkZvclwiOiBcIiNyLXRlc3QyXCIsXHJcbiAgICAgICAgICAgICAgICBcImF1dG9wbGF5XCI6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBcInBhdXNlT25Gb2N1c1wiIDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBcInBhdXNlT25Ib3ZlclwiOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgICAgICBcInN3aXBlXCI6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgXCJzbGlkZXNUb1Nob3dcIjogMSwgXHJcbiAgICAgICAgICAgICAgICBcInNsaWRlc1RvU2Nyb2xsXCI6IDEsICAgICAgICBcclxuICAgICAgICAgICAgICAgIFwiZmFkZVwiOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgJCgnI3ItdGVzdDInKS5zbGljayh7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJkb3RzXCI6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgXCJhcnJvd3NcIjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIFwiaW5maW5pdGVcIjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIFwic3dpcGVcIjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBcInBhdXNlT25Gb2N1c1wiIDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBcInBhdXNlT25Ib3ZlclwiOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgICAgICBcImF1dG9wbGF5XCI6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBcImFkYXB0aXZlSGVpZ2h0XCI6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBcImFzTmF2Rm9yXCI6IFwiLnJldmlld1NsaWRlclwiLFxyXG4gICAgICAgICAgICAgICAgXCJzbGlkZXNUb1Nob3dcIjogMSxcclxuICAgICAgICAgICAgICAgIFwic2xpZGVzVG9TY3JvbGxcIjogMSxcclxuICAgICAgICAgICAgICAgIFwiZmFkZVwiOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgXCJhcHBlbmRBcnJvd3NcIjogXCIjZ29rdXZpZHU2XCJcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICQoJyNyZXZpZXdibG9jazEnKS5zbGljayh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZG90c1wiOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJhcnJvd3NcIjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXVzZU9uRm9jdXNcIiA6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXVzZU9uSG92ZXJcIjogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImluZmluaXRlXCI6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwic3dpcGVcIjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYXV0b3BsYXlcIjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJhc05hdkZvclwiOiBcIi5yZXZpZXdTbGlkZXJcIixcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYWRhcHRpdmVIZWlnaHRcIjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJzbGlkZXNUb1Nob3dcIjogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJzbGlkZXNUb1Njcm9sbFwiOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIm5leHRBcnJvd1wiOiBcIjxzdmcgaWQ9c2xpY2stbmV4dCBjbGFzcz1zbGljay1uZXh0IHRlc3QxIHNsaWNrLWFycm93IGFyaWEtbGFiZWw9TmV4dCBTbGlkZT48dXNlIHhsaW5rOmhyZWY9I3NsaWNrLWFycm93LW5leHQ+PC91c2U+PC9zdmc+XCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInByZXZBcnJvd1wiOiBcIjxzdmcgY2xhc3M9c2xpY2stcHJldiBzbGljay1hcnJvdyBhcmlhLWxhYmVsPVByZXZpb3VzIFNsaWRlPjx1c2UgeGxpbms6aHJlZj0jc2xpY2stYXJyb3ctcHJldj48L3VzZT48L3N2Zz5cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJhcHBlbmRBcnJvd3NcIjogXCIjYXJyMVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNrdXMubWFwKChpdGVtLCBpKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZXYgPVtdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBmZXRjaChgaHR0cHM6Ly9zaHAtd2Vic2VydmVyLmdsaXRjaC5tZS9nZXQtdGVhbWRlc2tgLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIFwidGFibGVcIjogXCJJbnZlbnRvcnlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgXCJmaWx0ZXJcIjpgQW55KFtTS1VdLCAnJHtpdGVtfScpYFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gLnRoZW4ocj0+IHIuanNvbigpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gLnRoZW4ocj0+IGNvbnNvbGUubG9nKHIpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmV0Y2goYGh0dHBzOi8vc2hwLXdlYnNlcnZlci5nbGl0Y2gubWUvZ2V0LXRlYW1kZXNrYCwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRhYmxlXCI6IFwiUmV2aWV3XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwib3B0aW9uc1wiOmA/ZmlsdGVyPVtQcm9kdWN0IFNLVV09ICcke2l0ZW19J2BcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKHI9PiByLmpzb24oKSlcclxuICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKHI9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgci5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldi5wdXNoKGl0ZW1bJ1JldmlldyByYXRlJ10pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZXZpZXdBdmcgPSBNYXRoLnJvdW5kKChyZXYucmVkdWNlKChhLGIgKSA9PiBhKyBiLCAwKS9yZXYubGVuZ3RoKSAqIDEwKS8xMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb250ZW50ID0gYDxzdHlsZT4gICAgLmNoZWNrZWQge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogcmdiKDI1NSwgMjEwLCAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmEtc3Rhci1vIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogcmdiKDI1NSwgMjEwLCAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmEge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvbnQtc2l6ZToyMHB4ICFpbXBvcnRhbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBAbWVkaWEgKG1pbi13aWR0aDogNzY4cHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucHJvZHVjdFJldmlldzIge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEBtZWRpYSAobWluLXdpZHRoOiAxMDI1cHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucHJvZHVjdFJldmlldzIge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiB1bnNldDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBAbWVkaWEgKG1pbi13aWR0aDogMTQwMHB4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnByb2R1Y3RSZXZpZXcyIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3N0eWxlPlxyXG4gICAgICAgICAgICAgICAgPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIGhyZWY9XCJodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9mb250LWF3ZXNvbWUvNC43LjAvY3NzL2ZvbnQtYXdlc29tZS5taW4uY3NzXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmYSBmYS1zdGFyYCsoMC41IDw9IHJldmlld0F2Zz8gJyBjaGVja2VkJzogJyBmYS1zdGFyLW8nKSArIGBcIj48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmYSBmYS1zdGFyYCsoMS41IDw9IHJldmlld0F2Zz8gJyBjaGVja2VkJzogJyBmYS1zdGFyLW8nKSArIGBcIj48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmYSBmYS1zdGFyYCsoMi41IDw9IHJldmlld0F2Zz8gJyBjaGVja2VkJzogJyBmYS1zdGFyLW8nKSArIGBcIj48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmYSBmYS1zdGFyYCsoMy41IDw9IHJldmlld0F2Zz8gJyBjaGVja2VkJzogJyBmYS1zdGFyLW8nKSArIGBcIj48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmYSBmYS1zdGFyYCsoNC41IDw9IHJldmlld0F2Zz8gJyBjaGVja2VkJzogJyBmYS1zdGFyLW8nKSArIGBcIj48L3NwYW4+ICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPVwicGFkZGluZy1sZWZ0OjVweDtjb2xvcjojNWE1YTVhO1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR7cmV2Lmxlbmd0aH0gUmVzZcOxYXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PmBcclxuICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcudmlkdWplbicpLmVxKGkpLmh0bWwoY29udGVudClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcudmlkdWplbjEnKS5lcShpKS5odG1sKGNvbnRlbnQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCQoJy50aGluZ0lXYW50JykpXHJcbiAgICAvLyAgICAgZmV0Y2goJy9ncmFwaHFsJywge1xyXG5cclxuICAgIC8vICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAvLyAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgIC8vICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgLy8gICAgICAgICAgICdBdXRob3JpemF0aW9uJzogYEJlYXJlciAke3N0b2tlbn1gXHJcbiAgICAvLyAgICAgICAgIH0sXHJcbiAgICAvLyAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgXHJcbiAgICAvLyAgICAgICAgICAgICBxdWVyeTogYFxyXG4gICAgLy8gICAgICAgICAgICAgcXVlcnkgcHJvZHVjdHNCeUlkIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICBzaXRlIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgcHJvZHVjdHMgIChlbnRpdHlJZHM6IFske3Byb2R1Y3RJZHN9XSkgeyAgICBcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIGVkZ2VzIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2t1ICAgICAgICAgICAgICAgICAgICBcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZVxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZGRUb0NhcnRVcmxcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF0aFxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZFxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbnRpdHlJZFxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnZlbnRvcnkge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNJblN0b2NrXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJpY2VzIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByaWNlIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZVxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbmN5Q29kZVxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2FsZVByaWNlIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi5Nb25leUZpZWxkc1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyYW5kIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZVxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEltYWdlIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybCAod2lkdGg6IDIwMClcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9kdWN0T3B0aW9ucyB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLk9wdGlvbkZpZWxkc1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ICAgICAgICAgXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICAgICAgZnJhZ21lbnQgTW9uZXlGaWVsZHMgb24gTW9uZXkge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIHZhbHVlXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgY3VycmVuY3lDb2RlXHJcbiAgICAvLyAgICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgICAgICBmcmFnbWVudCBPcHRpb25GaWVsZHMgb24gUHJvZHVjdE9wdGlvbkNvbm5lY3Rpb24ge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIGVkZ2VzIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgbm9kZSB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICBlbnRpdHlJZFxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheU5hbWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIC4uLiBvbiBNdWx0aXBsZUNob2ljZU9wdGlvbiB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVzIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWRnZXMge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZSB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW50aXR5SWRcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgICAgICB9YCAgICAgICAgICAgICAgICBcclxuICAgIC8vICAgICAgICAgfSlcclxuICAgIC8vICAgICB9KVxyXG4gICAgLy8gICAgIC50aGVuKHI9PnIuanNvbigpKVxyXG4gICAgLy8gICAgIC50aGVuKHI9PiB7XHJcbiAgICAvLyAgICAgICAgIGlmIChyLmRhdGEpIHtcclxuICAgIC8vICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHIuZGF0YS5zaXRlLnByb2R1Y3RzLmVkZ2VzKVxyXG4gICAgLy8gICAgICAgICAgICAgbGV0IGNvbnRlbnQ9XCJcIjtcclxuICAgIC8vICAgICAgICAgICAgIGxldCBjb250ZW50MT1cIlwiO1xyXG4gICAgLy8gICAgICAgICAgICAgY29uc3Qgc2t1cz1bXVxyXG4gICAgLy8gICAgICAgICAgICAgY29uc3QgZmlsdGVyQXJyID0gci5kYXRhLnNpdGUucHJvZHVjdHMuZWRnZXNcclxuICAgIC8vICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGZpbHRlckFycilcclxuICAgIC8vICAgICAgICAgICAgICQoJy50aGluZ0lXYW50JykuZWFjaCgoaSxpdGVtMSkgPT4ge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGl0ZW0xKVxyXG4gICAgLy8gICAgICAgICAgICAgICAgIGZpbHRlckFyci5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIGlmKGl0ZW0ubm9kZS5lbnRpdHlJZCA9PSBwYXJzZUludChpdGVtMS52YWx1ZSkpIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGl0ZW0pXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgICAgIH0pXHJcbiAgICAvLyAgICAgICAgIH0pXHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gfSlcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIHNrdXMucHVzaChpdGVtLm5vZGUuc2t1KVxyXG4gICAgICAgIC8vICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGl0ZW0ubm9kZS5za3UpXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgY29udGVudCArPSBgXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICA8YSBjbGFzcz1yLWl0ZW0gaHJlZj0ke2l0ZW0ubm9kZS5wYXRofT5cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz0ke2l0ZW0ubm9kZS5kZWZhdWx0SW1hZ2UudXJsfT5cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0ndmlkdWplbic+PC9kaXY+XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPXItbmFtZSBzdHlsZT1cIi13ZWJraXQtYm94LW9yaWVudDogdmVydGljYWxcIj4ke2l0ZW0ubm9kZS5uYW1lfTwvZGl2PlxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1yLXByaWNlPiR7aXRlbS5ub2RlLnByaWNlcy5wcmljZS52YWx1ZX0sMDDigqw8L2Rpdj5cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBgXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGNvbnRlbnQxICs9IGBcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgPGEgY2xhc3M9ci1pdGVtIGhyZWY9JHtpdGVtLm5vZGUucGF0aH0+XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPSR7aXRlbS5ub2RlLmRlZmF1bHRJbWFnZS51cmx9PlxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9J3ZpZHVqZW4xJz48L2Rpdj5cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1yLW5hbWUgc3R5bGU9XCItd2Via2l0LWJveC1vcmllbnQ6IHZlcnRpY2FsXCI+JHtpdGVtLm5vZGUubmFtZX08L2Rpdj5cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1yLXByaWNlPiR7aXRlbS5ub2RlLnByaWNlcy5wcmljZS52YWx1ZX0sMDDigqw8L2Rpdj5cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgYFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgfSlcclxuICAgICAgICAvLyAgICAgICAgIH0pXHJcblxyXG4gICAgICAgIC8vICAgICAgICAgJChcIiNyLXRlc3QxXCIpLmh0bWwoY29udGVudClcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgJCgnI3ItdGVzdDEnKS5zbGljayh7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBcImRvdHNcIjogZmFsc2UsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBcImFycm93c1wiOiBmYWxzZSxcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIFwiaW5maW5pdGVcIjogdHJ1ZSxcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIFwiYXNOYXZGb3JcIjogXCIjci10ZXN0MlwiLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgXCJzd2lwZVwiOiBmYWxzZSxcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIFwicGF1c2VPbkZvY3VzXCIgOiBmYWxzZSxcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIFwicGF1c2VPbkhvdmVyXCI6IGZhbHNlLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgXCJmYWRlXCI6IHRydWUsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBcImF1dG9wbGF5XCI6IHRydWUsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBcInNsaWRlc1RvU2hvd1wiOiAxLCBcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIFwic2xpZGVzVG9TY3JvbGxcIjogMVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAvLyAgICAgICAgICAgICAkKFwiI3ItdGVzdDNcIikuaHRtbChjb250ZW50MSlcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICQoJyNyLXRlc3QzJykuc2xpY2soe1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIFwiZG90c1wiOiBmYWxzZSxcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICBcImFycm93c1wiOiBmYWxzZSxcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICBcImluZmluaXRlXCI6IHRydWUsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgXCJhc05hdkZvclwiOiBcIiNyLXRlc3QyXCIsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgXCJhdXRvcGxheVwiOiB0cnVlLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIFwicGF1c2VPbkZvY3VzXCIgOiBmYWxzZSxcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIFwicGF1c2VPbkhvdmVyXCI6IGZhbHNlLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIFwic3dpcGVcIjogZmFsc2UsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgXCJzbGlkZXNUb1Nob3dcIjogMSwgXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgXCJzbGlkZXNUb1Njcm9sbFwiOiAxLCAgICAgICAgXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgXCJmYWRlXCI6IHRydWVcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICQoJyNyLXRlc3QyJykuc2xpY2soe1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRvdHNcIjogZmFsc2UsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgXCJhcnJvd3NcIjogdHJ1ZSxcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICBcImluZmluaXRlXCI6IHRydWUsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgXCJzd2lwZVwiOiBmYWxzZSxcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICBcInBhdXNlT25Gb2N1c1wiIDogZmFsc2UsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBcInBhdXNlT25Ib3ZlclwiOiBmYWxzZSxcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICBcImF1dG9wbGF5XCI6IHRydWUsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgXCJhZGFwdGl2ZUhlaWdodFwiOiB0cnVlLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXNOYXZGb3JcIjogXCIucmV2aWV3U2xpZGVyXCIsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgXCJzbGlkZXNUb1Nob3dcIjogMSxcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICBcInNsaWRlc1RvU2Nyb2xsXCI6IDEsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgXCJmYWRlXCI6IHRydWUsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgXCJhcHBlbmRBcnJvd3NcIjogXCIjZ29rdXZpZHU2XCJcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnI3Jldmlld2Jsb2NrMScpLnNsaWNrKHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZG90c1wiOiBmYWxzZSxcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXJyb3dzXCI6IHRydWUsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBhdXNlT25Gb2N1c1wiIDogZmFsc2UsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBcInBhdXNlT25Ib3ZlclwiOiBmYWxzZSxcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaW5maW5pdGVcIjogdHJ1ZSxcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3dpcGVcIjogZmFsc2UsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImF1dG9wbGF5XCI6IHRydWUsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFzTmF2Rm9yXCI6IFwiLnJldmlld1NsaWRlclwiLFxyXG5cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYWRhcHRpdmVIZWlnaHRcIjogdHJ1ZSxcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2xpZGVzVG9TaG93XCI6IDEsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNsaWRlc1RvU2Nyb2xsXCI6IDEsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm5leHRBcnJvd1wiOiBcIjxzdmcgaWQ9c2xpY2stbmV4dCBjbGFzcz1zbGljay1uZXh0IHRlc3QxIHNsaWNrLWFycm93IGFyaWEtbGFiZWw9TmV4dCBTbGlkZT48dXNlIHhsaW5rOmhyZWY9I3NsaWNrLWFycm93LW5leHQ+PC91c2U+PC9zdmc+XCIsIFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwcmV2QXJyb3dcIjogXCI8c3ZnIGNsYXNzPXNsaWNrLXByZXYgc2xpY2stYXJyb3cgYXJpYS1sYWJlbD1QcmV2aW91cyBTbGlkZT48dXNlIHhsaW5rOmhyZWY9I3NsaWNrLWFycm93LXByZXY+PC91c2U+PC9zdmc+XCIsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFwcGVuZEFycm93c1wiOiBcIiNhcnIxXCJcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgLy8gICAgICAgICBza3VzLm1hcCgoaXRlbSwgaSkgPT4ge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIGNvbnN0IHJldiA9W11cclxuICAgICAgICAvLyAgICAgICAgICAgICBmZXRjaChgaHR0cHM6Ly9zaHAtd2Vic2VydmVyLmdsaXRjaC5tZS9nZXQtdGVhbWRlc2tgLCB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBcInRhYmxlXCI6IFwiUmV2aWV3XCIsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBcIm9wdGlvbnNcIjpgP2ZpbHRlcj1bUHJvZHVjdCBTS1VdPSAnJHtpdGVtfSdgXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgfSlcclxuICAgICAgICAvLyAgICAgICAgICAgICAudGhlbihyPT4gci5qc29uKCkpXHJcblxyXG4gICAgICAgIC8vICAgICAgICAgICAgIC50aGVuKHI9PiB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIHIuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgcmV2LnB1c2goaXRlbVsnUmV2aWV3IHJhdGUnXSlcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgY29uc3QgcmV2aWV3QXZnID0gTWF0aC5yb3VuZCgocmV2LnJlZHVjZSgoYSxiICkgPT4gYSsgYiwgMCkvcmV2Lmxlbmd0aCkgKiAxMCkvMTBcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgdmFyIGNvbnRlbnQgPSBgPHN0eWxlPiAgICAuY2hlY2tlZCB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBjb2xvcjogcmdiKDI1NSwgMjEwLCAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIC8vICAgICAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgICAgICAuZmEtc3Rhci1vIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgY29sb3I6IHJnYigyNTUsIDIxMCwgMCk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAvLyAgICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgLmZhIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgZm9udC1zaXplOjIwcHggIWltcG9ydGFudDtcclxuICAgICAgICAvLyAgICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgQG1lZGlhIChtaW4td2lkdGg6IDc2OHB4KSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIC5wcm9kdWN0UmV2aWV3MiB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICAgICAgICAgIEBtZWRpYSAobWluLXdpZHRoOiAxMDI1cHgpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgLnByb2R1Y3RSZXZpZXcyIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IHVuc2V0O1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICAgICAgICAgIEBtZWRpYSAobWluLXdpZHRoOiAxNDAwcHgpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgLnByb2R1Y3RSZXZpZXcyIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgPC9zdHlsZT5cclxuICAgICAgICAvLyA8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgaHJlZj1cImh0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL2ZvbnQtYXdlc29tZS80LjcuMC9jc3MvZm9udC1hd2Vzb21lLm1pbi5jc3NcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIDxzcGFuPlxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZhIGZhLXN0YXJgKygwLjUgPD0gcmV2aWV3QXZnPyAnIGNoZWNrZWQnOiAnIGZhLXN0YXItbycpICsgYFwiPjwvc3Bhbj5cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmYSBmYS1zdGFyYCsoMS41IDw9IHJldmlld0F2Zz8gJyBjaGVja2VkJzogJyBmYS1zdGFyLW8nKSArIGBcIj48L3NwYW4+XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZmEgZmEtc3RhcmArKDIuNSA8PSByZXZpZXdBdmc/ICcgY2hlY2tlZCc6ICcgZmEtc3Rhci1vJykgKyBgXCI+PC9zcGFuPlxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZhIGZhLXN0YXJgKygzLjUgPD0gcmV2aWV3QXZnPyAnIGNoZWNrZWQnOiAnIGZhLXN0YXItbycpICsgYFwiPjwvc3Bhbj5cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmYSBmYS1zdGFyYCsoNC41IDw9IHJldmlld0F2Zz8gJyBjaGVja2VkJzogJyBmYS1zdGFyLW8nKSArIGBcIj48L3NwYW4+ICAgICAgXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgIC8vICAgICAgICAgICAgIDxkaXYgc3R5bGU9XCJwYWRkaW5nLWxlZnQ6NXB4O2NvbG9yOiM1YTVhNWE7XCI+XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICR7cmV2Lmxlbmd0aH0gUmVzZcOxYXNcclxuICAgICAgICAvLyAgICAgICAgICAgICA8L2Rpdj5gXHJcblxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAkKCcudmlkdWplbicpLmVxKGkpLmh0bWwoY29udGVudClcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgJCgnLnZpZHVqZW4xJykuZXEoaSkuaHRtbChjb250ZW50KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgIFxyXG4gICAgICAgIC8vICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICB9KTtcclxuICAgICAgICAvLyAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vIH0pXHJcblxyXG5cclxuICAgICAgICAkKCcuYXJyMSAuc2xpY2stcHJldicpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJCgnI3ItdGVzdDEnKS5zbGljayhcInNsaWNrUHJldlwiKTtcclxuICAgICAgICAgICAgJCgnI3ItdGVzdDInKS5zbGljayhcInNsaWNrUHJldlwiKVxyXG4gICAgICAgICAgICAkKCcjci10ZXN0MycpLnNsaWNrKFwic2xpY2tQcmV2XCIpXHJcblxyXG4gICAgfSk7XHJcbiAgICAkKCcuYXJyMSAuc2xpY2stbmV4dCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkKCcjci10ZXN0MScpLnNsaWNrKFwic2xpY2tOZXh0XCIpO1xyXG4gICAgICAgICQoJyNyLXRlc3QyJykuc2xpY2soXCJzbGlja05leHRcIilcclxuICAgICAgICAkKCcjci10ZXN0MycpLnNsaWNrKFwic2xpY2tOZXh0XCIpXHJcblxyXG4gICAgfSk7XHJcbiAgICAkKCcuYXJyNCAuc2xpY2stcHJldicpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyAkKCcjci10ZXN0MScpLnNsaWNrKFwic2xpY2tQcmV2XCIpO1xyXG4gICAgICAgICQoJyNyLXRlc3QyJykuc2xpY2soXCJzbGlja1ByZXZcIilcclxuICAgICAgICAkKCcjci10ZXN0MycpLnNsaWNrKFwic2xpY2tQcmV2XCIpXHJcblxyXG59KTtcclxuJCgnLmFycjQgLnNsaWNrLW5leHQgLnNsaWNrLWFycm93Jykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgY29uc29sZS5sb2coJ2hvaScpXHJcbiAgICAvLyAkKCcjci10ZXN0MScpLnNsaWNrKFwic2xpY2tOZXh0XCIpO1xyXG4gICAgJCgnI3ItdGVzdDInKS5zbGljayhcInNsaWNrTmV4dFwiKVxyXG4gICAgJCgnI3ItdGVzdDMnKS5zbGljayhcInNsaWNrTmV4dFwiKVxyXG5cclxufSk7XHJcbiAgICB9XHJcbiAgICBob21lUHJvZHVjdFJlY29tbWVuZGVkKCkge1xyXG4gICAgICAgIGNvbnN0ICRob21lUEdGID0gJCgnLmhvbWUyLWJsb2NrLXJlY29tbWVuZGVkJyk7XHJcbiAgICAgICAgY29uc3QgJGhvbWVQR0ZfZ3JpZCA9ICRob21lUEdGLmZpbmQoJy5wcm9kdWN0R3JpZCcpO1xyXG4gICAgICAgIGNvbnN0IGhvbWVQR0ZfaXRlbUxlbmd0aCA9ICRob21lUEdGX2dyaWQuZmluZCgnLnByb2R1Y3QnKS5sZW5ndGg7XHJcbiAgICAgICAgY29uc3QgJGhvbWVQR0ZfYnRuQmxvY2sgPSAkKCcuaG9tZVBHRl9idG4nKTtcclxuICAgICAgICBjb25zdCAkaG9tZVBHRl9idG4gPSAkKCcuaG9tZVBHRl9idG4gYScpO1xyXG4gICAgICAgIGNvbnN0IGRhdGFDb2x1bW4gPSAkaG9tZVBHRl9ncmlkLmRhdGEoJ2NvbHVtbnMnKTtcclxuICAgICAgICBsZXQgdHRfcHJvZHVjdFNob3c7XHJcblxyXG4gICAgICAgIGlmICgkaG9tZVBHRi5sZW5ndGggJiYgaG9tZVBHRl9pdGVtTGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBjb25zdCBmV2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcclxuXHJcbiAgICAgICAgICAgIGlmIChmV2lkdGggPiAxMjc5ICYmIGhvbWVQR0ZfaXRlbUxlbmd0aCA+IDEwKSB7XHJcbiAgICAgICAgICAgICAgICAkaG9tZVBHRl9idG5CbG9jay5hZGRDbGFzcygnaXMtc2hvdycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGZXaWR0aCA8PSAxMjc5ICYmIGZXaWR0aCA+IDk5MSAmJiBob21lUEdGX2l0ZW1MZW5ndGggPiA4KSB7XHJcbiAgICAgICAgICAgICAgICAkaG9tZVBHRl9idG5CbG9jay5hZGRDbGFzcygnaXMtc2hvdycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGZXaWR0aCA8PSA5OTEgJiYgZldpZHRoID4gNzY3ICYmIGhvbWVQR0ZfaXRlbUxlbmd0aCA+IDYpIHtcclxuICAgICAgICAgICAgICAgICRob21lUEdGX2J0bkJsb2NrLmFkZENsYXNzKCdpcy1zaG93Jyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoZldpZHRoIDw9IDc2NyAmJiBob21lUEdGX2l0ZW1MZW5ndGggPiA0KSB7XHJcbiAgICAgICAgICAgICAgICAkaG9tZVBHRl9idG5CbG9jay5hZGRDbGFzcygnaXMtc2hvdycpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAkaG9tZVBHRl9idG4ub24oJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHdXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh3V2lkdGggPiAxMjc5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHRfcHJvZHVjdFNob3cgPSAxMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHdXaWR0aCA8PSAxMjc5ICYmIHdXaWR0aCA+IDk5MSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHR0X3Byb2R1Y3RTaG93ID0gODtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHdXaWR0aCA8PSA5OTEgJiYgd1dpZHRoID4gNzY3KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHRfcHJvZHVjdFNob3cgPSA2O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHRfcHJvZHVjdFNob3cgPSA0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkaG9tZVBHRl9ncmlkLmZpbmQoJy5wcm9kdWN0OmhpZGRlbicpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAkaG9tZVBHRl9ncmlkLmZpbmQoJy5wcm9kdWN0OmhpZGRlbjpsdCgnK3R0X3Byb2R1Y3RTaG93KycpJykuY3NzKCdkaXNwbGF5JywgJ2lubGluZS1ibG9jaycpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoJGhvbWVQR0ZfZ3JpZC5maW5kKCcucHJvZHVjdDpoaWRkZW4nKS5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkaG9tZVBHRl9idG4udGV4dCgnTm8gTW9yZSBQcm9kdWN0cycpLmF0dHIoJ2Rpc2FibGVkJywgJycpLmFkZENsYXNzKCdkaXNhYmxlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==