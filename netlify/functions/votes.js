let firebase = require('./firebase')

exports.handler = async function(event) {
  let db = firebase.firestore()
  let body = JSON.parse(event.body)
  let accommodationId = body.accommodationsId
  let userId = body.userId
  
//   console.log(`post: ${postId}`)
//   console.log(`user: ${userId}`)

  let querySnapshot = await db.collection('votes').where('accommodationId', '==', accommodationId).where('userId', '==', userId).get()
  let numberofVotes = querySnapshot.size

  if (nuberofVotes == 0) {
    await db.collection('votes').add({
      accommodationId: accommodationId,
      userId: userId
    })
    return { statusCode: 200 }
  } else {
    return { statusCode: 403 }
  }

}