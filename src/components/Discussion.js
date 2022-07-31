import React, { 
    useEffect, 
    useState } from "react";
import { Button,Typography,List,Input,Form } from "antd";

  const { Text } = Typography;
  const {TextArea} = Input;

const Discussion = () =>{
        const [loading, setLoading] = useState(false);
        const [discussionList, setDiscussionList] = useState([]);
    
        useEffect(() => {
            loadData();
        });
        
         const loadData = async () => {}
         const onDiscussionSubmit = () => {};
    
         return (
            <>
                <div
                    id="dicussionMessage"
                    style={{
                      height: 400,
                      overflow: 'auto',
                      padding: '0 16px',
                      border: '1px solid rgba(140, 140, 140, 0.35)',
                    }}
                >
                    <List
                        loading={loading}
                        dataSource={discussionList}
                        renderItem={(item) => (
                            <List.Item>
                                <List.Item.Meta
                                description={
                                    <Text>{item.text}</Text>
                                }
                                />
                            </List.Item>
                        )}
                    />
                 </div>
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
                </div>
            </>
         );
     }

export default Discussion;