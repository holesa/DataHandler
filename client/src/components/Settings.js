import React, {Component} from "react";
import "bootstrap/dist/css/bootstrap.css";

class Settings extends Component{
    render(){

        const settingsStyle = {
            margin:"20px",
            padding:"20px",
            height:"auto",
            width:"40%",
            backgroundColor:"#e8eaed"
        }

        const legendStyle = {
            fontSize:"17px",
            fontWeight:"600"
        }

        const label = {
            paddingRight: "5px"
        }

        const result = ()=>{
         if(this.props.method === "convertToDomain"){
             return (
             <div>
                 <div className="form-check form-check-inline">
                    <input className="form-check-input" id="domainCheckbox1" type="checkbox" name="http" onChange={this.props.handleSettings}/>
                    <label className="form-check-label" htmlFor="domainCheckbox1">http://</label>    
                 </div> 
                 <div className="form-check form-check-inline">
                    <input className="form-check-input" id="domainCheckbox2" type="checkbox" name="www" onChange={this.props.handleSettings}/>
                    <label className="form-check-label" htmlFor="domainCheckbox2">www</label>    
                 </div>
                 <div className="form-check form-check-inline">
                    <input className="form-check-input" id="domainCheckbox3" type="checkbox" name="root" onChange={this.props.handleSettings}/>
                    <label className="form-check-label" htmlFor="domainCheckbox3">Koreň domény</label>    
                 </div>   
             </div>
             )
         }

         else if(this.props.method === "urlBuilder"){
            return (
           <div>
                <label htmlFor="urlPhrase"> Fraza do URL</label>      
                <input className="form-control" placeholder="/priklad" type="text" name="urlPhrase" id="urlPhrase" onChange={this.props.handleSettings}/>
           </div> 
            )
        }

        else if(this.props.method === "scrapeSingleWeb"){
            return (
                <div>
                    <label  className="form-check-label" style={label}  htmlFor="querySelectorAll">QuerySelectorAll</label>
                    <input type="text" className="form-control" id="querySelectorAll" placeholder="Napr. h1" name="dom" onChange={this.props.handleSettings}/>
                    <label className="form-check-label" style={label}  htmlFor="poradie">Poradie</label>
                    <input type="text" id="poradie" className="form-control" name="order" onChange={this.props.handleSettings}/>
                    <legend style={legendStyle} className="form-check-label">Získať celé HTML?</legend>
                        <div className="form-check form-check-inline">
                            <label className="form-check-label" style={label} htmlFor="fullsiteAno">Ano</label>
                            <input type="radio" className="form-check-input" name="fullsite" id="fullsiteAno" value="true" onChange={this.props.handleSettings}/>
                        </div>
                        <div className="form-check form-check-inline">
                            <label htmlFor="fullsiteNie" style={label}> Nie</label>
                            <input type="radio" className="form-check-input" name="fullsite" id="fullsiteNie" defaultChecked  value="false" onChange={this.props.handleSettings}/> 
                        </div>
                    <legend style={legendStyle}>HTML atribúty</legend>
                        <div className="form-check form-check-inline">
                            <label className="form-check-label" style={label} htmlFor="href">Href</label>
                            <input type="radio" className="form-check-input" id="href" name="attr" defaultChecked  value="href" onChange={this.props.handleSettings}/>
                        </div>
                        <div className="form-check form-check-inline">
                            <label className="form-check-label" style={label} htmlFor="src">Src</label>
                            <input type="radio" className="form-check-input" id="src" name="attr" value="src" onChange={this.props.handleSettings}/> 
                        </div>
                        <div className="form-check form-check-inline">
                            <label className="form-check-label" style={label} htmlFor="textContent">Text</label>
                            <input type="radio" className="form-check-input" id="textContent" name="attr" value="textContent" onChange={this.props.handleSettings}/>
                        </div>
                        <div className="form-check form-check-inline">
                            <label className="form-check-label" style={label} htmlFor="outerHTML">HTML</label>
                            <input type="radio" className="form-check-input" id="outerHTML" name="attr" value="outerHTML" onChange={this.props.handleSettings}/> 
                        </div>
                </div>
                )
              }

        else if(this.props.method === "checkFootprint"){
            return (
                <div>
                   <div className="form-check form-check-inline">
                      <label htmlFor="phrase" style={label} className="form-check-label">Fráza na overenie</label>  
                      <input type="text" className="form-control" id="phrase" name="phrase" onChange={this.props.handleSettings}/>
                    </div>
                </div>

                )
        }
    }  
    
        if(this.props.settings){
        return(
        <div style={settingsStyle}>{result()}</div>
        )
    }
        else{
            return(<div></div>)
        }
    
    }
}

export default Settings


