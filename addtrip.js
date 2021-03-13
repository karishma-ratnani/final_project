firebase.auth().onAuthStateChanged(async function(user) {
    if (user) {
      // Signed in
      let db = firebase.firestore()
      console.log('signed in')

      document.querySelector('button').addEventListener('click', async function(event) {
        event.preventDefault()
        console.log('Button clicked')
  
        let tripName = document.querySelector('#tripname').value
        let tripLocation = document.querySelector('#triplocation').value

        if (tripName.length > 0) {
          
          let docRef = await db.collection('trips').add({
            name: tripName,
            location: tripLocation
          })
  
          let tripId = docRef.id
          console.log(`new todo with ID ${tripId} created`)}

          window.location = "homepage.html"


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
  