// öffnen Heroku heroku login
// Für Version-Kontrolle:  git-scm installieren; wichtig ist das GIT-BASH installiert ist 
    // git init
    // git Status 
    // .gitignore  für datei die nicht durch git kontrolliert werden sollen 
    //  git add src/   tracket einzelen datein 
    // git add .      trackt alle Untracked files


console.log('Klient ist geladen von der Datai')

const weatherFrom = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherFrom.addEventListener('submit', (e) =>  {
    e.preventDefault ()

    const location = search.value

    messageOne.textContent = 'Daten werden abgerufen'
    messageTwo.textContent = '...'

    fetch('http://localhost:3000/weather?adress='+location).then((response)=>{
        response.json().then((data) =>  {
    
            if (data.error) {
                messageOne.textContent=data.error
            } else {
                messageOne.textContent= data.location
                messageTwo.textContent= data.forecast
            }
        })
    })
}) 