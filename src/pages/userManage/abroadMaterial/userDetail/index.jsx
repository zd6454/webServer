import React, { useState,useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProForm, { ProFormDatePicker, ProFormSelect, ProFormText,ProFormRadio } from '@ant-design/pro-form';
import { updateImg,updateRule,getRule,addRule} from "../service";
import { message,Button,Form,Upload} from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import style from '../style.less'
import moment from 'moment';

function getBase64(file) {
  return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
  });
}

const Index = (props)=>{
  const userId=props.location.query.id;
  const [registerTime,setRegisterTime]=useState();
  const [form] = ProForm.useForm();
  const [fileList, setFileList] = useState([]);
  const [img,setImg] = useState([])
  // const dateFormat = 'YYYY-MM-DD';
  const formItemLayout =
    {
          labelCol: { span: 4 },
          wrapperCol: { span: 8 },
        }
     

        const getData =async()=>{
          const userInfo = await getRule(userId);
          
          if (userInfo) {
            const file = [
              {
                uid: '-1',
                name: 'image.png',
                status: 'done',
                url: userInfo.imgUrl,
              },
            ];
            if (userInfo.imgUrl !== "" ) {
              setFileList(file);
              setImg(file);
            }
            setRegisterTime(userInfo.registerTime)
      
            form.setFieldsValue({ username: userInfo.username });
            form.setFieldsValue({ nickname: userInfo.nickname });
            form.setFieldsValue({ gender: userInfo.gender? '男':'女' });
            form.setFieldsValue({ clazz: userInfo.clazz });
            form.setFieldsValue({ school: userInfo.school });
            form.setFieldsValue({ address: userInfo.address });
            form.setFieldsValue({ institute: userInfo.institute });
            form.setFieldsValue({ sort: userInfo.privilege });
            form.setFieldsValue({ imgUrl: userInfo.imgUrl});
            form.setFieldsValue({ phone: userInfo.phone });
            }
        };
  useEffect(()=>{
   
  getData();
  },[]);
  

  
  const handleChange = (res) => {
      setFileList(res.fileList);
  };
  
  const onRemove = (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
  };
  
  const uploadButton = (
      <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>点击上传</div>
      </div>
  );

  const handleFinish = async(data)=>{
    try {
      const newData = {
        userId,
        nickname:data.nickname,
        privilege:Number(data.sort),
        username:data.username,
        gender:data.gender==='男' ? 1:0,
        address:data.address,
        school:data.school,
        institute:data.institute,
        phone:data.phone,
        clazz:data.clazz,
        registerTime,
        imgUrl:img[0].url||'',
      }
      await updateRule(newData)
      if(img !== fileList){
        await updateImg(fileList,userId)
      }
      message.success('修改成功')
      getData()
    } catch (error) {
      message.error('失败请重试！');
    }
      }

  return(
   <PageHeaderWrapper>
        <div style={{ backgroundColor: '#ffff', padding: 5}} className={style.form}>
        <ProForm 
          onFinish={handleFinish} 
          form={form} 
          // request={async () => {
          //   console.log('sssssssssssssssssssssssssssssssssssss')
          //   const info = await getRule(userId);
          //   console.log('sssssssss',info)
          //   // setFileList([
          //   //   {
          //   //     uid: '-1',
          //   //     name: 'image.png',
          //   //     status: 'done',
          //   //     url: info.imgUrl,
          //   //   }
          //   // ])
          //   return {
          //     name: info.name,
          //     useMode: 'chapter',
          //   };
          // }}
          style={{ padding: 10,margin:'auto'}} 
          layout='horizontal' 
          {...formItemLayout}
          
        >
          
            <ProFormText
              rules={[
                {
                  required: true,
                  message: '请输入用户昵称',
                },
              ]}
              label="昵称"
              name="nickname"
              width="xl"
            />
            {/* <Form.Item
              name="imgUrl"
              label="头像"
              rules={[
                {
                  required: true,
                  message: '请上传头像',
                },
              ]}
            >
              <Upload
                action=""
                listType="picture-card"
                fileList={fileList}
                onRemove={onRemove}
                onChange={handleChange}
                type="line"
                beforeUpload={() => {
                  return false;
                }}
              >
                {fileList.length >= 1 ? null : uploadButton}
              </Upload> 
             </Form.Item> */}
             <ProFormRadio.Group
                label="性别"
                name="gender"
                initialValue="男"
                options={['男', '女']}
                rules={[
                  {
                    required: true,
                    message: '请选择性别',
                  },
                ]}
              />
                <ProFormText
              rules={[
                {
                  required: true,
                  message: '请输入姓名',
                },
              ]}
              label="姓名"
              name="username"
              width="xl"
            />
               <ProFormText
              rules={[
                {
                  required: true,
                  message: '请输入地址',
                },
              ]}
              label="地址"
              name="address"
              width="xl"
            />
             <ProFormText
              rules={[
                {
                  required: true,
                  message: '请输入学校',
                },
              ]}
              label="学校"
              name="school"
              width="xl"
            />
            <ProFormText
              rules={[
                {
                  required: true,
                  message: '请输入学院',
                },
              ]}
              label="学院"
              name="institute"
              width="xl"
            />
            <ProFormText
              rules={[
                {
                  required: true,
                  message: '请输入班级',
                },
              ]}
              label="班级"
              name="clazz"
              width="xl"
            />
             <ProFormText
              rules={[
                {
                  required: true,
                  message: '请输入手机号',
                },
              ]}
              label="手机号"
              name="phone"
              width="xl"
            />
            <ProFormRadio.Group
                label="启用状态"
                name="isUse"
                initialValue="启用"
                options={['启用', '不启用']}
                rules={[
                  {
                    required: true,
                    message: '请选择是否启用',
                  },
                ]}
              />
          
            <ProFormText
              rules={[
                {
                  required: true,
                  message: '请输入展示顺序',
                },
                {
                    pattern: /^\d+$/,
                    message: '只能输入数字！',
                  },
              ]}
              label="顺序"
              name="sort"
              
            />

        </ProForm>
   </div>
   </PageHeaderWrapper>
    )
};

export default Index;
