(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ "./assets/js/theme/catalog.js":
/*!************************************!*\
  !*** ./assets/js/theme/catalog.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CatalogPage; });
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./page-manager */ "./assets/js/theme/page-manager.js");
/* harmony import */ var _common_url_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common/url-utils */ "./assets/js/theme/common/url-utils.js");
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! url */ "./node_modules/url/url.js");
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(url__WEBPACK_IMPORTED_MODULE_2__);
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var CatalogPage = /*#__PURE__*/function (_PageManager) {
  _inheritsLoose(CatalogPage, _PageManager);
  function CatalogPage() {
    return _PageManager.apply(this, arguments) || this;
  }
  var _proto = CatalogPage.prototype;
  _proto.onSortBySubmit = function onSortBySubmit(event) {
    var url = url__WEBPACK_IMPORTED_MODULE_2___default.a.parse(window.location.href, true);
    var queryParams = $(event.currentTarget).serialize().split('=');
    url.query[queryParams[0]] = queryParams[1];
    delete url.query.page;
    event.preventDefault();
    window.location = url__WEBPACK_IMPORTED_MODULE_2___default.a.format({
      pathname: url.pathname,
      search: _common_url_utils__WEBPACK_IMPORTED_MODULE_1__["default"].buildQueryString(url.query)
    });
  };
  return CatalogPage;
}(_page_manager__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/common/faceted-search.js":
/*!**************************************************!*\
  !*** ./assets/js/theme/common/faceted-search.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var lodash_includes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/includes */ "./node_modules/lodash/includes.js");
/* harmony import */ var lodash_includes__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_includes__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_union__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/union */ "./node_modules/lodash/union.js");
/* harmony import */ var lodash_union__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_union__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_without__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/without */ "./node_modules/lodash/without.js");
/* harmony import */ var lodash_without__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_without__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lodash_extend__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash/extend */ "./node_modules/lodash/extend.js");
/* harmony import */ var lodash_extend__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash_extend__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! url */ "./node_modules/url/url.js");
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(url__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _url_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./url-utils */ "./assets/js/theme/common/url-utils.js");
/* harmony import */ var _global_modal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../global/modal */ "./assets/js/theme/global/modal.js");
/* harmony import */ var _collapsible__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./collapsible */ "./assets/js/theme/common/collapsible.js");
/* harmony import */ var _form_utils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./form-utils */ "./assets/js/theme/common/form-utils.js");
/* harmony import */ var _nod__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./nod */ "./assets/js/theme/common/nod.js");












/**
 * Faceted search view component
 */
var FacetedSearch = /*#__PURE__*/function () {
  /**
   * @param {object} requestOptions - Object with options for the ajax requests
   * @param {function} callback - Function to execute after fetching templates
   * @param {object} options - Configurable options
   * @example
   *
   * let requestOptions = {
   *      templates: {
   *          productListing: 'category/product-listing',
   *          sidebar: 'category/sidebar'
   *     }
   * };
   *
   * let templatesDidLoad = function(content) {
   *     $productListingContainer.html(content.productListing);
   *     $facetedSearchContainer.html(content.sidebar);
   * };
   *
   * let facetedSearch = new FacetedSearch(requestOptions, templatesDidLoad);
   */
  function FacetedSearch(requestOptions, callback, options) {
    var _this = this;
    var defaultOptions = {
      accordionToggleSelector: '#facetedSearch .accordion-navigation, #facetedSearch .facetedSearch-toggle',
      blockerSelector: '#facetedSearch .blocker',
      clearFacetSelector: '#facetedSearch .facetedSearch-clearLink',
      componentSelector: '#facetedSearch-navList',
      facetNavListSelector: '#facetedSearch .navList',
      priceRangeErrorSelector: '#facet-range-form .form-inlineMessage',
      priceRangeFieldsetSelector: '#facet-range-form .form-fieldset',
      priceRangeFormSelector: '#facet-range-form',
      priceRangeMaxPriceSelector: '#facet-range-form [name=max_price]',
      priceRangeMinPriceSelector: '#facet-range-form [name=min_price]',
      showMoreToggleSelector: '#facetedSearch .accordion-content .toggleLink',
      facetedSearchFilterItems: '#facetedSearch-filterItems .form-input',
      modal: Object(_global_modal__WEBPACK_IMPORTED_MODULE_7__["default"])('#modal')[0],
      modalOpen: false
    };

    // Private properties
    this.requestOptions = requestOptions;
    this.callback = callback;
    this.options = lodash_extend__WEBPACK_IMPORTED_MODULE_3___default()({}, defaultOptions, options);
    this.collapsedFacets = [];
    this.collapsedFacetItems = [];

    // Init collapsibles
    Object(_collapsible__WEBPACK_IMPORTED_MODULE_8__["default"])();

    // Init price validator
    this.initPriceValidator();

    // Show limited items by default
    $(this.options.facetNavListSelector).each(function (index, navList) {
      _this.collapseFacetItems($(navList));
    });

    // Mark initially collapsed accordions
    $(this.options.accordionToggleSelector).each(function (index, accordionToggle) {
      var $accordionToggle = $(accordionToggle);
      var collapsible = $accordionToggle.data('collapsibleInstance');
      if (collapsible.isCollapsed) {
        _this.collapsedFacets.push(collapsible.targetId);
      }
    });

    // Collapse all facets if initially hidden
    // NOTE: Need to execute after Collapsible gets bootstrapped
    setTimeout(function () {
      if ($(_this.options.componentSelector).is(':hidden')) {
        _this.collapseAllFacets();
      }
    });

    // Observe user events
    this.onStateChange = this.onStateChange.bind(this);
    this.onToggleClick = this.onToggleClick.bind(this);
    this.onAccordionToggle = this.onAccordionToggle.bind(this);
    this.onClearFacet = this.onClearFacet.bind(this);
    this.onFacetClick = this.onFacetClick.bind(this);
    this.onRangeSubmit = this.onRangeSubmit.bind(this);
    this.onSortBySubmit = this.onSortBySubmit.bind(this);
    this.filterFacetItems = this.filterFacetItems.bind(this);
    this.bindEvents();
  }

  // Public methods
  var _proto = FacetedSearch.prototype;
  _proto.refreshView = function refreshView(content) {
    if (content) {
      this.callback(content);
    }

    // Init collapsibles
    Object(_collapsible__WEBPACK_IMPORTED_MODULE_8__["default"])();

    // Init price validator
    this.initPriceValidator();

    // Restore view state
    // this.restoreCollapsedFacets();
    this.restoreCollapsedFacetItems();

    // Bind events
    this.bindEvents();
  };
  _proto.updateView = function updateView() {
    var _this2 = this;
    $(this.options.blockerSelector).show();
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__["api"].getPage(_url_utils__WEBPACK_IMPORTED_MODULE_6__["default"].getUrl(), this.requestOptions, function (err, content) {
      $(_this2.options.blockerSelector).hide();
      if (err) {
        throw new Error(err);
      }

      // Refresh view with new content
      _this2.refreshView(content);
    });
  };
  _proto.expandFacetItems = function expandFacetItems($navList) {
    var id = $navList.attr('id');

    // Remove
    this.collapsedFacetItems = lodash_without__WEBPACK_IMPORTED_MODULE_2___default()(this.collapsedFacetItems, id);
  };
  _proto.collapseFacetItems = function collapseFacetItems($navList) {
    var id = $navList.attr('id');
    var hasMoreResults = $navList.data('hasMoreResults');
    if (hasMoreResults) {
      this.collapsedFacetItems = lodash_union__WEBPACK_IMPORTED_MODULE_1___default()(this.collapsedFacetItems, [id]);
    } else {
      this.collapsedFacetItems = lodash_without__WEBPACK_IMPORTED_MODULE_2___default()(this.collapsedFacetItems, id);
    }
  };
  _proto.toggleFacetItems = function toggleFacetItems($navList) {
    var id = $navList.attr('id');

    // Toggle depending on `collapsed` flag
    if (lodash_includes__WEBPACK_IMPORTED_MODULE_0___default()(this.collapsedFacetItems, id)) {
      this.getMoreFacetResults($navList);
      return true;
    }
    this.collapseFacetItems($navList);
    return false;
  };
  _proto.getMoreFacetResults = function getMoreFacetResults($navList) {
    var _this3 = this;
    var facet = $navList.data('facet');
    var facetUrl = _url_utils__WEBPACK_IMPORTED_MODULE_6__["default"].getUrl();
    if (this.requestOptions.showMore) {
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__["api"].getPage(facetUrl, {
        template: this.requestOptions.showMore,
        params: {
          list_all: facet
        }
      }, function (err, response) {
        if (err) {
          throw new Error(err);
        }
        _this3.options.modal.open();
        $('#modal').addClass('modal--filter');
        _this3.options.modalOpen = true;
        _this3.options.modal.updateContent(response);
      });
    }
    this.collapseFacetItems($navList);
    return false;
  };
  _proto.filterFacetItems = function filterFacetItems(event) {
    var $items = $('.navList-item');
    var query = $(event.currentTarget).val().toLowerCase();
    $items.each(function (index, element) {
      var text = $(element).text().toLowerCase();
      if (text.indexOf(query) !== -1) {
        $(element).show();
      } else {
        $(element).hide();
      }
    });
  };
  _proto.expandFacet = function expandFacet($accordionToggle) {
    var collapsible = $accordionToggle.data('collapsibleInstance');
    collapsible.open();
  };
  _proto.collapseFacet = function collapseFacet($accordionToggle) {
    var collapsible = $accordionToggle.data('collapsibleInstance');
    collapsible.close();
  };
  _proto.collapseAllFacets = function collapseAllFacets() {
    var _this4 = this;
    var $accordionToggles = $(this.options.accordionToggleSelector);
    $accordionToggles.each(function (index, accordionToggle) {
      var $accordionToggle = $(accordionToggle);
      _this4.collapseFacet($accordionToggle);
    });
  };
  _proto.expandAllFacets = function expandAllFacets() {
    var _this5 = this;
    var $accordionToggles = $(this.options.accordionToggleSelector);
    $accordionToggles.each(function (index, accordionToggle) {
      var $accordionToggle = $(accordionToggle);
      _this5.expandFacet($accordionToggle);
    });
  }

  // Private methods
  ;
  _proto.initPriceValidator = function initPriceValidator() {
    if ($(this.options.priceRangeFormSelector).length === 0) {
      return;
    }
    var validator = Object(_nod__WEBPACK_IMPORTED_MODULE_10__["default"])();
    var selectors = {
      errorSelector: this.options.priceRangeErrorSelector,
      fieldsetSelector: this.options.priceRangeFieldsetSelector,
      formSelector: this.options.priceRangeFormSelector,
      maxPriceSelector: this.options.priceRangeMaxPriceSelector,
      minPriceSelector: this.options.priceRangeMinPriceSelector
    };
    _form_utils__WEBPACK_IMPORTED_MODULE_9__["Validators"].setMinMaxPriceValidation(validator, selectors);
    this.priceRangeValidator = validator;
  };
  _proto.restoreCollapsedFacetItems = function restoreCollapsedFacetItems() {
    var _this6 = this;
    var $navLists = $(this.options.facetNavListSelector);

    // Restore collapsed state for each facet
    $navLists.each(function (index, navList) {
      var $navList = $(navList);
      var id = $navList.attr('id');
      var shouldCollapse = lodash_includes__WEBPACK_IMPORTED_MODULE_0___default()(_this6.collapsedFacetItems, id);
      if (shouldCollapse) {
        _this6.collapseFacetItems($navList);
      } else {
        _this6.expandFacetItems($navList);
      }
    });
  };
  _proto.restoreCollapsedFacets = function restoreCollapsedFacets() {
    var _this7 = this;
    var $accordionToggles = $(this.options.accordionToggleSelector);
    $accordionToggles.each(function (index, accordionToggle) {
      var $accordionToggle = $(accordionToggle);
      var collapsible = $accordionToggle.data('collapsibleInstance');
      var id = collapsible.targetId;
      var shouldCollapse = lodash_includes__WEBPACK_IMPORTED_MODULE_0___default()(_this7.collapsedFacets, id);
      if (shouldCollapse) {
        _this7.collapseFacet($accordionToggle);
      } else {
        _this7.expandFacet($accordionToggle);
      }
    });
  };
  _proto.bindEvents = function bindEvents() {
    // Clean-up
    this.unbindEvents();

    // DOM events
    $(window).on('statechange', this.onStateChange);
    $(window).on('popstate', this.onPopState);
    $(document).on('click', this.options.showMoreToggleSelector, this.onToggleClick);
    $(document).on('toggle.collapsible', this.options.accordionToggleSelector, this.onAccordionToggle);
    $(document).on('keyup', this.options.facetedSearchFilterItems, this.filterFacetItems);
    $(this.options.clearFacetSelector).on('click', this.onClearFacet);

    // Hooks
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__["hooks"].on('facetedSearch-facet-clicked', this.onFacetClick);
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__["hooks"].on('facetedSearch-range-submitted', this.onRangeSubmit);
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__["hooks"].on('sortBy-submitted', this.onSortBySubmit);
  };
  _proto.unbindEvents = function unbindEvents() {
    // DOM events
    $(window).off('statechange', this.onStateChange);
    $(window).off('popstate', this.onPopState);
    $(document).off('click', this.options.showMoreToggleSelector, this.onToggleClick);
    $(document).off('toggle.collapsible', this.options.accordionToggleSelector, this.onAccordionToggle);
    $(document).off('keyup', this.options.facetedSearchFilterItems, this.filterFacetItems);
    $(this.options.clearFacetSelector).off('click', this.onClearFacet);

    // Hooks
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__["hooks"].off('facetedSearch-facet-clicked', this.onFacetClick);
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__["hooks"].off('facetedSearch-range-submitted', this.onRangeSubmit);
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__["hooks"].off('sortBy-submitted', this.onSortBySubmit);
  };
  _proto.onClearFacet = function onClearFacet(event) {
    var $link = $(event.currentTarget);
    var url = $link.attr('href');
    event.preventDefault();
    event.stopPropagation();

    // Update URL
    _url_utils__WEBPACK_IMPORTED_MODULE_6__["default"].goToUrl(url);
  };
  _proto.onToggleClick = function onToggleClick(event) {
    var $toggle = $(event.currentTarget);
    var $navList = $($toggle.attr('href'));

    // Prevent default
    event.preventDefault();

    // Toggle visible items
    this.toggleFacetItems($navList);
  };
  _proto.onFacetClick = function onFacetClick(event) {
    var $link = $(event.currentTarget);
    var url = $link.attr('href');
    event.preventDefault();
    $link.toggleClass('is-selected');

    // Update URL
    _url_utils__WEBPACK_IMPORTED_MODULE_6__["default"].goToUrl(url);
    if (this.options.modalOpen) {
      this.options.modal.close();
    }
  };
  _proto.onSortBySubmit = function onSortBySubmit(event) {
    var url = url__WEBPACK_IMPORTED_MODULE_5___default.a.parse(window.location.href, true);
    var queryParams = $(event.currentTarget).serialize().split('=');
    url.query[queryParams[0]] = queryParams[1];
    delete url.query.page;

    // Url object `query` is not a traditional JavaScript Object on all systems, clone it instead
    var urlQueryParams = {};
    Object.assign(urlQueryParams, url.query);
    event.preventDefault();
    _url_utils__WEBPACK_IMPORTED_MODULE_6__["default"].goToUrl(url__WEBPACK_IMPORTED_MODULE_5___default.a.format({
      pathname: url.pathname,
      search: _url_utils__WEBPACK_IMPORTED_MODULE_6__["default"].buildQueryString(urlQueryParams)
    }));
  };
  _proto.onRangeSubmit = function onRangeSubmit(event) {
    event.preventDefault();
    if (!this.priceRangeValidator.areAll(_nod__WEBPACK_IMPORTED_MODULE_10__["default"].constants.VALID)) {
      return;
    }
    var url = url__WEBPACK_IMPORTED_MODULE_5___default.a.parse(window.location.href, true);
    var queryParams = decodeURI($(event.currentTarget).serialize()).split('&');
    queryParams = _url_utils__WEBPACK_IMPORTED_MODULE_6__["default"].parseQueryParams(queryParams);
    for (var key in queryParams) {
      if (queryParams.hasOwnProperty(key)) {
        url.query[key] = queryParams[key];
      }
    }

    // Url object `query` is not a traditional JavaScript Object on all systems, clone it instead
    var urlQueryParams = {};
    Object.assign(urlQueryParams, url.query);
    _url_utils__WEBPACK_IMPORTED_MODULE_6__["default"].goToUrl(url__WEBPACK_IMPORTED_MODULE_5___default.a.format({
      pathname: url.pathname,
      search: _url_utils__WEBPACK_IMPORTED_MODULE_6__["default"].buildQueryString(urlQueryParams)
    }));
  };
  _proto.onStateChange = function onStateChange() {
    this.updateView();
  };
  _proto.onAccordionToggle = function onAccordionToggle(event) {
    var $accordionToggle = $(event.currentTarget);
    var collapsible = $accordionToggle.data('collapsibleInstance');
    var id = collapsible.targetId;
    if (collapsible.isCollapsed) {
      this.collapsedFacets = lodash_union__WEBPACK_IMPORTED_MODULE_1___default()(this.collapsedFacets, [id]);
    } else {
      this.collapsedFacets = lodash_without__WEBPACK_IMPORTED_MODULE_2___default()(this.collapsedFacets, id);
    }
  };
  _proto.onPopState = function onPopState() {
    var currentUrl = window.location.href;
    var searchParams = new URLSearchParams(currentUrl);
    // If searchParams does not contain a page value then modify url query string to have page=1
    if (!searchParams.has('page')) {
      var linkUrl = $('.pagination-link').attr('href');
      var re = /page=[0-9]+/i;
      var updatedLinkUrl = linkUrl.replace(re, 'page=1');
      window.history.replaceState({}, document.title, updatedLinkUrl);
    }
    $(window).trigger('statechange');
  };
  return FacetedSearch;
}();
/* harmony default export */ __webpack_exports__["default"] = (FacetedSearch);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/common/url-utils.js":
/*!*********************************************!*\
  !*** ./assets/js/theme/common/url-utils.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! url */ "./node_modules/url/url.js");
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(url__WEBPACK_IMPORTED_MODULE_0__);

var urlUtils = {
  getUrl: function getUrl() {
    return "" + window.location.pathname + window.location.search;
  },
  goToUrl: function goToUrl(url) {
    window.history.pushState({}, document.title, url);
    $(window).trigger('statechange');
  },
  replaceParams: function replaceParams(url, params) {
    var parsed = url__WEBPACK_IMPORTED_MODULE_0___default.a.parse(url, true);
    var param;

    // Let the formatter use the query object to build the new url
    parsed.search = null;
    for (param in params) {
      if (params.hasOwnProperty(param)) {
        parsed.query[param] = params[param];
      }
    }
    return url__WEBPACK_IMPORTED_MODULE_0___default.a.format(parsed);
  },
  buildQueryString: function buildQueryString(queryData) {
    var out = '';
    var key;
    for (key in queryData) {
      if (queryData.hasOwnProperty(key)) {
        if (Array.isArray(queryData[key])) {
          var ndx = void 0;
          for (ndx in queryData[key]) {
            if (queryData[key].hasOwnProperty(ndx)) {
              out += "&" + key + "=" + queryData[key][ndx];
            }
          }
        } else {
          out += "&" + key + "=" + queryData[key];
        }
      }
    }
    return out.substring(1);
  },
  parseQueryParams: function parseQueryParams(queryData) {
    var params = {};
    for (var i = 0; i < queryData.length; i++) {
      var temp = queryData[i].split('=');
      if (temp[0] in params) {
        if (Array.isArray(params[temp[0]])) {
          params[temp[0]].push(temp[1]);
        } else {
          params[temp[0]] = [params[temp[0]], temp[1]];
        }
      } else {
        params[temp[0]] = temp[1];
      }
    }
    return params;
  }
};
/* harmony default export */ __webpack_exports__["default"] = (urlUtils);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/global/compare-products.js":
/*!****************************************************!*\
  !*** ./assets/js/theme/global/compare-products.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var lodash_map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/map */ "./node_modules/lodash/map.js");
/* harmony import */ var lodash_map__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_map__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modal */ "./assets/js/theme/global/modal.js");


function decrementCounter(counter, item) {
  var index = counter.indexOf(item);
  if (index > -1) {
    counter.splice(index, 1);
  }
}
function incrementCounter(counter, item) {
  counter.push(item);
}
function updateCounterNav(counter, $link, urlContext) {
  if (counter.length > 1) {
    if (!$link.is('visible')) {
      $link.addClass('show');
    }
    $link.attr('href', urlContext.compare + "/" + counter.join('/'));
    $link.find('span.countPill').html(counter.length);
  } else {
    $link.removeClass('show');
  }
}
/* harmony default export */ __webpack_exports__["default"] = (function (urlContext) {
  var compareCounter = [];
  var $compareLink = $('a[data-compare-nav]');
  $('body').on('compareReset', function () {
    var $checked = $('body').find('input[name="products\[\]"]:checked');
    compareCounter = $checked.length ? lodash_map__WEBPACK_IMPORTED_MODULE_0___default()($checked, function (element) {
      return element.value;
    }) : [];
    updateCounterNav(compareCounter, $compareLink, urlContext);
  });
  $('body').triggerHandler('compareReset');
  $('body').on('click', '[data-compare-id]', function (event) {
    var product = event.currentTarget.value;
    var $clickedCompareLink = $('a[data-compare-nav]');
    if (event.currentTarget.checked) {
      incrementCounter(compareCounter, product);
    } else {
      decrementCounter(compareCounter, product);
    }
    updateCounterNav(compareCounter, $clickedCompareLink, urlContext);
  });
  $('body').on('submit', '[data-product-compare]', function (event) {
    var $this = $(event.currentTarget);
    var productsToCompare = $this.find('input[name="products\[\]"]:checked');
    if (productsToCompare.length <= 1) {
      Object(_modal__WEBPACK_IMPORTED_MODULE_1__["showAlertModal"])('You must select at least two products to compare');
      event.preventDefault();
    }
  });
  $('body').on('click', 'a[data-compare-nav]', function () {
    var $clickedCheckedInput = $('body').find('input[name="products\[\]"]:checked');
    if ($clickedCheckedInput.length <= 1) {
      Object(_modal__WEBPACK_IMPORTED_MODULE_1__["showAlertModal"])('You must select at least two products to compare');
      return false;
    }
  });
});
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

/***/ "./assets/js/theme/halothemes/haloProductDisplayMode.js":
/*!**************************************************************!*\
  !*** ./assets/js/theme/halothemes/haloProductDisplayMode.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony default export */ __webpack_exports__["default"] = (function () {
  var $productListing = $('#product-listing-container .productListing'),
    $grid = $('#grid-view'),
    $list = $('#list-view'),
    $gridMobile = $('#grid-view-mobile'),
    $listMobile = $('#list-view-mobile');
  $list.on('click', function (event) {
    if (!$list.hasClass('current-view')) {
      setTimeout(function () {
        $list.addClass('current-view');
        $listMobile.addClass('current-view');
        $grid.removeClass('current-view');
        $gridMobile.removeClass('current-view');
        $productListing.removeClass('productGrid').addClass('productList');
      }, 300);
    }
  });
  $grid.on('click', function (event) {
    if (!$grid.hasClass('current-view')) {
      setTimeout(function () {
        $grid.addClass('current-view');
        $gridMobile.addClass('current-view');
        $list.removeClass('current-view');
        $listMobile.removeClass('current-view');
        $productListing.removeClass('productList').addClass('productGrid');
      }, 300);
    }
  });
  $listMobile.on('click', function (event) {
    if (!$listMobile.hasClass('current-view')) {
      setTimeout(function () {
        $list.addClass('current-view');
        $listMobile.addClass('current-view');
        $grid.removeClass('current-view');
        $gridMobile.removeClass('current-view');
        $productListing.removeClass('productGrid').addClass('productList');
      }, 300);
    }
  });
  $gridMobile.on('click', function (event) {
    if (!$gridMobile.hasClass('current-view')) {
      setTimeout(function () {
        $grid.addClass('current-view');
        $gridMobile.addClass('current-view');
        $list.removeClass('current-view');
        $listMobile.removeClass('current-view');
        $productListing.removeClass('productList').addClass('productGrid');
      }, 300);
    }
  });
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/halothemes/haloSideAllCategory.js":
/*!***********************************************************!*\
  !*** ./assets/js/theme/halothemes/haloSideAllCategory.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony default export */ __webpack_exports__["default"] = (function () {
  if ($('.all-categories-list').length > 0) {
    $(document).on('click', '.all-categories-list .icon-dropdown', function () {
      var $this = $(this).parent();
      $this.siblings().removeClass('is-clicked current-cate');
      $this.toggleClass('is-clicked');
      $this.siblings().find("> .dropdown-category-list").slideUp("slow");
      $this.find("> .dropdown-category-list").slideToggle("slow");
    });
    $('.all-categories-list li').each(function () {
      if ($(this).hasClass('current-cate')) {
        $(this).find("> .dropdown-category-list").slideToggle("slow");
      }
    });
  }
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/halothemes/haloStickyToolbar.js":
/*!*********************************************************!*\
  !*** ./assets/js/theme/halothemes/haloStickyToolbar.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony default export */ __webpack_exports__["default"] = (function (context) {
  var $body = $('body');
  function toolbar_sticky() {
    var toolbar_position,
      toolbar_height,
      toolbar = $('.page-listing .halo-toolbar');
    toolbar_height = toolbar.height();
    toolbar_position = toolbar.offset().top + toolbar.outerHeight(true);
    if (toolbar.length) {
      toolbar_scroll(toolbar_position, toolbar_height, toolbar);
    }
  }
  function toolbar_scroll(toolbar_position, toolbar_height, toolbar) {
    var didScroll,
      lastScrollTop = 0,
      delta = 5;
    $(window).on('scroll load', function () {
      var scroll = $(window).scrollTop();
      if (Math.abs(lastScrollTop - scroll) <= delta) {
        return;
      }
      if (scroll > lastScrollTop && scroll > toolbar_position) {
        toolbar.removeClass('sticky-down').addClass('sticky-up');
        if (scroll > toolbar_position) {
          $body.addClass('has-stickyToolbar');
        } else {
          $body.removeClass('has-stickyToolbar');
        }
      } else {
        if (scroll + $(window).height() < $(document).height()) {
          toolbar.removeClass('sticky-up').addClass('sticky-down');
          if (scroll > toolbar_position) {
            $body.addClass('has-stickyToolbar');
          } else {
            $body.removeClass('has-stickyToolbar');
          }
        }
      }
      lastScrollTop = scroll;
    });
  }
  if ($(window).width() < 1025) {
    toolbar_sticky();
  } else {
    $body.removeClass('has-stickyToolbar');
  }
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY2F0YWxvZy5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY29tbW9uL2ZhY2V0ZWQtc2VhcmNoLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy90aGVtZS9jb21tb24vdXJsLXV0aWxzLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy90aGVtZS9nbG9iYWwvY29tcGFyZS1wcm9kdWN0cy5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvaGFsb3RoZW1lcy9oYWxvQWRkT3B0aW9uRm9yUHJvZHVjdENhcmQuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3RoZW1lL2hhbG90aGVtZXMvaGFsb1Byb2R1Y3REaXNwbGF5TW9kZS5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvaGFsb3RoZW1lcy9oYWxvU2lkZUFsbENhdGVnb3J5LmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy90aGVtZS9oYWxvdGhlbWVzL2hhbG9TdGlja3lUb29sYmFyLmpzIl0sIm5hbWVzIjpbIkNhdGFsb2dQYWdlIiwib25Tb3J0QnlTdWJtaXQiLCJldmVudCIsInVybCIsIlVybCIsInBhcnNlIiwid2luZG93IiwibG9jYXRpb24iLCJocmVmIiwicXVlcnlQYXJhbXMiLCIkIiwiY3VycmVudFRhcmdldCIsInNlcmlhbGl6ZSIsInNwbGl0IiwicXVlcnkiLCJwYWdlIiwicHJldmVudERlZmF1bHQiLCJmb3JtYXQiLCJwYXRobmFtZSIsInNlYXJjaCIsInVybFV0aWxzIiwiYnVpbGRRdWVyeVN0cmluZyIsIlBhZ2VNYW5hZ2VyIiwiRmFjZXRlZFNlYXJjaCIsInJlcXVlc3RPcHRpb25zIiwiY2FsbGJhY2siLCJvcHRpb25zIiwiZGVmYXVsdE9wdGlvbnMiLCJhY2NvcmRpb25Ub2dnbGVTZWxlY3RvciIsImJsb2NrZXJTZWxlY3RvciIsImNsZWFyRmFjZXRTZWxlY3RvciIsImNvbXBvbmVudFNlbGVjdG9yIiwiZmFjZXROYXZMaXN0U2VsZWN0b3IiLCJwcmljZVJhbmdlRXJyb3JTZWxlY3RvciIsInByaWNlUmFuZ2VGaWVsZHNldFNlbGVjdG9yIiwicHJpY2VSYW5nZUZvcm1TZWxlY3RvciIsInByaWNlUmFuZ2VNYXhQcmljZVNlbGVjdG9yIiwicHJpY2VSYW5nZU1pblByaWNlU2VsZWN0b3IiLCJzaG93TW9yZVRvZ2dsZVNlbGVjdG9yIiwiZmFjZXRlZFNlYXJjaEZpbHRlckl0ZW1zIiwibW9kYWwiLCJtb2RhbEZhY3RvcnkiLCJtb2RhbE9wZW4iLCJjb2xsYXBzZWRGYWNldHMiLCJjb2xsYXBzZWRGYWNldEl0ZW1zIiwiY29sbGFwc2libGVGYWN0b3J5IiwiaW5pdFByaWNlVmFsaWRhdG9yIiwiZWFjaCIsImluZGV4IiwibmF2TGlzdCIsImNvbGxhcHNlRmFjZXRJdGVtcyIsImFjY29yZGlvblRvZ2dsZSIsIiRhY2NvcmRpb25Ub2dnbGUiLCJjb2xsYXBzaWJsZSIsImRhdGEiLCJpc0NvbGxhcHNlZCIsInB1c2giLCJ0YXJnZXRJZCIsInNldFRpbWVvdXQiLCJpcyIsImNvbGxhcHNlQWxsRmFjZXRzIiwib25TdGF0ZUNoYW5nZSIsImJpbmQiLCJvblRvZ2dsZUNsaWNrIiwib25BY2NvcmRpb25Ub2dnbGUiLCJvbkNsZWFyRmFjZXQiLCJvbkZhY2V0Q2xpY2siLCJvblJhbmdlU3VibWl0IiwiZmlsdGVyRmFjZXRJdGVtcyIsImJpbmRFdmVudHMiLCJyZWZyZXNoVmlldyIsImNvbnRlbnQiLCJyZXN0b3JlQ29sbGFwc2VkRmFjZXRJdGVtcyIsInVwZGF0ZVZpZXciLCJzaG93IiwiYXBpIiwiZ2V0UGFnZSIsImdldFVybCIsImVyciIsImhpZGUiLCJFcnJvciIsImV4cGFuZEZhY2V0SXRlbXMiLCIkbmF2TGlzdCIsImlkIiwiYXR0ciIsImhhc01vcmVSZXN1bHRzIiwidG9nZ2xlRmFjZXRJdGVtcyIsImdldE1vcmVGYWNldFJlc3VsdHMiLCJmYWNldCIsImZhY2V0VXJsIiwic2hvd01vcmUiLCJ0ZW1wbGF0ZSIsInBhcmFtcyIsImxpc3RfYWxsIiwicmVzcG9uc2UiLCJvcGVuIiwiYWRkQ2xhc3MiLCJ1cGRhdGVDb250ZW50IiwiJGl0ZW1zIiwidmFsIiwidG9Mb3dlckNhc2UiLCJlbGVtZW50IiwidGV4dCIsImluZGV4T2YiLCJleHBhbmRGYWNldCIsImNvbGxhcHNlRmFjZXQiLCJjbG9zZSIsIiRhY2NvcmRpb25Ub2dnbGVzIiwiZXhwYW5kQWxsRmFjZXRzIiwibGVuZ3RoIiwidmFsaWRhdG9yIiwibm9kIiwic2VsZWN0b3JzIiwiZXJyb3JTZWxlY3RvciIsImZpZWxkc2V0U2VsZWN0b3IiLCJmb3JtU2VsZWN0b3IiLCJtYXhQcmljZVNlbGVjdG9yIiwibWluUHJpY2VTZWxlY3RvciIsIlZhbGlkYXRvcnMiLCJzZXRNaW5NYXhQcmljZVZhbGlkYXRpb24iLCJwcmljZVJhbmdlVmFsaWRhdG9yIiwiJG5hdkxpc3RzIiwic2hvdWxkQ29sbGFwc2UiLCJyZXN0b3JlQ29sbGFwc2VkRmFjZXRzIiwidW5iaW5kRXZlbnRzIiwib24iLCJvblBvcFN0YXRlIiwiZG9jdW1lbnQiLCJob29rcyIsIm9mZiIsIiRsaW5rIiwic3RvcFByb3BhZ2F0aW9uIiwiZ29Ub1VybCIsIiR0b2dnbGUiLCJ0b2dnbGVDbGFzcyIsInVybFF1ZXJ5UGFyYW1zIiwiT2JqZWN0IiwiYXNzaWduIiwiYXJlQWxsIiwiY29uc3RhbnRzIiwiVkFMSUQiLCJkZWNvZGVVUkkiLCJwYXJzZVF1ZXJ5UGFyYW1zIiwia2V5IiwiaGFzT3duUHJvcGVydHkiLCJjdXJyZW50VXJsIiwic2VhcmNoUGFyYW1zIiwiVVJMU2VhcmNoUGFyYW1zIiwiaGFzIiwibGlua1VybCIsInJlIiwidXBkYXRlZExpbmtVcmwiLCJyZXBsYWNlIiwiaGlzdG9yeSIsInJlcGxhY2VTdGF0ZSIsInRpdGxlIiwidHJpZ2dlciIsInB1c2hTdGF0ZSIsInJlcGxhY2VQYXJhbXMiLCJwYXJzZWQiLCJwYXJhbSIsInF1ZXJ5RGF0YSIsIm91dCIsIkFycmF5IiwiaXNBcnJheSIsIm5keCIsInN1YnN0cmluZyIsImkiLCJ0ZW1wIiwiZGVjcmVtZW50Q291bnRlciIsImNvdW50ZXIiLCJpdGVtIiwic3BsaWNlIiwiaW5jcmVtZW50Q291bnRlciIsInVwZGF0ZUNvdW50ZXJOYXYiLCJ1cmxDb250ZXh0IiwiY29tcGFyZSIsImpvaW4iLCJmaW5kIiwiaHRtbCIsInJlbW92ZUNsYXNzIiwiY29tcGFyZUNvdW50ZXIiLCIkY29tcGFyZUxpbmsiLCIkY2hlY2tlZCIsInZhbHVlIiwidHJpZ2dlckhhbmRsZXIiLCJwcm9kdWN0IiwiJGNsaWNrZWRDb21wYXJlTGluayIsImNoZWNrZWQiLCIkdGhpcyIsInByb2R1Y3RzVG9Db21wYXJlIiwic2hvd0FsZXJ0TW9kYWwiLCIkY2xpY2tlZENoZWNrZWRJbnB1dCIsImZldGNoIiwicmVxdWlyZSIsImNvbnRleHQiLCJ3cmFwcGVyIiwidGhlbWVTZXR0aW5ncyIsImhhbG9BZGRPcHRpb25Gb3JQcm9kdWN0IiwiY2FsbFByb2R1Y3RPcHRpb24iLCJwcm9kdWN0X2NsYXNzIiwicHJvZHVjdElkIiwibGlzdCIsInRvU3RyaW5nIiwiZ2V0UHJvZHVjdE9wdGlvbiIsInRoZW4iLCJyZW5kZXJPcHRpb24iLCJpZHgiLCJhcnIiLCJwcm9kdWN0X3dyYXBwZXIiLCJ0eHQiLCJyZW1vdmUiLCJjb3VudE1vcmVPcHRpb24iLCJwcm9kdWN0TGluayIsImFwcGVuZCIsIm1ldGhvZCIsImhlYWRlcnMiLCJ0b2tlbiIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwicmVzIiwianNvbiIsImFGaWx0ZXIiLCJzaXRlIiwicHJvZHVjdHMiLCJlZGdlcyIsIm5vZGUiLCJlbnRpdHlJZCIsInByb2R1Y3RGaWVsZENvbG9yIiwicHJvZHVjdEZpZWxkU2l6ZSIsImFGaWx0ZXIyIiwicHJvZHVjdE9wdGlvbnMiLCJhRmlsdGVyMyIsImZpbHRlciIsImRpc3BsYXlTdHlsZSIsImFGaWx0ZXI1IiwiZGlzcGxheU5hbWUiLCJoYWxvQWRkT3B0aW9uRm9yUHJvZHVjdDIiLCJhRmlsdGVyNCIsInZhbHVlcyIsInRpdGxlVmFyIiwibGFiZWwiLCJpZFZhciIsImxlbmd0aENvbG9yVmFyIiwiaGV4Q29sb3JzIiwiY29sb3IxIiwiY29sb3IyIiwiY29sb3IzIiwiaW1nIiwiaW1hZ2VVcmwiLCJCb29sZWFuIiwiaGFsb0FkZE9wdGlvbkZvclByb2R1Y3RUZXh0IiwiJHByb2R1Y3RMaXN0aW5nIiwiJGdyaWQiLCIkbGlzdCIsIiRncmlkTW9iaWxlIiwiJGxpc3RNb2JpbGUiLCJoYXNDbGFzcyIsInBhcmVudCIsInNpYmxpbmdzIiwic2xpZGVVcCIsInNsaWRlVG9nZ2xlIiwiJGJvZHkiLCJ0b29sYmFyX3N0aWNreSIsInRvb2xiYXJfcG9zaXRpb24iLCJ0b29sYmFyX2hlaWdodCIsInRvb2xiYXIiLCJoZWlnaHQiLCJvZmZzZXQiLCJ0b3AiLCJvdXRlckhlaWdodCIsInRvb2xiYXJfc2Nyb2xsIiwiZGlkU2Nyb2xsIiwibGFzdFNjcm9sbFRvcCIsImRlbHRhIiwic2Nyb2xsIiwic2Nyb2xsVG9wIiwiTWF0aCIsImFicyIsIndpZHRoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBeUM7QUFDQztBQUNwQjtBQUFBLElBRURBLFdBQVc7RUFBQTtFQUFBO0lBQUE7RUFBQTtFQUFBO0VBQUEsT0FDNUJDLGNBQWMsR0FBZCx3QkFBZUMsS0FBSyxFQUFFO0lBQ2xCLElBQU1DLEdBQUcsR0FBR0MsMENBQUcsQ0FBQ0MsS0FBSyxDQUFDQyxNQUFNLENBQUNDLFFBQVEsQ0FBQ0MsSUFBSSxFQUFFLElBQUksQ0FBQztJQUNqRCxJQUFNQyxXQUFXLEdBQUdDLENBQUMsQ0FBQ1IsS0FBSyxDQUFDUyxhQUFhLENBQUMsQ0FBQ0MsU0FBUyxFQUFFLENBQUNDLEtBQUssQ0FBQyxHQUFHLENBQUM7SUFFakVWLEdBQUcsQ0FBQ1csS0FBSyxDQUFDTCxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBR0EsV0FBVyxDQUFDLENBQUMsQ0FBQztJQUMxQyxPQUFPTixHQUFHLENBQUNXLEtB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O1VBRXhELElBQUlvTCxNQUFNLEdBQUdYLGdCQUFnQixFQUFFO1lBQzNCRixLQUFLLENBQUN2SyxRQUFRLENBQUMsbUJBQW1CLENBQUM7VUFDdkMsQ0FBQyxNQUFNO1lBQ0h1SyxLQUFLLENBQUNuRixXQUFXLENBQUMsbUJBQW1CLENBQUM7VUFDMUM7UUFDSjtNQUNKO01BRUE4RixhQUFhLEdBQUdFLE1BQU07SUFDMUIsQ0FBQyxDQUFDO0VBQ047RUFFQSxJQUFJMVEsQ0FBQyxDQUFDSixNQUFNLENBQUMsQ0FBQ2tSLEtBQUssRUFBRSxHQUFHLElBQUksRUFBRTtJQUMxQmhCLGNBQWMsRUFBRTtFQUNwQixDQUFDLE1BQUs7SUFDRkQsS0FBSyxDQUFDbkYsV0FBVyxDQUFDLG1CQUFtQixDQUFDO0VBQzFDO0FBQ0osQyIsImZpbGUiOiJ0aGVtZS1idW5kbGUuY2h1bmsuMS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQYWdlTWFuYWdlciBmcm9tICcuL3BhZ2UtbWFuYWdlcic7XG5pbXBvcnQgdXJsVXRpbHMgZnJvbSAnLi9jb21tb24vdXJsLXV0aWxzJztcbmltcG9ydCBVcmwgZnJvbSAndXJsJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2F0YWxvZ1BhZ2UgZXh0ZW5kcyBQYWdlTWFuYWdlciB7XG4gICAgb25Tb3J0QnlTdWJtaXQoZXZlbnQpIHtcbiAgICAgICAgY29uc3QgdXJsID0gVXJsLnBhcnNlKHdpbmRvdy5sb2NhdGlvbi5ocmVmLCB0cnVlKTtcbiAgICAgICAgY29uc3QgcXVlcnlQYXJhbXMgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLnNlcmlhbGl6ZSgpLnNwbGl0KCc9Jyk7XG5cbiAgICAgICAgdXJsLnF1ZXJ5W3F1ZXJ5UGFyYW1zWzBdXSA9IHF1ZXJ5UGFyYW1zWzFdO1xuICAgICAgICBkZWxldGUgdXJsLnF1ZXJ5LnBhZ2U7XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uID0gVXJsLmZvcm1hdCh7IHBhdGhuYW1lOiB1cmwucGF0aG5hbWUsIHNlYXJjaDogdXJsVXRpbHMuYnVpbGRRdWVyeVN0cmluZyh1cmwucXVlcnkpIH0pO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IGhvb2tzLCBhcGkgfSBmcm9tICdAYmlnY29tbWVyY2Uvc3RlbmNpbC11dGlscyc7XG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IFVybCBmcm9tICd1cmwnO1xuaW1wb3J0IHVybFV0aWxzIGZyb20gJy4vdXJsLXV0aWxzJztcbmltcG9ydCBtb2RhbEZhY3RvcnkgZnJvbSAnLi4vZ2xvYmFsL21vZGFsJztcbmltcG9ydCBjb2xsYXBzaWJsZUZhY3RvcnkgZnJvbSAnLi9jb2xsYXBzaWJsZSc7XG5pbXBvcnQgeyBWYWxpZGF0b3JzIH0gZnJvbSAnLi9mb3JtLXV0aWxzJztcbmltcG9ydCBub2QgZnJvbSAnLi9ub2QnO1xuXG4vKipcbiAqIEZhY2V0ZWQgc2VhcmNoIHZpZXcgY29tcG9uZW50XG4gKi9cbmNsYXNzIEZhY2V0ZWRTZWFyY2gge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSByZXF1ZXN0T3B0aW9ucyAtIE9iamVjdCB3aXRoIG9wdGlvbnMgZm9yIHRoZSBhamF4IHJlcXVlc3RzXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2sgLSBGdW5jdGlvbiB0byBleGVjdXRlIGFmdGVyIGZldGNoaW5nIHRlbXBsYXRlc1xuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIC0gQ29uZmlndXJhYmxlIG9wdGlvbnNcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogbGV0IHJlcXVlc3RPcHRpb25zID0ge1xuICAgICAqICAgICAgdGVtcGxhdGVzOiB7XG4gICAgICogICAgICAgICAgcHJvZHVjdExpc3Rpbmc6ICdjYXRlZ29yeS9wcm9kdWN0LWxpc3RpbmcnLFxuICAgICAqICAgICAgICAgIHNpZGViYXI6ICdjYXRlZ29yeS9zaWRlYmFyJ1xuICAgICAqICAgICB9XG4gICAgICogfTtcbiAgICAgKlxuICAgICAqIGxldCB0ZW1wbGF0ZXNEaWRMb2FkID0gZnVuY3Rpb24oY29udGVudCkge1xuICAgICAqICAgICAkcHJvZHVjdExpc3RpbmdDb250YWluZXIuaHRtbChjb250ZW50LnByb2R1Y3RMaXN0aW5nKTtcbiAgICAgKiAgICAgJGZhY2V0ZWRTZWFyY2hDb250YWluZXIuaHRtbChjb250ZW50LnNpZGViYXIpO1xuICAgICAqIH07XG4gICAgICpcbiAgICAgKiBsZXQgZmFjZXRlZFNlYXJjaCA9IG5ldyBGYWNldGVkU2VhcmNoKHJlcXVlc3RPcHRpb25zLCB0ZW1wbGF0ZXNEaWRMb2FkKTtcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihyZXF1ZXN0T3B0aW9ucywgY2FsbGJhY2ssIG9wdGlvbnMpIHtcbiAgICAgICAgY29uc3QgZGVmYXVsdE9wdGlvbnMgPSB7XG4gICAgICAgICAgICBhY2NvcmRpb25Ub2dnbGVTZWxlY3RvcjogJyNmYWNldGVkU2VhcmNoIC5hY2NvcmRpb24tbmF2aWdhdGlvbiwgI2ZhY2V0ZWRTZWFyY2ggLmZhY2V0ZWRTZWFyY2gtdG9nZ2xlJyxcbiAgICAgICAgICAgIGJsb2NrZXJTZWxlY3RvcjogJyNmYWNldGVkU2VhcmNoIC5ibG9ja2VyJyxcbiAgICAgICAgICAgIGNsZWFyRmFjZXRTZWxlY3RvcjogJyNmYWNldGVkU2VhcmNoIC5mYWNldGVkU2VhcmNoLWNsZWFyTGluaycsXG4gICAgICAgICAgICBjb21wb25lbnRTZWxlY3RvcjogJyNmYWNldGVkU2VhcmNoLW5hdkxpc3QnLFxuICAgICAgICAgICAgZmFjZXROYXZMaXN0U2VsZWN0b3I6ICcjZmFjZXRlZFNlYXJjaCAubmF2TGlzdCcsXG4gICAgICAgICAgICBwcmljZVJhbmdlRXJyb3JTZWxlY3RvcjogJyNmYWNldC1yYW5nZS1mb3JtIC5mb3JtLWlubGluZU1lc3NhZ2UnLFxuICAgICAgICAgICAgcHJpY2VSYW5nZUZpZWxkc2V0U2VsZWN0b3I6ICcjZmFjZXQtcmFuZ2UtZm9ybSAuZm9ybS1maWVsZHNldCcsXG4gICAgICAgICAgICBwcmljZVJhbmdlRm9ybVNlbGVjdG9yOiAnI2ZhY2V0LXJhbmdlLWZvcm0nLFxuICAgICAgICAgICAgcHJpY2VSYW5nZU1heFByaWNlU2VsZWN0b3I6ICcjZmFjZXQtcmFuZ2UtZm9ybSBbbmFtZT1tYXhfcHJpY2VdJyxcbiAgICAgICAgICAgIHByaWNlUmFuZ2VNaW5QcmljZVNlbGVjdG9yOiAnI2ZhY2V0LXJhbmdlLWZvcm0gW25hbWU9bWluX3ByaWNlXScsXG4gICAgICAgICAgICBzaG93TW9yZVRvZ2dsZVNlbGVjdG9yOiAnI2ZhY2V0ZWRTZWFyY2ggLmFjY29yZGlvbi1jb250ZW50IC50b2dnbGVMaW5rJyxcbiAgICAgICAgICAgIGZhY2V0ZWRTZWFyY2hGaWx0ZXJJdGVtczogJyNmYWNldGVkU2VhcmNoLWZpbHRlckl0ZW1zIC5mb3JtLWlucHV0JyxcbiAgICAgICAgICAgIG1vZGFsOiBtb2RhbEZhY3RvcnkoJyNtb2RhbCcpWzBdLFxuICAgICAgICAgICAgbW9kYWxPcGVuOiBmYWxzZSxcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBQcml2YXRlIHByb3BlcnRpZXNcbiAgICAgICAgdGhpcy5yZXF1ZXN0T3B0aW9ucyA9IHJlcXVlc3RPcHRpb25zO1xuICAgICAgICB0aGlzLmNhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IF8uZXh0ZW5kKHt9LCBkZWZhdWx0T3B0aW9ucywgb3B0aW9ucyk7XG4gICAgICAgIHRoaXMuY29sbGFwc2VkRmFjZXRzID0gW107XG4gICAgICAgIHRoaXMuY29sbGFwc2VkRmFjZXRJdGVtcyA9IFtdO1xuXG4gICAgICAgIC8vIEluaXQgY29sbGFwc2libGVzXG4gICAgICAgIGNvbGxhcHNpYmxlRmFjdG9yeSgpO1xuXG4gICAgICAgIC8vIEluaXQgcHJpY2UgdmFsaWRhdG9yXG4gICAgICAgIHRoaXMuaW5pdFByaWNlVmFsaWRhdG9yKCk7XG5cbiAgICAgICAgLy8gU2hvdyBsaW1pdGVkIGl0ZW1zIGJ5IGRlZmF1bHRcbiAgICAgICAgJCh0aGlzLm9wdGlvbnMuZmFjZXROYXZMaXN0U2VsZWN0b3IpLmVhY2goKGluZGV4LCBuYXZMaXN0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNvbGxhcHNlRmFjZXRJdGVtcygkKG5hdkxpc3QpKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gTWFyayBpbml0aWFsbHkgY29sbGFwc2VkIGFjY29yZGlvbnNcbiAgICAgICAgJCh0aGlzLm9wdGlvbnMuYWNjb3JkaW9uVG9nZ2xlU2VsZWN0b3IpLmVhY2goKGluZGV4LCBhY2NvcmRpb25Ub2dnbGUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0ICRhY2NvcmRpb25Ub2dnbGUgPSAkKGFjY29yZGlvblRvZ2dsZSk7XG4gICAgICAgICAgICBjb25zdCBjb2xsYXBzaWJsZSA9ICRhY2NvcmRpb25Ub2dnbGUuZGF0YSgnY29sbGFwc2libGVJbnN0YW5jZScpO1xuXG4gICAgICAgICAgICBpZiAoY29sbGFwc2libGUuaXNDb2xsYXBzZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbGxhcHNlZEZhY2V0cy5wdXNoKGNvbGxhcHNpYmxlLnRhcmdldElkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gQ29sbGFwc2UgYWxsIGZhY2V0cyBpZiBpbml0aWFsbHkgaGlkZGVuXG4gICAgICAgIC8vIE5PVEU6IE5lZWQgdG8gZXhlY3V0ZSBhZnRlciBDb2xsYXBzaWJsZSBnZXRzIGJvb3RzdHJhcHBlZFxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGlmICgkKHRoaXMub3B0aW9ucy5jb21wb25lbnRTZWxlY3RvcikuaXMoJzpoaWRkZW4nKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29sbGFwc2VBbGxGYWNldHMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gT2JzZXJ2ZSB1c2VyIGV2ZW50c1xuICAgICAgICB0aGlzLm9uU3RhdGVDaGFuZ2UgPSB0aGlzLm9uU3RhdGVDaGFuZ2UuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5vblRvZ2dsZUNsaWNrID0gdGhpcy5vblRvZ2dsZUNsaWNrLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMub25BY2NvcmRpb25Ub2dnbGUgPSB0aGlzLm9uQWNjb3JkaW9uVG9nZ2xlLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMub25DbGVhckZhY2V0ID0gdGhpcy5vbkNsZWFyRmFjZXQuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5vbkZhY2V0Q2xpY2sgPSB0aGlzLm9uRmFjZXRDbGljay5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLm9uUmFuZ2VTdWJtaXQgPSB0aGlzLm9uUmFuZ2VTdWJtaXQuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5vblNvcnRCeVN1Ym1pdCA9IHRoaXMub25Tb3J0QnlTdWJtaXQuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5maWx0ZXJGYWNldEl0ZW1zID0gdGhpcy5maWx0ZXJGYWNldEl0ZW1zLmJpbmQodGhpcyk7XG5cbiAgICAgICAgdGhpcy5iaW5kRXZlbnRzKCk7XG4gICAgfVxuXG4gICAgLy8gUHVibGljIG1ldGhvZHNcbiAgICByZWZyZXNoVmlldyhjb250ZW50KSB7XG4gICAgICAgIGlmIChjb250ZW50KSB7XG4gICAgICAgICAgICB0aGlzLmNhbGxiYWNrKGNvbnRlbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSW5pdCBjb2xsYXBzaWJsZXNcbiAgICAgICAgY29sbGFwc2libGVGYWN0b3J5KCk7XG5cbiAgICAgICAgLy8gSW5pdCBwcmljZSB2YWxpZGF0b3JcbiAgICAgICAgdGhpcy5pbml0UHJpY2VWYWxpZGF0b3IoKTtcblxuICAgICAgICAvLyBSZXN0b3JlIHZpZXcgc3RhdGVcbiAgICAgICAgLy8gdGhpcy5yZXN0b3JlQ29sbGFwc2VkRmFjZXRzKCk7XG4gICAgICAgIHRoaXMucmVzdG9yZUNvbGxhcHNlZEZhY2V0SXRlbXMoKTtcblxuICAgICAgICAvLyBCaW5kIGV2ZW50c1xuICAgICAgICB0aGlzLmJpbmRFdmVudHMoKTtcbiAgICB9XG5cbiAgICB1cGRhdGVWaWV3KCkge1xuICAgICAgICAkKHRoaXMub3B0aW9ucy5ibG9ja2VyU2VsZWN0b3IpLnNob3coKTtcblxuICAgICAgICBhcGkuZ2V0UGFnZSh1cmxVdGlscy5nZXRVcmwoKSwgdGhpcy5yZXF1ZXN0T3B0aW9ucywgKGVyciwgY29udGVudCkgPT4ge1xuICAgICAgICAgICAgJCh0aGlzLm9wdGlvbnMuYmxvY2tlclNlbGVjdG9yKS5oaWRlKCk7XG5cbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gUmVmcmVzaCB2aWV3IHdpdGggbmV3IGNvbnRlbnRcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaFZpZXcoY29udGVudCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGV4cGFuZEZhY2V0SXRlbXMoJG5hdkxpc3QpIHtcbiAgICAgICAgY29uc3QgaWQgPSAkbmF2TGlzdC5hdHRyKCdpZCcpO1xuXG4gICAgICAgIC8vIFJlbW92ZVxuICAgICAgICB0aGlzLmNvbGxhcHNlZEZhY2V0SXRlbXMgPSBfLndpdGhvdXQodGhpcy5jb2xsYXBzZWRGYWNldEl0ZW1zLCBpZCk7XG4gICAgfVxuXG4gICAgY29sbGFwc2VGYWNldEl0ZW1zKCRuYXZMaXN0KSB7XG4gICAgICAgIGNvbnN0IGlkID0gJG5hdkxpc3QuYXR0cignaWQnKTtcbiAgICAgICAgY29uc3QgaGFzTW9yZVJlc3VsdHMgPSAkbmF2TGlzdC5kYXRhKCdoYXNNb3JlUmVzdWx0cycpO1xuXG4gICAgICAgIGlmIChoYXNNb3JlUmVzdWx0cykge1xuICAgICAgICAgICAgdGhpcy5jb2xsYXBzZWRGYWNldEl0ZW1zID0gXy51bmlvbih0aGlzLmNvbGxhcHNlZEZhY2V0SXRlbXMsIFtpZF0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jb2xsYXBzZWRGYWNldEl0ZW1zID0gXy53aXRob3V0KHRoaXMuY29sbGFwc2VkRmFjZXRJdGVtcywgaWQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdG9nZ2xlRmFjZXRJdGVtcygkbmF2TGlzdCkge1xuICAgICAgICBjb25zdCBpZCA9ICRuYXZMaXN0LmF0dHIoJ2lkJyk7XG5cbiAgICAgICAgLy8gVG9nZ2xlIGRlcGVuZGluZyBvbiBgY29sbGFwc2VkYCBmbGFnXG4gICAgICAgIGlmIChfLmluY2x1ZGVzKHRoaXMuY29sbGFwc2VkRmFjZXRJdGVtcywgaWQpKSB7XG4gICAgICAgICAgICB0aGlzLmdldE1vcmVGYWNldFJlc3VsdHMoJG5hdkxpc3QpO1xuXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY29sbGFwc2VGYWNldEl0ZW1zKCRuYXZMaXN0KTtcblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgZ2V0TW9yZUZhY2V0UmVzdWx0cygkbmF2TGlzdCkge1xuICAgICAgICBjb25zdCBmYWNldCA9ICRuYXZMaXN0LmRhdGEoJ2ZhY2V0Jyk7XG4gICAgICAgIGNvbnN0IGZhY2V0VXJsID0gdXJsVXRpbHMuZ2V0VXJsKCk7XG5cbiAgICAgICAgaWYgKHRoaXMucmVxdWVzdE9wdGlvbnMuc2hvd01vcmUpIHtcbiAgICAgICAgICAgIGFwaS5nZXRQYWdlKGZhY2V0VXJsLCB7XG4gICAgICAgICAgICAgICAgdGVtcGxhdGU6IHRoaXMucmVxdWVzdE9wdGlvbnMuc2hvd01vcmUsXG4gICAgICAgICAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgICAgICAgICAgIGxpc3RfYWxsOiBmYWNldCxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSwgKGVyciwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5tb2RhbC5vcGVuKCk7XG4gICAgICAgICAgICAgICAgJCgnI21vZGFsJykuYWRkQ2xhc3MoJ21vZGFsLS1maWx0ZXInKTtcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMubW9kYWxPcGVuID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMubW9kYWwudXBkYXRlQ29udGVudChyZXNwb25zZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY29sbGFwc2VGYWNldEl0ZW1zKCRuYXZMaXN0KTtcblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgZmlsdGVyRmFjZXRJdGVtcyhldmVudCkge1xuICAgICAgICBjb25zdCAkaXRlbXMgPSAkKCcubmF2TGlzdC1pdGVtJyk7XG4gICAgICAgIGNvbnN0IHF1ZXJ5ID0gJChldmVudC5jdXJyZW50VGFyZ2V0KS52YWwoKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgICRpdGVtcy5lYWNoKChpbmRleCwgZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdGV4dCA9ICQoZWxlbWVudCkudGV4dCgpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICBpZiAodGV4dC5pbmRleE9mKHF1ZXJ5KSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAkKGVsZW1lbnQpLnNob3coKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJChlbGVtZW50KS5oaWRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGV4cGFuZEZhY2V0KCRhY2NvcmRpb25Ub2dnbGUpIHtcbiAgICAgICAgY29uc3QgY29sbGFwc2libGUgPSAkYWNjb3JkaW9uVG9nZ2xlLmRhdGEoJ2NvbGxhcHNpYmxlSW5zdGFuY2UnKTtcblxuICAgICAgICBjb2xsYXBzaWJsZS5vcGVuKCk7XG4gICAgfVxuXG4gICAgY29sbGFwc2VGYWNldCgkYWNjb3JkaW9uVG9nZ2xlKSB7XG4gICAgICAgIGNvbnN0IGNvbGxhcHNpYmxlID0gJGFjY29yZGlvblRvZ2dsZS5kYXRhKCdjb2xsYXBzaWJsZUluc3RhbmNlJyk7XG5cbiAgICAgICAgY29sbGFwc2libGUuY2xvc2UoKTtcbiAgICB9XG5cbiAgICBjb2xsYXBzZUFsbEZhY2V0cygpIHtcbiAgICAgICAgY29uc3QgJGFjY29yZGlvblRvZ2dsZXMgPSAkKHRoaXMub3B0aW9ucy5hY2NvcmRpb25Ub2dnbGVTZWxlY3Rvcik7XG5cbiAgICAgICAgJGFjY29yZGlvblRvZ2dsZXMuZWFjaCgoaW5kZXgsIGFjY29yZGlvblRvZ2dsZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgJGFjY29yZGlvblRvZ2dsZSA9ICQoYWNjb3JkaW9uVG9nZ2xlKTtcblxuICAgICAgICAgICAgdGhpcy5jb2xsYXBzZUZhY2V0KCRhY2NvcmRpb25Ub2dnbGUpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBleHBhbmRBbGxGYWNldHMoKSB7XG4gICAgICAgIGNvbnN0ICRhY2NvcmRpb25Ub2dnbGVzID0gJCh0aGlzLm9wdGlvbnMuYWNjb3JkaW9uVG9nZ2xlU2VsZWN0b3IpO1xuXG4gICAgICAgICRhY2NvcmRpb25Ub2dnbGVzLmVhY2goKGluZGV4LCBhY2NvcmRpb25Ub2dnbGUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0ICRhY2NvcmRpb25Ub2dnbGUgPSAkKGFjY29yZGlvblRvZ2dsZSk7XG5cbiAgICAgICAgICAgIHRoaXMuZXhwYW5kRmFjZXQoJGFjY29yZGlvblRvZ2dsZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIFByaXZhdGUgbWV0aG9kc1xuICAgIGluaXRQcmljZVZhbGlkYXRvcigpIHtcbiAgICAgICAgaWYgKCQodGhpcy5vcHRpb25zLnByaWNlUmFuZ2VGb3JtU2VsZWN0b3IpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdmFsaWRhdG9yID0gbm9kKCk7XG4gICAgICAgIGNvbnN0IHNlbGVjdG9ycyA9IHtcbiAgICAgICAgICAgIGVycm9yU2VsZWN0b3I6IHRoaXMub3B0aW9ucy5wcmljZVJhbmdlRXJyb3JTZWxlY3RvcixcbiAgICAgICAgICAgIGZpZWxkc2V0U2VsZWN0b3I6IHRoaXMub3B0aW9ucy5wcmljZVJhbmdlRmllbGRzZXRTZWxlY3RvcixcbiAgICAgICAgICAgIGZvcm1TZWxlY3RvcjogdGhpcy5vcHRpb25zLnByaWNlUmFuZ2VGb3JtU2VsZWN0b3IsXG4gICAgICAgICAgICBtYXhQcmljZVNlbGVjdG9yOiB0aGlzLm9wdGlvbnMucHJpY2VSYW5nZU1heFByaWNlU2VsZWN0b3IsXG4gICAgICAgICAgICBtaW5QcmljZVNlbGVjdG9yOiB0aGlzLm9wdGlvbnMucHJpY2VSYW5nZU1pblByaWNlU2VsZWN0b3IsXG4gICAgICAgIH07XG5cbiAgICAgICAgVmFsaWRhdG9ycy5zZXRNaW5NYXhQcmljZVZhbGlkYXRpb24odmFsaWRhdG9yLCBzZWxlY3RvcnMpO1xuXG4gICAgICAgIHRoaXMucHJpY2VSYW5nZVZhbGlkYXRvciA9IHZhbGlkYXRvcjtcbiAgICB9XG5cbiAgICByZXN0b3JlQ29sbGFwc2VkRmFjZXRJdGVtcygpIHtcbiAgICAgICAgY29uc3QgJG5hdkxpc3RzID0gJCh0aGlzLm9wdGlvbnMuZmFjZXROYXZMaXN0U2VsZWN0b3IpO1xuXG4gICAgICAgIC8vIFJlc3RvcmUgY29sbGFwc2VkIHN0YXRlIGZvciBlYWNoIGZhY2V0XG4gICAgICAgICRuYXZMaXN0cy5lYWNoKChpbmRleCwgbmF2TGlzdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgJG5hdkxpc3QgPSAkKG5hdkxpc3QpO1xuICAgICAgICAgICAgY29uc3QgaWQgPSAkbmF2TGlzdC5hdHRyKCdpZCcpO1xuICAgICAgICAgICAgY29uc3Qgc2hvdWxkQ29sbGFwc2UgPSBfLmluY2x1ZGVzKHRoaXMuY29sbGFwc2VkRmFjZXRJdGVtcywgaWQpO1xuXG4gICAgICAgICAgICBpZiAoc2hvdWxkQ29sbGFwc2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbGxhcHNlRmFjZXRJdGVtcygkbmF2TGlzdCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZXhwYW5kRmFjZXRJdGVtcygkbmF2TGlzdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlc3RvcmVDb2xsYXBzZWRGYWNldHMoKSB7XG4gICAgICAgIGNvbnN0ICRhY2NvcmRpb25Ub2dnbGVzID0gJCh0aGlzLm9wdGlvbnMuYWNjb3JkaW9uVG9nZ2xlU2VsZWN0b3IpO1xuXG4gICAgICAgICRhY2NvcmRpb25Ub2dnbGVzLmVhY2goKGluZGV4LCBhY2NvcmRpb25Ub2dnbGUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0ICRhY2NvcmRpb25Ub2dnbGUgPSAkKGFjY29yZGlvblRvZ2dsZSk7XG4gICAgICAgICAgICBjb25zdCBjb2xsYXBzaWJsZSA9ICRhY2NvcmRpb25Ub2dnbGUuZGF0YSgnY29sbGFwc2libGVJbnN0YW5jZScpO1xuICAgICAgICAgICAgY29uc3QgaWQgPSBjb2xsYXBzaWJsZS50YXJnZXRJZDtcbiAgICAgICAgICAgIGNvbnN0IHNob3VsZENvbGxhcHNlID0gXy5pbmNsdWRlcyh0aGlzLmNvbGxhcHNlZEZhY2V0cywgaWQpO1xuXG4gICAgICAgICAgICBpZiAoc2hvdWxkQ29sbGFwc2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbGxhcHNlRmFjZXQoJGFjY29yZGlvblRvZ2dsZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZXhwYW5kRmFjZXQoJGFjY29yZGlvblRvZ2dsZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGJpbmRFdmVudHMoKSB7XG4gICAgICAgIC8vIENsZWFuLXVwXG4gICAgICAgIHRoaXMudW5iaW5kRXZlbnRzKCk7XG5cbiAgICAgICAgLy8gRE9NIGV2ZW50c1xuICAgICAgICAkKHdpbmRvdykub24oJ3N0YXRlY2hhbmdlJywgdGhpcy5vblN0YXRlQ2hhbmdlKTtcbiAgICAgICAgJCh3aW5kb3cpLm9uKCdwb3BzdGF0ZScsIHRoaXMub25Qb3BTdGF0ZSk7XG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsIHRoaXMub3B0aW9ucy5zaG93TW9yZVRvZ2dsZVNlbGVjdG9yLCB0aGlzLm9uVG9nZ2xlQ2xpY2spO1xuICAgICAgICAkKGRvY3VtZW50KS5vbigndG9nZ2xlLmNvbGxhcHNpYmxlJywgdGhpcy5vcHRpb25zLmFjY29yZGlvblRvZ2dsZVNlbGVjdG9yLCB0aGlzLm9uQWNjb3JkaW9uVG9nZ2xlKTtcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2tleXVwJywgdGhpcy5vcHRpb25zLmZhY2V0ZWRTZWFyY2hGaWx0ZXJJdGVtcywgdGhpcy5maWx0ZXJGYWNldEl0ZW1zKTtcbiAgICAgICAgJCh0aGlzLm9wdGlvbnMuY2xlYXJGYWNldFNlbGVjdG9yKS5vbignY2xpY2snLCB0aGlzLm9uQ2xlYXJGYWNldCk7XG5cbiAgICAgICAgLy8gSG9va3NcbiAgICAgICAgaG9va3Mub24oJ2ZhY2V0ZWRTZWFyY2gtZmFjZXQtY2xpY2tlZCcsIHRoaXMub25GYWNldENsaWNrKTtcbiAgICAgICAgaG9va3Mub24oJ2ZhY2V0ZWRTZWFyY2gtcmFuZ2Utc3VibWl0dGVkJywgdGhpcy5vblJhbmdlU3VibWl0KTtcbiAgICAgICAgaG9va3Mub24oJ3NvcnRCeS1zdWJtaXR0ZWQnLCB0aGlzLm9uU29ydEJ5U3VibWl0KTtcbiAgICB9XG5cbiAgICB1bmJpbmRFdmVudHMoKSB7XG4gICAgICAgIC8vIERPTSBldmVudHNcbiAgICAgICAgJCh3aW5kb3cpLm9mZignc3RhdGVjaGFuZ2UnLCB0aGlzLm9uU3RhdGVDaGFuZ2UpO1xuICAgICAgICAkKHdpbmRvdykub2ZmKCdwb3BzdGF0ZScsIHRoaXMub25Qb3BTdGF0ZSk7XG4gICAgICAgICQoZG9jdW1lbnQpLm9mZignY2xpY2snLCB0aGlzLm9wdGlvbnMuc2hvd01vcmVUb2dnbGVTZWxlY3RvciwgdGhpcy5vblRvZ2dsZUNsaWNrKTtcbiAgICAgICAgJChkb2N1bWVudCkub2ZmKCd0b2dnbGUuY29sbGFwc2libGUnLCB0aGlzLm9wdGlvbnMuYWNjb3JkaW9uVG9nZ2xlU2VsZWN0b3IsIHRoaXMub25BY2NvcmRpb25Ub2dnbGUpO1xuICAgICAgICAkKGRvY3VtZW50KS5vZmYoJ2tleXVwJywgdGhpcy5vcHRpb25zLmZhY2V0ZWRTZWFyY2hGaWx0ZXJJdGVtcywgdGhpcy5maWx0ZXJGYWNldEl0ZW1zKTtcbiAgICAgICAgJCh0aGlzLm9wdGlvbnMuY2xlYXJGYWNldFNlbGVjdG9yKS5vZmYoJ2NsaWNrJywgdGhpcy5vbkNsZWFyRmFjZXQpO1xuXG4gICAgICAgIC8vIEhvb2tzXG4gICAgICAgIGhvb2tzLm9mZignZmFjZXRlZFNlYXJjaC1mYWNldC1jbGlja2VkJywgdGhpcy5vbkZhY2V0Q2xpY2spO1xuICAgICAgICBob29rcy5vZmYoJ2ZhY2V0ZWRTZWFyY2gtcmFuZ2Utc3VibWl0dGVkJywgdGhpcy5vblJhbmdlU3VibWl0KTtcbiAgICAgICAgaG9va3Mub2ZmKCdzb3J0Qnktc3VibWl0dGVkJywgdGhpcy5vblNvcnRCeVN1Ym1pdCk7XG4gICAgfVxuXG4gICAgb25DbGVhckZhY2V0KGV2ZW50KSB7XG4gICAgICAgIGNvbnN0ICRsaW5rID0gJChldmVudC5jdXJyZW50VGFyZ2V0KTtcbiAgICAgICAgY29uc3QgdXJsID0gJGxpbmsuYXR0cignaHJlZicpO1xuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgIC8vIFVwZGF0ZSBVUkxcbiAgICAgICAgdXJsVXRpbHMuZ29Ub1VybCh1cmwpO1xuICAgIH1cblxuICAgIG9uVG9nZ2xlQ2xpY2soZXZlbnQpIHtcbiAgICAgICAgY29uc3QgJHRvZ2dsZSA9ICQoZXZlbnQuY3VycmVudFRhcmdldCk7XG4gICAgICAgIGNvbnN0ICRuYXZMaXN0ID0gJCgkdG9nZ2xlLmF0dHIoJ2hyZWYnKSk7XG5cbiAgICAgICAgLy8gUHJldmVudCBkZWZhdWx0XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgLy8gVG9nZ2xlIHZpc2libGUgaXRlbXNcbiAgICAgICAgdGhpcy50b2dnbGVGYWNldEl0ZW1zKCRuYXZMaXN0KTtcbiAgICB9XG5cbiAgICBvbkZhY2V0Q2xpY2soZXZlbnQpIHtcbiAgICAgICAgY29uc3QgJGxpbmsgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xuICAgICAgICBjb25zdCB1cmwgPSAkbGluay5hdHRyKCdocmVmJyk7XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAkbGluay50b2dnbGVDbGFzcygnaXMtc2VsZWN0ZWQnKTtcblxuICAgICAgICAvLyBVcGRhdGUgVVJMXG4gICAgICAgIHVybFV0aWxzLmdvVG9VcmwodXJsKTtcblxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLm1vZGFsT3Blbikge1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zLm1vZGFsLmNsb3NlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblNvcnRCeVN1Ym1pdChldmVudCkge1xuICAgICAgICBjb25zdCB1cmwgPSBVcmwucGFyc2Uod2luZG93LmxvY2F0aW9uLmhyZWYsIHRydWUpO1xuICAgICAgICBjb25zdCBxdWVyeVBhcmFtcyA9ICQoZXZlbnQuY3VycmVudFRhcmdldCkuc2VyaWFsaXplKCkuc3BsaXQoJz0nKTtcblxuICAgICAgICB1cmwucXVlcnlbcXVlcnlQYXJhbXNbMF1dID0gcXVlcnlQYXJhbXNbMV07XG4gICAgICAgIGRlbGV0ZSB1cmwucXVlcnkucGFnZTtcblxuICAgICAgICAvLyBVcmwgb2JqZWN0IGBxdWVyeWAgaXMgbm90IGEgdHJhZGl0aW9uYWwgSmF2YVNjcmlwdCBPYmplY3Qgb24gYWxsIHN5c3RlbXMsIGNsb25lIGl0IGluc3RlYWRcbiAgICAgICAgY29uc3QgdXJsUXVlcnlQYXJhbXMgPSB7fTtcbiAgICAgICAgT2JqZWN0LmFzc2lnbih1cmxRdWVyeVBhcmFtcywgdXJsLnF1ZXJ5KTtcblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIHVybFV0aWxzLmdvVG9VcmwoVXJsLmZvcm1hdCh7IHBhdGhuYW1lOiB1cmwucGF0aG5hbWUsIHNlYXJjaDogdXJsVXRpbHMuYnVpbGRRdWVyeVN0cmluZyh1cmxRdWVyeVBhcmFtcykgfSkpO1xuICAgIH1cblxuICAgIG9uUmFuZ2VTdWJtaXQoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBpZiAoIXRoaXMucHJpY2VSYW5nZVZhbGlkYXRvci5hcmVBbGwobm9kLmNvbnN0YW50cy5WQUxJRCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHVybCA9IFVybC5wYXJzZSh3aW5kb3cubG9jYXRpb24uaHJlZiwgdHJ1ZSk7XG4gICAgICAgIGxldCBxdWVyeVBhcmFtcyA9IGRlY29kZVVSSSgkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLnNlcmlhbGl6ZSgpKS5zcGxpdCgnJicpO1xuICAgICAgICBxdWVyeVBhcmFtcyA9IHVybFV0aWxzLnBhcnNlUXVlcnlQYXJhbXMocXVlcnlQYXJhbXMpO1xuXG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIHF1ZXJ5UGFyYW1zKSB7XG4gICAgICAgICAgICBpZiAocXVlcnlQYXJhbXMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgIHVybC5xdWVyeVtrZXldID0gcXVlcnlQYXJhbXNba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFVybCBvYmplY3QgYHF1ZXJ5YCBpcyBub3QgYSB0cmFkaXRpb25hbCBKYXZhU2NyaXB0IE9iamVjdCBvbiBhbGwgc3lzdGVtcywgY2xvbmUgaXQgaW5zdGVhZFxuICAgICAgICBjb25zdCB1cmxRdWVyeVBhcmFtcyA9IHt9O1xuICAgICAgICBPYmplY3QuYXNzaWduKHVybFF1ZXJ5UGFyYW1zLCB1cmwucXVlcnkpO1xuXG4gICAgICAgIHVybFV0aWxzLmdvVG9VcmwoVXJsLmZvcm1hdCh7IHBhdGhuYW1lOiB1cmwucGF0aG5hbWUsIHNlYXJjaDogdXJsVXRpbHMuYnVpbGRRdWVyeVN0cmluZyh1cmxRdWVyeVBhcmFtcykgfSkpO1xuICAgIH1cblxuICAgIG9uU3RhdGVDaGFuZ2UoKSB7XG4gICAgICAgIHRoaXMudXBkYXRlVmlldygpO1xuICAgIH1cblxuICAgIG9uQWNjb3JkaW9uVG9nZ2xlKGV2ZW50KSB7XG4gICAgICAgIGNvbnN0ICRhY2NvcmRpb25Ub2dnbGUgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xuICAgICAgICBjb25zdCBjb2xsYXBzaWJsZSA9ICRhY2NvcmRpb25Ub2dnbGUuZGF0YSgnY29sbGFwc2libGVJbnN0YW5jZScpO1xuICAgICAgICBjb25zdCBpZCA9IGNvbGxhcHNpYmxlLnRhcmdldElkO1xuXG4gICAgICAgIGlmIChjb2xsYXBzaWJsZS5pc0NvbGxhcHNlZCkge1xuICAgICAgICAgICAgdGhpcy5jb2xsYXBzZWRGYWNldHMgPSBfLnVuaW9uKHRoaXMuY29sbGFwc2VkRmFjZXRzLCBbaWRdKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY29sbGFwc2VkRmFjZXRzID0gXy53aXRob3V0KHRoaXMuY29sbGFwc2VkRmFjZXRzLCBpZCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblBvcFN0YXRlKCkge1xuICAgICAgICBjb25zdCBjdXJyZW50VXJsID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XG4gICAgICAgIGNvbnN0IHNlYXJjaFBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoY3VycmVudFVybCk7XG4gICAgICAgIC8vIElmIHNlYXJjaFBhcmFtcyBkb2VzIG5vdCBjb250YWluIGEgcGFnZSB2YWx1ZSB0aGVuIG1vZGlmeSB1cmwgcXVlcnkgc3RyaW5nIHRvIGhhdmUgcGFnZT0xXG4gICAgICAgIGlmICghc2VhcmNoUGFyYW1zLmhhcygncGFnZScpKSB7XG4gICAgICAgICAgICBjb25zdCBsaW5rVXJsID0gJCgnLnBhZ2luYXRpb24tbGluaycpLmF0dHIoJ2hyZWYnKTtcbiAgICAgICAgICAgIGNvbnN0IHJlID0gL3BhZ2U9WzAtOV0rL2k7XG4gICAgICAgICAgICBjb25zdCB1cGRhdGVkTGlua1VybCA9IGxpbmtVcmwucmVwbGFjZShyZSwgJ3BhZ2U9MScpO1xuICAgICAgICAgICAgd2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKHt9LCBkb2N1bWVudC50aXRsZSwgdXBkYXRlZExpbmtVcmwpO1xuICAgICAgICB9XG4gICAgICAgICQod2luZG93KS50cmlnZ2VyKCdzdGF0ZWNoYW5nZScpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRmFjZXRlZFNlYXJjaDtcbiIsImltcG9ydCBVcmwgZnJvbSAndXJsJztcblxuY29uc3QgdXJsVXRpbHMgPSB7XG4gICAgZ2V0VXJsOiAoKSA9PiBgJHt3aW5kb3cubG9jYXRpb24ucGF0aG5hbWV9JHt3aW5kb3cubG9jYXRpb24uc2VhcmNofWAsXG5cbiAgICBnb1RvVXJsOiAodXJsKSA9PiB7XG4gICAgICAgIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZSh7fSwgZG9jdW1lbnQudGl0bGUsIHVybCk7XG4gICAgICAgICQod2luZG93KS50cmlnZ2VyKCdzdGF0ZWNoYW5nZScpO1xuICAgIH0sXG5cbiAgICByZXBsYWNlUGFyYW1zOiAodXJsLCBwYXJhbXMpID0+IHtcbiAgICAgICAgY29uc3QgcGFyc2VkID0gVXJsLnBhcnNlKHVybCwgdHJ1ZSk7XG4gICAgICAgIGxldCBwYXJhbTtcblxuICAgICAgICAvLyBMZXQgdGhlIGZvcm1hdHRlciB1c2UgdGhlIHF1ZXJ5IG9iamVjdCB0byBidWlsZCB0aGUgbmV3IHVybFxuICAgICAgICBwYXJzZWQuc2VhcmNoID0gbnVsbDtcblxuICAgICAgICBmb3IgKHBhcmFtIGluIHBhcmFtcykge1xuICAgICAgICAgICAgaWYgKHBhcmFtcy5oYXNPd25Qcm9wZXJ0eShwYXJhbSkpIHtcbiAgICAgICAgICAgICAgICBwYXJzZWQucXVlcnlbcGFyYW1dID0gcGFyYW1zW3BhcmFtXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBVcmwuZm9ybWF0KHBhcnNlZCk7XG4gICAgfSxcblxuICAgIGJ1aWxkUXVlcnlTdHJpbmc6IChxdWVyeURhdGEpID0+IHtcbiAgICAgICAgbGV0IG91dCA9ICcnO1xuICAgICAgICBsZXQga2V5O1xuICAgICAgICBmb3IgKGtleSBpbiBxdWVyeURhdGEpIHtcbiAgICAgICAgICAgIGlmIChxdWVyeURhdGEuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHF1ZXJ5RGF0YVtrZXldKSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgbmR4O1xuXG4gICAgICAgICAgICAgICAgICAgIGZvciAobmR4IGluIHF1ZXJ5RGF0YVtrZXldKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocXVlcnlEYXRhW2tleV0uaGFzT3duUHJvcGVydHkobmR4KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dCArPSBgJiR7a2V5fT0ke3F1ZXJ5RGF0YVtrZXldW25keF19YDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG91dCArPSBgJiR7a2V5fT0ke3F1ZXJ5RGF0YVtrZXldfWA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG91dC5zdWJzdHJpbmcoMSk7XG4gICAgfSxcblxuICAgIHBhcnNlUXVlcnlQYXJhbXM6IChxdWVyeURhdGEpID0+IHtcbiAgICAgICAgY29uc3QgcGFyYW1zID0ge307XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBxdWVyeURhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHRlbXAgPSBxdWVyeURhdGFbaV0uc3BsaXQoJz0nKTtcblxuICAgICAgICAgICAgaWYgKHRlbXBbMF0gaW4gcGFyYW1zKSB7XG4gICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocGFyYW1zW3RlbXBbMF1dKSkge1xuICAgICAgICAgICAgICAgICAgICBwYXJhbXNbdGVtcFswXV0ucHVzaCh0ZW1wWzFdKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBwYXJhbXNbdGVtcFswXV0gPSBbcGFyYW1zW3RlbXBbMF1dLCB0ZW1wWzFdXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHBhcmFtc1t0ZW1wWzBdXSA9IHRlbXBbMV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcGFyYW1zO1xuICAgIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCB1cmxVdGlscztcbiIsImltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBzaG93QWxlcnRNb2RhbCB9IGZyb20gJy4vbW9kYWwnO1xuXG5mdW5jdGlvbiBkZWNyZW1lbnRDb3VudGVyKGNvdW50ZXIsIGl0ZW0pIHtcbiAgICBjb25zdCBpbmRleCA9IGNvdW50ZXIuaW5kZXhPZihpdGVtKTtcblxuICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICAgIGNvdW50ZXIuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGluY3JlbWVudENvdW50ZXIoY291bnRlciwgaXRlbSkge1xuICAgIGNvdW50ZXIucHVzaChpdGVtKTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlQ291bnRlck5hdihjb3VudGVyLCAkbGluaywgdXJsQ29udGV4dCkge1xuICAgIGlmIChjb3VudGVyLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgaWYgKCEkbGluay5pcygndmlzaWJsZScpKSB7XG4gICAgICAgICAgICAkbGluay5hZGRDbGFzcygnc2hvdycpO1xuICAgICAgICB9XG4gICAgICAgICRsaW5rLmF0dHIoJ2hyZWYnLCBgJHt1cmxDb250ZXh0LmNvbXBhcmV9LyR7Y291bnRlci5qb2luKCcvJyl9YCk7XG4gICAgICAgICRsaW5rLmZpbmQoJ3NwYW4uY291bnRQaWxsJykuaHRtbChjb3VudGVyLmxlbmd0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgJGxpbmsucmVtb3ZlQ2xhc3MoJ3Nob3cnKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICh1cmxDb250ZXh0KSB7XG4gICAgbGV0IGNvbXBhcmVDb3VudGVyID0gW107XG5cbiAgICBjb25zdCAkY29tcGFyZUxpbmsgPSAkKCdhW2RhdGEtY29tcGFyZS1uYXZdJyk7XG5cbiAgICAkKCdib2R5Jykub24oJ2NvbXBhcmVSZXNldCcsICgpID0+IHtcbiAgICAgICAgY29uc3QgJGNoZWNrZWQgPSAkKCdib2R5JykuZmluZCgnaW5wdXRbbmFtZT1cInByb2R1Y3RzXFxbXFxdXCJdOmNoZWNrZWQnKTtcblxuICAgICAgICBjb21wYXJlQ291bnRlciA9ICRjaGVja2VkLmxlbmd0aCA/IF8ubWFwKCRjaGVja2VkLCBlbGVtZW50ID0+IGVsZW1lbnQudmFsdWUpIDogW107XG4gICAgICAgIHVwZGF0ZUNvdW50ZXJOYXYoY29tcGFyZUNvdW50ZXIsICRjb21wYXJlTGluaywgdXJsQ29udGV4dCk7XG4gICAgfSk7XG5cbiAgICAkKCdib2R5JykudHJpZ2dlckhhbmRsZXIoJ2NvbXBhcmVSZXNldCcpO1xuXG4gICAgJCgnYm9keScpLm9uKCdjbGljaycsICdbZGF0YS1jb21wYXJlLWlkXScsIGV2ZW50ID0+IHtcbiAgICAgICAgY29uc3QgcHJvZHVjdCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQudmFsdWU7XG4gICAgICAgIGNvbnN0ICRjbGlja2VkQ29tcGFyZUxpbmsgPSAkKCdhW2RhdGEtY29tcGFyZS1uYXZdJyk7XG5cbiAgICAgICAgaWYgKGV2ZW50LmN1cnJlbnRUYXJnZXQuY2hlY2tlZCkge1xuICAgICAgICAgICAgaW5jcmVtZW50Q291bnRlcihjb21wYXJlQ291bnRlciwgcHJvZHVjdCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkZWNyZW1lbnRDb3VudGVyKGNvbXBhcmVDb3VudGVyLCBwcm9kdWN0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHVwZGF0ZUNvdW50ZXJOYXYoY29tcGFyZUNvdW50ZXIsICRjbGlja2VkQ29tcGFyZUxpbmssIHVybENvbnRleHQpO1xuICAgIH0pO1xuXG4gICAgJCgnYm9keScpLm9uKCdzdWJtaXQnLCAnW2RhdGEtcHJvZHVjdC1jb21wYXJlXScsIGV2ZW50ID0+IHtcbiAgICAgICAgY29uc3QgJHRoaXMgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xuICAgICAgICBjb25zdCBwcm9kdWN0c1RvQ29tcGFyZSA9ICR0aGlzLmZpbmQoJ2lucHV0W25hbWU9XCJwcm9kdWN0c1xcW1xcXVwiXTpjaGVja2VkJyk7XG5cbiAgICAgICAgaWYgKHByb2R1Y3RzVG9Db21wYXJlLmxlbmd0aCA8PSAxKSB7XG4gICAgICAgICAgICBzaG93QWxlcnRNb2RhbCgnWW91IG11c3Qgc2VsZWN0IGF0IGxlYXN0IHR3byBwcm9kdWN0cyB0byBjb21wYXJlJyk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAkKCdib2R5Jykub24oJ2NsaWNrJywgJ2FbZGF0YS1jb21wYXJlLW5hdl0nLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0ICRjbGlja2VkQ2hlY2tlZElucHV0ID0gJCgnYm9keScpLmZpbmQoJ2lucHV0W25hbWU9XCJwcm9kdWN0c1xcW1xcXVwiXTpjaGVja2VkJyk7XG5cbiAgICAgICAgaWYgKCRjbGlja2VkQ2hlY2tlZElucHV0Lmxlbmd0aCA8PSAxKSB7XG4gICAgICAgICAgICBzaG93QWxlcnRNb2RhbCgnWW91IG11c3Qgc2VsZWN0IGF0IGxlYXN0IHR3byBwcm9kdWN0cyB0byBjb21wYXJlJyk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbiIsImltcG9ydCB1dGlscyBmcm9tICdAYmlnY29tbWVyY2Uvc3RlbmNpbC11dGlscyc7XG5jb25zdCBmZXRjaCA9IHJlcXVpcmUoJ25vZGUtZmV0Y2gnKTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oY29udGV4dCwgd3JhcHBlcikge1xuICAgIGlmIChjb250ZXh0LnRoZW1lU2V0dGluZ3MuaGFsb0FkZE9wdGlvbkZvclByb2R1Y3QgPT0gdHJ1ZSkge1xuICAgICAgICBjb25zdCB0b2tlbiA9IGNvbnRleHQudG9rZW4sXG4gICAgICAgICAgICBwcm9kdWN0X3dyYXBwZXIgPSAkKCcjJyt3cmFwcGVyKSxcbiAgICAgICAgICAgIHByb2R1Y3RfY2xhc3MgPSBwcm9kdWN0X3dyYXBwZXIuZmluZCgnLmNhcmQnKTtcbiAgICAgICAgdmFyICBsaXN0ID0gW107XG5cbiAgICAgICAgZnVuY3Rpb24gY2FsbFByb2R1Y3RPcHRpb24oKSB7XG4gICAgICAgICAgICBwcm9kdWN0X2NsYXNzLmVhY2goKGluZGV4LCBlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIHByb2R1Y3RJZCA9ICQoZWxlbWVudCkuZGF0YShcInByb2R1Y3QtaWRcIik7XG5cbiAgICAgICAgICAgICAgICBsaXN0LnB1c2gocHJvZHVjdElkLnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmKGxpc3QubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAgICAgZ2V0UHJvZHVjdE9wdGlvbihsaXN0KS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZW5kZXJPcHRpb24oZGF0YSk7XG5cbiAgICAgICAgICAgICAgICAgICAgJC5lYWNoKGxpc3QsIChpZHgsIGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhcnIgPSB7fSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9kdWN0SWQgPSBsaXN0W2lkeF07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHByb2R1Y3Rfd3JhcHBlci5maW5kKCcuY2FyZC1vcHRpb24tJytwcm9kdWN0SWQrJyAuZm9ybS1vcHRpb24tc3dhdGNoJykuZWFjaCgoaW5kZXgsIGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdHh0ID0gJChlbGVtZW50KS5kYXRhKCdwcm9kdWN0LXN3YXRjaC12YWx1ZScpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFyclt0eHRdKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJChlbGVtZW50KS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJbdHh0XSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHByb2R1Y3Rfd3JhcHBlci5maW5kKCcuY2FyZC1vcHRpb24tJytwcm9kdWN0SWQrJyAuZm9ybS1vcHRpb24tc3dhdGNoJykubGVuZ3RoID4gNCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvdW50TW9yZU9wdGlvbiAgPSBwcm9kdWN0X3dyYXBwZXIuZmluZCgnLmNhcmQtb3B0aW9uLScrcHJvZHVjdElkKycgLmZvcm0tb3B0aW9uLXN3YXRjaCcpLmxlbmd0aCAtIDQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2R1Y3RMaW5rID0gcHJvZHVjdF93cmFwcGVyLmZpbmQoJ1tkYXRhLXByb2R1Y3QtaWQ9XCInK3Byb2R1Y3RJZCsnXCJdJykuZmluZCgnLmNhcmQtbGluaycpLmF0dHIoJ2hyZWYnKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2R1Y3Rfd3JhcHBlci5maW5kKCcuY2FyZC1vcHRpb24tJytwcm9kdWN0SWQrJyAuZm9ybS1vcHRpb24tc3dhdGNoJykuZWFjaCgoaW5kZXgsIGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoaW5kZXggPj0gNCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKGVsZW1lbnQpLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihwcm9kdWN0X3dyYXBwZXIuZmluZCgnLmNhcmQtb3B0aW9uLScrcHJvZHVjdElkKycgLmZvcm0tZmllbGQgLnNob3dtb3JlJykubGVuZ3RoIDwgMSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2R1Y3Rfd3JhcHBlci5maW5kKCcuY2FyZC1vcHRpb24tJytwcm9kdWN0SWQrJyAuZm9ybS1maWVsZDpub3QoLmZvcm0tZmllbGQtLXNpemUpJykuYXBwZW5kKCc8YSBocmVmPVwiJytwcm9kdWN0TGluaysnXCIgY2xhc3M9XCJzaG93bW9yZVwiPisnK2NvdW50TW9yZU9wdGlvbisnPC9hPicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGdldFByb2R1Y3RPcHRpb24obGlzdCl7XG4gICAgICAgICAgICByZXR1cm4gZmV0Y2goJy9ncmFwaHFsJywge1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6ICdCZWFyZXIgJyArIHRva2VuXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgICBxdWVyeTogYFxuICAgICAgICAgICAgICAgICAgICBxdWVyeSBTZXZlcmFsUHJvZHVjdHNCeUlEIHtcbiAgICAgICAgICAgICAgICAgICAgICBzaXRlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb2R1Y3RzKGVudGl0eUlkczogW2ArbGlzdCtgXSwgZmlyc3Q6IDUwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGVkZ2VzIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVudGl0eUlkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvZHVjdE9wdGlvbnMoZmlyc3Q6IDUwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVkZ2VzIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVudGl0eUlkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5TmFtZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNSZXF1aXJlZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4uIG9uIE11bHRpcGxlQ2hvaWNlT3B0aW9uIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheVN0eWxlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlcyB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWRnZXMge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVudGl0eUlkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzRGVmYXVsdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi4gb24gU3dhdGNoT3B0aW9uVmFsdWUge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhleENvbG9yc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlVXJsKHdpZHRoOiA1MClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgYH0pLFxuICAgICAgICAgICAgfSkudGhlbihyZXMgPT4gcmVzLmpzb24oKSkudGhlbihyZXMgPT4gcmVzLmRhdGEpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gcmVuZGVyT3B0aW9uKGRhdGEpe1xuICAgICAgICAgICAgdmFyIGFGaWx0ZXIgPSBkYXRhLnNpdGUucHJvZHVjdHMuZWRnZXM7XG5cbiAgICAgICAgICAgICQuZWFjaChhRmlsdGVyLCAoaW5kZXgsIGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgcHJvZHVjdElkID0gYUZpbHRlcltpbmRleF0ubm9kZS5lbnRpdHlJZCxcbiAgICAgICAgICAgICAgICAgICAgcHJvZHVjdEZpZWxkQ29sb3IgPSBwcm9kdWN0X3dyYXBwZXIuZmluZCgnLmNhcmQtb3B0aW9uLScrcHJvZHVjdElkKycgLmZvcm0tZmllbGQ6bm90KC5mb3JtLWZpZWxkLS1zaXplKScpLFxuICAgICAgICAgICAgICAgICAgICBwcm9kdWN0RmllbGRTaXplID0gcHJvZHVjdF93cmFwcGVyLmZpbmQoJy5jYXJkLW9wdGlvbi0nK3Byb2R1Y3RJZCsnIC5mb3JtLWZpZWxkLS1zaXplJyksXG4gICAgICAgICAgICAgICAgICAgIGFGaWx0ZXIyID0gYUZpbHRlcltpbmRleF0ubm9kZS5wcm9kdWN0T3B0aW9ucy5lZGdlcztcblxuICAgICAgICAgICAgICAgIHZhciBhRmlsdGVyMyA9IGFGaWx0ZXIyLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS5ub2RlLmRpc3BsYXlTdHlsZSA9PT0gJ1N3YXRjaCc7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB2YXIgYUZpbHRlcjUgPSBhRmlsdGVyMi5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0ubm9kZS5kaXNwbGF5TmFtZSA9PT0gY29udGV4dC50aGVtZVNldHRpbmdzLmhhbG9BZGRPcHRpb25Gb3JQcm9kdWN0MjtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGlmKGFGaWx0ZXIzLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgICAgICB2YXIgYUZpbHRlcjQgPSBhRmlsdGVyM1swXS5ub2RlLnZhbHVlcy5lZGdlcztcblxuICAgICAgICAgICAgICAgICAgICAkLmVhY2goYUZpbHRlcjQsIChpZHgsIGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0aXRsZVZhciA9IGFGaWx0ZXI0W2lkeF0ubm9kZS5sYWJlbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZFZhciA9IGFGaWx0ZXI0W2lkeF0ubm9kZS5lbnRpdHlJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZW5ndGhDb2xvclZhciA9IGFGaWx0ZXI0W2lkeF0ubm9kZS5oZXhDb2xvcnMubGVuZ3RoLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yMSA9IGFGaWx0ZXI0W2lkeF0ubm9kZS5oZXhDb2xvcnNbMF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3IyID0gYUZpbHRlcjRbaWR4XS5ub2RlLmhleENvbG9yc1sxXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjMgPSBhRmlsdGVyNFtpZHhdLm5vZGUuaGV4Q29sb3JzWzJdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltZyA9IGFGaWx0ZXI0W2lkeF0ubm9kZS5pbWFnZVVybDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYobGVuZ3RoQ29sb3JWYXIgPT0gMil7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvZHVjdEZpZWxkQ29sb3IuYXBwZW5kKCc8bGFiZWwgY2xhc3M9XCJmb3JtLW9wdGlvbiBmb3JtLW9wdGlvbi1zd2F0Y2hcIiBkYXRhLXByb2R1Y3Qtc3dhdGNoLXZhbHVlPVwiJytpZFZhcisnXCI+PHNwYW4gY2xhc3M9XCJmb3JtLW9wdGlvbi10b29sdGlwXCI+Jyt0aXRsZVZhcisnPC9zcGFuPjxzcGFuIGNsYXNzPVwiZm9ybS1vcHRpb24tdmFyaWFudCBmb3JtLW9wdGlvbi12YXJpYW50LS1jb2xvciBmb3JtLW9wdGlvbi12YXJpYW50LS1jb2xvcjJcIiB0aXRsZT1cIicrdGl0bGVWYXIrJ1wiPjxzcGFuIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjonK2NvbG9yMSsnXCI+PC9zcGFuPjxzcGFuIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjonK2NvbG9yMisnXCI+PC9zcGFuPjwvc3Bhbj48L2xhYmVsPicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmKGxlbmd0aENvbG9yVmFyID09PSAzKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9kdWN0RmllbGRDb2xvci5hcHBlbmQoJzxsYWJlbCBjbGFzcz1cImZvcm0tb3B0aW9uIGZvcm0tb3B0aW9uLXN3YXRjaFwiIGRhdGEtcHJvZHVjdC1zd2F0Y2gtdmFsdWU9XCInK2lkVmFyKydcIj48c3BhbiBjbGFzcz1cImZvcm0tb3B0aW9uLXRvb2x0aXBcIj4nK3RpdGxlVmFyKyc8L3NwYW4+PHNwYW4gY2xhc3M9XCJmb3JtLW9wdGlvbi12YXJpYW50IGZvcm0tb3B0aW9uLXZhcmlhbnQtLWNvbG9yIGZvcm0tb3B0aW9uLXZhcmlhbnQtLWNvbG9yMlwiIHRpdGxlPVwiJyt0aXRsZVZhcisnXCI+PHNwYW4gc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOicrY29sb3IxKydcIj48L3NwYW4+PHNwYW4gc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOicrY29sb3IyKydcIj48L3NwYW4+PHNwYW4gc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOicrY29sb3IzKydcIj48L3NwYW4+PC9zcGFuPjwvbGFiZWw+Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYoQm9vbGVhbihjb2xvcjEpKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9kdWN0RmllbGRDb2xvci5hcHBlbmQoJzxsYWJlbCBjbGFzcz1cImZvcm0tb3B0aW9uIGZvcm0tb3B0aW9uLXN3YXRjaFwiIGRhdGEtcHJvZHVjdC1zd2F0Y2gtdmFsdWU9XCInK2lkVmFyKydcIj48c3BhbiBjbGFzcz1cImZvcm0tb3B0aW9uLXRvb2x0aXBcIj4nK3RpdGxlVmFyKyc8L3NwYW4+PHNwYW4gY2xhc3M9XCJmb3JtLW9wdGlvbi12YXJpYW50IGZvcm0tb3B0aW9uLXZhcmlhbnQtLWNvbG9yXCIgdGl0bGU9XCInK3RpdGxlVmFyKydcIiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6ICcrY29sb3IxKydcIj48L3NwYW4+PC9sYWJlbD4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZihCb29sZWFuKGltZykpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2R1Y3RGaWVsZENvbG9yLmFwcGVuZCgnPGxhYmVsIGNsYXNzPVwiZm9ybS1vcHRpb24gZm9ybS1vcHRpb24tc3dhdGNoXCIgZGF0YS1wcm9kdWN0LXN3YXRjaC12YWx1ZT1cIicraWRWYXIrJ1wiPjxzcGFuIGNsYXNzPVwiZm9ybS1vcHRpb24tdG9vbHRpcFwiPicrdGl0bGVWYXIrJzwvc3Bhbj48c3BhbiBjbGFzcz1cImZvcm0tb3B0aW9uLXZhcmlhbnQgZm9ybS1vcHRpb24tdmFyaWFudC0tcGF0dGVyblwiIHRpdGxlPVwiJyt0aXRsZVZhcisnXCIgc3R5bGU9XCJiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJytpbWcrJylcIj48L3NwYW4+PC9sYWJlbD4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNle1xuICAgICAgICAgICAgICAgICAgICBwcm9kdWN0RmllbGRDb2xvci5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZihhRmlsdGVyNS5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICAgICAgICAgaWYocHJvZHVjdEZpZWxkU2l6ZS5sZW5ndGggPCAxKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb2R1Y3Rfd3JhcHBlci5maW5kKCcuY2FyZC1vcHRpb24tJytwcm9kdWN0SWQrJycpLmFwcGVuZCgnPGRpdiBjbGFzcz1cImZvcm0tZmllbGQgZm9ybS1maWVsZC0tc2l6ZVwiPjxsYWJlbCBjbGFzcz1cImZvcm0tb3B0aW9uXCI+Jytjb250ZXh0LnRoZW1lU2V0dGluZ3MuaGFsb0FkZE9wdGlvbkZvclByb2R1Y3RUZXh0LnRvU3RyaW5nKCkrJzwvbGFiZWw+PC9kaXY+Jyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZigoYUZpbHRlcjUubGVuZ3RoID09IDApICYmIChhRmlsdGVyMy5sZW5ndGggPT0gMCkpe1xuICAgICAgICAgICAgICAgICAgICBwcm9kdWN0X3dyYXBwZXIuZmluZCgnLmNhcmQtb3B0aW9uLScrcHJvZHVjdElkKycnKS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNhbGxQcm9kdWN0T3B0aW9uKCk7XG4gICAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG4gICAgY29uc3QgJHByb2R1Y3RMaXN0aW5nID0gJCgnI3Byb2R1Y3QtbGlzdGluZy1jb250YWluZXIgLnByb2R1Y3RMaXN0aW5nJyksXG4gICAgICAgICRncmlkID0gJCgnI2dyaWQtdmlldycpLFxuICAgICAgICAkbGlzdCA9ICQoJyNsaXN0LXZpZXcnKSxcbiAgICAgICAgJGdyaWRNb2JpbGUgPSAkKCcjZ3JpZC12aWV3LW1vYmlsZScpLFxuICAgICAgICAkbGlzdE1vYmlsZSA9ICQoJyNsaXN0LXZpZXctbW9iaWxlJyk7XG5cbiAgICAkbGlzdC5vbignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgIGlmICghJGxpc3QuaGFzQ2xhc3MoJ2N1cnJlbnQtdmlldycpKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7IFxuICAgICAgICAgICAgICAgICRsaXN0LmFkZENsYXNzKCdjdXJyZW50LXZpZXcnKTtcbiAgICAgICAgICAgICAgICAkbGlzdE1vYmlsZS5hZGRDbGFzcygnY3VycmVudC12aWV3Jyk7XG4gICAgICAgICAgICAgICAgJGdyaWQucmVtb3ZlQ2xhc3MoJ2N1cnJlbnQtdmlldycpO1xuICAgICAgICAgICAgICAgICRncmlkTW9iaWxlLnJlbW92ZUNsYXNzKCdjdXJyZW50LXZpZXcnKTtcbiAgICAgICAgICAgICAgICAkcHJvZHVjdExpc3RpbmcucmVtb3ZlQ2xhc3MoJ3Byb2R1Y3RHcmlkJykuYWRkQ2xhc3MoJ3Byb2R1Y3RMaXN0Jyk7XG4gICAgICAgICAgICB9LCAzMDApO1xuICAgICAgICB9XG4gICB9KTtcblxuICAgICRncmlkLm9uKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICAgaWYgKCEkZ3JpZC5oYXNDbGFzcygnY3VycmVudC12aWV3JykpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXsgXG4gICAgICAgICAgICAgICAgJGdyaWQuYWRkQ2xhc3MoJ2N1cnJlbnQtdmlldycpO1xuICAgICAgICAgICAgICAgICRncmlkTW9iaWxlLmFkZENsYXNzKCdjdXJyZW50LXZpZXcnKTtcbiAgICAgICAgICAgICAgICAkbGlzdC5yZW1vdmVDbGFzcygnY3VycmVudC12aWV3Jyk7XG4gICAgICAgICAgICAgICAgJGxpc3RNb2JpbGUucmVtb3ZlQ2xhc3MoJ2N1cnJlbnQtdmlldycpO1xuICAgICAgICAgICAgICAgICRwcm9kdWN0TGlzdGluZy5yZW1vdmVDbGFzcygncHJvZHVjdExpc3QnKS5hZGRDbGFzcygncHJvZHVjdEdyaWQnKTtcbiAgICAgICAgICAgIH0sIDMwMCk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgICRsaXN0TW9iaWxlLm9uKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICAgaWYgKCEkbGlzdE1vYmlsZS5oYXNDbGFzcygnY3VycmVudC12aWV3JykpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXsgXG4gICAgICAgICAgICAgICAgJGxpc3QuYWRkQ2xhc3MoJ2N1cnJlbnQtdmlldycpO1xuICAgICAgICAgICAgICAgICRsaXN0TW9iaWxlLmFkZENsYXNzKCdjdXJyZW50LXZpZXcnKTtcbiAgICAgICAgICAgICAgICAkZ3JpZC5yZW1vdmVDbGFzcygnY3VycmVudC12aWV3Jyk7XG4gICAgICAgICAgICAgICAgJGdyaWRNb2JpbGUucmVtb3ZlQ2xhc3MoJ2N1cnJlbnQtdmlldycpO1xuICAgICAgICAgICAgICAgICRwcm9kdWN0TGlzdGluZy5yZW1vdmVDbGFzcygncHJvZHVjdEdyaWQnKS5hZGRDbGFzcygncHJvZHVjdExpc3QnKTtcbiAgICAgICAgICAgIH0sIDMwMCk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgICRncmlkTW9iaWxlLm9uKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICAgaWYgKCEkZ3JpZE1vYmlsZS5oYXNDbGFzcygnY3VycmVudC12aWV3JykpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXsgXG4gICAgICAgICAgICAgICAgJGdyaWQuYWRkQ2xhc3MoJ2N1cnJlbnQtdmlldycpO1xuICAgICAgICAgICAgICAgICRncmlkTW9iaWxlLmFkZENsYXNzKCdjdXJyZW50LXZpZXcnKTtcbiAgICAgICAgICAgICAgICAkbGlzdC5yZW1vdmVDbGFzcygnY3VycmVudC12aWV3Jyk7XG4gICAgICAgICAgICAgICAgJGxpc3RNb2JpbGUucmVtb3ZlQ2xhc3MoJ2N1cnJlbnQtdmlldycpO1xuICAgICAgICAgICAgICAgICRwcm9kdWN0TGlzdGluZy5yZW1vdmVDbGFzcygncHJvZHVjdExpc3QnKS5hZGRDbGFzcygncHJvZHVjdEdyaWQnKTtcbiAgICAgICAgICAgIH0sIDMwMCk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuICAgIGlmICgkKCcuYWxsLWNhdGVnb3JpZXMtbGlzdCcpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5hbGwtY2F0ZWdvcmllcy1saXN0IC5pY29uLWRyb3Bkb3duJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpLnBhcmVudCgpO1xuXG4gICAgICAgICAgICAkdGhpcy5zaWJsaW5ncygpLnJlbW92ZUNsYXNzKCdpcy1jbGlja2VkIGN1cnJlbnQtY2F0ZScpO1xuICAgICAgICAgICAgJHRoaXMudG9nZ2xlQ2xhc3MoJ2lzLWNsaWNrZWQnKTtcbiAgICAgICAgICAgICR0aGlzLnNpYmxpbmdzKCkuZmluZChcIj4gLmRyb3Bkb3duLWNhdGVnb3J5LWxpc3RcIikuc2xpZGVVcChcInNsb3dcIik7XG4gICAgICAgICAgICAkdGhpcy5maW5kKFwiPiAuZHJvcGRvd24tY2F0ZWdvcnktbGlzdFwiKS5zbGlkZVRvZ2dsZShcInNsb3dcIik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJy5hbGwtY2F0ZWdvcmllcy1saXN0IGxpJykuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdjdXJyZW50LWNhdGUnKSkge1xuICAgICAgICAgICAgICAgICQodGhpcykuZmluZChcIj4gLmRyb3Bkb3duLWNhdGVnb3J5LWxpc3RcIikuc2xpZGVUb2dnbGUoXCJzbG93XCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihjb250ZXh0KSB7XG4gICAgY29uc3QgJGJvZHkgPSAkKCdib2R5Jyk7XG5cbiAgICBmdW5jdGlvbiB0b29sYmFyX3N0aWNreSgpIHtcbiAgICAgICAgdmFyIHRvb2xiYXJfcG9zaXRpb24sIHRvb2xiYXJfaGVpZ2h0LFxuICAgICAgICAgICAgdG9vbGJhciA9ICQoJy5wYWdlLWxpc3RpbmcgLmhhbG8tdG9vbGJhcicpO1xuXG4gICAgICAgIHRvb2xiYXJfaGVpZ2h0ID0gdG9vbGJhci5oZWlnaHQoKTtcbiAgICAgICAgdG9vbGJhcl9wb3NpdGlvbiA9IHRvb2xiYXIub2Zmc2V0KCkudG9wICsgdG9vbGJhci5vdXRlckhlaWdodCh0cnVlKTtcblxuICAgICAgICBpZiAodG9vbGJhci5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRvb2xiYXJfc2Nyb2xsKHRvb2xiYXJfcG9zaXRpb24sIHRvb2xiYXJfaGVpZ2h0LCB0b29sYmFyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRvb2xiYXJfc2Nyb2xsKHRvb2xiYXJfcG9zaXRpb24sIHRvb2xiYXJfaGVpZ2h0LCB0b29sYmFyKSB7XG4gICAgICAgIHZhciBkaWRTY3JvbGwsXG4gICAgICAgICAgICBsYXN0U2Nyb2xsVG9wID0gMCxcbiAgICAgICAgICAgIGRlbHRhID0gNTtcblxuICAgICAgICAkKHdpbmRvdykub24oJ3Njcm9sbCBsb2FkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgc2Nyb2xsID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xuXG4gICAgICAgICAgICBpZihNYXRoLmFicyhsYXN0U2Nyb2xsVG9wIC0gc2Nyb2xsKSA8PSBkZWx0YSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoc2Nyb2xsID4gbGFzdFNjcm9sbFRvcCAmJiBzY3JvbGwgPiB0b29sYmFyX3Bvc2l0aW9uKXtcbiAgICAgICAgICAgICAgICB0b29sYmFyLnJlbW92ZUNsYXNzKCdzdGlja3ktZG93bicpLmFkZENsYXNzKCdzdGlja3ktdXAnKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAoc2Nyb2xsID4gdG9vbGJhcl9wb3NpdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAkYm9keS5hZGRDbGFzcygnaGFzLXN0aWNreVRvb2xiYXInKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAkYm9keS5yZW1vdmVDbGFzcygnaGFzLXN0aWNreVRvb2xiYXInKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmKHNjcm9sbCArICQod2luZG93KS5oZWlnaHQoKSA8ICQoZG9jdW1lbnQpLmhlaWdodCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRvb2xiYXIucmVtb3ZlQ2xhc3MoJ3N0aWNreS11cCcpLmFkZENsYXNzKCdzdGlja3ktZG93bicpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChzY3JvbGwgPiB0b29sYmFyX3Bvc2l0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkYm9keS5hZGRDbGFzcygnaGFzLXN0aWNreVRvb2xiYXInKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRib2R5LnJlbW92ZUNsYXNzKCdoYXMtc3RpY2t5VG9vbGJhcicpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBsYXN0U2Nyb2xsVG9wID0gc2Nyb2xsO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPCAxMDI1KSB7XG4gICAgICAgIHRvb2xiYXJfc3RpY2t5KCk7XG4gICAgfSBlbHNle1xuICAgICAgICAkYm9keS5yZW1vdmVDbGFzcygnaGFzLXN0aWNreVRvb2xiYXInKTtcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9