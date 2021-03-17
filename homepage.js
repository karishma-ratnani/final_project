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
        <button class="sign-out text-pink-500 underline p-2 w-full text-right">Sign Out</button>`
       
        document.querySelector('.sign-out').addEventListener('click', function(event) {
          console.log('sign out clicked')
          firebase.auth().signOut()
          document.location.href = 'homepage.html'
         })


         //option to create new trip 

        document.querySelector('.button').addEventListener('click', async function(event) {
          event.preventDefault()
          console.log('Button clicked')
          window.location = "addtrip.html"
        })

      
        // list of created trips

        let response = await fetch(`http://localhost:8888/.netlify/functions/trip`)
        let trips = await response.json()

        for (let i=0; i< trips.length; i++){
            let trip = trips[i]
            let tripId = trip.tripId
            let tripLocation = trip.location
      
            document.querySelector('.trips').insertAdjacentHTML('beforeEnd',
            `
            <a href="tripdetails.html?tripId=${tripId}"><span class="font-bold text-3xl px-24 border border-gray-400 rounded bg-red-300"</span>${tripLocation}</a>
            `)
            
        }

    } else {
      // Signed out

      console.log('signed out')
      document.querySelector('.signedin').classList.add('hidden')

  
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
  