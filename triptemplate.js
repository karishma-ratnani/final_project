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
    
// list of accommodations

// let querySnapshot = await db.collection('accommodations').get()
// console.log(`Number to accommodations in collection: ${querySnapshot.size}`)

// let accommodations = querySnapshot.docs
// for (let i=0; i< accommodations.length; i++){
//     let accommodationsId = accommodation[i].id
//     let accommodation =accommodations[i].data()
//     let accommodationsName = accommodation.Name
//     // console.log(accommodationsName)

//     document.querySelector('.accommodations').insertAdjacentHTML('beforeEnd',
//     `<div class="accommodations-${accommodationsId} p-4 border rounded-xl text-xl w-1/3 text-center hover:bg-purple-600 text-white">
//     ${accommodationsName}
//   </div>`)

// }
}
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

