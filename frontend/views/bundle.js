"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactDom = require("react-dom");

var _reactRedux = require("react-redux");

var _configureStore = _interopRequireDefault(require("./redux/configureStore"));

var _App = _interopRequireDefault(require("./components/App"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Create a fresh store
var store = (0, _configureStore.default)();
(0, _reactDom.render)(_react.default.createElement(_reactRedux.Provider, {
  store: store
}, _react.default.createElement(_App.default, null)), document.querySelector('#app'));