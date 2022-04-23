'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

require('./slicedToArray-80fbe817.js');
require('./unsupportedIterableToArray-781911ff.js');
var React = require('react');
var React__default = _interopDefault(React);
require('./_commonjsHelpers-72d386ba.js');
require('./index-b0606964.js');
require('./defineProperty-0921a47c.js');
require('styled-components');
require('./miscellaneous.js');
require('./environment.js');
require('./font.js');
require('./constants.js');
require('./breakpoints.js');
require('./springs.js');
require('./text-styles.js');
var _extends = require('./extends-40571110.js');
var objectWithoutProperties = require('./objectWithoutProperties-35db8ab0.js');
require('./use-inside.esm-67fe2799.js');
var IconPropTypes = require('./IconPropTypes-cd9f4a73.js');

function IconEllipsis(_ref) {
  var _ref$size = _ref.size,
      size = _ref$size === void 0 ? undefined : _ref$size,
      props = objectWithoutProperties._objectWithoutProperties(_ref, ["size"]);

  var sizeValue = IconPropTypes.useIconSize(size);
  return /*#__PURE__*/React__default.createElement("svg", _extends._extends({
    width: sizeValue,
    height: sizeValue,
    fill: "none",
    viewBox: "0 0 24 24"
  }, props), /*#__PURE__*/React__default.createElement("circle", {
    cx: 6,
    cy: 12,
    r: 1,
    fill: "currentColor"
  }), /*#__PURE__*/React__default.createElement("circle", {
    cx: 12,
    cy: 12,
    r: 1,
    fill: "currentColor"
  }), /*#__PURE__*/React__default.createElement("circle", {
    cx: 18,
    cy: 12,
    r: 1,
    fill: "currentColor"
  }));
}

IconEllipsis.propTypes = IconPropTypes.IconPropTypes;

exports.default = IconEllipsis;
//# sourceMappingURL=IconEllipsis.js.map
