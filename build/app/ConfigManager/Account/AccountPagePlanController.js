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
var Parse = require("parse");
var AccountPagePlanView = require('./AccountPagePlanView');
var AccountPlanCheckoutView = require('./AccountPlanCheckoutView');
var AccountPageInformationController = require('./AccountPageInformationController');
var Plan = require('../../Plan/Product');
var AccountPagePlanController = (function (_super) {
    __extends(AccountPagePlanController, _super);
    function AccountPagePlanController(props) {
        _super.call(this, props);
        this.state = {
            planId: null,
            viewMode: 'default',
            unit: 'annually'
        };
        this.getPlanId();
    }
    AccountPagePlanController.prototype.getPlanId = function () {
        Parse.Cloud.run('getActivePlan', {})
            .then(function (plan) {
            if (!!plan) {
                var unit = Plan.plans[plan.id].unit;
                this.setState({
                    planId: plan.id,
                    unit: unit
                });
            }
            else {
                this.setState({
                    planId: 'free'
                });
            }
        }.bind(this), function (reason) {
            console.log(JSON.stringify(reason));
        });
    };
    AccountPagePlanController.prototype.onSelectPlan = function (id) {
        if (id != 'free') {
            this.setState({
                viewMode: 'accountInfo',
                planId: id
            });
        }
        else {
            alert("cancel subscription, but you still have access to plan " + id + " until the paid term has ended");
            Parse.Cloud.run('cancelSubscription')
                .then(function (result) {
                alert('NOT IMPLEMENTED!');
            }.bind(this));
        }
    };
    AccountPagePlanController.prototype.onCancelPlan = function () {
        this.setState({
            showCancelConfirm: true
        });
    };
    AccountPagePlanController.prototype.onConfirmedCancelPlan = function () {
        Parse.Cloud.run('cancelSubscription')
            .then(function () {
            this.setState({
                showCancelConfirm: false
            });
        }.bind(this), function (reason) {
            alert("Cancel failed.\nIf this error persists, Please contact support@scitylana.com");
        }.bind(this));
    };
    AccountPagePlanController.prototype.onKeepPlan = function () {
        this.setState({
            showCancelConfirm: false
        });
    };
    AccountPagePlanController.prototype.onSelectUnit = function (unit) {
        this.setState({
            unit: unit
        });
    };
    AccountPagePlanController.prototype.onAccountInfoOk = function (accountInfo) {
        this.setState({
            viewMode: 'checkout'
        });
    };
    AccountPagePlanController.prototype.onCancel = function () {
        this.setState({
            viewMode: 'default'
        });
    };
    AccountPagePlanController.prototype.onSubscribe = function (stripeTokenId) {
        this.setState({
            subscribing: true
        });
        Parse.Cloud.run('placeOrder', {
            planId: this.state.planId,
            addDanishVAT: null,
            stripeToken: stripeTokenId
        }).then(function (subscription) {
            this.setState({
                subscribing: false,
                viewMode: 'default'
            });
        }.bind(this), function () {
            this.setState({
                subscribing: false,
                viewMode: 'default'
            });
        }.bind(this));
    };
    AccountPagePlanController.prototype.onChangeValue = function (name, value) {
        var state = {};
        state[name] = value;
        this.setState(state);
    };
    AccountPagePlanController.prototype.render = function () {
        var _this = this;
        var view = React.createElement(AccountPagePlanView, __assign({}, this.props, this.state, {onAction: this.onSelectPlan.bind(this), onSelectUnit: this.onSelectUnit.bind(this), onCancelPlan: this.onCancelPlan.bind(this), onConfirmedCancelPlan: this.onConfirmedCancelPlan.bind(this), onKeepPlan: this.onKeepPlan.bind(this), onChangeValue: this.onChangeValue.bind(this)}));
        switch (this.state.viewMode) {
            case 'accountInfo':
                view = React.createElement(AccountPageInformationController, {onNext: this.onAccountInfoOk.bind(this), onRevert: this.onCancel.bind(this), wizardMode: true});
                break;
            case 'checkout':
                view = React.createElement(AccountPlanCheckoutView, __assign({}, this.state, {onSubscribe: function (stripeTokenId) { _this.onSubscribe(stripeTokenId); }}));
                break;
        }
        return view;
    };
    return AccountPagePlanController;
}(React.Component));
module.exports = AccountPagePlanController;
//# sourceMappingURL=AccountPagePlanController.js.map