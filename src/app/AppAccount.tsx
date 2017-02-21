import Parse = require("parse");
import React = require("react");

import AccountPagesController = require('./ConfigManager/Account/AccountPagesController');

interface Props { }
interface State { }

class App extends React.Component<Props, State> {

   constructor(props: Props) {
      super(props);

   }

   render() {
      return <div style={{ backgroundColor: 'white', paddingTop: 20, paddingBottom: 20 }}>
         <AccountPagesController />
      </div>;
   }

}

export = App;
