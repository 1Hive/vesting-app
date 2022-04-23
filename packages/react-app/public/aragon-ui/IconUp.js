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

function IconUp(_ref) {
  var _ref$size = _ref.size,
      size = _ref$size === void 0 ? undefined : _ref$size,
      props = objectWithoutProperties._objectWithoutProperties(_ref, ["size"]);

  var sizeValue = IconPropTypes.useIconSize(size);
  return /*#__PURE__*/React__default.createElement("svg", _extends._extends({
    width: sizeValue,
    height: sizeValue,
    fill: "none",
    viewBox: "0 0 24 24"
  }, props), /*#__PURE__*/React__default.createElement("path", {
    fill: "currentColor",
    d: "M5.215 15.219a.725.725 0 001.039 0L12 9.367l5.747 5.851a.725.725 0 001.038 0 .757.757 0 000-1.057l-6.266-6.38a.725.725 0 00-1.038 0l-6.266 6.38a.757.757 0 000 1.058z"
  }));
}

IconUp.propTypes = IconPropTypes.IconPropTypes;

exports.default = IconUp;
//# sourceMappingURL=IconUp.js.map