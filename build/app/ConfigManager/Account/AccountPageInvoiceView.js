"use strict";
var React = require('react');
var react_bootstrap_1 = require('react-bootstrap');
var _ = require('lodash');
var moment = require('moment');
var AccountPageInvoiceView = function (_a) {
    var invoice = _a.invoice, accountInfo = _a.accountInfo;
    var logoPath = 'images/Scitylana logo.png';
    var invoiceComponent = React.createElement(react_bootstrap_1.Grid, null, 
        React.createElement(react_bootstrap_1.Row, null, 
            React.createElement(react_bootstrap_1.Col, {xs: 12}, "No invoices available in this account yet.")
        )
    );
    if (!!invoice && !!accountInfo) {
        var totalAmount_1 = 0;
        var currency_1 = null;
        _.each(invoice.lines.data, function (line) {
            totalAmount_1 += line.amount;
            currency_1 = line.currency;
        });
        invoiceComponent = React.createElement(react_bootstrap_1.Grid, {fluid: true}, 
            React.createElement(react_bootstrap_1.Row, null, 
                React.createElement(react_bootstrap_1.Col, {xs: 12}, 
                    React.createElement("img", {src: logoPath})
                )
            ), 
            React.createElement(react_bootstrap_1.Row, null, 
                React.createElement(react_bootstrap_1.Col, {xs: 12}, 
                    React.createElement("hr", null), 
                    React.createElement("div", {style: { textAlign: 'center' }}, "INVOICE (PAID)"), 
                    React.createElement("hr", null))
            ), 
            React.createElement(react_bootstrap_1.Row, null, 
                React.createElement(react_bootstrap_1.Col, {xs: 2}, "To:"), 
                React.createElement(react_bootstrap_1.Col, {xs: 10, className: "invoiceCompany"}, accountInfo.name)), 
            React.createElement(react_bootstrap_1.Row, null, 
                React.createElement(react_bootstrap_1.Col, {xs: 2}), 
                React.createElement(react_bootstrap_1.Col, {xs: 10, className: "invoiceAddress"}, accountInfo.address)), 
            React.createElement(react_bootstrap_1.Row, null, 
                React.createElement(react_bootstrap_1.Col, {xs: 2}), 
                React.createElement(react_bootstrap_1.Col, {xs: 10, className: "invoiceCity"}, accountInfo.city)), 
            React.createElement(react_bootstrap_1.Row, null, 
                React.createElement(react_bootstrap_1.Col, {xs: 2}), 
                React.createElement(react_bootstrap_1.Col, {xs: 10, className: "invoiceZip"}, accountInfo.zip)), 
            React.createElement(react_bootstrap_1.Row, null, 
                React.createElement(react_bootstrap_1.Col, {xs: 2}), 
                React.createElement(react_bootstrap_1.Col, {xs: 10, className: "invoiceRegion"}, accountInfo.region)), 
            React.createElement(react_bootstrap_1.Row, null, 
                React.createElement(react_bootstrap_1.Col, {xs: 2}), 
                React.createElement(react_bootstrap_1.Col, {xs: 10, className: "invoiceCountry"}, accountInfo.country)), 
            React.createElement(react_bootstrap_1.Row, null, 
                React.createElement(react_bootstrap_1.Col, {xs: 2}), 
                React.createElement(react_bootstrap_1.Col, {xs: 10, className: "invoiceVat"}, accountInfo.vat_no)), 
            React.createElement("hr", null), 
            React.createElement(react_bootstrap_1.Row, {className: "invoiceItemHeader"}, 
                React.createElement(react_bootstrap_1.Col, {xs: 10}, "Description"), 
                React.createElement(react_bootstrap_1.Col, {xs: 2}, "Amount")), 
            invoice.lines.data.map(function (line) {
                var desc = line.description;
                return React.createElement("div", {key: line.id}, 
                    React.createElement(react_bootstrap_1.Row, {className: "invoiceItemMainLine"}, 
                        React.createElement(react_bootstrap_1.Col, {xs: 10}, line.description || "Subscription to " + line.plan.name + " (" + line.currency.toUpperCase() + " " + line.amount / 100 + "/" + line.plan.interval + ")"), 
                        React.createElement(react_bootstrap_1.Col, {xs: 2, style: { textAlign: 'right' }}, line.currency.toUpperCase() + " " + line.amount / 100)), 
                    React.createElement(react_bootstrap_1.Row, {className: "invoiceItemSubLine"}, 
                        React.createElement(react_bootstrap_1.Col, {xs: 10}, "Period: " + moment.unix(line.period.start).format('YYYY-MM-DD') + " - " + moment.unix(line.period.end).format('YYYY-MM-DD'))
                    ));
            }), 
            React.createElement("hr", null), 
            React.createElement(react_bootstrap_1.Row, null, 
                React.createElement(react_bootstrap_1.Col, {xs: 7, style: { textAlign: 'right' }}, "Sub total"), 
                React.createElement(react_bootstrap_1.Col, {xs: 5, style: { textAlign: 'right' }, className: "invoiceAmount"}, "" + totalAmount_1 / 100)), 
            React.createElement(react_bootstrap_1.Row, null, 
                React.createElement(react_bootstrap_1.Col, {xs: 7, style: { textAlign: 'right' }}, "VAT")
            ), 
            React.createElement(react_bootstrap_1.Row, null, 
                React.createElement(react_bootstrap_1.Col, {xs: 7, style: { textAlign: 'right' }}, "Amount paid"), 
                React.createElement(react_bootstrap_1.Col, {xs: 5, style: { textAlign: 'right' }, className: "invoiceAmountPaid"}, currency_1.toUpperCase() + " " + totalAmount_1 / 100)));
    }
    return invoiceComponent;
};
module.exports = AccountPageInvoiceView;
//# sourceMappingURL=AccountPageInvoiceView.js.map