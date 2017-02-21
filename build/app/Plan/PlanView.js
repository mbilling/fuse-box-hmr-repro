"use strict";
var React = require('react');
var react_bootstrap_1 = require('react-bootstrap');
var PlanView = function (_a) {
    var id = _a.id, selected = _a.selected, selectedText = _a.selectedText, highlighted = _a.highlighted, name = _a.name, description = _a.description, price = _a.price, unit = _a.unit, actionEnabled = _a.actionEnabled, actionText = _a.actionText, onAction = _a.onAction, features = _a.features, pitch = _a.pitch, children = _a.children;
    return React.createElement(react_bootstrap_1.Grid, {fluid: true, className: (highlighted ? 'plan planHL' : 'plan planDark') + (selected ? ' planSelected' : ''), style: { marginTop: highlighted || selected ? 0 : 30 }}, 
        selected || highlighted ?
            React.createElement(react_bootstrap_1.Row, null, 
                React.createElement(react_bootstrap_1.Col, {xs: 12, className: highlighted ? 'planSelectedHeaderHL' : 'planSelectedHeader'}, selectedText)
            ) :
            highlighted ? React.createElement(react_bootstrap_1.Row, null, 
                React.createElement(react_bootstrap_1.Col, {xs: 12, className: highlighted ? 'planUnselectedHeaderHL' : 'planUnselectedHeader'}, " ")
            ) : null, 
        React.createElement(react_bootstrap_1.Row, null, 
            React.createElement(react_bootstrap_1.Col, {xs: 12, className: highlighted ? "headSpacerHL" : ""}, " ")
        ), 
        React.createElement(react_bootstrap_1.Row, null, 
            React.createElement(react_bootstrap_1.Col, {xs: 12, className: highlighted ? 'planNameHL' : 'planName'}, name)
        ), 
        React.createElement(react_bootstrap_1.Row, null, 
            React.createElement(react_bootstrap_1.Col, {xs: 12, className: highlighted ? 'planDescriptionHL' : 'planDescription'}, description)
        ), 
        React.createElement(react_bootstrap_1.Row, null, 
            React.createElement(react_bootstrap_1.Col, {xs: 12, className: highlighted ? 'planDescriptionHL' : 'planDescription', style: { marginTop: 20 }}, 
                React.createElement("span", {className: highlighted ? 'dark' : 'orange'}, pitch)
            )
        ), 
        React.createElement(react_bootstrap_1.Row, null, 
            React.createElement(react_bootstrap_1.Col, {xs: 12}, 
                React.createElement("span", {className: highlighted ? 'planPriceHL' : 'planPrice'}, price), 
                React.createElement("span", {className: highlighted ? 'planPriceUnitHL' : 'planPriceUnit'}, unit == 'forever' ? ' ' : '/month'))
        ), 
        React.createElement(react_bootstrap_1.Row, null, 
            React.createElement(react_bootstrap_1.Col, {xs: 12}, 
                React.createElement("span", {className: highlighted ? 'planPriceUnitBillingHL' : 'planPriceUnitBilling'}, unit == 'annually' ? '(paid annually)' : React.createElement("br", null))
            )
        ), 
        React.createElement(react_bootstrap_1.Row, null, 
            React.createElement(react_bootstrap_1.Col, {xs: 12}, 
                React.createElement(react_bootstrap_1.Button, {bsStyle: "primary", className: highlighted ? 'planActionButtonHL' : 'planActionButton', onClick: onAction}, actionText)
            )
        ), 
        React.createElement(react_bootstrap_1.Row, null, 
            React.createElement(react_bootstrap_1.Col, {xs: 12}, 
                React.createElement("hr", {style: { width: '50%' }})
            )
        ), 
        React.createElement(react_bootstrap_1.Row, {style: { textAlign: 'center' }}, 
            React.createElement(react_bootstrap_1.Col, {xs: 12}, 
                React.createElement("div", {className: "planFeatureList"}, 
                    React.createElement("ul", {style: { margin: '0 auto' }}, features.map(function (feature) {
                        switch (feature.type) {
                            case 'header':
                                return React.createElement("li", {className: highlighted ? "planFeatureListHeaderHL" : "planFeatureListHeader"}, feature.text);
                            case 'space':
                                return React.createElement("li", {style: { listStyle: 'none' }}, " ");
                            case 'feature':
                                return React.createElement("li", {className: highlighted ? "planFeatureHL" : "planFeature"}, feature.text);
                            case 'subHeader':
                                return React.createElement("li", null, feature.text);
                            case 'subFeatures':
                                return React.createElement("li", {style: { listStyle: 'none' }}, 
                                    React.createElement("ul", {className: highlighted ? "planFeatureHL" : "planFeature"}, feature.sub.map(function (subFeature) {
                                        return React.createElement("li", null, subFeature);
                                    }))
                                );
                        }
                    }))
                )
            )
        ), 
        React.createElement(react_bootstrap_1.Row, null, 
            React.createElement(react_bootstrap_1.Col, {xs: 12}, " ")
        ));
};
module.exports = PlanView;
//# sourceMappingURL=PlanView.js.map