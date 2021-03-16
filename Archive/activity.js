
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


        //homepage button
        document.querySelector('.homepage').innerHTML = `
        <button class="text-pink-500 underline homepage">Home</button>`
  
        document.querySelector('.homepage').addEventListener('click', function(event) {
            console.log('home clicked')
            document.location.href = 'homepage.html'
        })
      
        document.querySelector(`.submitActivity`).addEventListener('click', async function(event) {
        event.preventDefault()
        let activityName = document.querySelector('#activityName').value
        let activityImage = document.querySelector('#image-url').value
        let activityTripId = tripId
        console.log(tripId)
            
        
            if (activityName.length > 0) {
                    
                let docRef = await db.collection('activity').add({
                name: activityName,
                activityImage: activityImage,
                activityTripId: activityTripId

                })
            
                let activityId = docRef.id
                console.log(`new activity with ID ${activityId} created`)
                    
                window.location = "homepage.html"
            }

        })
            
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
            