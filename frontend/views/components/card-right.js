"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _title = _interopRequireDefault(require("./title"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var tweet = require('./tweet');

var CardRight =
/*#__PURE__*/
function (_Component) {
  _inherits(CardRight, _Component);

  function CardRight() {
    _classCallCheck(this, CardRight);

    return _possibleConstructorReturn(this, _getPrototypeOf(CardRight).apply(this, arguments));
  }

  _createClass(CardRight, [{
    key: "render",
    value: function render() {
      var _this = this;

      return _react.default.createElement("div", {
        className: "col-right"
      }, _react.default.createElement("div", {
        className: "app-meta"
      }, _react.default.createElement(_title.default, {
        name: this.props.name,
        publisher: this.props.app.publisher
      }), _react.default.createElement("span", {
        className: "app-lic"
      }, this.props.app.price)), _react.default.createElement("div", {
        className: "app-intro",
        dangerouslySetInnerHTML: {
          __html: this.props.app.desc
        }
      }), _react.default.createElement("hr", null), _react.default.createElement("div", {
        className: "app-link"
      }, _react.default.createElement("a", {
        className: "btn",
        href: this.props.app.link,
        target: "_blank"
      }, "Get App"), _react.default.createElement("a", {
        href: "#/",
        className: "btn btn-twitter",
        title: "Share on Twitter",
        rel: "nofollow",
        onClick: function onClick(e) {
          tweet(_this.props.app.tweet);
          e.preventDefault();
        }
      }, _react.default.createElement("i", {
        className: "icon icon-inline icon-twitter-light "
      }), "Tweet")));
    }
  }]);

  return CardRight;
}(_react.Component);

var _default = CardRight;
exports.default = _default;