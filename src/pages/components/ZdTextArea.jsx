import React,{Component} from 'react'
import E from "wangeditor"
import { Button,Divider  } from 'antd';


class ZdTextArea  extends Component{
   constructor(props){
       super(props);
       this.state={
        editor:null
       }
   }

   componentDidMount(){
    const editor = new E("#div1")
    this.setState({editor})
    editor.create()
   }

  contentClear=()=>{
   const{editor}=this.state;
   editor.txt.clear()
  }
  contentPublic=()=>{
      const{editor}=this.state;
      console.log(editor.txt.html())
  }

  render(){
      return(
          <div>
            <div id={'div1'} />
            <div style={{float:'right',marginTop:40}}>
                <Button onClick={this.contentClear} >清空</Button>
                <Divider type="vertical" />
                <Button type="primary" onClick={this.contentPublic} > 发布 </Button>
            </div>
          </div>
        
      
         
      )
  }
} 

export default ZdTextArea;