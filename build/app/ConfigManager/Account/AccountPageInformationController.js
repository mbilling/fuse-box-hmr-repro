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
var request = require("request");
var AccountPageInformationView = require('./AccountPageInformationView');
var CountryList = require('../../Tools/CountryList');
var AccountPageInformationController = (function (_super) {
    __extends(AccountPageInformationController, _super);
    function AccountPageInformationController(props) {
        _super.call(this, props);
        this.state = {
            country: null,
            countries: CountryList.countries
        };
        this.loadAccount();
    }
    AccountPageInformationController.prototype.loadAccount = function () {
        var _this = this;
        var query = new Parse.Query('Account');
        return query.find()
            .then(function (accounts) {
            if (accounts.length > 0) {
                var account = accounts[0].toJSON();
                _this.loadAccountResult(account);
                return account;
            }
            else {
                _this.loadGeoInfo().then(function (geoInfo) {
                    _this.loadGeoInfoResult(geoInfo);
                    return geoInfo;
                }, function (reason) {
                    console.log("geoInfo failed with " + reason);
                    return reason;
                });
            }
        }, function (reason) {
            console.log(JSON.stringify(reason));
        });
    };
    AccountPageInformationController.prototype.loadAccountResult = function (account) {
        this.setState({
            name: account.name,
            address: account.address,
            city: account.city,
            zip: account.zip,
            region: account.region,
            country: account.country,
            vatNo: account.vat_no
        });
    };
    AccountPageInformationController.prototype.loadGeoInfo = function () {
        var promise = new Parse.Promise();
        request('https://freegeoip.net/json/', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var geoInfo = JSON.parse(body);
                promise.resolve(geoInfo);
            }
            else {
                promise.reject(error);
            }
        }.bind(this));
        return promise;
    };
    AccountPageInformationController.prototype.loadGeoInfoResult = function (geoInfo) {
        this.setState({
            country: geoInfo.country_name,
            countryIso: geoInfo.country_code,
            vatNo: geoInfo.country_code
        });
    };
    AccountPageInformationController.prototype.onFieldChange = function (name, value, value2) {
        this.state[name] = value;
        this.forceUpdate();
    };
    AccountPageInformationController.prototype.onSave = function () {
        this.setState({
            saving: true
        });
        return Parse.Cloud.run('upsertAccountInfo', {
            name: this.state.name,
            address: this.state.address,
            city: this.state.city,
            zip: this.state.zip,
            region: this.state.region,
            country: this.state.country,
            vatNo: this.state.vatNo
        }).then(function (result) {
            this.setState({
                saving: false
            });
        }.bind(this), function (reason) {
            this.setState({
                saving: false,
                saveFailed: true
            });
        }.bind(this));
    };
    AccountPageInformationController.prototype.onRevert = function () {
        this.props.onRevert();
    };
    AccountPageInformationController.prototype.onNext = function () {
        this.onSave().then(function () {
            this.props.onNext();
        }.bind(this), function (reason) {
        }.bind(this));
    };
    AccountPageInformationController.prototype.render = function () {
        return React.createElement(AccountPageInformationView, __assign({}, this.props, this.state, {onChange: this.onFieldChange.bind(this), onSave: this.onSave.bind(this), onRevert: this.onRevert.bind(this), onNext: this.onNext.bind(this)}));
    };
    return AccountPageInformationController;
}(React.Component));
module.exports = AccountPageInformationController;
//# sourceMappingURL=AccountPageInformationController.js.map