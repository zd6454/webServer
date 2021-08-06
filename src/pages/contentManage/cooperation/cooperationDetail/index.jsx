import React, { useState,useEffect } from 'react';

import ZdEditForm from '../../../components/ZdEditForm';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { updateImg,updateRule,getRule} from "../service";
import { message} from 'antd';
import moment from 'moment';

const Index = (props)=>{
  const interCooperId=props.location.query.id;
  const [initData,setInitData]=useState();
  const dateFormat = 'YYYY-MM-DD';
  useEffect(()=>{
    const getData =async()=>{
      const info = await getRule(interCooperId);
      setInitData({
        title:info.title,
        imgUrl:info.imgUrl,
        content:info.content,
        time:moment(info.time.substring(0,10), dateFormat),
        sort:info.sort,
        isUse: info.isUse,
      });
    };
    getData();
  },[]);

  const handleOk= async(data)=>{
    try {
      const newData = {
        sort:data.isUse === 0? 0: Number(data.sort),
        isUse:Number(data.isUse),
        title:data.title,
        time:data.time,
        imgUrl:initData.imgUrl,
        content:data.content,
        interCooperId,
      };
      await  updateRule(newData);
      if(Array.isArray(data.imgUrl)&&data.imgUrl[0].originFileObj){
        await updateImg(data.imgUrl,interCooperId);
      }
      message.success('修改成功')
    } catch (error) {
      message.error('失败请重试！');
    }

  };

  return(
    <PageHeaderWrapper>
      <ZdEditForm
        handleOk={handleOk}
        data={{interCooperId,}}
        id={interCooperId}
        initData={initData}
        imgUrl={'http://1.116.77.118:2333/information/uploadFile/InterCooperation'}
        getRule={getRule}
      />
    </PageHeaderWrapper>
  )
};

export  default  Index;
