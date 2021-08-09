import React,{Component,useState, useRef} from 'react'
import { PageHeaderWrapper,PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import { queryRule, updateRule, removeRule,updateImg } from './service';
import { FormattedMessage } from 'umi';
import styles from './style.less';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { Button, message, Input, Drawer,Image, Upload, DatePicker,Select } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
// import AddNoticeModal from './addNoticeModal/index'
// import moment from 'moment';
import {getNowFormatDate} from '../../../utils/utils';

const Index =(props) => {
  // const [allBannersList, setAllBannersList] = useState([]);
  const [deleteuserIds, setDeleteuserIds] = useState([]);
  const actionRef = useRef();
  const [canEdit,setCanEdit] = useState(false)
  const [username,setUsername] = useState('')
  const [nickname,setNickname] = useState('')
  const [gender,setGender] = useState(1)
  const [imgUrl,setImgUrl] = useState('')
  const [school,setSchool] = useState('')
  const [institute,setInstitute] = useState('')
  const [clazz,setClazz] = useState('')
  // const [isOverhead,setIsOverhead] = useState('')
  const [phone,setPhone] = useState('')
  const [address,setAddress] = useState()
  const [editId,setEditId] = useState(-1)
  const [fileList,setFileList] = useState([])
  const [img,setImg]= useState(false)
  const [registerTime,setRegister] = useState('')
  const [privilege,setPrivilege] = useState()

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>点击上传头像</div>
    </div>
  );

  const columns = [
    {
      title: '头像',
      dataIndex: 'imgUrl',
      render: (dom, row) => {
        // if(canEdit && editId === row.userId){
        //   return(
        //     <Upload
        //     action=""
        //     listType="picture-card"
        //     fileList={fileList}
        //     onRemove={onRemove}
        //     onChange={handleChange}
        //     beforeUpload={() => {
        //       return false;
        //     }}
        //   >
        //   {fileList.length >= 1 ? null : uploadButton}
        // </Upload>
        //   )
        // }else{
          return (
            <Image src={row.imgUrl}
              width={100}
              height={100}
            />
          );
        // }
      },
    }, 
    {
      title: '姓名',
      dataIndex: 'username',
      render: (text, row, _, action) => {
        if(canEdit && editId === row.userId){
          return(
            <Input value={username} onChange={(e)=>setUsername(e.target.value)}/>
          )
        }else{
         return text
        }
       
      },
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
      render: (text, row, _, action) => {
        if(canEdit && editId === row.userId){
          return(
            <Input value={nickname} onChange={(e)=>setNickname(e.target.value)}/>
          )
        }else{
         return text
        }
       
      },
    },
    {
      title: '性别',
      dataIndex: 'gender',
      render: (text, row, _, action) => {
        if(canEdit && editId === row.userId){
          return(
            <Select value={gender} onChange={(e)=>setGender(e)}>
              <Select.Option value={1}>男</Select.Option>
              <Select.Option value={0}>女</Select.Option>
            </Select>
          )
        }else{
          if(row.gender === 1){
            return '男'
          }else{
            return '女'
          }
        }
       }
    },
    {
      title: '学校',
      dataIndex: 'school',
      render: (text, row, _, action) => {
        if(canEdit && editId === row.userId){
          return(
            <Input value={school} onChange={(e)=>setSchool(e.target.value)}/>
          )
        }else{
         return text
        }
       
      },
    },
    {
      title: '学院',
      dataIndex: 'institute',
      render: (text, row, _, action) => {
        if(canEdit && editId === row.userId){
          return(
            <Input value={institute} onChange={(e)=>setInstitute(e.target.value)}/>
          )
        }else{
         return text
        }
       
      },
    },
    {
      title: '班级',
      dataIndex: 'clazz',
      render: (text, row, _, action) => {
        if(canEdit && editId === row.userId){
          return(
            <Input value={clazz} onChange={(e)=>setClazz(e.target.value)}/>
          )
        }else{
         return text
        }
       
      },
    },
    {
      title: '联系方式',
      dataIndex: 'phone',
      render: (text, row, _, action) => {
        if(canEdit && editId === row.userId){
          return(
            <Input value={phone} onChange={(e)=>setPhone(e.target.value)}/>
          )
        }else{
         return text
        }
       
      },
    },
    {
      title: '地址',
      dataIndex: 'address',
      render: (text, row, _, action) => {
        if(canEdit  && editId === row.userId){
          return(
            <Input value={address} onChange={(e)=>setAddress(e.target.value)}/>
          )
        }else{
          return text
        }
      },
      // sorter:true,
    },
    {
      title: "操作",
      dataIndex: 'option',
      valueType: 'option',
      render: (text, row, _, action) => [
        <a >
          {
            !canEdit &&
            <div onClick={()=>handleEdit(row)}>编辑</div>
          }
          {
            canEdit &&
            <>
            <span onClick={()=>handleUpdate()}>保存</span>
            <span style={{marginLeft:7}} onClick={()=>handleCancel()}>取消</span>
            </>
          }
        </a>,
          <a onClick={()=>handleDelete(row.userId)}>
          {
            !canEdit &&
            <span>删除</span>
          }
        </a>,
        <a onClick={()=>{props.history.push(`./userList/userDetail?id=${row.userId}`)}}>
          {
            !canEdit &&
            <span>详情</span>
          }
        </a>
      ],
    },
  ];
  
  const handleChange = (res) => {
    setFileList(res.fileList);
    setImg(true)
  };

  const onRemove = (file) => {
    const index = fileList.indexOf(file);
    const newFileList = fileList.slice();
    newFileList.splice(index, 1);
    setFileList(newFileList);
  };

  const handleEdit = (row)=>{
    setCanEdit(true)
    setUsername(row.username)
    setNickname(row.nickname)
    setImgUrl(row.imgUrl)
    setGender(row.gender)
    setSchool(row.school)
    setInstitute(row.institute)
    setClazz(row.clazz)
    // setIsOverhead(row.isOverhead)
    setPhone(row.phone)
    setAddress(row.address)
    setEditId(row.userId)
    setRegister(row.registerTime)
    setPrivilege(row.privilege)
    setFileList([
      {
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: row.imgUrl,
      }
    ])
  }

  const handleCancel =()=>{
    setCanEdit(false)
    setUsername('')
    setNickname('')
    setImgUrl('')
    setGender('')
    setSchool('')
    setInstitute('')
    setClazz('')
    // setIsOverhead(row.isOverhead)
    setPhone('')
    setAddress('')
    setRegister('')
    setPrivilege('')
    setEditId(-1)
    setImg(false)
  }

  const handleUpdate = async ()=>{
    try {
      const newData = {
        userId:editId,
        username,
        gender,
        address,
        school,
        institute,
        clazz,
        registerTime,
        phone,
        privilege,
        nickname,
        imgUrl,
        // content:'',
      }
      await updateRule(newData);
      if(img){
        await updateImg(fileList,editId)
      }
      message.success('修改成功');
      actionRef.current.reload()   
    } catch (error) {
      message.error('失败请重试！');
    }
    handleCancel()
  }


  const handleUse= async (row)=>{
    try {
      if(row.isUse !== 1){
        await useRule(row.userId);
      }else{
        await stopRule(row.userId,row.sort);
      }
      // await useRule(url,row.bannerId,row.sort);
      actionRef.current.reload()   
    } catch (error) {
      message.error('失败请重试！');
    }
  }
  const setSelectedRows=(data)=>{
    let ids = []
    data.map(item=>{
      ids.push(item.userId)
    })
    setDeleteuserIds(ids)
  }

  const handleDelete= async (id)=>{
    // const hide = message.loading('正在删除');
    try {
      if(id){
        await removeRule([id]);
      }else{
        await removeRule(deleteuserIds);
      }
      
      message.success('删除成功');
      actionRef.current.reload()   
    } catch (error) {
      message.error('删除失败请重试！');
    }
  }

  const handleCancelModal =()=>{
    setModalVisible(false)
  }

  const handleOk = async(data)=>{
    try {
      const newData = {
        sort:data.isUse === 0? 0: Number(data.sort),
        isUse:Number(data.isUse),
        title:data.title,
        content:'',
        // isOverhead:data.isOverhead,
        time:getNowFormatDate(),
        imgUrl:'',
        userId:0,
      }
      const res = await addRule(newData)
      await updateImg(data.imgUrl.fileList,res.userId)
      message.success('新增成功')
      actionRef.current.reload()   
    } catch (error) {
      message.error('失败请重试！');
    }
    
    handleCancelModal(false)
  }

 
  return(
      <PageHeaderWrapper>
        <ProTable
          className={styles.tableMain}
          headerTitle='用户列表'
          rowKey="userId"
          actionRef={actionRef}
          toolBarRender={() => [
            // <Button type="primary" key="primary" onClick={() => setModalVisible(true)}>
            //   <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="新增" />
            // </Button>,
            <Button type="ghost" key="primary" onClick={() => handleDelete()}>
              <DeleteOutlined /> <FormattedMessage id="pages.searchTable.delete" defaultMessage="删除" />
            </Button>,
          ]}
          request={async (params) => {
            const data = await queryRule(params);
            return{
              data,
              total: data.length,
              success: true,
              // pageSize,
            }
          }}
          columns={columns}
          rowSelection={{
            onChange: (_, selectedRows) => setSelectedRows(selectedRows),
          }}
          options={false}
          recordCreatorProps={false}
        />
        {/* <AddNoticeModal
          visible = {modalVisible}
          handleOk= {handleOk}
          handleCancel={handleCancelModal}
        /> */}
      </PageHeaderWrapper>
  )
    
}
export default Index;
