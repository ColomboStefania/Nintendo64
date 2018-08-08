
const request = require("superagent")
const unique = require("uniq")

// let val = hello(); // val is "Hello";
// document.getElementById("demo").innerHTML = (val)


const arrayKeys  = []
const arrayFetchedNames = []
const add = (data) => { 
    if (!arrayKeys.includes (data)) {
    arrayKeys.push(data)
console.log(arrayKeys)}
}

const arrayNames = [ 'The Legend of Zelda: Ocarina of Time','Super Mario 64',
//  'Star Fox 64', 'Super Smash Bros', 'Banjo-Kazooie', 'GoldenEye 007','Kirby 64: The Crystal Shards'
]

const getDetails = (name) => {
    request
    .get(`https://api-endpoint.igdb.com/games/?search=${name}`)
          .set({'user-key': '84ea2324967cc3933cf9fb39e4f62206',accept: 'application/json'
        //   'Access-Control-Allow-Origin': '*', "Access-Control-Allow-Credentials" :'false' 
        })
          .then(res => {
              add(JSON.parse(res.body[0].id))
              console.log(JSON.parse(res.body[0].id))
              console.log(arrayKeys)
            //   handleObject (arrayKeys)
            })
        .then (arraykeys => { if (arrayKeys.length > 1) {handleObject (arrayKeys)}
            console.log("ciao")
        })
          .catch(e => console.log("error", e))
}

let scores = []

const getObject = (key) => {
    request
    .get(`https://api-endpoint.igdb.com/games/${key}`)
          .set({'user-key': '84ea2324967cc3933cf9fb39e4f62206',accept: 'application/json',
        //    'Access-Control-Allow-Origin': '*', "Access-Control-Allow-Credentials" :'false' 
        })
          .then(res => {
              console.log(res.body[0].name)
              console.log(res.body[0].popularity)
              let thing = {
                  name:  res.body[0].name,
                  score: 0,
                  pop:   res.body[0].popularity,
              }
              scores.push(thing)
              // console.log(arrayKeys) 
              return res
        })
            .then(res => {
                let name = res.body[0].name
                // arrayFetchedNames.push(res.body[0].name)
                let list = document.getElementById("list")
                let listItem = document.createElement("li")
                listItem.cssText = "color: tomato"
                let listButton = document.createElement("button")
                let voteCounter = document.createElement("p")
                listItem.innerHTML = name
                listButton.innerHTML = "+"
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
             
                    if (scores.length === 2) {
                        let higherScore = (scores.reduce((max, p) => p.score > max ? p.score : max, scores[0].score))
                        // maxScores.push(scores.reduce((max, p) => p.score > max ? p.score : max, scores[0].score))

                        console.log(scores.reduce((max, p) => p.score > max ? p.score : max, scores[0].score))
                      
                        maxScoresObjects.push((scores.filter( item => item.score === higherScore).map (item => item.name)))
                        console.log(maxScoresObjects)
                        let winnerFound = document.getElementById("winner")
                        if (maxScoresObjects.length > 1) {
                        maxScoresObjects.map(item =>  winnerFound.innerHTML = item )}
                        else {winnerFound.innerHTML =  maxScoresObjects

                        }
                        // const winnerFinder = (scores.filter( item => item.score === higherScore))[0].name
                        // console.log(winnerFinder)
                        // let winnerFound = document.getElementById("winner")
                        // winnerFound.innerHTML = winnerFinder
                        return false
                    };
                }
            
                list.append(listItem)
                list.append(listButton)
                list.append(voteCounter)

           
                // const findWinner = scores
                // if (scores.length === 2) {
                // console.log(findWinner.map(item => item.score).reduce((total, num) => total + num, 0)) }

                // let winner = document.getElementById("winner")
                // if (winner !== "") {
                // winner.innerHTML = winner}
            })
                        
        // .then(function(){
        //                     window.console.log('all set...')
        //                   })
          .catch(e => console.log("error", e))
}

const handleResult = (data) => {
    data.map(async d => {
      try {
        getDetails(d)
      } catch (e) {
        console.log(e)
      }
    })
}

const handleObject = (key) => {
    key.map(async k => {
      try {
        getObject(k)
      } catch (e) {
        console.log(e)
      }
    })
  }


// handleResult (arrayNames)
// handleObject (arrayKeys)

module.exports = handleResult (arrayNames)