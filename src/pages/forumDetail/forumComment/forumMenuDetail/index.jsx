import React, { useState,useEffect } from 'react';

import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { getRule} from "../service";
import { message,Card,Button} from 'antd';
import moment from 'moment';

const Index = (props)=>{
  const commentId=Number(props.location.query.id);
  const [initData,setInitData]=useState();
  const dateFormat = 'YYYY-MM-DD';
  useEffect(()=>{
    const getData =async()=>{
      const info = await getRule(commentId);
      setInitData({
        title:info.forumTitle,
        content:info.content,
        time:moment(info.time.substring(0,10), dateFormat),
      });
    };
    getData();
  },[]);



  return(
    <PageHeaderWrapper>
      <div>
        {initData&&
        <Card title={initData.title} extra={<Button onClick={()=>{props.history.goBack()}} >返回</Button>}>
          {initData.content}
        </Card>
        }
      </div>
    </PageHeaderWrapper>
  )
};

export  default  Index;
