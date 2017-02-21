import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Grid, Tab, Nav, NavItem, Row, Col, Button } from 'react-bootstrap';

interface IProps {
   id: string;
   selected: boolean;
   selectedText: string;
   highlighted: boolean;
   name: string;
   description: string;
   price: string;
   unit: 'monthly' | 'annually' | 'forever';
   actionEnabled: boolean;
   actionText: string;
   onAction: (id) => void;
   features: Array<any>;
   pitch: string;
   children?: any;
}

const PlanView: React.StatelessComponent<IProps> = ({id, selected, selectedText, highlighted, name, description, price, unit, actionEnabled, actionText, onAction, features, pitch, children}) => {

   return <Grid fluid className={(highlighted ? 'plan planHL' : 'plan planDark') + (selected ? ' planSelected' : '')} style={{ marginTop: highlighted || selected ? 0 : 30 }}>

      {/* selected header */}
      {
         selected || highlighted ?
            <Row>
               <Col xs={12} className={highlighted ? 'planSelectedHeaderHL' : 'planSelectedHeader'}>
                  {selectedText}
               </Col>
            </Row> :

            highlighted ? <Row>
               <Col xs={12} className={highlighted ? 'planUnselectedHeaderHL' : 'planUnselectedHeader'}>
                  &nbsp;
               </Col>
            </Row> : null
      }

      {/* padding */}
      <Row>
         <Col xs={12} className={highlighted ? "headSpacerHL" : ""}>
            &nbsp;
            </Col>
      </Row>

      {/* Plan name */}
      <Row>
         <Col xs={12} className={highlighted ? 'planNameHL' : 'planName'}>
            {name}
         </Col>
      </Row>

      {/* Plan description */}
      <Row>
         <Col xs={12} className={highlighted ? 'planDescriptionHL' : 'planDescription'}>
            {description}
         </Col>
      </Row>

      {/* Plan pitch */}
      <Row>
         <Col xs={12} className={highlighted ? 'planDescriptionHL' : 'planDescription'} style={{ marginTop: 20 }}>
            <span className={highlighted ? 'dark' : 'orange'}>{pitch}</span>
         </Col>
      </Row>

      {/* Plan price */}
      <Row>
         <Col xs={12}>
            <span className={highlighted ? 'planPriceHL' : 'planPrice'}>{price}</span><span className={highlighted ? 'planPriceUnitHL' : 'planPriceUnit'}>
               {
                  unit == 'forever' ? ' ' : '/month'
               }
            </span>
         </Col>
      </Row>

      {/* Plan price unit desciption */}
      <Row>
         <Col xs={12}>
            <span className={highlighted ? 'planPriceUnitBillingHL' : 'planPriceUnitBilling'}>{unit == 'annually' ? '(paid annually)' : <br />}</span>
         </Col>
      </Row>

      {/* Action button */}
      <Row>
         <Col xs={12}>
            <Button bsStyle="primary" className={highlighted ? 'planActionButtonHL' : 'planActionButton'} onClick={onAction}>{actionText}</Button>
         </Col>
      </Row>

      {/* Divider */}
      <Row>
         <Col xs={12}>
            <hr style={{ width: '50%' }} />
         </Col>
      </Row>

      {/* Features */}
      <Row style={{ textAlign: 'center' }}>
         <Col xs={12} >
            <div className="planFeatureList">
               <ul style={{ margin: '0 auto' }}>
                  {
                     features.map((feature) => {
                        switch (feature.type) {
                           case 'header':
                              return <li className={highlighted ? "planFeatureListHeaderHL" : "planFeatureListHeader"}>{feature.text}</li>;
                           case 'space':
                              return <li style={{ listStyle: 'none' }}>&nbsp;</li>;
                           case 'feature':
                              return <li className={highlighted ? "planFeatureHL" : "planFeature"}>{feature.text}</li>;
                           case 'subHeader':
                              return <li>{feature.text}</li>;
                           case 'subFeatures':
                              return <li style={{ listStyle: 'none' }}>
                                 <ul className={highlighted ? "planFeatureHL" : "planFeature"}>
                                    {feature.sub.map((subFeature) => {
                                       return <li>{subFeature}</li>
                                    })}
                                 </ul>
                              </li>
                        }
                     })
                  }
               </ul>
            </div>
         </Col>
      </Row>


      {/* padding */}
      <Row>
         <Col xs={12}>
            &nbsp;
            </Col>
      </Row>
   </Grid >;
}
export = PlanView;