(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root["mu-jquery-widget-utils/jquery"] = factory();
  }
})(this, function () {
  var map = Array.prototype.map;
  var blueprints = {};
  var jq = /^(?:children|closest|contents|find|next(?:All|Until)?|parent(?:s|sUntil)?|prev(?:Until)?|siblings)$/;

  function blueprint(method) {
    return blueprints[method] || (blueprints[method] = {
      "key": method,
      "value": function () {
        var me = this;
        var $element = me.$element;
        var result = $element[method].apply($element, arguments);
        return !jq.test(method) && result instanceof $element.constructor ? me : result;
      }
    });
  }

  return function () {
    return map.call(arguments, blueprint);
  }
});