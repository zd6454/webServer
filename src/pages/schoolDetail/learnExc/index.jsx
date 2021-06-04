import React,{Component} from 'react'
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ZdTextArea from '../../components/ZdTextArea'

class Index extends Component{
    
    constructor(props){
        super(props);
        this.state={

        }
    }

    render(){
        return(
            <PageHeaderWrapper>
              <div>
                  <ZdTextArea/>
              </div>

            </PageHeaderWrapper>
        )
    }
}
export default Index;