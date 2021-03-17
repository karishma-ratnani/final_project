let firebase = require('./firebase')

exports.handler = async function(event) {

let db = firebase.firestore()
console.log(event.body)
let body = JSON.parse(event.body)
let location = body.tripLocation

let newTrip= {
    location:location
}

let docRef = await db.collection('trips').add(newTrip)

newTrip.tripId = docRef.id


return {
        statusCode: 200,
        body: JSON.stringify(newTrip)
      }
 }
  