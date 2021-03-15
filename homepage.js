firebase.auth().onAuthStateChanged(async function(user) {
    if (user) {
      // Signed in
        let db = firebase.firestore()
        
        db.collection('users').doc(user.uid).set({
            name: user.displayName,
            email: user.email
        })

        //sign-out button
        document.querySelector('.sign-out').innerHTML = `
        <button class="sign-out text-pink-500 underline p-2 w-full text-right">Sign Out</button>
      `
       
      document.querySelector('.sign-out').addEventListener('click', function(event) {
        console.log('sign out clicked')
        firebase.auth().signOut()
        document.location.href = 'homepage.html'
      })



      console.log('signed in')


         //option to create new trip 

        document.querySelector('.button').addEventListener('click', async function(event) {
        event.preventDefault()
        console.log('Button clicked')
        window.location = "addtrip.html"

        })

        

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
            `<div class="trip-${tripId} p-4 border rounded-xl text-xl w-1/3 text-center bg-purple-500 hover:bg-purple-600 text-white">
            ${tripName}
          </div>`)

          document.querySelector('.trips').addEventListener('click', async function(event) {
            event.preventDefault()
            console.log('trips clicked')
            window.location = "triptemplate.html"
        })
      }
      
        

         

    } else {
      // Signed out
      console.log('signed out')
      document.querySelector('.signedin').classList.add('hidden')
      //document.querySelector('.title').classList.add('hidden')
  
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
  