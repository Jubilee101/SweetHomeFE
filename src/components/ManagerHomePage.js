import React, { 
    //useEffect, 
    useState } from "react";
import {
    Tabs,
    Modal,
    Button,
    Row,
    Col,
    Checkbox,
    List,
 //   Divider,
    // Avatar,
    // Skeleton,
    Input,
    Form,
    Select,
    DatePicker,
  } from "antd";


  const { TabPane } = Tabs;

class ManagerHomePage extends React.Component {

    render() {
        return (
         <>
           <Tabs defaultActiveKey="1" destroyInactiveTabPane={true}>
             <TabPane tab="DashBoard" key="1">
                 <DashBoard />
             </TabPane>
             <TabPane tab="Reservation" key="2">
                 <Reservation />
             </TabPane>
             <TabPane tab="Discussion" key="3">
                 <Discussion />
             </TabPane>
           </Tabs>
         </>
        );   
     }
}

class DashBoard extends React.Component {
    render() {
        return (
            <Row className="dashBorad">
                <Col span={10} className="public-message">
                   <PublicMessage/>
                </Col>
                <Col span={14} className="personal-message">
                    <PersonalMessage />
                </Col>
            </Row>  
        );
    }
}

const PublicMessage = () =>{

    const onPubilcSubmit = () => {};
    const onCheckboxChange = () => {};

    return (
            <Form
                className="public-sending"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                onFinish={onPubilcSubmit}
                >
                <Form.Item
                    label="Text"
                    rules={[{ required: true, message: 'Text' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="flag"
                >
                    <Checkbox
                    onChange={onCheckboxChange}
                    >
                    flag
                    </Checkbox>
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

    const onPersonalSubmit = () => {};
    const onTypeChange = () => {
      };

    return (
        <Form
            className="personal-sending"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            onFinish={onPersonalSubmit}
            >
            <Form.Item
                label="Type"
                rules={[
                {
                    required: true,
                },
                ]}
            >
                <Select
                placeholder="Select type"
                onChange={onTypeChange}
                allowClear
                >
                    <Select.Option value="mail">mail</Select.Option>
                    <Select.Option value="other">other</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item
                label="Room"
                rules={[{ required: true, message: 'Please input your Room' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Name"
                rules={[{ required: true, message: 'Please input your Name' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Text"
                rules={[{ required: true, message: 'Please input your Text' }]}
            >
                <Input />
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
    const onCancelSubmit = () => {};
    const onAddSubmit = () => {}; 
    const onUpdateSubmit = () => {};

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

 const Discussion = () =>{
//     const [loading, setLoading] = useState(false);
//     const [data, setData] = useState([]);

//     const loadMoreData = () => {
//         if (loading) {
//           return;
//         }
    
//         setLoading(true);
//         fetch()//数据
//           .then((res) => res.json())
//           .then((body) => {
//             setData([...data, ...body.results]);
//             setLoading(false);
//           })
//           .catch(() => {
//             setLoading(false);
//           });
//       };

//     useEffect(() => {
//         loadMoreData();
//     }, []);

     const onDiscussionSubmit = () => {};

     return (
//         <>
//             <div
//                 id="dicussionMessage"
//                 style={{
//                   height: 400,
//                   overflow: 'auto',
//                   padding: '0 16px',
//                   border: '1px solid rgba(140, 140, 140, 0.35)',
//                 }}
//             >
//                 <InfiniteScroll
//                     dataLength={data.length}
//                     next={loadMoreData}
//                     hasMore={data.length < 50}
//                     loader={
//                     <Skeleton
//                         avatar
//                         paragraph={{
//                         rows: 1,
//                         }}
//                         active
//                     />
//                     }
//                     endMessage={<Divider plain>No more</Divider>}
//                     scrollableTarget="dicussionMessage"
//                 >
//                     <List
//                         dataSource={data}
//                         renderItem={(item) => (
//                             <List.Item key={item.content}>
//                                 <List.Item.Meta
//                                     avatar={<Avatar src={item.picture} />}
//                                     title={<p>{item.name}</p>}
//                                     description={item.content}
//                                     //unfinished
//                                 />
//                             </List.Item>

//                         )}
//                     />
//                     </InfiniteScroll>
//             </div>
            <div
            
            >
               <Form
                    className="discussion-send"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    onFinish={onDiscussionSubmit}
                    >
                    <Form.Item
                        label="Text"
                        rules={[{ required: true, message: 'Please input your Text' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                        send
                        </Button>
                    </Form.Item>
                </Form>
            </div>
//         </>
     );
 }

export default ManagerHomePage;
