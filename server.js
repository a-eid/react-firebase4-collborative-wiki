const express = require('express') 
const path = require('path')
const app = express() 
const usersRouter = require('./usersApi')


const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')


app.set('view engine' , 'pug') 
app.use(express.static(path.join(__dirname , 'public'))) 
app.locals.pretty = true 


app.use(bodyParser.json())
app.use(cookieParser())
app.use(expressSession({
  resave: false,
  saveUninitialized: true,
  secret: "as;dflkjaewirpqoweijasl;dfklsdaghlki3o4jklasdjf8923ujkasdf"
}))


app.use('/api' , usersRouter)
app.get('*' , (req , res) => {
  res.render('index' , {
    user: JSON.stringify(req.session.user || null)
  })
})

app.listen(3000 , () => {
  console.log('server running on port 3000')
})