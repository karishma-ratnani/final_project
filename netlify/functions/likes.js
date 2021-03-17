let firebase = require('./firebase')

exports.handler = async function(event) {

let queryStringActivityId = event.queryStringParameters.activityId
console.log(queryStringActivityId)
let likeData = []

  let db = firebase.firestore()
  let querySnapshot = await db.collection('likes').where('activityId','==',queryStringActivityId).get()
  console.log(`Number of likes: ${querySnapshot.size}`)

  let likes = querySnapshot.docs
  for (let i=0; i < likes.length; i++) {
    let likesId = likes[i].id
    let likesinfo = likes[i].data()


    likeData.push({
      likesId: likesId,
      activityId: likesinfo.activityId
      
      
    })


  }


  return {
    statusCode: 200,
    body: JSON.stringify(likeData)
  }
}