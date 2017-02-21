import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as moment from 'moment';
import { Grid, Tab, Nav, NavItem, Row, Col, FormGroup, ControlLabel, FormControl, Button, MenuItem, Fade } from 'react-bootstrap';
import * as Select from 'react-select';
import CreditCardType = require('credit-card-type');
//import stripe = require('stripe');

// Set publishable stripe key, either test or live depending on location.port is 1337 (development port)
//let stripe = location.port == '1337' ? new Stripe('pk_live_3huvmC8IsxxOpm3tF0PLaMmK') : new Stripe('pk_test_Xm9aCNrWFIRYUFosRtfeyVqP');
let stripeKey = location.port == '1337' ? 'pk_test_Xm9aCNrWFIRYUFosRtfeyVqP' : 'pk_live_3huvmC8IsxxOpm3tF0PLaMmK';

interface IProps {
   onSubscribe: (stripeTokenId) => void;
   onBadCreditCard: (error) => void;
   subscribing: boolean;
   number: string;
   expiryMonth: string;
   expiryYear: string;
   cvc: string;
   fullName: string;
   onChange: (name, value) => void;
   validCardNumber?: boolean;
   validCvcCode?: boolean;
   displayError?: boolean;
   errorMessage?: any;
}

type ValidationState = "success" | "warning" | "error" | null;

const CreditCardView: React.StatelessComponent<IProps> = (props) => {

   let {onSubscribe, onBadCreditCard, subscribing, number, expiryMonth, expiryYear, cvc, fullName, onChange, validCardNumber, validCvcCode, displayError, errorMessage} = props;

   let defaultValidationState = (value, minLength = 1) => { return null as ValidationState; };

   // Validate card data
   let _validCardNumber = (number) => {
      if (!number || number.length == 0) return null as ValidationState;
      number = number.replace(/ /g, '');
      let cards = CreditCardType(number);
      if (cards.length != 1)
         return 'error' as ValidationState;

      if (['visa', 'master-card', 'american-express'].indexOf(cards[0].type) != -1 && number.length <= cards[0].lengths[0])
         return 'success' as ValidationState;
      return 'error' as ValidationState;
   };
   let _validCvCCode: ValidationState = validCvcCode === undefined ? null : !!validCvcCode ? 'success' : 'error';

   // Insert gaps in card number
   let cardtype = null;
   if (!!number) {

      number = number.replace(/ /g, '');
      let cards = CreditCardType(number);
      if (cards.length > 0) {
         cardtype = cards[0].type;
         let maxLength = cards[0].lengths[0];
         number = number.substr(0, maxLength);
         for (let i = cards[0].gaps.length - 1; i >= 0; i--) {
            if (cards[0].gaps[i] > number.length - 1) continue;
            number = number.slice(0, cards[0].gaps[i]) + ' ' + number.slice(cards[0].gaps[i]);
         }
      }
   }

   // Send cc data up
   let subcribe = () => {

      // Remove spaces
      number = number.replace(/ /g, '');

      Stripe.setPublishableKey(stripeKey);
      // Create a single-use stripe card token (card info never leaves clients machine to other than Stripe)
      Stripe.card.createToken({
         number: number,
         exp_month: parseInt(expiryMonth),
         exp_year: parseInt(expiryYear),
         cvc: cvc,
         name: fullName
      }, (status, response) => {
         if (response.error) {
            onBadCreditCard(response.error);
         } else {
            onSubscribe(response.id);
         }
      });
   }

   // Generate months and years
   let today = moment();
   let year = parseInt(today.format('YY'));
   let years = [];
   for (let i = 0; i < 5; i++) {
      years.push({ value: year });
      year++;
   }
   let months = [{ value: '01' }, { value: '02' }, { value: '03' }, { value: '04' }, { value: '05' }, { value: '06' }, { value: '07' }, { value: '08' }, { value: '09' }, { value: '10' }, { value: '11' }, { value: '12' }];

   return <Grid fluid style={{}}>
      <Row>
         <Col xs={12}>
            <h4>Enter payment details</h4>
         </Col>
      </Row>

      <Row>
         <Col xs={12} style={{ textAlign: 'center' }}>
            <img src="images/creditcard/visa.png" alt="" style={{ padding: 2, opacity: !!cardtype ? cardtype == 'visa' ? 1 : 0.2 : 1 }} />
            <img src="images/creditcard/mastercard.png" style={{ padding: 2, opacity: !!cardtype ? cardtype == 'master-card' ? 1 : 0.2 : 1 }} />
            <img src="images/creditcard/amex.png" style={{ padding: 2, opacity: !!cardtype ? cardtype == 'american-express' ? 1 : 0.2 : 1 }} />
         </Col>
      </Row>

      <Row>
         <Col xs={12}>
            <FormGroup controlId="formCardNumber" name="cardnumber" validationState={_validCardNumber(number)}>
               <ControlLabel>Card number</ControlLabel>
               <FormControl
                  type="text"
                  value={number}
                  placeholder="Card number"
                  onChange={(event) => { onChange('number', event.target['value']); }}
               />
            </FormGroup>
         </Col>
      </Row>

      <Row>
         <Col xs={12}>
            <FormGroup controlId="formCVC" name="cvc" validationState={_validCvCCode}>
               <ControlLabel>CVV2/CVC2</ControlLabel>
               <FormControl
                  type="text"
                  value={cvc}
                  placeholder="Card security code"
                  onChange={(event) => { onChange('cvc', event.target['value']) }}
               />
            </FormGroup>
         </Col>
      </Row>

      <Row>
         <Col xs={12}>
            <ControlLabel>Expire month</ControlLabel>
         </Col>
      </Row>
      <Row>
         <Col xs={12} style={{ marginBottom: 15 }}>
            <Select
               name="expiryMonth"
               value={expiryMonth}
               options={months}
               onChange={(value) => { onChange('expiryMonth', value['value']) }}
               labelKey="value"
               autoBlur
               placeholder="Expiry month"
               clearable={false}
            />
         </Col>
      </Row>

      <Row>
         <Col xs={12}>
            <ControlLabel>Expire year</ControlLabel>
         </Col>
      </Row>
      <Row>
         <Col xs={12} style={{ marginBottom: 15 }}>
            <Select
               name="expiryYear"
               value={expiryYear}
               options={years}
               onChange={(value) => { onChange('expiryYear', value['value']) }}
               labelKey="value"
               autoBlur
               placeholder="Expiry year"
               clearable={false}
            />
         </Col>
      </Row>

      <Row>
         <Col xs={12}>
            <FormGroup controlId="formFullName" name="ccname" validationState={defaultValidationState(fullName, 1)}>
               <ControlLabel>Full name on card</ControlLabel>
               <FormControl
                  type="text"
                  value={fullName}
                  placeholder="Full name on card"
                  onChange={(event) => { onChange('fullName', event.target['value']) }}
               />
            </FormGroup>
         </Col>
      </Row>

      {displayError ? <Row>
         <Col xs={12}>
            <span style={{ color: 'red' }}>{errorMessage.message}</span>
         </Col>
      </Row> : null}

      <Row>
         <Col xs={12}>
            <Button onClick={subcribe} className="btn btn-md btn-orange actionBtn button" style={{ float: 'right', width: 150 }}>
               {!!subscribing ?
                  <Fade in={!!subscribing}>
                     <span>Placing order...</span>
                  </Fade>
                  :
                  <Fade in={!subscribing}>
                     <span>Place order</span>
                  </Fade>
               }
            </Button>
         </Col>
      </Row>
   </Grid>
};

export = CreditCardView;