import React, {
    //useEffect, 
    useState
} from "react";
import {
    Tabs,
    Modal,
    Button,
    Row,
    Col,
    List,
    message,
    Input,
    Form,
    Select,
    DatePicker,
    Layout,
    Menu,
} from "antd";

import { sendPublicInvoice, sendPersonalInvoice } from "../utils";
import Discussion from "./Discussion";
import { PieChartOutlined, CarryOutOutlined, CommentOutlined } from "@ant-design/icons"
import DashBoardManager from "./DashBoardManager";
import ReservationManager from "./ReservationManager"
import "../styles/ManagerHomePage.css"
const { Sider, Header, Dropdown, Content, } = Layout;
const { TabPane } = Tabs;
const { TextArea } = Input;

class ManagerHomePage extends React.Component {

    render() {
        return (

            <Layout
                className="site-layout">
                {/* <Sider>
                            place holder
                        </Sider> */}
                <Content className="site-layout-background">
                    <Tabs
                        className="nav-tabs" style={{ height: "90vh" }} size={"large"} tabPosition={"left"} defaultActiveKey="1" destroyInactiveTabPane={true}>
                        <TabPane
                        className="dash-board-content" 
                        tab={
                            <span>
                                <div >
                                    <PieChartOutlined />
                                </div>
                                <div style={{fontSize: "18px", fontWeight: "600"}}>
                                    Dashboard
                                </div>       
                            </span>
                        } key="1">

                            <DashBoardManager/>
                        </TabPane>
                        <TabPane tab={
                            <span>
                            <div>
                                <CarryOutOutlined />
                            </div>
                            <div style={{fontSize: "18px", fontWeight: "600"}}>
                                Reservation
                            </div>       
                        </span>}
                            key="2">
                            <ReservationManager />
                        </TabPane>
                        <TabPane tab={
                           <span>
                           <div>
                               <CommentOutlined />
                           </div>
                           <div style={{fontSize: "18px", fontWeight: "600"}}>
                               Discussion
                           </div>       
                       </span>} key="3">
                            <Discussion />
                        </TabPane>
                    </Tabs>
                </Content>
            </Layout>

        );
    }
}

export default ManagerHomePage;
