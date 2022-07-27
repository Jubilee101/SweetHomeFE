import { Layout } from "antd";
import React from "react";
import LoginPageAlter from "./components/LoginPageAlter";

const { Component } = React;
const { Header, Content } = Layout;
class App extends Component {
  componentDidMount() {

  }

  handleLoginSuccess = (token, asManager) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("asManager", asManager);
    this.setState({
      authed: true,
      asManager,
    });
  };

  renderContent() {
    if (true) {
      return <LoginPageAlter />
    }
  }
  render() {
    return (
      <Layout style={{ height: "100vh" }}>
        <Header style={{ display: "flex", justifyContent: "space-between", backgroundColor: "#6667AB", height: "96px"}}>
          <div style={{ fontSize: 30, fontWeight: 600, color: "white", lineHeight: "96px" }}>
            SweetHome
          </div>
        </Header>
        <Content>
          {this.renderContent()}
        </Content>
      </Layout>
    )
  }
}

export default App;
