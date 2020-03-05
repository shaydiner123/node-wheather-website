const request= require('request');

const forecast= (latitude,longtitude,callBack)=>{
    const url='https://api.darksky.net/forecast/6604f8d97df19973a50e90ec709527b6/'+encodeURIComponent(latitude)+','+encodeURIComponent(longtitude);
    request({url,json:true},(error,{body})=>{
        if(error){
            callBack('unnable to connect to wheather server');
        }
        else{
            if(body.error){
                callBack('unnable to find location');
            }
            else{
                callBack(undefined,'its is currently '+ body.currently.temperature +' degrees out, there is a '+ 
                body.currently.precipProbability+ ' chance of rain')
            }
        }
    })
};

module.exports=forecast;

