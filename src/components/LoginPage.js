import React from "react";
import { Button, Checkbox, Form, Input, Layout } from "antd"

const { Component } = React;
const { Content, Row } = Layout;
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

class LoginPage extends Component {

  render() {
    return (
      <div style={{ width: 500, margin: "20px auto" }}>
      <Form
        name="basic"
        type="flex" justify="center" align="middle" style={{ minHeight: '100vh', marginTop: "64px" }}
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 12,
        }}
        initialValues={{
          remember: true,
        }}
        // onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="username"
          labelCol={{
            span: 4
          }}
          wrapperCol={{
            span: 12
          }}
          rules={[
            {
              required: true,
              message: 'Please input your Email!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          labelCol={{
            span: 4
          }}
          wrapperCol={{
            span: 12
          }}
        >
          <Input.Password />

        </Form.Item>

        <Form.Item>

          <Button type="primary" htmlType="submit" style={{display: "flex", justifyContent: "center"}}>
            Submit
          </Button>
          <Button type="link" htmlType="button" style={{display: "flex", justifyContent: "center"}}>
            New here? Create your account
          </Button>

        </Form.Item>
      </Form>
      </div>
    );
  }
}
