'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

require('./slicedToArray-80fbe817.js');
require('./unsupportedIterableToArray-781911ff.js');
var React = require('react');
var React__default = _interopDefault(React);
require('./_commonjsHelpers-72d386ba.js');
var index = require('./index-b0606964.js');
require('./defineProperty-0921a47c.js');
require('./toConsumableArray-b9d88e95.js');
require('styled-components');
require('./getPrototypeOf-236fce8e.js');
require('./color.js');
require('./components.js');
require('./contains-component.js');
require('./css.js');
require('./dayjs.min-e07657bf.js');
require('./date.js');
require('./miscellaneous.js');
var environment = require('./environment.js');
require('./font.js');
require('./math-f4029164.js');
require('./characters.js');
require('./format.js');
require('./keycodes.js');
require('./url.js');
var web3 = require('./web3.js');
require('./provider-types.js');
require('./constants.js');
require('./breakpoints.js');
require('./springs.js');
require('./text-styles.js');
require('./theme-dark.js');
require('./theme-light.js');
require('./Theme.js');
require('./extends-40571110.js');
require('./objectWithoutProperties-35db8ab0.js');
require('./use-inside.esm-67fe2799.js');
require('./FocusVisible.js');
require('./ButtonBase.js');
var BadgeBase = require('./BadgeBase.js');

var TransactionBadge = React__default.memo(function TransactionBadge(_ref) {
  var className = _ref.className,
      disabled = _ref.disabled,
      explorerProvider = _ref.explorerProvider,
      labelStyle = _ref.labelStyle,
      networkType = _ref.networkType,
      shorten = _ref.shorten,
      style = _ref.style,
      transaction = _ref.transaction,
      background = _ref.background,
      fontSize = _ref.fontSize;

  if (fontSize) {
    environment.warnOnce('TransactionBadge:fontSize', 'The “fontSize” prop is deprecated. Please use “labelStyle” to style the label instead.');
  }

  if (background) {
    environment.warnOnce('TransactionBadge:background', 'The “background” prop is deprecated. Please use “className” to style the badge instead.');
  }

  var isTx = web3.isTransaction(transaction);
  var transactionUrl = isTx ? web3.blockExplorerUrl('transaction', transaction, {
    networkType: networkType,
    provider: explorerProvider
  }) : '';
  var label = !isTx ? 'Invalid transaction' : shorten ? web3.shortenTransaction(transaction) : transaction;
  return /*#__PURE__*/React__default.createElement(BadgeBase.default, {
    badgeOnly: true,
    disabled: disabled || !transactionUrl,
    href: transactionUrl,
    label: label,
    labelStyle: labelStyle,
    title: transaction
  });
});
TransactionBadge.propTypes = {
  className: index.PropTypes.string,
  disabled: index.PropTypes.bool,
  explorerProvider: index.PropTypes.string,
  labelStyle: index.PropTypes.string,
  networkType: index.PropTypes.string,
  shorten: index.PropTypes.bool,
  style: index.PropTypes.object,
  transaction: index.PropTypes.string.isRequired,
  // Deprecated
  background: index.PropTypes.string,
  fontSize: index.PropTypes.string
};
TransactionBadge.defaultProps = {
  networkType: 'main',
  shorten: true
};

exports.default = TransactionBadge;
//# sourceMappingURL=TransactionBadge.js.map
