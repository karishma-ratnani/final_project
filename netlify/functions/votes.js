let firebase = require('./firebase')

exports.handler = async function(event) {
  let db = firebase.firestore()
  let body = JSON.parse(event.body)
  let accommodationsId = body.accommodationsId
  let userId = body.userId
  
  let querySnapshot = await db.collection('votes').where('accommodationsId', '==', accommodationsId).where('userId', '==', userId).get()
  let numberOfVotes = querySnapshot.size

  if (numberOfVotes == 0) {
    await db.collection('votes').add({
      accommodationsId: accommodationsId,
      userId: userId
    })
    return { statusCode: 200 }
  } else {
    return { statusCode: 403 }
  }

}