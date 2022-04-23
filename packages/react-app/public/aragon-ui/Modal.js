'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

require('./slicedToArray-80fbe817.js');
require('./unsupportedIterableToArray-781911ff.js');
var React = require('react');
var React__default = _interopDefault(React);
require('./_commonjsHelpers-72d386ba.js');
var index = require('./index-b0606964.js');
var defineProperty$1 = require('./defineProperty-0921a47c.js');
require('./toConsumableArray-b9d88e95.js');
var _styled = require('styled-components');
var _styled__default = _interopDefault(_styled);
require('./getPrototypeOf-236fce8e.js');
require('./color.js');
require('./components.js');
require('./contains-component.js');
var css = require('./css.js');
require('./dayjs.min-e07657bf.js');
require('./date.js');
var miscellaneous = require('./miscellaneous.js');
require('./environment.js');
require('./font.js');
require('./math-f4029164.js');
require('./characters.js');
require('./format.js');
require('./keycodes.js');
require('./url.js');
require('./web3.js');
require('./provider-types.js');
var constants = require('./constants.js');
require('./breakpoints.js');
var springs = require('./springs.js');
require('./text-styles.js');
require('./theme-dark.js');
require('./theme-light.js');
var Theme = require('./Theme.js');
var _extends$1 = require('./extends-40571110.js');
var objectWithoutProperties = require('./objectWithoutProperties-35db8ab0.js');
require('./use-inside.esm-67fe2799.js');
require('./isObject-3aeecfdc.js');
var Viewport = require('./Viewport-b007646a.js');
require('./Layout.js');
require('./FocusVisible.js');
require('./ButtonBase.js');
require('./IconPropTypes-cd9f4a73.js');
require('./IconAddUser.js');
require('./IconAlert.js');
require('./IconAlignCenter.js');
require('./IconAlignJustify.js');
require('./IconAlignLeft.js');
require('./IconAlignRight.js');
require('./IconAragon.js');
require('./IconArrowDown.js');
require('./IconArrowLeft.js');
require('./IconArrowRight.js');
require('./IconArrowUp.js');
require('./IconAtSign.js');
require('./IconBlock.js');
require('./IconBookmark.js');
require('./IconCalendar.js');
require('./IconCanvas.js');
require('./IconCaution.js');
require('./IconCenter.js');
require('./IconChart.js');
require('./IconChat.js');
require('./IconCheck.js');
require('./IconChip.js');
require('./IconCircleCheck.js');
require('./IconCircleMinus.js');
require('./IconCirclePlus.js');
require('./IconClock.js');
require('./IconCloudDownload.js');
require('./IconCloudUpload.js');
require('./IconCoin.js');
require('./IconConfiguration.js');
require('./IconConnect.js');
require('./IconConnection.js');
require('./IconConsole.js');
require('./IconCopy.js');
var IconCross = require('./IconCross.js');
require('./IconDashedSquare.js');
require('./IconDown.js');
require('./IconDownload.js');
require('./IconEdit.js');
require('./IconEllipsis.js');
require('./IconEnter.js');
require('./IconEthereum.js');
require('./IconExternal.js');
require('./IconFile.js');
require('./IconFilter.js');
require('./IconFlag.js');
require('./IconFolder.js');
require('./IconGraph2.js');
require('./IconGraph.js');
require('./IconGrid.js');
require('./IconGroup.js');
require('./IconHash.js');
require('./IconHeart.js');
require('./IconHide.js');
require('./IconHome.js');
require('./IconImage.js');
require('./IconInfo.js');
require('./IconLabel.js');
require('./IconLayers.js');
require('./IconLeft.js');
require('./IconLink.js');
require('./IconLocation.js');
require('./IconLock.js');
require('./IconMail.js');
require('./IconMaximize.js');
require('./IconMenu.js');
require('./IconMinimize.js');
require('./IconMinus.js');
require('./IconMove.js');
require('./IconNoPicture.js');
require('./IconPicture.js');
require('./IconPlus.js');
require('./IconPower.js');
require('./IconPrint.js');
require('./IconProhibited.js');
require('./IconQuestion.js');
require('./IconRefresh.js');
require('./IconRemoveUser.js');
require('./IconRight.js');
require('./IconRotateLeft.js');
require('./IconRotateRight.js');
require('./IconSearch.js');
require('./IconSettings.js');
require('./IconShare.js');
require('./IconSquareMinus.js');
require('./IconSquarePlus.js');
require('./IconSquare.js');
require('./IconStarFilled.js');
require('./IconStar.js');
require('./IconSwap.js');
require('./IconTarget.js');
require('./IconToken.js');
require('./IconTrash.js');
require('./IconUnlock.js');
require('./IconUp.js');
require('./IconUpload.js');
require('./IconUser.js');
require('./IconView.js');
require('./IconVote.js');
require('./IconWallet.js');
require('./IconWarning.js');
require('./IconWorld.js');
require('./IconWrite.js');
require('./IconZoomIn.js');
require('./IconZoomOut.js');
require('./extends-0eb3452f.js');
require('react-dom');
var renderprops = require('./renderprops-da2e8547.js');
require('./_react_commonjs-external-bf8fc71c.js');
require('./Button.js');
var ButtonIcon = require('./ButtonIcon.js');
require('./index-d3b14784.js');
var RootPortal = require('./RootPortal.js');
var EscapeOutside = require('./EscapeOutside.js');

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { defineProperty$1._defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var SPACE_AROUND = 4 * constants.GU;

var _StyledAnimatedDiv = _styled__default(renderprops.renderprops_7.div).withConfig({
  displayName: "Modal___StyledAnimatedDiv",
  componentId: "zpm1g8-0"
})(["position:fixed;top:0;left:0;right:0;bottom:0;background:", ";"], function (p) {
  return p._css;
});

var _StyledAnimatedDiv2 = _styled__default(renderprops.renderprops_7.div).withConfig({
  displayName: "Modal___StyledAnimatedDiv2",
  componentId: "zpm1g8-1"
})(["position:absolute;z-index:1;top:0;left:0;right:0;bottom:0;display:grid;align-items:center;justify-content:center;overflow:auto;"]);

var _StyledDiv = _styled__default("div").withConfig({
  displayName: "Modal___StyledDiv",
  componentId: "zpm1g8-2"
})(["padding:", "px 0;"], SPACE_AROUND);

var _StyledEscapeOutside = _styled__default(EscapeOutside.default).withConfig({
  displayName: "Modal___StyledEscapeOutside",
  componentId: "zpm1g8-3"
})(["position:relative;overflow:hidden;min-width:", "px;background:", ";box-shadow:0 10px 28px rgba(0,0,0,0.15);"], function (p) {
  return p._css2;
}, function (p) {
  return p._css3;
});

var _StyledButtonIcon = _styled__default(ButtonIcon.default).withConfig({
  displayName: "Modal___StyledButtonIcon",
  componentId: "zpm1g8-4"
})(["position:absolute;z-index:2;top:", "px;right:", "px;"], function (p) {
  return p._css4;
}, function (p) {
  return p._css5;
});

var _StyledDiv2 = _styled__default("div").withConfig({
  displayName: "Modal___StyledDiv2",
  componentId: "zpm1g8-5"
})(["position:relative;z-index:1;"]);

function Modal(_ref) {
  var _ref$children = _ref.children,
      children = _ref$children === void 0 ? undefined : _ref$children,
      _ref$onClose = _ref.onClose,
      onClose = _ref$onClose === void 0 ? function () {} : _ref$onClose,
      _ref$onClosed = _ref.onClosed,
      onClosed = _ref$onClosed === void 0 ? function () {} : _ref$onClosed,
      _ref$padding = _ref.padding,
      padding = _ref$padding === void 0 ? undefined : _ref$padding,
      _ref$visible = _ref.visible,
      visible = _ref$visible === void 0 ? undefined : _ref$visible,
      _ref$width = _ref.width,
      width = _ref$width === void 0 ? undefined : _ref$width,
      _ref$closeButton = _ref.closeButton,
      closeButton = _ref$closeButton === void 0 ? undefined : _ref$closeButton,
      props = objectWithoutProperties._objectWithoutProperties(_ref, ["children", "onClose", "onClosed", "padding", "visible", "width", "closeButton"]);

  var theme = Theme.useTheme();
  var viewport = Viewport.useViewport();
  return /*#__PURE__*/React__default.createElement(RootPortal.default, null, /*#__PURE__*/React__default.createElement(renderprops.renderprops_3, {
    native: true,
    items: visible,
    from: {
      opacity: 0,
      scale: 0.98
    },
    enter: {
      opacity: 1,
      scale: 1
    },
    leave: {
      opacity: 0,
      scale: 0.98
    },
    config: _objectSpread({}, springs.springs.smooth, {
      precision: 0.001
    }),
    onDestroyed: function onDestroyed(destroyed) {
      destroyed && onClosed();
    }
  }, function (show) {
    return show &&
    /* eslint-disable react/prop-types */
    function (_ref2) {
      var opacity = _ref2.opacity,
          scale = _ref2.scale;
      return /*#__PURE__*/React__default.createElement(_StyledAnimatedDiv, _extends$1._extends({
        style: {
          opacity: opacity
        }
      }, props, {
        _css: theme.overlay.alpha(0.9)
      }), /*#__PURE__*/React__default.createElement(_StyledAnimatedDiv2, {
        style: {
          pointerEvents: visible ? 'auto' : 'none',
          transform: scale.interpolate(function (v) {
            return "scale3d(".concat(v, ", ").concat(v, ", 1)");
          })
        }
      }, /*#__PURE__*/React__default.createElement(_StyledDiv, null, /*#__PURE__*/React__default.createElement(_StyledEscapeOutside, {
        role: "alertdialog",
        useCapture: true,
        background: theme.surface,
        onEscapeOutside: onClose,
        style: {
          width: css.cssPx(typeof width === 'function' ? width(viewport) : width),
          borderRadius: "".concat(constants.BIG_RADIUS, "px")
        },
        _css2: 360 - SPACE_AROUND * 2,
        _css3: theme.surface
      }, closeButton && /*#__PURE__*/React__default.createElement(_StyledButtonIcon, {
        label: "Close",
        onClick: onClose,
        _css4: 2 * constants.GU,
        _css5: 2 * constants.GU
      }, /*#__PURE__*/React__default.createElement(IconCross.default, null)), /*#__PURE__*/React__default.createElement(_StyledDiv2, {
        style: {
          padding: css.cssPx(typeof padding === 'function' ? padding(viewport) : padding)
        }
      }, children)))));
    };
  }
  /* eslint-enable react/prop-types */
  ));
}

Modal.propTypes = {
  children: index.PropTypes.node.isRequired,
  closeButton: index.PropTypes.bool,
  onClose: index.PropTypes.func,
  onClosed: index.PropTypes.func,
  padding: index.PropTypes.oneOfType([index.PropTypes.func, index.PropTypes.number, index.PropTypes.string]),
  visible: index.PropTypes.bool.isRequired,
  width: index.PropTypes.oneOfType([index.PropTypes.func, index.PropTypes.number, index.PropTypes.string])
};
Modal.defaultProps = {
  closeButton: true,
  onClose: miscellaneous.noop,
  onClosed: miscellaneous.noop,
  padding: 3 * constants.GU,
  width: function width(viewport) {
    return Math.min(viewport.width - SPACE_AROUND * 2, 600);
  }
};

exports.default = Modal;
//# sourceMappingURL=Modal.js.map