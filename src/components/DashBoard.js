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
    Drawer,
  } from "antd";
import { getPublicInvoice, getPersonalInvoice, getUnreadNum, 
    clearPersonalInvoice, clearPublicInvoice, checkDue  } from "../utils";

const { Text } = Typography;

class Dashboard extends React.Component {
    render() {
        return (
            <Row className="dashBorad">
                <Col span={14} className="public-invoice">
                   <PublicInvoice />
                </Col>
                <Col span={8} className="personal-invoice">
                    <PersonalInvoice />
                </Col>
            </Row>  
        );
    }
}

const PublicInvoice = () =>{
   const [loading, setLoading] = useState(false);
   const [personalInvoice, setPersonalInvoice] = useState([]);
   const [countPublic, setCountPublic] = useState(0);

    useEffect(() => {
        loadData();
        setCountPublic(getUnreadNum("public").num);
    });

    const clearNum = () => {
        setCountPublic(0);
        clearPublicInvoice();
    }

    const loadData = async () => {
        if (loading) {
            return;
        }
        setLoading(true);

        try {
            const resp = await getPublicInvoice();
                setPersonalInvoice(resp)
            } catch (error) {
                message.error(error.message);
            } finally {
                setLoading(false);
        }
    };
    
    return (
        <>
            <div
                id="public-invoice"
                style={{
                  height: 700,
                  overflow: 'auto',
                  padding: '0 16px',
                  border: '1px solid rgba(140, 140, 140, 0.35)',
                }}
            >
                <Button
                    shape="round"
                    onClick={clearNum}
                >clear unread</Button>
                <Badge count={countPublic} />
                <List
                    loading={loading}
                    dataSource={personalInvoice}
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
        </>
    );
};

const PersonalInvoice = () => {
  const [visitReservation, setVisitReservation] = useState(false);
  const [visitPayment, setVisitPayment] = useState(false);
  const [visitMail, setVisitMail] = useState(false);
  const [visitOther, setVisitOther] = useState(false);
  const [countReservation, setCountReservation] = useState(10);
  const [countPayment, setCountPayment] = useState(0);
  const [countMail, setCountMail] = useState(0);
  const [countOther, setCountOther] = useState(0);
  const [reservationList, setReservationList] = useState([]);
  const [mailList, setMailList] = useState([]);
  const [paymentList, setPaymentList] = useState([]);
  const [otherList, setOtherList] = useState([]);

  useEffect(() => {
        setCountMail(getUnreadNum("mail").num);
        setCountReservation(getUnreadNum("reservation").num);
        setCountOther(getUnreadNum("other").num);
        setCountPayment(getUnreadNum("payment").num);
        checkDue();
    });
    
  const clickMailDrawer = () => {
    setVisitMail(true);
    setCountMail(0);
    clearPersonalInvoice("mail");
    loadMailData();
  };

  const clickOtherDrawer = () => {
    setVisitOther(true);
    setCountOther(0);
    clearPersonalInvoice("other");
    loadOtherData();
  };

  const clickReservationDrawer = () => {
    setVisitReservation(true);
    setCountReservation(0);
    clearPersonalInvoice("reservation");
    loadReservarionData();
  };

  const clickPaymentDrawer = () => {
    setVisitPayment(true);
    setCountPayment(0);
    clearPersonalInvoice("payment");
    loadPaymentData();
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

  const loadReservarionData = async () => {
    try {
            const resp = await getPersonalInvoice("reservation");
            setReservationList(resp)
        } catch (error) {
            message.error(error.message);
        } 
    };

  const loadMailData = async () => {
    try {
            const resp = await getPersonalInvoice("mail");
            setMailList(resp)
        } catch (error) {
            message.error(error.message);
        } 
  };

  const loadPaymentData = async () => {
    try {
         const resp = await getPersonalInvoice("payment");
         setPaymentList(resp)
        } catch (error) {
            message.error(error.message);
        } 
  };

  const loadOtherData = async () => {

    try {
            const resp = await getPersonalInvoice("other");
            setOtherList(resp)
        } catch (error) {
            message.error(error.message);
        } 
  };

    return (
        <>
          <Space
            align="center"
            direction="vertical"
          >
            <div>
                <Button type="primary" onClick={clickMailDrawer}>
                Mail
                </Button>
                <Badge count={countMail} />
            </div>
            <div>
                <Button type="primary" onClick={clickOtherDrawer}>
                Other
                </Button>
                <Badge count={countOther}/>
            </div>
            <div>
                <Button type="primary" onClick={clickReservationDrawer}>
                Reservation 
                </Button>
                <Badge count={countReservation}/>
            </div>
            <div>
                <Button type="primary" onClick={clickPaymentDrawer}>
                Payment
                </Button>
                <Badge count={countPayment}/>
            </div>
          </Space>

          <Drawer
            title={"Reservation"}
            placement="right"
            width={750}
            visible={visitReservation}
            onClose={onReservationDrawerClose}
            extra={
                <>
                  <Button onClick={onReservationDrawerClose}>Close</Button>
                </>
              }
          >
            <List
                dataSource={reservationList}
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
          </Drawer>
          <Drawer
            title={"Payment"}
            placement="right"
            width={750}
            visible={visitPayment}
            onClose={onPaymentDrawerClose}
            extra={
                  <Button onClick={onPaymentDrawerClose}>Close</Button>
              }
          >
            <List
                dataSource={paymentList}
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
          </Drawer>
          <Drawer
            title={"Mail"}
            placement="right"
            width={750}
            visible={visitMail}
            onClose={onMailDrawerClose}
            extra={
                  <Button onClick={onMailDrawerClose}>Close</Button>
              }
          >
            <List
                dataSource={mailList}
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
          </Drawer>
          <Drawer
            title={"Other"}
            placement="right"
            width={750}
            visible={visitOther}
            onClose={onOtherDrawerClose}
            extra={
                  <Button onClick={onOtherDrawerClose}>Close</Button>
              }
          >
            <List
                dataSource={otherList}
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
          </Drawer>
        </>
      )
};

export default Dashboard;