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
      document.querySelector('.sign-out').innerHTML = `
        <button class="text-pink-500 underline sign-out">Sign Out</button>`
    
      document.querySelector('.sign-out').addEventListener('click', function(event) {
        console.log('sign out clicked')
        firebase.auth().signOut()
        document.location.href = 'homepage.html'
        })

        //homepage button
      document.querySelector('.homepage').innerHTML = `
        <button class="text-pink-500 underline homepage">Home</button>`
    
      document.querySelector('.homepage').addEventListener('click', function(event) {
        console.log('home clicked')
        document.location.href = 'homepage.html'
        })


        //create trip button
      document.querySelector('.button').addEventListener('click', async function(event) {
        event.preventDefault()
        console.log('Button clicked')
  
        // let tripName = document.querySelector('#tripname').value
        let tripLocation = document.querySelector('#triplocation').value

        if (tripLocation.length > 0) {
          
          let docRef = await db.collection('trips').add({
            // name: tripName,
            location: tripLocation
            })
  
          let tripId = docRef.id
          console.log(`new destination with ID ${tripId} created`)
        
          window.location = "homepage.html"
        }
    
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
  