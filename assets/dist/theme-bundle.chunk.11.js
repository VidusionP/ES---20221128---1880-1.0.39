(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[11],{

/***/ "./assets/js/theme/auth.js":
/*!*********************************!*\
  !*** ./assets/js/theme/auth.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Auth; });
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./page-manager */ "./assets/js/theme/page-manager.js");
/* harmony import */ var _common_state_country__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common/state-country */ "./assets/js/theme/common/state-country.js");
/* harmony import */ var _common_nod__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./common/nod */ "./assets/js/theme/common/nod.js");
/* harmony import */ var _common_form_validation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common/form-validation */ "./assets/js/theme/common/form-validation.js");
/* harmony import */ var _common_models_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./common/models/forms */ "./assets/js/theme/common/models/forms.js");
/* harmony import */ var _common_form_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./common/form-utils */ "./assets/js/theme/common/form-utils.js");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }






var Auth = /*#__PURE__*/function (_PageManager) {
  _inheritsLoose(Auth, _PageManager);
  function Auth(context) {
    var _this;
    _this = _PageManager.call(this, context) || this;
    _this.formCreateSelector = 'form[data-create-account-form]';
    return _this;
  }
  var _proto = Auth.prototype;
  _proto.registerLoginValidation = function registerLoginValidation($loginForm) {
    var _this2 = this;
    var loginModel = _common_models_forms__WEBPACK_IMPORTED_MODULE_4__["default"];
    this.loginValidator = Object(_common_nod__WEBPACK_IMPORTED_MODULE_2__["default"])({
      submit: '.login-form input[type="submit"]'
    });
    this.loginValidator.add([{
      selector: '.login-form input[name="login_email"]',
      validate: function validate(cb, val) {
        var result = loginModel.email(val);
        cb(result);
      },
      errorMessage: this.context.useValidEmail
    }, {
      selector: '.login-form input[name="login_pass"]',
      validate: function validate(cb, val) {
        var result = loginModel.password(val);
        cb(result);
      },
      errorMessage: this.context.enterPass
    }]);
    $loginForm.on('submit', function (event) {
      _this2.loginValidator.performCheck();
      if (_this2.loginValidator.areAll('valid')) {
        return;
      }
      event.preventDefault();
    });
  };
  _proto.registerForgotPasswordValidation = function registerForgotPasswordValidation($forgotPasswordForm) {
    var _this3 = this;
    this.forgotPasswordValidator = Object(_common_nod__WEBPACK_IMPORTED_MODULE_2__["default"])({
      submit: '.forgot-password-form input[type="submit"]'
    });
    this.forgotPasswordValidator.add([{
      selector: '.forgot-password-form input[name="email"]',
      validate: function validate(cb, val) {
        var result = _common_models_forms__WEBPACK_IMPORTED_MODULE_4__["default"].email(val);
        cb(result);
      },
      errorMessage: this.context.useValidEmail
    }]);
    $forgotPasswordForm.on('submit', function (event) {
      _this3.forgotPasswordValidator.performCheck();
      if (_this3.forgotPasswordValidator.areAll('valid')) {
        return;
      }
      event.preventDefault();
    });
  };
  _proto.registerNewPasswordValidation = function registerNewPasswordValidation() {
    var newPasswordForm = '.new-password-form';
    var newPasswordValidator = Object(_common_nod__WEBPACK_IMPORTED_MODULE_2__["default"])({
      submit: $(newPasswordForm + " input[type=\"submit\"]")
    });
    var passwordSelector = $(newPasswordForm + " input[name=\"password\"]");
    var password2Selector = $(newPasswordForm + " input[name=\"password_confirm\"]");
    _common_form_utils__WEBPACK_IMPORTED_MODULE_5__["Validators"].setPasswordValidation(newPasswordValidator, passwordSelector, password2Selector, this.passwordRequirements);
  };
  _proto.registerCreateAccountValidator = function registerCreateAccountValidator($createAccountForm) {
    var validationModel = Object(_common_form_validation__WEBPACK_IMPORTED_MODULE_3__["default"])($createAccountForm);
    var createAccountValidator = Object(_common_nod__WEBPACK_IMPORTED_MODULE_2__["default"])({
      submit: this.formCreateSelector + " input[type='submit']"
    });
    var $stateElement = $('[data-field-type="State"]');
    var emailSelector = this.formCreateSelector + " [data-field-type='EmailAddress']";
    var $emailElement = $(emailSelector);
    var passwordSelector = this.formCreateSelector + " [data-field-type='Password']";
    var $passwordElement = $(passwordSelector);
    var password2Selector = this.formCreateSelector + " [data-field-type='ConfirmPassword']";
    var $password2Element = $(password2Selector);
    createAccountValidator.add(validationModel);
    if ($stateElement) {
      var $last;

      // Requests the states for a country with AJAX
      Object(_common_state_country__WEBPACK_IMPORTED_MODULE_1__["default"])($stateElement, this.context, function (err, field) {
        if (err) {
          throw new Error(err);
        }
        var $field = $(field);
        if (createAccountValidator.getStatus($stateElement) !== 'undefined') {
          createAccountValidator.remove($stateElement);
        }
        if ($last) {
          createAccountValidator.remove($last);
        }
        if ($field.is('select')) {
          $last = field;
          _common_form_utils__WEBPACK_IMPORTED_MODULE_5__["Validators"].setStateCountryValidation(createAccountValidator, field);
        } else {
          _common_form_utils__WEBPACK_IMPORTED_MODULE_5__["Validators"].cleanUpStateValidation(field);
        }
      });
    }
    if ($emailElement) {
      createAccountValidator.remove(emailSelector);
      _common_form_utils__WEBPACK_IMPORTED_MODULE_5__["Validators"].setEmailValidation(createAccountValidator, emailSelector);
    }
    if ($passwordElement && $password2Element) {
      createAccountValidator.remove(passwordSelector);
      createAccountValidator.remove(password2Selector);
      _common_form_utils__WEBPACK_IMPORTED_MODULE_5__["Validators"].setPasswordValidation(createAccountValidator, passwordSelector, password2Selector, this.passwordRequirements);
    }
    $createAccountForm.on('submit', function (event) {
      createAccountValidator.performCheck();
      if (createAccountValidator.areAll('valid')) {
        return;
      }
      event.preventDefault();
    });
  }

  /**
   * Request is made in this function to the remote endpoint and pulls back the states for country.
   */;
  _proto.onReady = function onReady() {
    var $createAccountForm = Object(_common_form_utils__WEBPACK_IMPORTED_MODULE_5__["classifyForm"])(this.formCreateSelector);
    var $loginForm = Object(_common_form_utils__WEBPACK_IMPORTED_MODULE_5__["classifyForm"])('.login-form');
    var $forgotPasswordForm = Object(_common_form_utils__WEBPACK_IMPORTED_MODULE_5__["classifyForm"])('.forgot-password-form');
    var $newPasswordForm = Object(_common_form_utils__WEBPACK_IMPORTED_MODULE_5__["classifyForm"])('.new-password-form'); // reset password

    // Injected via auth.html
    this.passwordRequirements = this.context.passwordRequirements;
    if ($loginForm.length) {
      this.registerLoginValidation($loginForm);
    }
    if ($newPasswordForm.length) {
      this.registerNewPasswordValidation();
    }
    if ($forgotPasswordForm.length) {
      this.registerForgotPasswordValidation($forgotPasswordForm);
    }
    if ($createAccountForm.length) {
      this.registerCreateAccountValidator($createAccountForm);
    }
  };
  return Auth;
}(_page_manager__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/common/form-validation.js":
/*!***************************************************!*\
  !*** ./assets/js/theme/common/form-validation.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/**
 * Validate that the given date for the day/month/year select inputs is within potential range
 * @param $formField
 * @param validation
 * @returns {{selector: string, triggeredBy: string, validate: Function, errorMessage: string}}
 */
function buildDateValidation($formField, validation) {
  // No date range restriction, skip
  if (validation.min_date && validation.max_date) {
    var invalidMessage = "Your chosen date must fall between " + validation.min_date + " and " + validation.max_date + ".";
    var formElementId = $formField.attr('id');
    var minSplit = validation.min_date.split('-');
    var maxSplit = validation.max_date.split('-');
    var minDate = new Date(minSplit[0], minSplit[1] - 1, minSplit[2]);
    var maxDate = new Date(maxSplit[0], maxSplit[1] - 1, maxSplit[2]);
    return {
      selector: "#" + formElementId + " select[data-label=\"year\"]",
      triggeredBy: "#" + formElementId + " select:not([data-label=\"year\"])",
      validate: function validate(cb, val) {
        var day = Number($formField.find('select[data-label="day"]').val());
        var month = Number($formField.find('select[data-label="month"]').val()) - 1;
        var year = Number(val);
        var chosenDate = new Date(year, month, day);
        cb(chosenDate >= minDate && chosenDate <= maxDate);
      },
      errorMessage: invalidMessage
    };
  }
}

/**
 * We validate checkboxes separately from single input fields, as they must have at least one checked option
 * from many different inputs
 * @param $formField
 * @param validation
 */
function buildRequiredCheckboxValidation($formField, validation) {
  var formFieldId = $formField.attr('id');
  var primarySelector = "#" + formFieldId + " input:first-of-type";
  var secondarySelector = "#" + formFieldId + " input";
  return {
    selector: primarySelector,
    triggeredBy: secondarySelector,
    validate: function validate(cb) {
      var result = false;
      $(secondarySelector).each(function (index, checkbox) {
        if (checkbox.checked) {
          result = true;
          return false;
        }
      });
      cb(result);
    },
    errorMessage: "The '" + validation.label + "' field cannot be blank."
  };
}
function buildRequiredValidation(validation, selector) {
  return {
    selector: selector,
    validate: function validate(cb, val) {
      cb(val.length > 0);
    },
    errorMessage: "The '" + validation.label + "' field cannot be blank."
  };
}
function buildNumberRangeValidation(validation, formFieldSelector) {
  var invalidMessage = "The value for " + validation.label + " must be between " + validation.min + " and " + validation.max + ".";
  var min = Number(validation.min);
  var max = Number(validation.max);
  return {
    selector: formFieldSelector + " input[name=\"" + validation.name + "\"]",
    validate: function validate(cb, val) {
      var numberVal = Number(val);
      cb(numberVal >= min && numberVal <= max);
    },
    errorMessage: invalidMessage
  };
}
function buildValidation($validateableElement) {
  var validation = $validateableElement.data('validation');
  var fieldValidations = [];
  var formFieldSelector = "#" + $validateableElement.attr('id');
  if (validation.type === 'datechooser') {
    var dateValidation = buildDateValidation($validateableElement, validation);
    if (dateValidation) {
      fieldValidations.push(dateValidation);
    }
  } else if (validation.required && (validation.type === 'checkboxselect' || validation.type === 'radioselect')) {
    fieldValidations.push(buildRequiredCheckboxValidation($validateableElement, validation));
  } else {
    $validateableElement.find('input, select, textarea').each(function (index, element) {
      var $inputElement = $(element);
      var tagName = $inputElement.get(0).tagName;
      var inputName = $inputElement.attr('name');
      var elementSelector = formFieldSelector + " " + tagName + "[name=\"" + inputName + "\"]";
      if (validation.type === 'numberonly') {
        fieldValidations.push(buildNumberRangeValidation(validation, formFieldSelector));
      }
      if (validation.required) {
        fieldValidations.push(buildRequiredValidation(validation, elementSelector));
      }
    });
  }
  return fieldValidations;
}

/**
 * Builds the validation model for dynamic forms
 * @param $form
 * @returns {Array}
 */
/* harmony default export */ __webpack_exports__["default"] = (function ($form) {
  var validationsToPerform = [];
  $form.find('[data-validation]').each(function (index, input) {
    validationsToPerform = validationsToPerform.concat(buildValidation($(input)));
  });
  return validationsToPerform;
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvYXV0aC5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY29tbW9uL2Zvcm0tdmFsaWRhdGlvbi5qcyJdLCJuYW1lcyI6WyJBdXRoIiwiY29udGV4dCIsImZvcm1DcmVhdGVTZWxlY3RvciIsInJlZ2lzdGVyTG9naW5WYWxpZGF0aW9uIiwiJGxvZ2luRm9ybSIsImxvZ2luTW9kZWwiLCJmb3JtcyIsImxvZ2luVmFsaWRhdG9yIiwibm9kIiwic3VibWl0IiwiYWRkIiwic2VsZWN0b3IiLCJ2YWxpZGF0ZSIsImNiIiwidmFsIiwicmVzdWx0IiwiZW1haWwiLCJlcnJvck1lc3NhZ2UiLCJ1c2VWYWxpZEVtYWlsIiwicGFzc3dvcmQiLCJlbnRlclBhc3MiLCJvbiIsImV2ZW50IiwicGVyZm9ybUNoZWNrIiwiYXJlQWxsIiwicHJldmVudERlZmF1bHQiLCJyZWdpc3RlckZvcmdvdFBhc3N3b3JkVmFsaWRhdGlvbiIsIiRmb3Jnb3RQYXNzd29yZEZvcm0iLCJmb3Jnb3RQYXNzd29yZFZhbGlkYXRvciIsInJlZ2lzdGVyTmV3UGFzc3dvcmRWYWxpZGF0aW9uIiwibmV3UGFzc3dvcmRGb3JtIiwibmV3UGFzc3dvcmRWYWxpZGF0b3IiLCIkIiwicGFzc3dvcmRTZWxlY3RvciIsInBhc3N3b3JkMlNlbGVjdG9yIiwiVmFsaWRhdG9ycyIsInNldFBhc3N3b3JkVmFsaWRhdGlvbiIsInBhc3N3b3JkUmVxdWlyZW1lbnRzIiwicmVnaXN0ZXJDcmVhdGVBY2NvdW50VmFsaWRhdG9yIiwiJGNyZWF0ZUFjY291bnRGb3JtIiwidmFsaWRhdGlvbk1vZGVsIiwidmFsaWRhdGlvbiIsImNyZWF0ZUFjY291bnRWYWxpZGF0b3IiLCIkc3RhdGVFbGVtZW50IiwiZW1haWxTZWxlY3RvciIsIiRlbWFpbEVsZW1lbnQiLCIkcGFzc3dvcmRFbGVtZW50IiwiJHBhc3N3b3JkMkVsZW1lbnQiLCIkbGFzdCIsInN0YXRlQ291bnRyeSIsImVyciIsImZpZWxkIiwiRXJyb3IiLCIkZmllbGQiLCJnZXRTdGF0dXMiLCJyZW1vdmUiLCJpcyIsInNldFN0YXRlQ291bnRyeVZhbGlkYXRpb24iLCJjbGVhblVwU3RhdGVWYWxpZGF0aW9uIiwic2V0RW1haWxWYWxpZGF0aW9uIiwib25SZWFkeSIsImNsYXNzaWZ5Rm9ybSIsIiRuZXdQYXNzd29yZEZvcm0iLCJsZW5ndGgiLCJQYWdlTWFuYWdlciIsImJ1aWxkRGF0ZVZhbGlkYXRpb24iLCIkZm9ybUZpZWxkIiwibWluX2RhdGUiLCJtYXhfZGF0ZSIsImludmFsaWRNZXNzYWdlIiwiZm9ybUVsZW1lbnRJZCIsImF0dHIiLCJtaW5TcGxpdCIsInNwbGl0IiwibWF4U3BsaXQiLCJtaW5EYXRlIiwiRGF0ZSIsIm1heERhdGUiLCJ0cmlnZ2VyZWRCeSIsImRheSIsIk51bWJlciIsImZpbmQiLCJtb250aCIsInllYXIiLCJjaG9zZW5EYXRlIiwiYnVpbGRSZXF1aXJlZENoZWNrYm94VmFsaWRhdGlvbiIsImZvcm1GaWVsZElkIiwicHJpbWFyeVNlbGVjdG9yIiwic2Vjb25kYXJ5U2VsZWN0b3IiLCJlYWNoIiwiaW5kZXgiLCJjaGVja2JveCIsImNoZWNrZWQiLCJsYWJlbCIsImJ1aWxkUmVxdWlyZWRWYWxpZGF0aW9uIiwiYnVpbGROdW1iZXJSYW5nZVZhbGlkYXRpb24iLCJmb3JtRmllbGRTZWxlY3RvciIsIm1pbiIsIm1heCIsIm5hbWUiLCJudW1iZXJWYWwiLCJidWlsZFZhbGlkYXRpb24iLCIkdmFsaWRhdGVhYmxlRWxlbWVudCIsImRhdGEiLCJmaWVsZFZhbGlkYXRpb25zIiwidHlwZSIsImRhdGVWYWxpZGF0aW9uIiwicHVzaCIsInJlcXVpcmVkIiwiZWxlbWVudCIsIiRpbnB1dEVsZW1lbnQiLCJ0YWdOYW1lIiwiZ2V0IiwiaW5wdXROYW1lIiwiZWxlbWVudFNlbGVjdG9yIiwiJGZvcm0iLCJ2YWxpZGF0aW9uc1RvUGVyZm9ybSIsImlucHV0IiwiY29uY2F0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUF5QztBQUNTO0FBQ25CO0FBQ21CO0FBQ1I7QUFDcUI7QUFBQSxJQUUxQ0EsSUFBSTtFQUFBO0VBQ3JCLGNBQVlDLE9BQU8sRUFBRTtJQUFBO0lBQ2pCLGdDQUFNQSxPQUFPLENBQUM7SUFDZCxNQUFLQyxrQkFBa0IsR0FBRyxnQ0FBZ0M7SUFBQztFQUMvRDtFQUFDO0VBQUEsT0FFREMsdUJBQXVCLEdBQXZCLGlDQUF3QkMsVUFBVSxFQUFFO0lBQUE7SUFDaEMsSUFBTUMsVUFBVSxHQUFHQyw0REFBSztJQUV4QixJQUFJLENBQUNDLGNBQWMsR0FBR0MsMkRBQUcsQ0FBQztNQUN0QkMsTUFBTSxFQUFFO0lBQ1osQ0FBQyxDQUFDO0lBRUYsSUFBSSxDQUFDRixjQUFjLENBQUNHLEdBQUcsQ0FBQyxDQUNwQjtNQUNJQyxRQUFRLEVBQUUsdUNBQXVDO01BQ2pEQyxRQUFRLEVBQUUsa0JBQUNDLEVBQUUsRUFBRUMsR0FBRyxFQUFLO1FBQ25CLElBQU1DLE1BQU0sR0FBR1YsVUFBVSxDQUFDVyxLQUFLLENBQUNGLEdBQUcsQ0FBQztRQUVwQ0QsRUFBRSxDQUFDRSxNQUFNLENBQUM7TUFDZCxDQUFDO01BQ0RFLFlBQVksRUFBRSxJQUFJLENBQUNoQixPQUFPLENBQUNpQjtJQUMvQixDQUFDLEVBQ0Q7TUFDSVAsUUFBUSxFQUFFLHNDQUFzQztNQUNoREMsUUFBUSxFQUFFLGtCQUFDQyxFQUFFLEVBQUVDLEdBQUcsRUFBSztRQUNuQixJQUFNQyxNQUFNLEdBQUdWLFVBQVUsQ0FBQ2MsUUFBUSxDQUFDTCxHQUFHLENBQUM7UUFFdkNELEVBQUUsQ0FBQ0UsTUFBTSxDQUFDO01BQ2QsQ0FBQztNQUNERSxZQUFZLEVBQUUsSUFBSSxDQUFDaEIsT0FBTyxDQUFDbUI7SUFDL0IsQ0FBQyxDQUNKLENBQUM7SUFFRmhCLFVBQVUsQ0FBQ2lCLEVBQUUsQ0FBQyxRQUFRLEVBQUUsVUFBQUMsS0FBSyxFQUFJO01BQzdCLE1BQUksQ0FBQ2YsY0FBYyxDQUFDZ0IsWUFBWSxFQUFFO01BRWxDLElBQUksTUFBSSxDQUFDaEIsY0FBYyxDQUFDaUIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ3JDO01BQ0o7TUFFQUYsS0FBSyxDQUFDRyxjQUFjLEVBQUU7SUFDMUIsQ0FBQyxDQUFDO0VBQ04sQ0FBQztFQUFBLE9BRURDLGdDQUFnQyxHQUFoQywwQ0FBaUNDLG1CQUFtQixFQUFFO0lBQUE7SUFDbEQsSUFBSSxDQUFDQyx1QkFBdUIsR0FBR3BCLDJEQUFHLENBQUM7TUFDL0JDLE1BQU0sRUFBRTtJQUNaLENBQUMsQ0FBQztJQUVGLElBQUksQ0FBQ21CLHVCQUF1QixDQUFDbEIsR0FBRyxDQUFDLENBQzdCO01BQ0lDLFFBQVEsRUFBRSwyQ0FBMkM7TUFDckRDLFFBQVEsRUFBRSxrQkFBQ0MsRUFBRSxFQUFFQyxHQUFHLEVBQUs7UUFDbkIsSUFBTUMsTUFBTSxHQUFHVCw0REFBSyxDQUFDVSxLQUFLLENBQUNGLEdBQUcsQ0FBQztRQUUvQkQsRUFBRSxDQUFDRSxNQUFNLENBQUM7TUFDZCxDQUFDO01BQ0RFLFlBQVksRUFBRSxJQUFJLENBQUNoQixPQUFPLENBQUNpQjtJQUMvQixDQUFDLENBQ0osQ0FBQztJQUVGUyxtQkFBbUIsQ0FBQ04sRUFBRSxDQUFDLFFBQVEsRUFBRSxVQUFBQyxLQUFLLEVBQUk7TUFDdEMsTUFBSSxDQUFDTSx1QkFBdUIsQ0FBQ0wsWUFBWSxFQUFFO01BRTNDLElBQUksTUFBSSxDQUFDSyx1QkFBdUIsQ0FBQ0osTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQzlDO01BQ0o7TUFFQUYsS0FBSyxDQUFDRyxjQUFjLEVBQUU7SUFDMUIsQ0FBQyxDQUFDO0VBQ04sQ0FBQztFQUFBLE9BRURJLDZCQUE2QixHQUE3Qix5Q0FBZ0M7SUFDNUIsSUFBTUMsZUFBZSxHQUFHLG9CQUFvQjtJQUM1QyxJQUFNQyxvQkFBb0IsR0FBR3ZCLDJEQUFHLENBQUM7TUFDN0JDLE1BQU0sRUFBRXVCLENBQUMsQ0FBSUYsZUFBZTtJQUNoQyxDQUFDLENBQUM7SUFDRixJQUFNRyxnQkFBZ0IsR0FBR0QsQ0FBQyxDQUFJRixlQUFlLCtCQUEwQjtJQUN2RSxJQUFNSSxpQkFBaUIsR0FBR0YsQ0FBQyxDQUFJRixlQUFlLHVDQUFrQztJQUVoRkssNkRBQVUsQ0FBQ0MscUJBQXFCLENBQzVCTCxvQkFBb0IsRUFDcEJFLGdCQUFnQixFQUNoQkMsaUJBQWlCLEVBQ2pCLElBQUksQ0FBQ0csb0JBQW9CLENBQzVCO0VBQ0wsQ0FBQztFQUFBLE9BRURDLDhCQUE4QixHQUE5Qix3Q0FBK0JDLGtCQUFrQixFQUFFO0lBQy9DLElBQU1DLGVBQWUsR0FBR0MsdUVBQVUsQ0FBQ0Ysa0JBQWtCLENBQUM7SUFDdEQsSUFBTUcsc0JBQXNCLEdBQUdsQywyREFBRyxDQUFDO01BQy9CQyxNQUFNLEVBQUssSUFBSSxDQUFDUCxrQkFBa0I7SUFDdEMsQ0FBQyxDQUFDO0lBQ0YsSUFBTXlDLGFBQWEsR0FBR1gsQ0FBQyxDQUFDLDJCQUEyQixDQUFDO0lBQ3BELElBQU1ZLGFBQWEsR0FBTSxJQUFJLENBQUMxQyxrQkFBa0Isc0NBQW1DO0lBQ25GLElBQU0yQyxhQUFhLEdBQUdiLENBQUMsQ0FBQ1ksYUFBYSxDQUFDO0lBQ3RDLElBQU1YLGdCQUFnQixHQUFNLElBQUksQ0FBQy9CLGtCQUFrQixrQ0FBK0I7SUFDbEYsSUFBTTRDLGdCQUFnQixHQUFHZCxDQUFDLENBQUNDLGdCQUFnQixDQUFDO0lBQzVDLElBQU1DLGlCQUFpQixHQUFNLElBQUksQ0FBQ2hDLGtCQUFrQix5Q0FBc0M7SUFDMUYsSUFBTTZDLGlCQUFpQixHQUFHZixDQUFDLENBQUNFLGlCQUFpQixDQUFDO0lBRTlDUSxzQkFBc0IsQ0FBQ2hDLEdBQUcsQ0FBQzhCLGVBQWUsQ0FBQztJQUUzQyxJQUFJRyxhQUFhLEVBQUU7TUFDZixJQUFJSyxLQUFLOztNQUVUO01BQ0FDLHFFQUFZLENBQUNOLGFBQWEsRUFBRSxJQUFJLENBQUMxQyxPQUFPLEVBQUUsVUFBQ2lELEdBQUcsRUFBRUMsS0FBSyxFQUFLO1FBQ3RELElBQUlELEdBQUcsRUFBRTtVQUNMLE1BQU0sSUFBSUUsS0FBSyxDQUFDRixHQUFHLENBQUM7UUFDeEI7UUFFQSxJQUFNRyxNQUFNLEdBQUdyQixDQUFDLENBQUNtQixLQUFLLENBQUM7UUFFdkIsSUFBSVQsc0JBQXNCLENBQUNZLFNBQVMsQ0FBQ1gsYUFBYSxDQUFDLEtBQUssV0FBVyxFQUFFO1VBQ2pFRCxzQkFBc0IsQ0FBQ2EsTUFBTSxDQUFDWixhQUFhLENBQUM7UUFDaEQ7UUFFQSxJQUFJSyxLQUFLLEVBQUU7VUFDUE4sc0JBQXNCLENBQUNhLE1BQU0sQ0FBQ1AsS0FBSyxDQUFDO1FBQ3hDO1FBRUEsSUFBSUssTUFBTSxDQUFDRyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUU7VUFDckJSLEtBQUssR0FBR0csS0FBSztVQUNiaEIsNkRBQVUsQ0FBQ3NCLHlCQUF5QixDQUFDZixzQkFBc0IsRUFBRVMsS0FBSyxDQUFDO1FBQ3ZFLENBQUMsTUFBTTtVQUNIaEIsNkRBQVUsQ0FBQ3VCLHNCQUFzQixDQUFDUCxLQUFLLENBQUM7UUFDNUM7TUFDSixDQUFDLENBQUM7SUFDTjtJQUVBLElBQUlOLGFBQWEsRUFBRTtNQUNmSCxzQkFBc0IsQ0FBQ2EsTUFBTSxDQUFDWCxhQUFhLENBQUM7TUFDNUNULDZEQUFVLENBQUN3QixrQkFBa0IsQ0FBQ2pCLHNCQUFzQixFQUFFRSxhQUFhLENBQUM7SUFDeEU7SUFFQSxJQUFJRSxnQkFBZ0IsSUFBSUMsaUJBQWlCLEVBQUU7TUFDdkNMLHNCQUFzQixDQUFDYSxNQUFNLENBQUN0QixnQkFBZ0IsQ0FBQztNQUMvQ1Msc0JBQXNCLENBQUNhLE1BQU0sQ0FBQ3JCLGlCQUFpQixDQUFDO01BQ2hEQyw2REFBVSxDQUFDQyxxQkFBcUIsQ0FDNUJNLHNCQUFzQixFQUN0QlQsZ0JBQWdCLEVBQ2hCQyxpQkFBaUIsRUFDakIsSUFBSSxDQUFDRyxvQkFBb0IsQ0FDNUI7SUFDTDtJQUVBRSxrQkFBa0IsQ0FBQ2xCLEVBQUUsQ0FBQyxRQUFRLEVBQUUsVUFBQUMsS0FBSyxFQUFJO01BQ3JDb0Isc0JBQXNCLENBQUNuQixZQUFZLEVBQUU7TUFFckMsSUFBSW1CLHNCQUFzQixDQUFDbEIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ3hDO01BQ0o7TUFFQUYsS0FBSyxDQUFDRyxjQUFjLEVBQUU7SUFDMUIsQ0FBQyxDQUFDO0VBQ047O0VBRUE7QUFDSjtBQUNBLEtBRkk7RUFBQSxPQUdBbUMsT0FBTyxHQUFQLG1CQUFVO0lBQ04sSUFBTXJCLGtCQUFrQixHQUFHc0IsdUVBQVksQ0FBQyxJQUFJLENBQUMzRCxrQkFBa0IsQ0FBQztJQUNoRSxJQUFNRSxVQUFVLEdBQUd5RCx1RUFBWSxDQUFDLGFBQWEsQ0FBQztJQUM5QyxJQUFNbEMsbUJBQW1CLEdBQUdrQyx1RUFBWSxDQUFDLHVCQUF1QixDQUFDO0lBQ2pFLElBQU1DLGdCQUFnQixHQUFHRCx1RUFBWSxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQzs7SUFFN0Q7SUFDQSxJQUFJLENBQUN4QixvQkFBb0IsR0FBRyxJQUFJLENBQUNwQyxPQUFPLENBQUNvQyxvQkFBb0I7SUFFN0QsSUFBSWpDLFVBQVUsQ0FBQzJELE1BQU0sRUFBRTtNQUNuQixJQUFJLENBQUM1RCx1QkFBdUIsQ0FBQ0MsVUFBVSxDQUFDO0lBQzVDO0lBRUEsSUFBSTBELGdCQUFnQixDQUFDQyxNQUFNLEVBQUU7TUFDekIsSUFBSSxDQUFDbEMsNkJBQTZCLEVBQUU7SUFDeEM7SUFFQSxJQUFJRixtQkFBbUIsQ0FBQ29DLE1BQU0sRUFBRTtNQUM1QixJQUFJLENBQUNyQyxnQ0FBZ0MsQ0FBQ0MsbUJBQW1CLENBQUM7SUFDOUQ7SUFFQSxJQUFJWSxrQkFBa0IsQ0FBQ3dCLE1BQU0sRUFBRTtNQUMzQixJQUFJLENBQUN6Qiw4QkFBOEIsQ0FBQ0Msa0JBQWtCLENBQUM7SUFDM0Q7RUFDSixDQUFDO0VBQUE7QUFBQSxFQTFMNkJ5QixxREFBVzs7Ozs7Ozs7Ozs7Ozs7QUNQN0M7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTQyxtQkFBbUIsQ0FBQ0MsVUFBVSxFQUFFekIsVUFBVSxFQUFFO0VBQ2pEO0VBQ0EsSUFBSUEsVUFBVSxDQUFDMEIsUUFBUSxJQUFJMUIsVUFBVSxDQUFDMkIsUUFBUSxFQUFFO0lBQzVDLElBQU1DLGNBQWMsMkNBQXlDNUIsVUFBVSxDQUFDMEIsUUFBUSxhQUFRMUIsVUFBVSxDQUFDMkIsUUFBUSxNQUFHO0lBQzlHLElBQU1FLGFBQWEsR0FBR0osVUFBVSxDQUFDSyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQzNDLElBQU1DLFFBQVEsR0FBRy9CLFVBQVUsQ0FBQzBCLFFBQVEsQ0FBQ00sS0FBSyxDQUFDLEdBQUcsQ0FBQztJQUMvQyxJQUFNQyxRQUFRLEdBQUdqQyxVQUFVLENBQUMyQixRQUFRLENBQUNLLEtBQUssQ0FBQyxHQUFHLENBQUM7SUFDL0MsSUFBTUUsT0FBTyxHQUFHLElBQUlDLElBQUksQ0FBQ0osUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFQSxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbkUsSUFBTUssT0FBTyxHQUFHLElBQUlELElBQUksQ0FBQ0YsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFQSxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFbkUsT0FBTztNQUNIL0QsUUFBUSxRQUFNMkQsYUFBYSxpQ0FBNEI7TUFDdkRRLFdBQVcsUUFBTVIsYUFBYSx1Q0FBa0M7TUFDaEUxRCxRQUFRLEVBQUUsa0JBQUNDLEVBQUUsRUFBRUMsR0FBRyxFQUFLO1FBQ25CLElBQU1pRSxHQUFHLEdBQUdDLE1BQU0sQ0FBQ2QsVUFBVSxDQUFDZSxJQUFJLENBQUMsMEJBQTBCLENBQUMsQ0FBQ25FLEdBQUcsRUFBRSxDQUFDO1FBQ3JFLElBQU1vRSxLQUFLLEdBQUdGLE1BQU0sQ0FBQ2QsVUFBVSxDQUFDZSxJQUFJLENBQUMsNEJBQTRCLENBQUMsQ0FBQ25FLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQztRQUM3RSxJQUFNcUUsSUFBSSxHQUFHSCxNQUFNLENBQUNsRSxHQUFHLENBQUM7UUFDeEIsSUFBTXNFLFVBQVUsR0FBRyxJQUFJUixJQUFJLENBQUNPLElBQUksRUFBRUQsS0FBSyxFQUFFSCxHQUFHLENBQUM7UUFFN0NsRSxFQUFFLENBQUN1RSxVQUFVLElBQUlULE9BQU8sSUFBSVMsVUFBVSxJQUFJUCxPQUFPLENBQUM7TUFDdEQsQ0FBQztNQUNENUQsWUFBWSxFQUFFb0Q7SUFDbEIsQ0FBQztFQUNMO0FBQ0o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBU2dCLCtCQUErQixDQUFDbkIsVUFBVSxFQUFFekIsVUFBVSxFQUFFO0VBQzdELElBQU02QyxXQUFXLEdBQUdwQixVQUFVLENBQUNLLElBQUksQ0FBQyxJQUFJLENBQUM7RUFDekMsSUFBTWdCLGVBQWUsU0FBT0QsV0FBVyx5QkFBc0I7RUFDN0QsSUFBTUUsaUJBQWlCLFNBQU9GLFdBQVcsV0FBUTtFQUVqRCxPQUFPO0lBQ0gzRSxRQUFRLEVBQUU0RSxlQUFlO0lBQ3pCVCxXQUFXLEVBQUVVLGlCQUFpQjtJQUM5QjVFLFFBQVEsRUFBRSxrQkFBQ0MsRUFBRSxFQUFLO01BQ2QsSUFBSUUsTUFBTSxHQUFHLEtBQUs7TUFFbEJpQixDQUFDLENBQUN3RCxpQkFBaUIsQ0FBQyxDQUFDQyxJQUFJLENBQUMsVUFBQ0MsS0FBSyxFQUFFQyxRQUFRLEVBQUs7UUFDM0MsSUFBSUEsUUFBUSxDQUFDQyxPQUFPLEVBQUU7VUFDbEI3RSxNQUFNLEdBQUcsSUFBSTtVQUViLE9BQU8sS0FBSztRQUNoQjtNQUNKLENBQUMsQ0FBQztNQUVGRixFQUFFLENBQUNFLE1BQU0sQ0FBQztJQUNkLENBQUM7SUFDREUsWUFBWSxZQUFVd0IsVUFBVSxDQUFDb0QsS0FBSztFQUMxQyxDQUFDO0FBQ0w7QUFFQSxTQUFTQyx1QkFBdUIsQ0FBQ3JELFVBQVUsRUFBRTlCLFFBQVEsRUFBRTtFQUNuRCxPQUFPO0lBQ0hBLFFBQVEsRUFBUkEsUUFBUTtJQUNSQyxRQUFRLG9CQUFDQyxFQUFFLEVBQUVDLEdBQUcsRUFBRTtNQUNkRCxFQUFFLENBQUNDLEdBQUcsQ0FBQ2lELE1BQU0sR0FBRyxDQUFDLENBQUM7SUFDdEIsQ0FBQztJQUNEOUMsWUFBWSxZQUFVd0IsVUFBVSxDQUFDb0QsS0FBSztFQUMxQyxDQUFDO0FBQ0w7QUFFQSxTQUFTRSwwQkFBMEIsQ0FBQ3RELFVBQVUsRUFBRXVELGlCQUFpQixFQUFFO0VBQy9ELElBQU0zQixjQUFjLHNCQUFvQjVCLFVBQVUsQ0FBQ29ELEtBQUsseUJBQW9CcEQsVUFBVSxDQUFDd0QsR0FBRyxhQUFReEQsVUFBVSxDQUFDeUQsR0FBRyxNQUFHO0VBQ25ILElBQU1ELEdBQUcsR0FBR2pCLE1BQU0sQ0FBQ3ZDLFVBQVUsQ0FBQ3dELEdBQUcsQ0FBQztFQUNsQyxJQUFNQyxHQUFHLEdBQUdsQixNQUFNLENBQUN2QyxVQUFVLENBQUN5RCxHQUFHLENBQUM7RUFFbEMsT0FBTztJQUNIdkYsUUFBUSxFQUFLcUYsaUJBQWlCLHNCQUFnQnZELFVBQVUsQ0FBQzBELElBQUksUUFBSTtJQUNqRXZGLFFBQVEsRUFBRSxrQkFBQ0MsRUFBRSxFQUFFQyxHQUFHLEVBQUs7TUFDbkIsSUFBTXNGLFNBQVMsR0FBR3BCLE1BQU0sQ0FBQ2xFLEdBQUcsQ0FBQztNQUU3QkQsRUFBRSxDQUFDdUYsU0FBUyxJQUFJSCxHQUFHLElBQUlHLFNBQVMsSUFBSUYsR0FBRyxDQUFDO0lBQzVDLENBQUM7SUFDRGpGLFlBQVksRUFBRW9EO0VBQ2xCLENBQUM7QUFDTDtBQUdBLFNBQVNnQyxlQUFlLENBQUNDLG9CQUFvQixFQUFFO0VBQzNDLElBQU03RCxVQUFVLEdBQUc2RCxvQkFBb0IsQ0FBQ0MsSUFBSSxDQUFDLFlBQVksQ0FBQztFQUMxRCxJQUFNQyxnQkFBZ0IsR0FBRyxFQUFFO0VBQzNCLElBQU1SLGlCQUFpQixTQUFPTSxvQkFBb0IsQ0FBQy9CLElBQUksQ0FBQyxJQUFJLENBQUc7RUFFL0QsSUFBSTlCLFVBQVUsQ0FBQ2dFLElBQUksS0FBSyxhQUFhLEVBQUU7SUFDbkMsSUFBTUMsY0FBYyxHQUFHekMsbUJBQW1CLENBQUNxQyxvQkFBb0IsRUFBRTdELFVBQVUsQ0FBQztJQUU1RSxJQUFJaUUsY0FBYyxFQUFFO01BQ2hCRixnQkFBZ0IsQ0FBQ0csSUFBSSxDQUFDRCxjQUFjLENBQUM7SUFDekM7RUFDSixDQUFDLE1BQU0sSUFBSWpFLFVBQVUsQ0FBQ21FLFFBQVEsS0FBS25FLFVBQVUsQ0FBQ2dFLElBQUksS0FBSyxnQkFBZ0IsSUFBSWhFLFVBQVUsQ0FBQ2dFLElBQUksS0FBSyxhQUFhLENBQUMsRUFBRTtJQUMzR0QsZ0JBQWdCLENBQUNHLElBQUksQ0FBQ3RCLCtCQUErQixDQUFDaUIsb0JBQW9CLEVBQUU3RCxVQUFVLENBQUMsQ0FBQztFQUM1RixDQUFDLE1BQU07SUFDSDZELG9CQUFvQixDQUFDckIsSUFBSSxDQUFDLHlCQUF5QixDQUFDLENBQUNRLElBQUksQ0FBQyxVQUFDQyxLQUFLLEVBQUVtQixPQUFPLEVBQUs7TUFDMUUsSUFBTUMsYUFBYSxHQUFHOUUsQ0FBQyxDQUFDNkUsT0FBTyxDQUFDO01BQ2hDLElBQU1FLE9BQU8sR0FBR0QsYUFBYSxDQUFDRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUNELE9BQU87TUFDNUMsSUFBTUUsU0FBUyxHQUFHSCxhQUFhLENBQUN2QyxJQUFJLENBQUMsTUFBTSxDQUFDO01BQzVDLElBQU0yQyxlQUFlLEdBQU1sQixpQkFBaUIsU0FBSWUsT0FBTyxnQkFBVUUsU0FBUyxRQUFJO01BRTlFLElBQUl4RSxVQUFVLENBQUNnRSxJQUFJLEtBQUssWUFBWSxFQUFFO1FBQ2xDRCxnQkFBZ0IsQ0FBQ0csSUFBSSxDQUFDWiwwQkFBMEIsQ0FBQ3RELFVBQVUsRUFBRXVELGlCQUFpQixDQUFDLENBQUM7TUFDcEY7TUFDQSxJQUFJdkQsVUFBVSxDQUFDbUUsUUFBUSxFQUFFO1FBQ3JCSixnQkFBZ0IsQ0FBQ0csSUFBSSxDQUFDYix1QkFBdUIsQ0FBQ3JELFVBQVUsRUFBRXlFLGVBQWUsQ0FBQyxDQUFDO01BQy9FO0lBQ0osQ0FBQyxDQUFDO0VBQ047RUFFQSxPQUFPVixnQkFBZ0I7QUFDM0I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNlLHlFQUFVVyxLQUFLLEVBQUU7RUFDNUIsSUFBSUMsb0JBQW9CLEdBQUcsRUFBRTtFQUU3QkQsS0FBSyxDQUFDbEMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUNRLElBQUksQ0FBQyxVQUFDQyxLQUFLLEVBQUUyQixLQUFLLEVBQUs7SUFDbkRELG9CQUFvQixHQUFHQSxvQkFBb0IsQ0FBQ0UsTUFBTSxDQUFDakIsZUFBZSxDQUFDckUsQ0FBQyxDQUFDcUYsS0FBSyxDQUFDLENBQUMsQ0FBQztFQUNqRixDQUFDLENBQUM7RUFFRixPQUFPRCxvQkFBb0I7QUFDL0IsQyIsImZpbGUiOiJ0aGVtZS1idW5kbGUuY2h1bmsuMTEuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUGFnZU1hbmFnZXIgZnJvbSAnLi9wYWdlLW1hbmFnZXInO1xuaW1wb3J0IHN0YXRlQ291bnRyeSBmcm9tICcuL2NvbW1vbi9zdGF0ZS1jb3VudHJ5JztcbmltcG9ydCBub2QgZnJvbSAnLi9jb21tb24vbm9kJztcbmltcG9ydCB2YWxpZGF0aW9uIGZyb20gJy4vY29tbW9uL2Zvcm0tdmFsaWRhdGlvbic7XG5pbXBvcnQgZm9ybXMgZnJvbSAnLi9jb21tb24vbW9kZWxzL2Zvcm1zJztcbmltcG9ydCB7IGNsYXNzaWZ5Rm9ybSwgVmFsaWRhdG9ycyB9IGZyb20gJy4vY29tbW9uL2Zvcm0tdXRpbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBdXRoIGV4dGVuZHMgUGFnZU1hbmFnZXIge1xuICAgIGNvbnN0cnVjdG9yKGNvbnRleHQpIHtcbiAgICAgICAgc3VwZXIoY29udGV4dCk7XG4gICAgICAgIHRoaXMuZm9ybUNyZWF0ZVNlbGVjdG9yID0gJ2Zvcm1bZGF0YS1jcmVhdGUtYWNjb3VudC1mb3JtXSc7XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJMb2dpblZhbGlkYXRpb24oJGxvZ2luRm9ybSkge1xuICAgICAgICBjb25zdCBsb2dpbk1vZGVsID0gZm9ybXM7XG5cbiAgICAgICAgdGhpcy5sb2dpblZhbGlkYXRvciA9IG5vZCh7XG4gICAgICAgICAgICBzdWJtaXQ6ICcubG9naW4tZm9ybSBpbnB1dFt0eXBlPVwic3VibWl0XCJdJyxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5sb2dpblZhbGlkYXRvci5hZGQoW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiAnLmxvZ2luLWZvcm0gaW5wdXRbbmFtZT1cImxvZ2luX2VtYWlsXCJdJyxcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKGNiLCB2YWwpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gbG9naW5Nb2RlbC5lbWFpbCh2YWwpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNiKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IHRoaXMuY29udGV4dC51c2VWYWxpZEVtYWlsLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogJy5sb2dpbi1mb3JtIGlucHV0W25hbWU9XCJsb2dpbl9wYXNzXCJdJyxcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKGNiLCB2YWwpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gbG9naW5Nb2RlbC5wYXNzd29yZCh2YWwpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNiKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IHRoaXMuY29udGV4dC5lbnRlclBhc3MsXG4gICAgICAgICAgICB9LFxuICAgICAgICBdKTtcblxuICAgICAgICAkbG9naW5Gb3JtLm9uKCdzdWJtaXQnLCBldmVudCA9PiB7XG4gICAgICAgICAgICB0aGlzLmxvZ2luVmFsaWRhdG9yLnBlcmZvcm1DaGVjaygpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5sb2dpblZhbGlkYXRvci5hcmVBbGwoJ3ZhbGlkJykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyRm9yZ290UGFzc3dvcmRWYWxpZGF0aW9uKCRmb3Jnb3RQYXNzd29yZEZvcm0pIHtcbiAgICAgICAgdGhpcy5mb3Jnb3RQYXNzd29yZFZhbGlkYXRvciA9IG5vZCh7XG4gICAgICAgICAgICBzdWJtaXQ6ICcuZm9yZ290LXBhc3N3b3JkLWZvcm0gaW5wdXRbdHlwZT1cInN1Ym1pdFwiXScsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuZm9yZ290UGFzc3dvcmRWYWxpZGF0b3IuYWRkKFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogJy5mb3Jnb3QtcGFzc3dvcmQtZm9ybSBpbnB1dFtuYW1lPVwiZW1haWxcIl0nLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAoY2IsIHZhbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBmb3Jtcy5lbWFpbCh2YWwpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNiKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IHRoaXMuY29udGV4dC51c2VWYWxpZEVtYWlsLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgXSk7XG5cbiAgICAgICAgJGZvcmdvdFBhc3N3b3JkRm9ybS5vbignc3VibWl0JywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgdGhpcy5mb3Jnb3RQYXNzd29yZFZhbGlkYXRvci5wZXJmb3JtQ2hlY2soKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuZm9yZ290UGFzc3dvcmRWYWxpZGF0b3IuYXJlQWxsKCd2YWxpZCcpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZWdpc3Rlck5ld1Bhc3N3b3JkVmFsaWRhdGlvbigpIHtcbiAgICAgICAgY29uc3QgbmV3UGFzc3dvcmRGb3JtID0gJy5uZXctcGFzc3dvcmQtZm9ybSc7XG4gICAgICAgIGNvbnN0IG5ld1Bhc3N3b3JkVmFsaWRhdG9yID0gbm9kKHtcbiAgICAgICAgICAgIHN1Ym1pdDogJChgJHtuZXdQYXNzd29yZEZvcm19IGlucHV0W3R5cGU9XCJzdWJtaXRcIl1gKSxcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IHBhc3N3b3JkU2VsZWN0b3IgPSAkKGAke25ld1Bhc3N3b3JkRm9ybX0gaW5wdXRbbmFtZT1cInBhc3N3b3JkXCJdYCk7XG4gICAgICAgIGNvbnN0IHBhc3N3b3JkMlNlbGVjdG9yID0gJChgJHtuZXdQYXNzd29yZEZvcm19IGlucHV0W25hbWU9XCJwYXNzd29yZF9jb25maXJtXCJdYCk7XG5cbiAgICAgICAgVmFsaWRhdG9ycy5zZXRQYXNzd29yZFZhbGlkYXRpb24oXG4gICAgICAgICAgICBuZXdQYXNzd29yZFZhbGlkYXRvcixcbiAgICAgICAgICAgIHBhc3N3b3JkU2VsZWN0b3IsXG4gICAgICAgICAgICBwYXNzd29yZDJTZWxlY3RvcixcbiAgICAgICAgICAgIHRoaXMucGFzc3dvcmRSZXF1aXJlbWVudHMsXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJDcmVhdGVBY2NvdW50VmFsaWRhdG9yKCRjcmVhdGVBY2NvdW50Rm9ybSkge1xuICAgICAgICBjb25zdCB2YWxpZGF0aW9uTW9kZWwgPSB2YWxpZGF0aW9uKCRjcmVhdGVBY2NvdW50Rm9ybSk7XG4gICAgICAgIGNvbnN0IGNyZWF0ZUFjY291bnRWYWxpZGF0b3IgPSBub2Qoe1xuICAgICAgICAgICAgc3VibWl0OiBgJHt0aGlzLmZvcm1DcmVhdGVTZWxlY3Rvcn0gaW5wdXRbdHlwZT0nc3VibWl0J11gLFxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgJHN0YXRlRWxlbWVudCA9ICQoJ1tkYXRhLWZpZWxkLXR5cGU9XCJTdGF0ZVwiXScpO1xuICAgICAgICBjb25zdCBlbWFpbFNlbGVjdG9yID0gYCR7dGhpcy5mb3JtQ3JlYXRlU2VsZWN0b3J9IFtkYXRhLWZpZWxkLXR5cGU9J0VtYWlsQWRkcmVzcyddYDtcbiAgICAgICAgY29uc3QgJGVtYWlsRWxlbWVudCA9ICQoZW1haWxTZWxlY3Rvcik7XG4gICAgICAgIGNvbnN0IHBhc3N3b3JkU2VsZWN0b3IgPSBgJHt0aGlzLmZvcm1DcmVhdGVTZWxlY3Rvcn0gW2RhdGEtZmllbGQtdHlwZT0nUGFzc3dvcmQnXWA7XG4gICAgICAgIGNvbnN0ICRwYXNzd29yZEVsZW1lbnQgPSAkKHBhc3N3b3JkU2VsZWN0b3IpO1xuICAgICAgICBjb25zdCBwYXNzd29yZDJTZWxlY3RvciA9IGAke3RoaXMuZm9ybUNyZWF0ZVNlbGVjdG9yfSBbZGF0YS1maWVsZC10eXBlPSdDb25maXJtUGFzc3dvcmQnXWA7XG4gICAgICAgIGNvbnN0ICRwYXNzd29yZDJFbGVtZW50ID0gJChwYXNzd29yZDJTZWxlY3Rvcik7XG5cbiAgICAgICAgY3JlYXRlQWNjb3VudFZhbGlkYXRvci5hZGQodmFsaWRhdGlvbk1vZGVsKTtcblxuICAgICAgICBpZiAoJHN0YXRlRWxlbWVudCkge1xuICAgICAgICAgICAgbGV0ICRsYXN0O1xuXG4gICAgICAgICAgICAvLyBSZXF1ZXN0cyB0aGUgc3RhdGVzIGZvciBhIGNvdW50cnkgd2l0aCBBSkFYXG4gICAgICAgICAgICBzdGF0ZUNvdW50cnkoJHN0YXRlRWxlbWVudCwgdGhpcy5jb250ZXh0LCAoZXJyLCBmaWVsZCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY29uc3QgJGZpZWxkID0gJChmaWVsZCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoY3JlYXRlQWNjb3VudFZhbGlkYXRvci5nZXRTdGF0dXMoJHN0YXRlRWxlbWVudCkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZUFjY291bnRWYWxpZGF0b3IucmVtb3ZlKCRzdGF0ZUVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICgkbGFzdCkge1xuICAgICAgICAgICAgICAgICAgICBjcmVhdGVBY2NvdW50VmFsaWRhdG9yLnJlbW92ZSgkbGFzdCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCRmaWVsZC5pcygnc2VsZWN0JykpIHtcbiAgICAgICAgICAgICAgICAgICAgJGxhc3QgPSBmaWVsZDtcbiAgICAgICAgICAgICAgICAgICAgVmFsaWRhdG9ycy5zZXRTdGF0ZUNvdW50cnlWYWxpZGF0aW9uKGNyZWF0ZUFjY291bnRWYWxpZGF0b3IsIGZpZWxkKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBWYWxpZGF0b3JzLmNsZWFuVXBTdGF0ZVZhbGlkYXRpb24oZmllbGQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCRlbWFpbEVsZW1lbnQpIHtcbiAgICAgICAgICAgIGNyZWF0ZUFjY291bnRWYWxpZGF0b3IucmVtb3ZlKGVtYWlsU2VsZWN0b3IpO1xuICAgICAgICAgICAgVmFsaWRhdG9ycy5zZXRFbWFpbFZhbGlkYXRpb24oY3JlYXRlQWNjb3VudFZhbGlkYXRvciwgZW1haWxTZWxlY3Rvcik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoJHBhc3N3b3JkRWxlbWVudCAmJiAkcGFzc3dvcmQyRWxlbWVudCkge1xuICAgICAgICAgICAgY3JlYXRlQWNjb3VudFZhbGlkYXRvci5yZW1vdmUocGFzc3dvcmRTZWxlY3Rvcik7XG4gICAgICAgICAgICBjcmVhdGVBY2NvdW50VmFsaWRhdG9yLnJlbW92ZShwYXNzd29yZDJTZWxlY3Rvcik7XG4gICAgICAgICAgICBWYWxpZGF0b3JzLnNldFBhc3N3b3JkVmFsaWRhdGlvbihcbiAgICAgICAgICAgICAgICBjcmVhdGVBY2NvdW50VmFsaWRhdG9yLFxuICAgICAgICAgICAgICAgIHBhc3N3b3JkU2VsZWN0b3IsXG4gICAgICAgICAgICAgICAgcGFzc3dvcmQyU2VsZWN0b3IsXG4gICAgICAgICAgICAgICAgdGhpcy5wYXNzd29yZFJlcXVpcmVtZW50cyxcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICAkY3JlYXRlQWNjb3VudEZvcm0ub24oJ3N1Ym1pdCcsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGNyZWF0ZUFjY291bnRWYWxpZGF0b3IucGVyZm9ybUNoZWNrKCk7XG5cbiAgICAgICAgICAgIGlmIChjcmVhdGVBY2NvdW50VmFsaWRhdG9yLmFyZUFsbCgndmFsaWQnKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVxdWVzdCBpcyBtYWRlIGluIHRoaXMgZnVuY3Rpb24gdG8gdGhlIHJlbW90ZSBlbmRwb2ludCBhbmQgcHVsbHMgYmFjayB0aGUgc3RhdGVzIGZvciBjb3VudHJ5LlxuICAgICAqL1xuICAgIG9uUmVhZHkoKSB7XG4gICAgICAgIGNvbnN0ICRjcmVhdGVBY2NvdW50Rm9ybSA9IGNsYXNzaWZ5Rm9ybSh0aGlzLmZvcm1DcmVhdGVTZWxlY3Rvcik7XG4gICAgICAgIGNvbnN0ICRsb2dpbkZvcm0gPSBjbGFzc2lmeUZvcm0oJy5sb2dpbi1mb3JtJyk7XG4gICAgICAgIGNvbnN0ICRmb3Jnb3RQYXNzd29yZEZvcm0gPSBjbGFzc2lmeUZvcm0oJy5mb3Jnb3QtcGFzc3dvcmQtZm9ybScpO1xuICAgICAgICBjb25zdCAkbmV3UGFzc3dvcmRGb3JtID0gY2xhc3NpZnlGb3JtKCcubmV3LXBhc3N3b3JkLWZvcm0nKTsgLy8gcmVzZXQgcGFzc3dvcmRcblxuICAgICAgICAvLyBJbmplY3RlZCB2aWEgYXV0aC5odG1sXG4gICAgICAgIHRoaXMucGFzc3dvcmRSZXF1aXJlbWVudHMgPSB0aGlzLmNvbnRleHQucGFzc3dvcmRSZXF1aXJlbWVudHM7XG5cbiAgICAgICAgaWYgKCRsb2dpbkZvcm0ubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLnJlZ2lzdGVyTG9naW5WYWxpZGF0aW9uKCRsb2dpbkZvcm0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCRuZXdQYXNzd29yZEZvcm0ubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLnJlZ2lzdGVyTmV3UGFzc3dvcmRWYWxpZGF0aW9uKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoJGZvcmdvdFBhc3N3b3JkRm9ybS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJGb3Jnb3RQYXNzd29yZFZhbGlkYXRpb24oJGZvcmdvdFBhc3N3b3JkRm9ybSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoJGNyZWF0ZUFjY291bnRGb3JtLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5yZWdpc3RlckNyZWF0ZUFjY291bnRWYWxpZGF0b3IoJGNyZWF0ZUFjY291bnRGb3JtKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8qKlxuICogVmFsaWRhdGUgdGhhdCB0aGUgZ2l2ZW4gZGF0ZSBmb3IgdGhlIGRheS9tb250aC95ZWFyIHNlbGVjdCBpbnB1dHMgaXMgd2l0aGluIHBvdGVudGlhbCByYW5nZVxuICogQHBhcmFtICRmb3JtRmllbGRcbiAqIEBwYXJhbSB2YWxpZGF0aW9uXG4gKiBAcmV0dXJucyB7e3NlbGVjdG9yOiBzdHJpbmcsIHRyaWdnZXJlZEJ5OiBzdHJpbmcsIHZhbGlkYXRlOiBGdW5jdGlvbiwgZXJyb3JNZXNzYWdlOiBzdHJpbmd9fVxuICovXG5mdW5jdGlvbiBidWlsZERhdGVWYWxpZGF0aW9uKCRmb3JtRmllbGQsIHZhbGlkYXRpb24pIHtcbiAgICAvLyBObyBkYXRlIHJhbmdlIHJlc3RyaWN0aW9uLCBza2lwXG4gICAgaWYgKHZhbGlkYXRpb24ubWluX2RhdGUgJiYgdmFsaWRhdGlvbi5tYXhfZGF0ZSkge1xuICAgICAgICBjb25zdCBpbnZhbGlkTWVzc2FnZSA9IGBZb3VyIGNob3NlbiBkYXRlIG11c3QgZmFsbCBiZXR3ZWVuICR7dmFsaWRhdGlvbi5taW5fZGF0ZX0gYW5kICR7dmFsaWRhdGlvbi5tYXhfZGF0ZX0uYDtcbiAgICAgICAgY29uc3QgZm9ybUVsZW1lbnRJZCA9ICRmb3JtRmllbGQuYXR0cignaWQnKTtcbiAgICAgICAgY29uc3QgbWluU3BsaXQgPSB2YWxpZGF0aW9uLm1pbl9kYXRlLnNwbGl0KCctJyk7XG4gICAgICAgIGNvbnN0IG1heFNwbGl0ID0gdmFsaWRhdGlvbi5tYXhfZGF0ZS5zcGxpdCgnLScpO1xuICAgICAgICBjb25zdCBtaW5EYXRlID0gbmV3IERhdGUobWluU3BsaXRbMF0sIG1pblNwbGl0WzFdIC0gMSwgbWluU3BsaXRbMl0pO1xuICAgICAgICBjb25zdCBtYXhEYXRlID0gbmV3IERhdGUobWF4U3BsaXRbMF0sIG1heFNwbGl0WzFdIC0gMSwgbWF4U3BsaXRbMl0pO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzZWxlY3RvcjogYCMke2Zvcm1FbGVtZW50SWR9IHNlbGVjdFtkYXRhLWxhYmVsPVwieWVhclwiXWAsXG4gICAgICAgICAgICB0cmlnZ2VyZWRCeTogYCMke2Zvcm1FbGVtZW50SWR9IHNlbGVjdDpub3QoW2RhdGEtbGFiZWw9XCJ5ZWFyXCJdKWAsXG4gICAgICAgICAgICB2YWxpZGF0ZTogKGNiLCB2YWwpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXkgPSBOdW1iZXIoJGZvcm1GaWVsZC5maW5kKCdzZWxlY3RbZGF0YS1sYWJlbD1cImRheVwiXScpLnZhbCgpKTtcbiAgICAgICAgICAgICAgICBjb25zdCBtb250aCA9IE51bWJlcigkZm9ybUZpZWxkLmZpbmQoJ3NlbGVjdFtkYXRhLWxhYmVsPVwibW9udGhcIl0nKS52YWwoKSkgLSAxO1xuICAgICAgICAgICAgICAgIGNvbnN0IHllYXIgPSBOdW1iZXIodmFsKTtcbiAgICAgICAgICAgICAgICBjb25zdCBjaG9zZW5EYXRlID0gbmV3IERhdGUoeWVhciwgbW9udGgsIGRheSk7XG5cbiAgICAgICAgICAgICAgICBjYihjaG9zZW5EYXRlID49IG1pbkRhdGUgJiYgY2hvc2VuRGF0ZSA8PSBtYXhEYXRlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvck1lc3NhZ2U6IGludmFsaWRNZXNzYWdlLFxuICAgICAgICB9O1xuICAgIH1cbn1cblxuLyoqXG4gKiBXZSB2YWxpZGF0ZSBjaGVja2JveGVzIHNlcGFyYXRlbHkgZnJvbSBzaW5nbGUgaW5wdXQgZmllbGRzLCBhcyB0aGV5IG11c3QgaGF2ZSBhdCBsZWFzdCBvbmUgY2hlY2tlZCBvcHRpb25cbiAqIGZyb20gbWFueSBkaWZmZXJlbnQgaW5wdXRzXG4gKiBAcGFyYW0gJGZvcm1GaWVsZFxuICogQHBhcmFtIHZhbGlkYXRpb25cbiAqL1xuZnVuY3Rpb24gYnVpbGRSZXF1aXJlZENoZWNrYm94VmFsaWRhdGlvbigkZm9ybUZpZWxkLCB2YWxpZGF0aW9uKSB7XG4gICAgY29uc3QgZm9ybUZpZWxkSWQgPSAkZm9ybUZpZWxkLmF0dHIoJ2lkJyk7XG4gICAgY29uc3QgcHJpbWFyeVNlbGVjdG9yID0gYCMke2Zvcm1GaWVsZElkfSBpbnB1dDpmaXJzdC1vZi10eXBlYDtcbiAgICBjb25zdCBzZWNvbmRhcnlTZWxlY3RvciA9IGAjJHtmb3JtRmllbGRJZH0gaW5wdXRgO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2VsZWN0b3I6IHByaW1hcnlTZWxlY3RvcixcbiAgICAgICAgdHJpZ2dlcmVkQnk6IHNlY29uZGFyeVNlbGVjdG9yLFxuICAgICAgICB2YWxpZGF0ZTogKGNiKSA9PiB7XG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gZmFsc2U7XG5cbiAgICAgICAgICAgICQoc2Vjb25kYXJ5U2VsZWN0b3IpLmVhY2goKGluZGV4LCBjaGVja2JveCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChjaGVja2JveC5jaGVja2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBjYihyZXN1bHQpO1xuICAgICAgICB9LFxuICAgICAgICBlcnJvck1lc3NhZ2U6IGBUaGUgJyR7dmFsaWRhdGlvbi5sYWJlbH0nIGZpZWxkIGNhbm5vdCBiZSBibGFuay5gLFxuICAgIH07XG59XG5cbmZ1bmN0aW9uIGJ1aWxkUmVxdWlyZWRWYWxpZGF0aW9uKHZhbGlkYXRpb24sIHNlbGVjdG9yKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2VsZWN0b3IsXG4gICAgICAgIHZhbGlkYXRlKGNiLCB2YWwpIHtcbiAgICAgICAgICAgIGNiKHZhbC5sZW5ndGggPiAwKTtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3JNZXNzYWdlOiBgVGhlICcke3ZhbGlkYXRpb24ubGFiZWx9JyBmaWVsZCBjYW5ub3QgYmUgYmxhbmsuYCxcbiAgICB9O1xufVxuXG5mdW5jdGlvbiBidWlsZE51bWJlclJhbmdlVmFsaWRhdGlvbih2YWxpZGF0aW9uLCBmb3JtRmllbGRTZWxlY3Rvcikge1xuICAgIGNvbnN0IGludmFsaWRNZXNzYWdlID0gYFRoZSB2YWx1ZSBmb3IgJHt2YWxpZGF0aW9uLmxhYmVsfSBtdXN0IGJlIGJldHdlZW4gJHt2YWxpZGF0aW9uLm1pbn0gYW5kICR7dmFsaWRhdGlvbi5tYXh9LmA7XG4gICAgY29uc3QgbWluID0gTnVtYmVyKHZhbGlkYXRpb24ubWluKTtcbiAgICBjb25zdCBtYXggPSBOdW1iZXIodmFsaWRhdGlvbi5tYXgpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2VsZWN0b3I6IGAke2Zvcm1GaWVsZFNlbGVjdG9yfSBpbnB1dFtuYW1lPVwiJHt2YWxpZGF0aW9uLm5hbWV9XCJdYCxcbiAgICAgICAgdmFsaWRhdGU6IChjYiwgdmFsKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBudW1iZXJWYWwgPSBOdW1iZXIodmFsKTtcblxuICAgICAgICAgICAgY2IobnVtYmVyVmFsID49IG1pbiAmJiBudW1iZXJWYWwgPD0gbWF4KTtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3JNZXNzYWdlOiBpbnZhbGlkTWVzc2FnZSxcbiAgICB9O1xufVxuXG5cbmZ1bmN0aW9uIGJ1aWxkVmFsaWRhdGlvbigkdmFsaWRhdGVhYmxlRWxlbWVudCkge1xuICAgIGNvbnN0IHZhbGlkYXRpb24gPSAkdmFsaWRhdGVhYmxlRWxlbWVudC5kYXRhKCd2YWxpZGF0aW9uJyk7XG4gICAgY29uc3QgZmllbGRWYWxpZGF0aW9ucyA9IFtdO1xuICAgIGNvbnN0IGZvcm1GaWVsZFNlbGVjdG9yID0gYCMkeyR2YWxpZGF0ZWFibGVFbGVtZW50LmF0dHIoJ2lkJyl9YDtcblxuICAgIGlmICh2YWxpZGF0aW9uLnR5cGUgPT09ICdkYXRlY2hvb3NlcicpIHtcbiAgICAgICAgY29uc3QgZGF0ZVZhbGlkYXRpb24gPSBidWlsZERhdGVWYWxpZGF0aW9uKCR2YWxpZGF0ZWFibGVFbGVtZW50LCB2YWxpZGF0aW9uKTtcblxuICAgICAgICBpZiAoZGF0ZVZhbGlkYXRpb24pIHtcbiAgICAgICAgICAgIGZpZWxkVmFsaWRhdGlvbnMucHVzaChkYXRlVmFsaWRhdGlvbik7XG4gICAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHZhbGlkYXRpb24ucmVxdWlyZWQgJiYgKHZhbGlkYXRpb24udHlwZSA9PT0gJ2NoZWNrYm94c2VsZWN0JyB8fCB2YWxpZGF0aW9uLnR5cGUgPT09ICdyYWRpb3NlbGVjdCcpKSB7XG4gICAgICAgIGZpZWxkVmFsaWRhdGlvbnMucHVzaChidWlsZFJlcXVpcmVkQ2hlY2tib3hWYWxpZGF0aW9uKCR2YWxpZGF0ZWFibGVFbGVtZW50LCB2YWxpZGF0aW9uKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgJHZhbGlkYXRlYWJsZUVsZW1lbnQuZmluZCgnaW5wdXQsIHNlbGVjdCwgdGV4dGFyZWEnKS5lYWNoKChpbmRleCwgZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgJGlucHV0RWxlbWVudCA9ICQoZWxlbWVudCk7XG4gICAgICAgICAgICBjb25zdCB0YWdOYW1lID0gJGlucHV0RWxlbWVudC5nZXQoMCkudGFnTmFtZTtcbiAgICAgICAgICAgIGNvbnN0IGlucHV0TmFtZSA9ICRpbnB1dEVsZW1lbnQuYXR0cignbmFtZScpO1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudFNlbGVjdG9yID0gYCR7Zm9ybUZpZWxkU2VsZWN0b3J9ICR7dGFnTmFtZX1bbmFtZT1cIiR7aW5wdXROYW1lfVwiXWA7XG5cbiAgICAgICAgICAgIGlmICh2YWxpZGF0aW9uLnR5cGUgPT09ICdudW1iZXJvbmx5Jykge1xuICAgICAgICAgICAgICAgIGZpZWxkVmFsaWRhdGlvbnMucHVzaChidWlsZE51bWJlclJhbmdlVmFsaWRhdGlvbih2YWxpZGF0aW9uLCBmb3JtRmllbGRTZWxlY3RvcikpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHZhbGlkYXRpb24ucmVxdWlyZWQpIHtcbiAgICAgICAgICAgICAgICBmaWVsZFZhbGlkYXRpb25zLnB1c2goYnVpbGRSZXF1aXJlZFZhbGlkYXRpb24odmFsaWRhdGlvbiwgZWxlbWVudFNlbGVjdG9yKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBmaWVsZFZhbGlkYXRpb25zO1xufVxuXG4vKipcbiAqIEJ1aWxkcyB0aGUgdmFsaWRhdGlvbiBtb2RlbCBmb3IgZHluYW1pYyBmb3Jtc1xuICogQHBhcmFtICRmb3JtXG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgkZm9ybSkge1xuICAgIGxldCB2YWxpZGF0aW9uc1RvUGVyZm9ybSA9IFtdO1xuXG4gICAgJGZvcm0uZmluZCgnW2RhdGEtdmFsaWRhdGlvbl0nKS5lYWNoKChpbmRleCwgaW5wdXQpID0+IHtcbiAgICAgICAgdmFsaWRhdGlvbnNUb1BlcmZvcm0gPSB2YWxpZGF0aW9uc1RvUGVyZm9ybS5jb25jYXQoYnVpbGRWYWxpZGF0aW9uKCQoaW5wdXQpKSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdmFsaWRhdGlvbnNUb1BlcmZvcm07XG59XG4iXSwic291cmNlUm9vdCI6IiJ9