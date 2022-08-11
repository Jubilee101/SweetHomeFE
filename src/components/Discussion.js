import React, {
    useEffect,
    useState,
    useRef,
} from "react";
import { 
    Button, 
    Typography, 
    List, Input, 
    Form, 
    Avatar, 
    Layout,
    message,
 } from "antd";
import { Content } from "antd/lib/layout/layout";

import { 
    pollMessage,
    fetchMessages,
    sendMessage,
    getUser,
 } from "../utils";
 import { UserOutlined } from '@ant-design/icons';
 import "../styles/Discussion.css"
const { Text } = Typography;
const { TextArea } = Input;

const Discussion = () => {
    const [messageList, setMessageList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({})
    useEffect(() => {
        loadData();
        loadUser();
        const interval = setInterval(() => {
            loadData();
          }, 3000);
        pollMessage(loadData);
        return () => {
            clearInterval(interval);
        }
    }, []);
    
    const chatListRef = useRef(null)

    useEffect(() => {
        const current = chatListRef.current
        current.scrollTop = current.scrollHeight
    }, [messageList])

    const loadUser = async() => {
        try {
            const resp = await getUser();
            setUser(resp);
        } catch(error) {
            message.error(error.message);
        }
    }
    const loadData = async() => { 
        try {
            const resp = await fetchMessages();
            setMessageList(oldData => [...resp]);
        } catch(error) {
            message.error(error.message);
        }
    }
    const onDiscussionSubmit = async (data) => { 
        const formData = new FormData();
        const auth = localStorage.getItem("asManager");
        formData.append("text", data.text);
        if (auth === "true") {
            formData.append("name_and_room", user.name + " " + "Manager");
        }
        else {
            formData.append("name_and_room", user.name + " " + user.room);
        }
        try {
            await sendMessage(formData);
            loadData();
        } catch(error) {
            message.error(error.message);
        }
    };
    const flag = (item) => 
    ((user.room !== null && (user.name + ' ' + user.room) === item.name_and_room) ||
     (user.room === null && (user.name + ' ' + "Manager") === item.name_and_room))
    return (
        <Layout className="discussion-layout">
            <Content style={{ height: "100%" }}>
                <Layout style={{ background: "white", borderRadius: "2vh", height: "100%" }}>
                    <Content>
                        <div className="discussion-form"
                            style={{ height: "100%" }}>
                            <div style={{ width: "72%" }}>
                                <div
                                    id="dicussionMessage"
                                    style={{
                                        height: 300,
                                        overflow: 'auto',
                                        borderRadius: "2vh",
                                        backgroudColor: "#F5F5F5",
                                        padding: '10px 16px',
                                        border: '1px solid rgba(140, 140, 140, 0.35)',
                                    }}
                                    ref={chatListRef}
                                >
                                    <List
                                        dataSource={messageList}
                                        renderItem={(item) => (
                                            
                                        <List.Item>
                                            <List.Item.Meta
                                                avatar={<Avatar size="small" icon={<UserOutlined />}/>}
                                                title={<Text style={{fontSize: "12px"}}>
                                                    {item.name_and_room + (flag(item) ? " (You)" : "")
                                                    }
                                                    </Text>}
                                                description={
                                                    <div>
                                                    <div className="chat-bubble">
                                                    <Text style={{fontWeight: "600", color: "#F5F5F5"}}>{item.text}</Text>
                                                    </div>
                                                    <Text style={{fontSize: "10px", marginLeft:"3px"}}>{
                                                    item.time == undefined ? "" : (item.time + ' ' + item.date)}</Text>
                                                    </div>
                                                }
                                            />
                                            {
                                                
                                            }
                                        </List.Item>
                                        )}
                                    />
                                </div>
                                <div>
                                    <Form
                                        className="discussion-send"
                                        labelCol={{ span: 8 }}
                                        wrapperCol={{ span: 16 }}
                                        onFinish={onDiscussionSubmit}
                                    >
                                        <Form.Item
                                            label="Text"
                                            name="text"
                                            rules={[{ required: true, message: 'Type here' }]}
                                        >
                                            <TextArea
                                                showCount
                                                allowClear={true}
                                                style={{
                                                    height: 100,
                                                }}
                                            />
                                        </Form.Item>
                                        <Form.Item wrapperCol={{ offset: 22, span: 4 }}>
                                            <Button 
                                            type="primary" 
                                            shape="round" 
                                            size="large" 
                                            htmlType="submit"
                                            loading={loading}
                                            >
                                                Send
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </Content>

                </Layout>

            </Content>
        </Layout>

    );
}

export default Discussion;