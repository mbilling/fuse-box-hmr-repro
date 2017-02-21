import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Parse = require("parse");
import request = require("request");

import Marketing = require('../../Tools/Marketing');
import AccountPageInformationView = require('./AccountPageInformationView');
import CountryList = require('../../Tools/CountryList');

interface IProps {
   wizardMode?: boolean;
   onRevert?: () => void;
   onNext?: () => void;
}

interface IState {
   name?: string;
   address?: string;
   city?: string;
   zip?: string;
   region?: string;
   country?: string;
   countryIso?: string;
   vatNo?: string;
   countries?: any;
   saving?: boolean;
   displayRevert?: boolean;
}

class AccountPageInformationController extends React.Component<IProps, IState> {

   constructor(props: any) {
      super(props);

      this.state = {
         country: null,
         countries: CountryList.countries
      }

      this.loadAccount();
   }

   loadAccount() {

      let query = new Parse.Query('Account');
      return query.find()
         .then((accounts) => {

            if (accounts.length > 0) {
               let account = accounts[0].toJSON();
               this.loadAccountResult(account);
               return account;
            } else {

               this.loadGeoInfo().then((geoInfo) => {
                  this.loadGeoInfoResult(geoInfo);
                  return geoInfo;
               }, (reason) => {
                  console.log(`geoInfo failed with ${reason}`);
                  return reason;
               });
            }
         }, (reason) => {
            console.log(JSON.stringify(reason))
         })
   }

   loadAccountResult(account) {

      this.setState({
         name: account.name,
         address: account.address,
         city: account.city,
         zip: account.zip,
         region: account.region,
         country: account.country,
         vatNo: account.vat_no
      });
   }

   loadGeoInfo() {

      let promise = new Parse.Promise();

      request('https://freegeoip.net/json/', function (error, response, body) {
         if (!error && response.statusCode == 200) {
            let geoInfo = JSON.parse(body);
            promise.resolve(geoInfo);
         } else {
            promise.reject(error)
         }
      }.bind(this));

      return promise;
   }

   loadGeoInfoResult(geoInfo) {
      this.setState({
         country: geoInfo.country_name,
         countryIso: geoInfo.country_code,
         vatNo: geoInfo.country_code
      })
   }

   onFieldChange(name, value, value2) {

      this.state[name] = value;
      this.forceUpdate();
   }

   onSave() {

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
   }

   onRevert() {
      this.props.onRevert();
   }

   onNext() {
      this.onSave().then(function () {
         this.props.onNext();
      }.bind(this), function (reason) {
      }.bind(this))
   }

   render() {
      return <AccountPageInformationView {...this.props} {...this.state} onChange={this.onFieldChange.bind(this)} onSave={this.onSave.bind(this)} onRevert={this.onRevert.bind(this)} onNext={this.onNext.bind(this)} />;
   }
}

export = AccountPageInformationController;