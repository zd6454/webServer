import React, { useState,useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { useModel } from 'umi';
import { Form, Input, Button, Radio, Select, Divider,message } from 'antd';
import {updateRule} from './service';

const role=['普通人员', '管理员', '系统管理员']

const  Index =(props)=> {
  const { initialState,setInitialState } = useModel('@@initialState');
  const [form] = Form.useForm();
  const [currentUser,setCurrentUser]=useState(initialState.currentUser);
  const onChange = (e) => {
    console.log('radio1 checked', e.target.value);
  };

 const reset = () => {
    form.resetFields();
  };
  const onFinish= async(value)=>{
    const user = value;
    try {
      user.role=role.indexOf(value.role);
      user.isAllowLogin = Number(value.isAllowLogin);
      await updateRule(user);
      setInitialState({
        ...initialState,
        showMenu: true,
        currentUser: user,
      });
      message.success('修改成功');
    }catch (e) {
      message.error('网络错误');
    }
     console.log(user)
  };
    return (
      <PageHeaderWrapper>
        <div style={{ backgroundColor: '#ffff', padding: 5, margin: 5 }}>
          <Form
            form={form}
            labelCol={{
              span: 4,
            }}
            initialValues={currentUser}
            wrapperCol={{
              span: 14,
            }}
            onFinish={onFinish}
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
              name="realName"
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
              name="adminName"
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
              name="phone"
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
            {/*<Form.Item*/}
              {/*name="phone"*/}
              {/*label="手机"*/}
              {/*rules={[*/}
                {/*{*/}
                  {/*required: true,*/}
                  {/*message: '请输入手机号码！',*/}
                  {/*whitespace: true,*/}
                {/*},*/}
              {/*]}*/}
            {/*>*/}
              {/*<Input placeholder="填写手机号码" />*/}
            {/*</Form.Item>*/}

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
              <Radio.Group options={role}  onChange={onChange} />
            </Form.Item>
            <Form.Item
              name="isAllowLogin"
              label="是否可登录"
              disable
              rules={[
                {
                  required: true,
                  message: '请选择登陆权限！',
                  whitespace: true,
                },
              ]}
            >
              <Select defaultValue="是" style={{ width: 120 }}>
                <Select.Option value={'1'}>是</Select.Option>
                <Select.Option value={'0'}>否</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item label=" " colon={false}>
              <Button type="primary" onClick={reset}>
                清空
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
export default Index;
