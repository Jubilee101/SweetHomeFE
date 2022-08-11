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
  ToolOutlined,
  FormOutlined,
  HomeOutlined,
  DownCircleOutlined
} from "@ant-design/icons";
import {
  addPublicUtil,
  getAllPublicUtils,
  listAllReservations,
  cancelReservation,
  updateMaintenanceRequest,
  getAllMaintenanceRequest,
} from "../utils"

import "../styles/ReservationManager.css"
const { Content } = Layout;
const { TextArea } = Input;
const { Option } = Select;
const { TabPane } = Tabs;
const { Text,Title } = Typography;
const ReservationManager = () => {
  return (
    <Layout
      className="manager-reservation-layout"
      style={{ height: "100%" }}
    >
      <Row>
        <Col span={11}
          offset={1}
        >
          <Row>
            <Col span={3}>
              <ToolOutlined className="maintenance-requests-icon"
              />
            </Col>
            <Col className="maintenance-title-col" offset={1} span={11}>
              <Content className="maintenance-title-col-content">
                Maintenance Requests
              </Content>
            </Col>
          </Row>
          <Row>
            <Col className="maintenance-col">
              <Content
                className="manager-maintenance-content" >
                <MaintenancePanel />
              </Content>
            </Col>
          </Row>
        </Col>
        <Col span={11}>
          <Row>
            <Col span={3}>
              <HomeOutlined className="public-utilities-icon" />
            </Col>
            <Col className="public-utils-title-col" offset={1} span={8}>
              <Content className="public-utils-title-col-content" >
                Public Utilities
              </Content>
            </Col>
          </Row>
          <Row>
            <Col className="public-utils-col" style={{ width: "100%" }}>
              <Content className="public-utils-content" >
                <PublicUtilsPanel />
              </Content>
            </Col>
          </Row>
        </Col>
      </Row>
    </Layout>
  );
}

const PublicUtilsPanel = () => {
  return (
    <Content className="manager-reservation-form-content">
      <Title
      style={{fontSize: "20px", fontWeight: "500"}}
      >
        <DownCircleOutlined style={{marginRight: "1.5vw", fontSize: "18px"}}/>
        Choose the operation
        
      </Title>
      <div className="card-container">
        <Tabs defaultActiveKey="1"
        type="card"
        >
          <TabPane tab="Add Utils" key="1" className="utilsTabPane">
            <AddPublicUtilForm />
          </TabPane>
          <TabPane tab="Cancel Reservation" key="2">
            <CancelReservationForm />
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

  const onCancelSubmit = async (data) => {
    const formData = new FormData();
    formData.append("category", data.category);
    formData.append("date", data.date.format("YYYY-MM-DD"));
    formData.append("time_frame", data.time_frame);
    setLoading(true);
    console.log(formData)
    try {
      await cancelReservation(formData);
      message.success("successfully cancel reservation");
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Form
        className="public-cancel"
        onFinish={onCancelSubmit}
        style={{
          marginTop: "10vh"
        }}
      >
        <Form.Item
          label="Category"
          name="category"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          rules={[{ required: true, message: 'Category' }]}
        >
          <Select>
            {selectList}
          </Select>
        </Form.Item>
        <Form.Item
          label="Date"
          name="date"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          rules={[{ required: true, message: "pick the date to cancel!" }]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          label="Time Slot"
          name="time_frame"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          rules={[{ required: true, message: "pick the time slot to cancel!" }]}
        >
          <Select>
            <Option value='8:00 -- 12:00 AM'>8:00 -- 12:00 AM</Option>
            <Option value='12:00 -- 6:00 PM'>12:00 -- 6:00 PM</Option>
            <Option value='6:00 -- 11:50 PM'>6:00 -- 11:50 PM</Option>
          </Select>
        </Form.Item>
        <Form.Item >
          <div
            style={{ display: "flex", justifyContent: "end", marginTop:"5vh" }}
          >
            <Button
              type="primary"
              htmlType="submit"
              shape="round"
              size="medium"
              loading={loading}
            >
              Cancel Reservations
            </Button>
          </div>

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
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <Form
        className="public-add"
        onFinish={onAddSubmit}
        style={{
          marginTop: "10vh"
        }}
      >
        <Form.Item
          label="Category"
          name="category"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          rules={[{ required: true, message: 'category name required' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          rules={[{ required: true, message: 'Say something about this util!' }]}
        >
          <TextArea showCount maxLength={150} />
        </Form.Item>

        <Form.Item
        >
          <div style={{ display: "flex", justifyContent: "end", marginTop: "5vh" }}>
            <Button
              type="primary"
              htmlType="submit"
              shape="round"
              size="medium"
              loading={loading}
            >
              Add Utility
            </Button>
          </div>

        </Form.Item>
      </Form>
    </>
  );
}

const MaintenancePanel = () => {
  const [maintenanceList, setMaintenanceList] = useState([])
  const [loading, setLoading] = useState(false);

  const getAllRequests = async () => {
    try {
      setLoading(true);
      const resp = await getAllMaintenanceRequest();
      setMaintenanceList(oldData => [...resp]);
    } catch (error) {
      message.error(error.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getAllRequests();
  }, [])

  return (
    <Content style={{ width: "100%" }}>
      <div style={{ width: "100%" }}>
        <List
          loading={loading}
          grid={{ gutter: 8, column: 1 }}
          className="manager-maintenance-list"
          size="middle"
          dataSource={maintenanceList}
          renderItem={(item) => (
            <List.Item>
              <Card
                key={item.id}
                title={
                  <div style={{ display: "flex", alignItems: "center", fontWeight: "600" }}>
                    <Text ellipsis={true}
                      style={item.start_time !== null ? {} : { color: "#e64203" }}>
                      {item.user.name + ' ' + item.user.room}
                    </Text>
                    < RequestDetailButton item={item} />
                  </div>
                }
                style={{ backgroundColor: '#fafbfd', border: "1px" }}
                // headStyle={{backgroundColor: '#0000', border: 0 }}
                // bodyStyle={{backgroundColor: '#6667AB', border: 0 }}
                extra={<UpdateTimeButton id={item.id} getAllRequests={getAllRequests} />}
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

const UpdateTimeButton = ({ id, getAllRequests }) => {
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
    console.log(values.time.format("HH:MM:SS"))
    formData.append("date", values.date.format("YYYY-MM-DD"));
    formData.append("time", values.time.format("HH:mm:ss"));
    setLoading(true);
    try {
      await updateMaintenanceRequest(id, formData);
      message.success("Successfully update time")
      getAllRequests();
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
        size="middle"
        onClick={handleUpdate}>
        <FormOutlined />
      </Button>
      <Modal
        destroyOnClose={true}
        title="Maintenance Update"

        visible={modalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          preserve={false}
          onFinish={onUpdateSubmit}
        >
          <Form.Item
            label="Date"
            name="date"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            rules={[{ required: true, message: 'Please select date' }]}
          >
            <DatePicker format={dateFormat} style={{width: "100%"}}/>
          </Form.Item>
          <Form.Item
            label="Time"
            name="time"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            rules={[{ required: true, message: 'Please select time' }]}
          >
            <TimePicker format={timeFormat} style={{width:"100%"}}/>
          </Form.Item>
          <Form.Item>
            <div style={{display: "flex", justifyContent:"end"}}>
            <Button
              loading={loading}
              type="primary"
              htmlType="submit"
              shape="round"
              size="medium"
            >
              Update
            </Button>
            </div>
            
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export const RequestDetailButton = ({ item }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const openModal = () => {
    setModalVisible(true);
  }
  const handleCancel = () => {
    setModalVisible(false);
  }
  const { user, date, start_time, description, maintenanceImages } = item;
  return (
    <>
      <Tooltip title="View maintenance request detail">
        <Button
          onClick={openModal}
          style={{ border: "none", background: "#fafbfd" }}
          size="large"
          icon={<InfoCircleOutlined />}
        >
        </Button>
      </Tooltip>
      {
        modalVisible && (
          <Modal
            title={user.name + ' ' + user.room}
            visible={modalVisible}
            closable={true}
            footer={null}
            onCancel={handleCancel}
          >
            <Space direction="vertical">
              <Text strong={true} >Description</Text>
              <Text type="secondary">{description}</Text>
              <Text strong={true}>Date</Text>
              <Text type="secondary">{date === null ? "pending" : date}</Text>
              <Text strong={true}>Time</Text>
              <Text type="secondary">{start_time === null ? "pending" : start_time}</Text>
            </Space>
            <Carousel
              className="myCarousel"
              dots={false}
              arrows={true}
              prevArrow={<LeftCircleFilled />}
              nextArrow={<RightCircleFilled />}
              style={{ height: "40%" }}
            >
              {maintenanceImages.map((image, index) => (
                <div key={index}>
                  <Image src={image.url} />
                </div>
              ))}
            </Carousel>
          </Modal>
        )
      }
    </>
  )
}

export default ReservationManager;