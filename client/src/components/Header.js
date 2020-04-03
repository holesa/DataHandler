import React, {Component} from "react";
import logo from "../assets/logo.png"

class Header extends Component{
    render(){
        const nav = {
            width:"100%",
            height:"70px",
            backgroundColor:"#eeeeee",
            display:"flex",
            flexDirection:"rows",
            font:"italic bold 30px Georgia, serif"
        }

        return(
            <header>
                <nav style={nav}>
                    <img src={logo}/>
                </nav>
            </header>
        )
    }
}

export default Header