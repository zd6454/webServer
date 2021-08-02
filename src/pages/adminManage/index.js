import React, { Component, useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Form, Input, Button, Radio, Select, Divider } from 'antd';

const options = ['普通人员', '管理员', '系统管理员'];

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}

  onChange = (e) => {
    console.log('radio1 checked', e.target.value);
    this.setState({
      value: e.target.value,
    });
  };

  onClick = () => {
    history.goBack();
  };

  render() {
    const { value } = this.state;
    return (
      <PageHeaderWrapper>
        <div style={{ backgroundColor: '#ffff', padding: 5, margin: 5 }}>
          <Form
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 14,
            }}
          >
            <h2 style={{ padding: 5, margin: 5 }}>基本信息</h2>
            <Divider />
            <Form.Item
              name="department"
              label="所属部门"
              rules={[
                {
                  required: true,
                  message: '请选择所属部门！',
                  whitespace: true,
                },
              ]}
            >
              <Select>
                <Select.Option value="SDW">圣大卫大学</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="name"
              label="姓名"
              rules={[
                {
                  required: true,
                  message: '请输入姓名！',
                  whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="loginName"
              label="登陆名"
              rules={[
                {
                  required: true,
                  message: '请输入登陆名!',
                  whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label="密码"
              rules={[
                {
                  required: true,
                  message: '请填写密码！',
                },
              ]}
              hasFeedback
            >
              <Input.Password placeholder="请填写密码" />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="确认密码"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: '请填写确认密码!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject(new Error('两次输入的密码不一致!'));
                  },
                }),
              ]}
            >
              <Input.Password placeholder="请填写确认密码" />
            </Form.Item>
            <Form.Item
              name="qq"
              label="QQ"
              rules={[
                {
                  required: true,
                  message: '请输入QQ号码！',
                  whitespace: true,
                },
              ]}
            >
              <Input placeholder="请填写QQ号码" />
            </Form.Item>
            <Form.Item
              name="email"
              label="电子邮箱"
              rules={[
                {
                  type: 'email',
                  message: '请输入邮箱!',
                },
                {
                  required: true,
                  message: '请填写电子邮箱!',
                },
              ]}
            >
              <Input placeholder="请填写电子邮箱" />
            </Form.Item>
            <Form.Item
              name="telephone"
              label="电话"
              rules={[
                {
                  required: true,
                  message: '请输入电话号码！',
                  whitespace: true,
                },
              ]}
            >
              <Input placeholder="请填写电话" />
            </Form.Item>
            <Form.Item
              name="phone"
              label="手机"
              rules={[
                {
                  required: true,
                  message: '请输入手机号码！',
                  whitespace: true,
                },
              ]}
            >
              <Input placeholder="填写手机号码" />
            </Form.Item>

            <h2 style={{ padding: 5, margin: 5 }}>授权信息</h2>
            <Divider />
            <Form.Item
              name="role"
              label="用户角色"
              rules={[
                {
                  required: true,
                  message: '请选择用户角色！',
                  whitespace: true,
                },
              ]}
            >
              <Radio.Group options={options} onChange={this.onChange} value={value} />
            </Form.Item>
            <Form.Item
              name="land"
              label="是否可登录"
              rules={[
                {
                  required: true,
                  message: '请选择登陆权限！',
                  whitespace: true,
                },
              ]}
            >
              <Select defaultValue="yes" style={{ width: 120 }}>
                <Select.Option value="yes">是</Select.Option>
                <Select.Option value="no">否</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item label=" " colon={false}>
              <Button type="primary" onClick={this.onClick}>
                返回
              </Button>
              <Divider type="vertical" />
              <Button type="primary" htmlType="submit">
                保存
              </Button>
            </Form.Item>
          </Form>
        </div>
      </PageHeaderWrapper>
    );
  }
}
export default Index;
