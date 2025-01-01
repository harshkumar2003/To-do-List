const firebaseConfig = {
  apiKey: "AIzaSyCQj6gUOSXt6idIzybyqqUJRw9jE4CklN8",
  authDomain: "to-do-list-6e94e.firebaseapp.com",
  projectId: "to-do-list-6e94e",
  storageBucket: "to-do-list-6e94e.firebasestorage.app",
  messagingSenderId: "346598245710",
  appId: "1:346598245710:web:c35d89ece501cd5e7e4a1f",
  measurementId: "G-ELS47MREFJ",
};

const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth(app);
const db = firebase.firestore();
const errorDiv = document.getElementById('error');

function signUp()
{
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    auth.createUserWithEmailAndPassword(email,password).then((userCredential)=>{
        showToast("Sign Up successful!", "success");

        const user = userCredential.user;
        window.location.href ="home.html";
    })
    .catch((error) => {
        showToast(error.message, "error"); // Show error toast
      });
}

function signIn()
{
    const email = document.getElementById('l-email').value;
    const password = document.getElementById('l-password').value;

    auth.signInWithEmailAndPassword(email,password).then((userCredential)=>
    {
        showToast("Login successful!", "success");
        const user = userCredential.user;
        window.location.href = "home.html";
    })
    .catch((error) => {
        showToast(error.message, "error"); // Show error toast
      });
}



function showToast(message, type = "error") {
    const toast = document.getElementById("toast");
    
    // Set the message and styling based on type
    toast.textContent = message;
    toast.classList.remove("hidden", "bg-green-500", "bg-red-500");
    toast.classList.add(type === "success" ? "bg-green-500" : "bg-red-500");
  
    // Show toast and auto-hide after 3 seconds
    setTimeout(() => {
      toast.classList.add("hidden");
    }, 30000);
  }
  