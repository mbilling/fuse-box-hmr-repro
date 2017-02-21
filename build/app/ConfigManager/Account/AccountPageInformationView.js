"use strict";
var _this = this;
var React = require('react');
var react_bootstrap_1 = require('react-bootstrap');
var Select = require('react-select');
var tst = [];
tst.push(/^(AT)U(\d{8})$/);
tst.push(/^(BE)(0?\d{9})$/);
tst.push(/^(BG)(\d{9,10})$/);
tst.push(/^(CY)([0-59]\d{7}[A-Z])$/);
tst.push(/^(CZ)(\d{8,10})(\d{3})?$/);
tst.push(/^(DE)([1-9]\d{8})$/);
tst.push(/^(DK)(\d{8})$/);
tst.push(/^(EE)(10\d{7})$/);
tst.push(/^(EL)(\d{9})$/);
tst.push(/^(ES)([A-Z]\d{8})$/);
tst.push(/^(ES)([A-HN-SW]\d{7}[A-J])$/);
tst.push(/^(ES)([0-9YZ]\d{7}[A-Z])$/);
tst.push(/^(ES)([KLMX]\d{7}[A-Z])$/);
tst.push(/^(EU)(\d{9})$/);
tst.push(/^(FI)(\d{8})$/);
tst.push(/^(FR)(\d{11})$/);
tst.push(/^(FR)([A-HJ-NP-Z]\d{10})$/);
tst.push(/^(FR)(\d[A-HJ-NP-Z]\d{9})$/);
tst.push(/^(FR)([A-HJ-NP-Z]{2}\d{9})$/);
tst.push(/^(GB)?(\d{9})$/);
tst.push(/^(GB)?(\d{12})$/);
tst.push(/^(GB)?(GD\d{3})$/);
tst.push(/^(GB)?(HA\d{3})$/);
tst.push(/^(HR)(\d{11})$/);
tst.push(/^(HU)(\d{8})$/);
tst.push(/^(IE)(\d{7}[A-W])$/);
tst.push(/^(IE)([7-9][A-Z\*\+)]\d{5}[A-W])$/);
tst.push(/^(IE)(\d{7}[A-W][AH])$/);
tst.push(/^(IT)(\d{11})$/);
tst.push(/^(LV)(\d{11})$/);
tst.push(/^(LT)(\d{9}|\d{12})$/);
tst.push(/^(LU)(\d{8})$/);
tst.push(/^(MT)([1-9]\d{7})$/);
tst.push(/^(NL)(\d{9})B\d{2}$/);
tst.push(/^(PL)(\d{10})$/);
tst.push(/^(PT)(\d{9})$/);
tst.push(/^(RO)([1-9]\d{1,9})$/);
tst.push(/^(SI)([1-9]\d{7})$/);
tst.push(/^(SK)([1-9]\d[2346-9]\d{7})$/);
tst.push(/^(SE)(\d{10}01)$/);
var AccountPageInformationView = function (_a) {
    var name = _a.name, address = _a.address, city = _a.city, zip = _a.zip, region = _a.region, country = _a.country, countryIso = _a.countryIso, vatNo = _a.vatNo, countries = _a.countries, onChange = _a.onChange, onSave = _a.onSave, onRevert = _a.onRevert, onNext = _a.onNext, saving = _a.saving, wizardMode = _a.wizardMode;
    _this.onSave = onSave;
    _this.onRevert = onRevert;
    _this.onNext = onNext;
    var defaultValidation = function (value, minLength) {
        if (minLength === void 0) { minLength = 1; }
        if (!!value) {
            return (value.length > 0 ? 'success' : null);
        }
        return null;
    };
    var defaultValidationVAT = function (value) {
        if (!!value) {
            value = value.replace(/(\s|-|\.)+/g, '');
            var valid = false;
            for (var i = 0; i < tst.length; i++) {
                if (tst[i].test(value)) {
                    valid = true;
                    return 'success';
                }
            }
        }
        else
            return null;
        return 'error';
    };
    var displayState = countryIso == 'US';
    var displayVAT = ['Austria', 'Belgium', 'Bulgaria', 'Cyprus', 'Czech Republic', 'Germany', 'Denmark', 'Estonia',
        'Greece', 'Spain', 'Finland', 'France', 'United Kingdom', 'Croatia', 'Hungary', 'Ireland', 'Italy', 'Latvia', 'Lithuania',
        'Luxembourg', 'Malta', 'Netherlands', 'Poland', 'Portugal', 'Romania', 'Slovenia', 'Slovakia', 'Sweden', 'Faroe Islands'].indexOf(country) > -1;
    return React.createElement("form", null, 
        React.createElement(react_bootstrap_1.Grid, {fluid: true}, 
            React.createElement(react_bootstrap_1.Row, null, 
                React.createElement(react_bootstrap_1.Col, {xs: 12, sm: 8, md: 7, lg: 6}, 
                    React.createElement(react_bootstrap_1.Grid, {fluid: true}, 
                        React.createElement(react_bootstrap_1.Row, null, 
                            React.createElement(react_bootstrap_1.Col, {xs: 12}, 
                                React.createElement("h2", null, "Invoice information")
                            )
                        ), 
                        React.createElement(react_bootstrap_1.FormGroup, {controlId: "company", validationState: defaultValidation(name)}, 
                            React.createElement(react_bootstrap_1.Row, null, 
                                React.createElement(react_bootstrap_1.Col, {xs: 12}, 
                                    React.createElement(react_bootstrap_1.ControlLabel, null, "Company name"), 
                                    React.createElement(react_bootstrap_1.FormControl, {type: "text", value: name, placeholder: "Enter company name...", onChange: function (event) { onChange('name', event.target['value']); }}))
                            )
                        ), 
                        React.createElement(react_bootstrap_1.FormGroup, {controlId: "address", name: "ship-address", validationState: defaultValidation(address)}, 
                            React.createElement(react_bootstrap_1.Row, null, 
                                React.createElement(react_bootstrap_1.Col, {xs: 12}, 
                                    React.createElement(react_bootstrap_1.ControlLabel, null, "Address"), 
                                    React.createElement(react_bootstrap_1.FormControl, {type: "text", value: address, placeholder: "Enter address...", onChange: function (event) { onChange('address', event.target['value']); }}))
                            )
                        ), 
                        React.createElement(react_bootstrap_1.FormGroup, {controlId: "city", name: "ship-city", validationState: defaultValidation(city)}, 
                            React.createElement(react_bootstrap_1.Row, null, 
                                React.createElement(react_bootstrap_1.Col, {xs: 12}, 
                                    React.createElement(react_bootstrap_1.ControlLabel, null, "City"), 
                                    React.createElement(react_bootstrap_1.FormControl, {type: "text", value: city, placeholder: "Enter city...", onChange: function (event) { onChange('city', event.target['value']); }}))
                            )
                        ), 
                        React.createElement(react_bootstrap_1.FormGroup, {controlId: "zip", name: "ship-zip", validationState: defaultValidation(zip, 4)}, 
                            React.createElement(react_bootstrap_1.Row, null, 
                                React.createElement(react_bootstrap_1.Col, {xs: 12}, 
                                    React.createElement(react_bootstrap_1.ControlLabel, null, "Zip code"), 
                                    React.createElement(react_bootstrap_1.FormControl, {type: "text", value: zip, placeholder: "Enter zip code...", onChange: function (event) { onChange('zip', event.target['value']); }}))
                            )
                        ), 
                        React.createElement(react_bootstrap_1.Row, null, 
                            React.createElement(react_bootstrap_1.Col, {xs: 12}, 
                                React.createElement(react_bootstrap_1.ControlLabel, null, "Country")
                            )
                        ), 
                        React.createElement(react_bootstrap_1.Row, null, 
                            React.createElement(react_bootstrap_1.Col, {xs: 12, style: { marginBottom: 15 }}, 
                                React.createElement(Select, {name: "form-field-name", value: country, options: countries, onChange: function (value) { onChange('country', value['name']); onChange('countryIso', value['code']); }, labelKey: "name", valueKey: "name", autoBlur: true, placeholder: "Select country...", clearable: false, style: { borderColor: '#3c763d' }})
                            )
                        ), 
                        !!displayState ?
                            React.createElement(react_bootstrap_1.FormGroup, {controlId: "formRegion", name: "ship-state", validationState: defaultValidation(region)}, 
                                React.createElement(react_bootstrap_1.Row, null, 
                                    React.createElement(react_bootstrap_1.Col, {xs: 12}, 
                                        React.createElement(react_bootstrap_1.ControlLabel, null, "State"), 
                                        React.createElement(react_bootstrap_1.FormControl, {type: "text", value: region, placeholder: "Enter state of " + country, onChange: function (event) { onChange('region', event.target['value']); }}))
                                )
                            ) : null, 
                        !!displayVAT ?
                            React.createElement(react_bootstrap_1.FormGroup, {controlId: "formVatNo", validationState: defaultValidationVAT(vatNo)}, 
                                React.createElement(react_bootstrap_1.Row, null, 
                                    React.createElement(react_bootstrap_1.Col, {xs: 12}, 
                                        React.createElement(react_bootstrap_1.ControlLabel, null, "VAT identification number"), 
                                        React.createElement(react_bootstrap_1.FormControl, {type: "text", value: vatNo, placeholder: "Enter VAT number...", onChange: function (event) { onChange('vatNo', event.target['value']); }}))
                                )
                            ) : null, 
                        !!wizardMode ?
                            React.createElement(react_bootstrap_1.Row, null, 
                                React.createElement(react_bootstrap_1.Col, {xs: 12}, 
                                    React.createElement(react_bootstrap_1.Button, {onClick: _this.onNext, bsStyle: "orange", style: { float: 'right' }}, "NEXT"), 
                                    " ", 
                                    React.createElement(react_bootstrap_1.Button, {onClick: _this.onRevert, bsStyle: "link", style: { float: 'right' }}, "back"))
                            )
                            :
                                React.createElement(react_bootstrap_1.Row, null, 
                                    React.createElement(react_bootstrap_1.Col, {xs: 8}), 
                                    React.createElement(react_bootstrap_1.Col, {xs: 4}, 
                                        React.createElement(react_bootstrap_1.Button, {onClick: _this.onSave, bsStyle: "primary", style: { float: 'right', width: 80 }}, !!saving ?
                                            React.createElement(react_bootstrap_1.Fade, {in: !!saving}, 
                                                React.createElement("span", null, "Saving...")
                                            )
                                            :
                                                React.createElement(react_bootstrap_1.Fade, {in: !saving}, 
                                                    React.createElement("span", null, "Save")
                                                ))
                                    )))
                )
            )
        )
    );
};
module.exports = AccountPageInformationView;
//# sourceMappingURL=AccountPageInformationView.js.map