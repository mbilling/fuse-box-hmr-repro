"use strict";
var GoogleAnalytics = require('../../GoogleAnalytics.Management');
var GACustomDimensionsAndMetrics = (function () {
    function GACustomDimensionsAndMetrics(refreshToken, accountId, propertyId, profileId) {
        this.refreshToken = refreshToken;
        this.accountId = accountId;
        this.propertyId = propertyId;
        this.profileId = profileId;
    }
    GACustomDimensionsAndMetrics.prototype.GetVariables = function () {
        var promise = new Parse.Promise();
        var variables = {};
        var promises = [
            this.getItems('https://www.googleapis.com/analytics/v3/management/accounts/' + this.accountId + '/webproperties/' + this.propertyId + '/customDimensions', variables),
            this.getItems('https://www.googleapis.com/analytics/v3/management/accounts/' + this.accountId + '/webproperties/' + this.propertyId + '/customMetrics', variables),
            this.getItems('https://www.googleapis.com/analytics/v3/management/accounts/' + this.accountId + '/webproperties/' + this.propertyId + '/profiles/' + this.profileId + '/goals', variables)
        ];
        Parse.Promise.when(promises).then(function () {
            variables['dimensions'] = arguments[0][0];
            variables['metrics'] = arguments[0][1];
            variables['goals'] = arguments[0][2];
            promise.resolve(variables);
        }.bind(this));
        return promise;
    };
    GACustomDimensionsAndMetrics.prototype.getItems = function (url, variables) {
        var promise = new Parse.Promise();
        GoogleAnalytics.API.Token.CallAPI(url, this.refreshToken)
            .then(function (result) {
            var variables = [];
            for (var i = 0; i < result.items.length; i++) {
                var newItem = {
                    id: result.items[i].id,
                    name: result.items[i].name
                };
                variables.push(newItem);
            }
            promise.resolve(variables);
        }.bind(this), function (reason) {
            console.warn(JSON.stringify(reason));
            promise.reject(reason);
        });
        return promise;
    };
    return GACustomDimensionsAndMetrics;
}());
module.exports = GACustomDimensionsAndMetrics;
//# sourceMappingURL=GACustomDimensionsAndMetrics.js.map