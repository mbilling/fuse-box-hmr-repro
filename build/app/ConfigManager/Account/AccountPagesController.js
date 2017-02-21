"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var AccountPagesView = require('./AccountPagesView');
var AccountPageInformationController = require('./AccountPageInformationController');
var AccountPagePlanController = require('./AccountPagePlanController');
var AccountPageInvoicesController = require('./AccountPageInvoicesController');
var AccountPagesController = (function (_super) {
    __extends(AccountPagesController, _super);
    function AccountPagesController(props) {
        _super.call(this, props);
        var pageDefinitions = [
            { name: 'Plan', controller: React.createElement(AccountPagePlanController, null) },
            { name: 'Invoice info', controller: React.createElement(AccountPageInformationController, null) },
            { name: 'Invoices', controller: React.createElement(AccountPageInvoicesController, null) }
        ];
        var defaultPage = pageDefinitions[0].name;
        var pages = pageDefinitions.map(function (page) { return (page.name); });
        var pagesContent = pageDefinitions.map(function (page) { return (page.controller); });
        this.state = {
            pages: pages,
            pagesContent: pagesContent,
            selectedPage: defaultPage,
            selectedPageContent: React.createElement(AccountPagePlanController, null)
        };
    }
    AccountPagesController.prototype.onSelectPage = function (index) {
        this.setState({
            selectedPage: this.state.pages[index],
            selectedPageContent: this.state.pagesContent[index]
        });
    };
    AccountPagesController.prototype.render = function () {
        return React.createElement(AccountPagesView, {pages: this.state.pages, selectedPage: this.state.selectedPage, selectedPageContent: this.state.selectedPageContent, onSelectPage: this.onSelectPage.bind(this)});
    };
    return AccountPagesController;
}(React.Component));
module.exports = AccountPagesController;
//# sourceMappingURL=AccountPagesController.js.map