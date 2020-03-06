const path= require('path');
const express=require('express');
const hbs= require('hbs');
const geocode= require('./utils/geocode');
const forecast= require('./utils/forecast');
const app=express();

const port= process.env.PORT || 3000;

//define paths for express config
const publicDirectoryPath=path.join(__dirname,'../public'); 
const viewsPath= path.join(__dirname,'../templates/views');
const partialsPath= path.join(__dirname,'../templates/partials');

//setup handlebars engine and views location
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('',(req,res)=>{
    res.render('index',{title:'homepage',
    name:'shay'});
});

app.get('/about',(req,res)=>{
    res.render('about',{title:'about page',
    name:'shay'});
})

app.get('/help',(req,res)=>{
    res.render('help',{helpText:'this is helpfull text',
                    title: 'help page',
                    name:'shay'
                });
})


app.get('/wheather',(req,res)=>{
    const adress= req.query.adress;
    if(!adress){
        return res.send({error:'you must provide a search term'});
    }
    geocode(adress,(error,{latitude,longtitude,location}={})=>{
        if(error){
           return  res.send({error});//shorthand prop
        }
        forecast(latitude,longtitude,(error,forecastData)=>{
            if(error){
                return res.send({error});//shorthand prop
            }
            return res.send({adress, forecastData,location});//shorthand prop
        });
    });
});


app.get('/help/*',(req,res)=>{
    res.render('error',{ title : '404', name : 'shay', errorMessege:'help article not found'});
});

app.get('/*',(req,res)=>{
    res.render('error',{title : '404', name : 'shay', errorMessege:'page not found'});
});

app.listen(port,()=>{
    console.log('server is runing on port '+port);
});


