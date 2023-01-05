"use strict";

var _require = require("nothing-mock"),
  Nothing = _require.Nothing,
  isNothing = _require.isNothing;

var win = typeof window !== "undefined" ? window : Nothing;
var doc = typeof document !== "undefined" ? document : Nothing;
var loc = typeof location !== "undefined" ? location : Nothing;
var nav = typeof navigator !== "undefined" ? navigator : Nothing;

module.exports.window = win;
module.exports.document = doc;
module.exports.location = loc;
module.exports.navigator = nav;
module.exports.exists = function (variable) {
  return !isNothing(variable);
};
