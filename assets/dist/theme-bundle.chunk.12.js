(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[12],{

/***/ "./assets/js/theme/brands.js":
/*!***********************************!*\
  !*** ./assets/js/theme/brands.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Brands; });
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./page-manager */ "./assets/js/theme/page-manager.js");
/* harmony import */ var _halothemes_haloAZBrands__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./halothemes/haloAZBrands */ "./assets/js/theme/halothemes/haloAZBrands.js");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }


var Brands = /*#__PURE__*/function (_PageManager) {
  _inheritsLoose(Brands, _PageManager);
  function Brands(context) {
    return _PageManager.call(this, context) || this;
  }
  var _proto = Brands.prototype;
  _proto.onReady = function onReady() {
    Object(_halothemes_haloAZBrands__WEBPACK_IMPORTED_MODULE_1__["default"])(this.context);
  };
  return Brands;
}(_page_manager__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./assets/js/theme/halothemes/haloAZBrands.js":
/*!****************************************************!*\
  !*** ./assets/js/theme/halothemes/haloAZBrands.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");

/* harmony default export */ __webpack_exports__["default"] = (function (context) {
  var azWrapper = $('#haloAZBrandsWrapper'),
    azNavigation = $('#haloAZBrandsTable');
  var requestOptions = {
    config: {
      blog: {
        posts: {
          limit: context.themeSettings.brandpage_brands_per_page
        }
      }
    },
    template: 'halothemes/halo-all-brands'
  };
  if (context.themeSettings.halo_brandlayout === 'aztable') {
    getAllBrand();
    brandNavigationEvent();
  }
  function getAllBrand() {
    azWrapper.addClass('is-loading');
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["default"].api.getPage('/brands.php', requestOptions, function (error, response) {
      if (error) {
        return '';
      }
      var list = $(response);
      parseListBrand(list);
      var nextUrl = list.data('brands-list-next');
      if (nextUrl) {
        loadMoreBrands(nextUrl);
      } else {
        azWrapper.removeClass('is-loading');
      }
    });
  }
  function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);
  }
  function brandNavigationEvent() {
    azNavigation.on('click', 'a', function (event) {
      event.preventDefault();
      var $target = $(event.currentTarget);
      azNavigation.children('li').removeClass('is-active');
      $target.parent().addClass('is-active');
      var letter = $target.data('href');
      if (letter !== undefined || letter) {
        azWrapper.removeClass('active-all');
        azWrapper.find('.azBrands-group').removeClass('is-active');
        azWrapper.find('[data-letter=' + letter + ']').addClass('is-active');
      } else {
        azWrapper.addClass('active-all');
      }
    });
  }
  function parseListBrand(list) {
    azWrapper.find('.azBrands-group').each(function (index, element) {
      var letter = $(element).data('letter');
      if (!isLetter(letter)) {
        for (var i = 0; i < 10; i++) {
          $('.azBrands-group-list', element).append(list.find('[data-brand-letter=' + i + ']'));
        }
      } else {
        $('.azBrands-group-list', element).append(list.find('[data-brand-letter=' + letter + ']'));
      }
      if ($('.azBrands-group-list', element).children().length > 0) {
        azNavigation.find('[data-letter=' + letter + ']').removeClass('disable').addClass('has-letter');
      }
    });
  }
  function loadMoreBrands(url) {
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["default"].api.getPage(url, requestOptions, function (error, response) {
      if (error) {
        return '';
      }
      var list = $(response);
      parseListBrand(list);
      var nextUrl = list.data('brands-list-next');
      if (nextUrl) {
        loadMoreBrands(nextUrl);
      } else {
        azWrapper.removeClass('is-loading');
      }
    });
  }
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvYnJhbmRzLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy90aGVtZS9oYWxvdGhlbWVzL2hhbG9BWkJyYW5kcy5qcyJdLCJuYW1lcyI6WyJCcmFuZHMiLCJjb250ZXh0Iiwib25SZWFkeSIsImhhbG9BWkJyYW5kcyIsIlBhZ2VNYW5hZ2VyIiwiYXpXcmFwcGVyIiwiJCIsImF6TmF2aWdhdGlvbiIsInJlcXVlc3RPcHRpb25zIiwiY29uZmlnIiwiYmxvZyIsInBvc3RzIiwibGltaXQiLCJ0aGVtZVNldHRpbmdzIiwiYnJhbmRwYWdlX2JyYW5kc19wZXJfcGFnZSIsInRlbXBsYXRlIiwiaGFsb19icmFuZGxheW91dCIsImdldEFsbEJyYW5kIiwiYnJhbmROYXZpZ2F0aW9uRXZlbnQiLCJhZGRDbGFzcyIsInV0aWxzIiwiYXBpIiwiZ2V0UGFnZSIsImVycm9yIiwicmVzcG9uc2UiLCJsaXN0IiwicGFyc2VMaXN0QnJhbmQiLCJuZXh0VXJsIiwiZGF0YSIsImxvYWRNb3JlQnJhbmRzIiwicmVtb3ZlQ2xhc3MiLCJpc0xldHRlciIsInN0ciIsImxlbmd0aCIsIm1hdGNoIiwib24iLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwiJHRhcmdldCIsImN1cnJlbnRUYXJnZXQiLCJjaGlsZHJlbiIsInBhcmVudCIsImxldHRlciIsInVuZGVmaW5lZCIsImZpbmQiLCJlYWNoIiwiaW5kZXgiLCJlbGVtZW50IiwiaSIsImFwcGVuZCIsInVybCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUF5QztBQUNZO0FBQUEsSUFFaENBLE1BQU07RUFBQTtFQUMxQixnQkFBWUMsT0FBTyxFQUFFO0lBQUEsT0FDZCx3QkFBTUEsT0FBTyxDQUFDO0VBQ2xCO0VBQUM7RUFBQSxPQUVKQyxPQUFPLEdBQVAsbUJBQVU7SUFDVEMsd0VBQVksQ0FBQyxJQUFJLENBQUNGLE9BQU8sQ0FBQztFQUN4QixDQUFDO0VBQUE7QUFBQSxF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Q0FBQ0csSUFBSSxDQUFDLGtCQUFrQixDQUFDO01BRTdDLElBQUlELE9BQU8sRUFBRTtRQUNURSxjQUFjLENBQUNGLE9BQU8sQ0FBQztNQUMzQixDQUFDLE1BQUs7UUFDRnRCLFNBQVMsQ0FBQ3lCLFdBQVcsQ0FBQyxZQUFZLENBQUM7TUFDdkM7SUFDSixDQUFDLENBQUM7RUFDTjtBQUNKLEMiLCJmaWxlIjoidGhlbWUtYnVuZGxlLmNodW5rLjEyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBhZ2VNYW5hZ2VyIGZyb20gJy4vcGFnZS1tYW5hZ2VyJztcbmltcG9ydCBoYWxvQVpCcmFuZHMgZnJvbSAnLi9oYWxvdGhlbWVzL2hhbG9BWkJyYW5kcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJyYW5kcyBleHRlbmRzIFBhZ2VNYW5hZ2VyIHtcblx0Y29uc3RydWN0b3IoY29udGV4dCkge1xuICAgICAgICBzdXBlcihjb250ZXh0KTtcbiAgICB9XG4gICAgXG5cdG9uUmVhZHkoKSB7XG5cdFx0aGFsb0FaQnJhbmRzKHRoaXMuY29udGV4dCk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHV0aWxzIGZyb20gJ0BiaWdjb21tZXJjZS9zdGVuY2lsLXV0aWxzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKGNvbnRleHQpIHtcbiAgICBjb25zdCBheldyYXBwZXIgPSAkKCcjaGFsb0FaQnJhbmRzV3JhcHBlcicpLFxuICAgICAgICBhek5hdmlnYXRpb24gPSAkKCcjaGFsb0FaQnJhbmRzVGFibGUnKTtcblxuICAgIGNvbnN0IHJlcXVlc3RPcHRpb25zID0ge1xuICAgICAgICBjb25maWc6IHtcbiAgICAgICAgICAgIGJsb2c6IHtcbiAgICAgICAgICAgICAgICBwb3N0czoge1xuICAgICAgICAgICAgICAgICAgICBsaW1pdDogY29udGV4dC50aGVtZVNldHRpbmdzLmJyYW5kcGFnZV9icmFuZHNfcGVyX3BhZ2UsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIHRlbXBsYXRlOiAnaGFsb3RoZW1lcy9oYWxvLWFsbC1icmFuZHMnLFxuICAgIH07XG5cbiAgICBpZiAoY29udGV4dC50aGVtZVNldHRpbmdzLmhhbG9fYnJhbmRsYXlvdXQgPT09ICdhenRhYmxlJykge1xuICAgICAgICBnZXRBbGxCcmFuZCgpO1xuICAgICAgICBicmFuZE5hdmlnYXRpb25FdmVudCgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEFsbEJyYW5kKCl7XG4gICAgICAgIGF6V3JhcHBlci5hZGRDbGFzcygnaXMtbG9hZGluZycpO1xuXG4gICAgICAgIHV0aWxzLmFwaS5nZXRQYWdlKCcvYnJhbmRzLnBocCcsIHJlcXVlc3RPcHRpb25zLCAoZXJyb3IsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBsaXN0ID0gJChyZXNwb25zZSk7XG5cbiAgICAgICAgICAgIHBhcnNlTGlzdEJyYW5kKGxpc3QpO1xuXG4gICAgICAgICAgICBjb25zdCBuZXh0VXJsID0gbGlzdC5kYXRhKCdicmFuZHMtbGlzdC1uZXh0Jyk7XG5cbiAgICAgICAgICAgIGlmIChuZXh0VXJsKSB7XG4gICAgICAgICAgICAgICAgbG9hZE1vcmVCcmFuZHMobmV4dFVybCk7XG4gICAgICAgICAgICB9IGVsc2V7XG4gICAgICAgICAgICAgICAgYXpXcmFwcGVyLnJlbW92ZUNsYXNzKCdpcy1sb2FkaW5nJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzTGV0dGVyKHN0cikge1xuICAgICAgICByZXR1cm4gc3RyLmxlbmd0aCA9PT0gMSAmJiBzdHIubWF0Y2goL1thLXpdL2kpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGJyYW5kTmF2aWdhdGlvbkV2ZW50KCl7XG4gICAgICAgIGF6TmF2aWdhdGlvbi5vbignY2xpY2snLCAnYScsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgY29uc3QgJHRhcmdldCA9ICQoZXZlbnQuY3VycmVudFRhcmdldCk7XG5cbiAgICAgICAgICAgIGF6TmF2aWdhdGlvbi5jaGlsZHJlbignbGknKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG5cbiAgICAgICAgICAgICR0YXJnZXQucGFyZW50KCkuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuXG4gICAgICAgICAgICBjb25zdCBsZXR0ZXIgPSAkdGFyZ2V0LmRhdGEoJ2hyZWYnKTtcblxuICAgICAgICAgICAgaWYgKGxldHRlciAhPT0gdW5kZWZpbmVkIHx8IGxldHRlcikge1xuICAgICAgICAgICAgICAgIGF6V3JhcHBlci5yZW1vdmVDbGFzcygnYWN0aXZlLWFsbCcpO1xuICAgICAgICAgICAgICAgIGF6V3JhcHBlci5maW5kKCcuYXpCcmFuZHMtZ3JvdXAnKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgYXpXcmFwcGVyLmZpbmQoJ1tkYXRhLWxldHRlcj0nK2xldHRlcisnXScpLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYXpXcmFwcGVyLmFkZENsYXNzKCdhY3RpdmUtYWxsJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhcnNlTGlzdEJyYW5kKGxpc3Qpe1xuICAgICAgICBheldyYXBwZXIuZmluZCgnLmF6QnJhbmRzLWdyb3VwJykuZWFjaCgoaW5kZXgsIGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIHZhciBsZXR0ZXIgPSAkKGVsZW1lbnQpLmRhdGEoJ2xldHRlcicpO1xuXG4gICAgICAgICAgICBpZighaXNMZXR0ZXIobGV0dGVyKSl7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICQoJy5hekJyYW5kcy1ncm91cC1saXN0JywgZWxlbWVudCkuYXBwZW5kKGxpc3QuZmluZCgnW2RhdGEtYnJhbmQtbGV0dGVyPScraSsnXScpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICQoJy5hekJyYW5kcy1ncm91cC1saXN0JywgZWxlbWVudCkuYXBwZW5kKGxpc3QuZmluZCgnW2RhdGEtYnJhbmQtbGV0dGVyPScrbGV0dGVyKyddJykpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZigkKCcuYXpCcmFuZHMtZ3JvdXAtbGlzdCcsIGVsZW1lbnQpLmNoaWxkcmVuKCkubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAgICAgYXpOYXZpZ2F0aW9uLmZpbmQoJ1tkYXRhLWxldHRlcj0nK2xldHRlcisnXScpLnJlbW92ZUNsYXNzKCdkaXNhYmxlJykuYWRkQ2xhc3MoJ2hhcy1sZXR0ZXInKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbG9hZE1vcmVCcmFuZHModXJsKSB7XG4gICAgICAgIHV0aWxzLmFwaS5nZXRQYWdlKHVybCwgcmVxdWVzdE9wdGlvbnMsIChlcnJvciwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGxpc3QgPSAkKHJlc3BvbnNlKTtcblxuICAgICAgICAgICAgcGFyc2VMaXN0QnJhbmQobGlzdCk7XG5cbiAgICAgICAgICAgIGNvbnN0IG5leHRVcmwgPSBsaXN0LmRhdGEoJ2JyYW5kcy1saXN0LW5leHQnKTtcblxuICAgICAgICAgICAgaWYgKG5leHRVcmwpIHtcbiAgICAgICAgICAgICAgICBsb2FkTW9yZUJyYW5kcyhuZXh0VXJsKTtcbiAgICAgICAgICAgIH0gZWxzZXtcbiAgICAgICAgICAgICAgICBheldyYXBwZXIucmVtb3ZlQ2xhc3MoJ2lzLWxvYWRpbmcnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==