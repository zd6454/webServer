import React,{Component} from 'react'
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import request from 'umi-request';
import { message,Card,Tabs } from 'antd';
import ZdTextArea from '../../components/ZdTextArea'

const { TabPane } = Tabs;

class Index extends Component{
    
    constructor(props){
        super(props);
        this.state={
          data:'',
          agency:{
            '一级代理':{
               send:'http://1.116.77.118:2333/information/addInformation/AgentRight1',
               get:'http://1.116.77.118:2333/information/getInforContent/AgentRight1',
               upload:"http://1.116.77.118:2333/information/uploadFile/AgentRight1"
            },
             '二级代理':{
               send:'http://1.116.77.118:2333/information/addInformation/AgentRight2',
               get:'http://1.116.77.118:2333/information/getInforContent/AgentRight2',
               upload:"http://1.116.77.118:2333/information/uploadFile/AgentRight2"
            },
             '三级代理':{
               send:'http://1.116.77.118:2333/information/addInformation/AgentRight3',
               get:'http://1.116.77.118:2333/information/getInforContent/AgentRight3',
               upload:"http://1.116.77.118:2333/information/uploadFile/AgentRight3"
            },
          },
          agencyKey:'一级代理',
        }
    }
    componentDidMount(){
      const {agencyKey}=this.state;
        this.getMessage(agencyKey);
     }

     getMessage=(key)=>{
       const {agency}=this.state;
       request(agency[key].get, {
             method: 'GET',
           })
             .then((response)=> {
               this.setState({
                   data:response
               })
             })
             .catch((error)=> {
               message.error('信息获取失败')
             });
     }


     sendMessage1=(params)=>{
        const {agency,agencyKey}=this.state;
         request(agency[agencyKey].send, {
             method: 'POST',
             data:params,
           })
             .then(function(response) {
               message.success('信息保存成功')
             })
             .catch(function(error) {
               message.error('信息保存失败')
             });
     }
     callback=(agencyKey)=>{
        this.setState({agencyKey,});
        console.log(agencyKey,'1')
        this.getMessage(agencyKey);
     };
    render(){
        const{data,agency,agencyKey}=this.state;
        return(
            <PageHeaderWrapper>
            <Tabs defaultActiveKey="一级代理" onChange={this.callback}>
              <TabPane tab="一级代理" key="一级代理" />
              {/*<TabPane tab="二级代理" key="二级代理" />*/}
              {/*<TabPane tab="三级代理" key="三级代理" />*/}
            </Tabs>
              <div>
              <Card 
               title={agencyKey}
              >
                  <ZdTextArea
                    data={data}
                    imgUrl={agency[agencyKey].upload}
                    comfirm={this.sendMessage1}
                  />
              </Card>
              </div>

            </PageHeaderWrapper>
        )
    }
}
export default Index;
