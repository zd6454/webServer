import React,{Component} from 'react'
import E from "wangeditor"
import request from 'umi-request';
import { Button,Divider  } from 'antd';
import emoji from './emo';
import {history} from "../../.umi/core/history";

class ZdTextArea  extends Component{
   constructor(props){
       super(props);
       this.state={
        editor:null
       }
   }
   componentWillMount() {

   }

  componentDidMount(){
       const{imgUrl,content}=this.props;
    const editor = new E("#div1")

    this.setState({editor})
    editor.config.pasteIgnoreImg = true
    // editor.config.uploadFileName = 'uploadfile';
    editor.config.uploadImgServer = "  ";
    editor.config.emotions = [
      {
        title: '默认',
        type: 'image',
        content: emoji
      }
    ];
    editor.config.zIndex = 5;
    editor.create()
    // editor.config.uploadImgParams = {
    //   index:"2321"
    // }
    if(content){     //获取详情页编辑内容初始化
      editor.txt.html(content)
    }
    editor.config.customUploadImg = function (resultFiles, insertImgFn) {
        const data= new FormData();
        data.append('uploadfile',resultFiles[0]);
        data.append('index',new Date().getTime());
        request(imgUrl, {
            method: 'POST',
            data,
          })
            .then(function(response) {
              insertImgFn(response)
            })
    };

    editor.config.uploadImgHooks={
        before : function(xhr, editor, files) {
			setTimeout(()=>{},5000)
		},
		success : function(xhr, editor, result) {
			console.log("上传成功");
		},
		fail : function(xhr, editor, result) {
			console.log("上传失败,原因是"+result);
		},
		error : function(xhr, editor) {
			console.log("上传出错");
		},
		timeout : function(xhr, editor) {
			console.log("上传超时");
		}
    
   }
   }

  //清空
  contentClear=()=>{
   const{editor}=this.state;
   editor.txt.clear()
  }
  //保存
  contentPublic=()=>{
      const{editor}=this.state;
      const content = editor.txt.html();
      const params= {'content':content}
      if(this.props.comfirm){
          this.props.comfirm(params)
      } 
  }
  render(){
     const{data,isBack}=this.props;
     const{editor}=this.state;
    if(data){
      editor.txt.html(data)
    }
      return(
          <div>
            <div id={'div1'} />
              <div style={{float:'right',marginTop:40}}>
                {isBack&&<Button onClick={()=>history.goBack()} >返回</Button>}
                <Divider type="vertical" />
                <Button onClick={this.contentClear} >清空</Button>
                <Divider type="vertical" />
                <Button type="primary" onClick={this.contentPublic} > 保存 </Button>
              </div>
          </div>
      )
  }
} 

export default ZdTextArea;
