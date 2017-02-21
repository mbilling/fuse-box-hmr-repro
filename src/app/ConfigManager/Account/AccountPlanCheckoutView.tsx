import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as moment from 'moment';
import * as _ from 'lodash';
import { Grid, Tab, Nav, NavItem, Row, Col, FormGroup, ControlLabel, FormControl, Button, MenuItem, Fade } from 'react-bootstrap';

import CreditCardController = require('./CreditCardController');
import OrderView = require('./OrderView');

interface IProps {
   planId: any;
   onSubscribe: (stripeTokenId)=>void;
   subscribing?: boolean;
}

const AccountPlanCheckoutView: React.StatelessComponent<IProps> = (props) => {

   let {planId, onSubscribe, subscribing} = props;

   return <Grid fluid style={{ marginLeft: 8 }}>
      <Row>
         <Col xs={12}>
            <h2>Complete your order</h2>
         </Col>
      </Row>

      <Row>
         <Col xs={12} sm={6} md={5} lg={4}>
            <OrderView {...props}/>
         </Col>
         <Col xs={12} sm={6} md={5} lg={4}>
            <CreditCardController {...props}/>
         </Col>
      </Row>
   </Grid>
};

export = AccountPlanCheckoutView;