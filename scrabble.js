


let myWords = 'hi'; 
let toSearch = document.querySelector(".search")
let findBtn = document.querySelector(".btn")
let url = "https://raw.githubusercontent.com/dwyl/english-words/master/words.txt"


let suggestions = document.querySelector(".suggestions")

let alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')
let points = [1,3,3,2,1,4,2,4,1,8,5,1,3,1,1,3,10,1,1,1,1,4,4,8,4,10]

let pointsDict = {}
alphabet.forEach((letter, i) => pointsDict[letter] = points[i])




window.addEventListener("load", getText)
// setTimeout(convertDataToList, 2000)

toSearch.addEventListener("change", compareWords)
toSearch.addEventListener("keyup", compareWords)




function pointsPerWord(matchedWord){
  matchedWord = alpha(matchedWord)
  matchedWord.shift()
  matchedWord = letterCount(matchedWord)
  let points = 0;
  Object.keys(matchedWord).forEach(function(key){
    points += (matchedWord[key]*pointsDict[key])
  })
  return points 
}


function compareWords(){

//clear suggestions list 
suggestions.innerHTML = '';
let finalMatches = []; 

  // save all possible matches to a list 
  for(let i=0; i<myWords.length; i++){
    if(isGoodMatch(myWords[i])){
      finalMatches.push(myWords[i])
    }
  }  
  //generate a dictionary with words, and points per each word 
  let wordsAndPoints = {}
  for(let i=0; i<finalMatches.length; i++){
    finalMatches.forEach((word) => wordsAndPoints[word] = pointsPerWord(word))
  }

  //sort the dictionary, by points in descending order
  let pairs= []
  pairs = Object.keys(wordsAndPoints).map(function(key){return[key,wordsAndPoints[key]]})
  pairs.sort(function(a, b){
    return b[1] -a[1]
  })
  
  //return only the first 10 pairs 
  if(pairs.length>15){
    pairs = pairs.slice(0,15)
  }
  

  //for each word and point pair, append list item to suggestions list
  for(let i=0; i<pairs.length; i++){
    let item = document.createElement("li")
    item.innerHTML=`${pairs[i]}`
    suggestions.appendChild(item)
  }

}




function isGoodMatch(toMatch){
  let temp = alpha(toMatch)
  // temp.shift() 
  let toMatchDict = letterCount(temp)
  let countSearched = letterCount(alpha(document.querySelector(".search").value))
  let myCount = 0
  Object.keys(toMatchDict).forEach(function(key){
    if(toMatchDict[key]<=countSearched[key])
    {
    myCount++}
    })
    if (myCount===(toMatch.length)-1){
      return true
    }else{
      return false
    }
  }





function getText(){
  fetch('dictionary.txt')
  .then(res => res.text())
  .then(data=> myWords = data)
  .then(()=>  myWords = myWords.split("\n"))}

  
// function getText(){
//   fetch(url)
//   .then(res => res.text())
//   .then(data=> myWords = data)
//   .then(()=>  myWords = myWords.split("\n"))}





//takes in a word and returns an alphebetized list of letters
function alpha(word){
  let alphaWord = word.split("")
  return alphaWord.sort((a,b)=> a>b?1:-1)
}


// input alphabetized list and output the counts of each letter
function letterCount (wordAlpha){
   const letterCounts  = wordAlpha.reduce(function(obj, item){
     if(!obj[item]){
       obj[item]=0; 
     }
     obj[item]++; 
     return obj
    },
    {})
    return letterCounts
   }




