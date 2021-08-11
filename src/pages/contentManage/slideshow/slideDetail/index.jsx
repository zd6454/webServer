import React,{Component} from 'react'
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import request from 'umi-request';
import { message} from 'antd';
import ZdTextArea from '../../../components/ZdTextArea'

class Index extends Component{
    
    constructor(props){
        super(props);
        this.state={
           data:'',
          bannerId:this.props.location.query.bannerId,
        }
    }
    componentDidMount(){
        this.getMessage();
     }
     getMessage=()=>{
       request('http://aitmaker.cn:8000/banner/getBanner', {
             method: 'GET',
             params:{
               bannerId:this.state.bannerId
             }
           })
             .then((response)=> {
               this.setState({
                   data:response.content
               })
             })
             .catch((error)=> {
               message.error('信息获取失败')
             });
     }
     sendMessage=(params)=>{
         request('http://aitmaker.cn:8000/banner/updateBannerContent', {
             method: 'POST',
             data:{
               "bannerId":this.state.bannerId,
               "content":params["content"],
             },
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
                   imgUrl={'http://aitmaker.cn:8000/information/uploadFile/Banner'}
                   comfirm={this.sendMessage}
                  />
              </div>

            </PageHeaderWrapper>
        )
    }
}
export default Index;
