import React, { useState, useEffect } from "react";
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
    addPublicUtil,
    getAllPublicUtils,
    listAllReservations,
    cancelReservation,
    updateMaintenanceRequest,
} from "../utils"

import "../styles/ReservationManager.css"
const { Content } = Layout;
const { TextArea } = Input;
const {Option} = Select;
const {TabPane} = Tabs;
const { Text } = Typography;
const ReservationManager = () => {
    return (
        <Layout
            className="manager-reservation-layout"
        >
            <Row>
                <Col className="maintenance-title-col">
                    <Content className="maintenance-title-col-content">
                        Maintenance Requests
                        </Content>
                    </Col>
                <Col className="public-utils-title-col">
                    <Content className="public-utils-title-col-content">
                        Public Utilties
                    </Content>
                </Col>
            </Row>
            <Row className="reservation-row-layout">
                <Col className="maintenance-col" >
                    <Content
                    className="manager-reservation-content">
                        <MaintenancePanel/>
                    </Content>
                </Col>
                <Col className="public-utils-col">
                    <Content className="public-utils-content">
                        <PublicUtilsPanel/>
                    </Content>
                </Col>
            </Row>
        </Layout>
    );
}

const PublicUtilsPanel = () => {
    return (
    <Content className="manager-reservation-form-content">
        <div className="card-container">
            <Tabs defaultActiveKey="1" type="card">
                <TabPane tab="Add Utils" key="1">
                    <AddPublicUtilForm/>
                </TabPane>
                <TabPane tab="Cancel Reservation" key="2">
                    <CancelReservationForm/>
                </TabPane>
            </Tabs>
        </div>
</Content>)
}

const CancelReservationForm = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const loadData = async () => {
        try {
            const resp = await getAllPublicUtils();
            setCategories(oldData => [...resp]);
        } catch (error) {
            message.error(error.message);
        }
    }
    useEffect(() => {
        loadData();
    }, []);

    const list = [].slice.call(categories)
    const selectList = list.map((item) => (
            <Option value={item.category}>{item.category}</Option>
        ))

    const onCancelSubmit = async(data) => { 
        const formData = new FormData();
        formData.append("category", data.category);
        formData.append("date", data.date.format("YYYY-MM-DD"));
        formData.append("time_frame", data.time_frame);
        setLoading(true);
        console.log(formData)
        try {
            await cancelReservation(formData);
            message.success("successfully cancel reservation");
        } catch(error) {
            message.error(error.message);
        } finally{
            setLoading(false);
        }
    };
    return (
        <>
            <Form
                className="public-cancel"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                onFinish={onCancelSubmit}
            >
                <Form.Item
                    label="Category"
                    name="category"
                    rules={[{ required: true, message: 'Category' }]}
                >
                    <Select>
                        {selectList}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Date"
                    name="date"
                    rules={[{required: true, message: "pick the date to cancel!"}]}
                >
                    <DatePicker />
                </Form.Item>
                <Form.Item
                    label="Time Slot"
                    name="time_frame"
                    rules={[{required: true, message: "pick the time slot to cancel!"}]}
                >
                    <Select>
                        <Option value='8:00 -- 12:00 AM'>8:00 -- 12:00 AM</Option>
                        <Option value='12:00 -- 6:00 PM'>12:00 -- 6:00 PM</Option>
                        <Option value='6:00 -- 11:50 PM'>6:00 -- 11:50 PM</Option>
                    </Select>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        shape="round"
                        size="medium"
                        loading={loading}
                    >
                        cancel
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}

const AddPublicUtilForm = () => {
    const [loading, setLoading] = useState(false);
    const onAddSubmit = async (data) => {
        const formData = new FormData();
        formData.append("category", data.category);
        formData.append("description", data.description);
        setLoading(true);
        try {
            await addPublicUtil(formData);
            message.success("successfully added public util");
        } catch(error) {
            message.error(error.message);
        } finally{
            setLoading(false);
        }
    }
    return (
    <>
        <Form
            className="public-add"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            onFinish={onAddSubmit}
        >
            <Form.Item
                label="Category"
                name="category"
                rules={[{ required: true, message: 'category name required' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
            label="Description"
            name = "description"
            rules={[{ required: true, message: 'Say something about this util!' }]}
            >
                <TextArea showCount maxLength={150} />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button
                    type="primary"
                    htmlType="submit"
                    shape="round"
                    size="medium"
                    loading={loading}
                >
                    Add Utility
                </Button>
            </Form.Item>
        </Form>
    </>
    );
}

const MaintenancePanel = () => {
    const [maintenanceList, setMaintenanceList] = useState([])
    const getAllRequests = async () => {
        try {
            const resp = await listAllReservations();
            setMaintenanceList(resp);
        } catch (error) {
            message.error(error.message);
        }
    }
    useEffect(() => {
        getAllRequests();
    }, [])

    return (
        <Content>
        <div>
            <List
                className="manager-maintenance"
                itemLayout="horizontal"
                dataSource={maintenanceList}
                renderItem={(item) => (
                    <List.Item>
                        <Card
                            key={item.id}
                            title={
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <Text ellipsis={true} 
                                    style={item.time === null ? { maxWidth: 150 } : {maxWidth: 150, color : "red"}}>
                                        {item.user.name + ' ' + item.user.room}
                                    </Text>
                                    < RequestDetailButton item={item} />
                                </div>
                            }
                            extra={<UpdateTimeButton id={item.id}/>}
                        >
                            <Carousel
                                dots={false}
                                arrows={true}
                                prevArrow={<LeftCircleFilled />}
                                nextArrow={<RightCircleFilled/>}
                            >
                                {item.maintenanceImages.map((image, index) => (
                                <div key={index}>
                                    <Image src={image.url} width="100%" />
                                </div>
                                ))}
                            </Carousel>
                        </Card>
                    </List.Item>
                )}
            > 
            </List>
            </div>
            </Content>
    )
}

const UpdateTimeButton = ({id}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleUpdate = () => {
        setModalVisible(true);
    };
    const handleCancel = () => {
        setModalVisible(false);
    }
    const onUpdateSubmit = async (values) => {
        const formData = new FormData();
        formData.append("date", values.date);
        formData.append("time", values.time);
        setLoading(true);
        try {
            await updateMaintenanceRequest(id, formData);
            message.success("Successfully update time")
        } catch (error) {
            message.error(error.message)
        } finally {
            setLoading(false)
        }
    };

    const dateFormat = "YYYY-MM-DD";
    const timeFormat = 'HH:mm'
    return (
        <>
        <Button 
        type="primary"
        shape="round"
        size="large"
        onClick={handleUpdate}>
            Update time
        </Button>
        <Modal
            destroyOnClose={true}
            title="maintenance-update"
            visible={modalVisible}
            onCancel={handleCancel}
        >
            <div>details</div>
            <Form
                preserve={false}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                onFinish={onUpdateSubmit}
            >
                <Form.Item
                    label="Date"
                    name= "date"
                    rules={[{ required: true, message: 'Please select date' }]}
                >
                    <DatePicker format={dateFormat}/>
                </Form.Item>
                <Form.Item
                    label = "Time"
                    name="time"
                    rules={[{ required: true, message: 'Please select time' }]}
                >
                    <TimePicker format={timeFormat}/>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button
                        loading={loading}
                        type="primary"
                        htmlType="submit"
                        shape="round"
                        size="medium"
                    >
                        Update
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
        </>
    )
}

const RequestDetailButton = ({item}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const openModal = () => {
        setModalVisible(true);
    }
    const handleCancel = () => {
        setModalVisible(false);
    }
    const {user, date, start_time, description} = item;
    return (
        <>
        <Tooltip title="View maintenance request detail">
            <Button>
                onClick={openModal}
                style={{ border: "none" }}
                size="large"
                icon={<InfoCircleOutlined />}
            </Button>
        </Tooltip>
        {
            modalVisible && (
                <Modal
                    title={user.name + ' ' + user.room}
                    visible={modalVisible}
                    closable={false}
                    footer={null}
                    onCancel={handleCancel}
                >
                    <Space direction="vertical">
                        <Text strong={true}>Description</Text>
                        <Text type="secondary">{description}</Text>
                        <Text strong={true}>Date</Text>
                        <Text type="secondary">{date === null ? "pending" : date}</Text>
                        <Text strong={true}>Time</Text>
                        <Text type="secondary">{start_time === null ? "pending" : start_time}</Text>
                    </Space>
                </Modal>
            )
        }
        </>
    )
}

export default ReservationManager;