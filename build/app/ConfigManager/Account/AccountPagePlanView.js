"use strict";
var React = require('react');
var react_bootstrap_1 = require('react-bootstrap');
var _ = require('lodash');
var PlanController = require('../../Plan/PlanController');
var Plan = require('../../Plan/Product');
var AccountPagePlanView = function (_a) {
    var planId = _a.planId, unit = _a.unit, showCancelConfirm = _a.showCancelConfirm, cancelReason = _a.cancelReason, onAction = _a.onAction, onSelectUnit = _a.onSelectUnit, onCancelPlan = _a.onCancelPlan, onConfirmedCancelPlan = _a.onConfirmedCancelPlan, onKeepPlan = _a.onKeepPlan, onChangeValue = _a.onChangeValue;
    var plans = [];
    _.each(Plan.plans, function (plan) {
        if (plan.visible && ['forever', unit].indexOf(plan.unit) != -1) {
            plans.push(plan);
        }
    });
    var orderedPlans = _.sortBy(plans, function (plan) { return plan.sortOrder; });
    var cancelConfirm = React.createElement(react_bootstrap_1.Modal, {show: showCancelConfirm, onHide: onKeepPlan, className: "modal-orange"}, 
        React.createElement(react_bootstrap_1.Modal.Header, {closeButton: true, className: "modal-header-orange"}, 
            React.createElement(react_bootstrap_1.Modal.Title, null, "PLEASE CONFIRM CANCELLATION...")
        ), 
        React.createElement(react_bootstrap_1.Modal.Body, null, 
            React.createElement("h4", null, "Do you really want to cancel your plan?"), 
            React.createElement("p", {style: { fontWeight: 100, fontSize: 13 }}, "If you cancel, we will not charge you any more. The remaining time on the plan is still valid."), 
            React.createElement("br", null), 
            React.createElement(react_bootstrap_1.FormGroup, {controlId: "cancelReason", name: "cancelReason"}, 
                React.createElement(react_bootstrap_1.Row, null, 
                    React.createElement(react_bootstrap_1.Col, {xs: 12}, 
                        React.createElement(react_bootstrap_1.ControlLabel, {style: { fontWeight: 100 }}, "Please, provide us with some feedback:"), 
                        React.createElement(react_bootstrap_1.FormControl, {componentClass: "textarea", value: cancelReason, placeholder: "The reason I cancel my plan is...", onChange: function (event) { onChangeValue('cancelReason', event.target['value']); }, multiple: true}))
                )
            )), 
        React.createElement(react_bootstrap_1.Modal.Footer, null, 
            React.createElement(react_bootstrap_1.Button, {bsStyle: "orange", style: { float: 'right' }, onClick: onConfirmedCancelPlan}, "YES"), 
            React.createElement(react_bootstrap_1.Button, {bsStyle: "link", style: { float: 'right' }, onClick: onKeepPlan}, "NO")));
    return React.createElement(react_bootstrap_1.Grid, {fluid: true, style: { padding: 0 }}, 
        cancelConfirm, 
        React.createElement(react_bootstrap_1.Row, null, 
            React.createElement(react_bootstrap_1.Col, {xs: 12, style: { textAlign: 'center', maxWidth: 1080 }}, 
                React.createElement(react_bootstrap_1.Button, {className: unit == 'annually' ? 'selectedPlanInterval' : 'planInterval', bsStyle: unit == 'annually' ? 'primary' : null, onClick: function () { onSelectUnit('annually'); }}, "ANNUALLY"), 
                React.createElement(react_bootstrap_1.Button, {className: unit == 'monthly' ? 'selectedPlanInterval' : 'planInterval', bsStyle: unit == 'monthly' ? 'primary' : null, onClick: function () { onSelectUnit('monthly'); }}, "MONTHLY"))
        ), 
        React.createElement(react_bootstrap_1.Row, null, 
            React.createElement(react_bootstrap_1.Col, {xs: 12}, " ")
        ), 
        React.createElement(react_bootstrap_1.Row, null, 
            React.createElement(react_bootstrap_1.Col, {xs: 12, className: "plans"}, orderedPlans.map(function (plan) {
                var pitch = plan.unit == 'forever' ? '' : plan.pitch;
                var price = plan.unit == 'forever' ? 'FREE' : '$' + (plan.unit == 'annually' ? plan.price / 12 : plan.price);
                return React.createElement("div", {className: "planWrapper", style: { float: 'left' }}, 
                    React.createElement(PlanController, {actionEnabled: true, highlighted: false, selected: planId == plan.id, id: plan.id, name: plan.name, pitch: pitch, description: plan.description, price: price, unit: plan.unit, actionText: planId == plan.id ? 'CANCEL PLAN' : 'CHOOSE PLAN', onAction: function () { planId == plan.id ? onCancelPlan() : onAction(plan.id); }, selectedText: 'CURRENT PLAN', features: plan.features})
                );
            }))
        ));
};
module.exports = AccountPagePlanView;
//# sourceMappingURL=AccountPagePlanView.js.map