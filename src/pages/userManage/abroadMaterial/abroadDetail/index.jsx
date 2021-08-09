import React, { useState,useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Form, Input, Button, Upload,Divider, message,Card ,Modal} from 'antd';
import { PlusOutlined } from '@ant-design/icons';

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
    const[fileList,setFileList] = useState([]);

   const onFinish=()=>{

   };

  const  handleCancel = () => setPreviewVisible(false);

  const handlePreview = async file => {
     if (!file.url && !file.preview) {
       file.preview = await getBase64(file.originFileObj);
     }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
   };

   const handleChange = ({ list }) => setFileList(list);

   const reset=()=>{

   };
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
         wrapperCol={{
           span: 6,
         }}
         onFinish={onFinish}
       >
         <Form.Item
           name="username"
           label="姓名"
           rules={[
             {
               required: true,
             },
           ]}
         >
           <Input />
         </Form.Item>
         <Form.Item
           name="school"
           label="学校"
           rules={[
             {
               required: true,
             },
           ]}
         >
           <Input />
         </Form.Item>
         <Form.Item
           name="phone"
           label="手机号"
           rules={[
             {
               required: true,
             },
           ]}
         >
           <Input />
         </Form.Item>
         <Card title={'入学申请表'}>
            <Form.Item>
              <Upload
                action=""
                listType="picture-card"
                fileList={fileList}
                // data={data}
                onPreview={handlePreview}
                // onRemove={onRemove}
                onChange={handleChange}
              >
                {fileList.length >= 1 ? null : uploadButton}
              </Upload>
            </Form.Item>
         </Card>
         <Form.Item label=" " colon={false}>
           <Button type="primary" onClick={reset}>
             重置
           </Button>
           <Divider type="vertical" />
           <Button type="primary" htmlType="submit">
             保存
           </Button>
         </Form.Item>
       </Form>
       </Card>
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
