import React,{Component} from 'react'
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import request from 'umi-request';
import { message} from 'antd';
import ZdTextArea from '../../components/ZdTextArea'

class Index extends Component{
    
    constructor(props){
        super(props);
        this.state={
          data:''
        }
    }
    componentDidMount(){
        this.getMessage();
     }
     getMessage=()=>{
       request('http://1.116.77.118:2333/information/getInforContent/EastAsiaOffice', {
             method: 'GET',
           })
             .then((response)=> {
               console.log(response)
               this.setState({
                   data:response
               })
             })
             .catch((error)=> {
               message.error('信息获取失败')
             });
     }
     sendMessage=(params)=>{
         request('http://1.116.77.118:2333/information/addInformation/EastAsiaOffice', {
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
    render(){
        const{data}=this.state;
        return(
            <PageHeaderWrapper>
              <div>
                  <ZdTextArea
                       data={data}
                       imgUrl={'http://1.116.77.118:2333/information/uploadFile/EastAsiaOffice'}
                       comfirm={this.sendMessage}
                  />
              </div>

            </PageHeaderWrapper>
        )
    }
}
export default Index;