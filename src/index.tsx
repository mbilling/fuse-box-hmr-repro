import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Parse from 'parse';

import App = require('./app/AppAccount');
//import App = require('./app/App');

//require("./css/default.less");

Parse.initialize('key', undefined);
Parse.serverURL = location.protocol + '//' + location.host + '/parse';

ReactDOM.render(<App />, document.getElementById('react'));
