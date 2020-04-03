import React, {Component} from "react";

class LoadingIcon extends Component{
    render(){
        let displayStyle
        if(this.props.data.loadingIcon){
            displayStyle = {
                display:"inline-block"
            }
        }
        else{
            displayStyle = {
                display:"none"
            }
        }
        return(
       <div>
            <style jsx>{`
          .lds-ring {
            display: inline-block;
            position: relative;
            right:180px;
          }
          .lds-ring div {
            box-sizing: border-box;
            display: block;
            position: absolute;
            width: 64px;
            height: 64px;
            margin: 8px;
            border: 8px solid #ffc107;
            border-radius: 50%;
            animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
            border-color: #ffc107 transparent transparent transparent;
          }
          .lds-ring div:nth-child(1) {
            animation-delay: -0.45s;
          }
          .lds-ring div:nth-child(2) {
            animation-delay: -0.3s;
          }
          .lds-ring div:nth-child(3) {
            animation-delay: -0.15s;
          }
          @keyframes lds-ring {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }`}
        </style>

       <div style={displayStyle} className="lds-ring"><div></div><div></div><div></div><div></div></div>
    </div>     
        )
    }
}


export default LoadingIcon