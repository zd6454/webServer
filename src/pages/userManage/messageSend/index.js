import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import request from 'umi-request';
import { Form, Input, InputNumber, Button, Upload,Divider, message } from 'antd';
import PlusOutlined from '@ant-design/icons/es/icons/PlusOutlined';
import Select from 'antd/es/select';
import { addRule,sendUsers,getUsers} from "./service";
import moment from 'moment';
import {getNowFormatDate} from '../../../utils/utils';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //data:''
      previewVisible: false,
      previewImage: '',
      previewTitle: '',
      fileList: [],
      selectedMembers: [],
      num:20,
      users:[]
    };
  }
  componentDidMount() {
   const getAllUsers=async()=>{
     const users = await getUsers({page:1,num:200});
     this.setState({users})
   };
   getAllUsers();
  }

  handleMemberChange = (selectedMembers) => {
    this.setState({ selectedMembers });
  };
  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };

  handleChange = ({ fileList }) => this.setState({ fileList });

  onFinish=async(e)=>{
     const messageInfo={
       messageId:0,
       title:e.title,
       content:e.content,
       time:getNowFormatDate(),
     };
    try {
      const end = await addRule(messageInfo);
      console.log(end)
      await sendUsers({
        messageId:end.messageId,
        receivers:e.receivers
      });
      message.success("发送成功")
    }catch (err) {
       message.error("网络错误")
    }
  };
  getMore=(e)=>{
     console.log(e)
  };
   cleanValue=()=>{

   };
  render() {
    const {
      previewVisible,
      previewImage,
      fileList,
      previewTitle,
      selectedMembers,
      users,
      history,
    } = this.state;
    const filteredOptions = users.filter((o) => !selectedMembers.includes(o));
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    //const{data}=this.state;
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
            onFinish={this.onFinish}
          >
            <Form.Item
              name="title"
              label="标题"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>

            {/*<Form.Item name="cover" label="封面">*/}
              {/*<Upload*/}
                {/*listType="picture-card"*/}
                {/*onPreview={this.handlePreview}*/}
                {/*onChange={this.handleChange}*/}
              {/*>*/}
                {/*{fileList.length > 0 ? null : uploadButton}*/}
              {/*</Upload>*/}
            {/*</Form.Item>*/}
            <Form.Item name="content" label="正文" rules={[
              {
                required: true,
              },
            ]} >
              <Input.TextArea  />
            </Form.Item>
            <Form.Item name="receivers" label="发送对象">
              <Select
                mode="multiple"
                placeholder="请选择发送对象"
                value={selectedMembers}
                onChange={this.handleMemberChange}
                style={{ width: '100%' }}
                onPopupScroll={this.getMore}
              >
                {filteredOptions.map((item) => (
                  <Select.Option key={item.userId} value={item.userId}>
                    {item.username}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
              {/*<Button type="default" onClick={this.cleanValue}>*/}
                {/*重置*/}
              {/*</Button>*/}
              <Divider type="vertical" />
              <Button type="primary" htmlType="submit">
                发送
              </Button>
            </Form.Item>
          </Form>
        </div>
      </PageHeaderWrapper>
    );
  }
}
export default Index;
