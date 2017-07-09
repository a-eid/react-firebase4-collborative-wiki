const post = (url, body = {}) => fetch(url, {
  method: 'POST',
  credentials: 'include',
  body: JSON.stringify(body),
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
}).then(res => res.json())

export const signIn = (username, password) => post('/api/signin', { username, password })
export const signUp = (username, password) => post('/api/signup', { username, password })
export const signOut = () => post('api/signout')

export const pages = firebase.database().ref('/pages') 
