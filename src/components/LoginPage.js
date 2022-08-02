import React from "react";
import { Form, Button, Input, Space, Checkbox, message, Modal, Typography, Divider, Layout } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined, KeyOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import { login, register } from "../utils";
const { Content, Sider, Menu } = Layout;
const { Title } = Typography;

class LoginPage extends React.Component {
  formRef = React.createRef();
  state = {
    asManager: false,
    loading: false,
  };

  onFinish = () => {
    console.log("finish form");
  };
  handleCheckboxOnChange = (e) => {
    this.setState({
      asManager: e.target.checked,
    });
  };

  handleLogin = async () => {
    const formInstance = this.formRef.current;

    try {
      await formInstance.validateFields();
    } catch (error) {
      return;
    }

    this.setState({
      loading: true,
    });

    try {
      const { asManager } = this.state;
      const resp = await login(formInstance.getFieldsValue(true), asManager);
      this.props.handleLoginSuccess(resp.token, asManager);
    } catch (error) {
      message.error(error.message);
    } finally {
      this.setState({
        loading: false,
      });
    }
  };

  render() {
    return (
      <Layout 
      className="site-layout"
      style={{height: "100vh"}}
      >
        <Content
          className="site-layout-background"
          style={{
            margin: '8vh 10vh',
            display: "flex",
            justifyContent: "center",
          }}>
          <Layout 
          hasSider
          >
            <Content
              className="site-layout-background"
              style={{display: "flex", justifyContent: "center", alignItems: "center", borderTopLeftRadius: "2vh", borderBottomLeftRadius: "2vh"}}
            >
              <div style={{width: "100%"}}>
              <Title
              className="loginPage-title"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  fontWeight: "640",
                  fontSize: "42px",
                  color: "#6667AB"
                }}>
                SweetHome
              </Title>
              <Title
              className="loginPage-title"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  fontWeight: "640",
                  fontSize: "42px",
                  color: "#6667AB"
                }}>
                Login to Your Account
              </Title>
              <div style={{ width: "33%", margin: "2vh auto" }}>
                <Form ref={this.formRef} onFinish={this.onFinish} style={{marginTop: "10vh"}}>
                  <Form.Item
                    className="antd-input"
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Email!",
                      },
                    ]}
                  >
                    <Input
                      disabled={this.state.loading}
                      prefix={<MailOutlined className="site-form-item-icon" />}
                      placeholder="Email: email@example.com"
                    />
                  </Form.Item>
                  <Form.Item
                    className="antd-input"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Password!",
                      },
                    ]}
                  >
                    <Input.Password

                      disabled={this.state.loading}
                      prefix={<KeyOutlined className="site-form-item-icon" />}
                      placeholder="Password"
                    />
                  </Form.Item>
                </Form>
                <Space style={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    onClick={this.handleLogin}
                    disabled={this.state.loading}
                    size={"large"}
                    shape="round"
                    type="primary"
                    background="#6667AB"
                  >
                    Login
                  </Button>
                  <Checkbox
                    disabled={this.state.loading}
                    checked={this.state.asManager}
                    onChange={this.handleCheckboxOnChange}
                    style={{ marginLeft: "3vw", fontSize: "16px" }}
                  >
                    As Manager
                  </Checkbox>
                </Space>
              </div>
              </div>
            </Content>
            <Sider
              width={"33%"}
              style={{ background: "#6667AB", borderTopRightRadius: "2vh", borderBottomRightRadius: "2vh"}}>
                <Title
              className="loginPage-title"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "16vh",
                  fontWeight: "640",
                  fontSize: "42px",
                  color: "#fff",
                }}>
                New Here?
              </Title>
              <Title
              className="loginPage-second-title"
                style={{
                  display: "inline-block",
                  justifyContent: "center",
                  fontWeight: "280",
                  fontSize: "28px",
                  color: "#fff",
                  margin: "5vh 8vw",
                  textAlign: "center"
                }}
                >
                Create your account and start your journey to SweetHome
              </Title>
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <div>
                  <RegisterButton />
                </div>
              </div>
            </Sider>
          </Layout>
        </Content>
      </Layout>
    );
  }
}

class RegisterButton extends React.Component {
  formRef = React.createRef();
  state = {
    asManager: false,
    loading: false,
    modalVisible: false,
    registered: false,
  }
  onFinish = () => {
    console.log("finish form");
  };

  handleCancel = () => {
    this.setState({
      modalVisible: false,
      registered: false
    });
  };

  handleCheckboxOnChange = (e) => {
    this.setState({
      asManager: e.target.checked,
    });
  };

  handleRegister = async () => {
    const formInstance = this.formRef.current;
    try {
      await formInstance.validateFields();
    } catch (error) {
      return;
    }

    this.setState({
      loading: true,
    });

    try {
      await register(formInstance.getFieldsValue(true), this.state.asManager);
      this.setState({
        registered: true,
      })
    } catch (error) {
      message.error(error.message + ". The user may already exist.");
    } finally {
      this.setState({
        loading: false,
      });
    }
  };

  handleLoginPageRegister = () => {
    this.setState({
      modalVisible: true,
    });
  };

  renderContent() {
    if (!this.state.registered) {
      return (
        <Content
          loading={this.state.loading}
        >
          <Title level={3} style={{ display: "flex", justifyContent: "center" }}>
            Create your account
          </Title>
          <Divider style={{ display: "flex", justifyContent: "center" }}></Divider>
          <Form
            preserve={false}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item name="account_type"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 20 }}
              style={{ marginLeft: "7vw", marginBottom: "2vw" }}
            >
              <Checkbox
                disabled={this.state.loading}
                checked={this.state.asManager}
                onChange={this.handleCheckboxOnChange}
              >
                Registering a manager account?
              </Checkbox>
            </Form.Item>

            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true }]}
            >
              <Input
                disabled={this.state.loading}
                placeholder="your name"
              />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true }]}
            >
              <Input
                disabled={this.state.loading}
                placeholder="email@example.com"
              />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true }]}
            >
              <Input.Password
                disabled={this.state.loading}
                placeholder="*****—*****—*****"
              />
            </Form.Item>

            <Form.Item
              label="Room Number(optional)"
              name="room"
            >
              <Input
                disabled={this.state.loading || this.state.asManager}
                placeholder="only for resident signing up"
              />
            </Form.Item>
            <Space style={{ display: "flex", justifyContent: "center" }}>
              <Button
                onClick={this.handleRegister}
                disabled={this.state.loading}
                loading={this.state.loading}
                shape="round"
                type="primary"
                htmlType="submit"
              >
                Create Account
              </Button>
            </Space>
          </Form>
        </Content>
      )
    } else {
      return (
        <Content
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly ",
            alignContent: "center",
            height: "30vh"
          }}
        >
          <Space style={{ display: "flex", justifyContent: "center", height: "64" }}>
            <Title level={2} style={{ textAlign: "center" }}>
              Thanks for signing up!
            </Title>
          </Space>
          <CheckCircleOutlined style={{ display: "flex", justifyContent: "center", fontSize: "100px", margin: "3vh", color: "green" }} />
          <Button
            shape="round"
            style={{ display: "flex", justifyContent: "center", margin: "0 auto" }}
            onClick={this.handleCancel}
          >
            Start your SweetHome experience
          </Button>
        </Content>
      )
    }
  }

  render() {
    return (
      <>
        <Button onClick={this.handleLoginPageRegister}
          style={{
            margin: "0 auto",
            display: "flex",
            justifyContent: "center"
          }}
          size={"large"}
          ghost
          shape="round"
        >
          Create your account
        </Button>
        <Modal
          destroyOnClose={true}
          visible={this.state.modalVisible}
          closable={!this.state.registered}
          footer={null}
          onCancel={this.handleCancel}
          bodyStyle={{ height: "50vh" }}
        >
          {this.renderContent()}
        </Modal>
      </>
    );
  }
}

export default LoginPage;
