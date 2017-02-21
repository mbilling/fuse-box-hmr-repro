"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var React = require('react');
var react_bootstrap_1 = require('react-bootstrap');
var CreditCardController = require('./CreditCardController');
var OrderView = require('./OrderView');
var AccountPlanCheckoutView = function (props) {
    var planId = props.planId, onSubscribe = props.onSubscribe, subscribing = props.subscribing;
    return React.createElement(react_bootstrap_1.Grid, {fluid: true, style: { marginLeft: 8 }}, 
        React.createElement(react_bootstrap_1.Row, null, 
            React.createElement(react_bootstrap_1.Col, {xs: 12}, 
                React.createElement("h2", null, "Complete your order")
            )
        ), 
        React.createElement(react_bootstrap_1.Row, null, 
            React.createElement(react_bootstrap_1.Col, {xs: 12, sm: 6, md: 5, lg: 4}, 
                React.createElement(OrderView, __assign({}, props))
            ), 
            React.createElement(react_bootstrap_1.Col, {xs: 12, sm: 6, md: 5, lg: 4}, 
                React.createElement(CreditCardController, __assign({}, props))
            )));
};
module.exports = AccountPlanCheckoutView;
//# sourceMappingURL=AccountPlanCheckoutView.js.map