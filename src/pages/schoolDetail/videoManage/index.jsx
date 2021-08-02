import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import request from 'umi-request';
import { message } from 'antd';
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Space from 'antd/es/space';

const props = {
  name: 'file',
  //action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} 视频上传成功`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 视频上传失败`);
    }
  },
};

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoUrl: '',
    };
  }
  componentDidMount() {
    this.getVideo();
  }
  getVideo = () => {
    request('http://1.116.77.118:2333/schoolVideo/getSchoolVideo', {
      method: 'GET',
    })
      .then((response) => {
        console.log(response);
        this.setState({
          videoUrl: response,
        });
      })
      .catch((error) => {
        message.error('信息获取失败');
      });
  };
  sendVideo = (params) => {
    request('http://1.116.77.118:2333//schoolVideo/uploadSchoolVideo', {
      method: 'POST',
      videoUrl: params,
    })
      .then(function (response) {
        message.success('信息保存成功');
      })
      .catch(function (error) {
        message.error('信息保存失败');
      });
  };

  deleteVideo = () => {
    request('http://1.116.77.118:2333//schoolVideo/deleteSchoolVideo', {
      method: 'GET',
    })
      .then((response) => {
        console.log(response);
        this.setState({
          videoUrl: response,
        });
      })
      .catch((error) => {
        message.error('信息获取失败');
      });
  };

  render() {
    const { videoUrl } = this.state;
    return (
      <PageHeaderWrapper>
        <div style={{ backgroundColor: '#ffff', padding: 5, margin: 5 }}>
          <Space direction="vertical">
            <video width="800" height="400" controls>
              {/*videoUrl:http://1.116.77.118:2333//schoolVideo/uploadSchoolVideo*/}
            </video>
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>上传视频</Button>
            </Upload>
            <Button>删除视频</Button>
          </Space>
        </div>
      </PageHeaderWrapper>
    );
  }
}
export default Index;
