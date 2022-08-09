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
    sendMaintenanceRequest,
} from "../utils"

import "../styles/ReservationManager.css"
const { Content } = Layout;
const { TextArea } = Input;
const { Option } = Select;
const { TabPane } = Tabs;
const { Text } = Typography;

const Reservation = () => {
    const [maintenanceList, setMaintenanceList] = useState([])
    const [utils, setUtils] = useState([])
    const [loadingMaintenance, setLoadingMaintenance] = useState(false);
    const [loadingUtils, setLoadingUtils] = useState(false);
    const getAllRequests = async () => {
        try {
            setLoadingMaintenance(true)
            const resp = await getAllMaintenanceRequestById();
            setMaintenanceList(oldData => [...resp]);
        } catch (error) {
            message.error(error.message);
        } finally {
            setLoadingMaintenance(false);
        }
    }
    const getAllUtils = async () => {
        try {
            setLoadingUtils(true);
            const resp = await listAllPublicUtilsReservations();
            setUtils(oldData => [...resp]);
        } catch (error) {
            message.error(error.message);
        } finally {
            setLoadingUtils(false);
        }
    }
    useEffect(() => {
        getAllRequests();
        getAllUtils()
    }, []);
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
            <Col className="maintenance-col" span={7}>
                <Content
                className="manager-reservation-content">
                    <ReserveSomething 
                    getAllRequests={getAllRequests}
                    getAllUtils={getAllUtils}
                    />
                </Content>
            </Col>
            <Col className="public-utils-col" span={7}>
                <Content className="public-utils-content">
                    <ReservationList 
                    maintenanceList={maintenanceList}
                    utils={utils}
                    loadingMaintenance={loadingMaintenance}
                    loadingUtils={loadingUtils}
                    />
                </Content>
            </Col>
        </Row>
    </Layout>           
    );
}

const ReserveSomething = ({getAllRequests, getAllUtils}) => {
    return (
        <div className="card-container">
            <Tabs defaultActiveKey="1" type="card">
                <TabPane tab="Maintenance" key="1">
                    <SendMaintenanceRequest getAllRequests={getAllRequests}/>
                </TabPane>
                <TabPane tab="Utils" key="2">
                    <>utils</>
                </TabPane>
            </Tabs>
        </div>
    );
}

const ReservationList = ({maintenanceList, utils, loadingMaintenance, loadingUtils}) => {
    return (
        <div className="card-container">
            <Tabs defaultActiveKey="1" type="card">
                <TabPane tab="Maintenance" key="1">
                    <MaintenanceList 
                    maintenanceList={maintenanceList}
                    loadingMaintenance={loadingMaintenance}
                    />
                </TabPane>
                <TabPane tab="Utils" key="2">
                    <UtilsList 
                    utils={utils}
                    loadingUtils={loadingUtils}
                    />
                </TabPane>
            </Tabs>
        </div>
    );
}

const MaintenanceList = ({maintenanceList, loadingMaintenance}) => {
    return (
        <Content>
        <div>
            <List
                className="manager-maintenance-list"
                grid={{ gutter: 0, column: 1 }}
                size="middle"
                loading={loadingMaintenance}
                dataSource={maintenanceList}
                renderItem={(item) => (
                    <List.Item>
                        <Card
                            key={item.id}
                            title={
                                <div className="card-content">
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

const UtilsList = ({utils, loadingUtils}) => {
    return (
        <Content>
        <div>
            <List
                className="manager-maintenance-list"
                grid={{ gutter: 0, column: 1 }}
                size="middle"
                loading={loadingUtils}
                dataSource={utils}
                renderItem={(item) => (
                    <List.Item>
                        <Card
                            key={item.id}
                            title={
                                <div sclassName="card-content">
                                    <Text ellipsis={true}>
                                        {item.category}
                                    </Text>
                                </div>
                                
                            }
                        >
                            {
                                <div>
                                    <p>
                                        <Text ellipsis={true} >
                                        Date: {item.date}
                                        </Text>
                                        <br/>
                                        <br/>
                                        <Text ellipsis={true} >
                                        Time Slot: {item.time_frame}
                                        
                                        </Text>
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

const SendMaintenanceRequest = ({setMaintenanceList}) => {
    const [loading, setLoading] = useState(false);
    const fileInputRef = React.createRef();
    const onMaintenanceSubmit = async (values) => {
        const formData = new FormData();
        const { files } = fileInputRef.current;
        
        if (files.length > 5) {
            message.error("You can at most upload 5 pictures.");
            return;
        }

        for (let i = 0; i < files.length; i++) {
            formData.append("images", files[i]);
        }

        formData.append("description", values.description);
        setLoading(true);
        try {
            await sendMaintenanceRequest(formData);
            message.success("upload successfully");
            setMaintenanceList();
        } catch (error) {
            message.error(error.message);
        } finally {
            setLoading(false);
        }
    }
    return (
    <div>
        <Form
            className="problem-submit"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            onFinish={onMaintenanceSubmit}
        >
            <Form.Item
                name="description"
                label="Description"
                rules={[{ required: true, message: 'Input your Description' }]}
            >
                <TextArea showCount maxLength={150}/>
            </Form.Item>
            <Form.Item
                name="picture"
                label="Picture"
                rules={[{ required: true, message: "Upload images for demostration" }]}
            >
                <Input
                    type="file"
                    accept="image/png, image/jpeg"
                    ref={fileInputRef}
                    multiple={true}
                />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button 
                type="primary" 
                htmlType="submit"
                loading={loading}
                >
                    Submit
                </Button>
            </Form.Item>
        </Form>
    </div>
);
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