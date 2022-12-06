(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[16],{

/***/ "./assets/js/theme/search.js":
/*!***********************************!*\
  !*** ./assets/js/theme/search.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Search; });
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _catalog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./catalog */ "./assets/js/theme/catalog.js");
/* harmony import */ var _common_faceted_search__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./common/faceted-search */ "./assets/js/theme/common/faceted-search.js");
/* harmony import */ var _global_compare_products__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./global/compare-products */ "./assets/js/theme/global/compare-products.js");
/* harmony import */ var _common_url_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./common/url-utils */ "./assets/js/theme/common/url-utils.js");
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! url */ "./node_modules/url/url.js");
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(url__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _common_collapsible__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./common/collapsible */ "./assets/js/theme/common/collapsible.js");
/* harmony import */ var jstree__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! jstree */ "./node_modules/jstree/dist/jstree.min.js");
/* harmony import */ var jstree__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(jstree__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _common_nod__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./common/nod */ "./assets/js/theme/common/nod.js");
/* harmony import */ var _halothemes_haloProductDisplayMode__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./halothemes/haloProductDisplayMode */ "./assets/js/theme/halothemes/haloProductDisplayMode.js");
/* harmony import */ var _halothemes_haloSideAllCategory__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./halothemes/haloSideAllCategory */ "./assets/js/theme/halothemes/haloSideAllCategory.js");
/* harmony import */ var _halothemes_haloAddOptionForProductCard__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./halothemes/haloAddOptionForProductCard */ "./assets/js/theme/halothemes/haloAddOptionForProductCard.js");
/* harmony import */ var _halothemes_haloStickyToolbar__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./halothemes/haloStickyToolbar */ "./assets/js/theme/halothemes/haloStickyToolbar.js");
function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }













var Search = /*#__PURE__*/function (_CatalogPage) {
  _inheritsLoose(Search, _CatalogPage);
  function Search() {
    return _CatalogPage.apply(this, arguments) || this;
  }
  var _proto = Search.prototype;
  _proto.formatCategoryTreeForJSTree = function formatCategoryTreeForJSTree(node) {
    var _this = this;
    var nodeData = {
      text: node.data,
      id: node.metadata.id,
      state: {
        selected: node.selected
      }
    };
    if (node.state) {
      nodeData.state.opened = node.state === 'open';
      nodeData.children = true;
    }
    if (node.children) {
      nodeData.children = [];
      node.children.forEach(function (childNode) {
        nodeData.children.push(_this.formatCategoryTreeForJSTree(childNode));
      });
    }
    return nodeData;
  };
  _proto.showProducts = function showProducts(navigate) {
    if (navigate === void 0) {
      navigate = true;
    }
    this.$productListingContainer.removeClass('u-hiddenVisually');
    this.$facetedSearchContainer.removeClass('u-hiddenVisually');
    this.$contentResultsContainer.addClass('u-hiddenVisually');
    $('[data-content-results-toggle]').removeClass('navBar-action-color--active');
    $('[data-content-results-toggle]').addClass('navBar-action');
    $('[data-product-results-toggle]').removeClass('navBar-action');
    $('[data-product-results-toggle]').addClass('navBar-action-color--active');
    if (!navigate) {
      return;
    }
    var searchData = $('#search-results-product-count span').data();
    var url = searchData.count > 0 ? searchData.url : _common_url_utils__WEBPACK_IMPORTED_MODULE_4__["default"].replaceParams(searchData.url, {
      page: 1
    });
    _common_url_utils__WEBPACK_IMPORTED_MODULE_4__["default"].goToUrl(url);
  };
  _proto.showContent = function showContent(navigate) {
    if (navigate === void 0) {
      navigate = true;
    }
    this.$contentResultsContainer.removeClass('u-hiddenVisually');
    this.$productListingContainer.addClass('u-hiddenVisually');
    this.$facetedSearchContainer.addClass('u-hiddenVisually');
    $('[data-product-results-toggle]').removeClass('navBar-action-color--active');
    $('[data-product-results-toggle]').addClass('navBar-action');
    $('[data-content-results-toggle]').removeClass('navBar-action');
    $('[data-content-results-toggle]').addClass('navBar-action-color--active');
    if (!navigate) {
      return;
    }
    var searchData = $('#search-results-content-count span').data();
    var url = searchData.count > 0 ? searchData.url : _common_url_utils__WEBPACK_IMPORTED_MODULE_4__["default"].replaceParams(searchData.url, {
      page: 1
    });
    _common_url_utils__WEBPACK_IMPORTED_MODULE_4__["default"].goToUrl(url);
  };
  _proto.onReady = function onReady() {
    var _this2 = this;
    Object(_global_compare_products__WEBPACK_IMPORTED_MODULE_3__["default"])(this.context.urls);
    var $searchForm = $('[data-advanced-search-form]');
    var $categoryTreeContainer = $searchForm.find('[data-search-category-tree]');
    var url = url__WEBPACK_IMPORTED_MODULE_5___default.a.parse(window.location.href, true);
    var treeData = [];
    this.$productListingContainer = $('#product-listing-container');
    this.$facetedSearchContainer = $('#faceted-search-container');
    this.$contentResultsContainer = $('#search-results-content');

    // Init faceted search
    if ($('#facetedSearch').length > 0) {
      this.initFacetedSearch();
    } else {
      this.onSortBySubmit = this.onSortBySubmit.bind(this);
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["hooks"].on('sortBy-submitted', this.onSortBySubmit);
    }

    // Init collapsibles
    Object(_common_collapsible__WEBPACK_IMPORTED_MODULE_6__["default"])();
    $('[data-product-results-toggle]').on('click', function (event) {
      event.preventDefault();
      _this2.showProducts();
    });
    $('[data-content-results-toggle]').on('click', function (event) {
      event.preventDefault();
      _this2.showContent();
    });
    if (this.$productListingContainer.find('li.product').length === 0 || url.query.section === 'content') {
      this.showContent(false);
    } else {
      this.showProducts(false);
    }
    var validator = this.initValidation($searchForm).bindValidation($searchForm.find('#search_query_adv'));
    this.context.categoryTree.forEach(function (node) {
      treeData.push(_this2.formatCategoryTreeForJSTree(node));
    });
    this.categoryTreeData = treeData;
    this.createCategoryTree($categoryTreeContainer);
    $searchForm.on('submit', function (event) {
      var selectedCategoryIds = $categoryTreeContainer.jstree().get_selected();
      if (!validator.check()) {
        return event.preventDefault();
      }
      $searchForm.find('input[name="category\[\]"]').remove();
      for (var _iterator = _createForOfIteratorHelperLoose(selectedCategoryIds), _step; !(_step = _iterator()).done;) {
        var categoryId = _step.value;
        var input = $('<input>', {
          type: 'hidden',
          name: 'category[]',
          value: categoryId
        });
        $searchForm.append(input);
      }
    });
    this.showProductsPerPage();
    this.showMoreProducts();
    this.showItem();
    this.loadOptionForProductCard(this.context);
    this.fancyboxVideoBanner();
    Object(_halothemes_haloSideAllCategory__WEBPACK_IMPORTED_MODULE_10__["default"])();
    Object(_halothemes_haloProductDisplayMode__WEBPACK_IMPORTED_MODULE_9__["default"])();
    Object(_halothemes_haloStickyToolbar__WEBPACK_IMPORTED_MODULE_12__["default"])(this.context);
    this.reviewShow();
  };
  _proto.reviewShow = function reviewShow() {
    var limit = document.querySelectorAll('.productSku1');
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
        // console.log(item.innerHTML)
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

        // console.log(reviewAvg)
        // console.log()
        $(item1.nextElementSibling).append("\n                <style>    .checked {\n                    color: rgb(255, 210, 0);\n            \n            }\n            .fa-star-o {\n                color: rgb(255, 210, 0);\n        \n            }\n            @media (min-width: 768px) {\n                .checking {\n                    display: flex;\n                    gap:5px;\n                }\n            }\n            @media (min-width: 1025px) {\n                .checking {\n                    display: unset;\n                }\n            }\n            @media (min-width: 1425px) {\n                .checking {\n                    display: flex;\n                }\n            }\n            </style>\n<link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css\">\n                \n                <span>\n                <span class=\"fa fa-star" + (0.5 <= reviewAvg ? ' checked' : ' fa-star-o') + "\"></span>\n                <span class=\"fa fa-star" + (1.5 <= reviewAvg ? ' checked' : ' fa-star-o') + "\"></span>\n                <span class=\"fa fa-star" + (2.5 <= reviewAvg ? ' checked' : ' fa-star-o') + "\"></span>\n                <span class=\"fa fa-star" + (3.5 <= reviewAvg ? ' checked' : ' fa-star-o') + "\"></span>\n                <span class=\"fa fa-star" + (4.5 <= reviewAvg ? ' checked' : ' fa-star-o') + ("\"></span>      \n            </span>\n            <div>\n                " + review3.length + " Rese\xF1as\n            </div>"));
        // $(item1.nextElementSibling).append(`<div>${reviewAvg}</div>`)
      });
      //   console.log(review2)
    }).catch(function (err) {
      console.log(err);
    });
  };
  _proto.loadTreeNodes = function loadTreeNodes(node, cb) {
    var _this3 = this;
    $.ajax({
      url: '/remote/v1/category-tree',
      data: {
        selectedCategoryId: node.id,
        prefix: 'category'
      },
      headers: {
        'x-xsrf-token': window.BCData && window.BCData.csrf_token ? window.BCData.csrf_token : ''
      }
    }).done(function (data) {
      var formattedResults = [];
      data.forEach(function (dataNode) {
        formattedResults.push(_this3.formatCategoryTreeForJSTree(dataNode));
      });
      cb(formattedResults);
    });
  };
  _proto.createCategoryTree = function createCategoryTree($container) {
    var _this4 = this;
    var treeOptions = {
      core: {
        data: function data(node, cb) {
          // Root node
          if (node.id === '#') {
            cb(_this4.categoryTreeData);
          } else {
            // Lazy loaded children
            _this4.loadTreeNodes(node, cb);
          }
        },
        themes: {
          icons: true
        }
      },
      checkbox: {
        three_state: false
      },
      plugins: ['checkbox']
    };
    $container.jstree(treeOptions);
  };
  _proto.initFacetedSearch = function initFacetedSearch() {
    var _this5 = this;
    var $productListingContainer = $('#product-listing-container .productListing');
    var $contentListingContainer = $('#search-results-content');
    var $facetedSearchContainer = $('#faceted-search-container');
    var $searchHeading = $('#search-results-heading');
    var $searchCount = $('#search-results-product-count');
    var $contentCount = $('#search-results-content-count');
    var $paginatorContainer = $('.pagination');
    var $showMoreContainer = $('.halo-product-show-more');
    var productsPerPage = this.context.searchProductsPerPage;
    var requestOptions = {
      template: {
        productListing: 'halothemes/gallery/halo-product-listing',
        contentListing: 'search/content-listing',
        sidebar: 'search/sidebar',
        heading: 'search/heading',
        productCount: 'search/product-count',
        contentCount: 'search/content-count',
        paginator: 'halothemes/gallery/halo-product-paginator'
      },
      config: {
        product_results: {
          limit: productsPerPage
        }
      },
      showMore: 'search/show-more'
    };
    this.facetedSearch = new _common_faceted_search__WEBPACK_IMPORTED_MODULE_2__["default"](requestOptions, function (content) {
      $searchHeading.html(content.heading);
      var url = url__WEBPACK_IMPORTED_MODULE_5___default.a.parse(window.location.href, true);
      if (url.query.section === 'content') {
        $contentListingContainer.html(content.contentListing);
        $contentCount.html(content.contentCount);
        _this5.showContent(false);
      } else {
        $productListingContainer.html(content.productListing);
        $facetedSearchContainer.html(content.sidebar);
        $searchCount.html(content.productCount);
        $paginatorContainer.html($(content.paginator).find('.pagination').children());
        $showMoreContainer.html($(content.paginator).find('.halo-product-show-more').children());
        _this5.showProducts(false);
        _this5.showProductsPerPage();
        _this5.showItem();
        _this5.showMoreProducts();
        if ($('#product-listing-container .product').length > 0) {
          Object(_halothemes_haloAddOptionForProductCard__WEBPACK_IMPORTED_MODULE_11__["default"])(_this5.context, 'product-listing-container');
        }
      }
      $('body').triggerHandler('compareReset');
      $('html, body').animate({
        scrollTop: 0
      }, 100);
    });
  };
  _proto.initValidation = function initValidation($form) {
    this.$form = $form;
    this.validator = Object(_common_nod__WEBPACK_IMPORTED_MODULE_8__["default"])({
      submit: $form
    });
    return this;
  };
  _proto.bindValidation = function bindValidation($element) {
    if (this.validator) {
      this.validator.add({
        selector: $element,
        validate: 'presence',
        errorMessage: $element.data('errorMessage')
      });
    }
    return this;
  };
  _proto.check = function check() {
    if (this.validator) {
      this.validator.performCheck();
      return this.validator.areAll('valid');
    }
    return false;
  };
  _proto.showProductsPerPage = function showProductsPerPage() {
    this.reviewShow();
    try {
      var url = new URL(window.location.href);
      var c = url.searchParams.get("limit");
      if (c != null) {
        var limit = document.querySelectorAll('select#limit option');
        Array.prototype.forEach.call(limit, function (element) {
          if (element.value == c) {
            element.selected = true;
          }
        });
      }
    } catch (e) {}
  };
  _proto.showMoreProducts = function showMoreProducts() {
    var context = this.context;
    var getUrlParameter = this.getUrlParameter('limit');
    $('#listing-showmoreBtn > a').on('click', function (event) {
      event.preventDefault();
      var nextPage = $(".pagination-item--current").next(),
        link = nextPage.find("a").attr("href");
      $('#listing-showmoreBtn > a').addClass('loading');
      $.ajax({
        type: 'get',
        url: link.replace("http://", "//"),
        success: function success(data) {
          function reviewShow() {
            var limit = document.querySelectorAll('.productSku1');
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
                // console.log(item.innerHTML)
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

                // console.log(reviewAvg)
                // console.log()
                $(item1.nextElementSibling).append("\n                                <style>    .checked {\n                                    color: rgb(255, 210, 0);\n                            \n                            }\n                            .fa-star-o {\n                                color: rgb(255, 210, 0);\n                        \n                            }\n                            @media (min-width: 768px) {\n                                .checking {\n                                    display: flex;\n                                    gap:5px;\n                                }\n                            }\n                            @media (min-width: 1025px) {\n                                .checking {\n                                    display: unset;\n                                }\n                            }\n                            @media (min-width: 1425px) {\n                                .checking {\n                                    display: flex;\n                                }\n                            }\n                            </style>\n                <link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css\">\n                                \n                                <span>\n                                <span class=\"fa fa-star" + (0.5 <= reviewAvg ? ' checked' : ' fa-star-o') + "\"></span>\n                                <span class=\"fa fa-star" + (1.5 <= reviewAvg ? ' checked' : ' fa-star-o') + "\"></span>\n                                <span class=\"fa fa-star" + (2.5 <= reviewAvg ? ' checked' : ' fa-star-o') + "\"></span>\n                                <span class=\"fa fa-star" + (3.5 <= reviewAvg ? ' checked' : ' fa-star-o') + "\"></span>\n                                <span class=\"fa fa-star" + (4.5 <= reviewAvg ? ' checked' : ' fa-star-o') + ("\"></span>      \n                            </span>\n                            <div>\n                                " + review3.length + " Rese\xF1as\n                            </div>"));
                // $(item1.nextElementSibling).append(`<div>${reviewAvg}</div>`)
              });
              //   console.log(review2)
            }).catch(function (err) {
              console.log(err);
            });
          }
          if ($(data).find('#product-listing-container .productListing').length > 0) {
            $('#product-listing-container .productListing').append($(data).find('#product-listing-container .productListing').children());
            reviewShow();
            $('.pagination-list').html($(data).find(".pagination-list").html());
            $('#listing-showmoreBtn > a').removeClass('loading').blur();
            nextPage = $(".pagination-item--current").next();
            if (nextPage.length === 0) {
              $('#listing-showmoreBtn > a').addClass('disable').text('No more products');
              $('.pagination .pagination-info .end').text($('.pagination-info .total').text());
            } else {
              var limit = getUrlParameter,
                productPerPage,
                pageCurrent = parseInt($(".pagination-item--current > a").text());
              if (limit !== undefined) {
                productPerPage = limit;
              } else {
                productPerPage = context.searchProductsPerPage;
              }
              $('.pagination .pagination-info .end').text(parseInt(productPerPage) * pageCurrent);
            }
            if ($(data).find('#product-listing-container .product').length > 0) {
              Object(_halothemes_haloAddOptionForProductCard__WEBPACK_IMPORTED_MODULE_11__["default"])(context, 'product-listing-container');
            }
          }
        }
      });
    });
  };
  _proto.showItem = function showItem() {
    var total = parseInt($('.pagination-info .total').text()),
      limit = this.getUrlParameter('limit'),
      productPerPage;
    if (limit !== undefined) {
      productPerPage = limit;
    } else {
      productPerPage = this.context.searchProductsPerPage;
    }
    var start = 1,
      end = total,
      checkLastPage = false,
      lastPage = 1;
    var checkLink = $(".pagination-list .pagination-item--current").next();
    var pageNotLast = lastPage - 1;
    var totalNotLast = pageNotLast * productPerPage;
    var productsLastPage = total - totalNotLast;
    var currentPage = parseInt($('.pagination-item--current > a').text());
    var prevPage = currentPage - 1;
    if (checkLink.length === 0) {
      lastPage = parseInt($(".pagination-item--current").find("a").text());
      checkLastPage = true;
    } else {
      lastPage = parseInt(checkLink.find("a").text());
      checkLastPage = false;
    }
    if (total <= productPerPage) {
      $('.pagination-info .start').text(start);
      $('.pagination-info .end').text(end);
    } else {
      if (currentPage <= 1) {
        end = productPerPage;
      } else {
        start = prevPage * productPerPage + 1;
        if (checkLastPage = true) {
          if ($('.pagination-list .pagination-item--next').length > 0) {
            end = totalNotLast + productsLastPage - 1;
          } else {
            end = totalNotLast + productsLastPage;
          }
        } else {
          end = currentPage * productPerPage;
        }
      }
      $('.pagination-info .start').text(start);
      $('.pagination-info .end').text(end);
    }
  };
  _proto.fancyboxVideoBanner = function fancyboxVideoBanner() {
    if ($(".video-block-image[data-fancybox]").length) {
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
    if ($(".button-popup-video[data-fancybox]").length) {
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
  _proto.getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
      sURLVariables = sPageURL.split('&'),
      sParameterName,
      i;
    for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split('=');
      if (sParameterName[0] === sParam) {
        return sParameterName[1] === undefined ? true : sParameterName[1];
      }
    }
  };
  _proto.loadOptionForProductCard = function loadOptionForProductCard(context) {
    if ($('#featured-products .card').length > 0) {
      Object(_halothemes_haloAddOptionForProductCard__WEBPACK_IMPORTED_MODULE_11__["default"])(context, 'featured-products');
    }
    if ($('#product-listing-container .product').length > 0) {
      Object(_halothemes_haloAddOptionForProductCard__WEBPACK_IMPORTED_MODULE_11__["default"])(context, 'product-listing-container');
    }
  };
  return Search;
}(_catalog__WEBPACK_IMPORTED_MODULE_1__["default"]);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvc2VhcmNoLmpzIl0sIm5hbWVzIjpbIlNlYXJjaCIsImZvcm1hdENhdGVnb3J5VHJlZUZvckpTVHJlZSIsIm5vZGUiLCJub2RlRGF0YSIsInRleHQiLCJkYXRhIiwiaWQiLCJtZXRhZGF0YSIsInN0YXRlIiwic2VsZWN0ZWQiLCJvcGVuZWQiLCJjaGlsZHJlbiIsImZvckVhY2giLCJjaGlsZE5vZGUiLCJwdXNoIiwic2hvd1Byb2R1Y3RzIiwibmF2aWdhdGUiLCIkcHJvZHVjdExpc3RpbmdDb250YWluZXIiLCJyZW1vdmVDbGFzcyIsIiRmYWNldGVkU2VhcmNoQ29udGFpbmVyIiwiJGNvbnRlbnRSZXN1bHRzQ29udGFpbmVyIiwiYWRkQ2xhc3MiLCIkIiwic2VhcmNoRGF0YSIsInVybCIsImNvdW50IiwidXJsVXRpbHMiLCJyZXBsYWNlUGFyYW1zIiwicGFnZSIsImdvVG9VcmwiLCJzaG93Q29udGVudCIsIm9uUmVhZHkiLCJjb21wYXJlUHJvZHVjdHMiLCJjb250ZXh0IiwidXJscyIsIiRzZWFyY2hGb3JtIiwiJGNhdGVnb3J5VHJlZUNvbnRhaW5lciIsImZpbmQiLCJVcmwiLCJwYXJzZSIsIndpbmRvdyIsImxvY2F0aW9uIiwiaHJlZiIsInRyZWVEYXRhIiwibGVuZ3RoIiwiaW5pdEZhY2V0ZWRTZWFyY2giLCJvblNvcnRCeVN1Ym1pdCIsImJpbmQiLCJob29rcyIsIm9uIiwiY29sbGFwc2libGVGYWN0b3J5IiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsInF1ZXJ5Iiwic2VjdGlvbiIsInZhbGlkYXRvciIsImluaXRWYWxpZGF0aW9uIiwiYmluZFZhbGlkYXRpb24iLCJjYXRlZ29yeVRyZWUiLCJjYXRlZ29yeVRyZWVEYXRhIiwiY3JlYXRlQ2F0ZWdvcnlUcmVlIiwic2VsZWN0ZWRDYXRlZ29yeUlkcyIsImpzdHJlZSIsImdldF9zZWxlY3RlZCIsImNoZWNrIiwicmVtb3ZlIiwiY2F0ZWdvcnlJZCIsImlucHV0IiwidHlwZSIsIm5hbWUiLCJ2YWx1ZSIsImFwcGVuZCIsInNob3dQcm9kdWN0c1BlclBhZ2UiLCJzaG93TW9yZVByb2R1Y3RzIiwic2hvd0l0ZW0iLCJsb2FkT3B0aW9uRm9yUHJvZHVjdENhcmQiLCJmYW5jeWJveFZpZGVvQmFubmVyIiwiaGFsb1NpZGVBbGxDYXRlZ29yeSIsInByb2R1Y3REaXNwbGF5TW9kZSIsImhhbG9TdGlja3lUb29sYmFyIiwicmV2aWV3U2hvdyIsImxpbWl0IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwicmV2aWV3MiIsIlByb21pc2UiLCJhbGwiLCJmZXRjaCIsInRoZW4iLCJyIiwianNvbiIsIml0ZW0xIiwibmV4dEVsZW1lbnRTaWJsaW5nIiwiZW1wdHkiLCJpbm5lckhUTUwiLCJyZXZpZXczIiwiZmlsdGVyZWRBciIsImZpbHRlciIsIml0ZW0iLCJyZXYiLCJyZXZpZXdBdmciLCJNYXRoIiwicm91bmQiLCJyZWR1Y2UiLCJhIiwiYiIsImNhdGNoIiwiZXJyIiwiY29uc29sZSIsImxvZyIsImxvYWRUcmVlTm9kZXMiLCJjYiIsImFqYXgiLCJzZWxlY3RlZENhdGVnb3J5SWQiLCJwcmVmaXgiLCJoZWFkZXJzIiwiQkNEYXRhIiwiY3NyZl90b2tlbiIsImRvbmUiLCJmb3JtYXR0ZWRSZXN1bHRzIiwiZGF0YU5vZGUiLCIkY29udGFpbmVyIiwidHJlZU9wdGlvbnMiLCJjb3JlIiwidGhlbWVzIiwiaWNvbnMiLCJjaGVja2JveCIsInRocmVlX3N0YXRlIiwicGx1Z2lucyIsIiRjb250ZW50TGlzdGluZ0NvbnRhaW5lciIsIiRzZWFyY2hIZWFkaW5nIiwiJHNlYXJjaENvdW50IiwiJGNvbnRlbnRDb3VudCIsIiRwYWdpbmF0b3JDb250YWluZXIiLCIkc2hvd01vcmVDb250YWluZXIiLCJwcm9kdWN0c1BlclBhZ2UiLCJzZWFyY2hQcm9kdWN0c1BlclBhZ2UiLCJyZXF1ZXN0T3B0aW9ucyIsInRlbXBsYXRlIiwicHJvZHVjdExpc3RpbmciLCJjb250ZW50TGlzdGluZyIsInNpZGViYXIiLCJoZWFkaW5nIiwicHJvZHVjdENvdW50IiwiY29udGVudENvdW50IiwicGFnaW5hdG9yIiwiY29uZmlnIiwicHJvZHVjdF9yZXN1bHRzIiwic2hvd01vcmUiLCJmYWNldGVkU2VhcmNoIiwiRmFjZXRlZFNlYXJjaCIsImNvbnRlbnQiLCJodG1sIiwiaGFsb0FkZE9wdGlvbkZvclByb2R1Y3QiLCJ0cmlnZ2VySGFuZGxlciIsImFuaW1hdGUiLCJzY3JvbGxUb3AiLCIkZm9ybSIsIm5vZCIsInN1Ym1pdCIsIiRlbGVtZW50IiwiYWRkIiwic2VsZWN0b3IiLCJ2YWxpZGF0ZSIsImVycm9yTWVzc2FnZSIsInBlcmZvcm1DaGVjayIsImFyZUFsbCIsIlVSTCIsImMiLCJzZWFyY2hQYXJhbXMiLCJnZXQiLCJBcnJheSIsInByb3RvdHlwZSIsImNhbGwiLCJlbGVtZW50IiwiZSIsImdldFVybFBhcmFtZXRlciIsIm5leHRQYWdlIiwibmV4dCIsImxpbmsiLCJhdHRyIiwicmVwbGFjZSIsInN1Y2Nlc3MiLCJibHVyIiwicHJvZHVjdFBlclBhZ2UiLCJwYWdlQ3VycmVudCIsInBhcnNlSW50IiwidW5kZWZpbmVkIiwidG90YWwiLCJzdGFydCIsImVuZCIsImNoZWNrTGFzdFBhZ2UiLCJsYXN0UGFnZSIsImNoZWNrTGluayIsInBhZ2VOb3RMYXN0IiwidG90YWxOb3RMYXN0IiwicHJvZHVjdHNMYXN0UGFnZSIsImN1cnJlbnRQYWdlIiwicHJldlBhZ2UiLCJmYW5jeWJveCIsInNQYXJhbSIsInNQYWdlVVJMIiwiZGVjb2RlVVJJQ29tcG9uZW50Iiwic2VhcmNoIiwic3Vic3RyaW5nIiwic1VSTFZhcmlhYmxlcyIsInNwbGl0Iiwic1BhcmFtZXRlck5hbWUiLCJpIiwiQ2F0YWxvZ1BhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQW1EO0FBQ2Y7QUFDZ0I7QUFDSTtBQUNkO0FBQ3BCO0FBQ2dDO0FBQ3RDO0FBQ2U7QUFDc0M7QUFDRjtB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QSxJQUFHWCxDQUFDLENBQUMscUNBQXFDLENBQUMsQ0FBQ3NCLE1BQU0sR0FBRyxDQUFDLEVBQUM7TUFDbkQ2Ryx3RkFBdUIsQ0FBQ3hILE9BQU8sRUFBRSwyQkFBMkIsQ0FBQztJQUNqRTtFQUNKLENBQUM7RUFBQTtBQUFBLEVBOW5CK0JnTCxnREFBVyIsImZpbGUiOiJ0aGVtZS1idW5kbGUuY2h1bmsuMTYuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBob29rcyB9IGZyb20gJ0BiaWdjb21tZXJjZS9zdGVuY2lsLXV0aWxzJztcclxuaW1wb3J0IENhdGFsb2dQYWdlIGZyb20gJy4vY2F0YWxvZyc7XHJcbmltcG9ydCBGYWNldGVkU2VhcmNoIGZyb20gJy4vY29tbW9uL2ZhY2V0ZWQtc2VhcmNoJztcclxuaW1wb3J0IGNvbXBhcmVQcm9kdWN0cyBmcm9tICcuL2dsb2JhbC9jb21wYXJlLXByb2R1Y3RzJztcclxuaW1wb3J0IHVybFV0aWxzIGZyb20gJy4vY29tbW9uL3VybC11dGlscyc7XHJcbmltcG9ydCBVcmwgZnJvbSAndXJsJztcclxuaW1wb3J0IGNvbGxhcHNpYmxlRmFjdG9yeSBmcm9tICcuL2NvbW1vbi9jb2xsYXBzaWJsZSc7XHJcbmltcG9ydCAnanN0cmVlJztcclxuaW1wb3J0IG5vZCBmcm9tICcuL2NvbW1vbi9ub2QnO1xyXG5pbXBvcnQgcHJvZHVjdERpc3BsYXlNb2RlIGZyb20gJy4vaGFsb3RoZW1lcy9oYWxvUHJvZHVjdERpc3BsYXlNb2RlJztcclxuaW1wb3J0IGhhbG9TaWRlQWxsQ2F0ZWdvcnkgZnJvbSAnLi9oYWxvdGhlbWVzL2hhbG9TaWRlQWxsQ2F0ZWdvcnknO1xyXG5pbXBvcnQgaGFsb0FkZE9wdGlvbkZvclByb2R1Y3QgZnJvbSAnLi9oYWxvdGhlbWVzL2hhbG9BZGRPcHRpb25Gb3JQcm9kdWN0Q2FyZCc7XHJcbmltcG9ydCBoYWxvU3RpY2t5VG9vbGJhciBmcm9tICcuL2hhbG90aGVtZXMvaGFsb1N0aWNreVRvb2xiYXInO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VhcmNoIGV4dGVuZHMgQ2F0YWxvZ1BhZ2Uge1xyXG4gICAgZm9ybWF0Q2F0ZWdvcnlUcmVlRm9ySlNUcmVlKG5vZGUpIHtcclxuICAgICAgICBjb25zdCBub2RlRGF0YSA9IHtcclxuICAgICAgICAgICAgdGV4dDogbm9kZS5kYXRhLFxyXG4gICAgICAgICAgICBpZDogbm9kZS5tZXRhZGF0YS5pZCxcclxuICAgICAgICAgICAgc3RhdGU6IHtcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkOiBub2RlLnNlbGVjdGVkLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGlmIChub2RlLnN0YXRlKSB7XHJcbiAgICAgICAgICAgIG5vZGVEYXRhLnN0YXRlLm9wZW5lZCA9IG5vZGUuc3RhdGUgPT09ICdvcGVuJztcclxuICAgICAgICAgICAgbm9kZURhdGEuY2hpbGRyZW4gPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG5vZGUuY2hpbGRyZW4pIHtcclxuICAgICAgICAgICAgbm9kZURhdGEuY2hpbGRyZW4gPSBbXTtcclxuICAgICAgICAgICAgbm9kZS5jaGlsZHJlbi5mb3JFYWNoKChjaGlsZE5vZGUpID0+IHtcclxuICAgICAgICAgICAgICAgIG5vZGVEYXRhLmNoaWxkcmVuLnB1c2godGhpcy5mb3JtYXRDYXRlZ29yeVRyZWVGb3JKU1RyZWUoY2hpbGROb2RlKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG5vZGVEYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3dQcm9kdWN0cyhuYXZpZ2F0ZSA9IHRydWUpIHtcclxuICAgICAgICB0aGlzLiRwcm9kdWN0TGlzdGluZ0NvbnRhaW5lci5yZW1vdmVDbGFzcygndS1oaWRkZW5WaXN1YWxseScpO1xyXG4gICAgICAgIHRoaXMuJGZhY2V0ZWRTZWFyY2hDb250YWluZXIucmVtb3ZlQ2xhc3MoJ3UtaGlkZGVuVmlzdWFsbHknKTtcclxuICAgICAgICB0aGlzLiRjb250ZW50UmVzdWx0c0NvbnRhaW5lci5hZGRDbGFzcygndS1oaWRkZW5WaXN1YWxseScpO1xyXG5cclxuICAgICAgICAkKCdbZGF0YS1jb250ZW50LXJlc3VsdHMtdG9nZ2xlXScpLnJlbW92ZUNsYXNzKCduYXZCYXItYWN0aW9uLWNvbG9yLS1hY3RpdmUnKTtcclxuICAgICAgICAkKCdbZGF0YS1jb250ZW50LXJlc3VsdHMtdG9nZ2xlXScpLmFkZENsYXNzKCduYXZCYXItYWN0aW9uJyk7XHJcblxyXG4gICAgICAgICQoJ1tkYXRhLXByb2R1Y3QtcmVzdWx0cy10b2dnbGVdJykucmVtb3ZlQ2xhc3MoJ25hdkJhci1hY3Rpb24nKTtcclxuICAgICAgICAkKCdbZGF0YS1wcm9kdWN0LXJlc3VsdHMtdG9nZ2xlXScpLmFkZENsYXNzKCduYXZCYXItYWN0aW9uLWNvbG9yLS1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgaWYgKCFuYXZpZ2F0ZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBzZWFyY2hEYXRhID0gJCgnI3NlYXJjaC1yZXN1bHRzLXByb2R1Y3QtY291bnQgc3BhbicpLmRhdGEoKTtcclxuICAgICAgICBjb25zdCB1cmwgPSAoc2VhcmNoRGF0YS5jb3VudCA+IDApID8gc2VhcmNoRGF0YS51cmwgOiB1cmxVdGlscy5yZXBsYWNlUGFyYW1zKHNlYXJjaERhdGEudXJsLCB7XHJcbiAgICAgICAgICAgIHBhZ2U6IDEsXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHVybFV0aWxzLmdvVG9VcmwodXJsKTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93Q29udGVudChuYXZpZ2F0ZSA9IHRydWUpIHtcclxuICAgICAgICB0aGlzLiRjb250ZW50UmVzdWx0c0NvbnRhaW5lci5yZW1vdmVDbGFzcygndS1oaWRkZW5WaXN1YWxseScpO1xyXG4gICAgICAgIHRoaXMuJHByb2R1Y3RMaXN0aW5nQ29udGFpbmVyLmFkZENsYXNzKCd1LWhpZGRlblZpc3VhbGx5Jyk7XHJcbiAgICAgICAgdGhpcy4kZmFjZXRlZFNlYXJjaENvbnRhaW5lci5hZGRDbGFzcygndS1oaWRkZW5WaXN1YWxseScpO1xyXG5cclxuICAgICAgICAkKCdbZGF0YS1wcm9kdWN0LXJlc3VsdHMtdG9nZ2xlXScpLnJlbW92ZUNsYXNzKCduYXZCYXItYWN0aW9uLWNvbG9yLS1hY3RpdmUnKTtcclxuICAgICAgICAkKCdbZGF0YS1wcm9kdWN0LXJlc3VsdHMtdG9nZ2xlXScpLmFkZENsYXNzKCduYXZCYXItYWN0aW9uJyk7XHJcblxyXG4gICAgICAgICQoJ1tkYXRhLWNvbnRlbnQtcmVzdWx0cy10b2dnbGVdJykucmVtb3ZlQ2xhc3MoJ25hdkJhci1hY3Rpb24nKTtcclxuICAgICAgICAkKCdbZGF0YS1jb250ZW50LXJlc3VsdHMtdG9nZ2xlXScpLmFkZENsYXNzKCduYXZCYXItYWN0aW9uLWNvbG9yLS1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgaWYgKCFuYXZpZ2F0ZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBzZWFyY2hEYXRhID0gJCgnI3NlYXJjaC1yZXN1bHRzLWNvbnRlbnQtY291bnQgc3BhbicpLmRhdGEoKTtcclxuICAgICAgICBjb25zdCB1cmwgPSAoc2VhcmNoRGF0YS5jb3VudCA+IDApID8gc2VhcmNoRGF0YS51cmwgOiB1cmxVdGlscy5yZXBsYWNlUGFyYW1zKHNlYXJjaERhdGEudXJsLCB7XHJcbiAgICAgICAgICAgIHBhZ2U6IDEsXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHVybFV0aWxzLmdvVG9VcmwodXJsKTtcclxuICAgIH1cclxuXHJcbiAgICBvblJlYWR5KCkge1xyXG4gICAgICAgIGNvbXBhcmVQcm9kdWN0cyh0aGlzLmNvbnRleHQudXJscyk7XHJcblxyXG4gICAgICAgIGNvbnN0ICRzZWFyY2hGb3JtID0gJCgnW2RhdGEtYWR2YW5jZWQtc2VhcmNoLWZvcm1dJyk7XHJcbiAgICAgICAgY29uc3QgJGNhdGVnb3J5VHJlZUNvbnRhaW5lciA9ICRzZWFyY2hGb3JtLmZpbmQoJ1tkYXRhLXNlYXJjaC1jYXRlZ29yeS10cmVlXScpO1xyXG4gICAgICAgIGNvbnN0IHVybCA9IFVybC5wYXJzZSh3aW5kb3cubG9jYXRpb24uaHJlZiwgdHJ1ZSk7XHJcbiAgICAgICAgY29uc3QgdHJlZURhdGEgPSBbXTtcclxuICAgICAgICB0aGlzLiRwcm9kdWN0TGlzdGluZ0NvbnRhaW5lciA9ICQoJyNwcm9kdWN0LWxpc3RpbmctY29udGFpbmVyJyk7XHJcbiAgICAgICAgdGhpcy4kZmFjZXRlZFNlYXJjaENvbnRhaW5lciA9ICQoJyNmYWNldGVkLXNlYXJjaC1jb250YWluZXInKTtcclxuICAgICAgICB0aGlzLiRjb250ZW50UmVzdWx0c0NvbnRhaW5lciA9ICQoJyNzZWFyY2gtcmVzdWx0cy1jb250ZW50Jyk7XHJcblxyXG4gICAgICAgIC8vIEluaXQgZmFjZXRlZCBzZWFyY2hcclxuICAgICAgICBpZiAoJCgnI2ZhY2V0ZWRTZWFyY2gnKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdEZhY2V0ZWRTZWFyY2goKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm9uU29ydEJ5U3VibWl0ID0gdGhpcy5vblNvcnRCeVN1Ym1pdC5iaW5kKHRoaXMpO1xyXG4gICAgICAgICAgICBob29rcy5vbignc29ydEJ5LXN1Ym1pdHRlZCcsIHRoaXMub25Tb3J0QnlTdWJtaXQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gSW5pdCBjb2xsYXBzaWJsZXNcclxuICAgICAgICBjb2xsYXBzaWJsZUZhY3RvcnkoKTtcclxuXHJcbiAgICAgICAgJCgnW2RhdGEtcHJvZHVjdC1yZXN1bHRzLXRvZ2dsZV0nKS5vbignY2xpY2snLCBldmVudCA9PiB7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd1Byb2R1Y3RzKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoJ1tkYXRhLWNvbnRlbnQtcmVzdWx0cy10b2dnbGVdJykub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICB0aGlzLnNob3dDb250ZW50KCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLiRwcm9kdWN0TGlzdGluZ0NvbnRhaW5lci5maW5kKCdsaS5wcm9kdWN0JykubGVuZ3RoID09PSAwIHx8IHVybC5xdWVyeS5zZWN0aW9uID09PSAnY29udGVudCcpIHtcclxuICAgICAgICAgICAgdGhpcy5zaG93Q29udGVudChmYWxzZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zaG93UHJvZHVjdHMoZmFsc2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgdmFsaWRhdG9yID0gdGhpcy5pbml0VmFsaWRhdGlvbigkc2VhcmNoRm9ybSlcclxuICAgICAgICAgICAgLmJpbmRWYWxpZGF0aW9uKCRzZWFyY2hGb3JtLmZpbmQoJyNzZWFyY2hfcXVlcnlfYWR2JykpO1xyXG5cclxuICAgICAgICB0aGlzLmNvbnRleHQuY2F0ZWdvcnlUcmVlLmZvckVhY2goKG5vZGUpID0+IHtcclxuICAgICAgICAgICAgdHJlZURhdGEucHVzaCh0aGlzLmZvcm1hdENhdGVnb3J5VHJlZUZvckpTVHJlZShub2RlKSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuY2F0ZWdvcnlUcmVlRGF0YSA9IHRyZWVEYXRhO1xyXG4gICAgICAgIHRoaXMuY3JlYXRlQ2F0ZWdvcnlUcmVlKCRjYXRlZ29yeVRyZWVDb250YWluZXIpO1xyXG5cclxuICAgICAgICAkc2VhcmNoRm9ybS5vbignc3VibWl0JywgZXZlbnQgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBzZWxlY3RlZENhdGVnb3J5SWRzID0gJGNhdGVnb3J5VHJlZUNvbnRhaW5lci5qc3RyZWUoKS5nZXRfc2VsZWN0ZWQoKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghdmFsaWRhdG9yLmNoZWNrKCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAkc2VhcmNoRm9ybS5maW5kKCdpbnB1dFtuYW1lPVwiY2F0ZWdvcnlcXFtcXF1cIl0nKS5yZW1vdmUoKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgY2F0ZWdvcnlJZCBvZiBzZWxlY3RlZENhdGVnb3J5SWRzKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpbnB1dCA9ICQoJzxpbnB1dD4nLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2hpZGRlbicsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ2NhdGVnb3J5W10nLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBjYXRlZ29yeUlkLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgJHNlYXJjaEZvcm0uYXBwZW5kKGlucHV0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnNob3dQcm9kdWN0c1BlclBhZ2UoKTtcclxuICAgICAgICB0aGlzLnNob3dNb3JlUHJvZHVjdHMoKTtcclxuICAgICAgICB0aGlzLnNob3dJdGVtKCk7XHJcbiAgICAgICAgdGhpcy5sb2FkT3B0aW9uRm9yUHJvZHVjdENhcmQodGhpcy5jb250ZXh0KTtcclxuICAgICAgICB0aGlzLmZhbmN5Ym94VmlkZW9CYW5uZXIoKTtcclxuXHJcbiAgICAgICAgaGFsb1NpZGVBbGxDYXRlZ29yeSgpO1xyXG4gICAgICAgIHByb2R1Y3REaXNwbGF5TW9kZSgpO1xyXG4gICAgICAgIGhhbG9TdGlja3lUb29sYmFyKHRoaXMuY29udGV4dCk7XHJcbiAgICAgICAgdGhpcy5yZXZpZXdTaG93KClcclxuXHJcbiAgICB9XHJcbiAgICByZXZpZXdTaG93KCkge1xyXG4gICAgICAgIHZhciBsaW1pdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcm9kdWN0U2t1MScpO1xyXG4gICAgICAgIGxldCByZXZpZXcyID0gW11cclxuICAgICAgICBQcm9taXNlLmFsbChbXHJcbiAgICAgICAgICAgIGZldGNoKFwiaHR0cHM6Ly93d3cudGVhbWRlc2submV0L3NlY3VyZS9hcGkvdjIvNTY1NTQvQkVBMjU2NjU5MEVGNEQxNEFBOEQzNUFEMEUyQ0VBNzcvUmV2aWV3L3NlbGVjdC5qc29uXCIpLnRoZW4ociA9PiByLmpzb24oKSkudGhlbihyPT57XHJcbiAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV2aWV3Mi5wdXNoKC4uLnIpfSksXHJcbiAgICAgICAgICAgIGZldGNoKFwiaHR0cHM6Ly93d3cudGVhbWRlc2submV0L3NlY3VyZS9hcGkvdjIvNTY1NTQvQkVBMjU2NjU5MEVGNEQxNEFBOEQzNUFEMEUyQ0VBNzcvUmV2aWV3L3NlbGVjdC5qc29uP3NraXA9NTAwXCIpLnRoZW4ociA9PiByLmpzb24oKSkudGhlbihyPT57XHJcbiAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV2aWV3Mi5wdXNoKC4uLnIpfSksXHJcbiAgICAgICAgICAgIGZldGNoKFwiaHR0cHM6Ly93d3cudGVhbWRlc2submV0L3NlY3VyZS9hcGkvdjIvNTY1NTQvQkVBMjU2NjU5MEVGNEQxNEFBOEQzNUFEMEUyQ0VBNzcvUmV2aWV3L3NlbGVjdC5qc29uP3NraXA9MTAwMFwiKS50aGVuKHIgPT4gci5qc29uKCkpLnRoZW4ocj0+e1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldmlldzIucHVzaCguLi5yKX0pLFxyXG4gICAgICAgICAgICBmZXRjaChcImh0dHBzOi8vd3d3LnRlYW1kZXNrLm5ldC9zZWN1cmUvYXBpL3YyLzU2NTU0L0JFQTI1NjY1OTBFRjREMTRBQThEMzVBRDBFMkNFQTc3L1Jldmlldy9zZWxlY3QuanNvbj9za2lwPTE1MDBcIikudGhlbihyID0+IHIuanNvbigpKS50aGVuKHI9PntcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXZpZXcyLnB1c2goLi4ucil9KSxcclxuICAgICAgICAgIF0pXHJcbiAgICAgICAgICAudGhlbigocikgPT4ge1xyXG4gICAgICAgICAgICBsaW1pdC5mb3JFYWNoKChpdGVtMSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coaXRlbS5pbm5lckhUTUwpXHJcbiAgICAgICAgICAgICAgICAkKGl0ZW0xLm5leHRFbGVtZW50U2libGluZykuZW1wdHkoKVxyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0xLmlubmVySFRNTCA9PSAnTTEwNicpIHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtMS5pbm5lckhUTUwgPSAnTTEwNiMxJ1xyXG4gICAgICAgICAgICAgICAgfWVsc2UgaWYgKGl0ZW0xLmlubmVySFRNTCA9PSAnTTEwNkwnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbTEuaW5uZXJIVE1MID0gJ00xMDZMIzEnXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGl0ZW0xLmlubmVySFRNTCA9PSAnUXVlZW5fMTgnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbTEuaW5uZXJIVE1MID0gJ1ExOCdcclxuICAgICAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgICAgICBsZXQgcmV2aWV3MyA9IFtdXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGNvbnN0IGZpbHRlcmVkQXIgPSByZXZpZXcyLmZpbHRlcihpdGVtID0+IGl0ZW1bJ1Byb2R1Y3QgU0tVJ10gPT09IGl0ZW0xLmlubmVySFRNTClcclxuICAgICAgICAgICAgICAgIGZpbHRlcmVkQXIuZm9yRWFjaCgocmV2KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV2aWV3My5wdXNoKHJldlsnUmV2aWV3IHJhdGUnXSlcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICBjb25zdCByZXZpZXdBdmcgPSBNYXRoLnJvdW5kKChyZXZpZXczLnJlZHVjZSgoYSxiICkgPT4gYSsgYiwgMCkvcmV2aWV3My5sZW5ndGgpICogMTApLzEwXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmV2aWV3QXZnKVxyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coKVxyXG4gICAgICAgICAgICAgICAgJChpdGVtMS5uZXh0RWxlbWVudFNpYmxpbmcpLmFwcGVuZChgXHJcbiAgICAgICAgICAgICAgICA8c3R5bGU+ICAgIC5jaGVja2VkIHtcclxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogcmdiKDI1NSwgMjEwLCAwKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLmZhLXN0YXItbyB7XHJcbiAgICAgICAgICAgICAgICBjb2xvcjogcmdiKDI1NSwgMjEwLCAwKTtcclxuICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBAbWVkaWEgKG1pbi13aWR0aDogNzY4cHgpIHtcclxuICAgICAgICAgICAgICAgIC5jaGVja2luZyB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgICAgICAgICAgICAgICBnYXA6NXB4O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIEBtZWRpYSAobWluLXdpZHRoOiAxMDI1cHgpIHtcclxuICAgICAgICAgICAgICAgIC5jaGVja2luZyB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogdW5zZXQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgQG1lZGlhIChtaW4td2lkdGg6IDE0MjVweCkge1xyXG4gICAgICAgICAgICAgICAgLmNoZWNraW5nIHtcclxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIDwvc3R5bGU+XHJcbjxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiBocmVmPVwiaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvZm9udC1hd2Vzb21lLzQuNy4wL2Nzcy9mb250LWF3ZXNvbWUubWluLmNzc1wiPlxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICA8c3Bhbj5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZmEgZmEtc3RhcmArKDAuNSA8PSByZXZpZXdBdmc/ICcgY2hlY2tlZCc6ICcgZmEtc3Rhci1vJykgKyBgXCI+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmYSBmYS1zdGFyYCsoMS41IDw9IHJldmlld0F2Zz8gJyBjaGVja2VkJzogJyBmYS1zdGFyLW8nKSArIGBcIj48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZhIGZhLXN0YXJgKygyLjUgPD0gcmV2aWV3QXZnPyAnIGNoZWNrZWQnOiAnIGZhLXN0YXItbycpICsgYFwiPjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZmEgZmEtc3RhcmArKDMuNSA8PSByZXZpZXdBdmc/ICcgY2hlY2tlZCc6ICcgZmEtc3Rhci1vJykgKyBgXCI+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmYSBmYS1zdGFyYCsoNC41IDw9IHJldmlld0F2Zz8gJyBjaGVja2VkJzogJyBmYS1zdGFyLW8nKSArIGBcIj48L3NwYW4+ICAgICAgXHJcbiAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgICR7cmV2aWV3My5sZW5ndGh9IFJlc2XDsWFzXHJcbiAgICAgICAgICAgIDwvZGl2PmApXHJcbiAgICAgICAgICAgICAgICAvLyAkKGl0ZW0xLm5leHRFbGVtZW50U2libGluZykuYXBwZW5kKGA8ZGl2PiR7cmV2aWV3QXZnfTwvZGl2PmApXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC8vICAgY29uc29sZS5sb2cocmV2aWV3MilcclxuICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgXHJcbiAgICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGxvYWRUcmVlTm9kZXMobm9kZSwgY2IpIHtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6ICcvcmVtb3RlL3YxL2NhdGVnb3J5LXRyZWUnLFxyXG4gICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZENhdGVnb3J5SWQ6IG5vZGUuaWQsXHJcbiAgICAgICAgICAgICAgICBwcmVmaXg6ICdjYXRlZ29yeScsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICd4LXhzcmYtdG9rZW4nOiB3aW5kb3cuQkNEYXRhICYmIHdpbmRvdy5CQ0RhdGEuY3NyZl90b2tlbiA/IHdpbmRvdy5CQ0RhdGEuY3NyZl90b2tlbiA6ICcnLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0pLmRvbmUoZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZvcm1hdHRlZFJlc3VsdHMgPSBbXTtcclxuXHJcbiAgICAgICAgICAgIGRhdGEuZm9yRWFjaCgoZGF0YU5vZGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGZvcm1hdHRlZFJlc3VsdHMucHVzaCh0aGlzLmZvcm1hdENhdGVnb3J5VHJlZUZvckpTVHJlZShkYXRhTm9kZSkpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGNiKGZvcm1hdHRlZFJlc3VsdHMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZUNhdGVnb3J5VHJlZSgkY29udGFpbmVyKSB7XHJcbiAgICAgICAgY29uc3QgdHJlZU9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIGNvcmU6IHtcclxuICAgICAgICAgICAgICAgIGRhdGE6IChub2RlLCBjYikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFJvb3Qgbm9kZVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChub2RlLmlkID09PSAnIycpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2IodGhpcy5jYXRlZ29yeVRyZWVEYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBMYXp5IGxvYWRlZCBjaGlsZHJlblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRUcmVlTm9kZXMobm9kZSwgY2IpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB0aGVtZXM6IHtcclxuICAgICAgICAgICAgICAgICAgICBpY29uczogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGNoZWNrYm94OiB7XHJcbiAgICAgICAgICAgICAgICB0aHJlZV9zdGF0ZTogZmFsc2UsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHBsdWdpbnM6IFtcclxuICAgICAgICAgICAgICAgICdjaGVja2JveCcsXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJGNvbnRhaW5lci5qc3RyZWUodHJlZU9wdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRGYWNldGVkU2VhcmNoKCkge1xyXG4gICAgICAgIGNvbnN0ICRwcm9kdWN0TGlzdGluZ0NvbnRhaW5lciA9ICQoJyNwcm9kdWN0LWxpc3RpbmctY29udGFpbmVyIC5wcm9kdWN0TGlzdGluZycpO1xyXG4gICAgICAgIGNvbnN0ICRjb250ZW50TGlzdGluZ0NvbnRhaW5lciA9ICQoJyNzZWFyY2gtcmVzdWx0cy1jb250ZW50Jyk7XHJcbiAgICAgICAgY29uc3QgJGZhY2V0ZWRTZWFyY2hDb250YWluZXIgPSAkKCcjZmFjZXRlZC1zZWFyY2gtY29udGFpbmVyJyk7XHJcbiAgICAgICAgY29uc3QgJHNlYXJjaEhlYWRpbmcgPSAkKCcjc2VhcmNoLXJlc3VsdHMtaGVhZGluZycpO1xyXG4gICAgICAgIGNvbnN0ICRzZWFyY2hDb3VudCA9ICQoJyNzZWFyY2gtcmVzdWx0cy1wcm9kdWN0LWNvdW50Jyk7XHJcbiAgICAgICAgY29uc3QgJGNvbnRlbnRDb3VudCA9ICQoJyNzZWFyY2gtcmVzdWx0cy1jb250ZW50LWNvdW50Jyk7XHJcbiAgICAgICAgY29uc3QgJHBhZ2luYXRvckNvbnRhaW5lciA9ICQoJy5wYWdpbmF0aW9uJyk7XHJcbiAgICAgICAgY29uc3QgJHNob3dNb3JlQ29udGFpbmVyID0gJCgnLmhhbG8tcHJvZHVjdC1zaG93LW1vcmUnKTtcclxuICAgICAgICBjb25zdCBwcm9kdWN0c1BlclBhZ2UgPSB0aGlzLmNvbnRleHQuc2VhcmNoUHJvZHVjdHNQZXJQYWdlO1xyXG4gICAgICAgIGNvbnN0IHJlcXVlc3RPcHRpb25zID0ge1xyXG4gICAgICAgICAgICB0ZW1wbGF0ZToge1xyXG4gICAgICAgICAgICAgICAgcHJvZHVjdExpc3Rpbmc6ICdoYWxvdGhlbWVzL2dhbGxlcnkvaGFsby1wcm9kdWN0LWxpc3RpbmcnLFxyXG4gICAgICAgICAgICAgICAgY29udGVudExpc3Rpbmc6ICdzZWFyY2gvY29udGVudC1saXN0aW5nJyxcclxuICAgICAgICAgICAgICAgIHNpZGViYXI6ICdzZWFyY2gvc2lkZWJhcicsXHJcbiAgICAgICAgICAgICAgICBoZWFkaW5nOiAnc2VhcmNoL2hlYWRpbmcnLFxyXG4gICAgICAgICAgICAgICAgcHJvZHVjdENvdW50OiAnc2VhcmNoL3Byb2R1Y3QtY291bnQnLFxyXG4gICAgICAgICAgICAgICAgY29udGVudENvdW50OiAnc2VhcmNoL2NvbnRlbnQtY291bnQnLFxyXG4gICAgICAgICAgICAgICAgcGFnaW5hdG9yOiAnaGFsb3RoZW1lcy9nYWxsZXJ5L2hhbG8tcHJvZHVjdC1wYWdpbmF0b3InLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBjb25maWc6IHtcclxuICAgICAgICAgICAgICAgIHByb2R1Y3RfcmVzdWx0czoge1xyXG4gICAgICAgICAgICAgICAgICAgIGxpbWl0OiBwcm9kdWN0c1BlclBhZ2UsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzaG93TW9yZTogJ3NlYXJjaC9zaG93LW1vcmUnLFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuZmFjZXRlZFNlYXJjaCA9IG5ldyBGYWNldGVkU2VhcmNoKHJlcXVlc3RPcHRpb25zLCAoY29udGVudCkgPT4ge1xyXG4gICAgICAgICAgICAkc2VhcmNoSGVhZGluZy5odG1sKGNvbnRlbnQuaGVhZGluZyk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCB1cmwgPSBVcmwucGFyc2Uod2luZG93LmxvY2F0aW9uLmhyZWYsIHRydWUpO1xyXG4gICAgICAgICAgICBpZiAodXJsLnF1ZXJ5LnNlY3Rpb24gPT09ICdjb250ZW50Jykge1xyXG4gICAgICAgICAgICAgICAgJGNvbnRlbnRMaXN0aW5nQ29udGFpbmVyLmh0bWwoY29udGVudC5jb250ZW50TGlzdGluZyk7XHJcbiAgICAgICAgICAgICAgICAkY29udGVudENvdW50Lmh0bWwoY29udGVudC5jb250ZW50Q291bnQpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd0NvbnRlbnQoZmFsc2UpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJHByb2R1Y3RMaXN0aW5nQ29udGFpbmVyLmh0bWwoY29udGVudC5wcm9kdWN0TGlzdGluZyk7XHJcbiAgICAgICAgICAgICAgICAkZmFjZXRlZFNlYXJjaENvbnRhaW5lci5odG1sKGNvbnRlbnQuc2lkZWJhcik7XHJcbiAgICAgICAgICAgICAgICAkc2VhcmNoQ291bnQuaHRtbChjb250ZW50LnByb2R1Y3RDb3VudCk7XHJcbiAgICAgICAgICAgICAgICAkcGFnaW5hdG9yQ29udGFpbmVyLmh0bWwoJChjb250ZW50LnBhZ2luYXRvcikuZmluZCgnLnBhZ2luYXRpb24nKS5jaGlsZHJlbigpKTtcclxuICAgICAgICAgICAgICAgICRzaG93TW9yZUNvbnRhaW5lci5odG1sKCQoY29udGVudC5wYWdpbmF0b3IpLmZpbmQoJy5oYWxvLXByb2R1Y3Qtc2hvdy1tb3JlJykuY2hpbGRyZW4oKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93UHJvZHVjdHMoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93UHJvZHVjdHNQZXJQYWdlKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dJdGVtKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dNb3JlUHJvZHVjdHMoKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYoJCgnI3Byb2R1Y3QtbGlzdGluZy1jb250YWluZXIgLnByb2R1Y3QnKS5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgICAgICAgICBoYWxvQWRkT3B0aW9uRm9yUHJvZHVjdCh0aGlzLmNvbnRleHQsICdwcm9kdWN0LWxpc3RpbmctY29udGFpbmVyJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICQoJ2JvZHknKS50cmlnZ2VySGFuZGxlcignY29tcGFyZVJlc2V0Jyk7XHJcblxyXG4gICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgICAgICBzY3JvbGxUb3A6IDAsXHJcbiAgICAgICAgICAgIH0sIDEwMCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdFZhbGlkYXRpb24oJGZvcm0pIHtcclxuICAgICAgICB0aGlzLiRmb3JtID0gJGZvcm07XHJcbiAgICAgICAgdGhpcy52YWxpZGF0b3IgPSBub2Qoe1xyXG4gICAgICAgICAgICBzdWJtaXQ6ICRmb3JtLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBiaW5kVmFsaWRhdGlvbigkZWxlbWVudCkge1xyXG4gICAgICAgIGlmICh0aGlzLnZhbGlkYXRvcikge1xyXG4gICAgICAgICAgICB0aGlzLnZhbGlkYXRvci5hZGQoe1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6ICRlbGVtZW50LFxyXG4gICAgICAgICAgICAgICAgdmFsaWRhdGU6ICdwcmVzZW5jZScsXHJcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6ICRlbGVtZW50LmRhdGEoJ2Vycm9yTWVzc2FnZScpLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIGNoZWNrKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnZhbGlkYXRvcikge1xyXG4gICAgICAgICAgICB0aGlzLnZhbGlkYXRvci5wZXJmb3JtQ2hlY2soKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudmFsaWRhdG9yLmFyZUFsbCgndmFsaWQnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93UHJvZHVjdHNQZXJQYWdlKCl7XHJcbiAgICAgICAgdGhpcy5yZXZpZXdTaG93KClcclxuXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdmFyIHVybCA9IG5ldyBVUkwod2luZG93LmxvY2F0aW9uLmhyZWYpO1xyXG4gICAgICAgICAgICB2YXIgYyA9IHVybC5zZWFyY2hQYXJhbXMuZ2V0KFwibGltaXRcIik7XHJcbiAgICAgICAgICAgIGlmKGMgIT0gbnVsbCl7XHJcbiAgICAgICAgICAgICAgICB2YXIgbGltaXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdzZWxlY3QjbGltaXQgb3B0aW9uJyk7XHJcbiAgICAgICAgICAgICAgICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKGxpbWl0LCBmdW5jdGlvbihlbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZWxlbWVudC52YWx1ZSA9PSBjKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5zZWxlY3RlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGNhdGNoKGUpIHt9XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd01vcmVQcm9kdWN0cygpIHtcclxuICAgICAgICBjb25zdCBjb250ZXh0ID0gdGhpcy5jb250ZXh0O1xyXG5cclxuICAgICAgICBjb25zdCBnZXRVcmxQYXJhbWV0ZXIgPSB0aGlzLmdldFVybFBhcmFtZXRlcignbGltaXQnKTtcclxuXHJcbiAgICAgICAgJCgnI2xpc3Rpbmctc2hvd21vcmVCdG4gPiBhJykub24oJ2NsaWNrJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgbmV4dFBhZ2UgPSAkKFwiLnBhZ2luYXRpb24taXRlbS0tY3VycmVudFwiKS5uZXh0KCksXHJcbiAgICAgICAgICAgICAgICBsaW5rID0gbmV4dFBhZ2UuZmluZChcImFcIikuYXR0cihcImhyZWZcIik7XHJcblxyXG4gICAgICAgICAgICAkKCcjbGlzdGluZy1zaG93bW9yZUJ0biA+IGEnKS5hZGRDbGFzcygnbG9hZGluZycpO1xyXG5cclxuICAgICAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdnZXQnLFxyXG4gICAgICAgICAgICAgICAgdXJsOiBsaW5rLnJlcGxhY2UoXCJodHRwOi8vXCIsIFwiLy9cIiksXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gICAgIHJldmlld1Nob3coKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsaW1pdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcm9kdWN0U2t1MScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmV2aWV3MiA9IFtdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFByb21pc2UuYWxsKFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZldGNoKFwiaHR0cHM6Ly93d3cudGVhbWRlc2submV0L3NlY3VyZS9hcGkvdjIvNTY1NTQvQkVBMjU2NjU5MEVGNEQxNEFBOEQzNUFEMEUyQ0VBNzcvUmV2aWV3L3NlbGVjdC5qc29uXCIpLnRoZW4ociA9PiByLmpzb24oKSkudGhlbihyPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXZpZXcyLnB1c2goLi4ucil9KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZldGNoKFwiaHR0cHM6Ly93d3cudGVhbWRlc2submV0L3NlY3VyZS9hcGkvdjIvNTY1NTQvQkVBMjU2NjU5MEVGNEQxNEFBOEQzNUFEMEUyQ0VBNzcvUmV2aWV3L3NlbGVjdC5qc29uP3NraXA9NTAwXCIpLnRoZW4ociA9PiByLmpzb24oKSkudGhlbihyPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXZpZXcyLnB1c2goLi4ucil9KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZldGNoKFwiaHR0cHM6Ly93d3cudGVhbWRlc2submV0L3NlY3VyZS9hcGkvdjIvNTY1NTQvQkVBMjU2NjU5MEVGNEQxNEFBOEQzNUFEMEUyQ0VBNzcvUmV2aWV3L3NlbGVjdC5qc29uP3NraXA9MTAwMFwiKS50aGVuKHIgPT4gci5qc29uKCkpLnRoZW4ocj0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV2aWV3Mi5wdXNoKC4uLnIpfSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmZXRjaChcImh0dHBzOi8vd3d3LnRlYW1kZXNrLm5ldC9zZWN1cmUvYXBpL3YyLzU2NTU0L0JFQTI1NjY1OTBFRjREMTRBQThEMzVBRDBFMkNFQTc3L1Jldmlldy9zZWxlY3QuanNvbj9za2lwPTE1MDBcIikudGhlbihyID0+IHIuanNvbigpKS50aGVuKHI9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldmlldzIucHVzaCguLi5yKX0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbWl0LmZvckVhY2goKGl0ZW0xKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coaXRlbS5pbm5lckhUTUwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJChpdGVtMS5uZXh0RWxlbWVudFNpYmxpbmcpLmVtcHR5KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbTEuaW5uZXJIVE1MID09ICdNMTA2Jykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtMS5pbm5lckhUTUwgPSAnTTEwNiMxJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmIChpdGVtMS5pbm5lckhUTUwgPT0gJ00xMDZMJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtMS5pbm5lckhUTUwgPSAnTTEwNkwjMSdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGl0ZW0xLmlubmVySFRNTCA9PSAnUXVlZW5fMTgnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0xLmlubmVySFRNTCA9ICdRMTgnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmV2aWV3MyA9IFtdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZmlsdGVyZWRBciA9IHJldmlldzIuZmlsdGVyKGl0ZW0gPT4gaXRlbVsnUHJvZHVjdCBTS1UnXSA9PT0gaXRlbTEuaW5uZXJIVE1MKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcmVkQXIuZm9yRWFjaCgocmV2KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldmlldzMucHVzaChyZXZbJ1JldmlldyByYXRlJ10pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZXZpZXdBdmcgPSBNYXRoLnJvdW5kKChyZXZpZXczLnJlZHVjZSgoYSxiICkgPT4gYSsgYiwgMCkvcmV2aWV3My5sZW5ndGgpICogMTApLzEwXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXZpZXdBdmcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoaXRlbTEubmV4dEVsZW1lbnRTaWJsaW5nKS5hcHBlbmQoYFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzdHlsZT4gICAgLmNoZWNrZWQge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogcmdiKDI1NSwgMjEwLCAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZhLXN0YXItbyB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IHJnYigyNTUsIDIxMCwgMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQG1lZGlhIChtaW4td2lkdGg6IDc2OHB4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNoZWNraW5nIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2FwOjVweDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBAbWVkaWEgKG1pbi13aWR0aDogMTAyNXB4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNoZWNraW5nIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogdW5zZXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQG1lZGlhIChtaW4td2lkdGg6IDE0MjVweCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jaGVja2luZyB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zdHlsZT5cclxuICAgICAgICAgICAgICAgIDxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiBocmVmPVwiaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvZm9udC1hd2Vzb21lLzQuNy4wL2Nzcy9mb250LWF3ZXNvbWUubWluLmNzc1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZmEgZmEtc3RhcmArKDAuNSA8PSByZXZpZXdBdmc/ICcgY2hlY2tlZCc6ICcgZmEtc3Rhci1vJykgKyBgXCI+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZmEgZmEtc3RhcmArKDEuNSA8PSByZXZpZXdBdmc/ICcgY2hlY2tlZCc6ICcgZmEtc3Rhci1vJykgKyBgXCI+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZmEgZmEtc3RhcmArKDIuNSA8PSByZXZpZXdBdmc/ICcgY2hlY2tlZCc6ICcgZmEtc3Rhci1vJykgKyBgXCI+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZmEgZmEtc3RhcmArKDMuNSA8PSByZXZpZXdBdmc/ICcgY2hlY2tlZCc6ICcgZmEtc3Rhci1vJykgKyBgXCI+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZmEgZmEtc3RhcmArKDQuNSA8PSByZXZpZXdBdmc/ICcgY2hlY2tlZCc6ICcgZmEtc3Rhci1vJykgKyBgXCI+PC9zcGFuPiAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAke3JldmlldzMubGVuZ3RofSBSZXNlw7Fhc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+YClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAkKGl0ZW0xLm5leHRFbGVtZW50U2libGluZykuYXBwZW5kKGA8ZGl2PiR7cmV2aWV3QXZnfTwvZGl2PmApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICBjb25zb2xlLmxvZyhyZXZpZXcyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoJChkYXRhKS5maW5kKCcjcHJvZHVjdC1saXN0aW5nLWNvbnRhaW5lciAucHJvZHVjdExpc3RpbmcnKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJyNwcm9kdWN0LWxpc3RpbmctY29udGFpbmVyIC5wcm9kdWN0TGlzdGluZycpLmFwcGVuZCgkKGRhdGEpLmZpbmQoJyNwcm9kdWN0LWxpc3RpbmctY29udGFpbmVyIC5wcm9kdWN0TGlzdGluZycpLmNoaWxkcmVuKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXZpZXdTaG93KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5wYWdpbmF0aW9uLWxpc3QnKS5odG1sKCQoZGF0YSkuZmluZChcIi5wYWdpbmF0aW9uLWxpc3RcIikuaHRtbCgpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJyNsaXN0aW5nLXNob3dtb3JlQnRuID4gYScpLnJlbW92ZUNsYXNzKCdsb2FkaW5nJykuYmx1cigpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dFBhZ2UgPSAkKFwiLnBhZ2luYXRpb24taXRlbS0tY3VycmVudFwiKS5uZXh0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobmV4dFBhZ2UubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcjbGlzdGluZy1zaG93bW9yZUJ0biA+IGEnKS5hZGRDbGFzcygnZGlzYWJsZScpLnRleHQoJ05vIG1vcmUgcHJvZHVjdHMnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5wYWdpbmF0aW9uIC5wYWdpbmF0aW9uLWluZm8gLmVuZCcpLnRleHQoJCgnLnBhZ2luYXRpb24taW5mbyAudG90YWwnKS50ZXh0KCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbGltaXQgPSBnZXRVcmxQYXJhbWV0ZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvZHVjdFBlclBhZ2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFnZUN1cnJlbnQgPSBwYXJzZUludCgkKFwiLnBhZ2luYXRpb24taXRlbS0tY3VycmVudCA+IGFcIikudGV4dCgpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobGltaXQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2R1Y3RQZXJQYWdlID0gbGltaXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvZHVjdFBlclBhZ2UgPSBjb250ZXh0LnNlYXJjaFByb2R1Y3RzUGVyUGFnZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcucGFnaW5hdGlvbiAucGFnaW5hdGlvbi1pbmZvIC5lbmQnKS50ZXh0KHBhcnNlSW50KHByb2R1Y3RQZXJQYWdlKSpwYWdlQ3VycmVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKCQoZGF0YSkuZmluZCgnI3Byb2R1Y3QtbGlzdGluZy1jb250YWluZXIgLnByb2R1Y3QnKS5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbG9BZGRPcHRpb25Gb3JQcm9kdWN0KGNvbnRleHQsICdwcm9kdWN0LWxpc3RpbmctY29udGFpbmVyJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3dJdGVtKCkge1xyXG4gICAgICAgIHZhciB0b3RhbCA9IHBhcnNlSW50KCQoJy5wYWdpbmF0aW9uLWluZm8gLnRvdGFsJykudGV4dCgpKSxcclxuICAgICAgICAgICAgbGltaXQgPSB0aGlzLmdldFVybFBhcmFtZXRlcignbGltaXQnKSxcclxuICAgICAgICAgICAgcHJvZHVjdFBlclBhZ2U7XHJcblxyXG4gICAgICAgIGlmIChsaW1pdCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHByb2R1Y3RQZXJQYWdlID0gbGltaXQ7XHJcbiAgICAgICAgfSBlbHNle1xyXG4gICAgICAgICAgICBwcm9kdWN0UGVyUGFnZSA9IHRoaXMuY29udGV4dC5zZWFyY2hQcm9kdWN0c1BlclBhZ2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgc3RhcnQgPSAxLFxyXG4gICAgICAgICAgICBlbmQgPSB0b3RhbCxcclxuICAgICAgICAgICAgY2hlY2tMYXN0UGFnZSA9IGZhbHNlLFxyXG4gICAgICAgICAgICBsYXN0UGFnZSA9IDE7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIHZhciBjaGVja0xpbmsgPSAkKFwiLnBhZ2luYXRpb24tbGlzdCAucGFnaW5hdGlvbi1pdGVtLS1jdXJyZW50XCIpLm5leHQoKTtcclxuICAgICAgICB2YXIgcGFnZU5vdExhc3QgPSBsYXN0UGFnZSAtIDE7XHJcbiAgICAgICAgdmFyIHRvdGFsTm90TGFzdCA9IHBhZ2VOb3RMYXN0ICogcHJvZHVjdFBlclBhZ2U7XHJcbiAgICAgICAgdmFyIHByb2R1Y3RzTGFzdFBhZ2UgPSB0b3RhbCAtIHRvdGFsTm90TGFzdDtcclxuICAgICAgICB2YXIgY3VycmVudFBhZ2UgPSBwYXJzZUludCgkKCcucGFnaW5hdGlvbi1pdGVtLS1jdXJyZW50ID4gYScpLnRleHQoKSk7XHJcbiAgICAgICAgdmFyIHByZXZQYWdlID0gY3VycmVudFBhZ2UgLSAxO1xyXG5cclxuICAgICAgICBpZiAoY2hlY2tMaW5rLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICBsYXN0UGFnZSA9IHBhcnNlSW50KCQoXCIucGFnaW5hdGlvbi1pdGVtLS1jdXJyZW50XCIpLmZpbmQoXCJhXCIpLnRleHQoKSk7XHJcbiAgICAgICAgICAgIGNoZWNrTGFzdFBhZ2UgPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxhc3RQYWdlID0gcGFyc2VJbnQoY2hlY2tMaW5rLmZpbmQoXCJhXCIpLnRleHQoKSk7XHJcbiAgICAgICAgICAgIGNoZWNrTGFzdFBhZ2UgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHRvdGFsIDw9IHByb2R1Y3RQZXJQYWdlKSB7XHJcbiAgICAgICAgICAgICQoJy5wYWdpbmF0aW9uLWluZm8gLnN0YXJ0JykudGV4dChzdGFydCk7XHJcbiAgICAgICAgICAgICQoJy5wYWdpbmF0aW9uLWluZm8gLmVuZCcpLnRleHQoZW5kKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoY3VycmVudFBhZ2UgPD0gMSkge1xyXG4gICAgICAgICAgICAgICAgZW5kID0gcHJvZHVjdFBlclBhZ2U7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzdGFydCA9IChwcmV2UGFnZSAqIHByb2R1Y3RQZXJQYWdlKSArIDE7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmIChjaGVja0xhc3RQYWdlID0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKCQoJy5wYWdpbmF0aW9uLWxpc3QgLnBhZ2luYXRpb24taXRlbS0tbmV4dCcpLmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbmQgPSB0b3RhbE5vdExhc3QgKyBwcm9kdWN0c0xhc3RQYWdlIC0gMTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuZCA9IHRvdGFsTm90TGFzdCArIHByb2R1Y3RzTGFzdFBhZ2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBlbmQgPSBjdXJyZW50UGFnZSAqIHByb2R1Y3RQZXJQYWdlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAkKCcucGFnaW5hdGlvbi1pbmZvIC5zdGFydCcpLnRleHQoc3RhcnQpO1xyXG4gICAgICAgICAgICAkKCcucGFnaW5hdGlvbi1pbmZvIC5lbmQnKS50ZXh0KGVuZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZhbmN5Ym94VmlkZW9CYW5uZXIoKXtcclxuICAgICAgICBpZiAoJChcIi52aWRlby1ibG9jay1pbWFnZVtkYXRhLWZhbmN5Ym94XVwiKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgJChcIi52aWRlby1ibG9jay1pbWFnZVtkYXRhLWZhbmN5Ym94XVwiKS5mYW5jeWJveCh7XHJcbiAgICAgICAgICAgICAgICAnYXV0b0RpbWVuc2lvbnMnOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICdwYWRkaW5nJyA6IDAsXHJcbiAgICAgICAgICAgICAgICAnd2lkdGgnIDogOTcwLFxyXG4gICAgICAgICAgICAgICAgJ2hlaWdodCcgOiA2MDAsXHJcbiAgICAgICAgICAgICAgICAnYXV0b1NjYWxlJyA6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgJ3RyYW5zaXRpb25JbicgOiAnbm9uZScsXHJcbiAgICAgICAgICAgICAgICAndHJhbnNpdGlvbk91dCcgOiAnbm9uZSdcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoJChcIi5idXR0b24tcG9wdXAtdmlkZW9bZGF0YS1mYW5jeWJveF1cIikubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICQoXCIuYnV0dG9uLXBvcHVwLXZpZGVvW2RhdGEtZmFuY3lib3hdXCIpLmZhbmN5Ym94KHtcclxuICAgICAgICAgICAgICAgICdhdXRvRGltZW5zaW9ucyc6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgJ3BhZGRpbmcnIDogMCxcclxuICAgICAgICAgICAgICAgICd3aWR0aCcgOiA5NzAsXHJcbiAgICAgICAgICAgICAgICAnaGVpZ2h0JyA6IDYwMCxcclxuICAgICAgICAgICAgICAgICdhdXRvU2NhbGUnIDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAndHJhbnNpdGlvbkluJyA6ICdub25lJyxcclxuICAgICAgICAgICAgICAgICd0cmFuc2l0aW9uT3V0JyA6ICdub25lJ1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VXJsUGFyYW1ldGVyKHNQYXJhbSkge1xyXG4gICAgICAgIHZhciBzUGFnZVVSTCA9IGRlY29kZVVSSUNvbXBvbmVudCh3aW5kb3cubG9jYXRpb24uc2VhcmNoLnN1YnN0cmluZygxKSksXHJcbiAgICAgICAgICAgIHNVUkxWYXJpYWJsZXMgPSBzUGFnZVVSTC5zcGxpdCgnJicpLFxyXG4gICAgICAgICAgICBzUGFyYW1ldGVyTmFtZSxcclxuICAgICAgICAgICAgaTtcclxuXHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IHNVUkxWYXJpYWJsZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgc1BhcmFtZXRlck5hbWUgPSBzVVJMVmFyaWFibGVzW2ldLnNwbGl0KCc9Jyk7XHJcblxyXG4gICAgICAgICAgICBpZiAoc1BhcmFtZXRlck5hbWVbMF0gPT09IHNQYXJhbSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNQYXJhbWV0ZXJOYW1lWzFdID09PSB1bmRlZmluZWQgPyB0cnVlIDogc1BhcmFtZXRlck5hbWVbMV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbG9hZE9wdGlvbkZvclByb2R1Y3RDYXJkKGNvbnRleHQpe1xyXG4gICAgICAgIGlmKCQoJyNmZWF0dXJlZC1wcm9kdWN0cyAuY2FyZCcpLmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICBoYWxvQWRkT3B0aW9uRm9yUHJvZHVjdChjb250ZXh0LCAnZmVhdHVyZWQtcHJvZHVjdHMnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKCQoJyNwcm9kdWN0LWxpc3RpbmctY29udGFpbmVyIC5wcm9kdWN0JykubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgIGhhbG9BZGRPcHRpb25Gb3JQcm9kdWN0KGNvbnRleHQsICdwcm9kdWN0LWxpc3RpbmctY29udGFpbmVyJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=