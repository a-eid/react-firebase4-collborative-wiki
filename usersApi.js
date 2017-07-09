const crypto = require('crypto')
const firebase = require('firebase')
const router = require('express').Router()



var config = {
  apiKey: "AIzaSyCSw6OGWdIg_vlYv0_vHKmT7lYRkSGCi6U",
  authDomain: "wicker-61c81.firebaseapp.com",
  databaseURL: "https://wicker-61c81.firebaseio.com"
};

firebase.initializeApp(config);
var fb = firebase.database().ref();

const hash = (password) => {
  return crypto.createHash('sha512').update(password).digest('hex')
}

const getUP = body => [body.username || null, body.password || null]

const users = fb.child('users')
users.child("x").once('value', s => console.log(s.exists()))

router.post('/signup', (req, res) => {
  const [username, password] = getUP(req.body)
  if (!username || !password) return res.json({ signedIn: false, message: "no username or password" })

  users.child(username).once('value', snapshot => {
    if (snapshot.exists()) return res.json({ signedIn: false, message: "username already in use" })
    var userObj = {
      username: username,
      passwordHash: hash(password)
    }

    users.child(username).set(userObj)
    req.session.user = userObj
    res.json({
      signedIn: true,
      user: userObj
    })
  })
})


router.post('/signin', (req, res) => {
  const [username, password] = getUP(req.body)
  if (!username || !password) return res.json({ signedIn: false, message: "no username or password" })
  users.child(username).once('value', snapshot => {
    if (!snapshot.exists() || snapshot.val().passwordHash !== hash(password))
      return res.json({ signedIn: false, message: "invalid username or password" })

    let user = snapshot.exportVal()
    req.session.user = user
    res.json({
      signedIn: true,
      user: user
    })
  })
})


router.post('/signout', (req, res) => {
  delete req.session.user
  res.json({
    signedIn: false,
    message: "you have been signed out"
  })
})


module.exports = router
