import React,{useState,useEffect} from 'react'
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import request from 'umi-request';
import { message,Form,Card,Input,Divider,Button} from 'antd';

const Index =()=>{
  const [form] = Form.useForm();

const onFinish=(values)=>{
  console.log(values)
};
const reset=()=>{
  form.resetFields();
};

const buttonSet={
   display:'flex',
  justifyContent:'space-around',
  marginTop:20,
}

  return(
    <PageHeaderWrapper>
      <Card>
        <Form
          form={form}
          labelCol={{
            span: 4,
          }}
          // initialValues={currentUser}
          wrapperCol={{
            span: 14,
          }}
          onFinish={onFinish}
        >
         <Card title={'联系方式一'}>
          <Form.Item  label="名称">
            <Input placeholder="请输入名称" />
          </Form.Item>
          <Form.Item label="地址">
            <Input placeholder="请输入地址" />
          </Form.Item>
          <Form.Item label="联系方式">
            <Input placeholder="请输入联系方式" />
          </Form.Item>
        </Card>
          <Card title={'联系方二'}>
            <Form.Item  label="名称">
              <Input placeholder="请输入名称" />
            </Form.Item>
            <Form.Item label="地址">
              <Input placeholder="请输入地址" />
            </Form.Item>
            <Form.Item label="联系方式">
              <Input placeholder="请输入联系方式" />
            </Form.Item>
          </Card>
          <Card title={'联系方式三'}>
            <Form.Item  label="名称">
              <Input placeholder="请输入名称" />
            </Form.Item>
            <Form.Item label="地址">
              <Input placeholder="请输入地址" />
            </Form.Item>
            <Form.Item label="联系方式">
              <Input placeholder="请输入联系方式" />
            </Form.Item>
          </Card>
          <Form.Item label=" " colon={false}  >
            <div style={buttonSet}>
              <Button type="primary" onClick={reset}>
              清空
            </Button>
              <Divider type="vertical" />
              <Button type="primary" htmlType="submit">
                保存
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Card>

    </PageHeaderWrapper>
  )
};
export default Index;
