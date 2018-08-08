// const request = require("superagent")
// const https = require("https")
// const fs = require('fs')
// let arr = []

// const test = (data) => {
//   arr.push(JSON.stringify(data))
// }

// const getDetails2 = (key) => {
//   request
//   .get(`https://api-endpoint.igdb.com/games/${key}`)
//         .set({'user-key': '207f8cbf16cd3ca369dea45b71572071',accept: 'application/json', 'Access-Control-Allow-Origin': '*', "Access-Control-Allow-Credentials" :'false' })
//         .then(res => test(res.body))
//         .catch(e => console.log("error", e))
// }


// const handleResult = (data) => {
//   fs.writeFile('keys.txt', data, 'utf8', function(err) {
//     if(err) {return console.log(err)} else {console.log("file saved")}
//   })
//   data.map(async d => {
//     try {
//       getDetails(d)
//     } catch (e) {
//       console.log(e)
//     }
//   })

// }

// const getKeys = () => {
//   console.log("ASAS")
//   request
//   .get('https://api-endpoint.igdb.com/platforms/4?fields=games')
  
//         .set({'user-key': '207f8cbf16cd3ca369dea45b71572071',accept: 'application/json', 'Access-Control-Allow-Origin': '*', "Access-Control-Allow-Credentials" :'false' })
//         .then(res => handleResult(JSON.parse(res.text)[0].games))
//         .catch(e => console.log("error", e))
// }
        

// getKeys()

// setTimeout(() => fs.writeFile('data.json', arr, 'utf8', function(err) {
//   if(err) {return console.log(err)} else {console.log("file saved")}
// }), 10000 )