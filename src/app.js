const path = require('path')
const hbs = require('hbs')
const express = require('express');
const { Recoverable } = require('repl');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express();
const port = process.env.PORT || 3000;

//defines path for express config
const publicDirectory = path.join(__dirname, "../public")
//in case we want to use another folder instead of "views"
const viewsPath = path.join(__dirname, "../templates/views")
const partialPath = path.join(__dirname, "../templates/partials")

//let app know that hbs installed"
app.set("view engine", "hbs")
//set file from templates as views
app.set("views", viewsPath )

hbs.registerPartials(partialPath)


app.use(express.static(publicDirectory))

app.get('', (req, res, next) => {
    res.render("index", {title: "Weather App", name: "Svetlana Shinkar"})
})

app.get('/help', (req, res) => {
    res.render("help", {text: "Helpful text", title: "Help Page", name: "Svetlana Shinkar"})
})

app.get('/about', (req, res) => {
    res.render("about", {title: "About me", name: "Svetlana Shinkar"})
})

app.get('/weather', (req, res) => {
    // console.log(rec.query)
    //return to stop function execution
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
    // = {}   ---- in case of the input error we can't get lat, long and accordingly cannot destructed "undefined")
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({error: error})
          }

        forecast(latitude, longitude, (error, forecastData) => {
          if(error) {
            return res.send({error: error})
          }
          res.send({forecast: forecastData, location, address: req.query.address })

        })
      })
})
app.get('/help/*', (req, res) => {
    res.render('404', {error:"Article not found", title: "Error", name: "Svetlana Shinkar" })
})
app.get('*', (reg, res, next) => {
    res.render("404", {error: "My custom 404 page", title: "Error", name: "Svetlana Shinkar" })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
})

// app.get('/products', (req, res) => {
//     if (!req.query.search) {
//         return res.send({
//             error: 'You must provide a search term'
//         })
//     }

//     console.log(req.query.search)
//     res.send({
//         products: []
//     })
// })
