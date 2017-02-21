"use strict";
var React = require('react');
var react_bootstrap_1 = require('react-bootstrap');
var moment = require('moment');
var AccountPageInvoiceView = require('./AccountPageInvoiceView');
var AccountPageInvoicesView = function (_a) {
    var invoices = _a.invoices, accountInfo = _a.accountInfo, loadingInvoices = _a.loadingInvoices, selectedInvoiceId = _a.selectedInvoiceId, onSelectInvoice = _a.onSelectInvoice;
    return (React.createElement(react_bootstrap_1.Grid, {fluid: true}, 
        React.createElement(react_bootstrap_1.Row, null, 
            React.createElement(react_bootstrap_1.Col, {xs: 12, sm: 8, md: 7, lg: 6}, 
                React.createElement(react_bootstrap_1.Grid, {fluid: true}, 
                    React.createElement(react_bootstrap_1.Row, null, 
                        React.createElement(react_bootstrap_1.Col, {xs: 12}, 
                            React.createElement("h2", null, "Invoice history")
                        )
                    ), 
                    React.createElement(react_bootstrap_1.Row, null, 
                        React.createElement(react_bootstrap_1.Col, {xs: 12}, !loadingInvoices ?
                            invoices.map(function (invoice) {
                                var header = React.createElement(react_bootstrap_1.Grid, {fluid: true}, 
                                    React.createElement(react_bootstrap_1.Row, null, 
                                        React.createElement(react_bootstrap_1.Col, {xs: 8}, "" + moment.unix(invoice.period_start).format('YYYY MMM')), 
                                        React.createElement(react_bootstrap_1.Col, {xs: 4}, 
                                            React.createElement("span", {style: { float: 'right' }}, invoice.currency.toUpperCase() + " " + invoice.total / 100)
                                        ))
                                );
                                return React.createElement(react_bootstrap_1.ListGroup, null, selectedInvoiceId == invoice.id ?
                                    React.createElement(react_bootstrap_1.ListGroupItem, {key: invoice.id}, 
                                        React.createElement(AccountPageInvoiceView, {invoice: invoice, accountInfo: accountInfo})
                                    )
                                    :
                                        React.createElement(react_bootstrap_1.ListGroupItem, {key: invoice.id, header: header, onClick: function () { onSelectInvoice(invoice.id); }}));
                            })
                            :
                                React.createElement("div", null, "Loading invoices, please be patient..."))
                    ))
            )
        )
    ));
};
module.exports = AccountPageInvoicesView;
//# sourceMappingURL=AccountPageInvoicesView.js.map