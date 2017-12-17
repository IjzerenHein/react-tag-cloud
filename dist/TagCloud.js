module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactMeasure = __webpack_require__(3);

var _reactMeasure2 = _interopRequireDefault(_reactMeasure);

var _d3Cloud = __webpack_require__(4);

var _d3Cloud2 = _interopRequireDefault(_d3Cloud);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TagCloud = function (_Component) {
	_inherits(TagCloud, _Component);

	function TagCloud(props) {
		_classCallCheck(this, TagCloud);

		var _this = _possibleConstructorReturn(this, (TagCloud.__proto__ || Object.getPrototypeOf(TagCloud)).call(this, props));

		_this._width = 0;
		_this._height = 0;
		_this.state = {
			wrappedChildren: []
		};
		_this.text = _this.text.bind(_this);
		_this.fontFamily = _this.getStyleValue.bind(_this, 'font');
		_this.fontSize = _this.getStyleValue.bind(_this, 'fontSize');
		_this.fontWeight = _this.getStyleValue.bind(_this, 'fontWeight');
		_this.fontStyle = _this.getStyleValue.bind(_this, 'fontStyle');
		_this.padding = _this.getStyleValue.bind(_this, 'padding');
		_this.rotate = _this.rotate.bind(_this);
		_this.onResize = _this.onResize.bind(_this);
		return _this;
	}

	_createClass(TagCloud, [{
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			this.updateLayout(nextProps, true);
		}
	}, {
		key: 'updateLayout',
		value: function updateLayout(props) {
			var _this2 = this;

			var width = this._width;
			var height = this._height;
			if (!width || !height) {
				return;
			}

			this.calculateLayout(props).then(function (children) {
				_this2.setState({
					wrappedChildren: children
				});
			});
		}
	}, {
		key: 'calculateLayout',
		value: function calculateLayout(props) {
			var _this3 = this;

			var children = props.children,
			    spiral = props.spiral,
			    random = props.random;

			var width = this._width;
			var height = this._height;

			return new Promise(function (resolve) {
				(0, _d3Cloud2.default)().size([width, height]).words(_react2.default.Children.map(children, function (child) {
					return { child: child };
				})).text(_this3.text).font(_this3.fontFamily).fontStyle(_this3.fontStyle).fontWeight(_this3.fontWeight).fontSize(_this3.fontSize).rotate(_this3.rotate).spiral(spiral).padding(_this3.padding).random(random).on('end', function (items) {
					var newChildren = items.map(function (item, index) {
						var x = item.x + width / 2 + item.width / -2;
						var y = item.y + height / 2 + item.height / -2;
						var style = _extends({
							position: 'absolute'
						}, item.child.props.style, {
							fontFamily: item.font,
							fontSize: item.size - 2,
							fontWeight: item.weight,
							fontStyle: item.style,
							transform: 'translate(' + x + 'px,' + y + 'px) rotate(' + item.rotate + 'deg)',
							transformOrigin: 'left center'
						});
						if (!style.color && _this3.props.style.color && typeof _this3.props.style.color === 'function') {
							style.color = _this3.props.style.color(item.child, index);
						}
						return _react2.default.cloneElement(item.child, _extends({}, item.child.props, {
							key: item.text,
							style: style
						}), item.child.props.children);
					});
					resolve(newChildren);
				}).start();
			});
		}
	}, {
		key: 'getStyleValue',
		value: function getStyleValue(propName, word) {
			var childValue = word.child.props.style ? word.child.props.style[propName] : undefined;
			var value = childValue || this.props.style[propName] || TagCloud.defaultProps.style[propName];
			if (typeof value === 'function') {
				value = value(word.child.props);
			}
			if (propName === 'fontSize') value += 2;
			return value;
		}
	}, {
		key: 'rotate',
		value: function rotate(word) {
			var value = word.child.props.rotate || this.props.rotate || TagCloud.defaultProps.rotate;
			if (typeof value === 'function') {
				return value(word.child.props);
			} else {
				return value;
			}
		}
	}, {
		key: 'text',
		value: function text(word) {
			var text = word.child.props.text;

			if (!text) {
				var children = word.child.props.children;

				if (Array.isArray(children)) {
					text = children[0];
				} else {
					text = children;
				}
			}

			return text;
		}
	}, {
		key: 'render',
		value: function render() {
			var _props = this.props,
			    children = _props.children,
			    style = _props.style,
			    rotate = _props.rotate,
			    spiral = _props.spiral,
			    random = _props.random,
			    props = _objectWithoutProperties(_props, ['children', 'style', 'rotate', 'spiral', 'random']);

			var fontFamily = style.fontFamily,
			    fontSize = style.fontSize,
			    fontWeight = style.fontWeight,
			    fontStyle = style.fontStyle,
			    padding = style.padding,
			    otherStyle = _objectWithoutProperties(style, ['fontFamily', 'fontSize', 'fontWeight', 'fontStyle', 'padding']);

			var wrappedChildren = this.state.wrappedChildren;


			return _react2.default.createElement(
				_reactMeasure2.default,
				{ bounds: true, onResize: this.onResize },
				function (_ref) {
					var measureRef = _ref.measureRef;
					return _react2.default.createElement(
						'div',
						_extends({ ref: measureRef }, props, { style: otherStyle }),
						wrappedChildren
					);
				}
			);
		}
	}, {
		key: 'onResize',
		value: function onResize(_ref2) {
			var _this4 = this;

			var bounds = _ref2.bounds;
			var width = bounds.width,
			    height = bounds.height;

			if (this._width !== width || this._height !== height) {
				this._width = width;
				this._height = height;
				if (this._resizeTimer) clearTimeout(this._resizeTimer);
				this._resizeTimer = setTimeout(function () {
					_this4._resizeTimer = undefined;
					_this4.updateLayout(_this4.props);
				}, 100);
			}
		}
	}]);

	return TagCloud;
}(_react.Component);

TagCloud.propTypes = {
	children: _propTypes2.default.any,
	style: _propTypes2.default.shape({
		fontFamily: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string]),
		fontStyle: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string]),
		fontWeight: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.number, _propTypes2.default.string]),
		fontSize: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.number]),
		padding: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.number])
	}),
	rotate: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.number]),
	spiral: _propTypes2.default.oneOfType([_propTypes2.default.oneOf(['archimedean', 'rectangular']), _propTypes2.default.func]),
	random: _propTypes2.default.func
};
TagCloud.defaultProps = {
	style: {
		fontFamily: 'serif',
		fontStyle: 'normal',
		fontWeight: 'normal',
		fontSize: 20,
		padding: 1
	},
	rotate: 0,
	spiral: 'archimedean',
	random: Math.random
};
exports.default = TagCloud;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("react-measure");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("d3-cloud");

/***/ })
/******/ ]);