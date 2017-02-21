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
var CreditCardView = require('./CreditCardView');
var CreditCardController = (function (_super) {
    __extends(CreditCardController, _super);
    function CreditCardController(props) {
        _super.call(this, props);
        this.state = {};
    }
    CreditCardController.prototype.onFieldChange = function (name, value) {
        this.state[name] = value;
        this.setState({
            displayError: false
        });
        this.forceUpdate();
    };
    CreditCardController.prototype.onBadCreditCard = function (error) {
        this.setState({
            displayError: true,
            errorMessage: error
        });
    };
    CreditCardController.prototype.render = function () {
        var _this = this;
        return React.createElement(CreditCardView, __assign({}, this.props, this.state, {onChange: this.onFieldChange.bind(this), onBadCreditCard: function (error) { _this.onBadCreditCard(error); }}));
    };
    return CreditCardController;
}(React.Component));
module.exports = CreditCardController;
//# sourceMappingURL=CreditCardController.js.map