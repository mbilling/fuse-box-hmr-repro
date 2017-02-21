import * as React from 'react';
import { Grid, Tab, Nav, NavItem, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';
import moment = require('moment');

import AccountPageInvoiceView = require('./AccountPageInvoiceView');

interface IProps {
   invoices: Array<any>
   accountInfo?: any;
   loadingInvoices?: boolean;
   selectedInvoiceId?: string;
   onSelectInvoice: (invoiceId: string) => void
}

const AccountPageInvoicesView: React.StatelessComponent<IProps> = ({invoices, accountInfo, loadingInvoices, selectedInvoiceId, onSelectInvoice}) => (
   <Grid fluid>
      <Row>
         <Col xs={12} sm={8} md={7} lg={6}>

            <Grid fluid>
               <Row>
                  <Col xs={12}>
                     <h2>Invoice history</h2>
                  </Col>
               </Row>
               <Row>
                  <Col xs={12}>
                     {
                        !loadingInvoices ?
                           invoices.map((invoice) => {
                              let header = <Grid fluid><Row><Col xs={8}>{`${moment.unix(invoice.period_start).format('YYYY MMM')}`}</Col><Col xs={4}><span  style={{float: 'right'}}>{`${invoice.currency.toUpperCase()} ${invoice.total / 100}`}</span></Col></Row></Grid>;
                              return <ListGroup>
                                 {selectedInvoiceId == invoice.id ?
                                    <ListGroupItem key={invoice.id}>
                                       <AccountPageInvoiceView invoice={invoice} accountInfo={accountInfo} />
                                    </ListGroupItem>
                                    :
                                    <ListGroupItem key={invoice.id} header={header} onClick={() => { onSelectInvoice(invoice.id) }}></ListGroupItem>
                                 }
                              </ListGroup>;
                           })
                           :
                           <div>Loading invoices, please be patient...</div>
                     }
                  </Col>
               </Row>
            </Grid>
         </Col>
      </Row>
   </Grid>
);

export = AccountPageInvoicesView;