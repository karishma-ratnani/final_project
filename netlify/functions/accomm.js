let firebase = require('./firebase')

exports.handler = async function(event) {
  let db = firebase.firestore()                             
                                    
  let accommodationsQuery = await db.collection('accommodations').orderBy('created').get()
  let accommodations = accommodationsQuery.docs                             
  
  // loop through the post documents
  for (let i=0; i<accommodations.length; i++) {
    let accommodationsId = accommodations[i].id                                
    let accommodationsData = accommodations[i].data()                          
    let votesQuery = await db.collection('votes').where('accommodationsId', '==', accommodationsId).get()
    
    // add a new Object of our own creation to the postsData Array
    postsData.push({
      id: accommodationsId,                                                                    
      username: accommodationsData.username,                          
      votes: votesQuery.size                                                           
    })
  }
  
  // return an Object in the format that a Netlify lambda function expects
  return {
    statusCode: 200,
    body: JSON.stringify(postsData)
  }
}