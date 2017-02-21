"use strict";
var crypto = require('crypto');
var util = require('util');
var moment = require('moment');
var Freshdesk = (function () {
    function Freshdesk() {
    }
    Freshdesk.GetSsoUrl = function (redirectTo) {
        var name = Parse.User.current().getUsername().split('@')[0];
        var email = Parse.User.current().getUsername();
        var timeSecs = (moment().valueOf() / 1000).toString();
        var url = util.format("http://support.scitylana.com/login/sso?name=%s&email=%s&timestamp=%s&hash=%s&redirect_to=%s", encodeURIComponent(name), encodeURIComponent(email), timeSecs, Freshdesk.GetHash(Freshdesk.dummy, name, email, timeSecs), (redirectTo.indexOf('http://') == 0 ? '' : 'http://') + encodeURIComponent(redirectTo));
        return url;
    };
    Freshdesk.GetHash = function (secret, name, email, timeSecs) {
        var input = name + secret + email + timeSecs;
        var hmac = crypto.createHmac("md5", secret);
        hmac.update(input);
        var hash = hmac.digest("hex");
        return hash;
    };
    Freshdesk.dummy = 'a1981b73c5845d67e1113cb2d571380b';
    return Freshdesk;
}());
module.exports = Freshdesk;
//# sourceMappingURL=Freshdesk.js.map