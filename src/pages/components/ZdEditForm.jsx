import React,{Component} from 'react'
import { Card,Form,Input,Modal,Upload,DatePicker,Radio,InputNumber,Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ZdTextArea from "./ZdTextArea";
import moment from 'moment';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

class ZdEditForm extends Component{

  formRef = React.createRef();
    constructor(props){
        super(props);
        this.state={
          previewVisible: false,
          previewImage: '',
          previewTitle: '',
          fileList: [],
          initData:{},
          content:null,
        }
    }

  onFinish=(e)=>{
    const{initData} = this.props;
      e.content=this.state.content?this.state.content:initData.content;
      e.imgUrl=this.state.fileList;
   this.props.handleOk(e);
  };

  /**
   * 上传图片
   */
  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };
  handleChange = ({ fileList }) => {
    console.log(fileList);
    this.setState({fileList}
    );
  };

  onRemove = (file) => {
    const{fileList}=this.state;
    const index = fileList.indexOf(file);
    const newFileList = fileList.slice();
    newFileList.splice(index, 1);
    this.setState({newFileList})
  };


  /**
   * 编辑器处理
   * @returns {*}
   */
  sendMessage=(params)=>{
    this.setState({content:params['content']})
  };

  /**
   * 初始化表单数据
   * @returns {*}
   */

componentWillReceiveProps(nextProps, nextContext) {
  setTimeout(()=>{
    this.initImg();
  },500)

  }

  initImg=()=>{
    const{initData} = this.props;
    const fileList=[];
    if(initData)
      fileList.push({
        uid: new Date().getTime(),
        name: initData.imgUrl.slice(-14),
        status: 'done',
        url:initData.imgUrl
      });
    this.setState({fileList});
  };

   render () {
     const { previewVisible, previewImage,fileList, previewTitle } = this.state;
     const{initData} = this.props;
     const uploadButton = (
       <div>
         <PlusOutlined />
         <div style={{ marginTop: 8 }}>上传</div>
       </div>
     );
      return(<Card>
       { initData&&<Form
          ref={this.formRef}
          labelCol={{ span: 2 }}
          wrapperCol={{ span: 9 }}
          layout="horizontal"
          key={'form'}
          name={'edit'}
          initialValues={ {...initData}}
          onFinish={this.onFinish}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[
              {
                required: true,
                message: '不能为空',
              },
            ]}
          >
            <Input />
          </Form.Item>
          {fileList&&<Form.Item
            label="封面"
            name="imgUrl"
            rules={[
              {
                required: true,
                message: '必须上传封面',
              },
            ]}
          >
            <Upload
              action=""
              listType="picture-card"
              fileList={fileList}
              data={this.props.data}
              onPreview={this.handlePreview}
              onRemove={this.onRemove}
              onChange={this.handleChange}
            >
              {fileList.length >= 1 ? null : uploadButton}
            </Upload>
          </Form.Item>}
          <Form.Item
            label="正文"
            wrapperCol={{span:16}}
            name="content"
            rules={[
              {
                required: true,
                message: '请填写内容',
              },
            ]}
          >
            <ZdTextArea  NoAuto={true}
                         content={initData.content}
                         imgUrl={this.props.imgUrl}
                         comfirm={this.sendMessage}
            />
          </Form.Item>
          <Form.Item
            label="发布日期"
            name="time"
            rules={[
              {
                required: true,
                message: '日期不能为空',
              },
            ]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            name="isUse"
            label="启用状态"
            rules={[
              {
                required: true,
                message: '请选择',
              },
            ]}
          >
            <Radio.Group >
              <Radio value={1}>启用</Radio>
              <Radio value={0}>不启用</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="排序"
            name="sort"
            rules={[
              {
                required: true,
                message: '请排序',
              },
            ]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
            <Button type="primary" htmlType="submit">
              保存
            </Button>
            <Button style={{margin:"0px 0px 0px 100px"}}>
              返回
            </Button>
          </Form.Item>
        </Form>}

        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
    </Card>)
   }
}

export default ZdEditForm;
