import React, { useEffect, useState } from "react";
import {
    Button,
    Typography,
    Badge,
    Row,
    Col,
    List,
    message,
    Space,
    Card,
    Drawer,
    Layout,
    Spin
} from "antd";
import {
    getPublicInvoice, getPersonalInvoice, getUnreadNum,
    clearPersonalInvoice, clearPublicInvoice, checkDue, unreadPolling, unreadPollingPublic, unreadPollingPersonal, getUser,
} from "../utils";
import "../styles/DashBoard.css"

import { ClearOutlined, SmileOutlined,DeleteOutlined,MessageOutlined, MailOutlined, MenuFoldOutlined, AppstoreAddOutlined, BankOutlined, CreditCardOutlined, ScheduleOutlined, SoundOutlined, BellOutlined } from "@ant-design/icons"
const { Text, Title } = Typography;

class Dashboard extends React.Component {
    render() {
        return (
            <Layout
                style={{ height: "100%" }}
            >
                <Row>
                    <Col
                        offset={1}
                        style={{height: "10%"}}
                    // style={{background: "rgba(255, 255, 255, 0.3)"}}
                    >
                        <Title
                            className="resident-dashboard-title"
                        >
                            Welcome to Your Resident Dashboard
                        </Title>
                    </Col>

                </Row>

                <Row
                    justify="start"
                    style={{ height: "90%" }}
                >
                    <Col span={12}
                        offset={0}

                        className="public-invoice-col"
                    >
                        <PublicInvoice />
                    </Col>
                    <Col span={11}
                        offset={0}
                        className="personal-invoice-col"
                    >
                        <PersonalInvoice />

                    </Col>
                </Row>
            </Layout>
        )
    }
}

const PublicInvoice = () => {
    const [loading, setLoading] = useState(false);
    const [publicInvoice, setPublicInvoice] = useState([]);
    const [countPublic, setCountPublic] = useState(0);

    const setUnreadNum = async (type, setNum) => {
        const resp = await getUnreadNum(type);
        setNum(resp.num);
    }
    useEffect(() => {
        loadData();
        setUnreadNum("PUBLIC", setCountPublic);
        unreadPollingPublic("PUBLIC", setUnreadNum, setCountPublic, loadData)
    }, []);

    const clearNum = () => {
        setCountPublic(0);
        clearPublicInvoice();
        message.success("Unread count cleared")
    }

    const loadData = async () => {
        setLoading(true);
        try {
            const resp = await getPublicInvoice();
            setPublicInvoice(oldData => [...resp]);
        } catch (error) {
            message.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (

        <div
        style={{ height: "95%" }}>
            <Row
                justify="start"
                align="bottom"
                style={{ height: "10%", paddingTop: "1vh", marginBottom: "1vh"}}
            >
                <Col 
                offset={2}
                span={20}
                >

                    <Row
                    align="bottom"
                    >
                    <Col
                // offset={2}
                span={3}
                >
                <SoundOutlined className="resident-public-invoice-icon"/>
                </Col>
                
                <Col
                offset={1}
                span={6}
                className="resident-public-invoice-title-col"
                >
                Public Invoice
                </Col>
                <Col
                style={{display:"flex",justifyContent: "end"}}
                offset={9}
                span={5}
                >
                    <Button
                        shape="round"
                        type="primary"
                        size="large"
                        onClick={clearNum}
                    >
                        <DeleteOutlined />{`clear ${countPublic} unread`}
                    </Button>
                </Col>

                    </Row>
                </Col>
                
            </Row>
            <Row
                justify="start"
                style={{ height: "90%", maxHeight: "90%" }}
            >
                <Col
                    className="public-invoice-form-col"
                    span={20}
                    offset={2}
                >
                    {
                        loading ?
                    <div className="spin-box">
                        <Spin tip="Loading..." size="large" />
                    </div>
                    :
                    
                        <List className="public-invoice-list"
                        size="middle"
                            // style={{ height: "100%" }}
                            loading={loading}
                            dataSource={publicInvoice}
                            renderItem={(item) => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<MessageOutlined />}
                                        description={
                                            <div>
                                                <Text
                                                style={{fontSize: "16px"}}
                                                >{item.text}</Text>
                                                <br />
                                                <Text
                                                style={{fontSize: "12px", fontWeight: "600"}}
                                                >{item.date}</Text>
                                            </div>
                                        }
                                    />
                                </List.Item>
                            )}
                        />
                    }

                </Col>

            </Row>

        </div>


    );
};

const PersonalInvoice = () => {
    const [visitReservation, setVisitReservation] = useState(false);
    const [visitPayment, setVisitPayment] = useState(false);
    const [visitMail, setVisitMail] = useState(false);
    const [visitOther, setVisitOther] = useState(false);
    const [mailLoading, setMailLoading] = useState(false);
    const [otherLoading, setOtherLoading] = useState(false);
    const [paymentLoading, setPaymentLoading] = useState(false);
    const [reservationLoading, setReservationLoading] = useState(false);
    const [countReservation, setCountReservation] = useState(0);
    const [countPayment, setCountPayment] = useState(0);
    const [countMail, setCountMail] = useState(0);
    const [countOther, setCountOther] = useState(0);
    const [reservationList, setReservationList] = useState([]);
    const [mailList, setMailList] = useState([]);
    const [paymentList, setPaymentList] = useState([]);
    const [otherList, setOtherList] = useState([]);
    const setUnreadNum = async (type, setNum) => {
        const resp = await getUnreadNum(type);
        setNum(resp.num);
    }
    let user = {}
    const loadUser = async() => {
        try {
            const resp = await getUser();
            user = resp;
        } catch(error) {
            message.error(error.message);
        }
    }
    useEffect(() => {
        checkDue();

        setUnreadNum("MAIL", setCountMail);

        setUnreadNum("OTHER", setCountOther);
        
        setUnreadNum("RESERVATION", setCountReservation);

        setUnreadNum("PAYMENT", setCountPayment);

        const setUp = async() => {
            await loadUser();
            unreadPollingPersonal(user.email, setUnreadNum, 
                setCountMail, "MAIL", 
                setCountOther, "OTHER", 
                setCountReservation, "RESERVATION", 
                setCountPayment, "PAYMENT");
            }
        setUp();
    }, []);

    const clickMailDrawer = () => {
        setVisitMail(true);
        setCountMail(0);
        clearPersonalInvoice("MAIL");
        loadData("MAIL", setMailList, setMailLoading);
    };

    const clickOtherDrawer = () => {
        setVisitOther(true);
        setCountOther(0);
        clearPersonalInvoice("OTHER");
        loadData("OTHER", setOtherList, setOtherLoading);
    };

    const clickReservationDrawer = () => {
        setVisitReservation(true);
        setCountReservation(0);
        clearPersonalInvoice("RESERVATION");
        loadData("RESERVATION", setReservationList, setReservationLoading);
    };

    const clickPaymentDrawer = () => {
        setVisitPayment(true);
        setCountPayment(0);
        clearPersonalInvoice("PAYMENT");
        loadData("PAYMENT", setPaymentList, setPaymentLoading);
    };

    const onReservationDrawerClose = () => {
        setVisitReservation(false);
    };

    const onPaymentDrawerClose = () => {
        setVisitPayment(false);
    };

    const onMailDrawerClose = () => {
        setVisitMail(false);
    };

    const onOtherDrawerClose = () => {
        setVisitOther(false);
    };

    const loadData = async (type, setList, setLoading) => {
        setLoading(true)
        try {
            const resp = await getPersonalInvoice(type);
            setList(resp)
        } catch (error) {
            message.error(error.message);
        } finally {
            setLoading(false)
        }
    }

    return (
        <div style={{ height: "95%" }}>
            <Row style={{height: "10%",paddingTop: "1vh", marginBottom: "1vh"}} align="bottom">
                <Col
                span={3}
                >
                <BellOutlined className="resident-personal-invoice-icon"/>
                </Col>
                <Col
                offset={1}
                span={7}
                className="personal-invoice-title-col"
                >
                Personal Invoice
                </Col>
                
            </Row>
            <div style={{height: "90%", display: "flex", flexDirection: "column", justifyContent: "space-evenly"}}>
              <Row
                gutter={[16, 28]}
                style={{ height: "42%" }}
            >
                <Col span={12}>
                    <Card
                        title="MAIL"

                        extra={<DrawerButton onClick={clickMailDrawer} loading={mailLoading} />}
                    >
                        <Row
                            justify="center"
                        >
                            <Col>
                                <MailOutlined
                                    style={{ fontSize: "8vh" }}
                                />
                            </Col>
                        </Row>
                        <Row
                            justify="center"
                        >
                            <Col>
                                <div
                                    style={{ fontSize: "2vh", fontWeight: "600" }}
                                >
                                    {`${countMail} unread`}
                                </div>
                            </Col>
                        </Row>
                    </Card>
                </Col>

                <Col span={12}>
                    <Card
                        title="RESERVATION"
                        extra={<DrawerButton onClick={clickReservationDrawer} loading={reservationLoading} />}
                    >
                        <Row
                            justify="center"
                        >
                            <Col>
                                <ScheduleOutlined
                                    style={{ fontSize: "8vh" }}
                                />
                            </Col>
                        </Row>
                        <Row
                            justify="center"
                        >
                            <Col>
                                <div
                                    style={{ fontSize: "2vh", fontWeight: "600" }}
                                >
                                    {`${countReservation} unread`}
                                </div>
                            </Col>
                        </Row>
                    </Card>

                </Col>
            </Row>

            <Row
                style={{ height: "42%" }}
                gutter={[16, 28]}
            >
                <Col span={12}>
                    <Card
                        title="PAYMENT"
                        extra={<DrawerButton onClick={clickPaymentDrawer} loading={paymentLoading} />}
                    >
                        <Row
                            justify="center"
                        >
                            <Col>
                                <BankOutlined
                                    style={{ fontSize: "8vh" }}
                                />
                            </Col>
                        </Row>
                        <Row
                            justify="center"
                        >
                            <Col>
                                <div
                                    style={{ fontSize: "2vh", fontWeight: "600" }}
                                >
                                    {`${countPayment} unread`}
                                </div>
                            </Col>
                        </Row>

                    </Card>
                </Col>
                <Col span={12}>
                    <Card
                        title="OTHER"

                        extra={<DrawerButton onClick={clickOtherDrawer} loading={otherLoading} />}
                    >
                        <Row
                            justify="center"
                        >
                            <Col>
                                <AppstoreAddOutlined
                                    style={{ fontSize: "8vh" }}
                                />
                            </Col>
                        </Row>
                        <Row
                            justify="center"
                        >
                            <Col>
                                <div
                                    style={{ fontSize: "2vh", fontWeight: "600" }}
                                >
                                    {`${countOther} unread`}
                                </div>
                            </Col>
                        </Row>
                    </Card>

                </Col>
            </Row>   
            </div>
           
            {visitMail && <PersonalInvoiceDrawer onClose={onMailDrawerClose} type="MAIL" invoiceList={mailList} visible={visitMail} />}
            {visitOther && <PersonalInvoiceDrawer onClose={onOtherDrawerClose} type="OTHER" invoiceList={otherList} visible={visitOther} />}
            {visitPayment && <PersonalInvoiceDrawer onClose={onPaymentDrawerClose} type="PAYMENT" invoiceList={paymentList} visible={visitPayment} />}
            {visitReservation && <PersonalInvoiceDrawer onClose={onReservationDrawerClose} type="RESERVATION" invoiceList={reservationList} visible={visitReservation} />}
        </div>
    )
};

const DrawerButton = ({ onClick, loading }) => {
    return (
        <Button
            shape="round"
            type="primary"
            onClick={onClick}
            loading={loading}>
            Details
            <MenuFoldOutlined />
        </Button>
    )
}

const PersonalInvoiceDrawer = ({ onClose, type, invoiceList, visible }) => {
    return (
        <Drawer
            title={type}
            placement="right"
            width={500}
            visible={visible}
            onClose={onClose}
        >
            <List
                dataSource={invoiceList}
                renderItem={(item) => (
                    <List.Item>
                        <List.Item.Meta
                            description={
                                <div>
                                    <Text
                                        style={{ fontSize: "16px" }}
                                    >{item.text}</Text>
                                    <br />
                                    <Text
                                        style={{ fontSize: "12px", fontWeight: "600" }}
                                    >{item.date}</Text>
                                </div>
                            }
                            avatar={<MessageOutlined />}
                        />
                    </List.Item>
                )}
            />
        </Drawer>
    )
}


export default Dashboard;