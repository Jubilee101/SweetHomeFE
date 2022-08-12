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
import { UserOutlined, SmileOutlined, SmileFilled, SendOutlined } from '@ant-design/icons';
import "../styles/Discussion.css"
const { Text } = Typography;
const { TextArea } = Input;
const Discussion = () => {
    const [messageList, setMessageList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [ident, setIdent] = useState({});
    const [form] = Form.useForm();
    //this is necessary, because hook is async
    let user = {};
    useEffect(() => {
        loadData();
        const setUp = async () => {
            await loadUser();
            pollMessage(user.email, loadData);
        }
        setUp();
    }, []);

    const chatListRef = useRef(null)

    useEffect(() => {
        const current = chatListRef.current
        current.scrollTop = current.scrollHeight
    }, [messageList])

    const loadUser = async () => {
        try {
            const resp = await getUser();
            setIdent(resp);
            user = resp;
        } catch (error) {
            message.error(error.message);
        }
    }
    const loadData = async () => {
        try {
            const resp = await fetchMessages();
            setMessageList(oldData => [...resp]);
        } catch (error) {
            message.error(error.message);
        }
    }
    const onDiscussionSubmit = async (data) => {
        const formData = new FormData();
        const auth = localStorage.getItem("asManager");
        formData.append("text", data.text);
        form.resetFields();
        setLoading(true);
        if (auth === "true") {
            formData.append("name_and_room", ident.name + " " + "Manager");
        }
        else {
            formData.append("name_and_room", ident.name + " " + ident.room);
        }
        try {
            await sendMessage(formData);
            loadData();
            setLoading(false);
        } catch (error) {
            setLoading(false);
            message.error(error.message);
        }
    };
    const flag = (item) =>
    ((ident.room !== null && (ident.name + ' ' + ident.room) === item.name_and_room) ||
        (ident.room === null && (ident.name + ' ' + "Manager") === item.name_and_room))
    return (
        <Layout className="discussion-layout">
            <Content style={{ height: "100%" }}>
                <Layout style={{ background: "white", borderRadius: "2vh", height: "100%" }}>
                    <Content>
                        <div className="discussion-form"
                            style={{ height: "100%" }}>
                            <div style={{ width: "100%", height: "100%", padding: "2% 3%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                                <div
                                    id="dicussionMessage"
                                    style={{
                                        height: "80%",
                                        overflow: 'auto',
                                        borderRadius: "2vh",
                                        backgroudColor: "#ffff",
                                        padding: "2% 2%",
                                    }}
                                    ref={chatListRef}
                                >
                                    <List
                                    loading={loading}
                                        dataSource={messageList}
                                        renderItem={(item) => (

                                            <List.Item
                                                size="small"
                                                style={{ borderBottom: "0px" }}
                                            >
                                                <List.Item.Meta
                                                    avatar={<Avatar size="middle"
                                                        icon={<SmileFilled style={{ fontSize: "16px" }} />} />}
                                                    title={<Text style={{ fontSize: "14px", fontWeight: "500" }}>
                                                        {item.name_and_room + (flag(item) ? " (You)" : "")
                                                        }
                                                    </Text>}
                                                    description={
                                                        <div>
                                                            <div className="chat-bubble">
                                                                <Text style={{ fontWeight: "500", color: "#ffff", justifyContent: "center"}}>{item.text}</Text>
                                                            </div>
                                                            <Text style={{ fontSize: "10px", fontWeight: "500",marginLeft: "3px"}}>{
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
                                <div
                                style={{height: "16%"}}
                                >
                                    <Form
                                    form={form}
                                        className="discussion-send"
                                        onFinish={onDiscussionSubmit}
                                        // layout={"inline"}
                                        style={{width: "100%", display: "flex", justifyContent: "end"}}
                                    >
                                        <Form.Item
                                            name="text"
                                            rules={[{ required: true, 
                                                message: "Nothing to send!"
                                        }]}
                                            
                                        >
                                            <TextArea
                                                // showCount
                                                allowClear={true}
                                                bordered={false}
                                                rows={5}
                                                style={{
                                                    height: "20%",
                                                    background:"#f0f2f5",
                                                    borderRadius:"2vh",
                                                    width: "40vw",
                                                    marginRight: "1%",
                                                }}
                                                placeholder="Share your idea here!"
                                            />
                                        </Form.Item>
                                        <Form.Item wrapperCol={{span: 4}}
                                        style={{display: "flex", alignItems: "flex-end", marginLeft:"2%"}}
                                        >
                                                 <Button
                                                type="primary"
                                                shape="round"
                                                size="large"
                                                htmlType="submit"
                                                loading={loading}
                                                // onClick={(e) => {form.resetFields()}}
                                            >
                                                <SendOutlined/>
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