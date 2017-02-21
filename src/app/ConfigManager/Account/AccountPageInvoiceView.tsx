import * as React from 'react';
import { Grid, Tab, Nav, NavItem, Row, Col } from 'react-bootstrap';
import _ = require('lodash');
import moment = require('moment');

interface IProps {
   invoice?: any;
   accountInfo?: any;
}

const AccountPageInvoiceView: React.StatelessComponent<IProps> = ({invoice, accountInfo}) => {

//   let vatPct = 0.25;   // DKK vat is the only to use
   let logoPath = 'images/Scitylana logo.png';

   let invoiceComponent = <Grid>
      <Row>
         <Col xs={12}>
            No invoices available in this account yet.
         </Col>
      </Row>
   </Grid>;

   if (!!invoice && !!accountInfo) {

      let totalAmount = 0;
      let currency = null;
      _.each(invoice.lines.data, (line) => {
         totalAmount += line.amount;
         currency = line.currency;
      });

      invoiceComponent = <Grid fluid>
         <Row>
            <Col xs={12}>
               <img src={logoPath} />
            </Col>
         </Row>

         <Row>
            <Col xs={12}>
               <hr />
               <div style={{textAlign: 'center'}}>INVOICE (PAID)</div>
               <hr />
            </Col>
         </Row>

         {/* "TO" INFO */}
         <Row>
            <Col xs={2}>
               To:
         </Col>
            <Col xs={10} className="invoiceCompany">
               {accountInfo.name}
            </Col>
         </Row>

         <Row>
            <Col xs={2}>
            </Col>
            <Col xs={10} className="invoiceAddress">
               {accountInfo.address}
            </Col>
         </Row>

         <Row>
            <Col xs={2}>
            </Col>
            <Col xs={10} className="invoiceCity">
               {accountInfo.city}
            </Col>
         </Row>

         <Row>
            <Col xs={2}>
            </Col>
            <Col xs={10} className="invoiceZip">
               {accountInfo.zip}
            </Col>
         </Row>

         <Row>
            <Col xs={2}>
            </Col>
            <Col xs={10} className="invoiceRegion">
               {accountInfo.region}
            </Col>
         </Row>

         <Row>
            <Col xs={2}>
            </Col>
            <Col xs={10} className="invoiceCountry">
               {accountInfo.country}
            </Col>
         </Row>

         <Row>
            <Col xs={2}>
            </Col>
            <Col xs={10} className="invoiceVat">
               {accountInfo.vat_no}
            </Col>
         </Row>

         <hr />

         {/* ITEMS */}
         <Row className="invoiceItemHeader">
            <Col xs={10}>
               Description
         </Col>
            <Col xs={2}>
               Amount
         </Col>
         </Row>
         {
            invoice.lines.data.map((line) => {
               let desc = line.description;
               return <div key={line.id}>
                  <Row className="invoiceItemMainLine">
                     <Col xs={10}>{line.description || `Subscription to ${line.plan.name} (${line.currency.toUpperCase()} ${line.amount / 100}/${line.plan.interval})`}</Col>
                     <Col xs={2} style={{ textAlign: 'right' }}>{`${line.currency.toUpperCase()} ${line.amount / 100}`}</Col>
                  </Row>
                  <Row className="invoiceItemSubLine">
                     <Col xs={10}>{`Period: ${moment.unix(line.period.start).format('YYYY-MM-DD')} - ${moment.unix(line.period.end).format('YYYY-MM-DD')}`}</Col>
                  </Row>
               </div>
            })
         }
         <hr />
         <Row>
            <Col xs={7} style={{ textAlign: 'right' }}>Sub total</Col>
            <Col xs={5} style={{ textAlign: 'right' }} className="invoiceAmount">{`${totalAmount / 100}`}</Col>
         </Row>

         <Row>
            <Col xs={7} style={{ textAlign: 'right' }}>VAT</Col>
{/*            <Col xs={5} style={{ textAlign: 'right' }} className="invoiceVatAmount">{`${totalAmount * vatPct / (1 + vatPct) / 100}`}</Col>
            <Col xs={5} style={{ textAlign: 'right' }} className="invoiceVatAmount">{`${totalAmount / 100}`}</Col>*/}
         </Row>

         <Row>
            <Col xs={7} style={{ textAlign: 'right' }}>Amount paid</Col>
            <Col xs={5} style={{ textAlign: 'right' }} className="invoiceAmountPaid">{`${currency.toUpperCase()} ${totalAmount / 100}`}</Col>
         </Row>
      </Grid>
   }

   return invoiceComponent;
};

export = AccountPageInvoiceView;