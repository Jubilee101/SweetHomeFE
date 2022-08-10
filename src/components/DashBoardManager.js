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
import { NotificationOutlined, SendOutlined, ContactsOutlined, EditOutlined } from "@ant-design/icons"
const { Content, } = Layout;
const { TextArea } = Input;
const { Title } = Typography;
const DashBoardManager = () => {
  
  return (

    <Layout className="manager-dashboard-layout" style={{marginTop:"7vh"}}>
      <Row className="manager-dashboard">

        <Col className="manager-dashboard-public-message-col"
          offset={1}
          span={10}
        >

          <Row>
          <Col span={3} className="public-message-title-icon">
              <NotificationOutlined />
            </Col>
            <Col className="public-message-title-col" span={9} offset={1}>
              <Content className="public-message-title-col-content">
                Public Invoice
              </Content>
            </Col>
            
          </Row>
          <Row>
            
            <Col span={13} className="public-message-second-title">
            
            <EditOutlined style={{marginRight: "1vh"}}/>
            Input Invoice content
            </Col>
          </Row>

          <Row>
            <Col className="public-message-col" span={24}>
              <Content className="public-message-col-content">
                <div style={{ height: "100%" }}>
                  <PublicMessage />
                </div>
              </Content>
            </Col>
          </Row>

        </Col>

        <Col className="manager-dashboard-private-message-col"
          offset={1}
          span={11}
        >

          <Row justify="space-evenly" align="bottom">
          <Col span={3}  className="public-message-title-icon">
              <ContactsOutlined />
            </Col>
            <Col className="private-message-title-col" span={9} offset={1}>
              <Content className="private-message-title-col-content">
                Personal Invoice
              </Content>
            </Col>
            
            <Col span={9} offset= {2} className="public-message-second-title">
            
            <EditOutlined style={{marginRight: "1vh"}}/>
            Edit Invoice Form
            </Col>
          </Row>
          <Row>
            <Col className="private-message-col" span={24}>
              <Content className="private-message-col-content">
                <div style={{ height: "100%" }}>
                  <PersonalMessage />
                </div>
              </Content>
            </Col>
          </Row>

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
          style={{ width: "91%" }}
        >
          <Form
            className="public-sending"
            wrapperCol={{ span: 24 }}
            onFinish={onPublicSubmit}
          >
            <Form.Item
              name="text"
              rules={[{ required: true, message: 'Please input invoice content' }]}
            >
              <TextArea
                // showCount
                allowClear
                rows={9}
                bordered={false}
                style={{background: "#f0f2f5", borderRadius: "2vh"}}
                placeholder="Enter public invoice content here"
              />
            </Form.Item>
            <Form.Item 
            justify="end"
            wrapperCol={{ offset: 14, span: 8 }}
            style={{marginBottom: "0"}}
            >
              <Button
                type="primary" htmlType="submit"
                size={"large"}
                shape="round"
                
              >
                <SendOutlined/>
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
          style={{ width: "91%" }}
        >
          <Form
            className="personal-sending"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            onFinish={onPersonalSubmit}
          >
            <Form.Item
              name="type"
              label="Type"
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
              <Input/>
            </Form.Item>
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: 'Please input your Name' }]}
            >
              <Input/>
            </Form.Item>
            <Form.Item
              name="text"
              label="Content"
              rules={[{ required: true, message: 'Please input your Text' }]}
            >
              <TextArea
                showCount
                allowClear
                rows={4}
              />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 14, span: 8 }}>
              <Button
                type="primary" htmlType="submit"
                size={"large"}
                shape="round"
                background="#6667AB"
              >
                <SendOutlined/>
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>


    </Content>


  )
};

export default DashBoardManager;