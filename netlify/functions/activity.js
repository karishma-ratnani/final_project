let firebase = require('./firebase')

exports.handler = async function(event) {

let queryStringTripId = event.queryStringParameters.tripId
console.log(queryStringTripId)
let activityData = []

  let db = firebase.firestore()
  let querySnapshot = await db.collection('activity').where('activityTripId','==',queryStringTripId).get()
  console.log(`Number of activities: ${querySnapshot.size}`)

  let activity = querySnapshot.docs
  for (let i=0; i < activity.length; i++) {
    let activityId = activity[i].id
    let act = activity[i].data()


    activityData.push({
      activityId: activityId,
      activityImage: act.activityImage,
      activityName: act.activityName,
      activityTripId: act.activityTripId
      
      
    })


  }


  return {
    statusCode: 200,
    body: JSON.stringify(activityData)
  }
}