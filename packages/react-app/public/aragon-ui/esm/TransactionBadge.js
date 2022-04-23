import './slicedToArray-cbf46938.js';
import './unsupportedIterableToArray-b9b63d70.js';
import React from 'react';
import './_commonjsHelpers-97e6d7b1.js';
import { P as PropTypes } from './index-097535f1.js';
import './defineProperty-a0480c32.js';
import './toConsumableArray-22f6e627.js';
import 'styled-components';
import './getPrototypeOf-49f616ae.js';
import './color.js';
import './components.js';
import './contains-component.js';
import './css.js';
import './dayjs.min-e57fb69a.js';
import './date.js';
import './miscellaneous.js';
import { warnOnce } from './environment.js';
import './font.js';
import './math-e6d0e93a.js';
import './characters.js';
import './format.js';
import './keycodes.js';
import './url.js';
import { isTransaction, blockExplorerUrl, shortenTransaction } from './web3.js';
import './provider-types.js';
import './constants.js';
import './breakpoints.js';
import './springs.js';
import './text-styles.js';
import './theme-dark.js';
import './theme-light.js';
import './Theme.js';
import './extends-db4f0c26.js';
import './objectWithoutProperties-234758e1.js';
import './use-inside.esm-850dc801.js';
import './FocusVisible.js';
import './ButtonBase.js';
import BadgeBase from './BadgeBase.js';

var TransactionBadge = React.memo(function TransactionBadge(_ref) {
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
    warnOnce('TransactionBadge:fontSize', 'The “fontSize” prop is deprecated. Please use “labelStyle” to style the label instead.');
  }

  if (background) {
    warnOnce('TransactionBadge:background', 'The “background” prop is deprecated. Please use “className” to style the badge instead.');
  }

  var isTx = isTransaction(transaction);
  var transactionUrl = isTx ? blockExplorerUrl('transaction', transaction, {
    networkType: networkType,
    provider: explorerProvider
  }) : '';
  var label = !isTx ? 'Invalid transaction' : shorten ? shortenTransaction(transaction) : transaction;
  return /*#__PURE__*/React.createElement(BadgeBase, {
    badgeOnly: true,
    disabled: disabled || !transactionUrl,
    href: transactionUrl,
    label: label,
    labelStyle: labelStyle,
    title: transaction
  });
});
TransactionBadge.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  explorerProvider: PropTypes.string,
  labelStyle: PropTypes.string,
  networkType: PropTypes.string,
  shorten: PropTypes.bool,
  style: PropTypes.object,
  transaction: PropTypes.string.isRequired,
  // Deprecated
  background: PropTypes.string,
  fontSize: PropTypes.string
};
TransactionBadge.defaultProps = {
  networkType: 'main',
  shorten: true
};

export default TransactionBadge;
//# sourceMappingURL=TransactionBadge.js.map
