
firebase.auth().onAuthStateChanged(async function(user) {

let queryString = new URLSearchParams(document.location.search)
let tripId = queryString.get('tripId')
console.log(tripId)

let db = firebase.firestore()

  if (user) {
    // Signed in
    console.log('signed in')
    let db = firebase.firestore()


    // Ensure the signed-in user is in the users collection
    db.collection('users').doc(user.uid).set({
      name: user.displayName,
      email: user.email
    })

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
       // console.log('home clicked')
        document.location.href = 'homepage.html'
        })

    //title
    let querySnapshot = await db.collection('trips').get()
    let trips = querySnapshot.docs
    //console.log(trips)
    for (let i=0; i< trips.length; i++){
        let tripIds = trips[i].id
        //console.log(tripIds)
        let trip = trips[i].data()
        //console.log(trip)
        let tripLocation = trip.location
        //console.log(tripLocation)
        //checking for trip id that matches get parameter
        if (tripIds == tripId) {
            var tripLocationOfficial = trip.location
            document.querySelector('.title').insertAdjacentHTML('beforeEnd',
            `<div> Hot Spots - ${tripLocationOfficial} </div>`)

        }
    }

    // Listen for the form submit and create/render the new post
    document.querySelector('form').addEventListener('submit', async function(event) {
      event.preventDefault()
      let activityName = document.querySelector('#activityName').value
      let activityImage = document.querySelector('#image-url').value
      let activityTripId = tripId
      let activityNumberOfLikes = 0
      let docRef = await db.collection('activity').add({ 
        activityName: activityName,
        activityImage: activityImage, 
        activityTripId: activityTripId,
      })
      let activityId = docRef.id // the newly created document's ID
      document.querySelector('#activityName').value = '' 
      document.querySelector('#image-url').value = '' // clear the image url field
      renderPost(activityId, activityName, activityImage, activityNumberOfLikes)
    })


    //show all activities
    let response = await fetch(`http://localhost:8888/.netlify/functions/activity?tripId=${tripId}`)
    let activity = await response.json()
   
    for (let i=0; i<activity.length; i++) {
        let activities = activity[i]
        let activityId = activities.activityId
        let activityName = activities.activityName
        let activityImage = activities.activityImage

      let querySnapshot3 = await db.collection('likes').where('activityId', '==', activityId).get()
      console.log(querySnapshot3.size)
      let activityNumberOfLikes = querySnapshot3.size
      renderPost(activityId, activityName, activityImage, activityNumberOfLikes)
    }

    async function renderPost(activityId, activityName, activityImage, activityNumberOfLikes) {
        document.querySelector('.activity').insertAdjacentHTML('beforeend', `
          <div class="activity-${activityId} md:mt-16 mt-8 space-y-8">
            <div class="md:mx-0 mx-4">
              <span class="font-bold text-xl">${activityName}</span>
            </div>
        
            <div>
              <img src="${activityImage}" class="w-full">
            </div>
        
            <div class="text-3xl md:mx-0 mx-4">
              <button class="like-button">❤️</button>
              <span class="likes">${activityNumberOfLikes}</span>
            </div>
          </div>
        `)
        document.querySelector(`.activity-${activityId} .like-button`).addEventListener('click', async function(event) {
          event.preventDefault()
          console.log(`activity ${activityId} like button clicked!`)
          let currentUserId = firebase.auth().currentUser.uid
      
          let querySnapshot = await db.collection('likes')
            .where('activityId', '==', activityId)
            .where('userId', '==', currentUserId)
            .get()
      
          if (querySnapshot.size == 0) {
            await db.collection('likes').add({
              activityId: activityId,
              userId: currentUserId
            })
            let existingNumberOfLikes = document.querySelector(`.activity-${activityId} .likes`).innerHTML
            let newNumberOfLikes = parseInt(existingNumberOfLikes) + 1
            document.querySelector(`.activity-${activityId} .likes`).innerHTML = newNumberOfLikes
          }
          
        })
      
      }
      



    // 🔥 LAB ENDS HERE 🔥

  } else {
    // Signed out
    console.log('signed out')

    // Hide the form when signed-out
    document.querySelector('form').classList.add('hidden')

    // Initializes FirebaseUI Auth
    let ui = new firebaseui.auth.AuthUI(firebase.auth())

    // FirebaseUI configuration
    let authUIConfig = {
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
      signInSuccessUrl: 'kelloggram.html'
    }

    // Starts FirebaseUI Auth
    ui.start('.sign-in-or-sign-out', authUIConfig)
  }




})
