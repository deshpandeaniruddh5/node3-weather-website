const request=require('request')
const forecast=require('./utils/forecast')
const geocode=require('./utils/geocode') 
const path= require('path')
const express= require('express')
const hbs=require('hbs')
//console.log(__dirname)
//  console.log(__filename)
const app =express()
const port= process.env.PORT || 3000
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath= path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath )
app.use(express.static(publicDirectoryPath))
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name: 'Aniruddh Deshpande'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About me',
        name:'Aniruddh Deshpande'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:'Aniruddh Deshpande'
    })
})
app.get('/weather',(req, res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }
    geocode(req.query.address,(error,data)=>{
        if(error){
            return res.send({
                error:error
            })
        }
        forecast(data.latitude,data.longitude,(error,response)=>{
            if(error){
                return res.send({
                    error:error
                })
            }
            res.send(response)
        })

    })
})
app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})
app.get('/help/*',(req,res)=>{
    app.render('error',{
        title:404,
        name:'Aniruddh',
        error404:'Help article not found'
    })
})
app.get('*',(req,res)=>{
    res.render('error',{
        title:404,
        name:'Aniruddh',
        error404:'Page not found'
    })
})

app.listen(port,()=>{
    console.log('Server is up on port 3000');
    
})