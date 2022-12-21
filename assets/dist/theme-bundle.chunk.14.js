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
    this.infiniteScroll();
  };
  _proto.infiniteScroll = function infiniteScroll() {
    var elem = document.querySelector('.productGrid');
    var infScroll = new InfiniteScroll(elem, {
      // options
      path: '.pagination-item--next .pagination-link',
      append: '.product',
      history: false,
      scrollThreshold: 100,
      onInit: function onInit() {
        this.on('request', function () {
          $('.pagination').css('display', 'none');
          $('#listing-showmoreBtn > a').addClass('loading');
        });
        this.on('last', function () {
          $('#listing-showmoreBtn > a').removeClass('loading');
          $('#listing-showmoreBtn > a').addClass('disable').text('No more products');
        });
      }
    });
    return infScroll;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY2F0ZWdvcnkuanMiXSwibmFtZXMiOlsiQ2F0ZWdvcnkiLCJvblJlYWR5IiwiY29tcGFyZVByb2R1Y3RzIiwiY29udGV4dCIsInVybHMiLCIkIiwibGVuZ3RoIiwiaW5pdEZhY2V0ZWRTZWFyY2giLCJvblNvcnRCeVN1Ym1pdCIsImJpbmQiLCJob29rcyIsIm9uIiwic2hvd1Byb2R1Y3RzUGVyUGFnZSIsInNob3dNb3JlUHJvZHVjdHMiLCJmYW5jeWJveFZpZGVvQmFubmVyIiwibG9hZE9wdGlvbkZvclByb2R1Y3RDYXJkIiwiaGFsb1NpZGVBbGxDYXRlZ29yeSIsInByb2R1Y3REaXNwbGF5TW9kZSIsImhhbG9TdGlja3lUb29sYmFyIiwicmV2aWV3U2hvdyIsImluZmluaXRlU2Nyb2xsIiwiZWxlbSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImluZlNjcm9sbCIsIkluZmluaXRlU2Nyb2xsIiwicGF0aCIsImFwcGVuZCIsImhpc3RvcnkiLCJzY3JvbGxUaHJlc2hvbGQiLCJvbkluaXQiLCJjc3MiLCJhZGRDbGFzcyIsInJlbW92ZUNsYXNzIiwidGV4dCIsIiRwcm9kdWN0TGlzdGluZ0NvbnRhaW5lciIsIiRmYWNldGVkU2VhcmNoQ29udGFpbmVyIiwiJHBhZ2luYXRvckNvbnRhaW5lciIsIiRzaG93TW9yZUNvbnRhaW5lciIsInByb2R1Y3RzUGVyUGFnZSIsImNhdGVnb3J5UHJvZHVjdHNQZXJQYWdlIiwicmVxdWVzdE9wdGlvbnMiLCJjb25maWciLCJjYXRlZ29yeSIsInNob3BfYnlfcHJpY2UiLCJwcm9kdWN0cyIsImxpbWl0IiwidGVtcGxhdGUiLCJwcm9kdWN0TGlzdGluZyIsInNpZGViYXIiLCJwYWdpbmF0b3IiLCJzaG93TW9yZSIsImZhY2V0ZWRTZWFyY2giLCJGYWNldGVkU2VhcmNoIiwiY29udGVudCIsImh0bWwiLCJmaW5kIiwiY2hpbGRyZW4iLCJ0cmlnZ2VySGFuZGxlciIsImhhbG9BZGRPcHRpb25Gb3JQcm9kdWN0IiwiYW5pbWF0ZSIsInNjcm9sbFRvcCIsInVybCIsIlVSTCIsIndpbmRvdyIsImxvY2F0aW9uIiwiaHJlZiIsImMiLCJzZWFyY2hQYXJhbXMiLCJnZXQiLCJxdWVyeVNlbGVjdG9yQWxsIiwiQXJyYXkiLCJwcm90b3R5cGUiLCJmb3JFYWNoIiwiY2FsbCIsImVsZW1lbnQiLCJ2YWx1ZSIsInNlbGVjdGVkIiwiZSIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJuZXh0UGFnZSIsIm5leHQiLCJsaW5rIiwiYXR0ciIsImFqYXgiLCJ0eXBlIiwicmVwbGFjZSIsInN1Y2Nlc3MiLCJkYXRhIiwieCIsInJldmlldzIiLCJQcm9taXNlIiwiYWxsIiwiZmV0Y2giLCJ0aGVuIiwiciIsImpzb24iLCJwdXNoIiwiaXRlbTEiLCJuZXh0RWxlbWVudFNpYmxpbmciLCJlbXB0eSIsImlubmVySFRNTCIsInJldmlldzMiLCJmaWx0ZXJlZEFyIiwiZmlsdGVyIiwiaXRlbSIsInJldiIsInJldmlld0F2ZyIsIk1hdGgiLCJyb3VuZCIsInJlZHVjZSIsImEiLCJiIiwiY2F0Y2giLCJlcnIiLCJjb25zb2xlIiwibG9nIiwiYmx1ciIsIk51bWJlciIsImZhbmN5Ym94IiwiZmlsdGVyQXJyIiwiZ29rdSIsIkNhdGFsb2dQYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBbUQ7QUFDZjtBQUNvQjtBQUNKO0FBQ2lCO0FBQ0Y7QUFDWTtBQUNoQjtBQUNQO0FBQUEsSUFFbkNBLFFBQVE7RUFBQTtFQUFBO0lBQUE7RUFBQTtFQUFBO0VBQUEsT0FDekJDLE9BQU8sR0FBUCxtQkFBVTtJQUNOQyx3RUFBZSxDQUFDLElBQUksQ0FBQ0MsT0FBTyxDQUFDQyxJQUFJLENBQUM7SUFFbEMsSUFBSUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUNDLE1BQU0sR0FBRyxDQUFDLEVBQUU7TUFDaEMsSUFBSSxDQUFDQyxpQkFBaUIsRUFBRTtJQUM1QixDQUFDLE1BQU07TUFD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QUUsVUFBVSxHQUFFLFlBQVksQ0FBQyxtRkFHbkVMLE9BQU8sQ0FBQ2pHLE1BQU0scUNBQ2IsQ0FBQztRQUNKO01BQ0osQ0FBQyxDQUFDO01BQ0Y7SUFDRixDQUFDLENBQUMsQ0FHRDRHLEtBQUssQ0FBQyxVQUFDQyxHQUFHLEVBQUs7TUFDWkMsT0FBTyxDQUFDQyxHQUFHLENBQUNGLEdBQUcsQ0FBQztJQUNwQixDQUFDLENBQUM7RUFDUixDQUFDO0VBQUE7QUFBQSxFQTNWaUNRLGdEQUFXIiwiZmlsZSI6InRoZW1lLWJ1bmRsZS5jaHVuay4xNC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGhvb2tzIH0gZnJvbSAnQGJpZ2NvbW1lcmNlL3N0ZW5jaWwtdXRpbHMnO1xyXG5pbXBvcnQgQ2F0YWxvZ1BhZ2UgZnJvbSAnLi9jYXRhbG9nJztcclxuaW1wb3J0IGNvbXBhcmVQcm9kdWN0cyBmcm9tICcuL2dsb2JhbC9jb21wYXJlLXByb2R1Y3RzJztcclxuaW1wb3J0IEZhY2V0ZWRTZWFyY2ggZnJvbSAnLi9jb21tb24vZmFjZXRlZC1zZWFyY2gnO1xyXG5pbXBvcnQgcHJvZHVjdERpc3BsYXlNb2RlIGZyb20gJy4vaGFsb3RoZW1lcy9oYWxvUHJvZHVjdERpc3BsYXlNb2RlJztcclxuaW1wb3J0IGhhbG9TaWRlQWxsQ2F0ZWdvcnkgZnJvbSAnLi9oYWxvdGhlbWVzL2hhbG9TaWRlQWxsQ2F0ZWdvcnknO1xyXG5pbXBvcnQgaGFsb0FkZE9wdGlvbkZvclByb2R1Y3QgZnJvbSAnLi9oYWxvdGhlbWVzL2hhbG9BZGRPcHRpb25Gb3JQcm9kdWN0Q2FyZCc7XHJcbmltcG9ydCBoYWxvU3RpY2t5VG9vbGJhciBmcm9tICcuL2hhbG90aGVtZXMvaGFsb1N0aWNreVRvb2xiYXInO1xyXG5pbXBvcnQgZmFuY3lib3ggZnJvbSAnLi9oYWxvdGhlbWVzL2pxdWVyeS5mYW5jeWJveC5taW4nO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2F0ZWdvcnkgZXh0ZW5kcyBDYXRhbG9nUGFnZSB7XHJcbiAgICBvblJlYWR5KCkge1xyXG4gICAgICAgIGNvbXBhcmVQcm9kdWN0cyh0aGlzLmNvbnRleHQudXJscyk7XHJcblxyXG4gICAgICAgIGlmICgkKCcjZmFjZXRlZFNlYXJjaCcpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5pbml0RmFjZXRlZFNlYXJjaCgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMub25Tb3J0QnlTdWJtaXQgPSB0aGlzLm9uU29ydEJ5U3VibWl0LmJpbmQodGhpcyk7XHJcbiAgICAgICAgICAgIGhvb2tzLm9uKCdzb3J0Qnktc3VibWl0dGVkJywgdGhpcy5vblNvcnRCeVN1Ym1pdCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnNob3dQcm9kdWN0c1BlclBhZ2UoKTtcclxuICAgICAgICB0aGlzLnNob3dNb3JlUHJvZHVjdHMoKTtcclxuICAgICAgICB0aGlzLmZhbmN5Ym94VmlkZW9CYW5uZXIoKTtcclxuICAgICAgICB0aGlzLmxvYWRPcHRpb25Gb3JQcm9kdWN0Q2FyZCh0aGlzLmNvbnRleHQpO1xyXG5cclxuICAgICAgICBoYWxvU2lkZUFsbENhdGVnb3J5KCk7XHJcbiAgICAgICAgcHJvZHVjdERpc3BsYXlNb2RlKCk7XHJcbiAgICAgICAgaGFsb1N0aWNreVRvb2xiYXIodGhpcy5jb250ZXh0KTtcclxuICAgICAgICB0aGlzLnJldmlld1Nob3coKVxyXG4gICAgICAgIHRoaXMuaW5maW5pdGVTY3JvbGwoKTtcclxuXHJcbiAgICB9XHJcbiAgICBpbmZpbml0ZVNjcm9sbCgpIHtcclxuIFxyXG4gICAgICAgIGNvbnN0IGVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvZHVjdEdyaWQnKTtcclxuICAgICAgICBjb25zdCBpbmZTY3JvbGwgPSBuZXcgSW5maW5pdGVTY3JvbGwoZWxlbSwge1xyXG4gICAgICAgIC8vIG9wdGlvbnNcclxuICAgICAgICAgICAgcGF0aDogJy5wYWdpbmF0aW9uLWl0ZW0tLW5leHQgLnBhZ2luYXRpb24tbGluaycsXHJcbiAgICAgICAgICAgIGFwcGVuZDogJy5wcm9kdWN0JyxcclxuICAgICAgICAgICAgaGlzdG9yeTogZmFsc2UsXHJcbiAgICAgICAgICAgIHNjcm9sbFRocmVzaG9sZDogMTAwLFxyXG4gICAgICAgICAgICBvbkluaXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbiggJ3JlcXVlc3QnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKCcucGFnaW5hdGlvbicpLmNzcygnZGlzcGxheScsICdub25lJylcclxuICAgICAgICAgICAgICAgICAgICAkKCcjbGlzdGluZy1zaG93bW9yZUJ0biA+IGEnKS5hZGRDbGFzcygnbG9hZGluZycpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uICggJ2xhc3QnICwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnI2xpc3Rpbmctc2hvd21vcmVCdG4gPiBhJykucmVtb3ZlQ2xhc3MoJ2xvYWRpbmcnKTtcclxuICAgICAgICAgICAgICAgICAgICAkKCcjbGlzdGluZy1zaG93bW9yZUJ0biA+IGEnKS5hZGRDbGFzcygnZGlzYWJsZScpLnRleHQoJ05vIG1vcmUgcHJvZHVjdHMnKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gaW5mU2Nyb2xsO1xyXG4gICAgfVxyXG4gICAgaW5pdEZhY2V0ZWRTZWFyY2goKSB7XHJcbiAgICAgICAgY29uc3QgJHByb2R1Y3RMaXN0aW5nQ29udGFpbmVyID0gJCgnI3Byb2R1Y3QtbGlzdGluZy1jb250YWluZXIgLnByb2R1Y3RMaXN0aW5nJyk7XHJcbiAgICAgICAgY29uc3QgJGZhY2V0ZWRTZWFyY2hDb250YWluZXIgPSAkKCcjZmFjZXRlZC1zZWFyY2gtY29udGFpbmVyJyk7XHJcbiAgICAgICAgY29uc3QgJHBhZ2luYXRvckNvbnRhaW5lciA9ICQoJy5wYWdpbmF0aW9uJyk7XHJcbiAgICAgICAgY29uc3QgJHNob3dNb3JlQ29udGFpbmVyID0gJCgnLmhhbG8tcHJvZHVjdC1zaG93LW1vcmUnKTtcclxuICAgICAgICBjb25zdCBwcm9kdWN0c1BlclBhZ2UgPSB0aGlzLmNvbnRleHQuY2F0ZWdvcnlQcm9kdWN0c1BlclBhZ2U7XHJcbiAgICAgICAgY29uc3QgcmVxdWVzdE9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIGNvbmZpZzoge1xyXG4gICAgICAgICAgICAgICAgY2F0ZWdvcnk6IHtcclxuICAgICAgICAgICAgICAgICAgICBzaG9wX2J5X3ByaWNlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHByb2R1Y3RzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbWl0OiBwcm9kdWN0c1BlclBhZ2UsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHRlbXBsYXRlOiB7XHJcbiAgICAgICAgICAgICAgICBwcm9kdWN0TGlzdGluZzogJ2hhbG90aGVtZXMvZ2FsbGVyeS9oYWxvLXByb2R1Y3QtbGlzdGluZycsXHJcbiAgICAgICAgICAgICAgICBzaWRlYmFyOiAnY2F0ZWdvcnkvc2lkZWJhcicsXHJcbiAgICAgICAgICAgICAgICBwYWdpbmF0b3I6ICdoYWxvdGhlbWVzL2dhbGxlcnkvaGFsby1wcm9kdWN0LXBhZ2luYXRvcicsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNob3dNb3JlOiAnY2F0ZWdvcnkvc2hvdy1tb3JlJyxcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLmZhY2V0ZWRTZWFyY2ggPSBuZXcgRmFjZXRlZFNlYXJjaChyZXF1ZXN0T3B0aW9ucywgKGNvbnRlbnQpID0+IHtcclxuICAgICAgICAgICAgJHByb2R1Y3RMaXN0aW5nQ29udGFpbmVyLmh0bWwoY29udGVudC5wcm9kdWN0TGlzdGluZyk7XHJcbiAgICAgICAgICAgICRmYWNldGVkU2VhcmNoQ29udGFpbmVyLmh0bWwoY29udGVudC5zaWRlYmFyKTtcclxuICAgICAgICAgICAgJHBhZ2luYXRvckNvbnRhaW5lci5odG1sKCQoY29udGVudC5wYWdpbmF0b3IpLmZpbmQoJy5wYWdpbmF0aW9uJykuY2hpbGRyZW4oKSk7XHJcbiAgICAgICAgICAgICRzaG93TW9yZUNvbnRhaW5lci5odG1sKCQoY29udGVudC5wYWdpbmF0b3IpLmZpbmQoJy5oYWxvLXByb2R1Y3Qtc2hvdy1tb3JlJykuY2hpbGRyZW4oKSk7XHJcblxyXG4gICAgICAgICAgICAkKCdib2R5JykudHJpZ2dlckhhbmRsZXIoJ2NvbXBhcmVSZXNldCcpO1xyXG5cclxuICAgICAgICAgICAgaWYoJCgnI3Byb2R1Y3QtbGlzdGluZy1jb250YWluZXIgLnByb2R1Y3QnKS5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgICAgIGhhbG9BZGRPcHRpb25Gb3JQcm9kdWN0KHRoaXMuY29udGV4dCwgJ3Byb2R1Y3QtbGlzdGluZy1jb250YWluZXInKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5zaG93UHJvZHVjdHNQZXJQYWdlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd01vcmVQcm9kdWN0cygpO1xyXG5cclxuICAgICAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xyXG4gICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiAwLFxyXG4gICAgICAgICAgICB9LCAxMDApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3dQcm9kdWN0c1BlclBhZ2UoKXtcclxuICAgICAgICB0aGlzLnJldmlld1Nob3coKVxyXG5cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB2YXIgdXJsID0gbmV3IFVSTCh3aW5kb3cubG9jYXRpb24uaHJlZik7XHJcbiAgICAgICAgICAgIHZhciBjID0gdXJsLnNlYXJjaFBhcmFtcy5nZXQoXCJsaW1pdFwiKTtcclxuICAgICAgICAgICAgaWYoYyAhPSBudWxsKXtcclxuICAgICAgICAgICAgICAgIHZhciBsaW1pdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3NlbGVjdCNsaW1pdCBvcHRpb24nKTtcclxuICAgICAgICAgICAgICAgIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwobGltaXQsIGZ1bmN0aW9uKGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZihlbGVtZW50LnZhbHVlID09IGMpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnNlbGVjdGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gY2F0Y2goZSkge31cclxuICAgIH1cclxuXHJcbiAgICBzaG93TW9yZVByb2R1Y3RzKCkge1xyXG4gICAgICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzLmNvbnRleHQ7XHJcblxyXG4gICAgICAgICQoJyNsaXN0aW5nLXNob3dtb3JlQnRuID4gYScpLm9uKCdjbGljaycsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgdmFyIG5leHRQYWdlID0gJChcIi5wYWdpbmF0aW9uLWl0ZW0tLWN1cnJlbnRcIikubmV4dCgpLFxyXG4gICAgICAgICAgICAgICAgbGluayA9IG5leHRQYWdlLmZpbmQoXCJhXCIpLmF0dHIoXCJocmVmXCIpO1xyXG5cclxuICAgICAgICAgICAgJCgnI2xpc3Rpbmctc2hvd21vcmVCdG4gPiBhJykuYWRkQ2xhc3MoJ2xvYWRpbmcnKTtcclxuXHJcbiAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiAnZ2V0JyxcclxuICAgICAgICAgICAgICAgIHVybDogbGluay5yZXBsYWNlKFwiaHR0cDovL1wiLCBcIi8vXCIpLFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uICByZXZpZXdTaG93KHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxpbWl0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByb2R1Y3RTa3UxJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCByZXZpZXcyID0gW11cclxuICAgICAgICAgICAgICAgICAgICAgICAgUHJvbWlzZS5hbGwoW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmV0Y2goXCJodHRwczovL3d3dy50ZWFtZGVzay5uZXQvc2VjdXJlL2FwaS92Mi81NjU1NC9CRUEyNTY2NTkwRUY0RDE0QUE4RDM1QUQwRTJDRUE3Ny9SZXZpZXcvc2VsZWN0Lmpzb25cIikudGhlbihyID0+IHIuanNvbigpKS50aGVuKHI9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldmlldzIucHVzaCguLi5yKX0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmV0Y2goXCJodHRwczovL3d3dy50ZWFtZGVzay5uZXQvc2VjdXJlL2FwaS92Mi81NjU1NC9CRUEyNTY2NTkwRUY0RDE0QUE4RDM1QUQwRTJDRUE3Ny9SZXZpZXcvc2VsZWN0Lmpzb24/c2tpcD01MDBcIikudGhlbihyID0+IHIuanNvbigpKS50aGVuKHI9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldmlldzIucHVzaCguLi5yKX0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmV0Y2goXCJodHRwczovL3d3dy50ZWFtZGVzay5uZXQvc2VjdXJlL2FwaS92Mi81NjU1NC9CRUEyNTY2NTkwRUY0RDE0QUE4RDM1QUQwRTJDRUE3Ny9SZXZpZXcvc2VsZWN0Lmpzb24/c2tpcD0xMDAwXCIpLnRoZW4ociA9PiByLmpzb24oKSkudGhlbihyPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXZpZXcyLnB1c2goLi4ucil9KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZldGNoKFwiaHR0cHM6Ly93d3cudGVhbWRlc2submV0L3NlY3VyZS9hcGkvdjIvNTY1NTQvQkVBMjU2NjU5MEVGNEQxNEFBOEQzNUFEMEUyQ0VBNzcvUmV2aWV3L3NlbGVjdC5qc29uP3NraXA9MTUwMFwiKS50aGVuKHIgPT4gci5qc29uKCkpLnRoZW4ocj0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV2aWV3Mi5wdXNoKC4uLnIpfSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigocikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGltaXQuZm9yRWFjaCgoaXRlbTEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhpdGVtLmlubmVySFRNTClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKGl0ZW0xLm5leHRFbGVtZW50U2libGluZykuZW1wdHkoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtMS5pbm5lckhUTUwgPT0gJ00xMDYnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0xLmlubmVySFRNTCA9ICdNMTA2IzEnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYgKGl0ZW0xLmlubmVySFRNTCA9PSAnTTEwNkwnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0xLmlubmVySFRNTCA9ICdNMTA2TCMxJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaXRlbTEuaW5uZXJIVE1MID09ICdRdWVlbl8xOCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbTEuaW5uZXJIVE1MID0gJ1ExOCdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCByZXZpZXczID0gW11cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmaWx0ZXJlZEFyID0gcmV2aWV3Mi5maWx0ZXIoaXRlbSA9PiBpdGVtWydQcm9kdWN0IFNLVSddID09PSBpdGVtMS5pbm5lckhUTUwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyZWRBci5mb3JFYWNoKChyZXYpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV2aWV3My5wdXNoKHJldlsnUmV2aWV3IHJhdGUnXSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJldmlld0F2ZyA9IE1hdGgucm91bmQoKHJldmlldzMucmVkdWNlKChhLGIgKSA9PiBhKyBiLCAwKS9yZXZpZXczLmxlbmd0aCkgKiAxMCkvMTBcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJldmlld0F2ZylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJChpdGVtMS5uZXh0RWxlbWVudFNpYmxpbmcpLmFwcGVuZChgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHN0eWxlPiAgICAuY2hlY2tlZCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiByZ2IoMjU1LCAyMTAsIDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmEtc3Rhci1vIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogcmdiKDI1NSwgMjEwLCAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBAbWVkaWEgKG1pbi13aWR0aDogNzY4cHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2hlY2tpbmcge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnYXA6NXB4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3R5bGU+XHJcbiAgICAgICAgICAgICAgICA8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgaHJlZj1cImh0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL2ZvbnQtYXdlc29tZS80LjcuMC9jc3MvZm9udC1hd2Vzb21lLm1pbi5jc3NcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZhIGZhLXN0YXJgKygwLjUgPD0gcmV2aWV3QXZnPyAnIGNoZWNrZWQnOiAnIGZhLXN0YXItbycpICsgYFwiPjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZhIGZhLXN0YXJgKygxLjUgPD0gcmV2aWV3QXZnPyAnIGNoZWNrZWQnOiAnIGZhLXN0YXItbycpICsgYFwiPjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZhIGZhLXN0YXJgKygyLjUgPD0gcmV2aWV3QXZnPyAnIGNoZWNrZWQnOiAnIGZhLXN0YXItbycpICsgYFwiPjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZhIGZhLXN0YXJgKygzLjUgPD0gcmV2aWV3QXZnPyAnIGNoZWNrZWQnOiAnIGZhLXN0YXItbycpICsgYFwiPjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZhIGZhLXN0YXJgKyg0LjUgPD0gcmV2aWV3QXZnPyAnIGNoZWNrZWQnOiAnIGZhLXN0YXItbycpICsgYFwiPjwvc3Bhbj4gICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHtyZXZpZXczLmxlbmd0aH0gUmVzZcOxYXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PmApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gJChpdGVtMS5uZXh0RWxlbWVudFNpYmxpbmcpLmFwcGVuZChgPGRpdj4ke3Jldmlld0F2Z308L2Rpdj5gKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgY29uc29sZS5sb2cocmV2aWV3MilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCQoZGF0YSkuZmluZCgnI3Byb2R1Y3QtbGlzdGluZy1jb250YWluZXIgLnByb2R1Y3RMaXN0aW5nJykubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcjcHJvZHVjdC1saXN0aW5nLWNvbnRhaW5lciAucHJvZHVjdExpc3RpbmcnKS5hcHBlbmQoJChkYXRhKS5maW5kKCcjcHJvZHVjdC1saXN0aW5nLWNvbnRhaW5lciAucHJvZHVjdExpc3RpbmcnKS5jaGlsZHJlbigpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV2aWV3U2hvdygpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcucGFnaW5hdGlvbi1saXN0JykuaHRtbCgkKGRhdGEpLmZpbmQoXCIucGFnaW5hdGlvbi1saXN0XCIpLmh0bWwoKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcjbGlzdGluZy1zaG93bW9yZUJ0biA+IGEnKS5yZW1vdmVDbGFzcygnbG9hZGluZycpLmJsdXIoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChOdW1iZXIoJChkYXRhKS5maW5kKCcucGFnaW5hdGlvbi1pbmZvIC5lbmQnKS50ZXh0KCkpIDw9IE51bWJlcigkKGRhdGEpLmZpbmQoJy5wYWdpbmF0aW9uLWluZm8gLnRvdGFsJykudGV4dCgpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnBhZ2luYXRpb24gLnBhZ2luYXRpb24taW5mbyAuZW5kJykudGV4dCgkKGRhdGEpLmZpbmQoJy5wYWdpbmF0aW9uLWluZm8gLmVuZCcpLnRleHQoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcucGFnaW5hdGlvbiAucGFnaW5hdGlvbi1pbmZvIC5lbmQnKS50ZXh0KCQoZGF0YSkuZmluZCgnLnBhZ2luYXRpb24taW5mbyAudG90YWwnKS50ZXh0KCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0UGFnZSA9ICQoXCIucGFnaW5hdGlvbi1pdGVtLS1jdXJyZW50XCIpLm5leHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXh0UGFnZS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJyNsaXN0aW5nLXNob3dtb3JlQnRuID4gYScpLmFkZENsYXNzKCdkaXNhYmxlJykudGV4dCgnTm8gbW9yZSBwcm9kdWN0cycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZigkKGRhdGEpLmZpbmQoJyNwcm9kdWN0LWxpc3RpbmctY29udGFpbmVyIC5wcm9kdWN0JykubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYWxvQWRkT3B0aW9uRm9yUHJvZHVjdChjb250ZXh0LCAncHJvZHVjdC1saXN0aW5nLWNvbnRhaW5lcicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmYW5jeWJveFZpZGVvQmFubmVyKCl7XHJcbiAgICAgICAgaWYgKCQoXCIudmlkZW8tYmxvY2staW1hZ2VbZGF0YS1mYW5jeWJveF1cIikubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAkKFwiLnZpZGVvLWJsb2NrLWltYWdlW2RhdGEtZmFuY3lib3hdXCIpLmZhbmN5Ym94KHtcclxuICAgICAgICAgICAgICAgICdhdXRvRGltZW5zaW9ucyc6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgJ3BhZGRpbmcnIDogMCxcclxuICAgICAgICAgICAgICAgICd3aWR0aCcgOiA5NzAsXHJcbiAgICAgICAgICAgICAgICAnaGVpZ2h0JyA6IDYwMCxcclxuICAgICAgICAgICAgICAgICdhdXRvU2NhbGUnIDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAndHJhbnNpdGlvbkluJyA6ICdub25lJyxcclxuICAgICAgICAgICAgICAgICd0cmFuc2l0aW9uT3V0JyA6ICdub25lJ1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICgkKFwiLmJ1dHRvbi1wb3B1cC12aWRlb1tkYXRhLWZhbmN5Ym94XVwiKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICQoXCIuYnV0dG9uLXBvcHVwLXZpZGVvW2RhdGEtZmFuY3lib3hdXCIpLmZhbmN5Ym94KHtcclxuICAgICAgICAgICAgICAgICdhdXRvRGltZW5zaW9ucyc6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgJ3BhZGRpbmcnIDogMCxcclxuICAgICAgICAgICAgICAgICd3aWR0aCcgOiA5NzAsXHJcbiAgICAgICAgICAgICAgICAnaGVpZ2h0JyA6IDYwMCxcclxuICAgICAgICAgICAgICAgICdhdXRvU2NhbGUnIDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAndHJhbnNpdGlvbkluJyA6ICdub25lJyxcclxuICAgICAgICAgICAgICAgICd0cmFuc2l0aW9uT3V0JyA6ICdub25lJ1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbG9hZE9wdGlvbkZvclByb2R1Y3RDYXJkKGNvbnRleHQpe1xyXG4gICAgICAgIGlmKCQoJyNmZWF0dXJlZC1wcm9kdWN0cyAuY2FyZCcpLmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICBoYWxvQWRkT3B0aW9uRm9yUHJvZHVjdChjb250ZXh0LCAnZmVhdHVyZWQtcHJvZHVjdHMnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKCQoJyNwcm9kdWN0LWxpc3RpbmctY29udGFpbmVyIC5wcm9kdWN0JykubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgIGhhbG9BZGRPcHRpb25Gb3JQcm9kdWN0KGNvbnRleHQsICdwcm9kdWN0LWxpc3RpbmctY29udGFpbmVyJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV2aWV3U2hvdygpIHtcclxuICAgICAgICB2YXIgbGltaXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHJvZHVjdFNrdTEnKTtcclxuICAgICAgICBsZXQgcmV2aWV3MiA9IFtdXHJcbiAgICAgICAgUHJvbWlzZS5hbGwoW1xyXG4gICAgICAgICAgICBmZXRjaChcImh0dHBzOi8vd3d3LnRlYW1kZXNrLm5ldC9zZWN1cmUvYXBpL3YyLzU2NTU0L0JFQTI1NjY1OTBFRjREMTRBQThEMzVBRDBFMkNFQTc3L1Jldmlldy9zZWxlY3QuanNvblwiKS50aGVuKHIgPT4gci5qc29uKCkpLnRoZW4ocj0+e1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldmlldzIucHVzaCguLi5yKX0pLFxyXG4gICAgICAgICAgICBmZXRjaChcImh0dHBzOi8vd3d3LnRlYW1kZXNrLm5ldC9zZWN1cmUvYXBpL3YyLzU2NTU0L0JFQTI1NjY1OTBFRjREMTRBQThEMzVBRDBFMkNFQTc3L1Jldmlldy9zZWxlY3QuanNvbj9za2lwPTUwMFwiKS50aGVuKHIgPT4gci5qc29uKCkpLnRoZW4ocj0+e1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldmlldzIucHVzaCguLi5yKX0pLFxyXG4gICAgICAgICAgICBmZXRjaChcImh0dHBzOi8vd3d3LnRlYW1kZXNrLm5ldC9zZWN1cmUvYXBpL3YyLzU2NTU0L0JFQTI1NjY1OTBFRjREMTRBQThEMzVBRDBFMkNFQTc3L1Jldmlldy9zZWxlY3QuanNvbj9za2lwPTEwMDBcIikudGhlbihyID0+IHIuanNvbigpKS50aGVuKHI9PntcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXZpZXcyLnB1c2goLi4ucil9KSxcclxuICAgICAgICAgICAgZmV0Y2goXCJodHRwczovL3d3dy50ZWFtZGVzay5uZXQvc2VjdXJlL2FwaS92Mi81NjU1NC9CRUEyNTY2NTkwRUY0RDE0QUE4RDM1QUQwRTJDRUE3Ny9SZXZpZXcvc2VsZWN0Lmpzb24/c2tpcD0xNTAwXCIpLnRoZW4ociA9PiByLmpzb24oKSkudGhlbihyPT57XHJcbiAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV2aWV3Mi5wdXNoKC4uLnIpfSksXHJcbiAgICAgICAgICBdKVxyXG4gICAgICAgICAgLnRoZW4oKHIpID0+IHtcclxuICAgICAgICAgICAgbGltaXQuZm9yRWFjaCgoaXRlbTEpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGl0ZW0uaW5uZXJIVE1MKVxyXG4gICAgICAgICAgICAgICAgJChpdGVtMS5uZXh0RWxlbWVudFNpYmxpbmcpLmVtcHR5KClcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtMS5pbm5lckhUTUwgPT0gJ00xMDYnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbTEuaW5uZXJIVE1MID0gJ00xMDYjMSdcclxuICAgICAgICAgICAgICAgIH1lbHNlIGlmIChpdGVtMS5pbm5lckhUTUwgPT0gJ00xMDZMJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0xLmlubmVySFRNTCA9ICdNMTA2TCMxJ1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpdGVtMS5pbm5lckhUTUwgPT0gJ1F1ZWVuXzE4Jykge1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0xLmlubmVySFRNTCA9ICdRMTgnXHJcbiAgICAgICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICAgICAgbGV0IHJldmlldzMgPSBbXVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBjb25zdCBmaWx0ZXJBcnIgPSByZXZpZXcyLmZpbHRlcihpdGVtID0+IGl0ZW1bJ1Byb2R1Y3QgU0tVJ10gPT09IGl0ZW0xLmlubmVySFRNTClcclxuICAgICAgICAgICAgICAgIGZpbHRlckFyci5mb3JFYWNoKChnb2t1KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV2aWV3My5wdXNoKGdva3VbJ1JldmlldyByYXRlJ10pXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgY29uc3QgcmV2aWV3QXZnID0gTWF0aC5yb3VuZCgocmV2aWV3My5yZWR1Y2UoKGEsYiApID0+IGErIGIsIDApL3JldmlldzMubGVuZ3RoKSAqIDEwKS8xMFxyXG5cclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJldmlld0F2ZylcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKClcclxuICAgICAgICAgICAgICAgICQoaXRlbTEubmV4dEVsZW1lbnRTaWJsaW5nKS5hcHBlbmQoYFxyXG4gICAgICAgICAgICAgICAgPHN0eWxlPiAgICAuY2hlY2tlZCB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6IHJnYigyNTUsIDIxMCwgMCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC5mYS1zdGFyLW8ge1xyXG4gICAgICAgICAgICAgICAgY29sb3I6IHJnYigyNTUsIDIxMCwgMCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgQG1lZGlhIChtaW4td2lkdGg6IDc2OHB4KSB7XHJcbiAgICAgICAgICAgICAgICAuY2hlY2tpbmcge1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2FwOjVweDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBAbWVkaWEgKG1pbi13aWR0aDogMTAyNXB4KSB7XHJcbiAgICAgICAgICAgICAgICAuY2hlY2tpbmcge1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IHVuc2V0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIEBtZWRpYSAobWluLXdpZHRoOiAxNDI1cHgpIHtcclxuICAgICAgICAgICAgICAgIC5jaGVja2luZyB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICA8L3N0eWxlPlxyXG48bGluayByZWw9XCJzdHlsZXNoZWV0XCIgaHJlZj1cImh0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL2ZvbnQtYXdlc29tZS80LjcuMC9jc3MvZm9udC1hd2Vzb21lLm1pbi5jc3NcIj5cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgPHNwYW4+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZhIGZhLXN0YXJgKygwLjUgPD0gcmV2aWV3QXZnPyAnIGNoZWNrZWQnOiAnIGZhLXN0YXItbycpICsgYFwiPjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZmEgZmEtc3RhcmArKDEuNSA8PSByZXZpZXdBdmc/ICcgY2hlY2tlZCc6ICcgZmEtc3Rhci1vJykgKyBgXCI+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmYSBmYS1zdGFyYCsoMi41IDw9IHJldmlld0F2Zz8gJyBjaGVja2VkJzogJyBmYS1zdGFyLW8nKSArIGBcIj48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZhIGZhLXN0YXJgKygzLjUgPD0gcmV2aWV3QXZnPyAnIGNoZWNrZWQnOiAnIGZhLXN0YXItbycpICsgYFwiPjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZmEgZmEtc3RhcmArKDQuNSA8PSByZXZpZXdBdmc/ICcgY2hlY2tlZCc6ICcgZmEtc3Rhci1vJykgKyBgXCI+PC9zcGFuPiAgICAgIFxyXG4gICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICAke3JldmlldzMubGVuZ3RofSBSZXNlw7Fhc1xyXG4gICAgICAgICAgICA8L2Rpdj5gKVxyXG4gICAgICAgICAgICAgICAgLy8gJChpdGVtMS5uZXh0RWxlbWVudFNpYmxpbmcpLmFwcGVuZChgPGRpdj4ke3Jldmlld0F2Z308L2Rpdj5gKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAvLyAgIGNvbnNvbGUubG9nKHJldmlldzIpXHJcbiAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgIFxyXG4gICAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==