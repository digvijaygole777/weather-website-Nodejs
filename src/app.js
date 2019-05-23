const path=require('path');
const express=require('express');
const hbs=require('hbs');
const geocode=require('./utils/geocode');
const forecast=require('./utils/forecast');
const port=process.env.PORT || 3000;


const app=express();

const publicDirPath=path.join(__dirname,'../public');
const viewPath=path.join(__dirname,'../src/templates/views');
const partialsPath=path.join(__dirname,'../src/templates/partials');

console.log(partialsPath);

app.set('view engine','hbs');
app.set('views',viewPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirPath));


app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Digvijay Gole'
    });
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:'Digvijay Gole'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helptext:'This is some helpful text',
        title:'Help',
        name:'Digvijay Gole'
    })
})

app.get('/weather',(req,res)=>{
   if(!req.query.address){
       return res.send({
           error:'You must provide an address'
       })
   }

   geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
       if(error){
           return res.send({error});
       }
       forecast(latitude,longitude,(error,forecastData)=>{
           if(error){
               return res.send({error});
           }

           res.send({
               forecast:forecastData,
               location,
               address:req.query.address
              
           })
       })

   })
    
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
      return res.send({
            message:'You should provide search term'
        })
    }
    console.log(req.query.search);
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.send('Help artical not found ');
})

app.get('*',(req,res)=>{
    res.send('MY 404 page');
})

app.listen(port,()=>{
    console.log('Server is up on port '+ port);
})

