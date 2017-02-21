"use strict";
exports.plans = {
    'free': {
        id: 'free',
        stripe: false,
        trial: -1,
        sortOrder: 0,
        visible: true,
        name: 'FREE',
        invoiceName: 'FREE',
        pitch: '',
        description: 'Let it grow on you',
        price: 0,
        unit: 'forever',
        features: [
            { type: 'header', text: "Included features:" },
            { type: 'space' },
            { type: 'feature', text: "Manual data refresh" },
            { type: 'feature', text: "Power BI / Excel Templates" },
            { type: 'feature', text: "E-mail support" },
            { type: 'feature', text: "3 Google Analytics Views" },
            { type: 'subHeader', text: "Dimension groups:" },
            { type: 'subFeatures', sub: ["Page tracking", "Traffic sources", "Platform or device", "Geo network", "System"] }
        ]
    },
    'startup_month': {
        id: 'startup_month',
        stripe: true,
        trial: 30,
        sortOrder: 1,
        visible: true,
        name: 'STARTUP',
        invoiceName: 'STARTUP plan, 1 month',
        pitch: 'Save $72 on annual plan',
        description: 'Automated refresh and support',
        price: 39,
        unit: 'monthly',
        stripe_unit: 'month',
        features: [
            { type: 'header', text: "All features of FREE plus:" },
            { type: 'space' },
            { type: 'feature', text: "Automatic data refresh" },
            { type: 'subHeader', text: "Dimensions groups:" },
            { type: 'subFeatures', sub: ["User", "Goal conversions", "Internal search"] }
        ],
        metaData: {
            type: 'main'
        }
    },
    'startup_annual': {
        id: 'startup_annual',
        stripe: true,
        trial: 30,
        sortOrder: 1,
        visible: true,
        name: 'STARTUP',
        invoiceName: 'STARTUP plan, 1 year in advance',
        pitch: '$72 saved anually',
        description: 'Automated refresh and support',
        price: 396,
        unit: 'annually',
        stripe_unit: 'year',
        features: [
            { type: 'header', text: "All features of FREE plus:" },
            { type: 'space' },
            { type: 'feature', text: "Automatic data refresh" },
            { type: 'subHeader', text: "Dimensions groups:" },
            { type: 'subFeatures', sub: ["User", "Goal conversions", "Internal search"] }
        ],
        metaData: {
            type: 'main'
        }
    },
    'business_month': {
        id: 'business_month',
        stripe: true,
        trial: 30,
        sortOrder: 2,
        visible: true,
        name: 'BUSINESS',
        invoiceName: 'BUSINESS plan, 1 month',
        pitch: 'Save $360 on annual plan',
        description: 'For serious marketers and ecommerce managers',
        price: 149,
        unit: 'monthly',
        stripe_unit: 'month',
        features: [
            { type: 'header', text: "All features of STARTUP plus:" },
            { type: 'space' },
            { type: 'feature', text: "Universal Analytics integration" },
            { type: 'subHeader', text: "Dimension groups:" },
            { type: 'subFeatures', sub: ["Event tracking", "AdWords", "Ecommerce (basic)"] }
        ],
        metaData: {
            type: 'main'
        }
    },
    'business_annual': {
        id: 'business_annual',
        stripe: true,
        trial: 30,
        sortOrder: 2,
        visible: true,
        name: 'BUSINESS',
        invoiceName: 'BUSINESS plan, 1 year in advance',
        pitch: '$360 saved anually',
        description: 'For serious marketers and ecommerce managers',
        price: 1428,
        unit: 'annually',
        stripe_unit: 'year',
        features: [
            { type: 'header', text: "All features of STARTUP plus:" },
            { type: 'space' },
            { type: 'feature', text: "Universal Analytics integration" },
            { type: 'subHeader', text: "Dimension groups:" },
            { type: 'subFeatures', sub: ["Event tracking", "AdWords", "Ecommerce (basic)"] }
        ],
        metaData: {
            type: 'main'
        }
    },
    'growth_month': {
        id: 'growth_month',
        stripe: true,
        trial: 30,
        sortOrder: 3,
        visible: true,
        name: 'GROWTH',
        invoiceName: 'GROWTH plan, 1 month',
        pitch: 'Save $960 on annual plan',
        description: 'Optimize your e-business as you scale',
        price: 399,
        unit: 'monthly',
        stripe_unit: 'month',
        features: [
            { type: 'header', text: "All features of BUSINESS plus:" },
            { type: 'space' },
            { type: 'feature', text: "Custom invoicing" },
            { type: 'feature', text: "Priority email support" },
            { type: 'subHeader', text: "Dimension groups:" },
            { type: 'subFeatures', sub: ["Custom Variables or Columns", "Content experiments", "Enhanced Ecommerce"] }
        ],
        metaData: {
            type: 'main'
        }
    },
    'growth_annual': {
        id: 'growth_annual',
        stripe: true,
        trial: 30,
        sortOrder: 3,
        visible: true,
        name: 'GROWTH',
        invoiceName: 'GROWTH plan, 1 year in advance',
        pitch: '$960 saved anually',
        description: 'Optimize your e-business as you scale',
        price: 3828,
        unit: 'annually',
        stripe_unit: 'year',
        features: [
            { type: 'header', text: "All features of BUSINESS plus:" },
            { type: 'space' },
            { type: 'feature', text: "Custom invoicing" },
            { type: 'feature', text: "Priority email support" },
            { type: 'subHeader', text: "Dimension groups:" },
            { type: 'subFeatures', sub: ["Custom Variables or Columns", "Content experiments", "Enhanced Ecommerce"] }
        ],
        metaData: {
            type: 'main'
        }
    }
};
var Tools = (function () {
    function Tools() {
    }
    Tools.getLicenseSpan = function (planId) {
        var unit = exports.plans[planId].unit;
        if (unit == 'monthly')
            return { unit: 'month', count: 1 };
        if (unit == 'annually')
            return { unit: 'year', count: 1 };
        return { unit: 'month', count: 1 };
    };
    return Tools;
}());
exports.Tools = Tools;
//# sourceMappingURL=Product.js.map