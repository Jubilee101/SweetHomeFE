import React, {
    useEffect,
    useState
} from "react";
import { 
    Button, 
    Typography, 
    List, Input, 
    Form, 
    Avatar, 
    Divider, 
    Skeleton, 
    Layout,
    message,
 } from "antd";
import CommentsBlock from 'simple-react-comments';
import { Content } from "antd/lib/layout/layout";
import "../styles/Discussion.css"
import { 
    pollMessage,
    fetchMessages,
    sendMessage,
    getUser,
 } from "../utils";
const { Text } = Typography;
const { TextArea } = Input;

const Discussion = () => {
    const [messageList, setMessageList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({})
    useEffect(() => {
        loadData();
        loadUser();
        // pollMessage(loadData);
    }, []);
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
    const onDiscussionSubmit = async(data) => { 
        const formData = new FormData();
        formData.append("text", data.text);
        formData.append("name_and_room", user.name + " " + user.room);
        setLoading(true);
        try {
            await sendMessage(formData);
        } catch(error) {
            message.error(error.message);
        } finally{
            setLoading(false);
        }
    };

    return (
        <Layout className="discussion-layout">
            <Content style={{ height: "100%" }}>
                <Layout style={{ background: "white", borderRadius: "2vh", height: "100%" }}>
                    <Content>
                        <div className="discussion-form"
                            style={{ height: "100%" }}>
                            <div style={{ width: "72%" }}>
                                <div>
                                    <div
                                        id="dicussionMessage"
                                        style={{
                                            // height: 400,
                                            overflow: 'auto',
                                            padding: '0 16px',
                                            border: '1px solid rgba(140, 140, 140, 0.35)',
                                        }}
                                    >
                                        <List
                                            dataSource={messageList}
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
                                                name="text"
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
                        </div>
                    </Content>

                </Layout>

            </Content>
        </Layout>

    );
}

export default Discussion;