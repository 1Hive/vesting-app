'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

require('./slicedToArray-80fbe817.js');
require('./unsupportedIterableToArray-781911ff.js');
var React = require('react');
var React__default = _interopDefault(React);
require('./_commonjsHelpers-72d386ba.js');
var index = require('./index-b0606964.js');
require('./extends-40571110.js');
require('./objectWithoutProperties-35db8ab0.js');
var reactDom = _interopDefault(require('react-dom'));
var index$1 = require('./index-d3b14784.js');

var RootPortal = function RootPortal(props) {
  return /*#__PURE__*/React__default.createElement(index$1.Root, null, function (rootElement) {
    if (!rootElement) {
      throw new Error('<RootPortal> needs to be nested in <Root.Provider>. Have you declared <Main>?');
    }

    return reactDom.createPortal(props.children, rootElement);
  });
};

RootPortal.propTypes = {
  children: index.PropTypes.node.isRequired
};

exports.default = RootPortal;
//# sourceMappingURL=RootPortal.js.map
