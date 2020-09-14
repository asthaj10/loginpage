if(process.env.NODE_ENV!== 'production'){
	require('dotenv').config
}
var i
const express = require('express')
const app = express()
const bcrypt =  require('bcrypt')
const passport= require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const router = express.Router()
const environment = process.env.NODE_ENV
const initializePassport = require('./passport.config')
initializePassport(passport, (uname=> 
	users.find(user => users.uname === uname)),
	(id => users.find(user => user.id === id)
))
const users= []

app.set('view-engine','ejs')
app.use(express.urlencoded({ extended: false}))
app.use(flash( ))
app.use(session({
	secret: 'anything',
	resave: false,
	saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session({secret:'anything'}))
app.use(methodOverride('_method'))


app.get('/',function(req,res) {
  res.render('signup.ejs')
})

app.get('/login',function(req,res) {
  res.render('login.ejs')
})

app.get('stories.html', checkAuthenticated,(req, res) => {
	res.sendFile('stories.html', {name:req.user.name})
})

app.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('login.ejs')
})

app.post ('/login', checkNotAuthenticated, passport.authenticate('local',{
	successRedirect: 'stories.html',
	failureRedirect: '/login',
	failureFlash: true,
}))



app.get('/signup', checkNotAuthenticated, (req, res) => {
	res.render('signup.ejs')
})

app.post('/signup', async (req,res) => {
	try{
		const hashedPassword = await bcrypt.hash(req.body.psw, 10)
		for (i = 0; i < 10000; i++){
		users.push({
			id: Date.now().toString(),
			name: req.body.name,
			email: req.body.emailid,
			uname: req.body.uname,
			password: hashedPassword

		})}
		res.redirect('/login')
	}catch{
		res.redirect('/signup')
	}
})

app.delete('/logout', (req, res) => {
})

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
	return next()
  }

  res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
	return res.redirect('stories.html')
  }
  next()
}


app.listen(3000)
