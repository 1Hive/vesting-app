import './slicedToArray-cbf46938.js';
import './unsupportedIterableToArray-b9b63d70.js';
import React from 'react';
import './_commonjsHelpers-97e6d7b1.js';
import { P as PropTypes } from './index-097535f1.js';
import { _ as _defineProperty } from './defineProperty-a0480c32.js';
import './toConsumableArray-22f6e627.js';
import _styled from 'styled-components';
import './getPrototypeOf-49f616ae.js';
import './color.js';
import './components.js';
import './contains-component.js';
import { cssPx } from './css.js';
import './dayjs.min-e57fb69a.js';
import './date.js';
import { noop } from './miscellaneous.js';
import './environment.js';
import './font.js';
import './math-e6d0e93a.js';
import './characters.js';
import './format.js';
import './keycodes.js';
import './url.js';
import './web3.js';
import './provider-types.js';
import { BIG_RADIUS, GU } from './constants.js';
import './breakpoints.js';
import { springs } from './springs.js';
import './text-styles.js';
import './theme-dark.js';
import './theme-light.js';
import { useTheme } from './Theme.js';
import { _ as _extends } from './extends-db4f0c26.js';
import { _ as _objectWithoutProperties } from './objectWithoutProperties-234758e1.js';
import './use-inside.esm-850dc801.js';
import './isObject-4d8f8486.js';
import { u as useViewport } from './Viewport-61a008be.js';
import './Layout.js';
import './FocusVisible.js';
import './ButtonBase.js';
import './IconPropTypes-35e199bf.js';
import './IconAddUser.js';
import './IconAlert.js';
import './IconAlignCenter.js';
import './IconAlignJustify.js';
import './IconAlignLeft.js';
import './IconAlignRight.js';
import './IconAragon.js';
import './IconArrowDown.js';
import './IconArrowLeft.js';
import './IconArrowRight.js';
import './IconArrowUp.js';
import './IconAtSign.js';
import './IconBlock.js';
import './IconBookmark.js';
import './IconCalendar.js';
import './IconCanvas.js';
import './IconCaution.js';
import './IconCenter.js';
import './IconChart.js';
import './IconChat.js';
import './IconCheck.js';
import './IconChip.js';
import './IconCircleCheck.js';
import './IconCircleMinus.js';
import './IconCirclePlus.js';
import './IconClock.js';
import './IconCloudDownload.js';
import './IconCloudUpload.js';
import './IconCoin.js';
import './IconConfiguration.js';
import './IconConnect.js';
import './IconConnection.js';
import './IconConsole.js';
import './IconCopy.js';
import IconClose from './IconCross.js';
import './IconDashedSquare.js';
import './IconDown.js';
import './IconDownload.js';
import './IconEdit.js';
import './IconEllipsis.js';
import './IconEnter.js';
import './IconEthereum.js';
import './IconExternal.js';
import './IconFile.js';
import './IconFilter.js';
import './IconFlag.js';
import './IconFolder.js';
import './IconGraph2.js';
import './IconGraph.js';
import './IconGrid.js';
import './IconGroup.js';
import './IconHash.js';
import './IconHeart.js';
import './IconHide.js';
import './IconHome.js';
import './IconImage.js';
import './IconInfo.js';
import './IconLabel.js';
import './IconLayers.js';
import './IconLeft.js';
import './IconLink.js';
import './IconLocation.js';
import './IconLock.js';
import './IconMail.js';
import './IconMaximize.js';
import './IconMenu.js';
import './IconMinimize.js';
import './IconMinus.js';
import './IconMove.js';
import './IconNoPicture.js';
import './IconPicture.js';
import './IconPlus.js';
import './IconPower.js';
import './IconPrint.js';
import './IconProhibited.js';
import './IconQuestion.js';
import './IconRefresh.js';
import './IconRemoveUser.js';
import './IconRight.js';
import './IconRotateLeft.js';
import './IconRotateRight.js';
import './IconSearch.js';
import './IconSettings.js';
import './IconShare.js';
import './IconSquareMinus.js';
import './IconSquarePlus.js';
import './IconSquare.js';
import './IconStarFilled.js';
import './IconStar.js';
import './IconSwap.js';
import './IconTarget.js';
import './IconToken.js';
import './IconTrash.js';
import './IconUnlock.js';
import './IconUp.js';
import './IconUpload.js';
import './IconUser.js';
import './IconView.js';
import './IconVote.js';
import './IconWallet.js';
import './IconWarning.js';
import './IconWorld.js';
import './IconWrite.js';
import './IconZoomIn.js';
import './IconZoomOut.js';
import './extends-fa1a31d0.js';
import 'react-dom';
import { r as renderprops_7, b as renderprops_3 } from './renderprops-81576a3f.js';
import './_react_commonjs-external-3b63cae6.js';
import './Button.js';
import ButtonIcon from './ButtonIcon.js';
import './index-85c2e35a.js';
import RootPortal from './RootPortal.js';
import EscapeOutside from './EscapeOutside.js';

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var SPACE_AROUND = 4 * GU;

var _StyledAnimatedDiv = _styled(renderprops_7.div).withConfig({
  displayName: "Modal___StyledAnimatedDiv",
  componentId: "zpm1g8-0"
})(["position:fixed;top:0;left:0;right:0;bottom:0;background:", ";"], function (p) {
  return p._css;
});

var _StyledAnimatedDiv2 = _styled(renderprops_7.div).withConfig({
  displayName: "Modal___StyledAnimatedDiv2",
  componentId: "zpm1g8-1"
})(["position:absolute;z-index:1;top:0;left:0;right:0;bottom:0;display:grid;align-items:center;justify-content:center;overflow:auto;"]);

var _StyledDiv = _styled("div").withConfig({
  displayName: "Modal___StyledDiv",
  componentId: "zpm1g8-2"
})(["padding:", "px 0;"], SPACE_AROUND);

var _StyledEscapeOutside = _styled(EscapeOutside).withConfig({
  displayName: "Modal___StyledEscapeOutside",
  componentId: "zpm1g8-3"
})(["position:relative;overflow:hidden;min-width:", "px;background:", ";box-shadow:0 10px 28px rgba(0,0,0,0.15);"], function (p) {
  return p._css2;
}, function (p) {
  return p._css3;
});

var _StyledButtonIcon = _styled(ButtonIcon).withConfig({
  displayName: "Modal___StyledButtonIcon",
  componentId: "zpm1g8-4"
})(["position:absolute;z-index:2;top:", "px;right:", "px;"], function (p) {
  return p._css4;
}, function (p) {
  return p._css5;
});

var _StyledDiv2 = _styled("div").withConfig({
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
      props = _objectWithoutProperties(_ref, ["children", "onClose", "onClosed", "padding", "visible", "width", "closeButton"]);

  var theme = useTheme();
  var viewport = useViewport();
  return /*#__PURE__*/React.createElement(RootPortal, null, /*#__PURE__*/React.createElement(renderprops_3, {
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
    config: _objectSpread({}, springs.smooth, {
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
      return /*#__PURE__*/React.createElement(_StyledAnimatedDiv, _extends({
        style: {
          opacity: opacity
        }
      }, props, {
        _css: theme.overlay.alpha(0.9)
      }), /*#__PURE__*/React.createElement(_StyledAnimatedDiv2, {
        style: {
          pointerEvents: visible ? 'auto' : 'none',
          transform: scale.interpolate(function (v) {
            return "scale3d(".concat(v, ", ").concat(v, ", 1)");
          })
        }
      }, /*#__PURE__*/React.createElement(_StyledDiv, null, /*#__PURE__*/React.createElement(_StyledEscapeOutside, {
        role: "alertdialog",
        useCapture: true,
        background: theme.surface,
        onEscapeOutside: onClose,
        style: {
          width: cssPx(typeof width === 'function' ? width(viewport) : width),
          borderRadius: "".concat(BIG_RADIUS, "px")
        },
        _css2: 360 - SPACE_AROUND * 2,
        _css3: theme.surface
      }, closeButton && /*#__PURE__*/React.createElement(_StyledButtonIcon, {
        label: "Close",
        onClick: onClose,
        _css4: 2 * GU,
        _css5: 2 * GU
      }, /*#__PURE__*/React.createElement(IconClose, null)), /*#__PURE__*/React.createElement(_StyledDiv2, {
        style: {
          padding: cssPx(typeof padding === 'function' ? padding(viewport) : padding)
        }
      }, children)))));
    };
  }
  /* eslint-enable react/prop-types */
  ));
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  closeButton: PropTypes.bool,
  onClose: PropTypes.func,
  onClosed: PropTypes.func,
  padding: PropTypes.oneOfType([PropTypes.func, PropTypes.number, PropTypes.string]),
  visible: PropTypes.bool.isRequired,
  width: PropTypes.oneOfType([PropTypes.func, PropTypes.number, PropTypes.string])
};
Modal.defaultProps = {
  closeButton: true,
  onClose: noop,
  onClosed: noop,
  padding: 3 * GU,
  width: function width(viewport) {
    return Math.min(viewport.width - SPACE_AROUND * 2, 600);
  }
};

export default Modal;
//# sourceMappingURL=Modal.js.map