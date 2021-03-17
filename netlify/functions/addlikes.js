let firebase = require('./firebase')

exports.handler = async function(event) {

let db = firebase.firestore()
let body = JSON.parse(event.body)
let activityId = body.activityId
let userId = body.userId

let querySnapshot = await db.collection('likes')
                      .where('activityId', '==', activityId)
                      .where('userId', '==', userId)
                      .get()

let numberOfLikes = querySnapshot.size
if (numberOfLikes == 0){
    await db.collection('likes').add({
        activityId: activityId,
        userId: userId
    })

    return {
        statusCode: 200,
        body: JSON.stringify({success: true})
      }
    } else {
      return {
        statusCode: 403,
        body: JSON.stringify({success: false, error: 'user already liked post'})
      }
    }
  
  }