import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Parse = require("parse");

import Marketing = require('../Tools/Marketing');
import PlanView = require('./PlanView');

interface IProps {
   id: string;
   selected: boolean;
   selectedText?: string;
   highlighted: boolean;
   name: string;
   description: string;
   price: string;
   unit: 'monthly' | 'annually';
   actionEnabled: boolean;
   actionText: string;
   onAction: (id) => void;
   features: Array<any>;
   children?: any;
   pitch?: string;
}

interface IState {
}

class PlanController extends React.Component<IProps, IState> {

   constructor(props: any) {
      super(props);

      this.state = {
      }
   }

   render() {
      return <PlanView {...this.props}/>;
   }
}

export = PlanController;