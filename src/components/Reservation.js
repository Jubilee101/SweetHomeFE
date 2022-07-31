import React, { 
    //useEffect, 
    useState } from "react";
import {
    Tabs,
    Modal,
    Button,
    Calendar,
    Badge,
    Row,
    Col,
    List,
    message,
    //Divider,
    Avatar,
    //Skeleton,
    Input,
    Form,
    Space,
    Drawer,
    Cascader,
    Select,
    DatePicker,
} from "antd";

const { TabPane } = Tabs;

class Reservation extends React.Component {
    render() {
        return (
         <>
           <Tabs defaultActiveKey="1" destroyInactiveTabPane={true}>
             <TabPane tab="Maintenance" key="1">
                 <Maintenance />
             </TabPane>
             <TabPane tab="PublicUtilities" key="2">
                 <PublicUtilities />
             </TabPane>
           </Tabs>
         </>
        );   
     }
}

const Maintenance = () => {
    const [maintenanceList] = useState([]);

    const onMaintenanceSubmit = async (values) => {
        const formData = new FormData();
        const { files } = this.fileInputRef.current;
    
        if (files.length > 5) {
          message.error("You can at most upload 5 pictures.");
          return;
        }
    
        for (let i = 0; i < files.length; i++) {
          formData.append("images", files[i]);
        }
    
        formData.append("name", values.name);
        formData.append("room", values.room);
        formData.append("description", values.description);
    
        try {
        //  await uploadStay(formData);
          message.success("upload successfully");
        } catch (error) {
          message.error(error.message);
        } 
    }

    const fileInputRef = React.createRef();

    return (
        <>
            <div
            
            >
                <Form
                    className="problem-submit"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    onFinish={onMaintenanceSubmit}
                    >
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
                        name="description" 
                        label="Description"
                        rules={[{ required: true, message: 'Please input your Description' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item 
                        name="picture" 
                        label="Picture" 
                        rules={[{ required: true, message: "upload" }]}
                    >
                        <Input
                        type="file"
                        accept="image/png, image/jpeg"
                        ref={fileInputRef}
                        multiple={true}
                        />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                        Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            <div
            
            >
                <List
                    className="maintenance-history"
                    itemLayout="horizontal"
                    dataSource={maintenanceList}
                    renderItem={item => (
                        <List.Item>{item}</List.Item>
                    )}
                />
            </div>
        </>
    );
}

const PublicUtilities = () => {
    const [reservationList] = useState([]);
  //  const [utilitiesType] = useState([]);
    const onPublicSubmit = () => {}

    return (
        <>
            <div
            
            >
                <Form
                    className="problem-submit"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    onFinish={onPublicSubmit}
                    >
                    <Form.Item
                        name="type"
                        label="Type"
                        rules={[{ required: true }]}
                    >
                        {/* <Cascader 
                            options={} 
                         /> */}
                    </Form.Item>
                    <Form.Item 
                        name="date"     
                        label="Date"
                        rules={[{ required: true }]}
                    >
                      <DatePicker />
                    </Form.Item>
                    <Form.Item
                        name="time"
                        label="Time"
                        rules={[{ required: true }]}
                    >
                      <Select placeholder="Please select time">
                        <Select.Option value="morning">Morning</Select.Option>
                        <Select.Option value="afternoon">Afternoon</Select.Option>
                        <Select.Option value="evening">Evening</Select.Option>
                    </Select>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                        Submit
                        </Button>
                    </Form.Item>
                </Form>
                        </div>
            <div >
                <List
                    className="reservation-history"
                    itemLayout="horizontal"
                    dataSource={reservationList}
                    renderItem={(item) => (
                        <List.Item>{item}</List.Item>
                     )}
                />
            </div>
        </>
    );
}

export default Reservation;