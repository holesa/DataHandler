import React         from "react"
import Header        from "./components/Header.js"
import Footer        from "./components/Footer.js"
import Input         from "./components/Input.js"
import Output        from "./components/Output.js"
import Middle        from "./components/Middle.js"
import Settings      from "./components/Settings.js"
import Instructions  from "./components/Instructions.js"
import TempStorage   from "./components/TempStorage.js"
import LoadingIcon   from "./components/LoadingIcon.js"


class App extends React.Component{
   state = {
      input :"",
      output:"",
      method:"textAnalytics",
      showSettings:false,
      settings:{},
      value:"",
      tempStorage:false,
      loadingIcon:true
   }
   input  = React.createRef();
   output = React.createRef();
        
    
    // ** Helper methods */
    handleChange=(e)=>{
     this.setState({[e.target.name]:e.target.value})
     const methods = ["convertToDomain","scrapeSingleWeb","urlBuilder","checkFootprint","removeDuplicates"]
     if(e.target.name === "method"){
       if(methods.includes(e.target.value)){
         this.setState({showSettings:true, settings:{filter:"unique", fullsite:"false",attr:"href", order:"false"} })
        }
       else{
         this.setState({showSettings:false, settings:{}})
       }
       } 
     }

     componentDidMount=()=>{
        setTimeout(()=>{
        this.setState({
           loadingIcon:false
        })
      }, 1500)
     }

     handleClick=(e)=>{
      this.setState({
         tempStorage:this.state.tempStorage ? false : true
      })
     }

     handleSettings=(e)=>{
      let newObj = Object.assign({}, this.state.settings);
      if(e.target.type === "text" || e.target.type === "radio"){
         newObj[e.target.name] = e.target.value
      }
      if(e.target.type === "checkbox"){
         newObj[e.target.name] = e.target.checked

      } 
      this.setState({settings:newObj})
   }

    clear=()=>{
        this.setState({input:"", output:"", value:""})
    }

    passData=(e)=>{
         this.setState({
            input:this.state.output
         })
    }

    fetchApi=(url)=>{
      fetch(url)
      .then(res=>res.text())
      .then(data=>{
         this.setState({
            output:data,
            loadingIcon:false
         })
      })
      .catch((error)=>{
         this.setState({
            output:"NASTALA CHYBA: " + JSON.stringify(error),
            loadingIcon:false
         })
      })  
    }

    // ** General methods */
    downloadFile=(e)=>{
      const fileName = prompt("Názov súboru a formát:")
       if(fileName !==null){
            const element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(this.state.output));
            element.setAttribute('download', fileName);
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();     
            document.body.removeChild(element);
    }
   }

    copyText=(e)=>{
      this[e.target.name].current.select();
      document.execCommand('copy');
      e.target.focus();
   }

    addHttp=()=>{
      let input = this.state.input
      .replace(/https/g,'')
      .replace(/http/g,'')
      .replace(/www1./g,"")
      .replace(/www./g,"")
      .replace(/:\/\//g,"")
      .split("\n")
      let newInput = ""
      input.forEach(item=>{
            item = "http://" + item 
            newInput+= item + "\n"  
         })
      const data = newInput.split("\n")
      console.log(data)
      data.pop()
      return data   
   }

    // ** Specific methods */
    
    // ** Edit data methods */
    // Method => Join urls with phrase
   urlBuilder=()=>{
      this.setState({
         loadingIcon:true
      })
      const phrase = this.state.settings.urlPhrase || ""
      let input = this.state.input.split("\n")
      let result = input.map(item=>item + phrase)
      // result.pop()
      result = result.join("\n")
      console.log(result)
      this.setState({
         loadingIcon:false,
         output: result
      })
   }
   
    // Method => Simple text analytics
    textAnalytics=()=>{
      const input = this.state.input
      const sentences = (/[.?!]/g).test(input) === true ? input.match(/[.?!]/g).length : 0
      const spaces  = input.match(/\s/g) === null ? 0 : input.match(/\s/g).length
      const paragraphes  = input.split(/\n/g).filter(d=>d !== "").length 
      let newData =  "Znaky: "  + input.length + "\n" +
                     "Slová: " + input.split(" ").length + "\n" +
                     "Vety: " + sentences + "\n" +
                     "Medzery: " + spaces + "\n" +
                     "Odstavece: " + paragraphes

      this.setState({
         output:newData,
         showSettings:false
      })
    }

     // Method => Remove duplicates
     removeDuplicates =()=>{
      const data = this.state.input.split("\n")
      let result;
      if(this.state.settings.filter === "unique"){
         result = [...new Set(data)].join("\n");
      }
      if(this.state.settings.filter === "duplicate"){
         result = data.filter((d,i,arr)=>arr.indexOf(d) === i && arr.lastIndexOf(d) !== i).join("\n");
      }
      if(this.state.settings.filter === "nonduplicate"){
         result = data.filter((d,i,arr)=>arr.indexOf(d) === i && arr.lastIndexOf(d) === i).join("\n");
      } 
        this.setState({output:result,
                      showSettings:true
                    })
     }

     // Method => Convert to domain
     convertToDomain=()=>{
      let input = this.state.input
      .replace(/https/g,"")
      .replace(/http/g,"")
      .replace(/www1./g,"")
      .replace(/www./g,"")
      .replace(/:\/\//g,"")
      .split("\n")
      let output = ""
      input.forEach(item=>{
         if(this.state.settings.root){
            item = item.split(/[/?#]/g)[0]
         }  
         if(this.state.settings.www){
            item = "www." + item  
         }
          if(this.state.settings.http){
            item = "http://" + item  
         }
         output+= item + "\n" 
      })
        this.setState({
            showSettings:true,
            output:output
          })
     }

     // Method => Open multiple urls in a new tab
     bulkUrlOpener=()=>{
      const input = this.state.input.split("\n")
      input.forEach(item=>{
         window.open(item,"_blank")
      })

      this.setState({
         showSettings:false
       })

     }

     // Method => Get status code
     getStatusCode=()=>{
      this.setState({
         loadingIcon:true
      })
      const input = this.state.input.split("\n")
      let output = ""
      input.forEach(item=>{
         const sendTime = new Date().getTime()
         const myRequest = new Request("https://cors-anywhere.herokuapp.com/" + item);
         fetch(myRequest).then(response=>{
            output +=response.status + "\n"
            this.setState({
               showSettings:false,
               loadingIcon:false,
               output:output
             })
         });   
      })    
     }
     
      // Method => Create array
      putToArray=()=>{
         const input = this.state.input.split("\n")
         let output = "["
            input.forEach(item=>{
               output += '"'+item+'",'
            })
            output += "]"
            output = output.replace(",]","]")
            this.setState({
               showSettings:false,
               output:output
             })
        }
   
     // ** Get data methods */
    // Method => Scrape a website
    scrapeSingleWeb=()=>{
       this.setState({
          loadingIcon:true
       })
       const data = this.addHttp()
       const url = new URL("https://api.datahandler.site/scrape/1")
       url.searchParams.set("url",data)
       url.searchParams.set("dom",this.state.settings.dom)
       url.searchParams.set("attr",this.state.settings.attr)
       url.searchParams.set("fullsite",this.state.settings.fullsite==="" ? "false" : this.state.settings.fullsite)
       url.searchParams.set("order",this.state.settings.order ==="" ? "false" : this.state.settings.order)
       this.fetchApi(url)
   }  

   // Method => Check if footprint exist on a website
   checkFootprint=()=>{
      this.setState({
         loadingIcon:true
      })
      const data = this.addHttp()
      const url = new URL("https://api.datahandler.site/scrape/2")
      url.searchParams.set("url",data)
      url.searchParams.set("phrase", this.state.settings.phrase)
      this.fetchApi(url)

   }
 
   // Method => Find email on a website
   findEmail=()=>{
      this.setState({
         loadingIcon:true,
      })
      const data = this.addHttp()
      const url = new URL("https://api.datahandler.site/scrape/3")
      url.searchParams.set("url",data)
      this.fetchApi(url)

   }

   // Method => Make get request and receive response
   getAPIData=()=>{
      this.setState({
         loadingIcon:true
      })
      const input = this.state.input
      const myRequest = new Request("https://cors-anywhere.herokuapp.com/" + input)
      this.fetchApi(myRequest)
     }

    render(){
        const section = {
            marginTop:"50px",
            display:"flex",
            flexDirection:"row",
            justifyContent: "space-between"
       }

   return(
   <div>
      <Header/>
      <main>
         <section style={section}>
         <Input  
         copyText={this.copyText} 
         input={this.input} 
         handleChange ={this.handleChange}
         data ={this.state}/>
         <Middle  
         handleChange = {this.handleChange} 
         method={this[this.state.method]}
         clear={this.clear}
         passData={this.passData}/>
         <LoadingIcon data = {this.state}/>
         <Output  
         copyText={this.copyText} 
         output={this.output} 
         handleChange = {this.handleChange} 
         data = {this.state}
         downloadFile = {this.downloadFile}/>
         </section>
         <section style={section}>
         <Settings method={this.state.method} 
         settings={this.state.showSettings}
         handleSettings = {this.handleSettings}
         data ={this.state}/>
         <Instructions method={this.state.method}/>
         </section>
         <TempStorage handleClick = {this.handleClick}
         data = {this.state}/>
      </main>
      <Footer/>
   </div>    
      )
   }
}

export default App