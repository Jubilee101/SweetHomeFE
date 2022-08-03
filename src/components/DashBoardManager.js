import React, { useState } from "react";
import {
    Button,
    Row,
    Col,
    message,
    Input,
    Form,
    Select,
    Layout,
    Typography
} from "antd";
import { sendPublicInvoice, sendPersonalInvoice } from "../utils";
import "../styles/DashBoardManager.css";
const { Content, } = Layout;
const { TextArea } = Input;
const { Title } = Typography;
const DashBoardManager = () => {
    return (

        <Layout className="manager-dashboard-layout">
            <Row className="manager-dashboard-title-row-layout">
                <Col className="public-message-title-col">
                    <Content className="public-message-title-col-content">
                        Public Invoice
                    </Content>
                </Col>
                <Col className="personal-message-title-col">
                    <Content className="personal-message-title-col-content">
                        Personal Invoice
                    </Content>

                </Col>
            </Row>
            <Row className="manager-dashboard-row-layout">
                <Col className="public-message-col">
                    <Content className="public-message-col-content">
                        <div style={{ height: "100%" }}>
                            <PublicMessage />
                        </div>
                    </Content>
                </Col>
                <Col className="personal-message-col">
                    <Content className="personal-message-col-content">
                        <PersonalMessage />
                    </Content>
                </Col>
            </Row>
        </Layout>


    );
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

        <Content style={{ height: "100%" }}>
            <div className="public-invoice-form" style={{ height: "100%" }}>
                <div
                    style={{ width: "72%" }}
                >
                    <Form
                        className="public-sending"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                        onFinish={onPublicSubmit}
                    >
                        <Form.Item
                            name="text"
                            label="Content"
                            rules={[{ required: true, message: 'Please input your Text' }]}
                        >
                            <TextArea
                                showCount
                                allowClear
                                style={{
                                    height: 100,
                                }}
                                placeholder="Enter public invoice content here"
                            />
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 14, span: 8 }}>
                            <Button
                                type="primary" htmlType="submit"
                                size={"large"}
                                shape="round"
                                background="#6667AB"
                            >
                                send
                            </Button>
                        </Form.Item>
                    </Form>

                </div>
            </div>
        </Content>
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
        <Content style={{ height: "100%" }}>
            <div className="public-invoice-form" style={{ height: "100%" }}>
                <div
                    style={{ width: "72%" }}
                >
                    <Form
                        className="personal-sending"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                        onFinish={onPersonalSubmit}
                    >
                        <Form.Item
                            name="text"
                            label="Content"
                            rules={[{ required: true, message: 'Please select one type' }]}
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

                        <Form.Item wrapperCol={{ offset: 14, span: 8 }}>
                            <Button
                                type="primary" htmlType="submit"
                                size={"large"}
                                shape="round"
                                background="#6667AB"
                            >
                                send
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>


        </Content>


    )
};

export default DashBoardManager;