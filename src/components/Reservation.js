import React, { useState, useEffect } from "react";
import { RequestDetailButton } from "./ReservationManager"
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
    FileDoneOutlined,
    CoffeeOutlined,
    DownCircleOutlined,
    BookOutlined,
    FormatPainterOutlined
} from "@ant-design/icons";
import {
    getAllPublicUtils,
    getAllMaintenanceRequestById,
    reservePublicUtil,
    getAvailableTimeFrame,
    listAllPublicUtilsReservations,
    sendMaintenanceRequest,
} from "../utils"

import "../styles/Reservation.css"
const { Content } = Layout;
const { TextArea } = Input;
const { Option } = Select;
const { TabPane } = Tabs;
const { Text, Title } = Typography;

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
            style={{ height: "100%" }}
        >
            <Row>
                <Col
                    span={10}
                    offset={1}
                >
                    <Row
                        style={{ marginTop: "2%" }}
                    >
                        <Col
                            span={3}>
                            <FormatPainterOutlined className="resident-maintenance-requests-icon" />
                        </Col>
                        <Col className="resident-maintenance-title-col"
                            offset={1}
                            span={13}
                        >
                            <Content className="resident-maintenance-title-col-content">
                                Reserve Maintenance / Utils
                            </Content>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="resident-maintenance-col">
                            <div style={{ width: "100%", display: "flex" }}>
                                <Title
                                    style={{ display: "flex", 
                                    justifyContent: "start", 
                                    alignItems: "center", 
                                    fontSize: "20px", 
                                    fontWeight: "500", 
                                    marginTop: "3vh", 
                                    marginLeft: "2vw", marginBottom: "0" }}
                                >
                                    <DownCircleOutlined style={{ marginRight: "1.5vw", fontSize: "18px" }} />
                                    Choose reservation type
                                </Title>

                            </div>

                            <Content className="resident-maintenance-content"
                                style={{ display: "flex", justifyContent: "center", minWidth: "39vw", width: "39vw" }}
                            >
                                <ReserveSomething
                                    getAllRequests={getAllRequests}
                                    getAllUtils={getAllUtils}
                                />
                            </Content>
                        </Col>

                    </Row>
                </Col>
                <Col
                    offset={2}
                    span={10}
                >
                    <Row style={{ marginTop: "2%" }}>
                        <Col span={3}>
                            <CoffeeOutlined className="resident-reservation-icon" />
                        </Col>
                        <Col
                            className="resident-reservation-title-col"
                            offset={1}
                            span={9}
                        >
                            <Content className="resident-reservation-title-col-content">
                                Your Reservations
                            </Content>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="resident-reservation-col"
                            style={{ width: "100%" }}
                        >
                            <div style={{ width: "100%", display: "flex" }}>
                                <Title
                                    style={{
                                        display: "flex",
                                        justifyContent: "start",
                                        alignItems: "center",
                                        fontSize: "20px",
                                        fontWeight: "500",
                                        marginTop: "3vh",
                                        marginLeft: "2vw",
                                        marginBottom: "0"
                                    }}
                                >
                                    <DownCircleOutlined style={{ marginRight: "1.5vw", fontSize: "18px" }} />
                                    Choose reservation type
                                </Title>
                            </div>
                            <Content
                                className="resident-reservation-content"
                            >
                                <ReservationList
                                    maintenanceList={maintenanceList}
                                    utils={utils}
                                    loadingMaintenance={loadingMaintenance}
                                    loadingUtils={loadingUtils}
                                />
                            </Content>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Layout>
    );
}

const ReserveSomething = ({ getAllRequests, getAllUtils }) => {
    return (
        <div className="card-container" style={{ display: "flex", justifyContent: "center", width: "39vw", minWidth: "39vw" }}>
            <Tabs
                defaultActiveKey="1"
                type="card"
                style={{ width: "90%" }}
                className="request-tabs"
            >
                <TabPane tab="Maintenance" key="1">
                    <SendMaintenanceRequest getAllRequests={getAllRequests} />
                </TabPane>
                <TabPane tab="Utils" key="2">
                    <ReservePublicUtil getAllUtils={getAllUtils} />
                </TabPane>
            </Tabs>
        </div>
    );
}

const ReservationList = ({ maintenanceList, utils, loadingMaintenance, loadingUtils }) => {
    return (
        <div className="card-container" style={{ display: "flex", justifyContent: "center", width: "39vw", minWidth: "39vw" }}>
            <Tabs
                defaultActiveKey="1"
                type="card"
                style={{ width: "90%" }}
                destroyInactiveTabPane={true}
            >
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

const MaintenanceList = ({ maintenanceList, loadingMaintenance }) => {
    return (
        <Content style={{ display: "flex", overflow: "auto", justifyContent: "center", height: "100%" }}>
            <div>
                <List
                    className="manager-maintenance-list resident-maintenance-list"
                    grid={{ gutter: 0, column: 1 }}
                    size="middle"
                    loading={loadingMaintenance}
                    dataSource={maintenanceList}
                    renderItem={(item) => (
                        <List.Item>
                            <Card
                                key={item.id}
                                title={
                                    <div className="card-content" style={{ display: "flex", alignItems: "center", fontWeight: "600" }}>
                                        <Text ellipsis={true}
                                            style={item.start_time !== null ? {} : { color: "e64203" }}>
                                            {item.user.name + ' ' + item.user.room}
                                        </Text>
                                        < RequestDetailButton item={item} />
                                    </div>
                                }
                                style={{ backgroundColor: '#fafbfd', border: "1px" }}
                            >
                                <div style={{ fontSize: "14px", fontWeight: "400" }}>
                                    {item.description}
                                </div>
                            </Card>
                        </List.Item>
                    )}
                />
            </div>
        </Content>
    )
}

const UtilsList = ({ utils, loadingUtils }) => {
    return (
        <Content
            style={{ display: "flex", overflow: "auto", justifyContent: "center", height: "100%" }}
        >
            <div
            >
                <List
                    className="resident-maintenance-list"
                    grid={{ gutter: 0, column: 1 }}
                    size="middle"
                    loading={loadingUtils}
                    dataSource={utils}
                    renderItem={(item) => (
                        <List.Item>
                            <Card
                                key={item.id}
                                title={
                                    <div className="card-content" style={{ display: "flex", alignItems: "center", fontWeight: "600" }}>
                                        <Text ellipsis={true}>
                                            {item.category}
                                        </Text>
                                    </div>
                                }
                                style={{ backgroundColor: '#fafbfd', border: "1px" }}
                            >
                                {
                                    <div style={{ fontSize: "14px", fontWeight: "500" }}>
                                        <p>
                                            <Text ellipsis={true} >
                                                Date: {item.date}
                                            </Text>
                                            <br />
                                            <br />
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

class SendMaintenanceRequest extends React.Component {
    state = {
        loading: false,
    };
    fileInputRef = React.createRef();
    onMaintenanceSubmit = async (values) => {
        const formData = new FormData();
        const { files } = this.fileInputRef.current;

        if (files.length > 5) {
            message.error("You can at most upload 5 pictures.");
            return;
        }

        for (let i = 0; i < files.length; i++) {
            formData.append("images", files[i]);
        }

        formData.append("description", values.description);
        this.setState({
            loading: true,
        });
        try {
            await sendMaintenanceRequest(formData);
            message.success("upload successfully");
            const { getAllRequests } = this.props;
            getAllRequests();
        } catch (error) {
            message.error(error.message);
        } finally {
            this.setState({
                loading: false,
            });
        }
    }
    render() {
        return (
            <div>
                <Form
                    className="problem-submit"
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 19 }}
                    onFinish={this.onMaintenanceSubmit}
                    style={{ paddingTop: "10%" }}
                >
                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[{ required: true, message: 'Input your Description' }]}
                    >
                        <TextArea showCount maxLength={150} />
                    </Form.Item>
                    <Form.Item
                        name="picture"
                        label="Picture"
                        rules={[{ required: true, message: "Upload images for demostration" }]}
                    >
                        <input
                            type="file"
                            accept="image/png, image/jpeg"
                            ref={this.fileInputRef}
                            multiple={true}
                        />
                    </Form.Item>
                    <div style={{ display: "flex", justifyContent: "end" }}>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                shape="round"
                                loading={this.state.loading}
                            >
                                Submit
                            </Button>
                        </Form.Item>
                    </div>
                </Form>
            </div>
        )
    }
}

const ReservePublicUtil = ({ getAllUtils }) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const loadCategories = async () => {
        try {
            setLoading(true);
            const resp = await getAllPublicUtils();
            setCategories(oldData => [...resp]);
        } catch (error) {
            message.error(error.message);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        loadCategories();
    }, []);

    return (
        <Content style={{ display: "flex", overflow: "auto", justifyContent: "center", height: "100%" }}>
            <div>
                <List
                    className="resident-utils-list"
                    grid={{ gutter: 0, column: 1 }}
                    size="middle"
                    loading={loading}
                    dataSource={categories}
                    renderItem={(item) => (
                        <List.Item>
                            <Card
                                key={item.id}
                                title={
                                    <div className="card-content" style={{ display: "flex", alignItems: "center", fontWeight: "600" }}>
                                        <Text ellipsis={true}>
                                            {item.category}
                                        </Text>
                                    </div>
                                }
                                style={{ backgroundColor: '#fafbfd', border: "1px" }}
                                extra={<ReserveUtilButton category={item.category}
                                    getAllUtils={getAllUtils}
                                />}
                            >
                                <div style={{ fontSize: "14px", fontWeight: "400" }}>
                                    {item.description}
                                </div>

                            </Card>
                        </List.Item>
                    )}
                />
            </div>
        </Content>
    )

}

const ReserveUtilButton = ({ category, getAllUtils }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [timeslots, setTimeSlots] = useState([])
    const getAvailableTime = async (category) => {
        try {
            setLoading(true);
            const resp = await getAvailableTimeFrame(category);
            setTimeSlots(oldData => [...resp])
        } catch (error) {
            message.error(error.message)
        } finally {
            setLoading(false);
        }
    }
    const handleCancel = () => {
        setModalVisible(false);
    }
    const handleSelect = () => {
        setModalVisible(true);
        getAvailableTime(category);
    }


    return (
        <>
            <Button
                type="primary"
                shape="round"
                size="medium"
                onClick={handleSelect}>
                <BookOutlined />
            </Button>
            <Modal
                destroyOnClose={true}
                loading={loading}
                title="Reserve public utility"
                visible={modalVisible}
                onCancel={handleCancel}
                footer={null}
                className="util-modal"
            >
                <List
                    grid={{ gutter: 10, column: 3 }}
                    size="middle"
                    dataSource={timeslots}
                    renderItem={(slot) => (
                        <List.Item>
                            <TimeSlotButton
                                category={category}
                                timeSlot={slot}
                                getAvailableTime={getAvailableTime}
                                getAllUtils={getAllUtils}
                            />
                        </List.Item>
                    )}
                />
            </Modal>
        </>

    )

}

const TimeSlotButton = ({ category, timeSlot, getAvailableTime, getAllUtils }) => {
    const [loading, setLoading] = useState(false);
    const onClick = async () => {
        try {
            setLoading(true);
            console.log(category)
            await reservePublicUtil(category, timeSlot.date, timeSlot.time_frame);
            message.success(`successfully reserve ${category}`);
            getAvailableTime(category);
            getAllUtils();
        } catch (error) {
            message.error(error.message);
        } finally {
            setLoading(false);
        }
    }
    return (
        <Button
            className="util-button"
            type="primary"
            size="large"
            loading={loading}
            onClick={onClick}
        >
            {
                <Space direction="vertical">
                    <Text type="secondary"
                    style={{color: "white"}}
                    >
                        {timeSlot.date}
                    </Text>
                    <Text type="secondary"
                    style={{color: "white"}}
                    >
                        {timeSlot.time_frame}
                    </Text>
                </Space>
            }
        </Button>
    )
}

export default Reservation;