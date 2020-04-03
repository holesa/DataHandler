import React,{Component} from "react"


class Instructions extends Component{
    render(){

        const instructionsStyle = {
            margin:"20px",
            padding:"20px",
            height:"100px",
            width:"40%",
            backgroundColor:"#d1ecf1"
        }

        const texts = [
            "Vstup: Akýkoľvek text.",
            "Vstup: Zoznam slov/fráz zoradených pod sebou.",
            "Vstup: Zoznam url adries zoradených pod sebou.",
            "Vstup: Maximálne 1 url adresa"
        ]

        const result=()=>{
        if(this.props.method === "textAnalytics"){
            return(
                <div>{texts[0]}</div>
            )
        }

        else if(this.props.method === "removeDuplicates"){
            return(
                <div>{texts[1]}</div>
            )
        }

        else if(this.props.method === "convertToDomain"){
            return(
                <div>{texts[1]}</div>
            )
        }

        else if(this.props.method === "bulkUrlOpener"){
            return(
                <div> {texts[2]}</div>
            )
        }

        else if(this.props.method === "putToArray"){
            return(
                <div>{texts[1]}</div>
            )
        }

        else if(this.props.method === "urlBuilder"){
            return(
                <div> {texts[2]} </div>
            )
        }

        else if(this.props.method === "getAPIData"){
            return(
                <div> {texts[3]} </div>
            )
        }

        else if(this.props.method === "scrapeSingleWeb"){
            return(
                <div> {texts[3]} </div>
            )
        }

        else if(this.props.method === "getStatusCode"){
            return(
                <div> {texts[2]} </div>
            )
        }
        else if(this.props.method === "checkFootprint"){
            return(
                <div> {texts[2]} </div>
            )
        }
        else if(this.props.method === "findEmail"){
            return(
                <div> {texts[2]} </div>
            )
        }

        else{
            return(
                <div></div>
            )
        }
    }

    return(
    <div style={instructionsStyle}><b>Inštrukcie</b>: {result()}</div>
    )

  }
}


export default Instructions