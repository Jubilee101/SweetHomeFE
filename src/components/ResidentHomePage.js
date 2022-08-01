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
  } from "antd";
import Dashboard from "./DashBoard";
import Reservation from "./Reservation";
import Discussion from "./Discussion";
import "../styles/ResidentHomePage.css";

const { TabPane } = Tabs;

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
    <>
        <div className="HomePagetabs">
        <Tabs defaultActiveKey="1" destroyInactiveTabPane={true} >
            <TabPane tab="DashBoard" key="1">
                <Dashboard />
            </TabPane>
            <TabPane tab="Reservation" key="2">
                <Reservation />
            </TabPane>
            <TabPane tab="Discussion" key="3">
                <Discussion />
            </TabPane>
        </Tabs>
        </div>
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
    </>
    );   
}

export default ResidentHomePage;