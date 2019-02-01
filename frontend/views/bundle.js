"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactDom = require("react-dom");

var _reactRedux = require("react-redux");

var _configureStore = _interopRequireDefault(require("./redux/configureStore"));

var _app = _interopRequireDefault(require("./components/app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Create a fresh store 
var store = (0, _configureStore.default)();
(0, _reactDom.render)(_react.default.createElement(_reactRedux.Provider, {
  store: store
}, _react.default.createElement(_app.default, null)), document.querySelector('#app'));