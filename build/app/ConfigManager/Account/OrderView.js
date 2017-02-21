"use strict";
var React = require('react');
var react_bootstrap_1 = require('react-bootstrap');
var Plan = require('../../Plan/Product');
var OrderView = function (_a) {
    var planId = _a.planId;
    var plan = Plan.plans[planId];
    var total = plan.price;
    var unit = plan.unit == 'monthly' ? 'month' : 'year';
    return React.createElement(react_bootstrap_1.Grid, {fluid: true, style: {}}, 
        React.createElement(react_bootstrap_1.Row, null, 
            React.createElement(react_bootstrap_1.Col, {xs: 12}, 
                React.createElement("h4", null, "Your order")
            )
        ), 
        React.createElement(react_bootstrap_1.Row, null, 
            React.createElement(react_bootstrap_1.Col, {xs: 12}, 
                React.createElement("hr", null)
            )
        ), 
        React.createElement(react_bootstrap_1.Row, null, 
            React.createElement(react_bootstrap_1.Col, {xs: 8}, plan.invoiceName), 
            React.createElement(react_bootstrap_1.Col, {xs: 4}, 
                "$", 
                plan.price)), 
        React.createElement(react_bootstrap_1.Row, null, 
            React.createElement(react_bootstrap_1.Col, {xs: 12}, 
                React.createElement("hr", null)
            )
        ), 
        React.createElement(react_bootstrap_1.Row, null, 
            React.createElement(react_bootstrap_1.Col, {xs: 8}, 
                React.createElement("b", null, "Total")
            ), 
            React.createElement(react_bootstrap_1.Col, {xs: 4}, 
                React.createElement("b", null, 
                    "$", 
                    total), 
                React.createElement("br", null), 
                React.createElement("span", {className: "grey"}, "per " + unit))));
};
module.exports = OrderView;
//# sourceMappingURL=OrderView.js.map