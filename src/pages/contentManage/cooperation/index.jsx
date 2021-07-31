import React,{Component,useState, useRef} from 'react'
import { PageHeaderWrapper,PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import { queryRule, updateRule, addRule, removeRule,useRule,stopRule,updateImg } from './service';
import { FormattedMessage } from 'umi';
import request from 'umi-request';
import styles from './style.less';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { EditableProTable } from '@ant-design/pro-table';
import { Button, message, Input, Drawer,Image, Upload} from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import AddCooperationModal from './addCooperationModal/index'

const Index =(props) => {
  // const [allBannersList, setAllBannersList] = useState([]);
  const [deleteinterCooperIds, setDeleteinterCooperIds] = useState([]);
  const actionRef = useRef();
  const [canEdit,setCanEdit] = useState(false)
  const [title,setTitle] = useState('')
  const [sort,setSort] = useState('')
  const [imgUrl,setImgUrl] = useState('')
  const [isUse,setIsUse] = useState('')
  const [time,setTime] = useState('')
  const [editId,setEditId] = useState(-1)
  const [fileList,setFileList] = useState([])
  const [img,setImg]= useState(false)
  const [modalVisible,setModalVisible] = useState(false)
  const num = 5
  const [page,setPage] = useState(0)

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>点击上传图片</div>
    </div>
  );


  const columns = [
    {
      title: '图片',
      dataIndex: 'imgUrl',
      render: (dom, row) => {
        if(canEdit && editId === row.interCooperId){
          return(
            <Upload
            action=""
            listType="picture-card"
            fileList={fileList}
            onRemove={onRemove}
            onChange={handleChange}
            beforeUpload={() => {
              return false;
            }}
          >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
          )
        }else{
          return (
            <Image src={row.imgUrl}
              width={180}
              height={100}
            />
          );
        }
      },
    }, 
    {
      title: '顺序',
      dataIndex: 'sort',
      render: (text, row, _, action) => {
        if(canEdit && editId === row.interCooperId){
          return(
            <Input value={sort} onChange={(e)=>setSort(e.target.value)}/>
          )
        }else{
         return text
        }
       
      },
    },
    {
      title: '是否启用',
      dataIndex: 'isUse',
      render: (text, row, _, action) => {
        if(canEdit && editId === row.interCooperId){
          return(
            <Input value={isUse} onChange={(e)=>setIsUse(e.target.value)}/>
          )
        }else{
          if(row.isUse === 1){
            return '是'
          }else{
            return '否'
          }
        }
       
      },
      // renderText: (val) =>
      //   `${val}万`,
    },
    {
      title: '标题',
      dataIndex: 'title',
      render: (text, row, _, action) => {
        if(canEdit  && editId === row.interCooperId){
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
      title: '时间',
      dataIndex: 'time',
      render: (text, row, _, action) => {
        if(canEdit  && editId === row.interCooperId){
          return(
            <Input value={time} onChange={(e)=>setTime(e.target.value)}/>
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
        <a onClick={()=>handleDelete(row.interCooperId)}>
          {
            !canEdit &&
            <span>删除</span>
          }
        </a>,
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
    setImgUrl(row.imgUrl)
    setSort(row.sort)
    setIsUse(row.isUse)
    setTime(row.time)
    setEditId(row.interCooperId)
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
    setSort('')
    setIsUse('')
    setTime('')
    setEditId(-1)
    setImg(false)
  }

  const handleUpdate = async ()=>{
    try {
      const newData = {
        interCooperId:Number(editId),
        sort:Number(sort),
        isUse:Number(isUse),
        title:title,
        imgUrl:imgUrl,
        time:new Date(),
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
        await useRule(row.interCooperId);
      }else{
        await stopRule(row.interCooperId,row.sort);
      }
      // await useRule(url,row.interCooperId,row.sort);
      actionRef.current.reload()   
    } catch (error) {
      message.error('失败请重试！');
    }
  }

  const handleToDetail = (res) => {
     props.history.push(`/contentManage/cooperation/detail?id=${res.interCooperId}`)
  };


  const setSelectedRows=(data)=>{
    let ids = []
    data.map(item=>{
      ids.push(item.interCooperId)
    })
    setDeleteinterCooperIds(ids)
  }

  const handleDelete= async (id)=>{
    // const hide = message.loading('正在删除');
 
    try {
      if(id){
        await removeRule([id]);
      }else{
        await removeRule(deleteinterCooperIds);
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
    try {
      const newData = {
        sort:Number(data.sort),
        isUse:Number(data.isUse),
        title:data.title,
        time:new Date(),
        imgUrl:'',
        interCooperId:0,
        content:'',
      }
      const res = await addRule(newData)
      if(res.interCooperId){
        await updateImg(data.imgUrl.fileList,res.interCooperId)
        message.success('新增成功')
        actionRef.current.reload()   
      }
      const interCooperId = await addRule(newData)
      console.log(interCooperId)
      await updateImg(data.imgUrl,interCooperId)
      message.success('新增成功');
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
          headerTitle='国际合作'
          rowKey="interCooperId"
          actionRef={actionRef}
          toolBarRender={() => [
            <Button type="primary" key="primary" onClick={() => setModalVisible(true)}>
              <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="新增" />
            </Button>,
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
        <AddCooperationModal
          visible = {modalVisible}
          handleOk= {handleOk}
          handleCancel={handleCancelModal}
        />
      </PageHeaderWrapper>
  )
    
}
export default Index;
