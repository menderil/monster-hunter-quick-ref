//event listener for search button
document.querySelector('button').addEventListener('click', getMonster)

function getMonster(){
    //gets the input from the search bar
    let searchInput = document.querySelector('input').value
    //access insertion points from the HTML
    let monsterName = document.querySelector('#monsterName')
    
    fetch(`https://mhw-db.com/monsters?q={"name":"${searchInput}"}`)
        .then(response => response.json())
        .then(searchResult => {
            //testing:
            //console.log(searchResult)

            //inserts the monster name
            monsterName.innerText = searchResult[0].name

            //if no result is found:
            if(searchResult.length == 0){
                console.log('no result found')
            }
        })
        .catch(err => monsterName.innerText = 'Please enter a monster name');

}
