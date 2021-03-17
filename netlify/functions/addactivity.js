let firebase = require('./firebase')

exports.handler = async function(event) {

let db = firebase.firestore()
console.log(event.body)
let body = JSON.parse(event.body)
let activityName = body.activityName
let activityImage = body.activityImage
let activityTripId = body.activityTripId

let newActivity = {
    activityName: activityName,
    activityImage: activityImage,
    activityTripId: activityTripId

}

let docRef = await db.collection('activity').add(newActivity)

newActivity.activityId = docRef.id
newActivity.activityNumberOfLikes = 0


return {
        statusCode: 200,
        body: JSON.stringify(newActivity)
      }
 }
  
  