(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[3],{

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

/***/ "./assets/js/theme/halothemes/haloBundleProducts.js":
/*!**********************************************************!*\
  !*** ./assets/js/theme/halothemes/haloBundleProducts.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var lodash_isObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/isObject */ "./node_modules/lodash/isObject.js");
/* harmony import */ var lodash_isObject__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_isObject__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_isNumber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/isNumber */ "./node_modules/lodash/isNumber.js");
/* harmony import */ var lodash_isNumber__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_isNumber__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_isPlainObject__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/isPlainObject */ "./node_modules/lodash/isPlainObject.js");
/* harmony import */ var lodash_isPlainObject__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_isPlainObject__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _global_modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../global/modal */ "./assets/js/theme/global/modal.js");



function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }


/* harmony default export */ __webpack_exports__["default"] = (function ($scope, context) {
  var thisProuctId = parseInt(context.productId),
    $relateTab = $('#halo-related-products'),
    $bundle = $('#halo-bundle-products'),
    $bundleList = $bundle.find('.halo-product-list');
  var modal = Object(_global_modal__WEBPACK_IMPORTED_MODULE_4__["default"])('#modal')[0];
  var currency = context.money;
  showBundle();
  $(document).on('click', '.halo-toggle-options', function (event) {
    event.preventDefault();
    var $target = $(event.currentTarget);
    $('.halo-toggle-options').not($target).removeClass('is-focus');
    $('.halo-detail-options').not($target.next('.halo-detail-options')).removeClass('is-open');
    if (!$target.next('.halo-detail-options').hasClass('is-open')) {
      $target.addClass('is-focus');
      $target.next('.halo-detail-options').addClass('is-open');
    } else {
      $target.next('.halo-detail-options').removeClass('is-open');
      $target.removeClass('is-focus');
    }
  });
  $(document).on('click', '.halo-option-close', function (event) {
    event.preventDefault();
    $('.halo-detail-options').removeClass('is-open');
    $('.halo-toggle-options').removeClass('is-focus');
  });
  $(document).on('click', function (event) {
    if ($('.halo-detail-options').hasClass('is-open')) {
      if ($(event.target).closest('.halo-detail-options').length === 0 && $(event.target).closest('.halo-toggle-options').length === 0) {
        $('.halo-detail-options').removeClass('is-open');
        $('.halo-toggle-options').removeClass('is-focus');
      }
    }
  });
  $(document).on('change', '.halo-detail-checkbox', function (event) {
    var $target = $(event.currentTarget),
      id = $target.attr('id').replace('fbt_product', ''),
      product = $('.halo-product-item[data-product-id="' + id + '"]');
    if ($target.is(':checked') == false) {
      product.removeClass('isChecked');
      product.find('.halo-product-iconAdd').removeClass('halo-product-iconChecked');
    } else {
      product.addClass('isChecked');
      product.find('.halo-product-iconAdd').addClass('halo-product-iconChecked');
    }
    totalPrice();
  });
  $(document).on('click', '#halo-addAll', function (event) {
    event.preventDefault();
    var $form = $('form', $bundle);
    var arrPro = new Array();
    $('.halo-detail-checkbox').each(function (index, val) {
      if ($(val).is(':checked')) {
        arrPro.push(index);
      }
    });
    var check = false;
    if (arrPro.length > 0) {
      check = checkProduct($form, arrPro);
    }
    if (check) {
      if (arrPro.length > 0) {
        var k = arrPro.length;
        $bundle.find('.loadingOverlay').show();
        addToCart($form, 0, arrPro, k);
      }
    } else {
      var errorMessage = 'Please make sure all options have been filled in.';
      if (errorMessage) {
        var tmp = document.createElement('DIV');
        tmp.innerHTML = errorMessage;
        return Object(_global_modal__WEBPACK_IMPORTED_MODULE_4__["showAlertModal"])(tmp.textContent || tmp.innerText);
      }
    }
    event.preventDefault();
  });
  function showBundle() {
    var options = {
      template: {
        item: 'halothemes/products/halo-bundle-products-tmp',
        options: 'halothemes/products/halo-bundle-products-options'
      }
    };
    var prodBundleId = [],
      totalBlock = '';
    firstItem();
    if ($bundle.hasClass('halo-bundle-login')) {
      totalBlock = '<div class="halo-product-total">\
                            <div class="total-price">\
                                <span class="text">Log in for pricing</span>\
                            </div>\
                        </div>';
    } else {
      totalBlock = '<div class="halo-product-total">\
                            <div class="total-price">\
                                <span class="text">Total:</span>\
                                <span class="price"></span>\
                            </div>\
                            <a class="button button--primary halo-product-total-button" id="halo-addAll" href="#">Add All To Cart</a>\
                        </div>';
    }
    $bundle.find('.bundle-product-right').append(totalBlock);
    $.each(context.productCustomFields, function (index, obj) {
      if (obj.name == '__bundleid') {
        prodBundleId = JSON.parse('[' + obj.value + ']');
      }
    });
    prodBundleId = $.grep(prodBundleId, function (value) {
      return value != thisProuctId;
    });
    if ($bundle.length > 0 && prodBundleId.length == 0) {
      var num = 0,
        list = [];
      $relateTab.find('.card').each(function (index, val) {
        list.push({
          index: index,
          data: ""
        });
        var pId = $(val).data('product-id');
        if (pId != undefined) {
          _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_3__["default"].api.product.getById(pId, options, function (err, response) {
            if (err) {
              return false;
            }
            list.forEach(function (element) {
              if (element.index == index) {
                element.data = response;
              }
            });
            num++;
            if (num == $relateTab.find('.card').length) {
              showList(list);
            }
          });
        }
      });
    } else if ($bundle.length > 0 && prodBundleId.length > 0) {
      var num = 0,
        list = [],
        listFilter = $.unique(prodBundleId);
      $.each(listFilter, function (index, val) {
        list.push({
          index: index,
          data: ""
        });
        var pId = val;
        if (pId != undefined) {
          _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_3__["default"].api.product.getById(pId, options, function (err, response) {
            if (err) {
              return false;
            }
            list.forEach(function (element) {
              if (element.index == index) {
                element.data = response;
              }
            });
            num++;
            if (num == prodBundleId.length) {
              showList(list);
            }
          });
        }
      });
    }
  }
  function firstItem() {
    var firstItem = $bundleList.find('.halo-product-itemFirst'),
      pId = firstItem.data('product-id'),
      form = firstItem.find('form'),
      hasOptions = form.find('[data-fbt-option-change]').length,
      hasDefaultOptions = form.find('[data-default]').length;
    if (hasDefaultOptions && hasOptions) {
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_3__["default"].api.productAttributes.optionChange(pId, form.serialize(), 'products/bulk-discount-rates', function (err, response) {
        var attributesData = response.data || {};
        var attributesContent = response.content || {};
        updateProductAttributes(form, attributesData);
        if (hasDefaultOptions) {
          updateView(form, attributesData, attributesContent);
        } else {
          updateDefaultAttributesForOOS(attributesData);
        }
      });
    }
  }
  function showList(list) {
    list.forEach(function (element) {
      var response = element.data;
      $bundleList.append(response.item);
      if (response.options.trim() != "") {
        var pId = $(response.item).data('product-id'),
          $form = $bundleList.find('.halo-product-item[data-product-id="' + pId + '"] form');
        $form.append(response.options);
        var $productOptionsElement = $('[data-fbt-option-change]', $form);
        var hasOptions = $productOptionsElement.html().trim().length;
        var hasDefaultOptions = $(response.options).find('[data-default]').length;
        if (hasDefaultOptions && hasOptions) {
          _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_3__["default"].api.productAttributes.optionChange(pId, $form.serialize(), 'products/bulk-discount-rates', function (err, response) {
            if (response != undefined) {
              var attributesData = response.data || {};
              var attributesContent = response.content || {};
              updateProductAttributes($form, attributesData);
              if (hasDefaultOptions) {
                updateView($form, attributesData, attributesContent);
              } else {
                updateDefaultAttributesForOOS(attributesData);
              }
            }
          });
        }
        setProductVariant();
      }
    });
    productOptions();
    showSlickSlider($bundleList);
    if (!$bundle.hasClass('halo-bundle-login')) {
      totalPrice();
    }
    $bundle.removeClass('halo-block-disable');
  }
  function showSlickSlider(wrap) {
    if (wrap.length > 0) {
      wrap.slick({
        dots: true,
        arrows: false,
        slidesToShow: 2,
        slidesToScroll: 1,
        mobileFirst: true,
        infinite: false,
        nextArrow: "<svg class='slick-next slick-arrow slick-arrow-large' aria-label='Next Slide'><use xlink:href='#slick-arrow-next'></use></svg>",
        prevArrow: "<svg class='slick-prev slick-arrow slick-arrow-large' aria-label='Previous Slide'><use xlink:href='#slick-arrow-prev'></use></svg>",
        responsive: [{
          breakpoint: 1600,
          settings: {
            slidesToScroll: 1,
            slidesToShow: 5,
            dots: false,
            arrows: true
          }
        }, {
          breakpoint: 1025,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1
          }
        }, {
          breakpoint: 551,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1
          }
        }]
      });
    }
  }
  function checkProduct(form, arrPro) {
    var check = true;
    for (var i = 0; i < arrPro.length; i++) {
      var k = arrPro[i],
        $form = $(form[k]);
      if ($form.find('[data-fbt-option-change]').length) {
        check = checkBeforeAdd($form);
        if (check == false) {
          return false;
        }
      }
    }
    return check;
  }
  function checkBeforeAdd($attributes) {
    var check = true,
      att = "";
    $attributes.find('input:text, input:password, input:file, textarea').each(function (index, element) {
      if (!$(element).prop('required')) {} else {
        if ($(element).val()) {} else {
          $(element).focus();
          check = false;
        }
      }
    });
    $attributes.find('select').each(function (index, element) {
      if (!$(element).prop('required')) {} else {
        if ($(element).val()) {} else {
          $(element).focus();
          check = false;
        }
      }
    });
    $attributes.find('input:radio, input:checkbox').each(function (index, element) {
      if (att != $(element).attr("name")) {
        att = $(element).attr("name");
        if (!$(element).prop('required')) {
          if ($(element).attr("type") == "checkbox") {
            if ($("[name='" + att + "']:checked").val()) {}
          }
          if ($(element).attr("type") == "radio") {
            if ($("[name='" + att + "']:checked").val()) {}
          }
        } else {
          if ($(element).attr("type") == "checkbox") {
            if ($("[name='" + att + "']:checked").val()) {} else {
              check = false;
            }
          }
          if ($(element).attr("type") == "radio") {
            if ($("[name='" + att + "']:checked").val()) {} else {
              check = false;
            }
          }
        }
      }
    });
    return check;
  }
  function addToCart(form, i, arrP, k) {
    if (window.FormData === undefined) {
      return;
    }
    var prod = arrP[i];
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_3__["default"].api.cart.itemAdd(filterEmptyFilesFromForm(new FormData(form[prod])), function (err, response) {
      var errorMessage = err || response.data.error;
      if (errorMessage) {
        var tmp = document.createElement('DIV');
        tmp.innerHTML = errorMessage;
        alert(tmp.textContent || tmp.innerText);
        k = k - 1;
      }
      i++;
      if (i >= arrP.length) {
        $bundle.find('.loadingOverlay').hide();
        modal.$modal.removeClass().addClass('modal modal--preview modal--previewMini modal--previewMini2');
        modal.open({
          size: 'small'
        });
        if ($(".modal-background:visible").length > 0) {
          $('.modal-background:visible').hide();
        }
        var response;
        if (k > 0) {
          response = '<div class="modal-header">\
                        <h2 class="modal-header-title">\
                            Ok, ' + k + ' item was added to your cart. What\'s next?\
                        </h2>\
                    </div>\
                    <div class="modal-body">\
                        <div class="previewCart previewCart2">\
                            <section class="previewCartCheckout previewCartCheckout2">\
                                <a href="/checkout.php" class="button button--primary">\
                                    Proceed To Checkout\
                                </a>\
                                <p class="previewCartCheckout-autoClose" data-auto-close="10">Auto close after <span class="count"></span>s</p>\
                            </section>\
                        </div>\
                    </div>';
        } else {
          response = '<div class="modal-header">\
                        <h2 class="modal-header-title">\
                            Ok, ' + k + ' item was added to your cart. What\'s next?\
                        </h2>\
                    </div>\
                    <div class="modal-body">\
                        <div class="previewCart previewCart2">\
                            <section class="previewCartCheckout previewCartCheckout2">\
                                <p class="previewCartCheckout-text">Sorry! We don\'t have enough product for your selection!</p>\
                                <p class="previewCartCheckout-autoClose" data-auto-close="10">Auto close after <span class="count"></span>s</p>\
                            </section>\
                        </div>\
                    </div>';
        }
        var $body = $('body');
        var quantity = parseInt($body.find('.cartDesktop .cart-quantity').text()) + k;
        $body.trigger('cart-quantity-update', quantity);
        modal.updateContent(response);
        return;
      }
      addToCart(form, i, arrP, k);
    });
  }
  function totalPrice() {
    var total = 0,
      symbol,
      symbolChange,
      decimalPlaces,
      decimalSeparator,
      thousandsSeparator,
      symbolLocation,
      curr,
      token1,
      token2,
      length;
    decimalPlaces = currency.decimal_places;
    decimalSeparator = currency.decimal_token;
    thousandsSeparator = currency.thousands_token;
    symbolLocation = currency.currency_location;
    symbol = currency.currency_token;
    $bundleList.find('.halo-product-item.isChecked').each(function (index, val) {
      var price = parseFloat($(val).find('[data-price-value]').attr('data-price-value'));
      total = total + price;
    });
    if ($('.productView-price > .price-section > .price.price--withTax', $scope).length) {
      curr = $('.productView-price > .price-section > .price.price--withTax', $scope).text();
    } else {
      curr = $('.productView-price > .price-section > .price.price--withoutTax', $scope).text();
    }
    symbolChange = curr.replace(/[0-9]/g, "").replace(".", "").replace(",", "");
    if (symbol != symbolChange) {
      symbol = symbolChange;
      token1 = curr.indexOf('.');
      token2 = curr.indexOf(',');
      length = curr.length - 1;
      if (curr.indexOf(symbol) != -1) {
        symbolLocation = curr.indexOf(symbol);
      }
      if (token1 < token2) {
        thousandsSeparator = '.';
        decimalSeparator = ',';
        if (symbolLocation == 0 || symbolLocation == "left") {
          decimalPlaces = length - token2;
        } else {
          decimalPlaces = length - token2 - 1;
        }
      } else {
        thousandsSeparator = ',';
        decimalSeparator = '.';
        if (symbolLocation == 0 || symbolLocation == "left") {
          decimalPlaces = length - token1;
        } else {
          decimalPlaces = length - token1 - 1;
        }
      }
    }
    if (total == 0) {
      $bundle.find('#halo-addAll').attr('disabled', true);
    } else {
      $bundle.find('#halo-addAll').attr('disabled', false);
    }
    total = formatMoney(total, decimalPlaces, decimalSeparator, thousandsSeparator);
    if (symbolLocation == "left" || symbolLocation == 0) {
      total = symbol + total;
    } else {
      total = total + symbol;
    }
    $bundle.find('.halo-product-total .price').html(total);
  }
  function formatMoney(n, c, d, t) {
    var c = isNaN(c = Math.abs(c)) ? 2 : c,
      d = d == undefined ? "." : d,
      t = t == undefined ? "," : t,
      s = n < 0 ? "-" : "",
      i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
      j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
  }
  ;
  function productOptions() {
    if (!$bundle.hasClass('halo-bundle-login')) {
      totalPrice();
    }
    var $form = $('form', $bundle),
      $productOptionsElement = $('[data-fbt-option-change]', $form);
    $(document).on('change', $productOptionsElement, function (event) {
      productOptionsChanged(event);
      setProductVariant(event);
    });
  }
  function setProductVariant() {
    var unsatisfiedRequiredFields = [];
    var options = [];
    $.each($('[data-fbt-option-change] [data-product-attribute]'), function (index, value) {
      var optionLabel = value.children[0].innerText;
      var optionTitle = optionLabel.split(':')[0].trim();
      var required = optionLabel.toLowerCase().includes('required');
      var type = value.getAttribute('data-product-attribute');
      if ((type === 'input-file' || type === 'input-text' || type === 'input-number') && value.querySelector('input').value === '' && required) {
        unsatisfiedRequiredFields.push(value);
      }
      if (type === 'textarea' && value.querySelector('textarea').value === '' && required) {
        unsatisfiedRequiredFields.push(value);
      }
      if (type === 'date') {
        var isSatisfied = Array.from(value.querySelectorAll('select')).every(function (select) {
          return select.selectedIndex !== 0;
        });
        if (isSatisfied) {
          var dateString = Array.from(value.querySelectorAll('select')).map(function (x) {
            return x.value;
          }).join('-');
          options.push(optionTitle + ":" + dateString);
          return;
        }
        if (required) {
          unsatisfiedRequiredFields.push(value);
        }
      }
      if (type === 'set-select') {
        var select = value.querySelector('select');
        var selectedIndex = select.selectedIndex;
        if (selectedIndex !== 0) {
          options.push(optionTitle + ":" + select.options[selectedIndex].innerText);
          $(value.children[0]).find('[data-option-value]').text(select.options[selectedIndex].innerText);
          return;
        }
        if (required) {
          unsatisfiedRequiredFields.push(value);
        }
      }
      if (type === 'set-rectangle' || type === 'set-radio' || type === 'swatch' || type === 'input-checkbox' || type === 'product-list') {
        var checked = value.querySelector(':checked');
        if (checked) {
          if (type === 'set-rectangle' || type === 'set-radio' || type === 'product-list') {
            var label = checked.labels[0].innerText;
            if (label) {
              options.push(optionTitle + ":" + label);
              $(value.children[0]).find('[data-option-value]').text(label);
            }
          }
          if (type === 'swatch') {
            var _label = checked.labels[0].children[0];
            if (_label) {
              options.push(optionTitle + ":" + _label.title);
              $(value.children[0]).find('[data-option-value]').text(_label.title);
            }
          }
          if (type === 'input-checkbox') {
            options.push(optionTitle + ":Yes");
          }
          return;
        }
        if (type === 'input-checkbox') {
          options.push(optionTitle + ":No");
        }
        if (required) {
          unsatisfiedRequiredFields.push(value);
        }
      }
    });
  }
  function productOptionsChanged(event) {
    var $changedOption = $(event.target);
    var $form = $changedOption.parents('form');
    var productId = $('[name="product_id"]', $form).val();
    if ($changedOption.attr('type') === 'file' || window.FormData === undefined) {
      return;
    }
    if ($changedOption.attr('id') === 'fbt_product' + productId) {
      return;
    }
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_3__["default"].api.productAttributes.optionChange(productId, $form.serialize(), 'products/bulk-discount-rates', function (err, response) {
      var productAttributesData = response.data || {};
      var productAttributesContent = response.content || {};
      showProductImage(productId, productAttributesData);
      updateProductAttributes($form, productAttributesData);
      updateView($form, productAttributesData, productAttributesContent);
      if (!$bundle.hasClass('halo-bundle-login')) {
        totalPrice();
      }
    });
    return false;
  }
  function updateProductAttributes($scope, data) {
    var behavior = data.out_of_stock_behavior;
    var inStockIds = data.in_stock_attributes;
    var outOfStockMessage = " (" + data.out_of_stock_message + ")";
    if (behavior !== 'hide_option' && behavior !== 'label_option') {
      return;
    }
    $('[data-product-attribute-value]', $scope).each(function (i, attribute) {
      var $attribute = $(attribute);
      var attrId = parseInt($attribute.data('productAttributeValue'), 10);
      if (inStockIds.indexOf(attrId) !== -1) {
        enableAttribute($attribute, behavior, outOfStockMessage);
      } else {
        disableAttribute($attribute, behavior, outOfStockMessage);
      }
    });
  }
  function disableAttribute($attribute, behavior, outOfStockMessage) {
    if (getAttributeType($attribute) === 'set-select') {
      return disableSelectOptionAttribute($attribute, behavior, outOfStockMessage);
    }
    if (behavior === 'hide_option') {
      $attribute.hide();
    } else {
      $attribute.addClass('unavailable');
    }
  }
  function disableSelectOptionAttribute($attribute, behavior, outOfStockMessage) {
    var $select = $attribute.parent();
    if (behavior === 'hide_option') {
      $attribute.toggleOption(false);
      if ($select.val() === $attribute.attr('value')) {
        $select[0].selectedIndex = 0;
      }
    } else {
      $attribute.attr('disabled', 'disabled');
      $attribute.html($attribute.html().replace(outOfStockMessage, '') + outOfStockMessage);
    }
  }
  function enableAttribute($attribute, behavior, outOfStockMessage) {
    if (getAttributeType($attribute) === 'set-select') {
      return enableSelectOptionAttribute($attribute, behavior, outOfStockMessage);
    }
    if (behavior === 'hide_option') {
      $attribute.show();
    } else {
      $attribute.removeClass('unavailable');
    }
  }
  function enableSelectOptionAttribute($attribute, behavior, outOfStockMessage) {
    if (behavior === 'hide_option') {
      $attribute.toggleOption(true);
    } else {
      $attribute.prop('disabled', false);
      $attribute.html($attribute.html().replace(outOfStockMessage, ''));
    }
  }
  function getAttributeType($attribute) {
    var $parent = $attribute.closest('[data-product-attribute]');
    return $parent ? $parent.data('productAttribute') : null;
  }
  function showProductImage(productId, data) {
    if (lodash_isPlainObject__WEBPACK_IMPORTED_MODULE_2___default()(data.image)) {
      var mainImageUrl = _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_3__["default"].tools.imageSrcset.getSrcset(data.image.data, {
        '1x': context.themeSettings.productgallery_size
      });
      $('.halo-product-item[data-product-id="' + productId + '"]').find('img').attr({
        'srcset': mainImageUrl,
        'data-srcset': $(this).attr('srcset')
      });
    } else {
      var _mainImageUrl = $('.halo-product-item[data-product-id="' + productId + '"]').find('img').attr('data-srcset');
      $('.halo-product-item[data-product-id="' + productId + '"]').find('img').attr({
        'srcset': _mainImageUrl,
        'data-srcset': $(this).attr('srcset')
      });
    }
  }
  function updateView($scope, data, content) {
    if (content === void 0) {
      content = null;
    }
    var viewModel = getViewModel($scope);
    showMessageBox(data.stock_message || data.purchasing_message, $scope);
    if (lodash_isNumber__WEBPACK_IMPORTED_MODULE_1___default()(data.stock)) {
      if (data.stock <= parseInt(context.themeSettings.halo_stock_level_limit) && data.stock > 0) {
        viewModel.$stockLeftWrapper.removeClass('u-hiddenVisually');
        viewModel.$stockLeft.text(data.stock);
      } else {
        viewModel.$stockLeftWrapper.addClass('u-hiddenVisually');
      }
    }
    if (lodash_isObject__WEBPACK_IMPORTED_MODULE_0___default()(data.price)) {
      updatePriceView(viewModel, data.price);
    }
    var productId = $('[name="product_id"]', $scope).val(),
      product = $bundleList.find('.halo-product-item[data-product-id="' + productId + '"]'),
      productCheckbox = product.find('.halo-detail-checkbox');
    if (!data.purchasable || !data.instock) {
      product.removeClass('isChecked hasOptions--selected');
      productCheckbox.prop('checked', false).prop('disabled', true);
    } else {
      product.addClass('isChecked');
      productCheckbox.prop('checked', true).prop('disabled', false);
      if ($scope.find('[data-fbt-option-change]').length > 0) {
        var check = checkBeforeAdd($scope);
        if (check == true) {
          product.addClass('hasOptions--selected');
        }
      }
    }
  }
  function updateDefaultAttributesForOOS($scope, data) {
    var productId = $('[name="product_id"]', $scope).val(),
      product = $bundleList.find('.halo-product-item[data-product-id="' + productId + '"]'),
      productCheckbox = product.find('.halo-detail-checkbox');
    if (!data.purchasable || !data.instock) {
      product.removeClass('isChecked hasOptions--selected');
      productCheckbox.prop('checked', false).prop('disabled', true);
    } else {
      product.addClass('isChecked');
      productCheckbox.prop('checked', true).prop('disabled', false);
      if ($scope.find('[data-fbt-option-change]').length > 0) {
        var check = checkBeforeAdd($scope);
        if (check == true) {
          product.addClass('hasOptions--selected');
        }
      }
    }
  }
  function getViewModel($scope) {
    return {
      $priceWithTax: $('[data-product-price-with-tax]', $scope),
      $priceWithoutTax: $('[data-product-price-without-tax]', $scope),
      rrpWithTax: {
        $div: $('.rrp-price--withTax', $scope),
        $span: $('[data-product-rrp-with-tax]', $scope)
      },
      rrpWithoutTax: {
        $div: $('.rrp-price--withoutTax', $scope),
        $span: $('[data-product-rrp-price-without-tax]', $scope)
      },
      nonSaleWithTax: {
        $div: $('.non-sale-price--withTax', $scope),
        $span: $('[data-product-non-sale-price-with-tax]', $scope)
      },
      nonSaleWithoutTax: {
        $div: $('.non-sale-price--withoutTax', $scope),
        $span: $('[data-product-non-sale-price-without-tax]', $scope)
      },
      priceSaved: {
        $div: $('.price-section--saving', $scope),
        $span: $('[data-product-price-saved]', $scope)
      },
      priceNowLabel: {
        $span: $('.price-now-label', $scope)
      },
      priceLabel: {
        $span: $('.price-label', $scope)
      },
      priceData: {
        $div: $('[data-price-value]', $scope)
      },
      $weight: $('.productView-info [data-product-weight]', $scope),
      $increments: $('.form-field--increments :input', $scope),
      $addToCart: $('#form-action-addToCart', $scope),
      $wishlistVariation: $('[data-wishlist-add] [name="variation_id"]', $scope),
      $stockLeft: $('[data-stock-left]', $scope),
      $stockLeftWrapper: $('.productView-optionsStock', $scope),
      stock: {
        $container: $('.form-field--stock', $scope),
        $input: $('[data-product-stock]', $scope)
      },
      $sku: $('[data-product-sku]'),
      $upc: $('[data-product-upc]'),
      quantity: {
        $text: $('.incrementTotal', $scope),
        $input: $('[name=qty\\[\\]]', $scope)
      },
      $bulkPricing: $('.productView-info-bulkPricing', $scope)
    };
  }
  function showMessageBox(message, $scope) {
    var $messageBox = $('.productAttributes-message', $scope);
    if (message) {
      $('.alertBox-message', $messageBox).text(message);
      $messageBox.show();
    } else {
      $messageBox.hide();
    }
  }
  function clearPricingNotFound(viewModel) {
    viewModel.rrpWithTax.$div.hide();
    viewModel.rrpWithoutTax.$div.hide();
    viewModel.nonSaleWithTax.$div.hide();
    viewModel.nonSaleWithoutTax.$div.hide();
    viewModel.priceSaved.$div.hide();
    viewModel.priceNowLabel.$span.hide();
    viewModel.priceLabel.$span.hide();
  }
  function updatePriceView(viewModel, price) {
    clearPricingNotFound(viewModel);
    if (price.with_tax) {
      viewModel.priceLabel.$span.show();
      viewModel.$priceWithTax.html(price.with_tax.formatted);
      viewModel.priceData.$div.attr('data-price-value', price.with_tax.value);
    }
    if (price.without_tax) {
      viewModel.priceLabel.$span.show();
      viewModel.$priceWithoutTax.html(price.without_tax.formatted);
      viewModel.priceData.$div.attr('data-price-value', price.without_tax.value);
    }
    if (price.rrp_with_tax) {
      viewModel.rrpWithTax.$div.show();
      viewModel.rrpWithTax.$span.html(price.rrp_with_tax.formatted);
    }
    if (price.rrp_without_tax) {
      viewModel.rrpWithoutTax.$div.show();
      viewModel.rrpWithoutTax.$span.html(price.rrp_without_tax.formatted);
    }
    if (price.saved) {
      viewModel.priceSaved.$div.show();
      viewModel.priceSaved.$span.html(price.saved.formatted);
    }
    if (price.non_sale_price_with_tax) {
      viewModel.priceLabel.$span.hide();
      viewModel.nonSaleWithTax.$div.show();
      viewModel.priceNowLabel.$span.show();
      viewModel.nonSaleWithTax.$span.html(price.non_sale_price_with_tax.formatted);
    }
    if (price.non_sale_price_without_tax) {
      viewModel.priceLabel.$span.hide();
      viewModel.nonSaleWithoutTax.$div.show();
      viewModel.priceNowLabel.$span.show();
      viewModel.nonSaleWithoutTax.$span.html(price.non_sale_price_without_tax.formatted);
    }
  }
  function filterEmptyFilesFromForm(formData) {
    try {
      for (var _iterator = _createForOfIteratorHelperLoose(formData), _step; !(_step = _iterator()).done;) {
        var _step$value = _step.value,
          key = _step$value[0],
          val = _step$value[1];
        if (val instanceof File && !val.name && !val.size) {
          formData.delete(key);
        }
      }
    } catch (e) {
      console.error(e);
    }
    return formData;
  }
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/halothemes/haloNextProducts.js":
/*!********************************************************!*\
  !*** ./assets/js/theme/halothemes/haloNextProducts.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");

/* harmony default export */ __webpack_exports__["default"] = (function (context) {
  if ($('.productView-nextProducts').length) {
    var getProduct = function getProduct(arr) {
      return fetch('/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
          query: "\n                query MyQuery {\n                    site {\n                        products (entityIds: [" + arr + "]) {\n                          edges {\n                            product: node {\n                              ...ProductFields\n                              }\n                            }\n                        }\n                        currency (currencyCode: " + curCode + ") {\n                            display {\n                                symbol\n                                symbolPlacement\n                                decimalToken\n                                thousandsToken\n                                decimalPlaces\n                            }\n                        }\n                    }\n                }\n                fragment ProductFields on Product {\n                    id\n                    entityId\n                    name\n                    path\n                    defaultImage {\n                        img70px: url(width: 70)\n                        altText\n                    }\n                    prices {\n                        priceRange {\n                            min {\n                                ...MoneyFields\n                            }\n                            max {\n                                ...MoneyFields\n                            }\n                        }\n                        retailPrice {\n                            ...MoneyFields\n                        }\n                        basePrice {\n                            ...MoneyFields\n                        }\n                        price {\n                            ...MoneyFields\n                        }\n                    }\n                }\n                fragment MoneyFields on Money {\n                    value\n                    currencyCode\n                }\n            "
        })
      }).then(function (res) {
        return res.json();
      }).then(function (res) {
        return res.data;
      });
    };
    var formatMoney = function formatMoney(n, c, d, t) {
      var c = isNaN(c = Math.abs(c)) ? 2 : c,
        d = d == undefined ? "." : d,
        t = t == undefined ? "," : t,
        s = n < 0 ? "-" : "",
        i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
        j = (j = i.length) > 3 ? j % 3 : 0;
      return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
    };
    var renderProduct = function renderProduct(product, curDisplay) {
      if (product != undefined) {
        $.each(product, function (index, element) {
          var item = element.product,
            symbol = curDisplay.symbol,
            symbolPlacement = curDisplay.symbolPlacement.toLowerCase(),
            decimalToken = curDisplay.decimalToken,
            decimalPlaces = curDisplay.decimalPlaces,
            thousandsToken = curDisplay.thousandsToken;
          var title, price;
          if (context.themeSettings.halo_card_title == 'ellipsis') {
            title = '<a href="' + item.path + '" class="card-ellipsis" style="-webkit-box-orient: vertical;">' + item.name + '</a>';
          } else {
            title = '<a href="' + item.path + '">' + item.name + '</a>';
          }
          if ($('.body').hasClass('is-login') || context.themeSettings.restrict_to_login !== true) {
            if (item.prices.priceRange.min.value < item.prices.priceRange.max.value && context.themeSettings.price_ranges) {
              var priceMin = (symbolPlacement == "left" ? symbol : "") + formatMoney(item.prices.priceRange.min.value, decimalPlaces, decimalToken, thousandsToken) + (symbolPlacement != "left" ? symbol : "");
              var priceMax = (symbolPlacement == "left" ? symbol : "") + formatMoney(item.prices.priceRange.max.value, decimalPlaces, decimalToken, thousandsToken) + (symbolPlacement != "left" ? symbol : "");
              price = '<div class="price-section price-section--withoutTax non-sale-price--withoutTax price-none" style="display: none;">\
                                        <span data-product-non-sale-price-without-tax="" class="price price--non-sale"></span>\
                                    </div>\
                                    <div class="price-section price-section--withoutTax">\
                                        <span data-product-price-without-tax="" class="price price--withoutTax">' + priceMin + ' - ' + priceMax + '</span>\
                                    </div>';
            } else {
              var priceDef = (symbolPlacement == "left" ? symbol : "") + formatMoney(item.prices.price.value, decimalPlaces, decimalToken, thousandsToken) + (symbolPlacement != "left" ? symbol : "");
              if (item.prices.retailPrice == null) {
                if (item.prices.basePrice.value > item.prices.price.value) {
                  var priceBas = (symbolPlacement == "left" ? symbol : "") + formatMoney(item.prices.basePrice.value, decimalPlaces, decimalToken, thousandsToken) + (symbolPlacement != "left" ? symbol : "");
                  price = '<div class="price-section price-section--withoutTax non-sale-price--withoutTax">\
                                                <span data-product-non-sale-price-without-tax="" class="price price--non-sale">' + priceBas + '</span>\
                                            </div>\
                                            <div class="price-section price-section--withoutTax">\
                                                <span data-product-price-without-tax="" class="price price--withoutTax">' + priceDef + '</span>\
                                            </div>';
                } else {
                  price = '<div class="price-section price-section--withoutTax non-sale-price--withoutTax price-none" style="display: none;">\
                                                <span data-product-non-sale-price-without-tax="" class="price price--non-sale"></span>\
                                            </div>\
                                            <div class="price-section price-section--withoutTax">\
                                                <span data-product-price-without-tax="" class="price price--withoutTax">' + priceDef + '</span>\
                                            </div>';
                }
              } else {
                if (item.prices.retailPrice.value > item.prices.price.value) {
                  var priceRet = (symbolPlacement == "left" ? symbol : "") + formatMoney(item.prices.retailPrice.value, decimalPlaces, decimalToken, thousandsToken) + (symbolPlacement != "left" ? symbol : "");
                  price = '<div class="price-section price-section--withoutTax non-sale-price--withoutTax">\
                                                <span data-product-non-sale-price-without-tax="" class="price price--non-sale">' + priceRet + '</span>\
                                            </div>\
                                            <div class="price-section price-section--withoutTax">\
                                                <span data-product-price-without-tax="" class="price price--withoutTax">' + priceDef + '</span>\
                                            </div>';
                } else {
                  price = '<div class="price-section price-section--withoutTax non-sale-price--withoutTax price-none" style="display: none;">\
                                                <span data-product-non-sale-price-without-tax="" class="price price--non-sale"></span>\
                                            </div>\
                                            <div class="price-section price-section--withoutTax">\
                                                <span data-product-price-without-tax="" class="price price--withoutTax">' + priceDef + '</span>\
                                            </div>';
                }
              }
            }
          } else {
            price = '<p translate>Log in for pricing</p>';
          }
          var html_card = '<div class="card card-custom" data-product-id="' + item.entityId + '">\
                                        <div class="card-image">\
                                            <a class="card-link" href="' + item.path + '">\
                                                <img src="' + item.defaultImage.img70px + '" alt="' + item.name + '" title="' + item.name + '" />\
                                            </a>\
                                        </div>\
                                        <div class="card-content">\
                                            <h4 class="card-title">' + title + '</h4>\
                                            <div class="card-price" data-test-info-type="price">' + price + '</div>\
                                        </div>\
                                    </div>';
          if (item.entityId == prevId) {
            if (item.path !== undefined) {
              $prodIcons.find('.prev-icon').attr('href', item.path);
              $prodIcons.find('.prev-icon').removeClass('disable');
              $prodWrap.find('#prev-product-modal').append(html_card);
            } else {
              $prodIcons.find('.prev-icon').remove();
              $prodWrap.find('#prev-product-modal').remove();
            }
          }
          if (item.entityId == nextId) {
            if (item.path !== undefined) {
              $prodIcons.find('.next-icon').attr('href', item.path);
              $prodIcons.find('.next-icon').removeClass('disable');
              $prodWrap.find('#next-product-modal').append(html_card);
            } else {
              $prodIcons.find('.next-icon').remove();
              $prodWrap.find('#next-product-modal').remove();
            }
          }
        });
      }
    };
    var token = context.token;
    var curCode = $('.body').data('currency-code');
    var productId = $('.productView-nextProducts').data('product-id'),
      nextId = productId + 1,
      prevId = productId - 1,
      nextLink,
      prevLink,
      list;
    var $prodWrap = $('.productView-nextProducts .next-prev-modal'),
      $prodIcons = $('.productView-nextProducts .next-prev-icons');
    if (prevId != undefined && nextId != undefined) {
      list = [prevId, nextId];
      getProduct(list).then(function (data) {
        renderProduct(data.site.products.edges, data.site.currency.display);
      });
    }
    $prodIcons.on('mouseover', function () {
      $prodWrap.addClass('is-active');
    }).on('mouseleave', function () {
      $prodWrap.removeClass('is-active');
    });
    $('.next-icon', $prodIcons).on('mouseover', function () {
      $('#prev-product-modal').removeClass('is-show');
      $('#next-product-modal').addClass('is-show');
    });
    $('.prev-icon', $prodIcons).on('mouseover', function () {
      $('#next-product-modal').removeClass('is-show');
      $('#prev-product-modal').addClass('is-show');
    });
    $prodWrap.on('mouseover', function () {
      $prodWrap.addClass('is-active');
    }).on('mouseleave', function () {
      $prodWrap.removeClass('is-active');
    });
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

/***/ "./assets/js/theme/halothemes/haloStickyAddToCart.js":
/*!***********************************************************!*\
  !*** ./assets/js/theme/halothemes/haloStickyAddToCart.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var lodash_isObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/isObject */ "./node_modules/lodash/isObject.js");
/* harmony import */ var lodash_isObject__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_isObject__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_isPlainObject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/isPlainObject */ "./node_modules/lodash/isPlainObject.js");
/* harmony import */ var lodash_isPlainObject__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_isPlainObject__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var foundation_sites_js_foundation_foundation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! foundation-sites/js/foundation/foundation */ "./node_modules/foundation-sites/js/foundation/foundation.js");
/* harmony import */ var foundation_sites_js_foundation_foundation__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(foundation_sites_js_foundation_foundation__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var foundation_sites_js_foundation_foundation_dropdown__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! foundation-sites/js/foundation/foundation.dropdown */ "./node_modules/foundation-sites/js/foundation/foundation.dropdown.js");
/* harmony import */ var foundation_sites_js_foundation_foundation_dropdown__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(foundation_sites_js_foundation_foundation_dropdown__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _bigcommerce_stencil_utils_src_lib_request_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @bigcommerce/stencil-utils/src/lib/request.js */ "./node_modules/@bigcommerce/stencil-utils/src/lib/request.js");
/* harmony import */ var _global_modal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../global/modal */ "./assets/js/theme/global/modal.js");







/* harmony default export */ __webpack_exports__["default"] = (function ($scope, context) {
  var offsetScroll = $scope.find('[data-cart-item-add]'),
    scroll = offsetScroll.offset().top + offsetScroll.outerHeight(true);
  var showPrice = context.themeSettings.restrict_to_login;
  var previewModal = Object(_global_modal__WEBPACK_IMPORTED_MODULE_6__["default"])('#previewModal')[0],
    $sticky = $('.sticky-add-to-cart'),
    $stickyClose = $sticky.find('.sticky-product-close'),
    $stickyExpand = $sticky.find('.sticky-product-expand'),
    $prodId = $sticky.find('[data-cart-item-add-2] [name="product_id"]').val(),
    $prodPrice = $sticky.find('.sticky-price'),
    $prodOptions = $sticky.find('.sticky-options'),
    $prodOptionLabel = $prodOptions.find('.sticky-options-label'),
    $prodOptionDropdown = $prodOptions.find('.sticky-options-dropdown'),
    $imageWrapper = $sticky.find('.sticky-image'),
    $prodBtn = $sticky.find('.sticky-actions .button'),
    $prodWLBtn = $sticky.find('.sticky-wishlist'),
    waitMessage = $prodBtn.data('waitMessage'),
    originalBtnVal = $prodBtn.text(),
    $body = $('body');
  function loadSticky() {
    if (context.themeSettings.halo_sticky_add_to_cart == true && $sticky.length > 0) {
      loadOptions();
      $(window).scroll(function () {
        if ($(window).scrollTop() > scroll + 100) {
          if (!$sticky.hasClass('show-sticky')) {
            $sticky.addClass('show-sticky');
            if ($body.hasClass('page-type-product')) {
              $body.addClass('openStickyAddToCart');
            }
          }
        } else {
          $sticky.removeClass('show-sticky hidden-sticky show-full-sticky');
          if ($body.hasClass('page-type-product')) {
            $body.removeClass('openStickyAddToCart');
          }
        }
      });
      $prodOptionLabel.on('click', function (event) {
        $prodOptionDropdown.toggleClass('is-open');
      });
      $prodOptionDropdown.on('click', '.option-item', function (event) {
        var $target = $(event.currentTarget);
        if (!$target.hasClass('is-select')) {
          var optionLabel = $target.find('.option-itemWrapper').html(),
            optionAttr = $target.data('variant-attr');
          _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__["default"].api.productAttributes.optionChange($prodId, optionAttr, function (err, response) {
            var productAttributesData = response.data || {};
            updateView(productAttributesData);
          });
          $prodOptionDropdown.find('.option-item').removeClass('is-select');
          $target.addClass('is-select');
          $prodOptionLabel.find('.text').html(optionLabel);
          $prodOptionDropdown.removeClass('is-open');
        }
      });
      $stickyClose.on('click', function (event) {
        event.preventDefault();
        if ($sticky.hasClass('show-full-sticky')) {
          $sticky.removeClass('show-full-sticky');
        } else {
          $sticky.addClass('hidden-sticky');
          if ($body.hasClass('page-type-product')) {
            $body.removeClass('openStickyAddToCart');
          }
        }
      });
      $stickyExpand.on('click', function (event) {
        event.preventDefault();
        $sticky.addClass('show-full-sticky');
      });
      $prodBtn.on('click', function (event) {
        event.preventDefault();
        var attr = $prodBtn.attr('disabled2');
        if (typeof attr !== typeof undefined && attr !== false) {
          var form = $('form[data-cart-item-add]', $scope),
            height = $(window).scrollTop(),
            formHeight = form.offset().top + form.height() / 2;
          if (height > formHeight) {
            $('body,html').animate({
              scrollTop: form.offset().top - 50
            }, 700);
          }
        } else {
          addToCart();
        }
      });
      $prodWLBtn.on('click', function (event) {
        event.preventDefault();
        var $this_wl = $(event.currentTarget),
          url_awl = $this_wl.attr('href');
        $.post(url_awl).done(function () {
          window.location.href = url_awl;
        });
      });
      $(document).on('click', function (event) {
        if ($prodOptionDropdown.hasClass('is-open')) {
          if ($(event.target).closest('.sticky-options-dropdown').length === 0 && $(event.target).closest('.sticky-options-label').length === 0) {
            $prodOptionDropdown.removeClass('is-open');
          }
        }
      });
    }
  }
  loadSticky();
  function loadOptions() {
    if ($prodOptions.length > 0) {
      (function () {
        var decrementRows = function decrementRows(dLength) {
          var currenIndex = dLength - 1;
          rows[currenIndex] += 1;
          if (rows[currenIndex] < rowLimits[currenIndex] === false) {
            if (currenIndex === 0) {
              isNewOptionsReady = true;
            } else {
              rows[currenIndex] = 0;
              decrementRows(currenIndex);
            }
          }
        };
        var rows = [],
          rowLimits = [],
          rowObjects = [],
          newOptions = [];
        $('[data-product-attribute]', $scope).each(function (index, element) {
          var id = $(element).data('product-option-id'),
            type = $(element).data('product-attribute');
          if (type === 'input-checkbox' || type === 'product-list' || type === 'date' || type === 'input-file' || type === 'input-text' || type === 'input-number' || type === 'textarea') {} else {
            rows.push(0);
            if (type === 'set-rectangle' || type === 'set-radio' || type === 'swatch') {
              rowLimits.push($(element).find('.form-radio').length);
            }
            if (type === 'set-select') {
              rowLimits.push($(element).find('.form-select option:not(:first-child)').length);
            }
            var rowObject = [];
            if (type === 'set-rectangle' || type === 'set-radio' || type === 'swatch') {
              $(element).find('.form-radio').each(function (index2, element2) {
                rowObject.push({
                  attribute: id,
                  attributeValue: $(element2).attr('value'),
                  attributeLabel: $(element2).attr('name'),
                  attributeName: $(element2).attr('data-title'),
                  attributeIndex: $(element2).attr('data-index'),
                  invisible: false,
                  instock: true
                });
              });
            }
            if (type === 'set-select') {
              var setLabel = $(element).find('.form-select').attr('name');
              $(element).find('.form-select option:not(:first-child)').each(function (index2, element2) {
                rowObject.push({
                  attribute: id,
                  attributeValue: $(element2).attr('value'),
                  attributeLabel: setLabel,
                  attributeName: $(element2).attr('data-title'),
                  attributeIndex: $(element2).attr('data-index'),
                  invisible: false,
                  instock: true
                });
              });
            }
            rowObjects.push(rowObject);
          }
        });
        var isNewOptionsReady = false;
        var currentOptionIndex = 0;
        while (isNewOptionsReady === false) {
          newOptions[currentOptionIndex] = {
            attributes: [],
            label: '',
            name: '',
            position: ''
          };
          rows.forEach(function (r, rIndex) {
            newOptions[currentOptionIndex].attributes.push(rowObjects[rIndex][r]);
            newOptions[currentOptionIndex].label += rowObjects[rIndex][r].attributeLabel + " ";
            newOptions[currentOptionIndex].name += "<span>" + rowObjects[rIndex][r].attributeName + "</span>";
            newOptions[currentOptionIndex].position += "" + rowObjects[rIndex][r].attributeIndex;
          });
          decrementRows(rows.length);
          currentOptionIndex += 1;
        }
        var currentNewOptionIndex = 0;
        newOptions.forEach(function (newOption, newOptionIndex, newEl) {
          var attributeString = '';
          newOption.attributes.forEach(function (attribute) {
            attributeString = attributeString + ("&attribute[" + attribute.attribute + "]=") + attribute.attributeValue;
          });
          $(document.createElement("div")).attr({
            class: 'option-item',
            'data-variant-index': newOption.position,
            'data-variant-attr': attributeString
          }).append('<div class="option-itemWrapper">' + newOption.name + '</div>').appendTo($prodOptionDropdown);
        });
      })();
    }
  }
  function addToCart() {
    var $form = $('[data-cart-item-add-2]');
    var sku = $form.find('.sticky-actions').attr('data-product-sku-add');
    var att = $form.find('.option-item.is-select').data('variant-attr');
    var options = {
      template: 'cart/preview'
    };
    var url;
    if (sku != undefined && sku != null && sku != '') {
      url = "/cart.php?action=add&sku=" + sku + "&qty=1";
    } else {
      url = "/cart.php?action=add&product_id=" + $prodId + att;
    }
    $prodBtn.text(waitMessage).prop('disabled', true);
    Object(_bigcommerce_stencil_utils_src_lib_request_js__WEBPACK_IMPORTED_MODULE_5__["default"])(encodeURI(url), {
      method: 'POST',
      requestOptions: options
    }, function (err, response) {
      if (err) {
        throw new Error(err);
      }
      var errorMessage = err;
      if (errorMessage) {
        var tmp = document.createElement('DIV');
        tmp.innerHTML = errorMessage;
        return Object(_global_modal__WEBPACK_IMPORTED_MODULE_6__["showAlertModal"])(tmp.textContent || tmp.innerText);
      }
      $prodBtn.text(originalBtnVal).prop('disabled', false);
      if (previewModal) {
        if (context.themeSettings.halo_add_to_cart_popup === 'normal') {
          previewModal.$modal.removeClass().addClass('modal modal--preview');
          previewModal.open({
            size: 'large'
          });
        } else if (context.themeSettings.halo_add_to_cart_popup === 'mini') {
          previewModal.$modal.removeClass().addClass('modal modal--preview modal--previewMini');
          previewModal.open({
            size: 'small'
          });
          if ($(".modal-background:visible").length > 0) {
            $('.modal-background:visible').hide();
          }
        }
        updateCartContent(previewModal, response);
      } else {
        redirectTo(response.data.cart_item.cart_url || context.urls.cart);
      }
    });
  }
  function redirectTo(url) {
    if (this.isRunningInIframe() && !window.iframeSdk) {
      window.top.location = url;
    } else {
      window.location = url;
    }
  }
  function updateCartContent(modal, response) {
    var quantity = parseInt($body.find('.cartDesktop .cart-quantity').text()) + 1;
    $body.trigger('cart-quantity-update', quantity);
    modal.updateContent(response);
  }
  function showVariantImage(image) {
    if (lodash_isPlainObject__WEBPACK_IMPORTED_MODULE_1___default()(image)) {
      var mainImageUrl = _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__["default"].tools.imageSrcset.getSrcset(image.data, {
        '1x': context.themeSettings.productgallery_size
      });
      return mainImageUrl;
    }
  }
  function updateView(data) {
    var inStock = data.instock,
      image = data.image,
      sku = data.sku,
      price = data.price;
    if (inStock) {
      $prodBtn.attr('disabled', false);
      $prodOptionLabel.removeClass('option-hidden').addClass('option-visible');
    } else {
      $prodBtn.attr('disabled', true);
      $prodOptionLabel.removeClass('option-visible').addClass('option-hidden');
    }
    if (image != undefined && image !== null && image !== '') {
      $imageWrapper.find('img').attr('srcset', showVariantImage(image));
    }
    if (sku) {
      $('[data-product-sku-add]').attr('data-product-sku-add', sku);
    }
    if (lodash_isObject__WEBPACK_IMPORTED_MODULE_0___default()(price)) {
      updatePriceView(price);
    }
  }
  function updatePriceView(price) {
    if (price.with_tax) {
      $('.price-label', $prodPrice).show();
      $('[data-product-price-with-tax]', $prodPrice).html(price.with_tax.formatted);
    }
    if (price.without_tax) {
      $('.price-label', $prodPrice).show();
      $('[data-product-price-without-tax]', $prodPrice).html(price.without_tax.formatted);
    }
    if (price.rrp_with_tax) {
      $('.rrp-price--withTax', $prodPrice).show();
      $('[data-product-rrp-with-tax]', $prodPrice).html(price.rrp_with_tax.formatted);
    }
    if (price.rrp_without_tax) {
      $('.rrp-price--withoutTax', $prodPrice).show();
      $('[data-product-rrp-price-without-tax]', $prodPrice).html(price.rrp_without_tax.formatted);
    }
    if (price.saved) {
      $('.price-section--saving', $prodPrice).show();
      $('[data-product-price-saved]', $prodPrice).html(price.saved.formatted);
    }
    if (price.non_sale_price_with_tax) {
      $('.price-label', $prodPrice).hide();
      $('.non-sale-price--withTax', $prodPrice).show();
      $('.price-now-label', $prodPrice).show();
      $('[data-product-non-sale-price-with-tax]', $prodPrice).html(price.non_sale_price_with_tax.formatted);
    }
    if (price.non_sale_price_without_tax) {
      $('.price-label', $prodPrice).hide();
      $('.non-sale-price--withoutTax', $prodPrice).show();
      $('.price-now-label', $prodPrice).show();
      $('[data-product-non-sale-price-without-tax]', $prodPrice).html(price.non_sale_price_without_tax.formatted);
    }
  }
  window.onload = function () {
    if ($('.sticky-add-to-cart').length > 0) {
      if ($(window).scrollTop() > scroll - 160) {
        if (!$('.sticky-add-to-cart').hasClass('show-sticky')) {
          $('.sticky-add-to-cart').addClass('show-sticky');
          if ($('body').hasClass('page-type-product')) {
            $('body').addClass('openStickyAddToCart');
          }
        }
      }
    }
  };
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/product.js":
/*!************************************!*\
  !*** ./assets/js/theme/product.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Product; });
/* harmony import */ var sortablejs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sortablejs */ "./node_modules/sortablejs/modular/sortable.esm.js");
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./page-manager */ "./assets/js/theme/page-manager.js");
/* harmony import */ var _product_reviews__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./product/reviews */ "./assets/js/theme/product/reviews.js");
/* harmony import */ var _common_collapsible__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common/collapsible */ "./assets/js/theme/common/collapsible.js");
/* harmony import */ var _common_product_details__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./common/product-details */ "./assets/js/theme/common/product-details.js");
/* harmony import */ var _product_video_gallery__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./product/video-gallery */ "./assets/js/theme/product/video-gallery.js");
/* harmony import */ var _common_form_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./common/form-utils */ "./assets/js/theme/common/form-utils.js");
/* harmony import */ var _halothemes_haloAddOptionForProductCard__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./halothemes/haloAddOptionForProductCard */ "./assets/js/theme/halothemes/haloAddOptionForProductCard.js");
/* harmony import */ var _halothemes_haloProductLookbook__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./halothemes/haloProductLookbook */ "./assets/js/theme/halothemes/haloProductLookbook.js");
/* harmony import */ var _halothemes_haloBundleProducts__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./halothemes/haloBundleProducts */ "./assets/js/theme/halothemes/haloBundleProducts.js");
/* harmony import */ var _halothemes_haloNextProducts__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./halothemes/haloNextProducts */ "./assets/js/theme/halothemes/haloNextProducts.js");
/* harmony import */ var _halothemes_haloStickyAddToCart__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./halothemes/haloStickyAddToCart */ "./assets/js/theme/halothemes/haloStickyAddToCart.js");
/* harmony import */ var _halothemes_haloVideo__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./halothemes/haloVideo */ "./assets/js/theme/halothemes/haloVideo.js");
/* harmony import */ var _halothemes_haloNotifyMe__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./halothemes/haloNotifyMe */ "./assets/js/theme/halothemes/haloNotifyMe.js");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
/*
 Import all product specific js
 */














var Product = /*#__PURE__*/function (_PageManager) {
  _inheritsLoose(Product, _PageManager);
  function Product(context) {
    var _this;
    _this = _PageManager.call(this, context) || this;
    _this.url = window.location.href;
    _this.$reviewLink = $('[data-reveal-id="modal-review-form"]');
    _this.$bulkPricingLink = $('[data-reveal-id="modal-bulk-pricing"]');
    return _this;
  }
  var _proto = Product.prototype;
  _proto.onReady = function onReady() {
    var _this2 = this;
    // Listen for foundation modal close events to sanitize URL after review.
    $(document).on('close.fndtn.reveal', function () {
      if (_this2.url.indexOf('#write_review') !== -1 && typeof window.history.replaceState === 'function') {
        window.history.replaceState(null, document.title, window.location.pathname);
      }
    });
    var validator;

    // Init collapsible
    Object(_common_collapsible__WEBPACK_IMPORTED_MODULE_3__["default"])();
    this.productDetails = new _common_product_details__WEBPACK_IMPORTED_MODULE_4__["default"]($('.productView'), this.context, window.BCData.product_attributes);
    this.productDetails.setProductVariant();
    Object(_product_video_gallery__WEBPACK_IMPORTED_MODULE_5__["default"])();
    var $reviewForm = Object(_common_form_utils__WEBPACK_IMPORTED_MODULE_6__["classifyForm"])('.writeReview-form');
    var review = new _product_reviews__WEBPACK_IMPORTED_MODULE_2__["default"]($reviewForm);
    $('body').on('click', '[data-reveal-id="modal-review-form"]', function () {
      validator = review.registerValidation(_this2.context);
    });
    $reviewForm.on('submit', function () {
      if (validator) {
        validator.performCheck();
        return validator.areAll('valid');
      }
      return false;
    });
    this.productReviewHandler();
    this.bulkPricingHandler();
    this.productCustomTab();
    // this.productTabToggle();
    this.compareColors();
    this.productViewInfoTabs();
    this.soldProduct($('.productView-soldProduct'));
    this.viewingProduct($('.productView-ViewingProduct'));
    this.countDownProduct($('.productView-countDown'));
    this.loadOptionForProductCard();
    this.reviewShow();
    Object(_halothemes_haloNextProducts__WEBPACK_IMPORTED_MODULE_10__["default"])(this.context);
    Object(_halothemes_haloStickyAddToCart__WEBPACK_IMPORTED_MODULE_11__["default"])($('.productView'), this.context);
    Object(_halothemes_haloProductLookbook__WEBPACK_IMPORTED_MODULE_8__["default"])(this.context, $('.productView-lookbook'));
    Object(_halothemes_haloBundleProducts__WEBPACK_IMPORTED_MODULE_9__["default"])($('.productView-slick'), this.context);
    Object(_halothemes_haloNotifyMe__WEBPACK_IMPORTED_MODULE_13__["default"])($('.productView-slick'), this.context);
    Object(_halothemes_haloVideo__WEBPACK_IMPORTED_MODULE_12__["default"])($('.productView-slick [data-slick]'));
  };
  _proto.productReviewHandler = function productReviewHandler() {
    if (this.url.indexOf('#write_review') !== -1) {
      this.$reviewLink.trigger('click');
    }
  };
  _proto.bulkPricingHandler = function bulkPricingHandler() {
    if (this.url.indexOf('#bulk_pricing') !== -1) {
      this.$bulkPricingLink.trigger('click');
    }
  };
  _proto.reviewShow = function reviewShow(x) {
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
        var filteredAr = review2.filter(function (item) {
          return item['Product SKU'] === item1.innerHTML;
        });
        filteredAr.forEach(function (rev) {
          review3.push(rev['Review rate']);
        });
        var reviewAvg = Math.round(review3.reduce(function (a, b) {
          return a + b;
        }, 0) / review3.length * 10) / 10;
        $(item1.nextElementSibling).append("\n                <style>    .checked {\n                    color: rgb(255, 210, 0);\n            \n            }\n            .fa-star-o {\n                color: rgb(255, 210, 0);\n        \n            }\n            @media (min-width: 768px) {\n                .productReview2 {\n                    display: flex;\n                }\n            }\n            @media (min-width: 1025px) {\n                .productReview2 {\n                    display: unset;\n                }\n            }\n            @media (min-width: 1400px) {\n                .productReview2 {\n                    display: flex;\n                }\n            }\n            </style>\n<link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css\">\n                \n                <span>\n                <span class=\"fa fa-star" + (0.5 <= reviewAvg ? ' checked' : ' fa-star-o') + "\"></span>\n                <span class=\"fa fa-star" + (1.5 <= reviewAvg ? ' checked' : ' fa-star-o') + "\"></span>\n                <span class=\"fa fa-star" + (2.5 <= reviewAvg ? ' checked' : ' fa-star-o') + "\"></span>\n                <span class=\"fa fa-star" + (3.5 <= reviewAvg ? ' checked' : ' fa-star-o') + "\"></span>\n                <span class=\"fa fa-star" + (4.5 <= reviewAvg ? ' checked' : ' fa-star-o') + ("\"></span>      \n            </span>\n            <div style=padding-left:5px;>\n                " + review3.length + "  Rese\xF1as\n            </div>"));
        // $(item1.nextElementSibling).append(`<div>${reviewAvg}</div>`)
      });
    }).catch(function (err) {
      console.log(err);
    });
  };
  _proto.productCustomTab = function productCustomTab() {
    if ($('.productView-description [data-custom-tab]').length > 0) {
      $('.productView-description [data-custom-tab]').appendTo('#halo-custom-tab .card-body');
      $('#halo-custom-tab').removeClass('u-hiddenVisually');
      $('.productView-shortDesc [data-custom-tab]').remove();
      $('#halo-productView-description .productView-tabs .card-body').addClass('has-customTab');
    } else {
      $('#halo-productView-description .productView-tabs .card.warranty .title').addClass('no-customTab');
    }
  }

  // productTabToggle(){
  //     $('.productView-tabs .card .title').on('click', event => {
  //         event.preventDefault();

  //         var $target = $(event.currentTarget);

  //         $('.productView-tabs .card .title').not($target).removeClass('collapsed');

  //         if($target.hasClass('collapsed')){
  //             $target.removeClass('collapsed');
  //         } else{
  //             $target.addClass('collapsed');
  //         }

  //         $('.productView-tabs .card').each((index, element) =>{
  //             if($('.title', element).hasClass('collapsed')){
  //                 $(element).find('.collapse').slideDown("slow");
  //             } else{
  //                 $(element).find('.collapse').slideUp("slow");
  //             }
  //         });
  //     });

  //     $('.productView-tabs .card:nth-child(1) .title').trigger('click');
  // }
  ;
  _proto.soldProduct = function soldProduct($wrapper) {
    if ($wrapper.length > 0) {
      var numbersProduct_text = this.context.themeSettings.product_soldProduct_products,
        numbersHours_text = this.context.themeSettings.product_soldProduct_hours,
        soldProductText = this.context.themeSettings.product_soldProduct_text,
        soldProductText2 = this.context.themeSettings.product_soldProduct_hours_text;
      var numbersProductList = JSON.parse("[" + numbersProduct_text + "]"),
        numbersProductItem = Math.floor(Math.random() * numbersProductList.length),
        numbersHoursList = JSON.parse("[" + numbersHours_text + "]"),
        numbersHoursItem = Math.floor(Math.random() * numbersHoursList.length);
      $wrapper.html('<svg class="icon" aria-hidden="true"><use xlink:href="#icon-fire"/></svg><span class="text">' + numbersProductList[numbersProductItem] + " " + soldProductText + " " + numbersHoursList[numbersHoursItem] + " " + soldProductText2 + '</span>');
      $wrapper.show();
    }
  };
  _proto.countDownProduct = function countDownProduct($wrapper) {
    if ($wrapper.length > 0) {
      var countDown = $wrapper.data('countdown'),
        countDownDate = new Date(countDown).getTime(),
        seft = $wrapper;
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
  _proto.viewingProduct = function viewingProduct($wrapper) {
    if ($wrapper.length > 0) {
      var viewerText = this.context.themeSettings.product_viewingProduct_text,
        numbersViewer_text = this.context.themeSettings.product_viewingProduct_viewer,
        numbersViewerList = JSON.parse("[" + numbersViewer_text + "]");
      setInterval(function () {
        var numbersViewerItem = Math.floor(Math.random() * numbersViewerList.length);
        $wrapper.html('<svg class="icon" aria-hidden="true"><use xlink:href="#icon-eye"/></svg>' + numbersViewerList[numbersViewerItem] + " " + viewerText);
        $wrapper.removeClass('u-hiddenVisually').show();
      }, 10000);
    }
  };
  _proto.compareColors = function compareColors() {
    var $swatchWrapper = $('.halo-compareColors-swatch'),
      $imageWrapper = $('.halo-compareColors-image'),
      $textWrapper = $('.halo-compareColors-text');
    $('.form-option', $swatchWrapper).on('click', function (event) {
      var $this = $(event.currentTarget);
      $this.toggleClass('show-color');
      var title = $this.find('.form-option-variant').attr('title'),
        id = $this.data('product-swatch-value'),
        $color,
        $color2,
        $color3,
        $img,
        $pattern;
      if ($this.hasClass('show-color')) {
        if ($this.find('.form-option-variant--color').length) {
          $color = $this.find('.form-option-variant--color').attr('style');
          $imageWrapper.append('<div class="item item-color item-' + id + '"><span class="color" style="' + $color + ';"></span><span class="title">' + title + '</span></div>');
        } else if ($this.find('.form-option-variant--color2').length) {
          $color = $this.find('.form-option-variant--color2 span:nth-child(1)').attr('style');
          $color2 = $this.find('.form-option-variant--color2 span:nth-child(2)').attr('style');
          $('.halo-compareColors-image').append('<div class="item item-color item-' + id + '"><span class="color color2"><span style="' + $color + ';"></span><span style="' + $color2 + ';"></span></span><span class="title">' + title + '</span></div>');
        } else if ($this.find('.form-option-variant--color3').length) {
          $color = $this.find('.form-option-variant--color3 span:nth-child(1)').attr('style');
          $color2 = $this.find('.form-option-variant--color3 span:nth-child(2)').attr('style');
          $color3 = $this.find('.form-option-variant--color3 span:nth-child(3)').attr('style');
          $imageWrapper.append('<div class="item item-color item-' + id + '"><span class="color color3"><span style="' + $color + ';"></span><span style="' + $color2 + ';"></span><span style="' + $color3 + ';"></span></span><span class="title">' + title + '</span></div>');
        } else if ($this.find('.form-option-variant--pattern').length) {
          $img = $this.find('.form-option-variant--pattern').attr('style');
          $pattern = $this.find('.form-option-variant--pattern').attr('data-pattern');
          $imageWrapper.append('<div class="item item-partern item-' + id + '"><span class="image"><img src=' + $pattern + ' alt=' + title + ' title=' + title + '></span><span class="title">' + title + '</span></div>');
        }
      } else {
        $('.item-' + id + '', $imageWrapper).remove();
      }
      if ($imageWrapper.children().length > 0) {
        $textWrapper.hide();
      } else {
        $textWrapper.show();
      }
      if ($(window).width() >= 1025) {
        var el = document.getElementById('color-swatch-image');
        new sortablejs__WEBPACK_IMPORTED_MODULE_0__["default"](el, {
          animation: 150
        });
      }
    });
  };
  _proto.productViewInfoTabs = function productViewInfoTabs() {
    $('.productView-infoTabs .productView-infoTab a').on('click', function (event) {
      event.preventDefault();
      var $block = $(event.currentTarget).attr('href');
      $('html, body').animate({
        scrollTop: $($block).offset().top - $('.header').height()
      }, 700);
      if ($block == '#halo-productView-description') {
        if (!$('.productView-tabs .card:nth-child(1) .title').hasClass('collapsed')) {
          $('.productView-tabs .card:nth-child(1) .title').trigger('click');
        }
      }
    });
    $('.productView-moreDesc a').on('click', function (event) {
      event.preventDefault();
      $('html, body').animate({
        scrollTop: $('#halo-productView-description').offset().top - $('.header').height()
      }, 700);
      if (!$('.productView-tabs .card:nth-child(1) .title').hasClass('collapsed')) {
        $('.productView-tabs .card:nth-child(1) .title').trigger('click');
      }
    });
  };
  _proto.loadOptionForProductCard = function loadOptionForProductCard() {
    var _this3 = this;
    if ($('.productCarousel').length > 0) {
      $('.productCarousel').each(function (index, element) {
        var $prodWrapId = $(element).attr('id');
        Object(_halothemes_haloAddOptionForProductCard__WEBPACK_IMPORTED_MODULE_7__["default"])(_this3.context, $prodWrapId);
      });
    }
  };
  return Product;
}(_page_manager__WEBPACK_IMPORTED_MODULE_1__["default"]);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/product/reviews.js":
/*!********************************************!*\
  !*** ./assets/js/theme/product/reviews.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _default; });
/* harmony import */ var _common_nod__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/nod */ "./assets/js/theme/common/nod.js");
/* harmony import */ var _common_collapsible__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/collapsible */ "./assets/js/theme/common/collapsible.js");
/* harmony import */ var _common_models_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/models/forms */ "./assets/js/theme/common/models/forms.js");



var _default = /*#__PURE__*/function () {
  function _default($reviewForm) {
    this.validator = Object(_common_nod__WEBPACK_IMPORTED_MODULE_0__["default"])({
      submit: $reviewForm.find('input[type="submit"]')
    });
    this.$reviewsContent = $('#tab-reviews');
    this.$collapsible = $('[data-collapsible]', this.$reviewsContent);
    this.initLinkBind();
    this.injectPaginationLink();
    this.collapseReviews();
  }

  /**
   * On initial page load, the user clicks on "(12 Reviews)" link
   * The browser jumps to the review page and should expand the reviews section
   */
  var _proto = _default.prototype;
  _proto.initLinkBind = function initLinkBind() {
    var _this = this;
    var $content = $('#productReviews-content', this.$reviewsContent);
    $('.productView-reviewLink').on('click', function () {
      $('.productView-reviewTabLink').trigger('click');
      if (!$content.hasClass('is-open')) {
        _this.$collapsible.trigger(_common_collapsible__WEBPACK_IMPORTED_MODULE_1__["CollapsibleEvents"].click);
      }
    });
  };
  _proto.collapseReviews = function collapseReviews() {
    // We're in paginating state, do not collapse
    if (window.location.hash && window.location.hash.indexOf('#tab-reviews') === 0) {
      return;
    }

    // force collapse on page load
    this.$collapsible.trigger(_common_collapsible__WEBPACK_IMPORTED_MODULE_1__["CollapsibleEvents"].click);
  }

  /**
   * Inject ID into the pagination link
   */;
  _proto.injectPaginationLink = function injectPaginationLink() {
    var $nextLink = $('.pagination-item--next .pagination-link', this.$reviewsContent);
    var $prevLink = $('.pagination-item--previous .pagination-link', this.$reviewsContent);
    if ($nextLink.length) {
      $nextLink.attr('href', $nextLink.attr('href') + " #tab-reviews");
    }
    if ($prevLink.length) {
      $prevLink.attr('href', $prevLink.attr('href') + " #tab-reviews");
    }
  };
  _proto.registerValidation = function registerValidation(context) {
    this.context = context;
    this.validator.add([{
      selector: '[name="revrating"]',
      validate: 'presence',
      errorMessage: this.context.reviewRating
    }, {
      selector: '[name="revtitle"]',
      validate: 'presence',
      errorMessage: this.context.reviewSubject
    }, {
      selector: '[name="revtext"]',
      validate: 'presence',
      errorMessage: this.context.reviewComment
    }, {
      selector: '.writeReview-form [name="email"]',
      validate: function validate(cb, val) {
        var result = _common_models_forms__WEBPACK_IMPORTED_MODULE_2__["default"].email(val);
        cb(result);
      },
      errorMessage: this.context.reviewEmail
    }]);
    return this.validator;
  };
  _proto.validate = function validate() {
    return this.validator.performCheck();
  };
  return _default;
}();

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/product/video-gallery.js":
/*!**************************************************!*\
  !*** ./assets/js/theme/product/video-gallery.js ***!
  \**************************************************/
/*! exports provided: VideoGallery, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VideoGallery", function() { return VideoGallery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return videoGallery; });
var VideoGallery = /*#__PURE__*/function () {
  function VideoGallery($element) {
    this.$player = $element.find('[data-video-player]');
    this.$videos = $element.find('[data-video-item]');
    this.currentVideo = {};
    this.bindEvents();
  }
  var _proto = VideoGallery.prototype;
  _proto.selectNewVideo = function selectNewVideo(e) {
    e.preventDefault();
    var $target = $(e.currentTarget);
    this.currentVideo = {
      id: $target.data('videoId'),
      $selectedThumb: $target
    };
    this.setMainVideo();
    this.setActiveThumb();
  };
  _proto.setMainVideo = function setMainVideo() {
    this.$player.attr('src', "//www.youtube.com/embed/" + this.currentVideo.id);
  };
  _proto.setActiveThumb = function setActiveThumb() {
    this.$videos.removeClass('is-active');
    this.currentVideo.$selectedThumb.addClass('is-active');
  };
  _proto.bindEvents = function bindEvents() {
    this.$videos.on('click', this.selectNewVideo.bind(this));
  };
  return VideoGallery;
}();
function videoGallery() {
  var pluginKey = 'video-gallery';
  var $videoGallery = $("[data-" + pluginKey + "]");
  $videoGallery.each(function (index, element) {
    var $el = $(element);
    var isInitialized = $el.data(pluginKey) instanceof VideoGallery;
    if (isInitialized) {
      return;
    }
    $el.data(pluginKey, new VideoGallery($el));
  });
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvaGFsb3RoZW1lcy9oYWxvQWRkT3B0aW9uRm9yUHJvZHVjdENhcmQuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3RoZW1lL2hhbG90aGVtZXMvaGFsb0J1bmRsZVByb2R1Y3RzLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy90aGVtZS9oYWxvdGhlbWVzL2hhbG9OZXh0UHJvZHVjdHMuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3RoZW1lL2hhbG90aGVtZXMvaGFsb1Byb2R1Y3RMb29rYm9vay5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvaGFsb3RoZW1lcy9oYWxvU3RpY2t5QWRkVG9DYXJ0LmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy90aGVtZS9wcm9kdWN0LmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy90aGVtZS9wcm9kdWN0L3Jldmlld3MuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3RoZW1lL3Byb2R1Y3QvdmlkZW8tZ2FsbGVyeS5qcyJdLCJuYW1lcyI6WyJmZXRjaCIsInJlcXVpcmUiLCJjb250ZXh0Iiwid3JhcHBlciIsInRoZW1lU2V0dGluZ3MiLCJoYWxvQWRkT3B0aW9uRm9yUHJvZHVjdCIsImNhbGxQcm9kdWN0T3B0aW9uIiwicHJvZHVjdF9jbGFzcyIsImVhY2giLCJpbmRleCIsImVsZW1lbnQiLCJwcm9kdWN0SWQiLCIkIiwiZGF0YSIsImxpc3QiLCJwdXNoIiwidG9TdHJpbmciLCJsZW5ndGgiLCJnZXRQcm9kdWN0T3B0aW9uIiwidGhlbiIsInJlbmRlck9wdGlvbiIsImlkeCIsIml0ZW0iLCJhcnIiLCJwcm9kdWN0X3dyYXBwZXIiLCJmaW5kIiwidHh0IiwicmVtb3ZlIiwiY291bnRNb3JlT3B0aW9uIiwicHJvZHVjdExpbmsiLCJhdHRyIiwiYXBwZW5kIiwibWV0aG9kIiwiaGVhZGVycyIsInRva2VuIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJxdWVyeSIsInJlcyIsImpzb24iLCJhRmlsdGVyIiwic2l0ZSIsInByb2R1Y3RzIiwiZWRnZXMiLCJub2RlIiwiZW50aXR5SWQiLCJwcm9kdWN0RmllbGRDb2xvciIsInByb2R1Y3RGaWVsZFNpemUiLCJhRmlsdGVyMiIsInByb2R1Y3RPcHRpb25zIiwiYUZpbHRlcjMiLCJmaWx0ZXIiLCJkaXNwbGF5U3R5bGUiLCJhRmlsdGVyNSIsImRpc3BsYXlOYW1lIiwiaGFsb0FkZE9wdGlvbkZvclByb2R1Y3QyIiwiYUZpbHRlcjQiLCJ2YWx1ZXMiLCJ0aXRsZVZhciIsImxhYmVsIiwiaWRWYXIiLCJsZW5ndGhDb2xvclZhciIsImhleENvbG9ycyIsImNvbG9yMSIsImNvbG9yMiIsImNvbG9yMyIsImltZyIsImltYWdlVXJsIiwiQm9vbGVhbiIsImhhbG9BZGRPcHRpb25Gb3JQcm9kdWN0VGV4dCIsIiRzY29wZSIsInRoaXNQcm91Y3RJZCIsInBhcnNlSW50IiwiJHJlbGF0ZVRhYiIsIiRidW5kbGUiLCIkYnVuZGxlTGlzdCIsIm1vZGFsIiwibW9kYWxGYWN0b3J5IiwiY3VycmVuY3kiLCJtb25leSIsInNob3dCdW5kbGUiLCJkb2N1bWVudCIsIm9uIiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsIiR0YXJnZXQiLCJjdXJyZW50VGFyZ2V0Iiwibm90IiwicmVtb3ZlQ2xhc3MiLCJuZXh0IiwiaGFzQ2xhc3MiLCJhZGRDbGFzcyIsInRhcmdldCIsImNsb3Nlc3QiLCJpZCIsInJlcGxhY2UiLCJwcm9kdWN0IiwiaXMiLCJ0b3RhbFByaWNlIiwiJGZvcm0iLCJhcnJQcm8iLCJBcnJheSIsInZhbCIsImNoZWNrIiwiY2hlY2tQcm9kdWN0IiwiayIsInNob3ciLCJhZGRUb0NhcnQiLCJlcnJvck1lc3NhZ2UiLCJ0bXAiLCJjcmVhdGVFbGVtZW50IiwiaW5uZXJIVE1MIiwic2hvd0FsZXJ0TW9kYWwiLCJ0ZXh0Q29udGVudCIsImlubmVyVGV4dCIsIm9wdGlvbnMiLCJ0ZW1wbGF0ZSIsInByb2RCdW5kbGVJZCIsInRvdGFsQmxvY2siLCJmaXJzdEl0ZW0iLCJwcm9kdWN0Q3VzdG9tRmllbGRzIiwib2JqIiwibmFtZSIsInBhcnNlIiwidmFsdWUiLCJncmVwIiwibnVtIiwicElkIiwidW5kZWZpbmVkIiwidXRpbHMiLCJhcGkiLCJnZXRCeUlkIiwiZXJyIiwicmVzcG9uc2UiLCJmb3JFYWNoIiwic2hvd0xpc3QiLCJsaXN0RmlsdGVyIiwidW5pcXVlIiwiZm9ybSIsImhhc09wdGlvbnMiLCJoYXNEZWZhdWx0T3B0aW9ucyIsInByb2R1Y3RBdHRyaWJ1dGVzIiwib3B0aW9uQ2hhbmdlIiwic2VyaWFsaXplIiwiYXR0cmlidXRlc0RhdGEiLCJhdHRyaWJ1dGVzQ29udGVudCIsImNvbnRlbnQiLCJ1cGRhdGVQcm9kdWN0QXR0cmlidXRlcyIsInVwZGF0ZVZpZXciLCJ1cGRhdGVEZWZhdWx0QXR0cmlidXRlc0Zvck9PUyIsInRyaW0iLCIkcHJvZHVjdE9wdGlvbnNFbGVtZW50IiwiaHRtbCIsInNldFByb2R1Y3RWYXJpYW50Iiwic2hvd1NsaWNrU2xpZGVyIiwid3JhcCIsInNsaWNrIiwiZG90cyIsImFycm93cyIsInNsaWRlc1RvU2hvdyIsInNsaWRlc1RvU2Nyb2xsIiwibW9iaWxlRmlyc3QiLCJpbmZpbml0ZSIsIm5leHRBcnJvdyIsInByZXZBcnJvdyIsInJlc3BvbnNpdmUiLCJicmVha3BvaW50Iiwic2V0dGluZ3MiLCJpIiwiY2hlY2tCZWZvcmVBZGQiLCIkYXR0cmlidXRlcyIsImF0dCIsInByb3AiLCJmb2N1cyIsImFyclAiLCJ3aW5kb3ciLCJGb3JtRGF0YSIsInByb2QiLCJjYXJ0IiwiaXRlbUFkZCIsImZpbHRlckVtcHR5RmlsZXNGcm9tRm9ybSIsImVycm9yIiwiYWxlcnQiLCJoaWRlIiwiJG1vZGFsIiwib3BlbiIsInNpemUiLCIkYm9keSIsInF1YW50aXR5IiwidGV4dCIsInRyaWdnZXIiLCJ1cGRhdGVDb250ZW50IiwidG90YWwiLCJzeW1ib2wiLCJzeW1ib2xDaGFuZ2UiLCJkZWNpbWFsUGxhY2VzIiwiZGVjaW1hbFNlcGFyYXRvciIsInRob3VzYW5kc1NlcGFyYXRvciIsInN5bWJvbExvY2F0aW9uIiwiY3VyciIsInRva2VuMSIsInRva2VuMiIsImRlY2ltYWxfcGxhY2VzIiwiZGVjaW1hbF90b2tlbiIsInRob3VzYW5kc190b2tlbiIsImN1cnJlbmN5X2xvY2F0aW9uIiwiY3VycmVuY3lfdG9rZW4iLCJwcmljZSIsInBhcnNlRmxvYXQiLCJpbmRleE9mIiwiZm9ybWF0TW9uZXkiLCJuIiwiYyIsImQiLCJ0IiwiaXNOYU4iLCJNYXRoIiwiYWJzIiwicyIsIlN0cmluZyIsIk51bWJlciIsInRvRml4ZWQiLCJqIiwic3Vic3RyIiwic2xpY2UiLCJwcm9kdWN0T3B0aW9uc0NoYW5nZWQiLCJ1bnNhdGlzZmllZFJlcXVpcmVkRmllbGRzIiwib3B0aW9uTGFiZWwiLCJjaGlsZHJlbiIsIm9wdGlvblRpdGxlIiwic3BsaXQiLCJyZXF1aXJlZCIsInRvTG93ZXJDYXNlIiwiaW5jbHVkZXMiLCJ0eXBlIiwiZ2V0QXR0cmlidXRlIiwicXVlcnlTZWxlY3RvciIsImlzU2F0aXNmaWVkIiwiZnJvbSIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJldmVyeSIsInNlbGVjdCIsInNlbGVjdGVkSW5kZXgiLCJkYXRlU3RyaW5nIiwibWFwIiwieCIsImpvaW4iLCJjaGVja2VkIiwibGFiZWxzIiwidGl0bGUiLCIkY2hhbmdlZE9wdGlvbiIsInBhcmVudHMiLCJwcm9kdWN0QXR0cmlidXRlc0RhdGEiLCJwcm9kdWN0QXR0cmlidXRlc0NvbnRlbnQiLCJzaG93UHJvZHVjdEltYWdlIiwiYmVoYXZpb3IiLCJvdXRfb2Zfc3RvY2tfYmVoYXZpb3IiLCJpblN0b2NrSWRzIiwiaW5fc3RvY2tfYXR0cmlidXRlcyIsIm91dE9mU3RvY2tNZXNzYWdlIiwib3V0X29mX3N0b2NrX21lc3NhZ2UiLCJhdHRyaWJ1dGUiLCIkYXR0cmlidXRlIiwiYXR0cklkIiwiZW5hYmxlQXR0cmlidXRlIiwiZGlzYWJsZUF0dHJpYnV0ZSIsImdldEF0dHJpYnV0ZVR5cGUiLCJkaXNhYmxlU2VsZWN0T3B0aW9uQXR0cmlidXRlIiwiJHNlbGVjdCIsInBhcmVudCIsInRvZ2dsZU9wdGlvbiIsImVuYWJsZVNlbGVjdE9wdGlvbkF0dHJpYnV0ZSIsIiRwYXJlbnQiLCJpbWFnZSIsIm1haW5JbWFnZVVybCIsInRvb2xzIiwiaW1hZ2VTcmNzZXQiLCJnZXRTcmNzZXQiLCJwcm9kdWN0Z2FsbGVyeV9zaXplIiwidmlld01vZGVsIiwiZ2V0Vmlld01vZGVsIiwic2hvd01lc3NhZ2VCb3giLCJzdG9ja19tZXNzYWdlIiwicHVyY2hhc2luZ19tZXNzYWdlIiwic3RvY2siLCJoYWxvX3N0b2NrX2xldmVsX2xpbWl0IiwiJHN0b2NrTGVmdFdyYXBwZXIiLCIkc3RvY2tMZWZ0IiwidXBkYXRlUHJpY2VWaWV3IiwicHJvZHVjdENoZWNrYm94IiwicHVyY2hhc2FibGUiLCJpbnN0b2NrIiwiJHByaWNlV2l0aFRheCIsIiRwcmljZVdpdGhvdXRUYXgiLCJycnBXaXRoVGF4IiwiJGRpdiIsIiRzcGFuIiwicnJwV2l0aG91dFRheCIsIm5vblNhbGVXaXRoVGF4Iiwibm9uU2FsZVdpdGhvdXRUYXgiLCJwcmljZVNhdmVkIiwicHJpY2VOb3dMYWJlbCIsInByaWNlTGFiZWwiLCJwcmljZURhdGEiLCIkd2VpZ2h0IiwiJGluY3JlbWVudHMiLCIkYWRkVG9DYXJ0IiwiJHdpc2hsaXN0VmFyaWF0aW9uIiwiJGNvbnRhaW5lciIsIiRpbnB1dCIsIiRza3UiLCIkdXBjIiwiJHRleHQiLCIkYnVsa1ByaWNpbmciLCJtZXNzYWdlIiwiJG1lc3NhZ2VCb3giLCJjbGVhclByaWNpbmdOb3RGb3VuZCIsIndpdGhfdGF4IiwiZm9ybWF0dGVkIiwid2l0aG91dF90YXgiLCJycnBfd2l0aF90YXgiLCJycnBfd2l0aG91dF90YXgiLCJzYXZlZCIsIm5vbl9zYWxlX3ByaWNlX3dpdGhfdGF4Iiwibm9uX3NhbGVfcHJpY2Vfd2l0aG91dF90YXgiLCJmb3JtRGF0YSIsImtleSIsIkZpbGUiLCJkZWxldGUiLCJlIiwiY29uc29sZSIsImdldFByb2R1Y3QiLCJjdXJDb2RlIiwicmVuZGVyUHJvZHVjdCIsImN1ckRpc3BsYXkiLCJzeW1ib2xQbGFjZW1lbnQiLCJkZWNpbWFsVG9rZW4iLCJ0aG91c2FuZHNUb2tlbiIsImhhbG9fY2FyZF90aXRsZSIsInBhdGgiLCJyZXN0cmljdF90b19sb2dpbiIsInByaWNlcyIsInByaWNlUmFuZ2UiLCJtaW4iLCJtYXgiLCJwcmljZV9yYW5nZXMiLCJwcmljZU1pbiIsInByaWNlTWF4IiwicHJpY2VEZWYiLCJyZXRhaWxQcmljZSIsImJhc2VQcmljZSIsInByaWNlQmFzIiwicHJpY2VSZXQiLCJodG1sX2NhcmQiLCJkZWZhdWx0SW1hZ2UiLCJpbWc3MHB4IiwicHJldklkIiwiJHByb2RJY29ucyIsIiRwcm9kV3JhcCIsIm5leHRJZCIsIm5leHRMaW5rIiwicHJldkxpbmsiLCJkaXNwbGF5IiwiZWwiLCIkcG9wdXAiLCIkZWwiLCIkb3B0aW9ucyIsImVtcHR5IiwiJHByb2RJZCIsInBvc2l0aW9uIiwib2Zmc2V0IiwiY29udGFpbmVyIiwid2lkdGgiLCJjc3MiLCJ0b3AiLCJsZWZ0Iiwib2Zmc2V0U2Nyb2xsIiwic2Nyb2xsIiwib3V0ZXJIZWlnaHQiLCJzaG93UHJpY2UiLCJwcmV2aWV3TW9kYWwiLCIkc3RpY2t5IiwiJHN0aWNreUNsb3NlIiwiJHN0aWNreUV4cGFuZCIsIiRwcm9kUHJpY2UiLCIkcHJvZE9wdGlvbnMiLCIkcHJvZE9wdGlvbkxhYmVsIiwiJHByb2RPcHRpb25Ecm9wZG93biIsIiRpbWFnZVdyYXBwZXIiLCIkcHJvZEJ0biIsIiRwcm9kV0xCdG4iLCJ3YWl0TWVzc2FnZSIsIm9yaWdpbmFsQnRuVmFsIiwibG9hZFN0aWNreSIsImhhbG9fc3RpY2t5X2FkZF90b19jYXJ0IiwibG9hZE9wdGlvbnMiLCJzY3JvbGxUb3AiLCJ0b2dnbGVDbGFzcyIsIm9wdGlvbkF0dHIiLCJoZWlnaHQiLCJmb3JtSGVpZ2h0IiwiYW5pbWF0ZSIsIiR0aGlzX3dsIiwidXJsX2F3bCIsInBvc3QiLCJkb25lIiwibG9jYXRpb24iLCJocmVmIiwiZGVjcmVtZW50Um93cyIsImRMZW5ndGgiLCJjdXJyZW5JbmRleCIsInJvd3MiLCJyb3dMaW1pdHMiLCJpc05ld09wdGlvbnNSZWFkeSIsInJvd09iamVjdHMiLCJuZXdPcHRpb25zIiwicm93T2JqZWN0IiwiaW5kZXgyIiwiZWxlbWVudDIiLCJhdHRyaWJ1dGVWYWx1ZSIsImF0dHJpYnV0ZUxhYmVsIiwiYXR0cmlidXRlTmFtZSIsImF0dHJpYnV0ZUluZGV4IiwiaW52aXNpYmxlIiwic2V0TGFiZWwiLCJjdXJyZW50T3B0aW9uSW5kZXgiLCJhdHRyaWJ1dGVzIiwiciIsInJJbmRleCIsImN1cnJlbnROZXdPcHRpb25JbmRleCIsIm5ld09wdGlvbiIsIm5ld09wdGlvbkluZGV4IiwibmV3RWwiLCJhdHRyaWJ1dGVTdHJpbmciLCJjbGFzcyIsImFwcGVuZFRvIiwic2t1IiwidXJsIiwicmVxdWVzdCIsImVuY29kZVVSSSIsInJlcXVlc3RPcHRpb25zIiwiRXJyb3IiLCJoYWxvX2FkZF90b19jYXJ0X3BvcHVwIiwidXBkYXRlQ2FydENvbnRlbnQiLCJyZWRpcmVjdFRvIiwiY2FydF9pdGVtIiwiY2FydF91cmwiLCJ1cmxzIiwiaXNSdW5uaW5nSW5JZnJhbWUiLCJpZnJhbWVTZGsiLCJzaG93VmFyaWFudEltYWdlIiwiaW5TdG9jayIsIm9ubG9hZCIsIlByb2R1Y3QiLCIkcmV2aWV3TGluayIsIiRidWxrUHJpY2luZ0xpbmsiLCJvblJlYWR5IiwiaGlzdG9yeSIsInJlcGxhY2VTdGF0ZSIsInBhdGhuYW1lIiwidmFsaWRhdG9yIiwiY29sbGFwc2libGVGYWN0b3J5IiwicHJvZHVjdERldGFpbHMiLCJQcm9kdWN0RGV0YWlscyIsIkJDRGF0YSIsInByb2R1Y3RfYXR0cmlidXRlcyIsInZpZGVvR2FsbGVyeSIsIiRyZXZpZXdGb3JtIiwiY2xhc3NpZnlGb3JtIiwicmV2aWV3IiwiUmV2aWV3IiwicmVnaXN0ZXJWYWxpZGF0aW9uIiwicGVyZm9ybUNoZWNrIiwiYXJlQWxsIiwicHJvZHVjdFJldmlld0hhbmRsZXIiLCJidWxrUHJpY2luZ0hhbmRsZXIiLCJwcm9kdWN0Q3VzdG9tVGFiIiwiY29tcGFyZUNvbG9ycyIsInByb2R1Y3RWaWV3SW5mb1RhYnMiLCJzb2xkUHJvZHVjdCIsInZpZXdpbmdQcm9kdWN0IiwiY291bnREb3duUHJvZHVjdCIsImxvYWRPcHRpb25Gb3JQcm9kdWN0Q2FyZCIsInJldmlld1Nob3ciLCJoYWxvTmV4dFByb2R1Y3RzIiwiaGFsb1N0aWNreUFkZFRvQ2FydCIsImhhbG9Qcm9kdWN0TG9va2Jvb2siLCJoYWxvQnVuZGxlUHJvZHVjdHMiLCJoYWxvTm90aWZ5TWUiLCJoYWxvWW91dHViZUNhcm91c2VsIiwibGltaXQiLCJyZXZpZXcyIiwiUHJvbWlzZSIsImFsbCIsIml0ZW0xIiwibmV4dEVsZW1lbnRTaWJsaW5nIiwicmV2aWV3MyIsImZpbHRlcmVkQXIiLCJyZXYiLCJyZXZpZXdBdmciLCJyb3VuZCIsInJlZHVjZSIsImEiLCJiIiwiY2F0Y2giLCJsb2ciLCIkd3JhcHBlciIsIm51bWJlcnNQcm9kdWN0X3RleHQiLCJwcm9kdWN0X3NvbGRQcm9kdWN0X3Byb2R1Y3RzIiwibnVtYmVyc0hvdXJzX3RleHQiLCJwcm9kdWN0X3NvbGRQcm9kdWN0X2hvdXJzIiwic29sZFByb2R1Y3RUZXh0IiwicHJvZHVjdF9zb2xkUHJvZHVjdF90ZXh0Iiwic29sZFByb2R1Y3RUZXh0MiIsInByb2R1Y3Rfc29sZFByb2R1Y3RfaG91cnNfdGV4dCIsIm51bWJlcnNQcm9kdWN0TGlzdCIsIm51bWJlcnNQcm9kdWN0SXRlbSIsImZsb29yIiwicmFuZG9tIiwibnVtYmVyc0hvdXJzTGlzdCIsIm51bWJlcnNIb3Vyc0l0ZW0iLCJjb3VudERvd24iLCJjb3VudERvd25EYXRlIiwiRGF0ZSIsImdldFRpbWUiLCJzZWZ0IiwiY291bnRkb3duZnVuY3Rpb24iLCJzZXRJbnRlcnZhbCIsIm5vdyIsImRpc3RhbmNlIiwiY2xlYXJJbnRlcnZhbCIsImRheXMiLCJob3VycyIsIm1pbnV0ZXMiLCJzZWNvbmRzIiwic3RyQ291bnREb3duIiwidmlld2VyVGV4dCIsInByb2R1Y3Rfdmlld2luZ1Byb2R1Y3RfdGV4dCIsIm51bWJlcnNWaWV3ZXJfdGV4dCIsInByb2R1Y3Rfdmlld2luZ1Byb2R1Y3Rfdmlld2VyIiwibnVtYmVyc1ZpZXdlckxpc3QiLCJudW1iZXJzVmlld2VySXRlbSIsIiRzd2F0Y2hXcmFwcGVyIiwiJHRleHRXcmFwcGVyIiwiJHRoaXMiLCIkY29sb3IiLCIkY29sb3IyIiwiJGNvbG9yMyIsIiRpbWciLCIkcGF0dGVybiIsImdldEVsZW1lbnRCeUlkIiwiU29ydGFibGUiLCJhbmltYXRpb24iLCIkYmxvY2siLCIkcHJvZFdyYXBJZCIsImhhbG9BZGRPcHRpb24iLCJQYWdlTWFuYWdlciIsIm5vZCIsInN1Ym1pdCIsIiRyZXZpZXdzQ29udGVudCIsIiRjb2xsYXBzaWJsZSIsImluaXRMaW5rQmluZCIsImluamVjdFBhZ2luYXRpb25MaW5rIiwiY29sbGFwc2VSZXZpZXdzIiwiJGNvbnRlbnQiLCJDb2xsYXBzaWJsZUV2ZW50cyIsImNsaWNrIiwiaGFzaCIsIiRuZXh0TGluayIsIiRwcmV2TGluayIsImFkZCIsInNlbGVjdG9yIiwidmFsaWRhdGUiLCJyZXZpZXdSYXRpbmciLCJyZXZpZXdTdWJqZWN0IiwicmV2aWV3Q29tbWVudCIsImNiIiwicmVzdWx0IiwiZm9ybXMiLCJlbWFpbCIsInJldmlld0VtYWlsIiwiVmlkZW9HYWxsZXJ5IiwiJGVsZW1lbnQiLCIkcGxheWVyIiwiJHZpZGVvcyIsImN1cnJlbnRWaWRlbyIsImJpbmRFdmVudHMiLCJzZWxlY3ROZXdWaWRlbyIsIiRzZWxlY3RlZFRodW1iIiwic2V0TWFpblZpZGVvIiwic2V0QWN0aXZlVGh1bWIiLCJiaW5kIiwicGx1Z2luS2V5IiwiJHZpZGVvR2FsbGVyeSIsImlzSW5pdGlhbGl6ZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQStDO0FBQy9D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QUFTN0gsWUFBWSxHQUFHO0VBQ25DLElBQU04SCxTQUFTLEdBQUcsZUFBZTtFQUNqQyxJQUFNQyxhQUFhLEdBQUd0a0IsQ0FBQyxZQUFVcWtCLFNBQVMsT0FBSTtFQUU5Q0MsYUFBYSxDQUFDMWtCLElBQUksQ0FBQyxVQUFDQyxLQUFLLEVBQUVDLE9BQU8sRUFBSztJQUNuQyxJQUFNb1csR0FBRyxHQUFHbFcsQ0FBQyxDQUFDRixPQUFPLENBQUM7SUFDdEIsSUFBTXlrQixhQUFhLEdBQUdyTyxHQUFHLENBQUNqVyxJQUFJLENBQUNva0IsU0FBUyxDQUFDLFlBQVlYLFlBQVk7SUFFakUsSUFBSWEsYUFBYSxFQUFFO01BQ2Y7SUFDSjtJQUVBck8sR0FBRyxDQUFDalcsSUFBSSxDQUFDb2tCLFNBQVMsRUFBRSxJQUFJWCxZQUFZLENBQUN4TixHQUFHLENBQUMsQ0FBQztFQUM5QyxDQUFDLENBQUM7QUFDTixDIiwiZmlsZSI6InRoZW1lLWJ1bmRsZS5jaHVuay4zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHV0aWxzIGZyb20gJ0BiaWdjb21tZXJjZS9zdGVuY2lsLXV0aWxzJztcbmNvbnN0IGZldGNoID0gcmVxdWlyZSgnbm9kZS1mZXRjaCcpO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihjb250ZXh0LCB3cmFwcGVyKSB7XG4gICAgaWYgKGNvbnRleHQudGhlbWVTZXR0aW5ncy5oYWxvQWRkT3B0aW9uRm9yUHJvZHVjdCA9PSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IHRva2VuID0gY29udGV4dC50b2tlbixcbiAgICAgICAgICAgIHByb2R1Y3Rfd3JhcHBlciA9ICQoJyMnK3dyYXBwZXIpLFxuICAgICAgICAgICAgcHJvZHVjdF9jbGFzcyA9IHByb2R1Y3Rfd3JhcHBlci5maW5kKCcuY2FyZCcpO1xuICAgICAgICB2YXIgIGxpc3QgPSBbXTtcblxuICAgICAgICBmdW5jdGlvbiBjYWxsUHJvZHVjdE9wdGlvbigpIHtcbiAgICAgICAgICAgIHByb2R1Y3RfY2xhc3MuZWFjaCgoaW5kZXgsIGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgcHJvZHVjdElkID0gJChlbGVtZW50KS5kYXRhKFwicHJvZHVjdC1pZFwiKTtcblxuICAgICAgICAgICAgICAgIGxpc3QucHVzaChwcm9kdWN0SWQudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYobGlzdC5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICAgICBnZXRQcm9kdWN0T3B0aW9uKGxpc3QpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlbmRlck9wdGlvbihkYXRhKTtcblxuICAgICAgICAgICAgICAgICAgICAkLmVhY2gobGlzdCwgKGlkeCwgaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFyciA9IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2R1Y3RJZCA9IGxpc3RbaWR4XTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvZHVjdF93cmFwcGVyLmZpbmQoJy5jYXJkLW9wdGlvbi0nK3Byb2R1Y3RJZCsnIC5mb3JtLW9wdGlvbi1zd2F0Y2gnKS5lYWNoKChpbmRleCwgZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0eHQgPSAkKGVsZW1lbnQpLmRhdGEoJ3Byb2R1Y3Qtc3dhdGNoLXZhbHVlJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXJyW3R4dF0pe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKGVsZW1lbnQpLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyclt0eHRdID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYocHJvZHVjdF93cmFwcGVyLmZpbmQoJy5jYXJkLW9wdGlvbi0nK3Byb2R1Y3RJZCsnIC5mb3JtLW9wdGlvbi1zd2F0Y2gnKS5sZW5ndGggPiA0KXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY291bnRNb3JlT3B0aW9uICA9IHByb2R1Y3Rfd3JhcHBlci5maW5kKCcuY2FyZC1vcHRpb24tJytwcm9kdWN0SWQrJyAuZm9ybS1vcHRpb24tc3dhdGNoJykubGVuZ3RoIC0gNCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvZHVjdExpbmsgPSBwcm9kdWN0X3dyYXBwZXIuZmluZCgnW2RhdGEtcHJvZHVjdC1pZD1cIicrcHJvZHVjdElkKydcIl0nKS5maW5kKCcuY2FyZC1saW5rJykuYXR0cignaHJlZicpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvZHVjdF93cmFwcGVyLmZpbmQoJy5jYXJkLW9wdGlvbi0nK3Byb2R1Y3RJZCsnIC5mb3JtLW9wdGlvbi1zd2F0Y2gnKS5lYWNoKChpbmRleCwgZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihpbmRleCA+PSA0KXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoZWxlbWVudCkucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHByb2R1Y3Rfd3JhcHBlci5maW5kKCcuY2FyZC1vcHRpb24tJytwcm9kdWN0SWQrJyAuZm9ybS1maWVsZCAuc2hvd21vcmUnKS5sZW5ndGggPCAxKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvZHVjdF93cmFwcGVyLmZpbmQoJy5jYXJkLW9wdGlvbi0nK3Byb2R1Y3RJZCsnIC5mb3JtLWZpZWxkOm5vdCguZm9ybS1maWVsZC0tc2l6ZSknKS5hcHBlbmQoJzxhIGhyZWY9XCInK3Byb2R1Y3RMaW5rKydcIiBjbGFzcz1cInNob3dtb3JlXCI+KycrY291bnRNb3JlT3B0aW9uKyc8L2E+Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gZ2V0UHJvZHVjdE9wdGlvbihsaXN0KXtcbiAgICAgICAgICAgIHJldHVybiBmZXRjaCgnL2dyYXBocWwnLCB7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzogJ0JlYXJlciAnICsgdG9rZW5cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICAgIHF1ZXJ5OiBgXG4gICAgICAgICAgICAgICAgICAgIHF1ZXJ5IFNldmVyYWxQcm9kdWN0c0J5SUQge1xuICAgICAgICAgICAgICAgICAgICAgIHNpdGUge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvZHVjdHMoZW50aXR5SWRzOiBbYCtsaXN0K2BdLCBmaXJzdDogNTApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZWRnZXMge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW50aXR5SWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9kdWN0T3B0aW9ucyhmaXJzdDogNTApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWRnZXMge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW50aXR5SWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc1JlcXVpcmVkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi4gb24gTXVsdGlwbGVDaG9pY2VPcHRpb24ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5U3R5bGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVzIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlZGdlcyB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW50aXR5SWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNEZWZhdWx0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLiBvbiBTd2F0Y2hPcHRpb25WYWx1ZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGV4Q29sb3JzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1hZ2VVcmwod2lkdGg6IDUwKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBgfSksXG4gICAgICAgICAgICB9KS50aGVuKHJlcyA9PiByZXMuanNvbigpKS50aGVuKHJlcyA9PiByZXMuZGF0YSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiByZW5kZXJPcHRpb24oZGF0YSl7XG4gICAgICAgICAgICB2YXIgYUZpbHRlciA9IGRhdGEuc2l0ZS5wcm9kdWN0cy5lZGdlcztcblxuICAgICAgICAgICAgJC5lYWNoKGFGaWx0ZXIsIChpbmRleCwgZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgICAgIHZhciBwcm9kdWN0SWQgPSBhRmlsdGVyW2luZGV4XS5ub2RlLmVudGl0eUlkLFxuICAgICAgICAgICAgICAgICAgICBwcm9kdWN0RmllbGRDb2xvciA9IHByb2R1Y3Rfd3JhcHBlci5maW5kKCcuY2FyZC1vcHRpb24tJytwcm9kdWN0SWQrJyAuZm9ybS1maWVsZDpub3QoLmZvcm0tZmllbGQtLXNpemUpJyksXG4gICAgICAgICAgICAgICAgICAgIHByb2R1Y3RGaWVsZFNpemUgPSBwcm9kdWN0X3dyYXBwZXIuZmluZCgnLmNhcmQtb3B0aW9uLScrcHJvZHVjdElkKycgLmZvcm0tZmllbGQtLXNpemUnKSxcbiAgICAgICAgICAgICAgICAgICAgYUZpbHRlcjIgPSBhRmlsdGVyW2luZGV4XS5ub2RlLnByb2R1Y3RPcHRpb25zLmVkZ2VzO1xuXG4gICAgICAgICAgICAgICAgdmFyIGFGaWx0ZXIzID0gYUZpbHRlcjIuZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLm5vZGUuZGlzcGxheVN0eWxlID09PSAnU3dhdGNoJztcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHZhciBhRmlsdGVyNSA9IGFGaWx0ZXIyLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS5ub2RlLmRpc3BsYXlOYW1lID09PSBjb250ZXh0LnRoZW1lU2V0dGluZ3MuaGFsb0FkZE9wdGlvbkZvclByb2R1Y3QyO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgaWYoYUZpbHRlcjMubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAgICAgICAgIHZhciBhRmlsdGVyNCA9IGFGaWx0ZXIzWzBdLm5vZGUudmFsdWVzLmVkZ2VzO1xuXG4gICAgICAgICAgICAgICAgICAgICQuZWFjaChhRmlsdGVyNCwgKGlkeCwgZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRpdGxlVmFyID0gYUZpbHRlcjRbaWR4XS5ub2RlLmxhYmVsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkVmFyID0gYUZpbHRlcjRbaWR4XS5ub2RlLmVudGl0eUlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlbmd0aENvbG9yVmFyID0gYUZpbHRlcjRbaWR4XS5ub2RlLmhleENvbG9ycy5sZW5ndGgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3IxID0gYUZpbHRlcjRbaWR4XS5ub2RlLmhleENvbG9yc1swXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjIgPSBhRmlsdGVyNFtpZHhdLm5vZGUuaGV4Q29sb3JzWzFdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yMyA9IGFGaWx0ZXI0W2lkeF0ubm9kZS5oZXhDb2xvcnNbMl0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1nID0gYUZpbHRlcjRbaWR4XS5ub2RlLmltYWdlVXJsO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihsZW5ndGhDb2xvclZhciA9PSAyKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9kdWN0RmllbGRDb2xvci5hcHBlbmQoJzxsYWJlbCBjbGFzcz1cImZvcm0tb3B0aW9uIGZvcm0tb3B0aW9uLXN3YXRjaFwiIGRhdGEtcHJvZHVjdC1zd2F0Y2gtdmFsdWU9XCInK2lkVmFyKydcIj48c3BhbiBjbGFzcz1cImZvcm0tb3B0aW9uLXRvb2x0aXBcIj4nK3RpdGxlVmFyKyc8L3NwYW4+PHNwYW4gY2xhc3M9XCJmb3JtLW9wdGlvbi12YXJpYW50IGZvcm0tb3B0aW9uLXZhcmlhbnQtLWNvbG9yIGZvcm0tb3B0aW9uLXZhcmlhbnQtLWNvbG9yMlwiIHRpdGxlPVwiJyt0aXRsZVZhcisnXCI+PHNwYW4gc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOicrY29sb3IxKydcIj48L3NwYW4+PHNwYW4gc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOicrY29sb3IyKydcIj48L3NwYW4+PC9zcGFuPjwvbGFiZWw+Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYobGVuZ3RoQ29sb3JWYXIgPT09IDMpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2R1Y3RGaWVsZENvbG9yLmFwcGVuZCgnPGxhYmVsIGNsYXNzPVwiZm9ybS1vcHRpb24gZm9ybS1vcHRpb24tc3dhdGNoXCIgZGF0YS1wcm9kdWN0LXN3YXRjaC12YWx1ZT1cIicraWRWYXIrJ1wiPjxzcGFuIGNsYXNzPVwiZm9ybS1vcHRpb24tdG9vbHRpcFwiPicrdGl0bGVWYXIrJzwvc3Bhbj48c3BhbiBjbGFzcz1cImZvcm0tb3B0aW9uLXZhcmlhbnQgZm9ybS1vcHRpb24tdmFyaWFudC0tY29sb3IgZm9ybS1vcHRpb24tdmFyaWFudC0tY29sb3IyXCIgdGl0bGU9XCInK3RpdGxlVmFyKydcIj48c3BhbiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6Jytjb2xvcjErJ1wiPjwvc3Bhbj48c3BhbiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6Jytjb2xvcjIrJ1wiPjwvc3Bhbj48c3BhbiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6Jytjb2xvcjMrJ1wiPjwvc3Bhbj48L3NwYW4+PC9sYWJlbD4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZihCb29sZWFuKGNvbG9yMSkpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2R1Y3RGaWVsZENvbG9yLmFwcGVuZCgnPGxhYmVsIGNsYXNzPVwiZm9ybS1vcHRpb24gZm9ybS1vcHRpb24tc3dhdGNoXCIgZGF0YS1wcm9kdWN0LXN3YXRjaC12YWx1ZT1cIicraWRWYXIrJ1wiPjxzcGFuIGNsYXNzPVwiZm9ybS1vcHRpb24tdG9vbHRpcFwiPicrdGl0bGVWYXIrJzwvc3Bhbj48c3BhbiBjbGFzcz1cImZvcm0tb3B0aW9uLXZhcmlhbnQgZm9ybS1vcHRpb24tdmFyaWFudC0tY29sb3JcIiB0aXRsZT1cIicrdGl0bGVWYXIrJ1wiIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjogJytjb2xvcjErJ1wiPjwvc3Bhbj48L2xhYmVsPicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmKEJvb2xlYW4oaW1nKSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvZHVjdEZpZWxkQ29sb3IuYXBwZW5kKCc8bGFiZWwgY2xhc3M9XCJmb3JtLW9wdGlvbiBmb3JtLW9wdGlvbi1zd2F0Y2hcIiBkYXRhLXByb2R1Y3Qtc3dhdGNoLXZhbHVlPVwiJytpZFZhcisnXCI+PHNwYW4gY2xhc3M9XCJmb3JtLW9wdGlvbi10b29sdGlwXCI+Jyt0aXRsZVZhcisnPC9zcGFuPjxzcGFuIGNsYXNzPVwiZm9ybS1vcHRpb24tdmFyaWFudCBmb3JtLW9wdGlvbi12YXJpYW50LS1wYXR0ZXJuXCIgdGl0bGU9XCInK3RpdGxlVmFyKydcIiBzdHlsZT1cImJhY2tncm91bmQtaW1hZ2U6IHVybCgnK2ltZysnKVwiPjwvc3Bhbj48L2xhYmVsPicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHByb2R1Y3RGaWVsZENvbG9yLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmKGFGaWx0ZXI1Lmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgICAgICBpZihwcm9kdWN0RmllbGRTaXplLmxlbmd0aCA8IDEpe1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvZHVjdF93cmFwcGVyLmZpbmQoJy5jYXJkLW9wdGlvbi0nK3Byb2R1Y3RJZCsnJykuYXBwZW5kKCc8ZGl2IGNsYXNzPVwiZm9ybS1maWVsZCBmb3JtLWZpZWxkLS1zaXplXCI+PGxhYmVsIGNsYXNzPVwiZm9ybS1vcHRpb25cIj4nK2NvbnRleHQudGhlbWVTZXR0aW5ncy5oYWxvQWRkT3B0aW9uRm9yUHJvZHVjdFRleHQudG9TdHJpbmcoKSsnPC9sYWJlbD48L2Rpdj4nKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmKChhRmlsdGVyNS5sZW5ndGggPT0gMCkgJiYgKGFGaWx0ZXIzLmxlbmd0aCA9PSAwKSl7XG4gICAgICAgICAgICAgICAgICAgIHByb2R1Y3Rfd3JhcHBlci5maW5kKCcuY2FyZC1vcHRpb24tJytwcm9kdWN0SWQrJycpLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgY2FsbFByb2R1Y3RPcHRpb24oKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgdXRpbHMgZnJvbSAnQGJpZ2NvbW1lcmNlL3N0ZW5jaWwtdXRpbHMnO1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBtb2RhbEZhY3RvcnksIHsgc2hvd0FsZXJ0TW9kYWwsIE1vZGFsRXZlbnRzIH0gZnJvbSAnLi4vZ2xvYmFsL21vZGFsJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oJHNjb3BlLCBjb250ZXh0KSB7XG4gICAgY29uc3QgdGhpc1Byb3VjdElkID0gcGFyc2VJbnQoY29udGV4dC5wcm9kdWN0SWQpLFxuICAgICAgICAkcmVsYXRlVGFiID0gJCgnI2hhbG8tcmVsYXRlZC1wcm9kdWN0cycpLFxuICAgICAgICAkYnVuZGxlID0gJCgnI2hhbG8tYnVuZGxlLXByb2R1Y3RzJyksXG4gICAgICAgICRidW5kbGVMaXN0ID0gJGJ1bmRsZS5maW5kKCcuaGFsby1wcm9kdWN0LWxpc3QnKTtcblxuICAgIGNvbnN0IG1vZGFsID0gbW9kYWxGYWN0b3J5KCcjbW9kYWwnKVswXTtcblxuICAgIHZhciBjdXJyZW5jeSA9IGNvbnRleHQubW9uZXk7XG5cbiAgICBzaG93QnVuZGxlKCk7XG5cbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmhhbG8tdG9nZ2xlLW9wdGlvbnMnLCBldmVudCA9PiB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgdmFyICR0YXJnZXQgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xuXG4gICAgICAgICQoJy5oYWxvLXRvZ2dsZS1vcHRpb25zJykubm90KCR0YXJnZXQpLnJlbW92ZUNsYXNzKCdpcy1mb2N1cycpO1xuICAgICAgICAkKCcuaGFsby1kZXRhaWwtb3B0aW9ucycpLm5vdCgkdGFyZ2V0Lm5leHQoJy5oYWxvLWRldGFpbC1vcHRpb25zJykpLnJlbW92ZUNsYXNzKCdpcy1vcGVuJyk7XG5cbiAgICAgICAgaWYgKCEkdGFyZ2V0Lm5leHQoJy5oYWxvLWRldGFpbC1vcHRpb25zJykuaGFzQ2xhc3MoJ2lzLW9wZW4nKSkge1xuICAgICAgICAgICAgJHRhcmdldC5hZGRDbGFzcygnaXMtZm9jdXMnKTtcbiAgICAgICAgICAgICR0YXJnZXQubmV4dCgnLmhhbG8tZGV0YWlsLW9wdGlvbnMnKS5hZGRDbGFzcygnaXMtb3BlbicpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJHRhcmdldC5uZXh0KCcuaGFsby1kZXRhaWwtb3B0aW9ucycpLnJlbW92ZUNsYXNzKCdpcy1vcGVuJyk7XG4gICAgICAgICAgICAkdGFyZ2V0LnJlbW92ZUNsYXNzKCdpcy1mb2N1cycpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmhhbG8tb3B0aW9uLWNsb3NlJywgZXZlbnQgPT4ge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICQoJy5oYWxvLWRldGFpbC1vcHRpb25zJykucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKTtcbiAgICAgICAgJCgnLmhhbG8tdG9nZ2xlLW9wdGlvbnMnKS5yZW1vdmVDbGFzcygnaXMtZm9jdXMnKTtcbiAgICB9KTtcblxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICAgaWYgKCQoJy5oYWxvLWRldGFpbC1vcHRpb25zJykuaGFzQ2xhc3MoJ2lzLW9wZW4nKSkge1xuICAgICAgICAgICAgaWYgKCgkKGV2ZW50LnRhcmdldCkuY2xvc2VzdCgnLmhhbG8tZGV0YWlsLW9wdGlvbnMnKS5sZW5ndGggPT09IDApICYmICgkKGV2ZW50LnRhcmdldCkuY2xvc2VzdCgnLmhhbG8tdG9nZ2xlLW9wdGlvbnMnKS5sZW5ndGggPT09IDApKXtcbiAgICAgICAgICAgICAgICAkKCcuaGFsby1kZXRhaWwtb3B0aW9ucycpLnJlbW92ZUNsYXNzKCdpcy1vcGVuJyk7XG4gICAgICAgICAgICAgICAgJCgnLmhhbG8tdG9nZ2xlLW9wdGlvbnMnKS5yZW1vdmVDbGFzcygnaXMtZm9jdXMnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgJChkb2N1bWVudCkub24oJ2NoYW5nZScsICcuaGFsby1kZXRhaWwtY2hlY2tib3gnLCBldmVudCA9PiB7XG4gICAgICAgIHZhciAkdGFyZ2V0ID0gJChldmVudC5jdXJyZW50VGFyZ2V0KSxcbiAgICAgICAgICAgIGlkID0gJHRhcmdldC5hdHRyKCdpZCcpLnJlcGxhY2UoJ2ZidF9wcm9kdWN0JywnJyksXG4gICAgICAgICAgICBwcm9kdWN0ID0gJCgnLmhhbG8tcHJvZHVjdC1pdGVtW2RhdGEtcHJvZHVjdC1pZD1cIicgKyBpZCArICdcIl0nKTtcblxuICAgICAgICBpZigkdGFyZ2V0LmlzKCc6Y2hlY2tlZCcpID09IGZhbHNlKSB7XG4gICAgICAgICAgICBwcm9kdWN0LnJlbW92ZUNsYXNzKCdpc0NoZWNrZWQnKTtcbiAgICAgICAgICAgIHByb2R1Y3QuZmluZCgnLmhhbG8tcHJvZHVjdC1pY29uQWRkJykucmVtb3ZlQ2xhc3MoJ2hhbG8tcHJvZHVjdC1pY29uQ2hlY2tlZCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcHJvZHVjdC5hZGRDbGFzcygnaXNDaGVja2VkJyk7XG4gICAgICAgICAgICBwcm9kdWN0LmZpbmQoJy5oYWxvLXByb2R1Y3QtaWNvbkFkZCcpLmFkZENsYXNzKCdoYWxvLXByb2R1Y3QtaWNvbkNoZWNrZWQnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRvdGFsUHJpY2UoKTtcbiAgICB9KTtcblxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcjaGFsby1hZGRBbGwnLCBldmVudCA9PiB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgY29uc3QgJGZvcm0gPSAkKCdmb3JtJywgJGJ1bmRsZSk7XG4gICAgICAgIHZhciBhcnJQcm8gPSBuZXcgQXJyYXkoKTtcblxuICAgICAgICAkKCcuaGFsby1kZXRhaWwtY2hlY2tib3gnKS5lYWNoKChpbmRleCwgdmFsKSA9PiB7XG4gICAgICAgICAgICBpZiAoJCh2YWwpLmlzKCc6Y2hlY2tlZCcpKSB7XG4gICAgICAgICAgICAgICAgYXJyUHJvLnB1c2goaW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgY2hlY2sgPSBmYWxzZTtcblxuICAgICAgICBpZiAoYXJyUHJvLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGNoZWNrID0gY2hlY2tQcm9kdWN0KCRmb3JtLCBhcnJQcm8pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNoZWNrKSB7XG4gICAgICAgICAgICBpZiAoYXJyUHJvLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICB2YXIgayA9IGFyclByby5sZW5ndGg7XG5cbiAgICAgICAgICAgICAgICAkYnVuZGxlLmZpbmQoJy5sb2FkaW5nT3ZlcmxheScpLnNob3coKTtcblxuICAgICAgICAgICAgICAgIGFkZFRvQ2FydCgkZm9ybSwgMCwgYXJyUHJvLCBrKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9ICdQbGVhc2UgbWFrZSBzdXJlIGFsbCBvcHRpb25zIGhhdmUgYmVlbiBmaWxsZWQgaW4uJztcblxuICAgICAgICAgICAgaWYgKGVycm9yTWVzc2FnZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRtcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpO1xuICAgICAgICAgICAgICAgIHRtcC5pbm5lckhUTUwgPSBlcnJvck1lc3NhZ2U7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gc2hvd0FsZXJ0TW9kYWwodG1wLnRleHRDb250ZW50IHx8IHRtcC5pbm5lclRleHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIHNob3dCdW5kbGUoKSB7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgICAgICAgICAgdGVtcGxhdGU6IHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbTogJ2hhbG90aGVtZXMvcHJvZHVjdHMvaGFsby1idW5kbGUtcHJvZHVjdHMtdG1wJyxcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uczogJ2hhbG90aGVtZXMvcHJvZHVjdHMvaGFsby1idW5kbGUtcHJvZHVjdHMtb3B0aW9ucycsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgdmFyIHByb2RCdW5kbGVJZCA9IFtdLFxuICAgICAgICAgICAgdG90YWxCbG9jayA9ICcnO1xuXG4gICAgICAgIGZpcnN0SXRlbSgpO1xuXG4gICAgICAgICBpZigkYnVuZGxlLmhhc0NsYXNzKCdoYWxvLWJ1bmRsZS1sb2dpbicpKXtcbiAgICAgICAgICAgIHRvdGFsQmxvY2sgPSAnPGRpdiBjbGFzcz1cImhhbG8tcHJvZHVjdC10b3RhbFwiPlxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRvdGFsLXByaWNlXCI+XFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0ZXh0XCI+TG9nIGluIGZvciBwcmljaW5nPC9zcGFuPlxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2Pic7XG4gICAgICAgIH0gZWxzZXtcbiAgICAgICAgICAgIHRvdGFsQmxvY2sgPSAnPGRpdiBjbGFzcz1cImhhbG8tcHJvZHVjdC10b3RhbFwiPlxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRvdGFsLXByaWNlXCI+XFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0ZXh0XCI+VG90YWw6PC9zcGFuPlxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJpY2VcIj48L3NwYW4+XFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzPVwiYnV0dG9uIGJ1dHRvbi0tcHJpbWFyeSBoYWxvLXByb2R1Y3QtdG90YWwtYnV0dG9uXCIgaWQ9XCJoYWxvLWFkZEFsbFwiIGhyZWY9XCIjXCI+QWRkIEFsbCBUbyBDYXJ0PC9hPlxcXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj4nO1xuICAgICAgICB9XG5cbiAgICAgICAgJGJ1bmRsZS5maW5kKCcuYnVuZGxlLXByb2R1Y3QtcmlnaHQnKS5hcHBlbmQodG90YWxCbG9jayk7XG5cbiAgICAgICAgJC5lYWNoKGNvbnRleHQucHJvZHVjdEN1c3RvbUZpZWxkcywgZnVuY3Rpb24oaW5kZXgsIG9iaikge1xuICAgICAgICAgICAgaWYgKG9iai5uYW1lID09ICdfX2J1bmRsZWlkJykge1xuICAgICAgICAgICAgICAgIHByb2RCdW5kbGVJZCA9IEpTT04ucGFyc2UoJ1snK29iai52YWx1ZSsnXScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBwcm9kQnVuZGxlSWQgPSAkLmdyZXAocHJvZEJ1bmRsZUlkLCAodmFsdWUpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZSAhPSB0aGlzUHJvdWN0SWQ7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICgkYnVuZGxlLmxlbmd0aCA+IDAgJiYgcHJvZEJ1bmRsZUlkLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICB2YXIgbnVtID0gMCxcbiAgICAgICAgICAgICAgICBsaXN0ID0gW107XG5cbiAgICAgICAgICAgICRyZWxhdGVUYWIuZmluZCgnLmNhcmQnKS5lYWNoKChpbmRleCwgdmFsKSA9PiB7XG4gICAgICAgICAgICAgICAgbGlzdC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgaW5kZXg6IGluZGV4LFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBcIlwiXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB2YXIgcElkID0gJCh2YWwpLmRhdGEoJ3Byb2R1Y3QtaWQnKTtcblxuICAgICAgICAgICAgICAgIGlmIChwSWQgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLmFwaS5wcm9kdWN0LmdldEJ5SWQocElkLCBvcHRpb25zLCAoZXJyLCByZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgbGlzdC5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoZWxlbWVudC5pbmRleCA9PSBpbmRleCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuZGF0YSA9IHJlc3BvbnNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBudW0rKztcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYobnVtID09ICRyZWxhdGVUYWIuZmluZCgnLmNhcmQnKS5sZW5ndGgpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3dMaXN0KGxpc3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIGlmICgkYnVuZGxlLmxlbmd0aCA+IDAgJiYgcHJvZEJ1bmRsZUlkLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHZhciBudW0gPSAwLFxuICAgICAgICAgICAgICAgIGxpc3QgPSBbXSxcbiAgICAgICAgICAgICAgICBsaXN0RmlsdGVyID0gJC51bmlxdWUocHJvZEJ1bmRsZUlkKTtcblxuICAgICAgICAgICAgJC5lYWNoKGxpc3RGaWx0ZXIsIChpbmRleCwgdmFsKSA9PntcbiAgICAgICAgICAgICAgICBsaXN0LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBpbmRleDogaW5kZXgsXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFwiXCJcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHZhciBwSWQgPSB2YWw7XG5cbiAgICAgICAgICAgICAgICBpZiAocElkICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICB1dGlscy5hcGkucHJvZHVjdC5nZXRCeUlkKHBJZCwgb3B0aW9ucywgKGVyciwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGxpc3QuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGVsZW1lbnQuaW5kZXggPT0gaW5kZXgpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmRhdGEgPSByZXNwb25zZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgbnVtKys7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKG51bSA9PSBwcm9kQnVuZGxlSWQubGVuZ3RoKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93TGlzdChsaXN0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmaXJzdEl0ZW0oKXtcbiAgICAgICAgY29uc3QgZmlyc3RJdGVtID0gJGJ1bmRsZUxpc3QuZmluZCgnLmhhbG8tcHJvZHVjdC1pdGVtRmlyc3QnKSxcbiAgICAgICAgICAgIHBJZCA9IGZpcnN0SXRlbS5kYXRhKCdwcm9kdWN0LWlkJyksXG4gICAgICAgICAgICBmb3JtID0gZmlyc3RJdGVtLmZpbmQoJ2Zvcm0nKSxcbiAgICAgICAgICAgIGhhc09wdGlvbnMgPSBmb3JtLmZpbmQoJ1tkYXRhLWZidC1vcHRpb24tY2hhbmdlXScpLmxlbmd0aCxcbiAgICAgICAgICAgIGhhc0RlZmF1bHRPcHRpb25zID0gZm9ybS5maW5kKCdbZGF0YS1kZWZhdWx0XScpLmxlbmd0aDtcblxuICAgICAgICBpZiAoaGFzRGVmYXVsdE9wdGlvbnMgJiYgaGFzT3B0aW9ucykge1xuICAgICAgICAgICAgdXRpbHMuYXBpLnByb2R1Y3RBdHRyaWJ1dGVzLm9wdGlvbkNoYW5nZShwSWQsIGZvcm0uc2VyaWFsaXplKCksICdwcm9kdWN0cy9idWxrLWRpc2NvdW50LXJhdGVzJywgKGVyciwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBhdHRyaWJ1dGVzRGF0YSA9IHJlc3BvbnNlLmRhdGEgfHwge307XG4gICAgICAgICAgICAgICAgY29uc3QgYXR0cmlidXRlc0NvbnRlbnQgPSByZXNwb25zZS5jb250ZW50IHx8IHt9O1xuXG4gICAgICAgICAgICAgICAgdXBkYXRlUHJvZHVjdEF0dHJpYnV0ZXMoZm9ybSwgYXR0cmlidXRlc0RhdGEpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGhhc0RlZmF1bHRPcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZVZpZXcoZm9ybSwgYXR0cmlidXRlc0RhdGEsIGF0dHJpYnV0ZXNDb250ZW50KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB1cGRhdGVEZWZhdWx0QXR0cmlidXRlc0Zvck9PUyhhdHRyaWJ1dGVzRGF0YSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzaG93TGlzdChsaXN0KXtcbiAgICAgICAgbGlzdC5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICB2YXIgcmVzcG9uc2UgPSBlbGVtZW50LmRhdGE7XG5cbiAgICAgICAgICAgICRidW5kbGVMaXN0LmFwcGVuZChyZXNwb25zZS5pdGVtKTtcblxuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLm9wdGlvbnMudHJpbSgpICE9IFwiXCIpIHtcbiAgICAgICAgICAgICAgICB2YXIgcElkID0gJChyZXNwb25zZS5pdGVtKS5kYXRhKCdwcm9kdWN0LWlkJyksXG4gICAgICAgICAgICAgICAgJGZvcm0gPSAkYnVuZGxlTGlzdC5maW5kKCcuaGFsby1wcm9kdWN0LWl0ZW1bZGF0YS1wcm9kdWN0LWlkPVwiJyArIHBJZCArICdcIl0gZm9ybScpO1xuXG4gICAgICAgICAgICAgICAgJGZvcm0uYXBwZW5kKHJlc3BvbnNlLm9wdGlvbnMpO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgJHByb2R1Y3RPcHRpb25zRWxlbWVudCA9ICQoJ1tkYXRhLWZidC1vcHRpb24tY2hhbmdlXScsICRmb3JtKTtcbiAgICAgICAgICAgICAgICBjb25zdCBoYXNPcHRpb25zID0gJHByb2R1Y3RPcHRpb25zRWxlbWVudC5odG1sKCkudHJpbSgpLmxlbmd0aDtcbiAgICAgICAgICAgICAgICBjb25zdCBoYXNEZWZhdWx0T3B0aW9ucyA9ICQocmVzcG9uc2Uub3B0aW9ucykuZmluZCgnW2RhdGEtZGVmYXVsdF0nKS5sZW5ndGg7XG5cbiAgICAgICAgICAgICAgICBpZiAoaGFzRGVmYXVsdE9wdGlvbnMgJiYgaGFzT3B0aW9ucykge1xuICAgICAgICAgICAgICAgICAgICB1dGlscy5hcGkucHJvZHVjdEF0dHJpYnV0ZXMub3B0aW9uQ2hhbmdlKHBJZCwgJGZvcm0uc2VyaWFsaXplKCksICdwcm9kdWN0cy9idWxrLWRpc2NvdW50LXJhdGVzJywgKGVyciwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHJlc3BvbnNlICE9IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYXR0cmlidXRlc0RhdGEgPSByZXNwb25zZS5kYXRhIHx8IHt9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGF0dHJpYnV0ZXNDb250ZW50ID0gcmVzcG9uc2UuY29udGVudCB8fCB7fTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZVByb2R1Y3RBdHRyaWJ1dGVzKCRmb3JtLCBhdHRyaWJ1dGVzRGF0YSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaGFzRGVmYXVsdE9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlVmlldygkZm9ybSwgYXR0cmlidXRlc0RhdGEsIGF0dHJpYnV0ZXNDb250ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVEZWZhdWx0QXR0cmlidXRlc0Zvck9PUyhhdHRyaWJ1dGVzRGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBzZXRQcm9kdWN0VmFyaWFudCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBwcm9kdWN0T3B0aW9ucygpO1xuICAgICAgICBzaG93U2xpY2tTbGlkZXIoJGJ1bmRsZUxpc3QpO1xuXG4gICAgICAgIGlmKCEkYnVuZGxlLmhhc0NsYXNzKCdoYWxvLWJ1bmRsZS1sb2dpbicpKXtcbiAgICAgICAgICAgIHRvdGFsUHJpY2UoKTtcbiAgICAgICAgfVxuXG4gICAgICAgICRidW5kbGUucmVtb3ZlQ2xhc3MoJ2hhbG8tYmxvY2stZGlzYWJsZScpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNob3dTbGlja1NsaWRlcih3cmFwKXtcbiAgICAgICAgaWYod3JhcC5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgIHdyYXAuc2xpY2soe1xuICAgICAgICAgICAgICAgIGRvdHM6IHRydWUsXG4gICAgICAgICAgICAgICAgYXJyb3dzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDIsXG4gICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gICAgICAgICAgICAgICAgbW9iaWxlRmlyc3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgaW5maW5pdGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIG5leHRBcnJvdzogXCI8c3ZnIGNsYXNzPSdzbGljay1uZXh0IHNsaWNrLWFycm93IHNsaWNrLWFycm93LWxhcmdlJyBhcmlhLWxhYmVsPSdOZXh0IFNsaWRlJz48dXNlIHhsaW5rOmhyZWY9JyNzbGljay1hcnJvdy1uZXh0Jz48L3VzZT48L3N2Zz5cIixcbiAgICAgICAgICAgICAgICBwcmV2QXJyb3c6IFwiPHN2ZyBjbGFzcz0nc2xpY2stcHJldiBzbGljay1hcnJvdyBzbGljay1hcnJvdy1sYXJnZScgYXJpYS1sYWJlbD0nUHJldmlvdXMgU2xpZGUnPjx1c2UgeGxpbms6aHJlZj0nI3NsaWNrLWFycm93LXByZXYnPjwvdXNlPjwvc3ZnPlwiLFxuICAgICAgICAgICAgICAgIHJlc3BvbnNpdmU6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogMTYwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiA1LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvdHM6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFycm93czogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiAxMDI1LFxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDFcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNTUxLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDFcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hlY2tQcm9kdWN0KGZvcm0sIGFyclBybykge1xuICAgICAgICB2YXIgY2hlY2sgPSB0cnVlO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyUHJvLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgayA9IGFyclByb1tpXSxcbiAgICAgICAgICAgICAgICAkZm9ybSA9ICQoZm9ybVtrXSk7XG5cbiAgICAgICAgICAgIGlmICgkZm9ybS5maW5kKCdbZGF0YS1mYnQtb3B0aW9uLWNoYW5nZV0nKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBjaGVjayA9IGNoZWNrQmVmb3JlQWRkKCRmb3JtKTtcblxuICAgICAgICAgICAgICAgIGlmIChjaGVjayA9PSBmYWxzZSl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY2hlY2s7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hlY2tCZWZvcmVBZGQoJGF0dHJpYnV0ZXMpIHtcbiAgICAgICAgdmFyIGNoZWNrID0gdHJ1ZSxcbiAgICAgICAgICAgIGF0dCA9IFwiXCI7XG5cbiAgICAgICAgJGF0dHJpYnV0ZXMuZmluZCgnaW5wdXQ6dGV4dCwgaW5wdXQ6cGFzc3dvcmQsIGlucHV0OmZpbGUsIHRleHRhcmVhJykuZWFjaCgoaW5kZXgsIGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIGlmICghJChlbGVtZW50KS5wcm9wKCdyZXF1aXJlZCcpKSB7fSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoJChlbGVtZW50KS52YWwoKSkge30gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICQoZWxlbWVudCkuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgY2hlY2sgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRhdHRyaWJ1dGVzLmZpbmQoJ3NlbGVjdCcpLmVhY2goKGluZGV4LCBlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAoISQoZWxlbWVudCkucHJvcCgncmVxdWlyZWQnKSkge30gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKCQoZWxlbWVudCkudmFsKCkpIHt9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAkKGVsZW1lbnQpLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgIGNoZWNrID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAkYXR0cmlidXRlcy5maW5kKCdpbnB1dDpyYWRpbywgaW5wdXQ6Y2hlY2tib3gnKS5lYWNoKChpbmRleCwgZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKGF0dCAhPSAkKGVsZW1lbnQpLmF0dHIoXCJuYW1lXCIpKSB7XG4gICAgICAgICAgICAgICAgYXR0ID0gJChlbGVtZW50KS5hdHRyKFwibmFtZVwiKTtcbiAgICAgICAgICAgICAgICBpZiAoISQoZWxlbWVudCkucHJvcCgncmVxdWlyZWQnKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoJChlbGVtZW50KS5hdHRyKFwidHlwZVwiKSA9PSBcImNoZWNrYm94XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkKFwiW25hbWU9J1wiICsgYXR0ICsgXCInXTpjaGVja2VkXCIpLnZhbCgpKSB7fVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICgkKGVsZW1lbnQpLmF0dHIoXCJ0eXBlXCIpID09IFwicmFkaW9cIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQoXCJbbmFtZT0nXCIgKyBhdHQgKyBcIiddOmNoZWNrZWRcIikudmFsKCkpIHt9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoJChlbGVtZW50KS5hdHRyKFwidHlwZVwiKSA9PSBcImNoZWNrYm94XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkKFwiW25hbWU9J1wiICsgYXR0ICsgXCInXTpjaGVja2VkXCIpLnZhbCgpKSB7fSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVjayA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICgkKGVsZW1lbnQpLmF0dHIoXCJ0eXBlXCIpID09IFwicmFkaW9cIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQoXCJbbmFtZT0nXCIgKyBhdHQgKyBcIiddOmNoZWNrZWRcIikudmFsKCkpIHt9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBjaGVjaztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGRUb0NhcnQoZm9ybSwgaSwgYXJyUCwgaykge1xuICAgICAgICBpZiAod2luZG93LkZvcm1EYXRhID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBwcm9kID0gYXJyUFtpXTtcblxuICAgICAgICB1dGlscy5hcGkuY2FydC5pdGVtQWRkKGZpbHRlckVtcHR5RmlsZXNGcm9tRm9ybShuZXcgRm9ybURhdGEoZm9ybVtwcm9kXSkpLCAoZXJyLCByZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZXJyb3JNZXNzYWdlID0gZXJyIHx8IHJlc3BvbnNlLmRhdGEuZXJyb3I7XG5cbiAgICAgICAgICAgIGlmIChlcnJvck1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0bXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdESVYnKTtcbiAgICAgICAgICAgICAgICB0bXAuaW5uZXJIVE1MID0gZXJyb3JNZXNzYWdlO1xuICAgICAgICAgICAgICAgIGFsZXJ0KHRtcC50ZXh0Q29udGVudCB8fCB0bXAuaW5uZXJUZXh0KTtcbiAgICAgICAgICAgICAgICBrID0gayAtIDE7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGkrKztcblxuICAgICAgICAgICAgaWYgKGkgPj0gYXJyUC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAkYnVuZGxlLmZpbmQoJy5sb2FkaW5nT3ZlcmxheScpLmhpZGUoKTtcblxuICAgICAgICAgICAgICAgIG1vZGFsLiRtb2RhbC5yZW1vdmVDbGFzcygpLmFkZENsYXNzKCdtb2RhbCBtb2RhbC0tcHJldmlldyBtb2RhbC0tcHJldmlld01pbmkgbW9kYWwtLXByZXZpZXdNaW5pMicpO1xuICAgICAgICAgICAgICAgIG1vZGFsLm9wZW4oeyBzaXplOiAnc21hbGwnIH0pO1xuXG4gICAgICAgICAgICAgICAgaWYoJChcIi5tb2RhbC1iYWNrZ3JvdW5kOnZpc2libGVcIikubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAgICAgICAgICQoJy5tb2RhbC1iYWNrZ3JvdW5kOnZpc2libGUnKS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIHJlc3BvbnNlO1xuXG4gICAgICAgICAgICAgICAgaWYoayA+IDApe1xuICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9ICc8ZGl2IGNsYXNzPVwibW9kYWwtaGVhZGVyXCI+XFxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxoMiBjbGFzcz1cIm1vZGFsLWhlYWRlci10aXRsZVwiPlxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgT2ssICcraysnIGl0ZW0gd2FzIGFkZGVkIHRvIHlvdXIgY2FydC4gV2hhdFxcJ3MgbmV4dD9cXFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9oMj5cXFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtYm9keVwiPlxcXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJldmlld0NhcnQgcHJldmlld0NhcnQyXCI+XFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c2VjdGlvbiBjbGFzcz1cInByZXZpZXdDYXJ0Q2hlY2tvdXQgcHJldmlld0NhcnRDaGVja291dDJcIj5cXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwiL2NoZWNrb3V0LnBocFwiIGNsYXNzPVwiYnV0dG9uIGJ1dHRvbi0tcHJpbWFyeVwiPlxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBQcm9jZWVkIFRvIENoZWNrb3V0XFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwicHJldmlld0NhcnRDaGVja291dC1hdXRvQ2xvc2VcIiBkYXRhLWF1dG8tY2xvc2U9XCIxMFwiPkF1dG8gY2xvc2UgYWZ0ZXIgPHNwYW4gY2xhc3M9XCJjb3VudFwiPjwvc3Bhbj5zPC9wPlxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zZWN0aW9uPlxcXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj4nO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gJzxkaXYgY2xhc3M9XCJtb2RhbC1oZWFkZXJcIj5cXFxuICAgICAgICAgICAgICAgICAgICAgICAgPGgyIGNsYXNzPVwibW9kYWwtaGVhZGVyLXRpdGxlXCI+XFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBPaywgJytrKycgaXRlbSB3YXMgYWRkZWQgdG8geW91ciBjYXJ0LiBXaGF0XFwncyBuZXh0P1xcXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2gyPlxcXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1ib2R5XCI+XFxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcmV2aWV3Q2FydCBwcmV2aWV3Q2FydDJcIj5cXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzPVwicHJldmlld0NhcnRDaGVja291dCBwcmV2aWV3Q2FydENoZWNrb3V0MlwiPlxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwicHJldmlld0NhcnRDaGVja291dC10ZXh0XCI+U29ycnkhIFdlIGRvblxcJ3QgaGF2ZSBlbm91Z2ggcHJvZHVjdCBmb3IgeW91ciBzZWxlY3Rpb24hPC9wPlxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwicHJldmlld0NhcnRDaGVja291dC1hdXRvQ2xvc2VcIiBkYXRhLWF1dG8tY2xvc2U9XCIxMFwiPkF1dG8gY2xvc2UgYWZ0ZXIgPHNwYW4gY2xhc3M9XCJjb3VudFwiPjwvc3Bhbj5zPC9wPlxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zZWN0aW9uPlxcXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj4nO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbnN0ICRib2R5ID0gJCgnYm9keScpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHF1YW50aXR5ID0gcGFyc2VJbnQoJGJvZHkuZmluZCgnLmNhcnREZXNrdG9wIC5jYXJ0LXF1YW50aXR5JykudGV4dCgpKSArIGs7XG5cbiAgICAgICAgICAgICAgICAkYm9keS50cmlnZ2VyKCdjYXJ0LXF1YW50aXR5LXVwZGF0ZScsIHF1YW50aXR5KTtcblxuICAgICAgICAgICAgICAgIG1vZGFsLnVwZGF0ZUNvbnRlbnQocmVzcG9uc2UpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBhZGRUb0NhcnQoZm9ybSwgaSwgYXJyUCwgayk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRvdGFsUHJpY2UoKSB7XG4gICAgICAgIHZhciB0b3RhbCA9IDAsXG4gICAgICAgICAgICBzeW1ib2wsXG4gICAgICAgICAgICBzeW1ib2xDaGFuZ2UsXG4gICAgICAgICAgICBkZWNpbWFsUGxhY2VzLFxuICAgICAgICAgICAgZGVjaW1hbFNlcGFyYXRvcixcbiAgICAgICAgICAgIHRob3VzYW5kc1NlcGFyYXRvcixcbiAgICAgICAgICAgIHN5bWJvbExvY2F0aW9uLFxuICAgICAgICAgICAgY3VycixcbiAgICAgICAgICAgIHRva2VuMSxcbiAgICAgICAgICAgIHRva2VuMixcbiAgICAgICAgICAgIGxlbmd0aDtcblxuICAgICAgICBkZWNpbWFsUGxhY2VzID0gY3VycmVuY3kuZGVjaW1hbF9wbGFjZXM7XG4gICAgICAgIGRlY2ltYWxTZXBhcmF0b3IgPSBjdXJyZW5jeS5kZWNpbWFsX3Rva2VuO1xuICAgICAgICB0aG91c2FuZHNTZXBhcmF0b3IgPSBjdXJyZW5jeS50aG91c2FuZHNfdG9rZW47XG4gICAgICAgIHN5bWJvbExvY2F0aW9uID0gY3VycmVuY3kuY3VycmVuY3lfbG9jYXRpb247XG4gICAgICAgIHN5bWJvbCA9IGN1cnJlbmN5LmN1cnJlbmN5X3Rva2VuO1xuXG4gICAgICAgICRidW5kbGVMaXN0LmZpbmQoJy5oYWxvLXByb2R1Y3QtaXRlbS5pc0NoZWNrZWQnKS5lYWNoKChpbmRleCwgdmFsKSA9PiB7XG4gICAgICAgICAgICB2YXIgcHJpY2UgPSBwYXJzZUZsb2F0KCQodmFsKS5maW5kKCdbZGF0YS1wcmljZS12YWx1ZV0nKS5hdHRyKCdkYXRhLXByaWNlLXZhbHVlJykpO1xuICAgICAgICAgICAgdG90YWwgPSB0b3RhbCArIHByaWNlO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoJCgnLnByb2R1Y3RWaWV3LXByaWNlID4gLnByaWNlLXNlY3Rpb24gPiAucHJpY2UucHJpY2UtLXdpdGhUYXgnLCAkc2NvcGUpLmxlbmd0aCkge1xuICAgICAgICAgICAgY3VyciA9ICQoJy5wcm9kdWN0Vmlldy1wcmljZSA+IC5wcmljZS1zZWN0aW9uID4gLnByaWNlLnByaWNlLS13aXRoVGF4JywgJHNjb3BlKS50ZXh0KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjdXJyID0gJCgnLnByb2R1Y3RWaWV3LXByaWNlID4gLnByaWNlLXNlY3Rpb24gPiAucHJpY2UucHJpY2UtLXdpdGhvdXRUYXgnLCAkc2NvcGUpLnRleHQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN5bWJvbENoYW5nZSA9IGN1cnIucmVwbGFjZSgvWzAtOV0vZywgXCJcIikucmVwbGFjZShcIi5cIiwgXCJcIikucmVwbGFjZShcIixcIiwgXCJcIik7XG5cbiAgICAgICAgaWYoc3ltYm9sICE9IHN5bWJvbENoYW5nZSl7XG4gICAgICAgICAgICBzeW1ib2wgPSBzeW1ib2xDaGFuZ2U7XG4gICAgICAgICAgICB0b2tlbjEgPSAoY3Vyci5pbmRleE9mKCcuJykpO1xuICAgICAgICAgICAgdG9rZW4yID0gKGN1cnIuaW5kZXhPZignLCcpKTtcbiAgICAgICAgICAgIGxlbmd0aCA9IGN1cnIubGVuZ3RoIC0gMTtcblxuICAgICAgICAgICAgaWYgKGN1cnIuaW5kZXhPZihzeW1ib2wpICE9IC0xKSB7XG4gICAgICAgICAgICAgICAgc3ltYm9sTG9jYXRpb24gPSBjdXJyLmluZGV4T2Yoc3ltYm9sKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRva2VuMSA8IHRva2VuMikge1xuICAgICAgICAgICAgICAgIHRob3VzYW5kc1NlcGFyYXRvciA9ICcuJztcbiAgICAgICAgICAgICAgICBkZWNpbWFsU2VwYXJhdG9yID0gJywnO1xuXG4gICAgICAgICAgICAgICAgaWYgKHN5bWJvbExvY2F0aW9uID09IDAgfHwgc3ltYm9sTG9jYXRpb24gPT0gXCJsZWZ0XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVjaW1hbFBsYWNlcyA9IGxlbmd0aCAtIHRva2VuMjtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBkZWNpbWFsUGxhY2VzID0gbGVuZ3RoIC0gdG9rZW4yIC0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRob3VzYW5kc1NlcGFyYXRvciA9ICcsJztcbiAgICAgICAgICAgICAgICBkZWNpbWFsU2VwYXJhdG9yID0gJy4nO1xuICAgICAgICAgICAgICAgIGlmIChzeW1ib2xMb2NhdGlvbiA9PSAwIHx8IHN5bWJvbExvY2F0aW9uID09IFwibGVmdFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlY2ltYWxQbGFjZXMgPSBsZW5ndGggLSB0b2tlbjE7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZGVjaW1hbFBsYWNlcyA9IGxlbmd0aCAtIHRva2VuMSAtIDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYodG90YWwgPT0gMCl7XG4gICAgICAgICAgICAkYnVuZGxlLmZpbmQoJyNoYWxvLWFkZEFsbCcpLmF0dHIoJ2Rpc2FibGVkJywgdHJ1ZSk7XG4gICAgICAgIH0gZWxzZXtcbiAgICAgICAgICAgICRidW5kbGUuZmluZCgnI2hhbG8tYWRkQWxsJykuYXR0cignZGlzYWJsZWQnLCBmYWxzZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0b3RhbCA9IGZvcm1hdE1vbmV5KHRvdGFsLCBkZWNpbWFsUGxhY2VzLCBkZWNpbWFsU2VwYXJhdG9yLCB0aG91c2FuZHNTZXBhcmF0b3IpO1xuXG4gICAgICAgIGlmIChzeW1ib2xMb2NhdGlvbiA9PSBcImxlZnRcIiB8fCBzeW1ib2xMb2NhdGlvbiA9PSAwKXtcbiAgICAgICAgICAgIHRvdGFsID0gc3ltYm9sICsgdG90YWw7XG4gICAgICAgIH0gZWxzZXtcbiAgICAgICAgICAgIHRvdGFsID0gdG90YWwgKyBzeW1ib2w7XG4gICAgICAgIH1cblxuICAgICAgICAkYnVuZGxlLmZpbmQoJy5oYWxvLXByb2R1Y3QtdG90YWwgLnByaWNlJykuaHRtbCh0b3RhbCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZm9ybWF0TW9uZXkobiwgYywgZCwgdCkge1xuICAgICAgICB2YXIgYyA9IGlzTmFOKGMgPSBNYXRoLmFicyhjKSkgPyAyIDogYyxcbiAgICAgICAgICAgIGQgPSBkID09IHVuZGVmaW5lZCA/IFwiLlwiIDogZCxcbiAgICAgICAgICAgIHQgPSB0ID09IHVuZGVmaW5lZCA/IFwiLFwiIDogdCxcbiAgICAgICAgICAgIHMgPSBuIDwgMCA/IFwiLVwiIDogXCJcIixcbiAgICAgICAgICAgIGkgPSBTdHJpbmcocGFyc2VJbnQobiA9IE1hdGguYWJzKE51bWJlcihuKSB8fCAwKS50b0ZpeGVkKGMpKSksXG4gICAgICAgICAgICBqID0gKGogPSBpLmxlbmd0aCkgPiAzID8gaiAlIDMgOiAwO1xuXG4gICAgICAgIHJldHVybiBzICsgKGogPyBpLnN1YnN0cigwLCBqKSArIHQgOiBcIlwiKSArIGkuc3Vic3RyKGopLnJlcGxhY2UoLyhcXGR7M30pKD89XFxkKS9nLCBcIiQxXCIgKyB0KSArIChjID8gZCArIE1hdGguYWJzKG4gLSBpKS50b0ZpeGVkKGMpLnNsaWNlKDIpIDogXCJcIik7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHByb2R1Y3RPcHRpb25zKCkge1xuICAgICAgICBpZighJGJ1bmRsZS5oYXNDbGFzcygnaGFsby1idW5kbGUtbG9naW4nKSl7XG4gICAgICAgICAgICB0b3RhbFByaWNlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCAkZm9ybSA9ICQoJ2Zvcm0nLCAkYnVuZGxlKSxcbiAgICAgICAgICAgICRwcm9kdWN0T3B0aW9uc0VsZW1lbnQgPSAkKCdbZGF0YS1mYnQtb3B0aW9uLWNoYW5nZV0nLCAkZm9ybSk7XG5cbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NoYW5nZScsICRwcm9kdWN0T3B0aW9uc0VsZW1lbnQsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIHByb2R1Y3RPcHRpb25zQ2hhbmdlZChldmVudCk7XG4gICAgICAgICAgICBzZXRQcm9kdWN0VmFyaWFudChldmVudCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldFByb2R1Y3RWYXJpYW50KCkge1xuICAgICAgICBjb25zdCB1bnNhdGlzZmllZFJlcXVpcmVkRmllbGRzID0gW107XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSBbXTtcblxuICAgICAgICAkLmVhY2goJCgnW2RhdGEtZmJ0LW9wdGlvbi1jaGFuZ2VdIFtkYXRhLXByb2R1Y3QtYXR0cmlidXRlXScpLCAoaW5kZXgsIHZhbHVlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBvcHRpb25MYWJlbCA9IHZhbHVlLmNoaWxkcmVuWzBdLmlubmVyVGV4dDtcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvblRpdGxlID0gb3B0aW9uTGFiZWwuc3BsaXQoJzonKVswXS50cmltKCk7XG4gICAgICAgICAgICBjb25zdCByZXF1aXJlZCA9IG9wdGlvbkxhYmVsLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoJ3JlcXVpcmVkJyk7XG4gICAgICAgICAgICBjb25zdCB0eXBlID0gdmFsdWUuZ2V0QXR0cmlidXRlKCdkYXRhLXByb2R1Y3QtYXR0cmlidXRlJyk7XG5cbiAgICAgICAgICAgIGlmICgodHlwZSA9PT0gJ2lucHV0LWZpbGUnIHx8IHR5cGUgPT09ICdpbnB1dC10ZXh0JyB8fCB0eXBlID09PSAnaW5wdXQtbnVtYmVyJykgJiYgdmFsdWUucXVlcnlTZWxlY3RvcignaW5wdXQnKS52YWx1ZSA9PT0gJycgJiYgcmVxdWlyZWQpIHtcbiAgICAgICAgICAgICAgICB1bnNhdGlzZmllZFJlcXVpcmVkRmllbGRzLnB1c2godmFsdWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodHlwZSA9PT0gJ3RleHRhcmVhJyAmJiB2YWx1ZS5xdWVyeVNlbGVjdG9yKCd0ZXh0YXJlYScpLnZhbHVlID09PSAnJyAmJiByZXF1aXJlZCkge1xuICAgICAgICAgICAgICAgIHVuc2F0aXNmaWVkUmVxdWlyZWRGaWVsZHMucHVzaCh2YWx1ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0eXBlID09PSAnZGF0ZScpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpc1NhdGlzZmllZCA9IEFycmF5LmZyb20odmFsdWUucXVlcnlTZWxlY3RvckFsbCgnc2VsZWN0JykpLmV2ZXJ5KChzZWxlY3QpID0+IHNlbGVjdC5zZWxlY3RlZEluZGV4ICE9PSAwKTtcblxuICAgICAgICAgICAgICAgIGlmIChpc1NhdGlzZmllZCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkYXRlU3RyaW5nID0gQXJyYXkuZnJvbSh2YWx1ZS5xdWVyeVNlbGVjdG9yQWxsKCdzZWxlY3QnKSkubWFwKCh4KSA9PiB4LnZhbHVlKS5qb2luKCctJyk7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMucHVzaChgJHtvcHRpb25UaXRsZX06JHtkYXRlU3RyaW5nfWApO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAocmVxdWlyZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdW5zYXRpc2ZpZWRSZXF1aXJlZEZpZWxkcy5wdXNoKHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0eXBlID09PSAnc2V0LXNlbGVjdCcpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzZWxlY3QgPSB2YWx1ZS5xdWVyeVNlbGVjdG9yKCdzZWxlY3QnKTtcbiAgICAgICAgICAgICAgICBjb25zdCBzZWxlY3RlZEluZGV4ID0gc2VsZWN0LnNlbGVjdGVkSW5kZXg7XG5cbiAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWRJbmRleCAhPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLnB1c2goYCR7b3B0aW9uVGl0bGV9OiR7c2VsZWN0Lm9wdGlvbnNbc2VsZWN0ZWRJbmRleF0uaW5uZXJUZXh0fWApO1xuICAgICAgICAgICAgICAgICAgICAkKHZhbHVlLmNoaWxkcmVuWzBdKS5maW5kKCdbZGF0YS1vcHRpb24tdmFsdWVdJykudGV4dChzZWxlY3Qub3B0aW9uc1tzZWxlY3RlZEluZGV4XS5pbm5lclRleHQpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHJlcXVpcmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHVuc2F0aXNmaWVkUmVxdWlyZWRGaWVsZHMucHVzaCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodHlwZSA9PT0gJ3NldC1yZWN0YW5nbGUnIHx8IHR5cGUgPT09ICdzZXQtcmFkaW8nIHx8IHR5cGUgPT09ICdzd2F0Y2gnIHx8IHR5cGUgPT09ICdpbnB1dC1jaGVja2JveCcgfHwgdHlwZSA9PT0gJ3Byb2R1Y3QtbGlzdCcpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjaGVja2VkID0gdmFsdWUucXVlcnlTZWxlY3RvcignOmNoZWNrZWQnKTtcbiAgICAgICAgICAgICAgICBpZiAoY2hlY2tlZCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gJ3NldC1yZWN0YW5nbGUnIHx8IHR5cGUgPT09ICdzZXQtcmFkaW8nIHx8IHR5cGUgPT09ICdwcm9kdWN0LWxpc3QnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsYWJlbCA9IGNoZWNrZWQubGFiZWxzWzBdLmlubmVyVGV4dDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMucHVzaChgJHtvcHRpb25UaXRsZX06JHtsYWJlbH1gKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHZhbHVlLmNoaWxkcmVuWzBdKS5maW5kKCdbZGF0YS1vcHRpb24tdmFsdWVdJykudGV4dChsYWJlbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gJ3N3YXRjaCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxhYmVsID0gY2hlY2tlZC5sYWJlbHNbMF0uY2hpbGRyZW5bMF07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zLnB1c2goYCR7b3B0aW9uVGl0bGV9OiR7bGFiZWwudGl0bGV9YCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh2YWx1ZS5jaGlsZHJlblswXSkuZmluZCgnW2RhdGEtb3B0aW9uLXZhbHVlXScpLnRleHQobGFiZWwudGl0bGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09ICdpbnB1dC1jaGVja2JveCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMucHVzaChgJHtvcHRpb25UaXRsZX06WWVzYCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09ICdpbnB1dC1jaGVja2JveCcpIHtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5wdXNoKGAke29wdGlvblRpdGxlfTpOb2ApO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChyZXF1aXJlZCkge1xuICAgICAgICAgICAgICAgICAgICB1bnNhdGlzZmllZFJlcXVpcmVkRmllbGRzLnB1c2godmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcHJvZHVjdE9wdGlvbnNDaGFuZ2VkKGV2ZW50KSB7XG4gICAgICAgIGNvbnN0ICRjaGFuZ2VkT3B0aW9uID0gJChldmVudC50YXJnZXQpO1xuICAgICAgICBjb25zdCAkZm9ybSA9ICRjaGFuZ2VkT3B0aW9uLnBhcmVudHMoJ2Zvcm0nKTtcbiAgICAgICAgY29uc3QgcHJvZHVjdElkID0gJCgnW25hbWU9XCJwcm9kdWN0X2lkXCJdJywgJGZvcm0pLnZhbCgpO1xuXG4gICAgICAgIGlmICgkY2hhbmdlZE9wdGlvbi5hdHRyKCd0eXBlJykgPT09ICdmaWxlJyB8fCB3aW5kb3cuRm9ybURhdGEgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCRjaGFuZ2VkT3B0aW9uLmF0dHIoJ2lkJykgPT09ICdmYnRfcHJvZHVjdCcgKyBwcm9kdWN0SWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdXRpbHMuYXBpLnByb2R1Y3RBdHRyaWJ1dGVzLm9wdGlvbkNoYW5nZShwcm9kdWN0SWQsICRmb3JtLnNlcmlhbGl6ZSgpLCAncHJvZHVjdHMvYnVsay1kaXNjb3VudC1yYXRlcycsIChlcnIsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBwcm9kdWN0QXR0cmlidXRlc0RhdGEgPSByZXNwb25zZS5kYXRhIHx8IHt9O1xuICAgICAgICAgICAgY29uc3QgcHJvZHVjdEF0dHJpYnV0ZXNDb250ZW50ID0gcmVzcG9uc2UuY29udGVudCB8fCB7fTtcbiAgICAgICAgICAgIHNob3dQcm9kdWN0SW1hZ2UocHJvZHVjdElkLCBwcm9kdWN0QXR0cmlidXRlc0RhdGEpO1xuICAgICAgICAgICAgdXBkYXRlUHJvZHVjdEF0dHJpYnV0ZXMoJGZvcm0sIHByb2R1Y3RBdHRyaWJ1dGVzRGF0YSk7XG4gICAgICAgICAgICB1cGRhdGVWaWV3KCRmb3JtLCBwcm9kdWN0QXR0cmlidXRlc0RhdGEsIHByb2R1Y3RBdHRyaWJ1dGVzQ29udGVudCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKCEkYnVuZGxlLmhhc0NsYXNzKCdoYWxvLWJ1bmRsZS1sb2dpbicpKXtcbiAgICAgICAgICAgICAgICB0b3RhbFByaWNlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgXG4gICAgZnVuY3Rpb24gdXBkYXRlUHJvZHVjdEF0dHJpYnV0ZXMoJHNjb3BlLCBkYXRhKSB7XG4gICAgICAgIGNvbnN0IGJlaGF2aW9yID0gZGF0YS5vdXRfb2Zfc3RvY2tfYmVoYXZpb3I7XG4gICAgICAgIGNvbnN0IGluU3RvY2tJZHMgPSBkYXRhLmluX3N0b2NrX2F0dHJpYnV0ZXM7XG4gICAgICAgIGNvbnN0IG91dE9mU3RvY2tNZXNzYWdlID0gYCAoJHtkYXRhLm91dF9vZl9zdG9ja19tZXNzYWdlfSlgO1xuXG4gICAgICAgIGlmIChiZWhhdmlvciAhPT0gJ2hpZGVfb3B0aW9uJyAmJiBiZWhhdmlvciAhPT0gJ2xhYmVsX29wdGlvbicpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgICQoJ1tkYXRhLXByb2R1Y3QtYXR0cmlidXRlLXZhbHVlXScsICRzY29wZSkuZWFjaCgoaSwgYXR0cmlidXRlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCAkYXR0cmlidXRlID0gJChhdHRyaWJ1dGUpO1xuICAgICAgICAgICAgY29uc3QgYXR0cklkID0gcGFyc2VJbnQoJGF0dHJpYnV0ZS5kYXRhKCdwcm9kdWN0QXR0cmlidXRlVmFsdWUnKSwgMTApO1xuXG4gICAgICAgICAgICBpZiAoaW5TdG9ja0lkcy5pbmRleE9mKGF0dHJJZCkgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgZW5hYmxlQXR0cmlidXRlKCRhdHRyaWJ1dGUsIGJlaGF2aW9yLCBvdXRPZlN0b2NrTWVzc2FnZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRpc2FibGVBdHRyaWJ1dGUoJGF0dHJpYnV0ZSwgYmVoYXZpb3IsIG91dE9mU3RvY2tNZXNzYWdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZGlzYWJsZUF0dHJpYnV0ZSgkYXR0cmlidXRlLCBiZWhhdmlvciwgb3V0T2ZTdG9ja01lc3NhZ2UpIHtcbiAgICAgICAgaWYgKGdldEF0dHJpYnV0ZVR5cGUoJGF0dHJpYnV0ZSkgPT09ICdzZXQtc2VsZWN0Jykge1xuICAgICAgICAgICAgcmV0dXJuIGRpc2FibGVTZWxlY3RPcHRpb25BdHRyaWJ1dGUoJGF0dHJpYnV0ZSwgYmVoYXZpb3IsIG91dE9mU3RvY2tNZXNzYWdlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChiZWhhdmlvciA9PT0gJ2hpZGVfb3B0aW9uJykge1xuICAgICAgICAgICAgJGF0dHJpYnV0ZS5oaWRlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkYXR0cmlidXRlLmFkZENsYXNzKCd1bmF2YWlsYWJsZScpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZGlzYWJsZVNlbGVjdE9wdGlvbkF0dHJpYnV0ZSgkYXR0cmlidXRlLCBiZWhhdmlvciwgb3V0T2ZTdG9ja01lc3NhZ2UpIHtcbiAgICAgICAgY29uc3QgJHNlbGVjdCA9ICRhdHRyaWJ1dGUucGFyZW50KCk7XG5cbiAgICAgICAgaWYgKGJlaGF2aW9yID09PSAnaGlkZV9vcHRpb24nKSB7XG4gICAgICAgICAgICAkYXR0cmlidXRlLnRvZ2dsZU9wdGlvbihmYWxzZSk7XG5cbiAgICAgICAgICAgIGlmICgkc2VsZWN0LnZhbCgpID09PSAkYXR0cmlidXRlLmF0dHIoJ3ZhbHVlJykpIHtcbiAgICAgICAgICAgICAgICAkc2VsZWN0WzBdLnNlbGVjdGVkSW5kZXggPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJGF0dHJpYnV0ZS5hdHRyKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xuICAgICAgICAgICAgJGF0dHJpYnV0ZS5odG1sKCRhdHRyaWJ1dGUuaHRtbCgpLnJlcGxhY2Uob3V0T2ZTdG9ja01lc3NhZ2UsICcnKSArIG91dE9mU3RvY2tNZXNzYWdlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGVuYWJsZUF0dHJpYnV0ZSgkYXR0cmlidXRlLCBiZWhhdmlvciwgb3V0T2ZTdG9ja01lc3NhZ2UpIHtcbiAgICAgICAgaWYgKGdldEF0dHJpYnV0ZVR5cGUoJGF0dHJpYnV0ZSkgPT09ICdzZXQtc2VsZWN0Jykge1xuICAgICAgICAgICAgcmV0dXJuIGVuYWJsZVNlbGVjdE9wdGlvbkF0dHJpYnV0ZSgkYXR0cmlidXRlLCBiZWhhdmlvciwgb3V0T2ZTdG9ja01lc3NhZ2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGJlaGF2aW9yID09PSAnaGlkZV9vcHRpb24nKSB7XG4gICAgICAgICAgICAkYXR0cmlidXRlLnNob3coKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICRhdHRyaWJ1dGUucmVtb3ZlQ2xhc3MoJ3VuYXZhaWxhYmxlJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBlbmFibGVTZWxlY3RPcHRpb25BdHRyaWJ1dGUoJGF0dHJpYnV0ZSwgYmVoYXZpb3IsIG91dE9mU3RvY2tNZXNzYWdlKSB7XG4gICAgICAgIGlmIChiZWhhdmlvciA9PT0gJ2hpZGVfb3B0aW9uJykge1xuICAgICAgICAgICAgJGF0dHJpYnV0ZS50b2dnbGVPcHRpb24odHJ1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkYXR0cmlidXRlLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xuICAgICAgICAgICAgJGF0dHJpYnV0ZS5odG1sKCRhdHRyaWJ1dGUuaHRtbCgpLnJlcGxhY2Uob3V0T2ZTdG9ja01lc3NhZ2UsICcnKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRBdHRyaWJ1dGVUeXBlKCRhdHRyaWJ1dGUpIHtcbiAgICAgICAgY29uc3QgJHBhcmVudCA9ICRhdHRyaWJ1dGUuY2xvc2VzdCgnW2RhdGEtcHJvZHVjdC1hdHRyaWJ1dGVdJyk7XG5cbiAgICAgICAgcmV0dXJuICRwYXJlbnQgPyAkcGFyZW50LmRhdGEoJ3Byb2R1Y3RBdHRyaWJ1dGUnKSA6IG51bGw7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2hvd1Byb2R1Y3RJbWFnZShwcm9kdWN0SWQsIGRhdGEpIHtcbiAgICAgICAgaWYgKF8uaXNQbGFpbk9iamVjdChkYXRhLmltYWdlKSkge1xuICAgICAgICAgICAgY29uc3QgbWFpbkltYWdlVXJsID0gdXRpbHMudG9vbHMuaW1hZ2VTcmNzZXQuZ2V0U3Jjc2V0KFxuICAgICAgICAgICAgICAgIGRhdGEuaW1hZ2UuZGF0YSwgeyAnMXgnOiBjb250ZXh0LnRoZW1lU2V0dGluZ3MucHJvZHVjdGdhbGxlcnlfc2l6ZSB9LFxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgJCgnLmhhbG8tcHJvZHVjdC1pdGVtW2RhdGEtcHJvZHVjdC1pZD1cIicgKyBwcm9kdWN0SWQgKyAnXCJdJykuZmluZCgnaW1nJykuYXR0cih7XG4gICAgICAgICAgICAgICAgJ3NyY3NldCc6IG1haW5JbWFnZVVybCxcbiAgICAgICAgICAgICAgICAnZGF0YS1zcmNzZXQnOiAkKHRoaXMpLmF0dHIoJ3NyY3NldCcpLFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IG1haW5JbWFnZVVybCA9ICQoJy5oYWxvLXByb2R1Y3QtaXRlbVtkYXRhLXByb2R1Y3QtaWQ9XCInICsgcHJvZHVjdElkICsgJ1wiXScpLmZpbmQoJ2ltZycpLmF0dHIoJ2RhdGEtc3Jjc2V0Jyk7XG4gICAgICAgICAgICAkKCcuaGFsby1wcm9kdWN0LWl0ZW1bZGF0YS1wcm9kdWN0LWlkPVwiJyArIHByb2R1Y3RJZCArICdcIl0nKS5maW5kKCdpbWcnKS5hdHRyKHtcbiAgICAgICAgICAgICAgICAnc3Jjc2V0JzogbWFpbkltYWdlVXJsLFxuICAgICAgICAgICAgICAgICdkYXRhLXNyY3NldCc6ICQodGhpcykuYXR0cignc3Jjc2V0JyksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZVZpZXcoJHNjb3BlLCBkYXRhLCBjb250ZW50ID0gbnVsbCkge1xuICAgICAgICBjb25zdCB2aWV3TW9kZWwgPSBnZXRWaWV3TW9kZWwoJHNjb3BlKTtcblxuICAgICAgICBzaG93TWVzc2FnZUJveChkYXRhLnN0b2NrX21lc3NhZ2UgfHwgZGF0YS5wdXJjaGFzaW5nX21lc3NhZ2UsICRzY29wZSk7XG5cbiAgICAgICAgaWYgKF8uaXNOdW1iZXIoZGF0YS5zdG9jaykpIHtcbiAgICAgICAgICAgIGlmKChkYXRhLnN0b2NrIDw9IHBhcnNlSW50KGNvbnRleHQudGhlbWVTZXR0aW5ncy5oYWxvX3N0b2NrX2xldmVsX2xpbWl0KSkgJiYgKGRhdGEuc3RvY2sgPiAwKSkge1xuICAgICAgICAgICAgICAgIHZpZXdNb2RlbC4kc3RvY2tMZWZ0V3JhcHBlci5yZW1vdmVDbGFzcygndS1oaWRkZW5WaXN1YWxseScpO1xuICAgICAgICAgICAgICAgIHZpZXdNb2RlbC4kc3RvY2tMZWZ0LnRleHQoZGF0YS5zdG9jayk7XG4gICAgICAgICAgICB9IGVsc2V7XG4gICAgICAgICAgICAgICAgdmlld01vZGVsLiRzdG9ja0xlZnRXcmFwcGVyLmFkZENsYXNzKCd1LWhpZGRlblZpc3VhbGx5Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoXy5pc09iamVjdChkYXRhLnByaWNlKSkge1xuICAgICAgICAgICAgdXBkYXRlUHJpY2VWaWV3KHZpZXdNb2RlbCwgZGF0YS5wcmljZSk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcHJvZHVjdElkID0gJCgnW25hbWU9XCJwcm9kdWN0X2lkXCJdJywgJHNjb3BlKS52YWwoKSxcbiAgICAgICAgICAgIHByb2R1Y3QgPSAkYnVuZGxlTGlzdC5maW5kKCcuaGFsby1wcm9kdWN0LWl0ZW1bZGF0YS1wcm9kdWN0LWlkPVwiJyArIHByb2R1Y3RJZCArICdcIl0nKSxcbiAgICAgICAgICAgIHByb2R1Y3RDaGVja2JveCA9IHByb2R1Y3QuZmluZCgnLmhhbG8tZGV0YWlsLWNoZWNrYm94Jyk7XG5cbiAgICAgICAgaWYgKCFkYXRhLnB1cmNoYXNhYmxlIHx8ICFkYXRhLmluc3RvY2spIHtcbiAgICAgICAgICAgIHByb2R1Y3QucmVtb3ZlQ2xhc3MoJ2lzQ2hlY2tlZCBoYXNPcHRpb25zLS1zZWxlY3RlZCcpO1xuICAgICAgICAgICAgcHJvZHVjdENoZWNrYm94LnByb3AoJ2NoZWNrZWQnLCBmYWxzZSkucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHByb2R1Y3QuYWRkQ2xhc3MoJ2lzQ2hlY2tlZCcpO1xuICAgICAgICAgICAgcHJvZHVjdENoZWNrYm94LnByb3AoJ2NoZWNrZWQnLCB0cnVlKS5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcblxuICAgICAgICAgICAgaWYgKCRzY29wZS5maW5kKCdbZGF0YS1mYnQtb3B0aW9uLWNoYW5nZV0nKS5sZW5ndGggPiAwKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgY2hlY2sgPSBjaGVja0JlZm9yZUFkZCgkc2NvcGUpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGNoZWNrID09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcHJvZHVjdC5hZGRDbGFzcygnaGFzT3B0aW9ucy0tc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVEZWZhdWx0QXR0cmlidXRlc0Zvck9PUygkc2NvcGUsIGRhdGEpIHtcbiAgICAgICAgdmFyIHByb2R1Y3RJZCA9ICQoJ1tuYW1lPVwicHJvZHVjdF9pZFwiXScsICRzY29wZSkudmFsKCksXG4gICAgICAgICAgICBwcm9kdWN0ID0gJGJ1bmRsZUxpc3QuZmluZCgnLmhhbG8tcHJvZHVjdC1pdGVtW2RhdGEtcHJvZHVjdC1pZD1cIicgKyBwcm9kdWN0SWQgKyAnXCJdJyksXG4gICAgICAgICAgICBwcm9kdWN0Q2hlY2tib3ggPSBwcm9kdWN0LmZpbmQoJy5oYWxvLWRldGFpbC1jaGVja2JveCcpO1xuXG4gICAgICAgIGlmICghZGF0YS5wdXJjaGFzYWJsZSB8fCAhZGF0YS5pbnN0b2NrKSB7XG4gICAgICAgICAgICBwcm9kdWN0LnJlbW92ZUNsYXNzKCdpc0NoZWNrZWQgaGFzT3B0aW9ucy0tc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgIHByb2R1Y3RDaGVja2JveC5wcm9wKCdjaGVja2VkJywgZmFsc2UpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwcm9kdWN0LmFkZENsYXNzKCdpc0NoZWNrZWQnKTtcbiAgICAgICAgICAgIHByb2R1Y3RDaGVja2JveC5wcm9wKCdjaGVja2VkJywgdHJ1ZSkucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XG5cbiAgICAgICAgICAgIGlmICgkc2NvcGUuZmluZCgnW2RhdGEtZmJ0LW9wdGlvbi1jaGFuZ2VdJykubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHZhciBjaGVjayA9IGNoZWNrQmVmb3JlQWRkKCRzY29wZSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoY2hlY2sgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICBwcm9kdWN0LmFkZENsYXNzKCdoYXNPcHRpb25zLS1zZWxlY3RlZCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFZpZXdNb2RlbCgkc2NvcGUpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICRwcmljZVdpdGhUYXg6ICQoJ1tkYXRhLXByb2R1Y3QtcHJpY2Utd2l0aC10YXhdJywgJHNjb3BlKSxcbiAgICAgICAgICAgICRwcmljZVdpdGhvdXRUYXg6ICQoJ1tkYXRhLXByb2R1Y3QtcHJpY2Utd2l0aG91dC10YXhdJywgJHNjb3BlKSxcbiAgICAgICAgICAgIHJycFdpdGhUYXg6IHtcbiAgICAgICAgICAgICAgICAkZGl2OiAkKCcucnJwLXByaWNlLS13aXRoVGF4JywgJHNjb3BlKSxcbiAgICAgICAgICAgICAgICAkc3BhbjogJCgnW2RhdGEtcHJvZHVjdC1ycnAtd2l0aC10YXhdJywgJHNjb3BlKSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBycnBXaXRob3V0VGF4OiB7XG4gICAgICAgICAgICAgICAgJGRpdjogJCgnLnJycC1wcmljZS0td2l0aG91dFRheCcsICRzY29wZSksXG4gICAgICAgICAgICAgICAgJHNwYW46ICQoJ1tkYXRhLXByb2R1Y3QtcnJwLXByaWNlLXdpdGhvdXQtdGF4XScsICRzY29wZSksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbm9uU2FsZVdpdGhUYXg6IHtcbiAgICAgICAgICAgICAgICAkZGl2OiAkKCcubm9uLXNhbGUtcHJpY2UtLXdpdGhUYXgnLCAkc2NvcGUpLFxuICAgICAgICAgICAgICAgICRzcGFuOiAkKCdbZGF0YS1wcm9kdWN0LW5vbi1zYWxlLXByaWNlLXdpdGgtdGF4XScsICRzY29wZSksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbm9uU2FsZVdpdGhvdXRUYXg6IHtcbiAgICAgICAgICAgICAgICAkZGl2OiAkKCcubm9uLXNhbGUtcHJpY2UtLXdpdGhvdXRUYXgnLCAkc2NvcGUpLFxuICAgICAgICAgICAgICAgICRzcGFuOiAkKCdbZGF0YS1wcm9kdWN0LW5vbi1zYWxlLXByaWNlLXdpdGhvdXQtdGF4XScsICRzY29wZSksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcHJpY2VTYXZlZDoge1xuICAgICAgICAgICAgICAgICRkaXY6ICQoJy5wcmljZS1zZWN0aW9uLS1zYXZpbmcnLCAkc2NvcGUpLFxuICAgICAgICAgICAgICAgICRzcGFuOiAkKCdbZGF0YS1wcm9kdWN0LXByaWNlLXNhdmVkXScsICRzY29wZSksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcHJpY2VOb3dMYWJlbDoge1xuICAgICAgICAgICAgICAgICRzcGFuOiAkKCcucHJpY2Utbm93LWxhYmVsJywgJHNjb3BlKSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwcmljZUxhYmVsOiB7XG4gICAgICAgICAgICAgICAgJHNwYW46ICQoJy5wcmljZS1sYWJlbCcsICRzY29wZSksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcHJpY2VEYXRhOiB7XG4gICAgICAgICAgICAgICAgJGRpdjogJCgnW2RhdGEtcHJpY2UtdmFsdWVdJywgJHNjb3BlKSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAkd2VpZ2h0OiAkKCcucHJvZHVjdFZpZXctaW5mbyBbZGF0YS1wcm9kdWN0LXdlaWdodF0nLCAkc2NvcGUpLFxuICAgICAgICAgICAgJGluY3JlbWVudHM6ICQoJy5mb3JtLWZpZWxkLS1pbmNyZW1lbnRzIDppbnB1dCcsICRzY29wZSksXG4gICAgICAgICAgICAkYWRkVG9DYXJ0OiAkKCcjZm9ybS1hY3Rpb24tYWRkVG9DYXJ0JywgJHNjb3BlKSxcbiAgICAgICAgICAgICR3aXNobGlzdFZhcmlhdGlvbjogJCgnW2RhdGEtd2lzaGxpc3QtYWRkXSBbbmFtZT1cInZhcmlhdGlvbl9pZFwiXScsICRzY29wZSksXG4gICAgICAgICAgICAkc3RvY2tMZWZ0OiAkKCdbZGF0YS1zdG9jay1sZWZ0XScsICRzY29wZSksXG4gICAgICAgICAgICAkc3RvY2tMZWZ0V3JhcHBlcjogJCgnLnByb2R1Y3RWaWV3LW9wdGlvbnNTdG9jaycsICRzY29wZSksXG4gICAgICAgICAgICBzdG9jazoge1xuICAgICAgICAgICAgICAgICRjb250YWluZXI6ICQoJy5mb3JtLWZpZWxkLS1zdG9jaycsICRzY29wZSksXG4gICAgICAgICAgICAgICAgJGlucHV0OiAkKCdbZGF0YS1wcm9kdWN0LXN0b2NrXScsICRzY29wZSksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgJHNrdTogJCgnW2RhdGEtcHJvZHVjdC1za3VdJyksXG4gICAgICAgICAgICAkdXBjOiAkKCdbZGF0YS1wcm9kdWN0LXVwY10nKSxcbiAgICAgICAgICAgIHF1YW50aXR5OiB7XG4gICAgICAgICAgICAgICAgJHRleHQ6ICQoJy5pbmNyZW1lbnRUb3RhbCcsICRzY29wZSksXG4gICAgICAgICAgICAgICAgJGlucHV0OiAkKCdbbmFtZT1xdHlcXFxcW1xcXFxdXScsICRzY29wZSksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgJGJ1bGtQcmljaW5nOiAkKCcucHJvZHVjdFZpZXctaW5mby1idWxrUHJpY2luZycsICRzY29wZSksXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2hvd01lc3NhZ2VCb3gobWVzc2FnZSwgJHNjb3BlKSB7XG4gICAgICAgIGNvbnN0ICRtZXNzYWdlQm94ID0gJCgnLnByb2R1Y3RBdHRyaWJ1dGVzLW1lc3NhZ2UnLCAkc2NvcGUpO1xuXG4gICAgICAgIGlmIChtZXNzYWdlKSB7XG4gICAgICAgICAgICAkKCcuYWxlcnRCb3gtbWVzc2FnZScsICRtZXNzYWdlQm94KS50ZXh0KG1lc3NhZ2UpO1xuICAgICAgICAgICAgJG1lc3NhZ2VCb3guc2hvdygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJG1lc3NhZ2VCb3guaGlkZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2xlYXJQcmljaW5nTm90Rm91bmQodmlld01vZGVsKSB7XG4gICAgICAgIHZpZXdNb2RlbC5ycnBXaXRoVGF4LiRkaXYuaGlkZSgpO1xuICAgICAgICB2aWV3TW9kZWwucnJwV2l0aG91dFRheC4kZGl2LmhpZGUoKTtcbiAgICAgICAgdmlld01vZGVsLm5vblNhbGVXaXRoVGF4LiRkaXYuaGlkZSgpO1xuICAgICAgICB2aWV3TW9kZWwubm9uU2FsZVdpdGhvdXRUYXguJGRpdi5oaWRlKCk7XG4gICAgICAgIHZpZXdNb2RlbC5wcmljZVNhdmVkLiRkaXYuaGlkZSgpO1xuICAgICAgICB2aWV3TW9kZWwucHJpY2VOb3dMYWJlbC4kc3Bhbi5oaWRlKCk7XG4gICAgICAgIHZpZXdNb2RlbC5wcmljZUxhYmVsLiRzcGFuLmhpZGUoKTtcbiAgICB9XG4gICAgXG4gICAgZnVuY3Rpb24gdXBkYXRlUHJpY2VWaWV3KHZpZXdNb2RlbCwgcHJpY2UpIHtcbiAgICAgICAgY2xlYXJQcmljaW5nTm90Rm91bmQodmlld01vZGVsKTtcblxuICAgICAgICBpZiAocHJpY2Uud2l0aF90YXgpIHtcbiAgICAgICAgICAgIHZpZXdNb2RlbC5wcmljZUxhYmVsLiRzcGFuLnNob3coKTtcbiAgICAgICAgICAgIHZpZXdNb2RlbC4kcHJpY2VXaXRoVGF4Lmh0bWwocHJpY2Uud2l0aF90YXguZm9ybWF0dGVkKTtcbiAgICAgICAgICAgIHZpZXdNb2RlbC5wcmljZURhdGEuJGRpdi5hdHRyKCdkYXRhLXByaWNlLXZhbHVlJywgcHJpY2Uud2l0aF90YXgudmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByaWNlLndpdGhvdXRfdGF4KSB7XG4gICAgICAgICAgICB2aWV3TW9kZWwucHJpY2VMYWJlbC4kc3Bhbi5zaG93KCk7XG4gICAgICAgICAgICB2aWV3TW9kZWwuJHByaWNlV2l0aG91dFRheC5odG1sKHByaWNlLndpdGhvdXRfdGF4LmZvcm1hdHRlZCk7XG4gICAgICAgICAgICB2aWV3TW9kZWwucHJpY2VEYXRhLiRkaXYuYXR0cignZGF0YS1wcmljZS12YWx1ZScsIHByaWNlLndpdGhvdXRfdGF4LnZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcmljZS5ycnBfd2l0aF90YXgpIHtcbiAgICAgICAgICAgIHZpZXdNb2RlbC5ycnBXaXRoVGF4LiRkaXYuc2hvdygpO1xuICAgICAgICAgICAgdmlld01vZGVsLnJycFdpdGhUYXguJHNwYW4uaHRtbChwcmljZS5ycnBfd2l0aF90YXguZm9ybWF0dGVkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcmljZS5ycnBfd2l0aG91dF90YXgpIHtcbiAgICAgICAgICAgIHZpZXdNb2RlbC5ycnBXaXRob3V0VGF4LiRkaXYuc2hvdygpO1xuICAgICAgICAgICAgdmlld01vZGVsLnJycFdpdGhvdXRUYXguJHNwYW4uaHRtbChwcmljZS5ycnBfd2l0aG91dF90YXguZm9ybWF0dGVkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcmljZS5zYXZlZCkge1xuICAgICAgICAgICAgdmlld01vZGVsLnByaWNlU2F2ZWQuJGRpdi5zaG93KCk7XG4gICAgICAgICAgICB2aWV3TW9kZWwucHJpY2VTYXZlZC4kc3Bhbi5odG1sKHByaWNlLnNhdmVkLmZvcm1hdHRlZCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJpY2Uubm9uX3NhbGVfcHJpY2Vfd2l0aF90YXgpIHtcbiAgICAgICAgICAgIHZpZXdNb2RlbC5wcmljZUxhYmVsLiRzcGFuLmhpZGUoKTtcbiAgICAgICAgICAgIHZpZXdNb2RlbC5ub25TYWxlV2l0aFRheC4kZGl2LnNob3coKTtcbiAgICAgICAgICAgIHZpZXdNb2RlbC5wcmljZU5vd0xhYmVsLiRzcGFuLnNob3coKTtcbiAgICAgICAgICAgIHZpZXdNb2RlbC5ub25TYWxlV2l0aFRheC4kc3Bhbi5odG1sKHByaWNlLm5vbl9zYWxlX3ByaWNlX3dpdGhfdGF4LmZvcm1hdHRlZCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJpY2Uubm9uX3NhbGVfcHJpY2Vfd2l0aG91dF90YXgpIHtcbiAgICAgICAgICAgIHZpZXdNb2RlbC5wcmljZUxhYmVsLiRzcGFuLmhpZGUoKTtcbiAgICAgICAgICAgIHZpZXdNb2RlbC5ub25TYWxlV2l0aG91dFRheC4kZGl2LnNob3coKTtcbiAgICAgICAgICAgIHZpZXdNb2RlbC5wcmljZU5vd0xhYmVsLiRzcGFuLnNob3coKTtcbiAgICAgICAgICAgIHZpZXdNb2RlbC5ub25TYWxlV2l0aG91dFRheC4kc3Bhbi5odG1sKHByaWNlLm5vbl9zYWxlX3ByaWNlX3dpdGhvdXRfdGF4LmZvcm1hdHRlZCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmaWx0ZXJFbXB0eUZpbGVzRnJvbUZvcm0oZm9ybURhdGEpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgW2tleSwgdmFsXSBvZiBmb3JtRGF0YSkge1xuICAgICAgICAgICAgICAgIGlmICh2YWwgaW5zdGFuY2VvZiBGaWxlICYmICF2YWwubmFtZSAmJiAhdmFsLnNpemUpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9ybURhdGEuZGVsZXRlKGtleSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZvcm1EYXRhO1xuICAgIH1cbn1cbiIsImltcG9ydCB1dGlscyBmcm9tICdAYmlnY29tbWVyY2Uvc3RlbmNpbC11dGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGNvbnRleHQpIHtcbiAgICBpZiAoJCgnLnByb2R1Y3RWaWV3LW5leHRQcm9kdWN0cycpLmxlbmd0aCkge1xuICAgICAgICBjb25zdCB0b2tlbiA9IGNvbnRleHQudG9rZW47XG4gICAgICAgIGNvbnN0IGN1ckNvZGUgPSAkKCcuYm9keScpLmRhdGEoJ2N1cnJlbmN5LWNvZGUnKTtcbiAgICAgICAgdmFyIHByb2R1Y3RJZCA9ICQoJy5wcm9kdWN0Vmlldy1uZXh0UHJvZHVjdHMnKS5kYXRhKCdwcm9kdWN0LWlkJyksXG4gICAgICAgICAgICBuZXh0SWQgPSBwcm9kdWN0SWQgKyAxLFxuICAgICAgICAgICAgcHJldklkID0gcHJvZHVjdElkIC0gMSxcbiAgICAgICAgICAgIG5leHRMaW5rLCBwcmV2TGluaywgbGlzdDtcblxuICAgICAgICBjb25zdCAkcHJvZFdyYXAgPSAkKCcucHJvZHVjdFZpZXctbmV4dFByb2R1Y3RzIC5uZXh0LXByZXYtbW9kYWwnKSxcbiAgICAgICAgXHQkcHJvZEljb25zID0gJCgnLnByb2R1Y3RWaWV3LW5leHRQcm9kdWN0cyAubmV4dC1wcmV2LWljb25zJyk7XG5cbiAgICAgICAgZnVuY3Rpb24gZ2V0UHJvZHVjdChhcnIpIHtcbiAgICAgICAgICByZXR1cm4gZmV0Y2goJy9ncmFwaHFsJywge1xuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzogJ0JlYXJlciAnICsgdG9rZW5cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgIHF1ZXJ5OiBgXG4gICAgICAgICAgICAgICAgcXVlcnkgTXlRdWVyeSB7XG4gICAgICAgICAgICAgICAgICAgIHNpdGUge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvZHVjdHMgKGVudGl0eUlkczogW2ArYXJyK2BdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGVkZ2VzIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9kdWN0OiBub2RlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLlByb2R1Y3RGaWVsZHNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW5jeSAoY3VycmVuY3lDb2RlOiBgK2N1ckNvZGUrYCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzeW1ib2xcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ltYm9sUGxhY2VtZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlY2ltYWxUb2tlblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aG91c2FuZHNUb2tlblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWNpbWFsUGxhY2VzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZyYWdtZW50IFByb2R1Y3RGaWVsZHMgb24gUHJvZHVjdCB7XG4gICAgICAgICAgICAgICAgICAgIGlkXG4gICAgICAgICAgICAgICAgICAgIGVudGl0eUlkXG4gICAgICAgICAgICAgICAgICAgIG5hbWVcbiAgICAgICAgICAgICAgICAgICAgcGF0aFxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0SW1hZ2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW1nNzBweDogdXJsKHdpZHRoOiA3MClcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsdFRleHRcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBwcmljZXMge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJpY2VSYW5nZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWluIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4uTW9uZXlGaWVsZHNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF4IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4uTW9uZXlGaWVsZHNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXRhaWxQcmljZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4uTW9uZXlGaWVsZHNcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJhc2VQcmljZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4uTW9uZXlGaWVsZHNcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHByaWNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi5Nb25leUZpZWxkc1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZyYWdtZW50IE1vbmV5RmllbGRzIG9uIE1vbmV5IHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgY3VycmVuY3lDb2RlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgYH0pLFxuICAgICAgICB9KS50aGVuKHJlcyA9PiByZXMuanNvbigpKVxuICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmRhdGEpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYocHJldklkICE9IHVuZGVmaW5lZCAmJiBuZXh0SWQgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBsaXN0ID0gW3ByZXZJZCwgbmV4dElkXTtcblxuICAgICAgICAgICAgZ2V0UHJvZHVjdChsaXN0KS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgIHJlbmRlclByb2R1Y3QoZGF0YS5zaXRlLnByb2R1Y3RzLmVkZ2VzLCBkYXRhLnNpdGUuY3VycmVuY3kuZGlzcGxheSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGZvcm1hdE1vbmV5KG4sIGMsIGQsIHQpIHtcbiAgICAgICAgICAgIHZhciBjID0gaXNOYU4oYyA9IE1hdGguYWJzKGMpKSA/IDIgOiBjLFxuICAgICAgICAgICAgICAgIGQgPSBkID09IHVuZGVmaW5lZCA/IFwiLlwiIDogZCxcbiAgICAgICAgICAgICAgICB0ID0gdCA9PSB1bmRlZmluZWQgPyBcIixcIiA6IHQsXG4gICAgICAgICAgICAgICAgcyA9IG4gPCAwID8gXCItXCIgOiBcIlwiLFxuICAgICAgICAgICAgICAgIGkgPSBTdHJpbmcocGFyc2VJbnQobiA9IE1hdGguYWJzKE51bWJlcihuKSB8fCAwKS50b0ZpeGVkKGMpKSksXG4gICAgICAgICAgICAgICAgaiA9IChqID0gaS5sZW5ndGgpID4gMyA/IGogJSAzIDogMDtcblxuICAgICAgICAgICAgcmV0dXJuIHMgKyAoaiA/IGkuc3Vic3RyKDAsIGopICsgdCA6IFwiXCIpICsgaS5zdWJzdHIoaikucmVwbGFjZSgvKFxcZHszfSkoPz1cXGQpL2csIFwiJDFcIiArIHQpICsgKGMgPyBkICsgTWF0aC5hYnMobiAtIGkpLnRvRml4ZWQoYykuc2xpY2UoMikgOiBcIlwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHJlbmRlclByb2R1Y3QocHJvZHVjdCwgY3VyRGlzcGxheSkge1xuICAgICAgICAgICAgaWYgKHByb2R1Y3QgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgJC5lYWNoKHByb2R1Y3QsIChpbmRleCwgZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBpdGVtID0gZWxlbWVudC5wcm9kdWN0LFxuICAgICAgICAgICAgICAgICAgICAgICAgc3ltYm9sID0gY3VyRGlzcGxheS5zeW1ib2wsXG4gICAgICAgICAgICAgICAgICAgICAgICBzeW1ib2xQbGFjZW1lbnQgPSBjdXJEaXNwbGF5LnN5bWJvbFBsYWNlbWVudC50b0xvd2VyQ2FzZSgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGVjaW1hbFRva2VuID0gY3VyRGlzcGxheS5kZWNpbWFsVG9rZW4sXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWNpbWFsUGxhY2VzID0gY3VyRGlzcGxheS5kZWNpbWFsUGxhY2VzLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhvdXNhbmRzVG9rZW4gPSBjdXJEaXNwbGF5LnRob3VzYW5kc1Rva2VuO1xuICAgICAgICAgICAgICAgICAgICBsZXQgdGl0bGUsIHByaWNlO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb250ZXh0LnRoZW1lU2V0dGluZ3MuaGFsb19jYXJkX3RpdGxlID09ICdlbGxpcHNpcycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlID0gJzxhIGhyZWY9XCInK2l0ZW0ucGF0aCsnXCIgY2xhc3M9XCJjYXJkLWVsbGlwc2lzXCIgc3R5bGU9XCItd2Via2l0LWJveC1vcmllbnQ6IHZlcnRpY2FsO1wiPicraXRlbS5uYW1lKyc8L2E+JzsgICAgXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZSA9ICc8YSBocmVmPVwiJytpdGVtLnBhdGgrJ1wiPicraXRlbS5uYW1lKyc8L2E+JztcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmICgkKCcuYm9keScpLmhhc0NsYXNzKCdpcy1sb2dpbicpIHx8IGNvbnRleHQudGhlbWVTZXR0aW5ncy5yZXN0cmljdF90b19sb2dpbiAhPT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0ucHJpY2VzLnByaWNlUmFuZ2UubWluLnZhbHVlIDwgaXRlbS5wcmljZXMucHJpY2VSYW5nZS5tYXgudmFsdWUgJiYgY29udGV4dC50aGVtZVNldHRpbmdzLnByaWNlX3Jhbmdlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHByaWNlTWluID0gKHN5bWJvbFBsYWNlbWVudCA9PSBcImxlZnRcIiA/IHN5bWJvbCA6IFwiXCIpICsgKGZvcm1hdE1vbmV5KGl0ZW0ucHJpY2VzLnByaWNlUmFuZ2UubWluLnZhbHVlLCBkZWNpbWFsUGxhY2VzLCBkZWNpbWFsVG9rZW4sIHRob3VzYW5kc1Rva2VuKSkgKyAoc3ltYm9sUGxhY2VtZW50ICE9IFwibGVmdFwiID8gc3ltYm9sIDogXCJcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJpY2VNYXggPSAoc3ltYm9sUGxhY2VtZW50ID09IFwibGVmdFwiID8gc3ltYm9sIDogXCJcIikgKyAoZm9ybWF0TW9uZXkoaXRlbS5wcmljZXMucHJpY2VSYW5nZS5tYXgudmFsdWUsIGRlY2ltYWxQbGFjZXMsIGRlY2ltYWxUb2tlbiwgdGhvdXNhbmRzVG9rZW4pKSArIChzeW1ib2xQbGFjZW1lbnQgIT0gXCJsZWZ0XCIgPyBzeW1ib2wgOiBcIlwiKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByaWNlID0gJzxkaXYgY2xhc3M9XCJwcmljZS1zZWN0aW9uIHByaWNlLXNlY3Rpb24tLXdpdGhvdXRUYXggbm9uLXNhbGUtcHJpY2UtLXdpdGhvdXRUYXggcHJpY2Utbm9uZVwiIHN0eWxlPVwiZGlzcGxheTogbm9uZTtcIj5cXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGRhdGEtcHJvZHVjdC1ub24tc2FsZS1wcmljZS13aXRob3V0LXRheD1cIlwiIGNsYXNzPVwicHJpY2UgcHJpY2UtLW5vbi1zYWxlXCI+PC9zcGFuPlxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByaWNlLXNlY3Rpb24gcHJpY2Utc2VjdGlvbi0td2l0aG91dFRheFwiPlxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gZGF0YS1wcm9kdWN0LXByaWNlLXdpdGhvdXQtdGF4PVwiXCIgY2xhc3M9XCJwcmljZSBwcmljZS0td2l0aG91dFRheFwiPicrcHJpY2VNaW4rJyAtICcrcHJpY2VNYXgrJzwvc3Bhbj5cXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+JztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHByaWNlRGVmID0gKHN5bWJvbFBsYWNlbWVudCA9PSBcImxlZnRcIiA/IHN5bWJvbCA6IFwiXCIpICsgKGZvcm1hdE1vbmV5KGl0ZW0ucHJpY2VzLnByaWNlLnZhbHVlLCBkZWNpbWFsUGxhY2VzLCBkZWNpbWFsVG9rZW4sIHRob3VzYW5kc1Rva2VuKSkgKyAoc3ltYm9sUGxhY2VtZW50ICE9IFwibGVmdFwiID8gc3ltYm9sIDogXCJcIik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5wcmljZXMucmV0YWlsUHJpY2UgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5wcmljZXMuYmFzZVByaWNlLnZhbHVlID4gaXRlbS5wcmljZXMucHJpY2UudmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHByaWNlQmFzID0gKHN5bWJvbFBsYWNlbWVudCA9PSBcImxlZnRcIiA/IHN5bWJvbCA6IFwiXCIpICsgKGZvcm1hdE1vbmV5KGl0ZW0ucHJpY2VzLmJhc2VQcmljZS52YWx1ZSwgZGVjaW1hbFBsYWNlcywgZGVjaW1hbFRva2VuLCB0aG91c2FuZHNUb2tlbikpICsgKHN5bWJvbFBsYWNlbWVudCAhPSBcImxlZnRcIiA/IHN5bWJvbCA6IFwiXCIpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmljZSA9ICc8ZGl2IGNsYXNzPVwicHJpY2Utc2VjdGlvbiBwcmljZS1zZWN0aW9uLS13aXRob3V0VGF4IG5vbi1zYWxlLXByaWNlLS13aXRob3V0VGF4XCI+XFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGRhdGEtcHJvZHVjdC1ub24tc2FsZS1wcmljZS13aXRob3V0LXRheD1cIlwiIGNsYXNzPVwicHJpY2UgcHJpY2UtLW5vbi1zYWxlXCI+JytwcmljZUJhcysnPC9zcGFuPlxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcmljZS1zZWN0aW9uIHByaWNlLXNlY3Rpb24tLXdpdGhvdXRUYXhcIj5cXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gZGF0YS1wcm9kdWN0LXByaWNlLXdpdGhvdXQtdGF4PVwiXCIgY2xhc3M9XCJwcmljZSBwcmljZS0td2l0aG91dFRheFwiPicrcHJpY2VEZWYrJzwvc3Bhbj5cXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj4nO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJpY2UgPSAnPGRpdiBjbGFzcz1cInByaWNlLXNlY3Rpb24gcHJpY2Utc2VjdGlvbi0td2l0aG91dFRheCBub24tc2FsZS1wcmljZS0td2l0aG91dFRheCBwcmljZS1ub25lXCIgc3R5bGU9XCJkaXNwbGF5OiBub25lO1wiPlxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBkYXRhLXByb2R1Y3Qtbm9uLXNhbGUtcHJpY2Utd2l0aG91dC10YXg9XCJcIiBjbGFzcz1cInByaWNlIHByaWNlLS1ub24tc2FsZVwiPjwvc3Bhbj5cXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJpY2Utc2VjdGlvbiBwcmljZS1zZWN0aW9uLS13aXRob3V0VGF4XCI+XFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGRhdGEtcHJvZHVjdC1wcmljZS13aXRob3V0LXRheD1cIlwiIGNsYXNzPVwicHJpY2UgcHJpY2UtLXdpdGhvdXRUYXhcIj4nK3ByaWNlRGVmKyc8L3NwYW4+XFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+JztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0ucHJpY2VzLnJldGFpbFByaWNlLnZhbHVlID4gaXRlbS5wcmljZXMucHJpY2UudmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHByaWNlUmV0ID0gKHN5bWJvbFBsYWNlbWVudCA9PSBcImxlZnRcIiA/IHN5bWJvbCA6IFwiXCIpICsgKGZvcm1hdE1vbmV5KGl0ZW0ucHJpY2VzLnJldGFpbFByaWNlLnZhbHVlLCBkZWNpbWFsUGxhY2VzLCBkZWNpbWFsVG9rZW4sIHRob3VzYW5kc1Rva2VuKSkgKyAoc3ltYm9sUGxhY2VtZW50ICE9IFwibGVmdFwiID8gc3ltYm9sIDogXCJcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJpY2UgPSAnPGRpdiBjbGFzcz1cInByaWNlLXNlY3Rpb24gcHJpY2Utc2VjdGlvbi0td2l0aG91dFRheCBub24tc2FsZS1wcmljZS0td2l0aG91dFRheFwiPlxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBkYXRhLXByb2R1Y3Qtbm9uLXNhbGUtcHJpY2Utd2l0aG91dC10YXg9XCJcIiBjbGFzcz1cInByaWNlIHByaWNlLS1ub24tc2FsZVwiPicrcHJpY2VSZXQrJzwvc3Bhbj5cXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJpY2Utc2VjdGlvbiBwcmljZS1zZWN0aW9uLS13aXRob3V0VGF4XCI+XFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGRhdGEtcHJvZHVjdC1wcmljZS13aXRob3V0LXRheD1cIlwiIGNsYXNzPVwicHJpY2UgcHJpY2UtLXdpdGhvdXRUYXhcIj4nK3ByaWNlRGVmKyc8L3NwYW4+XFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+JztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByaWNlID0gJzxkaXYgY2xhc3M9XCJwcmljZS1zZWN0aW9uIHByaWNlLXNlY3Rpb24tLXdpdGhvdXRUYXggbm9uLXNhbGUtcHJpY2UtLXdpdGhvdXRUYXggcHJpY2Utbm9uZVwiIHN0eWxlPVwiZGlzcGxheTogbm9uZTtcIj5cXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gZGF0YS1wcm9kdWN0LW5vbi1zYWxlLXByaWNlLXdpdGhvdXQtdGF4PVwiXCIgY2xhc3M9XCJwcmljZSBwcmljZS0tbm9uLXNhbGVcIj48L3NwYW4+XFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByaWNlLXNlY3Rpb24gcHJpY2Utc2VjdGlvbi0td2l0aG91dFRheFwiPlxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBkYXRhLXByb2R1Y3QtcHJpY2Utd2l0aG91dC10YXg9XCJcIiBjbGFzcz1cInByaWNlIHByaWNlLS13aXRob3V0VGF4XCI+JytwcmljZURlZisnPC9zcGFuPlxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2Pic7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcmljZSA9ICc8cCB0cmFuc2xhdGU+TG9nIGluIGZvciBwcmljaW5nPC9wPic7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBodG1sX2NhcmQgPSAnPGRpdiBjbGFzcz1cImNhcmQgY2FyZC1jdXN0b21cIiBkYXRhLXByb2R1Y3QtaWQ9XCInK2l0ZW0uZW50aXR5SWQrJ1wiPlxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtaW1hZ2VcIj5cXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBjbGFzcz1cImNhcmQtbGlua1wiIGhyZWY9XCInK2l0ZW0ucGF0aCsnXCI+XFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiJytpdGVtLmRlZmF1bHRJbWFnZS5pbWc3MHB4KydcIiBhbHQ9XCInK2l0ZW0ubmFtZSsnXCIgdGl0bGU9XCInK2l0ZW0ubmFtZSsnXCIgLz5cXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2E+XFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWNvbnRlbnRcIj5cXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3M9XCJjYXJkLXRpdGxlXCI+Jyt0aXRsZSsnPC9oND5cXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1wcmljZVwiIGRhdGEtdGVzdC1pbmZvLXR5cGU9XCJwcmljZVwiPicrcHJpY2UrJzwvZGl2PlxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2Pic7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0uZW50aXR5SWQgPT0gcHJldklkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5wYXRoICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkcHJvZEljb25zLmZpbmQoJy5wcmV2LWljb24nKS5hdHRyKCdocmVmJywgaXRlbS5wYXRoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkcHJvZEljb25zLmZpbmQoJy5wcmV2LWljb24nKS5yZW1vdmVDbGFzcygnZGlzYWJsZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRwcm9kV3JhcC5maW5kKCcjcHJldi1wcm9kdWN0LW1vZGFsJykuYXBwZW5kKGh0bWxfY2FyZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRwcm9kSWNvbnMuZmluZCgnLnByZXYtaWNvbicpLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRwcm9kV3JhcC5maW5kKCcjcHJldi1wcm9kdWN0LW1vZGFsJykucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0uZW50aXR5SWQgPT0gbmV4dElkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihpdGVtLnBhdGggIT09IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHByb2RJY29ucy5maW5kKCcubmV4dC1pY29uJykuYXR0cignaHJlZicsIGl0ZW0ucGF0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHByb2RJY29ucy5maW5kKCcubmV4dC1pY29uJykucmVtb3ZlQ2xhc3MoJ2Rpc2FibGUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkcHJvZFdyYXAuZmluZCgnI25leHQtcHJvZHVjdC1tb2RhbCcpLmFwcGVuZChodG1sX2NhcmQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRwcm9kSWNvbnMuZmluZCgnLm5leHQtaWNvbicpLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRwcm9kV3JhcC5maW5kKCcjbmV4dC1wcm9kdWN0LW1vZGFsJykucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgICRwcm9kSWNvbnMub24oJ21vdXNlb3ZlcicsIGZ1bmN0aW9uKCl7XG4gICAgICAgIFx0JHByb2RXcmFwLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdtb3VzZWxlYXZlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICRwcm9kV3JhcC5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJy5uZXh0LWljb24nLCAkcHJvZEljb25zKS5vbignbW91c2VvdmVyJywgZnVuY3Rpb24oKXtcbiAgICAgICAgXHQkKCcjcHJldi1wcm9kdWN0LW1vZGFsJykucmVtb3ZlQ2xhc3MoJ2lzLXNob3cnKTtcbiAgICAgICAgXHQkKCcjbmV4dC1wcm9kdWN0LW1vZGFsJykuYWRkQ2xhc3MoJ2lzLXNob3cnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnLnByZXYtaWNvbicsICRwcm9kSWNvbnMpLm9uKCdtb3VzZW92ZXInLCBmdW5jdGlvbigpe1xuICAgICAgICBcdCQoJyNuZXh0LXByb2R1Y3QtbW9kYWwnKS5yZW1vdmVDbGFzcygnaXMtc2hvdycpO1xuICAgICAgICBcdCQoJyNwcmV2LXByb2R1Y3QtbW9kYWwnKS5hZGRDbGFzcygnaXMtc2hvdycpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkcHJvZFdyYXAub24oJ21vdXNlb3ZlcicsIGZ1bmN0aW9uKCl7XG4gICAgICAgIFx0JHByb2RXcmFwLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdtb3VzZWxlYXZlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgXHQkcHJvZFdyYXAucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgdXRpbHMgZnJvbSAnQGJpZ2NvbW1lcmNlL3N0ZW5jaWwtdXRpbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihjb250ZXh0LCBlbCkge1xuICAgIHZhciAkcG9wdXAgPSAkKCcubG9va2Jvb2stcG9wdXAnKTtcbiAgICB2YXIgJGVsID0gZWw7XG5cbiAgICBjb25zdCAkb3B0aW9ucyA9IHtcbiAgICAgICAgdGVtcGxhdGU6ICdoYWxvdGhlbWVzL3Byb2R1Y3RzL2hhbG8tbG9va2Jvb2stdG1wJ1xuICAgIH07XG5cbiAgICAkZWwuZmluZCgnLml0ZW0gLml0ZW0tcG9pbnQnKS5vbignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgICRwb3B1cC5yZW1vdmVDbGFzcygnaXMtb3BlbicpLmVtcHR5KCk7XG5cbiAgICAgICAgdmFyICRwcm9kSWQgPSAkKGV2ZW50LnRhcmdldCkuZGF0YSgncHJvZHVjdC1pZCcpLFxuICAgICAgICAgICAgcG9zaXRpb24gPSAkKGV2ZW50LnRhcmdldCkub2Zmc2V0KCksXG4gICAgICAgICAgICBjb250YWluZXIgPSAkZWwub2Zmc2V0KCk7XG5cbiAgICAgICAgaWYoJHByb2RJZCAhPSB1bmRlZmluZWQpe1xuICAgICAgICAgICAgdXRpbHMuYXBpLnByb2R1Y3QuZ2V0QnlJZCgkcHJvZElkLCAkb3B0aW9ucywgKGVyciwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICBpZihlcnIpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgJHBvcHVwLmh0bWwocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA+PSA1NTEpIHtcbiAgICAgICAgICAgICAgICAkcG9wdXAuY3NzKHsndG9wJzogcG9zaXRpb24udG9wIC0gY29udGFpbmVyLnRvcCAtIDEwMCwgJ2xlZnQnOiBwb3NpdGlvbi5sZWZ0IC0gY29udGFpbmVyLmxlZnQgKyAzMH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkcG9wdXAuY3NzKHsndG9wJzogcG9zaXRpb24udG9wIC0gY29udGFpbmVyLnRvcCArIDE1LCAnbGVmdCc6IDE1fSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICRwb3B1cC5hZGRDbGFzcyhcImlzLW9wZW5cIik7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuY2xvc2UtcHJvZHVjdCcsIGV2ZW50ID0+IHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBpZiAoJHBvcHVwLmhhc0NsYXNzKFwiaXMtb3BlblwiKSkge1xuICAgICAgICAgICAgJHBvcHVwLnJlbW92ZUNsYXNzKFwiaXMtb3BlblwiKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICBpZigkcG9wdXAuaGFzQ2xhc3MoXCJpcy1vcGVuXCIpKSB7XG4gICAgICAgICAgICBpZigoJChldmVudC50YXJnZXQpLmNsb3Nlc3QoJHBvcHVwKS5sZW5ndGggPT09IDApICYmICgkKGV2ZW50LnRhcmdldCkuY2xvc2VzdCgnLml0ZW0gLml0ZW0tcG9pbnQnKS5sZW5ndGggPT09IDApKSB7XG4gICAgICAgICAgICAgICAgJHBvcHVwLnJlbW92ZUNsYXNzKFwiaXMtb3BlblwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xufVxuIiwiaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCAnZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uL2ZvdW5kYXRpb24nO1xuaW1wb3J0ICdmb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24vZm91bmRhdGlvbi5kcm9wZG93bic7XG5pbXBvcnQgdXRpbHMgZnJvbSAnQGJpZ2NvbW1lcmNlL3N0ZW5jaWwtdXRpbHMnO1xuaW1wb3J0IHJlcXVlc3QgZnJvbSAnQGJpZ2NvbW1lcmNlL3N0ZW5jaWwtdXRpbHMvc3JjL2xpYi9yZXF1ZXN0LmpzJztcbmltcG9ydCBtb2RhbEZhY3RvcnksIHsgc2hvd0FsZXJ0TW9kYWwsIE1vZGFsRXZlbnRzIH0gZnJvbSAnLi4vZ2xvYmFsL21vZGFsJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oJHNjb3BlLCBjb250ZXh0KSB7XG4gICAgdmFyIG9mZnNldFNjcm9sbCA9ICRzY29wZS5maW5kKCdbZGF0YS1jYXJ0LWl0ZW0tYWRkXScpLFxuICAgICAgICBzY3JvbGwgPSBvZmZzZXRTY3JvbGwub2Zmc2V0KCkudG9wICsgb2Zmc2V0U2Nyb2xsLm91dGVySGVpZ2h0KHRydWUpO1xuXG4gICAgY29uc3Qgc2hvd1ByaWNlID0gY29udGV4dC50aGVtZVNldHRpbmdzLnJlc3RyaWN0X3RvX2xvZ2luO1xuXG4gICAgY29uc3QgcHJldmlld01vZGFsID0gbW9kYWxGYWN0b3J5KCcjcHJldmlld01vZGFsJylbMF0sXG4gICAgICAgICRzdGlja3kgPSAkKCcuc3RpY2t5LWFkZC10by1jYXJ0JyksXG4gICAgICAgICRzdGlja3lDbG9zZSA9ICRzdGlja3kuZmluZCgnLnN0aWNreS1wcm9kdWN0LWNsb3NlJyksXG4gICAgICAgICRzdGlja3lFeHBhbmQgPSAkc3RpY2t5LmZpbmQoJy5zdGlja3ktcHJvZHVjdC1leHBhbmQnKSxcbiAgICAgICAgJHByb2RJZCA9ICRzdGlja3kuZmluZCgnW2RhdGEtY2FydC1pdGVtLWFkZC0yXSBbbmFtZT1cInByb2R1Y3RfaWRcIl0nKS52YWwoKSxcbiAgICAgICAgJHByb2RQcmljZSA9ICRzdGlja3kuZmluZCgnLnN0aWNreS1wcmljZScpLFxuICAgICAgICAkcHJvZE9wdGlvbnMgPSAkc3RpY2t5LmZpbmQoJy5zdGlja3ktb3B0aW9ucycpLFxuICAgICAgICAkcHJvZE9wdGlvbkxhYmVsID0gJHByb2RPcHRpb25zLmZpbmQoJy5zdGlja3ktb3B0aW9ucy1sYWJlbCcpLFxuICAgICAgICAkcHJvZE9wdGlvbkRyb3Bkb3duID0gJHByb2RPcHRpb25zLmZpbmQoJy5zdGlja3ktb3B0aW9ucy1kcm9wZG93bicpLFxuICAgICAgICAkaW1hZ2VXcmFwcGVyID0gJHN0aWNreS5maW5kKCcuc3RpY2t5LWltYWdlJyksXG4gICAgICAgICRwcm9kQnRuID0gJHN0aWNreS5maW5kKCcuc3RpY2t5LWFjdGlvbnMgLmJ1dHRvbicpLFxuICAgICAgICAkcHJvZFdMQnRuID0gJHN0aWNreS5maW5kKCcuc3RpY2t5LXdpc2hsaXN0JyksXG4gICAgICAgIHdhaXRNZXNzYWdlID0gJHByb2RCdG4uZGF0YSgnd2FpdE1lc3NhZ2UnKSxcbiAgICAgICAgb3JpZ2luYWxCdG5WYWwgPSAkcHJvZEJ0bi50ZXh0KCksXG4gICAgICAgICRib2R5ID0gJCgnYm9keScpO1xuXG4gICAgZnVuY3Rpb24gbG9hZFN0aWNreSgpIHtcbiAgICAgICAgaWYoKGNvbnRleHQudGhlbWVTZXR0aW5ncy5oYWxvX3N0aWNreV9hZGRfdG9fY2FydCA9PSB0cnVlKSAmJiAoJHN0aWNreS5sZW5ndGggPiAwKSl7XG4gICAgICAgICAgICBsb2FkT3B0aW9ucygpO1xuXG4gICAgICAgICAgICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGlmICgkKHdpbmRvdykuc2Nyb2xsVG9wKCkgPiBzY3JvbGwgKyAxMDApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEkc3RpY2t5Lmhhc0NsYXNzKCdzaG93LXN0aWNreScpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc3RpY2t5LmFkZENsYXNzKCdzaG93LXN0aWNreScpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoJGJvZHkuaGFzQ2xhc3MoJ3BhZ2UtdHlwZS1wcm9kdWN0JykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkYm9keS5hZGRDbGFzcygnb3BlblN0aWNreUFkZFRvQ2FydCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgJHN0aWNreS5yZW1vdmVDbGFzcygnc2hvdy1zdGlja3kgaGlkZGVuLXN0aWNreSBzaG93LWZ1bGwtc3RpY2t5Jyk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCRib2R5Lmhhc0NsYXNzKCdwYWdlLXR5cGUtcHJvZHVjdCcpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkYm9keS5yZW1vdmVDbGFzcygnb3BlblN0aWNreUFkZFRvQ2FydCcpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICRwcm9kT3B0aW9uTGFiZWwub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgICAgICRwcm9kT3B0aW9uRHJvcGRvd24udG9nZ2xlQ2xhc3MoJ2lzLW9wZW4nKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAkcHJvZE9wdGlvbkRyb3Bkb3duLm9uKCdjbGljaycsICcub3B0aW9uLWl0ZW0nLCBldmVudCA9PiB7XG4gICAgICAgICAgICAgICAgdmFyICR0YXJnZXQgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xuXG4gICAgICAgICAgICAgICAgaWYgKCEkdGFyZ2V0Lmhhc0NsYXNzKCdpcy1zZWxlY3QnKSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgb3B0aW9uTGFiZWwgPSAkdGFyZ2V0LmZpbmQoJy5vcHRpb24taXRlbVdyYXBwZXInKS5odG1sKCksXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25BdHRyID0gJHRhcmdldC5kYXRhKCd2YXJpYW50LWF0dHInKTtcblxuICAgICAgICAgICAgICAgICAgICB1dGlscy5hcGkucHJvZHVjdEF0dHJpYnV0ZXMub3B0aW9uQ2hhbmdlKCRwcm9kSWQsIG9wdGlvbkF0dHIsIChlcnIsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm9kdWN0QXR0cmlidXRlc0RhdGEgPSByZXNwb25zZS5kYXRhIHx8IHt9O1xuICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlVmlldyhwcm9kdWN0QXR0cmlidXRlc0RhdGEpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAkcHJvZE9wdGlvbkRyb3Bkb3duLmZpbmQoJy5vcHRpb24taXRlbScpLnJlbW92ZUNsYXNzKCdpcy1zZWxlY3QnKTtcbiAgICAgICAgICAgICAgICAgICAgJHRhcmdldC5hZGRDbGFzcygnaXMtc2VsZWN0Jyk7XG4gICAgICAgICAgICAgICAgICAgICRwcm9kT3B0aW9uTGFiZWwuZmluZCgnLnRleHQnKS5odG1sKG9wdGlvbkxhYmVsKTtcbiAgICAgICAgICAgICAgICAgICAgJHByb2RPcHRpb25Ecm9wZG93bi5yZW1vdmVDbGFzcygnaXMtb3BlbicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAkc3RpY2t5Q2xvc2Uub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICAgICBpZigkc3RpY2t5Lmhhc0NsYXNzKCdzaG93LWZ1bGwtc3RpY2t5Jykpe1xuICAgICAgICAgICAgICAgICAgICAkc3RpY2t5LnJlbW92ZUNsYXNzKCdzaG93LWZ1bGwtc3RpY2t5Jyk7XG4gICAgICAgICAgICAgICAgfSBlbHNle1xuICAgICAgICAgICAgICAgICAgICAkc3RpY2t5LmFkZENsYXNzKCdoaWRkZW4tc3RpY2t5Jyk7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBpZiAoJGJvZHkuaGFzQ2xhc3MoJ3BhZ2UtdHlwZS1wcm9kdWN0JykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRib2R5LnJlbW92ZUNsYXNzKCdvcGVuU3RpY2t5QWRkVG9DYXJ0Jyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgJHN0aWNreUV4cGFuZC5vbignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgICAgICRzdGlja3kuYWRkQ2xhc3MoJ3Nob3ctZnVsbC1zdGlja3knKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAkcHJvZEJ0bi5vbignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgICAgIHZhciBhdHRyID0gJHByb2RCdG4uYXR0cignZGlzYWJsZWQyJyk7XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGF0dHIgIT09IHR5cGVvZiB1bmRlZmluZWQgJiYgYXR0ciAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZvcm0gPSAkKCdmb3JtW2RhdGEtY2FydC1pdGVtLWFkZF0nLCAkc2NvcGUpLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0ID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybUhlaWdodCA9IGZvcm0ub2Zmc2V0KCkudG9wICsgZm9ybS5oZWlnaHQoKS8yO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmKGhlaWdodCA+IGZvcm1IZWlnaHQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnYm9keSxodG1sJykuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiBmb3JtLm9mZnNldCgpLnRvcCAtIDUwXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCA3MDApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNle1xuICAgICAgICAgICAgICAgICAgICBhZGRUb0NhcnQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgJHByb2RXTEJ0bi5vbignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgICAgIHZhciAkdGhpc193bCA9ICQoZXZlbnQuY3VycmVudFRhcmdldCksXG4gICAgICAgICAgICAgICAgICAgIHVybF9hd2wgPSAkdGhpc193bC5hdHRyKCdocmVmJyk7XG5cbiAgICAgICAgICAgICAgICAkLnBvc3QodXJsX2F3bCkuZG9uZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gdXJsX2F3bDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCRwcm9kT3B0aW9uRHJvcGRvd24uaGFzQ2xhc3MoJ2lzLW9wZW4nKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoKCQoZXZlbnQudGFyZ2V0KS5jbG9zZXN0KCcuc3RpY2t5LW9wdGlvbnMtZHJvcGRvd24nKS5sZW5ndGggPT09IDApICYmICgkKGV2ZW50LnRhcmdldCkuY2xvc2VzdCgnLnN0aWNreS1vcHRpb25zLWxhYmVsJykubGVuZ3RoID09PSAwKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJHByb2RPcHRpb25Ecm9wZG93bi5yZW1vdmVDbGFzcygnaXMtb3BlbicpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgbG9hZFN0aWNreSgpO1xuXG4gICAgZnVuY3Rpb24gbG9hZE9wdGlvbnMoKSB7XG4gICAgICAgIGlmICgkcHJvZE9wdGlvbnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY29uc3Qgcm93cyA9IFtdLFxuICAgICAgICAgICAgICAgIHJvd0xpbWl0cyA9IFtdLFxuICAgICAgICAgICAgICAgIHJvd09iamVjdHMgPSBbXSxcbiAgICAgICAgICAgICAgICBuZXdPcHRpb25zID0gW107XG5cbiAgICAgICAgICAgICQoJ1tkYXRhLXByb2R1Y3QtYXR0cmlidXRlXScsICRzY29wZSkuZWFjaCgoaW5kZXgsIGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgaWQgPSAkKGVsZW1lbnQpLmRhdGEoJ3Byb2R1Y3Qtb3B0aW9uLWlkJyksXG4gICAgICAgICAgICAgICAgICAgIHR5cGUgPSAkKGVsZW1lbnQpLmRhdGEoJ3Byb2R1Y3QtYXR0cmlidXRlJyk7XG5cbiAgICAgICAgICAgICAgICBpZih0eXBlID09PSAnaW5wdXQtY2hlY2tib3gnIHx8IHR5cGUgPT09ICdwcm9kdWN0LWxpc3QnIHx8IHR5cGUgPT09ICdkYXRlJyB8fCB0eXBlID09PSAnaW5wdXQtZmlsZScgfHwgdHlwZSA9PT0gJ2lucHV0LXRleHQnIHx8IHR5cGUgPT09ICdpbnB1dC1udW1iZXInIHx8IHR5cGUgPT09ICd0ZXh0YXJlYScpe31cbiAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICByb3dzLnB1c2goMCk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09ICdzZXQtcmVjdGFuZ2xlJyB8fCB0eXBlID09PSAnc2V0LXJhZGlvJyB8fCB0eXBlID09PSAnc3dhdGNoJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcm93TGltaXRzLnB1c2goJChlbGVtZW50KS5maW5kKCcuZm9ybS1yYWRpbycpLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gJ3NldC1zZWxlY3QnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByb3dMaW1pdHMucHVzaCgkKGVsZW1lbnQpLmZpbmQoJy5mb3JtLXNlbGVjdCBvcHRpb246bm90KDpmaXJzdC1jaGlsZCknKS5sZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgcm93T2JqZWN0ID0gW107XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09ICdzZXQtcmVjdGFuZ2xlJyB8fCB0eXBlID09PSAnc2V0LXJhZGlvJyB8fCB0eXBlID09PSAnc3dhdGNoJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgJChlbGVtZW50KS5maW5kKCcuZm9ybS1yYWRpbycpLmVhY2goKGluZGV4MiwgZWxlbWVudDIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3dPYmplY3QucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZTogaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZVZhbHVlOiAkKGVsZW1lbnQyKS5hdHRyKCd2YWx1ZScpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVMYWJlbDogJChlbGVtZW50MikuYXR0cignbmFtZScpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVOYW1lOiAkKGVsZW1lbnQyKS5hdHRyKCdkYXRhLXRpdGxlJyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZUluZGV4OiAkKGVsZW1lbnQyKS5hdHRyKCdkYXRhLWluZGV4JyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGludmlzaWJsZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluc3RvY2s6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSAnc2V0LXNlbGVjdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzZXRMYWJlbCA9ICQoZWxlbWVudCkuZmluZCgnLmZvcm0tc2VsZWN0JykuYXR0cignbmFtZScpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAkKGVsZW1lbnQpLmZpbmQoJy5mb3JtLXNlbGVjdCBvcHRpb246bm90KDpmaXJzdC1jaGlsZCknKS5lYWNoKChpbmRleDIsIGVsZW1lbnQyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93T2JqZWN0LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGU6IGlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVWYWx1ZTogJChlbGVtZW50MikuYXR0cigndmFsdWUnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlTGFiZWw6IHNldExhYmVsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVOYW1lOiAkKGVsZW1lbnQyKS5hdHRyKCdkYXRhLXRpdGxlJyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZUluZGV4OiAkKGVsZW1lbnQyKS5hdHRyKCdkYXRhLWluZGV4JyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGludmlzaWJsZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluc3RvY2s6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJvd09iamVjdHMucHVzaChyb3dPYmplY3QpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBsZXQgaXNOZXdPcHRpb25zUmVhZHkgPSBmYWxzZTtcblxuICAgICAgICAgICAgZnVuY3Rpb24gZGVjcmVtZW50Um93cyhkTGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY3VycmVuSW5kZXggPSBkTGVuZ3RoIC0gMTtcbiAgICAgICAgICAgICAgICByb3dzW2N1cnJlbkluZGV4XSArPSAxO1xuXG4gICAgICAgICAgICAgICAgaWYgKChyb3dzW2N1cnJlbkluZGV4XSA8IHJvd0xpbWl0c1tjdXJyZW5JbmRleF0pID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVuSW5kZXggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzTmV3T3B0aW9uc1JlYWR5ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvd3NbY3VycmVuSW5kZXhdID0gMDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgZGVjcmVtZW50Um93cyhjdXJyZW5JbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBjdXJyZW50T3B0aW9uSW5kZXggPSAwO1xuXG4gICAgICAgICAgICB3aGlsZSAoaXNOZXdPcHRpb25zUmVhZHkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgbmV3T3B0aW9uc1tjdXJyZW50T3B0aW9uSW5kZXhdID0ge1xuICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiBbXSxcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6ICcnLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICcnLFxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICByb3dzLmZvckVhY2goKHIsIHJJbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBuZXdPcHRpb25zW2N1cnJlbnRPcHRpb25JbmRleF0uYXR0cmlidXRlcy5wdXNoKHJvd09iamVjdHNbckluZGV4XVtyXSk7XG4gICAgICAgICAgICAgICAgICAgIG5ld09wdGlvbnNbY3VycmVudE9wdGlvbkluZGV4XS5sYWJlbCArPSBgJHtyb3dPYmplY3RzW3JJbmRleF1bcl0uYXR0cmlidXRlTGFiZWx9IGA7XG4gICAgICAgICAgICAgICAgICAgIG5ld09wdGlvbnNbY3VycmVudE9wdGlvbkluZGV4XS5uYW1lICs9IGA8c3Bhbj4ke3Jvd09iamVjdHNbckluZGV4XVtyXS5hdHRyaWJ1dGVOYW1lfTwvc3Bhbj5gO1xuICAgICAgICAgICAgICAgICAgICBuZXdPcHRpb25zW2N1cnJlbnRPcHRpb25JbmRleF0ucG9zaXRpb24gKz0gYCR7cm93T2JqZWN0c1tySW5kZXhdW3JdLmF0dHJpYnV0ZUluZGV4fWA7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBkZWNyZW1lbnRSb3dzKHJvd3MubGVuZ3RoKTtcblxuICAgICAgICAgICAgICAgIGN1cnJlbnRPcHRpb25JbmRleCArPSAxO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgY3VycmVudE5ld09wdGlvbkluZGV4ID0gMDtcblxuICAgICAgICAgICAgbmV3T3B0aW9ucy5mb3JFYWNoKChuZXdPcHRpb24sIG5ld09wdGlvbkluZGV4LCBuZXdFbCkgPT4ge1xuICAgICAgICAgICAgICAgIHZhciBhdHRyaWJ1dGVTdHJpbmcgPSAnJztcblxuICAgICAgICAgICAgICAgIG5ld09wdGlvbi5hdHRyaWJ1dGVzLmZvckVhY2goYXR0cmlidXRlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlU3RyaW5nID0gYXR0cmlidXRlU3RyaW5nICsgYCZhdHRyaWJ1dGVbJHthdHRyaWJ1dGUuYXR0cmlidXRlfV09YCArIGF0dHJpYnV0ZS5hdHRyaWJ1dGVWYWx1ZTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSkuYXR0cih7XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzOiAnb3B0aW9uLWl0ZW0nLFxuICAgICAgICAgICAgICAgICAgICAnZGF0YS12YXJpYW50LWluZGV4JzogbmV3T3B0aW9uLnBvc2l0aW9uLFxuICAgICAgICAgICAgICAgICAgICAnZGF0YS12YXJpYW50LWF0dHInOiBhdHRyaWJ1dGVTdHJpbmdcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5hcHBlbmQoJzxkaXYgY2xhc3M9XCJvcHRpb24taXRlbVdyYXBwZXJcIj4nK25ld09wdGlvbi5uYW1lKyc8L2Rpdj4nKVxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbygkcHJvZE9wdGlvbkRyb3Bkb3duKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkVG9DYXJ0KCkge1xuICAgICAgICBjb25zdCAkZm9ybSA9ICQoJ1tkYXRhLWNhcnQtaXRlbS1hZGQtMl0nKTtcbiAgICAgICAgdmFyIHNrdSA9ICRmb3JtLmZpbmQoJy5zdGlja3ktYWN0aW9ucycpLmF0dHIoJ2RhdGEtcHJvZHVjdC1za3UtYWRkJyk7XG4gICAgICAgIHZhciBhdHQgPSAkZm9ybS5maW5kKCcub3B0aW9uLWl0ZW0uaXMtc2VsZWN0JykuZGF0YSgndmFyaWFudC1hdHRyJyk7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgICAgICB0ZW1wbGF0ZTogJ2NhcnQvcHJldmlldydcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgdXJsO1xuXG4gICAgICAgIGlmIChza3UgIT0gdW5kZWZpbmVkICYmIHNrdSAhPSBudWxsICYmIHNrdSAhPSAnJykge1xuICAgICAgICAgICAgdXJsID0gYC9jYXJ0LnBocD9hY3Rpb249YWRkJnNrdT1gICsgc2t1ICsgYCZxdHk9MWA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB1cmwgPSBgL2NhcnQucGhwP2FjdGlvbj1hZGQmcHJvZHVjdF9pZD1gICsgJHByb2RJZCArIGF0dDtcbiAgICAgICAgfVxuXG4gICAgICAgICRwcm9kQnRuXG4gICAgICAgICAgICAudGV4dCh3YWl0TWVzc2FnZSlcbiAgICAgICAgICAgIC5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xuXG4gICAgICAgIHJlcXVlc3QoZW5jb2RlVVJJKHVybCksIHtcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgcmVxdWVzdE9wdGlvbnM6IG9wdGlvbnMsXG4gICAgICAgIH0sIChlcnIsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9IGVycjtcblxuICAgICAgICAgICAgaWYgKGVycm9yTWVzc2FnZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRtcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpO1xuICAgICAgICAgICAgICAgIHRtcC5pbm5lckhUTUwgPSBlcnJvck1lc3NhZ2U7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gc2hvd0FsZXJ0TW9kYWwodG1wLnRleHRDb250ZW50IHx8IHRtcC5pbm5lclRleHQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAkcHJvZEJ0blxuICAgICAgICAgICAgICAgIC50ZXh0KG9yaWdpbmFsQnRuVmFsKVxuICAgICAgICAgICAgICAgIC5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcblxuICAgICAgICAgICAgaWYgKHByZXZpZXdNb2RhbCkge1xuICAgICAgICAgICAgICAgIGlmIChjb250ZXh0LnRoZW1lU2V0dGluZ3MuaGFsb19hZGRfdG9fY2FydF9wb3B1cCA9PT0gJ25vcm1hbCcpe1xuICAgICAgICAgICAgICAgICAgICBwcmV2aWV3TW9kYWwuJG1vZGFsLnJlbW92ZUNsYXNzKCkuYWRkQ2xhc3MoJ21vZGFsIG1vZGFsLS1wcmV2aWV3Jyk7XG4gICAgICAgICAgICAgICAgICAgIHByZXZpZXdNb2RhbC5vcGVuKHsgc2l6ZTogJ2xhcmdlJyB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHQudGhlbWVTZXR0aW5ncy5oYWxvX2FkZF90b19jYXJ0X3BvcHVwID09PSAnbWluaScpe1xuICAgICAgICAgICAgICAgICAgICBwcmV2aWV3TW9kYWwuJG1vZGFsLnJlbW92ZUNsYXNzKCkuYWRkQ2xhc3MoJ21vZGFsIG1vZGFsLS1wcmV2aWV3IG1vZGFsLS1wcmV2aWV3TWluaScpO1xuICAgICAgICAgICAgICAgICAgICBwcmV2aWV3TW9kYWwub3Blbih7IHNpemU6ICdzbWFsbCcgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYoJChcIi5tb2RhbC1iYWNrZ3JvdW5kOnZpc2libGVcIikubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcubW9kYWwtYmFja2dyb3VuZDp2aXNpYmxlJykuaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdXBkYXRlQ2FydENvbnRlbnQocHJldmlld01vZGFsLCByZXNwb25zZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlZGlyZWN0VG8ocmVzcG9uc2UuZGF0YS5jYXJ0X2l0ZW0uY2FydF91cmwgfHwgY29udGV4dC51cmxzLmNhcnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZWRpcmVjdFRvKHVybCkge1xuICAgICAgICBpZiAodGhpcy5pc1J1bm5pbmdJbklmcmFtZSgpICYmICF3aW5kb3cuaWZyYW1lU2RrKSB7XG4gICAgICAgICAgICB3aW5kb3cudG9wLmxvY2F0aW9uID0gdXJsO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uID0gdXJsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlQ2FydENvbnRlbnQobW9kYWwsIHJlc3BvbnNlKSB7XG4gICAgICAgIGNvbnN0IHF1YW50aXR5ID0gcGFyc2VJbnQoJGJvZHkuZmluZCgnLmNhcnREZXNrdG9wIC5jYXJ0LXF1YW50aXR5JykudGV4dCgpKSArIDE7XG5cbiAgICAgICAgJGJvZHkudHJpZ2dlcignY2FydC1xdWFudGl0eS11cGRhdGUnLCBxdWFudGl0eSk7XG5cbiAgICAgICAgbW9kYWwudXBkYXRlQ29udGVudChyZXNwb25zZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2hvd1ZhcmlhbnRJbWFnZShpbWFnZSkge1xuICAgICAgICBpZiAoXy5pc1BsYWluT2JqZWN0KGltYWdlKSkge1xuICAgICAgICAgICAgY29uc3QgbWFpbkltYWdlVXJsID0gdXRpbHMudG9vbHMuaW1hZ2VTcmNzZXQuZ2V0U3Jjc2V0KFxuICAgICAgICAgICAgICAgIGltYWdlLmRhdGEsIHsgJzF4JzogY29udGV4dC50aGVtZVNldHRpbmdzLnByb2R1Y3RnYWxsZXJ5X3NpemUgfSxcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIHJldHVybiBtYWluSW1hZ2VVcmw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVWaWV3KGRhdGEpe1xuICAgICAgICB2YXIgaW5TdG9jayA9IGRhdGEuaW5zdG9jayxcbiAgICAgICAgICAgIGltYWdlID0gZGF0YS5pbWFnZSxcbiAgICAgICAgICAgIHNrdSA9IGRhdGEuc2t1LFxuICAgICAgICAgICAgcHJpY2UgPSBkYXRhLnByaWNlO1xuXG4gICAgICAgIGlmKGluU3RvY2spe1xuICAgICAgICAgICAgJHByb2RCdG4uYXR0cignZGlzYWJsZWQnLCBmYWxzZSk7XG4gICAgICAgICAgICAkcHJvZE9wdGlvbkxhYmVsLnJlbW92ZUNsYXNzKCdvcHRpb24taGlkZGVuJykuYWRkQ2xhc3MoJ29wdGlvbi12aXNpYmxlJyk7XG4gICAgICAgIH0gZWxzZXtcbiAgICAgICAgICAgICRwcm9kQnRuLmF0dHIoJ2Rpc2FibGVkJywgdHJ1ZSk7XG4gICAgICAgICAgICAkcHJvZE9wdGlvbkxhYmVsLnJlbW92ZUNsYXNzKCdvcHRpb24tdmlzaWJsZScpLmFkZENsYXNzKCdvcHRpb24taGlkZGVuJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaW1hZ2UgIT0gdW5kZWZpbmVkICYmIGltYWdlICE9PSBudWxsICYmIGltYWdlICE9PSAnJykge1xuICAgICAgICAgICAgJGltYWdlV3JhcHBlci5maW5kKCdpbWcnKS5hdHRyKCdzcmNzZXQnLCBzaG93VmFyaWFudEltYWdlKGltYWdlKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2t1KSB7XG4gICAgICAgICAgICAkKCdbZGF0YS1wcm9kdWN0LXNrdS1hZGRdJykuYXR0cignZGF0YS1wcm9kdWN0LXNrdS1hZGQnLCBza3UpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKF8uaXNPYmplY3QocHJpY2UpKSB7XG4gICAgICAgICAgICB1cGRhdGVQcmljZVZpZXcocHJpY2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlUHJpY2VWaWV3KHByaWNlKXtcbiAgICAgICAgaWYgKHByaWNlLndpdGhfdGF4KSB7XG4gICAgICAgICAgICAkKCcucHJpY2UtbGFiZWwnLCAkcHJvZFByaWNlKS5zaG93KCk7XG4gICAgICAgICAgICAkKCdbZGF0YS1wcm9kdWN0LXByaWNlLXdpdGgtdGF4XScsICRwcm9kUHJpY2UpLmh0bWwocHJpY2Uud2l0aF90YXguZm9ybWF0dGVkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcmljZS53aXRob3V0X3RheCkge1xuICAgICAgICAgICAgJCgnLnByaWNlLWxhYmVsJywgJHByb2RQcmljZSkuc2hvdygpO1xuICAgICAgICAgICAgJCgnW2RhdGEtcHJvZHVjdC1wcmljZS13aXRob3V0LXRheF0nLCAkcHJvZFByaWNlKS5odG1sKHByaWNlLndpdGhvdXRfdGF4LmZvcm1hdHRlZCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJpY2UucnJwX3dpdGhfdGF4KSB7XG4gICAgICAgICAgICAkKCcucnJwLXByaWNlLS13aXRoVGF4JywgJHByb2RQcmljZSkuc2hvdygpO1xuICAgICAgICAgICAgJCgnW2RhdGEtcHJvZHVjdC1ycnAtd2l0aC10YXhdJywgJHByb2RQcmljZSkuaHRtbChwcmljZS5ycnBfd2l0aF90YXguZm9ybWF0dGVkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcmljZS5ycnBfd2l0aG91dF90YXgpIHtcbiAgICAgICAgICAgICQoJy5ycnAtcHJpY2UtLXdpdGhvdXRUYXgnLCAkcHJvZFByaWNlKS5zaG93KCk7XG4gICAgICAgICAgICAkKCdbZGF0YS1wcm9kdWN0LXJycC1wcmljZS13aXRob3V0LXRheF0nLCAkcHJvZFByaWNlKS5odG1sKHByaWNlLnJycF93aXRob3V0X3RheC5mb3JtYXR0ZWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByaWNlLnNhdmVkKSB7XG4gICAgICAgICAgICAkKCcucHJpY2Utc2VjdGlvbi0tc2F2aW5nJywgJHByb2RQcmljZSkuc2hvdygpO1xuICAgICAgICAgICAgJCgnW2RhdGEtcHJvZHVjdC1wcmljZS1zYXZlZF0nLCAkcHJvZFByaWNlKS5odG1sKHByaWNlLnNhdmVkLmZvcm1hdHRlZCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJpY2Uubm9uX3NhbGVfcHJpY2Vfd2l0aF90YXgpIHtcbiAgICAgICAgICAgICQoJy5wcmljZS1sYWJlbCcsICRwcm9kUHJpY2UpLmhpZGUoKTtcbiAgICAgICAgICAgICQoJy5ub24tc2FsZS1wcmljZS0td2l0aFRheCcsICRwcm9kUHJpY2UpLnNob3coKTtcbiAgICAgICAgICAgICQoJy5wcmljZS1ub3ctbGFiZWwnLCAkcHJvZFByaWNlKS5zaG93KCk7XG4gICAgICAgICAgICAkKCdbZGF0YS1wcm9kdWN0LW5vbi1zYWxlLXByaWNlLXdpdGgtdGF4XScsICRwcm9kUHJpY2UpLmh0bWwocHJpY2Uubm9uX3NhbGVfcHJpY2Vfd2l0aF90YXguZm9ybWF0dGVkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcmljZS5ub25fc2FsZV9wcmljZV93aXRob3V0X3RheCkge1xuICAgICAgICAgICAgJCgnLnByaWNlLWxhYmVsJywgJHByb2RQcmljZSkuaGlkZSgpO1xuICAgICAgICAgICAgJCgnLm5vbi1zYWxlLXByaWNlLS13aXRob3V0VGF4JywgJHByb2RQcmljZSkuc2hvdygpO1xuICAgICAgICAgICAgJCgnLnByaWNlLW5vdy1sYWJlbCcsICRwcm9kUHJpY2UpLnNob3coKTtcbiAgICAgICAgICAgICQoJ1tkYXRhLXByb2R1Y3Qtbm9uLXNhbGUtcHJpY2Utd2l0aG91dC10YXhdJywgJHByb2RQcmljZSkuaHRtbChwcmljZS5ub25fc2FsZV9wcmljZV93aXRob3V0X3RheC5mb3JtYXR0ZWQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgd2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoJCgnLnN0aWNreS1hZGQtdG8tY2FydCcpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGlmICgkKHdpbmRvdykuc2Nyb2xsVG9wKCkgPiBzY3JvbGwgLSAxNjApIHtcbiAgICAgICAgICAgICAgICBpZiAoISQoJy5zdGlja3ktYWRkLXRvLWNhcnQnKS5oYXNDbGFzcygnc2hvdy1zdGlja3knKSkge1xuICAgICAgICAgICAgICAgICAgICAkKCcuc3RpY2t5LWFkZC10by1jYXJ0JykuYWRkQ2xhc3MoJ3Nob3ctc3RpY2t5Jyk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCQoJ2JvZHknKS5oYXNDbGFzcygncGFnZS10eXBlLXByb2R1Y3QnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnYm9keScpLmFkZENsYXNzKCdvcGVuU3RpY2t5QWRkVG9DYXJ0Jyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIvKlxyXG4gSW1wb3J0IGFsbCBwcm9kdWN0IHNwZWNpZmljIGpzXHJcbiAqL1xyXG5pbXBvcnQgU29ydGFibGUgZnJvbSAnc29ydGFibGVqcyc7XHJcbmltcG9ydCBQYWdlTWFuYWdlciBmcm9tICcuL3BhZ2UtbWFuYWdlcic7XHJcbmltcG9ydCBSZXZpZXcgZnJvbSAnLi9wcm9kdWN0L3Jldmlld3MnO1xyXG5pbXBvcnQgY29sbGFwc2libGVGYWN0b3J5IGZyb20gJy4vY29tbW9uL2NvbGxhcHNpYmxlJztcclxuaW1wb3J0IFByb2R1Y3REZXRhaWxzIGZyb20gJy4vY29tbW9uL3Byb2R1Y3QtZGV0YWlscyc7XHJcbmltcG9ydCB2aWRlb0dhbGxlcnkgZnJvbSAnLi9wcm9kdWN0L3ZpZGVvLWdhbGxlcnknO1xyXG5pbXBvcnQgeyBjbGFzc2lmeUZvcm0gfSBmcm9tICcuL2NvbW1vbi9mb3JtLXV0aWxzJztcclxuaW1wb3J0IGhhbG9BZGRPcHRpb24gZnJvbSAnLi9oYWxvdGhlbWVzL2hhbG9BZGRPcHRpb25Gb3JQcm9kdWN0Q2FyZCc7XHJcbmltcG9ydCBoYWxvUHJvZHVjdExvb2tib29rIGZyb20gJy4vaGFsb3RoZW1lcy9oYWxvUHJvZHVjdExvb2tib29rJztcclxuaW1wb3J0IGhhbG9CdW5kbGVQcm9kdWN0cyBmcm9tICcuL2hhbG90aGVtZXMvaGFsb0J1bmRsZVByb2R1Y3RzJztcclxuaW1wb3J0IGhhbG9OZXh0UHJvZHVjdHMgZnJvbSAnLi9oYWxvdGhlbWVzL2hhbG9OZXh0UHJvZHVjdHMnO1xyXG5pbXBvcnQgaGFsb1N0aWNreUFkZFRvQ2FydCBmcm9tICcuL2hhbG90aGVtZXMvaGFsb1N0aWNreUFkZFRvQ2FydCc7XHJcbmltcG9ydCBoYWxvWW91dHViZUNhcm91c2VsIGZyb20gJy4vaGFsb3RoZW1lcy9oYWxvVmlkZW8nO1xyXG5pbXBvcnQgaGFsb05vdGlmeU1lIGZyb20gJy4vaGFsb3RoZW1lcy9oYWxvTm90aWZ5TWUnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvZHVjdCBleHRlbmRzIFBhZ2VNYW5hZ2VyIHtcclxuICAgIGNvbnN0cnVjdG9yKGNvbnRleHQpIHtcclxuICAgICAgICBzdXBlcihjb250ZXh0KTtcclxuICAgICAgICB0aGlzLnVybCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xyXG4gICAgICAgIHRoaXMuJHJldmlld0xpbmsgPSAkKCdbZGF0YS1yZXZlYWwtaWQ9XCJtb2RhbC1yZXZpZXctZm9ybVwiXScpO1xyXG4gICAgICAgIHRoaXMuJGJ1bGtQcmljaW5nTGluayA9ICQoJ1tkYXRhLXJldmVhbC1pZD1cIm1vZGFsLWJ1bGstcHJpY2luZ1wiXScpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uUmVhZHkoKSB7XHJcbiAgICAgICAgLy8gTGlzdGVuIGZvciBmb3VuZGF0aW9uIG1vZGFsIGNsb3NlIGV2ZW50cyB0byBzYW5pdGl6ZSBVUkwgYWZ0ZXIgcmV2aWV3LlxyXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbG9zZS5mbmR0bi5yZXZlYWwnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnVybC5pbmRleE9mKCcjd3JpdGVfcmV2aWV3JykgIT09IC0xICYmIHR5cGVvZiB3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZShudWxsLCBkb2N1bWVudC50aXRsZSwgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBsZXQgdmFsaWRhdG9yO1xyXG5cclxuICAgICAgICAvLyBJbml0IGNvbGxhcHNpYmxlXHJcbiAgICAgICAgY29sbGFwc2libGVGYWN0b3J5KCk7XHJcblxyXG4gICAgICAgIHRoaXMucHJvZHVjdERldGFpbHMgPSBuZXcgUHJvZHVjdERldGFpbHMoJCgnLnByb2R1Y3RWaWV3JyksIHRoaXMuY29udGV4dCwgd2luZG93LkJDRGF0YS5wcm9kdWN0X2F0dHJpYnV0ZXMpO1xyXG4gICAgICAgIHRoaXMucHJvZHVjdERldGFpbHMuc2V0UHJvZHVjdFZhcmlhbnQoKTtcclxuXHJcbiAgICAgICAgdmlkZW9HYWxsZXJ5KCk7XHJcblxyXG4gICAgICAgIGNvbnN0ICRyZXZpZXdGb3JtID0gY2xhc3NpZnlGb3JtKCcud3JpdGVSZXZpZXctZm9ybScpO1xyXG4gICAgICAgIGNvbnN0IHJldmlldyA9IG5ldyBSZXZpZXcoJHJldmlld0Zvcm0pO1xyXG5cclxuICAgICAgICAkKCdib2R5Jykub24oJ2NsaWNrJywgJ1tkYXRhLXJldmVhbC1pZD1cIm1vZGFsLXJldmlldy1mb3JtXCJdJywgKCkgPT4ge1xyXG4gICAgICAgICAgICB2YWxpZGF0b3IgPSByZXZpZXcucmVnaXN0ZXJWYWxpZGF0aW9uKHRoaXMuY29udGV4dCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICRyZXZpZXdGb3JtLm9uKCdzdWJtaXQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh2YWxpZGF0b3IpIHtcclxuICAgICAgICAgICAgICAgIHZhbGlkYXRvci5wZXJmb3JtQ2hlY2soKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB2YWxpZGF0b3IuYXJlQWxsKCd2YWxpZCcpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIHRoaXMucHJvZHVjdFJldmlld0hhbmRsZXIoKTtcclxuICAgICAgICB0aGlzLmJ1bGtQcmljaW5nSGFuZGxlcigpO1xyXG4gICAgICAgIHRoaXMucHJvZHVjdEN1c3RvbVRhYigpO1xyXG4gICAgICAgIC8vIHRoaXMucHJvZHVjdFRhYlRvZ2dsZSgpO1xyXG4gICAgICAgIHRoaXMuY29tcGFyZUNvbG9ycygpO1xyXG4gICAgICAgIHRoaXMucHJvZHVjdFZpZXdJbmZvVGFicygpO1xyXG4gICAgICAgIHRoaXMuc29sZFByb2R1Y3QoJCgnLnByb2R1Y3RWaWV3LXNvbGRQcm9kdWN0JykpO1xyXG4gICAgICAgIHRoaXMudmlld2luZ1Byb2R1Y3QoJCgnLnByb2R1Y3RWaWV3LVZpZXdpbmdQcm9kdWN0JykpO1xyXG4gICAgICAgIHRoaXMuY291bnREb3duUHJvZHVjdCgkKCcucHJvZHVjdFZpZXctY291bnREb3duJykpO1xyXG4gICAgICAgIHRoaXMubG9hZE9wdGlvbkZvclByb2R1Y3RDYXJkKCk7XHJcbiAgICAgICAgdGhpcy5yZXZpZXdTaG93KClcclxuICAgICAgICBcclxuICAgICAgICBoYWxvTmV4dFByb2R1Y3RzKHRoaXMuY29udGV4dCk7XHJcbiAgICAgICAgaGFsb1N0aWNreUFkZFRvQ2FydCgkKCcucHJvZHVjdFZpZXcnKSwgdGhpcy5jb250ZXh0KTtcclxuICAgICAgICBoYWxvUHJvZHVjdExvb2tib29rKHRoaXMuY29udGV4dCwgJCgnLnByb2R1Y3RWaWV3LWxvb2tib29rJykpO1xyXG4gICAgICAgIGhhbG9CdW5kbGVQcm9kdWN0cygkKCcucHJvZHVjdFZpZXctc2xpY2snKSwgdGhpcy5jb250ZXh0KTtcclxuICAgICAgICBoYWxvTm90aWZ5TWUoJCgnLnByb2R1Y3RWaWV3LXNsaWNrJyksIHRoaXMuY29udGV4dCk7XHJcbiAgICAgICAgaGFsb1lvdXR1YmVDYXJvdXNlbCgkKCcucHJvZHVjdFZpZXctc2xpY2sgW2RhdGEtc2xpY2tdJykpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb2R1Y3RSZXZpZXdIYW5kbGVyKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnVybC5pbmRleE9mKCcjd3JpdGVfcmV2aWV3JykgIT09IC0xKSB7XHJcbiAgICAgICAgICAgIHRoaXMuJHJldmlld0xpbmsudHJpZ2dlcignY2xpY2snKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYnVsa1ByaWNpbmdIYW5kbGVyKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnVybC5pbmRleE9mKCcjYnVsa19wcmljaW5nJykgIT09IC0xKSB7XHJcbiAgICAgICAgICAgIHRoaXMuJGJ1bGtQcmljaW5nTGluay50cmlnZ2VyKCdjbGljaycpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldmlld1Nob3coeCkge1xyXG4gICAgICAgIHZhciBsaW1pdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5yZXZpZXdDYXJkMScpO1xyXG5cclxuICAgICAgICBsZXQgcmV2aWV3MiA9IFtdXHJcbiAgICAgICAgUHJvbWlzZS5hbGwoW1xyXG4gICAgICAgICAgICBmZXRjaChcImh0dHBzOi8vd3d3LnRlYW1kZXNrLm5ldC9zZWN1cmUvYXBpL3YyLzU2NTU0L0JFQTI1NjY1OTBFRjREMTRBQThEMzVBRDBFMkNFQTc3L1Jldmlldy9zZWxlY3QuanNvblwiKS50aGVuKHIgPT4gci5qc29uKCkpLnRoZW4ocj0+e1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldmlldzIucHVzaCguLi5yKX0pLFxyXG4gICAgICAgICAgICBmZXRjaChcImh0dHBzOi8vd3d3LnRlYW1kZXNrLm5ldC9zZWN1cmUvYXBpL3YyLzU2NTU0L0JFQTI1NjY1OTBFRjREMTRBQThEMzVBRDBFMkNFQTc3L1Jldmlldy9zZWxlY3QuanNvbj9za2lwPTUwMFwiKS50aGVuKHIgPT4gci5qc29uKCkpLnRoZW4ocj0+e1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldmlldzIucHVzaCguLi5yKX0pLFxyXG4gICAgICAgICAgICBmZXRjaChcImh0dHBzOi8vd3d3LnRlYW1kZXNrLm5ldC9zZWN1cmUvYXBpL3YyLzU2NTU0L0JFQTI1NjY1OTBFRjREMTRBQThEMzVBRDBFMkNFQTc3L1Jldmlldy9zZWxlY3QuanNvbj9za2lwPTEwMDBcIikudGhlbihyID0+IHIuanNvbigpKS50aGVuKHI9PntcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXZpZXcyLnB1c2goLi4ucil9KSxcclxuICAgICAgICAgICAgZmV0Y2goXCJodHRwczovL3d3dy50ZWFtZGVzay5uZXQvc2VjdXJlL2FwaS92Mi81NjU1NC9CRUEyNTY2NTkwRUY0RDE0QUE4RDM1QUQwRTJDRUE3Ny9SZXZpZXcvc2VsZWN0Lmpzb24/c2tpcD0xNTAwXCIpLnRoZW4ociA9PiByLmpzb24oKSkudGhlbihyPT57XHJcbiAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV2aWV3Mi5wdXNoKC4uLnIpfSksXHJcbiAgICAgICAgICBdKVxyXG4gICAgICAgICAgLnRoZW4oKHIpID0+IHtcclxuICAgICAgICAgICAgbGltaXQuZm9yRWFjaCgoaXRlbTEpID0+IHtcclxuICAgICAgICAgICAgICAgICQoaXRlbTEubmV4dEVsZW1lbnRTaWJsaW5nKS5lbXB0eSgpXHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbTEuaW5uZXJIVE1MID09ICdNMTA2Jykge1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0xLmlubmVySFRNTCA9ICdNMTA2IzEnXHJcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZiAoaXRlbTEuaW5uZXJIVE1MID09ICdNMTA2TCcpIHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtMS5pbm5lckhUTUwgPSAnTTEwNkwjMSdcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaXRlbTEuaW5uZXJIVE1MID09ICdRdWVlbl8xOCcpIHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtMS5pbm5lckhUTUwgPSAnUTE4J1xyXG4gICAgICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgICAgIGxldCByZXZpZXczID0gW11cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgY29uc3QgZmlsdGVyZWRBciA9IHJldmlldzIuZmlsdGVyKGl0ZW0gPT4gaXRlbVsnUHJvZHVjdCBTS1UnXSA9PT0gaXRlbTEuaW5uZXJIVE1MKVxyXG4gICAgICAgICAgICAgICAgZmlsdGVyZWRBci5mb3JFYWNoKChyZXYpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXZpZXczLnB1c2gocmV2WydSZXZpZXcgcmF0ZSddKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJldmlld0F2ZyA9IE1hdGgucm91bmQoKHJldmlldzMucmVkdWNlKChhLGIgKSA9PiBhKyBiLCAwKS9yZXZpZXczLmxlbmd0aCkgKiAxMCkvMTBcclxuXHJcbiAgICAgICAgICAgICAgICAkKGl0ZW0xLm5leHRFbGVtZW50U2libGluZykuYXBwZW5kKGBcclxuICAgICAgICAgICAgICAgIDxzdHlsZT4gICAgLmNoZWNrZWQge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiByZ2IoMjU1LCAyMTAsIDApO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAuZmEtc3Rhci1vIHtcclxuICAgICAgICAgICAgICAgIGNvbG9yOiByZ2IoMjU1LCAyMTAsIDApO1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIEBtZWRpYSAobWluLXdpZHRoOiA3NjhweCkge1xyXG4gICAgICAgICAgICAgICAgLnByb2R1Y3RSZXZpZXcyIHtcclxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIEBtZWRpYSAobWluLXdpZHRoOiAxMDI1cHgpIHtcclxuICAgICAgICAgICAgICAgIC5wcm9kdWN0UmV2aWV3MiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogdW5zZXQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgQG1lZGlhIChtaW4td2lkdGg6IDE0MDBweCkge1xyXG4gICAgICAgICAgICAgICAgLnByb2R1Y3RSZXZpZXcyIHtcclxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIDwvc3R5bGU+XHJcbjxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiBocmVmPVwiaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvZm9udC1hd2Vzb21lLzQuNy4wL2Nzcy9mb250LWF3ZXNvbWUubWluLmNzc1wiPlxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICA8c3Bhbj5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZmEgZmEtc3RhcmArKDAuNSA8PSByZXZpZXdBdmc/ICcgY2hlY2tlZCc6ICcgZmEtc3Rhci1vJykgKyBgXCI+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmYSBmYS1zdGFyYCsoMS41IDw9IHJldmlld0F2Zz8gJyBjaGVja2VkJzogJyBmYS1zdGFyLW8nKSArIGBcIj48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZhIGZhLXN0YXJgKygyLjUgPD0gcmV2aWV3QXZnPyAnIGNoZWNrZWQnOiAnIGZhLXN0YXItbycpICsgYFwiPjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZmEgZmEtc3RhcmArKDMuNSA8PSByZXZpZXdBdmc/ICcgY2hlY2tlZCc6ICcgZmEtc3Rhci1vJykgKyBgXCI+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmYSBmYS1zdGFyYCsoNC41IDw9IHJldmlld0F2Zz8gJyBjaGVja2VkJzogJyBmYS1zdGFyLW8nKSArIGBcIj48L3NwYW4+ICAgICAgXHJcbiAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgPGRpdiBzdHlsZT1wYWRkaW5nLWxlZnQ6NXB4Oz5cclxuICAgICAgICAgICAgICAgICR7cmV2aWV3My5sZW5ndGh9ICBSZXNlw7Fhc1xyXG4gICAgICAgICAgICA8L2Rpdj5gKVxyXG4gICAgICAgICAgICAgICAgLy8gJChpdGVtMS5uZXh0RWxlbWVudFNpYmxpbmcpLmFwcGVuZChgPGRpdj4ke3Jldmlld0F2Z308L2Rpdj5gKVxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgXHJcbiAgICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHByb2R1Y3RDdXN0b21UYWIoKXtcclxuICAgICAgICBpZigkKCcucHJvZHVjdFZpZXctZGVzY3JpcHRpb24gW2RhdGEtY3VzdG9tLXRhYl0nKS5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgJCgnLnByb2R1Y3RWaWV3LWRlc2NyaXB0aW9uIFtkYXRhLWN1c3RvbS10YWJdJykuYXBwZW5kVG8oJyNoYWxvLWN1c3RvbS10YWIgLmNhcmQtYm9keScpO1xyXG4gICAgICAgICAgICAkKCcjaGFsby1jdXN0b20tdGFiJykucmVtb3ZlQ2xhc3MoJ3UtaGlkZGVuVmlzdWFsbHknKTtcclxuICAgICAgICAgICAgJCgnLnByb2R1Y3RWaWV3LXNob3J0RGVzYyBbZGF0YS1jdXN0b20tdGFiXScpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAkKCcjaGFsby1wcm9kdWN0Vmlldy1kZXNjcmlwdGlvbiAucHJvZHVjdFZpZXctdGFicyAuY2FyZC1ib2R5JykuYWRkQ2xhc3MoJ2hhcy1jdXN0b21UYWInKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkKCcjaGFsby1wcm9kdWN0Vmlldy1kZXNjcmlwdGlvbiAucHJvZHVjdFZpZXctdGFicyAuY2FyZC53YXJyYW50eSAudGl0bGUnKS5hZGRDbGFzcygnbm8tY3VzdG9tVGFiJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIHByb2R1Y3RUYWJUb2dnbGUoKXtcclxuICAgIC8vICAgICAkKCcucHJvZHVjdFZpZXctdGFicyAuY2FyZCAudGl0bGUnKS5vbignY2xpY2snLCBldmVudCA9PiB7XHJcbiAgICAvLyAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgLy8gICAgICAgICB2YXIgJHRhcmdldCA9ICQoZXZlbnQuY3VycmVudFRhcmdldCk7XHJcblxyXG4gICAgLy8gICAgICAgICAkKCcucHJvZHVjdFZpZXctdGFicyAuY2FyZCAudGl0bGUnKS5ub3QoJHRhcmdldCkucmVtb3ZlQ2xhc3MoJ2NvbGxhcHNlZCcpO1xyXG5cclxuICAgIC8vICAgICAgICAgaWYoJHRhcmdldC5oYXNDbGFzcygnY29sbGFwc2VkJykpe1xyXG4gICAgLy8gICAgICAgICAgICAgJHRhcmdldC5yZW1vdmVDbGFzcygnY29sbGFwc2VkJyk7XHJcbiAgICAvLyAgICAgICAgIH0gZWxzZXtcclxuICAgIC8vICAgICAgICAgICAgICR0YXJnZXQuYWRkQ2xhc3MoJ2NvbGxhcHNlZCcpO1xyXG4gICAgLy8gICAgICAgICB9XHJcblxyXG4gICAgLy8gICAgICAgICAkKCcucHJvZHVjdFZpZXctdGFicyAuY2FyZCcpLmVhY2goKGluZGV4LCBlbGVtZW50KSA9PntcclxuICAgIC8vICAgICAgICAgICAgIGlmKCQoJy50aXRsZScsIGVsZW1lbnQpLmhhc0NsYXNzKCdjb2xsYXBzZWQnKSl7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgJChlbGVtZW50KS5maW5kKCcuY29sbGFwc2UnKS5zbGlkZURvd24oXCJzbG93XCIpO1xyXG4gICAgLy8gICAgICAgICAgICAgfSBlbHNle1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICQoZWxlbWVudCkuZmluZCgnLmNvbGxhcHNlJykuc2xpZGVVcChcInNsb3dcIik7XHJcbiAgICAvLyAgICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgIH0pO1xyXG4gICAgLy8gICAgIH0pO1xyXG5cclxuICAgIC8vICAgICAkKCcucHJvZHVjdFZpZXctdGFicyAuY2FyZDpudGgtY2hpbGQoMSkgLnRpdGxlJykudHJpZ2dlcignY2xpY2snKTtcclxuICAgIC8vIH1cclxuXHJcbiAgICBzb2xkUHJvZHVjdCgkd3JhcHBlcikge1xyXG4gICAgICAgIGlmKCR3cmFwcGVyLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgdmFyIG51bWJlcnNQcm9kdWN0X3RleHQgPSB0aGlzLmNvbnRleHQudGhlbWVTZXR0aW5ncy5wcm9kdWN0X3NvbGRQcm9kdWN0X3Byb2R1Y3RzLFxyXG4gICAgICAgICAgICAgICAgbnVtYmVyc0hvdXJzX3RleHQgPSB0aGlzLmNvbnRleHQudGhlbWVTZXR0aW5ncy5wcm9kdWN0X3NvbGRQcm9kdWN0X2hvdXJzLFxyXG4gICAgICAgICAgICAgICAgc29sZFByb2R1Y3RUZXh0ID0gdGhpcy5jb250ZXh0LnRoZW1lU2V0dGluZ3MucHJvZHVjdF9zb2xkUHJvZHVjdF90ZXh0LFxyXG4gICAgICAgICAgICAgICAgc29sZFByb2R1Y3RUZXh0MiA9IHRoaXMuY29udGV4dC50aGVtZVNldHRpbmdzLnByb2R1Y3Rfc29sZFByb2R1Y3RfaG91cnNfdGV4dDtcclxuXHJcbiAgICAgICAgICAgIHZhciBudW1iZXJzUHJvZHVjdExpc3QgPSAgSlNPTi5wYXJzZShcIltcIiArIG51bWJlcnNQcm9kdWN0X3RleHQgKyBcIl1cIiksIFxyXG4gICAgICAgICAgICAgICAgbnVtYmVyc1Byb2R1Y3RJdGVtID0gKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSpudW1iZXJzUHJvZHVjdExpc3QubGVuZ3RoKSksXHJcbiAgICAgICAgICAgICAgICBudW1iZXJzSG91cnNMaXN0ID0gIEpTT04ucGFyc2UoXCJbXCIgKyBudW1iZXJzSG91cnNfdGV4dCArIFwiXVwiKSxcclxuICAgICAgICAgICAgICAgIG51bWJlcnNIb3Vyc0l0ZW0gPSAoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKm51bWJlcnNIb3Vyc0xpc3QubGVuZ3RoKSk7XHJcbiAgICAgICAgIFxyXG4gICAgICAgICAgICAkd3JhcHBlci5odG1sKCc8c3ZnIGNsYXNzPVwiaWNvblwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjx1c2UgeGxpbms6aHJlZj1cIiNpY29uLWZpcmVcIi8+PC9zdmc+PHNwYW4gY2xhc3M9XCJ0ZXh0XCI+JyArIG51bWJlcnNQcm9kdWN0TGlzdFtudW1iZXJzUHJvZHVjdEl0ZW1dICsgXCIgXCIgKyBzb2xkUHJvZHVjdFRleHQgKyBcIiBcIiArIG51bWJlcnNIb3Vyc0xpc3RbbnVtYmVyc0hvdXJzSXRlbV0gKyBcIiBcIiArIHNvbGRQcm9kdWN0VGV4dDIgKyAnPC9zcGFuPicpO1xyXG4gICAgICAgICAgICAkd3JhcHBlci5zaG93KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvdW50RG93blByb2R1Y3QoJHdyYXBwZXIpIHtcclxuICAgICAgICBpZigkd3JhcHBlci5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHZhciBjb3VudERvd24gPSAkd3JhcHBlci5kYXRhKCdjb3VudGRvd24nKSxcclxuICAgICAgICAgICAgICAgIGNvdW50RG93bkRhdGUgPSBuZXcgRGF0ZShjb3VudERvd24pLmdldFRpbWUoKSxcclxuICAgICAgICAgICAgICAgIHNlZnQgPSAkd3JhcHBlcjtcclxuXHJcbiAgICAgICAgICAgIHZhciBjb3VudGRvd25mdW5jdGlvbiA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIG5vdyA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc3RhbmNlID0gY291bnREb3duRGF0ZSAtIG5vdztcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZGlzdGFuY2UgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChjb3VudGRvd25mdW5jdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VmdC5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRheXMgPSBNYXRoLmZsb29yKGRpc3RhbmNlIC8gKDEwMDAgKiA2MCAqIDYwICogMjQpKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaG91cnMgPSBNYXRoLmZsb29yKChkaXN0YW5jZSAlICgxMDAwICogNjAgKiA2MCAqIDI0KSkgLyAoMTAwMCAqIDYwICogNjApKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWludXRlcyA9IE1hdGguZmxvb3IoKGRpc3RhbmNlICUgKDEwMDAgKiA2MCAqIDYwKSkgLyAoMTAwMCAqIDYwKSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlY29uZHMgPSBNYXRoLmZsb29yKChkaXN0YW5jZSAlICgxMDAwICogNjApKSAvIDEwMDApLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHJDb3VudERvd24gPSAnPHN2ZyBjbGFzcz1cImljb25cIiBhcmlhLWhpZGRlbj1cInRydWVcIj48dXNlIHhsaW5rOmhyZWY9XCIjaWNvbi1iZWxsXCIvPjwvc3ZnPjxzcGFuIGNsYXNzPVwidGV4dFwiPjxzcGFuPkxpbWl0ZWQgdGltZSBvZmZlciwgZW5kIGluOjwvc3Bhbj48L3NwYW4+IDxzcGFuIGNsYXNzPVwibnVtXCI+JytkYXlzKydkIDo8L3NwYW4+IDxzcGFuIGNsYXNzPVwibnVtXCI+Jytob3VycysnaCA6PC9zcGFuPiA8c3BhbiBjbGFzcz1cIm51bVwiPicrbWludXRlcysnbSA6PC9zcGFuPiA8c3BhbiBjbGFzcz1cIm51bVwiPicrc2Vjb25kcysnczwvc3Bhbj4nO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzZWZ0Lmh0bWwoc3RyQ291bnREb3duKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHZpZXdpbmdQcm9kdWN0KCR3cmFwcGVyKSB7XHJcbiAgICAgICAgaWYoJHdyYXBwZXIubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB2YXIgdmlld2VyVGV4dCA9IHRoaXMuY29udGV4dC50aGVtZVNldHRpbmdzLnByb2R1Y3Rfdmlld2luZ1Byb2R1Y3RfdGV4dCxcclxuICAgICAgICAgICAgICAgIG51bWJlcnNWaWV3ZXJfdGV4dCA9IHRoaXMuY29udGV4dC50aGVtZVNldHRpbmdzLnByb2R1Y3Rfdmlld2luZ1Byb2R1Y3Rfdmlld2VyLFxyXG4gICAgICAgICAgICAgICAgbnVtYmVyc1ZpZXdlckxpc3QgPSAgSlNPTi5wYXJzZShcIltcIiArIG51bWJlcnNWaWV3ZXJfdGV4dCArIFwiXVwiKTsgXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHZhciBudW1iZXJzVmlld2VySXRlbSA9IChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqbnVtYmVyc1ZpZXdlckxpc3QubGVuZ3RoKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgJHdyYXBwZXIuaHRtbCgnPHN2ZyBjbGFzcz1cImljb25cIiBhcmlhLWhpZGRlbj1cInRydWVcIj48dXNlIHhsaW5rOmhyZWY9XCIjaWNvbi1leWVcIi8+PC9zdmc+JyArIG51bWJlcnNWaWV3ZXJMaXN0W251bWJlcnNWaWV3ZXJJdGVtXSArIFwiIFwiICsgdmlld2VyVGV4dCk7XHJcbiAgICAgICAgICAgICAgICAkd3JhcHBlci5yZW1vdmVDbGFzcygndS1oaWRkZW5WaXN1YWxseScpLnNob3coKTtcclxuICAgICAgICAgICAgfSwgMTAwMDApOyAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbXBhcmVDb2xvcnMoKXtcclxuICAgICAgICBjb25zdCAkc3dhdGNoV3JhcHBlciA9ICQoJy5oYWxvLWNvbXBhcmVDb2xvcnMtc3dhdGNoJyksXHJcbiAgICAgICAgICAgICRpbWFnZVdyYXBwZXIgPSAkKCcuaGFsby1jb21wYXJlQ29sb3JzLWltYWdlJyksXHJcbiAgICAgICAgICAgICR0ZXh0V3JhcHBlciA9ICQoJy5oYWxvLWNvbXBhcmVDb2xvcnMtdGV4dCcpO1xyXG5cclxuICAgICAgICAkKCcuZm9ybS1vcHRpb24nLCAkc3dhdGNoV3JhcHBlcikub24oJ2NsaWNrJywgIGV2ZW50ID0+IHtcclxuICAgICAgICAgICAgdmFyICR0aGlzID0gJChldmVudC5jdXJyZW50VGFyZ2V0KTtcclxuXHJcbiAgICAgICAgICAgICR0aGlzLnRvZ2dsZUNsYXNzKCdzaG93LWNvbG9yJyk7XHJcblxyXG4gICAgICAgICAgICB2YXIgdGl0bGUgPSAkdGhpcy5maW5kKCcuZm9ybS1vcHRpb24tdmFyaWFudCcpLmF0dHIoJ3RpdGxlJyksXHJcbiAgICAgICAgICAgICAgICBpZCA9ICR0aGlzLmRhdGEoJ3Byb2R1Y3Qtc3dhdGNoLXZhbHVlJyksXHJcbiAgICAgICAgICAgICAgICAkY29sb3IsICRjb2xvcjIsICRjb2xvcjMsICRpbWcsICRwYXR0ZXJuO1xyXG5cclxuICAgICAgICAgICAgaWYgKCR0aGlzLmhhc0NsYXNzKCdzaG93LWNvbG9yJykpe1xyXG4gICAgICAgICAgICAgICAgaWYoJHRoaXMuZmluZCgnLmZvcm0tb3B0aW9uLXZhcmlhbnQtLWNvbG9yJykubGVuZ3RoKXtcclxuICAgICAgICAgICAgICAgICAgICAkY29sb3IgPSAkdGhpcy5maW5kKCcuZm9ybS1vcHRpb24tdmFyaWFudC0tY29sb3InKS5hdHRyKCdzdHlsZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkaW1hZ2VXcmFwcGVyLmFwcGVuZCgnPGRpdiBjbGFzcz1cIml0ZW0gaXRlbS1jb2xvciBpdGVtLScraWQrJ1wiPjxzcGFuIGNsYXNzPVwiY29sb3JcIiBzdHlsZT1cIicrJGNvbG9yKyc7XCI+PC9zcGFuPjxzcGFuIGNsYXNzPVwidGl0bGVcIj4nK3RpdGxlKyc8L3NwYW4+PC9kaXY+Jyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoJHRoaXMuZmluZCgnLmZvcm0tb3B0aW9uLXZhcmlhbnQtLWNvbG9yMicpLmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICAgICAgJGNvbG9yID0gJHRoaXMuZmluZCgnLmZvcm0tb3B0aW9uLXZhcmlhbnQtLWNvbG9yMiBzcGFuOm50aC1jaGlsZCgxKScpLmF0dHIoJ3N0eWxlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJGNvbG9yMiA9ICR0aGlzLmZpbmQoJy5mb3JtLW9wdGlvbi12YXJpYW50LS1jb2xvcjIgc3BhbjpudGgtY2hpbGQoMiknKS5hdHRyKCdzdHlsZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKCcuaGFsby1jb21wYXJlQ29sb3JzLWltYWdlJykuYXBwZW5kKCc8ZGl2IGNsYXNzPVwiaXRlbSBpdGVtLWNvbG9yIGl0ZW0tJytpZCsnXCI+PHNwYW4gY2xhc3M9XCJjb2xvciBjb2xvcjJcIj48c3BhbiBzdHlsZT1cIicrJGNvbG9yKyc7XCI+PC9zcGFuPjxzcGFuIHN0eWxlPVwiJyskY29sb3IyKyc7XCI+PC9zcGFuPjwvc3Bhbj48c3BhbiBjbGFzcz1cInRpdGxlXCI+Jyt0aXRsZSsnPC9zcGFuPjwvZGl2PicpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKCR0aGlzLmZpbmQoJy5mb3JtLW9wdGlvbi12YXJpYW50LS1jb2xvcjMnKS5sZW5ndGgpe1xyXG4gICAgICAgICAgICAgICAgICAgICRjb2xvciA9ICAkdGhpcy5maW5kKCcuZm9ybS1vcHRpb24tdmFyaWFudC0tY29sb3IzIHNwYW46bnRoLWNoaWxkKDEpJykuYXR0cignc3R5bGUnKTtcclxuICAgICAgICAgICAgICAgICAgICAkY29sb3IyID0gICR0aGlzLmZpbmQoJy5mb3JtLW9wdGlvbi12YXJpYW50LS1jb2xvcjMgc3BhbjpudGgtY2hpbGQoMiknKS5hdHRyKCdzdHlsZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICRjb2xvcjMgPSAgJHRoaXMuZmluZCgnLmZvcm0tb3B0aW9uLXZhcmlhbnQtLWNvbG9yMyBzcGFuOm50aC1jaGlsZCgzKScpLmF0dHIoJ3N0eWxlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRpbWFnZVdyYXBwZXIuYXBwZW5kKCc8ZGl2IGNsYXNzPVwiaXRlbSBpdGVtLWNvbG9yIGl0ZW0tJytpZCsnXCI+PHNwYW4gY2xhc3M9XCJjb2xvciBjb2xvcjNcIj48c3BhbiBzdHlsZT1cIicrJGNvbG9yKyc7XCI+PC9zcGFuPjxzcGFuIHN0eWxlPVwiJyskY29sb3IyKyc7XCI+PC9zcGFuPjxzcGFuIHN0eWxlPVwiJyskY29sb3IzKyc7XCI+PC9zcGFuPjwvc3Bhbj48c3BhbiBjbGFzcz1cInRpdGxlXCI+Jyt0aXRsZSsnPC9zcGFuPjwvZGl2PicpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKCR0aGlzLmZpbmQoJy5mb3JtLW9wdGlvbi12YXJpYW50LS1wYXR0ZXJuJykubGVuZ3RoKXtcclxuICAgICAgICAgICAgICAgICAgICAkaW1nID0gJHRoaXMuZmluZCgnLmZvcm0tb3B0aW9uLXZhcmlhbnQtLXBhdHRlcm4nKS5hdHRyKCdzdHlsZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICRwYXR0ZXJuID0gJHRoaXMuZmluZCgnLmZvcm0tb3B0aW9uLXZhcmlhbnQtLXBhdHRlcm4nKS5hdHRyKCdkYXRhLXBhdHRlcm4nKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGltYWdlV3JhcHBlci5hcHBlbmQoJzxkaXYgY2xhc3M9XCJpdGVtIGl0ZW0tcGFydGVybiBpdGVtLScraWQrJ1wiPjxzcGFuIGNsYXNzPVwiaW1hZ2VcIj48aW1nIHNyYz0nKyRwYXR0ZXJuKycgYWx0PScrdGl0bGUrJyB0aXRsZT0nK3RpdGxlKyc+PC9zcGFuPjxzcGFuIGNsYXNzPVwidGl0bGVcIj4nK3RpdGxlKyc8L3NwYW4+PC9kaXY+Jyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZXtcclxuICAgICAgICAgICAgICAgICQoJy5pdGVtLScraWQrJycsICRpbWFnZVdyYXBwZXIpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZigkaW1hZ2VXcmFwcGVyLmNoaWxkcmVuKCkubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgICAgICAkdGV4dFdyYXBwZXIuaGlkZSgpO1xyXG4gICAgICAgICAgICB9IGVsc2V7XHJcbiAgICAgICAgICAgICAgICAkdGV4dFdyYXBwZXIuc2hvdygpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPj0gMTAyNSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbG9yLXN3YXRjaC1pbWFnZScpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBuZXcgU29ydGFibGUoZWwsIHtcclxuICAgICAgICAgICAgICAgICAgICBhbmltYXRpb246IDE1MFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcm9kdWN0Vmlld0luZm9UYWJzKCl7XHJcbiAgICAgICAgJCgnLnByb2R1Y3RWaWV3LWluZm9UYWJzIC5wcm9kdWN0Vmlldy1pbmZvVGFiIGEnKS5vbignY2xpY2snLCBldmVudCA9PiB7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgJGJsb2NrID0gJChldmVudC5jdXJyZW50VGFyZ2V0KS5hdHRyKCdocmVmJyk7XHJcblxyXG4gICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgICAgICBzY3JvbGxUb3A6ICQoJGJsb2NrKS5vZmZzZXQoKS50b3AgLSAkKCcuaGVhZGVyJykuaGVpZ2h0KCksXHJcbiAgICAgICAgICAgIH0sIDcwMCk7XHJcblxyXG4gICAgICAgICAgICBpZigkYmxvY2sgPT0gJyNoYWxvLXByb2R1Y3RWaWV3LWRlc2NyaXB0aW9uJyl7XHJcbiAgICAgICAgICAgICAgICBpZighJCgnLnByb2R1Y3RWaWV3LXRhYnMgLmNhcmQ6bnRoLWNoaWxkKDEpIC50aXRsZScpLmhhc0NsYXNzKCdjb2xsYXBzZWQnKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLnByb2R1Y3RWaWV3LXRhYnMgLmNhcmQ6bnRoLWNoaWxkKDEpIC50aXRsZScpLnRyaWdnZXIoJ2NsaWNrJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJCgnLnByb2R1Y3RWaWV3LW1vcmVEZXNjIGEnKS5vbignY2xpY2snLCBldmVudCA9PiB7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgICAgICBzY3JvbGxUb3A6ICQoJyNoYWxvLXByb2R1Y3RWaWV3LWRlc2NyaXB0aW9uJykub2Zmc2V0KCkudG9wIC0gJCgnLmhlYWRlcicpLmhlaWdodCgpLFxyXG4gICAgICAgICAgICB9LCA3MDApO1xyXG5cclxuICAgICAgICAgICAgaWYoISQoJy5wcm9kdWN0Vmlldy10YWJzIC5jYXJkOm50aC1jaGlsZCgxKSAudGl0bGUnKS5oYXNDbGFzcygnY29sbGFwc2VkJykpe1xyXG4gICAgICAgICAgICAgICAgJCgnLnByb2R1Y3RWaWV3LXRhYnMgLmNhcmQ6bnRoLWNoaWxkKDEpIC50aXRsZScpLnRyaWdnZXIoJ2NsaWNrJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBsb2FkT3B0aW9uRm9yUHJvZHVjdENhcmQoKXtcclxuICAgICAgICBpZigkKCcucHJvZHVjdENhcm91c2VsJykubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgICQoJy5wcm9kdWN0Q2Fyb3VzZWwnKS5lYWNoKChpbmRleCwgZWxlbWVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyICRwcm9kV3JhcElkID0gJChlbGVtZW50KS5hdHRyKCdpZCcpO1xyXG5cclxuICAgICAgICAgICAgICAgIGhhbG9BZGRPcHRpb24odGhpcy5jb250ZXh0LCAkcHJvZFdyYXBJZCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgbm9kIGZyb20gJy4uL2NvbW1vbi9ub2QnO1xuaW1wb3J0IHsgQ29sbGFwc2libGVFdmVudHMgfSBmcm9tICcuLi9jb21tb24vY29sbGFwc2libGUnO1xuaW1wb3J0IGZvcm1zIGZyb20gJy4uL2NvbW1vbi9tb2RlbHMvZm9ybXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB7XG4gICAgY29uc3RydWN0b3IoJHJldmlld0Zvcm0pIHtcbiAgICAgICAgdGhpcy52YWxpZGF0b3IgPSBub2Qoe1xuICAgICAgICAgICAgc3VibWl0OiAkcmV2aWV3Rm9ybS5maW5kKCdpbnB1dFt0eXBlPVwic3VibWl0XCJdJyksXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuJHJldmlld3NDb250ZW50ID0gJCgnI3RhYi1yZXZpZXdzJyk7XG4gICAgICAgIHRoaXMuJGNvbGxhcHNpYmxlID0gJCgnW2RhdGEtY29sbGFwc2libGVdJywgdGhpcy4kcmV2aWV3c0NvbnRlbnQpO1xuXG4gICAgICAgIHRoaXMuaW5pdExpbmtCaW5kKCk7XG4gICAgICAgIHRoaXMuaW5qZWN0UGFnaW5hdGlvbkxpbmsoKTtcbiAgICAgICAgdGhpcy5jb2xsYXBzZVJldmlld3MoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBPbiBpbml0aWFsIHBhZ2UgbG9hZCwgdGhlIHVzZXIgY2xpY2tzIG9uIFwiKDEyIFJldmlld3MpXCIgbGlua1xuICAgICAqIFRoZSBicm93c2VyIGp1bXBzIHRvIHRoZSByZXZpZXcgcGFnZSBhbmQgc2hvdWxkIGV4cGFuZCB0aGUgcmV2aWV3cyBzZWN0aW9uXG4gICAgICovXG4gICAgaW5pdExpbmtCaW5kKCkge1xuICAgICAgICBjb25zdCAkY29udGVudCA9ICQoJyNwcm9kdWN0UmV2aWV3cy1jb250ZW50JywgdGhpcy4kcmV2aWV3c0NvbnRlbnQpO1xuXG4gICAgICAgICQoJy5wcm9kdWN0Vmlldy1yZXZpZXdMaW5rJykub24oJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgJCgnLnByb2R1Y3RWaWV3LXJldmlld1RhYkxpbmsnKS50cmlnZ2VyKCdjbGljaycpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoISRjb250ZW50Lmhhc0NsYXNzKCdpcy1vcGVuJykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRjb2xsYXBzaWJsZS50cmlnZ2VyKENvbGxhcHNpYmxlRXZlbnRzLmNsaWNrKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29sbGFwc2VSZXZpZXdzKCkge1xuICAgICAgICAvLyBXZSdyZSBpbiBwYWdpbmF0aW5nIHN0YXRlLCBkbyBub3QgY29sbGFwc2VcbiAgICAgICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5oYXNoICYmIHdpbmRvdy5sb2NhdGlvbi5oYXNoLmluZGV4T2YoJyN0YWItcmV2aWV3cycpID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBmb3JjZSBjb2xsYXBzZSBvbiBwYWdlIGxvYWRcbiAgICAgICAgdGhpcy4kY29sbGFwc2libGUudHJpZ2dlcihDb2xsYXBzaWJsZUV2ZW50cy5jbGljayk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW5qZWN0IElEIGludG8gdGhlIHBhZ2luYXRpb24gbGlua1xuICAgICAqL1xuICAgIGluamVjdFBhZ2luYXRpb25MaW5rKCkge1xuICAgICAgICBjb25zdCAkbmV4dExpbmsgPSAkKCcucGFnaW5hdGlvbi1pdGVtLS1uZXh0IC5wYWdpbmF0aW9uLWxpbmsnLCB0aGlzLiRyZXZpZXdzQ29udGVudCk7XG4gICAgICAgIGNvbnN0ICRwcmV2TGluayA9ICQoJy5wYWdpbmF0aW9uLWl0ZW0tLXByZXZpb3VzIC5wYWdpbmF0aW9uLWxpbmsnLCB0aGlzLiRyZXZpZXdzQ29udGVudCk7XG5cbiAgICAgICAgaWYgKCRuZXh0TGluay5sZW5ndGgpIHtcbiAgICAgICAgICAgICRuZXh0TGluay5hdHRyKCdocmVmJywgYCR7JG5leHRMaW5rLmF0dHIoJ2hyZWYnKX0gI3RhYi1yZXZpZXdzYCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoJHByZXZMaW5rLmxlbmd0aCkge1xuICAgICAgICAgICAgJHByZXZMaW5rLmF0dHIoJ2hyZWYnLCBgJHskcHJldkxpbmsuYXR0cignaHJlZicpfSAjdGFiLXJldmlld3NgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlZ2lzdGVyVmFsaWRhdGlvbihjb250ZXh0KSB7XG4gICAgICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gICAgICAgIHRoaXMudmFsaWRhdG9yLmFkZChbe1xuICAgICAgICAgICAgc2VsZWN0b3I6ICdbbmFtZT1cInJldnJhdGluZ1wiXScsXG4gICAgICAgICAgICB2YWxpZGF0ZTogJ3ByZXNlbmNlJyxcbiAgICAgICAgICAgIGVycm9yTWVzc2FnZTogdGhpcy5jb250ZXh0LnJldmlld1JhdGluZyxcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgc2VsZWN0b3I6ICdbbmFtZT1cInJldnRpdGxlXCJdJyxcbiAgICAgICAgICAgIHZhbGlkYXRlOiAncHJlc2VuY2UnLFxuICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiB0aGlzLmNvbnRleHQucmV2aWV3U3ViamVjdCxcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgc2VsZWN0b3I6ICdbbmFtZT1cInJldnRleHRcIl0nLFxuICAgICAgICAgICAgdmFsaWRhdGU6ICdwcmVzZW5jZScsXG4gICAgICAgICAgICBlcnJvck1lc3NhZ2U6IHRoaXMuY29udGV4dC5yZXZpZXdDb21tZW50LFxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBzZWxlY3RvcjogJy53cml0ZVJldmlldy1mb3JtIFtuYW1lPVwiZW1haWxcIl0nLFxuICAgICAgICAgICAgdmFsaWRhdGU6IChjYiwgdmFsKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gZm9ybXMuZW1haWwodmFsKTtcbiAgICAgICAgICAgICAgICBjYihyZXN1bHQpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yTWVzc2FnZTogdGhpcy5jb250ZXh0LnJldmlld0VtYWlsLFxuICAgICAgICB9XSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMudmFsaWRhdG9yO1xuICAgIH1cblxuICAgIHZhbGlkYXRlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy52YWxpZGF0b3IucGVyZm9ybUNoZWNrKCk7XG4gICAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIFZpZGVvR2FsbGVyeSB7XG4gICAgY29uc3RydWN0b3IoJGVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy4kcGxheWVyID0gJGVsZW1lbnQuZmluZCgnW2RhdGEtdmlkZW8tcGxheWVyXScpO1xuICAgICAgICB0aGlzLiR2aWRlb3MgPSAkZWxlbWVudC5maW5kKCdbZGF0YS12aWRlby1pdGVtXScpO1xuICAgICAgICB0aGlzLmN1cnJlbnRWaWRlbyA9IHt9O1xuICAgICAgICB0aGlzLmJpbmRFdmVudHMoKTtcbiAgICB9XG5cbiAgICBzZWxlY3ROZXdWaWRlbyhlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBjb25zdCAkdGFyZ2V0ID0gJChlLmN1cnJlbnRUYXJnZXQpO1xuXG4gICAgICAgIHRoaXMuY3VycmVudFZpZGVvID0ge1xuICAgICAgICAgICAgaWQ6ICR0YXJnZXQuZGF0YSgndmlkZW9JZCcpLFxuICAgICAgICAgICAgJHNlbGVjdGVkVGh1bWI6ICR0YXJnZXQsXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5zZXRNYWluVmlkZW8oKTtcbiAgICAgICAgdGhpcy5zZXRBY3RpdmVUaHVtYigpO1xuICAgIH1cblxuICAgIHNldE1haW5WaWRlbygpIHtcbiAgICAgICAgdGhpcy4kcGxheWVyLmF0dHIoJ3NyYycsIGAvL3d3dy55b3V0dWJlLmNvbS9lbWJlZC8ke3RoaXMuY3VycmVudFZpZGVvLmlkfWApO1xuICAgIH1cblxuICAgIHNldEFjdGl2ZVRodW1iKCkge1xuICAgICAgICB0aGlzLiR2aWRlb3MucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICB0aGlzLmN1cnJlbnRWaWRlby4kc2VsZWN0ZWRUaHVtYi5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgfVxuXG4gICAgYmluZEV2ZW50cygpIHtcbiAgICAgICAgdGhpcy4kdmlkZW9zLm9uKCdjbGljaycsIHRoaXMuc2VsZWN0TmV3VmlkZW8uYmluZCh0aGlzKSk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB2aWRlb0dhbGxlcnkoKSB7XG4gICAgY29uc3QgcGx1Z2luS2V5ID0gJ3ZpZGVvLWdhbGxlcnknO1xuICAgIGNvbnN0ICR2aWRlb0dhbGxlcnkgPSAkKGBbZGF0YS0ke3BsdWdpbktleX1dYCk7XG5cbiAgICAkdmlkZW9HYWxsZXJ5LmVhY2goKGluZGV4LCBlbGVtZW50KSA9PiB7XG4gICAgICAgIGNvbnN0ICRlbCA9ICQoZWxlbWVudCk7XG4gICAgICAgIGNvbnN0IGlzSW5pdGlhbGl6ZWQgPSAkZWwuZGF0YShwbHVnaW5LZXkpIGluc3RhbmNlb2YgVmlkZW9HYWxsZXJ5O1xuXG4gICAgICAgIGlmIChpc0luaXRpYWxpemVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAkZWwuZGF0YShwbHVnaW5LZXksIG5ldyBWaWRlb0dhbGxlcnkoJGVsKSk7XG4gICAgfSk7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9