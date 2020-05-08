// als erstes app.js als npm projekt delkarieren 
// npm init -y

const request = require('request')


// const url = 'https://api.openweathermap.org/data/2.5/weather?lat=37.8267&lon=-122.4233&units=metric&appid=daf2f302f346741f328416a9f2b07209'

// request({ url : url, json:true }, (error, response) => {
// if (error) {
//     console.log('keine I-Verbindung möglich für Wetter')
//     } else if (response.body.error) {
//         console.log(response.body)
//     } else {
//         console.log('Aktuelle Temperatur beträgt: ' + response.body.main.temp + ' Grad Celsius .')
//     }
// })

// const geocodeURL ='https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoicGV0ZXJzZW4wMTkwIiwiYSI6ImNrOWxyNXl3MDAzaXIzZW53MzVjM3hmenYifQ.nWrnYepcD9e3xDpv9PzE6g'

// request({ url : geocodeURL, json:true}, (error, response) => {

//     if (error) {
//         console.log('Leine Verbindung zu MapBox')
//     } else if ( response.body.message) {
//         console.log(response.body) 
//     } else {
//         const latitude = response.body.features[0].center[0]
//         const longitude =  response.body.features[0].center[1]
//         console.log(latitude, longitude)
       
//     }

// })



const geoCode = (adress, callback ) => {
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+adress +'.json?access_token=pk.eyJ1IjoicGV0ZXJzZW4wMTkwIiwiYSI6ImNrOWxyNXl3MDAzaXIzZW53MzVjM3hmenYifQ.nWrnYepcD9e3xDpv9PzE6g'
    
    request({ url : url, json:true}, (error, response) => {

        if (error) {
            callback('Leine Verbindung zu MapBox', undefined)
        } else if ( response.body.message) {
            callback (response.body) 
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0], 
                location: response.body.features[0].place_name
                
                })
            // console.log(latitude, longitude) 
        }  
    })

}

// geoCode('New York', (error, data) => {
//     console.log('Error', error)
//     console.log('Data', data)

// })

module.exports = geoCode