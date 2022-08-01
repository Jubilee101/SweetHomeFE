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
  } from "antd";
import { getPublicInvoice, getPersonalInvoice, getUnreadNum, 
    clearPersonalInvoice, clearPublicInvoice, checkDue  } from "../utils";
import "../styles/DashBoard.css"
const { Text } = Typography;

class Dashboard extends React.Component {
    render() {
        return (
            <Row className="dashBorad">
                <Col span={8} className="public-invoice">
                   <PublicInvoice />
                </Col>
                <Col span={8} >
                    <div className="personal-invoice">
                    <PersonalInvoice />
                    </div>
                </Col>
            </Row>  
        );
    }
}

const PublicInvoice = () =>{
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
    },  []);

    const clearNum = () => {
        setCountPublic(0);
        clearPublicInvoice();
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
        <>
            <Button
                    shape="round"
                    onClick={clearNum}
                > 
            {`clear ${countPublic} unread`}
            </Button>
            <div className="public-invoice-list">
                <List
                    loading={loading}
                    dataSource={publicInvoice}
                    renderItem={(item) => (
                        <List.Item>
                            <List.Item.Meta
                            description={
                                <div>
                            <Text>{item.text}</Text>
                            <br/>
                            <Text>{item.date}</Text>
                            </div>
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
  useEffect(() => {
        setUnreadNum("MAIL", setCountMail);
        setUnreadNum("OTHER", setCountOther);
        setUnreadNum("RESERVATION", setCountReservation);
        setUnreadNum("PAYMENT", setCountPayment);
        checkDue();
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
    } finally{
        setLoading(false)
    }
  }

    return (
        <>
            <Row gutter={[8, 8]}>
                <Col span={12}>
                    <Card 
                    title="MAIL"
                    style={{ height: 240 }}
                    extra={<DrawerButton onClick={clickMailDrawer} loading={mailLoading}/>}
                    >
                        {`${countMail} unread`}
                    
                    </Card>
                </Col>
                
                <Col span={12}>
                    <Card 
                    title="OTHER"
                    style={{ height: 240 }}
                    extra={<DrawerButton onClick={clickOtherDrawer} loading={otherLoading}/>}
                    >
                        {`${countOther} unread`}
                    
                    </Card>
                </Col>
            </Row>

            <Row gutter={[8,8]}>
                <Col span={12}>
                    <Card 
                    title="PAYMENT"
                    extra={<DrawerButton onClick={clickPaymentDrawer} loading={paymentLoading}/>}
                    style={{ height: 240 }}>
                        {`${countPayment} unread`}
                    </Card>
                </Col>
                <Col span={12}>
                    <Card 
                    title="RESERVATION"
                    extra={<DrawerButton onClick={clickReservationDrawer} loading={reservationLoading}/>}
                    style={{ height: 240 }}>
                        {`${countReservation} unread`}
                    </Card>
                </Col>
            </Row>
          {visitMail && <PersonalInvoiceDrawer onClose={onMailDrawerClose} type="MAIL" invoiceList={mailList} visible={visitMail}/>}
          {visitOther && <PersonalInvoiceDrawer onClose={onOtherDrawerClose} type="OTHER" invoiceList={otherList} visible={visitOther}/>}
          {visitPayment && <PersonalInvoiceDrawer onClose={onPaymentDrawerClose} type="PAYMENT" invoiceList={paymentList} visible={visitPayment}/>}
          {visitReservation && <PersonalInvoiceDrawer onClose={onReservationDrawerClose} type="RESERVATION" invoiceList={reservationList} visible={visitReservation}/>}
        </>
      )
};

const DrawerButton = ({onClick, loading}) => {
    return (
        <Button 
        onClick={onClick}
        loading={loading}>
            Details
        </Button>
    )
}

const PersonalInvoiceDrawer = ({onClose, type, invoiceList, visible}) => {
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
                            <Text>{item.text}</Text>
                            <br/>
                            <Text>{item.date}</Text>
                            </div>
                        }
                        />
                    </List.Item>
                )}
            />
          </Drawer>
    )
}


export default Dashboard;