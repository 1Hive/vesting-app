import './slicedToArray-cbf46938.js';
import './unsupportedIterableToArray-b9b63d70.js';
import React from 'react';
import './_commonjsHelpers-97e6d7b1.js';
import { P as PropTypes } from './index-097535f1.js';
import './defineProperty-a0480c32.js';
import './toConsumableArray-22f6e627.js';
import _styled from 'styled-components';
import './getPrototypeOf-49f616ae.js';
import './color.js';
import './components.js';
import './contains-component.js';
import './css.js';
import './dayjs.min-e57fb69a.js';
import './date.js';
import './miscellaneous.js';
import './environment.js';
import './font.js';
import './math-e6d0e93a.js';
import './characters.js';
import './format.js';
import './keycodes.js';
import './url.js';
import './web3.js';
import './provider-types.js';
import { GU } from './constants.js';
import './breakpoints.js';
import './springs.js';
import './text-styles.js';
import './theme-dark.js';
import './theme-light.js';
import './Theme.js';
import { _ as _extends } from './extends-db4f0c26.js';
import { _ as _objectWithoutProperties } from './objectWithoutProperties-234758e1.js';
import './use-inside.esm-850dc801.js';
import './isObject-4d8f8486.js';
import './Viewport-61a008be.js';
import './extends-fa1a31d0.js';
import 'react-dom';
import './renderprops-81576a3f.js';
import './_react_commonjs-external-3b63cae6.js';
import LoadingRing from './LoadingRing.js';
import './ToastHub.js';
import './index-85c2e35a.js';
import './RootPortal.js';
import FloatIndicator from './FloatIndicator.js';

var _StyledDiv = _styled("div").withConfig({
  displayName: "SyncIndicator___StyledDiv",
  componentId: "rvvma9-0"
})(["margin-left:", "px;"], function (p) {
  return p._css;
});

var _StyledSpan = _styled("span").withConfig({
  displayName: "SyncIndicator___StyledSpan",
  componentId: "rvvma9-1"
})(["white-space:nowrap"]);

function SyncIndicator(_ref) {
  var children = _ref.children,
      label = _ref.label,
      shift = _ref.shift,
      visible = _ref.visible,
      props = _objectWithoutProperties(_ref, ["children", "label", "shift", "visible"]);

  return /*#__PURE__*/React.createElement(FloatIndicator, _extends({
    visible: visible,
    shift: shift
  }, props), /*#__PURE__*/React.createElement(LoadingRing, null), /*#__PURE__*/React.createElement(_StyledDiv, {
    _css: 1.5 * GU
  }, children || /*#__PURE__*/React.createElement(_StyledSpan, null, label, " \uD83D\uDE4F")));
}

SyncIndicator.propTypes = {
  children: PropTypes.node,
  label: PropTypes.node,
  shift: PropTypes.number,
  visible: PropTypes.bool
};
SyncIndicator.defaultProps = {
  label: 'Syncing data…'
};

export default SyncIndicator;
//# sourceMappingURL=SyncIndicator.js.map
