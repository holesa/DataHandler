import React, {Component} from "react"
import scrollImage from "../assets/scroll.png"

class Output extends Component{
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

    const outputColumn = {
        width:"40%"
    }

    const display = {
        display:"flex"
    }

    const divider = {
        width:"100px",
        height:"50px"
    }

    const btn = {
        position:"relative",
        float:"right",
        bottom:"300px",
        fontSize:"8px",
        borderRadius:"0px",
        marginRight:"10px"
    }

    let buttonCopy
    let buttonDownload
    if(this.state.display){
     buttonCopy = <button name="output" className="btn btn-light" style={btn} onClick={this.props.copyText}>Kopírovať</button>
     buttonDownload = <button style={btn} className="btn btn-light" onClick={this.props.downloadFile}><i className="fa fa-download" aria-hidden="true"></i></button>
    }
    else{
     buttonCopy = <div></div> 
     buttonDownload = <div></div>  
    }

       return(
            <div id="outputColumn" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} style={outputColumn}>
                    <textarea rows="10" cols="40"
                    style={textarea} 
                    name="output" 
                    ref={this.props.output} 
                    onChange={this.props.handleChange} 
                    value={this.props.data.output}> 
                    </textarea>
                    {buttonCopy}
                    {buttonDownload}
                    <div style={divider}></div> 
            </div>                 
       )
   }

}

export default Output