// öffnen Heroku heroku login
// Für Version-Kontrolle:  git-scm installieren; wichtig ist das GIT-BASH installiert ist 
    // git init
    // git Status 
    // .gitignore  für datei die nicht durch git kontrolliert werden sollen hier z.B. in der Datei: node_modules/
    //  git add src/   tracket einzelen datein 
    // git add .      trackt alle Untracked files

    // git config --global user.email "newsfoxxx@googlemail.com"
    // git commit -m "init commit" <- erste Version mit der Variablen: Init comit

        //  Kommunikation zw. Git und Horoku use: git-bash
            // ls -a -l ~/.ssh
            // Schlüssel erstellen ssh-keygen -t rsa -b 4096 -C "newsfoxxx@googlemail.com"
            //  pub ist dabei die Public datei, die andere datan ohne pub wird nicht geteilt
            // KEy Prüfen 
                // für Mac: eval "$(ssh-agent -s)"   // für windows: eval $(ssh-agent -s)
            // Datei Registrieren 
                // für Mac : ssh-add -K ~/.ssh/id_rsa //  für Windows ssh-add K ~/.ssh/id_rsa

    // auf github.com neue repository erstellen 
        // nutze: .. pusb an existing repositopr form the command line, im Terminal: 
            //git remote add origin https://github.com/Maxxxuss/node-weather-app.git
            // ssh festlegen github - profile -> setting -> SSh and GPG key
                // ssh public key eingeben, in git-bash erzeugen: cat ~/.ssh/id_rsa.pub
                // Verbindung Testen im terminal: ssh -T git@github.com  anschließend yes : folgender Text wird bei erfolgreicher Verbindung anagezeigt: Hi Maxxxuss! You've successfully authenticated, but GitHub does not provide shell access. 

        // projekt auf github hochladen über den Terminal:  git push -u origin master
        // git hub webseite neuladen, Projekt sollte nun hochgeladen sein 

// Heroku
    // heroku keys:add       Upload Datei
    // heroku create 0800-Wetter            URL mit angabe einer einzigartigen Namensbezeichnung
    // package.json... löschen von     "test": "echo \"Error: no test specified\" && exit 1"
        //  und ändern zu:  "start": "node src/app.js"   // app.js . lässt sich un mit dem Terminal Befehl: npm run start   aufrufen


 
const weatherFrom = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherFrom.addEventListener('submit', (e) =>  {
    e.preventDefault ()

    const location = search.value

    messageOne.textContent = 'Daten werden abgerufen'
    messageTwo.textContent = '...'

    // fetch('http://localhost:3000/weather?adress='+location).then((response)=>{
        fetch('/weater?adress='+location).then((response)=>{        // start der URL für Heroku bei Portänderung 
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