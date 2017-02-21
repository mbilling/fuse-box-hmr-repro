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
var AccountPageInvoicesView = require('./AccountPageInvoicesView');
var AccountPageInvoicesController = (function (_super) {
    __extends(AccountPageInvoicesController, _super);
    function AccountPageInvoicesController(props) {
        var _this = this;
        _super.call(this, props);
        this.state = {
            loadingInvoices: true
        };
        this.loadAccountInfo().then(function (account) {
            if (!!account) {
                _this.loadInvoices().then(function () {
                    _this.setState({
                        loadingInvoices: false
                    });
                });
            }
            else {
                _this.setState({
                    loadingInvoices: false,
                    invoices: null,
                    accountInfo: null
                });
            }
        });
    }
    AccountPageInvoicesController.prototype.loadAccountInfo = function () {
        var _this = this;
        var query = new Parse.Query('Account');
        return query.find()
            .then(function (accounts) {
            if (accounts.length > 0) {
                var account = accounts[0].toJSON();
                _this.loadAccountResult(account);
                return account;
            }
            return null;
        }, function (reason) {
            console.log(JSON.stringify(reason));
        });
    };
    AccountPageInvoicesController.prototype.loadAccountResult = function (accountInfo) {
        this.setState({
            accountInfo: accountInfo
        });
    };
    AccountPageInvoicesController.prototype.loadInvoices = function () {
        var _this = this;
        return Parse.Cloud.run('listInvoices', {
            limit: 10
        }, function (invoices) {
            _this.loadInvoicesResult(invoices);
        });
    };
    AccountPageInvoicesController.prototype.loadInvoicesResult = function (invoices) {
        this.setState({
            invoices: invoices.data
        });
    };
    AccountPageInvoicesController.prototype.selectInvoiceId = function (invoiceId) {
        this.setState({
            selectedInvoiceId: invoiceId
        });
    };
    AccountPageInvoicesController.prototype.render = function () {
        var _this = this;
        return React.createElement(AccountPageInvoicesView, __assign({}, this.props, this.state, {onSelectInvoice: function (invoiceId) { _this.selectInvoiceId(invoiceId); }}));
    };
    return AccountPageInvoicesController;
}(React.Component));
module.exports = AccountPageInvoicesController;
//# sourceMappingURL=AccountPageInvoicesController.js.map