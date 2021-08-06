import React,{Component,useState, useRef} from 'react'
import { PageHeaderWrapper,PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import { queryRule, updateRule, addRule, removeRule,useRule,stopRule,updateImg,useOverRule } from './service';
import { FormattedMessage } from 'umi';
import styles from './style.less';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { Button, message, Input, Drawer,Image, Upload, DatePicker,Select } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import moment from 'moment';

const Index =(props) => {
  // const [allBannersList, setAllBannersList] = useState([]);
  const [deletecommentIds, setDeletecommentIds] = useState([]);
  const actionRef = useRef();
  const [canEdit,setCanEdit] = useState(false)
  const [title,setTitle] = useState('')
  const [sort,setSort] = useState('')
  const [imgUrl,setImgUrl] = useState('')
  const [isUse,setIsUse] = useState('')
  // const [isOverhead,setIsOverhead] = useState('')
  const [time,setTime] = useState('')
  const [username,setUsername] = useState('')
  const [timeDate,setTimeDate] = useState()
  const [editId,setEditId] = useState(-1)
  const [fileList,setFileList] = useState([])
  const [img,setImg]= useState(false)
  const forumId=props.location.query.id;

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>点击上传图片</div>
    </div>
  );

  const dateFormat = 'YYYY-MM-DD'

  const columns = [
    // {
    //   title: '图片',
    //   dataIndex: 'imgUrl',
    //   render: (dom, row) => {
    //     if(canEdit && editId === row.commentId){
    //       return(
    //         <Upload
    //           action=""
    //           listType="picture-card"
    //           fileList={fileList}
    //           onRemove={onRemove}
    //           onChange={handleChange}
    //           beforeUpload={() => {
    //             return false;
    //           }}
    //         >
    //         {fileList.length >= 1 ? null : uploadButton}
    //       </Upload>
    //       )
    //     }else{
    //       return (
    //         <img src={row.imgUrl}
    //           width={180}
    //           height={100}
    //         />
    //       );
    //     }
    //   },
    // }, 
    // {
    //   title: '顺序',
    //   dataIndex: 'sort',
    //   render: (text, row, _, action) => {
    //     if(canEdit && editId === row.commentId){
    //       return(
    //         <Input value={sort} onChange={(e)=>setSort(e.target.value)}/>
    //       )
    //     }else{
    //      return text
    //     }
    //   },
    // },
    {
      title: '是否启用',
      dataIndex: 'isUse',
      render: (text, row, _, action) => {
        if(canEdit && editId === row.commentId){
          return(
            <Select value={isUse} onChange={(e)=>setIsUse(e)}>
              <Select.Option value={1}>是</Select.Option>
              <Select.Option value={0}>否</Select.Option>
            </Select>
          )
        }else{
          if(row.isUse === 1){
            return '是'
          }else{
            return '否'
          }
        }
       
      },
    },
    {
      title: '发表时间',
      dataIndex: 'time',
      render: (text, row, _, action) => {
          return row.time.substring(0,10)
      },
    },
    {
      title: '发表用户',
      dataIndex: 'username',
      render: (text, row, _, action) => {
          return row.username || '-'
      },
    },
    {
      title: '标题',
      dataIndex: 'forumTitle',
      render: (text, row, _, action) => {
        if(canEdit  && editId === row.commentId){
          return(
            <Input value={title} onChange={(e)=>setTitle(e.target.value)}/>
          )
        }else{
          return text
        }
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
        <a onClick={()=>handleUse(row)}>
          {
          !canEdit && row.isUse === 1 &&
          <div>取消启用</div>
          }
          {
          !canEdit && row.isUse !== 1 &&
          <div>启用</div>
          }
        </a>,
        <a onClick={()=>{props.history.push(`/forumDetail/forumComment/detail/?id=${row.commentId}`)}}>
          查看评论
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
    setTitle(row.forumTitle)
    setImgUrl(row.imgUrl)
    // setSort(row.sort)
    setIsUse(row.isUse === 1?'是':'否')
    // setIsOverhead(row.isOverhead)
    setTime(row.time.substring(0,10))
    setTimeDate(row.time)
    setUsername(row.username)
    setEditId(row.commentId)
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
    setImgUrl('')
    // setSort('')
    setIsUse('')
    // setIsOverhead('')
    setTime('')
    setTimeDate()
    setEditId(-1)
    setImg(false)
  }

  // const handleUpdate = async ()=>{
  //   if((isUse === 0 || isUse === '否')&& Number(sort)!==0){
  //     message.warning('想要修改顺序必须将启用状态设置为启用')
  //     return
  //   }
  //   try {
  //     const newData = {
  //       commentId:Number(editId),
  //       sort:Number(sort),
  //       isUse:isUse===0||isUse==='否'?0:1,
  //       // isOverhead:Number(isOverhead),
  //       time:timeDate,
  //       // time:new Date(),
  //       title:title,
  //       imgUrl:imgUrl,
  //       // content:'',
  //     }
  //     await updateRule(newData);
  //     if(img){
  //       await updateImg(fileList,editId)
  //     }
  //     message.success('修改成功');
  //     actionRef.current.reload()   
  //   } catch (error) {
  //     message.error('失败请重试！');
  //   }
  //   handleCancel()
  // }


  const handleUse= async (row)=>{
    try {
      if(row.isUse !== 1){
        await useRule(row.commentId);
      }else{
        await stopRule(row.commentId);
      }
      // await useRule(url,row.bannerId,row.sort);
      actionRef.current.reload()   
    } catch (error) {
      message.error('失败请重试！');
    }
  }

  // const handleOverHead= async (row)=>{
  //   try {
  //     if(row.isOverHead !== 1){
  //       await useOverRule(row.commentId);
  //     }else{
  //       await stopOverRule(row.commentId,row.sort);
  //     }
  //     // await useRule(url,row.commentId,row.sort);
  //     actionRef.current.reload()   
  //   } catch (error) {
  //     message.error('失败请重试！');
  //   }
  // }

  
  const setSelectedRows=(data)=>{
    let ids = []
    data.map(item=>{
      ids.push(item.commentId)
    })
    setDeletecommentIds(ids)
  }

  const handleDelete= async ()=>{
    // const hide = message.loading('正在删除');
    try {
      await removeRule(deletecommentIds);
      message.success('删除成功');
      actionRef.current.reload()   
    } catch (error) {
      message.error('删除失败请重试！');
    }
  }

  // const handleCancelModal =()=>{
  //   setModalVisible(false)
  // }


  return(
      <PageHeaderWrapper>
        <ProTable
          className={styles.tableMain}
          headerTitle='论坛评论'
          rowKey="commentId"
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
            const data = await queryRule(params,forumId);
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
      </PageHeaderWrapper>
  )
    
}
export default Index;
