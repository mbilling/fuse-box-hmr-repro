import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Grid, Tab, Nav, NavItem, Row, Col, Button, Alert, Modal, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import * as _ from 'lodash';

import PlanController = require('../../Plan/PlanController');
import Plan = require('../../Plan/Product');

interface IProps {
   planId: string;
   unit: string;
   showCancelConfirm: boolean;
   cancelReason: string;
   onAction: (id) => void;
   onSelectUnit: (id) => void;
   onCancelPlan: () => void;
   onConfirmedCancelPlan: () => void;
   onKeepPlan: () => void;
   onChangeValue: (name, value) => void;
}

const AccountPagePlanView: React.StatelessComponent<IProps> = ({planId, unit, showCancelConfirm, cancelReason, onAction, onSelectUnit, onCancelPlan, onConfirmedCancelPlan, onKeepPlan, onChangeValue}) => {

   let plans = [];
   _.each(Plan.plans, (plan) => {
      if (plan.visible && ['forever', unit].indexOf(plan.unit) != -1) {
         plans.push(plan);
      }
   })

   let orderedPlans = _.sortBy(plans, (plan) => plan.sortOrder)

   // View cancelConfirm if needed
   let cancelConfirm = <Modal show={showCancelConfirm} onHide={onKeepPlan} className="modal-orange">
      <Modal.Header closeButton className="modal-header-orange">
         <Modal.Title>PLEASE CONFIRM CANCELLATION...</Modal.Title>
      </Modal.Header>
      <Modal.Body>
         <h4>Do you really want to cancel your plan?</h4>
         <p style={{fontWeight: 100, fontSize: 13}}>If you cancel, we will not charge you any more. The remaining time on the plan is still valid.</p>
         <br />

         <FormGroup controlId="cancelReason" name="cancelReason">
            <Row>
               <Col xs={12}>
                  <ControlLabel style={{ fontWeight: 100 }}>Please, provide us with some feedback:</ControlLabel>
                  <FormControl
                     componentClass="textarea"
                     value={cancelReason}
                     placeholder="The reason I cancel my plan is..."
                     onChange={(event) => { onChangeValue('cancelReason', event.target['value']) } }
                     multiple
                     />
               </Col>
            </Row>
         </FormGroup>

      </Modal.Body>
      <Modal.Footer>
         <Button bsStyle="orange" style={{ float: 'right' }} onClick={onConfirmedCancelPlan}>YES</Button>
         <Button bsStyle="link" style={{ float: 'right' }} onClick={onKeepPlan}>NO</Button>
      </Modal.Footer>
   </Modal>;

   return <Grid fluid style={{ padding: 0 }}>

      {cancelConfirm}

      <Row>
         <Col xs={12} style={{ textAlign: 'center', maxWidth: 1080 }}>
            <Button className={unit == 'annually' ? 'selectedPlanInterval' : 'planInterval'} bsStyle={unit == 'annually' ? 'primary' : null} onClick={() => { onSelectUnit('annually') } }>ANNUALLY</Button>
            <Button className={unit == 'monthly' ? 'selectedPlanInterval' : 'planInterval'} bsStyle={unit == 'monthly' ? 'primary' : null} onClick={() => { onSelectUnit('monthly') } }>MONTHLY</Button>
         </Col>
      </Row>

      <Row>
         <Col xs={12}>&nbsp;</Col>
      </Row>

      <Row>
         <Col xs={12} className="plans">
            {
               orderedPlans.map((plan) => {

                  let pitch = plan.unit == 'forever' ? '' : plan.pitch;
                  let price = plan.unit == 'forever' ? 'FREE' : '$' + (plan.unit == 'annually' ? plan.price / 12 : plan.price);

                  return <div className="planWrapper" style={{ float: 'left' }}>
                     <PlanController
                        actionEnabled={true}
                        highlighted={false}
                        selected={planId == plan.id}
                        id={plan.id}
                        name={plan.name}
                        pitch={pitch}
                        description={plan.description}
                        price={price}
                        unit={plan.unit}
                        actionText={planId == plan.id ? 'CANCEL PLAN' : 'CHOOSE PLAN'}
                        onAction={() => { planId == plan.id ? onCancelPlan() : onAction(plan.id) } }
                        selectedText={'CURRENT PLAN'}
                        features={plan.features}>
                     </PlanController>
                  </div>
               })
            }
         </Col>
      </Row>
   </Grid>
};

export = AccountPagePlanView;