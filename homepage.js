firebase.auth().onAuthStateChanged(async function(user) {
    if (user) {
      // Signed in
        let db = firebase.firestore()
        
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


      console.log('signed in')

        // will need to add what user sees when they are logged in - 
            // list of created trips and option to create new trip 
            // sign out button 

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
        signInSuccessUrl: 'homepage.html'
      }
  
      // Starts FirebaseUI Auth
      ui.start('.sign-in-or-sign-out', authUIConfig)
    }
  })
  