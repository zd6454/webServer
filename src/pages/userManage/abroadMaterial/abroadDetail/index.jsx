import React, { useState,useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Form, Input, Button, Upload,Divider, message,Card ,Modal,Row,Col} from 'antd';
import { PlusOutlined ,DownloadOutlined } from '@ant-design/icons';
import {getRule,updateRule,removeRule} from "../service";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

 const Index=(props)=>{
    const [initData,setInitData] = useState(null);
    const[previewVisible,setPreviewVisible] = useState(false);
    const[previewImage,setPreviewImage] = useState('');
    const[previewTitle,setPreviewTitle] = useState('');
    const [key,setKey] =useState(1);
    const [form] = Form.useForm();
    const userId=props.location.query.id;
    const typeList=[
     {name:'入学申请表',url:'application',fileList:[],action:'下载',fileType:'.xlxs',listType:'picture-card'},
     {name:'护照(正面)',url:'passport_front',fileList:[],fileType:'',listType:'picture-card'},
     {name:'护照(反面)',url:'passport_back',fileList:[],fileType:'',listType:'picture-card'},
     {name:'有条件offer',url:'offer',fileList:[],action:'下载',fileType:'.pdf',listType:'picture-card'},
     {name:'语言测试成绩单',url:'grade_report',fileList:[],fileType:'',listType:'picture-card'},
     {name:'学费/押金缴纳回执',url:'tuition',fileList:[],fileType:'',listType:'picture-card'},
     {name:'核酸检测证明',url:'test_certificate',fileList:[],fileType:'',listType:'picture-card'},
   ];
   const [material,setMaterial]=useState(typeList);

    useEffect(()=>{
      const getInit=async()=>{
          const data= await getRule(userId);
          setInitData(data);
          form.setFieldsValue({
            username:data.username,
            phone:data.phone,
            school:data.school,
          });
       const newMaterial =  material.map((item)=>{
         if(data[item.url]){
           item.fileList.push({
             uid: new Date().getTime(),
             name: item.name,
             status: 'done',
             url:data[item.url],
           });
         }
           return item;
        });
        setMaterial(newMaterial);
      };
      getInit();
    },[]);




  const  handleCancel = () => setPreviewVisible(false);

  const handlePreview = async file => {
     if (!file.url && !file.preview) {
       file.preview = await getBase64(file.originFileObj);
     }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
   };

   const handleChange = ({fileList},index) => {
     const list = material;
     const length =  list[index].fileList.length;
     if(length>0){
       list[index].fileList.pop();
     }
     list[index].fileList=fileList;
     setKey(key+1);
     // setPreviewVisible(true);
     setMaterial(list);
   };
   const handleFilesChange=async( index)=>{
      const {fileList,url} = material[index];
     try {
         if(fileList.length>0&&fileList[0].originFileObj){
           await updateRule(fileList,userId,url);
         }
       message.success('替换成功')
     }catch(err){
        message.error('网络错误')
     }

   };
   const onRemove=(res)=>{

   }


   const uploadButton = (
     <div>
       <PlusOutlined />
       <div style={{ marginTop: 8 }}>Upload</div>
     </div>
   );
   return(
     <PageHeaderWrapper>
       <Card>
       <Form
         labelCol={{
           span: 4,
         }}
         form={form}
         wrapperCol={{
           span: 6,
         }}
       >
         <Form.Item
           name="username"
           label="姓名"
         >
           <Input readOnly />
         </Form.Item>
         <Form.Item
           name="school"
           label="学校"
         >
           <Input readOnly />
         </Form.Item>
         <Form.Item
           name="phone"
           label="手机号"
         >
           <Input readOnly />
         </Form.Item>
       </Form>
       </Card>
         {key&&material&&<Row gutter={[16, 16]} style={{marginTop:30}}>
         {material.map((item,index)=>{
         return    <Col span={6} key={item.name+index} >
           <Card title={item.name}>
             <div style={{display:'flex',justifyContent:'space-between'}}>
               <Upload
                 action=""
                 listType={item.listType}
                 fileList={item.fileList}
                 maxCount={1}
                 // data={data}
                 onPreview={handlePreview}
                 onRemove={onRemove}
                 onChange={(item2)=>handleChange(item2,index)}
               >
                 {item.fileList.length >= 1 ? null : uploadButton}
               </Upload>
               <div>
                 <Button type="primary" onClick={()=>handleFilesChange(index)} >确认</Button>
                 {item.action==='下载'&&
                   <Button type="primary" style={{margin:'10px 0'}}  >
                     <a href={item.fileList[0]?item.fileList[0].url:'#'} target={'blank'} download={item.name+item.fileType} >
                       下载
                     </a>
                   </Button>
                 }
               </div>
             </div>
           </Card>
         </Col>
         })}
         </Row>}
       <Modal
         visible={previewVisible}
         title={previewTitle}
         footer={null}
         onCancel={handleCancel}
       >
         <img alt="example" style={{ width: '100%' }} src={previewImage} />
       </Modal>
     </PageHeaderWrapper>
   )

 };

 export default Index;
