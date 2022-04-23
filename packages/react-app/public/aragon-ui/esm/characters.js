var NO_BREAK_SPACE = "\xA0";
var capitalize = function capitalize() {
  var s = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  if (!s) return '';
  return s[0].toUpperCase() + s.slice(1);
};

export { NO_BREAK_SPACE, capitalize };
//# sourceMappingURL=characters.js.map
