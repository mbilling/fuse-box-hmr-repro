import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Grid, Tab, Nav, NavItem, Row, Col, FormGroup, ControlLabel, FormControl, Button, MenuItem, Fade } from 'react-bootstrap';
import * as _ from 'lodash';
import * as Select from 'react-select';

//require("react-select/dist/react-select.css");

interface IProps {
   name?: string;
   address?: string;
   city?: string;
   zip?: string;
   region?: string;
   country?: string;
   countryIso?: string;
   vatNo?: string;
   countries?: Array<any>;
   onChange?: (field, value) => void;
   onSave?: () => void;
   onRevert?: () => void;
   onNext?: () => void;
   displayRevert?: boolean;
   saving?: boolean;
   wizardMode?: boolean;
}

type ValidationState = "success" | "warning" | "error" | null;
let tst = [];
tst.push(/^(AT)U(\d{8})$/);                           //** Austria
tst.push(/^(BE)(0?\d{9})$/);                          //** Belgium 
tst.push(/^(BG)(\d{9,10})$/);                         //** Bulgaria 
tst.push(/^(CY)([0-59]\d{7}[A-Z])$/);                 //** Cyprus
tst.push(/^(CZ)(\d{8,10})(\d{3})?$/);                 //** Czech Republic
tst.push(/^(DE)([1-9]\d{8})$/);                       //** Germany 
tst.push(/^(DK)(\d{8})$/);                            //** Denmark 
tst.push(/^(EE)(10\d{7})$/);                          //** Estonia 
tst.push(/^(EL)(\d{9})$/);                            //** Greece 
tst.push(/^(ES)([A-Z]\d{8})$/);                       //** Spain (National juridical entities)
tst.push(/^(ES)([A-HN-SW]\d{7}[A-J])$/);              //** Spain (Other juridical entities)
tst.push(/^(ES)([0-9YZ]\d{7}[A-Z])$/);                //** Spain (Personal entities type 1)
tst.push(/^(ES)([KLMX]\d{7}[A-Z])$/);                 //** Spain (Personal entities type 2)
tst.push(/^(EU)(\d{9})$/);                            //** EU-type 
tst.push(/^(FI)(\d{8})$/);                            //** Finland 
tst.push(/^(FR)(\d{11})$/);                           //** France (1)
tst.push(/^(FR)([A-HJ-NP-Z]\d{10})$/);                // France (2)
tst.push(/^(FR)(\d[A-HJ-NP-Z]\d{9})$/);               // France (3)
tst.push(/^(FR)([A-HJ-NP-Z]{2}\d{9})$/);              // France (4)
tst.push(/^(GB)?(\d{9})$/);                           //** UK (Standard)
tst.push(/^(GB)?(\d{12})$/);                          //** UK (Branches)
tst.push(/^(GB)?(GD\d{3})$/);                         //** UK (Government)
tst.push(/^(GB)?(HA\d{3})$/);                         //** UK (Health authority)
tst.push(/^(HR)(\d{11})$/);                           //** Croatia 
tst.push(/^(HU)(\d{8})$/);                            //** Hungary 
tst.push(/^(IE)(\d{7}[A-W])$/);                       //** Ireland (1)
tst.push(/^(IE)([7-9][A-Z\*\+)]\d{5}[A-W])$/);        //** Ireland (2)
tst.push(/^(IE)(\d{7}[A-W][AH])$/);                   //** Ireland (3)
tst.push(/^(IT)(\d{11})$/);                           //** Italy 
tst.push(/^(LV)(\d{11})$/);                           //** Latvia 
tst.push(/^(LT)(\d{9}|\d{12})$/);                     //** Lithuania
tst.push(/^(LU)(\d{8})$/);                            //** Luxembourg 
tst.push(/^(MT)([1-9]\d{7})$/);                       //** Malta
tst.push(/^(NL)(\d{9})B\d{2}$/);                      //** Netherlands
tst.push(/^(PL)(\d{10})$/);                           //** Poland
tst.push(/^(PT)(\d{9})$/);                            //** Portugal
tst.push(/^(RO)([1-9]\d{1,9})$/);                     //** Romania
tst.push(/^(SI)([1-9]\d{7})$/);                       //** Slovenia
tst.push(/^(SK)([1-9]\d[2346-9]\d{7})$/);             //** Slovakia
tst.push(/^(SE)(\d{10}01)$/);                         //** Sweden

const AccountPageInformationView: React.StatelessComponent<IProps> = ({name, address, city, zip, region, country, countryIso, vatNo, countries, onChange, onSave, onRevert, onNext, saving, wizardMode}) => {

   this.onSave = onSave;
   this.onRevert = onRevert;
   this.onNext = onNext;

   let defaultValidation = (value, minLength = 1) => {
      if (!!value) {
         return (value.length > 0 ? 'success' : null) as ValidationState;
      }
      return null as ValidationState;
   };

   let defaultValidationVAT = (value) => {

      if (!!value) {
         value = value.replace(/(\s|-|\.)+/g, '');
         var valid = false;
         for (let i = 0; i < tst.length; i++) {
            if (tst[i].test(value)) {
               valid = true;
               return 'success' as ValidationState;
            }
         }
      }
      else
         return null as ValidationState;
      return 'error' as ValidationState;
   };

   let displayState = countryIso == 'US';
   let displayVAT = ['Austria', 'Belgium', 'Bulgaria', 'Cyprus', 'Czech Republic', 'Germany', 'Denmark', 'Estonia',
      'Greece', 'Spain', 'Finland', 'France', 'United Kingdom', 'Croatia', 'Hungary', 'Ireland', 'Italy', 'Latvia', 'Lithuania',
      'Luxembourg', 'Malta', 'Netherlands', 'Poland', 'Portugal', 'Romania', 'Slovenia', 'Slovakia', 'Sweden', 'Faroe Islands'].indexOf(country) > -1;

   return <form>
      <Grid fluid>
         <Row>
            <Col xs={12} sm={8} md={7} lg={6}>

               <Grid fluid>
                  <Row>
                     <Col xs={12}>
                        <h2>Invoice information</h2>
                     </Col>
                  </Row>
                  <FormGroup controlId="company" validationState={defaultValidation(name)}>
                     <Row>
                        <Col xs={12}>
                           <ControlLabel>Company name</ControlLabel>
                           <FormControl
                              type="text"
                              value={name}
                              placeholder="Enter company name..."
                              onChange={(event) => { onChange('name', event.target['value']) } }
                              />
                        </Col>
                     </Row>
                  </FormGroup>

                  <FormGroup controlId="address" name="ship-address" validationState={defaultValidation(address)}>
                     <Row>
                        <Col xs={12}>
                           <ControlLabel>Address</ControlLabel>
                           <FormControl
                              type="text"
                              value={address}
                              placeholder="Enter address..."
                              onChange={(event) => { onChange('address', event.target['value']) } }
                              />
                        </Col>
                     </Row>
                  </FormGroup>

                  <FormGroup controlId="city" name="ship-city" validationState={defaultValidation(city)}>
                     <Row>
                        <Col xs={12}>
                           <ControlLabel>City</ControlLabel>
                           <FormControl
                              type="text"
                              value={city}
                              placeholder="Enter city..."
                              onChange={(event) => { onChange('city', event.target['value']) } }
                              />
                        </Col>
                     </Row>
                  </FormGroup>

                  <FormGroup controlId="zip" name="ship-zip" validationState={defaultValidation(zip, 4)}>
                     <Row>
                        <Col xs={12}>
                           <ControlLabel>Zip code</ControlLabel>
                           <FormControl
                              type="text"
                              value={zip}
                              placeholder="Enter zip code..."
                              onChange={(event) => { onChange('zip', event.target['value']) } }
                              />
                        </Col>
                     </Row>
                  </FormGroup>

                  <Row>
                     <Col xs={12}>
                        <ControlLabel>Country</ControlLabel>
                     </Col>
                  </Row>
                  <Row>
                     <Col xs={12} style={{ marginBottom: 15 }}>
                        <Select
                           name="form-field-name"
                           value={country}
                           options={countries}
                           onChange={(value) => { onChange('country', value['name']); onChange('countryIso', value['code']) } }
                           labelKey="name"
                           valueKey="name"
                           autoBlur
                           placeholder="Select country..."
                           clearable={false}
                           style={{ borderColor: '#3c763d' }}
                           />
                     </Col>
                  </Row>

                  {!!displayState ?
                     <FormGroup controlId="formRegion" name="ship-state" validationState={defaultValidation(region)}>
                        <Row>
                           <Col xs={12}>
                              <ControlLabel>State</ControlLabel>
                              <FormControl
                                 type="text"
                                 value={region}
                                 placeholder={`Enter state of ${country}`}
                                 onChange={(event) => { onChange('region', event.target['value']) } }
                                 />
                           </Col>
                        </Row>
                     </FormGroup> : null}

                  {!!displayVAT ?
                     <FormGroup controlId="formVatNo" validationState={defaultValidationVAT(vatNo)}>
                        <Row>
                           <Col xs={12}>
                              <ControlLabel>VAT identification number</ControlLabel>
                              <FormControl
                                 type="text"
                                 value={vatNo}
                                 placeholder="Enter VAT number..."
                                 onChange={(event) => { onChange('vatNo', event.target['value']) } }
                                 />
                           </Col>
                        </Row>
                     </FormGroup> : null}


                  {!!wizardMode ?
                     <Row>
                        <Col xs={12}>
                           <Button onClick={this.onNext} bsStyle="orange" style={{ float: 'right' }}>NEXT</Button>
                           &nbsp;
                           <Button onClick={this.onRevert} bsStyle="link" style={{ float: 'right' }}>back</Button>
                        </Col>
                     </Row>
                     :
                     <Row>
                        <Col xs={8}>
                        </Col>
                        <Col xs={4}>
                           <Button onClick={this.onSave} bsStyle="primary" style={{ float: 'right', width: 80 }}>
                              {!!saving ?
                                 <Fade in={!!saving}>
                                    <span>Saving...</span>
                                 </Fade>
                                 :
                                 <Fade in={!saving}>
                                    <span>Save</span>
                                 </Fade>
                              }
                           </Button>
                        </Col>
                     </Row>
                  }
               </Grid>
            </Col>
         </Row>
      </Grid>
   </form>
};

export = AccountPageInformationView;