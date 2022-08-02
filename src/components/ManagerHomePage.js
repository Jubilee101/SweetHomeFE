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
import { UserOutlined } from "@ant-design/icons"
import App from "../App";
import DashBoardManager from "./DashBoardManager";
import ReservationManager from "./ReservationManager"

const { Sider, Header, Dropdown, Content } = Layout;
const { TabPane } = Tabs;
const { TextArea } = Input;

class ManagerHomePage extends React.Component {

    render() {
        return (
            <>

                <Layout style={{ minHeight: "100vh" }}>
                    <Header style={{ backgroundColor: "#6667AB", height: "10vh" }}>
                        <div style={{ fontSize: 30, fontWeight: 600, color: "white", lineHeight: "96px" }}>
                            SweetHome
                        </div>
                    </Header>
                    <Layout className="site-layout">
                        <Sider collapsible collapsed={this.collapsed} >
                            <div className="logo" />
                            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" />
                        </Sider>
                        <Content>
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
                        </Content>
                    </Layout>
                </Layout>
            </>
        );
    }
}

class DashBoard extends React.Component {
    render() {
        return (
            <Row className="dashBorad">
                <Col span={10} className="public-message">
                    <PublicMessage />
                </Col>
                <Col span={14} className="personal-message">
                    <PersonalMessage />
                </Col>
            </Row>
        );
    }
}

const PublicMessage = () => {
    const [loading, setLoading] = useState(false);

    const onPublicSubmit = async (data) => {
        const formData = new FormData();
        formData.append("text", data.text);
        console.log(data);
        setLoading(true);
        try {
            await sendPublicInvoice(formData);
            message.success("send successfully");
        } catch (error) {
            message.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form
            className="public-sending"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            onFinish={onPublicSubmit}
        >
            <Form.Item
                name="text"
                label="Text"
                rules={[{ required: true, message: 'Please input your Text' }]}
            >
                <TextArea
                    showCount
                    allowClear
                    style={{
                        height: 100,
                    }}
                />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    send
                </Button>
            </Form.Item>
        </Form>
    );

};

const PersonalMessage = () => {
    const [loading, setLoading] = useState(false);

    const onPersonalSubmit = async (data) => {
        const formData = new FormData();
        formData.append("type", data.type);
        formData.append("room", data.room);
        formData.append("name", data.name);
        formData.append("text", data.text);

        setLoading(true);
        try {
            await sendPersonalInvoice(formData);
            message.success("send successfully");
        } catch (error) {
            message.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form
            className="personal-sending"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            onFinish={onPersonalSubmit}
        >
            <Form.Item
                name="type"
                label="Type"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Select
                    placeholder="Select type"
                    allowClear
                >
                    <Select.Option value="MAIL">mail</Select.Option>
                    <Select.Option value="OTHER">other</Select.Option>
                </Select>
            </Form.Item>
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
                name="text"
                label="Text"
                rules={[{ required: true, message: 'Please input your Text' }]}
            >
                <TextArea
                    showCount
                    allowClear
                    style={{
                        height: 120,
                    }}
                />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    send
                </Button>
            </Form.Item>
        </Form>
    )
};

const Reservation = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [maintenanceList] = useState([]);

    const showModal = () => {
        setModalVisible(true);
    };
    const handleCancel = () => {
        setModalVisible(false);
    };
    const onCancelSubmit = () => { };
    const onAddSubmit = () => { };
    const onUpdateSubmit = () => { };

    return (
        <>
            <div

            >
                <List
                    className="manager-maintenance"
                    itemLayout="horizontal"
                    dataSource={maintenanceList}
                >
                    {(item) => (
                        <List.Item>
                            <p>{item.date}</p>
                            <Button type="primary" onClick={showModal}>
                                update
                            </Button>
                            <Modal
                                title="maintenance-update"
                                visible={modalVisible}
                                onCancel={handleCancel}
                            >
                                <div>details</div>
                                <Form
                                    className="maintenance-time"
                                    labelCol={{ span: 8 }}
                                    wrapperCol={{ span: 16 }}
                                    onFinish={onUpdateSubmit}
                                >
                                    <Form.Item
                                        label="Time"
                                        rules={[{ required: true, message: 'Time' }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                        >
                                            update
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </Modal>
                        </List.Item>
                    )}
                </List>
            </div>
            <div

            >
                <div>
                    <Form
                        className="public-cancel"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        onFinish={onCancelSubmit}
                    >
                        <Form.Item
                            label="Category"
                            rules={[{ required: true, message: 'Category' }]}
                        >
                            <Select></Select>
                        </Form.Item>
                        <Form.Item
                            label="Date"
                        >
                            <DatePicker />
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button
                                type="primary"
                                htmlType="submit"
                            >
                                cancel
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
                <div
                >
                    <Form
                        className="public-add"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        onFinish={onAddSubmit}
                    >
                        <Form.Item
                            label="Category"
                            rules={[{ required: true, message: 'Category' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button
                                type="primary"
                                htmlType="submit"
                            >
                                add
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </>
    );
}

export default ManagerHomePage;
