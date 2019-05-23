const request=require('request');

const forecast=(latitude,longitude,callback)=>{
    
    const forecastUrl='https://api.darksky.net/forecast/f15a731e0b69803846a3a6396706c4e4/'+latitude+','+longitude+'?units=si';

    request({url:forecastUrl,json:true},(error,response)=>{
        
        if(error){
            callback('Unable to connect weather services',undefined);
        }
        else if(response.body.error===0){
            callback('Unable to find the location',undefined);

        }
        else{
            callback(undefined,response.body.daily.data[0].summary +'It is currently'+response.body.currently.temperature+'degress out.There is a'+response.body.currently.precipProbability +'%chance of rain.');

        }
    })
}

module.exports=forecast;
