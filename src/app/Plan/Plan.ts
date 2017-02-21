export let plans = {
   'free': {
      id: 'free',
      planId: ['free', 'free'],
      sortOrder: 0,
      visible: true,
      name: 'Free',
      invoiceName: ['Free', 'Free'],
      discount: [null, null],
      description: 'Forever free',
      price: [0,0],
      unit: ['monthly','annually'],
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

   'startup': {
      id: 'startup',
      planId: ['startup_month', 'startup_annual'],
      sortOrder: 1,
      visible: true,
      name: 'STARTUP',
      invoiceName: ['STARTUP plan, 1 month', 'STARTUP plan, 1 year in advance'],
      discount: [null, 72],
      description: 'Automated refresh and support',
      price: [39, 396],
      unit: ['monthly','annually'],
      features: [
         { type: 'header', text: "All features of FREE plus:" },
         { type: 'space' },
         { type: 'feature', text: "Automatic data refresh" },
         { type: 'subHeader', text: "Dimensions groups:" },
         { type: 'subFeatures', sub: ["User", "Goal conversions"] }
      ]
   },

   'business': {
      id: 'business',
      planId: ['business_month', 'business_annual'],
      sortOrder: 2,
      visible: true,
      name: 'BUSINESS',
      invoiceName: ['BUSINESS plan, 1 month', 'BUSINESS plan, 1 year in advance'],
      discount: [null, 360],
      description: 'For serious marketers and ecommerce managers',
      price: [149, 1428],
      unit: ['monthly','annually'],
      features: [
         { type: 'header', text: "All features of STARTUP plus:" },
         { type: 'space' },
         { type: 'feature', text: "Universal Analytics integration" },
/*         { type: 'feature', text: "Priority e-mail support" },*/
         { type: 'subHeader', text: "Dimension groups:" },
         { type: 'subFeatures', sub: ["Event tracking", "AdWords", "Ecommerce (basic)"] }
      ]
   },

   'growth': {
      id: 'growth',
      planId: ['growth_month', 'growth_annual'],
      sortOrder: 3,
      visible: true,
      name: 'GROWTH',
      invoiceName: ['GROWTH plan, 1 month', 'GROWTH plan, 1 year in advance'],
      discount: [null, 960],
      description: 'Optimize your e-business as you scale',
      price: [399, 3828],
      unit: ['monthly','annually'],
      features: [
         { type: 'header', text: "All features of BUSINESS plus:" },
         { type: 'space' },
         { type: 'feature', text: "Custom invoicing" },
         { type: 'feature', text: "Priority email support" },
         { type: 'subHeader', text: "Dimension groups:" },
         { type: 'subFeatures', sub: ["Custom Variables or Columns", "Content experiments", "Internal search", "Enhanced Ecommerce"] }
      ]
   }
};