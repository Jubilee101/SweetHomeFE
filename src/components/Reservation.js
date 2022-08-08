import React, { useState, useEffect } from "react";
import {RequestDetailButton} from "./ReservationManager"
import {
    Button,
    Row,
    Col,
    message,
    Tabs,
    List,
    Modal,
    DatePicker,
    Input,
    Form,
    Select,
    Layout,
    TimePicker,
    Card,
    Carousel,
    Tooltip,
    Space,
    Typography,
    Image,
} from "antd";
import {
    LeftCircleFilled,
    RightCircleFilled,
    InfoCircleOutlined,
  } from "@ant-design/icons";
import {
    getAllPublicUtils,
    getAllMaintenanceRequestById,
    reservePublicUtil,
    getAvailableTimeFrame,
    listAllPublicUtilsReservations,
} from "../utils"

import "../styles/ReservationManager.css"
const { Content } = Layout;
const { TextArea } = Input;
const { Option } = Select;
const { TabPane } = Tabs;
const { Text } = Typography;

const Reservation = () => {
        return (
            <Layout
            className="reservation-layout"
            >
        <Row>
            <Col className="maintenance-title-col">
                <Content className="maintenance-title-col-content">
                    Reserve Maintenance/Utils
                    </Content>
                </Col>
            <Col className="public-utils-title-col">
                <Content className="public-utils-title-col-content">
                    All Reservation
                </Content>
            </Col>
        </Row>
        <Row className="reservation-row-layout">
            <Col className="maintenance-col" >
                <Content
                className="manager-reservation-content">
                    <ReserveSomething/>
                </Content>
            </Col>
            <Col className="public-utils-col">
                <Content className="public-utils-content">
                    <ReservationList/>
                </Content>
            </Col>
        </Row>
    </Layout>           
    );
}

const ReserveSomething = () => {
    return (
        <div className="card-container">
            <Tabs defaultActiveKey="1" type="card">
                <TabPane tab="Maintenance" key="1">
                    <>maintenance</>
                </TabPane>
                <TabPane tab="Utils" key="2">
                    <>utils</>
                </TabPane>
            </Tabs>
        </div>
    );
}

const ReservationList = () => {
    return (
        <div className="card-container">
            <Tabs defaultActiveKey="1" type="card">
                <TabPane tab="Maintenance" key="1">
                    <MaintenanceList/>
                </TabPane>
                <TabPane tab="Utils" key="2">
                    <UtilsList/>
                </TabPane>
            </Tabs>
        </div>
    );
}

const MaintenanceList = () => {
    const [loading, setLoading] = useState(false);
    const [maintenanceList, setMaintenanceList] = useState([])
    const getAllRequests = async () => {
        try {
            setLoading(true);
            const resp = await getAllMaintenanceRequestById();
            setMaintenanceList(oldData => [...resp]);
        } catch (error) {
            message.error(error.message);
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        getAllRequests();
    }, [])
    return (
        <Content>
        <div>
            <List
                className="manager-maintenance-list"
                size="middle"
                loading={loading}
                dataSource={maintenanceList}
                renderItem={(item) => (
                    <List.Item>
                        <Card
                            key={item.id}
                            title={
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <Text ellipsis={true} 
                                    style={item.start_time !== null ? {} : { color : "red"}}>
                                        {item.user.name + ' ' + item.user.room}
                                    </Text>
                                    < RequestDetailButton item={item} />
                                </div>
                            }
                        >
                            {item.description}
                        </Card>
                    </List.Item>
                )} 
            />
        </div>
        </Content>
    )
}

const UtilsList = () => {
    const [loading, setLoading] = useState(false)
    const [utils, setUtils] = useState([])
    const getAllUtils = async () => {
        try {
            setLoading(true);
            const resp = await listAllPublicUtilsReservations();
            setUtils(oldData => [...resp]);
        } catch (error) {
            message.error(error.message);
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        getAllUtils();
    }, [])
    console.log(utils)
    return (
        <Content>
        <div>
            <List
                className="manager-maintenance-list"
                size="middle"
                loading={loading}
                dataSource={utils}
                renderItem={(item) => (
                    <List.Item>
                        <Card
                            
                            key={item.id}
                            title={
                                <div style={{ alignItems: "center" }}>
                                    <Text ellipsis={true}>
                                        {item.category}
                                    </Text>
                                </div>
                            }
                        >
                            {
                                <div>
                                    <p>
                                        Name: {item.user.name + ' ' + item.user.room}
                                    </p>
                                    <p>
                                        Date: {item.date}
                                        
                                    </p>
                                    <p>
                                        Time Slot: {item.time_frame}
                                    </p>     
        
                                </div>
                            }
                        </Card>
                    </List.Item>
                )} 
            />
        </div>
        </Content>
    )
}

// const Maintenance = () => {
//     const [maintenanceList] = useState([]);

//     const onMaintenanceSubmit = async (values) => {
//         const formData = new FormData();
//         const { files } = this.fileInputRef.current;

//         if (files.length > 5) {
//             message.error("You can at most upload 5 pictures.");
//             return;
//         }

//         for (let i = 0; i < files.length; i++) {
//             formData.append("images", files[i]);
//         }

//         formData.append("name", values.name);
//         formData.append("room", values.room);
//         formData.append("description", values.description);

//         try {
//             //  await uploadStay(formData);
//             message.success("upload successfully");
//         } catch (error) {
//             message.error(error.message);
//         }
//     }

//     const fileInputRef = React.createRef();

//     return (
//         <>
//             <div

//             >
//                 <Form
//                     className="problem-submit"
//                     labelCol={{ span: 8 }}
//                     wrapperCol={{ span: 16 }}
//                     onFinish={onMaintenanceSubmit}
//                 >
//                     <Form.Item
//                         name="room"
//                         label="Room"
//                         rules={[{ required: true, message: 'Please input your Room' }]}
//                     >
//                         <Input />
//                     </Form.Item>
//                     <Form.Item
//                         name="name"
//                         label="Name"
//                         rules={[{ required: true, message: 'Please input your Name' }]}
//                     >
//                         <Input />
//                     </Form.Item>
//                     <Form.Item
//                         name="description"
//                         label="Description"
//                         rules={[{ required: true, message: 'Please input your Description' }]}
//                     >
//                         <Input />
//                     </Form.Item>
//                     <Form.Item
//                         name="picture"
//                         label="Picture"
//                         rules={[{ required: true, message: "upload" }]}
//                     >
//                         <Input
//                             type="file"
//                             accept="image/png, image/jpeg"
//                             ref={fileInputRef}
//                             multiple={true}
//                         />
//                     </Form.Item>
//                     <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
//                         <Button type="primary" htmlType="submit">
//                             Submit
//                         </Button>
//                     </Form.Item>
//                 </Form>
//             </div>
//             <div

//             >
//                 <List
//                     className="maintenance-history"
//                     itemLayout="horizontal"
//                     dataSource={maintenanceList}
//                     renderItem={item => (
//                         <List.Item>{item}</List.Item>
//                     )}
//                 />
//             </div>
//         </>
//     );
// }

// const PublicUtilities = () => {
//     const [reservationList] = useState([]);
//     //  const [utilitiesType] = useState([]);
//     const onPublicSubmit = () => { }

//     return (
//         <>
//             <div

//             >
//                 <Form
//                     className="problem-submit"
//                     labelCol={{ span: 8 }}
//                     wrapperCol={{ span: 16 }}
//                     onFinish={onPublicSubmit}
//                 >
//                     <Form.Item
//                         name="type"
//                         label="Type"
//                         rules={[{ required: true }]}
//                     >
//                         {/* <Cascader 
//                             options={} 
//                          /> */}
//                     </Form.Item>
//                     <Form.Item
//                         name="date"
//                         label="Date"
//                         rules={[{ required: true }]}
//                     >
//                         <DatePicker />
//                     </Form.Item>
//                     <Form.Item
//                         name="time"
//                         label="Time"
//                         rules={[{ required: true }]}
//                     >
//                         <Select placeholder="Please select time">
//                             <Select.Option value="morning">Morning</Select.Option>
//                             <Select.Option value="afternoon">Afternoon</Select.Option>
//                             <Select.Option value="evening">Evening</Select.Option>
//                         </Select>
//                     </Form.Item>
//                     <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
//                         <Button type="primary" htmlType="submit">
//                             Submit
//                         </Button>
//                     </Form.Item>
//                 </Form>
//             </div>
//             <div >
//                 <List
//                     className="reservation-history"
//                     itemLayout="horizontal"
//                     dataSource={reservationList}
//                     renderItem={(item) => (
//                         <List.Item>{item}</List.Item>
//                     )}
//                 />
//             </div>
//         </>
//     );
// }

export default Reservation;