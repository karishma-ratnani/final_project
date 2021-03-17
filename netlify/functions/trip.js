let firebase = require('./firebase')

exports.handler = async function(event) {
  let tripsData = []

    let db = firebase.firestore()
    let querySnapshot = await db.collection('trips').get()
    console.log(`Number of trips: ${querySnapshot.size}`)


    let trips = querySnapshot.docs
    for (let i=0; i < trips.length; i++) {
      let tripId = trips[i].id
      let trip = trips[i].data()
      console.log(tripId)
      console.log(trip.location)

      tripsData.push({
        tripId: tripId,
        location: trip.location
      })


    }


  return {
    statusCode: 200,
    body: JSON.stringify(tripsData)
  }
}