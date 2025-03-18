"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var DEFAULT_PLACEHOLDER_STRING = 'Select...';
var Dropdown = function Dropdown(props) {
  var parseValue = function parseValue(value, options) {
    var option;
    if (typeof value === 'string') {
      for (var i = 0, num = options.length; i < num; i++) {
        if (options[i].type === 'group') {
          var match = options[i].items.filter(function (item) {
            return item.value === value;
          });
          if (match.length) {
            option = match[0];
          }
        } else if (typeof options[i].value !== 'undefined' && options[i].value === value) {
          option = options[i];
        }
      }
    }
    return option || value;
  };
  var _useState = (0, _react.useState)({
      selected: parseValue(props.value, props.options) || {
        label: typeof props.placeholder === 'undefined' ? DEFAULT_PLACEHOLDER_STRING : props.placeholder,
        value: ''
      },
      isOpen: false,
      isFocused: false
    }),
    _useState2 = _slicedToArray(_useState, 2),
    state = _useState2[0],
    setState = _useState2[1];
  var dropdownRef = (0, _react.useRef)(null);
  var mounted = (0, _react.useRef)(true);
  (0, _react.useEffect)(function () {
    // Component mount
    document.addEventListener('click', handleDocumentClick, false);
    document.addEventListener('touchend', handleDocumentClick, false);
    return function () {
      // Component unmount
      mounted.current = false;
      document.removeEventListener('click', handleDocumentClick, false);
      document.removeEventListener('touchend', handleDocumentClick, false);
    };
  }, []);
  (0, _react.useEffect)(function () {
    // Handle value prop changes
    if (props.value) {
      var selected = parseValue(props.value, props.options);
      if (selected !== state.selected) {
        setState(function (prevState) {
          return _objectSpread(_objectSpread({}, prevState), {}, {
            selected: selected
          });
        });
      }
    } else {
      setState(function (prevState) {
        return _objectSpread(_objectSpread({}, prevState), {}, {
          selected: {
            label: typeof props.placeholder === 'undefined' ? DEFAULT_PLACEHOLDER_STRING : props.placeholder,
            value: ''
          }
        });
      });
    }
  }, [props.value, props.options, props.placeholder]);
  var handleDocumentClick = function handleDocumentClick(event) {
    if (mounted.current) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        if (state.isOpen) {
          setState(function (prevState) {
            return _objectSpread(_objectSpread({}, prevState), {}, {
              isOpen: false,
              isFocused: false
            });
          });
        }
      }
    }
  };
  var closeDropdown = function closeDropdown() {
    setState(function (prevState) {
      return _objectSpread(_objectSpread({}, prevState), {}, {
        isOpen: false,
        isFocused: false
      });
    });
  };
  var openDropdown = function openDropdown() {
    setState(function (prevState) {
      return _objectSpread(_objectSpread({}, prevState), {}, {
        isOpen: true,
        isFocused: true
      });
    });
  };
  var handleMouseDown = function handleMouseDown(event) {
    if (props.onFocus && typeof props.onFocus === 'function') {
      props.onFocus(state.isOpen);
    }
    if (event.type === 'mousedown' && event.button !== 0) return;
    event.stopPropagation();
    event.preventDefault();
    if (!props.disabled) {
      setState(function (prevState) {
        return _objectSpread(_objectSpread({}, prevState), {}, {
          isOpen: !prevState.isOpen
        });
      });
    }
  };
  var handleKeyDown = function handleKeyDown(event) {
    // event.stopPropagation()
    // event.preventDefault()

    console.log('Key: ', event.key);
    if (event.key === 'Enter') {
      if (props.onFocus && typeof props.onFocus === 'function') {
        props.onFocus(state.isOpen);
      }
      if (!props.disabled) {
        setState(function (prevState) {
          return _objectSpread(_objectSpread({}, prevState), {}, {
            isOpen: !prevState.isOpen
          });
        });
      }
    }
  };
  var setValue = function setValue(value, label) {
    var newSelected = {
      value: value,
      label: label
    };
    if (newSelected !== state.selected && props.onChange) {
      props.onChange(newSelected);
    }
    setState({
      selected: newSelected,
      isOpen: false
    });
  };
  var isDropdown = (0, _react.useCallback)(function (el) {
    return el.classList.contains("".concat(props.baseClassName, "-option")) || el.classList.contains("".concat(props.baseClassName, "-root"));
  }, [props]);
  var renderOption = function renderOption(option) {
    var value = option.value;
    if (typeof value === 'undefined') {
      value = option.label || option;
    }
    var label = option.label || option.value || option;
    var isSelected = value === state.selected.value || value === state.selected;
    var classes = _defineProperty(_defineProperty(_defineProperty({}, "".concat(props.baseClassName, "-option"), true), option.className, !!option.className), 'is-selected', isSelected);
    var optionClass = (0, _classnames["default"])(classes);
    var dataAttributes = Object.keys(option.data || {}).reduce(function (acc, dataKey) {
      return _objectSpread(_objectSpread({}, acc), {}, _defineProperty({}, "data-".concat(dataKey), option.data[dataKey]));
    }, {});
    return /*#__PURE__*/_react["default"].createElement("div", _extends({
      key: value,
      className: optionClass,
      onMouseDown: function onMouseDown() {
        return setValue(value, label);
      },
      onClick: function onClick() {
        return setValue(value, label);
      },
      onBlur: function onBlur(e) {
        if (!isDropdown(e.relatedTarget)) {
          closeDropdown();
        }
      },
      role: "option",
      tabIndex: "0",
      "aria-selected": isSelected ? 'true' : 'false'
    }, dataAttributes), label);
  };
  var buildMenu = function buildMenu() {
    var options = props.options,
      baseClassName = props.baseClassName;
    var ops = options.map(function (option) {
      if (option.type === 'group') {
        var groupTitle = /*#__PURE__*/_react["default"].createElement("div", {
          className: "".concat(baseClassName, "-title")
        }, option.name);
        var _options = option.items.map(function (item) {
          return renderOption(item);
        });
        return /*#__PURE__*/_react["default"].createElement("div", {
          className: "".concat(baseClassName, "-group"),
          key: option.name,
          role: "listbox",
          tabIndex: "-1"
        }, groupTitle, _options);
      } else {
        return renderOption(option);
      }
    });
    return ops.length ? ops : /*#__PURE__*/_react["default"].createElement("div", {
      className: "".concat(baseClassName, "-noresults")
    }, "No options found");
  };
  var isValueSelected = function isValueSelected() {
    return typeof state.selected === 'string' || state.selected.value !== '';
  };
  var baseClassName = props.baseClassName,
    controlClassName = props.controlClassName,
    placeholderClassName = props.placeholderClassName,
    menuClassName = props.menuClassName,
    arrowClassName = props.arrowClassName,
    arrowClosed = props.arrowClosed,
    arrowOpen = props.arrowOpen,
    className = props.className;
  var disabledClass = props.disabled ? 'Dropdown-disabled' : '';
  var placeHolderValue = typeof state.selected === 'string' ? state.selected : state.selected.label;
  var dropdownClass = (0, _classnames["default"])(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, "".concat(baseClassName, "-root"), true), className, !!className), 'is-open', state.isOpen), 'is-focused', state.isFocused));
  var controlClass = (0, _classnames["default"])(_defineProperty(_defineProperty(_defineProperty({}, "".concat(baseClassName, "-control"), true), controlClassName, !!controlClassName), disabledClass, !!disabledClass));
  var placeholderClass = (0, _classnames["default"])(_defineProperty(_defineProperty(_defineProperty({}, "".concat(baseClassName, "-placeholder"), true), placeholderClassName, !!placeholderClassName), 'is-selected', isValueSelected()));
  var menuClass = (0, _classnames["default"])(_defineProperty(_defineProperty({}, "".concat(baseClassName, "-menu"), true), menuClassName, !!menuClassName));
  var arrowClass = (0, _classnames["default"])(_defineProperty(_defineProperty({}, "".concat(baseClassName, "-arrow"), true), arrowClassName, !!arrowClassName));
  var value = /*#__PURE__*/_react["default"].createElement("div", {
    className: placeholderClass
  }, placeHolderValue);
  var menu = state.isOpen ? /*#__PURE__*/_react["default"].createElement("div", {
    className: menuClass,
    "aria-expanded": "true"
  }, buildMenu()) : null;
  return /*#__PURE__*/_react["default"].createElement("div", {
    ref: dropdownRef,
    className: dropdownClass
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: controlClass,
    role: "menu",
    tabIndex: 0,
    onKeyDown: handleKeyDown,
    onMouseDown: handleMouseDown,
    onFocus: openDropdown,
    onBlur: function onBlur(e) {
      if (!isDropdown(e.relatedTarget)) {
        closeDropdown();
      }
    },
    onTouchEnd: handleMouseDown,
    "aria-haspopup": "listbox"
  }, value, /*#__PURE__*/_react["default"].createElement("div", {
    className: "".concat(baseClassName, "-arrow-wrapper")
  }, arrowOpen && arrowClosed ? state.isOpen ? arrowOpen : arrowClosed : /*#__PURE__*/_react["default"].createElement("span", {
    className: arrowClass
  }))), menu);
};
Dropdown.defaultProps = {
  baseClassName: 'Dropdown'
};
var _default = exports["default"] = Dropdown;
