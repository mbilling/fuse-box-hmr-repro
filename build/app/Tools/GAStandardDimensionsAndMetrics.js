"use strict";
var GAStandardDimensionsAndMetrics = (function () {
    function GAStandardDimensionsAndMetrics(refreshToken, accountId, propertyId, profileId) {
        this.refreshToken = refreshToken;
        this.accountId = accountId;
        this.propertyId = propertyId;
        this.profileId = profileId;
    }
    GAStandardDimensionsAndMetrics.prototype.GetVariables = function () {
        return Parse.Cloud.run('getMetaData', {
            refreshToken: this.refreshToken,
            accountId: this.accountId,
            propertyId: this.propertyId,
            profileId: this.profileId
        });
    };
    return GAStandardDimensionsAndMetrics;
}());
module.exports = GAStandardDimensionsAndMetrics;
//# sourceMappingURL=GAStandardDimensionsAndMetrics.js.map