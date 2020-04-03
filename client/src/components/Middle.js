import React, {Component} from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-select/dist/css/bootstrap-select.css";
import "font-awesome/css/font-awesome.min.css";
import $ from "jquery/dist/jquery.js"
import "bootstrap-select/dist/js/bootstrap-select.js";
import "bootstrap/dist/js/bootstrap.js";
import "popper.js/dist/popper.js";


class Middle extends Component{
    render(){
        const middleSection = {
           width:"20%",
           display:"flex",
           flexDirection:"column"
          
        }
        
        const btnSyle = {
            padding:"15px 32px",
            fontSize: "16px",
            marginBottom:"10px",
            width:"40%"
        }

        const buttons = {
            display:"flex",
            flexDirection:"column",
            justifyContent:"center",
            alignItems:"center",
            height:"100%"
        }

        const selectStyle = {
            width:"70%"  
        }

        const selectMenu = {
            display:"flex",
            justifyContent:"center",
            width:"100%"
        }

        const methodsEditData = [
            ["Analytika textu","textAnalytics"],
            ["Odstráň duplikáty","removeDuplicates"],
            ["Konvertuj na doménu","convertToDomain"],
            ["Otvor url v novom okne","bulkUrlOpener"],
            ["Vytvor JS pole","putToArray"],
            ["Poskladaj URL","urlBuilder"]
        ]
       
        const methodsGetData = [
            ["Pošli HTTP GET request","getAPIData"],
            ["Scrapuj jednotlivý web","scrapeSingleWeb"],
            ["Získaj status kód","getStatusCode"],
            ["Over footprint na weboch","checkFootprint"],
            ["Najdi na weboch email","findEmail"],
                        
        ]
        
        $(document).ready(function() {
            $("select").selectpicker();
         });
        
        return(
            <div id="middleSection" style={middleSection}>
              <div style={selectMenu} id="selectMenu">       
                <select className="selectpicker" style={selectStyle} data-style="btn btn-primary btn-sm" name="method" onChange={this.props.handleChange}>
                <optgroup label="Úprava dát">
                   {methodsEditData.map((value,index)=>
                   <option key={index} value={value[1]}>{value[0]}</option>
                   )}
                 </optgroup>
                 <optgroup label="Získanie dát">
                 {methodsGetData.map((value,index)=>
                   <option key={index} value={value[1]}>{value[0]}</option>
                   )}
                </optgroup>         
                </select>
                </div>
                <div id="buttons" style={buttons}>
                    <button className="btn btn-primary" style={btnSyle} onClick={this.props.method}><i className="fa fa-arrow-right" aria-hidden="true"></i></button>
                    <button className="btn btn-primary" style={btnSyle} onClick={this.props.passData}><i className="fa fa-arrow-left" aria-hidden="true"></i></button>
                    <button className="btn btn-danger" style={btnSyle} onClick={this.props.clear}><i className="fa fa-times" aria-hidden="true"></i></button>
                </div>
                </div>
        )
    }
}

export default Middle