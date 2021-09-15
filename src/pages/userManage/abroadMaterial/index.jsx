import React,{Component,useState, useRef,useEffect,useLayoutEffect} from 'react'
import { PageHeaderWrapper,PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import { queryRule, removeRule, getTemplate,updateTemplate} from './service';
import { FormattedMessage } from 'umi';
import styles from './style.less';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { Button, message, Input, Drawer,Image, Upload, DatePicker,Select, Divider } from 'antd';
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
  const [fileName,setFileName] =useState()

  const [canUpload,setCanUpload] = useState(true)

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>点击上传头像</div>
    </div>
  );

  const columns = [
    // {
    //   title: '头像',
    //   dataIndex: 'imgUrl',
    //   render: (dom, row) => {
    //     // if(canEdit && editId === row.userId){
    //     //   return(
    //     //     <Upload
    //     //     action=""
    //     //     listType="picture-card"
    //     //     fileList={fileList}
    //     //     onRemove={onRemove}
    //     //     onChange={handleChange}
    //     //     beforeUpload={() => {
    //     //       return false;
    //     //     }}
    //     //   >
    //     //   {fileList.length >= 1 ? null : uploadButton}
    //     // </Upload>
    //     //   )
    //     // }else{
    //       return (
    //         <Image src={row.imgUrl}
    //           width={100}
    //           height={100}
    //         />
    //       );
    //     // }
    //   },
    // }, 
    {
      title: '姓名',
      dataIndex: 'username',
      ellipsis: true,   
      width: '10%',
      render: (text, row, _, action) => {
        // if(canEdit && editId === row.userId){
        //   return(
        //     <Input value={username} onChange={(e)=>setUsername(e.target.value)}/>
        //   )
        // }else{
         return text
        // }
       
      },
    },
    {
      title: '学校',
      dataIndex: 'school',
      ellipsis: true,   
      width: '15%',
      render: (text, row, _, action) => {
        // if(canEdit && editId === row.userId){
        //   return(
        //     <Input value={} onChange={(e)=>setNickname(e.target.value)}/>
        //   )
        // }else{
         return text
        // }
       
      },
    },
    {
      title: '入学申请表',
      dataIndex: 'application',
      ellipsis: true,   
      width: '10%',
      render: (text, row, _, action) => {
        if(row.application){
          return(
            <span style={{color:'green',fontSize:17,fontWeight:700}}>√</span>
          )
        }else{
          return(
            <span style={{color:'red',fontSize:17,fontWeight:700}}>×</span>
          )
        }
       }
    },
    {
      title: '护照(正反面)',
      dataIndex: 'passport',
      ellipsis: true,   
      width: '10%',
      render: (text, row, _, action) => {
        if(row.passport_front!== ''&&row.passport_back!== ''){
          return(
            <span style={{color:'green',fontSize:17,fontWeight:700}}>√</span>
          )
        }else{
          return(
            <span style={{color:'red',fontSize:17,fontWeight:700}}>×</span>
          )
        }
       }
    },
    {
      title: '有条件offer',
      dataIndex: 'offer',
      ellipsis: true,   
      width: '10%',
      render: (text, row, _, action) => {
        if(row.offer){
          return(
            <span style={{color:'green',fontSize:17,fontWeight:700}}>√</span>
          )
        }else{
          return(
            <span style={{color:'red',fontSize:17,fontWeight:700}}>×</span>
          )
        }
       }
    },
    {
      title: '语言测试成绩单',
      dataIndex: 'grade_report',
      width: '10%',
      render: (text, row, _, action) => {
        if(row.grade_report ){
          return(
            <span style={{color:'green',fontSize:17,fontWeight:700}}>√</span>
          )
        }else{
          return(
            <span style={{color:'red',fontSize:17,fontWeight:700}}>×</span>
          )
        }
       }
    },
    {
      title: '学费/押金缴纳回执',
      dataIndex: 'tutition',
      width: '10%',
      render: (text, row, _, action) => {
        if(row.tuition){
          return(
            <span style={{color:'green',fontSize:17,fontWeight:700}}>√</span>
          )
        }else{
          return(
            <span style={{color:'red',fontSize:17,fontWeight:700}}>×</span>
          )
        }
       }
    },
    {
      title: '核酸检验证明',
      dataIndex: 'test_certificate',
      width: '10%',
      render: (text, row, _, action) => {
        if(row.test_certificate){
          return(
            <span style={{color:'green',fontSize:17,fontWeight:700}}>√</span>
          )
        }else{
          return(
            <span style={{color:'red',fontSize:17,fontWeight:700}}>×</span>
          )
        }
       }
    },

    {
      title: "操作",
      dataIndex: 'option',
      valueType: 'option',
      render: (text, row, _, action) => [
        // <a >
        //   {
        //     !canEdit &&
        //     <div onClick={()=>handleEdit(row)}>编辑</div>
        //   }
        //   {
        //     canEdit &&
        //     <>
        //     <span onClick={()=>handleUpdate()}>保存</span>
        //     <span style={{marginLeft:7}} onClick={()=>handleCancel()}>取消</span>
        //     </>
        //   }
        // </a>,
        //   <a onClick={()=>handleDelete(row.userId)}>
        //   {
        //     !canEdit &&
        //     <span>删除</span>
        //   }
        // </a>,
        <a onClick={()=>{props.history.push(`/userManage/abroadMaterial/detail?id=${row.userId}`)}}>
          {
            !canEdit &&
            <span>详情</span>
          }
        </a>
      ],
    },
  ];

  useLayoutEffect(()=>{
    const getData =async()=>{
      const info = await getTemplate();
      // setFileName(info)
       setFileList([
      {
        uid: '-1',
        name: '申请模板',
        status: 'done',
        url: info,
      }
    ])
    };
    getData();
  },[]);
  
  const handleChange = async(res) => {
    if(res.fileList.length === 0){
      setFileList(res.fileList);
    }else{
      if(res.file.type === 'application/vnd.ms-excel'){
        const info = await updateTemplate(res.file)
        setFileList([
          {
            uid: '-1',
            name: '申请模板',
            status: 'done',
            url: info,
          }
        ])
        message.success('上传成功')
      }else{
        message.error('只能上传excel文件！')
      }
     
    }
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
    // setFileList([
    //   {
    //     uid: '-1',
    //     name: 'image.png',
    //     status: 'done',
    //     url: row.imgUrl,
    //   }
    // ])
  }

  const setSelectedRows=(data)=>{
    let ids = []
    data.map(item=>{
      ids.push(item.userId)
    })

    console.log('sssssssssssssss',ids)
    setDeleteuserIds(ids)
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
    // setImg(false)
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



  // const uploadProps = {
  //   name: 'uploadfile',
  //   action: 'https://aitmaker.cn/abroad/uploadApplicationTemplate',
  //   headers: {
  //     authorization: 'multipart/form-data',
  //   },

  //   onRemove:{onRemove},
  //   onChange(info) {
  //     if (info.file.status !== 'uploading') {
  //       console.log(info.file, info.fileList);
  //     }
  //     if (info.file.status === 'done') {
  //       message.success(`${info.file.name} 上传成功`);
  //     } else if (info.file.status === 'error') {
  //       message.error(`${info.file.name} 上传失败`);
  //     }
  //   },
  // };

    
  return(
      <PageHeaderWrapper>
        <ProTable
          className={styles.tableMain}
          headerTitle='留学材料'
          rowKey="userId"
          actionRef={actionRef}
          // toolBarRender={() => [
          //   // <Button type="primary" key="primary" onClick={() => setModalVisible(true)}>
          //   //   <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="新增" />
          //   // </Button>,
          //   <Button type="ghost" key="primary" onClick={() => handleDelete()}>
          //     <DeleteOutlined /> <FormattedMessage id="pages.searchTable.delete" defaultMessage="删除" />
          //   </Button>,
          // ]}
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
          // rowSelection={{
          //   onChange: (_, selectedRows) => setSelectedRows(selectedRows),
          // }}
          options={false}
          recordCreatorProps={false}
        />
        <Divider/>

        <div className={styles.temp} style={{padding:'30px 20px',background:'white'}}>
          <div style={{marginRight:10,fontSize:15,flex:1,marginTop:8}}>入学申请表模板</div>
        <Upload
          className={styles.upload}
          listType="multipart/form-data"
          fileList={fileList}
          onRemove={onRemove}
          onChange={handleChange}
        
          beforeUpload={() => {
            // if (file.type !== 'application/vnd.ms-excel') {
            //   setCanUpload(false)
            //   message.error(`${file.name} 不是excel文件`);
            // }
            return false;
          }}
          >
            {fileList.length >= 1 ? null : <Button >上传</Button>}
          </Upload>

        </div>
          
        
      </PageHeaderWrapper>
  )
    
}
export default Index;
