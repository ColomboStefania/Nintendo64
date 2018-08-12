const request = require("superagent")


const arrayKeys  = []
let scores = []
const arrayNames = [ 'The Legend of Zelda: Ocarina of Time','Super Mario 64', 'Super Smash Bros',
 'Star Fox 64', 'Banjo-Kazooie', 'GoldenEye 007','F-Zero X','Kirby 64: The Crystal Shards', 'Perfect Dark', 'Paper Mario'
]
 
//first call to fetch the id of the top games
const getDetails = (name) => {
    request
    .get(`https://api-endpoint.igdb.com/games/?search=${name}`)
          .set({'user-key': 'a9132414f209b09fd79f6929b1b335b0',accept: 'application/json'
        })
          .then(res => {
              add(JSON.parse(res.body[0].id))
            })
            //store the fist ID fetched in array
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

//second call to fetch all the info about the games
const getObject = (key) => {
    request
    .get(`https://api-endpoint.igdb.com/games/${key}`)
          .set({'user-key': 'a9132414f209b09fd79f6929b1b335b0',accept: 'application/json'
            })
          .then(res => {
              //the schema create a local state, to store all the info I need from the API
              let schema = {
                  name:  res.body[0].name,
                  score: 0,
                  pop: res.body[0].popularity,
              }
                scores.push(schema)
                return res
            })
            //render all the names just fetched with DOM 
            .then(res => {
                let name = (res.body[0].name)
                let list = document.getElementById("list")
                let line = document.createElement("hr")
                let listItem = document.createElement("li")
                let rating = document.createElement("p")
                let listButton = document.createElement("button")
                let  description = document.createElement("p")
                let voteCounter = document.createElement("span")
                listItem.innerHTML = name
                if (isNaN(res.body[0].rating)) {
                    rating.innerHTML = "Rating: not defined"} 
                    else {
                    rating.innerHTML = "Rating " + Math.round( (res.body[0].rating) * 10 ) / 10
                }
                description.innerHTML = res.body[0].summary
                listItem.setAttribute("class","h2");
                listButton.innerHTML = "VOTE!"
                listButton.setAttribute("class","btn btn-success");
                voteCounter.setAttribute("class", "badge badge-primary badge-pill")
                
                //voting button
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

                   
                    //render the most voted games
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
                list.append(line)
                list.append(listItem)
                list.append(rating)
                list.append(description)
                list.append(voteCounter)
                list.append(listButton)
                
            })
          .catch(e => console.log("error", e))
}

//first function that gets call in the bundle, this structure helps for asynchronicity
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
