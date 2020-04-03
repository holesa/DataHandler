import React, {Component} from "react";
import "font-awesome/css/font-awesome.min.css";

class TempStorage extends Component{
    render(){
        const displayStorageBtn = {
            position:"fixed",
            bottom:0,
            textAlign:"center",
            width:"10%"
         }

        let storageAreaDiv 
            if(this.props.data.tempStorage){
                storageAreaDiv = {
                    display:"block"
                }    
            }
            else{
                storageAreaDiv = {
                    display:"none"
                }
            }

         const storageIframe = {
                position:"absolute"
         }
         
         const tempStorage = {
                height:"200px",
                display:"flex",
                justifyContent:"center"
         }

       return(
        <div>
            <div style={storageAreaDiv}>
                <iframe style={storageIframe} src="https://docs.google.com/spreadsheets/d/1tn2W0uIT75Io3a8Wo6UBMm9NFgvdO8kUinmdcYiYACY/edit?usp=sharing" noborder="0" width="1400" height="1000" scrolling="yes" seamless></iframe>  
           </div>
           <div style={tempStorage}>  
                <button style={displayStorageBtn} className="btn btn-warning" onClick={this.props.handleClick}>Úložisko &nbsp;<i className="fa fa-floppy-o" aria-hidden="true"></i></button>
           </div> 
        </div>   
       ) 
    }
    
}

export default TempStorage