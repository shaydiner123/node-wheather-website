const request = require('request');


const geocode= (adress,callback)=>{
    const url= 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(adress)+'.json?access_token=pk.eyJ1Ijoic2hheTEyMzIxIiwiYSI6ImNrNzUzMGQxejBicGUzbG50bjR6eW1vbXQifQ.zwDdASU-POd2xh2clgT5OQ&limit=1';
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('unnable to connect to wheather server',undefined);
        }
        else{
            if(body.features.length===0){
                callback('unnable to find location',undefined);
            }
            else{
                callback(undefined,{
                    latitude:body.features[0].center[1],
                    longtitude:body.features[0].center[0],
                    location: body.features[0].place_name
                })           
            }
        }
    })
}






module.exports=geocode;