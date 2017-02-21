"use strict";
var React = require('react');
var moment = require('moment');
var react_bootstrap_1 = require('react-bootstrap');
var Select = require('react-select');
var CreditCardType = require('credit-card-type');
var stripeKey = location.port == '1337' ? 'pk_test_Xm9aCNrWFIRYUFosRtfeyVqP' : 'pk_live_3huvmC8IsxxOpm3tF0PLaMmK';
var CreditCardView = function (props) {
    var onSubscribe = props.onSubscribe, onBadCreditCard = props.onBadCreditCard, subscribing = props.subscribing, number = props.number, expiryMonth = props.expiryMonth, expiryYear = props.expiryYear, cvc = props.cvc, fullName = props.fullName, onChange = props.onChange, validCardNumber = props.validCardNumber, validCvcCode = props.validCvcCode, displayError = props.displayError, errorMessage = props.errorMessage;
    var defaultValidationState = function (value, minLength) {
        if (minLength === void 0) { minLength = 1; }
        return null;
    };
    var _validCardNumber = function (number) {
        if (!number || number.length == 0)
            return null;
        number = number.replace(/ /g, '');
        var cards = CreditCardType(number);
        if (cards.length != 1)
            return 'error';
        if (['visa', 'master-card', 'american-express'].indexOf(cards[0].type) != -1 && number.length <= cards[0].lengths[0])
            return 'success';
        return 'error';
    };
    var _validCvCCode = validCvcCode === undefined ? null : !!validCvcCode ? 'success' : 'error';
    var cardtype = null;
    if (!!number) {
        number = number.replace(/ /g, '');
        var cards = CreditCardType(number);
        if (cards.length > 0) {
            cardtype = cards[0].type;
            var maxLength = cards[0].lengths[0];
            number = number.substr(0, maxLength);
            for (var i = cards[0].gaps.length - 1; i >= 0; i--) {
                if (cards[0].gaps[i] > number.length - 1)
                    continue;
                number = number.slice(0, cards[0].gaps[i]) + ' ' + number.slice(cards[0].gaps[i]);
            }
        }
    }
    var subcribe = function () {
        number = number.replace(/ /g, '');
        Stripe.setPublishableKey(stripeKey);
        Stripe.card.createToken({
            number: number,
            exp_month: parseInt(expiryMonth),
            exp_year: parseInt(expiryYear),
            cvc: cvc,
            name: fullName
        }, function (status, response) {
            if (response.error) {
                onBadCreditCard(response.error);
            }
            else {
                onSubscribe(response.id);
            }
        });
    };
    var today = moment();
    var year = parseInt(today.format('YY'));
    var years = [];
    for (var i = 0; i < 5; i++) {
        years.push({ value: year });
        year++;
    }
    var months = [{ value: '01' }, { value: '02' }, { value: '03' }, { value: '04' }, { value: '05' }, { value: '06' }, { value: '07' }, { value: '08' }, { value: '09' }, { value: '10' }, { value: '11' }, { value: '12' }];
    return React.createElement(react_bootstrap_1.Grid, {fluid: true, style: {}}, 
        React.createElement(react_bootstrap_1.Row, null, 
            React.createElement(react_bootstrap_1.Col, {xs: 12}, 
                React.createElement("h4", null, "Enter payment details")
            )
        ), 
        React.createElement(react_bootstrap_1.Row, null, 
            React.createElement(react_bootstrap_1.Col, {xs: 12, style: { textAlign: 'center' }}, 
                React.createElement("img", {src: "images/creditcard/visa.png", alt: "", style: { padding: 2, opacity: !!cardtype ? cardtype == 'visa' ? 1 : 0.2 : 1 }}), 
                React.createElement("img", {src: "images/creditcard/mastercard.png", style: { padding: 2, opacity: !!cardtype ? cardtype == 'master-card' ? 1 : 0.2 : 1 }}), 
                React.createElement("img", {src: "images/creditcard/amex.png", style: { padding: 2, opacity: !!cardtype ? cardtype == 'american-express' ? 1 : 0.2 : 1 }}))
        ), 
        React.createElement(react_bootstrap_1.Row, null, 
            React.createElement(react_bootstrap_1.Col, {xs: 12}, 
                React.createElement(react_bootstrap_1.FormGroup, {controlId: "formCardNumber", name: "cardnumber", validationState: _validCardNumber(number)}, 
                    React.createElement(react_bootstrap_1.ControlLabel, null, "Card number"), 
                    React.createElement(react_bootstrap_1.FormControl, {type: "text", value: number, placeholder: "Card number", onChange: function (event) { onChange('number', event.target['value']); }}))
            )
        ), 
        React.createElement(react_bootstrap_1.Row, null, 
            React.createElement(react_bootstrap_1.Col, {xs: 12}, 
                React.createElement(react_bootstrap_1.FormGroup, {controlId: "formCVC", name: "cvc", validationState: _validCvCCode}, 
                    React.createElement(react_bootstrap_1.ControlLabel, null, "CVV2/CVC2"), 
                    React.createElement(react_bootstrap_1.FormControl, {type: "text", value: cvc, placeholder: "Card security code", onChange: function (event) { onChange('cvc', event.target['value']); }}))
            )
        ), 
        React.createElement(react_bootstrap_1.Row, null, 
            React.createElement(react_bootstrap_1.Col, {xs: 12}, 
                React.createElement(react_bootstrap_1.ControlLabel, null, "Expire month")
            )
        ), 
        React.createElement(react_bootstrap_1.Row, null, 
            React.createElement(react_bootstrap_1.Col, {xs: 12, style: { marginBottom: 15 }}, 
                React.createElement(Select, {name: "expiryMonth", value: expiryMonth, options: months, onChange: function (value) { onChange('expiryMonth', value['value']); }, labelKey: "value", autoBlur: true, placeholder: "Expiry month", clearable: false})
            )
        ), 
        React.createElement(react_bootstrap_1.Row, null, 
            React.createElement(react_bootstrap_1.Col, {xs: 12}, 
                React.createElement(react_bootstrap_1.ControlLabel, null, "Expire year")
            )
        ), 
        React.createElement(react_bootstrap_1.Row, null, 
            React.createElement(react_bootstrap_1.Col, {xs: 12, style: { marginBottom: 15 }}, 
                React.createElement(Select, {name: "expiryYear", value: expiryYear, options: years, onChange: function (value) { onChange('expiryYear', value['value']); }, labelKey: "value", autoBlur: true, placeholder: "Expiry year", clearable: false})
            )
        ), 
        React.createElement(react_bootstrap_1.Row, null, 
            React.createElement(react_bootstrap_1.Col, {xs: 12}, 
                React.createElement(react_bootstrap_1.FormGroup, {controlId: "formFullName", name: "ccname", validationState: defaultValidationState(fullName, 1)}, 
                    React.createElement(react_bootstrap_1.ControlLabel, null, "Full name on card"), 
                    React.createElement(react_bootstrap_1.FormControl, {type: "text", value: fullName, placeholder: "Full name on card", onChange: function (event) { onChange('fullName', event.target['value']); }}))
            )
        ), 
        displayError ? React.createElement(react_bootstrap_1.Row, null, 
            React.createElement(react_bootstrap_1.Col, {xs: 12}, 
                React.createElement("span", {style: { color: 'red' }}, errorMessage.message)
            )
        ) : null, 
        React.createElement(react_bootstrap_1.Row, null, 
            React.createElement(react_bootstrap_1.Col, {xs: 12}, 
                React.createElement(react_bootstrap_1.Button, {onClick: subcribe, className: "btn btn-md btn-orange actionBtn button", style: { float: 'right', width: 150 }}, !!subscribing ?
                    React.createElement(react_bootstrap_1.Fade, {in: !!subscribing}, 
                        React.createElement("span", null, "Placing order...")
                    )
                    :
                        React.createElement(react_bootstrap_1.Fade, {in: !subscribing}, 
                            React.createElement("span", null, "Place order")
                        ))
            )
        ));
};
module.exports = CreditCardView;
//# sourceMappingURL=CreditCardView.js.map