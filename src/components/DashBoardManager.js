import React, { useState } from "react";
import {
    Button,
    Row,
    Col,
    message,
    Input,
    Form,
    Select,
} from "antd";
import {sendPublicInvoice, sendPersonalInvoice} from "../utils";

const {TextArea} = Input;
const DashBoardManager = () => {
    return (
        <Row>
            <Col span={10} className="public-message-manager">
               <PublicMessage/>
            </Col>
            <Col span={14} className="personal-message-manager">
                <PersonalMessage />
            </Col>
        </Row>  
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

export default DashBoardManager;