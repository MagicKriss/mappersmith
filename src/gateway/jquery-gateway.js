var Utils = require('../utils');
var Gateway = require('../gateway');

var JQueryGateway = function() {
  return Gateway.apply(this, arguments);
}

JQueryGateway.prototype = Utils.extend({}, Gateway.prototype, {

  get: function() {
    var defaults = {dataType: "json", url: this.url};
    var config = Utils.extend(defaults, this.opts);

    if (window.jQuery === undefined) {
      throw new Utils.Exception(
        'JQueryGateway#get requires jQuery but it was not found! ' +
        'Change the gateway implementation or add jQuery on the page'
      );
    }

    jQuery.ajax(config).
    done(function() { this.successCallback.apply(this, arguments) }.bind(this)).
    fail(function() { this.failCallback.apply(this, arguments) }.bind(this)).
    always(function() { this.completeCallback.apply(this, arguments) }.bind(this));

    return this;
  }

});

module.exports = JQueryGateway;
