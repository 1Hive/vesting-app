import { _ as _slicedToArray } from './slicedToArray-cbf46938.js';
import './unsupportedIterableToArray-b9b63d70.js';
import { P as PropTypes } from './index-097535f1.js';
import './defineProperty-a0480c32.js';
import 'styled-components';
import './miscellaneous.js';
import './environment.js';
import './font.js';
import { GU } from './constants.js';
import './breakpoints.js';
import './springs.js';
import './text-styles.js';
import { u as useInside } from './use-inside.esm-850dc801.js';

var ICON_SIZES = new Map([['large', 6 * GU], ['medium', 3 * GU], ['small', 2 * GU], ['tiny', 1.75 * GU]]); // Mapping of button size => icon size

var BUTTON_ICON_SIZES = new Map([['medium', 'medium'], ['small', 'medium'], ['mini', 'small']]);

function useIconSize(size) {
  var _useInside = useInside('Button:icon'),
      _useInside2 = _slicedToArray(_useInside, 2),
      insideButtonIcon = _useInside2[0],
      buttonData = _useInside2[1]; // If no size is set on the icon, and it is inside
  // a Button icon slot, adapt it to the size of the button.


  var sizeName = !size && insideButtonIcon ? BUTTON_ICON_SIZES.get(buttonData.size) : size;
  return ICON_SIZES.get(sizeName || 'medium');
}

var IconPropTypes = {
  size: PropTypes.oneOf(['large', 'medium', 'small', 'tiny'])
};

export { IconPropTypes as I, useIconSize as u };
//# sourceMappingURL=IconPropTypes-35e199bf.js.map
