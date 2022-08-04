import React, { 
    //useEffect, 
    useState } from "react";
import {
    Tabs,
    Modal,
    Button,
    Calendar,
    Badge,
    Row,
    Col,
    List,
    message,
    //Divider,
    Avatar,
    //Skeleton,
    Input,
    Form,
    Space,
    Drawer,
    Cascader,
    Select,
    DatePicker,
    Layout,
    Typography
  } from "antd";
import DashBoard from "./DashBoard";
import Reservation from "./Reservation";
import Discussion from "./Discussion";
import "../styles/ResidentHomePage.css";
import { PieChartOutlined, CarryOutOutlined, CommentOutlined } from "@ant-design/icons"

const { TabPane } = Tabs;
const { Content } = Layout;
const { Title } = Typography;

const ResidentHomePage = () => {
    const [calendarVisitable, setCalendarVisitable] = useState(false);

    const showCalendar = () => {
        setCalendarVisitable(true);
    };

    const handleCancel = () => {
        setCalendarVisitable(false);
    };

    // const getListData = (value) => {};
      //reservation list
    // const getMonthData = (value) => {};

    const monthCellRender = (value) => {
        // const num = getMonthData(value);
        // return num ? (
        //     <div className="notes-month">
        //     <section>{num}</section>
        //     <span>Backlog number</span>
        //     </div>
        // ) : null;
    };

    const dateCellRender = (value) => {
     //function(date: Moment): ReactNode
        // const listData = getListData(value);
        // return (
        //     <ul className="events">
        //     {listData.map((item) => (
        //         <li key={item.content}>
        //         <Badge status={item.type} text={item.content} />
        //         </li>
        //     ))}
        //     </ul>
        // );
    };

    return (
        <Layout
                className="site-layout"
                >
                <Content className="site-layout-background">
                    <Tabs
                        className="nav-tabs" style={{ height: "90vh"}} size={"middle"} tabPosition={"left"} defaultActiveKey="1" destroyInactiveTabPane={true}>
                        <TabPane
                            className="dashboard-content"
                            style={{height: "100%"}}
                            tab={
                                <span>
                                    <div >
                                        <PieChartOutlined />
                                    </div>
                                    <div style={{ fontSize: "12px", fontWeight: "700" }}>
                                        Dashboard
                                    </div>
                                </span>
                            } key="1">
                            <DashBoard />
                        </TabPane>
                        <TabPane tab={
                            <span>
                                <div>
                                    <CarryOutOutlined />
                                </div>
                                <div style={{ fontSize: "12px", fontWeight: "700" }}>
                                    Reservation
                                </div>
                            </span>}
                            key="2">
                                
                                  <Reservation />  
                        </TabPane>
                        <TabPane tab={
                            <span>
                                <div>
                                    <CommentOutlined />
                                </div>
                                <div style={{ fontSize: "12px", fontWeight: "700" }}>
                                    Discussion
                                </div>
                            </span>} key="3">
                            <Discussion />
                        </TabPane>
                    </Tabs>
                    {/* 
        <Button type="primary" onClick={showCalendar}>
        calendar
        </Button> */}
        <Modal 
        title="calendar" 
        visible={calendarVisitable} 
        onCancel={handleCancel}
        >
            <Calendar 
            dateCellRender={dateCellRender} 
            //the display of the date cell, the returned content will be appended to the cell
            monthCellRender={monthCellRender} 
            />;
        </Modal>
                </Content>
            </Layout>
    );   
}

export default ResidentHomePage;