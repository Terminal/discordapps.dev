// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"uTwd":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const Locations = {
  server: 'https://api.discordapps.dev',
  // server: 'http://127.0.0.1:8000',
  cdn: 'https://api.discordapps.dev',
  domain: 'https://discordapps.dev',
  docsServer: 'https://docs.discordapps.dev',
  // docsServer: 'http://127.0.0.1:8080',
  logo: 'https://api.discordapps.dev/img/logo/logo.svg',
  favicon: 'https://api.discordapps.dev/img/logo/logo32.png',
  sourceCode: 'https://github.com/Terminal/discordapps.dev',
  sourceDependencies: 'https://github.com/Terminal/discordapps.dev/network/dependencies',
  sourceLicence: 'https://github.com/Terminal/discordapps.dev/blob/ls14/LICENCE',
  sourceIssues: 'https://github.com/Terminal/discordapps.dev/issues',
  sourceTranslations: 'https://github.com/Terminal/discordapps.dev/tree/ls14/src/locales',
  sourceReleases: 'https://github.com/Terminal/discordapps.dev/releases',
  wiki: '/posts',
  tutorials: '/posts',
  termsAndConditions: '/posts/docs/terms',
  terminalInk: 'https://terminal.ink',
  discordServer: 'https://discord.gg/8uC6aKZ',
  add: 'https://github.com/Terminal/discordapps.dev/wiki#share-your-creation'
};
var _default = Locations;
exports.default = _default;
},{}],"W70x":[function(require,module,exports) {
module.exports = {
  "image": "_image_5c4c2",
  "loaded": "_loaded_5c4c2"
};
},{}],"SwhA":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const ConstructCSS = (...args) => args.filter(argument => argument) // Get arguments that are truthy
.join(' ');

var _default = ConstructCSS;
exports.default = _default;
},{}],"ofRo":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _indexModule = _interopRequireDefault(require("./index.module.scss"));

var _ConstructCSS = _interopRequireDefault(require("../../helpers/ConstructCSS"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

class LazyImage extends _react.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
    this.load = this.load.bind(this);
    this.image = _react.default.createRef();
  }

  load() {
    this.setState({
      loaded: true
    });
  }

  render() {
    const loaded = typeof window === 'undefined' || this.state.loaded;
    return _react.default.createElement("img", _extends({}, this.props, {
      src: this.props.src,
      className: (0, _ConstructCSS.default)(_indexModule.default.image, loaded && _indexModule.default.loaded, this.props.className),
      alt: this.props.alt,
      ref: this.image,
      onLoad: this.load
    }));
  }

}

var _default = LazyImage;
exports.default = _default;
},{"./index.module.scss":"W70x","../../helpers/ConstructCSS":"SwhA"}],"oAcg":[function(require,module,exports) {
module.exports = {
  "background": "_background_d5fda"
};
},{}],"TxHF":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _LazyImage = _interopRequireDefault(require("../LazyImage"));

var _indexModule = _interopRequireDefault(require("./index.module.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

class WebsiteBackgroundImage extends _react.Component {
  render() {
    return _react.default.createElement(_LazyImage.default, {
      src: this.props.src,
      className: _indexModule.default.background
    });
  }

}

var _default = WebsiteBackgroundImage;
exports.default = _default;
},{"../LazyImage":"ofRo","./index.module.scss":"oAcg"}],"H2cc":[function(require,module,exports) {
module.exports = {
  "markdown-container": "_markdown-container_49062",
  "pl-c": "_pl-c_49062",
  "pl-c1": "_pl-c1_49062",
  "pl-s": "_pl-s_49062",
  "pl-v": "_pl-v_49062",
  "pl-e": "_pl-e_49062",
  "pl-en": "_pl-en_49062",
  "pl-smi": "_pl-smi_49062",
  "pl-s1": "_pl-s1_49062",
  "pl-ent": "_pl-ent_49062",
  "pl-k": "_pl-k_49062",
  "pl-pds": "_pl-pds_49062",
  "pl-pse": "_pl-pse_49062",
  "pl-sr": "_pl-sr_49062",
  "pl-cce": "_pl-cce_49062",
  "pl-sre": "_pl-sre_49062",
  "pl-sra": "_pl-sra_49062",
  "pl-smw": "_pl-smw_49062",
  "pl-bu": "_pl-bu_49062",
  "pl-ii": "_pl-ii_49062",
  "pl-c2": "_pl-c2_49062",
  "pl-ml": "_pl-ml_49062",
  "pl-mh": "_pl-mh_49062",
  "pl-ms": "_pl-ms_49062",
  "pl-mi": "_pl-mi_49062",
  "pl-mb": "_pl-mb_49062",
  "pl-md": "_pl-md_49062",
  "pl-mi1": "_pl-mi1_49062",
  "pl-mc": "_pl-mc_49062",
  "pl-mi2": "_pl-mi2_49062",
  "pl-mdr": "_pl-mdr_49062",
  "pl-ba": "_pl-ba_49062",
  "pl-sg": "_pl-sg_49062",
  "pl-corl": "_pl-corl_49062",
  "octicon": "_octicon_49062",
  "pl-0": "_pl-0_49062",
  "pl-1": "_pl-1_49062",
  "pl-2": "_pl-2_49062",
  "pl-3": "_pl-3_49062",
  "pl-4": "_pl-4_49062",
  "pl-5": "_pl-5_49062",
  "pl-6": "_pl-6_49062",
  "anchor": "_anchor_49062",
  "octicon-link": "_octicon-link_49062",
  "highlight": "_highlight_49062",
  "err": "_err_49062",
  "w": "_w_49062",
  "c": "_c_49062",
  "cd": "_cd_49062",
  "cm": "_cm_49062",
  "c1": "_c1_49062",
  "cs": "_cs_49062",
  "cp": "_cp_49062",
  "nt": "_nt_49062",
  "o": "_o_49062",
  "ow": "_ow_49062",
  "p": "_p_49062",
  "pi": "_pi_49062",
  "gi": "_gi_49062",
  "gd": "_gd_49062",
  "gh": "_gh_49062",
  "k": "_k_49062",
  "kn": "_kn_49062",
  "kp": "_kp_49062",
  "kr": "_kr_49062",
  "kv": "_kv_49062",
  "kc": "_kc_49062",
  "kt": "_kt_49062",
  "kd": "_kd_49062",
  "s": "_s_49062",
  "sb": "_sb_49062",
  "sc": "_sc_49062",
  "sd": "_sd_49062",
  "s2": "_s2_49062",
  "sh": "_sh_49062",
  "sx": "_sx_49062",
  "s1": "_s1_49062",
  "sr": "_sr_49062",
  "si": "_si_49062",
  "se": "_se_49062",
  "nn": "_nn_49062",
  "nc": "_nc_49062",
  "no": "_no_49062",
  "na": "_na_49062",
  "m": "_m_49062",
  "mf": "_mf_49062",
  "mh": "_mh_49062",
  "mi": "_mi_49062",
  "il": "_il_49062",
  "mo": "_mo_49062",
  "mb": "_mb_49062",
  "mx": "_mx_49062",
  "ss": "_ss_49062",
  "highlighter-rouge": "_highlighter-rouge_49062",
  "full-commit": "_full-commit_49062",
  "btn-outline": "_btn-outline_49062",
  "radio-label": "_radio-label_49062",
  "task-list-item": "_task-list-item_49062",
  "arrow": "_arrow_49062",
  "fading": "_fading_49062",
  "arrow--scrolled": "_arrow--scrolled_49062",
  "bounce": "_bounce_49062",
  "buttons": "_buttons_49062",
  "btn": "_btn_49062",
  "alizarin": "_alizarin_49062",
  "amethyst": "_amethyst_49062",
  "asbestos": "_asbestos_49062",
  "belize-hole": "_belize-hole_49062",
  "black": "_black_49062",
  "carrot": "_carrot_49062",
  "clouds": "_clouds_49062",
  "concrete": "_concrete_49062",
  "cubered": "_cubered_49062",
  "dark": "_dark_49062",
  "emerald": "_emerald_49062",
  "gold": "_gold_49062",
  "green-sea": "_green-sea_49062",
  "light": "_light_49062",
  "midnight-blue": "_midnight-blue_49062",
  "nephritis": "_nephritis_49062",
  "orange": "_orange_49062",
  "peach": "_peach_49062",
  "peter-river": "_peter-river_49062",
  "pomegranate": "_pomegranate_49062",
  "primary": "_primary_49062",
  "pumpkin": "_pumpkin_49062",
  "raw-purple": "_raw-purple_49062",
  "secondary": "_secondary_49062",
  "silver": "_silver_49062",
  "sun-flower": "_sun-flower_49062",
  "transparent": "_transparent_49062",
  "turquoise": "_turquoise_49062",
  "wet-asphalt": "_wet-asphalt_49062",
  "white": "_white_49062",
  "wisteria": "_wisteria_49062",
  "deviantart": "_deviantart_49062",
  "discord": "_discord_49062",
  "facebook": "_facebook_49062",
  "github": "_github_49062",
  "google": "_google_49062",
  "googleplus": "_googleplus_49062",
  "instagram": "_instagram_49062",
  "linkedin": "_linkedin_49062",
  "patreon": "_patreon_49062",
  "paypal": "_paypal_49062",
  "pinterest": "_pinterest_49062",
  "reddit": "_reddit_49062",
  "skype": "_skype_49062",
  "slack": "_slack_49062",
  "snapchat": "_snapchat_49062",
  "soundcloud": "_soundcloud_49062",
  "spotify": "_spotify_49062",
  "steam": "_steam_49062",
  "telegram": "_telegram_49062",
  "tumblr": "_tumblr_49062",
  "twitch": "_twitch_49062",
  "twitter": "_twitter_49062",
  "viber": "_viber_49062",
  "whatsapp": "_whatsapp_49062",
  "youtube": "_youtube_49062",
  "alizarin-border": "_alizarin-border_49062",
  "alizarin-border-nodark": "_alizarin-border-nodark_49062",
  "alizarin-nodark": "_alizarin-nodark_49062",
  "alizarin-flat": "_alizarin-flat_49062",
  "alizarin-flat-nodark": "_alizarin-flat-nodark_49062",
  "amethyst-border": "_amethyst-border_49062",
  "amethyst-border-nodark": "_amethyst-border-nodark_49062",
  "amethyst-nodark": "_amethyst-nodark_49062",
  "amethyst-flat": "_amethyst-flat_49062",
  "amethyst-flat-nodark": "_amethyst-flat-nodark_49062",
  "asbestos-border": "_asbestos-border_49062",
  "asbestos-border-nodark": "_asbestos-border-nodark_49062",
  "asbestos-nodark": "_asbestos-nodark_49062",
  "asbestos-flat": "_asbestos-flat_49062",
  "asbestos-flat-nodark": "_asbestos-flat-nodark_49062",
  "belize-hole-border": "_belize-hole-border_49062",
  "belize-hole-border-nodark": "_belize-hole-border-nodark_49062",
  "belize-hole-nodark": "_belize-hole-nodark_49062",
  "belize-hole-flat": "_belize-hole-flat_49062",
  "belize-hole-flat-nodark": "_belize-hole-flat-nodark_49062",
  "black-border": "_black-border_49062",
  "black-border-nodark": "_black-border-nodark_49062",
  "black-nodark": "_black-nodark_49062",
  "black-flat": "_black-flat_49062",
  "black-flat-nodark": "_black-flat-nodark_49062",
  "carrot-border": "_carrot-border_49062",
  "carrot-border-nodark": "_carrot-border-nodark_49062",
  "carrot-nodark": "_carrot-nodark_49062",
  "carrot-flat": "_carrot-flat_49062",
  "carrot-flat-nodark": "_carrot-flat-nodark_49062",
  "clouds-border": "_clouds-border_49062",
  "clouds-border-nodark": "_clouds-border-nodark_49062",
  "clouds-nodark": "_clouds-nodark_49062",
  "clouds-flat": "_clouds-flat_49062",
  "clouds-flat-nodark": "_clouds-flat-nodark_49062",
  "concrete-border": "_concrete-border_49062",
  "concrete-border-nodark": "_concrete-border-nodark_49062",
  "concrete-nodark": "_concrete-nodark_49062",
  "concrete-flat": "_concrete-flat_49062",
  "concrete-flat-nodark": "_concrete-flat-nodark_49062",
  "cubered-border": "_cubered-border_49062",
  "cubered-border-nodark": "_cubered-border-nodark_49062",
  "cubered-nodark": "_cubered-nodark_49062",
  "cubered-flat": "_cubered-flat_49062",
  "cubered-flat-nodark": "_cubered-flat-nodark_49062",
  "dark-border": "_dark-border_49062",
  "dark-border-nodark": "_dark-border-nodark_49062",
  "dark-nodark": "_dark-nodark_49062",
  "dark-flat": "_dark-flat_49062",
  "dark-flat-nodark": "_dark-flat-nodark_49062",
  "emerald-border": "_emerald-border_49062",
  "emerald-border-nodark": "_emerald-border-nodark_49062",
  "emerald-nodark": "_emerald-nodark_49062",
  "emerald-flat": "_emerald-flat_49062",
  "emerald-flat-nodark": "_emerald-flat-nodark_49062",
  "gold-border": "_gold-border_49062",
  "gold-border-nodark": "_gold-border-nodark_49062",
  "gold-nodark": "_gold-nodark_49062",
  "gold-flat": "_gold-flat_49062",
  "gold-flat-nodark": "_gold-flat-nodark_49062",
  "green-sea-border": "_green-sea-border_49062",
  "green-sea-border-nodark": "_green-sea-border-nodark_49062",
  "green-sea-nodark": "_green-sea-nodark_49062",
  "green-sea-flat": "_green-sea-flat_49062",
  "green-sea-flat-nodark": "_green-sea-flat-nodark_49062",
  "highlight-border": "_highlight-border_49062",
  "highlight-border-nodark": "_highlight-border-nodark_49062",
  "highlight-nodark": "_highlight-nodark_49062",
  "highlight-flat": "_highlight-flat_49062",
  "highlight-flat-nodark": "_highlight-flat-nodark_49062",
  "light-border": "_light-border_49062",
  "light-border-nodark": "_light-border-nodark_49062",
  "light-nodark": "_light-nodark_49062",
  "light-flat": "_light-flat_49062",
  "light-flat-nodark": "_light-flat-nodark_49062",
  "midnight-blue-border": "_midnight-blue-border_49062",
  "midnight-blue-border-nodark": "_midnight-blue-border-nodark_49062",
  "midnight-blue-nodark": "_midnight-blue-nodark_49062",
  "midnight-blue-flat": "_midnight-blue-flat_49062",
  "midnight-blue-flat-nodark": "_midnight-blue-flat-nodark_49062",
  "nephritis-border": "_nephritis-border_49062",
  "nephritis-border-nodark": "_nephritis-border-nodark_49062",
  "nephritis-nodark": "_nephritis-nodark_49062",
  "nephritis-flat": "_nephritis-flat_49062",
  "nephritis-flat-nodark": "_nephritis-flat-nodark_49062",
  "orange-border": "_orange-border_49062",
  "orange-border-nodark": "_orange-border-nodark_49062",
  "orange-nodark": "_orange-nodark_49062",
  "orange-flat": "_orange-flat_49062",
  "orange-flat-nodark": "_orange-flat-nodark_49062",
  "peach-border": "_peach-border_49062",
  "peach-border-nodark": "_peach-border-nodark_49062",
  "peach-nodark": "_peach-nodark_49062",
  "peach-flat": "_peach-flat_49062",
  "peach-flat-nodark": "_peach-flat-nodark_49062",
  "peter-river-border": "_peter-river-border_49062",
  "peter-river-border-nodark": "_peter-river-border-nodark_49062",
  "peter-river-nodark": "_peter-river-nodark_49062",
  "peter-river-flat": "_peter-river-flat_49062",
  "peter-river-flat-nodark": "_peter-river-flat-nodark_49062",
  "pomegranate-border": "_pomegranate-border_49062",
  "pomegranate-border-nodark": "_pomegranate-border-nodark_49062",
  "pomegranate-nodark": "_pomegranate-nodark_49062",
  "pomegranate-flat": "_pomegranate-flat_49062",
  "pomegranate-flat-nodark": "_pomegranate-flat-nodark_49062",
  "primary-border": "_primary-border_49062",
  "primary-border-nodark": "_primary-border-nodark_49062",
  "primary-nodark": "_primary-nodark_49062",
  "primary-flat": "_primary-flat_49062",
  "primary-flat-nodark": "_primary-flat-nodark_49062",
  "pumpkin-border": "_pumpkin-border_49062",
  "pumpkin-border-nodark": "_pumpkin-border-nodark_49062",
  "pumpkin-nodark": "_pumpkin-nodark_49062",
  "pumpkin-flat": "_pumpkin-flat_49062",
  "pumpkin-flat-nodark": "_pumpkin-flat-nodark_49062",
  "raw-purple-border": "_raw-purple-border_49062",
  "raw-purple-border-nodark": "_raw-purple-border-nodark_49062",
  "raw-purple-nodark": "_raw-purple-nodark_49062",
  "raw-purple-flat": "_raw-purple-flat_49062",
  "raw-purple-flat-nodark": "_raw-purple-flat-nodark_49062",
  "secondary-border": "_secondary-border_49062",
  "secondary-border-nodark": "_secondary-border-nodark_49062",
  "secondary-nodark": "_secondary-nodark_49062",
  "secondary-flat": "_secondary-flat_49062",
  "secondary-flat-nodark": "_secondary-flat-nodark_49062",
  "silver-border": "_silver-border_49062",
  "silver-border-nodark": "_silver-border-nodark_49062",
  "silver-nodark": "_silver-nodark_49062",
  "silver-flat": "_silver-flat_49062",
  "silver-flat-nodark": "_silver-flat-nodark_49062",
  "sun-flower-border": "_sun-flower-border_49062",
  "sun-flower-border-nodark": "_sun-flower-border-nodark_49062",
  "sun-flower-nodark": "_sun-flower-nodark_49062",
  "sun-flower-flat": "_sun-flower-flat_49062",
  "sun-flower-flat-nodark": "_sun-flower-flat-nodark_49062",
  "transparent-border": "_transparent-border_49062",
  "transparent-border-nodark": "_transparent-border-nodark_49062",
  "transparent-nodark": "_transparent-nodark_49062",
  "transparent-flat": "_transparent-flat_49062",
  "transparent-flat-nodark": "_transparent-flat-nodark_49062",
  "turquoise-border": "_turquoise-border_49062",
  "turquoise-border-nodark": "_turquoise-border-nodark_49062",
  "turquoise-nodark": "_turquoise-nodark_49062",
  "turquoise-flat": "_turquoise-flat_49062",
  "turquoise-flat-nodark": "_turquoise-flat-nodark_49062",
  "wet-asphalt-border": "_wet-asphalt-border_49062",
  "wet-asphalt-border-nodark": "_wet-asphalt-border-nodark_49062",
  "wet-asphalt-nodark": "_wet-asphalt-nodark_49062",
  "wet-asphalt-flat": "_wet-asphalt-flat_49062",
  "wet-asphalt-flat-nodark": "_wet-asphalt-flat-nodark_49062",
  "white-border": "_white-border_49062",
  "white-border-nodark": "_white-border-nodark_49062",
  "white-nodark": "_white-nodark_49062",
  "white-flat": "_white-flat_49062",
  "white-flat-nodark": "_white-flat-nodark_49062",
  "wisteria-border": "_wisteria-border_49062",
  "wisteria-border-nodark": "_wisteria-border-nodark_49062",
  "wisteria-nodark": "_wisteria-nodark_49062",
  "wisteria-flat": "_wisteria-flat_49062",
  "wisteria-flat-nodark": "_wisteria-flat-nodark_49062",
  "deviantart-border": "_deviantart-border_49062",
  "deviantart-border-nodark": "_deviantart-border-nodark_49062",
  "deviantart-nodark": "_deviantart-nodark_49062",
  "deviantart-flat": "_deviantart-flat_49062",
  "deviantart-flat-nodark": "_deviantart-flat-nodark_49062",
  "discord-border": "_discord-border_49062",
  "discord-border-nodark": "_discord-border-nodark_49062",
  "discord-nodark": "_discord-nodark_49062",
  "discord-flat": "_discord-flat_49062",
  "discord-flat-nodark": "_discord-flat-nodark_49062",
  "facebook-border": "_facebook-border_49062",
  "facebook-border-nodark": "_facebook-border-nodark_49062",
  "facebook-nodark": "_facebook-nodark_49062",
  "facebook-flat": "_facebook-flat_49062",
  "facebook-flat-nodark": "_facebook-flat-nodark_49062",
  "github-border": "_github-border_49062",
  "github-border-nodark": "_github-border-nodark_49062",
  "github-nodark": "_github-nodark_49062",
  "github-flat": "_github-flat_49062",
  "github-flat-nodark": "_github-flat-nodark_49062",
  "google-border": "_google-border_49062",
  "google-border-nodark": "_google-border-nodark_49062",
  "google-nodark": "_google-nodark_49062",
  "google-flat": "_google-flat_49062",
  "google-flat-nodark": "_google-flat-nodark_49062",
  "googleplus-border": "_googleplus-border_49062",
  "googleplus-border-nodark": "_googleplus-border-nodark_49062",
  "googleplus-nodark": "_googleplus-nodark_49062",
  "googleplus-flat": "_googleplus-flat_49062",
  "googleplus-flat-nodark": "_googleplus-flat-nodark_49062",
  "instagram-border": "_instagram-border_49062",
  "instagram-border-nodark": "_instagram-border-nodark_49062",
  "instagram-nodark": "_instagram-nodark_49062",
  "instagram-flat": "_instagram-flat_49062",
  "instagram-flat-nodark": "_instagram-flat-nodark_49062",
  "linkedin-border": "_linkedin-border_49062",
  "linkedin-border-nodark": "_linkedin-border-nodark_49062",
  "linkedin-nodark": "_linkedin-nodark_49062",
  "linkedin-flat": "_linkedin-flat_49062",
  "linkedin-flat-nodark": "_linkedin-flat-nodark_49062",
  "patreon-border": "_patreon-border_49062",
  "patreon-border-nodark": "_patreon-border-nodark_49062",
  "patreon-nodark": "_patreon-nodark_49062",
  "patreon-flat": "_patreon-flat_49062",
  "patreon-flat-nodark": "_patreon-flat-nodark_49062",
  "paypal-border": "_paypal-border_49062",
  "paypal-border-nodark": "_paypal-border-nodark_49062",
  "paypal-nodark": "_paypal-nodark_49062",
  "paypal-flat": "_paypal-flat_49062",
  "paypal-flat-nodark": "_paypal-flat-nodark_49062",
  "pinterest-border": "_pinterest-border_49062",
  "pinterest-border-nodark": "_pinterest-border-nodark_49062",
  "pinterest-nodark": "_pinterest-nodark_49062",
  "pinterest-flat": "_pinterest-flat_49062",
  "pinterest-flat-nodark": "_pinterest-flat-nodark_49062",
  "reddit-border": "_reddit-border_49062",
  "reddit-border-nodark": "_reddit-border-nodark_49062",
  "reddit-nodark": "_reddit-nodark_49062",
  "reddit-flat": "_reddit-flat_49062",
  "reddit-flat-nodark": "_reddit-flat-nodark_49062",
  "skype-border": "_skype-border_49062",
  "skype-border-nodark": "_skype-border-nodark_49062",
  "skype-nodark": "_skype-nodark_49062",
  "skype-flat": "_skype-flat_49062",
  "skype-flat-nodark": "_skype-flat-nodark_49062",
  "slack-border": "_slack-border_49062",
  "slack-border-nodark": "_slack-border-nodark_49062",
  "slack-nodark": "_slack-nodark_49062",
  "slack-flat": "_slack-flat_49062",
  "slack-flat-nodark": "_slack-flat-nodark_49062",
  "snapchat-border": "_snapchat-border_49062",
  "snapchat-border-nodark": "_snapchat-border-nodark_49062",
  "snapchat-nodark": "_snapchat-nodark_49062",
  "snapchat-flat": "_snapchat-flat_49062",
  "snapchat-flat-nodark": "_snapchat-flat-nodark_49062",
  "soundcloud-border": "_soundcloud-border_49062",
  "soundcloud-border-nodark": "_soundcloud-border-nodark_49062",
  "soundcloud-nodark": "_soundcloud-nodark_49062",
  "soundcloud-flat": "_soundcloud-flat_49062",
  "soundcloud-flat-nodark": "_soundcloud-flat-nodark_49062",
  "spotify-border": "_spotify-border_49062",
  "spotify-border-nodark": "_spotify-border-nodark_49062",
  "spotify-nodark": "_spotify-nodark_49062",
  "spotify-flat": "_spotify-flat_49062",
  "spotify-flat-nodark": "_spotify-flat-nodark_49062",
  "steam-border": "_steam-border_49062",
  "steam-border-nodark": "_steam-border-nodark_49062",
  "steam-nodark": "_steam-nodark_49062",
  "steam-flat": "_steam-flat_49062",
  "steam-flat-nodark": "_steam-flat-nodark_49062",
  "telegram-border": "_telegram-border_49062",
  "telegram-border-nodark": "_telegram-border-nodark_49062",
  "telegram-nodark": "_telegram-nodark_49062",
  "telegram-flat": "_telegram-flat_49062",
  "telegram-flat-nodark": "_telegram-flat-nodark_49062",
  "tumblr-border": "_tumblr-border_49062",
  "tumblr-border-nodark": "_tumblr-border-nodark_49062",
  "tumblr-nodark": "_tumblr-nodark_49062",
  "tumblr-flat": "_tumblr-flat_49062",
  "tumblr-flat-nodark": "_tumblr-flat-nodark_49062",
  "twitch-border": "_twitch-border_49062",
  "twitch-border-nodark": "_twitch-border-nodark_49062",
  "twitch-nodark": "_twitch-nodark_49062",
  "twitch-flat": "_twitch-flat_49062",
  "twitch-flat-nodark": "_twitch-flat-nodark_49062",
  "twitter-border": "_twitter-border_49062",
  "twitter-border-nodark": "_twitter-border-nodark_49062",
  "twitter-nodark": "_twitter-nodark_49062",
  "twitter-flat": "_twitter-flat_49062",
  "twitter-flat-nodark": "_twitter-flat-nodark_49062",
  "viber-border": "_viber-border_49062",
  "viber-border-nodark": "_viber-border-nodark_49062",
  "viber-nodark": "_viber-nodark_49062",
  "viber-flat": "_viber-flat_49062",
  "viber-flat-nodark": "_viber-flat-nodark_49062",
  "whatsapp-border": "_whatsapp-border_49062",
  "whatsapp-border-nodark": "_whatsapp-border-nodark_49062",
  "whatsapp-nodark": "_whatsapp-nodark_49062",
  "whatsapp-flat": "_whatsapp-flat_49062",
  "whatsapp-flat-nodark": "_whatsapp-flat-nodark_49062",
  "youtube-border": "_youtube-border_49062",
  "youtube-border-nodark": "_youtube-border-nodark_49062",
  "youtube-nodark": "_youtube-nodark_49062",
  "youtube-flat": "_youtube-flat_49062",
  "youtube-flat-nodark": "_youtube-flat-nodark_49062",
  "animation": "_animation_49062",
  "button-enter": "_button-enter_49062",
  "animation-bounce": "_animation-bounce_49062",
  "bounce-button": "_bounce-button_49062",
  "hover-scale": "_hover-scale_49062",
  "hover-scale-inset": "_hover-scale-inset_49062",
  "hover-bounce": "_hover-bounce_49062",
  "hover": "_hover_49062",
  "emoji": "_emoji_49062",
  "emoji-lg": "_emoji-lg_49062",
  "emoji-2x": "_emoji-2x_49062",
  "emoji-3x": "_emoji-3x_49062",
  "emoji-4x": "_emoji-4x_49062",
  "emoji-5x": "_emoji-5x_49062",
  "center-object": "_center-object_49062",
  "fullscreen": "_fullscreen_49062",
  "background": "_background_49062",
  "slideshow": "_slideshow_49062",
  "me": "_me_49062",
  "half": "_half_49062",
  "image-title": "_image-title_49062",
  "title": "_title_49062",
  "undertitle": "_undertitle_49062",
  "unset": "_unset_49062",
  "large-border": "_large-border_49062",
  "medium-border": "_medium-border_49062",
  "small-border": "_small-border_49062",
  "no-border": "_no-border_49062",
  "github-repo-item": "_github-repo-item_49062",
  "content": "_content_49062",
  "name": "_name_49062",
  "description": "_description_49062",
  "information": "_information_49062",
  "colour": "_colour_49062",
  "color": "_color_49062",
  "meta": "_meta_49062",
  "link": "_link_49062",
  "star": "_star_49062",
  "fork": "_fork_49062",
  "license": "_license_49062",
  "container": "_container_49062",
  "column": "_column_49062",
  "columns": "_columns_49062",
  "row": "_row_49062",
  "one-full": "_one-full_49062",
  "one-half": "_one-half_49062",
  "one-third": "_one-third_49062",
  "one-fourth": "_one-fourth_49062",
  "flex-grid": "_flex-grid_49062",
  "col-xs": "_col-xs_49062",
  "col-xs-1": "_col-xs-1_49062",
  "col-xs-2": "_col-xs-2_49062",
  "col-xs-3": "_col-xs-3_49062",
  "col-xs-4": "_col-xs-4_49062",
  "col-xs-5": "_col-xs-5_49062",
  "col-xs-6": "_col-xs-6_49062",
  "col-xs-7": "_col-xs-7_49062",
  "col-xs-8": "_col-xs-8_49062",
  "col-xs-9": "_col-xs-9_49062",
  "col-xs-10": "_col-xs-10_49062",
  "col-xs-11": "_col-xs-11_49062",
  "col-xs-12": "_col-xs-12_49062",
  "modal": "_modal_49062",
  "fading-modal-in": "_fading-modal-in_49062",
  "modal--close": "_modal--close_49062",
  "fading-modal-out": "_fading-modal-out_49062",
  "modal-content": "_modal-content_49062",
  "close": "_close_49062",
  "nav-container": "_nav-container_49062",
  "default": "_default_49062",
  "menu-icon": "_menu-icon_49062",
  "nav-title": "_nav-title_49062",
  "sidenav": "_sidenav_49062",
  "current": "_current_49062",
  "nav-content": "_nav-content_49062",
  "nav-button": "_nav-button_49062",
  "loader": "_loader_49062",
  "load": "_load_49062",
  "tooltip": "_tooltip_49062",
  "left": "_left_49062",
  "right": "_right_49062",
  "paper-container": "_paper-container_49062",
  "paper": "_paper_49062",
  "ribbon": "_ribbon_49062",
  "box-container": "_box-container_49062",
  "message": "_message_49062",
  "progress-container": "_progress-container_49062",
  "progress-bar": "_progress-bar_49062",
  "card-container": "_card-container_49062",
  "card": "_card_49062",
  "avatar": "_avatar_49062",
  "footer": "_footer_49062",
  "workcard-container": "_workcard-container_49062",
  "overlay": "_overlay_49062",
  "text": "_text_49062",
  "table-container": "_table-container_49062",
  "table-center": "_table-center_49062",
  "form-container": "_form-container_49062",
  "label": "_label_49062",
  "parallax-container": "_parallax-container_49062",
  "parallax": "_parallax_49062",
  "small": "_small_49062",
  "medium": "_medium_49062",
  "large": "_large_49062",
  "one-line": "_one-line_49062",
  "no-nav": "_no-nav_49062",
  "bold": "_bold_49062",
  "italic": "_italic_49062",
  "center-text": "_center-text_49062",
  "left-text": "_left-text_49062",
  "right-text": "_right-text_49062",
  "full-width": "_full-width_49062",
  "half-width": "_half-width_49062",
  "no-border-radius": "_no-border-radius_49062",
  "no-box-shadow": "_no-box-shadow_49062",
  "no-margin": "_no-margin_49062",
  "no-padding": "_no-padding_49062",
  "no-select": "_no-select_49062",
  "no-text-shadow": "_no-text-shadow_49062",
  "relative": "_relative_49062",
  "transparent-bg": "_transparent-bg_49062",
  "center": "_center_49062",
  "box-shadow": "_box-shadow_49062",
  "arial": "_arial_49062",
  "monospace": "_monospace_49062",
  "montserrat": "_montserrat_49062",
  "roboto": "_roboto_49062",
  "times-new-roman": "_times-new-roman_49062",
  "alizarin-text": "_alizarin-text_49062",
  "alizarin-dropshadow": "_alizarin-dropshadow_49062",
  "alizarin-paper": "_alizarin-paper_49062",
  "alizarin-bar": "_alizarin-bar_49062",
  "amethyst-text": "_amethyst-text_49062",
  "amethyst-dropshadow": "_amethyst-dropshadow_49062",
  "amethyst-paper": "_amethyst-paper_49062",
  "amethyst-bar": "_amethyst-bar_49062",
  "asbestos-text": "_asbestos-text_49062",
  "asbestos-dropshadow": "_asbestos-dropshadow_49062",
  "asbestos-paper": "_asbestos-paper_49062",
  "asbestos-bar": "_asbestos-bar_49062",
  "belize-hole-text": "_belize-hole-text_49062",
  "belize-hole-dropshadow": "_belize-hole-dropshadow_49062",
  "belize-hole-paper": "_belize-hole-paper_49062",
  "belize-hole-bar": "_belize-hole-bar_49062",
  "black-text": "_black-text_49062",
  "black-dropshadow": "_black-dropshadow_49062",
  "black-paper": "_black-paper_49062",
  "black-bar": "_black-bar_49062",
  "carrot-text": "_carrot-text_49062",
  "carrot-dropshadow": "_carrot-dropshadow_49062",
  "carrot-paper": "_carrot-paper_49062",
  "carrot-bar": "_carrot-bar_49062",
  "clouds-text": "_clouds-text_49062",
  "clouds-dropshadow": "_clouds-dropshadow_49062",
  "clouds-paper": "_clouds-paper_49062",
  "clouds-bar": "_clouds-bar_49062",
  "concrete-text": "_concrete-text_49062",
  "concrete-dropshadow": "_concrete-dropshadow_49062",
  "concrete-paper": "_concrete-paper_49062",
  "concrete-bar": "_concrete-bar_49062",
  "cubered-text": "_cubered-text_49062",
  "cubered-dropshadow": "_cubered-dropshadow_49062",
  "cubered-paper": "_cubered-paper_49062",
  "cubered-bar": "_cubered-bar_49062",
  "dark-text": "_dark-text_49062",
  "dark-dropshadow": "_dark-dropshadow_49062",
  "dark-paper": "_dark-paper_49062",
  "dark-bar": "_dark-bar_49062",
  "emerald-text": "_emerald-text_49062",
  "emerald-dropshadow": "_emerald-dropshadow_49062",
  "emerald-paper": "_emerald-paper_49062",
  "emerald-bar": "_emerald-bar_49062",
  "gold-text": "_gold-text_49062",
  "gold-dropshadow": "_gold-dropshadow_49062",
  "gold-paper": "_gold-paper_49062",
  "gold-bar": "_gold-bar_49062",
  "green-sea-text": "_green-sea-text_49062",
  "green-sea-dropshadow": "_green-sea-dropshadow_49062",
  "green-sea-paper": "_green-sea-paper_49062",
  "green-sea-bar": "_green-sea-bar_49062",
  "highlight-text": "_highlight-text_49062",
  "highlight-dropshadow": "_highlight-dropshadow_49062",
  "highlight-paper": "_highlight-paper_49062",
  "highlight-bar": "_highlight-bar_49062",
  "light-text": "_light-text_49062",
  "light-dropshadow": "_light-dropshadow_49062",
  "light-paper": "_light-paper_49062",
  "light-bar": "_light-bar_49062",
  "midnight-blue-text": "_midnight-blue-text_49062",
  "midnight-blue-dropshadow": "_midnight-blue-dropshadow_49062",
  "midnight-blue-paper": "_midnight-blue-paper_49062",
  "midnight-blue-bar": "_midnight-blue-bar_49062",
  "nephritis-text": "_nephritis-text_49062",
  "nephritis-dropshadow": "_nephritis-dropshadow_49062",
  "nephritis-paper": "_nephritis-paper_49062",
  "nephritis-bar": "_nephritis-bar_49062",
  "orange-text": "_orange-text_49062",
  "orange-dropshadow": "_orange-dropshadow_49062",
  "orange-paper": "_orange-paper_49062",
  "orange-bar": "_orange-bar_49062",
  "peach-text": "_peach-text_49062",
  "peach-dropshadow": "_peach-dropshadow_49062",
  "peach-paper": "_peach-paper_49062",
  "peach-bar": "_peach-bar_49062",
  "peter-river-text": "_peter-river-text_49062",
  "peter-river-dropshadow": "_peter-river-dropshadow_49062",
  "peter-river-paper": "_peter-river-paper_49062",
  "peter-river-bar": "_peter-river-bar_49062",
  "pomegranate-text": "_pomegranate-text_49062",
  "pomegranate-dropshadow": "_pomegranate-dropshadow_49062",
  "pomegranate-paper": "_pomegranate-paper_49062",
  "pomegranate-bar": "_pomegranate-bar_49062",
  "primary-text": "_primary-text_49062",
  "primary-dropshadow": "_primary-dropshadow_49062",
  "primary-paper": "_primary-paper_49062",
  "primary-bar": "_primary-bar_49062",
  "pumpkin-text": "_pumpkin-text_49062",
  "pumpkin-dropshadow": "_pumpkin-dropshadow_49062",
  "pumpkin-paper": "_pumpkin-paper_49062",
  "pumpkin-bar": "_pumpkin-bar_49062",
  "raw-purple-text": "_raw-purple-text_49062",
  "raw-purple-dropshadow": "_raw-purple-dropshadow_49062",
  "raw-purple-paper": "_raw-purple-paper_49062",
  "raw-purple-bar": "_raw-purple-bar_49062",
  "secondary-text": "_secondary-text_49062",
  "secondary-dropshadow": "_secondary-dropshadow_49062",
  "secondary-paper": "_secondary-paper_49062",
  "secondary-bar": "_secondary-bar_49062",
  "silver-text": "_silver-text_49062",
  "silver-dropshadow": "_silver-dropshadow_49062",
  "silver-paper": "_silver-paper_49062",
  "silver-bar": "_silver-bar_49062",
  "sun-flower-text": "_sun-flower-text_49062",
  "sun-flower-dropshadow": "_sun-flower-dropshadow_49062",
  "sun-flower-paper": "_sun-flower-paper_49062",
  "sun-flower-bar": "_sun-flower-bar_49062",
  "transparent-text": "_transparent-text_49062",
  "transparent-dropshadow": "_transparent-dropshadow_49062",
  "transparent-paper": "_transparent-paper_49062",
  "transparent-bar": "_transparent-bar_49062",
  "turquoise-text": "_turquoise-text_49062",
  "turquoise-dropshadow": "_turquoise-dropshadow_49062",
  "turquoise-paper": "_turquoise-paper_49062",
  "turquoise-bar": "_turquoise-bar_49062",
  "wet-asphalt-text": "_wet-asphalt-text_49062",
  "wet-asphalt-dropshadow": "_wet-asphalt-dropshadow_49062",
  "wet-asphalt-paper": "_wet-asphalt-paper_49062",
  "wet-asphalt-bar": "_wet-asphalt-bar_49062",
  "white-text": "_white-text_49062",
  "white-dropshadow": "_white-dropshadow_49062",
  "white-paper": "_white-paper_49062",
  "white-bar": "_white-bar_49062",
  "wisteria-text": "_wisteria-text_49062",
  "wisteria-dropshadow": "_wisteria-dropshadow_49062",
  "wisteria-paper": "_wisteria-paper_49062",
  "wisteria-bar": "_wisteria-bar_49062",
  "deviantart-text": "_deviantart-text_49062",
  "deviantart-dropshadow": "_deviantart-dropshadow_49062",
  "deviantart-paper": "_deviantart-paper_49062",
  "deviantart-bar": "_deviantart-bar_49062",
  "discord-text": "_discord-text_49062",
  "discord-dropshadow": "_discord-dropshadow_49062",
  "discord-paper": "_discord-paper_49062",
  "discord-bar": "_discord-bar_49062",
  "facebook-text": "_facebook-text_49062",
  "facebook-dropshadow": "_facebook-dropshadow_49062",
  "facebook-paper": "_facebook-paper_49062",
  "facebook-bar": "_facebook-bar_49062",
  "github-text": "_github-text_49062",
  "github-dropshadow": "_github-dropshadow_49062",
  "github-paper": "_github-paper_49062",
  "github-bar": "_github-bar_49062",
  "google-text": "_google-text_49062",
  "google-dropshadow": "_google-dropshadow_49062",
  "google-paper": "_google-paper_49062",
  "google-bar": "_google-bar_49062",
  "googleplus-text": "_googleplus-text_49062",
  "googleplus-dropshadow": "_googleplus-dropshadow_49062",
  "googleplus-paper": "_googleplus-paper_49062",
  "googleplus-bar": "_googleplus-bar_49062",
  "instagram-text": "_instagram-text_49062",
  "instagram-dropshadow": "_instagram-dropshadow_49062",
  "instagram-paper": "_instagram-paper_49062",
  "instagram-bar": "_instagram-bar_49062",
  "linkedin-text": "_linkedin-text_49062",
  "linkedin-dropshadow": "_linkedin-dropshadow_49062",
  "linkedin-paper": "_linkedin-paper_49062",
  "linkedin-bar": "_linkedin-bar_49062",
  "patreon-text": "_patreon-text_49062",
  "patreon-dropshadow": "_patreon-dropshadow_49062",
  "patreon-paper": "_patreon-paper_49062",
  "patreon-bar": "_patreon-bar_49062",
  "paypal-text": "_paypal-text_49062",
  "paypal-dropshadow": "_paypal-dropshadow_49062",
  "paypal-paper": "_paypal-paper_49062",
  "paypal-bar": "_paypal-bar_49062",
  "pinterest-text": "_pinterest-text_49062",
  "pinterest-dropshadow": "_pinterest-dropshadow_49062",
  "pinterest-paper": "_pinterest-paper_49062",
  "pinterest-bar": "_pinterest-bar_49062",
  "reddit-text": "_reddit-text_49062",
  "reddit-dropshadow": "_reddit-dropshadow_49062",
  "reddit-paper": "_reddit-paper_49062",
  "reddit-bar": "_reddit-bar_49062",
  "skype-text": "_skype-text_49062",
  "skype-dropshadow": "_skype-dropshadow_49062",
  "skype-paper": "_skype-paper_49062",
  "skype-bar": "_skype-bar_49062",
  "slack-text": "_slack-text_49062",
  "slack-dropshadow": "_slack-dropshadow_49062",
  "slack-paper": "_slack-paper_49062",
  "slack-bar": "_slack-bar_49062",
  "snapchat-text": "_snapchat-text_49062",
  "snapchat-dropshadow": "_snapchat-dropshadow_49062",
  "snapchat-paper": "_snapchat-paper_49062",
  "snapchat-bar": "_snapchat-bar_49062",
  "soundcloud-text": "_soundcloud-text_49062",
  "soundcloud-dropshadow": "_soundcloud-dropshadow_49062",
  "soundcloud-paper": "_soundcloud-paper_49062",
  "soundcloud-bar": "_soundcloud-bar_49062",
  "spotify-text": "_spotify-text_49062",
  "spotify-dropshadow": "_spotify-dropshadow_49062",
  "spotify-paper": "_spotify-paper_49062",
  "spotify-bar": "_spotify-bar_49062",
  "steam-text": "_steam-text_49062",
  "steam-dropshadow": "_steam-dropshadow_49062",
  "steam-paper": "_steam-paper_49062",
  "steam-bar": "_steam-bar_49062",
  "telegram-text": "_telegram-text_49062",
  "telegram-dropshadow": "_telegram-dropshadow_49062",
  "telegram-paper": "_telegram-paper_49062",
  "telegram-bar": "_telegram-bar_49062",
  "tumblr-text": "_tumblr-text_49062",
  "tumblr-dropshadow": "_tumblr-dropshadow_49062",
  "tumblr-paper": "_tumblr-paper_49062",
  "tumblr-bar": "_tumblr-bar_49062",
  "twitch-text": "_twitch-text_49062",
  "twitch-dropshadow": "_twitch-dropshadow_49062",
  "twitch-paper": "_twitch-paper_49062",
  "twitch-bar": "_twitch-bar_49062",
  "twitter-text": "_twitter-text_49062",
  "twitter-dropshadow": "_twitter-dropshadow_49062",
  "twitter-paper": "_twitter-paper_49062",
  "twitter-bar": "_twitter-bar_49062",
  "viber-text": "_viber-text_49062",
  "viber-dropshadow": "_viber-dropshadow_49062",
  "viber-paper": "_viber-paper_49062",
  "viber-bar": "_viber-bar_49062",
  "whatsapp-text": "_whatsapp-text_49062",
  "whatsapp-dropshadow": "_whatsapp-dropshadow_49062",
  "whatsapp-paper": "_whatsapp-paper_49062",
  "whatsapp-bar": "_whatsapp-bar_49062",
  "youtube-text": "_youtube-text_49062",
  "youtube-dropshadow": "_youtube-dropshadow_49062",
  "youtube-paper": "_youtube-paper_49062",
  "youtube-bar": "_youtube-bar_49062"
};
},{"./images/arrow.png":[["arrow.4675c036.png","65aR"],"65aR"],"./images/menu-icon.png":[["menu-icon.8188857e.png","O424"],"O424"]}],"qa3M":[function(require,module,exports) {
module.exports = {
  "twa-cn": "_twa-cn_93871",
  "twa-de": "_twa-de_93871",
  "twa-flag-ac": "_twa-flag-ac_93871",
  "twa-flag-ad": "_twa-flag-ad_93871",
  "twa-flag-ae": "_twa-flag-ae_93871",
  "twa-flag-af": "_twa-flag-af_93871",
  "twa-flag-ag": "_twa-flag-ag_93871",
  "twa-flag-ai": "_twa-flag-ai_93871",
  "twa-flag-al": "_twa-flag-al_93871",
  "twa-flag-am": "_twa-flag-am_93871",
  "twa-flag-ao": "_twa-flag-ao_93871",
  "twa-flag-aq": "_twa-flag-aq_93871",
  "twa-flag-ar": "_twa-flag-ar_93871",
  "twa-flag-as": "_twa-flag-as_93871",
  "twa-flag-at": "_twa-flag-at_93871",
  "twa-flag-au": "_twa-flag-au_93871",
  "twa-flag-aw": "_twa-flag-aw_93871",
  "twa-flag-ax": "_twa-flag-ax_93871",
  "twa-flag-az": "_twa-flag-az_93871",
  "twa-flag-ba": "_twa-flag-ba_93871",
  "twa-flag-bb": "_twa-flag-bb_93871",
  "twa-flag-bd": "_twa-flag-bd_93871",
  "twa-flag-be": "_twa-flag-be_93871",
  "twa-flag-bf": "_twa-flag-bf_93871",
  "twa-flag-bg": "_twa-flag-bg_93871",
  "twa-flag-bh": "_twa-flag-bh_93871",
  "twa-flag-bi": "_twa-flag-bi_93871",
  "twa-flag-bj": "_twa-flag-bj_93871",
  "twa-flag-bl": "_twa-flag-bl_93871",
  "twa-flag-bm": "_twa-flag-bm_93871",
  "twa-flag-bn": "_twa-flag-bn_93871",
  "twa-flag-bo": "_twa-flag-bo_93871",
  "twa-flag-bq": "_twa-flag-bq_93871",
  "twa-flag-br": "_twa-flag-br_93871",
  "twa-flag-bs": "_twa-flag-bs_93871",
  "twa-flag-bt": "_twa-flag-bt_93871",
  "twa-flag-bv": "_twa-flag-bv_93871",
  "twa-flag-bw": "_twa-flag-bw_93871",
  "twa-flag-by": "_twa-flag-by_93871",
  "twa-flag-bz": "_twa-flag-bz_93871",
  "twa-flag-ca": "_twa-flag-ca_93871",
  "twa-flag-cc": "_twa-flag-cc_93871",
  "twa-flag-cd": "_twa-flag-cd_93871",
  "twa-flag-cf": "_twa-flag-cf_93871",
  "twa-flag-cg": "_twa-flag-cg_93871",
  "twa-flag-ch": "_twa-flag-ch_93871",
  "twa-flag-ci": "_twa-flag-ci_93871",
  "twa-flag-ck": "_twa-flag-ck_93871",
  "twa-flag-cl": "_twa-flag-cl_93871",
  "twa-flag-cm": "_twa-flag-cm_93871",
  "twa-flag-co": "_twa-flag-co_93871",
  "twa-flag-cp": "_twa-flag-cp_93871",
  "twa-flag-cr": "_twa-flag-cr_93871",
  "twa-flag-cu": "_twa-flag-cu_93871",
  "twa-flag-cv": "_twa-flag-cv_93871",
  "twa-flag-cw": "_twa-flag-cw_93871",
  "twa-flag-cx": "_twa-flag-cx_93871",
  "twa-flag-cy": "_twa-flag-cy_93871",
  "twa-flag-cz": "_twa-flag-cz_93871",
  "twa-flag-dg": "_twa-flag-dg_93871",
  "twa-flag-dj": "_twa-flag-dj_93871",
  "twa-flag-dk": "_twa-flag-dk_93871",
  "twa-flag-dm": "_twa-flag-dm_93871",
  "twa-flag-do": "_twa-flag-do_93871",
  "twa-flag-dz": "_twa-flag-dz_93871",
  "twa-flag-ea": "_twa-flag-ea_93871",
  "twa-flag-ec": "_twa-flag-ec_93871",
  "twa-flag-ee": "_twa-flag-ee_93871",
  "twa-flag-eg": "_twa-flag-eg_93871",
  "twa-flag-eh": "_twa-flag-eh_93871",
  "twa-flag-england": "_twa-flag-england_93871",
  "twa-flag-er": "_twa-flag-er_93871",
  "twa-flag-et": "_twa-flag-et_93871",
  "twa-flag-eu": "_twa-flag-eu_93871",
  "twa-flag-fi": "_twa-flag-fi_93871",
  "twa-flag-fj": "_twa-flag-fj_93871",
  "twa-flag-fk": "_twa-flag-fk_93871",
  "twa-flag-fm": "_twa-flag-fm_93871",
  "twa-flag-fo": "_twa-flag-fo_93871",
  "twa-flag-ga": "_twa-flag-ga_93871",
  "twa-flag-gd": "_twa-flag-gd_93871",
  "twa-flag-ge": "_twa-flag-ge_93871",
  "twa-flag-gf": "_twa-flag-gf_93871",
  "twa-flag-gg": "_twa-flag-gg_93871",
  "twa-flag-gh": "_twa-flag-gh_93871",
  "twa-flag-gi": "_twa-flag-gi_93871",
  "twa-flag-gl": "_twa-flag-gl_93871",
  "twa-flag-gm": "_twa-flag-gm_93871",
  "twa-flag-gn": "_twa-flag-gn_93871",
  "twa-flag-gp": "_twa-flag-gp_93871",
  "twa-flag-gq": "_twa-flag-gq_93871",
  "twa-flag-gr": "_twa-flag-gr_93871",
  "twa-flag-gs": "_twa-flag-gs_93871",
  "twa-flag-gt": "_twa-flag-gt_93871",
  "twa-flag-gu": "_twa-flag-gu_93871",
  "twa-flag-gw": "_twa-flag-gw_93871",
  "twa-flag-gy": "_twa-flag-gy_93871",
  "twa-flag-hk": "_twa-flag-hk_93871",
  "twa-flag-hm": "_twa-flag-hm_93871",
  "twa-flag-hn": "_twa-flag-hn_93871",
  "twa-flag-hr": "_twa-flag-hr_93871",
  "twa-flag-ht": "_twa-flag-ht_93871",
  "twa-flag-hu": "_twa-flag-hu_93871",
  "twa-flag-ic": "_twa-flag-ic_93871",
  "twa-flag-id": "_twa-flag-id_93871",
  "twa-flag-ie": "_twa-flag-ie_93871",
  "twa-flag-il": "_twa-flag-il_93871",
  "twa-flag-im": "_twa-flag-im_93871",
  "twa-flag-in-hole": "_twa-flag-in-hole_93871",
  "twa-flag-in": "_twa-flag-in_93871",
  "twa-flag-io": "_twa-flag-io_93871",
  "twa-flag-iq": "_twa-flag-iq_93871",
  "twa-flag-ir": "_twa-flag-ir_93871",
  "twa-flag-is": "_twa-flag-is_93871",
  "twa-flag-je": "_twa-flag-je_93871",
  "twa-flag-jm": "_twa-flag-jm_93871",
  "twa-flag-jo": "_twa-flag-jo_93871",
  "twa-flag-ke": "_twa-flag-ke_93871",
  "twa-flag-kg": "_twa-flag-kg_93871",
  "twa-flag-kh": "_twa-flag-kh_93871",
  "twa-flag-ki": "_twa-flag-ki_93871",
  "twa-flag-km": "_twa-flag-km_93871",
  "twa-flag-kn": "_twa-flag-kn_93871",
  "twa-flag-kp": "_twa-flag-kp_93871",
  "twa-flag-kw": "_twa-flag-kw_93871",
  "twa-flag-ky": "_twa-flag-ky_93871",
  "twa-flag-kz": "_twa-flag-kz_93871",
  "twa-flag-la": "_twa-flag-la_93871",
  "twa-flag-lb": "_twa-flag-lb_93871",
  "twa-flag-lc": "_twa-flag-lc_93871",
  "twa-flag-li": "_twa-flag-li_93871",
  "twa-flag-lk": "_twa-flag-lk_93871",
  "twa-flag-lr": "_twa-flag-lr_93871",
  "twa-flag-ls": "_twa-flag-ls_93871",
  "twa-flag-lt": "_twa-flag-lt_93871",
  "twa-flag-lu": "_twa-flag-lu_93871",
  "twa-flag-lv": "_twa-flag-lv_93871",
  "twa-flag-ly": "_twa-flag-ly_93871",
  "twa-flag-ma": "_twa-flag-ma_93871",
  "twa-flag-mc": "_twa-flag-mc_93871",
  "twa-flag-md": "_twa-flag-md_93871",
  "twa-flag-me": "_twa-flag-me_93871",
  "twa-flag-mf": "_twa-flag-mf_93871",
  "twa-flag-mg": "_twa-flag-mg_93871",
  "twa-flag-mh": "_twa-flag-mh_93871",
  "twa-flag-mk": "_twa-flag-mk_93871",
  "twa-flag-ml": "_twa-flag-ml_93871",
  "twa-flag-mm": "_twa-flag-mm_93871",
  "twa-flag-mn": "_twa-flag-mn_93871",
  "twa-flag-mo": "_twa-flag-mo_93871",
  "twa-flag-mp": "_twa-flag-mp_93871",
  "twa-flag-mq": "_twa-flag-mq_93871",
  "twa-flag-mr": "_twa-flag-mr_93871",
  "twa-flag-ms": "_twa-flag-ms_93871",
  "twa-flag-mt": "_twa-flag-mt_93871",
  "twa-flag-mu": "_twa-flag-mu_93871",
  "twa-flag-mv": "_twa-flag-mv_93871",
  "twa-flag-mw": "_twa-flag-mw_93871",
  "twa-flag-mx": "_twa-flag-mx_93871",
  "twa-flag-my": "_twa-flag-my_93871",
  "twa-flag-mz": "_twa-flag-mz_93871",
  "twa-flag-na": "_twa-flag-na_93871",
  "twa-flag-nc": "_twa-flag-nc_93871",
  "twa-flag-ne": "_twa-flag-ne_93871",
  "twa-flag-nf": "_twa-flag-nf_93871",
  "twa-flag-ng": "_twa-flag-ng_93871",
  "twa-flag-ni": "_twa-flag-ni_93871",
  "twa-flag-nl": "_twa-flag-nl_93871",
  "twa-flag-no": "_twa-flag-no_93871",
  "twa-flag-np": "_twa-flag-np_93871",
  "twa-flag-nr": "_twa-flag-nr_93871",
  "twa-flag-nu": "_twa-flag-nu_93871",
  "twa-flag-nz": "_twa-flag-nz_93871",
  "twa-flag-om": "_twa-flag-om_93871",
  "twa-flag-pa": "_twa-flag-pa_93871",
  "twa-flag-pe": "_twa-flag-pe_93871",
  "twa-flag-pf": "_twa-flag-pf_93871",
  "twa-flag-pg": "_twa-flag-pg_93871",
  "twa-flag-ph": "_twa-flag-ph_93871",
  "twa-flag-pk": "_twa-flag-pk_93871",
  "twa-flag-pl": "_twa-flag-pl_93871",
  "twa-flag-pm": "_twa-flag-pm_93871",
  "twa-flag-pn": "_twa-flag-pn_93871",
  "twa-flag-pr": "_twa-flag-pr_93871",
  "twa-flag-ps": "_twa-flag-ps_93871",
  "twa-flag-pt": "_twa-flag-pt_93871",
  "twa-flag-pw": "_twa-flag-pw_93871",
  "twa-flag-py": "_twa-flag-py_93871",
  "twa-flag-qa": "_twa-flag-qa_93871",
  "twa-flag-re": "_twa-flag-re_93871",
  "twa-flag-ro": "_twa-flag-ro_93871",
  "twa-flag-rs": "_twa-flag-rs_93871",
  "twa-flag-rw": "_twa-flag-rw_93871",
  "twa-flag-sa": "_twa-flag-sa_93871",
  "twa-flag-sb": "_twa-flag-sb_93871",
  "twa-flag-sc": "_twa-flag-sc_93871",
  "twa-flag-scotland": "_twa-flag-scotland_93871",
  "twa-flag-sd": "_twa-flag-sd_93871",
  "twa-flag-se": "_twa-flag-se_93871",
  "twa-flag-sg": "_twa-flag-sg_93871",
  "twa-flag-sh": "_twa-flag-sh_93871",
  "twa-flag-si": "_twa-flag-si_93871",
  "twa-flag-sj": "_twa-flag-sj_93871",
  "twa-flag-sk": "_twa-flag-sk_93871",
  "twa-flag-sl": "_twa-flag-sl_93871",
  "twa-flag-sm": "_twa-flag-sm_93871",
  "twa-flag-sn": "_twa-flag-sn_93871",
  "twa-flag-so": "_twa-flag-so_93871",
  "twa-flag-sr": "_twa-flag-sr_93871",
  "twa-flag-ss": "_twa-flag-ss_93871",
  "twa-flag-st": "_twa-flag-st_93871",
  "twa-flag-sv": "_twa-flag-sv_93871",
  "twa-flag-sx": "_twa-flag-sx_93871",
  "twa-flag-sy": "_twa-flag-sy_93871",
  "twa-flag-sz": "_twa-flag-sz_93871",
  "twa-flag-ta": "_twa-flag-ta_93871",
  "twa-flag-tc": "_twa-flag-tc_93871",
  "twa-flag-td": "_twa-flag-td_93871",
  "twa-flag-tf": "_twa-flag-tf_93871",
  "twa-flag-tg": "_twa-flag-tg_93871",
  "twa-flag-th": "_twa-flag-th_93871",
  "twa-flag-tj": "_twa-flag-tj_93871",
  "twa-flag-tk": "_twa-flag-tk_93871",
  "twa-flag-tl": "_twa-flag-tl_93871",
  "twa-flag-tm": "_twa-flag-tm_93871",
  "twa-flag-tn": "_twa-flag-tn_93871",
  "twa-flag-to": "_twa-flag-to_93871",
  "twa-flag-tr": "_twa-flag-tr_93871",
  "twa-flag-tt": "_twa-flag-tt_93871",
  "twa-flag-tv": "_twa-flag-tv_93871",
  "twa-flag-tw": "_twa-flag-tw_93871",
  "twa-flag-tz": "_twa-flag-tz_93871",
  "twa-flag-ua": "_twa-flag-ua_93871",
  "twa-flag-ug": "_twa-flag-ug_93871",
  "twa-flag-um": "_twa-flag-um_93871",
  "twa-flag-un": "_twa-flag-un_93871",
  "twa-flag-uy": "_twa-flag-uy_93871",
  "twa-flag-uz": "_twa-flag-uz_93871",
  "twa-flag-va": "_twa-flag-va_93871",
  "twa-flag-vc": "_twa-flag-vc_93871",
  "twa-flag-ve": "_twa-flag-ve_93871",
  "twa-flag-vg": "_twa-flag-vg_93871",
  "twa-flag-vi": "_twa-flag-vi_93871",
  "twa-flag-vn": "_twa-flag-vn_93871",
  "twa-flag-vu": "_twa-flag-vu_93871",
  "twa-flag-wales": "_twa-flag-wales_93871",
  "twa-flag-wf": "_twa-flag-wf_93871",
  "twa-flag-ws": "_twa-flag-ws_93871",
  "twa-flag-xk": "_twa-flag-xk_93871",
  "twa-flag-ye": "_twa-flag-ye_93871",
  "twa-flag-yt": "_twa-flag-yt_93871",
  "twa-flag-za": "_twa-flag-za_93871",
  "twa-flag-zm": "_twa-flag-zm_93871",
  "twa-flag-zw": "_twa-flag-zw_93871",
  "twa-fr": "_twa-fr_93871",
  "twa-gb": "_twa-gb_93871",
  "twa-globe-showing-europe-africa": "_twa-globe-showing-europe-africa_93871",
  "twa-right-pointing-magnifying-glass": "_twa-right-pointing-magnifying-glass_93871",
  "twa-ru": "_twa-ru_93871",
  "twa-us": "_twa-us_93871"
};
},{"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1e8-1f1f3.svg":[["1f1e8-1f1f3.71b04f50.svg","eQVn"],"eQVn"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1e9-1f1ea.svg":[["1f1e9-1f1ea.e18fb3b5.svg","cW1v"],"cW1v"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1e6-1f1e8.svg":[["1f1e6-1f1e8.42822809.svg","O4au"],"O4au"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1e6-1f1e9.svg":[["1f1e6-1f1e9.0ea5bf62.svg","5Whg"],"5Whg"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1e6-1f1ea.svg":[["1f1e6-1f1ea.547f1fed.svg","6i6P"],"6i6P"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1e6-1f1eb.svg":[["1f1e6-1f1eb.4d61ccd4.svg","EbGW"],"EbGW"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1e6-1f1ec.svg":[["1f1e6-1f1ec.046288e0.svg","2/xK"],"2/xK"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1e6-1f1ee.svg":[["1f1e6-1f1ee.0ea90be6.svg","uLOp"],"uLOp"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1e6-1f1f1.svg":[["1f1e6-1f1f1.93972240.svg","QXN1"],"QXN1"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1e6-1f1f2.svg":[["1f1e6-1f1f2.58216aad.svg","wzbN"],"wzbN"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1e6-1f1f4.svg":[["1f1e6-1f1f4.1c7f2191.svg","w73S"],"w73S"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1e6-1f1f6.svg":[["1f1e6-1f1f6.1df3fa89.svg","YJNH"],"YJNH"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1e6-1f1f7.svg":[["1f1e6-1f1f7.c4023db6.svg","R/+K"],"R/+K"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1e6-1f1f8.svg":[["1f1e6-1f1f8.1a6de69f.svg","7wZs"],"7wZs"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1e6-1f1f9.svg":[["1f1e6-1f1f9.3bf3b3c6.svg","NYla"],"NYla"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1e6-1f1fa.svg":[["1f1e6-1f1fa.7df51f83.svg","w4/k"],"w4/k"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1e6-1f1fc.svg":[["1f1e6-1f1fc.e019d2d9.svg","QJf8"],"QJf8"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1e6-1f1fd.svg":[["1f1e6-1f1fd.ea851d45.svg","pha7"],"pha7"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1e6-1f1ff.svg":[["1f1e6-1f1ff.4bcec899.svg","vLk/"],"vLk/"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1e7-1f1e6.svg":[["1f1e7-1f1e6.04d321b1.svg","1uU0"],"1uU0"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1e7-1f1e7.svg":[["1f1e7-1f1e7.0d552338.svg","nnba"],"nnba"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1e7-1f1e9.svg":[["1f1e7-1f1e9.4190ce8b.svg","vfbl"],"vfbl"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1e7-1f1ea.svg":[["1f1e7-1f1ea.585290df.svg","7ccV"],"7ccV"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1e7-1f1eb.svg":[["1f1e7-1f1eb.57ca06f4.svg","+hQ1"],"+hQ1"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1e7-1f1ec.svg":[["1f1e7-1f1ec.04c2cb17.svg","akj6"],"akj6"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1e7-1f1ed.svg":[["1f1e7-1f1ed.0db8867b.svg","Csv8"],"Csv8"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1e7-1f1ee.svg":[["1f1e7-1f1ee.3c006f2d.svg","1gIg"],"1gIg"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1e7-1f1ef.svg":[["1f1e7-1f1ef.44d9ae15.svg","x/Uw"],"x/Uw"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1e7-1f1f1.svg":[["1f1e7-1f1f1.7f18abb7.svg","kw3e"],"kw3e"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1e7-1f1f2.svg":[["1f1e7-1f1f2.2b507468.svg","g6Ks"],"g6Ks"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1e7-1f1f3.svg":[["1f1e7-1f1f3.52c75492.svg","G+XW"],"G+XW"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1e7-1f1f4.svg":[["1f1e7-1f1f4.8d38c2ad.svg","Z3f4"],"Z3f4"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1e7-1f1f6.svg":[["1f1e7-1f1f6.f9f69c99.svg","NYZh"],"NYZh"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1e7-1f1f7.svg":[["1f1e7-1f1f7.ef746b8f.svg","6fzl"],"6fzl"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1e7-1f1f8.svg":[["1f1e7-1f1f8.58ca0865.svg","u/sN"],"u/sN"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1e7-1f1f9.svg":[["1f1e7-1f1f9.416260b3.svg","oEwW"],"oEwW"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1e7-1f1fb.svg":[["1f1e7-1f1fb.cee3040c.svg","j/J7"],"j/J7"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1e7-1f1fc.svg":[["1f1e7-1f1fc.bcdfee06.svg","XWe/"],"XWe/"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1e7-1f1fe.svg":[["1f1e7-1f1fe.03465708.svg","EsIA"],"EsIA"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1e7-1f1ff.svg":[["1f1e7-1f1ff.40df548f.svg","hYWB"],"hYWB"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1e8-1f1e6.svg":[["1f1e8-1f1e6.5b3a7333.svg","A8qE"],"A8qE"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1e8-1f1e8.svg":[["1f1e8-1f1e8.a25604bf.svg","OtLZ"],"OtLZ"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1e8-1f1e9.svg":[["1f1e8-1f1e9.703bfd39.svg","LGWM"],"LGWM"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1e8-1f1eb.svg":[["1f1e8-1f1eb.c82b0b69.svg","My+t"],"My+t"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1e8-1f1ec.svg":[["1f1e8-1f1ec.499856a2.svg","eqbL"],"eqbL"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1e8-1f1ed.svg":[["1f1e8-1f1ed.1fa5be26.svg","oFgq"],"oFgq"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1e8-1f1ee.svg":[["1f1e8-1f1ee.811d987d.svg","rsLr"],"rsLr"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1e8-1f1f0.svg":[["1f1e8-1f1f0.df9a7963.svg","cHVR"],"cHVR"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1e8-1f1f1.svg":[["1f1e8-1f1f1.c6f37ae5.svg","ltyK"],"ltyK"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1e8-1f1f2.svg":[["1f1e8-1f1f2.39baa6fe.svg","wFoG"],"wFoG"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1e8-1f1f4.svg":[["1f1e8-1f1f4.7ade25c4.svg","k35I"],"k35I"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1e8-1f1f5.svg":[["1f1e8-1f1f5.e44dddb2.svg","HV5Z"],"HV5Z"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1e8-1f1f7.svg":[["1f1e8-1f1f7.0b2b002e.svg","QfSp"],"QfSp"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1e8-1f1fa.svg":[["1f1e8-1f1fa.6da931b8.svg","NQTT"],"NQTT"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1e8-1f1fb.svg":[["1f1e8-1f1fb.9cee7af1.svg","xNWL"],"xNWL"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1e8-1f1fc.svg":[["1f1e8-1f1fc.7ac0f34d.svg","xQeh"],"xQeh"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1e8-1f1fd.svg":[["1f1e8-1f1fd.e04f949b.svg","CtyF"],"CtyF"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1e8-1f1fe.svg":[["1f1e8-1f1fe.5d8788d0.svg","CyKQ"],"CyKQ"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1e8-1f1ff.svg":[["1f1e8-1f1ff.32a7c739.svg","c3lH"],"c3lH"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1e9-1f1ec.svg":[["1f1e9-1f1ec.14ac8655.svg","5peb"],"5peb"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1e9-1f1ef.svg":[["1f1e9-1f1ef.3532a7ba.svg","L3J7"],"L3J7"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1e9-1f1f0.svg":[["1f1e9-1f1f0.ea8d5e9d.svg","ycSk"],"ycSk"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1e9-1f1f2.svg":[["1f1e9-1f1f2.fb642994.svg","Vguw"],"Vguw"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1e9-1f1f4.svg":[["1f1e9-1f1f4.376311d9.svg","+S/r"],"+S/r"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1e9-1f1ff.svg":[["1f1e9-1f1ff.ccec0ff3.svg","hCnt"],"hCnt"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1ea-1f1e6.svg":[["1f1ea-1f1e6.1a8f1f1c.svg","nD+m"],"nD+m"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1ea-1f1e8.svg":[["1f1ea-1f1e8.9687e62e.svg","kLtF"],"kLtF"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1ea-1f1ea.svg":[["1f1ea-1f1ea.8f25bfb4.svg","YwIA"],"YwIA"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1ea-1f1ec.svg":[["1f1ea-1f1ec.ea29654b.svg","ycOM"],"ycOM"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1ea-1f1ed.svg":[["1f1ea-1f1ed.5fab1b55.svg","1mk+"],"1mk+"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f3f4-e0067-e0062-e0065-e006e-e0067-e007f.svg":[["1f3f4-e0067-e0062-e0065-e006e-e0067-e007f.1f9f70c2.svg","UZTc"],"UZTc"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1ea-1f1f7.svg":[["1f1ea-1f1f7.207cbcea.svg","WhoC"],"WhoC"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1ea-1f1f9.svg":[["1f1ea-1f1f9.3b176126.svg","jQ/g"],"jQ/g"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1ea-1f1fa.svg":[["1f1ea-1f1fa.23419a98.svg","5pRH"],"5pRH"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1eb-1f1ee.svg":[["1f1eb-1f1ee.508dfcf9.svg","0P3J"],"0P3J"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1eb-1f1ef.svg":[["1f1eb-1f1ef.692eb21e.svg","uVaK"],"uVaK"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1eb-1f1f0.svg":[["1f1eb-1f1f0.e5c63d69.svg","unqI"],"unqI"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1eb-1f1f2.svg":[["1f1eb-1f1f2.1d4c935d.svg","mQEE"],"mQEE"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1eb-1f1f4.svg":[["1f1eb-1f1f4.21e96768.svg","cKKA"],"cKKA"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1ec-1f1e6.svg":[["1f1ec-1f1e6.f1006d48.svg","KcGo"],"KcGo"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1ec-1f1e9.svg":[["1f1ec-1f1e9.bba2f0fa.svg","A5WC"],"A5WC"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1ec-1f1ea.svg":[["1f1ec-1f1ea.f7b30406.svg","PzpK"],"PzpK"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1ec-1f1eb.svg":[["1f1ec-1f1eb.23d3cb2d.svg","s5oR"],"s5oR"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1ec-1f1ec.svg":[["1f1ec-1f1ec.c00ba56e.svg","orsY"],"orsY"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1ec-1f1ed.svg":[["1f1ec-1f1ed.75604cc1.svg","j7lP"],"j7lP"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1ec-1f1ee.svg":[["1f1ec-1f1ee.5027204f.svg","AibY"],"AibY"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1ec-1f1f1.svg":[["1f1ec-1f1f1.ae9ae55b.svg","bNB+"],"bNB+"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1ec-1f1f2.svg":[["1f1ec-1f1f2.911c154e.svg","oDir"],"oDir"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1ec-1f1f3.svg":[["1f1ec-1f1f3.fb70f39e.svg","xD5Q"],"xD5Q"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1ec-1f1f5.svg":[["1f1ec-1f1f5.79c0e35c.svg","icF+"],"icF+"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1ec-1f1f6.svg":[["1f1ec-1f1f6.81009872.svg","IDMs"],"IDMs"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1ec-1f1f7.svg":[["1f1ec-1f1f7.4a4d5e85.svg","tU3n"],"tU3n"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1ec-1f1f8.svg":[["1f1ec-1f1f8.018ff6c8.svg","NavM"],"NavM"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1ec-1f1f9.svg":[["1f1ec-1f1f9.cdc65f16.svg","qdZq"],"qdZq"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1ec-1f1fa.svg":[["1f1ec-1f1fa.02765584.svg","Vse2"],"Vse2"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1ec-1f1fc.svg":[["1f1ec-1f1fc.92f2fbb7.svg","bpbP"],"bpbP"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1ec-1f1fe.svg":[["1f1ec-1f1fe.c8c752c7.svg","Zi9k"],"Zi9k"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1ed-1f1f0.svg":[["1f1ed-1f1f0.89134375.svg","2V0h"],"2V0h"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1ed-1f1f2.svg":[["1f1ed-1f1f2.7df51f83.svg","REwi"],"REwi"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1ed-1f1f3.svg":[["1f1ed-1f1f3.d424d317.svg","iMdX"],"iMdX"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1ed-1f1f7.svg":[["1f1ed-1f1f7.26475669.svg","2zL/"],"2zL/"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1ed-1f1f9.svg":[["1f1ed-1f1f9.32b3a016.svg","vLXA"],"vLXA"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1ed-1f1fa.svg":[["1f1ed-1f1fa.1d8e20d4.svg","pKlQ"],"pKlQ"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1ee-1f1e8.svg":[["1f1ee-1f1e8.73ef0a04.svg","kTuC"],"kTuC"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1ee-1f1e9.svg":[["1f1ee-1f1e9.9719525b.svg","1UHY"],"1UHY"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1ee-1f1ea.svg":[["1f1ee-1f1ea.1bffc7d1.svg","Tsuk"],"Tsuk"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1ee-1f1f1.svg":[["1f1ee-1f1f1.1fa74891.svg","f8kR"],"f8kR"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1ee-1f1f2.svg":[["1f1ee-1f1f2.a8329c34.svg","ZU7D"],"ZU7D"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/26f3.svg":[["26f3.1c592450.svg","00lg"],"00lg"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1ee-1f1f3.svg":[["1f1ee-1f1f3.413062c2.svg","KWFT"],"KWFT"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1ee-1f1f4.svg":[["1f1ee-1f1f4.14ac8655.svg","yc3c"],"yc3c"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1ee-1f1f6.svg":[["1f1ee-1f1f6.a0ec4a33.svg","FpXc"],"FpXc"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1ee-1f1f7.svg":[["1f1ee-1f1f7.66f4455b.svg","6WFD"],"6WFD"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1ee-1f1f8.svg":[["1f1ee-1f1f8.369055b1.svg","J7BB"],"J7BB"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1ef-1f1ea.svg":[["1f1ef-1f1ea.cebb1f2a.svg","V9G/"],"V9G/"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1ef-1f1f2.svg":[["1f1ef-1f1f2.c02d6bf2.svg","ysiJ"],"ysiJ"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1ef-1f1f4.svg":[["1f1ef-1f1f4.03af0c7f.svg","8YoX"],"8YoX"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f0-1f1ea.svg":[["1f1f0-1f1ea.773c0b1d.svg","jWq+"],"jWq+"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f0-1f1ec.svg":[["1f1f0-1f1ec.eeb1a2bf.svg","k3CX"],"k3CX"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f0-1f1ed.svg":[["1f1f0-1f1ed.6056f269.svg","18Xj"],"18Xj"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f0-1f1ee.svg":[["1f1f0-1f1ee.75982fa3.svg","n4uR"],"n4uR"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f0-1f1f2.svg":[["1f1f0-1f1f2.cc6670b0.svg","aDpn"],"aDpn"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f0-1f1f3.svg":[["1f1f0-1f1f3.d83352e4.svg","gEgg"],"gEgg"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f0-1f1f5.svg":[["1f1f0-1f1f5.c8890842.svg","e6/8"],"e6/8"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f0-1f1fc.svg":[["1f1f0-1f1fc.3c803fe2.svg","vcGX"],"vcGX"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f0-1f1fe.svg":[["1f1f0-1f1fe.5790dc14.svg","pa8m"],"pa8m"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f0-1f1ff.svg":[["1f1f0-1f1ff.04cb7d2d.svg","PXi0"],"PXi0"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f1-1f1e6.svg":[["1f1f1-1f1e6.c643b934.svg","aSL5"],"aSL5"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f1-1f1e7.svg":[["1f1f1-1f1e7.64283791.svg","0wij"],"0wij"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f1-1f1e8.svg":[["1f1f1-1f1e8.befd4a7d.svg","AN2n"],"AN2n"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f1-1f1ee.svg":[["1f1f1-1f1ee.83110489.svg","oM6D"],"oM6D"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f1-1f1f0.svg":[["1f1f1-1f1f0.f5e26938.svg","cXD4"],"cXD4"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f1-1f1f7.svg":[["1f1f1-1f1f7.d4cedda0.svg","2FwW"],"2FwW"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f1-1f1f8.svg":[["1f1f1-1f1f8.692a8a3d.svg","06WH"],"06WH"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f1-1f1f9.svg":[["1f1f1-1f1f9.04273dfb.svg","xkCu"],"xkCu"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f1-1f1fa.svg":[["1f1f1-1f1fa.b356257e.svg","HJvy"],"HJvy"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f1-1f1fb.svg":[["1f1f1-1f1fb.06d7f11c.svg","BGmx"],"BGmx"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f1-1f1fe.svg":[["1f1f1-1f1fe.642bf63d.svg","3/Hf"],"3/Hf"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f2-1f1e6.svg":[["1f1f2-1f1e6.7cf99271.svg","JUSC"],"JUSC"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f2-1f1e8.svg":[["1f1f2-1f1e8.77f9bc2a.svg","798W"],"798W"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f2-1f1e9.svg":[["1f1f2-1f1e9.34722307.svg","VUTQ"],"VUTQ"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f2-1f1ea.svg":[["1f1f2-1f1ea.ed2a8045.svg","e3//"],"e3//"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f2-1f1eb.svg":[["1f1f2-1f1eb.e44dddb2.svg","xmfW"],"xmfW"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f2-1f1ec.svg":[["1f1f2-1f1ec.91d07981.svg","b/ZF"],"b/ZF"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f2-1f1ed.svg":[["1f1f2-1f1ed.c7b494cc.svg","HOWE"],"HOWE"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f2-1f1f0.svg":[["1f1f2-1f1f0.e99feca6.svg","c+T0"],"c+T0"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f2-1f1f1.svg":[["1f1f2-1f1f1.b34cb0c4.svg","uiET"],"uiET"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f2-1f1f2.svg":[["1f1f2-1f1f2.acb2c58b.svg","EEQp"],"EEQp"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f2-1f1f3.svg":[["1f1f2-1f1f3.ac88e037.svg","6xQz"],"6xQz"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f2-1f1f4.svg":[["1f1f2-1f1f4.b357da34.svg","Jui7"],"Jui7"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f2-1f1f5.svg":[["1f1f2-1f1f5.1c03b4c8.svg","MuiK"],"MuiK"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f2-1f1f6.svg":[["1f1f2-1f1f6.bbb9bb4a.svg","xzdL"],"xzdL"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f2-1f1f7.svg":[["1f1f2-1f1f7.58cdb3d7.svg","+2wl"],"+2wl"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f2-1f1f8.svg":[["1f1f2-1f1f8.3cb62f40.svg","DRHQ"],"DRHQ"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f2-1f1f9.svg":[["1f1f2-1f1f9.67d13460.svg","/Uy5"],"/Uy5"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f2-1f1fa.svg":[["1f1f2-1f1fa.afd0b205.svg","Mh9J"],"Mh9J"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f2-1f1fb.svg":[["1f1f2-1f1fb.2d2df9c7.svg","MvDG"],"MvDG"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f2-1f1fc.svg":[["1f1f2-1f1fc.38bddb99.svg","SeZC"],"SeZC"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f2-1f1fd.svg":[["1f1f2-1f1fd.0c489398.svg","NS+R"],"NS+R"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f2-1f1fe.svg":[["1f1f2-1f1fe.1aa06c61.svg","qkO1"],"qkO1"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f2-1f1ff.svg":[["1f1f2-1f1ff.71557d53.svg","y1Y0"],"y1Y0"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f3-1f1e6.svg":[["1f1f3-1f1e6.b17f6814.svg","dxpq"],"dxpq"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f3-1f1e8.svg":[["1f1f3-1f1e8.c29c05f5.svg","4rR1"],"4rR1"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f3-1f1ea.svg":[["1f1f3-1f1ea.bda89cd5.svg","Q19U"],"Q19U"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f3-1f1eb.svg":[["1f1f3-1f1eb.dc81e0af.svg","KioV"],"KioV"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f3-1f1ec.svg":[["1f1f3-1f1ec.13330a97.svg","/G8D"],"/G8D"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f3-1f1ee.svg":[["1f1f3-1f1ee.5553225e.svg","Y4Cm"],"Y4Cm"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f3-1f1f1.svg":[["1f1f3-1f1f1.e611df6c.svg","cStk"],"cStk"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f3-1f1f4.svg":[["1f1f3-1f1f4.aeb21e38.svg","FMFG"],"FMFG"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f3-1f1f5.svg":[["1f1f3-1f1f5.f2f03c3c.svg","F8+U"],"F8+U"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f3-1f1f7.svg":[["1f1f3-1f1f7.b7505152.svg","zD7p"],"zD7p"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f3-1f1fa.svg":[["1f1f3-1f1fa.764b7f5e.svg","Hq9b"],"Hq9b"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f3-1f1ff.svg":[["1f1f3-1f1ff.d4381377.svg","Higc"],"Higc"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f4-1f1f2.svg":[["1f1f4-1f1f2.de3a4039.svg","EWrE"],"EWrE"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f5-1f1e6.svg":[["1f1f5-1f1e6.b696172e.svg","q+lZ"],"q+lZ"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f5-1f1ea.svg":[["1f1f5-1f1ea.b7fe4dc3.svg","nJl3"],"nJl3"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f5-1f1eb.svg":[["1f1f5-1f1eb.7b693467.svg","tmNT"],"tmNT"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f5-1f1ec.svg":[["1f1f5-1f1ec.de7c24e6.svg","6ciu"],"6ciu"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f5-1f1ed.svg":[["1f1f5-1f1ed.9eb1cbe6.svg","LVVi"],"LVVi"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f5-1f1f0.svg":[["1f1f5-1f1f0.4a849c2e.svg","Z7Gt"],"Z7Gt"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f5-1f1f1.svg":[["1f1f5-1f1f1.ad05e3a1.svg","FRdO"],"FRdO"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f5-1f1f2.svg":[["1f1f5-1f1f2.b2f807c9.svg","7Dl5"],"7Dl5"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f5-1f1f3.svg":[["1f1f5-1f1f3.6acf81d8.svg","fpf2"],"fpf2"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f5-1f1f7.svg":[["1f1f5-1f1f7.48bb1903.svg","CC0b"],"CC0b"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f5-1f1f8.svg":[["1f1f5-1f1f8.fb3c0d69.svg","RUxP"],"RUxP"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f5-1f1f9.svg":[["1f1f5-1f1f9.fee1ea57.svg","bq1W"],"bq1W"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f5-1f1fc.svg":[["1f1f5-1f1fc.0f797d50.svg","m+uN"],"m+uN"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f5-1f1fe.svg":[["1f1f5-1f1fe.5d4ce754.svg","cUQV"],"cUQV"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f6-1f1e6.svg":[["1f1f6-1f1e6.bec915d0.svg","FGhc"],"FGhc"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f7-1f1ea.svg":[["1f1f7-1f1ea.8cfc1967.svg","DVWs"],"DVWs"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f7-1f1f4.svg":[["1f1f7-1f1f4.72a91b3a.svg","W9b0"],"W9b0"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f7-1f1f8.svg":[["1f1f7-1f1f8.457084db.svg","z4f7"],"z4f7"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f7-1f1fc.svg":[["1f1f7-1f1fc.e8cf5870.svg","1QVF"],"1QVF"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f8-1f1e6.svg":[["1f1f8-1f1e6.18940f29.svg","4CKt"],"4CKt"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f8-1f1e7.svg":[["1f1f8-1f1e7.319df6bf.svg","JURh"],"JURh"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f8-1f1e8.svg":[["1f1f8-1f1e8.9ef8ade3.svg","3K8G"],"3K8G"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f3f4-e0067-e0062-e0073-e0063-e0074-e007f.svg":[["1f3f4-e0067-e0062-e0073-e0063-e0074-e007f.32625aa3.svg","+hGJ"],"+hGJ"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f8-1f1e9.svg":[["1f1f8-1f1e9.4b1632be.svg","aCNC"],"aCNC"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f8-1f1ea.svg":[["1f1f8-1f1ea.929454cd.svg","qEcB"],"qEcB"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f8-1f1ec.svg":[["1f1f8-1f1ec.d445f0ff.svg","OmgE"],"OmgE"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f8-1f1ed.svg":[["1f1f8-1f1ed.3d4bd202.svg","06Tz"],"06Tz"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f8-1f1ee.svg":[["1f1f8-1f1ee.4737a79e.svg","yCmU"],"yCmU"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f8-1f1ef.svg":[["1f1f8-1f1ef.aeb21e38.svg","EtO2"],"EtO2"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f8-1f1f0.svg":[["1f1f8-1f1f0.2e1b0761.svg","+UtB"],"+UtB"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f8-1f1f1.svg":[["1f1f8-1f1f1.c3a9845c.svg","dhW6"],"dhW6"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f8-1f1f2.svg":[["1f1f8-1f1f2.825be159.svg","UHli"],"UHli"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f8-1f1f3.svg":[["1f1f8-1f1f3.89f8c8b2.svg","/OgS"],"/OgS"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f8-1f1f4.svg":[["1f1f8-1f1f4.38201bf2.svg","TJFK"],"TJFK"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f8-1f1f7.svg":[["1f1f8-1f1f7.79844ebb.svg","2jqT"],"2jqT"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f8-1f1f8.svg":[["1f1f8-1f1f8.3ed81e3a.svg","R41b"],"R41b"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f8-1f1f9.svg":[["1f1f8-1f1f9.1994c21f.svg","omJo"],"omJo"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f8-1f1fb.svg":[["1f1f8-1f1fb.b5d5edf4.svg","kdJI"],"kdJI"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f8-1f1fd.svg":[["1f1f8-1f1fd.e2e4306f.svg","yB+z"],"yB+z"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f8-1f1fe.svg":[["1f1f8-1f1fe.ed82cc90.svg","X4n1"],"X4n1"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f8-1f1ff.svg":[["1f1f8-1f1ff.db11dd94.svg","YDYQ"],"YDYQ"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f9-1f1e6.svg":[["1f1f9-1f1e6.76591f27.svg","aUVm"],"aUVm"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f9-1f1e8.svg":[["1f1f9-1f1e8.839080d6.svg","wDzg"],"wDzg"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f9-1f1e9.svg":[["1f1f9-1f1e9.841095dd.svg","6zs3"],"6zs3"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f9-1f1eb.svg":[["1f1f9-1f1eb.a6993203.svg","W5/R"],"W5/R"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f9-1f1ec.svg":[["1f1f9-1f1ec.ba8b6b31.svg","p5sb"],"p5sb"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f9-1f1ed.svg":[["1f1f9-1f1ed.10102828.svg","RqOd"],"RqOd"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f9-1f1ef.svg":[["1f1f9-1f1ef.b7dd46c4.svg","I7kX"],"I7kX"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f9-1f1f0.svg":[["1f1f9-1f1f0.f95ae93a.svg","YZb8"],"YZb8"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f9-1f1f1.svg":[["1f1f9-1f1f1.ffd0c4f3.svg","NwHC"],"NwHC"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f9-1f1f2.svg":[["1f1f9-1f1f2.c2a91563.svg","2+4B"],"2+4B"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f9-1f1f3.svg":[["1f1f9-1f1f3.6559403d.svg","EOPT"],"EOPT"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f9-1f1f4.svg":[["1f1f9-1f1f4.08c7237a.svg","Fmqp"],"Fmqp"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f9-1f1f7.svg":[["1f1f9-1f1f7.12e48b03.svg","LjIn"],"LjIn"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f9-1f1f9.svg":[["1f1f9-1f1f9.a8394530.svg","QztB"],"QztB"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f9-1f1fb.svg":[["1f1f9-1f1fb.2e96f9ed.svg","DSzt"],"DSzt"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f9-1f1fc.svg":[["1f1f9-1f1fc.a87eee10.svg","Iqgt"],"Iqgt"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f9-1f1ff.svg":[["1f1f9-1f1ff.d4cc1276.svg","WgZh"],"WgZh"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1fa-1f1e6.svg":[["1f1fa-1f1e6.153ee43a.svg","Ve+i"],"Ve+i"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1fa-1f1ec.svg":[["1f1fa-1f1ec.f61c653a.svg","W7wX"],"W7wX"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1fa-1f1f2.svg":[["1f1fa-1f1f2.3330be0f.svg","2DYu"],"2DYu"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1fa-1f1f3.svg":[["1f1fa-1f1f3.67d845dc.svg","+QHK"],"+QHK"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1fa-1f1fe.svg":[["1f1fa-1f1fe.5d66a344.svg","DiHo"],"DiHo"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1fa-1f1ff.svg":[["1f1fa-1f1ff.650b7802.svg","EeLv"],"EeLv"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1fb-1f1e6.svg":[["1f1fb-1f1e6.cdc67879.svg","9yrB"],"9yrB"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1fb-1f1e8.svg":[["1f1fb-1f1e8.78113619.svg","VEdL"],"VEdL"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1fb-1f1ea.svg":[["1f1fb-1f1ea.9af9441c.svg","BOrV"],"BOrV"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1fb-1f1ec.svg":[["1f1fb-1f1ec.821c31da.svg","JWCu"],"JWCu"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1fb-1f1ee.svg":[["1f1fb-1f1ee.19a399bf.svg","nY8d"],"nY8d"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1fb-1f1f3.svg":[["1f1fb-1f1f3.0b133abb.svg","l/6k"],"l/6k"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1fb-1f1fa.svg":[["1f1fb-1f1fa.e5adff28.svg","4TG0"],"4TG0"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f3f4-e0067-e0062-e0077-e006c-e0073-e007f.svg":[["1f3f4-e0067-e0062-e0077-e006c-e0073-e007f.d7f897fe.svg","JY6H"],"JY6H"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1fc-1f1eb.svg":[["1f1fc-1f1eb.b6144f5e.svg","NR5z"],"NR5z"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1fc-1f1f8.svg":[["1f1fc-1f1f8.2319a444.svg","PcSV"],"PcSV"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1fd-1f1f0.svg":[["1f1fd-1f1f0.599d47df.svg","mDSG"],"mDSG"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1fe-1f1ea.svg":[["1f1fe-1f1ea.7d4ba854.svg","EcMD"],"EcMD"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1fe-1f1f9.svg":[["1f1fe-1f1f9.ebc185ef.svg","M4/N"],"M4/N"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1ff-1f1e6.svg":[["1f1ff-1f1e6.a9826940.svg","40x2"],"40x2"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1ff-1f1f2.svg":[["1f1ff-1f1f2.01e3f9d4.svg","c8C5"],"c8C5"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1ff-1f1fc.svg":[["1f1ff-1f1fc.c6d9f8f1.svg","BbEf"],"BbEf"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1eb-1f1f7.svg":[["1f1eb-1f1f7.e44dddb2.svg","EOQP"],"EOQP"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1ec-1f1e7.svg":[["1f1ec-1f1e7.15195767.svg","Iy5z"],"Iy5z"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f30d.svg":[["1f30d.3a036f85.svg","+Shm"],"+Shm"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f50e.svg":[["1f50e.43549be6.svg","8c9B"],"8c9B"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1f7-1f1fa.svg":[["1f1f7-1f1fa.65e29db4.svg","UI8x"],"UI8x"],"/home/travis/build/Terminal/discordapps.dev/node_modules/twemoji/2/svg/1f1fa-1f1f8.svg":[["1f1fa-1f1f8.3330be0f.svg","qXIQ"],"qXIQ"]}],"h2Hb":[function(require,module,exports) {
module.exports = {
  "roundedCorners": "_roundedCorners_b5853",
  "loading": "_loading_b5853",
  "button": "_button_b5853",
  "scrollbar": "_scrollbar_b5853"
};
},{}],"rs3k":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CSSElements = exports.TwitterEmojis = exports.Modesta = void 0;

var _modestaModule = _interopRequireDefault(require("../scss/ModestaCSS/scss/modesta.module.scss"));

var _twemojiModule = _interopRequireDefault(require("../scss/twemoji.module.scss"));

var _elementsModule = _interopRequireDefault(require("../scss/elements.module.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const makeBetter = name => name.replace(/-([a-z0-9])/g, capture => capture[1].toUpperCase()).replace('-', '');

const makeFrom = from => Object.keys(from).reduce((prev, curr) => Object.assign({}, prev, {
  [makeBetter(curr)]: from[curr]
}), {});

const Modesta = makeFrom(_modestaModule.default);
exports.Modesta = Modesta;
const TwitterEmojis = makeFrom(_twemojiModule.default);
exports.TwitterEmojis = TwitterEmojis;
const CSSElements = makeFrom(_elementsModule.default);
exports.CSSElements = CSSElements;
},{"../scss/ModestaCSS/scss/modesta.module.scss":"H2cc","../scss/twemoji.module.scss":"qa3M","../scss/elements.module.scss":"h2Hb"}],"Gm6F":[function(require,module,exports) {
module.exports = {
  "btn": "_btn_4dba6"
};
},{}],"+DmJ":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Styles = require("../../data/Styles");

var _ConstructCSS = _interopRequireDefault(require("../../helpers/ConstructCSS"));

var _indexModule = _interopRequireDefault(require("./index.module.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

class Button extends _react.Component {
  render() {
    return _react.default.createElement("span", _extends({}, this.props, {
      className: (0, _ConstructCSS.default)(_indexModule.default.btn, _Styles.Modesta.btn, _Styles.Modesta.boxShadow, this.props.className)
    }), this.props.children);
  }

}

var _default = Button;
exports.default = _default;
},{"../../data/Styles":"rs3k","../../helpers/ConstructCSS":"SwhA","./index.module.scss":"Gm6F"}],"tNeE":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Styles = require("../../data/Styles");

var _ConstructCSS = _interopRequireDefault(require("../../helpers/ConstructCSS"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

class Container extends _react.Component {
  render() {
    return _react.default.createElement("div", {
      className: (0, _ConstructCSS.default)(_Styles.Modesta.container, this.props.className)
    }, this.props.children);
  }

}

var _default = Container;
exports.default = _default;
},{"../../data/Styles":"rs3k","../../helpers/ConstructCSS":"SwhA"}],"n9dU":[function(require,module,exports) {
module.exports = {
  "container": "_container_f298d",
  "secondary": "_secondary_f298d"
};
},{}],"A3mz":[function(require,module,exports) {
module.exports = {
  "container": "_container_8004f"
};
},{}],"50Yc":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _coloursModule = _interopRequireDefault(require("../../scss/colours.module.scss"));

var _indexModule = _interopRequireDefault(require("./index.module.scss"));

var _Styles = require("../../data/Styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

class ContentBox extends _react.Component {
  render() {
    return _react.default.createElement("div", _extends({}, this.props, {
      className: `${_Styles.Modesta.boxShadow} ${_coloursModule.default.container} ${_indexModule.default.container} ${this.props.className ? this.props.className : ''}`
    }), this.props.children);
  }

}

var _default = ContentBox;
exports.default = _default;
},{"../../scss/colours.module.scss":"n9dU","./index.module.scss":"A3mz","../../data/Styles":"rs3k"}],"uCEh":[function(require,module,exports) {
module.exports = {
  "flexGrid": "_flexGrid_6b5eb",
  "padding": "_padding_6b5eb",
  "flexBackwards": "_flexBackwards_6b5eb"
};
},{}],"U1G4":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _indexModule = _interopRequireDefault(require("./index.module.scss"));

var _Styles = require("../../data/Styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

class FlexColumns extends _react.Component {
  render() {
    if (this.props.columns) return _react.default.createElement("div", {
      className: `${_Styles.Modesta[`colXs${this.props.columns}`]} ${this.props.className ? this.props.className : ''}`
    }, this.props.children);
    return _react.default.createElement("div", {
      className: `\
        ${_Styles.Modesta.flexGrid} \
        ${_indexModule.default.flexGrid} \
        ${this.props.backwardsMobile ? _indexModule.default.flexBackwards : ''} \
        ${this.props.padding ? _indexModule.default.padding : ''} \
        ${this.props.className ? this.props.className : ''}`
    }, this.props.children);
  }

}

var _default = FlexColumns;
exports.default = _default;
},{"./index.module.scss":"uCEh","../../data/Styles":"rs3k"}],"Tyxi":[function(require,module,exports) {
module.exports = {
  "mobile": "_mobile_78ffd",
  "desktop": "_desktop_78ffd",
  "hidden": "_hidden_78ffd"
};
},{}],"dChq":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactIntl = require("react-intl");

var _reactRouterHashLink = require("react-router-hash-link");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

const LocalizedLink = (_ref) => {
  let {
    to,
    intl: {
      locale
    },
    query,
    hash
  } = _ref,
      props = _objectWithoutProperties(_ref, ["to", "intl", "query", "hash"]);

  let querylink = '';
  let hashlink = '';

  if (query) {
    querylink = '?' + Object.keys(query).map(key => {
      if (Array.isArray(query[key])) {
        return query[key].map(value => `${encodeURIComponent(key)}[]=${encodeURIComponent(value)}`).join('&');
      }

      return `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`;
    }).join('&');
  }

  if (hash) {
    hashlink = `#${encodeURIComponent(hash)}`;
  }

  const path = `/${locale}${to}${querylink}${hashlink}`;
  return _react.default.createElement(_reactRouterHashLink.HashLink, _extends({}, props, {
    to: path
  }));
};

var _default = (0, _reactIntl.injectIntl)(LocalizedLink);

exports.default = _default;
},{}],"ch0H":[function(require,module,exports) {
module.exports = {
  "navbar": "_navbar_f0a17",
  "navContainer": "_navContainer_f0a17",
  "desktopHeading": "_desktopHeading_f0a17",
  "sidenav": "_sidenav_f0a17",
  "mobileNavContent": "_mobileNavContent_f0a17",
  "mobileNavbar": "_mobileNavbar_f0a17",
  "mobileHeading": "_mobileHeading_f0a17",
  "darken": "_darken_f0a17",
  "tooltip": "_tooltip_f0a17"
};
},{}],"2Fxh":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const APPROVED = 'approved';
const DENIED = 'denied';
const QUEUE = 'queue';
const BANNED = 'banned';
const States = {
  APPROVED,
  DENIED,
  QUEUE,
  BANNED
};
var _default = States;
exports.default = _default;
},{}],"YSbd":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchAuthIfNeeded = fetchAuthIfNeeded;
exports.forceFetchAuth = forceFetchAuth;
exports.RECEIVE_AUTH = exports.REQUEST_AUTH = void 0;

var _Locations = _interopRequireDefault(require("../../data/Locations"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const REQUEST_AUTH = 'REQUEST_AUTH';
exports.REQUEST_AUTH = REQUEST_AUTH;
const RECEIVE_AUTH = 'RECEIVE_AUTH';
exports.RECEIVE_AUTH = RECEIVE_AUTH;

function requestAuth() {
  return {
    type: REQUEST_AUTH
  };
}

function receiveAuth(json) {
  return {
    type: RECEIVE_AUTH,
    data: json.data
  };
}

function fetchAuth() {
  return dispatch => {
    dispatch(requestAuth());
    return fetch(`${_Locations.default.server}/auth/json`, {
      credentials: 'include'
    }).then(res => res.json()).then(json => dispatch(receiveAuth(json)));
  };
}

function shouldFetchAuth(state) {
  if (state.auth.fetching) return false;
  if (state.auth.fetched) return false;
  return true;
}

function fetchAuthIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchAuth(getState())) {
      return dispatch(fetchAuth());
    }
  };
}

function forceFetchAuth() {
  return dispatch => dispatch(fetchAuth());
}
},{"../../data/Locations":"uTwd"}],"JsQ7":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactIntl = require("react-intl");

var _reactRedux = require("react-redux");

var _Locations = _interopRequireDefault(require("../../data/Locations"));

var _Styles = require("../../data/Styles");

var _States = _interopRequireDefault(require("../../data/States"));

var _auth = require("../../redux/actions/auth");

var _LocalisedHyperlink = _interopRequireDefault(require("../LocalisedHyperlink"));

var _ConstructCSS = _interopRequireDefault(require("../../helpers/ConstructCSS"));

var _indexModule = _interopRequireDefault(require("./index.module.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

class NavbarLinks extends _react.Component {
  componentDidMount() {
    const {
      dispatch
    } = this.props;
    dispatch((0, _auth.fetchAuthIfNeeded)());
  }

  render() {
    const href = typeof window !== 'undefined' ? window.location.href : 'https://discordapps.dev';
    const {
      auth,
      unlocalisedPath,
      desktop
    } = this.props;
    return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "navbar.languages"
    }, message => _react.default.createElement(_LocalisedHyperlink.default, {
      "aria-label": message,
      to: "/locale",
      query: {
        returnBrowserTo: unlocalisedPath
      }
    }, _react.default.createElement("span", {
      className: (0, _ConstructCSS.default)(_Styles.Modesta.emoji, _Styles.TwitterEmojis.twaGlobeShowingEuropeAfrica, desktop && (0, _ConstructCSS.default)(_Styles.Modesta.tooltip, _indexModule.default.tooltip)),
      "data-tooltip": message
    }))), _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "navbar.search"
    }, message => _react.default.createElement(_LocalisedHyperlink.default, {
      "aria-label": message,
      to: "/filter",
      query: {
        state: _States.default.APPROVED
      }
    }, _react.default.createElement("span", {
      className: (0, _ConstructCSS.default)(_Styles.Modesta.emoji, _Styles.TwitterEmojis.twaRightPointingMagnifyingGlass, desktop && (0, _ConstructCSS.default)(_Styles.Modesta.tooltip, _indexModule.default.tooltip)),
      "data-tooltip": message
    }))), auth.data !== null ? _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "navbar.add"
    }, message => _react.default.createElement(_LocalisedHyperlink.default, {
      "aria-label": message,
      to: "/bots/add"
    }, message)), _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "navbar.addRpc"
    }, message => _react.default.createElement(_LocalisedHyperlink.default, {
      "aria-label": message,
      to: "/rpc/add"
    }, message)), _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "navbar.user"
    }, message => _react.default.createElement(_LocalisedHyperlink.default, {
      "aria-label": message,
      to: "/filter",
      query: {
        owners: [auth.data.id],
        hidden: false
      }
    }, auth.data.username)), _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "navbar.logout"
    }, message => _react.default.createElement(_LocalisedHyperlink.default, {
      "aria-label": message,
      to: "/auth/logout"
    }, message)), auth.data.admin ? _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "navbar.admin"
    }, message => _react.default.createElement(_LocalisedHyperlink.default, {
      "aria-label": message,
      to: "/admin"
    }, message))) : null) : _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "navbar.login"
    }, message => _react.default.createElement("a", {
      "aria-label": message,
      href: `${_Locations.default.server}/auth/site?to=${encodeURIComponent(href)}`
    }, message))));
  }

}

const mapStateToProps = (state, ownProps) => {
  const {
    auth
  } = state;
  return {
    auth
  };
};

var _default = (0, _reactRedux.connect)(mapStateToProps)((0, _reactIntl.injectIntl)(NavbarLinks));

exports.default = _default;
},{"../../data/Locations":"uTwd","../../data/Styles":"rs3k","../../data/States":"2Fxh","../../redux/actions/auth":"YSbd","../LocalisedHyperlink":"dChq","../../helpers/ConstructCSS":"SwhA","./index.module.scss":"ch0H"}],"e86L":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactIntl = require("react-intl");

var _displayModule = _interopRequireDefault(require("../../scss/display.module.scss"));

var _LocalisedHyperlink = _interopRequireDefault(require("../LocalisedHyperlink"));

var _indexModule = _interopRequireDefault(require("./index.module.scss"));

var _links = _interopRequireDefault(require("./links"));

var _Styles = require("../../data/Styles");

var _ConstructCSS = _interopRequireDefault(require("../../helpers/ConstructCSS"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

class NavigationBar extends _react.Component {
  constructor(props) {
    super(props);
    this.openNavbar = this.openNavbar.bind(this);
    this.closeNavbar = this.closeNavbar.bind(this);
    this.state = {
      open: false
    };
  }

  openNavbar() {
    this.setState({
      open: true
    });
  }

  closeNavbar() {
    this.setState({
      open: false
    });
  }

  render() {
    return _react.default.createElement("div", {
      className: _indexModule.default.navbar
    }, _react.default.createElement("div", {
      className: (0, _ConstructCSS.default)(_displayModule.default.desktop, _Styles.Modesta.navContainer, _Styles.Modesta.default, _indexModule.default.navContainer)
    }, _react.default.createElement("h1", {
      className: (0, _ConstructCSS.default)(_Styles.Modesta.navTitle, _indexModule.default.desktopHeading)
    }, _react.default.createElement(_LocalisedHyperlink.default, {
      to: "/"
    }, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "site.name"
    }))), _react.default.createElement("div", {
      className: (0, _ConstructCSS.default)(_Styles.Modesta.sidenav, _indexModule.default.sidenav)
    }, _react.default.createElement(_links.default, {
      unlocalisedPath: this.props.unlocalisedPath,
      desktop: true
    }))), _react.default.createElement("div", {
      className: `${_displayModule.default.mobile} ${_Styles.Modesta.navContainer} ${_indexModule.default.mobileNavbar}`
    }, _react.default.createElement("span", {
      onClick: this.openNavbar,
      className: _Styles.Modesta.menuIcon
    }), _react.default.createElement("div", {
      className: `${_indexModule.default.mobileNavContent} ${_Styles.Modesta.navContent}`
    }, _react.default.createElement("h4", {
      className: _indexModule.default.mobileHeading
    }, _react.default.createElement(_LocalisedHyperlink.default, {
      to: "/"
    }, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "site.name"
    })))), _react.default.createElement("div", {
      className: _Styles.Modesta.sidenav,
      style: this.state.open ? {
        transform: 'translateX(0px)'
      } : {
        transform: 'translateX(-250px)'
      }
    }, _react.default.createElement(_links.default, {
      unlocalisedPath: this.props.unlocalisedPath
    }))), _react.default.createElement("div", {
      style: this.state.open ? {
        opacity: '0.8',
        pointerEvents: 'all'
      } : {},
      className: `${_indexModule.default.darken} ${_displayModule.default.mobile}`,
      onClick: this.closeNavbar
    }), this.props.children);
  }

}

var _default = NavigationBar;
exports.default = _default;
},{"../../scss/display.module.scss":"Tyxi","../LocalisedHyperlink":"dChq","./index.module.scss":"ch0H","./links":"JsQ7","../../data/Styles":"rs3k","../../helpers/ConstructCSS":"SwhA"}],"Y4cY":[function(require,module,exports) {
module.exports = {
  "footer": "_footer_d59de",
  "links": "_links_d59de",
  "copyright": "_copyright_d59de"
};
},{}],"FlX3":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactIntl = require("react-intl");

var _Locations = _interopRequireDefault(require("../../data/Locations"));

var _Container = _interopRequireDefault(require("../Container"));

var _indexModule = _interopRequireDefault(require("./index.module.scss"));

var _LocalisedHyperlink = _interopRequireDefault(require("../LocalisedHyperlink"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

class Footer extends _react.Component {
  render() {
    return _react.default.createElement(_Container.default, {
      className: _indexModule.default.footer
    }, _react.default.createElement("p", {
      className: _indexModule.default.copyright
    }, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "copyright"
    })), _react.default.createElement("div", {
      className: _indexModule.default.links
    }, _react.default.createElement(_LocalisedHyperlink.default, {
      to: _Locations.default.wiki
    }, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "footer.docs"
    })), _react.default.createElement(_LocalisedHyperlink.default, {
      to: "/posts/docs/terms/"
    }, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "footer.terms"
    })), _react.default.createElement("a", {
      href: _Locations.default.discordServer,
      target: "_blank",
      rel: "noopener noreferrer"
    }, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "footer.discord"
    })), _react.default.createElement("a", {
      href: _Locations.default.sourceCode,
      target: "_blank",
      rel: "noopener noreferrer"
    }, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "footer.source"
    }))));
  }

}

var _default = Footer;
exports.default = _default;
},{"../../data/Locations":"uTwd","../Container":"tNeE","./index.module.scss":"Y4cY","../LocalisedHyperlink":"dChq"}],"occt":[function(require,module,exports) {
module.exports = {
  "categories": {
    "fun": "Sjov",
    "games": "Spil",
    "entertainment": "Underholdning",
    "productivity": "Produktivitet",
    "education": "Uddannelse",
    "image": "Billedmanipulation",
    "news": "Nyheder",
    "music": "Musik",
    "moderation": "Moderation",
    "utility": "Utility",
    "notifications": "Notifikationer",
    "other": "Andet"
  },
  "copyright": "Copyright 2017 - 2019, Terminal.ink; Discord is a trademark of Discord Inc.",
  "errors": {
    "apps": {
      "authors": "Du skal have mindst 1 forfatter til botten, alle forfatter-ID'er skal være numeriske",
      "category": "Du skal vælge en kategori for din bot",
      "customisable": "The customisability of the prefix must be either ticked, or unticked",
      "description": "Den korte beskrivelse skal være mellem 10 og 1000 tegn",
      "githubowner": "GitHub ejeren skal være en gyldige GitHub bruger. Lad dette stå tomt hvis du ikke har en GitHub konto.",
      "githubrepo": "The GitHub repository needs to be a valid string. Leave blank if you do not have a GitHub repository.",
      "id": "Bot-ID'et skal være udfyldt samt numerisk",
      "invite": "The Invite URL needs to be filled out, and as a valid HTTPS link",
      "website": "The Website URL needs to be a valid HTTPS link",
      "languages": "Du skal tilføje et enkelt sprog. Tryk på det sprog du ønsker din botside skal være i, og vælg 'Tilføj et sprog' knappen",
      "mentionable": "The mentionabiliity of the prefix must be either ticked, or unticked",
      "name": "Botten skal have et navn der har en længde på mellem 4 og 32 tegn.",
      "nsfw": "NSFW-statussen skal være enten afkrydset eller ikke afkrydset",
      "oauth": "OAuth-ID'et skal være numerisk",
      "page": "The long description must have a length between 20 and 10000",
      "prefix": "Du skal have mindst et præfiks med en maksimal længde på 10 tegn.",
      "support": "The Support URL needs to be a valid HTTPS link",
      "exists": "Botten findes allerede i databasen, og du har ikke tilladelse til at overskrive dette.",
      "notabot": "Det ID du angav var ikke en botkonto.",
      "notfound": "Det ID du angav blev ikke genkendt af Discord.",
      "add_success": "Tilføjede botten til botlistekøen.",
      "edit_success": "Botten blev redigeret.",
      "count": "The guild count for a bot must be between 0 and 5000000 servers",
      "avatar": "The avatar URL must be a valid HTTPS link, and a maximum of 2000 characters",
      "cover": "The cover URL must be a valid HTTPS link, and a maximum of 2000 characters",
      "preview": "All preview URLs must be a valid HTTPS link, and a maximum of 2000 characters each, with a maximum of 20 links",
      "no_suitable_lang": "Der findes ingen dansk version af denne side. '{{ language }}' anvendes istedet."
    },
    "permissions": {
      "login": "Du er ikke logget ind",
      "denied": "Du har ikke tilstrækkelige rettigheder til at kunne tilgå dette"
    },
    "website": {
      "noscript": "JavaScript er deaktiveret. Funktionaliteten kan være nedsat.",
      "print": "JavaScript er ikke kompatibel med papir udskrivninger."
    },
    "reviews": {
      "rating": "Venligst vælg hvor godt du synes om denne bot før du fortsætter!",
      "text": "Angiv venligst hvorfor du gav dette antal stjerner til botten.",
      "self": "Du kan ikke skrive en anmeldelse for din egen bot!"
    },
    "api": {
      "400": "You are unauthorised to use this endpoint. Check your token is correct.",
      "404": "This endpoint was not found, or the method used to request this page is not compatible.",
      "500": "Der opstod en intern serverfejl.",
      "test": "An error was thrown for development purposes.",
      "no_bot": "Botten blev ikke fundet",
      "idchange": "The ID of the bot cannot be changed to another ID. Please contact Terminal support for technical support"
    }
  },
  "footer": {
    "attribution": "Tilskrivning",
    "licence": "GNU AGPLv3",
    "source": "GitHub",
    "discord": "Discord",
    "terminal": "Terminal.ink",
    "docs": "Dokumentation",
    "view": "Vis denne side på Github"
  },
  "forms": {
    "add": "Tilføj en anden",
    "apply": "Anvend",
    "close": "Luk",
    "delete": "Slet",
    "help": "🤔",
    "select": "Vælg venligst...",
    "submit": "Indsend",
    "wait": "Vent venligst..."
  },
  "intro": {
    "search": "Hvad leder du efter?",
    "docs": "Dokumentation"
  },
  "locales": {
    "ar": "Arabisk",
    "da": "Dansk",
    "de": "Tysk",
    "el": "Græsk",
    "en-GB": "Engelsk (United Kingdom)",
    "es": "Spansk",
    "et": "Estisk",
    "fi": "Finsk",
    "fj": "Fiji",
    "fr": "Fransk",
    "gd": "Gælisk (Skotsk)",
    "hi": "Hindi",
    "it": "Italiensk",
    "ja": "Japansk",
    "ko": "Koreansk",
    "la": "Latin",
    "nl": "Hollandsk",
    "no": "Norsk",
    "pt": "Portugisisk",
    "ru": "Russisk",
    "sv": "Svensk",
    "tr": "Tyrkisk",
    "vi": "Vietnamesisk",
    "zh-cn": "Kinesisk (Simplificeret)",
    "zh-tw": "Kinesisk (Traditionelt)"
  },
  "pages": {
    "bots": {
      "backgroundAlt": "Logoet for discordapps.dev",
      "description": "Et sted hvor du kan finde Discord bots",
      "invite": "Tilføj denne bot",
      "support": "Teknisk Support",
      "website": "Webside",
      "shortname": "Discord Bots",
      "mentionable": "Kan nævnes",
      "customisable": "Kan tilpasses",
      "delete": "Slet",
      "edit": "Rediger",
      "configure": "Konfigurer",
      "github": "Vis på GitHub",
      "approve": "Godkend",
      "deny": "Afvis",
      "prefix": {
        "one": "Præfiks",
        "other": "Præfikser"
      },
      "adverts": "Indeholder funktioner der er låst bag andre tjenester",
      "inAppPurchases": "Has in-app purchases",
      "nsfw": "NSFW",
      "offeredby": "Indsendt af",
      "modified": "Sidst redigeret",
      "created": "Først udgivet",
      "category": "Kategori",
      "initiateCategoryFilter": "Find botter for...",
      "count": "Installeret på {guilds, plural, one {en enkelt server} other {{guilds} servere}}"
    },
    "configuration": {
      "token": {
        "title": "Token",
        "description": "This is the token required to edit your bot on this list. Please refer to the developer documentation for available endpoints.",
        "docs": "Vis dokumentation"
      },
      "renew": "Forny token",
      "hide": {
        "title": "Skjul bot",
        "description": "Du kan skjule din bot fra forsiden, i tilfælde af at du ikke behøver, den skal være der.",
        "disable": "Skjul ikke",
        "enable": "Skjul"
      }
    },
    "edit": {
      "application_id": {
        "modal": "The OAuth ID is the ID which is used when users invite your bot via the OAuth workflow. In almost all cases, this ID is the same as your Bot ID. You will only need to take action if your bot has a difference between the two.",
        "placeholder": "ID'et brugt i OAuth-linket.",
        "title": "OAuth-ID"
      },
      "authors": {
        "modal": "Indtast et enkelt ID på en ejer til botten.",
        "placeholder": "ID på en enkelt ejer",
        "title": "Fortattere til botten",
        "add": "Tilføj en mere"
      },
      "basicinfo": "Grundlæggende oplysninger",
      "nsfw": {
        "title": "Not Safe For Work"
      },
      "support": {
        "placeholder": "I stil med: https://discord.gg/8uC6aKZ",
        "small": "Lad dette felt stå tomt hvis du ikke ønsker at hjælpe folk",
        "title": "Support URL"
      },
      "category": {
        "title": "Kategori"
      },
      "client_id": {
        "modal1": "The bot ID is a number which uniquely identifies the bot user. You can retrieve it by clicking the \"Copy\" button within the Discord Developer portal.",
        "modal2": "You can also find the ID by enabling \"Developer Mode\" in the Discord settings, and then right clicking your bot and pressing \"Copy ID\". Be sure not to copy the ID of the message.",
        "placeholder": "ID'et for botbrugeren",
        "title": "Bot-ID"
      },
      "customisable": {
        "title": "Præfiks der kan tilpasses"
      },
      "description": {
        "title": "Kort beskrivelse"
      },
      "github_owner": {
        "placeholder": "I stil med: ry00001",
        "title": "GitHub bruger / organisation"
      },
      "github_repo": {
        "placeholder": "I stil med: Tuxedo",
        "title": "GitHub Repository"
      },
      "information": "Din botside",
      "invite": {
        "modal": "Please make sure \"Bot ID\" has been filled in with your Discord bot's ID",
        "title": "Invitationslink",
        "generate": "Generer et invitationslink"
      },
      "languages": {
        "add": "Tilføj et sprog",
        "delete": "Slet dette sprog",
        "modal": "Skriv din botside på ethvert af de understøttede sprog. Vælg dit sprog og tryk på 'Tilføj et sprog' knappen.",
        "title": "Sprog for botside"
      },
      "mentionable": {
        "title": "Can mention to trigger bot"
      },
      "name": {
        "title": "Navn"
      },
      "page": {
        "title": "Udvidet beskrivelse"
      },
      "prefix": {
        "placeholder": "Et enkelt præfiks",
        "title": "Præfiks",
        "add": "Tilføj et andet præfiks"
      },
      "flags": {
        "title": "Funding and Advertising Decleration",
        "inAppPurchases": {
          "title": "In App Purchases",
          "small": "Tick this box if you have features behind a paywall"
        },
        "adverts": {
          "title": "Reklamer",
          "small": "Afkryds denne boks hvis du har funktioner der er låst bag andre tjenester"
        }
      },
      "images": {
        "title": "Udseende",
        "avatar": {
          "title": "Avatar URL",
          "placeholder": "Et HTTPS-link til et billede der bruges som avatar"
        },
        "cover": {
          "title": "Cover Image",
          "placeholder": "Et HTTPS-link til et stort billede"
        },
        "preview": {
          "title": "Preview Images",
          "placeholder": "Et HTTPS-link til et enkelt skærmbillede",
          "add": "Tilføj et andet billede"
        }
      },
      "youtube": {
        "title": "YouTube-ID",
        "placeholder": "Et ID til en YouTube-video der demonstrerer din bot"
      },
      "website": {
        "title": "Webside",
        "placeholder": "Et HTTPS-link til din webside"
      },
      "sourcecode": "Kildekode",
      "title": "Tilføj eller rediger en applikation",
      "triggermethods": "Trigger Methods",
      "deleteLanguage": "Slet et sprog",
      "required": "Felter markeret med * er påkrævet.",
      "updates": "It is highly recommended you join the Terminal.ink Discord Server by clicking 'Discord' in the footer, to view service updates, view your application verification status, and also recieve direct messages from staff about your application."
    },
    "error": {
      "notfound": "Siden blev ikke fundet...",
      "server": "Unexpected rapid disassembly encountered",
      "github": "Rapporter denne fejl på GitHub.com",
      "report": "Tak fordi du tager dig tid til at rappotere dene fejl. Fortæl venligst hvad du gjorde inden dette skete."
    },
    "list": {
      "invite": "Inviter",
      "empty": "Der er ingen botter"
    },
    "locale": {
      "choose": "Vælg venligst et sprog.",
      "pleasehelp": "Er du en god oversætter? Klik her."
    },
    "notfound": {
      "gohome": "Gå tilbage til forsiden",
      "message": "Siden blev ikke fundet"
    },
    "sure": {
      "title": "Er du sikker?",
      "ok": "Ok",
      "no": "Gå tilbage"
    },
    "reviews": {
      "title": "Anmeldelser",
      "my": "Min anmeldelse",
      "write": "Skriv en anmeldelse",
      "placeholder": "Angiv venligst en begrundelse for din anmeldelse.",
      "number": {
        "one": "%s anmeldelse",
        "other": "%s anmeldelser"
      },
      "delete": "Slet anmeldelse",
      "all": "Vis alle anmeldelser"
    },
    "admin": {
      "title": "Administratorkonsol",
      "queue": "Vis kø"
    }
  },
  "pagination": {
    "image": {
      "prev": "Tilbage",
      "next": "Næste"
    },
    "page": {
      "prev": "Forrige",
      "next": "Næste side"
    },
    "currentPage": "Side { number }",
    "reviews": "User reviews for '{{ name }}' - Page { number }"
  },
  "permission": {
    "ADD_REACTIONS": "Tilføj Reaktioner",
    "ADMINISTRATOR": "Administrator",
    "ATTACH_FILES": "Vedhæft Filer",
    "BAN_MEMBERS": "Ban Members",
    "CHANGE_NICKNAME": "Change Nickname",
    "CONNECT": "Tilslut",
    "CREATE_INSTANT_INVITE": "Opret Øjeblikkelig Invitation",
    "DEAFEN_MEMBERS": "Gør Medlemmer Døve",
    "EMBED_LINKS": "Integrer Links",
    "KICK_MEMBERS": "Smid Medlemmer Ud",
    "MANAGE_CHANNELS": "Administrer Kanaler",
    "MANAGE_EMOJIS": "Administrer Emojis",
    "MANAGE_GUILD": "Administrer Server",
    "MANAGE_MESSAGES": "Administrer Beskeder",
    "MANAGE_NICKNAMES": "Manage Nicknames",
    "MANAGE_ROLES": "Administrer Roller",
    "MANAGE_WEBHOOKS": "Administrer Webhooks",
    "MENTION_EVERYONE": "Nævn Alle",
    "MOVE_MEMBERS": "Flyt Medlemmer",
    "MUTE_MEMBERS": "Gør Medlemmer Stumme",
    "READ_MESSAGE_HISTORY": "Read Message History",
    "READ_MESSAGES": "Læs Beskeder",
    "SEND_MESSAGES": "Send Beskeder",
    "SEND_TTS_MESSAGES": "Send TTS Beskeder",
    "SPEAK": "Tal",
    "USE_EXTERNAL_EMOJIS": "Brug Eksterne Emojis",
    "USE_VAD": "Brug Stemmeaktivitet",
    "VIEW_AUDIT_LOG": "View Audit Log"
  },
  "site": {
    "name": "Discord Apps",
    "description": "discordapps.dev is an application store for Discord bots. Install applications for music, news, moderation and more for your server."
  },
  "states": {
    "queue": "Ikke verificeret"
  },
  "navbar": {
    "login": "Log på",
    "logout": "Log af",
    "admin": "Administrator",
    "add": "Tilføj en applikation"
  },
  "components": {
    "botpagecontentbox": {
      "toggle": "Toggle arrow",
      "more": "Vis mere",
      "less": "Vis mindre"
    }
  }
};
},{}],"mmKu":[function(require,module,exports) {
module.exports = {
  "categories": {
    "fun": "Fun",
    "games": "Spiele",
    "entertainment": "Unterhaltung",
    "productivity": "Produktivität",
    "education": "Bildung",
    "image": "Bildmanipulation",
    "news": "Nachrichten",
    "music": "Musik",
    "moderation": "Moderation",
    "utility": "Utility",
    "notifications": "Meldungen",
    "other": "Andere"
  },
  "copyright": "Copyright 2017 - 2019, Terminal.ink; Discord ist eine eingetragene Marke von Discord Inc.",
  "errors": {
    "apps": {
      "authors": "Du musst mindestens einen Autor haben und alle Autor IDs müssen nummerisch sein",
      "customisable": "Die änderbarkeit des Prefixes muss entweder ausgewählt oder nicht ausgewählt sein",
      "description": "Die kurze Beschreibung muss zwischen 10 und 64 Zeichen lang sein",
      "githubowner": "Der GitHub Besitzer muss ein gültiger Account sein. Lass es leer, wenn du keinen Account hast.",
      "githubrepo": "Die GitHub Repository muss ein gültiger String sein. Lass es leer, wenn du keine GitHub Repository hast.",
      "id": "Die Bot ID muss ausgefühlt und nummerisch sein",
      "invite": "Der Invite Link muss ausgefüllt und ein gültiger HTTPS Link sein",
      "languages": "Du musst eine einzelne Sprache auswählern befor du weitermachen kannst",
      "mentionable": "Die erwähnbarkeit des Bots muss entweder ausgewählt oder nicht ausgewählt sein",
      "name": "Der Botname muss eine Länge zwischen 4 und 32 Zeichen haben",
      "nsfw": "Der NSFW-status muss entweder ausgewählt oder nicht ausgewählt sein",
      "oauth": "Die OAuth ID muss nummerisch sein",
      "page": "Die lange Beschreibung muss zwischen 20 und 10000 Zeichen lang sein",
      "prefix": "Du musst mindestens einen Prefix haben, welcher maximal 10 Zeichen lang ist.",
      "support": "Der Support-link muss ein gültiger HTTPS Link sein",
      "exists": "Der Bot existiert bereits in der Datenbank und du hast keine Berechtigung, dies zu überschreiben.",
      "notabot": "Die angegebene ID ist nicht von einem Bot.",
      "notfound": "Die angegebene ID wurde von Discord nicht gefunden.",
      "add_success": "Bot wurde zur Botlist-Warteschlange hinzugefügt.",
      "edit_success": "Bot erfolgreich editiert.",
      "avatar": "Die Avatar URL muss ein gültiger HTTPS Link sein und darf nicht länger als 2000 Zeichn sein",
      "cover": "Das Cover URL muss ein gültiger HTTPS Link sein und darf nicht länger als 2000 Zeichn sein",
      "preview": "Die Vorschau URLs müssen gültige HTTPS Links sein, dürfen jeweils nicht länger als 2000 Zeichn sein und es dürfen maximal 20 Links sein.",
      "no_suitable_lang": "Diese Seite hat keine Deutsche version. '{{ language }}' wird stattdessen angezeigt."
    },
    "permissions": {
      "login": "Du bist nicht eingeloggt",
      "denied": "Du hast nicht die richtigen Berechtigungen um darauf zugreiffen zu können",
      "banned": "Dir wurde der Zugang zu dieser Ressourse verwehrt"
    },
    "website": {
      "noscript": "JavaScript wurde deaktiviert. Funktionalität könnte beinträchtigt sein.",
      "print": "JavaScript ist nicht kompatibel mit Papierausdrucke."
    },
    "reviews": {
      "rating": "Bitte wähle eine Bewertung, befor du fortfährst",
      "text": "Bitte gib an, warum du diesem Bot diese Anzahl an Sternen gegeben hast.",
      "self": "Du kannst deinen eigenen Bot nicht bewerten"
    },
    "api": {
      "400": "Du bist nicht berechtigt zum verwenden dieses Endpoints. Überprüfe, ob dein Token korrekt ist.",
      "404": "Dieser Endpunkt konnte nicht gefunden werden, oder die Methode um diese Seite anzufordern ist nicht kompatibel.",
      "500": "Ein interner Server-error ist aufgetreten.",
      "test": "Ein Fehler wurde aus Entwickler-Gründen ausgelöst.",
      "no_bot": "Bot nicht gefunden.",
      "idchange": "Die ID des Bots kann nicht geändert werden. Bitte kontaktiere den Support von Terminal für technische unterstützung."
    }
  },
  "footer": {
    "attribution": "Zuordnung",
    "licence": "GNU AGPLv3",
    "source": "GitHub",
    "discord": "Discord",
    "terminal": "Terminal.ink",
    "docs": "Doks",
    "view": "Diese Seite auf GitHub ansehen"
  },
  "forms": {
    "add": "Weitere hinzufügen",
    "apply": "Anwenden",
    "close": "Schliessen",
    "delete": "Löschen",
    "help": "🤔",
    "select": "Bitte wählen...",
    "submit": "Senden",
    "wait": "Bitte warten..."
  },
  "intro": {
    "search": "Nach was suchst du?",
    "docs": "Dokumentation"
  },
  "locales": {
    "ar": "Arabisch",
    "da": "Dänisch",
    "de": "Deutsch",
    "el": "Griechisch",
    "en-GB": "Englisch (Vereinigtes Königreich)",
    "es": "Spanisch",
    "et": "Estnisch",
    "fi": "Finnisch",
    "fj": "Fijian",
    "fr": "Französisch",
    "gd": "Gälisch (Schottisch)",
    "hi": "Hindi",
    "it": "Italienisch",
    "ja": "Japanisch",
    "ko": "Koreanisch",
    "la": "Lateinisch",
    "nl": "Niederländisch",
    "no": "Norwegisch",
    "pt": "Portugiesisch",
    "ru": "Russisch",
    "sv": "Schwedisch",
    "tr": "Türkisch",
    "vi": "Vietnamesisch",
    "zh-cn": "Chinesisch (Vereinfacht)",
    "zh-tw": "Chinesisch (Traditionell)"
  },
  "pages": {
    "bots": {
      "backgroundAlt": "Das Logo für discordapps.dev",
      "description": "Ein Applikations-Laden für Discord Bots",
      "invite": "Diesen Bot hinzufügen",
      "support": "Technischer Support",
      "website": "Webseite",
      "shortname": "Discord Botliste",
      "mentionable": "Erwähnbar",
      "customisable": "Änderbar",
      "delete": "Löschen",
      "edit": "Editieren",
      "configure": "Konfigurieren",
      "github": "Auf GitHub ansehen",
      "approve": "Annehmen",
      "deny": "Ablehnen",
      "prefix": {
        "one": "Prefix",
        "other": "Prefixe"
      },
      "more": "Zeige mehr",
      "less": "Zeige weniger",
      "adverts": "Enthält Werbung und Features hinter einem anderen Service",
      "inAppPurchases": "Hat in-app Käufe",
      "nsfw": "NSFW",
      "offeredby": "Angeboten von:",
      "modified": "Zuletzt bearbeitet",
      "created": "Zuerst veröffentlicht",
      "category": "Kategorie",
      "search": "Suche",
      "count": "In {guilds, plural, one {einem einzigen Server} other {{guilds} Server}}"
    },
    "configuration": {
      "token": {
        "title": "Token",
        "description": "Das ist der Token welcher zum bearbeiten deines Bots auf dieser Liste benötigt wird. Bitte schaue dir die Developer Dokumentation für verfügbare Endpoints an.",
        "docs": "Zeige Dokumentation"
      },
      "renew": "Token erneuern",
      "hide": {
        "title": "Bot ausblenden",
        "description": "Du kannst deinen Bot von der Hauptseite ausblenden, wenn du Ihn dort nicht brauchst.",
        "disable": "Anzeigen",
        "enable": "Ausblenden"
      }
    },
    "edit": {
      "application_id": {
        "modal": "Die OAuth ID ist die ID, welche verwendet wird, wenn User deinen Bot per OAuth arbaitsablauf einladen. In fast jedem Fall ist die ID die selbe, wie die von deinem Bot. Du musst nur etwas tun, wenn es Unterschiede zwischen den beiden gibt.",
        "placeholder": "Die verwendete ID im OAuth Link",
        "title": "OAuth ID"
      },
      "authors": {
        "modal": "Gib eine einzelne ID für den Besitzer des Bots ein.",
        "placeholder": "ID eines einzelnen Besitzers",
        "title": "Bot Autoren",
        "add": "Weitere hinzufügen"
      },
      "basicinfo": "Einfache informationen",
      "nsfw": {
        "title": "Nicht sicher für die Arbeit"
      },
      "support": {
        "placeholder": "Soetwas wie: https://discord.gg/8uC6aKZ",
        "small": "Lass dieses Feld leer, wenn du nicht gerne anderen hilfst",
        "title": "Support URL"
      },
      "category": {
        "title": "Kategorie"
      },
      "client_id": {
        "modal1": "Die Bot ID ist eine Nummer, welche den Bot einzigartig identifiziert. Du kannst Ihn erhalten, wenn du auf den \"Copy\" Knopf im Discord Developer Portal klickst.",
        "modal2": "Du kannst den Link auch finden, wenn du \"Developer Mode\" in den Discord Einstellungen aktivierst, den Bot rechtsklickst und dann \"ID kopieren\" auswählst. Stell sicher, dass du nicht die ID der Nachricht kopierst.",
        "placeholder": "Die ID des Bot Users",
        "title": "Bot ID"
      },
      "customisable": {
        "title": "Prefix änderbar"
      },
      "description": {
        "title": "Kurze Beschreibung"
      },
      "github_owner": {
        "placeholder": "Etwas wie: ry00001",
        "title": "GitHub Benutzer / Organisation"
      },
      "github_repo": {
        "placeholder": "Etwas wie: Tuxedo",
        "title": "GitHub Repository"
      },
      "information": "Information",
      "invite": {
        "modal": "Stelle sicher \"Bot ID\" enthält die ID deines Bots",
        "title": "Einladungs URL",
        "generate": "Erstelle einen Link"
      },
      "languages": {
        "add": "Sprache hinzufügen",
        "delete": "Diese Sprache löschen",
        "modal": "Schreibe deine Botseite in jede unterstützte Sprache. Wähle eine Sprache und klicke auf den 'Sprache hinzufügen' Knopf.",
        "title": "Sprachen"
      },
      "mentionable": {
        "title": "Bot kann erwähnt werden zum nutzen"
      },
      "name": {
        "title": "Name"
      },
      "page": {
        "title": "Längere Beschreibung"
      },
      "prefix": {
        "placeholder": "Ein einzelner Prefix",
        "title": "Prefix",
        "add": "Weitere hinzufügen"
      },
      "flags": {
        "title": "Erklärung zur Finanzierung und Werbung",
        "inAppPurchases": {
          "title": "In-App käufe",
          "small": "Aktiviere dieses Kontrollkästchen, wenn du Funktionen hinter einer Paywall hast"
        },
        "adverts": {
          "title": "Werbung",
          "small": "Aktiviere dieses Kontrollkästchen, wenn dein Bot Werbung und/oder Features hinter einem externen service hat"
        }
      },
      "images": {
        "title": "Darstellung",
        "avatar": {
          "title": "Avatar URL",
          "placeholder": "Ein HTTPS Link zu einem Avatar Bild"
        },
        "cover": {
          "title": "Cover Bild",
          "placeholder": "Ein HTTPS Link zu einem grossen Bild"
        },
        "preview": {
          "title": "Vorschaubilder",
          "placeholder": "Ein HTTPS Link zu einem einzelnen Screenshot",
          "add": "Weiteres Bild hinzufügen"
        }
      },
      "youtube": {
        "title": "YouTube ID",
        "placeholder": "Eine ID zu einem YouTube-Video, welche eine Demonstration deines Bots zeigt"
      },
      "website": {
        "title": "Webseite",
        "placeholder": "Ein HTTPS Link zu deiner Webseite"
      },
      "sourcecode": "Quellcode",
      "title": "Hinzufügen oder bearbeiten einer Anwendung",
      "triggermethods": "Trigger Methoden",
      "deleteLanguage": "Eine Sprache löschen",
      "required": "Mit * markierte Felder sind auszufüllen.",
      "updates": "Es ist empfohlen, dem Terminal.ink Discord beizutreten um Service updates, Nachrichten über den Status deines Bots und direkte Nachrichten von Team-Mitgliedern zu erhalten.",
      "discord": "Terminal.ink beitreten"
    },
    "error": {
      "notfound": "Seite nicht gefunden...",
      "server": "Unerwartet schnelle Demontage festgestellt",
      "github": "Melde diesen Fehler auf GitHub.com",
      "report": "Danke dass du dir Zeit nimmst, um diesen Fehler zu melden. Bitte schreibe, was du vor dem Vorfall getan hast."
    },
    "list": {
      "invite": "Einladen",
      "empty": "Da sind keine Bots"
    },
    "locale": {
      "choose": "Bitte wähle eine Sprache.",
      "pleasehelp": "Bist du ein guter Übersetzer? Klick hier."
    },
    "notfound": {
      "gohome": "Hauptseite",
      "message": "Seite nicht gefunden"
    },
    "sure": {
      "title": "Bist du dir sicher?",
      "ok": "Ok",
      "no": "Zurück gehen"
    },
    "reviews": {
      "title": "Bewertungen",
      "my": "Meine Bewertung",
      "write": "Schreibe eine Bewertung",
      "placeholder": "Bitte gib einen Grund für deine Bewertung ein.",
      "number": {
        "one": "%s Bewertung",
        "other": "%s Bewertungen"
      },
      "delete": "Bewertung löschen",
      "all": "Alle Bewertungen ansehen"
    },
    "admin": {
      "title": "Administrator Konsole",
      "queue": "Warteschlange ansehen",
      "denied": "Zeige abgelehnte",
      "banned": "Zeige gebannte",
      "state": {
        "reason": "Gib einen Grund für das ändern des Statuses von dem Bot ein",
        "change": "Status ändern"
      }
    }
  },
  "pagination": {
    "image": {
      "prev": "Vorherige",
      "next": "Nächste"
    },
    "page": {
      "prev": "Vorherige",
      "next": "Nächste Seite"
    },
    "currentPage": "Seite { number }",
    "reviews": "User reviews for '{{ name }}' - Page { number }"
  },
  "permission": {
    "ADD_REACTIONS": "Reactionen hinzufügen",
    "ADMINISTRATOR": "Administrator",
    "ATTACH_FILES": "Dateien anhängen",
    "BAN_MEMBERS": "Mitglieder bannen",
    "CHANGE_NICKNAME": "Nickname ändern",
    "CONNECT": "Verbinden",
    "CREATE_INSTANT_INVITE": "Soforteinladung erstellen",
    "DEAFEN_MEMBERS": "Mitglieder taubschalten",
    "EMBED_LINKS": "Links einbetten",
    "KICK_MEMBERS": "Mitglieder kicken",
    "MANAGE_CHANNELS": "Kanäle verwalten",
    "MANAGE_EMOJIS": "Emojis verwalten",
    "MANAGE_GUILD": "Server verwalten",
    "MANAGE_MESSAGES": "Nachrichten verwalten",
    "MANAGE_NICKNAMES": "Nicknamen verwalten",
    "MANAGE_ROLES": "Rollen verwalten",
    "MANAGE_WEBHOOKS": "Webhooks verwalten",
    "MENTION_EVERYONE": "Alle erwähnen",
    "MOVE_MEMBERS": "Mitglieder verschieben",
    "MUTE_MEMBERS": "Mitglieder Stummschalten",
    "READ_MESSAGE_HISTORY": "Nachrichtenverlauf lesen",
    "READ_MESSAGES": "Nachrichten lessen",
    "SEND_MESSAGES": "Nachrichten senden",
    "SEND_TTS_MESSAGES": "TTS Nachrichten senden",
    "SPEAK": "Sprechen",
    "USE_EXTERNAL_EMOJIS": "Externe Emojis verwenden",
    "USE_VAD": "Sprachaktivierung verwenden",
    "VIEW_AUDIT_LOG": "Auditlogs ansehen"
  },
  "site": {
    "name": "Discord Apps",
    "description": "discordapps.dev ist ein applikations-store für Discord Bots. Installiere applikationen für Musik, News, Moderation und mehr für deinen Server."
  },
  "states": {
    "approved": "Genehmigt",
    "denied": "Abgelehnt",
    "queue": "In Warteschlange",
    "banned": "Gebannt"
  },
  "navbar": {
    "add": "App hinzufügen",
    "login": "Einloggen",
    "logout": "Ausloggen",
    "admin": "Admin"
  }
};
},{}],"bdyH":[function(require,module,exports) {
module.exports = {
  "categories": {
    "fun": "Fun",
    "games": "Games",
    "entertainment": "Entertainment",
    "productivity": "Productivity",
    "education": "Education",
    "image": "Image Manipulation",
    "news": "News",
    "music": "Music",
    "moderation": "Moderation",
    "utility": "Utility",
    "notifications": "Notifications",
    "other": "Miscellaneous"
  },
  "alt": {
    "avatar": "Avatar for {name}"
  },
  "copyright": "Copyright 2017 - 2019, Terminal.ink",
  "errors": {
    "rpc": {
      "invite": "The installation URL must filled out, and also be a valid HTTPS link"
    },
    "bots": {
      "invite": "The invite URL must be filled out, and also be a valid HTTPS link",
      "notabot": "The ID provided was not a bot account.",
      "notfound": "The ID provided was not found by Discord."
    },
    "apps": {
      "authors": "You must have at least 1 author of the application, and all Author IDs must be numeric",
      "boolean": "A non-boolean value was sent to the server. Please contact Terminal.ink support.",
      "category": "You must select a category for your application",
      "customisable": "The customisability of the prefix must be either ticked, or unticked",
      "contents": "You must select at least one language for your application page to be displayed in. Click a language, and then click \"Add a language\"",
      "description": "The short description must have a length between 10 and 100",
      "githubowner": "The GitHub owner needs to be a valid GitHub user. Leave blank if you do not have a GitHub account.",
      "githubrepo": "The GitHub repository needs to be a valid string. Leave blank if you do not have a GitHub repository.",
      "id": "The Application ID needs to be filled out, and numeric",
      "website": "The Website URL needs to be a valid HTTPS link",
      "languages": "You must add a single language. Click the language you want your application page to be in, and select the 'Add a language' button",
      "mentionable": "The mentionability of the prefix must be either ticked, or unticked",
      "name": "The application must have a name of length between 4 and 32.",
      "nsfw": "The NSFW status must be either ticked, or unticked",
      "oauth": "The OAuth ID needs to be numeric",
      "page": "The long description must have a length between 20 and 10000",
      "prefix": "You must have at least 1 prefix, of max length 10.",
      "support": "The Support URL needs to be a valid HTTPS link",
      "exists": "The application already exists in the database, and you do not have permission to overwrite this.",
      "add_success": "Added application to the queue.",
      "edit_success": "Edited application successfully.",
      "count": "The guild count for a bot must be between 0 and 5000000 servers",
      "avatar": "The avatar URL must be a valid HTTPS link, and a maximum of 2000 characters",
      "cover": "The background URL must be a valid HTTPS link, and a maximum of 2000 characters. Additionally, the background URL may not be identical to the avatar URL.",
      "preview": "All preview URLs must be a valid HTTPS link, and a maximum of 2000 characters each, with a maximum of 20 links",
      "no_suitable_lang": "This page has no English version. '{{ language }}' is being displayed instead.",
      "youtube": "The YouTube video ID needs to look like an ID",
      "youku": "The YOUKU video ID needs to look like an ID"
    },
    "permissions": {
      "login": "You are not logged in",
      "denied": "You do not have the adequate permissions to access this",
      "banned": "You have been denied access to this resource"
    },
    "reviews": {
      "rating": "Please select a rating before continuing",
      "text": "Please enter why you gave this number of stars for this application.",
      "self": "You cannot review your own application!"
    },
    "api": {
      "400": "You are unauthorised to use this endpoint. Check your token is correct.",
      "404": "This endpoint was not found, or the method used to request this page is not compatible.",
      "500": "An internal server error occurred.",
      "test": "An error was thrown for development purposes.",
      "no_bot": "Application not found",
      "idchange": "The ID of the application cannot be changed to another ID. Please contact Terminal support for technical support"
    },
    "website": {
      "noscript": "JavaScript must be enabled to use this website effectively."
    }
  },
  "footer": {
    "attribution": "Dependencies",
    "licence": "GNU AGPLv3",
    "source": "GitHub",
    "discord": "Discord",
    "terminal": "Terminal.ink",
    "terms": "Terms",
    "docs": "Docs",
    "foss": "Discord Apps is powered by the Terminal.ink Bot List Open Source Project",
    "apple": "Apple, the Apple logo, iPhone, and iPad are trademarks of Apple Inc., registered in the U.S. and other countries and regions. App Store is a service mark of Apple Inc."
  },
  "forms": {
    "select": "Please select...",
    "submit": "Submit",
    "wait": "Please wait..."
  },
  "intro": {
    "search": "What are you looking for?",
    "docs": "Documentation"
  },
  "locales": {
    "ar": "Arabic",
    "da": "Danish",
    "de": "German",
    "el": "Greek",
    "en-GB": "English (United Kingdom)",
    "en-US": "English (United States)",
    "es": "Spanish",
    "et": "Estonian",
    "fi": "Finnish",
    "fj": "Fijian",
    "fr": "French",
    "gd": "Gaelic (Scottish)",
    "hi": "Hindi",
    "he": "Hebrew",
    "it": "Italian",
    "ja": "Japanese",
    "ko": "Korean",
    "la": "Latin",
    "nl": "Dutch",
    "no": "Norwegian",
    "pl": "Polish",
    "pt": "Portuguese",
    "ru": "Russian",
    "sv": "Swedish",
    "tr": "Turkish",
    "vi": "Vietnamese",
    "zh-cn": "Chinese (Simplified)",
    "zh-tw": "Chinese (Traditional)"
  },
  "pages": {
    "home": {
      "bots": {
        "title": "Bots",
        "description": "Find the perfect bot for your Discord server",
        "link": "Start exploring"
      },
      "rpc": {
        "title": "Rich Presence Plugins",
        "description": "Show off what you are doing in Discord with RPC applications",
        "link": "Start sharing"
      },
      "discover": {
        "title": "Discover Terminal.ink",
        "description": "See how we work on improving the Terminal.ink Bot List Open Source Project",
        "link": "Blog"
      },
      "topBots": "Top Rated Bots",
      "randomBots": "Random Selection",
      "newestBots": "Just Added",
      "popularBots": "Most Installed",
      "smallBots": "Growing Bots",
      "topRPC": "RPC applications"
    },
    "apps": {
      "oneLang": "This page is only available in the following language",
      "otherLang": "This page is available in other languages",
      "appLinks": "Application Links",
      "devLinks": "Developer Links",
      "reclaim": "No data. Join Terminal.ink to claim"
    },
    "rpc": {
      "index": {
        "title": "Rich Presence List",
        "description": "Show off what you're doing, with a wide range of Discord RPC plugins for Windows, Mac or Linux software. Browse RPC and more on Discord Apps"
      },
      "edit": "Edit RPC Application",
      "invite": "Install this application",
      "supports": "Supports: {operatingSystems}"
    },
    "bots": {
      "index": {
        "title": "Bot List",
        "description": "Find a Discord Bot for your server to improve your work-flow, add a bit of fun or listen together with Discord Bots. Browse bots and more on Discord Apps"
      },
      "backgroundAlt": "The logo for discordapps.dev",
      "inMyLanguage": "Bots in my Language",
      "invite": "Add this bot",
      "support": "Technical Support",
      "website": "Website",
      "mentionable": "Mentionable",
      "customisable": "Customisable",
      "delete": "Delete",
      "reallyDelete": "Sure?",
      "edit": "Edit",
      "configure": "Token and Configuration",
      "github": "View on GitHub",
      "prefix": "{count, plural, one {Prefix} other {Prefixes}}",
      "adverts": "Contains adverts and features locked behind other services",
      "inAppPurchases": "Has in-app purchases",
      "nsfw": "NSFW",
      "offeredby": "Developers",
      "modified": "Last modified",
      "created": "First published",
      "category": "Category",
      "initiateCategoryFilter": "Categories",
      "count": "Installed in {guilds, plural, one {a server} other {{guilds} servers}}"
    },
    "configuration": {
      "token": {
        "title": "Token",
        "description": "This is the token required to edit your application on this list. Please refer to the developer documentation for available endpoints.",
        "docs": "View Documentation",
        "renew": "Renew Token"
      },
      "hide": {
        "title": "Hide application",
        "description": "You can hide your application from the front page of the website, in case you don't need to be there.",
        "disable": "Un-hide",
        "enable": "Hide"
      }
    },
    "edit": {
      "rpc": {
        "invite": {
          "title": "Installation URL",
          "placeholder": "Enter a HTTPS link to your website to download your software"
        },
        "flags": {
          "title": "Available Features",
          "win": {
            "title": "Supports Microsoft Windows"
          },
          "mac": {
            "title": "Supports Apple MacOS X"
          },
          "linux": {
            "title": "Supports Linux",
            "small": "What you're referring to as Linux, is in fact, GNU/Linux, or as I've recently taken to calling it, GNU plus Linux."
          }
        }
      },
      "invite": {
        "title": "Invite URL",
        "placeholder": "Enter a HTTPS link to invite your bot"
      },
      "application_id": {
        "placeholder": "The ID used in the OAuth link.",
        "title": "OAuth ID"
      },
      "authors": {
        "placeholder": "ID of a single owner",
        "title": "Authors",
        "add": "Add another",
        "delete": "Remove author"
      },
      "basicinfo": "Basic Information",
      "nsfw": {
        "title": "Not Safe For Work"
      },
      "support": {
        "placeholder": "Something like: https://discord.gg/8uC6aKZ",
        "small": "Leave this field empty if you don't like helping people",
        "title": "Support URL"
      },
      "category": {
        "title": "Category",
        "placeholder": "Select a category"
      },
      "client_id": {
        "placeholder": "The ID of the application",
        "title": "Application ID"
      },
      "customisable": {
        "title": "Customisable prefix"
      },
      "description": {
        "title": "Short Description",
        "placeholder": "Enter a shorter description, shown on the home page."
      },
      "github_owner": {
        "placeholder": "The owner of the GitHub repository",
        "title": "GitHub User / Organisation"
      },
      "github_repo": {
        "placeholder": "The name of the GitHub repository",
        "title": "GitHub Repository"
      },
      "information": "Application Page Appearance",
      "languages": {
        "modal": "Write your application page in many supported languages. Select a language, then click the \"Add a language\" button to the right.",
        "add": "Add a language",
        "delete": "Delete this language"
      },
      "leave": "Are you sure you want to leave? Unmodified changes will not be saved.",
      "mentionable": {
        "title": "Can mention to trigger bot"
      },
      "name": {
        "title": "Name",
        "placeholder": "Enter the name of the application."
      },
      "page": {
        "title": "Extended Description",
        "placeholder": "Enter useful information about your application, like commands, features and updates."
      },
      "prefix": {
        "placeholder": "A single prefix",
        "title": "Prefix",
        "add": "Add another prefix",
        "delete": "Remove prefix"
      },
      "flags": {
        "title": "Funding and Advertising Declaration",
        "inAppPurchases": {
          "title": "In App Purchases",
          "small": "Tick this box if you have features behind a pay-wall, such as donations"
        },
        "adverts": {
          "title": "Advertisements",
          "small": "Tick this box if your bot links to other bot lists, and/or have features that are locked behind other services/bot lists"
        }
      },
      "images": {
        "title": "Appearance",
        "avatar": {
          "title": "Avatar URL",
          "placeholder": "A HTTPS link to an avatar image"
        },
        "cover": {
          "title": "Background Image",
          "placeholder": "A HTTPS link to a large image"
        },
        "preview": {
          "title": "Preview Images",
          "placeholder": "A HTTPS link to a single screen-shot",
          "add": "Add another image",
          "delete": "Delete"
        }
      },
      "youtube": {
        "title": "YouTube ID",
        "placeholder": "An ID to a YouTube video"
      },
      "youku": {
        "title": "Alibaba YOUKU ID",
        "placeholder": "An ID to a YOUKU video"
      },
      "website": {
        "title": "Website",
        "placeholder": "A HTTPS link to your website"
      },
      "sourcecode": "Source Code",
      "title": "Add or Edit an Application",
      "triggermethods": "Trigger Methods",
      "deleteLanguage": "Delete a language",
      "required": "Fields marked with * are required.",
      "updates": "It is highly recommended you join the Terminal.ink Discord Server to view service updates, view your application verification status, and also receive direct messages from staff about your application.",
      "discord": "Join Terminal.ink"
    },
    "error": {
      "notfound": "Page not found...",
      "server": "Internal Server Error",
      "github": "Report this error at GitHub.com",
      "report": "Thanks for taking the time to report this error. Please type in what you were doing before the incident.",
      "snarky": "This error was going to happen anyway."
    },
    "list": {
      "empty": "There are no applications which matches the current filter."
    },
    "locale": {
      "choose": "Please select a language.",
      "pleasehelp": "Are you a good translator? Click here."
    },
    "langdev": {
      "title": "Look at all language keys",
      "compare": "Compare selected languages",
      "key": "JSON Key",
      "notfound": "Key not found!"
    },
    "reviews": {
      "title": "Reviews",
      "write": "Write a review",
      "placeholder": "Please enter a reason for your review.",
      "delete": "Delete review"
    },
    "admin": {
      "title": "Administration Console"
    },
    "filter": {
      "authors": {
        "placeholder": "ID of a single owner",
        "title": "Bot Authors",
        "add": "Add another",
        "delete": "Remove author"
      },
      "category": {
        "title": "Category",
        "placeholder": "All categories"
      },
      "query": {
        "title": "Search",
        "placeholder": "Enter text"
      },
      "nsfw": {
        "title": "Not Safe For Work",
        "placeholder": "Do not filter",
        "nsfw": "Not Safe for Work",
        "sfw": "Safe For Work"
      },
      "type": {
        "title": "Application Type",
        "placeholder": "All Applications",
        "bots": "Bots",
        "rpc": "Rich Presence"
      },
      "state": {
        "placeholder": "Any state",
        "title": "State"
      }
    },
    "game": {
      "title": "Terminal.ink Game",
      "description": "Click the button to get points!",
      "leave": "Are you sure you want to leave? You will lose all your points.",
      "score": "You have {kliksphilip, plural, =0 {no points :heejintears:} one {1 point} other {{kliksphilip} points}}."
    },
    "docs": {
      "by": "By {name}",
      "more": "View more",
      "noMore": "There are no more posts!",
      "back": "Back to posts",
      "title": "Terminal.ink Documentation and Blog",
      "description": "See posts about how Terminal.ink operates, or see a tutorial on how to do something.",
      "headers": {
        "blog": "Latest blog posts",
        "howto": "Tutorials",
        "docs": "Website Documentation Series"
      }
    }
  },
  "navbar": {
    "add": "Add a bot",
    "addRpc": "Add RPC app",
    "login": "Login",
    "logout": "Logout",
    "admin": "Administration",
    "languages": "Languages",
    "search": "Search for bots",
    "user": "My Bots"
  },
  "pagination": {
    "page": {
      "prev": "Previous",
      "next": "Next Page"
    },
    "currentPage": "Page { number }",
    "reviews": "User reviews for '{{ name }}' - Page { number }"
  },
  "permission": {
    "ADD_REACTIONS": "Add Reactions",
    "ADMINISTRATOR": "Administrator",
    "ATTACH_FILES": "Attach Files",
    "BAN_MEMBERS": "Ban Members",
    "CHANGE_NICKNAME": "Change Nickname",
    "CONNECT": "Connect",
    "CREATE_INSTANT_INVITE": "Create Instant Invite",
    "DEAFEN_MEMBERS": "Deafen Members",
    "EMBED_LINKS": "Embed Links",
    "KICK_MEMBERS": "Kick Members",
    "MANAGE_CHANNELS": "Manage Channels",
    "MANAGE_EMOJIS": "Manage Emojis",
    "MANAGE_GUILD": "Manage Server",
    "MANAGE_MESSAGES": "Manage Messages",
    "MANAGE_NICKNAMES": "Manage Nicknames",
    "MANAGE_ROLES": "Manage Roles",
    "MANAGE_WEBHOOKS": "Manage Webhooks",
    "MENTION_EVERYONE": "Mention Everyone",
    "MOVE_MEMBERS": "Move Members",
    "MUTE_MEMBERS": "Mute Members",
    "READ_MESSAGE_HISTORY": "Read Message History",
    "READ_MESSAGES": "Read Messages",
    "SEND_MESSAGES": "Send Messages",
    "SEND_TTS_MESSAGES": "Send TTS Messages",
    "SPEAK": "Speak",
    "USE_EXTERNAL_EMOJIS": "Use External Emojis",
    "USE_VAD": "Use Voice Activity",
    "VIEW_AUDIT_LOG": "View Audit Log"
  },
  "site": {
    "name": "Discord Apps",
    "subheading": "Find bots to enhance your server",
    "description": "discordapps.dev is an application store for Discord applications. Install bots for music, news, moderation and more for your server, or install RPC plugins to show off what you're doing."
  },
  "states": {
    "approved": "Approved",
    "denied": "Changes required",
    "queue": "In Queue",
    "banned": "Banned"
  },
  "types": {
    "all": "All Applications",
    "bots": "Bots",
    "rpc": "Rich Presence",
    "webhooks": "Webhooks"
  },
  "components": {
    "pleaseaddyourbotpleasethanks": {
      "title": "Get started with Discord Bots",
      "innovate": {
        "heading": "Start Innovating",
        "content": "Learn to create your own Discord application for your own personal server"
      },
      "add": {
        "heading": "Add your app",
        "content": "Share your creation to the world; Let others enhance their server experience with your applications"
      }
    },
    "categorycollection": {
      "morebots": "See more"
    },
    "botpagecontentbox": {
      "toggle": "Toggle arrow",
      "more": "View more",
      "less": "View less"
    },
    "helpusimprove": {
      "title": "Help us",
      "text": "Please comment with feedback on this website via the issues tab on GitHub.",
      "issues": "GitHub Issues"
    },
    "botpagesetstatebox": {
      "state": {
        "title": "Set state",
        "placeholder": "Please select a state"
      },
      "reason": {
        "title": "Reason",
        "placeholder": "Reason for changing the state. (optional)"
      },
      "submit": "Update State"
    },
    "botpagelinks": {
      "share": "You should check out '{name}' at Discord Apps"
    },
    "botcard": {
      "rated": "Rated {score}/5.0 by {count} {count, plural, one {user} other {users}}",
      "noRating": "No ratings"
    }
  }
};
},{}],"pac/":[function(require,module,exports) {
module.exports = {};
},{}],"AhAd":[function(require,module,exports) {
module.exports = {
  "categories": {
    "fun": "Fun",
    "games": "Jeux",
    "entertainment": "Divertissement",
    "productivity": "Productivité",
    "education": "Éducation",
    "image": "Manipulation d'images",
    "news": "Nouvelles",
    "music": "Musique",
    "moderation": "Modération",
    "utility": "Utilitaire",
    "notifications": "Notifications",
    "other": "Autre"
  },
  "copyright": "Copyright 2017 - 2019, Terminal.ink; Discord est une marque appartenant Discord Inc.\nTraduction en français par iDroid27, Bowser65, blue et Lionir.",
  "errors": {
    "apps": {
      "authors": "Vous devez avoir au moins 1 auteur de ce bot, et tous vos IDs doivent être numériques",
      "category": "Vous devez sélectionner une catégorie pour votre bot",
      "customisable": "La customisabilité de votre préfixe doit être soit coché, ou décoché",
      "contents": "Vous devez sélectionner au moins une langue pour que votre bot soit disponible. Cliquez sur une langue, puis cliquez sur \"Ajouter une langue\"",
      "description": "La description courte doit avoir une taille entre 10 et 100 caractères",
      "githubowner": "Le propriétaire GitHub doit être un utilisateur GitHub valide. Laissez vide si vous n'avez pas de compte GitHub.",
      "githubrepo": "le répertoire GitHub doit être une chaine de caractères valide. Laissez vide si vous n'avez pas de répertoire GitHub.",
      "id": "L'ID du bot doit être renseigné, et numerique",
      "website": "L'URL du site web doit être un lien HTTPS valide",
      "languages": "Vous devez ajouter au moins une langue. Sélectionnez le langue dans laquelle vous voulez que vote page de bot soie, et cliquez sur le bouton 'Ajouter cette langue'",
      "mentionable": "la mentionnabilité du préfixe doit être soit coché, ou décoché",
      "name": "Le bot doit avoir un nom d'une longueur entre 4 et 32 caractères.",
      "nsfw": "Le status NSFW doit être soit coché, ou décoché",
      "oauth": "L'ID OAuth doit être numerique",
      "page": "la longue description doit avoir une longueur entre 20 et 10000 caractères.",
      "prefix": "Vous devez avoir au moins un prefixe, d'une longueur maximale de 10 caractères.",
      "support": "L'URL d'assistance doit être un lien HTTPS valide",
      "exists": "Le bot existe déjà dans la base de données, et vous n'avez pas la permissions d'écraser cela.",
      "add_success": "Le bot a été ajouté à la liste d'attente des bots.",
      "edit_success": "Bot édité avec succès.",
      "count": "Le nombre de guildes pour le bot doit être entre 0 et 5000000 serveurs",
      "avatar": "L'URL de l'avatar doit être un lien HTTPS valide, avec une longueur maximale de 2000 caractères",
      "cover": "L'URL de la couverture doit être un lien HTTPS valide, avec une longueur maximale de 2000 caractères",
      "preview": "Toutes les URL d'aperçu doivent être des liens HTTPS valides, avec une longueur maximale de 2000 caractères chacun, avec un maximum de 20 liens",
      "no_suitable_lang": "Cette page n'a pas de version Française. La version en {{ language }} est affiché à la place.",
      "youtube": "L'ID Youtube doit ressembler à un ID",
      "youku": "L'ID YOUKU doit ressembler à un ID",
      "boolean": "Une valeur non-booléenne a été envoyée au serveur. Veuillez contacter le support Terminal.ink"
    },
    "bots": {
      "invite": "L'URL d'invitation doit être remplie, et doit être un lien HTTPS valide",
      "notabot": "L'ID fourni n'était pas un ID de bot.",
      "notfound": "L'ID fourni n'a pas été trouvé par Discord."
    },
    "rpc": {
      "invite": "L'URL d'installation doit être remplie, et doit être un lien HTTPS valide"
    },
    "permissions": {
      "login": "Vous n'êtes pas connecté",
      "denied": "Vous n'avez pas les permissions adéquates afin d'accéder à cela",
      "banned": "Vous avez été interdit d'accéder à cette ressource"
    },
    "website": {
      "noscript": "JavaScript a été désactivé. Cernaines fonctionnalitées risquent d'être réduites."
    },
    "reviews": {
      "rating": "Veuillez sélectionner une note avant de continuer",
      "text": "Veuillez entrer pourquoi vous avez donné cette note à ce bot.",
      "self": "Vous ne pouvez pas critiquer votre propre bot!"
    },
    "api": {
      "400": "Vous n'êtes pas autorisé à utiliser ce chemin. Vérifiez la validité du jeton.",
      "404": "Ce chemin n'a pas été trouvé, ou la méthode utilisée pour effectuer cette requête n'est pas supportée.",
      "500": "Une erreur interne au serveur est survenue.",
      "test": "Une erreur a été lancée à des fins de développement.",
      "no_bot": "Bot introuvable",
      "idchange": "L'ID du bot ne peut être changé pour un autre ID. Veuillez contacter le support de Terminal pour une assistance technique"
    }
  },
  "footer": {
    "attribution": "Attribution",
    "licence": "GNU AGPLv3",
    "source": "GitHub",
    "discord": "Discord",
    "terminal": "Terminal.ink",
    "terms": "Conditions d'utilisation",
    "docs": "Docs",
    "foss": "Discord Apps est propulsé par le Terminal.ink Bot List Open Source Project",
    "apple": "Apple, le logo Apple, iPhone et iPad sont des marques commerciales de Apple Inc., déposées aux États-Unis et dans d'autres pays et régions. App Store est une marque de service d'Apple Inc."
  },
  "forms": {
    "select": "Veuillez séléctionner...",
    "submit": "Envoyer",
    "wait": "Veuillez patienter..."
  },
  "intro": {
    "search": "Que recherchez vous?",
    "docs": "Documentation"
  },
  "locales": {
    "ar": "Arabe",
    "da": "Danois",
    "de": "Allemand",
    "el": "Grec",
    "en-GB": "Anglais (Royaume Uni)",
    "en-US": "Anglais (États-Unis)",
    "es": "Espagnol",
    "et": "Estonien",
    "fi": "Finlandais",
    "fj": "Fidjien",
    "fr": "Français",
    "gd": "Gaélique (Écossais)",
    "hi": "Hindi",
    "he": "Hébreu",
    "it": "Italien",
    "ja": "Japonais",
    "ko": "Coréen",
    "la": "Latin",
    "nl": "Néerlandais",
    "no": "Norvégien",
    "pl": "Polonais",
    "pt": "Portugais",
    "ru": "Russe",
    "sv": "Suédois",
    "tr": "Turc",
    "vi": "Vietnamien",
    "zh-cn": "Chinois (Simplifié)",
    "zh-tw": "Chinois (Traditionnel)"
  },
  "pages": {
    "apps": {
      "oneLang": "Cette page est seulement disponible dans la langue suivante",
      "otherLang": "Cette page est disponible dans d'autres langues",
      "appLinks": "Liens de l'application",
      "devLinks": "Liens de développeur",
      "reclaim": "Aucune donnée. Rejoignez Terminal.ink pour revendiquer"
    },
    "home": {
      "bots": {
        "title": "Bots",
        "description": "Trouvez le bot parfait pour votre serveur",
        "link": "Commencez à explorer"
      },
      "rpc": {
        "title": "Plugins de Présence Riche",
        "description": "Montrez ce que vous êtes en train de faire dans Discord grâce aux applications RPC",
        "link": "Commencez à partager"
      },
      "discover": {
        "title": "Découvrez Terminal.ink",
        "description": "Voyez comment nous travaillons pour améliorer le Terminal.ink Bot List Open Source Project",
        "link": "Blog"
      },
      "topBots": "Bots les mieux notés",
      "randomBots": "Sélection aléatoires",
      "popularBots": "Les plus installés",
      "smallBots": "Bots en croissance",
      "topRPC": "Applications RPC"
    },
    "bots": {
      "backgroundAlt": "Logo pour discordapps.dev",
      "inMyLanguage": "Bots dans ma langue",
      "invite": "Inviter ce bot",
      "support": "Support technique",
      "website": "Site Internet",
      "mentionable": "Mentionable",
      "customisable": "Customisable",
      "delete": "Supprimer",
      "edit": "Éditer",
      "configure": "Configurer",
      "github": "Voir sur GitHub",
      "adverts": "Contient de la publicité et des fonctionalités cachées par d'autres services",
      "inAppPurchases": "Achats dans l'application",
      "nsfw": "NSFW",
      "offeredby": "Proposé par :",
      "modified": "Dernière modification",
      "created": "Publication",
      "category": "Catégorie",
      "initiateCategoryFilter": "Catégories",
      "count": "Installé dans {guilds, plural, one {un seul serveur} other {{guilds} serveurs}}"
    },
    "rpc": {
      "index": {
        "title": "Liste de Présence Riche",
        "description": "Montrez ce que vous faites, avec une grande variété de plugins RPC pour Discord sur Windows, Mac ou Linux. Parcourez RPC et plus sur Discord Apps"
      }
    },
    "configuration": {
      "token": {
        "title": "Jeton",
        "description": "Ceci est le jeton requis pour modifier votre bot sur la liste. Veuillez vous refferer à la documentation pour developers pour les endpoints disponibles.",
        "docs": "Voir la documentation"
      },
      "hide": {
        "title": "Masquer le bot",
        "description": "Vous pouvez masquer votre bot de la page d'accueil du site, si vous ne souhaitez pas qu'il y soit.",
        "disable": "Afficher",
        "enable": "Masquer"
      }
    },
    "edit": {
      "application_id": {
        "placeholder": "L'ID utilisé dans le lien OAuth",
        "title": "ID OAuth"
      },
      "authors": {
        "placeholder": "ID d'un seul propriétaire",
        "title": "Auteur(s) du Bot",
        "add": "Ajouter un(e) autre"
      },
      "basicinfo": "Informations Basiques",
      "nsfw": {
        "title": "Non adapté pour toutes les audiences"
      },
      "support": {
        "placeholder": "Quelque chose comme https://discord.gg/8uC6aKZ",
        "small": "Laissez ce champ vide si vous n'aimez pas aider les gens",
        "title": "Serveur d'assistance"
      },
      "category": {
        "title": "Catégorie"
      },
      "client_id": {
        "placeholder": "L'ID de l'utilisateur associé au bot",
        "title": "ID du bot"
      },
      "customisable": {
        "title": "Préfixe customisable"
      },
      "description": {
        "title": "Description courte"
      },
      "github_owner": {
        "placeholder": "Quelque chose comme ry00001",
        "title": "Utilisateur ou Organisation"
      },
      "github_repo": {
        "placeholder": "Quelque chose comme Tuxedo",
        "title": "Répertoire"
      },
      "information": "Page de votre bot",
      "invite": {
        "title": "URL d'invitation",
        "generate": "Générer une URL"
      },
      "languages": {
        "add": "Ajouter une langue",
        "delete": "Supprimer cette langue",
        "modal": "Écrivez la page de votre bot dans n'importe quelle langue prise en charge. Sélectionnez une langue, et cliquez sur \"Ajouter cette langue\"."
      },
      "mentionable": {
        "title": "Possibilité de mentionner le bot pour le déclencher"
      },
      "name": {
        "title": "Nom"
      },
      "page": {
        "title": "Description extensive"
      },
      "prefix": {
        "placeholder": "Un seul préfixe",
        "title": "Préfixe",
        "add": "Ajouter un autre préfixe"
      },
      "flags": {
        "title": "Notification de publicité et/ou de monétisation",
        "inAppPurchases": {
          "title": "Achats dans l'application",
          "small": "Cochez cette case si le bot a des fonctionnalités payantes"
        },
        "adverts": {
          "title": "Publicités",
          "small": "Cochez cette case si votre bot affiche des publicités, incluant d'autres listes de bots"
        }
      },
      "images": {
        "title": "Apparance",
        "avatar": {
          "title": "URL de l'Avatar",
          "placeholder": "Un lien HTTPS vers une image d'avatar"
        },
        "cover": {
          "title": "Image de couverture",
          "placeholder": "Un lien HTTPS vers une image large"
        },
        "preview": {
          "title": "Images d'aperçu",
          "placeholder": "Un lien HTTPS vers une image montrant un aperçu de votre bot",
          "add": "Ajouter une autre image"
        }
      },
      "youtube": {
        "title": "ID YouTube",
        "placeholder": "Un ID d'une vidéo YouTube faisant une démonstration de votre bot"
      },
      "youku": {
        "title": "YOUKU ID",
        "placeholder": "Un ID d'une vidéo YOUKU"
      },
      "website": {
        "title": "Site Internet",
        "placeholder": "Un lien HTTPS vers votre site Internet"
      },
      "sourcecode": "Code Source",
      "title": "Ajouter ou Modifier une Application",
      "triggermethods": "Méthodes de déclenchement",
      "deleteLanguage": "Supprimer une langue",
      "required": "Les champs marqués d'un * sont requis.",
      "updates": "Il est vivement conseillé de rejoindre le serveur Discord de Terminak.ink en cliquant sur 'Discord' en bas de la page, afin de voir les mises à jour du service, voir le statut de la vérification de votre bot, ainsi que recevoir des messages privés de la part du staff à propos de votre application.",
      "discord": "Rejoindre Terminal.ink"
    },
    "error": {
      "notfound": "Page introuvable...",
      "server": "Erreur Interne du Serveur",
      "github": "Rapporter ce bug sur GitHub.com",
      "report": "Merci de prendre le temps de nous signaler cette erreur. Veuillez mentionner ce que vous étiez en train de faire avant l'incident.",
      "snarky": "C'était sûr d'arriver..."
    },
    "list": {
      "empty": "Il n'y a pas de bots"
    },
    "locale": {
      "choose": "Sélectionnez une langue.",
      "pleasehelp": "Êtes-vous un bon traducteur ? Cliquez ici."
    },
    "langdev": {
      "title": "Voir les clés des langages",
      "compare": "Comparer les langages sélectionnés",
      "key": "Clé JSON",
      "notfound": "Clé introuvable !"
    },
    "reviews": {
      "title": "Critique",
      "write": "Écrire une critique",
      "placeholder": "Veuillez entrer pourquoi vous avez donné cette note à ce bot.",
      "delete": "Supprimer la critique"
    },
    "admin": {
      "title": "Console d'Administration"
    }
  },
  "navbar": {
    "add": "Ajouter votre application",
    "login": "Se connecter",
    "logout": "Déconnexion",
    "admin": "Administration",
    "languages": "Langages",
    "user": "Mes Bots"
  },
  "pagination": {
    "page": {
      "prev": "Prédédent",
      "next": "Suivant"
    },
    "currentPage": "Page { number }",
    "reviews": "Critiques des utilisateurs pour '{{ name }}' - Page { number }"
  },
  "permission": {
    "ADD_REACTIONS": "Ajouter des réactions",
    "ADMINISTRATOR": "Administrateur",
    "ATTACH_FILES": "Attacher des fichiers",
    "BAN_MEMBERS": "Bannir des membres",
    "CHANGE_NICKNAME": "Changer de pseudo",
    "CONNECT": "Se connecter",
    "CREATE_INSTANT_INVITE": "Créer une invitation",
    "DEAFEN_MEMBERS": "Rendre des membres sourds",
    "EMBED_LINKS": "Attacher des liens",
    "KICK_MEMBERS": "Expulser des membres",
    "MANAGE_CHANNELS": "Gérer les salons",
    "MANAGE_EMOJIS": "Gérer les émojis",
    "MANAGE_GUILD": "Gérer le serveur",
    "MANAGE_MESSAGES": "Gérer les messages",
    "MANAGE_NICKNAMES": "Gérer les pseudos",
    "MANAGE_ROLES": "Gérer les rôles",
    "MANAGE_WEBHOOKS": "Gérer les webhooks",
    "MENTION_EVERYONE": "Mentionner @everyone",
    "MOVE_MEMBERS": "Déplacer les membres",
    "MUTE_MEMBERS": "Rendre des membres muets",
    "READ_MESSAGE_HISTORY": "Voir les anciens messages",
    "READ_MESSAGES": "Lire les messages",
    "SEND_MESSAGES": "Envoyer des messages",
    "SEND_TTS_MESSAGES": "Envoyer des messages TTS",
    "SPEAK": "Parler",
    "USE_EXTERNAL_EMOJIS": "Utiliser des émojis externes",
    "USE_VAD": "Utiliser la détection de voix",
    "VIEW_AUDIT_LOG": "Voir les logs du serveur"
  },
  "site": {
    "name": "Discord Apps",
    "description": "discordapps.dev est une boutique d'application pour des applications Discord. Installez des applications pour de la musique, pour des nouvelles, pour modérer et plus pour votre serveur, ou même des plugins RPC pour montrer ce que vous êtes entrain de faire."
  },
  "states": {
    "approved": "Approuvé",
    "denied": "Refusé",
    "queue": "En attente",
    "banned": "Banni"
  },
  "components": {
    "botpagecontentbox": {
      "toggle": "Basculer la flèche",
      "more": "Voir plus",
      "less": "Vois moins"
    }
  }
};
},{}],"EG4I":[function(require,module,exports) {
module.exports = {
  "categories": {
    "fun": "Zabawa",
    "games": "Gry",
    "entertainment": "Rozrywka",
    "productivity": "Produktywność",
    "education": "Edukacja",
    "image": "Manipulacja zdjęciami",
    "news": "Aktualności",
    "music": "Muzyka",
    "moderation": "Moderacja",
    "utility": "Użyteczność",
    "notifications": "Powiadomienia",
    "other": "Inne"
  },
  "copyright": "Prawa autorskie 2017 - 2019, Terminal.ink; Discord jest znakiem towarowym Discord Inc.",
  "errors": {
    "apps": {
      "authors": "Musisz mieć co najmniej jednego autora bota, a wszystkie jego ID muszą być numeryczne",
      "category": "Musisz wybrać kategorię dla swojego bota",
      "customisable": "Możliwość dostosowania prefiksa musi być zaznaczona lub usunięta",
      "description": "Krótki opis musi mieć długość od 10 do 100 znaków",
      "githubowner": "Właściciel GitHub musi być prawidłowym użytkownikiem GitHub. Pozostaw puste, jeśli nie masz konta GitHub.",
      "githubrepo": "Repozytorium GitHub musi być poprawne. Pozostaw puste, jeśli nie masz repozytorium GitHub.",
      "id": "ID Bota musi być wypełnione i numeryczne",
      "invite": "Adres URL zaproszenia musi zostać wypełniony i jako poprawny link HTTPS",
      "website": "Adres URL strony musi być prawidłowym linkiem HTTPS",
      "languages": "Musisz dodać jeden język. Kliknij język, w którym chcesz umieścić stronę swojego robota, i wybierz przycisk 'Dodaj język'",
      "mentionable": "Opcjonalność wzmiankowa prefiksa musi być zaznaczona lub usunięta",
      "name": "Bot musi mieć nazwę o długości od 4 do 32 znaków.",
      "nsfw": "Status NSFW musi być zaznaczone lub odznaczone",
      "oauth": "ID OAuth musi być numeryczne",
      "page": "Długi opis musi mieć długość od 20 do 10000 znaków",
      "prefix": "Musisz mieć co najmniej jeden prefiks, o maksymalnej długości 10.",
      "support": "Adres URL pomocy technicznej musi być prawidłowym linkiem HTTPS",
      "exists": "Bot już istnieje w bazie danych i nie masz uprawnień do jego zastąpienia.",
      "notabot": "Podane ID nie było kontem bota.",
      "notfound": "Podane ID nie zostało znalezione przez Discorda.",
      "add_success": "Dodano bota do kolejki listy botów.",
      "edit_success": "Zedytowano bota poprawnie.",
      "count": "Liczba serwerów dla bota musi wynosić od 0 do 5000000 serwerów",
      "avatar": "Adres URL awatara musi być prawidłowym linkiem HTTPS i nie może przekraczać 2000 znaków",
      "cover": "Adres URL strony tytułowej musi być prawidłowym linkiem HTTPS, maksymalnie 2000 znaków",
      "preview": "Wszystkie adresy URL podglądu muszą być poprawnym linkiem HTTPS, maksymalnie 2000 znaków każdy, maksymalnie 20 linków",
      "no_suitable_lang": "Ta strona nie ma wersji angielskiej. '{{ language }}' jest wyświetlany zamiast tego.",
      "youtube": "YouTube ID musi wyglądać jak ID",
      "youku": "Alibaba YOUKU ID musi wyglądać jak ID"
    },
    "permissions": {
      "login": "Nie jesteś zalogowany",
      "denied": "Nie masz odpowiednich uprawnień, aby uzyskać do niego dostęp",
      "banned": "Odmówiono Ci dostępu do tego zasobu"
    },
    "website": {
      "noscript": "JavaScript został wyłączony. Funkcjonalność może zostać zmniejszona.",
      "print": "JavaScript nie jest zgodny z wydrukami papierowymi."
    },
    "reviews": {
      "rating": "Przed kontynuowaniem wybierz ocenę",
      "text": "Proszę podać, dlaczego dałeś taką liczbie gwiazdek dla tego bota.",
      "self": "Nie możesz zrecenzować własnego bota!"
    },
    "api": {
      "400": "Nie jesteś uprawniony do używania tego punktu końcowego. Sprawdź swój token.",
      "404": "Ten punkt końcowy nie został znaleziony lub metoda używana do żądania tej strony nie jest zgodna.",
      "500": "Wystąpił wewnętrzny błąd serwera.",
      "test": "Wystąpił błąd w celach programistycznych.",
      "no_bot": "Bot nie znaleziony",
      "idchange": "ID bota nie może zostać zmienione na inne ID. Skontaktuj się z obsługą Terminalu, aby uzyskać pomoc techniczną"
    }
  },
  "footer": {
    "attribution": "Przypisanie",
    "licence": "GNU AGPLv3",
    "source": "GitHub",
    "discord": "Discord",
    "terminal": "Terminal.ink",
    "terms": "Regulamin",
    "docs": "Dokumentacja",
    "view": "Wyświetl tę stronę na GitHubie"
  },
  "forms": {
    "add": "Dodaj kolejnego",
    "apply": "Zastosuj",
    "close": "Zamknij",
    "delete": "Usuń",
    "help": "🤔",
    "select": "Proszę wybrać...",
    "submit": "Zatwierdź",
    "wait": "Proszę czekać..."
  },
  "intro": {
    "search": "Czego szukasz?",
    "docs": "Dokumentacja"
  },
  "locales": {
    "ar": "Arabski",
    "da": "Duński",
    "de": "Niemiecki",
    "el": "Grecki",
    "en-GB": "Angielski (Zjednoszone Królestwo)",
    "es": "Hiszpański",
    "et": "Estoński",
    "fi": "Fiński",
    "fj": "Fidżi",
    "fr": "Francuski",
    "gd": "Celtycki",
    "hi": "Hinduski",
    "he": "Hebrajski",
    "it": "Włoski",
    "ja": "Japoński",
    "ko": "Koreański",
    "la": "Łacina",
    "nl": "Holenderski",
    "no": "Norweski",
    "pl": "Polski",
    "pt": "Portugalski",
    "ru": "Rosyjski",
    "sv": "Szwedzki",
    "tr": "Turecki",
    "vi": "Wietnamski",
    "zh-cn": "Chiński (Uproszczony)",
    "zh-tw": "Chiński (Tradycyjny)"
  },
  "pages": {
    "bots": {
      "backgroundAlt": "Logo dla discordapps.dev",
      "description": "Zbiór aplikacji dla botów Discord",
      "invite": "Dodaj tego bota",
      "support": "Pomoc techniczna",
      "website": "Strona internetowa",
      "shortname": "Discordowy bot",
      "mentionable": "Wzmiankowalny",
      "customisable": "Konfigurowalny",
      "delete": "Usuń",
      "edit": "Edytuj",
      "configure": "Skonfiguruj",
      "github": "Zobacz na GitHubie",
      "approve": "Potwierdzony",
      "deny": "Odrzucony",
      "prefix": {
        "one": "Prefiks",
        "other": "Prefiksy"
      },
      "more": "Zobacz więcej",
      "less": "Zobacz mniej",
      "adverts": "Zawiera reklamy i funkcje zablokowane za innymi usługami",
      "inAppPurchases": "Ma zakupy w aplikacji",
      "nsfw": "NSFW",
      "offeredby": "Stworzony przez:",
      "modified": "Ostatnio zmodyfikowany",
      "created": "Opublikowany po raz pierwszy",
      "category": "Kategoria",
      "search": "Szukaj",
      "count": "Zainstalowany na {guilds, plural, one {jednym serwerze} other {{guilds} serwerach}}"
    },
    "configuration": {
      "token": {
        "title": "Token",
        "description": "To jest token wymagany do edycji twojego bota na tej liście. Informacje na temat dostępnych punktów końcowych można znaleźć w dokumentacji dla programistów.",
        "docs": "Zobacz dokumentację"
      },
      "renew": "Odnów token",
      "hide": {
        "title": "Ukryj bota",
        "description": "Możesz ukryć swojego bota z pierwszej strony, na wypadek, gdybyś nie chciał by tam był.",
        "disable": "Odkryj",
        "enable": "Ukryj"
      }
    },
    "edit": {
      "application_id": {
        "modal": "ID OAuth to ID, które jest używany, gdy użytkownicy zapraszają Twojego bota przez OAuth. W prawie wszystkich przypadkach te ID jest takie samo jak ID bota. Będziesz musiał tylko podjąć działanie, jeśli twój bot ma różnicę między tymi dwoma.",
        "placeholder": "ID użyte w linku OAuth.",
        "title": "OAuth ID"
      },
      "authors": {
        "modal": "Wpisz jedno ID właściciela bota.",
        "placeholder": "ID jednego właściciela",
        "title": "Autorzy botów",
        "add": "Dodaj kolejnego"
      },
      "basicinfo": "Podstawowe informacje",
      "nsfw": {
        "title": "Niebezpieczne dla pracy (NSFW)"
      },
      "support": {
        "placeholder": "Coś jak: https://discord.gg/8uC6aKZ",
        "small": "Pozostaw to pole puste, jeśli nie lubisz pomagać ludziom",
        "title": "Adres URL serwera supportu"
      },
      "category": {
        "title": "Kategoria"
      },
      "client_id": {
        "modal1": "ID bota jest numerem, który jednoznacznie identyfikuje użytkownika bota. Możesz go odzyskać, klikając przycisk \"Kopiuj\" w obrębie portalu Discord Developer.",
        "modal2": "ID można również znaleźć, włączając \"Tryb dewelopera\" w ustawieniach Discorda, a następnie kliknij prawym przyciskiem myszy i naciśnij \"Kopiuj ID\". Pamiętaj, aby nie skopiować ID wiadomości.",
        "placeholder": "ID użytkownika bota",
        "title": "ID bota"
      },
      "customisable": {
        "title": "Konfigurowalny prefiks"
      },
      "description": {
        "title": "Krótki opis"
      },
      "github_owner": {
        "placeholder": "Coś jak: ry00001",
        "title": "Organizacja/Użytkownik GitHuba"
      },
      "github_repo": {
        "placeholder": "Coś jak: Tuxedo",
        "title": "Repozytorium GitHuba"
      },
      "information": "Twoja strona z botem",
      "invite": {
        "modal": "Proszę upewnij się, że \"ID bota\" został wypełniony numerem ID bota Discord",
        "title": "Adres URL zaproszenia",
        "generate": "Wygeneruj link do zaproszenia"
      },
      "languages": {
        "add": "Dodaj język",
        "delete": "Usuń ten język",
        "modal": "Napisz stronę swojego bota w dowolnym obsługiwanym języku. Wybierz język i kliknij przycisk 'Dodaj język'.",
        "title": "Języki stron bota"
      },
      "mentionable": {
        "title": "Można wzmiankować aby uruchomić bota"
      },
      "name": {
        "title": "Nazwa"
      },
      "page": {
        "title": "Rozszerzony opis"
      },
      "prefix": {
        "placeholder": "Pojedynczy prefiks",
        "title": "Prefiks",
        "add": "Dodaj kolejny prefiks"
      },
      "flags": {
        "title": "Deklaracja finansowania i reklamy",
        "inAppPurchases": {
          "title": "Zakupy w aplikacji",
          "small": "Zaznacz to pole, jeśli masz funkcje płatne"
        },
        "adverts": {
          "title": "Reklamy",
          "small": "Zaznacz to pole, jeśli masz reklamy i / lub funkcje, które są zablokowane za innymi usługami"
        }
      },
      "images": {
        "title": "Wygląd",
        "avatar": {
          "title": "Adres URL awatara",
          "placeholder": "Link HTTPS do obrazu awatara"
        },
        "cover": {
          "title": "Okładka",
          "placeholder": "Link HTTPS do dużego obrazu"
        },
        "preview": {
          "title": "Podgląd obrazów",
          "placeholder": "Link HTTPS do jednego zrzutu ekranu",
          "add": "Dodaj kolejne zdjęcie"
        }
      },
      "youtube": {
        "title": "YouTube ID",
        "placeholder": "ID do filmu na YouTube"
      },
      "youku": {
        "title": "Alibaba YOUKU ID",
        "placeholder": "ID do filmu na YOUKU"
      },
      "website": {
        "title": "Strona internetowa",
        "placeholder": "Link HTTPS do Twojej strony"
      },
      "sourcecode": "Kod źródłowy",
      "title": "Dodaj lub edytuj aplikację",
      "triggermethods": "Metody wyzwalania",
      "deleteLanguage": "Usuń język",
      "required": "Pola zaznaczone * są wymagane.",
      "updates": "Zaleca się dołączenie na serwer Discord Terminal.ink aby wyświetlić aktualizacje, zobaczyć status weryfikacji bota a także otrzymywać bezpośrednie wiadomości od pracowników dotyczące twojej aplikacji.",
      "discord": "Dołącz na serwer Terminal.ink"
    },
    "error": {
      "notfound": "Strona nie znaleziona...",
      "server": "Wewnętrzny błąd serwera",
      "github": "Zgłoś ten błąd na GitHub.com",
      "report": "Dziękuje za poświęcenie Twojego czasu żeby zgłosić ten błąd. Proszę wpisz co robiłeś/aś przed incydentem.",
      "snarky": "Z pewnością musiało tak się stać..."
    },
    "list": {
      "invite": "Zaproszenie",
      "empty": "Nie ma botów"
    },
    "locale": {
      "choose": "Proszę wybrać język.",
      "pleasehelp": "Jesteś dobrym tłumaczem? Kliknij tutaj."
    },
    "langdev": {
      "title": "Zobacz na wszystkie klucze języków",
      "compare": "Porównaj wybrane języki",
      "key": "JSON klucz",
      "notfound": "Klucz nie znaleziony!"
    },
    "notfound": {
      "gohome": "Strona główna",
      "message": "Strona nie została znaleziona"
    },
    "sure": {
      "title": "Czy jesteś pewny?",
      "ok": "Ok",
      "no": "Wróć"
    },
    "reviews": {
      "title": "Recenzje",
      "my": "Moja recenzja",
      "write": "Napisz recenzję",
      "placeholder": "Proszę wpisać powód Twojej recenzji.",
      "number": {
        "one": "%s recenzja",
        "other": "%s recenzji(e)"
      },
      "delete": "Usuń wszystkie recenzje",
      "all": "Zobacz wszystkie recenzje"
    },
    "admin": {
      "title": "Konsola Administracji",
      "queue": "Zobacz boty w kolejce",
      "denied": "Zobacz odrzucone boty",
      "banned": "Zobacz zbanowane boty",
      "state": {
        "reason": "Wpisz powód zmiany stanu bota",
        "change": "Zmień stan bota"
      }
    }
  },
  "navbar": {
    "add": "Dodaj aplikację",
    "login": "Zaloguj się",
    "logout": "Wyloguj",
    "admin": "Administrator",
    "languages": "Języki",
    "user": "Moje boty"
  },
  "pagination": {
    "image": {
      "prev": "Poprzednie",
      "next": "Następne"
    },
    "page": {
      "prev": "Poprzednia strona",
      "next": "Następna strona"
    },
    "currentPage": "Strona { number }",
    "reviews": "Recenzje użytkowników dla '{{ name }}' - Strona { number }"
  },
  "permission": {
    "ADD_REACTIONS": "Dodawanie reakcji",
    "ADMINISTRATOR": "Administrator",
    "ATTACH_FILES": "Załączanie plików",
    "BAN_MEMBERS": "Banowanie członków",
    "CHANGE_NICKNAME": "Zmiania pseudonimu",
    "CONNECT": "Połączanie",
    "CREATE_INSTANT_INVITE": "Tworzenie natychmiastowych zaproszeń",
    "DEAFEN_MEMBERS": "Wyciszanie członków",
    "EMBED_LINKS": "Zamieszczanie linków",
    "KICK_MEMBERS": "Wyrzucanie członków",
    "MANAGE_CHANNELS": "Zarządzanie kanałami",
    "MANAGE_EMOJIS": "Zarządzanie emotikonami",
    "MANAGE_GUILD": "Zarządzanie Serwerem",
    "MANAGE_MESSAGES": "Zarządzanie Wiadomościami",
    "MANAGE_NICKNAMES": "Zarządzanie przezwiskami",
    "MANAGE_ROLES": "Zarządzanie rolami",
    "MANAGE_WEBHOOKS": "Zarządzanie Webhookami",
    "MENTION_EVERYONE": "Powiadamianie wszystkich",
    "MOVE_MEMBERS": "Przenoszenie członków",
    "MUTE_MEMBERS": "Wyciszanie członków",
    "READ_MESSAGE_HISTORY": "Czytanie historii wiadomości",
    "READ_MESSAGES": "Czytanie wiadomości",
    "SEND_MESSAGES": "Wysyłanie wiadomości",
    "SEND_TTS_MESSAGES": "Wysyłanie wiadomości TTS",
    "SPEAK": "Rozmawianie",
    "USE_EXTERNAL_EMOJIS": "Użycie zewnętrznych emoji",
    "USE_VAD": "Użycie aktywacji głosowej",
    "VIEW_AUDIT_LOG": "Wyświetl dziennik zdarzeń"
  },
  "site": {
    "name": "Aplikacje Discord",
    "description": "discordapps.dev to zbiór aplikacji dla Discordowych botów. Instaluj aplikacje dla muzyki, aktualności, moderacji i więcej dla Twojego serwera."
  },
  "states": {
    "approved": "Zatwierdzony",
    "denied": "Odrzucony",
    "queue": "W kolejce",
    "banned": "Zbanowany"
  }
};
},{}],"kGVP":[function(require,module,exports) {
module.exports = {
  "categories": {
    "fun": "玩乐",
    "games": "游戏",
    "entertainment": "娱乐",
    "productivity": "生产力",
    "education": "教育",
    "image": "图片生成",
    "news": "新闻",
    "music": "音乐",
    "moderation": "管理",
    "utility": "效益",
    "notifications": "通知",
    "other": "其他"
  },
  "copyright": "2017 - 2019, Terminal.ink 版权所有; Discord 是 Discord Inc. 的商标。",
  "errors": {
    "apps": {
      "authors": "至少需要一个用户是该机器人的作者，并且所有作者ID须为数字。",
      "category": "您必须为该机器人选择至少一项分类。",
      "customisable": "“前缀的可设置性”选项须为勾选或未勾选。",
      "description": "简短说明的字数须在10至100之间。",
      "githubowner": "“GitHub项目拥有者”项必须是有效的Github账户，如果您没有GitHub账户可以留空。",
      "githubrepo": "GitHub项目须为有效的字符串，如果您没有GitHub项目则可留空。",
      "id": "必须填写“机器人ID”栏，须为全数字。",
      "invite": "“邀请网址”栏是必填项，且需要是有效的HTTPS链接。",
      "website": "网址须为有效的HTTPS链接。",
      "languages": "您必须为该机器人选择一门语言。选择一门您想要让您的机器人页面所在的语言，然后点击“添加一门语言”按钮。",
      "mentionable": "前缀的可提及性须是已勾选或未勾选。",
      "name": "机器人的名字长度需为4至32个字符之间。",
      "nsfw": "机器人的NSFW状态须为已勾选或未勾选。",
      "oauth": "机器人的OAuth ID须为全数字。",
      "page": "机器人的说明文本长度须为20至10000个字符之间。",
      "prefix": "您必须有至少一个不超过10个字符的前缀。",
      "support": "机器人的支援网址必须为有效的HTTPS链接。",
      "exists": "此机器人已经存在于数据库中，而您没有权限覆写。",
      "notabot": "您所提供的ID不是一个机器人账户。",
      "notfound": "在Discord中找不到您所以提供的ID。",
      "add_success": "成功添加此机器人到列表中。",
      "edit_success": "成功编辑该机器人。",
      "count": "机器人的服务器计数须在0至5000000之间。",
      "avatar": "机器人的头像网址须为一个有效的HTTPS网址，且不超过2000个字符。",
      "cover": "机器人的封面图须为一个有效的HTTPS链接，且不超过2000个字符。",
      "preview": "所有预览网址须为有效的HTTPS链接，且不超过2000个字符和20个链接。",
      "no_suitable_lang": "此页面没有英语版本，将使用 '{{ language }}' 显示。"
    },
    "permissions": {
      "login": "您还未登录。",
      "denied": "您没有访问此页的权限。",
      "banned": "您已被禁止访问此资源。"
    },
    "website": {
      "noscript": "JavaScript已禁用，某些功能可能被限制。",
      "print": "JavaScript与打印功能不兼容。"
    },
    "reviews": {
      "rating": "在继续前，请选择一个评级。",
      "text": "请说明您给这个星数的原因。",
      "self": "您不能评价您自己的机器人！"
    },
    "api": {
      "400": "您未被授权使用此端点，请检查您的密钥是否正确。",
      "404": "找不到此端点，或使用了不支持的方式访问该页面。",
      "500": "内服服务器发生错误。",
      "test": "一个错误用于开发用途而被抛出。",
      "no_bot": "找不到机器人。",
      "idchange": "无法更换机器人ID。欲获得技术支持，请联络Terminal客户支持。"
    }
  },
  "footer": {
    "attribution": "署名",
    "licence": "GNU AGPLv3",
    "source": "GitHub",
    "discord": "Discord",
    "terminal": "Terminal.ink",
    "docs": "文档",
    "view": "在GitHub查看此页面"
  },
  "forms": {
    "add": "添加其他",
    "apply": "应用",
    "close": "关闭",
    "delete": "删除",
    "help": "🤔",
    "select": "请选择…",
    "submit": "提交",
    "wait": "请稍后…"
  },
  "intro": {
    "search": "您在寻找什么？",
    "docs": "文档"
  },
  "locales": {
    "ar": "阿拉伯语",
    "da": "丹麦语",
    "de": "德语",
    "el": "希腊语",
    "en-GB": "英语（英国）",
    "es": "西班牙语",
    "et": "爱沙尼亚语",
    "fi": "芬兰语",
    "fj": "斐济语",
    "fr": "法语",
    "gd": "苏格兰语",
    "hi": "印地语",
    "he": "希伯来语",
    "it": "意大利语",
    "ja": "日语",
    "ko": "韩语",
    "la": "拉丁语",
    "nl": "荷兰语",
    "no": "挪威语",
    "pt": "葡萄牙语",
    "ru": "俄语",
    "sv": "瑞典语",
    "tr": "土耳其语",
    "vi": "越南语",
    "zh-cn": "简体中文",
    "zh-tw": "繁体中文"
  },
  "pages": {
    "bots": {
      "add": "添加一个应用",
      "backgroundAlt": "discordapps.dev 的图标",
      "description": "一个展示Discord机器人的应用商场",
      "invite": "添加这个机器人",
      "support": "技术支持",
      "website": "网站",
      "shortname": "Discord机器人",
      "mentionable": "可提及",
      "customisable": "可定制",
      "delete": "删除",
      "edit": "编辑",
      "configure": "设置",
      "github": "在GitHub中查看",
      "approve": "接受",
      "deny": "拒绝",
      "prefix": {
        "one": "前缀",
        "other": "前缀"
      },
      "more": "更多",
      "less": "更少",
      "adverts": "含有在其他服务之后的广告和功能",
      "inAppPurchases": "Has in-app purchases 包含内购",
      "nsfw": "NSFW",
      "offeredby": "提供：",
      "modified": "最后修改",
      "created": "创建于",
      "category": "分类",
      "initiateCategoryFilter": "为…寻找机器人",
      "ownerFilter": "{ name } 创建的机器人",
      "count": "已在{guilds, plural, one {一} other {{guilds}}}个服务器上安装"
    },
    "configuration": {
      "token": {
        "title": "密钥",
        "description": "这是编辑您在这个列表的机器人时必要的密钥。欲得知支持的端点，请参考开发者文档。",
        "docs": "查看文档"
      },
      "renew": "更新密钥",
      "hide": {
        "title": "隐藏机器人",
        "description": "您可以选择在网站首页上隐藏您的机器人，如果您不想要它出现在那里的话。",
        "disable": "取消隐藏",
        "enable": "隐藏"
      }
    },
    "edit": {
      "application_id": {
        "modal": "OAuth ID是用户通过OAuth邀请您的机器人时所使用的ID。多数情况下，此ID跟您的机器人ID相同。只有在您的机器人ID和此ID不同时才需要另填。",
        "placeholder": "用于OAuth链接的ID。",
        "title": "OAuth ID"
      },
      "authors": {
        "modal": "填写单一机器人拥有者的ID。",
        "placeholder": "单一拥有者的ID",
        "title": "机器人拥有者",
        "add": "添加其他"
      },
      "basicinfo": "基本信息",
      "nsfw": {
        "title": "不适合在工作场合出现"
      },
      "support": {
        "placeholder": "例如：https://discord.gg/8uC6aKZ",
        "small": "如果您不喜欢帮助别人，此栏可以留空。",
        "title": "支援网址"
      },
      "category": {
        "title": "分类"
      },
      "client_id": {
        "modal1": "机器人ID是一串识别该机器人的唯一标识符。您可以在Discord的开发者后台里点击“复制”按钮获取。",
        "modal2": "您也可以通过开启Discord里的“开发者模式”获得该ID，右键点击您的机器人然后选择“复制ID”。小心不要复制到消息的ID。",
        "placeholder": "机器人用户的ID",
        "title": "机器人ID"
      },
      "customisable": {
        "title": "可自定义前缀"
      },
      "description": {
        "title": "简短说明"
      },
      "github_owner": {
        "placeholder": "例如：ry00001",
        "title": "GitHub用户/团队"
      },
      "github_repo": {
        "placeholder": "例如：Tuxedo",
        "title": "GitHub版本库"
      },
      "information": "您的机器人页面",
      "invite": {
        "modal": "请确保您的机器人ID栏已经填入“机器人ID”栏。",
        "title": "邀请网址",
        "generate": "生成邀请网址"
      },
      "languages": {
        "add": "添加语言",
        "delete": "删除这个语言",
        "modal": "使用任何一门支持的语言编写您的机器人页面。选择一门语言，然后点击“添加语言”按钮。",
        "title": "机器人页面语言"
      },
      "mentionable": {
        "title": "可以使用提及触发机器人"
      },
      "name": {
        "title": "名字"
      },
      "page": {
        "title": "更详细的说明"
      },
      "prefix": {
        "placeholder": "单一前缀",
        "title": "前缀",
        "add": "添加其他前缀"
      },
      "flags": {
        "title": "捐助和广告声明",
        "inAppPurchases": {
          "title": "应用内购买",
          "small": "如果付费能获得更多功能，勾选此项"
        },
        "adverts": {
          "title": "广告",
          "small": "如果您有广告或需要让用户使用一些服务以激活某些功能，勾选此项"
        }
      },
      "images": {
        "title": "外观",
        "avatar": {
          "title": "头像网址",
          "placeholder": "头像的HTTPS链接"
        },
        "cover": {
          "title": "封面图片",
          "placeholder": "大图片的HTTPS链接"
        },
        "preview": {
          "title": "预览图",
          "placeholder": "单一截图的HTTPS链接",
          "add": "添加其他图片"
        }
      },
      "youtube": {
        "title": "YouTube ID",
        "placeholder": "一个示范机器人的影片的Youtube ID"
      },
      "website": {
        "title": "网站",
        "placeholder": "您网站的HTTPS网址"
      },
      "sourcecode": "源码",
      "title": "添加或编辑一个程序",
      "triggermethods": "触发方式",
      "deleteLanguage": "删除一门语言",
      "required": "标记为 * 的项为必填项。",
      "updates": "我们高度建议您通过点击在页脚的“Discord”字样加入Terminal.ink的Discord服务器，以查看服务更新、机器人的验证情况，和接收来自管理员的私信。"
    },
    "error": {
      "notfound": "找不到页面……",
      "server": "发生了未预料到的快速卸除",
      "github": "把此错误报告到Github.com",
      "report": "感谢您愿意花时间报告此错误。请输入在您错误发生之前的行为。"
    },
    "list": {
      "invite": "邀请",
      "empty": "这里没有机器人"
    },
    "locale": {
      "choose": "请选择一门语言。",
      "pleasehelp": "您是一个优秀的翻译者吗？点击这里。"
    },
    "langdev": {
      "title": "查看所有语言代码",
      "compare": "比较所选语言",
      "key": "JSON 字串",
      "notfound": "找不到该字串！"
    },
    "notfound": {
      "gohome": "回到主页",
      "message": "找不到页面"
    },
    "sure": {
      "title": "您确定？",
      "ok": "确定",
      "no": "返回"
    },
    "reviews": {
      "title": "评价",
      "my": "我的评价",
      "write": "写一则评价",
      "placeholder": "请输入您评价的原因。",
      "number": {
        "one": "%s 则评价",
        "other": "%s 则评价"
      },
      "delete": "删除评价",
      "all": "查看所有评价"
    },
    "admin": {
      "title": "管理员控制台",
      "queue": "查看队列",
      "denied": "查看被拒绝的程序",
      "banned": "查看被封锁的程序",
      "state": {
        "reason": "输入您更换机器人状态的原因",
        "change": "更换状态"
      }
    }
  },
  "navbar": {
    "add": "添加一个应用",
    "login": "登录",
    "logout": "登出",
    "admin": "管理员"
  },
  "pagination": {
    "image": {
      "prev": "上一个",
      "next": "下一个"
    },
    "page": {
      "prev": "上一页",
      "next": "下一页"
    },
    "currentPage": "第 { number } 页",
    "reviews": "User reviews for '{{ name }}' - Page { number }"
  },
  "permission": {
    "ADD_REACTIONS": "添加反应",
    "ADMINISTRATOR": "管理员",
    "ATTACH_FILES": "附上文件",
    "BAN_MEMBERS": "封锁成员",
    "CHANGE_NICKNAME": "更改昵称",
    "CONNECT": "连接",
    "CREATE_INSTANT_INVITE": "创建即时邀请链接",
    "DEAFEN_MEMBERS": "拒听成员",
    "EMBED_LINKS": "链接嵌入",
    "KICK_MEMBERS": "移除成员",
    "MANAGE_CHANNELS": "管理频道",
    "MANAGE_EMOJIS": "管理表情",
    "MANAGE_GUILD": "管理服务器",
    "MANAGE_MESSAGES": "管理信息",
    "MANAGE_NICKNAMES": "管理昵称",
    "MANAGE_ROLES": "管理身份组",
    "MANAGE_WEBHOOKS": "管理网络挂钩",
    "MENTION_EVERYONE": "提及所有人",
    "MOVE_MEMBERS": "移动成员",
    "MUTE_MEMBERS": "静音成员",
    "READ_MESSAGE_HISTORY": "查看消息历史",
    "READ_MESSAGES": "查看消息",
    "SEND_MESSAGES": "发送消息",
    "SEND_TTS_MESSAGES": "发送TTS消息",
    "SPEAK": "说话",
    "USE_EXTERNAL_EMOJIS": "使用外部表情",
    "USE_VAD": "使用语音活动检测",
    "VIEW_AUDIT_LOG": "查看服务器日志"
  },
  "site": {
    "name": "Discord的应用程序",
    "description": "discordapps.dev 是一个用于陈列Discord机器人的程序商店。在您的服务器上安装用于音乐、新闻、管理等的程序吧！"
  },
  "states": {
    "approved": "已批准",
    "denied": "已拒绝",
    "queue": "在队列中",
    "banned": "被封锁"
  }
};
},{}],"X81M":[function(require,module,exports) {
module.exports = {
  "categories": {
    "fun": "Plezier",
    "games": "Spellen",
    "entertainment": "Entertainment",
    "productivity": "Productiviteit",
    "education": "Onderwijs",
    "image": "Afbeeldingsmanipulatie",
    "news": "Nieuws",
    "music": "Muziek",
    "moderation": "Moderatie",
    "utility": "Gereedschappen",
    "notifications": "Notificaties",
    "other": "Anders"
  },
  "alt": {
    "avatar": "Profielfoto voor {name}"
  },
  "copyright": "Auteursrecht 2017 - 2019, Terminal.ink; Discord is een handelsmerk van Discord Inc.",
  "errors": {
    "apps": {
      "authors": "De bot moet op zijn minst 1 auteur hebben, en ID's van de auteurs moeten numeriek zijn",
      "category": "Je moet een categorie kiezen voor de bot",
      "customisable": "Aanpasbaarheid van de prefix moet aangevinkt, of niet aangevinkt zijn",
      "contents": "Je moet tenminste 1 taal aanbieden voor jouw bot. Klik op een taal, en klik dan op \"Taal toevoegen\"",
      "description": "De korte beschrijving moet een lengte hebben tussen 10 en 100",
      "githubowner": "De GitHub eigenaar moet een valide GitHub lid zijn. Laat dit veld leeg als je geen GitHub account hebt.",
      "githubrepo": "De GitHub repository moet een valide string zijn. Laat dit veld blank als je geen GitHub repository hebt.",
      "id": "De Bot ID moet ingevuld worden, en numeriek zijn.",
      "invite": "De uitnodigings URL moet ingevuld worden, en moet een valide HTTPS link zijn",
      "website": "De website URL moet een valide HTTPS link zijn.",
      "languages": "Je moet tenminste 1 taal toevoegen. Klik op de taal waarin je je pagina wilt schrijven, en selecteer de 'Taal toevoegen' knop",
      "mentionable": "De 'vermeldbare prefix' knop moet aangevinkt, of niet aangevinkt zijn",
      "name": "De naam van de bot moet tussen de 4 en 32 karakters zijn.",
      "nsfw": "De NSFW status van de bot moet aangevinkt, of niet aangevinkt zijn.",
      "oauth": "Het OAuth ID moet numeriek zijn",
      "page": "De lange beschrijven moet een lengte tussen 20 en 10000 tekens hebben.",
      "prefix": "Je moet tenminste 1 prefix hebben, met een maximale lengte van 10 tekens",
      "support": "De Support URL moet een valide HTTPS link zijn",
      "exists": "Deze bot bestaat al in de database, en je hebt geen toestemming dit te overschrijven.",
      "notabot": "Het gegeven ID was geen bot account.",
      "notfound": "Het gegeven ID kon niet gevonden worden op Discord.",
      "add_success": "Bot met success aan de wachtrij toegevoegd.",
      "edit_success": "Bot succesvol aangepast.",
      "count": "De servercount van de bot moet tussen de 0 en 5000000 servers zijn",
      "avatar": "De avatar URL moet een valide HTTPS link zijn, met een maximum van 2000 karakters",
      "cover": "De omslag URL oet een valide HTTPS link zijn, met een maximum van 2000 karakters",
      "preview": "Alle voorbeeld URLs moeten valide HTTPS links zijn, met een maximum van 2000 karakters per stuk, met een maximum van 20 links",
      "no_suitable_lang": "Deze pagina heeft geen Nederlandse versie. '{{ language }}' wordt in plaats daarvan weergegeven.",
      "youtube": "Het YouTube ID moet lijken op een geldig ID",
      "youku": "Het Alibaba YOUKU ID moet lijken op een geldig ID"
    },
    "permissions": {
      "login": "Je bent niet ingelogd",
      "denied": "Je hebt niet de benodige toestemming om dit aan te passen",
      "banned": "Je bent de toegang tot deze bron ontzegd"
    },
    "website": {
      "noscript": "JavaScript is uitgeschakeld. De site kan minder goed functioneren."
    },
    "reviews": {
      "rating": "Selecteer een waardering voordat je verder gaat",
      "text": "Geef een reden aan voor deze hoeveelheid sterren.",
      "self": "Je kan je eigen bot niet recenseren!"
    },
    "api": {
      "400": "Je hebt geen toestemming om deze bron te bezichtigen. Controleer of je de juiste authorizatie hebt.",
      "404": "Deze bron kon niet worden gevonden, of de verzoeksmethode wordt niet ondersteund.",
      "500": "Een interne server fout is opgetreden.",
      "test": "Een foutcode is opgeroepen voor ontwikkelingsdoeleinden.",
      "no_bot": "Bot niet gevonden",
      "idchange": "Het ID van de bot kan niet worden gewijzigd in een ander ID. Neem contact op met Terminal ondersteuning voor technische ondersteuning"
    }
  },
  "footer": {
    "attribution": "Attributie",
    "licence": "GNU AGPLv3",
    "source": "GitHub",
    "discord": "Discord",
    "terminal": "Terminal.ink",
    "terms": "Algemene Voorwaarden",
    "docs": "Documentatie"
  },
  "forms": {
    "select": "Selecteer alstublieft...",
    "submit": "Verzenden",
    "wait": "Even geduld alstublieft..."
  },
  "intro": {
    "search": "Waar ben je naar op zoek?",
    "docs": "Documentatie"
  },
  "locales": {
    "ar": "Arabisch",
    "da": "Deens",
    "de": "Duits",
    "el": "Grieks",
    "en-GB": "Engels (Verenigd Koninkrijk)",
    "en-US": "Engels (Verenigde Staten)",
    "es": "Spaans",
    "et": "Estlands",
    "fi": "Fins",
    "fj": "Fijian",
    "fr": "Frans",
    "gd": "Keltisch (Schotland)",
    "hi": "Hindi",
    "he": "Hebreeuws",
    "it": "Italiaans",
    "ja": "Japans",
    "ko": "Koreaans",
    "la": "Latijn",
    "nl": "Nederlands",
    "no": "Noorweegs",
    "pl": "Pools",
    "pt": "Portugees",
    "ru": "Russisch",
    "sv": "Zweeds",
    "tr": "Turks",
    "vi": "Vietnamees",
    "zh-cn": "Chinees (Vereenvoudigd)",
    "zh-tw": "Chinees (Traditioneel)"
  },
  "pages": {
    "bots": {
      "backgroundAlt": "Het logo voor discordapps.dev",
      "description": "Een applicatiewinkel voor Discord bots",
      "inMyLanguage": "Bots in mijn taal",
      "invite": "Voeg deze bot toe",
      "support": "Technische Ondersteuning",
      "website": "Website",
      "shortname": "Discord Bots",
      "mentionable": "Vermeldbaar",
      "customisable": "Aanpasbaar",
      "delete": "Verwijderen",
      "reallyDelete": "Zeker weten?",
      "edit": "Aanpassen",
      "configure": "Configureren",
      "github": "Bekijk op GitHub",
      "approve": "Goedkeuren",
      "deny": "Weigeren",
      "prefix": "{count, plural, one {Prefix} other {Prefixes}}",
      "adverts": "Bevat advertenties en/of diensten die ontgrendeld worden door andere integraties",
      "inAppPurchases": "Heeft in-app aankopen",
      "nsfw": "NSFW",
      "offeredby": "Aangeboden Door:",
      "modified": "Laatst gemodificeerd",
      "created": "Eerste uitgavedatum",
      "category": "Categorie",
      "search": "Zoeken",
      "count": "Geïnstalleerd in {guilds, plural, one {1 server} other {{guilds} servers}}"
    },
    "configuration": {
      "token": {
        "title": "Authorizatietoken",
        "description": "Deze token is verplicht om je bot aan te passen op de site. Refereer naar de ontwikkelaarsdocumentatie voor mogelijke bronnen.",
        "docs": "Bekijk Documentatie"
      },
      "renew": "Vernieuw Token",
      "hide": {
        "title": "Verberg bot",
        "description": "Je kan je bot verbergen van de voorpagina van de site, indien je daar niet aanwezig wilt zijn.",
        "disable": "Maak zichtbaar",
        "enable": "Verberg"
      }
    },
    "edit": {
      "application_id": {
        "placeholder": "Het ID dat gebruikt wordt in de OAuth link.",
        "title": "OAuth ID"
      },
      "authors": {
        "placeholder": "ID van een enkele eigenaar",
        "title": "Bot Auteurs",
        "add": "Andere toevoegen",
        "delete": "Verwijder auteur"
      },
      "basicinfo": "Basis Informatie",
      "nsfw": {
        "title": "Niet Veilig Voor Werk"
      },
      "support": {
        "placeholder": "Iets als: https://discord.gg/8uC6aKZ",
        "small": "Laat dit veld leeg als je mensen niet wilt helpen",
        "title": "Ondersteunings URL"
      },
      "category": {
        "title": "Categorie",
        "placeholder": "Please select a category"
      },
      "client_id": {
        "placeholder": "Het ID van de bot gebruiker",
        "title": "Bot ID"
      },
      "customisable": {
        "title": "Aanpasbare prefix"
      },
      "description": {
        "title": "Korte Beschrijving",
        "placeholder": "Voeg een kleine beschrijving toe voor de voorpagina."
      },
      "github_owner": {
        "placeholder": "Iets als: ry00001",
        "title": "GitHub Gebruiker / Organisatie"
      },
      "github_repo": {
        "placeholder": "Iets als: Smoking",
        "title": "GitHub Repository"
      },
      "information": "Jouw Bot Pagina",
      "invite": {
        "title": "Uitnodigings URL",
        "generate": "Genereer uitnodigingslink"
      },
      "languages": {
        "add": "Voeg een taal toe",
        "delete": "Verwijder deze taal",
        "modal": "Schrijf je bot pagina in elke taal die je ondersteunt. Selecteer een taal, en klik op de 'Voeg een taal toe' knop."
      },
      "leave": "Weet je zeker dat je de pagina wilt verlaten? Veranderingen zullen niet opgeslagen worden",
      "mentionable": {
        "title": "Kan de bot aanroepen door middel van een vermelding"
      },
      "name": {
        "title": "Naam",
        "placeholder": "Voer de naam van de bot in."
      },
      "page": {
        "title": "Uitgebreide Beschrijving",
        "placeholder": "Voeg handige informatie over jouw bot toe, zoals commandos, functies en updates."
      },
      "prefix": {
        "placeholder": "Een enkele prefix",
        "title": "Prefix",
        "add": "Voeg een andere prefix toe",
        "delete": "Verwijder prefix"
      },
      "flags": {
        "title": "Inkomsten en advertentie declaratie",
        "inAppPurchases": {
          "title": "In-App Aankopen",
          "small": "Selecteer dit veld als jouw bot functies achter een betaalmuur aanbied"
        },
        "adverts": {
          "title": "Advertenties",
          "small": "Selecteer dit veld als jouw bot advertenties bevat of functies achter diensten van een derde partij vergrendelt"
        }
      },
      "images": {
        "title": "Uiterlijk",
        "avatar": {
          "title": "Avatar URL",
          "placeholder": "Een HTTPS link naar een avatar afbeelding"
        },
        "cover": {
          "title": "Omslag Afbeelding",
          "placeholder": "Een HTTPS link naar een grote afbeelding"
        },
        "preview": {
          "title": "Voorbeeld Afbeeldingen",
          "placeholder": "Een HTTPS link naar een enkele schermafbeelding",
          "add": "Voeg nog een afbeelding toe"
        }
      },
      "youtube": {
        "title": "YouTube ID",
        "placeholder": "Een ID naar een YouTube video"
      },
      "youku": {
        "title": "Alibaba YOUKU ID",
        "placeholder": "Een ID naar een YOUKU video"
      },
      "website": {
        "title": "Website",
        "placeholder": "Een HTTPS link naar jouw website"
      },
      "sourcecode": "Broncode",
      "title": "Maak of wijzig een applicatie",
      "triggermethods": "Aanroepmethodes",
      "deleteLanguage": "Verwijder een taal",
      "required": "Velden gemarkeerd met een * zijn vereist.",
      "updates": "Het wordt sterk aanbevolen om de Terminal.ink Discord Server te bezoeken voor informatie en updates, het zien van de verificatie status en DMs te ontvangen van medewerkers met betrekking tot jouw bot.",
      "discord": "Treed toe tot Terminal.ink"
    },
    "error": {
      "notfound": "Pagina kon niet worden gevonden...",
      "server": "Interne Server Fout",
      "github": "Rapporteer deze error op GitHub.com",
      "report": "Bedankt dat je de tijd hebt genomen dit foutreport in te vullen. Geef alstublieft aan waar je mee bezig was voor het incident.",
      "snarky": "Foutje moet kunnen baas..."
    },
    "list": {
      "empty": "Er zijn geen bots"
    },
    "locale": {
      "choose": "Selecteer alstublieft een taal.",
      "pleasehelp": "Ben je een goede vertaler? Klik hier."
    },
    "langdev": {
      "title": "Kijk naar alle taalsleutels",
      "compare": "Vergelijk geselecteerde talen",
      "key": "JSON Sleutel",
      "notfound": "Sleutel niet gevonden!"
    },
    "reviews": {
      "title": "Recensies",
      "write": "Schrijf een recensie",
      "placeholder": "Voer een reden voor jouw recensie in.",
      "delete": "Verwijder recensie"
    },
    "admin": {
      "title": "Administratiepaneel"
    },
    "filter": {
      "authors": {
        "placeholder": "ID van een enkele eigenaar",
        "title": "Bot Auteurs",
        "add": "Voeg er nog een toe",
        "delete": "Verwijder auteur"
      },
      "category": {
        "title": "Categorie",
        "placeholder": "Alle categorieën"
      },
      "query": {
        "title": "Zoeken",
        "placeholder": "Voer tekst in"
      },
      "nsfw": {
        "title": "Niet Veilig Voor Werk",
        "placeholder": "Niet filteren",
        "nsfw": "Niet Veilig Voor Werk",
        "sfw": "Veilig Voor Werk"
      }
    },
    "game": {
      "title": "Terminal.ink Videospel",
      "description": "Klik op de knop om punten te krijgen!",
      "leave": "Weet je zeker dat je de pagina wilt verlaten? Je zal al je punten verliezen.",
      "score": "Je hebt {kliksphilip, plural, =0 {geen punten :heejintears:} one {1 punt} other {{kliksphilip} punten}}."
    }
  },
  "navbar": {
    "add": "Voeg een app toe",
    "login": "Inloggen",
    "logout": "Uitloggen",
    "admin": "Admin",
    "languages": "Talen",
    "search": "Zoek voor bots",
    "user": "Mijn Bots"
  },
  "pagination": {
    "page": {
      "prev": "Vorige",
      "next": "Volgende pagina"
    },
    "currentPage": "Pagina {{{ number }}}",
    "reviews": "Gebruikersrecensies voor '{{ name }}' - Pagina {{{ number }}}"
  },
  "permission": {
    "ADD_REACTIONS": "Reacties toevoegen",
    "ADMINISTRATOR": "Beheerder",
    "ATTACH_FILES": "Bestand bijvoegen",
    "BAN_MEMBERS": "Leden verbannen",
    "CHANGE_NICKNAME": "Verander gebruikersnaam",
    "CONNECT": "Verbinden",
    "CREATE_INSTANT_INVITE": "Directe uitnodiging creëren",
    "DEAFEN_MEMBERS": "Geluid van leden dempen",
    "EMBED_LINKS": "Ingesloten links",
    "KICK_MEMBERS": "Leden verwijderen",
    "MANAGE_CHANNELS": "Kanalen beheren",
    "MANAGE_EMOJIS": "Beheer Emojis",
    "MANAGE_GUILD": "Server beheren",
    "MANAGE_MESSAGES": "Berichten beheren",
    "MANAGE_NICKNAMES": "Gebruikersnamen beheren",
    "MANAGE_ROLES": "Rollen beheren",
    "MANAGE_WEBHOOKS": "Webhooks beheren",
    "MENTION_EVERYONE": "Iedereen noemen",
    "MOVE_MEMBERS": "Leden verplaatsen",
    "MUTE_MEMBERS": "Microfoon van leden dempen",
    "READ_MESSAGE_HISTORY": "Berichtgeschiedenis lezen",
    "READ_MESSAGES": "Berichten lezen",
    "SEND_MESSAGES": "Berichten verzenden",
    "SEND_TTS_MESSAGES": "TTS-berichten verzenden",
    "SPEAK": "Spreken",
    "USE_EXTERNAL_EMOJIS": "Gebruik externe Emoji's",
    "USE_VAD": "Spraakactivatie gebruiken",
    "VIEW_AUDIT_LOG": "Audit-logboek weergeven"
  },
  "site": {
    "name": "Discord Apps",
    "subheading": "Vind bots om je server op te fleuren",
    "description": "discordapps.dev is een applicatie winkel voor Discord bots. Installeer applicaties voor muziek, nieuws, moderatie en meer in jouw server."
  },
  "states": {
    "approved": "Goedgekeurd",
    "denied": "Geweigerd",
    "queue": "In Wachtrij",
    "banned": "Verbannen"
  },
  "components": {
    "pleaseaddyourbotpleasethanks": {
      "title": "Starten met Discord Bots",
      "innovate": {
        "heading": "Start met innoveren",
        "content": "Leer je eigen Discord applicatie te maken voor jouw privéserver"
      },
      "add": {
        "heading": "Voeg je bot toe",
        "content": "Deel je creatie met de wereld; Laat anderen hun server verbeteren met jouw applicaties"
      }
    },
    "categorycollection": {
      "morebots": "Zie meer"
    },
    "botpagecontentbox": {
      "toggle": "Zet pijl aan/uit",
      "more": "Zie meer",
      "less": "Zie minder"
    },
    "helpusimprove": {
      "title": "Help ons",
      "text": "Reageer met feedback over deze website via de issues tab op GitHub.",
      "issues": "GitHub Issues"
    },
    "botpagesetstatebox": {
      "state": {
        "title": "Geef status aan",
        "placeholder": "Selecteer alstublieft een status"
      },
      "reason": {
        "title": "Reden",
        "placeholder": "Reden voor het wijzigen van de status. (optioneel)"
      },
      "submit": "Verander Status"
    }
  }
};
},{}],"Qpzm":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.languageHasTranslations = exports.getMasterLanguage = exports.Localise = exports.default = void 0;

var _da = _interopRequireDefault(require("react-intl/locale-data/da"));

var _de = _interopRequireDefault(require("react-intl/locale-data/de"));

var _en = _interopRequireDefault(require("react-intl/locale-data/en"));

var _fr = _interopRequireDefault(require("react-intl/locale-data/fr"));

var _pl = _interopRequireDefault(require("react-intl/locale-data/pl"));

var _zh = _interopRequireDefault(require("react-intl/locale-data/zh"));

var _nl = _interopRequireDefault(require("react-intl/locale-data/nl"));

var _da2 = _interopRequireDefault(require("./da.json"));

var _de2 = _interopRequireDefault(require("./de.json"));

var _enGB = _interopRequireDefault(require("./en-GB.json"));

var _enUS = _interopRequireDefault(require("./en-US.json"));

var _fr2 = _interopRequireDefault(require("./fr.json"));

var _pl2 = _interopRequireDefault(require("./pl.json"));

var _zhCn = _interopRequireDefault(require("./zh-cn.json"));

var _nl2 = _interopRequireDefault(require("./nl.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const languages = [{
  code: 'ar',
  flag: '',
  top: false,
  priority: 22,
  botPageLanguage: true
}, {
  code: 'da',
  flag: 'twa-flag-dk',
  top: false,
  priority: 21,
  translations: _da2.default,
  reactIntl: _da.default,
  botPageLanguage: true
}, {
  code: 'de',
  flag: 'twa-de',
  top: false,
  priority: 3,
  translations: _de2.default,
  reactIntl: _de.default,
  botPageLanguage: true
}, {
  code: 'el',
  flag: '',
  top: false,
  priority: 20,
  botPageLanguage: true
}, {
  code: 'en-GB',
  flag: 'twa-gb',
  top: true,
  priority: 1,
  translations: _enGB.default,
  reactIntl: _en.default,
  botPageLanguage: true
}, {
  code: 'en-US',
  flag: 'twa-us',
  master: 'en-GB',
  top: true,
  priority: 1.1,
  translations: _enUS.default,
  reactIntl: _en.default,
  botPageLanguage: false
}, {
  code: 'es',
  flag: '',
  top: false,
  priority: 4,
  botPageLanguage: true
}, {
  code: 'et',
  flag: '',
  top: false,
  priority: 19,
  botPageLanguage: true
}, {
  code: 'fi',
  flag: '',
  top: false,
  priority: 18,
  botPageLanguage: true
}, {
  code: 'fj',
  flag: '',
  top: false,
  priority: 17,
  botPageLanguage: true
}, {
  code: 'fr',
  flag: 'twa-fr',
  top: false,
  priority: 2,
  translations: _fr2.default,
  reactIntl: _fr.default,
  botPageLanguage: true
}, {
  code: 'gd',
  flag: '',
  top: false,
  priority: 16,
  botPageLanguage: true
}, {
  code: 'he',
  flag: '',
  top: false,
  priority: 26,
  botPageLanguage: true
}, {
  code: 'hi',
  flag: '',
  top: false,
  priority: 15,
  botPageLanguage: true
}, {
  code: 'it',
  flag: '',
  top: false,
  priority: 5,
  botPageLanguage: true
}, {
  code: 'ja',
  flag: '',
  top: false,
  priority: 14,
  botPageLanguage: true
}, {
  code: 'ko',
  flag: '',
  top: false,
  priority: 13,
  botPageLanguage: true
}, {
  code: 'la',
  flag: '',
  top: false,
  priority: 12,
  botPageLanguage: true
}, {
  code: 'nl',
  flag: 'twa-flag-nl',
  top: false,
  priority: 11,
  translations: _nl2.default,
  reactIntl: _nl.default,
  botPageLanguage: true
}, {
  code: 'no',
  flag: 'twa-flag-no',
  top: false,
  priority: 10,
  botPageLanguage: true
}, {
  code: 'pl',
  flag: 'twa-flag-pl',
  top: false,
  priority: 27,
  translations: _pl2.default,
  reactIntl: _pl.default,
  botPageLanguage: true
}, {
  code: 'pt',
  flag: 'twa-flag-pt',
  top: false,
  priority: 23,
  botPageLanguage: true
}, {
  code: 'ru',
  flag: 'twa-ru',
  top: false,
  priority: 6,
  botPageLanguage: true
}, {
  code: 'sv',
  flag: 'twa-flag-sv',
  top: false,
  priority: 7,
  botPageLanguage: true
}, {
  code: 'tr',
  flag: 'twa-flag-tr',
  top: false,
  priority: 24,
  botPageLanguage: true
}, {
  code: 'vi',
  flag: 'twa-flag-vi',
  top: false,
  priority: 25,
  botPageLanguage: true
}, {
  code: 'zh-cn',
  flag: 'twa-cn',
  top: false,
  priority: 9,
  translations: _zhCn.default,
  reactIntl: _zh.default,
  botPageLanguage: true
}, {
  code: 'zh-tw',
  flag: 'twa-flag-tw',
  top: false,
  priority: 8,
  botPageLanguage: true
}]; // console.log(JSON.stringify(languages.map(x => x.code)))

const Localise = (contents, locale) => {
  let localisedContents = contents.find(content => content.locale === locale);

  if (localisedContents) {
    return localisedContents;
  }

  const availableLanguages = languages.sort((a, b) => {
    if (a.priority < b.priority) {
      return -1;
    } else if (a.priority > b.priority) {
      return 1;
    }

    return 0;
  });

  for (let i = 0; i < availableLanguages.length; i += 1) {
    localisedContents = contents.find(content => content.locale === availableLanguages[i].code);

    if (localisedContents) {
      return localisedContents;
    }
  }

  throw new Error('Cannot find any languages for this bot!');
}; // Get the language that the bots can be in


exports.Localise = Localise;

const getMasterLanguage = locale => {
  const language = languages.find(language => language.code === locale);
  if (language && language.master) return language.master;
  return language.code;
};

exports.getMasterLanguage = getMasterLanguage;

const languageHasTranslations = locale => {
  const language = languages.find(language => language.code === locale);
  return language && language.translations;
};

exports.languageHasTranslations = languageHasTranslations;
var _default = languages;
exports.default = _default;
},{"./da.json":"occt","./de.json":"mmKu","./en-GB.json":"bdyH","./en-US.json":"pac/","./fr.json":"AhAd","./pl.json":"EG4I","./zh-cn.json":"kGVP","./nl.json":"X81M"}],"UCeK":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _NavigationBar = _interopRequireDefault(require("../NavigationBar"));

var _Footer = _interopRequireDefault(require("../Footer"));

var _reactHelmet = require("react-helmet");

var _reactIntl = require("react-intl");

var _Locations = _interopRequireDefault(require("../../data/Locations"));

var _locales = _interopRequireDefault(require("../../locales"));

var _Container = _interopRequireDefault(require("../Container"));

var _ContentBox = _interopRequireDefault(require("../ContentBox"));

require("./index.module.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

class Layout extends _react.Component {
  render() {
    const location = this.props.match;
    const unlocalisedPath = location.url.substr(location.params.locale.length + 1);
    return _react.default.createElement("div", null, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "site.name"
    }, siteName => _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "site.description"
    }, siteDescription => _react.default.createElement(_reactHelmet.Helmet, null, _react.default.createElement("meta", {
      charSet: "utf-8"
    }), _react.default.createElement("link", {
      rel: "shortcut icon",
      href: _Locations.default.favicon
    }), _react.default.createElement("meta", {
      property: "og:title",
      content: siteName
    }), _react.default.createElement("meta", {
      property: "og:site_name",
      content: siteName
    }), _react.default.createElement("meta", {
      property: "og:description",
      content: siteDescription
    }), _react.default.createElement("meta", {
      name: "description",
      content: siteDescription
    }), _react.default.createElement("link", {
      rel: "manifest",
      href: `/${this.props.intl.locale}.manifest.json`
    }), _locales.default.filter(language => language.translations).map(language => _react.default.createElement("link", {
      key: language.code,
      rel: "alternate",
      href: `${_Locations.default.domain}/${language.code}${unlocalisedPath}`,
      hreflang: language.code
    }))))), _react.default.createElement(_NavigationBar.default, {
      unlocalisedPath: unlocalisedPath
    }, this.props.afterNav), _react.default.createElement("noscript", null, _react.default.createElement(_Container.default, null, _react.default.createElement(_ContentBox.default, null, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "errors.website.noscript"
    })))), this.props.children, _react.default.createElement(_Footer.default, null));
  }

}

var _default = (0, _reactIntl.injectIntl)(Layout);

exports.default = _default;
},{"../NavigationBar":"e86L","../Footer":"FlX3","../../data/Locations":"uTwd","../../locales":"Qpzm","../Container":"tNeE","../ContentBox":"50Yc","./index.module.scss":"pac/"}],"qVpT":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Styles = require("../../data/Styles");

var _ContentBox = _interopRequireDefault(require("../ContentBox"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

class LoadingContentBox extends _react.Component {
  render() {
    return _react.default.createElement(_ContentBox.default, null, _react.default.createElement("div", {
      className: _Styles.Modesta.loader
    }, "Loading..."));
  }

}

var _default = LoadingContentBox;
exports.default = _default;
},{"../../data/Styles":"rs3k","../ContentBox":"50Yc"}],"N3k8":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Container = _interopRequireDefault(require("../Container"));

var _LoadingContentBox = _interopRequireDefault(require("../LoadingContentBox"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

class LoadingContainer extends _react.Component {
  render() {
    return _react.default.createElement(_Container.default, null, _react.default.createElement(_LoadingContentBox.default, null));
  }

}

var _default = LoadingContainer;
exports.default = _default;
},{"../Container":"tNeE","../LoadingContentBox":"qVpT"}],"qskh":[function(require,module,exports) {
module.exports = {
  "link": "_link_ceea7"
};
},{}],"rr1b":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _indexModule = _interopRequireDefault(require("./index.module.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

class NotALink extends _react.Component {
  render() {
    return _react.default.createElement("span", _extends({
      className: `${_indexModule.default.link} ${this.props.className}`
    }, this.props), this.props.children);
  }

}

var _default = NotALink;
exports.default = _default;
},{"./index.module.scss":"qskh"}],"/hhG":[function(require,module,exports) {
module.exports = {
  "video": "_video_ff09d"
};
},{}],"CyNR":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _indexModule = _interopRequireDefault(require("./index.module.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

class Youku extends _react.Component {
  render() {
    return _react.default.createElement("iframe", {
      src: `http://player.youku.com/embed/${this.props.video}`,
      frameBorder: "0",
      allow: "accelerometer; encrypted-media; gyroscope; picture-in-picture",
      allowFullScreen: true,
      className: _indexModule.default.video,
      title: this.props.title
    });
  }

}

var _default = Youku;
exports.default = _default;
},{"./index.module.scss":"/hhG"}],"h3Un":[function(require,module,exports) {
module.exports = {
  "video": "_video_74494"
};
},{}],"4Xqa":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _indexModule = _interopRequireDefault(require("./index.module.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

class YouTube extends _react.Component {
  render() {
    return _react.default.createElement("iframe", {
      src: `https://www.youtube-nocookie.com/embed/${this.props.video}`,
      frameBorder: "0",
      allow: "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture",
      allowFullScreen: true,
      className: _indexModule.default.video,
      title: this.props.title
    });
  }

}

var _default = YouTube;
exports.default = _default;
},{"./index.module.scss":"h3Un"}],"b75q":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Locations = _interopRequireDefault(require("../data/Locations"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const reviewToJsonLd = (contents, item) => {
  const template = {
    '@context': 'http://schema.org',
    '@type': 'Product',
    description: contents.description,
    name: contents.name,
    image: [`${_Locations.default.cdn}${item.cachedImages.avatar}`, ...item.cachedImages.preview.map(img => `${_Locations.default.cdn}${img}`)],
    sku: item.id
  }; // If there are reviews, add the reviews stuff

  if (item.reviews.length) {
    const average = item.reviews.reduce((prev, curr) => prev + curr.rating, 0) / item.reviews.length;
    template.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: average,
      reviewCount: item.reviews.length
    };
    template.review = [];

    for (let i = 0; i < item.reviews.length; i += 1) {
      const review = item.reviews[i];
      const date = new Date(review.date);
      template.review.push({
        '@type': 'Review',
        author: review.username,
        datePublished: `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`,
        description: review.text,
        reviewRating: {
          '@type': 'Rating',
          bestRating: '5',
          ratingValue: review.rating.toString(),
          worstRating: '1'
        }
      });
    }
  } else {
    return null;
  }

  return JSON.stringify(template);
};

var _default = reviewToJsonLd;
exports.default = _default;
},{"../data/Locations":"uTwd"}],"YodB":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchABot = fetchABot;
exports.resetTheBot = resetTheBot;
exports.RESET_BOT = exports.RECIEVE_BOT = exports.REQUEST_BOT = void 0;

var _Locations = _interopRequireDefault(require("../../data/Locations"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const REQUEST_BOT = 'REQUEST_BOT';
exports.REQUEST_BOT = REQUEST_BOT;
const RECIEVE_BOT = 'RECIEVE_BOT';
exports.RECIEVE_BOT = RECIEVE_BOT;
const RESET_BOT = 'RESET_BOT';
exports.RESET_BOT = RESET_BOT;

function requestBot(id) {
  return {
    type: REQUEST_BOT,
    id
  };
}

function resetBot() {
  return {
    type: RESET_BOT
  };
}

function recieveBot(json, status, id) {
  return {
    type: RECIEVE_BOT,
    data: json.data,
    status,
    id
  };
}

function fetchBot(id) {
  return dispatch => {
    dispatch(requestBot(id));
    return fetch(`${_Locations.default.server}/reactjs/v2/apps/id/${id}`, {
      credentials: 'include'
    }).then(res => {
      return res.json().then(json => {
        return dispatch(recieveBot(json, res.status, id));
      });
    });
  };
}

function shouldFetchBot(state, id) {
  // If the data has already been fetched, do not fetch it
  if (state.bot.data && state.bot.data.id === id && state.bot.id === id) return false;
  return true;
}

function fetchABot({
  match
}) {
  return (dispatch, getState) => {
    if (shouldFetchBot(getState(), match.params.id)) {
      return dispatch(fetchBot(match.params.id));
    }
  };
}

function resetTheBot() {
  return dispatch => {
    dispatch(resetBot());
  };
}
},{"../../data/Locations":"uTwd"}],"VUzD":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactIntl = require("react-intl");

var _Locations = _interopRequireDefault(require("../../data/Locations"));

var _ContentBox = _interopRequireDefault(require("../ContentBox"));

var _FlexColumns = _interopRequireDefault(require("../FlexColumns"));

var _LocalisedHyperlink = _interopRequireDefault(require("../LocalisedHyperlink"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

class PleaseAddYourBotPleaseThanks extends _react.Component {
  render() {
    return _react.default.createElement(_ContentBox.default, null, _react.default.createElement(_FlexColumns.default, null, _react.default.createElement(_FlexColumns.default, {
      columns: 4
    }, _react.default.createElement("h4", null, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "components.pleaseaddyourbotpleasethanks.title"
    }))), _react.default.createElement(_FlexColumns.default, {
      columns: 4
    }, _react.default.createElement("h5", null, _react.default.createElement(_LocalisedHyperlink.default, {
      to: _Locations.default.tutorials,
      hash: "howto"
    }, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "components.pleaseaddyourbotpleasethanks.innovate.heading"
    }))), _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "components.pleaseaddyourbotpleasethanks.innovate.content"
    })), _react.default.createElement(_FlexColumns.default, {
      columns: 4
    }, _react.default.createElement("h5", null, _react.default.createElement("a", {
      href: _Locations.default.add
    }, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "components.pleaseaddyourbotpleasethanks.add.heading"
    }))), _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "components.pleaseaddyourbotpleasethanks.add.content"
    }))));
  }

}

var _default = PleaseAddYourBotPleaseThanks;
exports.default = _default;
},{"../../data/Locations":"uTwd","../ContentBox":"50Yc","../FlexColumns":"U1G4","../LocalisedHyperlink":"dChq"}],"Szs9":[function(require,module,exports) {
module.exports = {
  "websiteTypeButtons": "_websiteTypeButtons_3e09d",
  "btn": "_btn_3e09d"
};
},{}],"geqJ":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _LocalisedHyperlink = _interopRequireDefault(require("../LocalisedHyperlink"));

var _Button = _interopRequireDefault(require("../Button"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

class LinkButton extends _react.Component {
  render() {
    return _react.default.createElement(_LocalisedHyperlink.default, {
      to: this.props.to
    }, _react.default.createElement(_Button.default, {
      className: this.props.className
    }, this.props.children));
  }

}

var _default = LinkButton;
exports.default = _default;
},{"../LocalisedHyperlink":"dChq","../Button":"+DmJ"}],"V0nm":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactIntl = require("react-intl");

var _indexModule = _interopRequireDefault(require("./index.module.scss"));

var _LinkButton = _interopRequireDefault(require("../LinkButton"));

var _Styles = require("../../data/Styles");

var _ConstructCSS = _interopRequireDefault(require("../../helpers/ConstructCSS"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

class WebsiteTypeButtons extends _react.Component {
  render() {
    return _react.default.createElement("div", {
      className: _indexModule.default.websiteTypeButtons
    }, _react.default.createElement(_LinkButton.default, {
      to: "/bots",
      className: (0, _ConstructCSS.default)(_Styles.Modesta.secondary, _indexModule.default.btn)
    }, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "types.bots"
    })), _react.default.createElement(_LinkButton.default, {
      to: "/rpc",
      className: (0, _ConstructCSS.default)(_Styles.Modesta.secondary, _indexModule.default.btn)
    }, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "types.rpc"
    })));
  }

}

var _default = WebsiteTypeButtons;
exports.default = _default;
},{"./index.module.scss":"Szs9","../LinkButton":"geqJ","../../data/Styles":"rs3k","../../helpers/ConstructCSS":"SwhA"}],"4kx5":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _ContentBox = _interopRequireDefault(require("../ContentBox"));

var _reactIntl = require("react-intl");

var _Locations = _interopRequireDefault(require("../../data/Locations"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

class HelpUsImprove extends _react.Component {
  render() {
    return _react.default.createElement(_ContentBox.default, null, _react.default.createElement("h4", null, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "components.helpusimprove.title"
    })), _react.default.createElement("p", null, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "components.helpusimprove.text"
    })), _react.default.createElement("a", {
      href: _Locations.default.sourceIssues
    }, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "components.helpusimprove.issues"
    })));
  }

}

var _default = HelpUsImprove;
exports.default = _default;
},{"../ContentBox":"50Yc","../../data/Locations":"uTwd"}],"DDbx":[function(require,module,exports) {
module.exports = "/pensive.8f076f62.svg";
},{}],"4ai9":[function(require,module,exports) {
module.exports = {
  "pensive": "_pensive_4a84c"
};
},{}],"GVTv":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactIntl = require("react-intl");

var _Container = _interopRequireDefault(require("../../components/Container"));

var _ContentBox = _interopRequireDefault(require("../../components/ContentBox"));

var _Layout = _interopRequireDefault(require("../../components/Layout"));

var _GetStartedWithBots = _interopRequireDefault(require("../../components/GetStartedWithBots"));

var _FlexColumns = _interopRequireDefault(require("../../components/FlexColumns"));

var _WebsiteTypeButtons = _interopRequireDefault(require("../../components/WebsiteTypeButtons"));

var _HelpUsImprove = _interopRequireDefault(require("../../components/HelpUsImprove"));

var _pensive = _interopRequireDefault(require("./pensive.svg"));

var _indexModule = _interopRequireDefault(require("./index.module.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

class NotFound extends _react.Component {
  render() {
    return _react.default.createElement(_Layout.default, {
      match: this.props.match
    }, _react.default.createElement(_Container.default, null, _react.default.createElement(_FlexColumns.default, {
      padding: true
    }, _react.default.createElement(_FlexColumns.default, {
      columns: 3
    }, _react.default.createElement(_WebsiteTypeButtons.default, null), _react.default.createElement(_HelpUsImprove.default, null)), _react.default.createElement(_FlexColumns.default, {
      columns: 9
    }, _react.default.createElement(_ContentBox.default, null, _react.default.createElement("h1", null, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "pages.error.notfound"
    })), _react.default.createElement("p", null, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "pages.error.snarky"
    })), _react.default.createElement("img", {
      src: _pensive.default,
      className: _indexModule.default.pensive
    })))), _react.default.createElement(_GetStartedWithBots.default, null)));
  }

}

var _default = NotFound;
exports.default = _default;
},{"../../components/Container":"tNeE","../../components/ContentBox":"50Yc","../../components/Layout":"UCeK","../../components/GetStartedWithBots":"VUzD","../../components/FlexColumns":"U1G4","../../components/WebsiteTypeButtons":"V0nm","../../components/HelpUsImprove":"4kx5","./pensive.svg":"DDbx","./index.module.scss":"4ai9"}],"ILdi":[function(require,module,exports) {
module.exports = "/arrow.4675c036.png";
},{}],"Hy70":[function(require,module,exports) {
module.exports = {
  "description": "_description_94527",
  "tableContainer": "_tableContainer_94527",
  "button": "_button_94527",
  "arrow": "_arrow_94527",
  "upsidedown": "_upsidedown_94527"
};
},{}],"PYpx":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _ContentBox = _interopRequireDefault(require("../../../components/ContentBox"));

var _marked = _interopRequireDefault(require("marked"));

var _xss = _interopRequireDefault(require("xss"));

var _arrow = _interopRequireDefault(require("../../../scss/ModestaCSS/css/images/arrow.png"));

var _indexModule = _interopRequireDefault(require("./index.module.scss"));

var _reactIntl = require("react-intl");

var _Styles = require("../../../data/Styles");

var _elementsModule = _interopRequireDefault(require("../../../scss/elements.module.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const botPageWhitelist = {
  p: [],
  span: [],
  code: [],
  b: [],
  i: [],
  u: [],
  li: [],
  ul: [],
  ol: [],
  del: [],
  pre: [],
  strong: [],
  em: [],
  h1: ['id'],
  h2: ['id'],
  h3: ['id'],
  h4: ['id'],
  h5: ['id'],
  h6: ['id'],
  table: [],
  thead: [],
  tbody: [],
  tr: [],
  th: [],
  td: [],
  hr: [],
  blockquote: [],
  br: [],
  a: ['href']
};

class AppPageContentBox extends _react.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "getExtendedHeight", () => [...this.description.current.children].map(elem => {
      const height = elem.clientHeight;
      let topMargin = 2;
      let bottomMargin = 2;

      try {
        topMargin = parseInt(document.defaultView.getComputedStyle(elem, '').getPropertyValue('margin-top'), 10);
        bottomMargin = parseInt(document.defaultView.getComputedStyle(elem, '').getPropertyValue('margin-bottom'), 10);
      } catch (e) {// Do nothing!
        // Just use the default margin sizes.
      }

      return topMargin + height + bottomMargin;
    }).reduce((prev, curr) => prev + curr, 0));

    this.button = _react.default.createRef();
    this.description = _react.default.createRef();
    this.state = {
      open: false,
      smallEnough: true
    };
    this.toggle = this.toggle.bind(this);
    this.getExtendedHeight = this.getExtendedHeight.bind(this);
  }

  escape(unsafe) {
    return unsafe.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
  }

  toggle() {
    if (this.state.open === true) {
      this.description.current.style.height = '200px';
    } else {
      this.description.current.style.height = `${this.getExtendedHeight()}px`;
    }

    this.setState({
      open: !this.state.open
    });
  }

  componentDidMount() {
    // If the description's size is greater than 300, display the button
    // Otherwise, just display the entire description
    if (this.getExtendedHeight() > 300) {
      this.setState({
        smallEnough: false
      });
    }
  }

  render() {
    const page = (0, _xss.default)((0, _marked.default)(this.props.page), {
      whiteList: this.props.allowHTML ? null : botPageWhitelist,
      onIgnoreTag: (tag, html, options) => {
        let extraNotes = '';

        switch (tag) {
          case 'img':
            extraNotes = 'You should instead use the "preview images", found in the Appearance section of the edit page of your bot, or adopt the use of emojis.';
            break;

          case 'script':
            extraNotes = 'You are too dangerous to use this tag!';
            break;

          case 'loona':
            extraNotes = '<3 ily!!!!!';
            break;

          default:
            extraNotes = 'Please adopt a tag which is allowed, or restrict yourself to Markdown only.';
        }

        if (typeof window !== 'undefined') console.error(`The <${tag}> tag is not allowed in the long description box.\n${extraNotes}`);
        return '';
      },
      onTag: (tag, html, options) => {
        if (tag === 'table') {
          if (options.isClosing) {
            return '</table></div>';
          }

          return `<div class="${_Styles.Modesta.tableContainer} ${_indexModule.default.tableContainer} ${_elementsModule.default.scrollbar}">${html}`;
        }

        return;
      },
      onTagAttr: (tag, name, value, isWhiteAttr) => {
        if (tag === 'img' && name === 'src' && this.props.cdn && value.startsWith('/')) {
          return `src="${this.props.cdn}${value}"`;
        }

        return;
      },
      onIgnoreTagAttr: (tag, name, value, isWhiteAttr) => {
        if (this.props.allowHTML || name === 'class') {
          return `${name}="${_xss.default.escapeAttrValue(value)}"`;
        }
      }
    });
    const smallEnough = typeof this.props.forceLarge === 'boolean' ? this.props.forceLarge : this.state.smallEnough;
    return _react.default.createElement(_ContentBox.default, null, _react.default.createElement("div", null, _react.default.createElement("div", {
      dangerouslySetInnerHTML: {
        __html: page
      },
      ref: this.description,
      style: smallEnough ? {} : {
        // if not small enough, set default height to 200
        height: '200px',
        transition: `height ${Math.ceil(this.getExtendedHeight() / 200) / 20}s`
      },
      className: _indexModule.default.description
    }), smallEnough ? null : // if not small enough, show the buttons
    _react.default.createElement("div", {
      ref: this.button,
      onClick: this.toggle
    }, this.state.open === false ? _react.default.createElement(_ContentBox.default, {
      className: `${_Styles.Modesta.secondary} ${_indexModule.default.button}`
    }, _react.default.createElement("p", null, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "components.botpagecontentbox.more"
    })), _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "components.botpagecontentbox.toggle"
    }, message => _react.default.createElement("img", {
      className: _indexModule.default.arrow,
      src: _arrow.default,
      alt: message
    }))) : _react.default.createElement(_ContentBox.default, {
      className: `${_Styles.Modesta.secondary} ${_indexModule.default.button}`
    }, _react.default.createElement("p", null, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "components.botpagecontentbox.less"
    })), _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "components.botpagecontentbox.toggle"
    }, message => _react.default.createElement("img", {
      className: `${_indexModule.default.arrow} ${_indexModule.default.upsidedown}`,
      src: _arrow.default,
      alt: message
    }))))));
  }

}

var _default = AppPageContentBox;
exports.default = _default;
},{"../../../components/ContentBox":"50Yc","../../../scss/ModestaCSS/css/images/arrow.png":"ILdi","./index.module.scss":"Hy70","../../../data/Styles":"rs3k","../../../scss/elements.module.scss":"h2Hb"}],"hWoZ":[function(require,module,exports) {
module.exports = {
  "sliderContainer": "_sliderContainer_71510",
  "slider": "_slider_71510",
  "botListDotSpace": "_botListDotSpace_71510",
  "image": "_image_71510",
  "dots": "_dots_71510"
};
},{}],"FAkX":[function(require,module,exports) {
module.exports = {
  "modalContent": "_modalContent_5927a",
  "modalClose": "_modalClose_5927a",
  "modalImage": "_modalImage_5927a",
  "zoomIn": "_zoomIn_5927a"
};
},{}],"i0xp":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _indexModule = _interopRequireDefault(require("./index.module.scss"));

var _LazyImage = _interopRequireDefault(require("../LazyImage"));

var _elementsModule = _interopRequireDefault(require("../../scss/elements.module.scss"));

var _Styles = require("../../data/Styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

class ModalImage extends _react.Component {
  constructor(props) {
    super(props);
    this.image = _react.default.createRef();
    this.state = {
      open: false,
      closing: false
    };
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  open() {
    this.setState({
      opened: true
    });
  }

  close() {
    this.setState({
      closing: true
    });
    setTimeout(() => {
      this.setState({
        opened: false,
        closing: false
      });
    }, 575);
  }

  render() {
    return _react.default.createElement("div", null, _react.default.createElement(_LazyImage.default, {
      src: this.props.src,
      className: `${this.props.className} ${_indexModule.default.zoomIn}`,
      onClick: this.open
    }), _react.default.createElement("div", {
      onClick: this.close,
      className: `${_Styles.Modesta.modal} ${this.state.closing ? `${_Styles.Modesta.modalClose} ${_indexModule.default.modalClose}` : ''}`,
      style: this.state.opened ? {
        display: 'block'
      } : {}
    }, _react.default.createElement("div", {
      className: `${_Styles.Modesta.modalContent} ${_elementsModule.default.roundedCorners} ${_indexModule.default.modalContent}`
    }, _react.default.createElement(_LazyImage.default, {
      src: this.props.src,
      onClick: this.open,
      className: _indexModule.default.modalImage
    }))));
  }

}

var _default = ModalImage;
exports.default = _default;
},{"./index.module.scss":"FAkX","../LazyImage":"ofRo","../../scss/elements.module.scss":"h2Hb","../../data/Styles":"rs3k"}],"yXl1":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _ContentBox = _interopRequireDefault(require("../../../components/ContentBox"));

var _indexModule = _interopRequireDefault(require("./index.module.scss"));

var _elementsModule = _interopRequireDefault(require("../../../scss/elements.module.scss"));

var _Locations = _interopRequireDefault(require("../../../data/Locations"));

var _ModalImage = _interopRequireDefault(require("../../../components/ModalImage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

class AppPageImagesBox extends _react.Component {
  render() {
    if (this.props.images && this.props.images.length === 0) return null;
    return _react.default.createElement(_ContentBox.default, null, _react.default.createElement("div", {
      className: `${_indexModule.default.sliderContainer} ${_elementsModule.default.scrollbar}`
    }, _react.default.createElement("div", {
      className: _indexModule.default.slider
    }, this.props.children, this.props.images.map((image, index) => _react.default.createElement(_ModalImage.default, {
      src: `${_Locations.default.cdn}${image}`,
      className: _indexModule.default.image,
      key: index
    }))), _react.default.createElement("div", {
      className: _indexModule.default.botListDotSpace
    })));
  }

}

var _default = AppPageImagesBox;
exports.default = _default;
},{"../../../components/ContentBox":"50Yc","./index.module.scss":"hWoZ","../../../scss/elements.module.scss":"h2Hb","../../../data/Locations":"uTwd","../../../components/ModalImage":"i0xp"}],"TlW0":[function(require,module,exports) {
module.exports = {
  "appLinks": "_appLinks_bb522",
  "prefixList": "_prefixList_bb522",
  "prefix": "_prefix_bb522",
  "triggerNote": "_triggerNote_bb522",
  "btn": "_btn_bb522",
  "localeLinks": "_localeLinks_bb522",
  "used": "_used_bb522"
};
},{}],"4Pyv":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  // weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
};
exports.default = _default;
},{}],"BNJb":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactIntl = require("react-intl");

var _reactRouterDom = require("react-router-dom");

var _Locations = _interopRequireDefault(require("../../../data/Locations"));

var _NotALink = _interopRequireDefault(require("../../../components/NotALink"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

class AppPageDeleteButton extends _react.Component {
  constructor(props) {
    super(props);
    this.state = {
      sure: false,
      deleted: false
    };
    this.openSure = this.openSure.bind(this);
    this.delete = this.delete.bind(this);
  }

  openSure() {
    this.setState({
      sure: true
    });
  }

  delete() {
    fetch(`${_Locations.default.server}/bots/${this.props.app.id}/delete`, {
      method: 'POST',
      credentials: 'include'
    }).then(res => res.json()).then(data => {
      if (data.ok) this.setState({
        deleted: true
      });
    });
  }

  render() {
    if (this.state.deleted) {
      return _react.default.createElement(_reactRouterDom.Redirect, {
        to: "/"
      });
    }

    if (this.state.sure) {
      return _react.default.createElement(_NotALink.default, {
        onClick: this.delete
      }, _react.default.createElement(_reactIntl.FormattedMessage, {
        id: "pages.bots.reallyDelete"
      }));
    }

    return _react.default.createElement(_NotALink.default, {
      onClick: this.openSure
    }, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "pages.bots.delete"
    }));
  }

}

var _default = AppPageDeleteButton;
exports.default = _default;
},{"../../../data/Locations":"uTwd","../../../components/NotALink":"rr1b"}],"vLPW":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactIntl = require("react-intl");

var _reactRedux = require("react-redux");

var _reactRouterDom = require("react-router-dom");

var _ContentBox = _interopRequireDefault(require("../../../components/ContentBox"));

var _Locations = _interopRequireDefault(require("../../../data/Locations"));

var _auth = require("../../../redux/actions/auth");

var _indexModule = _interopRequireDefault(require("./index.module.scss"));

var _LocalisedHyperlink = _interopRequireDefault(require("../../../components/LocalisedHyperlink"));

var _States = _interopRequireDefault(require("../../../data/States"));

var _DateFormat = _interopRequireDefault(require("../../../data/DateFormat"));

var _AppPageDeleteButton = _interopRequireDefault(require("../AppPageDeleteButton"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

class AppPageInfoBox extends _react.Component {
  constructor(props) {
    super(props);
    this.state = {
      sure: false,
      deleted: false
    };
    this.openSure = this.openSure.bind(this);
    this.delete = this.delete.bind(this);
  }

  componentDidMount() {
    const {
      dispatch
    } = this.props;
    dispatch((0, _auth.fetchAuthIfNeeded)());
  }

  openSure() {
    this.setState({
      sure: true
    });
  }

  delete() {
    fetch(`${_Locations.default.server}/bots/${this.props.bot.id}/delete`, {
      method: 'POST',
      credentials: 'include'
    }).then(res => res.json()).then(data => {
      if (data.ok) this.setState({
        deleted: true
      });
    });
  }

  render() {
    if (this.state.deleted) {
      return _react.default.createElement(_reactRouterDom.Redirect, {
        to: "/"
      });
    }

    const {
      app
    } = this.props;
    const auth = this.props.auth.data;
    return _react.default.createElement(_ContentBox.default, null, app.trigger && _react.default.createElement("p", null, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "pages.bots.prefix",
      values: {
        count: app.trigger.prefix.length
      }
    }), _react.default.createElement("ul", {
      className: _indexModule.default.prefixList
    }, app.trigger.prefix.map((prefix, index) => _react.default.createElement("li", {
      key: index,
      className: _indexModule.default.prefix
    }, prefix)), app.trigger.customisable ? _react.default.createElement("li", {
      className: _indexModule.default.triggerNote
    }, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "pages.bots.customisable"
    })) : null, app.trigger.mentionable ? _react.default.createElement("li", {
      className: _indexModule.default.triggerNote
    }, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "pages.bots.mentionable"
    })) : null)), app.support || app.website || app.github && app.github.owner && app.github.repo ? _react.default.createElement("p", null, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: `pages.apps.appLinks`
    }), _react.default.createElement("ul", {
      className: _indexModule.default.appLinks
    }, app.support ? _react.default.createElement("li", null, _react.default.createElement("a", {
      href: app.support
    }, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "pages.bots.support"
    }))) : null, app.website ? _react.default.createElement("li", null, _react.default.createElement("a", {
      href: app.website
    }, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "pages.bots.website"
    }))) : null, app.github && app.github.owner && app.github.repo ? _react.default.createElement("li", null, _react.default.createElement("a", {
      href: `https://github.com/${app.github.owner}/${app.github.repo}`
    }, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "pages.bots.github"
    }))) : null)) : null, auth && (auth.admin || app.authors.some(author => author.id === auth.id)) ? _react.default.createElement("p", null, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: `pages.apps.devLinks`
    }), _react.default.createElement("ul", {
      className: _indexModule.default.appLinks
    }, _react.default.createElement("li", null, _react.default.createElement(_LocalisedHyperlink.default, {
      to: `/${app.type}/${app.id}/edit`
    }, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: `pages.${app.type}.edit`
    }))), _react.default.createElement("li", null, _react.default.createElement(_AppPageDeleteButton.default, {
      app: app
    })), _react.default.createElement("li", null, _react.default.createElement(_LocalisedHyperlink.default, {
      to: `/${app.type}/${app.id}/configure`
    }, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "pages.bots.configure"
    }))))) : null, _react.default.createElement("p", null, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "pages.bots.offeredby"
    }), _react.default.createElement("ul", {
      className: _indexModule.default.appLinks
    }, app.authors.length ? app.authors.map(author => _react.default.createElement("li", {
      key: author.id
    }, _react.default.createElement(_LocalisedHyperlink.default, {
      "aria-label": `${author.username}#${author.discriminator}`,
      to: "/filter",
      query: {
        owners: [author.id],
        state: _States.default.APPROVED
      }
    }, author.username ? `${author.username}#${author.discriminator}` : author.id))) : _react.default.createElement("li", null, _react.default.createElement("i", null, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "pages.apps.reclaim"
    }))))), app.category && _react.default.createElement("p", null, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "pages.bots.category"
    }), _react.default.createElement("ul", {
      className: _indexModule.default.appLinks
    }, _react.default.createElement("li", null, _react.default.createElement(_LocalisedHyperlink.default, {
      to: "/filter",
      query: {
        category: app.category,
        state: _States.default.APPROVED
      }
    }, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: `categories.${app.category}`
    }))))), app.count && _react.default.createElement("p", null, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "pages.bots.count",
      values: {
        guilds: app.count
      }
    })), _react.default.createElement("p", null, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "pages.bots.created"
    }), _react.default.createElement("ul", {
      className: _indexModule.default.appLinks
    }, _react.default.createElement("li", null, new Date(app.created).toLocaleDateString(this.props.intl.locale, _DateFormat.default)))), _react.default.createElement("p", null, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "pages.bots.modified"
    }), _react.default.createElement("ul", {
      className: _indexModule.default.appLinks
    }, _react.default.createElement("li", null, new Date(app.edited).toLocaleDateString(this.props.intl.locale, _DateFormat.default)))));
  }

}

const mapStateToProps = state => {
  const {
    auth
  } = state;
  return {
    auth
  };
};

var _default = (0, _reactRedux.connect)(mapStateToProps)((0, _reactIntl.injectIntl)(AppPageInfoBox));

exports.default = _default;
},{"../../../components/ContentBox":"50Yc","../../../data/Locations":"uTwd","../../../redux/actions/auth":"YSbd","./index.module.scss":"TlW0","../../../components/LocalisedHyperlink":"dChq","../../../data/States":"2Fxh","../../../data/DateFormat":"4Pyv","../AppPageDeleteButton":"BNJb"}],"uSix":[function(require,module,exports) {
module.exports = {
  "card": "_card_fe28b",
  "textContainer": "_textContainer_fe28b",
  "avatar": "_avatar_fe28b",
  "discriminator": "_discriminator_fe28b",
  "description": "_description_fe28b",
  "stars": "_stars_fe28b"
};
},{}],"AaMC":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

class FlexContainer extends _react.Component {
  render() {
    return _react.default.createElement("div", _extends({
      style: {
        display: 'flex'
      }
    }, this.props), this.props.children);
  }

}

var _default = FlexContainer;
exports.default = _default;
},{}],"GW9A":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Locations = _interopRequireDefault(require("../../data/Locations"));

var _indexModule = _interopRequireDefault(require("./index.module.scss"));

var _reactIntl = require("react-intl");

var _LazyImage = _interopRequireDefault(require("../LazyImage"));

var _FlexContainer = _interopRequireDefault(require("../FlexContainer"));

var _NotALink = _interopRequireDefault(require("../NotALink"));

var _reactRedux = require("react-redux");

var _auth = require("../../redux/actions/auth");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

class ReviewCard extends _react.Component {
  constructor(props) {
    super(props);
    this.deleteReview = this.deleteReview.bind(this);
    this.state = {
      deleting: false,
      deleted: false,
      timeout: null,
      deleteClicked: false
    };
  }

  deleteReview() {
    if (!this.state.deleteClicked) {
      this.setState({
        deleteClicked: true
      });
      fetch(`${_Locations.default.server}/bots/${this.props.bot.id}/reviews/${this.props.review.id}/delete`, {
        credentials: 'include',
        method: 'POST'
      }).then(res => {
        if (res.status === 200) {
          this.setState({
            deleting: true,
            timeout: setTimeout(() => {
              this.setState({
                deleted: true
              });
            }, 300)
          });
        }
      });
    }
  }

  componentDidMount() {
    const {
      dispatch
    } = this.props;
    dispatch((0, _auth.fetchAuthIfNeeded)());
  }

  componentWillUnmount() {
    clearTimeout(this.state.timeout);
  }

  render() {
    const {
      review,
      auth
    } = this.props;
    let stars = '';

    for (let i = 0; i < review.rating; i++) {
      stars += '★';
    }

    if (this.state.deleted) return null;
    return _react.default.createElement(_FlexContainer.default, {
      className: _indexModule.default.card,
      style: this.state.deleting ? {
        opacity: 0
      } : {}
    }, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "alt.avatar",
      values: {
        name: review.username
      }
    }, message => _react.default.createElement(_LazyImage.default, {
      className: _indexModule.default.avatar,
      alt: message,
      src: `${_Locations.default.cdn}${review.cachedAvatar}` || _Locations.default.logo
    })), _react.default.createElement("div", {
      className: _indexModule.default.textContainer
    }, _react.default.createElement("h6", null, review.username, _react.default.createElement("span", {
      className: _indexModule.default.discriminator
    }, "#", review.discriminator)), _react.default.createElement("p", {
      className: _indexModule.default.description
    }, review.text), _react.default.createElement("span", {
      className: _indexModule.default.stars
    }, stars)), // Allow the review to be deleted by the owner, or by an admin
    review.isCurrentUserOwner || auth && auth.data && auth.data.admin ? _react.default.createElement(_NotALink.default, {
      onClick: this.deleteReview
    }, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "pages.reviews.delete"
    })) : null);
  }

}

const mapStateToProps = state => {
  const {
    auth
  } = state;
  return {
    auth
  };
};

var _default = (0, _reactRedux.connect)(mapStateToProps)(ReviewCard);

exports.default = _default;
},{"../../data/Locations":"uTwd","./index.module.scss":"uSix","../LazyImage":"ofRo","../FlexContainer":"AaMC","../NotALink":"rr1b","../../redux/actions/auth":"YSbd"}],"Ad3D":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Styles = require("../../data/Styles");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

class ProgressBar extends _react.Component {
  render() {
    return _react.default.createElement("div", {
      className: `${_Styles.Modesta.progressContainer} ${this.props.className || ''}`
    }, _react.default.createElement("div", {
      className: `${_Styles.Modesta.progressBar} ${_Styles.Modesta[`${this.props.colour}Bar`]}`,
      style: {
        width: `${this.props.proportion * 100}%`
      }
    }, this.props.children));
  }

}

var _default = ProgressBar;
exports.default = _default;
},{"../../data/Styles":"rs3k"}],"nrPT":[function(require,module,exports) {
module.exports = {
  "average": "_average_9dc57",
  "averageContainer": "_averageContainer_9dc57",
  "progressText": "_progressText_9dc57",
  "progress": "_progress_9dc57"
};
},{}],"f0QB":[function(require,module,exports) {
module.exports = {
  "starsContainer": "_starsContainer_1f281"
};
},{}],"jlU0":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Locations = _interopRequireDefault(require("../../data/Locations"));

var _indexModule = _interopRequireDefault(require("./index.module.scss"));

var _reactIntl = require("react-intl");

var _FlexContainer = _interopRequireDefault(require("../FlexContainer"));

var _reactRedux = require("react-redux");

var _auth = require("../../redux/actions/auth");

var _ContentBox = _interopRequireDefault(require("../ContentBox"));

var _Styles = require("../../data/Styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

class ReviewForm extends _react.Component {
  constructor(props) {
    super(props);
    this.submitReview = this.submitReview.bind(this);
    this.form = _react.default.createRef();
    this.state = {
      submitted: false,
      message: null
    };
  }

  submitReview(e) {
    e.preventDefault();

    if (!this.state.submitted) {
      const formdata = new FormData(this.form.current);
      const {
        auth,
        intl
      } = this.props;
      fetch(`${_Locations.default.server}/${intl.locale}/bots/${this.props.bot.id}/reviews`, {
        credentials: 'include',
        body: formdata,
        method: 'POST'
      }).then(res => res.json()).then(res => {
        if (res.ok) {
          this.setState({
            submitted: true
          });
          this.props.setMyReview({
            cachedAvatar: auth.data.cachedAvatar,
            date: new Date(),
            discriminator: auth.data.discriminator,
            id: null,
            isCurrentUserOwner: false,
            language: intl.locale,
            rating: formdata.get('review.rating'),
            text: formdata.get('review.text'),
            username: auth.data.username
          });
        } else {
          this.setState({
            message: res.language || res.message
          });
        }
      });
    }
  }

  componentDidMount() {
    const {
      dispatch
    } = this.props;
    dispatch((0, _auth.fetchAuthIfNeeded)());
  }

  componentWillUnmount() {
    clearTimeout(this.state.timeout);
  }

  render() {
    const {
      auth
    } = this.props;
    if (this.state.submitted) return null;
    if (!auth) return null;
    if (!auth.data) return null;
    if (!auth.data.id) return null;
    return _react.default.createElement(_ContentBox.default, null, _react.default.createElement("form", {
      ref: this.form
    }, _react.default.createElement("h4", null, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "pages.reviews.write"
    })), _react.default.createElement(_FlexContainer.default, {
      className: _indexModule.default.starsContainer
    }, _react.default.createElement("input", {
      type: "radio",
      name: "review.rating",
      value: "5",
      id: "rating-5"
    }), _react.default.createElement("label", {
      htmlFor: "rating-5"
    }, "\u2605"), _react.default.createElement("input", {
      type: "radio",
      name: "review.rating",
      value: "4",
      id: "rating-4"
    }), _react.default.createElement("label", {
      htmlFor: "rating-4"
    }, "\u2605"), _react.default.createElement("input", {
      type: "radio",
      name: "review.rating",
      value: "3",
      id: "rating-3"
    }), _react.default.createElement("label", {
      htmlFor: "rating-3"
    }, "\u2605"), _react.default.createElement("input", {
      type: "radio",
      name: "review.rating",
      value: "2",
      id: "rating-2"
    }), _react.default.createElement("label", {
      htmlFor: "rating-2"
    }, "\u2605"), _react.default.createElement("input", {
      type: "radio",
      name: "review.rating",
      value: "1",
      id: "rating-1"
    }), _react.default.createElement("label", {
      htmlFor: "rating-1"
    }, "\u2605")), _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "pages.reviews.placeholder"
    }, placeholder => _react.default.createElement("textarea", {
      name: "review.text",
      className: _Styles.Modesta.fullWidth,
      placeholder: placeholder
    })), _react.default.createElement("button", {
      className: `${_Styles.Modesta.btn} ${_Styles.Modesta.white} ${_Styles.Modesta.blackText}`,
      onClick: this.submitReview
    }, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "forms.submit"
    })), this.state.message ? _react.default.createElement(_ContentBox.default, {
      className: _Styles.Modesta.alizarin
    }, _react.default.createElement("p", null, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: this.state.message
    }))) : null));
  }

}

const mapStateToProps = state => {
  const {
    auth
  } = state;
  return {
    auth
  };
};

var _default = (0, _reactRedux.connect)(mapStateToProps)((0, _reactIntl.injectIntl)(ReviewForm));

exports.default = _default;
},{"../../data/Locations":"uTwd","./index.module.scss":"f0QB","../FlexContainer":"AaMC","../../redux/actions/auth":"YSbd","../ContentBox":"50Yc","../../data/Styles":"rs3k"}],"VA/t":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _ContentBox = _interopRequireDefault(require("../../../components/ContentBox"));

var _ReviewCard = _interopRequireDefault(require("../../../components/ReviewCard"));

var _reactIntl = require("react-intl");

var _FlexColumns = _interopRequireDefault(require("../../../components/FlexColumns"));

var _ProgressBar = _interopRequireDefault(require("../../../components/ProgressBar"));

var _indexModule = _interopRequireDefault(require("./index.module.scss"));

var _FlexContainer = _interopRequireDefault(require("../../../components/FlexContainer"));

var _reactRedux = require("react-redux");

var _auth = require("../../../redux/actions/auth");

var _ReviewForm = _interopRequireDefault(require("../../../components/ReviewForm"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

class AppPageReviewsBox extends _react.Component {
  constructor(props) {
    super(props);
    this.state = {
      myReview: null
    };
    this.setMyReview = this.setMyReview.bind(this);
  }

  componentDidMount() {
    const {
      dispatch
    } = this.props;
    dispatch((0, _auth.fetchAuthIfNeeded)());
  }

  setMyReview(review) {
    this.setState({
      myReview: review
    });
  }

  render() {
    const {
      app
    } = this.props;
    const auth = this.props.auth.data;
    const {
      reviews
    } = app;
    const average = reviews.reduce((prev, curr) => prev + curr.rating, 0) / reviews.length;
    const counts = [0, 0, 0, 0, 0];
    reviews.forEach(review => counts[review.rating - 1]++);
    const proportions = counts.map(count => count / reviews.length);
    const myReview = auth ? reviews.find(review => review.author === auth.id) : null;
    const isOwner = auth ? app.authors.some(author => author.id === auth.id) : false;
    return _react.default.createElement(_ContentBox.default, null, _react.default.createElement("h3", null, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "pages.reviews.title"
    })), _react.default.createElement(_FlexColumns.default, null, _react.default.createElement(_FlexColumns.default, {
      columns: 4,
      className: _indexModule.default.averageContainer
    }, _react.default.createElement("span", {
      className: _indexModule.default.average
    }, average.toFixed(1) !== 'NaN' ? average.toFixed(1) : null)), _react.default.createElement(_FlexColumns.default, {
      columns: 8
    }, _react.default.createElement(_FlexContainer.default, null, _react.default.createElement("span", {
      className: _indexModule.default.progressText
    }, "5"), _react.default.createElement(_ProgressBar.default, {
      className: _indexModule.default.progress,
      colour: "emerald",
      proportion: proportions[4]
    })), _react.default.createElement(_FlexContainer.default, null, _react.default.createElement("span", {
      className: _indexModule.default.progressText
    }, "4"), _react.default.createElement(_ProgressBar.default, {
      className: _indexModule.default.progress,
      colour: "greenSea",
      proportion: proportions[3]
    })), _react.default.createElement(_FlexContainer.default, null, _react.default.createElement("span", {
      className: _indexModule.default.progressText
    }, "3"), _react.default.createElement(_ProgressBar.default, {
      className: _indexModule.default.progress,
      colour: "sunFlower",
      proportion: proportions[2]
    })), _react.default.createElement(_FlexContainer.default, null, _react.default.createElement("span", {
      className: _indexModule.default.progressText
    }, "2"), _react.default.createElement(_ProgressBar.default, {
      className: _indexModule.default.progress,
      colour: "carrot",
      proportion: proportions[1]
    })), _react.default.createElement(_FlexContainer.default, null, _react.default.createElement("span", {
      className: _indexModule.default.progressText
    }, "1"), _react.default.createElement(_ProgressBar.default, {
      className: _indexModule.default.progress,
      colour: "alizarin",
      proportion: proportions[0]
    })))), _react.default.createElement("div", null, // If there's a review by the owner, show it.
    this.state.myReview || myReview ? _react.default.createElement(_ReviewCard.default, {
      review: this.state.myReview || myReview,
      bot: app
    }) : isOwner ? null : _react.default.createElement(_ReviewForm.default, {
      setMyReview: this.setMyReview,
      bot: app
    }), reviews.slice(0, 8).filter(review => auth ? review.author !== auth.id : true).map((review, index) => _react.default.createElement(_ReviewCard.default, {
      key: index,
      review: review,
      bot: app
    }))));
  }

}

const mapStateToProps = state => {
  const {
    auth
  } = state;
  return {
    auth
  };
};

var _default = (0, _reactRedux.connect)(mapStateToProps)(AppPageReviewsBox);

exports.default = _default;
},{"../../../components/ContentBox":"50Yc","../../../components/ReviewCard":"GW9A","../../../components/FlexColumns":"U1G4","../../../components/ProgressBar":"Ad3D","./index.module.scss":"nrPT","../../../components/FlexContainer":"AaMC","../../../redux/actions/auth":"YSbd","../../../components/ReviewForm":"jlU0"}],"T8sv":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Styles = require("../../data/Styles");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

class Column extends _react.Component {
  render() {
    return _react.default.createElement("div", _extends({}, this.props, {
      className: `${_Styles.Modesta.column} ${this.props.className || ''}`
    }), this.props.children);
  }

}

var _default = Column;
exports.default = _default;
},{"../../data/Styles":"rs3k"}],"+7WR":[function(require,module,exports) {
module.exports = {
  "textarea": "_textarea_c763d"
};
},{}],"azt2":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactIntl = require("react-intl");

var _FlexContainer = _interopRequireDefault(require("../FlexContainer"));

var _Column = _interopRequireDefault(require("../Column"));

var _Styles = require("../../data/Styles");

var _indexModule = _interopRequireDefault(require("./index.module.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

class InputField extends _react.Component {
  render() {
    let input = null;
    const value = this.props.value;

    if (this.props.options) {
      input = _react.default.createElement(_reactIntl.FormattedMessage, {
        id: `${this.props.id}.placeholder`
      }, placeholder => _react.default.createElement("select", {
        name: this.props.name,
        className: _Styles.Modesta.fullWidth,
        defaultValue: value,
        onChange: this.props.onChange
      }, _react.default.createElement("option", {
        disabled: !this.props.allowNone,
        selected: !this.props.options.some(option => value === option),
        value: ""
      }, placeholder), this.props.options.map(option => {
        if (this.props.localiseOptions) {
          return _react.default.createElement(_reactIntl.FormattedMessage, {
            id: `${this.props.localiseOptions}.${option}`,
            key: option
          }, formattedOption => _react.default.createElement("option", {
            value: option,
            selected: value === option
          }, formattedOption));
        }

        return _react.default.createElement("option", {
          value: option,
          selected: value === option,
          key: option
        }, option);
      })));
    } else if (this.props.toggle) {
      input = _react.default.createElement("input", {
        name: this.props.name,
        type: "checkbox",
        defaultChecked: value,
        onChange: this.props.onChange
      });
    } else if (this.props.textarea) {
      input = _react.default.createElement(_reactIntl.FormattedMessage, {
        id: `${this.props.id}.placeholder`
      }, placeholder => _react.default.createElement("textarea", {
        name: this.props.name,
        className: `${_Styles.Modesta.fullWidth} ${_indexModule.default.textarea}`,
        placeholder: placeholder,
        defaultValue: value || undefined,
        onChange: this.props.onChange
      }));
    } else {
      input = _react.default.createElement(_reactIntl.FormattedMessage, {
        id: `${this.props.id}.placeholder`
      }, placeholder => _react.default.createElement("input", {
        name: this.props.name,
        type: "text",
        className: _Styles.Modesta.fullWidth,
        placeholder: placeholder,
        style: {
          flexGrow: '1'
        },
        defaultValue: value || undefined,
        onChange: this.props.onChange
      }));
    }

    return _react.default.createElement(_Column.default, {
      className: this.props.className || _Styles.Modesta.oneHalf,
      style: this.props.style
    }, _react.default.createElement("label", {
      htmlFor: this.props.name
    }, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: `${this.props.id}.title`
    }), this.props.required ? '*' : null), _react.default.createElement(_FlexContainer.default, null, input), this.props.smallText ? _react.default.createElement("small", null, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: `${this.props.id}.small`
    })) : null);
  }

}

var _default = InputField;
exports.default = _default;
},{"../FlexContainer":"AaMC","../Column":"T8sv","../../data/Styles":"rs3k","./index.module.scss":"+7WR"}],"3m4L":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _ContentBox = _interopRequireDefault(require("../../../components/ContentBox"));

var _InputField = _interopRequireDefault(require("../../../components/InputField"));

var _States = _interopRequireDefault(require("../../../data/States"));

var _Styles = require("../../../data/Styles");

var _reactIntl = require("react-intl");

var _Locations = _interopRequireDefault(require("../../../data/Locations"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

class AppPageSetStateBox extends _react.Component {
  constructor(props) {
    super(props);
    this.form = _react.default.createRef();
    this.submit = this.submit.bind(this);
  }

  submit(e) {
    e.preventDefault();
    const formdata = new FormData(this.form.current);
    fetch(`${_Locations.default.server}/reactjs/v2/apps/id/${this.props.app.id}/state`, {
      method: 'POST',
      body: formdata,
      credentials: 'include'
    });
  }

  render() {
    const auth = this.props.auth.data;
    const {
      app
    } = this.props;
    if (!auth) return null;
    if (!auth.admin) return null;
    return _react.default.createElement(_ContentBox.default, null, _react.default.createElement("form", {
      ref: this.form
    }, _react.default.createElement(_InputField.default, {
      name: "state",
      id: "components.botpagesetstatebox.state",
      localiseOptions: "states",
      options: Object.values(_States.default),
      value: app.state,
      onChange: this.onChange
    }), _react.default.createElement(_InputField.default, {
      name: "reason",
      id: "components.botpagesetstatebox.reason",
      textarea: true,
      className: _Styles.Modesta.fullWidth
    }), _react.default.createElement("button", {
      onClick: this.submit
    }, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "components.botpagesetstatebox.submit"
    }))));
  }

}

const mapStateToProps = state => {
  const {
    auth
  } = state;
  return {
    auth
  };
};

var _default = (0, _reactRedux.connect)(mapStateToProps)(AppPageSetStateBox);

exports.default = _default;
},{"../../../components/ContentBox":"50Yc","../../../components/InputField":"azt2","../../../data/States":"2Fxh","../../../data/Styles":"rs3k","../../../data/Locations":"uTwd"}],"cIZt":[function(require,module,exports) {
module.exports = {
  "box": "_box_81ec6",
  "container": "_container_81ec6",
  "titleContainer": "_titleContainer_81ec6",
  "avatar": "_avatar_81ec6",
  "prefix": "_prefix_81ec6",
  "links": "_links_81ec6"
};
},{}],"hpSO":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _indexModule = _interopRequireDefault(require("./index.module.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

class PrefixLabel extends _react.Component {
  render() {
    return _react.default.createElement("span", {
      className: `${_indexModule.default.prefix} ${this.props.className || ''}`
    }, this.props.children);
  }

}

var _default = PrefixLabel;
exports.default = _default;
},{"./index.module.scss":"cIZt"}],"+9p0":[function(require,module,exports) {
module.exports = {
  "btn": "_btn_40445"
};
},{}],"hTVF":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactIntl = require("react-intl");

var _Button = _interopRequireDefault(require("../../../components/Button"));

var _indexModule = _interopRequireDefault(require("./index.module.scss"));

var _ConstructCSS = _interopRequireDefault(require("../../../helpers/ConstructCSS"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

class AppPageInviteButton extends _react.Component {
  render() {
    const {
      app
    } = this.props;
    return _react.default.createElement("a", {
      href: app.invite
    }, _react.default.createElement(_Button.default, {
      className: (0, _ConstructCSS.default)(_indexModule.default.btn, this.props.className)
    }, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: `pages.${app.type}.invite`
    })));
  }

}

var _default = AppPageInviteButton;
exports.default = _default;
},{"../../../components/Button":"+DmJ","./index.module.scss":"+9p0","../../../helpers/ConstructCSS":"SwhA"}],"BuAp":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactIntl = require("react-intl");

var _ContentBox = _interopRequireDefault(require("../../../components/ContentBox"));

var _FlexContainer = _interopRequireDefault(require("../../../components/FlexContainer"));

var _LazyImage = _interopRequireDefault(require("../../../components/LazyImage"));

var _Locations = _interopRequireDefault(require("../../../data/Locations"));

var _Styles = require("../../../data/Styles");

var _indexModule = _interopRequireDefault(require("./index.module.scss"));

var _PrefixLabel = _interopRequireDefault(require("./PrefixLabel"));

var _Container = _interopRequireDefault(require("../../../components/Container"));

var _Button = _interopRequireDefault(require("../../../components/Button"));

var _AppPageInviteButton = _interopRequireDefault(require("../AppPageInviteButton"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

class AppPageTitleBox extends _react.Component {
  constructor(props) {
    super(props);
    this.scroll = this.scroll.bind(this);
    this.state = {
      padding: 50,
      maxHeight: 200,
      displayedPadding: 50,
      displayedMaxHeight: 200
    };
  }

  componentDidMount() {
    document.addEventListener('scroll', this.scroll);
  }

  componentWillUnmount() {
    document.removeEventListener('resize', this.scroll);
  }

  scroll(e) {
    const heightthing = (100 - window.scrollY) / 2;
    const maxHeight = 200 - window.scrollY;
    requestAnimationFrame(() => {
      this.setState({
        padding: `${heightthing > 0 ? heightthing : 0}px`,
        maxHeight: `${maxHeight > 50 ? maxHeight : 50}px`
      });
    });
  }

  render() {
    const {
      app,
      contents
    } = this.props;
    return _react.default.createElement(_ContentBox.default, {
      className: _indexModule.default.box,
      style: {
        paddingTop: this.state.padding,
        paddingBottom: this.state.padding,
        maxHeight: this.state.maxHeight
      }
    }, _react.default.createElement(_Container.default, {
      className: _indexModule.default.container
    }, _react.default.createElement(_FlexContainer.default, null, _react.default.createElement(_LazyImage.default, {
      src: `${_Locations.default.cdn}${app.cachedImages.avatar}`,
      className: _indexModule.default.avatar,
      style: {
        maxHeight: this.state.maxHeight
      }
    }), _react.default.createElement("div", {
      className: _indexModule.default.titleContainer
    }, _react.default.createElement("h3", null, contents.name))), app.nsfw || app.state !== 'approved' ? _react.default.createElement("p", null, app.nsfw ? _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_PrefixLabel.default, {
      className: _Styles.Modesta.alizarin
    }, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "pages.bots.nsfw"
    }))) : null, app.state !== 'approved' ? _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_PrefixLabel.default, {
      className: _Styles.Modesta.alizarin
    }, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: `states.${app.state}`
    }))) : null) : null, app.flags && app.flags.adverts && _react.default.createElement("div", null, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "pages.bots.adverts"
    })), app.flags && app.flags.inAppPurchases && _react.default.createElement("div", null, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "pages.bots.inAppPurchases"
    }))));
  }

}

var _default = AppPageTitleBox;
exports.default = _default;
},{"../../../components/ContentBox":"50Yc","../../../components/FlexContainer":"AaMC","../../../components/LazyImage":"ofRo","../../../data/Locations":"uTwd","../../../data/Styles":"rs3k","./index.module.scss":"cIZt","./PrefixLabel":"hpSO","../../../components/Container":"tNeE","../../../components/Button":"+DmJ","../AppPageInviteButton":"hTVF"}],"GT34":[function(require,module,exports) {
module.exports = {
  "topPad": "_topPad_2011f",
  "appLinks": "_appLinks_2011f",
  "rhsButton": "_rhsButton_2011f",
  "prefixList": "_prefixList_2011f",
  "prefix": "_prefix_2011f",
  "triggerNote": "_triggerNote_2011f",
  "localeLinks": "_localeLinks_2011f",
  "used": "_used_2011f"
};
},{}],"frcu":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactHelmet = require("react-helmet");

var _reactIntl = require("react-intl");

var _reactRedux = require("react-redux");

var _reactRouterDom = require("react-router-dom");

var _WebsiteBackgroundImage = _interopRequireDefault(require("../../components/WebsiteBackgroundImage"));

var _Button = _interopRequireDefault(require("../../components/Button"));

var _Container = _interopRequireDefault(require("../../components/Container"));

var _ContentBox = _interopRequireDefault(require("../../components/ContentBox"));

var _FlexColumns = _interopRequireDefault(require("../../components/FlexColumns"));

var _Layout = _interopRequireDefault(require("../../components/Layout"));

var _LoadingContainer = _interopRequireDefault(require("../../components/LoadingContainer"));

var _NotALink = _interopRequireDefault(require("../../components/NotALink"));

var _Youku = _interopRequireDefault(require("../../components/Youku"));

var _YouTube = _interopRequireDefault(require("../../components/YouTube"));

var _Locations = _interopRequireDefault(require("../../data/Locations"));

var _ConstructCSS = _interopRequireDefault(require("../../helpers/ConstructCSS"));

var _reviewToJsonLd = _interopRequireDefault(require("../../helpers/reviewToJsonLd"));

var _locales = require("../../locales");

var _bot = require("../../redux/actions/bot");

var _NotFound = _interopRequireDefault(require("../NotFound"));

var _AppPageContentBox = _interopRequireDefault(require("./AppPageContentBox"));

var _AppPageImagesBox = _interopRequireDefault(require("./AppPageImagesBox"));

var _AppPageInfoBox = _interopRequireDefault(require("./AppPageInfoBox"));

var _AppPageReviewsBox = _interopRequireDefault(require("./AppPageReviewsBox"));

var _AppPageSetStateBox = _interopRequireDefault(require("./AppPageSetStateBox"));

var _AppPageTitleBox = _interopRequireDefault(require("./AppPageTitleBox"));

var _indexModule = _interopRequireDefault(require("./index.module.scss"));

var _AppPageInviteButton = _interopRequireDefault(require("./AppPageInviteButton"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

class BotPage extends _react.Component {
  constructor(props) {
    super(props);
    this.state = {
      bot: null,
      displayLocale: props.intl.locale
    };
    this.setLocale = this.setLocale.bind(this);
  }

  componentDidMount() {
    const {
      dispatch,
      match
    } = this.props; // Check if the bot has been injected

    dispatch((0, _bot.fetchABot)({
      match
    }));
  }

  setLocale(locale) {
    this.setState({
      displayLocale: locale
    });
    window.scrollTo(0, 0);
  }

  render() {
    const app = this.props.bot.data;
    const auth = this.props.auth.data;
    const status = this.props.bot.status;

    if (status === 404) {
      if (this.props.staticContext) this.props.staticContext.status = 404;
      return _react.default.createElement(_NotFound.default, {
        match: this.props.match
      });
    }

    if (!app) {
      return _react.default.createElement(_Layout.default, {
        match: this.props.match
      }, _react.default.createElement(_LoadingContainer.default, null));
    }

    if (app.id === this.props.match.params.id && app.type !== this.props.match.params.type) {
      if (this.props.staticContext) this.props.staticContext.status = 301;
      return _react.default.createElement(_reactRouterDom.Redirect, {
        to: `/${this.props.match.params.locale}/${app.type}/${app.id}`
      });
    }

    const contents = (0, _locales.Localise)(app.contents, this.state.displayLocale || this.props.intl.locale);
    const reviewJSON = (0, _reviewToJsonLd.default)(contents, app);
    return _react.default.createElement(_Layout.default, {
      match: this.props.match,
      afterNav: _react.default.createElement(_AppPageTitleBox.default, {
        app: app,
        contents: contents
      })
    }, _react.default.createElement(_reactHelmet.Helmet, null, _react.default.createElement("title", null, contents.name), _react.default.createElement("meta", {
      property: "og:title",
      content: contents.name
    }), _react.default.createElement("meta", {
      property: "og:description",
      content: contents.description
    }), _react.default.createElement("meta", {
      name: "description",
      content: contents.description
    }), _react.default.createElement("meta", {
      property: "og:image",
      content: `${_Locations.default.cdn}${app.cachedImages.avatar}`
    }), _react.default.createElement("meta", {
      httpEquiv: "last-modified",
      content: new Date(app.edited).toISOString().split('T')[0]
    }), reviewJSON && _react.default.createElement("script", {
      type: "application/ld+json"
    }, reviewJSON)), app.cachedImages.cover ? _react.default.createElement(_WebsiteBackgroundImage.default, {
      src: `${_Locations.default.cdn}${app.cachedImages.cover}`
    }) : null, _react.default.createElement(_Container.default, {
      className: _indexModule.default.topPad
    }, _react.default.createElement(_FlexColumns.default, {
      padding: true
    }, _react.default.createElement(_FlexColumns.default, {
      columns: 3
    }, _react.default.createElement(_AppPageInviteButton.default, {
      app: app,
      className: _indexModule.default.rhsButton
    }), _react.default.createElement(_AppPageInfoBox.default, {
      app: app
    }), _react.default.createElement(_ContentBox.default, null, _react.default.createElement("p", null, app.contents.length === 1 ? _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "pages.apps.oneLang"
    }) : _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "pages.apps.otherLang"
    }), _react.default.createElement("ul", {
      className: (0, _ConstructCSS.default)(_indexModule.default.appLinks, _indexModule.default.localeLinks)
    }, app.contents.map(appContents => _react.default.createElement("li", {
      key: appContents.locale
    }, contents.locale === appContents.locale ? _react.default.createElement("span", {
      className: _indexModule.default.used
    }, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: `locales.${appContents.locale}`
    })) : _react.default.createElement(_NotALink.default, {
      onClick: () => this.setLocale(appContents.locale)
    }, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: `locales.${appContents.locale}`
    })))))))), _react.default.createElement(_FlexColumns.default, {
      columns: 9
    }, _react.default.createElement(_AppPageContentBox.default, {
      page: contents.page
    }), _react.default.createElement(_AppPageImagesBox.default, {
      images: app.cachedImages.preview
    }, app.videos.youtube ? _react.default.createElement(_YouTube.default, {
      video: app.videos.youtube
    }) : null, app.videos.youku ? _react.default.createElement(_Youku.default, {
      video: app.videos.youku
    }) : null), _react.default.createElement(_AppPageReviewsBox.default, {
      app: app
    }))), _react.default.createElement(_AppPageSetStateBox.default, {
      app: app
    })));
  }

}

const mapStateToProps = state => {
  const {
    bot,
    auth
  } = state;
  return {
    bot,
    auth
  };
};

const exportedComponent = (0, _reactRedux.connect)(mapStateToProps)((0, _reactIntl.injectIntl)(BotPage));
exportedComponent.serverFetch = [{
  function: _bot.fetchABot,
  pass: ['match'],
  payload: {}
}];
var _default = exportedComponent;
exports.default = _default;
},{"../../components/WebsiteBackgroundImage":"TxHF","../../components/Button":"+DmJ","../../components/Container":"tNeE","../../components/ContentBox":"50Yc","../../components/FlexColumns":"U1G4","../../components/Layout":"UCeK","../../components/LoadingContainer":"N3k8","../../components/NotALink":"rr1b","../../components/Youku":"CyNR","../../components/YouTube":"4Xqa","../../data/Locations":"uTwd","../../helpers/ConstructCSS":"SwhA","../../helpers/reviewToJsonLd":"b75q","../../locales":"Qpzm","../../redux/actions/bot":"YodB","../NotFound":"GVTv","./AppPageContentBox":"PYpx","./AppPageImagesBox":"yXl1","./AppPageInfoBox":"vLPW","./AppPageReviewsBox":"VA/t","./AppPageSetStateBox":"3m4L","./AppPageTitleBox":"BuAp","./index.module.scss":"GT34","./AppPageInviteButton":"hTVF"}],"iVLo":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Layout = _interopRequireDefault(require("../Layout"));

var _ContentBox = _interopRequireDefault(require("../ContentBox"));

var _Container = _interopRequireDefault(require("../Container"));

var _reactIntl = require("react-intl");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

class PermissionDenied extends _react.Component {
  render() {
    return _react.default.createElement(_Layout.default, {
      match: this.props.match
    }, _react.default.createElement(_Container.default, null, _react.default.createElement(_ContentBox.default, null, _react.default.createElement("h2", null, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "errors.permissions.denied"
    })))));
  }

}

var _default = PermissionDenied;
exports.default = _default;
},{"../Layout":"UCeK","../ContentBox":"50Yc","../Container":"tNeE"}],"HOS3":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactHelmet = require("react-helmet");

var _Container = _interopRequireDefault(require("../../components/Container"));

var _Layout = _interopRequireDefault(require("../../components/Layout"));

var _Locations = _interopRequireDefault(require("../../data/Locations"));

var _NotFound = _interopRequireDefault(require("../NotFound"));

var _reactIntl = require("react-intl");

var _locales = require("../../locales");

var _ContentBox = _interopRequireDefault(require("../../components/ContentBox"));

var _Styles = require("../../data/Styles");

var _LoadingContainer = _interopRequireDefault(require("../../components/LoadingContainer"));

var _PermissionDenied = _interopRequireDefault(require("../../components/PermissionDenied"));

var _NotALink = _interopRequireDefault(require("../../components/NotALink"));

var _ConstructCSS = _interopRequireDefault(require("../../helpers/ConstructCSS"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

class ConfigurePage extends _react.Component {
  constructor(props) {
    super(props);
    this.state = {
      bot: null,
      notFound: false,
      notAllowed: false
    };
    this.resetToken = this.resetToken.bind(this);
    this.hideBot = this.hideBot.bind(this);
  }

  componentDidMount() {
    // Check if the bot has been injected
    if (!this.state.bot) {
      fetch(`${_Locations.default.server}/reactjs/v2/apps/id/${this.props.match.params.id}/configure`, {
        credentials: 'include'
      }).then(res => {
        if (res.status === 404) {
          this.setState({
            notFound: true
          });
        } else if (res.status === 401) {
          this.setState({
            notAllowed: true
          });
        }

        return res.json();
      }).then(data => {
        if (data.ok) {
          const bot = data.data;
          this.setState({
            bot
          });
        }
      });
    }
  }

  resetToken() {
    fetch(`${_Locations.default.server}/reactjs/v2/apps/id/${this.props.match.params.id}/token`, {
      credentials: 'include',
      method: 'POST'
    }).then(data => data.json()).then(data => {
      if (data.ok) {
        const bot = data.data.changes[0].new_val;
        this.setState({
          bot
        });
      }
    });
  }

  hideBot() {
    fetch(`${_Locations.default.server}/reactjs/v2/apps/id/${this.props.match.params.id}/hide`, {
      credentials: 'include',
      method: 'POST'
    }).then(data => data.json()).then(data => {
      if (data.ok) {
        const bot = data.data.changes[0].new_val;
        this.setState({
          bot
        });
      }
    });
  }

  render() {
    if (this.state.notFound) {
      return _react.default.createElement(_NotFound.default, {
        match: this.props.match
      });
    }

    if (this.state.notAllowed) {
      return _react.default.createElement(_PermissionDenied.default, {
        match: this.props.match
      });
    }

    if (!this.state.bot) {
      return _react.default.createElement(_Layout.default, {
        match: this.props.match
      }, _react.default.createElement(_LoadingContainer.default, null));
    }

    const {
      bot
    } = this.state;
    const contents = (0, _locales.Localise)(this.state.bot.contents, this.props.intl.locale);
    return _react.default.createElement(_Layout.default, {
      match: this.props.match
    }, _react.default.createElement(_reactHelmet.Helmet, null, _react.default.createElement("title", null, contents.name)), _react.default.createElement(_Container.default, null, _react.default.createElement(_ContentBox.default, null, _react.default.createElement("h2", null, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "pages.configuration.token.title"
    })), _react.default.createElement("p", null, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "pages.configuration.token.description"
    })), _react.default.createElement(_ContentBox.default, {
      className: _Styles.Modesta.secondary
    }, _react.default.createElement("code", null, bot.token)), _react.default.createElement("a", {
      className: `${_Styles.Modesta.btn} ${_Styles.Modesta.github}`,
      href: _Locations.default.wiki,
      target: "_blank",
      rel: "noopener noreferrer"
    }, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "pages.configuration.token.docs"
    })), _react.default.createElement(_NotALink.default, {
      onClick: this.resetToken,
      className: (0, _ConstructCSS.default)(_Styles.Modesta.btn, _Styles.Modesta.github)
    }, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "pages.configuration.token.renew"
    }))), _react.default.createElement(_ContentBox.default, null, _react.default.createElement("h2", null, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "pages.configuration.hide.title"
    })), _react.default.createElement("p", null, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "pages.configuration.hide.description"
    })), _react.default.createElement(_NotALink.default, {
      onClick: this.hideBot,
      className: (0, _ConstructCSS.default)(_Styles.Modesta.btn, bot.hide ? (0, _ConstructCSS.default)(_Styles.Modesta.emerald, _Styles.Modesta.blackText) : _Styles.Modesta.alizarin)
    }, bot.hide ? _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "pages.configuration.hide.disable"
    }) : // disable hidden === show
    _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "pages.configuration.hide.enable"
    }) // enable hidden === hide
    ))));
  }

}

var _default = (0, _reactIntl.injectIntl)(ConfigurePage);

exports.default = _default;
},{"../../components/Container":"tNeE","../../components/Layout":"UCeK","../../data/Locations":"uTwd","../NotFound":"GVTv","../../locales":"Qpzm","../../components/ContentBox":"50Yc","../../data/Styles":"rs3k","../../components/LoadingContainer":"N3k8","../../components/PermissionDenied":"iVLo","../../components/NotALink":"rr1b","../../helpers/ConstructCSS":"SwhA"}],"gasw":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactIntl = require("react-intl");

var _FlexContainer = _interopRequireDefault(require("../FlexContainer"));

var _Column = _interopRequireDefault(require("../Column"));

var _Styles = require("../../data/Styles");

var _elementsModule = _interopRequireDefault(require("../../scss/elements.module.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

class MultipleInputField extends _react.Component {
  constructor(props) {
    super(props);
    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      values: []
    };
  }

  handleChange(e, index) {
    const values = [...this.state.values];
    values[index] = e.target.value;
    this.setState({
      values
    });
  }

  add(e) {
    e.preventDefault();
    this.setState({
      values: [...this.state.values, '']
    });
  }

  remove(e, index) {
    e.preventDefault();
    this.setState({
      values: this.state.values.filter((x, i) => i !== index)
    });
  }

  componentDidUpdate() {
    if (this.state.values.length === 0 && this.props.value && this.props.value.length > 0) {
      this.setState({
        values: this.props.value
      });
    }
  }

  render() {
    let values = this.state.values.slice();

    const input = (value, index) => _react.default.createElement(_reactIntl.FormattedMessage, {
      id: `${this.props.id}.placeholder`
    }, placeholder => _react.default.createElement("input", {
      name: this.props.name,
      type: "text",
      className: _Styles.Modesta.fullWidth,
      placeholder: placeholder,
      style: {
        flexGrow: '1'
      },
      value: value || '',
      onChange: e => {
        this.handleChange(e, index);
        if (this.props.onChange) this.props.onChange(e);
      }
    }));

    return _react.default.createElement(_Column.default, {
      className: this.props.className || _Styles.Modesta.oneHalf
    }, _react.default.createElement("label", {
      htmlFor: this.props.name
    }, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: `${this.props.id}.title`
    }), this.props.required ? '*' : null), _react.default.createElement(_FlexContainer.default, null, input(values.shift(), 0), _react.default.createElement("button", {
      className: _elementsModule.default.button,
      onClick: this.add
    }, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: `${this.props.id}.add`
    }))), values.map((value, index) => _react.default.createElement(_FlexContainer.default, {
      key: index
    }, input(value, index + 1), _react.default.createElement("button", {
      className: _elementsModule.default.button,
      onClick: e => this.remove(e, index + 1)
    }, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: `${this.props.id}.delete`
    })))));
  }

}

var _default = MultipleInputField;
exports.default = _default;
},{"../FlexContainer":"AaMC","../Column":"T8sv","../../data/Styles":"rs3k","../../scss/elements.module.scss":"h2Hb"}],"L3ld":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Layout = _interopRequireDefault(require("../Layout"));

var _ContentBox = _interopRequireDefault(require("../ContentBox"));

var _Container = _interopRequireDefault(require("../Container"));

var _reactIntl = require("react-intl");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

class PleaseLoginContainer extends _react.Component {
  render() {
    return _react.default.createElement(_Container.default, null, _react.default.createElement(_ContentBox.default, null, _react.default.createElement("h2", null, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "errors.permissions.login"
    }))));
  }

}

var _default = PleaseLoginContainer;
exports.default = _default;
},{"../Layout":"UCeK","../ContentBox":"50Yc","../Container":"tNeE"}],"pSXH":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Styles = require("../../data/Styles");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

class Row extends _react.Component {
  render() {
    return _react.default.createElement("div", {
      className: _Styles.Modesta.row
    }, this.props.children);
  }

}

var _default = Row;
exports.default = _default;
},{"../../data/Styles":"rs3k"}],"BIvw":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchCategoriesIfNeeded = fetchCategoriesIfNeeded;
exports.RECIEVE_CATEGORIES = exports.REQUEST_CATEGORIES = void 0;

var _Locations = _interopRequireDefault(require("../../data/Locations"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const REQUEST_CATEGORIES = 'REQUEST_CATEGORIES';
exports.REQUEST_CATEGORIES = REQUEST_CATEGORIES;
const RECIEVE_CATEGORIES = 'RECIEVE_CATEGORIES';
exports.RECIEVE_CATEGORIES = RECIEVE_CATEGORIES;

function requestCategories() {
  return {
    type: REQUEST_CATEGORIES
  };
}

function receiveCategories(json) {
  return {
    type: RECIEVE_CATEGORIES,
    data: json.data
  };
}

function fetchCategories() {
  return dispatch => {
    dispatch(requestCategories());
    return fetch(`${_Locations.default.server}/reactjs/v2/categories`, {
      credentials: 'include'
    }).then(res => {
      return res.json().then(json => {
        return dispatch(receiveCategories(json));
      });
    });
  };
}

function shouldFetchCategories(state) {
  if (state.categories.fetching) return false;
  if (state.categories.fetched) return false;
  return true;
}

function fetchCategoriesIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchCategories(getState())) {
      return dispatch(fetchCategories());
    }
  };
}
},{"../../data/Locations":"uTwd"}],"gvgD":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactIntl = require("react-intl");

var _reactRedux = require("react-redux");

var _reactRouterDom = require("react-router-dom");

var _Container = _interopRequireDefault(require("../../components/Container"));

var _ContentBox = _interopRequireDefault(require("../../components/ContentBox"));

var _FlexContainer = _interopRequireDefault(require("../../components/FlexContainer"));

var _InputField = _interopRequireDefault(require("../../components/InputField"));

var _Layout = _interopRequireDefault(require("../../components/Layout"));

var _MultipleInputField = _interopRequireDefault(require("../../components/MultipleInputField"));

var _PleaseLogIn = _interopRequireDefault(require("../../components/PleaseLogIn"));

var _Row = _interopRequireDefault(require("../../components/Row"));

var _Locations = _interopRequireDefault(require("../../data/Locations"));

var _Styles = require("../../data/Styles");

var _locales = _interopRequireDefault(require("../../locales"));

var _auth = require("../../redux/actions/auth");

var _categories = require("../../redux/actions/categories");

var _displayModule = _interopRequireDefault(require("../../scss/display.module.scss"));

var _elementsModule = _interopRequireDefault(require("../../scss/elements.module.scss"));

var _bot = require("../../redux/actions/bot");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

class EditBot extends _react.Component {
  constructor(props) {
    super(props);
    this.state = {
      notFound: false,
      edited: true,
      message: null,
      unlocalised: null,
      ok: null,
      unusedLanguages: _locales.default.filter(language => language.botPageLanguage).map(language => language.code),
      usedLanguages: [],
      redirect: null,
      loadedExistingLanguages: false
    };
    this.form = _react.default.createRef();
    this.languagesSelect = _react.default.createRef();
    this.submit = this.submit.bind(this);
    this.addLanguage = this.addLanguage.bind(this);
    this.loadExistingLanguages = this.loadExistingLanguages.bind(this);
  }

  componentDidUpdate() {
    if (this.props.match.params.id) {
      this.loadExistingLanguages();
    }
  }

  componentDidMount() {
    const {
      dispatch,
      match
    } = this.props;
    dispatch((0, _categories.fetchCategoriesIfNeeded)());
    dispatch((0, _auth.fetchAuthIfNeeded)()); // If editing a bot

    if (match.params.id) {
      dispatch((0, _bot.fetchABot)({
        match
      }));
      this.loadExistingLanguages();
    }
  }

  loadExistingLanguages() {
    const bot = this.props.bot.data;

    if (!this.state.loadedExistingLanguages && bot && bot.contents) {
      console.log('reloading languages');
      this.setState({
        loadedExistingLanguages: true,
        unusedLanguages: _locales.default.filter(language => language.botPageLanguage).filter(language => !bot.contents.some(content => content.locale === language.code)).map(language => language.code),
        usedLanguages: _locales.default.filter(language => language.botPageLanguage).filter(language => bot.contents.some(content => content.locale === language.code)).map(language => language.code)
      });
    }
  }

  addLanguage(e) {
    e.preventDefault();
    const selected = this.languagesSelect.current.value;

    if (selected !== 'null' && this.state.unusedLanguages.includes(selected)) {
      this.setState({
        unusedLanguages: this.state.unusedLanguages.filter(language => language !== selected),
        usedLanguages: [...this.state.usedLanguages, selected]
      });
    }
  }

  removeLanguage(e, selected) {
    e.preventDefault();

    if (selected !== 'null') {
      this.setState({
        usedLanguages: this.state.usedLanguages.filter(language => language !== selected),
        unusedLanguages: [...this.state.unusedLanguages, selected]
      });
    }
  }

  submit(e) {
    e.preventDefault();
    const formdata = new FormData(this.form.current);
    fetch(`${_Locations.default.server}/bots/add`, {
      method: 'POST',
      body: formdata,
      credentials: 'include'
    }).then(data => data.json()).then(data => {
      this.setState({
        ok: data.ok,
        message: data.message || null,
        unlocalised: data.language || null
      });

      if (data.ok) {
        this.setState({
          edited: false
        });
      }

      if (data.redirect) {
        const {
          dispatch
        } = this.props;
        dispatch((0, _bot.resetTheBot)());
        setTimeout(() => {
          this.setState({
            redirect: data.redirect
          });
        }, 500);
      }
    });
  }

  render() {
    const auth = this.props.auth.data;

    if (!auth || !auth.id) {
      return _react.default.createElement(_Layout.default, {
        match: this.props.match
      }, _react.default.createElement(_PleaseLogIn.default, {
        match: this.props.match
      }));
    }

    const {
      intl
    } = this.props;

    if (this.state.redirect) {
      return _react.default.createElement(_reactRouterDom.Redirect, {
        to: `/${intl.locale}${this.state.redirect}`
      });
    }

    const bot = this.props.match.params.id ? this.props.bot.data : null;
    const categories = this.props.categories.data;
    return _react.default.createElement(_Layout.default, {
      match: this.props.match
    }, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "pages.edit.leave"
    }, message => _react.default.createElement(_reactRouterDom.Prompt, {
      when: this.state.edited,
      message: message
    })), _react.default.createElement("form", {
      ref: this.form,
      onSubmit: this.submit
    }, _react.default.createElement(_Container.default, null, _react.default.createElement("h1", null, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "pages.edit.title"
    })), _react.default.createElement("p", null, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "pages.edit.required"
    })), _react.default.createElement(_ContentBox.default, null, _react.default.createElement("h2", null, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "pages.edit.basicinfo"
    })), _react.default.createElement(_Row.default, null, _react.default.createElement(_InputField.default, {
      name: "app.id",
      id: "pages.edit.client_id",
      value: bot && bot.id,
      required: true
    }), _react.default.createElement(_InputField.default, {
      name: "app.oauth",
      id: "pages.edit.application_id",
      value: bot && bot.oauth
    })), _react.default.createElement(_Row.default, null, _react.default.createElement(_InputField.default, {
      name: "app.invite",
      id: "pages.edit.invite",
      value: bot && bot.invite,
      required: true
    }), _react.default.createElement(_MultipleInputField.default, {
      name: "app.authors[]",
      id: "pages.edit.authors",
      multiple: true,
      value: bot && bot.authors && bot.authors.map(author => author.id),
      required: true
    })), _react.default.createElement(_Row.default, null, _react.default.createElement(_InputField.default, {
      name: "app.support",
      id: "pages.edit.support",
      value: bot && bot.support
    }), _react.default.createElement(_InputField.default, {
      name: "app.category",
      id: "pages.edit.category",
      localiseOptions: "categories",
      options: categories || [],
      value: bot && bot.category
    })), _react.default.createElement(_Row.default, null, _react.default.createElement(_InputField.default, {
      name: "app.website",
      id: "pages.edit.website",
      value: bot && bot.website
    }), _react.default.createElement(_InputField.default, {
      name: "app.nsfw",
      id: "pages.edit.nsfw",
      value: bot && bot.nsfw,
      toggle: true
    }))), _react.default.createElement(_ContentBox.default, null, _react.default.createElement("h2", null, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "pages.edit.images.title"
    })), _react.default.createElement(_Row.default, null, _react.default.createElement(_InputField.default, {
      name: "app.images.avatar",
      id: "pages.edit.images.avatar",
      value: bot && bot.images && bot.images.avatar
    }), _react.default.createElement(_InputField.default, {
      name: "app.images.cover",
      id: "pages.edit.images.cover",
      value: bot && bot.images && bot.images.cover
    })), _react.default.createElement(_Row.default, null, _react.default.createElement(_InputField.default, {
      name: "app.videos.youtube",
      id: "pages.edit.youtube",
      value: bot && bot.videos && bot.videos.youtube
    }), _react.default.createElement(_InputField.default, {
      name: "app.videos.youku",
      id: "pages.edit.youku",
      value: bot && bot.videos && bot.videos.youku
    })), _react.default.createElement(_Row.default, null, _react.default.createElement(_MultipleInputField.default, {
      name: "app.images.preview[]",
      id: "pages.edit.images.preview",
      value: bot && bot.images && bot.images.preview
    }))), _react.default.createElement(_ContentBox.default, null, _react.default.createElement("h2", null, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "pages.edit.triggermethods"
    })), _react.default.createElement(_Row.default, null, _react.default.createElement(_MultipleInputField.default, {
      name: "app.trigger.prefix[]",
      id: "pages.edit.prefix",
      value: bot && bot.trigger && bot.trigger.prefix,
      required: true
    })), _react.default.createElement(_Row.default, null, _react.default.createElement(_InputField.default, {
      name: "app.trigger.customisable",
      id: "pages.edit.customisable",
      value: bot && bot.trigger && bot.trigger.customisable,
      toggle: true
    }), _react.default.createElement(_InputField.default, {
      name: "app.trigger.mentionable",
      id: "pages.edit.mentionable",
      value: bot && bot.trigger && bot.trigger.mentionable,
      toggle: true
    }))), _react.default.createElement(_ContentBox.default, null, _react.default.createElement("h2", null, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "pages.edit.flags.title"
    })), _react.default.createElement(_Row.default, null, _react.default.createElement(_InputField.default, {
      name: "app.flags.inAppPurchases",
      id: "pages.edit.flags.inAppPurchases",
      value: bot && bot.flags && bot.flags.inAppPurchases,
      toggle: true,
      smallText: true
    }), _react.default.createElement(_InputField.default, {
      name: "app.flags.adverts",
      id: "pages.edit.flags.adverts",
      value: bot && bot.flags && bot.flags.adverts,
      toggle: true,
      smallText: true
    }))), _react.default.createElement(_ContentBox.default, null, _react.default.createElement("h2", null, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "pages.edit.sourcecode"
    })), _react.default.createElement(_Row.default, null, _react.default.createElement(_InputField.default, {
      name: "app.github.owner",
      id: "pages.edit.github_owner",
      value: bot && bot.github && bot.github.owner
    }), _react.default.createElement(_InputField.default, {
      name: "app.github.repo",
      id: "pages.edit.github_repo",
      value: bot && bot.github && bot.github.repo
    }))), _react.default.createElement(_ContentBox.default, null, _react.default.createElement("h2", null, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "pages.edit.information"
    })), _react.default.createElement("p", null, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "pages.edit.languages.modal"
    })), _react.default.createElement(_Row.default, null, _react.default.createElement(_FlexContainer.default, null, _react.default.createElement("select", {
      form: "null",
      className: _Styles.Modesta.fullWidth,
      defaultValue: "null",
      ref: this.languagesSelect
    }, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "forms.select"
    }, select => _react.default.createElement("option", {
      value: "null",
      disabled: true
    }, select)), this.state.unusedLanguages.map(language => ({
      language,
      message: intl.formatMessage({
        id: `locales.${language}`
      })
    })).sort((a, b) => a.message.localeCompare(b.message)).map(({
      language,
      message
    }) => _react.default.createElement("option", {
      key: language,
      value: language
    }, message || ''))), _react.default.createElement("button", {
      onClick: this.addLanguage,
      className: _elementsModule.default.button
    }, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "pages.edit.languages.add"
    }))))), this.state.usedLanguages.map((language, index) => {
      const contents = bot && bot.contents && bot.contents.find(content => content.locale === language);
      return _react.default.createElement(_ContentBox.default, {
        key: language
      }, _react.default.createElement(_FlexContainer.default, null, _react.default.createElement("h3", null, _react.default.createElement(_reactIntl.FormattedMessage, {
        key: language,
        id: `locales.${language}`
      })), _react.default.createElement("button", {
        onClick: e => this.removeLanguage(e, language),
        className: _elementsModule.default.button
      }, _react.default.createElement(_reactIntl.FormattedMessage, {
        id: "pages.edit.deleteLanguage"
      }))), _react.default.createElement(_Row.default, null, _react.default.createElement(_InputField.default, {
        name: `app.contents[${index}][name]`,
        id: "pages.edit.name",
        value: contents && contents.name,
        className: _Styles.Modesta.fullWidth,
        required: true
      })), _react.default.createElement(_Row.default, null, _react.default.createElement(_InputField.default, {
        name: `app.contents[${index}][description]`,
        id: "pages.edit.description",
        value: contents && contents.description,
        className: _Styles.Modesta.fullWidth,
        required: true
      })), _react.default.createElement(_Row.default, null, _react.default.createElement(_InputField.default, {
        name: `app.contents[${index}][page]`,
        id: "pages.edit.page",
        value: contents && contents.page,
        textarea: true,
        className: _Styles.Modesta.fullWidth,
        required: true
      })), _react.default.createElement("input", {
        name: `app.contents[${index}][locale]`,
        type: "text",
        className: _displayModule.default.hidden,
        value: language
      }));
    }), _react.default.createElement(_ContentBox.default, null, this.state.message || this.state.unlocalised ? _react.default.createElement(_ContentBox.default, {
      className: this.state.ok ? _Styles.Modesta.emerald : _Styles.Modesta.alizarin
    }, _react.default.createElement("p", null, this.state.unlocalised ? _react.default.createElement(_reactIntl.FormattedMessage, {
      id: this.state.unlocalised
    }) : this.state.message)) : _react.default.createElement("div", null, _react.default.createElement("p", null, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "pages.edit.updates"
    })), _react.default.createElement("a", {
      className: `${_Styles.Modesta.discord} ${_Styles.Modesta.btn}`,
      target: "_blank",
      rel: "noopener noreferrer",
      href: _Locations.default.discordServer
    }, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "pages.edit.discord"
    }))), _react.default.createElement("button", {
      className: `${_Styles.Modesta.discord} ${_Styles.Modesta.btn}`
    }, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "forms.submit"
    })))), _react.default.createElement("input", {
      className: _displayModule.default.hidden,
      name: "app.type",
      value: "bots"
    })));
  }

}

const mapStateToProps = state => {
  const {
    categories,
    auth,
    bot
  } = state;
  return {
    categories,
    auth,
    bot
  };
};

const exportedComponent = (0, _reactRedux.connect)(mapStateToProps)((0, _reactIntl.injectIntl)(EditBot));
exportedComponent.serverFetch = [{
  function: _categories.fetchCategoriesIfNeeded,
  pass: [],
  payload: {}
}];
var _default = exportedComponent;
exports.default = _default;
},{"../../components/Container":"tNeE","../../components/ContentBox":"50Yc","../../components/FlexContainer":"AaMC","../../components/InputField":"azt2","../../components/Layout":"UCeK","../../components/MultipleInputField":"gasw","../../components/PleaseLogIn":"L3ld","../../components/Row":"pSXH","../../data/Locations":"uTwd","../../data/Styles":"rs3k","../../locales":"Qpzm","../../redux/actions/auth":"YSbd","../../redux/actions/categories":"BIvw","../../scss/display.module.scss":"Tyxi","../../scss/elements.module.scss":"h2Hb","../../redux/actions/bot":"YodB"}],"YApm":[function(require,module,exports) {
module.exports = {
  "card": "_card_c317e",
  "link": "_link_c317e",
  "supportList": "_supportList_c317e",
  "rating": "_rating_c317e",
  "avatar": "_avatar_c317e",
  "description": "_description_c317e"
};
},{}],"Cdj8":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Locations = _interopRequireDefault(require("../../data/Locations"));

var _indexModule = _interopRequireDefault(require("./index.module.scss"));

var _reactIntl = require("react-intl");

var _LocalisedHyperlink = _interopRequireDefault(require("../LocalisedHyperlink"));

var _LazyImage = _interopRequireDefault(require("../LazyImage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

class BotCard extends _react.Component {
  render() {
    const {
      bot,
      contents
    } = this.props;
    const supported = [];

    if (bot.flags.win) {
      supported.push('Windows');
    }

    if (bot.flags.mac) {
      supported.push('Mac');
    }

    if (bot.flags.linux) {
      supported.push('Linux');
    }

    return _react.default.createElement("div", {
      className: _indexModule.default.card
    }, _react.default.createElement(_LocalisedHyperlink.default, {
      to: `/${bot.type}/${bot.id}`,
      className: _indexModule.default.link
    }, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "alt.avatar",
      values: {
        name: contents.name
      }
    }, message => _react.default.createElement(_LazyImage.default, {
      className: _indexModule.default.avatar,
      alt: message,
      src: `${_Locations.default.cdn}${bot.cachedImages.avatar}` || _Locations.default.logo
    })), _react.default.createElement("div", null, _react.default.createElement("h6", null, contents.name), _react.default.createElement("p", {
      className: _indexModule.default.description
    }, contents.description), bot.flags.win || bot.flags.mac || bot.flags.linux ? _react.default.createElement("p", {
      className: _indexModule.default.supportList
    }, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "pages.rpc.supports",
      values: {
        operatingSystems: supported.join(', ')
      }
    })) : null, _react.default.createElement("p", {
      className: _indexModule.default.supportList
    }, this.props.metric === 'ratings' ? bot.rating > 0 ? _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "components.botcard.rated",
      values: {
        score: bot.rating.toFixed(1),
        count: bot.reviewsCount
      }
    }) : _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "components.botcard.noRating"
    }) : bot.count ? _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "pages.bots.count",
      values: {
        guilds: bot.count
      }
    }) : null))));
  }

}

var _default = BotCard;
exports.default = _default;
},{"../../data/Locations":"uTwd","./index.module.scss":"YApm","../LocalisedHyperlink":"dChq","../LazyImage":"ofRo"}],"8zHg":[function(require,module,exports) {
module.exports = {
  "collection": "_collection_c297a"
};
},{}],"dznf":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _locales = require("../../locales");

var _BotCard = _interopRequireDefault(require("../BotCard"));

var _indexModule = _interopRequireDefault(require("./index.module.scss"));

var _reactIntl = require("react-intl");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

class BotCollection extends _react.Component {
  render() {
    const {
      bots,
      limit,
      hidden
    } = this.props;
    let listed = bots.filter(bot => bot.contents.length > 0);

    if (limit) {
      listed = listed.slice(0, limit);
    } // Remove hidden bots


    if (hidden) {
      listed = listed.filter(bot => bot.hide === false);
    }

    return _react.default.createElement("div", {
      className: _indexModule.default.collection
    }, listed.length > 0 ? // Find bots that fit in the category
    listed.map(bot => {
      const contents = (0, _locales.Localise)(bot.contents, this.props.intl.locale);
      return [bot, contents];
    }).map(([bot, contents]) => _react.default.createElement(_BotCard.default, {
      key: bot.id,
      bot: bot,
      contents: contents,
      metric: this.props.metric || 'ratings'
    })) : _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "pages.list.empty"
    }));
  }

}

var _default = (0, _reactIntl.injectIntl)(BotCollection);

exports.default = _default;
},{"../../locales":"Qpzm","../BotCard":"Cdj8","./index.module.scss":"8zHg"}],"CN4h":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// list of people i dislike
const Competitors = [// 'automacord.xyz',
'botlist.space', 'bots.discord.pw', 'bots.ondiscord.xyz', 'botsfordiscord.com', 'botsparadiscord.xyz', // 'carbonitex.net',
'dankbotlist.com', 'discord.boats', // 'discord.bots.gg',
'discordbestbots.xyz', 'discordboats.club', 'discordbot.world', 'discordbothub.com', 'discordbotlist.com', 'discordbotreviews.xyz', 'discordbots.dev', 'discordbots.fr', 'discordbots.fun', 'discordbots.group', 'discordbots.org', 'divinediscordbots.com', 'lbots.org', 'mythicalbots.xyz', 'portalmybot.com'];
var _default = Competitors;
exports.default = _default;
},{}],"lxnb":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _locales = require("../locales");

var _Competitors = _interopRequireDefault(require("../data/Competitors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const calculateBotScore = ({
  bot,
  locale
}) => {
  // If the bot has the same language as the viewer, add 100 points.
  if (bot.contents.some(contents => contents.locale === locale || contents.locale === (0, _locales.getMasterLanguage)(locale))) {
    bot.random += 100;
  }

  bot.contents.forEach(content => {
    // For each description that starts with a lowercase character, deduct .5 points.
    if (/^[a-z]/.test(content.description)) {
      bot.random -= .5;
    } // Bots with competitors in the bot page lose 2 points.


    _Competitors.default.forEach(competitor => {
      // Subtract 2 points for each instance of a competitor
      // https://stackoverflow.com/questions/4009756/how-to-count-string-occurrence-in-string
      // '---discordbots.org---'
      //    ==> ['---', '---'] ==> 1 instance
      // '---discordbots.org---discordbots.org---'
      //    ==> ['---', '---', '---'] ==> 2 instances
      const instances = content.page.split(competitor).length - 1;
      bot.random -= 2 * instances;
    });
  }); // Bots with preview images gain .5 points.

  if (bot.images.preview.length > 0) {
    bot.random += .5;
  } // Bots with a support server gain .1 points.


  if (bot.support) {
    bot.random += .1;
  }

  if (bot.rating && bot.reviewsCount && bot.rating >= 1 && bot.reviewsCount >= 1) {
    // *ring ring*
    // me:   Yes can i speak to Matt Parker
    // them: No they're too busy
    // me:   Great time to do this the crap way
    bot.random += bot.rating * Math.log10(bot.reviewsCount) / 5;
  }

  return bot;
};

var _default = calculateBotScore;
exports.default = _default;
},{"../locales":"Qpzm","../data/Competitors":"CN4h"}],"0bbm":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _qs = _interopRequireDefault(require("qs"));

var _react = _interopRequireWildcard(require("react"));

var _reactIntl = require("react-intl");

var _reactRedux = require("react-redux");

var _BotCollection = _interopRequireDefault(require("../../components/BotCollection"));

var _Container = _interopRequireDefault(require("../../components/Container"));

var _ContentBox = _interopRequireDefault(require("../../components/ContentBox"));

var _InputField = _interopRequireDefault(require("../../components/InputField"));

var _Layout = _interopRequireDefault(require("../../components/Layout"));

var _MultipleInputField = _interopRequireDefault(require("../../components/MultipleInputField"));

var _Row = _interopRequireDefault(require("../../components/Row"));

var _Locations = _interopRequireDefault(require("../../data/Locations"));

var _States = _interopRequireDefault(require("../../data/States"));

var _categories = require("../../redux/actions/categories");

var _calulateBotScore = _interopRequireDefault(require("../../helpers/calulateBotScore"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FilterPage extends _react.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: null,
      message: null,
      owners: [],
      category: null,
      nsfw: null,
      query: null,
      timeout: null,
      hidden: true,
      type: null,
      state: null
    };
    this.form = _react.default.createRef();
    this.onChange = this.onChange.bind(this);
    this.search = this.search.bind(this);
  }

  componentDidMount() {
    const {
      dispatch
    } = this.props;
    dispatch((0, _categories.fetchCategoriesIfNeeded)());

    if (this.props.location.search) {
      this.search(this.props.location.search);
    }
  }

  componentWillUnmount() {
    if (this.state.timeout) clearTimeout(this.state.timeout);
  }

  search(searchQuery) {
    fetch(`${_Locations.default.server}/reactjs/v2/apps/search${searchQuery}`).then(res => res.json()).then(data => {
      if (data.ok) {
        this.setState({
          results: data.data.map(bot => (0, _calulateBotScore.default)({
            bot,
            locale: this.props.intl.locale
          })).sort((a, b) => b.random - a.random)
        });
      } else {
        this.setState({
          message: data.message
        });
      }
    });

    const query = _qs.default.parse(window.location.search.replace(/^\?/, ''));

    this.setState({
      owners: query.owners,
      category: query.category,
      nsfw: query.nsfw,
      query: query.q,
      hidden: !(query.hidden === 'false'),
      state: query.state
    });
  }

  onChange(e) {
    const formdata = new FormData(this.form.current);
    const queryString = new URLSearchParams(formdata).toString();
    const timeout = setTimeout(() => {
      if (this.state.timeout === timeout) {
        if (queryString) {
          this.search(`?${queryString}`);
        }
      }
    }, 250);
    this.setState({
      timeout
    });
  }

  render() {
    const categories = this.props.categories.data;
    const auth = this.props.auth.data;
    const {
      results,
      owners,
      category,
      nsfw,
      type,
      query,
      hidden,
      state
    } = this.state;
    return _react.default.createElement(_Layout.default, {
      match: this.props.match
    }, _react.default.createElement(_Container.default, null, _react.default.createElement("form", {
      ref: this.form
    }, _react.default.createElement(_ContentBox.default, null, _react.default.createElement(_Row.default, null, _react.default.createElement(_MultipleInputField.default, {
      name: "owners[]",
      id: "pages.filter.authors",
      value: owners,
      onChange: this.onChange
    }), _react.default.createElement(_InputField.default, {
      name: "category",
      id: "pages.filter.category",
      localiseOptions: "categories",
      allowNone: true,
      options: categories || [],
      value: category,
      onChange: this.onChange
    })), _react.default.createElement(_Row.default, null, _react.default.createElement(_InputField.default, {
      name: "q",
      id: "pages.filter.query",
      value: query,
      onChange: this.onChange
    }), _react.default.createElement(_InputField.default, {
      name: "nsfw",
      id: "pages.filter.nsfw",
      localiseOptions: "pages.filter.nsfw",
      allowNone: true,
      options: ['sfw', 'nsfw'],
      value: nsfw,
      onChange: this.onChange
    })), _react.default.createElement(_Row.default, null, _react.default.createElement(_InputField.default, {
      name: "type",
      id: "pages.filter.type",
      localiseOptions: "pages.filter.type",
      allowNone: true,
      options: ['bots', 'rpc'],
      value: type,
      onChange: this.onChange
    }), _react.default.createElement(_InputField.default, {
      style: auth && auth.admin ? {} : {
        visibility: 'hidden',
        position: 'fixed'
      },
      name: "state",
      id: "pages.filter.state",
      localiseOptions: "states",
      allowNone: true,
      options: Object.values(_States.default),
      value: state,
      onChange: this.onChange
    })))), Array.isArray(results) ? _react.default.createElement(_ContentBox.default, null, _react.default.createElement(_BotCollection.default, {
      bots: results.sort((a, b) => {
        if (this.state.state === _States.default.APPROVED) return b.random - a.random;
        return b.edited - a.edited;
      }),
      hidden: hidden
    })) : null));
  }

}

const mapStateToProps = state => {
  const {
    categories,
    bots,
    auth
  } = state;
  return {
    categories,
    bots,
    auth
  };
};

const exportedComponent = (0, _reactRedux.connect)(mapStateToProps)((0, _reactIntl.injectIntl)(FilterPage));
exportedComponent.serverFetch = [];
var _default = exportedComponent;
exports.default = _default;
},{"../../components/BotCollection":"dznf","../../components/Container":"tNeE","../../components/ContentBox":"50Yc","../../components/InputField":"azt2","../../components/Layout":"UCeK","../../components/MultipleInputField":"gasw","../../components/Row":"pSXH","../../data/Locations":"uTwd","../../data/States":"2Fxh","../../redux/actions/categories":"BIvw","../../helpers/calulateBotScore":"lxnb"}],"L/hj":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactHelmet = require("react-helmet");

var _reactIntl = require("react-intl");

var _reactRouterDom = require("react-router-dom");

var _Container = _interopRequireDefault(require("../../components/Container"));

var _ContentBox = _interopRequireDefault(require("../../components/ContentBox"));

var _Layout = _interopRequireDefault(require("../../components/Layout"));

var _GetStartedWithBots = _interopRequireDefault(require("../../components/GetStartedWithBots"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

class Game extends _react.Component {
  constructor(props) {
    super(props);
    this.state = {
      kliksphilip: 0,
      displayedPoints: 0
    };
    this.klick = this.klick.bind(this);
  }

  klick() {
    this.setState({
      kliksphilip: this.state.kliksphilip + 1
    });
    requestAnimationFrame(() => {
      if (this.state.kliksphilip !== this.state.displayedPoints) {
        this.setState({
          displayedPoints: this.state.kliksphilip
        });
      }
    });
  }

  render() {
    return _react.default.createElement(_Layout.default, {
      match: this.props.match
    }, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "pages.game.title"
    }, gameName => _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "pages.game.description"
    }, gameDescription => _react.default.createElement(_reactHelmet.Helmet, null, _react.default.createElement("title", null, gameName), _react.default.createElement("meta", {
      property: "og:title",
      content: gameName
    }), _react.default.createElement("meta", {
      property: "og:description",
      content: gameDescription
    }), _react.default.createElement("meta", {
      name: "description",
      content: gameDescription
    })))), _react.default.createElement(_Container.default, null, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "pages.game.leave"
    }, message => _react.default.createElement(_reactRouterDom.Prompt, {
      message: message
    })), _react.default.createElement(_ContentBox.default, null, _react.default.createElement("h2", null, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "pages.game.title"
    })), _react.default.createElement("h3", null, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "pages.game.description"
    })), _react.default.createElement("p", null, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "pages.game.score",
      values: {
        kliksphilip: this.state.displayedPoints
      }
    })), _react.default.createElement("button", {
      onClick: this.klick
    }, "Get a point")), _react.default.createElement(_GetStartedWithBots.default, null)));
  }

}

var _default = Game;
exports.default = _default;
},{"../../components/Container":"tNeE","../../components/ContentBox":"50Yc","../../components/Layout":"UCeK","../../components/GetStartedWithBots":"VUzD"}],"PhP6":[function(require,module,exports) {
module.exports = {
  "list": "_list_bd94c",
  "item": "_item_bd94c"
};
},{}],"bc+p":[function(require,module,exports) {
module.exports = {
  "line": "_line_e3b22"
};
},{}],"fIO1":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _indexModule = _interopRequireDefault(require("./index.module.scss"));

var _elementsModule = _interopRequireDefault(require("../../scss/elements.module.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

class LoadingLine extends _react.Component {
  render() {
    return _react.default.createElement("div", {
      className: `${_indexModule.default.line} ${_elementsModule.default.roundedCorners} ${_elementsModule.default.loading}`,
      style: {
        width: `${this.props.width}%`
      }
    });
  }

}

var _default = LoadingLine;
exports.default = _default;
},{"./index.module.scss":"bc+p","../../scss/elements.module.scss":"h2Hb"}],"fRuQ":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _LoadingLine = _interopRequireDefault(require("./LoadingLine"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

class LoadingText extends _react.Component {
  render() {
    const widths = [];
    let lines = this.props.lines || 10;

    for (let i = 0; i < lines; i += 1) {
      widths.push(60 + Math.random() * 40);
    }

    return _react.default.createElement("div", null, widths.map((width, index) => _react.default.createElement(_LoadingLine.default, {
      key: index,
      width: width
    })));
  }

}

var _default = LoadingText;
exports.default = _default;
},{"./LoadingLine":"fIO1"}],"JxM1":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _ContentBox = _interopRequireDefault(require("../ContentBox"));

var _reactIntl = require("react-intl");

var _reactRedux = require("react-redux");

var _indexModule = _interopRequireDefault(require("./index.module.scss"));

var _LoadingText = _interopRequireDefault(require("../LoadingText"));

var _LocalisedHyperlink = _interopRequireDefault(require("../LocalisedHyperlink"));

var _categories = require("../../redux/actions/categories");

var _States = _interopRequireDefault(require("../../data/States"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

class CategoriesLinksList extends _react.Component {
  componentDidMount() {
    const {
      dispatch
    } = this.props;
    dispatch((0, _categories.fetchCategoriesIfNeeded)());
  }

  render() {
    const categories = this.props.categories.data;
    return _react.default.createElement(_ContentBox.default, null, _react.default.createElement("h5", null, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "pages.bots.initiateCategoryFilter"
    })), categories.length === 0 ? _react.default.createElement(_LoadingText.default, null) : _react.default.createElement("ul", {
      className: _indexModule.default.list
    }, categories.map(x => _react.default.createElement("li", {
      key: x,
      className: _indexModule.default.item
    }, _react.default.createElement(_LocalisedHyperlink.default, {
      to: "/filter",
      query: {
        category: x,
        state: _States.default.APPROVED
      }
    }, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: `categories.${x}`
    }))))));
  }

}

const mapStateToProps = state => {
  const {
    categories
  } = state;
  return {
    categories
  };
};

var _default = (0, _reactRedux.connect)(mapStateToProps)(CategoriesLinksList);

exports.default = _default;
},{"../ContentBox":"50Yc","./index.module.scss":"PhP6","../LoadingText":"fRuQ","../LocalisedHyperlink":"dChq","../../redux/actions/categories":"BIvw","../../data/States":"2Fxh"}],"uhL9":[function(require,module,exports) {
module.exports = "/hk.19c8b6f4.jpg";
},{}],"la7U":[function(require,module,exports) {
module.exports = {
  "slider": "_slider_5fb40",
  "sliderContainer": "_sliderContainer_5fb40",
  "sliderContents": "_sliderContents_5fb40",
  "sliderImage": "_sliderImage_5fb40",
  "sliderVideo": "_sliderVideo_5fb40",
  "dragging": "_dragging_5fb40",
  "dots": "_dots_5fb40"
};
},{}],"JIzo":[function(require,module,exports) {
module.exports = "/rpc.89411526.jpg";
},{}],"gEi2":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactIntl = require("react-intl");

var _reactRedux = require("react-redux");

var _reactSlick = _interopRequireDefault(require("react-slick"));

var _BotCategoriesLinksList = _interopRequireDefault(require("../../components/BotCategoriesLinksList"));

var _BotCollection = _interopRequireDefault(require("../../components/BotCollection"));

var _Container = _interopRequireDefault(require("../../components/Container"));

var _ContentBox = _interopRequireDefault(require("../../components/ContentBox"));

var _FlexColumns = _interopRequireDefault(require("../../components/FlexColumns"));

var _GetStartedWithBots = _interopRequireDefault(require("../../components/GetStartedWithBots"));

var _Layout = _interopRequireDefault(require("../../components/Layout"));

var _LazyImage = _interopRequireDefault(require("../../components/LazyImage"));

var _LoadingContentBox = _interopRequireDefault(require("../../components/LoadingContentBox"));

var _LocalisedHyperlink = _interopRequireDefault(require("../../components/LocalisedHyperlink"));

var _WebsiteTypeButtons = _interopRequireDefault(require("../../components/WebsiteTypeButtons"));

var _Locations = _interopRequireDefault(require("../../data/Locations"));

var _States = _interopRequireDefault(require("../../data/States"));

var _ConstructCSS = _interopRequireDefault(require("../../helpers/ConstructCSS"));

var _categories = require("../../redux/actions/categories");

var _hk = _interopRequireDefault(require("./hk.jpg"));

var _indexModule = _interopRequireDefault(require("./index.module.scss"));

var _rpc = _interopRequireDefault(require("./rpc.jpg"));

var _calulateBotScore = _interopRequireDefault(require("../../helpers/calulateBotScore"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

class Home extends _react.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: []
    };
  }

  componentDidMount() {
    fetch(`${_Locations.default.server}/reactjs/v2/apps/search?approved=${_States.default.APPROVED}`).then(res => res.json()).then(data => {
      if (data.ok) {
        this.setState({
          results: data.data.filter(bot => bot.state === 'approved').filter(bot => bot.hide !== true).map(bot => (0, _calulateBotScore.default)({
            bot,
            locale: this.props.intl.locale
          })).sort((a, b) => b.random - a.random)
        });
      } else {
        this.setState({
          message: data.message
        });
      }
    });
  }

  render() {
    const results = this.state.results;
    const settings = {
      className: _indexModule.default.slider,
      dotsClass: _indexModule.default.dots,
      centerMode: true,
      infinite: false,
      slidesToShow: 1,
      // autoplay: true,
      // autoplaySpeed: 3000,
      speed: 500,
      arrows: false,
      dots: true,
      focusOnSelect: true,
      pauseOnDotsHover: true,
      pauseOnFocus: true,
      pauseOnHover: true
    };
    const displayed = [];
    return _react.default.createElement(_Layout.default, {
      match: this.props.match
    }, _react.default.createElement(_reactSlick.default, settings, _react.default.createElement(_ContentBox.default, {
      className: (0, _ConstructCSS.default)(_indexModule.default.sliderContainer)
    }, _react.default.createElement("iframe", {
      src: "https://www.youtube-nocookie.com/embed/pYRCVFK-mjk?autoplay=1&loop=1&playlist=pYRCVFK-mjk&mute=1",
      className: _indexModule.default.sliderVideo,
      title: "Bots YouTube Background"
    }), _react.default.createElement("div", {
      className: _indexModule.default.sliderContents
    }, _react.default.createElement("h3", null, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "pages.home.bots.title"
    })), _react.default.createElement("p", null, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "pages.home.bots.description"
    })), _react.default.createElement("p", null, _react.default.createElement(_LocalisedHyperlink.default, {
      to: "/bots"
    }, _react.default.createElement("small", null, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "pages.home.bots.link"
    })))))), _react.default.createElement(_ContentBox.default, {
      className: _indexModule.default.sliderContainer
    }, _react.default.createElement(_LazyImage.default, {
      src: _rpc.default,
      className: _indexModule.default.sliderImage
    }), _react.default.createElement("div", {
      className: _indexModule.default.sliderContents
    }, _react.default.createElement("h3", null, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "pages.home.rpc.title"
    })), _react.default.createElement("p", null, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "pages.home.rpc.description"
    })), _react.default.createElement("p", null, _react.default.createElement(_LocalisedHyperlink.default, {
      to: "/rpc"
    }, _react.default.createElement("small", null, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "pages.home.rpc.link"
    })))))), _react.default.createElement(_ContentBox.default, {
      className: _indexModule.default.sliderContainer
    }, _react.default.createElement(_LazyImage.default, {
      src: _hk.default,
      className: _indexModule.default.sliderImage
    }), _react.default.createElement("div", {
      className: _indexModule.default.sliderContents
    }, _react.default.createElement("h3", null, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "pages.home.discover.title"
    })), _react.default.createElement("p", null, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "pages.home.discover.description"
    })), _react.default.createElement("p", null, _react.default.createElement(_LocalisedHyperlink.default, {
      to: "/posts"
    }, _react.default.createElement("small", null, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "pages.home.discover.link"
    }))))))), _react.default.createElement(_Container.default, null, _react.default.createElement(_FlexColumns.default, {
      padding: true
    }, _react.default.createElement(_FlexColumns.default, {
      columns: 3
    }, _react.default.createElement(_WebsiteTypeButtons.default, null), _react.default.createElement(_BotCategoriesLinksList.default, null)), _react.default.createElement(_FlexColumns.default, {
      columns: 9
    }, Array.isArray(results) ? _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_ContentBox.default, null, _react.default.createElement("h4", null, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "pages.home.randomBots"
    })), _react.default.createElement(_BotCollection.default, {
      bots: results.filter(bot => bot.type === 'bots').map(bot => Object.assign({}, bot, {
        random: Math.random()
      })).sort((a, b) => b.random - a.random).map((bot, index) => {
        if (index < 9) displayed.push(bot.id);
        return bot;
      }),
      limit: 9
    })), _react.default.createElement(_ContentBox.default, null, _react.default.createElement("h4", null, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "pages.home.topRPC"
    })), _react.default.createElement(_BotCollection.default, {
      bots: results.filter(bot => bot.type === 'rpc').sort((a, b) => b.random - a.random),
      limit: 9
    })), _react.default.createElement(_ContentBox.default, null, _react.default.createElement("h4", null, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "pages.home.popularBots"
    })), _react.default.createElement(_BotCollection.default, {
      bots: results.filter(bot => bot.type === 'bots').filter(bot => bot.count).filter(bot => !displayed.includes(bot.id)).sort((a, b) => b.count - a.count).map((bot, index) => {
        if (index < 9) displayed.push(bot.id);
        return bot;
      }),
      limit: 9,
      metric: "count"
    })), _react.default.createElement(_ContentBox.default, null, _react.default.createElement("h4", null, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "pages.home.smallBots"
    })), _react.default.createElement(_BotCollection.default, {
      bots: results.filter(bot => bot.type === 'bots').filter(bot => bot.count).filter(bot => !displayed.includes(bot.id)).sort((a, b) => a.count - b.count).map((bot, index) => {
        if (index < 9) displayed.push(bot.id);
        return bot;
      }),
      limit: 9,
      metric: "count"
    })), _react.default.createElement(_ContentBox.default, null, _react.default.createElement("h4", null, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "pages.home.newestBots"
    })), _react.default.createElement(_BotCollection.default, {
      bots: results.filter(bot => bot.type === 'bots').filter(bot => !displayed.includes(bot.id)).sort((a, b) => b.created - a.created).map((bot, index) => {
        if (index < 9) displayed.push(bot.id);
        return bot;
      }),
      limit: 9
    }))) : _react.default.createElement(_LoadingContentBox.default, null))), _react.default.createElement(_GetStartedWithBots.default, null)));
  }

}

const mapStateToProps = state => {
  const {
    bots
  } = state;
  return {
    bots
  };
};

const exportedComponent = (0, _reactRedux.connect)(mapStateToProps)((0, _reactIntl.injectIntl)(Home));
exportedComponent.serverFetch = [{
  function: _categories.fetchCategoriesIfNeeded,
  pass: [],
  payload: {}
}];
var _default = exportedComponent;
exports.default = _default;
},{"../../components/BotCategoriesLinksList":"JxM1","../../components/BotCollection":"dznf","../../components/Container":"tNeE","../../components/ContentBox":"50Yc","../../components/FlexColumns":"U1G4","../../components/GetStartedWithBots":"VUzD","../../components/Layout":"UCeK","../../components/LazyImage":"ofRo","../../components/LoadingContentBox":"qVpT","../../components/LocalisedHyperlink":"dChq","../../components/WebsiteTypeButtons":"V0nm","../../data/Locations":"uTwd","../../data/States":"2Fxh","../../helpers/ConstructCSS":"SwhA","../../redux/actions/categories":"BIvw","./hk.jpg":"uhL9","./index.module.scss":"la7U","./rpc.jpg":"JIzo","../../helpers/calulateBotScore":"lxnb"}],"l/9E":[function(require,module,exports) {
module.exports = {
  "heading": "_heading_7d240",
  "grow": "_grow_7d240"
};
},{}],"6W3R":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactIntl = require("react-intl");

var _reactRedux = require("react-redux");

var _Locations = _interopRequireDefault(require("../../data/Locations"));

var _locales = require("../../locales");

var _categories = require("../../redux/actions/categories");

var _BotCollection = _interopRequireDefault(require("../BotCollection"));

var _ContentBox = _interopRequireDefault(require("../ContentBox"));

var _LoadingContentBox = _interopRequireDefault(require("../LoadingContentBox"));

var _LocalisedHyperlink = _interopRequireDefault(require("../LocalisedHyperlink"));

var _indexModule = _interopRequireDefault(require("./index.module.scss"));

var _States = _interopRequireDefault(require("../../data/States"));

var _calulateBotScore = _interopRequireDefault(require("../../helpers/calulateBotScore"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

class CategoryCollection extends _react.Component {
  constructor(props) {
    super(props);
    this.state = {
      bots: []
    };
  }

  componentDidMount() {
    const {
      dispatch
    } = this.props;
    dispatch((0, _categories.fetchCategoriesIfNeeded)());
    fetch(`${_Locations.default.server}/reactjs/v2/apps/search?type=bots&approved=${_States.default.APPROVED}`).then(res => res.json()).then(data => {
      if (data.ok) {
        this.setState({
          bots: data.data.filter(bot => bot.state === 'approved').filter(bot => bot.hide !== true).map(bot => (0, _calulateBotScore.default)({
            bot,
            locale: this.props.intl.locale
          })).sort((a, b) => b.random - a.random)
        });
      }
    });
  }

  render() {
    const categories = this.props.categories.data;
    const {
      bots
    } = this.state;
    const botsInMyLanguage = bots.filter(bot => bot.contents.some(contents => contents.locale === this.props.intl.locale || contents.locale === (0, _locales.getMasterLanguage)(this.props.intl.locale)));
    return _react.default.createElement("div", null, botsInMyLanguage.length !== 0 && (0, _locales.getMasterLanguage)(this.props.intl.locale) !== 'en-GB' ? _react.default.createElement(_ContentBox.default, null, _react.default.createElement("h4", null, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "pages.bots.inMyLanguage"
    })), _react.default.createElement(_BotCollection.default, {
      bots: botsInMyLanguage,
      limit: 9,
      hidden: true
    })) : null, categories.length > 0 ? categories.filter(category => bots.filter(bot => bot.category === category).length) // List categories that are not empty
    .map(a => [a, Math.random()]) // Randomise the order of the categories
    .sort((a, b) => a[1] - b[1]).map(a => a[0]).map(category => {
      const botsInCategory = bots.filter(bot => bot.category === category);
      return _react.default.createElement(_ContentBox.default, {
        key: category
      }, _react.default.createElement("div", {
        className: _indexModule.default.heading
      }, _react.default.createElement("h4", {
        className: _indexModule.default.grow,
        id: category
      }, _react.default.createElement(_LocalisedHyperlink.default, {
        to: "/filter",
        query: {
          category,
          state: _States.default.APPROVED
        }
      }, _react.default.createElement(_reactIntl.FormattedMessage, {
        id: `categories.${category}`
      }))), botsInCategory.length > 8 ? _react.default.createElement(_LocalisedHyperlink.default, {
        to: "/filter",
        query: {
          category,
          state: _States.default.APPROVED
        }
      }, _react.default.createElement(_reactIntl.FormattedMessage, {
        id: "components.categorycollection.morebots"
      })) : null), _react.default.createElement(_BotCollection.default, {
        bots: botsInCategory,
        limit: 9,
        hidden: true
      }));
    }) : _react.default.createElement(_LoadingContentBox.default, null));
  }

}

const mapStateToProps = state => {
  const {
    categories
  } = state;
  return {
    categories
  };
};

var _default = (0, _reactRedux.connect)(mapStateToProps)((0, _reactIntl.injectIntl)(CategoryCollection));

exports.default = _default;
},{"../../data/Locations":"uTwd","../../locales":"Qpzm","../../redux/actions/categories":"BIvw","../BotCollection":"dznf","../ContentBox":"50Yc","../LoadingContentBox":"qVpT","../LocalisedHyperlink":"dChq","./index.module.scss":"l/9E","../../data/States":"2Fxh","../../helpers/calulateBotScore":"lxnb"}],"7vza":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactHelmet = require("react-helmet");

var _reactIntl = require("react-intl");

var _BotCategoriesLinksList = _interopRequireDefault(require("../../components/BotCategoriesLinksList"));

var _BotCategoryCollection = _interopRequireDefault(require("../../components/BotCategoryCollection"));

var _Container = _interopRequireDefault(require("../../components/Container"));

var _FlexColumns = _interopRequireDefault(require("../../components/FlexColumns"));

var _GetStartedWithBots = _interopRequireDefault(require("../../components/GetStartedWithBots"));

var _Layout = _interopRequireDefault(require("../../components/Layout"));

var _WebsiteTypeButtons = _interopRequireDefault(require("../../components/WebsiteTypeButtons"));

var _categories = require("../../redux/actions/categories");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

class BotsHome extends _react.Component {
  render() {
    return _react.default.createElement(_Layout.default, {
      match: this.props.match
    }, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "pages.bots.index.title"
    }, title => _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "pages.bots.index.description"
    }, description => _react.default.createElement(_reactHelmet.Helmet, null, _react.default.createElement("title", null, title), _react.default.createElement("meta", {
      property: "og:title",
      content: title
    }), _react.default.createElement("meta", {
      property: "og:description",
      content: description
    }), _react.default.createElement("meta", {
      name: "description",
      content: description
    })))), _react.default.createElement(_Container.default, null, _react.default.createElement(_FlexColumns.default, {
      padding: true
    }, _react.default.createElement(_FlexColumns.default, {
      columns: 3
    }, _react.default.createElement(_WebsiteTypeButtons.default, null), _react.default.createElement(_BotCategoriesLinksList.default, null)), _react.default.createElement(_FlexColumns.default, {
      columns: 9
    }, _react.default.createElement(_BotCategoryCollection.default, null))), _react.default.createElement(_GetStartedWithBots.default, null)));
  }

}

BotsHome.serverFetch = [{
  function: _categories.fetchCategoriesIfNeeded,
  pass: [],
  payload: {}
}];
var _default = BotsHome;
exports.default = _default;
},{"../../components/BotCategoriesLinksList":"JxM1","../../components/BotCategoryCollection":"6W3R","../../components/Container":"tNeE","../../components/FlexColumns":"U1G4","../../components/GetStartedWithBots":"VUzD","../../components/Layout":"UCeK","../../components/WebsiteTypeButtons":"V0nm","../../redux/actions/categories":"BIvw"}],"CRMR":[function(require,module,exports) {
module.exports = {
  "flags": "_flags_94c62",
  "flag": "_flag_94c62"
};
},{}],"JilT":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactIntl = require("react-intl");

var _reactRouterDom = require("react-router-dom");

var _locales = _interopRequireDefault(require("../../locales"));

var _Styles = require("../../data/Styles");

var _indexModule = _interopRequireDefault(require("./index.module.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = ({
  unlocalisedPath = ''
}) => _react.default.createElement("div", {
  className: _indexModule.default.flags
}, _locales.default.filter(language => language.translations).map(language => _react.default.createElement(_reactIntl.FormattedMessage, {
  id: `locales.${language.code}`,
  key: language.code
}, message => _react.default.createElement(_reactRouterDom.Link, {
  to: `/${language.code}${unlocalisedPath}`,
  className: `${_Styles.Modesta.emoji} ${_Styles.TwitterEmojis[language.flag.replace(/-([a-z0-9])/g, capture => capture[1].toUpperCase()).replace('-', '')]} ${_indexModule.default.flag}`,
  "aria-label": message,
  title: message
}))));

exports.default = _default;
},{"../../locales":"Qpzm","../../data/Styles":"rs3k","./index.module.scss":"CRMR"}],"9DHm":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactIntl = require("react-intl");

var _Container = _interopRequireDefault(require("../../components/Container"));

var _ContentBox = _interopRequireDefault(require("../../components/ContentBox"));

var _FlagLinks = _interopRequireDefault(require("../../components/FlagLinks"));

var _Layout = _interopRequireDefault(require("../../components/Layout"));

var _Locations = _interopRequireDefault(require("../../data/Locations"));

var _Styles = require("../../data/Styles");

var _qs = _interopRequireDefault(require("qs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

class Locale extends _react.Component {
  render() {
    const query = _qs.default.parse(this.props.location.search.replace(/^\?/, ''));

    return _react.default.createElement(_Layout.default, {
      match: this.props.match
    }, _react.default.createElement(_Container.default, null, _react.default.createElement(_ContentBox.default, {
      className: _Styles.Modesta.center
    }, _react.default.createElement("h2", null, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "pages.locale.choose"
    })), _react.default.createElement(_FlagLinks.default, {
      unlocalisedPath: query.returnBrowserTo
    }), _react.default.createElement("p", null, _react.default.createElement("a", {
      href: _Locations.default.sourceTranslations
    }, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "pages.locale.pleasehelp"
    }))))));
  }

}

var _default = Locale;
exports.default = _default;
},{"../../components/Container":"tNeE","../../components/ContentBox":"50Yc","../../components/FlagLinks":"JilT","../../components/Layout":"UCeK","../../data/Locations":"uTwd","../../data/Styles":"rs3k"}],"BXm7":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactIntl = require("react-intl");

var _reactRedux = require("react-redux");

var _reactRouterDom = require("react-router-dom");

var _Locations = _interopRequireDefault(require("../../data/Locations"));

var _auth = require("../../redux/actions/auth");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

class AuthenticateLogout extends _react.Component {
  componentDidMount() {
    const {
      dispatch
    } = this.props;
    fetch(`${_Locations.default.server}/auth/logout`, {
      credentials: 'include'
    }).then(() => {
      dispatch((0, _auth.forceFetchAuth)());
    });
  }

  render() {
    const {
      intl
    } = this.props;
    return _react.default.createElement(_reactRouterDom.Redirect, {
      to: `/${intl.locale}`
    });
  }

}

var _default = (0, _reactRedux.connect)()((0, _reactIntl.injectIntl)(AuthenticateLogout));

exports.default = _default;
},{"../../data/Locations":"uTwd","../../redux/actions/auth":"YSbd"}],"JkHl":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _Container = _interopRequireDefault(require("../../components/Container"));

var _Layout = _interopRequireDefault(require("../../components/Layout"));

var _auth = require("../../redux/actions/auth");

var _PleaseLogIn = _interopRequireDefault(require("../../components/PleaseLogIn"));

var _PermissionDenied = _interopRequireDefault(require("../../components/PermissionDenied"));

var _States = _interopRequireDefault(require("../../data/States"));

var _LocalisedHyperlink = _interopRequireDefault(require("../../components/LocalisedHyperlink"));

var _reactIntl = require("react-intl");

var _ContentBox = _interopRequireDefault(require("../../components/ContentBox"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

class AdminPage extends _react.Component {
  componentDidMount() {
    const {
      dispatch
    } = this.props;
    dispatch((0, _auth.fetchAuthIfNeeded)());
  }

  render() {
    const auth = this.props.auth.data;

    if (!auth || !auth.id) {
      return _react.default.createElement(_Layout.default, {
        match: this.props.match
      }, _react.default.createElement(_PleaseLogIn.default, {
        match: this.props.match
      }));
    }

    if (!auth.admin) {
      return _react.default.createElement(_PermissionDenied.default, {
        match: this.props.match
      });
    }

    return _react.default.createElement(_Layout.default, {
      match: this.props.match
    }, _react.default.createElement(_Container.default, null, _react.default.createElement(_ContentBox.default, null, _react.default.createElement("h1", null, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "pages.admin.title"
    })), _react.default.createElement("ul", null, Object.values(_States.default).map(state => _react.default.createElement("li", null, _react.default.createElement(_LocalisedHyperlink.default, {
      to: "/filter",
      query: {
        state: state
      }
    }, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: `states.${state}`
    }))))))));
  }

}

const mapStateToProps = state => {
  const {
    auth
  } = state;
  return {
    auth
  };
};

var _default = (0, _reactRedux.connect)(mapStateToProps)(AdminPage);

exports.default = _default;
},{"../../components/Container":"tNeE","../../components/Layout":"UCeK","../../redux/actions/auth":"YSbd","../../components/PleaseLogIn":"L3ld","../../components/PermissionDenied":"iVLo","../../data/States":"2Fxh","../../components/LocalisedHyperlink":"dChq","../../components/ContentBox":"50Yc"}],"/yZI":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _flat = _interopRequireDefault(require("flat"));

var _react = _interopRequireWildcard(require("react"));

var _reactIntl = require("react-intl");

var _ContentBox = _interopRequireDefault(require("../../components/ContentBox"));

var _FlexContainer = _interopRequireDefault(require("../../components/FlexContainer"));

var _Layout = _interopRequireDefault(require("../../components/Layout"));

var _Row = _interopRequireDefault(require("../../components/Row"));

var _Styles = require("../../data/Styles");

var _locales = _interopRequireWildcard(require("../../locales"));

var _elementsModule = _interopRequireDefault(require("../../scss/elements.module.scss"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class LanguagesComparisonPage extends _react.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguages: []
    };
    this.languagesSelect = _react.default.createRef();
    this.addLanguage = this.addLanguage.bind(this);
  }

  addLanguage(e) {
    e.preventDefault();
    const selected = this.languagesSelect.current.value;
    this.setState({
      selectedLanguages: [...this.state.selectedLanguages, selected]
    });
  }

  render() {
    const intl = this.props.intl;
    const selectedLanguages = this.state.selectedLanguages;

    const languageKeys = _locales.default.filter(lang => lang.translations).map(lang => lang.code);

    const unusedKeys = _locales.default.filter(lang => lang.translations).map(lang => lang.translations).map(lang => Object.keys((0, _flat.default)(lang))).reduce((prev, curr) => prev.concat(curr), []).reduce((prev, curr) => {
      prev[curr] = false;
      return prev;
    }, {});

    const localisations = _locales.default.filter(lang => lang.translations).reduce((prev, curr) => {
      prev[curr.code] = (0, _flat.default)(curr.translations);
      return prev;
    }, {});

    return _react.default.createElement(_Layout.default, {
      match: this.props.match
    }, _react.default.createElement(_ContentBox.default, null, _react.default.createElement(_Row.default, null, _react.default.createElement(_FlexContainer.default, null, _react.default.createElement("select", {
      form: "null",
      className: _Styles.Modesta.fullWidth,
      defaultValue: "null",
      ref: this.languagesSelect
    }, languageKeys.map(language => ({
      language,
      message: intl.formatMessage({
        id: `locales.${language}`
      })
    })).sort((a, b) => a.message.localeCompare(b.message)).map(({
      language,
      message
    }) => _react.default.createElement("option", {
      key: language,
      value: language
    }, message || ''))), _react.default.createElement("button", {
      onClick: this.addLanguage,
      className: _elementsModule.default.button
    }, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "pages.edit.languages.add"
    })))), _react.default.createElement("div", {
      className: `${_Styles.Modesta.tableContainer} ${_Styles.Modesta.tableCenter}`,
      style: {
        maxWidth: '100vw'
      }
    }, _react.default.createElement("table", {
      style: {
        whiteSpace: 'normal'
      }
    }, _react.default.createElement("thead", null, _react.default.createElement("tr", null, _react.default.createElement("td", null, "Key"), selectedLanguages.map(locale => _react.default.createElement("td", {
      key: locale
    }, locale)))), _react.default.createElement("tbody", null, _react.default.createElement("tr", null, _react.default.createElement("td", null, _react.default.createElement("b", null, "Master Language"), _react.default.createElement("p", null, "The language this inherits from, for bot page scoring")), selectedLanguages.map(locale => _react.default.createElement("td", {
      key: locale
    }, (0, _locales.getMasterLanguage)(locale)))), Object.keys(unusedKeys).map(key => _react.default.createElement("tr", {
      key: key
    }, _react.default.createElement("td", null, key), selectedLanguages.map(locale => _react.default.createElement("td", {
      key: locale
    }, localisations[locale][key])))))))));
  }

}

var _default = (0, _reactIntl.injectIntl)(LanguagesComparisonPage);

exports.default = _default;
},{"../../components/ContentBox":"50Yc","../../components/FlexContainer":"AaMC","../../components/Layout":"UCeK","../../components/Row":"pSXH","../../data/Styles":"rs3k","../../locales":"Qpzm","../../scss/elements.module.scss":"h2Hb"}],"Qxjn":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactHelmet = require("react-helmet");

var _reactIntl = require("react-intl");

var _reactRedux = require("react-redux");

var _BotCollection = _interopRequireDefault(require("../../components/BotCollection"));

var _Container = _interopRequireDefault(require("../../components/Container"));

var _ContentBox = _interopRequireDefault(require("../../components/ContentBox"));

var _FlexColumns = _interopRequireDefault(require("../../components/FlexColumns"));

var _GetStartedWithBots = _interopRequireDefault(require("../../components/GetStartedWithBots"));

var _Layout = _interopRequireDefault(require("../../components/Layout"));

var _LoadingContentBox = _interopRequireDefault(require("../../components/LoadingContentBox"));

var _WebsiteTypeButtons = _interopRequireDefault(require("../../components/WebsiteTypeButtons"));

var _Locations = _interopRequireDefault(require("../../data/Locations"));

var _States = _interopRequireDefault(require("../../data/States"));

var _calulateBotScore = _interopRequireDefault(require("../../helpers/calulateBotScore"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

class RpcHome extends _react.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: []
    };
  }

  componentDidMount() {
    fetch(`${_Locations.default.server}/reactjs/v2/apps/search?type=rpc&approved=${_States.default.APPROVED}`).then(res => res.json()).then(data => {
      if (data.ok) {
        this.setState({
          results: data.data.filter(bot => bot.state === 'approved').sort((a, b) => b.random - a.random)
        });
      } else {
        this.setState({
          message: data.message
        });
      }
    });
  }

  render() {
    const results = this.state.results;
    return _react.default.createElement(_Layout.default, {
      match: this.props.match
    }, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "pages.rpc.index.title"
    }, title => _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "pages.rpc.index.description"
    }, description => _react.default.createElement(_reactHelmet.Helmet, null, _react.default.createElement("title", null, title), _react.default.createElement("meta", {
      property: "og:title",
      content: title
    }), _react.default.createElement("meta", {
      property: "og:description",
      content: description
    }), _react.default.createElement("meta", {
      name: "description",
      content: description
    })))), _react.default.createElement(_Container.default, null, _react.default.createElement(_FlexColumns.default, {
      padding: true
    }, _react.default.createElement(_FlexColumns.default, {
      columns: 3
    }, _react.default.createElement(_WebsiteTypeButtons.default, null)), _react.default.createElement(_FlexColumns.default, {
      columns: 9
    }, Array.isArray(results) ? _react.default.createElement(_ContentBox.default, null, _react.default.createElement(_BotCollection.default, {
      bots: results
    })) : _react.default.createElement(_LoadingContentBox.default, null))), _react.default.createElement(_GetStartedWithBots.default, null)));
  }

}

const mapStateToProps = state => {
  const {
    bots
  } = state;
  return {
    bots
  };
};

const exportedComponent = (0, _reactRedux.connect)(mapStateToProps)(RpcHome);
exportedComponent.serverFetch = [];
var _default = exportedComponent;
exports.default = _default;
},{"../../components/BotCollection":"dznf","../../components/Container":"tNeE","../../components/ContentBox":"50Yc","../../components/FlexColumns":"U1G4","../../components/GetStartedWithBots":"VUzD","../../components/Layout":"UCeK","../../components/LoadingContentBox":"qVpT","../../components/WebsiteTypeButtons":"V0nm","../../data/Locations":"uTwd","../../data/States":"2Fxh","../../helpers/calulateBotScore":"lxnb"}],"vgrX":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactIntl = require("react-intl");

var _reactRedux = require("react-redux");

var _reactRouterDom = require("react-router-dom");

var _Container = _interopRequireDefault(require("../../components/Container"));

var _ContentBox = _interopRequireDefault(require("../../components/ContentBox"));

var _FlexContainer = _interopRequireDefault(require("../../components/FlexContainer"));

var _InputField = _interopRequireDefault(require("../../components/InputField"));

var _Layout = _interopRequireDefault(require("../../components/Layout"));

var _MultipleInputField = _interopRequireDefault(require("../../components/MultipleInputField"));

var _PleaseLogIn = _interopRequireDefault(require("../../components/PleaseLogIn"));

var _Row = _interopRequireDefault(require("../../components/Row"));

var _Locations = _interopRequireDefault(require("../../data/Locations"));

var _Styles = require("../../data/Styles");

var _locales = _interopRequireDefault(require("../../locales"));

var _auth = require("../../redux/actions/auth");

var _categories = require("../../redux/actions/categories");

var _displayModule = _interopRequireDefault(require("../../scss/display.module.scss"));

var _elementsModule = _interopRequireDefault(require("../../scss/elements.module.scss"));

var _bot = require("../../redux/actions/bot");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

class EditRpc extends _react.Component {
  constructor(props) {
    super(props);
    this.state = {
      notFound: false,
      edited: true,
      message: null,
      unlocalised: null,
      ok: null,
      unusedLanguages: _locales.default.filter(language => language.botPageLanguage).map(language => language.code),
      usedLanguages: [],
      redirect: null,
      loadedExistingLanguages: false
    };
    this.form = _react.default.createRef();
    this.languagesSelect = _react.default.createRef();
    this.submit = this.submit.bind(this);
    this.addLanguage = this.addLanguage.bind(this);
    this.loadExistingLanguages = this.loadExistingLanguages.bind(this);
  }

  componentDidUpdate() {
    if (this.props.match.params.id) {
      this.loadExistingLanguages();
    }
  }

  componentDidMount() {
    const {
      dispatch,
      match
    } = this.props;
    dispatch((0, _categories.fetchCategoriesIfNeeded)());
    dispatch((0, _auth.fetchAuthIfNeeded)()); // If editing a bot

    if (match.params.id) {
      dispatch((0, _bot.fetchABot)({
        match
      }));
      this.loadExistingLanguages();
    }
  }

  loadExistingLanguages() {
    const bot = this.props.bot.data;

    if (!this.state.loadedExistingLanguages && bot && bot.contents) {
      console.log('reloading languages');
      this.setState({
        loadedExistingLanguages: true,
        unusedLanguages: _locales.default.filter(language => language.botPageLanguage).filter(language => !bot.contents.some(content => content.locale === language.code)).map(language => language.code),
        usedLanguages: _locales.default.filter(language => language.botPageLanguage).filter(language => bot.contents.some(content => content.locale === language.code)).map(language => language.code)
      });
    }
  }

  addLanguage(e) {
    e.preventDefault();
    const selected = this.languagesSelect.current.value;

    if (selected !== 'null' && this.state.unusedLanguages.includes(selected)) {
      this.setState({
        unusedLanguages: this.state.unusedLanguages.filter(language => language !== selected),
        usedLanguages: [...this.state.usedLanguages, selected]
      });
    }
  }

  removeLanguage(e, selected) {
    e.preventDefault();

    if (selected !== 'null') {
      this.setState({
        usedLanguages: this.state.usedLanguages.filter(language => language !== selected),
        unusedLanguages: [...this.state.unusedLanguages, selected]
      });
    }
  }

  submit(e) {
    e.preventDefault();
    const formdata = new FormData(this.form.current);
    fetch(`${_Locations.default.server}/bots/add`, {
      method: 'POST',
      body: formdata,
      credentials: 'include'
    }).then(data => data.json()).then(data => {
      this.setState({
        ok: data.ok,
        message: data.message || null,
        unlocalised: data.language || null
      });

      if (data.ok) {
        this.setState({
          edited: false
        });
      }

      if (data.redirect) {
        const {
          dispatch
        } = this.props;
        dispatch((0, _bot.resetTheBot)());
        setTimeout(() => {
          this.setState({
            redirect: data.redirect
          });
        }, 500);
      }
    });
  }

  render() {
    // Do not use redux bot if not editing
    const bot = this.props.match.params.id ? this.props.bot.data : null;
    const auth = this.props.auth.data;
    const {
      intl
    } = this.props;

    if (!auth || !auth.id) {
      return _react.default.createElement(_Layout.default, {
        match: this.props.match
      }, _react.default.createElement(_PleaseLogIn.default, {
        match: this.props.match
      }));
    }

    if (this.state.redirect) {
      return _react.default.createElement(_reactRouterDom.Redirect, {
        to: `/${intl.locale}${this.state.redirect}`
      });
    }

    return _react.default.createElement(_Layout.default, {
      match: this.props.match
    }, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "pages.edit.leave"
    }, message => _react.default.createElement(_reactRouterDom.Prompt, {
      when: this.state.edited,
      message: message
    })), _react.default.createElement("form", {
      ref: this.form,
      onSubmit: this.submit
    }, _react.default.createElement(_Container.default, null, _react.default.createElement("h1", null, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "pages.edit.title"
    })), _react.default.createElement("p", null, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "pages.edit.required"
    })), _react.default.createElement(_ContentBox.default, null, _react.default.createElement("h2", null, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "pages.edit.basicinfo"
    })), _react.default.createElement(_Row.default, null, _react.default.createElement(_InputField.default, {
      name: "app.id",
      id: "pages.edit.client_id",
      value: bot && bot.id,
      required: true
    }), _react.default.createElement(_MultipleInputField.default, {
      name: "app.authors[]",
      id: "pages.edit.authors",
      multiple: true,
      value: bot && bot.authors && bot.authors.map(author => author.id),
      required: true
    })), _react.default.createElement(_Row.default, null, _react.default.createElement(_InputField.default, {
      name: "app.support",
      id: "pages.edit.support",
      value: bot && bot.support
    }), _react.default.createElement(_InputField.default, {
      name: "app.website",
      id: "pages.edit.website",
      value: bot && bot.website
    })), _react.default.createElement(_Row.default, null, _react.default.createElement(_InputField.default, {
      name: "app.invite",
      id: "pages.edit.rpc.invite",
      value: bot && bot.invite,
      required: true
    }))), _react.default.createElement(_ContentBox.default, null, _react.default.createElement("h2", null, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "pages.edit.images.title"
    })), _react.default.createElement(_Row.default, null, _react.default.createElement(_InputField.default, {
      name: "app.images.avatar",
      id: "pages.edit.images.avatar",
      value: bot && bot.images && bot.images.avatar
    }), _react.default.createElement(_InputField.default, {
      name: "app.images.cover",
      id: "pages.edit.images.cover",
      value: bot && bot.images && bot.images.cover
    })), _react.default.createElement(_Row.default, null, _react.default.createElement(_InputField.default, {
      name: "app.videos.youtube",
      id: "pages.edit.youtube",
      value: bot && bot.videos && bot.videos.youtube
    }), _react.default.createElement(_InputField.default, {
      name: "app.videos.youku",
      id: "pages.edit.youku",
      value: bot && bot.videos && bot.videos.youku
    })), _react.default.createElement(_Row.default, null, _react.default.createElement(_MultipleInputField.default, {
      name: "app.images.preview[]",
      id: "pages.edit.images.preview",
      value: bot && bot.images && bot.images.preview
    }))), _react.default.createElement(_ContentBox.default, null, _react.default.createElement("h2", null, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "pages.edit.rpc.flags.title"
    })), _react.default.createElement(_Row.default, null, _react.default.createElement(_InputField.default, {
      name: "app.flags.win",
      id: "pages.edit.rpc.flags.win",
      value: bot && bot.flags && bot.flags.win,
      toggle: true
    }), _react.default.createElement(_InputField.default, {
      name: "app.flags.mac",
      id: "pages.edit.rpc.flags.mac",
      value: bot && bot.flags && bot.flags.mac,
      toggle: true
    })), _react.default.createElement(_Row.default, null, _react.default.createElement(_InputField.default, {
      name: "app.flags.linux",
      id: "pages.edit.rpc.flags.linux",
      value: bot && bot.flags && bot.flags.linux,
      toggle: true,
      smallText: true
    }))), _react.default.createElement(_ContentBox.default, null, _react.default.createElement("h2", null, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "pages.edit.sourcecode"
    })), _react.default.createElement(_Row.default, null, _react.default.createElement(_InputField.default, {
      name: "app.github.owner",
      id: "pages.edit.github_owner",
      value: bot && bot.github && bot.github.owner
    }), _react.default.createElement(_InputField.default, {
      name: "app.github.repo",
      id: "pages.edit.github_repo",
      value: bot && bot.github && bot.github.repo
    }))), _react.default.createElement(_ContentBox.default, null, _react.default.createElement("h2", null, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "pages.edit.information"
    })), _react.default.createElement("p", null, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "pages.edit.languages.modal"
    })), _react.default.createElement(_Row.default, null, _react.default.createElement(_FlexContainer.default, null, _react.default.createElement("select", {
      form: "null",
      className: _Styles.Modesta.fullWidth,
      defaultValue: "null",
      ref: this.languagesSelect
    }, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "forms.select"
    }, select => _react.default.createElement("option", {
      value: "null",
      disabled: true
    }, select)), this.state.unusedLanguages.map(language => ({
      language,
      message: intl.formatMessage({
        id: `locales.${language}`
      })
    })).sort((a, b) => a.message.localeCompare(b.message)).map(({
      language,
      message
    }) => _react.default.createElement("option", {
      key: language,
      value: language
    }, message || ''))), _react.default.createElement("button", {
      onClick: this.addLanguage,
      className: _elementsModule.default.button
    }, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "pages.edit.languages.add"
    }))))), this.state.usedLanguages.map((language, index) => {
      const contents = bot && bot.contents && bot.contents.find(content => content.locale === language);
      return _react.default.createElement(_ContentBox.default, {
        key: language
      }, _react.default.createElement(_FlexContainer.default, null, _react.default.createElement("h3", null, _react.default.createElement(_reactIntl.FormattedMessage, {
        key: language,
        id: `locales.${language}`
      })), _react.default.createElement("button", {
        onClick: e => this.removeLanguage(e, language),
        className: _elementsModule.default.button
      }, _react.default.createElement(_reactIntl.FormattedMessage, {
        id: "pages.edit.deleteLanguage"
      }))), _react.default.createElement(_Row.default, null, _react.default.createElement(_InputField.default, {
        name: `app.contents[${index}][name]`,
        id: "pages.edit.name",
        value: contents && contents.name,
        className: _Styles.Modesta.fullWidth,
        required: true
      })), _react.default.createElement(_Row.default, null, _react.default.createElement(_InputField.default, {
        name: `app.contents[${index}][description]`,
        id: "pages.edit.description",
        value: contents && contents.description,
        className: _Styles.Modesta.fullWidth,
        required: true
      })), _react.default.createElement(_Row.default, null, _react.default.createElement(_InputField.default, {
        name: `app.contents[${index}][page]`,
        id: "pages.edit.page",
        value: contents && contents.page,
        textarea: true,
        className: _Styles.Modesta.fullWidth,
        required: true
      })), _react.default.createElement("input", {
        name: `app.contents[${index}][locale]`,
        type: "text",
        className: _displayModule.default.hidden,
        value: language
      }));
    }), _react.default.createElement(_ContentBox.default, null, this.state.message || this.state.unlocalised ? _react.default.createElement(_ContentBox.default, {
      className: this.state.ok ? _Styles.Modesta.emerald : _Styles.Modesta.alizarin
    }, _react.default.createElement("p", null, this.state.unlocalised ? _react.default.createElement(_reactIntl.FormattedMessage, {
      id: this.state.unlocalised
    }) : this.state.message)) : _react.default.createElement("div", null, _react.default.createElement("p", null, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "pages.edit.updates"
    })), _react.default.createElement("a", {
      className: `${_Styles.Modesta.discord} ${_Styles.Modesta.btn}`,
      target: "_blank",
      rel: "noopener noreferrer",
      href: _Locations.default.discordServer
    }, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "pages.edit.discord"
    }))), _react.default.createElement("button", {
      className: `${_Styles.Modesta.discord} ${_Styles.Modesta.btn}`
    }, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "forms.submit"
    })))), _react.default.createElement("input", {
      className: _displayModule.default.hidden,
      name: "app.type",
      value: "rpc"
    })));
  }

}

const mapStateToProps = state => {
  const {
    categories,
    auth,
    bot
  } = state;
  return {
    categories,
    auth,
    bot
  };
};

var _default = (0, _reactRedux.connect)(mapStateToProps)((0, _reactIntl.injectIntl)(EditRpc));

exports.default = _default;
},{"../../components/Container":"tNeE","../../components/ContentBox":"50Yc","../../components/FlexContainer":"AaMC","../../components/InputField":"azt2","../../components/Layout":"UCeK","../../components/MultipleInputField":"gasw","../../components/PleaseLogIn":"L3ld","../../components/Row":"pSXH","../../data/Locations":"uTwd","../../data/Styles":"rs3k","../../locales":"Qpzm","../../redux/actions/auth":"YSbd","../../redux/actions/categories":"BIvw","../../scss/display.module.scss":"Tyxi","../../scss/elements.module.scss":"h2Hb","../../redux/actions/bot":"YodB"}],"kTdp":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactHelmet = require("react-helmet");

var _reactIntl = require("react-intl");

var _Container = _interopRequireDefault(require("../../components/Container"));

var _ContentBox = _interopRequireDefault(require("../../components/ContentBox"));

var _Layout = _interopRequireDefault(require("../../components/Layout"));

var _LoadingContainer = _interopRequireDefault(require("../../components/LoadingContainer"));

var _LocalisedHyperlink = _interopRequireDefault(require("../../components/LocalisedHyperlink"));

var _Locations = _interopRequireDefault(require("../../data/Locations"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

class DocsHome extends _react.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: null
    };
    this.fetch = this.fetch.bind(this);
  }

  afterFetch() {
    const element = document.getElementById(window.location.hash.substr(1));
    console.log(element);

    if (element) {
      window.scrollTo(0, element.offsetTop);
    }
  }

  componentDidMount() {
    this.fetch('all').then(() => {
      this.afterFetch();
    });
  }

  fetch(type) {
    return fetch(`${_Locations.default.docsServer}/${type}.json`).then(res => res.json()).then(data => {
      this.setState({
        results: data.sort((a, b) => new Date(b.date) - new Date(a.date))
      });
    });
  }

  render() {
    const results = this.state.results;

    if (!Array.isArray(results)) {
      return _react.default.createElement(_Layout.default, {
        match: this.props.match
      }, _react.default.createElement(_LoadingContainer.default, null));
    } // keep howto on top


    const categories = ['howto'];
    results.forEach(post => {
      if (!categories.includes(post.type)) {
        categories.push(post.type);
      }
    });
    return _react.default.createElement(_Layout.default, {
      match: this.props.match
    }, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "pages.docs.title"
    }, title => _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "pages.docs.description"
    }, description => _react.default.createElement(_reactHelmet.Helmet, null, _react.default.createElement("title", null, title), _react.default.createElement("meta", {
      property: "og:title",
      content: title
    }), _react.default.createElement("meta", {
      property: "og:description",
      content: description
    }), _react.default.createElement("meta", {
      name: "description",
      content: description
    })))), _react.default.createElement(_Container.default, null, categories.map(category => _react.default.createElement(_ContentBox.default, {
      key: category
    }, _react.default.createElement("h3", {
      id: category
    }, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: `pages.docs.headers.${category}`
    })), results.filter(page => page.type === category).map(page => _react.default.createElement("p", {
      key: page.permalink
    }, _react.default.createElement(_LocalisedHyperlink.default, {
      to: page.permalink
    }, page.title)))))));
  }

}

var _default = (0, _reactIntl.injectIntl)(DocsHome);

exports.default = _default;
},{"../../components/Container":"tNeE","../../components/ContentBox":"50Yc","../../components/Layout":"UCeK","../../components/LoadingContainer":"N3k8","../../components/LocalisedHyperlink":"dChq","../../data/Locations":"uTwd"}],"L+Uu":[function(require,module,exports) {
module.exports = {
  "table": "_table_59897"
};
},{}],"2VrG":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Styles = require("../../data/Styles");

var _ConstructCSS = _interopRequireDefault(require("../../helpers/ConstructCSS"));

var _indexModule = _interopRequireDefault(require("./index.module.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

class TableContainer extends _react.Component {
  render() {
    return _react.default.createElement("div", {
      className: (0, _ConstructCSS.default)(_Styles.Modesta.tableContainer, _indexModule.default.table, _Styles.CSSElements.scrollbar)
    }, this.props.children);
  }

}

var _default = TableContainer;
exports.default = _default;
},{"../../data/Styles":"rs3k","../../helpers/ConstructCSS":"SwhA","./index.module.scss":"L+Uu"}],"RzcF":[function(require,module,exports) {
module.exports = {
  "description": "_description_d4455",
  "img": "_img_d4455",
  "tableContainer": "_tableContainer_d4455",
  "hidden": "_hidden_d4455"
};
},{"./../../../../node_modules/twemoji/2/svg/1f517.svg":[["1f517.fb7fa6a2.svg","w7CQ"],"w7CQ"]}],"nUkM":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _highlight = _interopRequireDefault(require("highlight.js/lib/highlight"));

var _bash = _interopRequireDefault(require("highlight.js/lib/languages/bash"));

var _diff = _interopRequireDefault(require("highlight.js/lib/languages/diff"));

var _javascript = _interopRequireDefault(require("highlight.js/lib/languages/javascript"));

var _json = _interopRequireDefault(require("highlight.js/lib/languages/json"));

var _jsx = _interopRequireDefault(require("marksy/jsx"));

var _react = _interopRequireWildcard(require("react"));

var _ContentBox = _interopRequireDefault(require("../../../components/ContentBox"));

var _ModalImage = _interopRequireDefault(require("../../../components/ModalImage"));

var _TableContainer = _interopRequireDefault(require("../../../components/TableContainer"));

var _Locations = _interopRequireDefault(require("../../../data/Locations"));

var _indexModule = _interopRequireDefault(require("./index.module.scss"));

require("./vs2015.scss");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_highlight.default.registerLanguage('javascript', _javascript.default);

_highlight.default.registerLanguage('bash', _bash.default);

_highlight.default.registerLanguage('diff', _diff.default);

_highlight.default.registerLanguage('json5', _javascript.default);

_highlight.default.registerLanguage('json', _json.default);

class BotPageContentBox extends _react.Component {
  constructor(props) {
    super(props);
    this.textArea = _react.default.createRef();
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    if (e.target) {
      let tag = null; // whoops

      if (/h[1-6]/i.test(e.target.tagName)) tag = e.target;
      if (/h[1-6]/i.test(e.target.parentElement.tagName)) tag = e.target.parentElement;
      if (/h[1-6]/i.test(e.target.parentElement.parentElement.tagName)) tag = e.target.parentElement.parentElement;

      if (tag) {
        this.textArea.current.value = `${window.location.origin}${window.location.pathname}#${tag.attributes.id.value}`;
        this.textArea.current.select();
        document.execCommand('copy');
        const element = document.getElementById(tag.attributes.id.value);

        if (element) {
          window.scrollTo(0, element.offsetTop);
        }
      }
    }
  }

  render() {
    const page = this.props.page;
    const compiler = (0, _jsx.default)({
      createElement: _react.createElement,
      elements: {
        img: ({
          src,
          alt
        }) => _react.default.createElement(_ModalImage.default, {
          className: _indexModule.default.img,
          src: src.startsWith('http') ? src : `${_Locations.default.docsServer}/posts${this.props.requestURL}${src}`,
          alt: alt,
          title: alt
        }),
        table: ({
          children
        }) => _react.default.createElement(_TableContainer.default, null, _react.default.createElement("table", null, children))
      },
      highlight: (language, code) => _highlight.default.highlight(language, code).value
    });
    const compiled = compiler(page);
    return _react.default.createElement(_ContentBox.default, null, _react.default.createElement("div", null, _react.default.createElement("div", {
      ref: this.description,
      className: _indexModule.default.description,
      onClick: this.onClick
    }, compiled.tree)), _react.default.createElement("textarea", {
      ref: this.textArea,
      className: _indexModule.default.hidden
    }));
  }

}

var _default = BotPageContentBox;
exports.default = _default;
},{"../../../components/ContentBox":"50Yc","../../../components/ModalImage":"i0xp","../../../components/TableContainer":"2VrG","../../../data/Locations":"uTwd","./index.module.scss":"RzcF","./vs2015.scss":"pac/"}],"+O+J":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchADoc = fetchADoc;
exports.RECIEVE_DOC = exports.REQUEST_DOC = void 0;

var _Locations = _interopRequireDefault(require("../../data/Locations"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const REQUEST_DOC = 'REQUEST_DOC';
exports.REQUEST_DOC = REQUEST_DOC;
const RECIEVE_DOC = 'RECIEVE_DOC';
exports.RECIEVE_DOC = RECIEVE_DOC;

function requestDoc(page) {
  return {
    type: REQUEST_DOC,
    page
  };
}

function recieveDoc(text, status, page) {
  return {
    type: RECIEVE_DOC,
    data: text,
    status,
    page
  };
}

function fetchDoc(page) {
  return dispatch => {
    dispatch(requestDoc(page));
    return fetch(`${_Locations.default.docsServer}/posts${page}/index.mdx`).then(res => {
      if (res.status !== 200) return dispatch(recieveDoc({}, res.status, page));
      return res.text().then(text => {
        return dispatch(recieveDoc(text, res.status, page));
      });
    });
  };
}

function shouldFetchDoc(state, page) {
  // If the data has already been fetched, do not fetch it
  if (state.doc.page === page) return false;
  return true;
}

function fetchADoc({
  url
}) {
  return (dispatch, getState) => {
    if (shouldFetchDoc(getState(), url)) {
      return dispatch(fetchDoc(url));
    }
  };
}
},{"../../data/Locations":"uTwd"}],"tU9b":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactHelmet = require("react-helmet");

var _reactIntl = require("react-intl");

var _ContentBox = _interopRequireDefault(require("../../components/ContentBox"));

var _Layout = _interopRequireDefault(require("../../components/Layout"));

var _DateFormat = _interopRequireDefault(require("../../data/DateFormat"));

var _Locations = _interopRequireDefault(require("../../data/Locations"));

var _NotFound = _interopRequireDefault(require("../NotFound"));

var _Container = _interopRequireDefault(require("../../components/Container"));

var _LoadingContainer = _interopRequireDefault(require("../../components/LoadingContainer"));

var _DocPageContentBox = _interopRequireDefault(require("./DocPageContentBox"));

var _LinkButton = _interopRequireDefault(require("../../components/LinkButton"));

var _Styles = require("../../data/Styles");

var _reactRedux = require("react-redux");

var _doc = require("../../redux/actions/doc");

var _frontMatter = _interopRequireDefault(require("front-matter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

class DocPage extends _react.Component {
  constructor(props) {
    super(props);
    this.requestURL = props.location.pathname.substring(props.match.url.length);
  }

  afterFetch() {
    const element = document.getElementById(window.location.hash.substr(1));

    if (element) {
      window.scrollTo(0, element.offsetTop);
    }
  }

  componentDidMount() {
    const {
      dispatch
    } = this.props;
    const promise = dispatch((0, _doc.fetchADoc)({
      url: this.requestURL
    }));
    if (promise) promise.then(this.afterFetch);
  }

  componentDidUpdate() {
    const {
      dispatch
    } = this.props;
    const promise = dispatch((0, _doc.fetchADoc)({
      url: this.requestURL
    }));
    if (promise) promise.then(this.afterFetch);
  }

  render() {
    const markdown = this.props.doc.data;
    const status = this.props.doc.status;

    if (status === 404) {
      return _react.default.createElement(_NotFound.default, {
        match: this.props.match
      });
    }

    if (!markdown) {
      return _react.default.createElement(_Layout.default, {
        match: this.props.match
      }, _react.default.createElement(_LoadingContainer.default, null));
    }

    const page = (0, _frontMatter.default)(markdown);
    const date = new Date(page.attributes.date);
    return _react.default.createElement(_Layout.default, {
      match: this.props.match
    }, _react.default.createElement(_reactHelmet.Helmet, null, _react.default.createElement("title", null, page.title), _react.default.createElement("meta", {
      property: "og:title",
      content: page.attributes.title
    }), _react.default.createElement("meta", {
      property: "og:description",
      content: page.attributes.description
    }), _react.default.createElement("meta", {
      name: "description",
      content: page.attributes.description
    }), _react.default.createElement("meta", {
      httpEquiv: "last-modified",
      content: date.toISOString().split('T')[0]
    })), _react.default.createElement(_Container.default, null, _react.default.createElement(_LinkButton.default, {
      to: "/posts",
      className: _Styles.Modesta.secondary
    }, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "pages.docs.back"
    })), _react.default.createElement(_ContentBox.default, null, _react.default.createElement("h2", null, page.attributes.title), page.attributes.by && _react.default.createElement("p", null, _react.default.createElement("i", null, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "pages.docs.by",
      values: {
        name: page.attributes.by
      }
    }))), page.attributes.date && _react.default.createElement("p", null, date.toLocaleDateString(this.props.intl.locale, _DateFormat.default))), _react.default.createElement(_DocPageContentBox.default, {
      page: page.body,
      requestURL: this.requestURL
    })));
  }

}

const mapStateToProps = state => {
  const {
    doc
  } = state;
  return {
    doc
  };
};

const exportedComponent = (0, _reactRedux.connect)(mapStateToProps)((0, _reactIntl.injectIntl)(DocPage));
exportedComponent.serverFetch = [{
  function: _doc.fetchADoc,
  pass: ['match', 'pathname'],
  payload: {}
}];
var _default = exportedComponent;
exports.default = _default;
},{"../../components/ContentBox":"50Yc","../../components/Layout":"UCeK","../../data/DateFormat":"4Pyv","../../data/Locations":"uTwd","../NotFound":"GVTv","../../components/Container":"tNeE","../../components/LoadingContainer":"N3k8","./DocPageContentBox":"nUkM","../../components/LinkButton":"geqJ","../../data/Styles":"rs3k","../../redux/actions/doc":"+O+J"}],"Fil3":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppPage = _interopRequireDefault(require("../pages/AppPage"));

var _ConfigurePage = _interopRequireDefault(require("../pages/ConfigurePage"));

var _EditBot = _interopRequireDefault(require("../pages/EditBot"));

var _FilterPage = _interopRequireDefault(require("../pages/FilterPage"));

var _Game = _interopRequireDefault(require("../pages/Game"));

var _Home = _interopRequireDefault(require("../pages/Home"));

var _BotsHome = _interopRequireDefault(require("../pages/BotsHome"));

var _Locale = _interopRequireDefault(require("../pages/Locale"));

var _LogOut = _interopRequireDefault(require("../pages/LogOut"));

var _NotFound = _interopRequireDefault(require("../pages/NotFound"));

var _AdminPage = _interopRequireDefault(require("../pages/AdminPage"));

var _LanguagesComparisonPage = _interopRequireDefault(require("../pages/LanguagesComparisonPage"));

var _RpcHome = _interopRequireDefault(require("../pages/RpcHome"));

var _EditRpc = _interopRequireDefault(require("../pages/EditRpc"));

var _DocsHome = _interopRequireDefault(require("../pages/DocsHome"));

var _DocPage = _interopRequireDefault(require("../pages/DocPage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = [{
  path: '/:locale/',
  exact: true,
  component: _Home.default,
  status: 200
}, {
  path: '/:locale/game',
  exact: true,
  component: _Game.default,
  status: 200
}, {
  path: '/:locale/auth/logout',
  exact: true,
  component: _LogOut.default,
  status: 200
}, {
  path: '/:locale/bots',
  exact: true,
  component: _BotsHome.default,
  status: 200
}, {
  path: '/:locale/rpc',
  exact: true,
  component: _RpcHome.default,
  status: 200
}, {
  path: '/:locale/bots/add',
  exact: true,
  component: _EditBot.default,
  status: 200
}, {
  path: '/:locale/rpc/add',
  exact: true,
  component: _EditRpc.default,
  status: 200
}, {
  path: '/:locale/filter',
  exact: true,
  component: _FilterPage.default,
  status: 200
}, {
  path: '/:locale/bots/:id/configure',
  exact: true,
  component: _ConfigurePage.default,
  status: 200
}, {
  path: '/:locale/bots/:id/edit',
  exact: true,
  component: _EditBot.default,
  status: 200
}, {
  path: '/:locale/rpc/:id/edit',
  exact: true,
  component: _EditRpc.default,
  status: 200
}, {
  path: '/:locale/:type/:id',
  exact: true,
  component: _AppPage.default,
  status: 200
}, {
  path: '/:locale/:type/:id',
  exact: true,
  component: _AppPage.default,
  status: 200
}, {
  path: '/:locale/locale',
  exact: true,
  component: _Locale.default,
  status: 200
}, {
  path: '/:locale/admin',
  exact: true,
  component: _AdminPage.default,
  status: 200
}, {
  path: '/:locale/languagescomparisontool',
  exact: true,
  component: _LanguagesComparisonPage.default,
  status: 200
}, {
  path: '/:locale/posts',
  exact: true,
  component: _DocsHome.default,
  status: 200
}, {
  path: '/:locale/posts',
  exact: false,
  component: _DocPage.default,
  status: 200
}, {
  path: '/:locale',
  exact: false,
  component: _NotFound.default,
  status: 404
}];
var _default = routes;
exports.default = _default;
},{"../pages/AppPage":"frcu","../pages/ConfigurePage":"HOS3","../pages/EditBot":"gvgD","../pages/FilterPage":"0bbm","../pages/Game":"L/hj","../pages/Home":"gEi2","../pages/BotsHome":"7vza","../pages/Locale":"9DHm","../pages/LogOut":"BXm7","../pages/NotFound":"GVTv","../pages/AdminPage":"JkHl","../pages/LanguagesComparisonPage":"/yZI","../pages/RpcHome":"Qxjn","../pages/EditRpc":"vgrX","../pages/DocsHome":"kTdp","../pages/DocPage":"tU9b"}],"C+Ou":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _flat = _interopRequireDefault(require("flat"));

var _react = _interopRequireWildcard(require("react"));

var _reactIntl = require("react-intl");

var _reactRouterDom = require("react-router-dom");

var _locales = _interopRequireDefault(require("../../locales"));

var _reactHelmet = require("react-helmet");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const messages = _locales.default.filter(language => language.translations).reduce((prev, curr) => {
  (0, _reactIntl.addLocaleData)(curr.reactIntl);
  prev[curr.code] = (0, _flat.default)(curr.translations);
  return prev;
}, {});

class InternationalisationProvider extends _react.Component {
  render() {
    const {
      match,
      location
    } = this.props;
    if (!messages[match.params.locale]) return _react.default.createElement(_reactRouterDom.Redirect, {
      to: `/en-GB${location.pathname}`
    });
    return _react.default.createElement(_reactIntl.IntlProvider, {
      locale: match.params.locale,
      messages: Object.assign({}, messages['en-GB'], messages[match.params.locale]),
      defaultLocale: "en-GB"
    }, _react.default.createElement("div", null, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "site.name"
    }, title => _react.default.createElement(_reactHelmet.Helmet, {
      titleTemplate: `%s - ${title}`,
      defaultTitle: title
    }, _react.default.createElement("html", {
      lang: match.params.locale
    }))), this.props.children));
  }

}

var _default = InternationalisationProvider;
exports.default = _default;
},{"../../locales":"Qpzm"}],"FQPh":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const redirects = [{
  path: '/',
  exact: true,
  status: 301,
  to: () => '/en-GB'
}, {
  path: '/en-baguette',
  exact: false,
  status: 301,
  to: () => '/en-GB'
}, {
  path: '/:locale/locale/dev',
  exact: true,
  status: 301,
  to: ({
    match
  }) => `/${match.params.locale}/languagescomparisontool`
}, {
  path: '/:locale/bots/filter',
  exact: true,
  status: 301,
  to: ({
    match
  }) => `/${match.params.locale}/filter`
}, {
  path: '/:locale/boats/',
  exact: false,
  status: 301,
  to: ({
    match
  }) => `/${match.params.locale}/bots`
}, {
  path: '/:locale/bot/',
  exact: true,
  status: 301,
  to: ({
    match
  }) => `/${match.params.locale}/bots`
}, {
  path: '/:locale/bots/by/:id',
  exact: true,
  status: 301,
  to: ({
    match
  }) => `/${match.params.locale}/filter?owners[]=${encodeURIComponent(match.params.id)}`
}, {
  path: '/:locale/bots/category/:category',
  exact: true,
  status: 301,
  to: ({
    match
  }) => `/${match.params.locale}/filter?category=${encodeURIComponent(match.params.category)}&state=approved`
}, {
  path: '/:locale/bots/unverified',
  exact: true,
  status: 301,
  to: ({
    match
  }) => `/${match.params.locale}/filter?state=queue`
}, {
  path: '/:locale/bots/search',
  exact: true,
  status: 301,
  to: ({
    match
  }) => `/${match.params.locale}/filter`
}];
var _default = redirects;
exports.default = _default;
},{}],"fcPh":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRouterDom = require("react-router-dom");

var _routes = _interopRequireDefault(require("../../data/routes"));

var _InternationalisationProvider = _interopRequireDefault(require("../InternationalisationProvider"));

var _redirects = _interopRequireDefault(require("../../data/redirects"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

class WebsiteRouter extends _react.Component {
  render() {
    if (typeof window !== 'undefined' && window.location.hostname === 'localhost') window.location.href = `http://127.0.0.1:1234${window.location.pathname}`;
    if (typeof window !== 'undefined' && window.location.hostname === 'discordapp.dev') window.location.href = `https://discordapps.dev${window.location.pathname}`;
    return _react.default.createElement(_reactRouterDom.Switch, null, _redirects.default.map(route => _react.default.createElement(_reactRouterDom.Route, {
      key: route.path,
      path: route.path,
      exact: route.exact,
      component: ({
        match,
        location,
        staticContext
      }) => {
        if (staticContext) {
          staticContext.status = route.status;
        }

        return _react.default.createElement(_reactRouterDom.Redirect, {
          to: route.to({
            match,
            location,
            staticContext
          })
        });
      }
    })), _routes.default.map(route => {
      const RouteComponent = route.component;
      return _react.default.createElement(_reactRouterDom.Route, {
        key: route.path,
        path: route.path,
        exact: route.exact,
        component: ({
          match,
          location,
          staticContext
        }) => {
          if (staticContext) {
            staticContext.status = route.status;
          }

          return _react.default.createElement(_InternationalisationProvider.default, {
            match: match,
            location: location
          }, _react.default.createElement(RouteComponent, {
            match: match,
            location: location,
            staticContext: staticContext
          }));
        }
      });
    }));
  }

}

var _default = WebsiteRouter;
exports.default = _default;
},{"../../data/routes":"Fil3","../InternationalisationProvider":"C+Ou","../../data/redirects":"FQPh"}],"xTYH":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Routes = _interopRequireDefault(require("./components/Routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

class App extends _react.Component {
  render() {
    return _react.default.createElement(_Routes.default, null);
  }

}

var _default = App;
exports.default = _default;
},{"./components/Routes":"fcPh"}],"1Xxv":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _auth = require("../actions/auth");

function auth(state = {
  fetching: false,
  fetched: false,
  data: null
}, action) {
  switch (action.type) {
    case _auth.REQUEST_AUTH:
      return Object.assign({}, state, {
        fetching: true
      });

    case _auth.RECEIVE_AUTH:
      return Object.assign({}, state, {
        fetching: false,
        fetched: true,
        data: Object.keys(action.data).length === 0 ? null : action.data
      });

    default:
      return state;
  }
}

var _default = auth;
exports.default = _default;
},{"../actions/auth":"YSbd"}],"Ci+K":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _categories = require("../actions/categories");

function categories(state = {
  fetching: false,
  fetched: false,
  data: []
}, action) {
  switch (action.type) {
    case _categories.REQUEST_CATEGORIES:
      return Object.assign({}, state, {
        fetching: true
      });

    case _categories.RECIEVE_CATEGORIES:
      return Object.assign({}, state, {
        fetching: false,
        fetched: true,
        data: action.data.slice()
      });

    default:
      return state;
  }
}

var _default = categories;
exports.default = _default;
},{"../actions/categories":"BIvw"}],"fYS/":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bot = require("../actions/bot");

function bot(state = {
  fetching: false,
  fetched: false,
  data: null,
  status: null,
  id: null
}, action) {
  switch (action.type) {
    case _bot.REQUEST_BOT:
      return Object.assign({}, state, {
        fetching: true,
        fetched: false,
        data: null,
        id: action.id
      });

    case _bot.RESET_BOT:
      return Object.assign({}, state, {
        fetching: false,
        fetched: false,
        data: null,
        status: null
      });

    case _bot.RECIEVE_BOT:
      return Object.assign({}, state, {
        fetching: false,
        fetched: true,
        data: Object.keys(action.data).length === 0 ? null : action.data,
        status: action.status
      });

    default:
      return state;
  }
}

var _default = bot;
exports.default = _default;
},{"../actions/bot":"YodB"}],"eSIz":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _doc = require("../actions/doc");

function doc(state = {
  fetching: false,
  fetched: false,
  data: null,
  status: null,
  id: null
}, action) {
  switch (action.type) {
    case _doc.REQUEST_DOC:
      return Object.assign({}, state, {
        fetching: true,
        fetched: false,
        data: null,
        page: action.page
      });

    case _doc.RECIEVE_DOC:
      return Object.assign({}, state, {
        fetching: false,
        fetched: true,
        data: Object.keys(action.data).length === 0 ? null : action.data,
        status: action.status
      });

    default:
      return state;
  }
}

var _default = doc;
exports.default = _default;
},{"../actions/doc":"+O+J"}],"nVbN":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _redux = require("redux");

var _auth = _interopRequireDefault(require("./auth"));

var _categories = _interopRequireDefault(require("./categories"));

var _bot = _interopRequireDefault(require("./bot"));

var _doc = _interopRequireDefault(require("./doc"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (0, _redux.combineReducers)({
  auth: _auth.default,
  categories: _categories.default,
  bot: _bot.default,
  doc: _doc.default
});

exports.default = _default;
},{"./auth":"1Xxv","./categories":"Ci+K","./bot":"fYS/","./doc":"eSIz"}],"JtT0":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = configureStore;

var _redux = require("redux");

var _reduxThunk = _interopRequireDefault(require("redux-thunk"));

var _reducers = _interopRequireDefault(require("./reducers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const stuffToCompose = [(0, _redux.applyMiddleware)(_reduxThunk.default)];

if (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__) {
  stuffToCompose.push(window.__REDUX_DEVTOOLS_EXTENSION__());
}

function configureStore() {
  if (typeof window !== 'undefined' && window.REDUX_STATE) {
    return (0, _redux.createStore)(_reducers.default, window.REDUX_STATE, (0, _redux.compose)(...stuffToCompose));
  }

  return (0, _redux.createStore)(_reducers.default, (0, _redux.compose)(...stuffToCompose));
}
},{"./reducers":"nVbN"}],"T/Cs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _server = _interopRequireDefault(require("react-dom/server"));

var _reactHelmet = require("react-helmet");

var _reactRedux = require("react-redux");

var _reactRouter = require("react-router");

var _App = _interopRequireDefault(require("../../../client/App"));

var _routes = _interopRequireDefault(require("../../../client/data/routes"));

var _store = _interopRequireDefault(require("../../../client/redux/store"));

var _fs = require("fs");

var _path = require("path");

var _redirects = _interopRequireDefault(require("../../../client/data/redirects"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const htmlData = (0, _fs.readFileSync)((0, _path.join)(__dirname, '../index.html'), 'utf8');

const ReactRenderer = (req, res, next) => {
  // If a redirect is required, return the redirect.
  for (let i = 0; i < _redirects.default.length; i += 1) {
    const match = (0, _reactRouter.matchPath)(req.baseUrl, _redirects.default[i]);
    const route = _redirects.default[i];

    if (match) {
      return res.redirect(route.status || 302, route.to({
        match
      }));
    }
  }

  const context = {
    status: 200
  };
  const store = (0, _store.default)(); // https://medium.freecodecamp.org/demystifying-reacts-server-side-render-de335d408fe4
  // Fetch everything needed to render the page from redux.

  const promises = [];

  for (let i = 0; i < _routes.default.length; i += 1) {
    const match = (0, _reactRouter.matchPath)(req.baseUrl, _routes.default[i]);
    const route = _routes.default[i];

    if (match) {
      if (route.component.serverFetch) {
        for (let j = 0; j < route.component.serverFetch.length; j += 1) {
          const serverFetch = route.component.serverFetch[j];
          const payload = serverFetch.payload;

          if (serverFetch.pass.includes('match')) {
            payload.match = match;
          }

          if (serverFetch.pass.includes('pathname')) {
            payload.pathname = req.baseUrl;
          }

          promises.push(store.dispatch(serverFetch.function(payload)));
        }
      }

      break;
    }
  } // After redux finishes, then send the HTML


  Promise.all(promises).then(() => {
    // render the app as a string-
    const html = _server.default.renderToString(_react.default.createElement(_reactRedux.Provider, {
      store: store
    }, _react.default.createElement(_reactRouter.StaticRouter, {
      location: req.baseUrl,
      context: context
    }, _react.default.createElement(_App.default, null))));

    const helmet = _reactHelmet.Helmet.renderStatic(); // Set the status code to the status of the components.


    res.status(context.status);
    res.send(htmlData.replace('<html lang="en">', `<html ${helmet.htmlAttributes.toString()}>`).replace('<title>Discord Apps Marketplace</title>', helmet.title.toString() + helmet.meta.toString() + helmet.link.toString() + helmet.script.toString()).replace('<div id="app"></div>', `<div id="app">${html}</div><script>window.REDUX_STATE = ${JSON.stringify(store.getState())}</script>`));
  }).catch(err => next(err));
};

var _default = ReactRenderer;
exports.default = _default;
},{"../../../client/App":"xTYH","../../../client/data/routes":"Fil3","../../../client/redux/store":"JtT0","../../../client/data/redirects":"FQPh"}],"sv9b":[function(require,module,exports) {
module.exports = "/robots.98b8b187.txt";
},{}],"Rqlz":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const databaseConfig = {
  enabled: false,
  db: "test",
  servers: [{
    host: "127.0.0.1",
    port: 28015
  }],
  silent: true
};
var _default = databaseConfig;
exports.default = _default;
},{}],"Hl1S":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const autoInitTables = ['users', 'apps', 'images', 'reviews'];
var _default = autoInitTables;
exports.default = _default;
},{}],"Kail":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _rethinkdbdash = _interopRequireDefault(require("rethinkdbdash"));

var _databaseConfig = _interopRequireDefault(require("../../../configuration/server/databaseConfig"));

var _autoInitTables = _interopRequireDefault(require("../../data/autoInitTables"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let r = null;

const checkDatabase = () => r.dbList().then(dbList => {
  // If the list of databases does not include the one Forklift uses
  if (!dbList.includes(_databaseConfig.default.db)) {
    // Create the database and return a promise
    return r.dbCreate(_databaseConfig.default.db);
  } // Accept if there is no database to create


  return Promise.resolve();
}).then(() => r.tableList()).then(tableList => {
  // Collect a list of promises which promise the table has been created
  const promises = []; // For each table that should exist

  for (let i = 0; i < _autoInitTables.default.length; i += 1) {
    // If the list of tables does not include the one Forklift uses
    if (!tableList.includes(_autoInitTables.default[i])) {
      // Create the table and add the promise
      promises.push(r.tableCreate(_autoInitTables.default[i]));
    }
  } // Accepts if there are no tables to create.
  // Otherwise, waits for tables to create


  return Promise.all(promises);
});

if (_databaseConfig.default.enabled) {
  r = (0, _rethinkdbdash.default)(_databaseConfig.default);
  checkDatabase().then(() => {
    console.log('Database tables created!');
  });
}

var _default = r;
exports.default = _default;
},{"../../../configuration/server/databaseConfig":"Rqlz","../../data/autoInitTables":"Hl1S"}],"eWoe":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _database = _interopRequireDefault(require("../../helpers/database"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ApiOneApps = _express.default.Router();

const getUser = id => _database.default.table('users').get(id).default({
  id,
  discriminator: null,
  username: null,
  cachedAvatar: null
}).pluck('discriminator', 'username', 'cachedAvatar', 'id');

const mergeAuthors = app => app('authors').map(id => getUser(id));

const mergeReviews = (app, req) => _database.default.table('reviews').filter({
  // Find reviews for this bot
  bot: app('id')
}).merge(reviewer => getUser(reviewer('author'))).merge(reviewer => ({
  isCurrentUserOwner: req.user ? _database.default.eq(reviewer('author'), req.user.id) : false
})).default([]).without('bot', 'author', 'id').coerceTo('array');

ApiOneApps.use('/id/:id', (req, res, next) => {
  _database.default.table('apps').get(req.params.id).merge(app => ({
    authors: mergeAuthors(app),
    reviews: mergeReviews(app, req)
  })).default({}).without('token').then(bot => {
    if (!bot.id) res.status(404);
    res.json({
      ok: true,
      data: bot
    });
  }).catch(err => {
    next(err);
  });
}).use((req, res) => {
  res.send('hi');
});
var _default = ApiOneApps;
exports.default = _default;
},{"../../helpers/database":"Kail"}],"D/FV":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _apps = _interopRequireDefault(require("./apps"));

var _databaseConfig = _interopRequireDefault(require("../../../configuration/server/databaseConfig"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ApiOne = _express.default.Router();

ApiOne.use((req, res, next) => {
  if (!_databaseConfig.default.enabled) {
    res.json({
      ok: false,
      message: 'The database has not been enabled. Edit `/data/databaseConfig.js` with the relevant settings to enable.'
    });
  } else {
    next();
  }
}).use('/apps', _apps.default).use((req, res) => {
  res.status(404).json({
    ok: false,
    message: 'Route not found'
  });
}).use((err, req, res, next) => {
  if (err) {
    res.status(500).json({
      ok: false,
      message: err.message || err,
      data: err.stack
    });
  }
});
var _default = ApiOne;
exports.default = _default;
},{"./apps":"eWoe","../../../configuration/server/databaseConfig":"Rqlz"}],"Focm":[function(require,module,exports) {
"use strict";

var _express = _interopRequireDefault(require("express"));

var _fs = _interopRequireDefault(require("fs"));

require("isomorphic-fetch");

var _Locations = _interopRequireDefault(require("../client/data/Locations"));

var _ReactRenderer = _interopRequireDefault(require("./middleware/ReactRenderer"));

var _robots = _interopRequireDefault(require("./data/robots.txt"));

var _ApiOne = _interopRequireDefault(require("./middleware/ApiOne"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const path = require('path');

const app = (0, _express.default)();

const ROBOTS = _fs.default.readFileSync(path.join(__dirname, _robots.default), {
  encoding: 'utf-8'
});

app.set('json spaces', 4).get('/robots.txt', (req, res) => {
  res.send(ROBOTS);
}).get('/sitemap.xml', (req, res, next) => {
  fetch(`${_Locations.default.server}/ls13.xml`).then(result => result.text()).then(text => res.header('Content-Type', 'application/xml').send(text)).catch(err => next(err));
}).use('/api/v1', _ApiOne.default) // API server
.use('^/$', _ReactRenderer.default) // Render ROOT with the server
.use(_express.default.static(path.resolve(process.cwd(), 'dist'), {
  maxAge: '30d'
})).use('*', _ReactRenderer.default) // Render non-static with the server
.listen(3000, error => {
  if (error) {
    return console.log('something bad happened', error);
  }

  console.log('Now listening to 3000');
});
},{"../client/data/Locations":"uTwd","./middleware/ReactRenderer":"T/Cs","./data/robots.txt":"sv9b","./middleware/ApiOne":"D/FV"}]},{},["Focm"], null)
//# sourceMappingURL=/index.js.map