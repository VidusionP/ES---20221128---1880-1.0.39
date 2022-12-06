(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[14],{

/***/ "./assets/js/theme/category.js":
/*!*************************************!*\
  !*** ./assets/js/theme/category.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Category; });
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _catalog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./catalog */ "./assets/js/theme/catalog.js");
/* harmony import */ var _global_compare_products__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./global/compare-products */ "./assets/js/theme/global/compare-products.js");
/* harmony import */ var _common_faceted_search__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common/faceted-search */ "./assets/js/theme/common/faceted-search.js");
/* harmony import */ var _halothemes_haloProductDisplayMode__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./halothemes/haloProductDisplayMode */ "./assets/js/theme/halothemes/haloProductDisplayMode.js");
/* harmony import */ var _halothemes_haloSideAllCategory__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./halothemes/haloSideAllCategory */ "./assets/js/theme/halothemes/haloSideAllCategory.js");
/* harmony import */ var _halothemes_haloAddOptionForProductCard__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./halothemes/haloAddOptionForProductCard */ "./assets/js/theme/halothemes/haloAddOptionForProductCard.js");
/* harmony import */ var _halothemes_haloStickyToolbar__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./halothemes/haloStickyToolbar */ "./assets/js/theme/halothemes/haloStickyToolbar.js");
/* harmony import */ var _halothemes_jquery_fancybox_min__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./halothemes/jquery.fancybox.min */ "./assets/js/theme/halothemes/jquery.fancybox.min.js");
/* harmony import */ var _halothemes_jquery_fancybox_min__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_halothemes_jquery_fancybox_min__WEBPACK_IMPORTED_MODULE_8__);
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }









var Category = /*#__PURE__*/function (_CatalogPage) {
  _inheritsLoose(Category, _CatalogPage);
  function Category() {
    return _CatalogPage.apply(this, arguments) || this;
  }
  var _proto = Category.prototype;
  _proto.onReady = function onReady() {
    Object(_global_compare_products__WEBPACK_IMPORTED_MODULE_2__["default"])(this.context.urls);
    if ($('#facetedSearch').length > 0) {
      this.initFacetedSearch();
    } else {
      this.onSortBySubmit = this.onSortBySubmit.bind(this);
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["hooks"].on('sortBy-submitted', this.onSortBySubmit);
    }
    this.showProductsPerPage();
    this.showMoreProducts();
    this.fancyboxVideoBanner();
    this.loadOptionForProductCard(this.context);
    Object(_halothemes_haloSideAllCategory__WEBPACK_IMPORTED_MODULE_5__["default"])();
    Object(_halothemes_haloProductDisplayMode__WEBPACK_IMPORTED_MODULE_4__["default"])();
    Object(_halothemes_haloStickyToolbar__WEBPACK_IMPORTED_MODULE_7__["default"])(this.context);
    this.reviewShow();
  };
  _proto.initFacetedSearch = function initFacetedSearch() {
    var _this = this;
    var $productListingContainer = $('#product-listing-container .productListing');
    var $facetedSearchContainer = $('#faceted-search-container');
    var $paginatorContainer = $('.pagination');
    var $showMoreContainer = $('.halo-product-show-more');
    var productsPerPage = this.context.categoryProductsPerPage;
    var requestOptions = {
      config: {
        category: {
          shop_by_price: true,
          products: {
            limit: productsPerPage
          }
        }
      },
      template: {
        productListing: 'halothemes/gallery/halo-product-listing',
        sidebar: 'category/sidebar',
        paginator: 'halothemes/gallery/halo-product-paginator'
      },
      showMore: 'category/show-more'
    };
    this.facetedSearch = new _common_faceted_search__WEBPACK_IMPORTED_MODULE_3__["default"](requestOptions, function (content) {
      $productListingContainer.html(content.productListing);
      $facetedSearchContainer.html(content.sidebar);
      $paginatorContainer.html($(content.paginator).find('.pagination').children());
      $showMoreContainer.html($(content.paginator).find('.halo-product-show-more').children());
      $('body').triggerHandler('compareReset');
      if ($('#product-listing-container .product').length > 0) {
        Object(_halothemes_haloAddOptionForProductCard__WEBPACK_IMPORTED_MODULE_6__["default"])(_this.context, 'product-listing-container');
      }
      _this.showProductsPerPage();
      _this.showMoreProducts();
      $('html, body').animate({
        scrollTop: 0
      }, 100);
    });
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
    $('#listing-showmoreBtn > a').on('click', function (event) {
      event.preventDefault();
      var nextPage = $(".pagination-item--current").next(),
        link = nextPage.find("a").attr("href");
      $('#listing-showmoreBtn > a').addClass('loading');
      $.ajax({
        type: 'get',
        url: link.replace("http://", "//"),
        success: function success(data) {
          function reviewShow(x) {
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
                $(item1.nextElementSibling).append("\n                                <style>    .checked {\n                                    color: rgb(255, 210, 0);\n                            \n                            }\n                            .fa-star-o {\n                                color: rgb(255, 210, 0);\n                        \n                            }\n                            @media (min-width: 768px) {\n                                .checking {\n                                    display: flex;\n                                    gap:5px;\n                                }\n                            }\n                            </style>\n                <link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css\">\n                                \n                                <span>\n                                <span class=\"fa fa-star" + (0.5 <= reviewAvg ? ' checked' : ' fa-star-o') + "\"></span>\n                                <span class=\"fa fa-star" + (1.5 <= reviewAvg ? ' checked' : ' fa-star-o') + "\"></span>\n                                <span class=\"fa fa-star" + (2.5 <= reviewAvg ? ' checked' : ' fa-star-o') + "\"></span>\n                                <span class=\"fa fa-star" + (3.5 <= reviewAvg ? ' checked' : ' fa-star-o') + "\"></span>\n                                <span class=\"fa fa-star" + (4.5 <= reviewAvg ? ' checked' : ' fa-star-o') + ("\"></span>      \n                            </span>\n                            <div>\n                                " + review3.length + " Rese\xF1as\n                            </div>"));
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
            if (Number($(data).find('.pagination-info .end').text()) <= Number($(data).find('.pagination-info .total').text())) {
              $('.pagination .pagination-info .end').text($(data).find('.pagination-info .end').text());
            } else {
              $('.pagination .pagination-info .end').text($(data).find('.pagination-info .total').text());
            }
            nextPage = $(".pagination-item--current").next();
            if (nextPage.length === 0) {
              $('#listing-showmoreBtn > a').addClass('disable').text('No more products');
            }
            if ($(data).find('#product-listing-container .product').length > 0) {
              Object(_halothemes_haloAddOptionForProductCard__WEBPACK_IMPORTED_MODULE_6__["default"])(context, 'product-listing-container');
            }
          }
        }
      });
    });
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
  _proto.loadOptionForProductCard = function loadOptionForProductCard(context) {
    if ($('#featured-products .card').length > 0) {
      Object(_halothemes_haloAddOptionForProductCard__WEBPACK_IMPORTED_MODULE_6__["default"])(context, 'featured-products');
    }
    if ($('#product-listing-container .product').length > 0) {
      Object(_halothemes_haloAddOptionForProductCard__WEBPACK_IMPORTED_MODULE_6__["default"])(context, 'product-listing-container');
    }
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
        var filterArr = review2.filter(function (item) {
          return item['Product SKU'] === item1.innerHTML;
        });
        filterArr.forEach(function (goku) {
          review3.push(goku['Review rate']);
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
  return Category;
}(_catalog__WEBPACK_IMPORTED_MODULE_1__["default"]);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY2F0ZWdvcnkuanMiXSwibmFtZXMiOlsiQ2F0ZWdvcnkiLCJvblJlYWR5IiwiY29tcGFyZVByb2R1Y3RzIiwiY29udGV4dCIsInVybHMiLCIkIiwibGVuZ3RoIiwiaW5pdEZhY2V0ZWRTZWFyY2giLCJvblNvcnRCeVN1Ym1pdCIsImJpbmQiLCJob29rcyIsIm9uIiwic2hvd1Byb2R1Y3RzUGVyUGFnZSIsInNob3dNb3JlUHJvZHVjdHMiLCJmYW5jeWJveFZpZGVvQmFubmVyIiwibG9hZE9wdGlvbkZvclByb2R1Y3RDYXJkIiwiaGFsb1NpZGVBbGxDYXRlZ29yeSIsInByb2R1Y3REaXNwbGF5TW9kZSIsImhhbG9TdGlja3lUb29sYmFyIiwicmV2aWV3U2hvdyIsIiRwcm9kdWN0TGlzdGluZ0NvbnRhaW5lciIsIiRmYWNldGVkU2VhcmNoQ29udGFpbmVyIiwiJHBhZ2luYXRvckNvbnRhaW5lciIsIiRzaG93TW9yZUNvbnRhaW5lciIsInByb2R1Y3RzUGVyUGFnZSIsImNhdGVnb3J5UHJvZHVjdHNQZXJQYWdlIiwicmVxdWVzdE9wdGlvbnMiLCJjb25maWciLCJjYXRlZ29yeSIsInNob3BfYnlfcHJpY2UiLCJwcm9kdWN0cyIsImxpbWl0IiwidGVtcGxhdGUiLCJwcm9kdWN0TGlzdGluZyIsInNpZGViYXIiLCJwYWdpbmF0b3IiLCJzaG93TW9yZSIsImZhY2V0ZWRTZWFyY2giLCJGYWNldGVkU2VhcmNoIiwiY29udGVudCIsImh0bWwiLCJmaW5kIiwiY2hpbGRyZW4iLCJ0cmlnZ2VySGFuZGxlciIsImhhbG9BZGRPcHRpb25Gb3JQcm9kdWN0IiwiYW5pbWF0ZSIsInNjcm9sbFRvcCIsInVybCIsIlVSTCIsIndpbmRvdyIsImxvY2F0aW9uIiwiaHJlZiIsImMiLCJzZWFyY2hQYXJhbXMiLCJnZXQiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJBcnJheSIsInByb3RvdHlwZSIsImZvckVhY2giLCJjYWxsIiwiZWxlbWVudCIsInZhbHVlIiwic2VsZWN0ZWQiLCJlIiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsIm5leHRQYWdlIiwibmV4dCIsImxpbmsiLCJhdHRyIiwiYWRkQ2xhc3MiLCJhamF4IiwidHlwZSIsInJlcGxhY2UiLCJzdWNjZXNzIiwiZGF0YSIsIngiLCJyZXZpZXcyIiwiUHJvbWlzZSIsImFsbCIsImZldGNoIiwidGhlbiIsInIiLCJqc29uIiwicHVzaCIsIml0ZW0xIiwibmV4dEVsZW1lbnRTaWJsaW5nIiwiZW1wdHkiLCJpbm5lckhUTUwiLCJyZXZpZXczIiwiZmlsdGVyZWRBciIsImZpbHRlciIsIml0ZW0iLCJyZXYiLCJyZXZpZXdBdmciLCJNYXRoIiwicm91bmQiLCJyZWR1Y2UiLCJhIiwiYiIsImFwcGVuZCIsImNhdGNoIiwiZXJyIiwiY29uc29sZSIsImxvZyIsInJlbW92ZUNsYXNzIiwiYmx1ciIsIk51bWJlciIsInRleHQiLCJmYW5jeWJveCIsImZpbHRlckFyciIsImdva3UiLCJDYXRhbG9nUGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQW1EO0FBQ2Y7QUFDb0I7QUFDSjtBQUNpQjtBQUNGO0FBQ1k7QUFDaEI7QUFDUDtBQUFBLElBRW5DQSxRQUFRO0VBQUE7RUFBQTtJQUFBO0VBQUE7RUFBQTtFQUFBLE9BQ3pCQyxPQUFPLEdBQVAsbUJBQVU7SUFDTkMsd0VBQWUsQ0FBQyxJQUFJLENBQUNDLE9BQU8sQ0FBQ0MsSUFBSSxDQUFDO0lBRWxDLElBQUlDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO01BQ2hDLElBQUksQ0FBQ0MsaUJBQWlCLEVBQUU7SUFDNUIsQ0FBQyxNQUFNO01BQ0gsSUFBSSxDQUFDQyxjQUFjLEdBQUcsSUFBSSxDQUFDQSxjQUFjLENBQUNDLElBQUksQ0FBQyxJQUFJLENBQUM7TUFDcERDLGdFQUFLLENBQUNDLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLENBQUNILGNBQWMsQ0FBQztJQUNyRDtJQUVBLElBQUksQ0FBQ0ksbUJBQW1CLEVBQUU7SUFDMUIsSUFBSSxDQUFDQyxnQkFBZ0IsRUFBRTtJQUN2QixJQUFJLENBQUNDLG1CQUFtQixFQUFFO0lBQzFCLElBQUksQ0FBQ0Msd0JBQXdCLENBQUMsSUFBSSxDQUFDWixPQUFPLENBQUM7SUFFM0NhLCtFQUFtQixFQUFFO0lBQ3JCQyxrRkFBa0IsRUFBRTtJQUNwQkMsNkVBQWlCLENBQUMsSUFBSSxDQUFDZixPQUFPLENBQUM7SUFDL0IsSUFBSSxDQUFDZ0IsVUFBVSxFQUFFO0VBRXJCLENBQUM7RUFBQSxPQUVEWixpQkFBaUIsR0FBakIsNkJBQW9CO0lBQUE7SUFDaEIsSUFBTWEsd0JBQXdCLEdBQUdmLENBQUMsQ0FBQyw0Q0FBNEMsQ0FBQztJQUNoRixJQUFNZ0IsdUJBQXVCLEdBQUdoQixDQUFDLENBQUMsMkJBQTJCLENBQUM7SUFDOUQsSUFBTWlCLG1CQUFtQixHQUFHakIsQ0FBQyxDQUFDLGFBQWEsQ0FBQztJQUM1QyxJQUFNa0Isa0JBQWtCLEdBQUdsQixDQUFDLENBQUMseUJBQXlCLENBQUM7SUFDdkQsSUFBTW1CLGVBQWUsR0FBRyxJQUFJLENBQUNyQixPQUFPLENBQUNzQix1QkFBdUI7SUFDNUQsSUFBTUMsY0FBYyxHQUFHO01BQ25CQyxNQUFNLEVBQUU7UUFDSkMsUUFBUSxFQUFFO1VBQ05DLGFBQWEsRUFBRSxJQUFJO1VBQ25CQyxRQUFRLEVBQUU7WUFDTkMsS0FBSyxFQUFFUDtVQUNYO1FBQ0o7TUFDSixDQUFDO01BQ0RRLFFBQVEsRUFBRTtRQUNOQyxjQUFjLEVBQUUseUNBQXlDO1FBQ3pEQyxPQUFPLEVBQUUsa0JBQWtCO1FBQzNCQyxTQUFTLEVBQUU7TUFDZixDQUFDO01BQ0RDLFFBQVEsRUFBRTtJQUNkLENBQUM7SUFFRCxJQUFJLENBQUNDLGFBQWEsR0FBRyxJQUFJQyw4REFBYSxDQUFDWixjQUFjLEVBQUUsVUFBQ2EsT0FBTyxFQUFLO01BQ2hFbkIsd0JBQXdCLENBQUNvQixJQUFJLENBQUNELE9BQU8sQ0FBQ04sY0FBYyxDQUFDO01BQ3JEWix1QkFBdUIsQ0FBQ21CLElBQUksQ0FBQ0QsT0FBTyxDQUFDTCxPQUFPLENBQUM7TUFDN0NaLG1CQUFtQixDQUFDa0IsSUFBSSxDQUFDbkMsQ0FBQyxDQUFDa0MsT0FBTyxDQUFDSixTQUFTLENBQUMsQ0FBQ00sSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDQyxRQUFRLEVBQUUsQ0FBQztNQUM3RW5CLGtCQUFrQixDQUFDaUIsSUFBSSxDQUFDbkMsQ0FBQyxDQUFDa0MsT0FBTyxDQUFDSixTQUFTLENBQUMsQ0FBQ00sSUFBSSxDQUFDLHlCQUF5QixDQUFDLENBQUNDLFFBQVEsRUFBRSxDQUFDO01BRXhGckMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDc0MsY0FBYyxDQUFDLGNBQWMsQ0FBQztNQUV4QyxJQUFHdEMsQ0FBQyxDQUFDLHFDQUFxQyxDQUFDLENBQUNDLE1BQU0sR0FBRyxDQUFDLEVBQUM7UUFDbkRzQyx1RkFBdUIsQ0FBQyxLQUFJLENBQUN6QyxPQUFPLEVBQUUsMkJBQTJCLENBQUM7TUFDdEU7TUFFQSxLQUFJLENBQUNTLG1CQUFtQixFQUFFO01BQzFCLEtBQUksQ0FBQ0MsZ0JBQWdCLEVBQUU7TUFFdkJSLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQ3dDLE9BQU8sQ0FBQztRQUNwQkMsU0FBUyxFQUFFO01BQ2YsQ0FBQyxFQUFFLEdBQUcsQ0FBQztJQUNYLENBQUMsQ0FBQztFQUNOLENBQUM7RUFBQSxPQUVEbEMsbUJBQW1CLEdBQW5CLCtCQUFxQjtJQUNqQixJQUFJLENBQUNPLFVBQVUsRUFBRTtJQUVqQixJQUFJO01BQ0EsSUFBSTRCLEdBQUcsR0FBRyxJQUFJQyxHQUFHLENBQUNDLE1BQU0sQ0FBQ0MsUUFBUSxDQUFDQyxJQUFJLENBQUM7TUFDdkMsSUFBSUMsQ0FBQyxHQUFHTCxHQUFHLENBQUNNLFlBQVksQ0FBQ0MsR0FBRyxDQUFDLE9BQU8sQ0FBQztNQUNyQyxJQUFHRixDQUFDLElBQUksSUFBSSxFQUFDO1FBQ1QsSUFBSXJCLEtBQUssR0FBR3dCLFFBQVEsQ0FBQ0MsZ0JBQWdCLENBQUMscUJBQXFCLENBQUM7UUFDNURDLEtBQUssQ0FBQ0MsU0FBUyxDQUFDQyxPQUFPLENBQUNDLElBQUksQ0FBQzdCLEtBQUssRUFBRSxVQUFTOEIsT0FBTyxFQUFFO1VBQ2xELElBQUdBLE9BQU8sQ0FBQ0MsS0FBSyxJQUFJVixDQUFDLEVBQUM7WUFDbEJTLE9BQU8sQ0FBQ0UsUUFBUSxHQUFHLElBQUk7VUFDM0I7UUFDSixDQUFDLENBQUM7TUFDTjtJQUNKLENBQUMsQ0FBQyxPQUFNQyxDQUFDLEVBQUUsQ0FBQztFQUNoQixDQUFDO0VBQUEsT0FFRG5ELGdCQUFnQixHQUFoQiw0QkFBbUI7SUFDZixJQUFNVixPQUFPLEdBQUcsSUFBSSxDQUFDQSxPQUFPO0lBRTVCRSxDQUFDLENBQUMsMEJBQTBCLENBQUMsQ0FBQ00sRUFBRSxDQUFDLE9BQU8sRUFBRSxVQUFDc0QsS0FBSyxFQUFLO01BQ2pEQSxLQUFLLENBQUNDLGNBQWMsRUFBRTtNQUV0QixJQUFJQyxRQUFRLEdBQUc5RCxDQUFDLENBQUMsMkJBQTJCLENBQUMsQ0FBQytELElBQUksRUFBRTtRQUNoREMsSUFBSSxHQUFHRixRQUFRLENBQUMxQixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM2QixJQUFJLENBQUMsTUFBTSxDQUFDO01BRTFDakUsQ0FBQyxDQUFDLDBCQUEwQixDQUFDLENBQUNrRSxRQUFRLENBQUMsU0FBUyxDQUFDO01BRWpEbEUsQ0FBQyxDQUFDbUUsSUFBSSxDQUFDO1FBQ0hDLElBQUksRUFBRSxLQUFLO1FBQ1gxQixHQUFHLEVBQUVzQixJQUFJLENBQUNLLE9BQU8sQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDO1FBQ2xDQyxPQUFPLEVBQUUsaUJBQVNDLElBQUksRUFBRTtVQUNwQixTQUFVekQsVUFBVSxDQUFDMEQsQ0FBQyxFQUFFO1lBQ3BCLElBQUk5QyxLQUFLLEdBQUd3QixRQUFRLENBQUNDLGdCQUFnQixDQUFDLGNBQWMsQ0FBQztZQUNyRCxJQUFJc0IsT0FBTyxHQUFHLEVBQUU7WUFDaEJDLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLENBQ1JDLEtBQUssQ0FBQyxrR0FBa0csQ0FBQyxDQUFDQyxJQUFJLENBQUMsVUFBQUMsQ0FBQztjQUFBLE9BQUlBLENBQUMsQ0FBQ0MsSUFBSSxFQUFFO1lBQUEsRUFBQyxDQUFDRixJQUFJLENBQUMsVUFBQUMsQ0FBQyxFQUFFO2NBRXBITCxPQUFPLENBQUNPLElBQUksT0FBWlAsT0FBTyxFQUFTSyxDQUFDLENBQUM7WUFBQSxDQUFDLENBQUMsRUFDdENGLEtBQUssQ0FBQywyR0FBMkcsQ0FBQyxDQUFDQyxJQUFJLENBQUMsVUFBQUMsQ0FBQztjQUFBLE9BQUlBLENBQUMsQ0FBQ0MsSUFBSSxFQUFFO1lBQUEsRUFBQyxDQUFDRixJQUFJLENBQUMsVUFBQUMsQ0FBQyxFQUFFO2NBRTdITCxPQUFPLENBQUNPLElBQUksT0FBWlAsT0FBTyxFQUFTSyxDQUFDLENBQUM7WUFBQSxDQUFDLENBQUMsRUFDdENGLEtBQUssQ0FBQyw0R0FBNEcsQ0FBQyxDQUFDQyxJQUFJLENBQUMsVUFBQUMsQ0FBQztjQUFBLE9BQUlBLENBQUMsQ0FBQ0MsSUFBSSxFQUFFO1lBQUEsRUFBQyxDQUFDRixJQUFJLENBQUMsVUFBQUMsQ0FBQyxFQUFFO2NBRTlITCxPQUFPLENBQUNPLElBQUksT0FBWlAsT0FBTyxFQUFTSyxDQUFDLENBQUM7WUFBQSxDQUFDLENBQUMsRUFDdENGLEtBQUssQ0FBQyw0R0FBNEcsQ0FBQyxDQUFDQyxJQUFJLENBQUMsVUFBQUMsQ0FBQztjQUFBLE9BQUlBLENBQUMsQ0FBQ0MsSUFBSSxFQUFFO1lBQUEsRUFBQyxDQUFDRixJQUFJLENBQUMsVUFBQUMsQ0FBQyxFQUFFO2NBRTlITCxPQUFPLENBQUNPLElBQUksT0FBWlAsT0FBTyxFQUFTSyxDQUFDLENBQUM7WUFBQSxDQUFDLENBQUMsQ0FDdkMsQ0FBQyxDQUNERCxJQUFJLENBQUMsVUFBQ0MsQ0FBQyxFQUFLO2NBQ1hwRCxLQUFLLENBQUM0QixPQUFPLENBQUMsVUFBQzJCLEtBQUssRUFBSztnQkFDckI7Z0JBQ0FqRixDQUFDLENBQUNpRixLQUFLLENBQUNDLGtCQUFrQixDQUFDLENBQUNDLEtBQUssRUFBRTtnQkFDbkMsSUFBSUYsS0FBSyxDQUFDRyxTQUFTLElBQUksTUFBTSxFQUFFO2tCQUMzQkgsS0FBSyxDQUFDRyxTQUFTLEdBQUcsUUFBUTtnQkFDOUIsQ0FBQyxNQUFLLElBQUlILEtBQUssQ0FBQ0csU0FBUyxJQUFJLE9BQU8sRUFBRTtrQkFDbENILEtBQUssQ0FBQ0csU0FBUyxHQUFHLFNBQVM7Z0JBQy9CLENBQUMsTUFBTSxJQUFJSCxLQUFLLENBQUNHLFNBQVMsSUFBSSxVQUFVLEVBQUU7a0JBQ3RDSCxLQUFLLENBQUNHLFNBQVMsR0FBRyxLQUFLO2dCQUMzQjtnQkFDQSxJQUFJQyxPQUFPLEdBQUcsRUFBRTtnQkFFaEIsSUFBTUMsVUFBVSxHQUFHYixPQUFPLENBQUNjLE1BQU0sQ0FBQyxVQUFBQyxJQUFJO2tCQUFBLE9BQUlBLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBS1AsS0FBSyxDQUFDRyxTQUFTO2dCQUFBLEVBQUM7Z0JBQ2xGRSxVQUFVLENBQUNoQyxPQUFPLENBQUMsVUFBQ21DLEdBQUcsRUFBSztrQkFDeEJKLE9BQU8sQ0FBQ0wsSUFBSSxDQUFDUyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7Z0JBQ3BDLENBQUMsQ0FBQztnQkFDRixJQUFNQyxTQUFTLEdBQUdDLElBQUksQ0FBQ0MsS0FBSyxDQUFFUCxPQUFPLENBQUNRLE1BQU0sQ0FBQyxVQUFDQyxDQUFDLEVBQUNDLENBQUM7a0JBQUEsT0FBTUQsQ0FBQyxHQUFFQyxDQUFDO2dCQUFBLEdBQUUsQ0FBQyxDQUFDLEdBQUNWLE9BQU8sQ0FBQ3BGLE1BQU0sR0FBSSxFQUFFLENBQUMsR0FBQyxFQUFFOztnQkFFeEY7Z0JBQ0E7Z0JBQ0FELENBQUMsQ0FBQ2lGLEtBQUssQ0FBQ0Msa0JBQWtCLENBQUMsQ0FBQ2MsTUFBTSxDQUFDLGc1QkFtQlQsR0FBRyxJQUFJTixTQUFTLEdBQUUsVUFBVSxHQUFFLFlBQVksQ0FBQyx5RUFDN0MsSUFBRSxHQUFHLElBQUlBLFNBQVMsR0FBRSxVQUFVLEdBQUUsWUFBWSxDQUFDLHlFQUM3QyxJQUFFLEdBQUcsSUFBSUEsU0FBUyxHQUFFLFVBQVUsR0FBRSxZQUFZLENBQUMseUVBQzdDLElBQUUsR0FBRyxJQUFJQSxTQUFTLEdBQUUsVUFBVSxHQUFFLFlBQVksQ0FBQyx5RUFDN0MsSUFBRSxHQUFHLElBQUlBLFNBQVMsR0FBRSxVQUFVLEdBQUUsWUFBWSxDQUFDLG1JQUduRUwsT0FBTyxDQUFDcEYsTUFBTSxxREFDYixDQUFDO2dCQUNKO2NBQ0osQ0FBQyxDQUFDO2NBQ0Y7WUFDRixDQUFDLENBQUMsQ0FHRGdHLEtBQUssQ0FBQyxVQUFDQyxHQUFHLEVBQUs7Y0FDWkMsT0FBTyxDQUFDQyxHQUFHLENBQUNGLEdBQUcsQ0FBQztZQUNwQixDQUFDLENBQUM7VUFDUjtVQUNBLElBQUlsRyxDQUFDLENBQUN1RSxJQUFJLENBQUMsQ0FBQ25DLElBQUksQ0FBQyw0Q0FBNEMsQ0FBQyxDQUFDbkMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUN2RUQsQ0FBQyxDQUFDLDRDQUE0QyxDQUFDLENBQUNnRyxNQUFNLENBQUNoRyxDQUFDLENBQUN1RSxJQUFJLENBQUMsQ0FBQ25DLElBQUksQ0FBQyw0Q0FBNEMsQ0FBQyxDQUFDQyxRQUFRLEVBQUUsQ0FBQztZQUM3SHZCLFVBQVUsRUFBRTtZQUVaZCxDQUFDLENBQUMsa0JBQWtCLENBQUMsQ0FBQ21DLElBQUksQ0FBQ25DLENBQUMsQ0FBQ3VFLElBQUksQ0FBQyxDQUFDbkMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUNELElBQUksRUFBRSxDQUFDO1lBRW5FbkMsQ0FBQyxDQUFDLDBCQUEwQixDQUFDLENBQUNxRyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUNDLElBQUksRUFBRTtZQUUzRCxJQUFJQyxNQUFNLENBQUN2RyxDQUFDLENBQUN1RSxJQUFJLENBQUMsQ0FBQ25DLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDb0UsSUFBSSxFQUFFLENBQUMsSUFBSUQsTUFBTSxDQUFDdkcsQ0FBQyxDQUFDdUUsSUFBSSxDQUFDLENBQUNuQyxJQUFJLENBQUMseUJBQXlCLENBQUMsQ0FBQ29FLElBQUksRUFBRSxDQUFDLEVBQUU7Y0FDaEh4RyxDQUFDLENBQUMsbUNBQW1DLENBQUMsQ0FBQ3dHLElBQUksQ0FBQ3hHLENBQUMsQ0FBQ3VFLElBQUksQ0FBQyxDQUFDbkMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLENBQUNvRSxJQUFJLEVBQUUsQ0FBQztZQUM3RixDQUFDLE1BQU07Y0FDSHhHLENBQUMsQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDd0csSUFBSSxDQUFDeEcsQ0FBQyxDQUFDdUUsSUFBSSxDQUFDLENBQUNuQyxJQUFJLENBQUMseUJBQXlCLENBQUMsQ0FBQ29FLElBQUksRUFBRSxDQUFDO1lBQy9GO1lBRUExQyxRQUFRLEdBQUc5RCxDQUFDLENBQUMsMkJBQTJCLENBQUMsQ0FBQytELElBQUksRUFBRTtZQUVoRCxJQUFJRCxRQUFRLENBQUM3RCxNQUFNLEtBQUssQ0FBQyxFQUFFO2NBQ3ZCRCxDQUFDLENBQUMsMEJBQTBCLENBQUMsQ0FBQ2tFLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQ3NDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztZQUM5RTtZQUVBLElBQUd4RyxDQUFDLENBQUN1RSxJQUFJLENBQUMsQ0FBQ25DLElBQUksQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDbkMsTUFBTSxHQUFHLENBQUMsRUFBQztjQUM5RHNDLHVGQUF1QixDQUFDekMsT0FBTyxFQUFFLDJCQUEyQixDQUFDO1lBQ2pFO1VBQ0o7UUFDSjtNQUNKLENBQUMsQ0FBQztJQUNOLENBQUMsQ0FBQztFQUNOLENBQUM7RUFBQSxPQUVEVyxtQkFBbUIsR0FBbkIsK0JBQXFCO0lBQ2pCLElBQUlULENBQUMsQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO01BQ25ERCxDQUFDLENBQUMsbUNBQW1DLENBQUMsQ0FBQ3lHLFFBQVEsQ0FBQztRQUM1QyxnQkFBZ0IsRUFBRSxLQUFLO1FBQ3ZCLFNBQVMsRUFBRyxDQUFDO1FBQ2IsT0FBTyxFQUFHLEdBQUc7UUFDYixRQUFRLEVBQUcsR0FBRztRQUNkLFdBQVcsRUFBRyxLQUFLO1FBQ25CLGNBQWMsRUFBRyxNQUFNO1FBQ3ZCLGVBQWUsRUFBRztNQUN0QixDQUFDLENBQUM7SUFDTjtJQUVBLElBQUl6RyxDQUFDLENBQUMsb0NBQW9DLENBQUMsQ0FBQ0MsTUFBTSxHQUFHLENBQUMsRUFBRTtNQUNwREQsQ0FBQyxDQUFDLG9DQUFvQyxDQUFDLENBQUN5RyxRQUFRLENBQUM7UUFDN0MsZ0JBQWdCLEVBQUUsS0FBSztRQUN2QixTQUFTLEVBQUcsQ0FBQztRQUNiLE9BQU8sRUFBRyxHQUFHO1FBQ2IsUUFBUSxFQUFHLEdBQUc7UUFDZCxXQUFXLEVBQUcsS0FBSztRQUNuQixjQUFjLEVBQUcsTUFBTTtRQUN2QixlQUFlLEVBQUc7TUFDdEIsQ0FBQyxDQUFDO0lBQ047RUFDSixDQUFDO0VBQUEsT0FFRC9GLHdCQUF3QixHQUF4QixrQ0FBeUJaLE9BQU8sRUFBQztJQUM3QixJQUFHRSxDQUFDLENBQUMsMEJBQTBCLENBQUMsQ0FBQ0MsTUFBTSxHQUFHLENBQUMsRUFBQztNQUN4Q3NDLHVGQUF1QixDQUFDekMsT0FBTyxFQUFFLG1CQUFtQixDQUFDO0lBQ3pEO0lBRUEsSUFBR0UsQ0FBQyxDQUFDLHFDQUFxQyxDQUFDLENBQUNDLE1BQU0sR0FBRyxDQUFDLEVBQUM7TUFDbkRzQyx1RkFBdUIsQ0FBQ3pDLE9BQU8sRUFBRSwyQkFBMkIsQ0FBQztJQUNqRTtFQUNKLENBQUM7RUFBQSxPQUNEZ0IsVUFBVSxHQUFWLHNCQUFhO0lBQ1QsSUFBSVksS0FBSyxHQUFHd0IsUUFBUSxDQUFDQyxnQkFBZ0IsQ0FBQyxjQUFjLENBQUM7SUFDckQsSUFBSXNCLE9BQU8sR0FBRyxFQUFFO0lBQ2hCQyxPQUFPLENBQUNDLEdBQUcsQ0FBQyxDQUNSQyxLQUFLLENBQUMsa0dBQWtHLENBQUMsQ0FBQ0MsSUFBSSxDQUFDLFVBQUFDLENBQUM7TUFBQSxPQUFJQSxDQUFDLENBQUNDLElBQUksRUFBRTtJQUFBLEVBQUMsQ0FBQ0YsSUFBSSxDQUFDLFVBQUFDLENBQUMsRUFBRTtNQUVwSEwsT0FBTyxDQUFDTyxJQUFJLE9BQVpQLE9BQU8sRUFBU0ssQ0FBQyxDQUFDO0lBQUEsQ0FBQyxDQUFDLEVBQ3RDRixLQUFLLENBQUMsMkdBQTJHLENBQUMsQ0FBQ0MsSUFBSSxDQUFDLFVBQUFDLENBQUM7TUFBQSxPQUFJQSxDQUFDLENBQUNDLElBQUksRUFBRTtJQUFBLEVBQUMsQ0FBQ0YsSUFBSSxDQUFDLFVBQUFDLENBQUMsRUFBRTtNQUU3SEwsT0FBTyxDQUFDTyxJQUFJLE9BQVpQLE9BQU8sRUFBU0ssQ0FBQyxDQUFDO0lBQUEsQ0FBQyxDQUFDLEVBQ3RDRixLQUFLLENBQUMsNEdBQTRHLENBQUMsQ0FBQ0MsSUFBSSxDQUFDLFVBQUFDLENBQUM7TUFBQSxPQUFJQSxDQUFDLENBQUNDLElBQUksRUFBRTtJQUFBLEVBQUMsQ0FBQ0YsSUFBSSxDQUFDLFVBQUFDLENBQUMsRUFBRTtNQUU5SEwsT0FBTyxDQUFDTyxJQUFJLE9BQVpQLE9BQU8sRUFBU0ssQ0FBQyxDQUFDO0lBQUEsQ0FBQyxDQUFDLEVBQ3RDRixLQUFLLENBQUMsNEdBQTRHLENBQUMsQ0FBQ0MsSUFBSSxDQUFDLFVBQUFDLENBQUM7TUFBQSxPQUFJQSxDQUFDLENBQUNDLElBQUksRUFBRTtJQUFBLEVBQUMsQ0FBQ0YsSUFBSSxDQUFDLFVBQUFDLENBQUMsRUFBRTtNQUU5SEwsT0FBTyxDQUFDTyxJQUFJLE9BQVpQLE9BQU8sRUFBU0ssQ0FBQyxDQUFDO0lBQUEsQ0FBQyxDQUFDLENBQ3ZDLENBQUMsQ0FDREQsSUFBSSxDQUFDLFVBQUNDLENBQUMsRUFBSztNQUNYcEQsS0FBSyxDQUFDNEIsT0FBTyxDQUFDLFVBQUMyQixLQUFLLEVBQUs7UUFDckI7UUFDQWpGLENBQUMsQ0FBQ2lGLEtBQUssQ0FBQ0Msa0JBQWtCLENBQUMsQ0FBQ0MsS0FBSyxFQUFFO1FBQ25DLElBQUlGLEtBQUssQ0FBQ0csU0FBUyxJQUFJLE1BQU0sRUFBRTtVQUMzQkgsS0FBSyxDQUFDRyxTQUFTLEdBQUcsUUFBUTtRQUM5QixDQUFDLE1BQUssSUFBSUgsS0FBSyxDQUFDRyxTQUFTLElBQUksT0FBTyxFQUFFO1VBQ2xDSCxLQUFLLENBQUNHLFNBQVMsR0FBRyxTQUFTO1FBQy9CLENBQUMsTUFBTSxJQUFJSCxLQUFLLENBQUNHLFNBQVMsSUFBSSxVQUFVLEVBQUU7VUFDdENILEtBQUssQ0FBQ0csU0FBUyxHQUFHLEtBQUs7UUFDM0I7UUFDQSxJQUFJQyxPQUFPLEdBQUcsRUFBRTtRQUVoQixJQUFNcUIsU0FBUyxHQUFHakMsT0FBTyxDQUFDYyxNQUFNLENBQUMsVUFBQUMsSUFBSTtVQUFBLE9BQUlBLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBS1AsS0FBSyxDQUFDRyxTQUFTO1FBQUEsRUFBQztRQUNqRnNCLFNBQVMsQ0FBQ3BELE9BQU8sQ0FBQyxVQUFDcUQsSUFBSSxFQUFLO1VBQ3hCdEIsT0FBTyxDQUFDTCxJQUFJLENBQUMyQixJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDckMsQ0FBQyxDQUFDO1FBQ0YsSUFBTWpCLFNBQVMsR0FBR0MsSUFBSSxDQUFDQyxLQUFLLENBQUVQLE9BQU8sQ0FBQ1EsTUFBTSxDQUFDLFVBQUNDLENBQUMsRUFBQ0MsQ0FBQztVQUFBLE9BQU1ELENBQUMsR0FBRUMsQ0FBQztRQUFBLEdBQUUsQ0FBQyxDQUFDLEdBQUNWLE9BQU8sQ0FBQ3BGLE1BQU0sR0FBSSxFQUFFLENBQUMsR0FBQyxFQUFFOztRQUV4RjtRQUNBO1FBQ0FELENBQUMsQ0FBQ2lGLEtBQUssQ0FBQ0Msa0JBQWtCLENBQUMsQ0FBQ2MsTUFBTSxDQUFDLDIzQkE2QlQsR0FBRyxJQUFJTixTQUFTLEdBQUUsVUFBVSxHQUFFLFlBQVksQ0FBQyx5REFDN0MsSUFBRSxHQUFHLElBQUlBLFNBQVMsR0FBRSxVQUFVLEdBQUUsWUFBWSxDQUFDLHlEQUM3QyxJQUFFLEdBQUcsSUFBSUEsU0FBUyxHQUFFLFVBQVUsR0FBRSxZQUFZLENBQUMseURBQzdDLElBQUUsR0FBRyxJQUFJQSxTQUFTLEdBQUUsVUFBVSxHQUFFLFlBQVksQ0FBQyx5REFDN0MsSUFBRSxHQUFHLElBQUlBLFNBQVMsR0FBRSxVQUFVLEdBQUUsWUFBWSxDQUFDLG1GQUduRUwsT0FBTyxDQUFDcEYsTUFBTSxxQ0FDYixDQUFDO1FBQ0o7TUFDSixDQUFDLENBQUM7TUFDRjtJQUNGLENBQUMsQ0FBQyxDQUdEZ0csS0FBSyxDQUFDLFVBQUNDLEdBQUcsRUFBSztNQUNaQyxPQUFPLENBQUNDLEdBQUcsQ0FBQ0YsR0FBRyxDQUFDO0lBQ3BCLENBQUMsQ0FBQztFQUNSLENBQUM7RUFBQTtBQUFBLEVBcFVpQ1UsZ0RBQVciLCJmaWxlIjoidGhlbWUtYnVuZGxlLmNodW5rLjE0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaG9va3MgfSBmcm9tICdAYmlnY29tbWVyY2Uvc3RlbmNpbC11dGlscyc7XHJcbmltcG9ydCBDYXRhbG9nUGFnZSBmcm9tICcuL2NhdGFsb2cnO1xyXG5pbXBvcnQgY29tcGFyZVByb2R1Y3RzIGZyb20gJy4vZ2xvYmFsL2NvbXBhcmUtcHJvZHVjdHMnO1xyXG5pbXBvcnQgRmFjZXRlZFNlYXJjaCBmcm9tICcuL2NvbW1vbi9mYWNldGVkLXNlYXJjaCc7XHJcbmltcG9ydCBwcm9kdWN0RGlzcGxheU1vZGUgZnJvbSAnLi9oYWxvdGhlbWVzL2hhbG9Qcm9kdWN0RGlzcGxheU1vZGUnO1xyXG5pbXBvcnQgaGFsb1NpZGVBbGxDYXRlZ29yeSBmcm9tICcuL2hhbG90aGVtZXMvaGFsb1NpZGVBbGxDYXRlZ29yeSc7XHJcbmltcG9ydCBoYWxvQWRkT3B0aW9uRm9yUHJvZHVjdCBmcm9tICcuL2hhbG90aGVtZXMvaGFsb0FkZE9wdGlvbkZvclByb2R1Y3RDYXJkJztcclxuaW1wb3J0IGhhbG9TdGlja3lUb29sYmFyIGZyb20gJy4vaGFsb3RoZW1lcy9oYWxvU3RpY2t5VG9vbGJhcic7XHJcbmltcG9ydCBmYW5jeWJveCBmcm9tICcuL2hhbG90aGVtZXMvanF1ZXJ5LmZhbmN5Ym94Lm1pbic7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYXRlZ29yeSBleHRlbmRzIENhdGFsb2dQYWdlIHtcclxuICAgIG9uUmVhZHkoKSB7XHJcbiAgICAgICAgY29tcGFyZVByb2R1Y3RzKHRoaXMuY29udGV4dC51cmxzKTtcclxuXHJcbiAgICAgICAgaWYgKCQoJyNmYWNldGVkU2VhcmNoJykubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmluaXRGYWNldGVkU2VhcmNoKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5vblNvcnRCeVN1Ym1pdCA9IHRoaXMub25Tb3J0QnlTdWJtaXQuYmluZCh0aGlzKTtcclxuICAgICAgICAgICAgaG9va3Mub24oJ3NvcnRCeS1zdWJtaXR0ZWQnLCB0aGlzLm9uU29ydEJ5U3VibWl0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuc2hvd1Byb2R1Y3RzUGVyUGFnZSgpO1xyXG4gICAgICAgIHRoaXMuc2hvd01vcmVQcm9kdWN0cygpO1xyXG4gICAgICAgIHRoaXMuZmFuY3lib3hWaWRlb0Jhbm5lcigpO1xyXG4gICAgICAgIHRoaXMubG9hZE9wdGlvbkZvclByb2R1Y3RDYXJkKHRoaXMuY29udGV4dCk7XHJcblxyXG4gICAgICAgIGhhbG9TaWRlQWxsQ2F0ZWdvcnkoKTtcclxuICAgICAgICBwcm9kdWN0RGlzcGxheU1vZGUoKTtcclxuICAgICAgICBoYWxvU3RpY2t5VG9vbGJhcih0aGlzLmNvbnRleHQpO1xyXG4gICAgICAgIHRoaXMucmV2aWV3U2hvdygpXHJcblxyXG4gICAgfVxyXG5cclxuICAgIGluaXRGYWNldGVkU2VhcmNoKCkge1xyXG4gICAgICAgIGNvbnN0ICRwcm9kdWN0TGlzdGluZ0NvbnRhaW5lciA9ICQoJyNwcm9kdWN0LWxpc3RpbmctY29udGFpbmVyIC5wcm9kdWN0TGlzdGluZycpO1xyXG4gICAgICAgIGNvbnN0ICRmYWNldGVkU2VhcmNoQ29udGFpbmVyID0gJCgnI2ZhY2V0ZWQtc2VhcmNoLWNvbnRhaW5lcicpO1xyXG4gICAgICAgIGNvbnN0ICRwYWdpbmF0b3JDb250YWluZXIgPSAkKCcucGFnaW5hdGlvbicpO1xyXG4gICAgICAgIGNvbnN0ICRzaG93TW9yZUNvbnRhaW5lciA9ICQoJy5oYWxvLXByb2R1Y3Qtc2hvdy1tb3JlJyk7XHJcbiAgICAgICAgY29uc3QgcHJvZHVjdHNQZXJQYWdlID0gdGhpcy5jb250ZXh0LmNhdGVnb3J5UHJvZHVjdHNQZXJQYWdlO1xyXG4gICAgICAgIGNvbnN0IHJlcXVlc3RPcHRpb25zID0ge1xyXG4gICAgICAgICAgICBjb25maWc6IHtcclxuICAgICAgICAgICAgICAgIGNhdGVnb3J5OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2hvcF9ieV9wcmljZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBwcm9kdWN0czoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsaW1pdDogcHJvZHVjdHNQZXJQYWdlLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZToge1xyXG4gICAgICAgICAgICAgICAgcHJvZHVjdExpc3Rpbmc6ICdoYWxvdGhlbWVzL2dhbGxlcnkvaGFsby1wcm9kdWN0LWxpc3RpbmcnLFxyXG4gICAgICAgICAgICAgICAgc2lkZWJhcjogJ2NhdGVnb3J5L3NpZGViYXInLFxyXG4gICAgICAgICAgICAgICAgcGFnaW5hdG9yOiAnaGFsb3RoZW1lcy9nYWxsZXJ5L2hhbG8tcHJvZHVjdC1wYWdpbmF0b3InLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzaG93TW9yZTogJ2NhdGVnb3J5L3Nob3ctbW9yZScsXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5mYWNldGVkU2VhcmNoID0gbmV3IEZhY2V0ZWRTZWFyY2gocmVxdWVzdE9wdGlvbnMsIChjb250ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICRwcm9kdWN0TGlzdGluZ0NvbnRhaW5lci5odG1sKGNvbnRlbnQucHJvZHVjdExpc3RpbmcpO1xyXG4gICAgICAgICAgICAkZmFjZXRlZFNlYXJjaENvbnRhaW5lci5odG1sKGNvbnRlbnQuc2lkZWJhcik7XHJcbiAgICAgICAgICAgICRwYWdpbmF0b3JDb250YWluZXIuaHRtbCgkKGNvbnRlbnQucGFnaW5hdG9yKS5maW5kKCcucGFnaW5hdGlvbicpLmNoaWxkcmVuKCkpO1xyXG4gICAgICAgICAgICAkc2hvd01vcmVDb250YWluZXIuaHRtbCgkKGNvbnRlbnQucGFnaW5hdG9yKS5maW5kKCcuaGFsby1wcm9kdWN0LXNob3ctbW9yZScpLmNoaWxkcmVuKCkpO1xyXG5cclxuICAgICAgICAgICAgJCgnYm9keScpLnRyaWdnZXJIYW5kbGVyKCdjb21wYXJlUmVzZXQnKTtcclxuXHJcbiAgICAgICAgICAgIGlmKCQoJyNwcm9kdWN0LWxpc3RpbmctY29udGFpbmVyIC5wcm9kdWN0JykubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgICAgICBoYWxvQWRkT3B0aW9uRm9yUHJvZHVjdCh0aGlzLmNvbnRleHQsICdwcm9kdWN0LWxpc3RpbmctY29udGFpbmVyJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2hvd1Byb2R1Y3RzUGVyUGFnZSgpO1xyXG4gICAgICAgICAgICB0aGlzLnNob3dNb3JlUHJvZHVjdHMoKTtcclxuXHJcbiAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcclxuICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogMCxcclxuICAgICAgICAgICAgfSwgMTAwKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93UHJvZHVjdHNQZXJQYWdlKCl7XHJcbiAgICAgICAgdGhpcy5yZXZpZXdTaG93KClcclxuXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdmFyIHVybCA9IG5ldyBVUkwod2luZG93LmxvY2F0aW9uLmhyZWYpO1xyXG4gICAgICAgICAgICB2YXIgYyA9IHVybC5zZWFyY2hQYXJhbXMuZ2V0KFwibGltaXRcIik7XHJcbiAgICAgICAgICAgIGlmKGMgIT0gbnVsbCl7XHJcbiAgICAgICAgICAgICAgICB2YXIgbGltaXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdzZWxlY3QjbGltaXQgb3B0aW9uJyk7XHJcbiAgICAgICAgICAgICAgICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKGxpbWl0LCBmdW5jdGlvbihlbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZWxlbWVudC52YWx1ZSA9PSBjKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5zZWxlY3RlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGNhdGNoKGUpIHt9XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd01vcmVQcm9kdWN0cygpIHtcclxuICAgICAgICBjb25zdCBjb250ZXh0ID0gdGhpcy5jb250ZXh0O1xyXG5cclxuICAgICAgICAkKCcjbGlzdGluZy1zaG93bW9yZUJ0biA+IGEnKS5vbignY2xpY2snLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBuZXh0UGFnZSA9ICQoXCIucGFnaW5hdGlvbi1pdGVtLS1jdXJyZW50XCIpLm5leHQoKSxcclxuICAgICAgICAgICAgICAgIGxpbmsgPSBuZXh0UGFnZS5maW5kKFwiYVwiKS5hdHRyKFwiaHJlZlwiKTtcclxuXHJcbiAgICAgICAgICAgICQoJyNsaXN0aW5nLXNob3dtb3JlQnRuID4gYScpLmFkZENsYXNzKCdsb2FkaW5nJyk7XHJcblxyXG4gICAgICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgdHlwZTogJ2dldCcsXHJcbiAgICAgICAgICAgICAgICB1cmw6IGxpbmsucmVwbGFjZShcImh0dHA6Ly9cIiwgXCIvL1wiKSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAgcmV2aWV3U2hvdyh4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsaW1pdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcm9kdWN0U2t1MScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmV2aWV3MiA9IFtdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFByb21pc2UuYWxsKFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZldGNoKFwiaHR0cHM6Ly93d3cudGVhbWRlc2submV0L3NlY3VyZS9hcGkvdjIvNTY1NTQvQkVBMjU2NjU5MEVGNEQxNEFBOEQzNUFEMEUyQ0VBNzcvUmV2aWV3L3NlbGVjdC5qc29uXCIpLnRoZW4ociA9PiByLmpzb24oKSkudGhlbihyPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXZpZXcyLnB1c2goLi4ucil9KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZldGNoKFwiaHR0cHM6Ly93d3cudGVhbWRlc2submV0L3NlY3VyZS9hcGkvdjIvNTY1NTQvQkVBMjU2NjU5MEVGNEQxNEFBOEQzNUFEMEUyQ0VBNzcvUmV2aWV3L3NlbGVjdC5qc29uP3NraXA9NTAwXCIpLnRoZW4ociA9PiByLmpzb24oKSkudGhlbihyPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXZpZXcyLnB1c2goLi4ucil9KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZldGNoKFwiaHR0cHM6Ly93d3cudGVhbWRlc2submV0L3NlY3VyZS9hcGkvdjIvNTY1NTQvQkVBMjU2NjU5MEVGNEQxNEFBOEQzNUFEMEUyQ0VBNzcvUmV2aWV3L3NlbGVjdC5qc29uP3NraXA9MTAwMFwiKS50aGVuKHIgPT4gci5qc29uKCkpLnRoZW4ocj0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV2aWV3Mi5wdXNoKC4uLnIpfSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmZXRjaChcImh0dHBzOi8vd3d3LnRlYW1kZXNrLm5ldC9zZWN1cmUvYXBpL3YyLzU2NTU0L0JFQTI1NjY1OTBFRjREMTRBQThEMzVBRDBFMkNFQTc3L1Jldmlldy9zZWxlY3QuanNvbj9za2lwPTE1MDBcIikudGhlbihyID0+IHIuanNvbigpKS50aGVuKHI9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldmlldzIucHVzaCguLi5yKX0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbWl0LmZvckVhY2goKGl0ZW0xKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coaXRlbS5pbm5lckhUTUwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJChpdGVtMS5uZXh0RWxlbWVudFNpYmxpbmcpLmVtcHR5KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbTEuaW5uZXJIVE1MID09ICdNMTA2Jykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtMS5pbm5lckhUTUwgPSAnTTEwNiMxJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmIChpdGVtMS5pbm5lckhUTUwgPT0gJ00xMDZMJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtMS5pbm5lckhUTUwgPSAnTTEwNkwjMSdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGl0ZW0xLmlubmVySFRNTCA9PSAnUXVlZW5fMTgnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0xLmlubmVySFRNTCA9ICdRMTgnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmV2aWV3MyA9IFtdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZmlsdGVyZWRBciA9IHJldmlldzIuZmlsdGVyKGl0ZW0gPT4gaXRlbVsnUHJvZHVjdCBTS1UnXSA9PT0gaXRlbTEuaW5uZXJIVE1MKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcmVkQXIuZm9yRWFjaCgocmV2KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldmlldzMucHVzaChyZXZbJ1JldmlldyByYXRlJ10pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZXZpZXdBdmcgPSBNYXRoLnJvdW5kKChyZXZpZXczLnJlZHVjZSgoYSxiICkgPT4gYSsgYiwgMCkvcmV2aWV3My5sZW5ndGgpICogMTApLzEwXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXZpZXdBdmcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoaXRlbTEubmV4dEVsZW1lbnRTaWJsaW5nKS5hcHBlbmQoYFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzdHlsZT4gICAgLmNoZWNrZWQge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogcmdiKDI1NSwgMjEwLCAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZhLXN0YXItbyB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IHJnYigyNTUsIDIxMCwgMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQG1lZGlhIChtaW4td2lkdGg6IDc2OHB4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNoZWNraW5nIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2FwOjVweDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3N0eWxlPlxyXG4gICAgICAgICAgICAgICAgPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIGhyZWY9XCJodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9mb250LWF3ZXNvbWUvNC43LjAvY3NzL2ZvbnQtYXdlc29tZS5taW4uY3NzXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmYSBmYS1zdGFyYCsoMC41IDw9IHJldmlld0F2Zz8gJyBjaGVja2VkJzogJyBmYS1zdGFyLW8nKSArIGBcIj48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmYSBmYS1zdGFyYCsoMS41IDw9IHJldmlld0F2Zz8gJyBjaGVja2VkJzogJyBmYS1zdGFyLW8nKSArIGBcIj48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmYSBmYS1zdGFyYCsoMi41IDw9IHJldmlld0F2Zz8gJyBjaGVja2VkJzogJyBmYS1zdGFyLW8nKSArIGBcIj48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmYSBmYS1zdGFyYCsoMy41IDw9IHJldmlld0F2Zz8gJyBjaGVja2VkJzogJyBmYS1zdGFyLW8nKSArIGBcIj48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmYSBmYS1zdGFyYCsoNC41IDw9IHJldmlld0F2Zz8gJyBjaGVja2VkJzogJyBmYS1zdGFyLW8nKSArIGBcIj48L3NwYW4+ICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR7cmV2aWV3My5sZW5ndGh9IFJlc2XDsWFzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5gKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICQoaXRlbTEubmV4dEVsZW1lbnRTaWJsaW5nKS5hcHBlbmQoYDxkaXY+JHtyZXZpZXdBdmd9PC9kaXY+YClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgIGNvbnNvbGUubG9nKHJldmlldzIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkKGRhdGEpLmZpbmQoJyNwcm9kdWN0LWxpc3RpbmctY29udGFpbmVyIC5wcm9kdWN0TGlzdGluZycpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnI3Byb2R1Y3QtbGlzdGluZy1jb250YWluZXIgLnByb2R1Y3RMaXN0aW5nJykuYXBwZW5kKCQoZGF0YSkuZmluZCgnI3Byb2R1Y3QtbGlzdGluZy1jb250YWluZXIgLnByb2R1Y3RMaXN0aW5nJykuY2hpbGRyZW4oKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldmlld1Nob3coKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnBhZ2luYXRpb24tbGlzdCcpLmh0bWwoJChkYXRhKS5maW5kKFwiLnBhZ2luYXRpb24tbGlzdFwiKS5odG1sKCkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnI2xpc3Rpbmctc2hvd21vcmVCdG4gPiBhJykucmVtb3ZlQ2xhc3MoJ2xvYWRpbmcnKS5ibHVyKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoTnVtYmVyKCQoZGF0YSkuZmluZCgnLnBhZ2luYXRpb24taW5mbyAuZW5kJykudGV4dCgpKSA8PSBOdW1iZXIoJChkYXRhKS5maW5kKCcucGFnaW5hdGlvbi1pbmZvIC50b3RhbCcpLnRleHQoKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5wYWdpbmF0aW9uIC5wYWdpbmF0aW9uLWluZm8gLmVuZCcpLnRleHQoJChkYXRhKS5maW5kKCcucGFnaW5hdGlvbi1pbmZvIC5lbmQnKS50ZXh0KCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnBhZ2luYXRpb24gLnBhZ2luYXRpb24taW5mbyAuZW5kJykudGV4dCgkKGRhdGEpLmZpbmQoJy5wYWdpbmF0aW9uLWluZm8gLnRvdGFsJykudGV4dCgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dFBhZ2UgPSAkKFwiLnBhZ2luYXRpb24taXRlbS0tY3VycmVudFwiKS5uZXh0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobmV4dFBhZ2UubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcjbGlzdGluZy1zaG93bW9yZUJ0biA+IGEnKS5hZGRDbGFzcygnZGlzYWJsZScpLnRleHQoJ05vIG1vcmUgcHJvZHVjdHMnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoJChkYXRhKS5maW5kKCcjcHJvZHVjdC1saXN0aW5nLWNvbnRhaW5lciAucHJvZHVjdCcpLmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFsb0FkZE9wdGlvbkZvclByb2R1Y3QoY29udGV4dCwgJ3Byb2R1Y3QtbGlzdGluZy1jb250YWluZXInKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZmFuY3lib3hWaWRlb0Jhbm5lcigpe1xyXG4gICAgICAgIGlmICgkKFwiLnZpZGVvLWJsb2NrLWltYWdlW2RhdGEtZmFuY3lib3hdXCIpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgJChcIi52aWRlby1ibG9jay1pbWFnZVtkYXRhLWZhbmN5Ym94XVwiKS5mYW5jeWJveCh7XHJcbiAgICAgICAgICAgICAgICAnYXV0b0RpbWVuc2lvbnMnOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICdwYWRkaW5nJyA6IDAsXHJcbiAgICAgICAgICAgICAgICAnd2lkdGgnIDogOTcwLFxyXG4gICAgICAgICAgICAgICAgJ2hlaWdodCcgOiA2MDAsXHJcbiAgICAgICAgICAgICAgICAnYXV0b1NjYWxlJyA6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgJ3RyYW5zaXRpb25JbicgOiAnbm9uZScsXHJcbiAgICAgICAgICAgICAgICAndHJhbnNpdGlvbk91dCcgOiAnbm9uZSdcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoJChcIi5idXR0b24tcG9wdXAtdmlkZW9bZGF0YS1mYW5jeWJveF1cIikubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAkKFwiLmJ1dHRvbi1wb3B1cC12aWRlb1tkYXRhLWZhbmN5Ym94XVwiKS5mYW5jeWJveCh7XHJcbiAgICAgICAgICAgICAgICAnYXV0b0RpbWVuc2lvbnMnOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICdwYWRkaW5nJyA6IDAsXHJcbiAgICAgICAgICAgICAgICAnd2lkdGgnIDogOTcwLFxyXG4gICAgICAgICAgICAgICAgJ2hlaWdodCcgOiA2MDAsXHJcbiAgICAgICAgICAgICAgICAnYXV0b1NjYWxlJyA6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgJ3RyYW5zaXRpb25JbicgOiAnbm9uZScsXHJcbiAgICAgICAgICAgICAgICAndHJhbnNpdGlvbk91dCcgOiAnbm9uZSdcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGxvYWRPcHRpb25Gb3JQcm9kdWN0Q2FyZChjb250ZXh0KXtcclxuICAgICAgICBpZigkKCcjZmVhdHVyZWQtcHJvZHVjdHMgLmNhcmQnKS5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgaGFsb0FkZE9wdGlvbkZvclByb2R1Y3QoY29udGV4dCwgJ2ZlYXR1cmVkLXByb2R1Y3RzJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZigkKCcjcHJvZHVjdC1saXN0aW5nLWNvbnRhaW5lciAucHJvZHVjdCcpLmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICBoYWxvQWRkT3B0aW9uRm9yUHJvZHVjdChjb250ZXh0LCAncHJvZHVjdC1saXN0aW5nLWNvbnRhaW5lcicpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldmlld1Nob3coKSB7XHJcbiAgICAgICAgdmFyIGxpbWl0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByb2R1Y3RTa3UxJyk7XHJcbiAgICAgICAgbGV0IHJldmlldzIgPSBbXVxyXG4gICAgICAgIFByb21pc2UuYWxsKFtcclxuICAgICAgICAgICAgZmV0Y2goXCJodHRwczovL3d3dy50ZWFtZGVzay5uZXQvc2VjdXJlL2FwaS92Mi81NjU1NC9CRUEyNTY2NTkwRUY0RDE0QUE4RDM1QUQwRTJDRUE3Ny9SZXZpZXcvc2VsZWN0Lmpzb25cIikudGhlbihyID0+IHIuanNvbigpKS50aGVuKHI9PntcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXZpZXcyLnB1c2goLi4ucil9KSxcclxuICAgICAgICAgICAgZmV0Y2goXCJodHRwczovL3d3dy50ZWFtZGVzay5uZXQvc2VjdXJlL2FwaS92Mi81NjU1NC9CRUEyNTY2NTkwRUY0RDE0QUE4RDM1QUQwRTJDRUE3Ny9SZXZpZXcvc2VsZWN0Lmpzb24/c2tpcD01MDBcIikudGhlbihyID0+IHIuanNvbigpKS50aGVuKHI9PntcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXZpZXcyLnB1c2goLi4ucil9KSxcclxuICAgICAgICAgICAgZmV0Y2goXCJodHRwczovL3d3dy50ZWFtZGVzay5uZXQvc2VjdXJlL2FwaS92Mi81NjU1NC9CRUEyNTY2NTkwRUY0RDE0QUE4RDM1QUQwRTJDRUE3Ny9SZXZpZXcvc2VsZWN0Lmpzb24/c2tpcD0xMDAwXCIpLnRoZW4ociA9PiByLmpzb24oKSkudGhlbihyPT57XHJcbiAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV2aWV3Mi5wdXNoKC4uLnIpfSksXHJcbiAgICAgICAgICAgIGZldGNoKFwiaHR0cHM6Ly93d3cudGVhbWRlc2submV0L3NlY3VyZS9hcGkvdjIvNTY1NTQvQkVBMjU2NjU5MEVGNEQxNEFBOEQzNUFEMEUyQ0VBNzcvUmV2aWV3L3NlbGVjdC5qc29uP3NraXA9MTUwMFwiKS50aGVuKHIgPT4gci5qc29uKCkpLnRoZW4ocj0+e1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldmlldzIucHVzaCguLi5yKX0pLFxyXG4gICAgICAgICAgXSlcclxuICAgICAgICAgIC50aGVuKChyKSA9PiB7XHJcbiAgICAgICAgICAgIGxpbWl0LmZvckVhY2goKGl0ZW0xKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhpdGVtLmlubmVySFRNTClcclxuICAgICAgICAgICAgICAgICQoaXRlbTEubmV4dEVsZW1lbnRTaWJsaW5nKS5lbXB0eSgpXHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbTEuaW5uZXJIVE1MID09ICdNMTA2Jykge1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0xLmlubmVySFRNTCA9ICdNMTA2IzEnXHJcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZiAoaXRlbTEuaW5uZXJIVE1MID09ICdNMTA2TCcpIHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtMS5pbm5lckhUTUwgPSAnTTEwNkwjMSdcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaXRlbTEuaW5uZXJIVE1MID09ICdRdWVlbl8xOCcpIHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtMS5pbm5lckhUTUwgPSAnUTE4J1xyXG4gICAgICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgICAgIGxldCByZXZpZXczID0gW11cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgY29uc3QgZmlsdGVyQXJyID0gcmV2aWV3Mi5maWx0ZXIoaXRlbSA9PiBpdGVtWydQcm9kdWN0IFNLVSddID09PSBpdGVtMS5pbm5lckhUTUwpXHJcbiAgICAgICAgICAgICAgICBmaWx0ZXJBcnIuZm9yRWFjaCgoZ29rdSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldmlldzMucHVzaChnb2t1WydSZXZpZXcgcmF0ZSddKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJldmlld0F2ZyA9IE1hdGgucm91bmQoKHJldmlldzMucmVkdWNlKChhLGIgKSA9PiBhKyBiLCAwKS9yZXZpZXczLmxlbmd0aCkgKiAxMCkvMTBcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXZpZXdBdmcpXHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygpXHJcbiAgICAgICAgICAgICAgICAkKGl0ZW0xLm5leHRFbGVtZW50U2libGluZykuYXBwZW5kKGBcclxuICAgICAgICAgICAgICAgIDxzdHlsZT4gICAgLmNoZWNrZWQge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiByZ2IoMjU1LCAyMTAsIDApO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAuZmEtc3Rhci1vIHtcclxuICAgICAgICAgICAgICAgIGNvbG9yOiByZ2IoMjU1LCAyMTAsIDApO1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIEBtZWRpYSAobWluLXdpZHRoOiA3NjhweCkge1xyXG4gICAgICAgICAgICAgICAgLmNoZWNraW5nIHtcclxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgICAgICAgICAgICAgIGdhcDo1cHg7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgQG1lZGlhIChtaW4td2lkdGg6IDEwMjVweCkge1xyXG4gICAgICAgICAgICAgICAgLmNoZWNraW5nIHtcclxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiB1bnNldDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBAbWVkaWEgKG1pbi13aWR0aDogMTQyNXB4KSB7XHJcbiAgICAgICAgICAgICAgICAuY2hlY2tpbmcge1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgPC9zdHlsZT5cclxuPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIGhyZWY9XCJodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9mb250LWF3ZXNvbWUvNC43LjAvY3NzL2ZvbnQtYXdlc29tZS5taW4uY3NzXCI+XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIDxzcGFuPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmYSBmYS1zdGFyYCsoMC41IDw9IHJldmlld0F2Zz8gJyBjaGVja2VkJzogJyBmYS1zdGFyLW8nKSArIGBcIj48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZhIGZhLXN0YXJgKygxLjUgPD0gcmV2aWV3QXZnPyAnIGNoZWNrZWQnOiAnIGZhLXN0YXItbycpICsgYFwiPjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZmEgZmEtc3RhcmArKDIuNSA8PSByZXZpZXdBdmc/ICcgY2hlY2tlZCc6ICcgZmEtc3Rhci1vJykgKyBgXCI+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmYSBmYS1zdGFyYCsoMy41IDw9IHJldmlld0F2Zz8gJyBjaGVja2VkJzogJyBmYS1zdGFyLW8nKSArIGBcIj48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZhIGZhLXN0YXJgKyg0LjUgPD0gcmV2aWV3QXZnPyAnIGNoZWNrZWQnOiAnIGZhLXN0YXItbycpICsgYFwiPjwvc3Bhbj4gICAgICBcclxuICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgJHtyZXZpZXczLmxlbmd0aH0gUmVzZcOxYXNcclxuICAgICAgICAgICAgPC9kaXY+YClcclxuICAgICAgICAgICAgICAgIC8vICQoaXRlbTEubmV4dEVsZW1lbnRTaWJsaW5nKS5hcHBlbmQoYDxkaXY+JHtyZXZpZXdBdmd9PC9kaXY+YClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLy8gICBjb25zb2xlLmxvZyhyZXZpZXcyKVxyXG4gICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICBcclxuICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=