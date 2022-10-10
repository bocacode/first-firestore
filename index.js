import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// import our credentials (serviceAccount)
import serviceAccount from './serviceAccount.js';

// connect to our firebase project using those credentials
initializeApp({
  credential: cert(serviceAccount)
});

// connect to firestore database
const db = getFirestore();

// define a new video game:
const newGame = {
  title: 'Frogger',
  rated: 'E',
  genre: 'Arcade',
  released: 1981,
}

db.collection('games').doc('s2LiGae6OdZ9puKn9aq2').set(newGame)

// create a doc inside a collection
db.collection('games').add(newGame)
  // if ok, console log the doc id
  .then(doc => console.log('Game created: ', doc.id))
  // if not, console the error
  .catch(console.error)
  // .catch(err => console.error(err))

// get all games
db.collection('games').get()
  // reshape the collection
  .then(collection => {
    collection.docs.forEach(doc => {
      console.log(doc.id, doc.data())
    })
  })
  .catch(console.error)


db.collection('games').where('title', '==', 'Frogger').update({ released: 1982 })

db.collection('games').where('title', '==', 'Dead Island 2').delete()
