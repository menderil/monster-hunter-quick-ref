//event listener for search button
document.querySelector('button').addEventListener('click', getMonster)

function getMonster(){
    //gets the input from the search bar
    let searchInput = document.querySelector('input').value
    //access insertion points from the HTML
    let monsterName = document.querySelector('#monsterName')
    let image = document.querySelector('#monsterImage')
    let resistances = document.querySelector('#resistances')
    let weaknessList = document.querySelector('#weaknesses')
    
    fetch(`https://mhw-db.com/monsters?q={"name":"${searchInput}"}`)
        .then(response => response.json())
        .then(searchResult => {
            //testing:
            console.log(searchResult)

            
            //clear the weakness list from the previous searches
            while( weaknessList.firstChild ){
                weaknessList.removeChild( weaknessList.firstChild );
            }

            //NAME
            //inserts the monster name
            monsterName.innerText = searchResult[0].name
            
            //IMAGE
            image.src = `assets/${searchInput}.jpg`

            //RESISTANCES
            if(searchResult[0].resistances.length == 0){
                //if there are no entries in the resistance array:
                resistances.innerText = 'None'
            }else{
                //grabs resistance
                //capitalizes the first letter to look prettier :)
                let resistanceText = searchResult[0].resistances[0].element
                resistanceText = resistanceText[0].toUpperCase() + resistanceText.slice(1)
                resistances.innerText = resistanceText
            }
            


            //creates list of weaknesses
            //puts returned array in a variable
            //just easier to read
            let weaknessArray = searchResult[0].weaknesses

            //itterates through the returned array
            for(let i = 0; i < weaknessArray.length; i++){
                //capitalize the first letter 
                let weaknessText = weaknessArray[i].element
                weaknessText = weaknessText[0].toUpperCase() + weaknessText.slice(1)

                //creates an li with the element name and a space for readability
                const li = document.createElement('li')
                li.textContent = weaknessText + ' '

                //adds the effectiveness
                for(let j = 0; j < weaknessArray[i].stars; j++){
                    li.textContent += '*'
                }

                //attaches that li to the weakness ul
                weaknessList.appendChild(li)
            }



            //if no result is found:
            if(searchResult.length == 0){
                console.log('no result found')
            }
        })
        .catch(err => console.log(err))//monsterName.innerText = 'Please enter a monster name');

}
