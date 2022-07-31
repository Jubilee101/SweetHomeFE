import { Layout, Menu, Dropdown, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import React from "react";
import LoginPage from "./components/LoginPage";
import LoginPageAlter from "./components/LoginPageAlter";


const { Component } = React;
const { Header, Content } = Layout;
class App extends Component {
  state = {
    authed: false,
    asManager: false,
  }
  componentDidMount() {
    const authToken = localStorage.getItem("authToken");
    const asManager  = localStorage.getItem("asManager") === "true";
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

  userMenu = (
    <div>
      <Menu>
      <Menu.Item key="logout" onClick={this.handleLogOut}>
        Log Out
      </Menu.Item>
    </Menu>
    </div>
  );

  renderContent() {
    if (!this.state.authed) {
      return <LoginPageAlter handleLoginSuccess={this.handleLoginSuccess}/>
    }
  }
  
  render() {
    return (
      <>
      {this.renderContent()}
      {this.state.authed && (
            <div>
              <Dropdown trigger="click" overlay={this.userMenu}>
                <Button icon={<UserOutlined />} shape="circle" />
              </Dropdown>
            </div>
          )}
      </>
    )
  }
}

export default App;
