import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Parse = require("parse");

import Marketing = require('../../Tools/Marketing');
import AccountPagePlanView = require('./AccountPagePlanView');
import AccountPlanCheckoutView = require('./AccountPlanCheckoutView');
import AccountPageInformationController = require('./AccountPageInformationController');
import Plan = require('../../Plan/Product');



interface IProps {
}

type ViewMode = 'default' | 'accountInfo' | 'checkout';

interface IState {
   planId?: string;
   unit?: string;
   viewMode?: ViewMode;
   subscribing?: boolean;
   items?: Array<string>;
   showCancelConfirm?: boolean;
   cancelReason?: string;
}

class AccountPagePlanController extends React.Component<IProps, IState> {

   constructor(props: any) {
      super(props);

      this.state = {
         planId: null,
         viewMode: 'default',
         unit: 'annually'
      }

      this.getPlanId();
   }

   getPlanId() {

      Parse.Cloud.run('getActivePlan', {})
         .then(function (plan: Parse.Object) {

            if (!!plan) {

               // Get default plan unit (so we open at the page where current plan is marked)
               let unit = Plan.plans[plan.id].unit;
               this.setState({
                  planId: plan.id,
                  unit: unit
               })
            } else {
               // Account is running on FREE plan
               this.setState({
                  planId: 'free'
               })
            }

         }.bind(this), function (reason) {
            console.log(JSON.stringify(reason));
         })
   }

   onSelectPlan(id) {

      if (id != 'free') {
         this.setState({
            viewMode: 'accountInfo',
            planId: id
         });
      } else {

         alert(`cancel subscription, but you still have access to plan ${id} until the paid term has ended`);

         // Cancel subscription
         Parse.Cloud.run('cancelSubscription')
         .then(function(result) {

            alert('NOT IMPLEMENTED!')

         }.bind(this))
      }
   }

   onCancelPlan() {

      // Send cancel plan to stripe
      // Inform user that he/she still have access to plan until current paid term has ended
      this.setState({
         showCancelConfirm: true
      })
   }

   onConfirmedCancelPlan() {

      Parse.Cloud.run('cancelSubscription')
      .then(function() {

         this.setState({
            showCancelConfirm: false
         })
      }.bind(this), function(reason) {

         alert(`Cancel failed.\nIf this error persists, Please contact support@scitylana.com`);
      }.bind(this))
   }

   onKeepPlan() {

      this.setState({
         showCancelConfirm: false
      })
   }




   onSelectUnit(unit) {
      this.setState({
         unit: unit
      })
   }

   onAccountInfoOk(accountInfo) {
      this.setState({
         viewMode: 'checkout'
      });
   }

   onCancel() {
      this.setState({
         viewMode: 'default'
      });
   }

   onSubscribe(stripeTokenId) {

      this.setState({
         subscribing: true
      });

      Parse.Cloud.run('placeOrder', {
         planId: this.state.planId,
         addDanishVAT: null,
         stripeToken: stripeTokenId
      }).then(function (subscription) {

         this.setState({
            subscribing: false,
            viewMode: 'default'
         });
      }.bind(this), function () {

         this.setState({
            subscribing: false,
            viewMode: 'default'
         });

      }.bind(this))
   }

   onChangeValue(name, value) {
      let state = {};
      state[name] = value;
      this.setState(state);
   }

   render() {
      let view = <AccountPagePlanView {...this.props} {...this.state} 
      onAction={this.onSelectPlan.bind(this)} 
      onSelectUnit={this.onSelectUnit.bind(this)} 
      onCancelPlan={this.onCancelPlan.bind(this)}
      onConfirmedCancelPlan={this.onConfirmedCancelPlan.bind(this)}
      onKeepPlan={this.onKeepPlan.bind(this)}
      onChangeValue={this.onChangeValue.bind(this)}
      />;
      switch (this.state.viewMode) {
         case 'accountInfo':
            view = <AccountPageInformationController onNext={this.onAccountInfoOk.bind(this)} onRevert={this.onCancel.bind(this)} wizardMode={true} />
            break;
         case 'checkout':
            view = <AccountPlanCheckoutView {...this.state} onSubscribe={(stripeTokenId) => {this.onSubscribe(stripeTokenId)}} />
            break;
      }
      return view;
   }
}

export = AccountPagePlanController;