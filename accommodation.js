firebase.auth().onAuthStateChanged(async function(user) {
  if (user) {
    // Signed in
    let db = firebase.firestore()
    console.log('signed in')


    db.collection('users').doc(user.uid).set({
      name: user.displayName,
      email: user.email
  })

      //sign-out button
  document.querySelector('.sign-in-or-sign-out').innerHTML = `
      <button class="text-pink-500 underline sign-out">Sign Out</button>
  `
  
  document.querySelector('.sign-out').addEventListener('click', function(event) {
      console.log('sign out clicked')
      firebase.auth().signOut()
      document.location.href = 'homepage.html'
      })

      //Trip Template button
      document.querySelector('.triptemplate').innerHTML = `
      <button class="text-pink-500 underline triptemplate">Back to Trip Details</button>
  `
  
  document.querySelector('.triptemplate').addEventListener('click', function(event) {
      
      document.location.href = 'triptemplate.html'
      })


      //create trip button
    document.querySelector('.button').addEventListener('click', async function(event) {
      event.preventDefault()
      console.log('Button clicked')

      let accommodationName = document.querySelector('#accommodationname').value
      let accommodationPrice = document.querySelector('#accommodationprice').value
      let accommodationWebsite = document.querySelector('#accommodationwebsite').value

let response = await fetch('http://localhost:8888/.netlify/functions/accomm', {
        method: 'POST',
        body: JSON.stringify({
          id: accommodationsId,                                                                    
      username: accommodationsData.username
          
        })
      })
   

//     let response = await fetch('http://localhost:8888/.netlify/functions/accomm')
//     let posts = await response.json()
//     for (let i=0; i<posts.length; i++) {
//       let post = posts[i]
//       renderPost(post)
//     }





//       if (accommodationName.length > 0) {
        
//         let docRef = await db.collection('accommodations').add({
//           name: accommodationName,
//           price: accommodationPrice,
//           website: accommodationWebsite
//         })
//         let accommodationsId = docRef.id
//         console.log(`new todo with ID ${accommodationsId} created`)
        
        
      
//         window.location = "triptemplate.html"
//       }

      
        
        


      })


  } else {
    // Signed out
    console.log('signed out')

    // Initializes FirebaseUI Auth
    let ui = new firebaseui.auth.AuthUI(firebase.auth())

    // FirebaseUI configuration
    let authUIConfig = {
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
      signInSuccessUrl: 'index.html'
    }

    // Starts FirebaseUI Auth
    ui.start('.sign-in-or-sign-out', authUIConfig)
  }
})
