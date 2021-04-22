// listen for auth status changes
auth.onAuthStateChanged(user => {
  if (user) {
    // db.collection('gudes').get().then(snapshot => {
      //use onSnapshot to get data in time 
    db.collection('gudes').onSnapshot(snapshot => {
      // console.log(snapshot.docs); //[Hg, Hg] 
      setupGuides(snapshot.docs); //save docs to setupGuides
      setupUI(user);
    }, 
    error => {
      console.log(error)
  })
   
    // console.log('user logged in: ', user);
  } else {
    setupUI()
    setupGuides([]) //if logout and setupguides turn null
    // console.log('user logged out');
  }
})
//for security 
// first wait user login and they just can access data
// second, clean the screen 
//third change security in firebase rule 
 
//create new guide
const createForm = document.querySelector('#create-form')
createForm.addEventListener('submit', (e) => {
  e.preventDefault()

  //we need to set security rule first to prevent user not login and they can create something
  db.collection('gudes').add({
    title: createForm['title'].value,
    content: createForm['content'].value
  }).then(()=>{
    //close the modal and reset form 
    const modal = document.querySelector('#modal-create');
    M.Modal.getInstance(modal).close();
    createForm.reset();
  }).catch(err => {
    //if they do not have permission, they will create error and we catch it to sent message
    console.log(err.message);
  })
})

// signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // get user info
  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;

  // sign up the user
  auth.createUserWithEmailAndPassword(email, password).then(cred => {
    // close the signup modal & reset form
    const modal = document.querySelector('#modal-signup');
    M.Modal.getInstance(modal).close();
    signupForm.reset();
  });
});

// logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut();
});

// login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // get user info
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;

  // log the user in
  auth.signInWithEmailAndPassword(email, password).then((cred) => {
    // close the signup modal & reset form
    const modal = document.querySelector('#modal-login');
    M.Modal.getInstance(modal).close();
    loginForm.reset();
  });

});