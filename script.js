const request = require("superagent")


const arrayKeys  = []
let scores = []
const arrayNames = [ 'The Legend of Zelda: Ocarina of Time','Super Mario 64', 'Super Smash Bros',
//  'Star Fox 64', 'Banjo-Kazooie', 'GoldenEye 007','F-Zero X','Kirby 64: The Crystal Shards', 'Perfect Dark', 'Paper Mario'
]
 
const getDetails = (name) => {
    request
    .get(`https://api-endpoint.igdb.com/games/?search=${name}`)
          .set({'user-key': 'a9132414f209b09fd79f6929b1b335b0',accept: 'application/json'
        })
          .then(res => {
              add(JSON.parse(res.body[0].id))
            })
        .then (arraykeys => { 
            if (arrayKeys.length > 0) {
                getObject (arrayKeys.slice(-1).pop())
            }
         
        })
        .catch(e => console.log("error", e))
}

const add = (data) => { 
    if (!arrayKeys.includes (data)) {
    arrayKeys.push(data)
    }
}


const getObject = (key) => {
    request
    .get(`https://api-endpoint.igdb.com/games/${key}`)
          .set({'user-key': 'a9132414f209b09fd79f6929b1b335b0',accept: 'application/json'
            })
          .then(res => {
              let schema = {
                  name:  res.body[0].name,
                  score: 0,
              }
                scores.push(schema)
                return res
            })
            .then(res => {
                let name = (res.body[0].name)
                let list = document.getElementById("list")
                let listItem = document.createElement("li")
                let listButton = document.createElement("button")
                let voteCounter = document.createElement("span")
                listItem.innerHTML = name
                listItem.setAttribute("class","h2");
                listButton.innerHTML = "VOTE!"
                listButton.setAttribute("class","btn btn-success");
                voteCounter.setAttribute("class", "badge badge-primary badge-pill")
                
                let count = 0;
                let maxScoresObjects = []
                listButton.onclick = function () {
                    scores.map( (datum) => {
                        if (datum.name === name) {
                            datum.score += 1
                    }
                    return datum
                    })
                    count += 1;
                    voteCounter.innerHTML = count; 

                   
             
                    if (scores.length > 0) {
                        let higherScore = (scores.reduce((max, p) => p.score > max ? p.score : max, scores[0].score))
                        maxScoresObjects.push((scores.filter( item => item.score === higherScore).map (item => item.name)))
                        let winnerFound = document.getElementById("winner")
                        if (maxScoresObjects.length > 1) {
                            maxScoresObjects.map(item =>  winnerFound.innerHTML =  item )
                        }
                        else { 
                            winnerFound.innerHTML =  maxScoresObjects
                        }
                        
                         return false
                    } 
                }
          
                list.append(listItem)
                list.append(listButton)
                list.append(voteCounter)
            })
          .catch(e => console.log("error", e))
}

const handleResult = (data) => {
    data.map(
        async (d) => {
      try {
        getDetails(d)
      } catch (e) {
        console.log(e)
      }
    })
}


module.exports = handleResult (arrayNames)
