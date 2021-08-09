import React,{Component,useState, useRef,useEffect} from 'react'
import { PageHeaderWrapper,PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import { queryRule,  addRule, removeRule,getUser,addReceiver } from './service';
import { FormattedMessage } from 'umi';
import request from 'umi-request';
import styles from './style.less';
import ProTable from '@ant-design/pro-table';
import { Button, message, Input, Drawer,Image, Upload,DatePicker, Select} from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import moment from 'moment';

const Index =(props) => {
  // const [allBannersList, setAllBannersList] = useState([]);
  const [deletemessageIds, setDeletemessageIds] = useState([]);
  const actionRef = useRef();
  const [canEdit,setCanEdit] = useState(false)
  const [title,setTitle] = useState('')
  const [content,setContent] = useState('')
  const [sort,setSort] = useState('')
  const [imgUrl,setImgUrl] = useState('')
  const [isUse,setIsUse] = useState('')
  const [time,setTime] = useState('')
  const [timeDate,setTimeDate] = useState()
  const [editId,setEditId] = useState(-1)
  const [fileList,setFileList] = useState([])
  const [img,setImg]= useState(false)
  const [modalVisible,setModalVisible] = useState(false)

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>点击上传图片</div>
    </div>
  );

  const dateFormat = 'YYYY-MM-DD'

  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      render: (text, row, _, action) => {
        if(canEdit  && editId === row.messageId){
          return(
            <Input value={title} onChange={(e)=>setTitle(e.target.value)}/>
          )
        }else{
          return text
        }
      },
      // sorter:true,
    },
    {
      title: '内容',
      dataIndex: 'content',
      render: (text, row, _, action) => {
        if(canEdit  && editId === row.messageId){
          return(
            <Input value={content} onChange={(e)=>setContent(e.target.value)}/>
          )
        }else{
          return text
        }
      },
    },
    {
      title: '时间',
      dataIndex: 'time',
      render: (text, row, _, action) => {
        // if(canEdit && editId === row.messageId){
        //   return(
        //     // <Input value={time.substring(0,10)} onChange={(e)=>setIsOverhead(e.target.value)}/>
        //     <DatePicker value={moment(time.substring(0,10), dateFormat)} onChange={(value,dataString)=>{setTime(dataString);setTimeDate(value)}}/>
        //   )
        // }else{
          return row.time.substring(0,10)
        // }
      },
      // sorter:true,
    },
    {
      title: '发送人',
      dataIndex: 'send',
      render: (text, row, _, action) => {
        // if(canEdit  && editId === row.messageId){
        //   return(
        //     <Input value={content} onChange={(e)=>setContent(e.target.value)}/>
        //   )
        // }else{
          return '管理员'
        // }
      },
    },
    {
      title: '接收对象',
      dataIndex: 'send',
      ellipsis: true,
      tip: '由于列表显示问题，这里只显示一个接收对象，具体请点击详情查看',
      render: (text, row, _, action) => {
        // if(canEdit  && editId === row.messageId){
        //   return(
        //     <Input value={content} onChange={(e)=>setContent(e.target.value)}/>
        //   )
        // }else{
          return row.receivers.length ? row.receivers[0].username : '-'
        // }
      },
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
        <a onClick={()=>handleDelete(row.messageId)}>
          {
            !canEdit &&
            <span>删除</span>
          }
        </a>,
        // <a onClick={()=>handleUse(row)}>
        //   {
        //    !canEdit && row.isUse === 1 &&
        //    <div>取消启用</div>
        //   }
        //    {
        //    !canEdit && row.isUse !== 1 &&
        //    <div>启用</div>
        //   }
        // </a>,
        <a onClick={()=>handleToDetail(row)} >详情</a>
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
    setTitle(row.title)
    setContent(row.content)
    setImgUrl(row.imgUrl)
    setSort(row.sort)
    setIsUse(row.isUse === 1?'是':'否')
    // setTime(row.time.substring(0,10))
    setTime(row.time.substring(0,10))
    setTimeDate(row.time)
    setEditId(row.messageId)
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
    setTitle('')
    setContent('')
    setImgUrl('')
    setSort('')
    setIsUse('')
    setTime('')
    setTimeDate()
    setEditId(-1)
    setImg(false)
  }

  const handleUpdate = async ()=>{
    if((isUse === 0 || isUse === '否')&& Number(sort)!==0){
      message.warning('想要修改顺序必须将启用状态设置为启用')
      return
    }
    try {
      const newData = {
        messageId:Number(editId),
        sort:Number(sort),
        isUse:isUse===0||isUse==='否'?0:1,
        title,
        imgUrl,
        time:timeDate,
        content:'',
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
        await useRule(row.messageId);
      }else{
        await stopRule(row.messageId,row.sort);
      }
      // await useRule(url,row.messageId,row.sort);
      actionRef.current.reload()   
    } catch (error) {
      message.error('失败请重试！');
    }
  }

  const handleToDetail = (res) => {
     props.history.push(`/userManage/messageMenu/detail?id=${res.messageId}`)
  };

  const setSelectedRows=(data)=>{
    let ids = []
    data.map(item=>{
      ids.push(item.messageId)
    })
    setDeletemessageIds(ids)
  }

  const handleDelete= async (id)=>{
    // const hide = message.loading('正在删除');
 
    try {
      if(id){
        await removeRule([id]);
      }else{
        await removeRule(deletemessageIds);
      }
      // hide();
      message.success('删除成功');
      actionRef.current.reload()   
    } catch (error) {
      // hide();
      message.error('删除失败请重试！');
    }
  }

  const handleCancelModal =()=>{
    setModalVisible(false)
  }

  const handleOk = async(data)=>{
    console.log('data',data)
    try {
      const newData = {
        title:data.title,
        time:new Date(),
        messageId:0,
        content:data.content,
      }
      const res = await addRule(newData)
      if(res.messageId){
        const sendData = {
          'messageId':res.messageId,
          'receivers':data.receivers
        }
        await addReceiver(sendData)
        message.success('新增成功')
        actionRef.current.reload()   
      }
    } catch (error) {
      message.error('失败请重试！');
    }
    
    handleCancelModal(false)
  }

 
  return(
      <PageHeaderWrapper>
        <ProTable
          className={styles.tableMain}
          headerTitle='消息清单'
          rowKey="messageId"
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
        {/* <AddCooperationModal
          visible = {modalVisible}
          handleOk= {handleOk}
          handleCancel={handleCancelModal}
        /> */}
      </PageHeaderWrapper>
  )
    
}
export default Index;
