
firebase.auth().onAuthStateChanged(async function(user) {

    let queryString = new URLSearchParams(document.location.search)
    let tripId = queryString.get('tripId')
    console.log(tripId)

    if (user) {
      // Signed in
        let db = firebase.firestore()
        
        
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

    

        let querySnapshot = await db.collection('trips').get()
        let trips = querySnapshot.docs
        console.log(trips)
        for (let i=0; i< trips.length; i++){
            let tripIds = trips[i].id
            console.log(tripIds)
            let trip = trips[i].data()
            console.log(trip)
            let tripName = trip.name
            //checking for trip id that matches get parameter
            if (tripIds == tripId) {
                var tripNameOfficial = trip.name
                document.querySelector('.triptitle').insertAdjacentHTML('beforeEnd',
        `<div> ${tripNameOfficial} </div>`)
            }
            
        }

      let querySnapshot2 = await db.collection('activity').where('activityTripId','==',tripId).get()
      console.log(`Number of activities in collection: ${querySnapshot2.size}`)

       let activity = querySnapshot2.docs
       for (let i=0; i< activity.length; i++){
           let activityId = activity[i].id
           let activities = activity[i].data()
           let activityName = activities.name

           document.querySelector('.activityinfo').insertAdjacentHTML('beforeEnd', 
        `<div> ${activityName} </div>`)
          
          }
           

          document.querySelector('.addActivity').insertAdjacentHTML('beforeEnd',
            `<a href="file:///Users/karishmaratnani/Code/final_project//activity.html?tripId=${tripId}">Add Activity</a>`)
            
    

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



