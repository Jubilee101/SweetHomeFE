import React from "react";
import {
    Tabs,
} from "antd";
import Discussion from "./Discussion";
import DashBoardManager from "./DashBoardManager";
import ReservationManager from "./ReservationManager";

const { TabPane } = Tabs;

class ManagerHomePage extends React.Component {

    render() {
        return (
         <>
           <Tabs defaultActiveKey="1" destroyInactiveTabPane={true}>
             <TabPane tab="DashBoard" key="1">
                 <DashBoardManager />
             </TabPane>
             <TabPane tab="Reservation" key="2">
                 <ReservationManager />
             </TabPane>
             <TabPane tab="Discussion" key="3">
                 <Discussion />
             </TabPane>
           </Tabs>
         </>
        );   
     }
}

export default ManagerHomePage;
