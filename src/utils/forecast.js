const request = require("request")
const forecast=(latitude,longitude,callback)=>{
    const forecastURL='https://api.darksky.net/forecast/30037e7fab56cba5c7a40c0ca160ef36/'+latitude+','+longitude+'?units=us&lang=es'
    request({url:forecastURL,json:true},(error,response)=>{
        if(error){
            callback('Unable to connect to network services',undefined)
        }
        else{
            callback(undefined,{
                temperature:response.body.currently.temperature,
                summary:response.body.daily.data[0].summary,
                precipProbability:response.body.currently.precipProbability
            })
        }
    })
}
module.exports=forecast