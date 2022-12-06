(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[4],{

/***/ "./assets/js/theme/blog.js":
/*!*********************************!*\
  !*** ./assets/js/theme/blog.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Blog; });
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./page-manager */ "./assets/js/theme/page-manager.js");
/* harmony import */ var _halothemes_haloAddOptionForProductCard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./halothemes/haloAddOptionForProductCard */ "./assets/js/theme/halothemes/haloAddOptionForProductCard.js");
/* harmony import */ var _halothemes_haloProductLookbook__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./halothemes/haloProductLookbook */ "./assets/js/theme/halothemes/haloProductLookbook.js");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var Blog = /*#__PURE__*/function (_PageManager) {
  _inheritsLoose(Blog, _PageManager);
  function Blog(context) {
    return _PageManager.call(this, context) || this;
  }
  var _proto = Blog.prototype;
  _proto.onReady = function onReady() {
    this.getAllTags(this.context);
    Object(_halothemes_haloAddOptionForProductCard__WEBPACK_IMPORTED_MODULE_2__["default"])(this.context);
    Object(_halothemes_haloProductLookbook__WEBPACK_IMPORTED_MODULE_3__["default"])(this.context, $('.halo-blog-lookbook .lookbook-slider'));
    this.lookbookCarousel();
  };
  _proto.getAllTags = function getAllTags(context) {
    if (context.themeSettings.halo_sidebar_popular_tags == true) {
      var requestOptions = {
        config: {
          blog: {
            posts: {
              limit: 100
            }
          }
        },
        template: 'halothemes/halo-all-tags'
      };
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["default"].api.getPage('/blog', requestOptions, function (error, response) {
        if (error) {
          return '';
        }
        $('.tags-list').html(response);
        var arr = {};
        $('.tags-list [data-tag]').each(function () {
          var txt = $(this).data('tag');
          if (arr[txt]) $(this).remove();else arr[txt] = true;
        });
      });
    }
  };
  _proto.lookbookCarousel = function lookbookCarousel() {
    if ($('.blog-lookbook-gallery .lookbook-slider').length) {
      if (!$('.blog-lookbook-gallery .lookbook-slider').hasClass('slick-slider')) {
        $('.blog-lookbook-gallery .lookbook-slider').slick({
          rows: 0,
          rtl: false,
          dots: true,
          arrows: false,
          mobileFirst: true,
          infinite: false,
          adaptiveHeight: true,
          slidesToShow: 1,
          slidesToScroll: 1
        });
      }
    }
  };
  return Blog;
}(_page_manager__WEBPACK_IMPORTED_MODULE_1__["default"]);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

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

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvYmxvZy5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvaGFsb3RoZW1lcy9oYWxvQWRkT3B0aW9uRm9yUHJvZHVjdENhcmQuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3RoZW1lL2hhbG90aGVtZXMvaGFsb1Byb2R1Y3RMb29rYm9vay5qcyJdLCJuYW1lcyI6WyJCbG9nIiwiY29udGV4dCIsIm9uUmVhZHkiLCJnZXRBbGxUYWdzIiwiaGFsb0FkZE9wdGlvbiIsImhhbG9Qcm9kdWN0TG9va2Jvb2siLCIkIiwibG9va2Jvb2tDYXJvdXNlbCIsInRoZW1lU2V0dGluZ3MiLCJoYWxvX3NpZGViYXJfcG9wdWxhcl90YWdzIiwicmVxdWVzdE9wdGlvbnMiLCJjb25maWciLCJibG9nIiwicG9zdHMiLCJsaW1pdCIsInRlbXBsYXRlIiwidXRpbHMiLCJhcGkiLCJnZXRQYWdlIiwiZXJyb3IiLCJyZXNwb25zZSIsImh0bWwiLCJhcnIiLCJlYWNoIiwidHh0IiwiZGF0YSIsInJlbW92ZSIsImxlbmd0aCIsImhhc0NsYXNzIiwic2xpY2siLCJyb3dzIiwicnRsIiwiZG90cyIsImFycm93cyIsIm1vYmlsZUZpcnN0IiwiaW5maW5pdGUiLCJhZGFwdGl2ZUhlaWdodCIsInNsaWRlc1RvU2hvdyIsInNsaWRlc1RvU2Nyb2xsIiwiUGFnZU1hbmFnZXIiLCJmZXRjaCIsInJlcXVpcmUiLCJ3cmFwcGVyIiwiaGFsb0FkZE9wdGlvbkZvclByb2R1Y3QiLCJjYWxsUHJvZHVjdE9wdGlvbiIsInByb2R1Y3RfY2xhc3MiLCJpbmRleCIsImVsZW1lbnQiLCJwcm9kdWN0SWQiLCJsaXN0IiwicHVzaCIsInRvU3RyaW5nIiwiZ2V0UHJvZHVjdE9wdGlvbiIsInRoZW4iLCJyZW5kZXJPcHRpb24iLCJpZHgiLCJpdGVtIiwicHJvZHVjdF93cmFwcGVyIiwiZmluZCIsImNvdW50TW9yZU9wdGlvbiIsInByb2R1Y3RMaW5rIiwiYXR0ciIsImFwcGVuZCIsIm1ldGhvZCIsImhlYWRlcnMiLCJ0b2tlbiIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwicXVlcnkiLCJyZXMiLCJqc29uIiwiYUZpbHRlciIsInNpdGUiLCJwcm9kdWN0cyIsImVkZ2VzIiwibm9kZSIsImVudGl0eUlkIiwicHJvZHVjdEZpZWxkQ29sb3IiLCJwcm9kdWN0RmllbGRTaXplIiwiYUZpbHRlcjIiLCJwcm9kdWN0T3B0aW9ucyIsImFGaWx0ZXIzIiwiZmlsdGVyIiwiZGlzcGxheVN0eWxlIiwiYUZpbHRlcjUiLCJkaXNwbGF5TmFtZSIsImhhbG9BZGRPcHRpb25Gb3JQcm9kdWN0MiIsImFGaWx0ZXI0IiwidmFsdWVzIiwidGl0bGVWYXIiLCJsYWJlbCIsImlkVmFyIiwibGVuZ3RoQ29sb3JWYXIiLCJoZXhDb2xvcnMiLCJjb2xvcjEiLCJjb2xvcjIiLCJjb2xvcjMiLCJpbWciLCJpbWFnZVVybCIsIkJvb2xlYW4iLCJoYWxvQWRkT3B0aW9uRm9yUHJvZHVjdFRleHQiLCJlbCIsIiRwb3B1cCIsIiRlbCIsIiRvcHRpb25zIiwib24iLCJldmVudCIsInJlbW92ZUNsYXNzIiwiZW1wdHkiLCIkcHJvZElkIiwidGFyZ2V0IiwicG9zaXRpb24iLCJvZmZzZXQiLCJjb250YWluZXIiLCJ1bmRlZmluZWQiLCJwcm9kdWN0IiwiZ2V0QnlJZCIsImVyciIsIndpbmRvdyIsIndpZHRoIiwiY3NzIiwidG9wIiwibGVmdCIsImFkZENsYXNzIiwiZG9jdW1lbnQiLCJwcmV2ZW50RGVmYXVsdCIsImNsb3Nlc3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUMrQztBQUNOO0FBQzRCO0FBQ0Y7QUFBQSxJQUU5Q0EsSUFBSTtFQUFBO0VBQ3JCLGNBQVlDLE9BQU8sRUFBRTtJQUFBLE9BQ2pCLHdCQUFNQSxPQUFPLENBQUM7RUFDbEI7RUFBQztFQUFBLE9BRUpDLE9BQU8sR0FBUCxtQkFBVTtJQUNILElBQUksQ0FBQ0MsVUFBVSxDQUFDLElBQUksQ0FBQ0Ys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QUMzQixJQUFJdEIsQ0FBQyxDQUFDcUcsS0FBSyxDQUFDSSxNQUFNLENBQUMsQ0FBQ2dCLE9BQU8sQ0FBQ3hCLE1BQU0sQ0FBQyxDQUFDNUUsTUFBTSxLQUFLLENBQUMsSUFBTXJCLENBQUMsQ0FBQ3FHLEtBQUssQ0FBQ0ksTUFBTSxDQUFDLENBQUNnQixPQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQ3BHLE1BQU0sS0FBSyxDQUFFLEVBQUU7UUFDOUc0RSxNQUFNLENBQUNLLFdBQVcsQ0FBQyxTQUFTLENBQUM7TUFDakM7SUFDSjtFQUNKLENBQUMsQ0FBQztBQUNOLEMiLCJmaWxlIjoidGhlbWUtYnVuZGxlLmNodW5rLjQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHV0aWxzIGZyb20gJ0BiaWdjb21tZXJjZS9zdGVuY2lsLXV0aWxzJztcbmltcG9ydCBQYWdlTWFuYWdlciBmcm9tICcuL3BhZ2UtbWFuYWdlcic7XG5pbXBvcnQgaGFsb0FkZE9wdGlvbiBmcm9tICcuL2hhbG90aGVtZXMvaGFsb0FkZE9wdGlvbkZvclByb2R1Y3RDYXJkJztcbmltcG9ydCBoYWxvUHJvZHVjdExvb2tib29rIGZyb20gJy4vaGFsb3RoZW1lcy9oYWxvUHJvZHVjdExvb2tib29rJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmxvZyBleHRlbmRzIFBhZ2VNYW5hZ2VyIHtcbiAgICBjb25zdHJ1Y3Rvcihjb250ZXh0KSB7XG4gICAgICAgIHN1cGVyKGNvbnRleHQpO1xuICAgIH1cblxuXHRvblJlYWR5KCkge1xuICAgICAgICB0aGlzLmdldEFsbFRhZ3ModGhpcy5jb250ZXh0KTtcbiAgICAgICAgaGFsb0FkZE9wdGlvbih0aGlzLmNvbnRleHQpO1xuICAgICAgICBoYWxvUHJvZHVjdExvb2tib29rKHRoaXMuY29udGV4dCwgJCgnLmhhbG8tYmxvZy1sb29rYm9vayAubG9va2Jvb2stc2xpZGVyJykpO1xuICAgICAgICB0aGlzLmxvb2tib29rQ2Fyb3VzZWwoKTtcbiAgICB9XG5cbiAgICBnZXRBbGxUYWdzKGNvbnRleHQpe1xuICAgICAgICBpZiAoY29udGV4dC50aGVtZVNldHRpbmdzLmhhbG9fc2lkZWJhcl9wb3B1bGFyX3RhZ3MgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgY29uc3QgcmVxdWVzdE9wdGlvbnMgPSB7XG4gICAgICAgICAgICAgICAgY29uZmlnOiB7XG4gICAgICAgICAgICAgICAgICAgIGJsb2c6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc3RzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGltaXQ6IDEwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogJ2hhbG90aGVtZXMvaGFsby1hbGwtdGFncycsXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB1dGlscy5hcGkuZ2V0UGFnZSgnL2Jsb2cnLCByZXF1ZXN0T3B0aW9ucywgKGVycm9yLCByZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAkKCcudGFncy1saXN0JykuaHRtbChyZXNwb25zZSk7XG5cbiAgICAgICAgICAgICAgICB2YXIgYXJyID0ge307XG5cbiAgICAgICAgICAgICAgICAkKCcudGFncy1saXN0IFtkYXRhLXRhZ10nKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdHh0ID0gJCh0aGlzKS5kYXRhKCd0YWcnKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoYXJyW3R4dF0pXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICBhcnJbdHh0XSA9IHRydWU7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBsb29rYm9va0Nhcm91c2VsKCkge1xuICAgICAgICBpZiAoJCgnLmJsb2ctbG9va2Jvb2stZ2FsbGVyeSAubG9va2Jvb2stc2xpZGVyJykubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAoISQoJy5ibG9nLWxvb2tib29rLWdhbGxlcnkgLmxvb2tib29rLXNsaWRlcicpLmhhc0NsYXNzKCdzbGljay1zbGlkZXInKSkge1xuICAgICAgICAgICAgICAgICQoJy5ibG9nLWxvb2tib29rLWdhbGxlcnkgLmxvb2tib29rLXNsaWRlcicpLnNsaWNrKHtcbiAgICAgICAgICAgICAgICAgICAgcm93czogMCxcbiAgICAgICAgICAgICAgICAgICAgcnRsOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgZG90czogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgbW9iaWxlRmlyc3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGluZmluaXRlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgYWRhcHRpdmVIZWlnaHQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDFcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB1dGlscyBmcm9tICdAYmlnY29tbWVyY2Uvc3RlbmNpbC11dGlscyc7XG5jb25zdCBmZXRjaCA9IHJlcXVpcmUoJ25vZGUtZmV0Y2gnKTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oY29udGV4dCwgd3JhcHBlcikge1xuICAgIGlmIChjb250ZXh0LnRoZW1lU2V0dGluZ3MuaGFsb0FkZE9wdGlvbkZvclByb2R1Y3QgPT0gdHJ1ZSkge1xuICAgICAgICBjb25zdCB0b2tlbiA9IGNvbnRleHQudG9rZW4sXG4gICAgICAgICAgICBwcm9kdWN0X3dyYXBwZXIgPSAkKCcjJyt3cmFwcGVyKSxcbiAgICAgICAgICAgIHByb2R1Y3RfY2xhc3MgPSBwcm9kdWN0X3dyYXBwZXIuZmluZCgnLmNhcmQnKTtcbiAgICAgICAgdmFyICBsaXN0ID0gW107XG5cbiAgICAgICAgZnVuY3Rpb24gY2FsbFByb2R1Y3RPcHRpb24oKSB7XG4gICAgICAgICAgICBwcm9kdWN0X2NsYXNzLmVhY2goKGluZGV4LCBlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIHByb2R1Y3RJZCA9ICQoZWxlbWVudCkuZGF0YShcInByb2R1Y3QtaWRcIik7XG5cbiAgICAgICAgICAgICAgICBsaXN0LnB1c2gocHJvZHVjdElkLnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmKGxpc3QubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAgICAgZ2V0UHJvZHVjdE9wdGlvbihsaXN0KS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZW5kZXJPcHRpb24oZGF0YSk7XG5cbiAgICAgICAgICAgICAgICAgICAgJC5lYWNoKGxpc3QsIChpZHgsIGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhcnIgPSB7fSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9kdWN0SWQgPSBsaXN0W2lkeF07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHByb2R1Y3Rfd3JhcHBlci5maW5kKCcuY2FyZC1vcHRpb24tJytwcm9kdWN0SWQrJyAuZm9ybS1vcHRpb24tc3dhdGNoJykuZWFjaCgoaW5kZXgsIGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdHh0ID0gJChlbGVtZW50KS5kYXRhKCdwcm9kdWN0LXN3YXRjaC12YWx1ZScpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFyclt0eHRdKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJChlbGVtZW50KS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJbdHh0XSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHByb2R1Y3Rfd3JhcHBlci5maW5kKCcuY2FyZC1vcHRpb24tJytwcm9kdWN0SWQrJyAuZm9ybS1vcHRpb24tc3dhdGNoJykubGVuZ3RoID4gNCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvdW50TW9yZU9wdGlvbiAgPSBwcm9kdWN0X3dyYXBwZXIuZmluZCgnLmNhcmQtb3B0aW9uLScrcHJvZHVjdElkKycgLmZvcm0tb3B0aW9uLXN3YXRjaCcpLmxlbmd0aCAtIDQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2R1Y3RMaW5rID0gcHJvZHVjdF93cmFwcGVyLmZpbmQoJ1tkYXRhLXByb2R1Y3QtaWQ9XCInK3Byb2R1Y3RJZCsnXCJdJykuZmluZCgnLmNhcmQtbGluaycpLmF0dHIoJ2hyZWYnKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2R1Y3Rfd3JhcHBlci5maW5kKCcuY2FyZC1vcHRpb24tJytwcm9kdWN0SWQrJyAuZm9ybS1vcHRpb24tc3dhdGNoJykuZWFjaCgoaW5kZXgsIGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoaW5kZXggPj0gNCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKGVsZW1lbnQpLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihwcm9kdWN0X3dyYXBwZXIuZmluZCgnLmNhcmQtb3B0aW9uLScrcHJvZHVjdElkKycgLmZvcm0tZmllbGQgLnNob3dtb3JlJykubGVuZ3RoIDwgMSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2R1Y3Rfd3JhcHBlci5maW5kKCcuY2FyZC1vcHRpb24tJytwcm9kdWN0SWQrJyAuZm9ybS1maWVsZDpub3QoLmZvcm0tZmllbGQtLXNpemUpJykuYXBwZW5kKCc8YSBocmVmPVwiJytwcm9kdWN0TGluaysnXCIgY2xhc3M9XCJzaG93bW9yZVwiPisnK2NvdW50TW9yZU9wdGlvbisnPC9hPicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGdldFByb2R1Y3RPcHRpb24obGlzdCl7XG4gICAgICAgICAgICByZXR1cm4gZmV0Y2goJy9ncmFwaHFsJywge1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6ICdCZWFyZXIgJyArIHRva2VuXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgICBxdWVyeTogYFxuICAgICAgICAgICAgICAgICAgICBxdWVyeSBTZXZlcmFsUHJvZHVjdHNCeUlEIHtcbiAgICAgICAgICAgICAgICAgICAgICBzaXRlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb2R1Y3RzKGVudGl0eUlkczogW2ArbGlzdCtgXSwgZmlyc3Q6IDUwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGVkZ2VzIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVudGl0eUlkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvZHVjdE9wdGlvbnMoZmlyc3Q6IDUwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVkZ2VzIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVudGl0eUlkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5TmFtZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNSZXF1aXJlZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4uIG9uIE11bHRpcGxlQ2hvaWNlT3B0aW9uIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheVN0eWxlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlcyB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWRnZXMge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVudGl0eUlkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzRGVmYXVsdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi4gb24gU3dhdGNoT3B0aW9uVmFsdWUge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhleENvbG9yc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlVXJsKHdpZHRoOiA1MClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgYH0pLFxuICAgICAgICAgICAgfSkudGhlbihyZXMgPT4gcmVzLmpzb24oKSkudGhlbihyZXMgPT4gcmVzLmRhdGEpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gcmVuZGVyT3B0aW9uKGRhdGEpe1xuICAgICAgICAgICAgdmFyIGFGaWx0ZXIgPSBkYXRhLnNpdGUucHJvZHVjdHMuZWRnZXM7XG5cbiAgICAgICAgICAgICQuZWFjaChhRmlsdGVyLCAoaW5kZXgsIGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgcHJvZHVjdElkID0gYUZpbHRlcltpbmRleF0ubm9kZS5lbnRpdHlJZCxcbiAgICAgICAgICAgICAgICAgICAgcHJvZHVjdEZpZWxkQ29sb3IgPSBwcm9kdWN0X3dyYXBwZXIuZmluZCgnLmNhcmQtb3B0aW9uLScrcHJvZHVjdElkKycgLmZvcm0tZmllbGQ6bm90KC5mb3JtLWZpZWxkLS1zaXplKScpLFxuICAgICAgICAgICAgICAgICAgICBwcm9kdWN0RmllbGRTaXplID0gcHJvZHVjdF93cmFwcGVyLmZpbmQoJy5jYXJkLW9wdGlvbi0nK3Byb2R1Y3RJZCsnIC5mb3JtLWZpZWxkLS1zaXplJyksXG4gICAgICAgICAgICAgICAgICAgIGFGaWx0ZXIyID0gYUZpbHRlcltpbmRleF0ubm9kZS5wcm9kdWN0T3B0aW9ucy5lZGdlcztcblxuICAgICAgICAgICAgICAgIHZhciBhRmlsdGVyMyA9IGFGaWx0ZXIyLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS5ub2RlLmRpc3BsYXlTdHlsZSA9PT0gJ1N3YXRjaCc7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB2YXIgYUZpbHRlcjUgPSBhRmlsdGVyMi5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0ubm9kZS5kaXNwbGF5TmFtZSA9PT0gY29udGV4dC50aGVtZVNldHRpbmdzLmhhbG9BZGRPcHRpb25Gb3JQcm9kdWN0MjtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGlmKGFGaWx0ZXIzLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgICAgICB2YXIgYUZpbHRlcjQgPSBhRmlsdGVyM1swXS5ub2RlLnZhbHVlcy5lZGdlcztcblxuICAgICAgICAgICAgICAgICAgICAkLmVhY2goYUZpbHRlcjQsIChpZHgsIGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0aXRsZVZhciA9IGFGaWx0ZXI0W2lkeF0ubm9kZS5sYWJlbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZFZhciA9IGFGaWx0ZXI0W2lkeF0ubm9kZS5lbnRpdHlJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZW5ndGhDb2xvclZhciA9IGFGaWx0ZXI0W2lkeF0ubm9kZS5oZXhDb2xvcnMubGVuZ3RoLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yMSA9IGFGaWx0ZXI0W2lkeF0ubm9kZS5oZXhDb2xvcnNbMF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3IyID0gYUZpbHRlcjRbaWR4XS5ub2RlLmhleENvbG9yc1sxXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjMgPSBhRmlsdGVyNFtpZHhdLm5vZGUuaGV4Q29sb3JzWzJdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltZyA9IGFGaWx0ZXI0W2lkeF0ubm9kZS5pbWFnZVVybDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYobGVuZ3RoQ29sb3JWYXIgPT0gMil7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvZHVjdEZpZWxkQ29sb3IuYXBwZW5kKCc8bGFiZWwgY2xhc3M9XCJmb3JtLW9wdGlvbiBmb3JtLW9wdGlvbi1zd2F0Y2hcIiBkYXRhLXByb2R1Y3Qtc3dhdGNoLXZhbHVlPVwiJytpZFZhcisnXCI+PHNwYW4gY2xhc3M9XCJmb3JtLW9wdGlvbi10b29sdGlwXCI+Jyt0aXRsZVZhcisnPC9zcGFuPjxzcGFuIGNsYXNzPVwiZm9ybS1vcHRpb24tdmFyaWFudCBmb3JtLW9wdGlvbi12YXJpYW50LS1jb2xvciBmb3JtLW9wdGlvbi12YXJpYW50LS1jb2xvcjJcIiB0aXRsZT1cIicrdGl0bGVWYXIrJ1wiPjxzcGFuIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjonK2NvbG9yMSsnXCI+PC9zcGFuPjxzcGFuIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjonK2NvbG9yMisnXCI+PC9zcGFuPjwvc3Bhbj48L2xhYmVsPicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmKGxlbmd0aENvbG9yVmFyID09PSAzKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9kdWN0RmllbGRDb2xvci5hcHBlbmQoJzxsYWJlbCBjbGFzcz1cImZvcm0tb3B0aW9uIGZvcm0tb3B0aW9uLXN3YXRjaFwiIGRhdGEtcHJvZHVjdC1zd2F0Y2gtdmFsdWU9XCInK2lkVmFyKydcIj48c3BhbiBjbGFzcz1cImZvcm0tb3B0aW9uLXRvb2x0aXBcIj4nK3RpdGxlVmFyKyc8L3NwYW4+PHNwYW4gY2xhc3M9XCJmb3JtLW9wdGlvbi12YXJpYW50IGZvcm0tb3B0aW9uLXZhcmlhbnQtLWNvbG9yIGZvcm0tb3B0aW9uLXZhcmlhbnQtLWNvbG9yMlwiIHRpdGxlPVwiJyt0aXRsZVZhcisnXCI+PHNwYW4gc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOicrY29sb3IxKydcIj48L3NwYW4+PHNwYW4gc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOicrY29sb3IyKydcIj48L3NwYW4+PHNwYW4gc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOicrY29sb3IzKydcIj48L3NwYW4+PC9zcGFuPjwvbGFiZWw+Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYoQm9vbGVhbihjb2xvcjEpKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9kdWN0RmllbGRDb2xvci5hcHBlbmQoJzxsYWJlbCBjbGFzcz1cImZvcm0tb3B0aW9uIGZvcm0tb3B0aW9uLXN3YXRjaFwiIGRhdGEtcHJvZHVjdC1zd2F0Y2gtdmFsdWU9XCInK2lkVmFyKydcIj48c3BhbiBjbGFzcz1cImZvcm0tb3B0aW9uLXRvb2x0aXBcIj4nK3RpdGxlVmFyKyc8L3NwYW4+PHNwYW4gY2xhc3M9XCJmb3JtLW9wdGlvbi12YXJpYW50IGZvcm0tb3B0aW9uLXZhcmlhbnQtLWNvbG9yXCIgdGl0bGU9XCInK3RpdGxlVmFyKydcIiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6ICcrY29sb3IxKydcIj48L3NwYW4+PC9sYWJlbD4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZihCb29sZWFuKGltZykpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2R1Y3RGaWVsZENvbG9yLmFwcGVuZCgnPGxhYmVsIGNsYXNzPVwiZm9ybS1vcHRpb24gZm9ybS1vcHRpb24tc3dhdGNoXCIgZGF0YS1wcm9kdWN0LXN3YXRjaC12YWx1ZT1cIicraWRWYXIrJ1wiPjxzcGFuIGNsYXNzPVwiZm9ybS1vcHRpb24tdG9vbHRpcFwiPicrdGl0bGVWYXIrJzwvc3Bhbj48c3BhbiBjbGFzcz1cImZvcm0tb3B0aW9uLXZhcmlhbnQgZm9ybS1vcHRpb24tdmFyaWFudC0tcGF0dGVyblwiIHRpdGxlPVwiJyt0aXRsZVZhcisnXCIgc3R5bGU9XCJiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJytpbWcrJylcIj48L3NwYW4+PC9sYWJlbD4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNle1xuICAgICAgICAgICAgICAgICAgICBwcm9kdWN0RmllbGRDb2xvci5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZihhRmlsdGVyNS5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICAgICAgICAgaWYocHJvZHVjdEZpZWxkU2l6ZS5sZW5ndGggPCAxKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb2R1Y3Rfd3JhcHBlci5maW5kKCcuY2FyZC1vcHRpb24tJytwcm9kdWN0SWQrJycpLmFwcGVuZCgnPGRpdiBjbGFzcz1cImZvcm0tZmllbGQgZm9ybS1maWVsZC0tc2l6ZVwiPjxsYWJlbCBjbGFzcz1cImZvcm0tb3B0aW9uXCI+Jytjb250ZXh0LnRoZW1lU2V0dGluZ3MuaGFsb0FkZE9wdGlvbkZvclByb2R1Y3RUZXh0LnRvU3RyaW5nKCkrJzwvbGFiZWw+PC9kaXY+Jyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZigoYUZpbHRlcjUubGVuZ3RoID09IDApICYmIChhRmlsdGVyMy5sZW5ndGggPT0gMCkpe1xuICAgICAgICAgICAgICAgICAgICBwcm9kdWN0X3dyYXBwZXIuZmluZCgnLmNhcmQtb3B0aW9uLScrcHJvZHVjdElkKycnKS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNhbGxQcm9kdWN0T3B0aW9uKCk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHV0aWxzIGZyb20gJ0BiaWdjb21tZXJjZS9zdGVuY2lsLXV0aWxzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oY29udGV4dCwgZWwpIHtcbiAgICB2YXIgJHBvcHVwID0gJCgnLmxvb2tib29rLXBvcHVwJyk7XG4gICAgdmFyICRlbCA9IGVsO1xuXG4gICAgY29uc3QgJG9wdGlvbnMgPSB7XG4gICAgICAgIHRlbXBsYXRlOiAnaGFsb3RoZW1lcy9wcm9kdWN0cy9oYWxvLWxvb2tib29rLXRtcCdcbiAgICB9O1xuXG4gICAgJGVsLmZpbmQoJy5pdGVtIC5pdGVtLXBvaW50Jykub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICAkcG9wdXAucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKS5lbXB0eSgpO1xuXG4gICAgICAgIHZhciAkcHJvZElkID0gJChldmVudC50YXJnZXQpLmRhdGEoJ3Byb2R1Y3QtaWQnKSxcbiAgICAgICAgICAgIHBvc2l0aW9uID0gJChldmVudC50YXJnZXQpLm9mZnNldCgpLFxuICAgICAgICAgICAgY29udGFpbmVyID0gJGVsLm9mZnNldCgpO1xuXG4gICAgICAgIGlmKCRwcm9kSWQgIT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgIHV0aWxzLmFwaS5wcm9kdWN0LmdldEJ5SWQoJHByb2RJZCwgJG9wdGlvbnMsIChlcnIsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYoZXJyKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICRwb3B1cC5odG1sKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPj0gNTUxKSB7XG4gICAgICAgICAgICAgICAgJHBvcHVwLmNzcyh7J3RvcCc6IHBvc2l0aW9uLnRvcCAtIGNvbnRhaW5lci50b3AgLSAxMDAsICdsZWZ0JzogcG9zaXRpb24ubGVmdCAtIGNvbnRhaW5lci5sZWZ0ICsgMzB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJHBvcHVwLmNzcyh7J3RvcCc6IHBvc2l0aW9uLnRvcCAtIGNvbnRhaW5lci50b3AgKyAxNSwgJ2xlZnQnOiAxNX0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAkcG9wdXAuYWRkQ2xhc3MoXCJpcy1vcGVuXCIpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmNsb3NlLXByb2R1Y3QnLCBldmVudCA9PiB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgaWYgKCRwb3B1cC5oYXNDbGFzcyhcImlzLW9wZW5cIikpIHtcbiAgICAgICAgICAgICRwb3B1cC5yZW1vdmVDbGFzcyhcImlzLW9wZW5cIik7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICAgaWYoJHBvcHVwLmhhc0NsYXNzKFwiaXMtb3BlblwiKSkge1xuICAgICAgICAgICAgaWYoKCQoZXZlbnQudGFyZ2V0KS5jbG9zZXN0KCRwb3B1cCkubGVuZ3RoID09PSAwKSAmJiAoJChldmVudC50YXJnZXQpLmNsb3Nlc3QoJy5pdGVtIC5pdGVtLXBvaW50JykubGVuZ3RoID09PSAwKSkge1xuICAgICAgICAgICAgICAgICRwb3B1cC5yZW1vdmVDbGFzcyhcImlzLW9wZW5cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=