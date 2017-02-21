"use strict";
var CustomerIO = (function () {
    function CustomerIO() {
    }
    CustomerIO.Identify = function () {
        return Parse.Cloud.run('cioIdentify');
    };
    return CustomerIO;
}());
module.exports = CustomerIO;
//# sourceMappingURL=CustomerIO.js.map