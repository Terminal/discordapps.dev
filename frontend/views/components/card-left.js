"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var CardLeft =
/*#__PURE__*/
function (_Component) {
  _inherits(CardLeft, _Component);

  function CardLeft() {
    _classCallCheck(this, CardLeft);

    return _possibleConstructorReturn(this, _getPrototypeOf(CardLeft).apply(this, arguments));
  }

  _createClass(CardLeft, [{
    key: "numbersLeadingZero",
    value: function numbersLeadingZero(props) {
      var count = 0; // Append the leading zero (0) before the app number 

      count = ('0' + props.appno).slice(-2);
      return _react.default.createElement("span", {
        className: props.withclass
      }, count);
    }
  }, {
    key: "render",
    value: function render() {
      return _react.default.createElement("div", {
        className: "col-left"
      }, _react.default.createElement("div", {
        className: "app-no"
      }, _react.default.createElement(this.numbersLeadingZero, {
        appno: this.props.appno,
        withclass: "current"
      }), _react.default.createElement("span", {
        className: "connector"
      }, "of "), _react.default.createElement("br", null), _react.default.createElement(this.numbersLeadingZero, {
        appno: this.props.totalapps,
        withclass: "total"
      })), _react.default.createElement("img", {
        className: "app-icon",
        src: this.props.img.src,
        alt: this.props.img.alt,
        height: "120",
        width: "120"
      }));
    }
  }]);

  return CardLeft;
}(_react.Component);

var _default = CardLeft;
exports.default = _default;