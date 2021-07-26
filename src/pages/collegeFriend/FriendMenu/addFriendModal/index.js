import React, { useState } from 'react';
import { Card, message, Form, Cascader, Upload, Modal } from 'antd';
import ProForm, { ProFormDatePicker, ProFormSelect, ProFormText } from '@ant-design/pro-form';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import style from '../style.less'
import { Button } from 'antd/lib/radio';


function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
}

const AddFriendModal = (props) => {
    
    const [form] = ProForm.useForm();
    const [fileList, setFileList] = useState([]);
    
    const handleCancel = () => {
        setPreviewVisible(false);
    };
    
    const handleChange = (res) => {
        console.log(res);
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
        <div style={{ marginTop: 8 }}>点击上传头像</div>
        </div>
    );

    const handleFinish=(data)=>{
        props.handleOk(data)
    }


  return (
    <>
      <Modal title="新增校友清单" visible={props.visible} className={style.formModal} closable>
      <ProForm onFinish={handleFinish} form={form}>
          <ProForm.Group>
            <ProFormText
              rules={[
                {
                  required: true,
                  message: '请输入校友清单标题',
                },
              ]}
              label="标题"
              name="title"
              width="m"
            />
            <ProFormSelect
              valueEnum={{
                0: '否',
                1: '是',
              }}
              rules={[
                {
                  required: true,
                  message: '请选择是否启用',
                },
              ]}
              label="启用"
              name="isUse"
              width="m"
            />
          </ProForm.Group>
          <ProForm.Group>
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
              width="m"
            />
          </ProForm.Group>
          <ProForm.Group>
            <Form.Item
              name="imgUrl"
              label="上传校友清单"
              rules={[
                {
                  required: true,
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
             </Form.Item>
           </ProForm.Group> 
        </ProForm>
        <Button type="primary" className={style.cancel} onClick={props.handleCancel}>取消</Button>

      </Modal>
    </>
  );
};

export default AddFriendModal;