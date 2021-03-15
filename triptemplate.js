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
      document.querySelector('.sign-in-or-sign-out').innerHTML = `
          <button class="text-pink-500 underline sign-out">Sign Out</button>
      `
      
      document.querySelector('.sign-out').addEventListener('click', function(event) {
          console.log('sign out clicked')
          firebase.auth().signOut()
          document.location.href = 'homepage.html'
          })
  
          //Homepage button
          document.querySelector('.homepage').innerHTML = `
          <button class="text-pink-500 underline homepage">Home</button>
      `
      
      document.querySelector('.homepage').addEventListener('click', function(event) {
          console.log('home clicked')
          document.location.href = 'homepage.html'
          })
 
          //option to create new accommodation 

document.querySelector('.button').addEventListener('click', async function(event) {
  event.preventDefault()
  console.log('Button clicked')
window.location = "accommodation.html"
})

          // // list of accommodations
         
let querySnapshot = await db.collection('accommodations').get()
await db.collection(`votes`).add({votes: 0 })
        console.log(`Number to todos in collection: ${querySnapshot.size}`)

        let accommodations = querySnapshot.docs
        for (let i=0; i< accommodations.length; i++){
            let accommodationsId = accommodations[i].id
            let accommodation = accommodations[i].data()
            let accommodationName = accommodation.name

  
  
            document.querySelector('.accommodations').insertAdjacentHTML('beforeEnd',
            `<div class="accommodations-${accommodationsId} py-4 text-xl border-b-2 border-purple-500 w-full">${accommodationName} 
            <a href="#" button class="votes p-2 text-sm bg-blue-500 text-white">👍</a><span class= "votes">${accommodation.votes}</span>
            </div>`)
  

        let votes = document.querySelector(`.accommodations-${accommodationsId} .votes`)
        votes.addEventListener('click', async function(event) {
          event.preventDefault()
          // console.log(`accommodations ${accommodationId} like button clicked!`)
          let currentUserId = firebase.auth().currentUser.uid
        
        let response = await fetch('http://localhost:8888/.netlify/functions/votes', {
          method: 'VOTES',
          body: JSON.stringify({
            accommodationsId: accommodationsId,
            userId: currentUserId
          })
        })

        if (response.ok) {
          let existingNumberofVotes = document.querySelector(`.accommodations-${accommodationsId} .votes`).innerHTML
          let newNumberofVotes = parseInt(existingNumberofVotes) + 1
          document.querySelector(`.accommodations-${accommodationsId} .votes`).innerHTML = newNumberofVotes
        }
      })
    }
  }
    // })

  
else {
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