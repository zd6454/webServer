import React,{useState,useEffect} from 'react'
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import {updateRule,getRule} from './service';
import { message,Form,Card,Input,Divider,Button} from 'antd';

const Index =()=>{
  const [form1] = Form.useForm();
  const [form2] = Form.useForm();
  const [form3] = Form.useForm();
  const [initData,setInitData] = useState(null);
  const forms=[{form:form1,title:'联系方式一'},{form:form2,title:'联系方式二'},{form:form3,title:'联系方式三'}];

  const setType=(index)=>{
    return ['way'+index,'address'+index,'name'+index];
  };

  useEffect(()=>{
    const getInit=async()=>{
      const data=  await getRule();
      setInitData(data);
      data.map((item,index)=>{
         forms[index].form.setFieldsValue({
           [setType(index)[0]]:item.way,
           [setType(index)[1]]:item.address,
           [setType(index)[2]]:item.name,
         });
        return item;
      })
    }
    getInit();

  },[]);

const onFinish=async(values,index)=>{
  console.log(values,index);
  const newValues={};
  newValues.way=values[setType(index)[0]];
  newValues.address=values[setType(index)[1]];
  newValues.name=values[setType(index)[2]];
  newValues.contactId=index+1;
  try {
   await updateRule(newValues);
   message.success(`修改联系方式成功`)
  }catch (e) {
    message.error('网络错误')
  }
  console.log(newValues,'45');
};
const reset=(form)=>{
  form.resetFields();
};

 const footButton=(form)=>{
   const buttonSet={
     display:'flex',
     justifyContent:'space-around',
     marginTop:20,
   };
   return(
     <Form.Item label=" " colon={false}  >
       <div style={buttonSet}>
         <Button type="primary" onClick={()=>{reset(form)}}>
           清空
         </Button>
         <Divider type="vertical" />
         <Button type="primary" htmlType="submit">
           保存
         </Button>
       </div>
     </Form.Item>
   )
 };



  return(
    <PageHeaderWrapper>
         {forms.map((item,index)=>{
           return<Card title={item.title} key={index}>
             <Form
               form={item.form}
               labelCol={{
                 span: 4,
               }}
               key={index}
               wrapperCol={{
                 span: 14,
               }}
               onFinish={(values)=>{onFinish(values,index)}}
             >
               <Form.Item  label="名称"
                           name={setType(index)[0]}
                           key={index+1}
                           rules={[
                             {
                               required: true,
                               message: '请输入方式！',
                               whitespace: true,
                             },
                           ]}
               >
                 <Input placeholder="请输入方式"     />
               </Form.Item>
               <Form.Item label="地址"
                          name={setType(index)[1]}
                            rules={[
                            {
                              required: true,
                              message: '请输入地址！',
                              whitespace: true,
                            },
                          ]}
               >
                 <Input placeholder="请输入地址"      />
               </Form.Item>
               <Form.Item label="联系方式"
                          name={setType(index)[2]}
                          rules={[
                            {
                              required: true,
                              message: '请输入联系方式！',
                              whitespace: true,
                            },
                          ]}>
                 <Input placeholder="请输入联系方式"      />
               </Form.Item>
               {footButton(item.form)}
             </Form>
           </Card>
         })}
          {/*<Card title={'联系方二'}>*/}
            {/*<Form*/}
              {/*form={form}*/}
              {/*labelCol={{*/}
                {/*span: 4,*/}
              {/*}}*/}
            {/**/}
              {/*wrapperCol={{*/}
                {/*span: 14,*/}
              {/*}}*/}
              {/*onFinish={onFinish}*/}
            {/*>*/}
            {/*<Form.Item  label="名称">*/}
              {/*<Input placeholder="请输入名称" />*/}
            {/*</Form.Item>*/}
            {/*<Form.Item label="地址">*/}
              {/*<Input placeholder="请输入地址" />*/}
            {/*</Form.Item>*/}
            {/*<Form.Item label="联系方式">*/}
              {/*<Input placeholder="请输入联系方式" />*/}
            {/*</Form.Item>*/}
              {/*{footButton()}*/}
            {/*</Form>*/}
          {/*</Card>*/}
          {/*<Card title={'联系方式三'}>*/}
            {/*<Form*/}
              {/*form={form}*/}
              {/*labelCol={{*/}
                {/*span: 4,*/}
              {/*}}*/}
             {/**/}
              {/*wrapperCol={{*/}
                {/*span: 14,*/}
              {/*}}*/}
              {/*onFinish={onFinish}*/}
            {/*>*/}
            {/*<Form.Item  label="名称">*/}
              {/*<Input placeholder="请输入名称" />*/}
            {/*</Form.Item>*/}
            {/*<Form.Item label="地址">*/}
              {/*<Input placeholder="请输入地址" />*/}
            {/*</Form.Item>*/}
            {/*<Form.Item label="联系方式">*/}
              {/*<Input placeholder="请输入联系方式" />*/}
            {/*</Form.Item>*/}
              {/*{footButton()}*/}
            {/*</Form>*/}
          {/*</Card>*/}
    </PageHeaderWrapper>
  )
};
export default Index;
