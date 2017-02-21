import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Grid, Tab, Nav, NavItem, Row, Col } from 'react-bootstrap';

interface IProps {
   pages: Array<string>;
   selectedPage: string;
   selectedPageContent: React.ReactNode;
   onSelectPage: (name) => void;
}

const AccountPagesView: React.StatelessComponent<IProps> = ({pages, selectedPage, selectedPageContent, onSelectPage}) => {

   return <Tab.Container defaultActiveKey={selectedPage} className="accountPagesView">
      <Grid fluid>
         <Row>
            <Col xs={4} sm={2} md={2} lg={2}>
               <Nav bsStyle="pills" stacked>
                  {
                     pages.map((view, index) => {
                        return <NavItem key={'navitem' + index} eventKey={view} onSelect={() => { onSelectPage(index) } } bsStyle="primary">
                           {view}
                        </NavItem>
                     })
                  }
               </Nav>
            </Col>
            <Col xs={8} sm={10} md={10} lg={10}>
               {selectedPageContent}
            </Col>
         </Row>
      </Grid>
   </Tab.Container>
}
export = AccountPagesView;