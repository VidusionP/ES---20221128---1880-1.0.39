(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[13],{

/***/ "./assets/js/theme/brand.js":
/*!**********************************!*\
  !*** ./assets/js/theme/brand.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Brand; });
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









var Brand = /*#__PURE__*/function (_CatalogPage) {
  _inheritsLoose(Brand, _CatalogPage);
  function Brand() {
    return _CatalogPage.apply(this, arguments) || this;
  }
  var _proto = Brand.prototype;
  _proto.onReady = function onReady() {
    Object(_global_compare_products__WEBPACK_IMPORTED_MODULE_2__["default"])(this.context.urls);
    if ($('#facetedSearch').length > 0) {
      this.initFacetedSearch();
    } else {
      this.onSortBySubmit = this.onSortBySubmit.bind(this);
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["hooks"].on('sortBy-submitted', this.onSortBySubmit);
    }
    this.showProductsPerPage();
    this.showItem();
    this.loadOptionForProductCard(this.context);
    this.showMoreProducts();
    this.fancyboxVideoBanner();
    Object(_halothemes_haloSideAllCategory__WEBPACK_IMPORTED_MODULE_5__["default"])();
    Object(_halothemes_haloProductDisplayMode__WEBPACK_IMPORTED_MODULE_4__["default"])();
    Object(_halothemes_haloStickyToolbar__WEBPACK_IMPORTED_MODULE_7__["default"])(this.context);
  };
  _proto.initFacetedSearch = function initFacetedSearch() {
    var _this = this;
    var $productListingContainer = $('#product-listing-container .productListing');
    var $facetedSearchContainer = $('#faceted-search-container');
    var $paginatorContainer = $('.pagination');
    var $showMoreContainer = $('.halo-product-show-more');
    var productsPerPage = this.context.brandProductsPerPage;
    var requestOptions = {
      template: {
        productListing: 'halothemes/gallery/halo-product-listing',
        sidebar: 'brand/sidebar',
        paginator: 'halothemes/gallery/halo-product-paginator'
      },
      config: {
        shop_by_brand: true,
        brand: {
          products: {
            limit: productsPerPage
          }
        }
      },
      showMore: 'brand/show-more'
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
      _this.showItem();
      _this.showMoreProducts();
      $('html, body').animate({
        scrollTop: 0
      }, 100);
    });
  };
  _proto.showProductsPerPage = function showProductsPerPage() {
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
  _proto.showItem = function showItem() {
    var total = parseInt($('.pagination-info .total').text()),
      limit = this.getUrlParameter('limit'),
      productPerPage;
    if (limit !== undefined) {
      productPerPage = limit;
    } else {
      productPerPage = this.context.brandProductsPerPage;
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
          end = currentPage * productPerPage - 1;
        }
      }
      $('.pagination-info .start').text(start);
      $('.pagination-info .end').text(end);
    }
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
          if ($(data).find('#product-listing-container .productListing').length > 0) {
            $('#product-listing-container .productListing').append($(data).find('#product-listing-container .productListing').children());
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
                productPerPage = context.brandProductsPerPage;
              }
              $('.pagination .pagination-info .end').text(parseInt(productPerPage) * pageCurrent);
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
      Object(_halothemes_haloAddOptionForProductCard__WEBPACK_IMPORTED_MODULE_6__["default"])(context, 'featured-products');
    }
    if ($('#product-listing-container .product').length > 0) {
      Object(_halothemes_haloAddOptionForProductCard__WEBPACK_IMPORTED_MODULE_6__["default"])(context, 'product-listing-container');
    }
  };
  return Brand;
}(_catalog__WEBPACK_IMPORTED_MODULE_1__["default"]);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvYnJhbmQuanMiXSwibmFtZXMiOlsiQnJhbmQiLCJvblJlYWR5IiwiY29tcGFyZVByb2R1Y3RzIiwiY29udGV4dCIsInVybHMiLCIkIiwibGVuZ3RoIiwiaW5pdEZhY2V0ZWRTZWFyY2giLCJvblNvcnRCeVN1Ym1pdCIsImJpbmQiLCJob29rcyIsIm9uIiwic2hvd1Byb2R1Y3RzUGVyUGFnZSIsInNob3dJdGVtIiwibG9hZE9wdGlvbkZvclByb2R1Y3RDYXJkIiwic2hvd01vcmVQcm9kdWN0cyIsImZhbmN5Ym94VmlkZW9CYW5uZXIiLCJoYWxvU2lkZUFsbENhdGVnb3J5IiwicHJvZHVjdERpc3BsYXlNb2RlIiwiaGFsb1N0aWNreVRvb2xiYXIiLCIkcHJvZHVjdExpc3RpbmdDb250YWluZXIiLCIkZmFjZXRlZFNlYXJjaENvbnRhaW5lciIsIiRwYWdpbmF0b3JDb250YWluZXIiLCIkc2hvd01vcmVDb250YWluZXIiLCJwcm9kdWN0c1BlclBhZ2UiLCJicmFuZFByb2R1Y3RzUGVyUGFnZSIsInJlcXVlc3RPcHRpb25zIiwidGVtcGxhdGUiLCJwcm9kdWN0TGlzdGluZyIsInNpZGViYXIiLCJwYWdpbmF0b3IiLCJjb25maWciLCJzaG9wX2J5X2JyYW5kIiwiYnJhbmQiLCJwcm9kdWN0cyIsImxpbWl0Iiwic2hvd01vcmUiLCJmYWNldGVkU2VhcmNoIiwiRmFjZXRlZFNlYXJjaCIsImNvbnRlbnQiLCJodG1sIiwiZmluZCIsImNoaWxkcmVuIiwidHJpZ2dlckhhbmRsZXIiLCJoYWxvQWRkT3B0aW9uRm9yUHJvZHVjdCIsImFuaW1hdGUiLCJzY3JvbGxUb3AiLCJ1cmwiLCJVUkwiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhyZWYiLCJjIiwic2VhcmNoUGFyYW1zIiwiZ2V0IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwiQXJyYXkiLCJwcm90b3R5cGUiLCJmb3JFYWNoIiwiY2FsbCIsImVsZW1lbnQiLCJ2YWx1ZSIsInNlbGVjdGVkIiwiZSIsInRvdGFsIiwicGFyc2VJbnQiLCJ0ZXh0IiwiZ2V0VXJsUGFyYW1ldGVyIiwicHJvZHVjdFBlclBhZ2UiLCJ1bmRlZmluZWQiLCJzdGFydCIsImVuZCIsImNoZWNrTGFzdFBhZ2UiLCJsYXN0UGFnZSIsImNoZWNrTGluayIsIm5leHQiLCJwYWdlTm90TGFzdCIsInRvdGFsTm90TGFzdCIsInByb2R1Y3RzTGFzdFBhZ2UiLCJjdXJyZW50UGFnZSIsInByZXZQYWdlIiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsIm5leHRQYWdlIiwibGluayIsImF0dHIiLCJhZGRDbGFzcyIsImFqYXgiLCJ0eXBlIiwicmVwbGFjZSIsInN1Y2Nlc3MiLCJkYXRhIiwiYXBwZW5kIiwicmVtb3ZlQ2xhc3MiLCJibHVyIiwicGFnZUN1cnJlbnQiLCJmYW5jeWJveCIsInNQYXJhbSIsInNQYWdlVVJMIiwiZGVjb2RlVVJJQ29tcG9uZW50Iiwic2VhcmNoIiwic3Vic3RyaW5nIiwic1VSTFZhcmlhYmxlcyIsInNwbGl0Iiwic1BhcmFtZXRlck5hbWUiLCJpIiwiQ2F0YWxvZ1BhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFtRDtBQUNmO0FBQ29CO0FBQ0o7QUFDaUI7QUFDRjtBQUNZO0FBQ2hCO0FBQ1A7QUFBQSxJQUVuQ0EsS0FBSztFQUFBO0VBQUE7SUFBQTtFQUFBO0VBQUE7RUFBQSxPQUN0QkMsT0FBTyxHQUFQLG1CQUFVO0lBQ05DLHdFQUFlLENBQUMsSUFBSSxDQUFDQyxPQUFPLENBQUNDLElBQUksQ0FBQztJQUVsQyxJQUFJQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQ0MsTUFBTSxHQUFHLENBQUMsRUFBRTtNQUNoQyxJQUFJLENBQUNDLGlCQUFpQixFQUFFO0lBQzVCLENBQUMsTUFBTTtNQUNILElBQUksQ0FBQ0MsY0FBYyxHQUFHLElBQUksQ0FBQ0EsY0FBYyxDQUFDQyxJQUFJLENBQUMsSUFBSSxDQUFDO01BQ3BEQyxnRUFBSyxD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Y0FBYztNQUNkQyxDQUFDO0lBRUwsS0FBS0EsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHSCxhQUFhLENBQUNqRyxNQUFNLEVBQUVvRyxDQUFDLEVBQUUsRUFBRTtNQUN2Q0QsY0FBYyxHQUFHRixhQUFhLENBQUNHLENBQUMsQ0FBQyxDQUFDRixLQUFLLENBQUMsR0FBRyxDQUFDO01BRTVDLElBQUlDLGNBQWMsQ0FBQyxDQUFDLENBQUMsS0FBS1AsTUFBTSxFQUFFO1FBQzlCLE9BQU9PLGNBQWMsQ0FBQyxDQUFDLENBQUMsS0FBS25DLFNBQVMsR0FBRyxJQUFJLEdBQUdtQyxjQUFjLENBQUMsQ0FBQyxDQUFDO01BQ3JFO0lBQ0o7RUFDSixDQUFDO0VBQUEsT0FFRDNGLHdCQUF3QixHQUF4QixrQ0FBeUJYLE9BQU8sRUFBQztJQUM3QixJQUFHRSxDQUFDLENBQUMsMEJBQTBCLENBQUMsQ0FBQ0MsTUFBTSxHQUFHLENBQUMsRUFBQztNQUN4Q3NDLHVGQUF1QixDQUFDekMsT0FBTyxFQUFFLG1CQUFtQixDQUFDO0lBQ3pEO0lBRUEsSUFBR0UsQ0FBQyxDQUFDLHFDQUFxQyxDQUFDLENBQUNDLE1BQU0sR0FBRyxDQUFDLEVBQUM7TUFDbkRzQyx1RkFBdUIsQ0FBQ3pDLE9BQU8sRUFBRSwyQkFBMkIsQ0FBQztJQUNqRTtFQUNKLENBQUM7RUFBQTtBQUFBLEVBL084QndHLGdEQUFXIiwiZmlsZSI6InRoZW1lLWJ1bmRsZS5jaHVuay4xMy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGhvb2tzIH0gZnJvbSAnQGJpZ2NvbW1lcmNlL3N0ZW5jaWwtdXRpbHMnO1xuaW1wb3J0IENhdGFsb2dQYWdlIGZyb20gJy4vY2F0YWxvZyc7XG5pbXBvcnQgY29tcGFyZVByb2R1Y3RzIGZyb20gJy4vZ2xvYmFsL2NvbXBhcmUtcHJvZHVjdHMnO1xuaW1wb3J0IEZhY2V0ZWRTZWFyY2ggZnJvbSAnLi9jb21tb24vZmFjZXRlZC1zZWFyY2gnO1xuaW1wb3J0IHByb2R1Y3REaXNwbGF5TW9kZSBmcm9tICcuL2hhbG90aGVtZXMvaGFsb1Byb2R1Y3REaXNwbGF5TW9kZSc7XG5pbXBvcnQgaGFsb1NpZGVBbGxDYXRlZ29yeSBmcm9tICcuL2hhbG90aGVtZXMvaGFsb1NpZGVBbGxDYXRlZ29yeSc7XG5pbXBvcnQgaGFsb0FkZE9wdGlvbkZvclByb2R1Y3QgZnJvbSAnLi9oYWxvdGhlbWVzL2hhbG9BZGRPcHRpb25Gb3JQcm9kdWN0Q2FyZCc7XG5pbXBvcnQgaGFsb1N0aWNreVRvb2xiYXIgZnJvbSAnLi9oYWxvdGhlbWVzL2hhbG9TdGlja3lUb29sYmFyJztcbmltcG9ydCBmYW5jeWJveCBmcm9tICcuL2hhbG90aGVtZXMvanF1ZXJ5LmZhbmN5Ym94Lm1pbic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJyYW5kIGV4dGVuZHMgQ2F0YWxvZ1BhZ2Uge1xuICAgIG9uUmVhZHkoKSB7XG4gICAgICAgIGNvbXBhcmVQcm9kdWN0cyh0aGlzLmNvbnRleHQudXJscyk7XG5cbiAgICAgICAgaWYgKCQoJyNmYWNldGVkU2VhcmNoJykubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5pbml0RmFjZXRlZFNlYXJjaCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5vblNvcnRCeVN1Ym1pdCA9IHRoaXMub25Tb3J0QnlTdWJtaXQuYmluZCh0aGlzKTtcbiAgICAgICAgICAgIGhvb2tzLm9uKCdzb3J0Qnktc3VibWl0dGVkJywgdGhpcy5vblNvcnRCeVN1Ym1pdCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNob3dQcm9kdWN0c1BlclBhZ2UoKTtcbiAgICAgICAgdGhpcy5zaG93SXRlbSgpO1xuICAgICAgICB0aGlzLmxvYWRPcHRpb25Gb3JQcm9kdWN0Q2FyZCh0aGlzLmNvbnRleHQpO1xuICAgICAgICB0aGlzLnNob3dNb3JlUHJvZHVjdHMoKTtcbiAgICAgICAgdGhpcy5mYW5jeWJveFZpZGVvQmFubmVyKCk7XG5cbiAgICAgICAgaGFsb1NpZGVBbGxDYXRlZ29yeSgpO1xuICAgICAgICBwcm9kdWN0RGlzcGxheU1vZGUoKTtcbiAgICAgICAgaGFsb1N0aWNreVRvb2xiYXIodGhpcy5jb250ZXh0KTtcbiAgICB9XG5cbiAgICBpbml0RmFjZXRlZFNlYXJjaCgpIHtcbiAgICAgICAgY29uc3QgJHByb2R1Y3RMaXN0aW5nQ29udGFpbmVyID0gJCgnI3Byb2R1Y3QtbGlzdGluZy1jb250YWluZXIgLnByb2R1Y3RMaXN0aW5nJyk7XG4gICAgICAgIGNvbnN0ICRmYWNldGVkU2VhcmNoQ29udGFpbmVyID0gJCgnI2ZhY2V0ZWQtc2VhcmNoLWNvbnRhaW5lcicpO1xuICAgICAgICBjb25zdCAkcGFnaW5hdG9yQ29udGFpbmVyID0gJCgnLnBhZ2luYXRpb24nKTtcbiAgICAgICAgY29uc3QgJHNob3dNb3JlQ29udGFpbmVyID0gJCgnLmhhbG8tcHJvZHVjdC1zaG93LW1vcmUnKTtcbiAgICAgICAgY29uc3QgcHJvZHVjdHNQZXJQYWdlID0gdGhpcy5jb250ZXh0LmJyYW5kUHJvZHVjdHNQZXJQYWdlO1xuICAgICAgICBjb25zdCByZXF1ZXN0T3B0aW9ucyA9IHtcbiAgICAgICAgICAgIHRlbXBsYXRlOiB7XG4gICAgICAgICAgICAgICAgcHJvZHVjdExpc3Rpbmc6ICdoYWxvdGhlbWVzL2dhbGxlcnkvaGFsby1wcm9kdWN0LWxpc3RpbmcnLFxuICAgICAgICAgICAgICAgIHNpZGViYXI6ICdicmFuZC9zaWRlYmFyJyxcbiAgICAgICAgICAgICAgICBwYWdpbmF0b3I6ICdoYWxvdGhlbWVzL2dhbGxlcnkvaGFsby1wcm9kdWN0LXBhZ2luYXRvcicsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29uZmlnOiB7XG4gICAgICAgICAgICAgICAgc2hvcF9ieV9icmFuZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBicmFuZDoge1xuICAgICAgICAgICAgICAgICAgICBwcm9kdWN0czoge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGltaXQ6IHByb2R1Y3RzUGVyUGFnZSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNob3dNb3JlOiAnYnJhbmQvc2hvdy1tb3JlJyxcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmZhY2V0ZWRTZWFyY2ggPSBuZXcgRmFjZXRlZFNlYXJjaChyZXF1ZXN0T3B0aW9ucywgKGNvbnRlbnQpID0+IHtcbiAgICAgICAgICAgICRwcm9kdWN0TGlzdGluZ0NvbnRhaW5lci5odG1sKGNvbnRlbnQucHJvZHVjdExpc3RpbmcpO1xuICAgICAgICAgICAgJGZhY2V0ZWRTZWFyY2hDb250YWluZXIuaHRtbChjb250ZW50LnNpZGViYXIpO1xuICAgICAgICAgICAgJHBhZ2luYXRvckNvbnRhaW5lci5odG1sKCQoY29udGVudC5wYWdpbmF0b3IpLmZpbmQoJy5wYWdpbmF0aW9uJykuY2hpbGRyZW4oKSk7XG4gICAgICAgICAgICAkc2hvd01vcmVDb250YWluZXIuaHRtbCgkKGNvbnRlbnQucGFnaW5hdG9yKS5maW5kKCcuaGFsby1wcm9kdWN0LXNob3ctbW9yZScpLmNoaWxkcmVuKCkpO1xuXG4gICAgICAgICAgICAkKCdib2R5JykudHJpZ2dlckhhbmRsZXIoJ2NvbXBhcmVSZXNldCcpO1xuXG4gICAgICAgICAgICBpZigkKCcjcHJvZHVjdC1saXN0aW5nLWNvbnRhaW5lciAucHJvZHVjdCcpLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgIGhhbG9BZGRPcHRpb25Gb3JQcm9kdWN0KHRoaXMuY29udGV4dCwgJ3Byb2R1Y3QtbGlzdGluZy1jb250YWluZXInKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5zaG93UHJvZHVjdHNQZXJQYWdlKCk7XG4gICAgICAgICAgICB0aGlzLnNob3dJdGVtKCk7XG4gICAgICAgICAgICB0aGlzLnNob3dNb3JlUHJvZHVjdHMoKTtcblxuICAgICAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogMCxcbiAgICAgICAgICAgIH0sIDEwMCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNob3dQcm9kdWN0c1BlclBhZ2UoKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHZhciB1cmwgPSBuZXcgVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcbiAgICAgICAgICAgIHZhciBjID0gdXJsLnNlYXJjaFBhcmFtcy5nZXQoXCJsaW1pdFwiKTtcbiAgICAgICAgICAgIGlmKGMgIT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgdmFyIGxpbWl0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnc2VsZWN0I2xpbWl0IG9wdGlvbicpO1xuICAgICAgICAgICAgICAgIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwobGltaXQsIGZ1bmN0aW9uKGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYoZWxlbWVudC52YWx1ZSA9PSBjKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2goZSkge31cbiAgICB9XG5cbiAgICBzaG93SXRlbSgpIHtcbiAgICAgICAgdmFyIHRvdGFsID0gcGFyc2VJbnQoJCgnLnBhZ2luYXRpb24taW5mbyAudG90YWwnKS50ZXh0KCkpLFxuICAgICAgICAgICAgbGltaXQgPSB0aGlzLmdldFVybFBhcmFtZXRlcignbGltaXQnKSxcbiAgICAgICAgICAgIHByb2R1Y3RQZXJQYWdlO1xuXG4gICAgICAgIGlmIChsaW1pdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBwcm9kdWN0UGVyUGFnZSA9IGxpbWl0O1xuICAgICAgICB9IGVsc2V7XG4gICAgICAgICAgICBwcm9kdWN0UGVyUGFnZSA9IHRoaXMuY29udGV4dC5icmFuZFByb2R1Y3RzUGVyUGFnZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBzdGFydCA9IDEsXG4gICAgICAgICAgICBlbmQgPSB0b3RhbCxcbiAgICAgICAgICAgIGNoZWNrTGFzdFBhZ2UgPSBmYWxzZSxcbiAgICAgICAgICAgIGxhc3RQYWdlID0gMTtcbiAgICAgICAgICAgIFxuICAgICAgICB2YXIgY2hlY2tMaW5rID0gJChcIi5wYWdpbmF0aW9uLWxpc3QgLnBhZ2luYXRpb24taXRlbS0tY3VycmVudFwiKS5uZXh0KCk7XG4gICAgICAgIHZhciBwYWdlTm90TGFzdCA9IGxhc3RQYWdlIC0gMTtcbiAgICAgICAgdmFyIHRvdGFsTm90TGFzdCA9IHBhZ2VOb3RMYXN0ICogcHJvZHVjdFBlclBhZ2U7XG4gICAgICAgIHZhciBwcm9kdWN0c0xhc3RQYWdlID0gdG90YWwgLSB0b3RhbE5vdExhc3Q7XG4gICAgICAgIHZhciBjdXJyZW50UGFnZSA9IHBhcnNlSW50KCQoJy5wYWdpbmF0aW9uLWl0ZW0tLWN1cnJlbnQgPiBhJykudGV4dCgpKTtcbiAgICAgICAgdmFyIHByZXZQYWdlID0gY3VycmVudFBhZ2UgLSAxO1xuXG4gICAgICAgIGlmIChjaGVja0xpbmsubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBsYXN0UGFnZSA9IHBhcnNlSW50KCQoXCIucGFnaW5hdGlvbi1pdGVtLS1jdXJyZW50XCIpLmZpbmQoXCJhXCIpLnRleHQoKSk7XG4gICAgICAgICAgICBjaGVja0xhc3RQYWdlID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxhc3RQYWdlID0gcGFyc2VJbnQoY2hlY2tMaW5rLmZpbmQoXCJhXCIpLnRleHQoKSk7XG4gICAgICAgICAgICBjaGVja0xhc3RQYWdlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmICh0b3RhbCA8PSBwcm9kdWN0UGVyUGFnZSkge1xuICAgICAgICAgICAgJCgnLnBhZ2luYXRpb24taW5mbyAuc3RhcnQnKS50ZXh0KHN0YXJ0KTtcbiAgICAgICAgICAgICQoJy5wYWdpbmF0aW9uLWluZm8gLmVuZCcpLnRleHQoZW5kKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UGFnZSA8PSAxKSB7XG4gICAgICAgICAgICAgICAgZW5kID0gcHJvZHVjdFBlclBhZ2U7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHN0YXJ0ID0gKHByZXZQYWdlICogcHJvZHVjdFBlclBhZ2UpICsgMTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAoY2hlY2tMYXN0UGFnZSA9IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYoJCgnLnBhZ2luYXRpb24tbGlzdCAucGFnaW5hdGlvbi1pdGVtLS1uZXh0JykubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbmQgPSB0b3RhbE5vdExhc3QgKyBwcm9kdWN0c0xhc3RQYWdlIC0gMTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgZW5kID0gdG90YWxOb3RMYXN0ICsgcHJvZHVjdHNMYXN0UGFnZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGVuZCA9IGN1cnJlbnRQYWdlICogcHJvZHVjdFBlclBhZ2UgLSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgJCgnLnBhZ2luYXRpb24taW5mbyAuc3RhcnQnKS50ZXh0KHN0YXJ0KTtcbiAgICAgICAgICAgICQoJy5wYWdpbmF0aW9uLWluZm8gLmVuZCcpLnRleHQoZW5kKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNob3dNb3JlUHJvZHVjdHMoKSB7XG4gICAgICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzLmNvbnRleHQ7XG5cbiAgICAgICAgY29uc3QgZ2V0VXJsUGFyYW1ldGVyID0gdGhpcy5nZXRVcmxQYXJhbWV0ZXIoJ2xpbWl0Jyk7XG4gICAgICAgIFxuICAgICAgICAkKCcjbGlzdGluZy1zaG93bW9yZUJ0biA+IGEnKS5vbignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIHZhciBuZXh0UGFnZSA9ICQoXCIucGFnaW5hdGlvbi1pdGVtLS1jdXJyZW50XCIpLm5leHQoKSxcbiAgICAgICAgICAgICAgICBsaW5rID0gbmV4dFBhZ2UuZmluZChcImFcIikuYXR0cihcImhyZWZcIik7XG5cbiAgICAgICAgICAgICQoJyNsaXN0aW5nLXNob3dtb3JlQnRuID4gYScpLmFkZENsYXNzKCdsb2FkaW5nJyk7XG5cbiAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2dldCcsXG4gICAgICAgICAgICAgICAgdXJsOiBsaW5rLnJlcGxhY2UoXCJodHRwOi8vXCIsIFwiLy9cIiksXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoJChkYXRhKS5maW5kKCcjcHJvZHVjdC1saXN0aW5nLWNvbnRhaW5lciAucHJvZHVjdExpc3RpbmcnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcjcHJvZHVjdC1saXN0aW5nLWNvbnRhaW5lciAucHJvZHVjdExpc3RpbmcnKS5hcHBlbmQoJChkYXRhKS5maW5kKCcjcHJvZHVjdC1saXN0aW5nLWNvbnRhaW5lciAucHJvZHVjdExpc3RpbmcnKS5jaGlsZHJlbigpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnBhZ2luYXRpb24tbGlzdCcpLmh0bWwoJChkYXRhKS5maW5kKFwiLnBhZ2luYXRpb24tbGlzdFwiKS5odG1sKCkpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcjbGlzdGluZy1zaG93bW9yZUJ0biA+IGEnKS5yZW1vdmVDbGFzcygnbG9hZGluZycpLmJsdXIoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dFBhZ2UgPSAkKFwiLnBhZ2luYXRpb24taXRlbS0tY3VycmVudFwiKS5uZXh0KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXh0UGFnZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcjbGlzdGluZy1zaG93bW9yZUJ0biA+IGEnKS5hZGRDbGFzcygnZGlzYWJsZScpLnRleHQoJ05vIG1vcmUgcHJvZHVjdHMnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcucGFnaW5hdGlvbiAucGFnaW5hdGlvbi1pbmZvIC5lbmQnKS50ZXh0KCQoJy5wYWdpbmF0aW9uLWluZm8gLnRvdGFsJykudGV4dCgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbGltaXQgPSBnZXRVcmxQYXJhbWV0ZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2R1Y3RQZXJQYWdlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWdlQ3VycmVudCA9IHBhcnNlSW50KCQoXCIucGFnaW5hdGlvbi1pdGVtLS1jdXJyZW50ID4gYVwiKS50ZXh0KCkpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxpbWl0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvZHVjdFBlclBhZ2UgPSBsaW1pdDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2R1Y3RQZXJQYWdlID0gY29udGV4dC5icmFuZFByb2R1Y3RzUGVyUGFnZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcucGFnaW5hdGlvbiAucGFnaW5hdGlvbi1pbmZvIC5lbmQnKS50ZXh0KHBhcnNlSW50KHByb2R1Y3RQZXJQYWdlKSpwYWdlQ3VycmVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKCQoZGF0YSkuZmluZCgnI3Byb2R1Y3QtbGlzdGluZy1jb250YWluZXIgLnByb2R1Y3QnKS5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYWxvQWRkT3B0aW9uRm9yUHJvZHVjdChjb250ZXh0LCAncHJvZHVjdC1saXN0aW5nLWNvbnRhaW5lcicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZhbmN5Ym94VmlkZW9CYW5uZXIoKXtcbiAgICAgICAgaWYgKCQoXCIudmlkZW8tYmxvY2staW1hZ2VbZGF0YS1mYW5jeWJveF1cIikubGVuZ3RoKSB7XG4gICAgICAgICAgICAkKFwiLnZpZGVvLWJsb2NrLWltYWdlW2RhdGEtZmFuY3lib3hdXCIpLmZhbmN5Ym94KHtcbiAgICAgICAgICAgICAgICAnYXV0b0RpbWVuc2lvbnMnOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAncGFkZGluZycgOiAwLFxuICAgICAgICAgICAgICAgICd3aWR0aCcgOiA5NzAsXG4gICAgICAgICAgICAgICAgJ2hlaWdodCcgOiA2MDAsXG4gICAgICAgICAgICAgICAgJ2F1dG9TY2FsZScgOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAndHJhbnNpdGlvbkluJyA6ICdub25lJyxcbiAgICAgICAgICAgICAgICAndHJhbnNpdGlvbk91dCcgOiAnbm9uZSdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCQoXCIuYnV0dG9uLXBvcHVwLXZpZGVvW2RhdGEtZmFuY3lib3hdXCIpLmxlbmd0aCkge1xuICAgICAgICAgICAgJChcIi5idXR0b24tcG9wdXAtdmlkZW9bZGF0YS1mYW5jeWJveF1cIikuZmFuY3lib3goe1xuICAgICAgICAgICAgICAgICdhdXRvRGltZW5zaW9ucyc6IGZhbHNlLFxuICAgICAgICAgICAgICAgICdwYWRkaW5nJyA6IDAsXG4gICAgICAgICAgICAgICAgJ3dpZHRoJyA6IDk3MCxcbiAgICAgICAgICAgICAgICAnaGVpZ2h0JyA6IDYwMCxcbiAgICAgICAgICAgICAgICAnYXV0b1NjYWxlJyA6IGZhbHNlLFxuICAgICAgICAgICAgICAgICd0cmFuc2l0aW9uSW4nIDogJ25vbmUnLFxuICAgICAgICAgICAgICAgICd0cmFuc2l0aW9uT3V0JyA6ICdub25lJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRVcmxQYXJhbWV0ZXIoc1BhcmFtKSB7XG4gICAgICAgIHZhciBzUGFnZVVSTCA9IGRlY29kZVVSSUNvbXBvbmVudCh3aW5kb3cubG9jYXRpb24uc2VhcmNoLnN1YnN0cmluZygxKSksXG4gICAgICAgICAgICBzVVJMVmFyaWFibGVzID0gc1BhZ2VVUkwuc3BsaXQoJyYnKSxcbiAgICAgICAgICAgIHNQYXJhbWV0ZXJOYW1lLFxuICAgICAgICAgICAgaTtcblxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgc1VSTFZhcmlhYmxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgc1BhcmFtZXRlck5hbWUgPSBzVVJMVmFyaWFibGVzW2ldLnNwbGl0KCc9Jyk7XG5cbiAgICAgICAgICAgIGlmIChzUGFyYW1ldGVyTmFtZVswXSA9PT0gc1BhcmFtKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNQYXJhbWV0ZXJOYW1lWzFdID09PSB1bmRlZmluZWQgPyB0cnVlIDogc1BhcmFtZXRlck5hbWVbMV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBsb2FkT3B0aW9uRm9yUHJvZHVjdENhcmQoY29udGV4dCl7XG4gICAgICAgIGlmKCQoJyNmZWF0dXJlZC1wcm9kdWN0cyAuY2FyZCcpLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgaGFsb0FkZE9wdGlvbkZvclByb2R1Y3QoY29udGV4dCwgJ2ZlYXR1cmVkLXByb2R1Y3RzJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZigkKCcjcHJvZHVjdC1saXN0aW5nLWNvbnRhaW5lciAucHJvZHVjdCcpLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgaGFsb0FkZE9wdGlvbkZvclByb2R1Y3QoY29udGV4dCwgJ3Byb2R1Y3QtbGlzdGluZy1jb250YWluZXInKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=