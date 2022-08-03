import { Layout, Menu, Dropdown, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import React from "react";
import LoginPage from "./components/LoginPage";
import ResidentHomePage from "./components/ResidentHomePage"
import ManagerHomePage from "./components/ManagerHomePage"
import { FlatTree } from "framer-motion";

const { Component } = React;
const { Header, Content, Sider } = Layout;
class App extends Component {
  state = {
    authed: false,
    asManager: false,
    collapsed: false
  }

  componentDidMount() {
    const authToken = localStorage.getItem("authToken");
    const asManager = localStorage.getItem("asManager") === "true";
    this.setState({
      authed: authToken !== null,
      asManager,
    });
  }


  handleLoginSuccess = (token, asManager) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("asManager", asManager);
    this.setState({
      authed: true,
      asManager,
    });
  };

  handleLogOut = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("asManager");
    this.setState({
      authed: false,
    });
  }

  renderContent = () => {
    if (!this.state.authed) {
      return <LoginPage handleLoginSuccess={this.handleLoginSuccess} />
    }
    if (this.state.asManager) {
      return (
        <Layout >
          <Header style={{ backgroundColor: "#6667AB", height: "10vh", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
            <div style={{ fontSize: 34, fontWeight: 560, color: "white", lineHeight: "96px", display: "flex", alignItems: "center"}}>
              SweetHome
            </div>
            <div>
              <Dropdown trigger="click" overlay={this.userMenu}>
                <Button icon={<UserOutlined />} shape="circle" />
              </Dropdown>
            </div>
          </Header>
          <Layout>
            <Content>
              <ManagerHomePage />
            </Content>
          </Layout>
        </Layout>

      )
    }
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Header
        style={{ backgroundColor: "#6667AB", height: "13vh"}}>
          <div style={{ fontSize: 30, fontWeight: 600, color: "white", lineHeight: "96px" }}>
            SweetHome
          </div>
          <div >
            <Dropdown trigger="click" overlay={this.userMenu}>
              <Button icon={<UserOutlined />} shape="circle" />
            </Dropdown>
          </div>
        </Header>
        <Content style={{ height: "87vh" }}>
          <ResidentHomePage />
        </Content>
      </Layout>
    )
  };

  userMenu = (
    <Menu>
      <Menu.Item key="logout" onClick={this.handleLogOut}>
        Log Out
      </Menu.Item>
    </Menu>
  );


  render() {
    return (
      <>
        {this.renderContent()}
      </>
    )
  }
}


export default App;
