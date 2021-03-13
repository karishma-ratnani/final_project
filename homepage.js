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


         //option to create new trip 
           

        // list of created trips

        let querySnapshot = await db.collection('trips').get()
        console.log(`Number to todos in collection: ${querySnapshot.size}`)

        let trips = querySnapshot.docs
        for (let i=0; i< trips.length; i++){
            let tripId = trips[i].id
            let trip = trips[i].data()
            let tripName = trip.name
            //console.log(tripName)



            document.querySelector('.trips').insertAdjacentHTML('beforeEnd',
            `<div class="todo-${tripId} py-4 text-xl border-b-2 border-purple-500 w-full">
            <a href="#" class="done p-2 text-sm bg-green-500 text-white">✓</a>
            ${tripName}
          </div>`)

        }

        
            
         

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
  