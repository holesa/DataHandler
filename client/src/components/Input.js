import React, {Component} from "react"
import scrollImage from "../assets/scroll.png"


class Input extends Component{
     state = {
            display:false
        }
            
    handleMouseEnter=()=>{
        this.setState({
            display:true
        })
    }

    handleMouseLeave=()=>{
        this.setState({
            display:false   
        })
    }

   render(){
    const textarea = {
        width:"100%",
        height:"300px",
        backgroundImage: `url(${scrollImage})`,
        backgroundAttachment: "local",
        backgroundRepeat: "no-repeat",
        paddingLeft: "35px",
        paddingTop: "10px",
        borderColor:"#ccc"
    }

       const inputColumn = {
           width:"40%"
       }

       const btn = {
           position:"relative",
           float:"right",
           bottom:"300px",
           fontSize:"8px",
           borderRadius:"0px",
           marginRight:"10px"
       }

       let button
       if(this.state.display){
        button = <button name="input" className="btn btn-light" style={btn} onClick={this.props.copyText}>Kopírovať</button>
       }
       else{
        button = <div></div>   
       }
       return(
            <div id="inputColumn" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} style={inputColumn}>
                <textarea 
                ref={this.props.input} 
                name="input" 
                onChange={this.props.handleChange} 
                value={this.props.data.input}  
                style={textarea}>
                </textarea>
                {button}
            </div>           
       )
   }

}

export default Input