(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[9],{

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

/***/ "./assets/js/theme/halothemes/haloProductLookbook.js":
/*!***********************************************************!*\
  !*** ./assets/js/theme/halothemes/haloProductLookbook.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");

/* harmony default export */ __webpack_exports__["default"] = (function (context, el) {
  var $popup = $('.lookbook-popup');
  var $el = el;
  var $options = {
    template: 'halothemes/products/halo-lookbook-tmp'
  };
  $el.find('.item .item-point').on('click', function (event) {
    $popup.removeClass('is-open').empty();
    var $prodId = $(event.target).data('product-id'),
      position = $(event.target).offset(),
      container = $el.offset();
    if ($prodId != undefined) {
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["default"].api.product.getById($prodId, $options, function (err, response) {
        if (err) {
          return false;
        }
        $popup.html(response);
      });
      if ($(window).width() >= 551) {
        $popup.css({
          'top': position.top - container.top - 100,
          'left': position.left - container.left + 30
        });
      } else {
        $popup.css({
          'top': position.top - container.top + 15,
          'left': 15
        });
      }
      $popup.addClass("is-open");
    }
  });
  $(document).on('click', '.close-product', function (event) {
    event.preventDefault();
    if ($popup.hasClass("is-open")) {
      $popup.removeClass("is-open");
    }
  });
  $(document).on('click', function (event) {
    if ($popup.hasClass("is-open")) {
      if ($(event.target).closest($popup).length === 0 && $(event.target).closest('.item .item-point').length === 0) {
        $popup.removeClass("is-open");
      }
    }
  });
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/page.js":
/*!*********************************!*\
  !*** ./assets/js/theme/page.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Page; });
/* harmony import */ var _halothemes_jquery_fancybox_min__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./halothemes/jquery.fancybox.min */ "./assets/js/theme/halothemes/jquery.fancybox.min.js");
/* harmony import */ var _halothemes_jquery_fancybox_min__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_halothemes_jquery_fancybox_min__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./page-manager */ "./assets/js/theme/page-manager.js");
/* harmony import */ var _halothemes_haloProductLookbook__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./halothemes/haloProductLookbook */ "./assets/js/theme/halothemes/haloProductLookbook.js");
/* harmony import */ var _halothemes_haloAddOptionForProductCard__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./halothemes/haloAddOptionForProductCard */ "./assets/js/theme/halothemes/haloAddOptionForProductCard.js");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





var Page = /*#__PURE__*/function (_PageManager) {
  _inheritsLoose(Page, _PageManager);
  function Page(context) {
    return _PageManager.call(this, context) || this;
  }
  var _proto = Page.prototype;
  _proto.onReady = function onReady() {
    this.faqsPage();
    this.faqsToggle();
    this.portfolioPage();
    Object(_halothemes_haloAddOptionForProductCard__WEBPACK_IMPORTED_MODULE_4__["default"])(this.context);
    Object(_halothemes_haloProductLookbook__WEBPACK_IMPORTED_MODULE_3__["default"])(this.context, $('.halo-lookbook-slider'));
    this.lookbookCarousel();
    this.portfolioCustomCarousel();
  };
  _proto.faqsPage = function faqsPage() {
    $('.faq-desc').appendTo('.page-normal .page-description');
  };
  _proto.portfolioPage = function portfolioPage() {
    $('.halo-image-portfolio .item:hidden').slice(0, 6).css('display', 'inline-block');
    if ($('.halo-image-portfolio .item').length > 6) {
      $('.halo-image-portfolio').append('<div class="halo-infinite-portfolio"><div class="button button--transparent">Load More</div></div>');
    }
    $('.halo-infinite-portfolio .button').on('click', function (event) {
      event.preventDefault();
      $('.halo-image-portfolio .item:hidden').slice(0, 6).css('display', 'inline-block');
      if ($(".halo-image-portfolio .item:hidden").length == 0) {
        $('.halo-infinite-portfolio .button').addClass('disable').text('No more items');
      }
    });
    if ($('.page-portfolio .page-sidebar-mobile').length > 0) {
      $('.page-portfolio .page-sidebar-mobile').append('<svg class="icon"><use xlink:href="#icon-sidebar"></use></svg>');
    }
    $('.halo-image-portfolio .item').each(function (index, element) {
      if ($('.external-link', element).length > 0) {
        $('.external-link', element).append('<svg class="icon"><use xlink:href="#icon-external-link"></use></svg>');
      }
    });
  };
  _proto.faqsToggle = function faqsToggle() {
    $('.page-normal .card .title').on('click', function (event) {
      event.preventDefault();
      var $target = $(event.currentTarget);
      $('.page-normal .card .title').not($target).removeClass('collapsed');
      if ($target.hasClass('collapsed')) {
        $target.removeClass('collapsed');
      } else {
        $target.addClass('collapsed');
      }
      $('.page-normal .card').each(function (index, element) {
        if ($('.title', element).hasClass('collapsed')) {
          $(element).find('.collapse').slideDown("slow");
        } else {
          $(element).find('.collapse').slideUp("slow");
        }
      });
    });
  }

  //Lookbook page
  ;
  _proto.lookbookCarousel = function lookbookCarousel() {
    if ($('.halo-lookbook-slider').length) {
      if (!$('.halo-lookbook-slider').hasClass('slick-slider')) {
        $('.halo-lookbook-slider').slick({
          dots: true,
          arrows: false,
          mobileFirst: true,
          adaptiveHeight: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          lazyLoad: 'anticipated',
          nextArrow: "<svg class='slick-next slick-arrow slick-arrow-large' aria-label='Next Slide'><use xlink:href=#slick-arrow-next></use></svg>",
          prevArrow: "<svg class='slick-prev slick-arrow slick-arrow-large' aria-label='Previous Slide'><use xlink:href=#slick-arrow-prev></use></svg>",
          responsive: [{
            breakpoint: 1024,
            settings: {
              dots: false,
              arrows: true
            }
          }]
        });
      }
    }
  }

  // Portfolio page
  ;
  _proto.portfolioCustomCarousel = function portfolioCustomCarousel() {
    if ($('.halo-portfolio-custom .halo-row').length) {
      if (!$('.halo-portfolio-custom .halo-row').hasClass('slick-slider')) {
        $('.halo-portfolio-custom .halo-row').slick({
          dots: true,
          arrows: false,
          mobileFirst: true,
          infinite: false,
          adaptiveHeight: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          lazyLoad: 'anticipated',
          nextArrow: "<svg class='slick-next slick-arrow slick-arrow-large' aria-label='Next Slide'><use xlink:href=#slick-arrow-next></use></svg>",
          prevArrow: "<svg class='slick-prev slick-arrow slick-arrow-large' aria-label='Previous Slide'><use xlink:href=#slick-arrow-prev></use></svg>",
          responsive: [{
            breakpoint: 1024,
            settings: {
              dots: false,
              arrows: true
            }
          }]
        });
      }
    }
  };
  return Page;
}(_page_manager__WEBPACK_IMPORTED_MODULE_2__["default"]);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvaGFsb3RoZW1lcy9oYWxvQWRkT3B0aW9uRm9yUHJvZHVjdENhcmQuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3RoZW1lL2hhbG90aGVtZXMvaGFsb1Byb2R1Y3RMb29rYm9vay5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvcGFnZS5qcyJdLCJuYW1lcyI6WyJmZXRjaCIsInJlcXVpcmUiLCJjb250ZXh0Iiwid3JhcHBlciIsInRoZW1lU2V0dGluZ3MiLCJoYWxvQWRkT3B0aW9uRm9yUHJvZHVjdCIsImNhbGxQcm9kdWN0T3B0aW9uIiwicHJvZHVjdF9jbGFzcyIsImVhY2giLCJpbmRleCIsImVsZW1lbnQiLCJwcm9kdWN0SWQiLCIkIiwiZGF0YSIsImxpc3QiLCJwdXNoIiwidG9TdHJpbmciLCJsZW5ndGgiLCJnZXRQcm9kdWN0T3B0aW9uIiwidGhlbiIsInJlbmRlck9wdGlvbiIsImlkeCIsIml0ZW0iLCJhcnIiLCJwcm9kdWN0X3dyYXBwZXIiLCJmaW5kIiwidHh0IiwicmVtb3ZlIiwiY291bnRNb3JlT3B0aW9uIiwicHJvZHVjdExpbmsiLCJhdHRyIiwiYXBwZW5kIiwibWV0aG9kIiwiaGVhZGVycyIsInRva2VuIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJxdWVyeSIsInJlcyIsImpzb24iLCJhRmlsdGVyIiwic2l0ZSIsInByb2R1Y3RzIiwiZWRnZXMiLCJub2RlIiwiZW50aXR5SWQiLCJwcm9kdWN0RmllbGRDb2xvciIsInByb2R1Y3RGaWVsZFNpemUiLCJhRmlsdGVyMiIsInByb2R1Y3RPcHRpb25zIiwiYUZpbHRlcjMiLCJmaWx0ZXIiLCJkaXNwbGF5U3R5bGUiLCJhRmlsdGVyNSIsImRpc3BsYXlOYW1lIiwiaGFsb0FkZE9wdGlvbkZvclByb2R1Y3QyIiwiYUZpbHRlcjQiLCJ2YWx1ZXMiLCJ0aXRsZVZhciIsImxhYmVsIiwiaWRWYXIiLCJsZW5ndGhDb2xvclZhciIsImhleENvbG9ycyIsImNvbG9yMSIsImNvbG9yMiIsImNvbG9yMyIsImltZyIsImltYWdlVXJsIiwiQm9vbGVhbiIsImhhbG9BZGRPcHRpb25Gb3JQcm9kdWN0VGV4dCIsImVsIiwiJHBvcHVwIiwiJGVsIiwiJG9wdGlvbnMiLCJ0ZW1wbGF0ZSIsIm9uIiwiZXZlbnQiLCJyZW1vdmVDbGFzcyIsImVtcHR5IiwiJHByb2RJZCIsInRhcmdldCIsInBvc2l0aW9uIiwib2Zmc2V0IiwiY29udGFpbmVyIiwidW5kZWZpbmVkIiwidXRpbHMiLCJhcGkiLCJwcm9kdWN0IiwiZ2V0QnlJZCIsImVyciIsInJlc3BvbnNlIiwiaHRtbCIsIndpbmRvdyIsIndpZHRoIiwiY3NzIiwidG9wIiwibGVmdCIsImFkZENsYXNzIiwiZG9jdW1lbnQiLCJwcmV2ZW50RGVmYXVsdCIsImhhc0NsYXNzIiwiY2xvc2VzdCIsIlBhZ2UiLCJvblJlYWR5IiwiZmFxc1BhZ2UiLCJmYXFzVG9nZ2xlIiwicG9ydGZvbGlvUGFnZSIsImhhbG9BZGRPcHRpb24iLCJoYWxvUHJvZHVjdExvb2tib29rIiwibG9va2Jvb2tDYXJvdXNlbCIsInBvcnRmb2xpb0N1c3RvbUNhcm91c2VsIiwiYXBwZW5kVG8iLCJzbGljZSIsInRleHQiLCIkdGFyZ2V0IiwiY3VycmVudFRhcmdldCIsIm5vdCIsInNsaWRlRG93biIsInNsaWRlVXAiLCJzbGljayIsImRvdHMiLCJhcnJvd3MiLCJtb2JpbGVGaXJzdCIsImFkYXB0aXZlSGVpZ2h0Iiwic2xpZGVzVG9TaG93Iiwic2xpZGVzVG9TY3JvbGwiLCJsYXp5TG9hZCIsIm5leHRBcnJvdyIsInByZXZBcnJvdyIsInJlc3BvbnNpdmUiLCJicmVha3BvaW50Iiwic2V0dGluZ3MiLCJpbmZpbml0ZSIsIlBhZ2VNYW5hZ2VyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUErQztBQUMvQyxJQUFNQSxLQUFLLEdBQUdDLG1CQUFPLENBQUMsd0RBQVksQ0FBQztBQUVwQix5RUFBU0MsT0FBTyxF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Q2pFekYsQ0FBQyxDQUFDLGtDQUFrQyxDQUFDLENBQUM0RyxLQUFLLENBQUM7VUFDeENDLElBQUksRUFBRSxJQUFJO1VBQ1ZDLE1BQU0sRUFBRSxLQUFLO1VBQ2JDLFdBQVcsRUFBRSxJQUFJO1VBQ2pCVSxRQUFRLEVBQUUsS0FBSztVQUNmVCxjQUFjLEVBQUUsSUFBSTtVQUNwQkMsWUFBWSxFQUFFLENBQUM7VUFDZkMsY0FBYyxFQUFFLENBQUM7VUFDakJDLFFBQVEsRUFBRSxhQUFhO1VBQ3ZCQyxTQUFTLEVBQUUsOEhBQThIO1VBQ3pJQyxTQUFTLEVBQUUsa0lBQWtJO1VBQzdJQyxVQUFVLEVBQUUsQ0FDWjtZQUNJQyxVQUFVLEVBQUUsSUFBSTtZQUNoQkMsUUFBUSxFQUFFO2NBQ05YLElBQUksRUFBRSxLQUFLO2NBQ1hDLE1BQU0sRUFBRTtZQUNaO1VBQ0osQ0FBQztRQUNMLENBQUMsQ0FBQztNQUNOO0lBQ0o7RUFDSixDQUFDO0VBQUE7QUFBQSxFQTdINkJZLHFEQUFXIiwiZmlsZSI6InRoZW1lLWJ1bmRsZS5jaHVuay45LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHV0aWxzIGZyb20gJ0BiaWdjb21tZXJjZS9zdGVuY2lsLXV0aWxzJztcbmNvbnN0IGZldGNoID0gcmVxdWlyZSgnbm9kZS1mZXRjaCcpO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihjb250ZXh0LCB3cmFwcGVyKSB7XG4gICAgaWYgKGNvbnRleHQudGhlbWVTZXR0aW5ncy5oYWxvQWRkT3B0aW9uRm9yUHJvZHVjdCA9PSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IHRva2VuID0gY29udGV4dC50b2tlbixcbiAgICAgICAgICAgIHByb2R1Y3Rfd3JhcHBlciA9ICQoJyMnK3dyYXBwZXIpLFxuICAgICAgICAgICAgcHJvZHVjdF9jbGFzcyA9IHByb2R1Y3Rfd3JhcHBlci5maW5kKCcuY2FyZCcpO1xuICAgICAgICB2YXIgIGxpc3QgPSBbXTtcblxuICAgICAgICBmdW5jdGlvbiBjYWxsUHJvZHVjdE9wdGlvbigpIHtcbiAgICAgICAgICAgIHByb2R1Y3RfY2xhc3MuZWFjaCgoaW5kZXgsIGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgcHJvZHVjdElkID0gJChlbGVtZW50KS5kYXRhKFwicHJvZHVjdC1pZFwiKTtcblxuICAgICAgICAgICAgICAgIGxpc3QucHVzaChwcm9kdWN0SWQudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYobGlzdC5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICAgICBnZXRQcm9kdWN0T3B0aW9uKGxpc3QpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlbmRlck9wdGlvbihkYXRhKTtcblxuICAgICAgICAgICAgICAgICAgICAkLmVhY2gobGlzdCwgKGlkeCwgaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFyciA9IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2R1Y3RJZCA9IGxpc3RbaWR4XTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvZHVjdF93cmFwcGVyLmZpbmQoJy5jYXJkLW9wdGlvbi0nK3Byb2R1Y3RJZCsnIC5mb3JtLW9wdGlvbi1zd2F0Y2gnKS5lYWNoKChpbmRleCwgZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0eHQgPSAkKGVsZW1lbnQpLmRhdGEoJ3Byb2R1Y3Qtc3dhdGNoLXZhbHVlJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXJyW3R4dF0pe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKGVsZW1lbnQpLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyclt0eHRdID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYocHJvZHVjdF93cmFwcGVyLmZpbmQoJy5jYXJkLW9wdGlvbi0nK3Byb2R1Y3RJZCsnIC5mb3JtLW9wdGlvbi1zd2F0Y2gnKS5sZW5ndGggPiA0KXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY291bnRNb3JlT3B0aW9uICA9IHByb2R1Y3Rfd3JhcHBlci5maW5kKCcuY2FyZC1vcHRpb24tJytwcm9kdWN0SWQrJyAuZm9ybS1vcHRpb24tc3dhdGNoJykubGVuZ3RoIC0gNCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvZHVjdExpbmsgPSBwcm9kdWN0X3dyYXBwZXIuZmluZCgnW2RhdGEtcHJvZHVjdC1pZD1cIicrcHJvZHVjdElkKydcIl0nKS5maW5kKCcuY2FyZC1saW5rJykuYXR0cignaHJlZicpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvZHVjdF93cmFwcGVyLmZpbmQoJy5jYXJkLW9wdGlvbi0nK3Byb2R1Y3RJZCsnIC5mb3JtLW9wdGlvbi1zd2F0Y2gnKS5lYWNoKChpbmRleCwgZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihpbmRleCA+PSA0KXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoZWxlbWVudCkucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHByb2R1Y3Rfd3JhcHBlci5maW5kKCcuY2FyZC1vcHRpb24tJytwcm9kdWN0SWQrJyAuZm9ybS1maWVsZCAuc2hvd21vcmUnKS5sZW5ndGggPCAxKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvZHVjdF93cmFwcGVyLmZpbmQoJy5jYXJkLW9wdGlvbi0nK3Byb2R1Y3RJZCsnIC5mb3JtLWZpZWxkOm5vdCguZm9ybS1maWVsZC0tc2l6ZSknKS5hcHBlbmQoJzxhIGhyZWY9XCInK3Byb2R1Y3RMaW5rKydcIiBjbGFzcz1cInNob3dtb3JlXCI+KycrY291bnRNb3JlT3B0aW9uKyc8L2E+Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gZ2V0UHJvZHVjdE9wdGlvbihsaXN0KXtcbiAgICAgICAgICAgIHJldHVybiBmZXRjaCgnL2dyYXBocWwnLCB7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzogJ0JlYXJlciAnICsgdG9rZW5cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICAgIHF1ZXJ5OiBgXG4gICAgICAgICAgICAgICAgICAgIHF1ZXJ5IFNldmVyYWxQcm9kdWN0c0J5SUQge1xuICAgICAgICAgICAgICAgICAgICAgIHNpdGUge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvZHVjdHMoZW50aXR5SWRzOiBbYCtsaXN0K2BdLCBmaXJzdDogNTApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZWRnZXMge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW50aXR5SWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9kdWN0T3B0aW9ucyhmaXJzdDogNTApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWRnZXMge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW50aXR5SWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc1JlcXVpcmVkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi4gb24gTXVsdGlwbGVDaG9pY2VPcHRpb24ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5U3R5bGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVzIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlZGdlcyB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW50aXR5SWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNEZWZhdWx0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLiBvbiBTd2F0Y2hPcHRpb25WYWx1ZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGV4Q29sb3JzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1hZ2VVcmwod2lkdGg6IDUwKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBgfSksXG4gICAgICAgICAgICB9KS50aGVuKHJlcyA9PiByZXMuanNvbigpKS50aGVuKHJlcyA9PiByZXMuZGF0YSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiByZW5kZXJPcHRpb24oZGF0YSl7XG4gICAgICAgICAgICB2YXIgYUZpbHRlciA9IGRhdGEuc2l0ZS5wcm9kdWN0cy5lZGdlcztcblxuICAgICAgICAgICAgJC5lYWNoKGFGaWx0ZXIsIChpbmRleCwgZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgICAgIHZhciBwcm9kdWN0SWQgPSBhRmlsdGVyW2luZGV4XS5ub2RlLmVudGl0eUlkLFxuICAgICAgICAgICAgICAgICAgICBwcm9kdWN0RmllbGRDb2xvciA9IHByb2R1Y3Rfd3JhcHBlci5maW5kKCcuY2FyZC1vcHRpb24tJytwcm9kdWN0SWQrJyAuZm9ybS1maWVsZDpub3QoLmZvcm0tZmllbGQtLXNpemUpJyksXG4gICAgICAgICAgICAgICAgICAgIHByb2R1Y3RGaWVsZFNpemUgPSBwcm9kdWN0X3dyYXBwZXIuZmluZCgnLmNhcmQtb3B0aW9uLScrcHJvZHVjdElkKycgLmZvcm0tZmllbGQtLXNpemUnKSxcbiAgICAgICAgICAgICAgICAgICAgYUZpbHRlcjIgPSBhRmlsdGVyW2luZGV4XS5ub2RlLnByb2R1Y3RPcHRpb25zLmVkZ2VzO1xuXG4gICAgICAgICAgICAgICAgdmFyIGFGaWx0ZXIzID0gYUZpbHRlcjIuZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLm5vZGUuZGlzcGxheVN0eWxlID09PSAnU3dhdGNoJztcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHZhciBhRmlsdGVyNSA9IGFGaWx0ZXIyLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS5ub2RlLmRpc3BsYXlOYW1lID09PSBjb250ZXh0LnRoZW1lU2V0dGluZ3MuaGFsb0FkZE9wdGlvbkZvclByb2R1Y3QyO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgaWYoYUZpbHRlcjMubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAgICAgICAgIHZhciBhRmlsdGVyNCA9IGFGaWx0ZXIzWzBdLm5vZGUudmFsdWVzLmVkZ2VzO1xuXG4gICAgICAgICAgICAgICAgICAgICQuZWFjaChhRmlsdGVyNCwgKGlkeCwgZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRpdGxlVmFyID0gYUZpbHRlcjRbaWR4XS5ub2RlLmxhYmVsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkVmFyID0gYUZpbHRlcjRbaWR4XS5ub2RlLmVudGl0eUlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlbmd0aENvbG9yVmFyID0gYUZpbHRlcjRbaWR4XS5ub2RlLmhleENvbG9ycy5sZW5ndGgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3IxID0gYUZpbHRlcjRbaWR4XS5ub2RlLmhleENvbG9yc1swXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjIgPSBhRmlsdGVyNFtpZHhdLm5vZGUuaGV4Q29sb3JzWzFdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yMyA9IGFGaWx0ZXI0W2lkeF0ubm9kZS5oZXhDb2xvcnNbMl0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1nID0gYUZpbHRlcjRbaWR4XS5ub2RlLmltYWdlVXJsO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihsZW5ndGhDb2xvclZhciA9PSAyKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9kdWN0RmllbGRDb2xvci5hcHBlbmQoJzxsYWJlbCBjbGFzcz1cImZvcm0tb3B0aW9uIGZvcm0tb3B0aW9uLXN3YXRjaFwiIGRhdGEtcHJvZHVjdC1zd2F0Y2gtdmFsdWU9XCInK2lkVmFyKydcIj48c3BhbiBjbGFzcz1cImZvcm0tb3B0aW9uLXRvb2x0aXBcIj4nK3RpdGxlVmFyKyc8L3NwYW4+PHNwYW4gY2xhc3M9XCJmb3JtLW9wdGlvbi12YXJpYW50IGZvcm0tb3B0aW9uLXZhcmlhbnQtLWNvbG9yIGZvcm0tb3B0aW9uLXZhcmlhbnQtLWNvbG9yMlwiIHRpdGxlPVwiJyt0aXRsZVZhcisnXCI+PHNwYW4gc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOicrY29sb3IxKydcIj48L3NwYW4+PHNwYW4gc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOicrY29sb3IyKydcIj48L3NwYW4+PC9zcGFuPjwvbGFiZWw+Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYobGVuZ3RoQ29sb3JWYXIgPT09IDMpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2R1Y3RGaWVsZENvbG9yLmFwcGVuZCgnPGxhYmVsIGNsYXNzPVwiZm9ybS1vcHRpb24gZm9ybS1vcHRpb24tc3dhdGNoXCIgZGF0YS1wcm9kdWN0LXN3YXRjaC12YWx1ZT1cIicraWRWYXIrJ1wiPjxzcGFuIGNsYXNzPVwiZm9ybS1vcHRpb24tdG9vbHRpcFwiPicrdGl0bGVWYXIrJzwvc3Bhbj48c3BhbiBjbGFzcz1cImZvcm0tb3B0aW9uLXZhcmlhbnQgZm9ybS1vcHRpb24tdmFyaWFudC0tY29sb3IgZm9ybS1vcHRpb24tdmFyaWFudC0tY29sb3IyXCIgdGl0bGU9XCInK3RpdGxlVmFyKydcIj48c3BhbiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6Jytjb2xvcjErJ1wiPjwvc3Bhbj48c3BhbiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6Jytjb2xvcjIrJ1wiPjwvc3Bhbj48c3BhbiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6Jytjb2xvcjMrJ1wiPjwvc3Bhbj48L3NwYW4+PC9sYWJlbD4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZihCb29sZWFuKGNvbG9yMSkpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2R1Y3RGaWVsZENvbG9yLmFwcGVuZCgnPGxhYmVsIGNsYXNzPVwiZm9ybS1vcHRpb24gZm9ybS1vcHRpb24tc3dhdGNoXCIgZGF0YS1wcm9kdWN0LXN3YXRjaC12YWx1ZT1cIicraWRWYXIrJ1wiPjxzcGFuIGNsYXNzPVwiZm9ybS1vcHRpb24tdG9vbHRpcFwiPicrdGl0bGVWYXIrJzwvc3Bhbj48c3BhbiBjbGFzcz1cImZvcm0tb3B0aW9uLXZhcmlhbnQgZm9ybS1vcHRpb24tdmFyaWFudC0tY29sb3JcIiB0aXRsZT1cIicrdGl0bGVWYXIrJ1wiIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjogJytjb2xvcjErJ1wiPjwvc3Bhbj48L2xhYmVsPicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmKEJvb2xlYW4oaW1nKSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvZHVjdEZpZWxkQ29sb3IuYXBwZW5kKCc8bGFiZWwgY2xhc3M9XCJmb3JtLW9wdGlvbiBmb3JtLW9wdGlvbi1zd2F0Y2hcIiBkYXRhLXByb2R1Y3Qtc3dhdGNoLXZhbHVlPVwiJytpZFZhcisnXCI+PHNwYW4gY2xhc3M9XCJmb3JtLW9wdGlvbi10b29sdGlwXCI+Jyt0aXRsZVZhcisnPC9zcGFuPjxzcGFuIGNsYXNzPVwiZm9ybS1vcHRpb24tdmFyaWFudCBmb3JtLW9wdGlvbi12YXJpYW50LS1wYXR0ZXJuXCIgdGl0bGU9XCInK3RpdGxlVmFyKydcIiBzdHlsZT1cImJhY2tncm91bmQtaW1hZ2U6IHVybCgnK2ltZysnKVwiPjwvc3Bhbj48L2xhYmVsPicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHByb2R1Y3RGaWVsZENvbG9yLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmKGFGaWx0ZXI1Lmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgICAgICBpZihwcm9kdWN0RmllbGRTaXplLmxlbmd0aCA8IDEpe1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvZHVjdF93cmFwcGVyLmZpbmQoJy5jYXJkLW9wdGlvbi0nK3Byb2R1Y3RJZCsnJykuYXBwZW5kKCc8ZGl2IGNsYXNzPVwiZm9ybS1maWVsZCBmb3JtLWZpZWxkLS1zaXplXCI+PGxhYmVsIGNsYXNzPVwiZm9ybS1vcHRpb25cIj4nK2NvbnRleHQudGhlbWVTZXR0aW5ncy5oYWxvQWRkT3B0aW9uRm9yUHJvZHVjdFRleHQudG9TdHJpbmcoKSsnPC9sYWJlbD48L2Rpdj4nKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmKChhRmlsdGVyNS5sZW5ndGggPT0gMCkgJiYgKGFGaWx0ZXIzLmxlbmd0aCA9PSAwKSl7XG4gICAgICAgICAgICAgICAgICAgIHByb2R1Y3Rfd3JhcHBlci5maW5kKCcuY2FyZC1vcHRpb24tJytwcm9kdWN0SWQrJycpLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgY2FsbFByb2R1Y3RPcHRpb24oKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgdXRpbHMgZnJvbSAnQGJpZ2NvbW1lcmNlL3N0ZW5jaWwtdXRpbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihjb250ZXh0LCBlbCkge1xuICAgIHZhciAkcG9wdXAgPSAkKCcubG9va2Jvb2stcG9wdXAnKTtcbiAgICB2YXIgJGVsID0gZWw7XG5cbiAgICBjb25zdCAkb3B0aW9ucyA9IHtcbiAgICAgICAgdGVtcGxhdGU6ICdoYWxvdGhlbWVzL3Byb2R1Y3RzL2hhbG8tbG9va2Jvb2stdG1wJ1xuICAgIH07XG5cbiAgICAkZWwuZmluZCgnLml0ZW0gLml0ZW0tcG9pbnQnKS5vbignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgICRwb3B1cC5yZW1vdmVDbGFzcygnaXMtb3BlbicpLmVtcHR5KCk7XG5cbiAgICAgICAgdmFyICRwcm9kSWQgPSAkKGV2ZW50LnRhcmdldCkuZGF0YSgncHJvZHVjdC1pZCcpLFxuICAgICAgICAgICAgcG9zaXRpb24gPSAkKGV2ZW50LnRhcmdldCkub2Zmc2V0KCksXG4gICAgICAgICAgICBjb250YWluZXIgPSAkZWwub2Zmc2V0KCk7XG5cbiAgICAgICAgaWYoJHByb2RJZCAhPSB1bmRlZmluZWQpe1xuICAgICAgICAgICAgdXRpbHMuYXBpLnByb2R1Y3QuZ2V0QnlJZCgkcHJvZElkLCAkb3B0aW9ucywgKGVyciwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICBpZihlcnIpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgJHBvcHVwLmh0bWwocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA+PSA1NTEpIHtcbiAgICAgICAgICAgICAgICAkcG9wdXAuY3NzKHsndG9wJzogcG9zaXRpb24udG9wIC0gY29udGFpbmVyLnRvcCAtIDEwMCwgJ2xlZnQnOiBwb3NpdGlvbi5sZWZ0IC0gY29udGFpbmVyLmxlZnQgKyAzMH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkcG9wdXAuY3NzKHsndG9wJzogcG9zaXRpb24udG9wIC0gY29udGFpbmVyLnRvcCArIDE1LCAnbGVmdCc6IDE1fSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICRwb3B1cC5hZGRDbGFzcyhcImlzLW9wZW5cIik7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuY2xvc2UtcHJvZHVjdCcsIGV2ZW50ID0+IHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBpZiAoJHBvcHVwLmhhc0NsYXNzKFwiaXMtb3BlblwiKSkge1xuICAgICAgICAgICAgJHBvcHVwLnJlbW92ZUNsYXNzKFwiaXMtb3BlblwiKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICBpZigkcG9wdXAuaGFzQ2xhc3MoXCJpcy1vcGVuXCIpKSB7XG4gICAgICAgICAgICBpZigoJChldmVudC50YXJnZXQpLmNsb3Nlc3QoJHBvcHVwKS5sZW5ndGggPT09IDApICYmICgkKGV2ZW50LnRhcmdldCkuY2xvc2VzdCgnLml0ZW0gLml0ZW0tcG9pbnQnKS5sZW5ndGggPT09IDApKSB7XG4gICAgICAgICAgICAgICAgJHBvcHVwLnJlbW92ZUNsYXNzKFwiaXMtb3BlblwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xufVxuIiwiaW1wb3J0IGZhbmN5Ym94IGZyb20gJy4vaGFsb3RoZW1lcy9qcXVlcnkuZmFuY3lib3gubWluJztcbmltcG9ydCB1dGlscyBmcm9tICdAYmlnY29tbWVyY2Uvc3RlbmNpbC11dGlscyc7XG5pbXBvcnQgUGFnZU1hbmFnZXIgZnJvbSAnLi9wYWdlLW1hbmFnZXInO1xuaW1wb3J0IGhhbG9Qcm9kdWN0TG9va2Jvb2sgZnJvbSAnLi9oYWxvdGhlbWVzL2hhbG9Qcm9kdWN0TG9va2Jvb2snO1xuaW1wb3J0IGhhbG9BZGRPcHRpb24gZnJvbSAnLi9oYWxvdGhlbWVzL2hhbG9BZGRPcHRpb25Gb3JQcm9kdWN0Q2FyZCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhZ2UgZXh0ZW5kcyBQYWdlTWFuYWdlciB7XG4gICAgY29uc3RydWN0b3IoY29udGV4dCkge1xuICAgICAgICBzdXBlcihjb250ZXh0KTtcbiAgICB9XG5cbiAgICBvblJlYWR5KCkge1xuICAgICAgICB0aGlzLmZhcXNQYWdlKCk7XG4gICAgICAgIHRoaXMuZmFxc1RvZ2dsZSgpO1xuICAgICAgICB0aGlzLnBvcnRmb2xpb1BhZ2UoKTtcbiAgICAgICAgXG4gICAgICAgIGhhbG9BZGRPcHRpb24odGhpcy5jb250ZXh0KTtcbiAgICAgICAgaGFsb1Byb2R1Y3RMb29rYm9vayh0aGlzLmNvbnRleHQsICQoJy5oYWxvLWxvb2tib29rLXNsaWRlcicpKTtcbiAgICAgICAgdGhpcy5sb29rYm9va0Nhcm91c2VsKCk7XG4gICAgICAgIHRoaXMucG9ydGZvbGlvQ3VzdG9tQ2Fyb3VzZWwoKTtcbiAgICB9XG5cbiAgICBmYXFzUGFnZSgpe1xuICAgICAgICAkKCcuZmFxLWRlc2MnKS5hcHBlbmRUbygnLnBhZ2Utbm9ybWFsIC5wYWdlLWRlc2NyaXB0aW9uJyk7XG4gICAgfVxuXG4gICAgcG9ydGZvbGlvUGFnZSgpe1xuICAgICAgICAkKCcuaGFsby1pbWFnZS1wb3J0Zm9saW8gLml0ZW06aGlkZGVuJykuc2xpY2UoMCw2KS5jc3MoJ2Rpc3BsYXknLCAnaW5saW5lLWJsb2NrJyk7XG5cbiAgICAgICAgaWYoJCgnLmhhbG8taW1hZ2UtcG9ydGZvbGlvIC5pdGVtJykubGVuZ3RoID4gNil7XG4gICAgICAgICAgICAkKCcuaGFsby1pbWFnZS1wb3J0Zm9saW8nKS5hcHBlbmQoJzxkaXYgY2xhc3M9XCJoYWxvLWluZmluaXRlLXBvcnRmb2xpb1wiPjxkaXYgY2xhc3M9XCJidXR0b24gYnV0dG9uLS10cmFuc3BhcmVudFwiPkxvYWQgTW9yZTwvZGl2PjwvZGl2PicpO1xuICAgICAgICB9XG5cbiAgICAgICAgJCgnLmhhbG8taW5maW5pdGUtcG9ydGZvbGlvIC5idXR0b24nKS5vbignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICQoJy5oYWxvLWltYWdlLXBvcnRmb2xpbyAuaXRlbTpoaWRkZW4nKS5zbGljZSgwLDYpLmNzcygnZGlzcGxheScsICdpbmxpbmUtYmxvY2snKTtcbiAgICBcbiAgICAgICAgICAgIGlmKCQoXCIuaGFsby1pbWFnZS1wb3J0Zm9saW8gLml0ZW06aGlkZGVuXCIpLmxlbmd0aCA9PSAwKXtcbiAgICAgICAgICAgICAgICAkKCcuaGFsby1pbmZpbml0ZS1wb3J0Zm9saW8gLmJ1dHRvbicpLmFkZENsYXNzKCdkaXNhYmxlJykudGV4dCgnTm8gbW9yZSBpdGVtcycpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZigkKCcucGFnZS1wb3J0Zm9saW8gLnBhZ2Utc2lkZWJhci1tb2JpbGUnKS5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICQoJy5wYWdlLXBvcnRmb2xpbyAucGFnZS1zaWRlYmFyLW1vYmlsZScpLmFwcGVuZCgnPHN2ZyBjbGFzcz1cImljb25cIj48dXNlIHhsaW5rOmhyZWY9XCIjaWNvbi1zaWRlYmFyXCI+PC91c2U+PC9zdmc+Jyk7XG4gICAgICAgIH1cblxuICAgICAgICAkKCcuaGFsby1pbWFnZS1wb3J0Zm9saW8gLml0ZW0nKS5lYWNoKChpbmRleCwgZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgaWYoJCgnLmV4dGVybmFsLWxpbmsnLCBlbGVtZW50KS5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICAgICAkKCcuZXh0ZXJuYWwtbGluaycsIGVsZW1lbnQpLmFwcGVuZCgnPHN2ZyBjbGFzcz1cImljb25cIj48dXNlIHhsaW5rOmhyZWY9XCIjaWNvbi1leHRlcm5hbC1saW5rXCI+PC91c2U+PC9zdmc+Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZhcXNUb2dnbGUoKXtcbiAgICAgICAgJCgnLnBhZ2Utbm9ybWFsIC5jYXJkIC50aXRsZScpLm9uKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgdmFyICR0YXJnZXQgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xuXG4gICAgICAgICAgICAkKCcucGFnZS1ub3JtYWwgLmNhcmQgLnRpdGxlJykubm90KCR0YXJnZXQpLnJlbW92ZUNsYXNzKCdjb2xsYXBzZWQnKTtcblxuICAgICAgICAgICAgaWYoJHRhcmdldC5oYXNDbGFzcygnY29sbGFwc2VkJykpe1xuICAgICAgICAgICAgICAgICR0YXJnZXQucmVtb3ZlQ2xhc3MoJ2NvbGxhcHNlZCcpO1xuICAgICAgICAgICAgfSBlbHNle1xuICAgICAgICAgICAgICAgICR0YXJnZXQuYWRkQ2xhc3MoJ2NvbGxhcHNlZCcpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAkKCcucGFnZS1ub3JtYWwgLmNhcmQnKS5lYWNoKChpbmRleCwgZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmKCQoJy50aXRsZScsIGVsZW1lbnQpLmhhc0NsYXNzKCdjb2xsYXBzZWQnKSl7XG4gICAgICAgICAgICAgICAgICAgICQoZWxlbWVudCkuZmluZCgnLmNvbGxhcHNlJykuc2xpZGVEb3duKFwic2xvd1wiKTtcbiAgICAgICAgICAgICAgICB9IGVsc2V7XG4gICAgICAgICAgICAgICAgICAgICQoZWxlbWVudCkuZmluZCgnLmNvbGxhcHNlJykuc2xpZGVVcChcInNsb3dcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vTG9va2Jvb2sgcGFnZVxuICAgIGxvb2tib29rQ2Fyb3VzZWwoKSB7XG4gICAgICAgIGlmICgkKCcuaGFsby1sb29rYm9vay1zbGlkZXInKS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmICghJCgnLmhhbG8tbG9va2Jvb2stc2xpZGVyJykuaGFzQ2xhc3MoJ3NsaWNrLXNsaWRlcicpKSB7XG4gICAgICAgICAgICAgICAgJCgnLmhhbG8tbG9va2Jvb2stc2xpZGVyJykuc2xpY2soe1xuICAgICAgICAgICAgICAgICAgICBkb3RzOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBhcnJvd3M6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBtb2JpbGVGaXJzdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgYWRhcHRpdmVIZWlnaHQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gICAgICAgICAgICAgICAgICAgIGxhenlMb2FkOiAnYW50aWNpcGF0ZWQnLFxuICAgICAgICAgICAgICAgICAgICBuZXh0QXJyb3c6IFwiPHN2ZyBjbGFzcz0nc2xpY2stbmV4dCBzbGljay1hcnJvdyBzbGljay1hcnJvdy1sYXJnZScgYXJpYS1sYWJlbD0nTmV4dCBTbGlkZSc+PHVzZSB4bGluazpocmVmPSNzbGljay1hcnJvdy1uZXh0PjwvdXNlPjwvc3ZnPlwiLCBcbiAgICAgICAgICAgICAgICAgICAgcHJldkFycm93OiBcIjxzdmcgY2xhc3M9J3NsaWNrLXByZXYgc2xpY2stYXJyb3cgc2xpY2stYXJyb3ctbGFyZ2UnIGFyaWEtbGFiZWw9J1ByZXZpb3VzIFNsaWRlJz48dXNlIHhsaW5rOmhyZWY9I3NsaWNrLWFycm93LXByZXY+PC91c2U+PC9zdmc+XCIsXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNpdmU6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogMTAyNCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZG90czogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBQb3J0Zm9saW8gcGFnZVxuICAgIHBvcnRmb2xpb0N1c3RvbUNhcm91c2VsKCkge1xuICAgICAgICBpZiAoJCgnLmhhbG8tcG9ydGZvbGlvLWN1c3RvbSAuaGFsby1yb3cnKS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmICghJCgnLmhhbG8tcG9ydGZvbGlvLWN1c3RvbSAuaGFsby1yb3cnKS5oYXNDbGFzcygnc2xpY2stc2xpZGVyJykpIHtcbiAgICAgICAgICAgICAgICAkKCcuaGFsby1wb3J0Zm9saW8tY3VzdG9tIC5oYWxvLXJvdycpLnNsaWNrKHtcbiAgICAgICAgICAgICAgICAgICAgZG90czogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgbW9iaWxlRmlyc3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGluZmluaXRlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgYWRhcHRpdmVIZWlnaHQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gICAgICAgICAgICAgICAgICAgIGxhenlMb2FkOiAnYW50aWNpcGF0ZWQnLFxuICAgICAgICAgICAgICAgICAgICBuZXh0QXJyb3c6IFwiPHN2ZyBjbGFzcz0nc2xpY2stbmV4dCBzbGljay1hcnJvdyBzbGljay1hcnJvdy1sYXJnZScgYXJpYS1sYWJlbD0nTmV4dCBTbGlkZSc+PHVzZSB4bGluazpocmVmPSNzbGljay1hcnJvdy1uZXh0PjwvdXNlPjwvc3ZnPlwiLCBcbiAgICAgICAgICAgICAgICAgICAgcHJldkFycm93OiBcIjxzdmcgY2xhc3M9J3NsaWNrLXByZXYgc2xpY2stYXJyb3cgc2xpY2stYXJyb3ctbGFyZ2UnIGFyaWEtbGFiZWw9J1ByZXZpb3VzIFNsaWRlJz48dXNlIHhsaW5rOmhyZWY9I3NsaWNrLWFycm93LXByZXY+PC91c2U+PC9zdmc+XCIsXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNpdmU6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogMTAyNCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZG90czogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9