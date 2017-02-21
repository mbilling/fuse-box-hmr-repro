import * as React from 'react';

require('./App.less');

interface Props { }
interface State { }

class App extends React.Component<Props, State> {

   constructor(props: Props) {
      super(props);

   }

   render() {
      return <div className="title">Hello World</div>;
   }
}

export = App;
