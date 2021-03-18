
firebase.auth().onAuthStateChanged(async function(user) {

let queryString = new URLSearchParams(document.location.search)
let tripId = queryString.get('tripId')
console.log(tripId)

let db = firebase.firestore()

  if (user) {
    // // Signed in
    // console.log('signed in')
    // let db = firebase.firestore()


    // // Ensure the signed-in user is in the users collection
    // db.collection('users').doc(user.uid).set({
    //   name: user.displayName,
    //   email: user.email
    // })

    document.querySelector('.sign-out').innerHTML = `
        <button class="text-blue-500 underline sign-out">Sign Out</button>`
    
      document.querySelector('.sign-out').addEventListener('click', function(event) {
        console.log('sign out clicked')
        firebase.auth().signOut()
        document.location.href = 'index.html'
        })

        //homepage button
      document.querySelector('.homepage').innerHTML = `
        <button class="text-blue-500 underline homepage">Home</button>`
    
      document.querySelector('.homepage').addEventListener('click', function(event) {
       // console.log('home clicked')
        document.location.href = 'index.html'
        })

    //title
    let response = await fetch(`/.netlify/functions/trip`)
    let trips = await response.json()
    for (let i=0; i< trips.length; i++){
        let trip = trips[i]
        let tripIds = trip.tripId
        let tripLocation = trips.location
        if (tripIds == tripId) {
            var tripLocationOfficial = trip.location
            document.querySelector('.title').insertAdjacentHTML('beforeEnd',
            `<div class= " w-full bg-yellow-100 text-center text-blue-500 font-bold text-6xl py-3"> ${tripLocationOfficial} </div>`)

        }
    }

    // Listen for the form submit and create/render the new post
    document.querySelector('form').addEventListener('submit', async function(event) {
      event.preventDefault()
      let Name = document.querySelector('#activityName').value
      let Image = document.querySelector('#image-url').value
      let activityTripId = tripId

      let response = await fetch (`http://localhost:8888/.netlify/functions/addactivity`, {
          method: 'POST',
          body: JSON.stringify({
          activityName: Name,
          activityImage: Image,
          activityTripId: activityTripId

        })
      })

      let json = await response.json()
      console.log(json)
      let activityId = json.activityId
      let activityName = json.activityName
      let activityImage = json.activityImage
      let activityNumberOfLikes = json.activityNumberOfLikes


      document.querySelector('#activityName').value = '' 
      document.querySelector('#image-url').value = '' // clear the image url field
      renderPost(activityId, activityName, activityImage, activityNumberOfLikes)
    })


    //show all activities
    let response2 = await fetch(`/.netlify/functions/activity?tripId=${tripId}`)
    let activity = await response2.json()
   
    for (let i=0; i<activity.length; i++) {
        let activities = activity[i]
        let activityId = activities.activityId
        let activityName = activities.activityName
        let activityImage = activities.activityImage

        let response = await fetch(`.netlify/functions/likes?activityId=${activityId}`)
        let likes = await response.json()
            let activityNumberOfLikes = likes.length
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
      
          let response = await fetch (`/.netlify/functions/addlikes`, {
            method: 'POST',
            body: JSON.stringify({
              activityId: activityId,
              userId: currentUserId
            })
          })

          let json = await response.json()
          console.log(json)

            if (response.ok){
            let existingNumberOfLikes = document.querySelector(`.activity-${activityId} .likes`).innerHTML
            let newNumberOfLikes = parseInt(existingNumberOfLikes) + 1
            document.querySelector(`.activity-${activityId} .likes`).innerHTML = newNumberOfLikes
            }
          })
      
      }
      


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
