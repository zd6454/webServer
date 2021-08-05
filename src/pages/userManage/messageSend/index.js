import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import request from 'umi-request';
import { Divider, message } from 'antd';
import { Form, Input, InputNumber, Button, Upload } from 'antd';
import PlusOutlined from '@ant-design/icons/es/icons/PlusOutlined';
import Select from 'antd/es/select';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const OPTIONS = ['Apples', 'Nails', 'Bananas', 'Helicopters'];

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
    };
  }
  componentDidMount() {

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

  onFinish=(e)=>{
     console.log(e)
  };

  render() {
    const {
      previewVisible,
      previewImage,
      fileList,
      previewTitle,
      selectedMembers,
      history,
    } = this.state;
    const filteredOptions = OPTIONS.filter((o) => !selectedMembers.includes(o));
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

            <Form.Item name="cover" label="封面">
              <Upload
                listType="picture-card"
                onPreview={this.handlePreview}
                onChange={this.handleChange}
              >
                {fileList.length > 0 ? null : uploadButton}
              </Upload>
            </Form.Item>
            <Form.Item name="text" label="正文">
              <Input.TextArea />
            </Form.Item>
            <Form.Item name="sendObject" label="发送对象">
              <Select
                mode="multiple"
                placeholder="请选择发送对象"
                value={selectedMembers}
                onChange={this.handleMemberChange}
                style={{ width: '100%' }}
              >
                {filteredOptions.map((item) => (
                  <Select.Option key={item} value={item}>
                    {item}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
              <Button type="default" onClick={()=>{}}>
                重置
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
