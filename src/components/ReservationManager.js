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
    Layout
} from "antd";

import "../styles/ReservationManager.css"
const { Content } = Layout;
const {TabPane} = Tabs;
const ReservationManager = () => {
    const [maintenanceList] = useState([]);

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
            <Tabs defaultActiveKey="1" >
                <TabPane tab="Add Utils" key="1">
                    <AddPublicUtilForm/>
                </TabPane>
                <TabPane tab="Cancel Reservation" key="2">
                    <CancelReservationForm/>
                </TabPane>
            </Tabs>
</Content>)
}

const CancelReservationForm = () => {
    const onCancelSubmit = () => { };
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
                        shape="round"
                        size="large"
                    >
                        cancel
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}

const AddPublicUtilForm = () => {
    const onAddSubmit = () => { };
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
                rules={[{ required: true, message: 'Category' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button
                    type="primary"
                    htmlType="submit"
                    shape="round"
                    size="large"
                >
                    add
                </Button>
            </Form.Item>
        </Form>
    </>
    )
}

const MaintenancePanel = () => {
    const [maintenanceList, setMaintenanceList] = useState([])
    const onUpdateSubmit = () => { };
    const [modalVisible, setModalVisible] = useState(false);
    const showModal = () => {
        setModalVisible(true);
    };
    const handleCancel = () => {
        setModalVisible(false);
    };
    return (
        <Content>
        <div>
            <List
                className="manager-maintenance"
                itemLayout="horizontal"
                dataSource={maintenanceList}
            >
                {(item) => (
                    <List.Item>
                        <p>{item.date}</p>
                        <Button 
                        type="primary"
                        shape="round"
                        size="large"
                        onClick={showModal}>
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
                                        shape="round"
                                        size="large"
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
            </Content>
    )
}

export default ReservationManager;