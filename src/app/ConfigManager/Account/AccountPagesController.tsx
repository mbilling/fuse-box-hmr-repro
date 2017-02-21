import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Parse = require("parse");

import Marketing = require('../../Tools/Marketing');

import AccountPagesView = require('./AccountPagesView');
import AccountPageInformationController = require('./AccountPageInformationController');
import AccountPagePlanController = require('./AccountPagePlanController');
import AccountPageInvoicesController = require('./AccountPageInvoicesController');

interface IProps {
}

interface IState {
   pages?: Array<string>;
   pagesContent?: Array<React.ReactNode>;
   selectedPage?: string;
   selectedPageContent?: React.ReactNode;
}

class AccountPagesController extends React.Component<IProps, IState> {

   constructor(props: any) {
      super(props);

      let pageDefinitions = [
         {name: 'Plan', controller: <AccountPagePlanController/>},
         {name: 'Invoice info', controller: <AccountPageInformationController/>},
         {name: 'Invoices', controller: <AccountPageInvoicesController/>}
      ]

      let defaultPage = pageDefinitions[0].name;
      let pages = pageDefinitions.map((page) => (page.name));
      let pagesContent = pageDefinitions.map((page) => (page.controller));

      this.state = {
         pages: pages,
         pagesContent: pagesContent,
         selectedPage: defaultPage,
         selectedPageContent: <AccountPagePlanController/>
      }
   }

   onSelectPage(index) {

      this.setState({
         selectedPage: this.state.pages[index],
         selectedPageContent: this.state.pagesContent[index]
      })
   }

   render() {
      return <AccountPagesView pages={this.state.pages} selectedPage={this.state.selectedPage} selectedPageContent={this.state.selectedPageContent} onSelectPage={this.onSelectPage.bind(this)} />;
   }
}

export = AccountPagesController;