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
    // Divider,
    Avatar,
    // Skeleton,
    Input,
    Form,
    Space,
    Drawer,
    Cascader,
    Select,
    DatePicker,
  } from "antd";


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
        <Tabs defaultActiveKey="1" destroyInactiveTabPane={true}>
            <TabPane tab="DashBoard" key="1">
                <DashBoard />
            </TabPane>
            <TabPane tab="Reservation" key="2">
                <Reservation />
            </TabPane>
            <TabPane tab="Discussion" key="3">
                <Discussion />
            </TabPane>
        </Tabs>

        <Button type="primary" onClick={showCalendar}>
        calendar
        </Button>
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

class DashBoard extends React.Component {
    render() {
        return (
            <Row className="dashBorad">
                <Col span={14} className="public-invoice">
                   <PublicInvoice />
                </Col>
                <Col span={8} className="personal-invoice">
                    <PersonalInvoice />
                </Col>
            </Row>  
        );
    }
}

const PublicInvoice = () =>{
   // const [loading, setLoading] = useState(false);
   // const [data, setData] = useState([]);

    // const loadMoreData = () => {
    //     if (loading) {
    //       return;
    //     }
    
    //     setLoading(true);
    //     fetch()//数据
    //       .then((res) => res.json())
    //       .then((body) => {
    //         setData([...data, ...body.results]);
    //         setLoading(false);
    //       })
    //       .catch(() => {
    //         setLoading(false);
    //       });
    //   };

    // useEffect(() => {
    //     loadMoreData();
    // }, []);

    return (
        <>
            <div
                id="public-invoice"
                style={{
                  height: 700,
                  overflow: 'auto',
                  padding: '0 16px',
                  border: '1px solid rgba(140, 140, 140, 0.35)',
                }}
            >
                {/* <InfiniteScroll
                    dataLength={data.length}
                    next={loadMoreData}
                    hasMore={data.length < 50}
                    loader={
                    <Skeleton
                        avatar
                        paragraph={{
                        rows: 1,
                        }}
                        active
                    />
                    }
                    endMessage={<Divider plain>No more</Divider>}
                    scrollableTarget="public-invoice"
                >
                    <List
                        dataSource={data}
                        renderItem={(item) => (
                            <List.Item key={item.content}>
                                <List.Item.Meta
                                    avatar={<Avatar src={item.picture} />}
                                    title={<p>{item.name}</p>}
                                    description={item.content}
                                    //unfinished
                                />
                            </List.Item>

                        )}
                    />
                    </InfiniteScroll> */}
            </div>
        </>
    );
   
};

const PersonalInvoice = () => {
  const [visitReservation, setVisitReservation] = useState(false);
  const [visitPayment, setVisitPayment] = useState(false);
  const [visitMail, setVisitMail] = useState(false);
  const [visitOther, setVisitOther] = useState(false);
  const [countReservation, setCountReservation] = useState(0);
  const [countPayment, setCountPayment] = useState(0);
  const [countMail, setCountMail] = useState(0);
  const [countOther, setCountOther] = useState(0);
  const [reservationList] = useState([]);
  const [mailList] = useState([]);
  const [paymentList] = useState([]);
  const [otherList] = useState([]);

  const clickMailDrawer = () => {
    setVisitMail(true);
    setCountMail(0);
  };

  const clickOtherDrawer = () => {
    setVisitOther(true);
    setCountOther(0);
  };

  const clickReservationDrawer = () => {
    setVisitReservation(true);
    setCountReservation(0);
  };

  const clickPaymentDrawer = () => {
    setVisitPayment(true);
    setCountPayment(0);
  };

  const onReservationDrawerClose = () => {
    setVisitReservation(false);
  };

  const onPaymentDrawerClose = () => {
    setVisitPayment(false);
  };

  const onMailDrawerClose = () => {
    setVisitMail(false);
  };

  const onOtherDrawerClose = () => {
    setVisitOther(false);
  };

    return (
        <>
          <Space
            align="center"
            direction="vertical"
          >
            <div>
                <Button type="primary" onClick={clickMailDrawer}>
                Mail
                </Button>
                <Badge count={countMail}>
                 <Avatar shape="square" size="large" />
                </Badge>
            </div>
            <div>
                <Button type="primary" onClick={clickOtherDrawer}>
                Other
                </Button>
                <Badge count={countOther}>
                    <Avatar shape="square" size="large" />
                </Badge>
            </div>
            <div>
                <Button type="primary" onClick={clickReservationDrawer}>
                Reservation 
                </Button>
                <Badge count={countReservation}>
                    <Avatar shape="square" size="large" />
                </Badge>
            </div>
            <div>
                <Button type="primary" onClick={clickPaymentDrawer}>
                Payment
                </Button>
                <Badge count={countPayment}>
                    <Avatar shape="square" size="large" />
                </Badge>
            </div>
          </Space>

          <Drawer
            title={"Reservation"}
            placement="right"
            width={750}
            visible={visitReservation}
            onClose={onReservationDrawerClose}
            extra={
                <>
                  <Button onClick={onReservationDrawerClose}>Close</Button>
                </>
              }
          >
            <List
                className="reservation-drawer"
                itemLayout="horizontal"
                dataSource={reservationList}
            >
                {(item) => (
                    <List.Item>{item}</List.Item>
                 )}
            </List>
          </Drawer>
          <Drawer
            title={"Payment"}
            placement="right"
            width={750}
            visible={visitPayment}
            onClose={onPaymentDrawerClose}
            extra={
                  <Button onClick={onPaymentDrawerClose}>Close</Button>
              }
          >
            <List
                className="payment-drawer"
                itemLayout="horizontal"
                dataSource={paymentList}
            >
                {(item) => (
                    <List.Item>{item}</List.Item>
                 )}
            </List>
          </Drawer>
          <Drawer
            title={"Mail"}
            placement="right"
            width={750}
            visible={visitMail}
            onClose={onMailDrawerClose}
            extra={
                  <Button onClick={onMailDrawerClose}>Close</Button>
              }
          >
            <List
                className="mail-drawer"
                itemLayout="horizontal"
                dataSource={mailList}
            >
                 {(item) => (
                    <List.Item>{item}</List.Item>
                 )}
            </List>
          </Drawer>
          <Drawer
            title={"Other"}
            placement="right"
            width={750}
            visible={visitOther}
            onClose={onOtherDrawerClose}
            extra={
                  <Button onClick={onOtherDrawerClose}>Close</Button>
              }
          >
            <List
                className="other-drawer"
                itemLayout="horizontal"
                dataSource={otherList}
            >
                 {(item) => (
                    <List.Item>{item}</List.Item>
                 )}
            </List>
          </Drawer>
        </>
      )
};

class Reservation extends React.Component {
    render() {
        return (
         <>
           <Tabs defaultActiveKey="1" destroyInactiveTabPane={true}>
             <TabPane tab="Maintenance" key="1">
                 <Maintenance />
             </TabPane>
             <TabPane tab="PublicUtilities" key="2">
                 <PublicUtilities />
             </TabPane>
           </Tabs>
         </>
        );   
     }
}

const Maintenance = () => {
    const [maintenanceList] = useState([]);

    const onMaintenanceSubmit = async (values) => {
        const formData = new FormData();
        const { files } = this.fileInputRef.current;
    
        if (files.length > 5) {
          message.error("You can at most upload 5 pictures.");
          return;
        }
    
        for (let i = 0; i < files.length; i++) {
          formData.append("images", files[i]);
        }
    
        formData.append("name", values.name);
        formData.append("room", values.room);
        formData.append("description", values.description);
    
        try {
        //  await uploadStay(formData);
          message.success("upload successfully");
        } catch (error) {
          message.error(error.message);
        } 
    }

    const fileInputRef = React.createRef();

    return (
        <>
            <div
            
            >
                <Form
                    className="problem-submit"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    onFinish={onMaintenanceSubmit}
                    >
                    <Form.Item
                        name="room"
                        label="Room"
                        rules={[{ required: true, message: 'Please input your Room' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[{ required: true, message: 'Please input your Name' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="description" 
                        label="Description"
                        rules={[{ required: true, message: 'Please input your Description' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item 
                        name="picture" 
                        label="Picture" 
                        rules={[{ required: true, message: "upload" }]}
                    >
                        <Input
                        type="file"
                        accept="image/png, image/jpeg"
                        ref={fileInputRef}
                        multiple={true}
                        />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                        Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            <div
            
            >
                <List
                    className="maintenance-history"
                    itemLayout="horizontal"
                    dataSource={maintenanceList}
                    renderItem={item => (
                        <List.Item>{item}</List.Item>
                    )}
                />
            </div>
        </>
    );
}

const PublicUtilities = () => {
    const [reservationList] = useState([]);
    const [utilitiesType] = useState([]);
    const onPublicSubmit = () => {}

    return (
        <>
            <div
            
            >
                <Form
                    className="problem-submit"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    onFinish={onPublicSubmit}
                    >
                    <Form.Item
                        name="type"
                        label="Type"
                        rules={[{ required: true }]}
                    >
                        <Cascader 
                            options={
                                <List
                                    className="utilities-type"
                                    itemLayout="horizontal"
                                    dataSource={utilitiesType}
                                />
                            } 
                         />
                    </Form.Item>
                    <Form.Item 
                        name="date"     
                        label="Date"
                        rules={[{ required: true }]}
                    >
                      <DatePicker />
                    </Form.Item>
                    <Form.Item
                        name="time"
                        label="Time"
                        rules={[{ required: true }]}
                    >
                      <Select placeholder="Please select time">
                        <Select.Option value="morning">Morning</Select.Option>
                        <Select.Option value="afternoon">Afternoon</Select.Option>
                        <Select.Option value="evening">Evening</Select.Option>
                    </Select>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                        Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            <div
            
            >
                <List
                    className="reservation-history"
                    itemLayout="horizontal"
                    dataSource={reservationList}
                    renderItem={(item) => (
                        <List.Item>{item}</List.Item>
                     )}
                />
            </div>
        </>
    );
}

 const Discussion = () =>{
//     const [loading, setLoading] = useState(false);
//     const [data, setData] = useState([]);

//     const loadMoreData = () => {
//         if (loading) {
//           return;
//         }
    
//         setLoading(true);
//         fetch()//数据
//           .then((res) => res.json())
//           .then((body) => {
//             setData([...data, ...body.results]);
//             setLoading(false);
//           })
//           .catch(() => {
//             setLoading(false);
//           });
//       };

//     useEffect(() => {
//         loadMoreData();
//     }, []);

     const onDiscussionSubmit = () => {};

     return (
//         <>
//             <div
//                 id="dicussionMessage"
//                 style={{
//                   height: 400,
//                   overflow: 'auto',
//                   padding: '0 16px',
//                   border: '1px solid rgba(140, 140, 140, 0.35)',
//                 }}
//             >
//                 <InfiniteScroll
//                     dataLength={data.length}
//                     next={loadMoreData}
//                     hasMore={data.length < 50}
//                     loader={
//                     <Skeleton
//                         avatar
//                         paragraph={{
//                         rows: 1,
//                         }}
//                         active
//                     />
//                     }
//                     endMessage={<Divider plain>No more</Divider>}
//                     scrollableTarget="dicussionMessage"
//                 >
//                     <List
//                         dataSource={data}
//                         renderItem={(item) => (
//                             <List.Item key={item.content}>
//                                 <List.Item.Meta
//                                     avatar={<Avatar src={item.picture} />}
//                                     title={<p>{item.name}</p>}
//                                     description={item.content}
//                                     //unfinished
//                                 />
//                             </List.Item>

//                         )}
//                     />
//                     </InfiniteScroll>
//             </div>
            <div
            
            >
                <Form
                    className="discussion-send"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    onFinish={onDiscussionSubmit}
                    >
                    <Form.Item
                        label="Text"
                        rules={[{ required: true, message: 'Please input your Text' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                        send
                        </Button>
                    </Form.Item>
                </Form>
            </div>
//       </>
     );
 }

export default ResidentHomePage;