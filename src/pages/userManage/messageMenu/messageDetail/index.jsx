import React, { useState,useEffect } from 'react';

import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { getMessageDetail} from "../service";
import { Card,Button,Avatar} from 'antd';
import moment from 'moment';

const Index = (props)=>{
  const messageId=props.location.query.id;
  const [initData,setInitData]=useState();
  const [receivers,setReceivers]=useState([]);
  const dateFormat = 'YYYY-MM-DD';
  useEffect(()=>{
    const getData =async()=>{
      const info = await getMessageDetail(messageId);
      setInitData({
        title:info.title,
        content:info.content,
        time:info.time?moment(info.time.substring(0,10), dateFormat):moment(new Date(), dateFormat),
      });
      setReceivers(info.receivers);
    };
    getData();
  },[]);

  const users=(item)=>{
    return(
      <div key={item.userId} style={{margin:"0 20px",float:"left"}}>
        <Avatar size={64} src={item.imgUrl} />
         <div style={{textAlign:"center"}}>{item.username}</div>
      </div>
    )
  };

  return(
    <PageHeaderWrapper>
      {initData&&
        <div>
          <Card title={initData.title}  extra={<Button onClick={()=>{props.history.goBack()}} >返回</Button>} >
            {initData.content}
          </Card>
          <Card title={"接收人"}>
            <div style={{clean:'both'}}>
              {receivers&&receivers.map((item)=>{
                return users(item)
              })
              }
            </div>

          </Card>
        </div>
      }

    </PageHeaderWrapper>
  )
};

export  default  Index;
