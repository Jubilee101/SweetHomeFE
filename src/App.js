import { Layout } from "antd";
import React from "react";

import LoginPage from "./components/LoginPage";

const { Component } = React;
const { Header, Content } = Layout;
class App extends Component {
  componentDidMount() {

  }
  renderContent() {
    if (true) {
      return <LoginPage />
    }
  }
  render() {
    return (
      <Layout style={{ height: "100vh" }}>
        <Header style={{ display: "flex", justifyContent: "space-between", backgroundColor: "#6667AB", height: "96px"}}>
          <div style={{ fontSize: 24, fontWeight: 600, color: "white", lineHeight: "96px"}}>
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
