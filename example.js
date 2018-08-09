const request = require("superagent")
// const unique = require("uniq")



const arrayKeys  = []
const uniqueNames = []
let scores = []
const arrayNames = [ 'The Legend of Zelda: Ocarina of Time','Super Mario 64', 'Super Smash Bros',
 'Star Fox 64', 'Banjo-Kazooie', 'GoldenEye 007','Kirby 64: The Crystal Shards', 'Perfect Dark', 'Paper Mario'
]

const loading1 = () => {
    if (scores.length < 2) {
    console.log('loading')
    }
    return false
}     

const add = (data) => { 
    if (!arrayKeys.includes (data)) {
    arrayKeys.push(data)
    console.log(arrayKeys)}
}

const getDetails = (name) => {
    request
    .get(`https://api-endpoint.igdb.com/games/?search=${name}`)
          .set({'user-key': '84ea2324967cc3933cf9fb39e4f62206',accept: 'application/json'
        })
          .then(res => {
              add(JSON.parse(res.body[0].id))
              console.log(JSON.parse(res.body[0].id))
              console.log(arrayKeys)
            })
        .then (arraykeys => { 
            if (arrayKeys.length > 0) {
                getObject (arrayKeys.slice(-1).pop())
            }
            console.log("ciao")
        })
        .catch(e => console.log("error", e))
}

const getObject = (key) => {
    console.log(key, "called")
    request
    .get(`https://api-endpoint.igdb.com/games/${key}`)
          .set({'user-key': '84ea2324967cc3933cf9fb39e4f62206',accept: 'application/json'
            })
          .then(res => {
              console.log(res.body[0].name)
              console.log(res.body[0].popularity)
              let schema = {
                  name:  res.body[0].name,
                  score: 0,
                  pop:   res.body[0].popularity,
              }
                scores.push(schema)
                if (!uniqueNames.includes(res.body[0].name)) {
                uniqueNames.push(res.body[0].name)
                console.log(uniqueNames)}
                    // return res
            })
            .then(res => {
                let name = uniqueNames.splice(-1)[0]
                let list = document.getElementById("list")
                let listItem = document.createElement("li")
                let listButton = document.createElement("button")
                let voteCounter = document.createElement("span")
                listItem.innerHTML = name
                listItem.setAttribute("class","h1");
                listButton.innerHTML = "VOTE!"
                listButton.setAttribute("class","btn btn-success");
                voteCounter.setAttribute("class", "badge badge-primary badge-pill")
                let count = 0;
                let maxScoresObjects = []
                listButton.onclick = function () {
                    scores = scores.map( (datum) => {
                        if (datum.name === name) {
                            datum.score += 1
                        }
                        return datum
                    })
                    console.log(scores)
                    count += 1;
                    voteCounter.innerHTML = count; 
             
                    if (scores.length > 0) {
                        let higherScore = (scores.reduce((max, p) => p.score > max ? p.score : max, scores[0].score))
                        console.log(scores.reduce((max, p) => p.score > max ? p.score : max, scores[0].score))
                        maxScoresObjects.push((scores.filter( item => item.score === higherScore).map (item => item.name)))
                        console.log("max", maxScoresObjects)
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

// const handleObject = (key) => {
//     key.map(async k => {
//       try {
//         getObject(k)
//       } catch (e) {
//         console.log(e)
//       }
//     })
//   }



module.exports = handleResult (arrayNames)
module.exports = loading1 ()