import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Parse = require("parse");

import Marketing = require('../../Tools/Marketing');
import AccountPageInvoicesView = require('./AccountPageInvoicesView');

interface IProps {
}

interface IState {
   invoices?: Array<any>
   accountInfo?: any;
   loadingInvoices?: boolean;
   selectedInvoiceId?: string;
}

class AccountPageInvoicesController extends React.Component<IProps, IState> {

   constructor(props: any) {
      super(props);

      this.state = {
         loadingInvoices: true
      }

      this.loadAccountInfo().then((account) => {
         if (!!account) {
            this.loadInvoices().then(() => {
               this.setState({
                  loadingInvoices: false
               })
            });
         } else {
               this.setState({
                  loadingInvoices: false,
                  invoices: null,
                  accountInfo: null
               })
         }
      });
   }

   loadAccountInfo() {

      let query = new Parse.Query('Account');
      return query.find()
         .then((accounts) => {

            if (accounts.length > 0) {
               let account = accounts[0].toJSON();
               this.loadAccountResult(account);
               return account;
            }
            return null;
         }, (reason) => {
            console.log(JSON.stringify(reason))
         })
   }

   loadAccountResult(accountInfo) {

      this.setState({
         accountInfo: accountInfo
      });
   }
   loadInvoices() {

      return Parse.Cloud.run('listInvoices', {
         limit: 10
      }, (invoices) => {
         this.loadInvoicesResult(invoices);
      })
   }

   loadInvoicesResult(invoices) {

      this.setState({
         invoices: invoices.data
      })
   }

   selectInvoiceId(invoiceId) {
      this.setState({
         selectedInvoiceId: invoiceId
      })
   }

   render() {
      return <AccountPageInvoicesView {...this.props} {...this.state} onSelectInvoice={(invoiceId)=>{this.selectInvoiceId(invoiceId)}}/>;
   }
}

export = AccountPageInvoicesController;