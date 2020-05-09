// install express npm i express
// node src/app.js

const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname)
// console.log(path.join(__dirname,'../public'))


const app = express()
const port = process.env.PORT || 3000  // erforderlich für Heroku  und alternativ über Port 3000

// Pfad definition für Express espressjs.com
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views') // macht die datei views variuabel so, dass diese umbenannt werden kann wie hier z.B. in templates 
const partialsPath =path.join(__dirname,'../templates/partials')


// Bestimmten handlebars engien und view-pfad
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//  Setup static directory to serve 
app.use(express.static(publicDirectoryPath))

app.get('', (req, res)=>{
    res.render('index', {  // name wie index.hbs; index.hbs muss dabei genau im Ordner "views" liegen da dieser spezifische für *.hab-Datein ist
        tabTitel:'WEtter-Seite',
        title: 'NPM von HSB ', 
        name: 'HAcke Peter'
    
    })

})

app.get('/about', (req, res)=>{
    res.render('about', {
        tabTitel:'About-Seite',
        title: 'das Bin ich ', 
        name: 'HAcke Peter'
    
    })
 
})

app.get('/help', (req, res)=>{
    res.render('help', {  
        tabTitel:'help',
        title: 'Help Seite', 
        name: 'HAcke Peter'
    
    })
})

app.get('/weather', (req, res)=>{
    if(!req.query.adress) {
        return res.send({
            error: 'Bitte Adresse angeben'
        })
    }

    geoCode(req.query.adress, (error, {latitude, longitude, location} ={  } ) => {

        if (error) {
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {

        if (error) {
            return res.send( {error}) 
        }
            res.send({
                forecast: forecastData, 
                location, 
                adress: req.query.adress
            })
        })
    })
})

app.get('/products',(req, res)=> {
    if (!req.query.search) {
        return res.send ({  // alternative zu return ist else einzufügen nach if 
            error:'Eine Suchparameter muss angegeben werden'
        })

    }
   
    // console.log(req.query) // gibt in der KOnsole aus, was in der Adresszeile angegeben wurde z.B. http://localhost:3000/products?search=games&rating=5 ; Consol Ausgabe= (search:'games', rating: '5') 
   console.log(req.query.search)
    res.send ({
        products:[]
    })
})

app.get('help/*', (req, res)=>{
    res.render('404', {  
        tabtitel:'404-Seite',
        title: 'Help Seite nichjt Gefunden Page 404', 
        name: 'HAcke Peter',
        errorMesage:'Seite nicht gefunden'
    
    })
})

app.get('/*', (req, res)=>{
        res.render('404', {  
            tabtitel:'404-Seite',
            title: '404 Seite', 
            name: 'HAcke Peter',
            errorMesage:'Seite nicht gefunden'
        
        })
    })



app.listen(port,()=>{
    
    console.log('Server läuft auf Port ' + port)

})