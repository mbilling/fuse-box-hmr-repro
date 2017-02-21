import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as moment from 'moment';
import * as _ from 'lodash';
import { Grid, Tab, Nav, NavItem, Row, Col, FormGroup, ControlLabel, FormControl, Button, MenuItem, Fade } from 'react-bootstrap';

import Plan = require('../../Plan/Product');

interface IProps {
   planId: any;
}

const OrderView: React.StatelessComponent<IProps> = ({planId}) => {

   let plan = Plan.plans[planId];
   let total = plan.price;
   let unit = plan.unit == 'monthly' ? 'month' : 'year';

   return <Grid fluid style={{}}>
      <Row>
         <Col xs={12}>
            <h4>Your order</h4>
         </Col>
      </Row>

      <Row>
         <Col xs={12}>
            <hr />
         </Col>
      </Row>

      <Row>
         <Col xs={8}>
            {plan.invoiceName}
         </Col>

         <Col xs={4}>
            ${plan.price}
         </Col>
      </Row>

      <Row>
         <Col xs={12}>
            <hr />
         </Col>
      </Row>

      <Row>
         <Col xs={8}>
            <b>Total</b>
         </Col>

         <Col xs={4}>
            <b>${total}</b>
            <br />
            <span className="grey">{`per ${unit}`}</span>
         </Col>
      </Row>
   </Grid >
};

export = OrderView;