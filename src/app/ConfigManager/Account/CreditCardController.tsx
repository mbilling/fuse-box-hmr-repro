import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Parse = require("parse");

import Marketing = require('../../Tools/Marketing');
import CreditCardView = require('./CreditCardView');

interface IProps {
   onSubscribe: (stripeTokenId) => void;
   subscribing: boolean;
}

interface IState {
   number?: string;
   expiryMonth?: string;
   expiryYear?: string;
   cvc?: string;
   fullName?: string;
   displayError?: boolean;
   errorMessage?: any;
}

class CreditCardController extends React.Component<IProps, IState> {

   constructor(props: any) {
      super(props);
      this.state = {};
   }

   onFieldChange(name, value) {

      this.state[name] = value;  // demands a force update or a setState call after
      this.setState({
         displayError: false
      })

      this.forceUpdate();
   }
   onBadCreditCard (error) {
      this.setState({
         displayError: true,
         errorMessage: error
      })
   }

   render() {
      return <CreditCardView {...this.props} {...this.state} onChange={this.onFieldChange.bind(this)} onBadCreditCard={(error)=> {this.onBadCreditCard(error)}}/>;
   }
}

export = CreditCardController;