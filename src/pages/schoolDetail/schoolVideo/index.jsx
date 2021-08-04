import React,{Component} from 'react'
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { message,Card,Upload ,Button,Spin } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { getRule, updateRule, deleteRule } from './service';

const { Dragger } = Upload;

class Index extends Component{
    constructor(props){
      super(props);
      this.state={
         initUrl:'',
         isUpdate:false,
         text:["替换","返回"],
         fileList:null,
         isSpin:false,
      }
    }
 componentDidMount() {
      this.setState({isSpin:true})
      this.getInitVideo();
 }

 changeUpdateState=()=>{
      const {isUpdate} = this.state;
      this.setState({isUpdate:!isUpdate});
 };

 getInitVideo=async()=>{

      try {
        const url = await getRule();
        this.setState({initUrl:url,isSpin:false})
        // message.success("初始化视频成功")
      } catch (e) {
        message.error("获取视频失败，请检查网络")
      }

 };
  submitVideo= async()=>{
    const {isUpdate,fileList}=this.state;
    if(!isUpdate){
       message.warn("您没有进行替换操作");
    }else{
      this.setState({isSpin:true});
      try {
       const url =  await updateRule(fileList[0].originFileObj);
       this.setState({initUrl:url,isSpin:false});
        message.success("视频修改成功");
      }catch (e) {
        message.error("上传错误，请检测网络");
      }

    }
  };

 onChange=(info)=>{
   const { status } = info.file;
   if (status !== 'uploading') {
     console.log(info.file, info.fileList);
     this.setState({fileList:info.fileList});
   }
   if (status === 'done') {
     message.success(`${info.file.name} file uploaded successfully.`);
     this.setState({fileList:info.fileList});
   } else if (status === 'error') {
     message.error(`${info.file.name} file upload failed.`);
   }
 };
 onDrop=(e)=>{
   console.log('Dropped files', e.dataTransfer.files);
 };

  render() {
    const {isUpdate,text,initUrl,isSpin}=this.state;
    const butStyle={
      display:"flex",
      justifyContent:"space-around",
      marginTop:40
    };
    const props = {
      name: 'uploadvideo',
      accept:'video/mp4',
      multiple: false,
      action: '',
      onChange:this.onChange,
      onDrop:this.onDrop,
    };
      return(
        <PageHeaderWrapper>
            <Spin spinning={isSpin}>
              <Card>
                {initUrl&&!isUpdate&& <video  loop muted controls = "true"  style={{width:'100%',}} >
                  <source type='video/mp4' src={initUrl}  />
                </video>}
                {isUpdate&&<Dragger {...props}>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">点击此处或者拖拽视频进入此区域</p>
                  <p className="ant-upload-hint">
                    仅支持mp4格式，且每次仅支持上传一个文件。
                  </p>
                </Dragger>}
                <div style={butStyle}>
                  <Button onClick={this.changeUpdateState} >{text[Number(isUpdate)]}</Button>
                  <Button type="primary" onClick={this.submitVideo} >保存</Button>
                </div>
              </Card>
            </Spin>
        </PageHeaderWrapper>
      )
    }
}
export default  Index;
