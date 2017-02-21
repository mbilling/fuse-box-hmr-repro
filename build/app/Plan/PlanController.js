"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var React = require('react');
var PlanView = require('./PlanView');
var PlanController = (function (_super) {
    __extends(PlanController, _super);
    function PlanController(props) {
        _super.call(this, props);
        this.state = {};
    }
    PlanController.prototype.render = function () {
        return React.createElement(PlanView, __assign({}, this.props));
    };
    return PlanController;
}(React.Component));
module.exports = PlanController;
//# sourceMappingURL=PlanController.js.map