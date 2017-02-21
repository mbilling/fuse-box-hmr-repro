"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var AccountPagesController = require('./ConfigManager/Account/AccountPagesController');
var App = (function (_super) {
    __extends(App, _super);
    function App(props) {
        _super.call(this, props);
    }
    App.prototype.render = function () {
        return React.createElement("div", {style: { backgroundColor: 'white', paddingTop: 20, paddingBottom: 20 }}, 
            React.createElement(AccountPagesController, null)
        );
    };
    return App;
}(React.Component));
module.exports = App;
//# sourceMappingURL=AppAccount.js.map