"use strict";
var React = require('react');
var react_bootstrap_1 = require('react-bootstrap');
var AccountPagesView = function (_a) {
    var pages = _a.pages, selectedPage = _a.selectedPage, selectedPageContent = _a.selectedPageContent, onSelectPage = _a.onSelectPage;
    return React.createElement(react_bootstrap_1.Tab.Container, {defaultActiveKey: selectedPage, className: "accountPagesView"}, 
        React.createElement(react_bootstrap_1.Grid, {fluid: true}, 
            React.createElement(react_bootstrap_1.Row, null, 
                React.createElement(react_bootstrap_1.Col, {xs: 4, sm: 2, md: 2, lg: 2}, 
                    React.createElement(react_bootstrap_1.Nav, {bsStyle: "pills", stacked: true}, pages.map(function (view, index) {
                        return React.createElement(react_bootstrap_1.NavItem, {key: 'navitem' + index, eventKey: view, onSelect: function () { onSelectPage(index); }, bsStyle: "primary"}, view);
                    }))
                ), 
                React.createElement(react_bootstrap_1.Col, {xs: 8, sm: 10, md: 10, lg: 10}, selectedPageContent))
        )
    );
};
module.exports = AccountPagesView;
//# sourceMappingURL=AccountPagesView.js.map