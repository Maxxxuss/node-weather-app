 const request = require('request')

const forcast = (latitude, longitude , callback) => {
    const webUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat='+latitude+'&lon='+longitude+'&exclude={part}&units=metric&appid=daf2f302f346741f328416a9f2b07209'
    //  npm request Standartschreibweise 
    //      request({url}, function (error, response, body) 
    request({ url : webUrl, json:true}, (error, { body}) => {   // es-6- schreibweise 
        // formelle Schriebweise 
        //      request({ url : webUrl, json:true}, (error, response) => {  


        if (error) {
            callback('Leine Verbindung zu Openwaeater Forecast ', undefined)
        } else if ( body.message) {
            callback (body) 
        } else {
            callback(undefined, 'in ' + body.timezone + ' wird es am morgigen Tag ' + body.daily[0].temp.day + ' Grad Celsius') 
            
                }
        }  
    )

}

module.exports = forcast