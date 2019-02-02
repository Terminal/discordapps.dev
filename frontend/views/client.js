"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactDom = require("react-dom");

var _reactRedux = require("react-redux");

var _configureStore = _interopRequireDefault(require("./redux/configureStore"));

var _App = _interopRequireDefault(require("./components/App"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Read the state sent with markup
var state = window.__STATE__; // delete the state from global window object

delete window.__STATE__; // reproduce the store used to render the page on server

var store = (0, _configureStore.default)(state);
/**
 * hydrate the page to make sure both server and client
 * side pages are identical. This includes markup checking,
 * react comments to identify elements and more.
 */

(0, _reactDom.hydrate)(_react.default.createElement(_reactRedux.Provider, {
  store: store
}, _react.default.createElement(_App.default, null)), document.querySelector('#app'));