const express   = require("express"),
      router    = express.Router(),
      app       = express(),
      rp        = require("request-promise"), 
      jsdom     = require("jsdom"),
      request   = require("request");


// Scrape website DOM
router.get("/1", function(req, res) {
  const url = req.query.url
  const domQuery = req.query.dom
  const attr = req.query.attr
  const order = req.query.order
  const fullsite = req.query.fullsite
  let data = []
  let result = ""
  console.log(url)
  rp(url)
    .then(html=>{
    const initDom = new jsdom.JSDOM(html)
    let parseHtml = initDom.window.document.querySelectorAll(domQuery)
    if(fullsite === "true"){
      res.send(JSON.stringify(html))
    }
    else if(parseHtml.length<1){
      res.send("Nespravny selektor")
    }
    else if(order!=="false"){
      let num = parseInt(order,10)
      res.send(parseHtml[num][attr])
    }
    else{
      parseHtml.forEach(item=>{
      result+=item[attr] + "\n"
    })
      let send = parseHtml.length ===1 ? parseHtml[0][attr] : result
      res.send(send)  
  }  
    })
  .catch(function(err){
    res.send("Chyba: " + err)
  });
})


// Check if footprint exist on a website
router.get("/2", function(req, res) {
  const data = req.query.url.split(",")
  const phrase = req.query.phrase
  const promises = data.map(item =>rp(item))
    Promise.all(promises).then(html=>{     
    let result = []
    html.map(item=>result.push(JSON.stringify(item).includes(phrase)))
    result = result.join("\n")
    res.send(result)
  })
  .catch(err=>{
    console.log(err)
    res.send("CHYBA: Odstran tuto url " + err.options.uri)
  })  
})


// Find email on a website
router.get("/3", function(req, res) {
  const data = req.query.url.split(",")
  const promises = data.map(item =>rp(item))
  const matchEmail = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi

    Promise.all(promises).then(html=>{    
    let result = []
    let newArr = html.map((item,index)=>{
        if(item.match(matchEmail) !== null){
          result.push(item.match(matchEmail))
        }
          else{
            result.push("False")
          } 
      })
    result = result.join(",").split(",")
    result = [...new Set(result)]
    res.send(JSON.stringify(result))
  })
  .catch(err=>{
    console.log(err)
    res.send("CHYBA: Odstran tuto url " + err.options.uri)
  })
})


module.exports = router;

