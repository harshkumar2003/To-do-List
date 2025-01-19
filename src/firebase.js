// const firebaseConfig = {
//   apiKey: "AIzaSyCQj6gUOSXt6idIzybyqqUJRw9jE4CklN8",
//   authDomain: "to-do-list-6e94e.firebaseapp.com",
//   projectId: "to-do-list-6e94e",
//   storageBucket: "to-do-list-6e94e.firebasestorage.app",
//   messagingSenderId: "346598245710",
//   appId: "1:346598245710:web:c35d89ece501cd5e7e4a1f",
//   measurementId: "G-ELS47MREFJ",
// };

// // Initialize Firebase
// const app = firebase.initializeApp(firebaseConfig);
// const auth = firebase.auth(app);
// const db = firebase.firestore();

// const errorDiv = document.getElementById('error');

// // function signUp()
// // {
// //     const email = document.getElementById('email').value;
// //     const password = document.getElementById('password').value;
// //     auth.createUserWithEmailAndPassword(email,password).then((userCredential)=>{
// //         showToast("Sign Up successful!", "success");

// //         const user = userCredential.user;
// //         window.location.href ="home.html";
// //     })
// //     .catch((error) => {
// //         showToast(error.message, "error"); // Show error toast
// //       });
// // }

// function signUp() {
//   const fullName = document.getElementById('full').value; // Updated to match the correct ID
//   const email = document.getElementById('email').value;
//   const password = document.getElementById('password').value;

//   auth.createUserWithEmailAndPassword(email, password).then((userCredential) => {
//       showToast("Sign Up successful!", "success");

//       const user = userCredential.user;

//       // Store user data in Firestore
//       db.collection("users").doc(user.uid).set({
//           fullName: fullName,
//           email: email,
//           userId: user.uid
//       }).then(() => {
//           console.log("User data saved successfully!");
//           window.location.href = "home.html";
//       }).catch((error) => {
//           console.error("Error saving user data:", error);
//           showToast("Error saving user data.", "error");
//       });
//   }).catch((error) => {
//       showToast(error.message, "error"); // Show error toast
//   });
// }



// function signIn()
// {
//     const email = document.getElementById('l-email').value;
//     const password = document.getElementById('l-password').value;

//     auth.signInWithEmailAndPassword(email,password).then((userCredential)=>
//     {
//         showToast("Login successful!", "success");
//         const user = userCredential.user;
//         window.location.href = "home.html";
//     })
//     .catch((error) => {
//         showToast(error.message, "error"); // Show error toast
//       });
// }



// function showToast(message, type = "error") {
//     const toast = document.getElementById("toast");
    
//     // Set the message and styling based on type
//     toast.textContent = message;
//     toast.classList.remove("hidden", "bg-green-500", "bg-red-500");
//     toast.classList.add(type === "success" ? "bg-green-500" : "bg-red-500");
  
//     // Show toast and auto-hide after 3 seconds
//     setTimeout(() => {
//       toast.classList.add("hidden");
//     }, 30000);
//   }



//   // const app = initializeApp(firebaseConfig);
//   // const db = getFirestore(app);
//   // const auth = getAuth(app);
  
//   // Add a task to Firestore
//   async function addTask(description, date, time, isImportant = false) {
//       try {
//           const user = auth.currentUser;
  
//           if (!user) {
//               throw new Error("User is not authenticated");
//           }
  
//           const taskData = {
//               userId: user.uid,
//               description: description,
//               date: date,
//               time: time,
//               isImportant: isImportant,
//               isCompleted: false, // Default to incomplete
//               createdAt: new Date()
//           };
  
//           await addDoc(collection(db, "tasks"), taskData);
  
//           alert("Task added successfully!");
//       } catch (error) {
//           console.error("Error adding task:", error);
//           alert("Failed to add task. Please try again.");
//       }
//   }
  
//   // Attach event listener to "Add Task" button
//   const addTaskButton = document.querySelector(".bg-blue-500");
//   addTaskButton.addEventListener("click", () => {
//       const description = document.querySelector("input[placeholder='Task Description']").value;
//       const date = document.querySelector("input[type='date']").value;
//       const time = document.querySelector("input[type='time']").value;
  
//       if (!description || !date || !time) {
//           alert("Please fill in all fields!");
//           return;
//       }
  
//       addTask(description, date, time);
//   });





// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQj6gUOSXt6idIzybyqqUJRw9jE4CklN8",
  authDomain: "to-do-list-6e94e.firebaseapp.com",
  projectId: "to-do-list-6e94e",
  storageBucket: "to-do-list-6e94e.firebasestorage.app",
  messagingSenderId: "346598245710",
  appId: "1:346598245710:web:c35d89ece501cd5e7e4a1f",
  measurementId: "G-ELS47MREFJ",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth(app);
const db = firebase.firestore();
const errorDiv = document.getElementById('error');


// export { db, addDoc };

// Show Toast for Messages
function showToast(message, type = "error") {
  const toast = document.getElementById("toast");

  // Set message and styling
  toast.textContent = message;
  toast.classList.remove("hidden", "bg-green-500", "bg-red-500");
  toast.classList.add(type === "success" ? "bg-green-500" : "bg-red-500");

  // Show toast and auto-hide after 3 seconds
  setTimeout(() => {
    toast.classList.add("hidden");
  }, 3000);
}

// Sign-Up Function
function signUp() {
  const fullName = document.getElementById('full').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      // Save user data in Firestore
      db.collection("users").doc(user.uid).set({
        fullName: fullName,
        email: email,
        userId: user.uid,
      })
        .then(() => {
          showToast("Sign Up successful!", "success");
          window.location.href = "home.html";
        })
        .catch((error) => {
          console.error("Error saving user data:", error);
          showToast("Error saving user data.", "error");
        });
    })
    .catch((error) => {
      showToast(error.message, "error");
    });
}

// Sign-In Function
function signIn() {
  const email = document.getElementById('l-email').value;
  const password = document.getElementById('l-password').value;

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      showToast("Login successful!", "success");
      window.location.href = "home.html";
    })
    .catch((error) => {
      showToast(error.message, "error");
    });
}




// add

// document.addEventListener('DOMContentLoaded', () => {
//   const taskDescription = document.getElementById('taskDescription');
//   const taskDate = document.getElementById('taskDate');
//   const taskTime = document.getElementById('taskTime');
//   // const taskRepeat = document.getElementById('repeatSelect');
//   const addTaskButton = document.getElementById('addTaskButton');
  

//   if (!taskDescription || !taskDate || !taskTime  || !addTaskButton) {
//       console.error('One or more elements are missing from the DOM.');
//       return;
//   }

//   addTaskButton.addEventListener('click', () => {
//       const description = taskDescription.value.trim();
//       const date = taskDate.value;
//       const time = taskTime.value;
//       // const day = taskRepeat.value.trim();  // Ensure it's capturing selected repeat option

//       // Validation: Make sure no fields are empty
//       if (description === '' || date === '' || time === '') {
//           showToast('Please fill in all fields.');
//           console.error('Some fields are empty');
//           return;
//       }

//       // Assuming `firebase` and `db` are initialized in another file or before this script
//       const userId = firebase.auth().currentUser?.uid;

//       if (!userId) {
//           showToast('User is not authenticated. Please log in.');
//           return;
//       }

//       db.collection('tasks').add({
//           description: description,
//           date: date,
//           time: time,
//           userId: userId,
//           // day: day,  // Storing the repeat option in Firestore
//           createdAt: new Date(),  // Use current timestamp
//       })
//       .then(() => {
//           showToast('Task added successfully!','success');
//           // Clear input fields
//           taskDescription.value = '';
//           taskDate.value = '';
//           taskTime.value = '';
//           // taskRepeat.value = '';  // Clear repeat option
//       })
//       .catch((error) => {
//           console.error('Firestore error:', error);
//           showToast('Error adding task: ' + error.message);
//       });
//   });

//   console.log('taskDescription:', taskDescription);
//   console.log('taskDate:', taskDate);
//   console.log('taskTime:', taskTime);
//   console.log('addTaskButton:', addTaskButton);
//   // console.log('taskRepeat:', taskRepeat);
// });


document.addEventListener('DOMContentLoaded', () => {
  const taskDescription = document.getElementById('taskDescription');
  const taskDate = document.getElementById('taskDate');
  const taskTime = document.getElementById('taskTime');
  const addTaskButton = document.getElementById('addTaskButton');
  const taskRepeat = document.getElementById('repeatSelect');  // Correct the reference

  if (!taskDescription || !taskDate || !taskTime || !addTaskButton || !taskRepeat) {
      console.error('One or more elements are missing from the DOM.');
      return;
  }

  const selectedDays = {};

  addTaskButton.addEventListener('click', () => {
      const description = taskDescription.value.trim();
      const date = taskDate.value;
      const time = taskTime.value;

      if (description === '' || date === '' || time === '') {
          showToast('Please fill in all fields.');
          console.error('Some fields are empty');
          return;
      }

      const userId = firebase.auth().currentUser?.uid;

      if (!userId) {
          showToast('User is not authenticated. Please log in.');
          return;
      }

      const dayOption = taskRepeat ? taskRepeat.value.trim() : 'no';  // Ensure it's properly referencing the select element
      const selectedDate = new Date(date).toLocaleDateString();

      if (dayOption === 'yes' && selectedDays[selectedDate]) {
          showToast('You have already added a task for this day.');
          console.error('Task already exists for this day');
          return;
      }

      db.collection('tasks').add({
          description: description,
          date: date,
          time: time,
          userId: userId,
          day: dayOption,
          createdAt: new Date(),
      })
      .then(() => {
          showToast('Task added successfully!','success');

          taskDescription.value = '';
          taskDate.value = '';
          taskTime.value = '';
          if (taskRepeat) taskRepeat.value = '';  // Clear repeat option

          if (dayOption === 'yes') {
              selectedDays[selectedDate] = true;
          }
      })
      .catch((error) => {
          console.error('Firestore error:', error);
          showToast('Error adding task: ' + error.message);
      });
  });

  console.log('taskDescription:', taskDescription);
  console.log('taskDate:', taskDate);
  console.log('taskTime:', taskTime);
  console.log('addTaskButton:', addTaskButton);
});


function logout() {
  firebase.auth().signOut()
    .then(() => {
      showToast('User logged out');
      // Optionally, redirect to login page
      window.location.href = "login.html";  // Adjust the URL to your login page
    })
    .catch((error) => {
      showToastr('Error logging out:', error);
    });
}

const checkAuth = () => {
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        resolve(user);
      } else {
        reject(new Error('User is not authenticated.'));
      }
    });
  });
};


// document.addEventListener('DOMContentLoaded', async()=>{
//   const showToday = document.getElementById('showToday');
//   if(!showToday)
//   {
//     console.error('The element #showToday is missing from the DOM.');
//     return;
//   }
//   try
//   {
//     const user = await checkAuth();
//     const userId = user.uid;
//     console.log('User id',userId);
  
//   const todayDate = new Date().toISOString().split('T')[0];
//   const querySnapshot = await db.collection('tasks')
//     .where('userId', '==', userId)
//     .where('date','==',todayDate)
//     .get();
//   if(querySnapshot.empty)
//   {
//     // showToday.innerHTML = '<p>No Task,</p>';
//     return;
//   }
//   showToday.innerHTML = ' ';

//   querySnapshot.forEach(doc => {
//     const task = doc.data();
//     console.log('Task',task);

//       const taskElement = document.createElement('div');
//         taskElement.classList.add('bg-white', 'p-4', 'mb-3', 'rounded-lg', 'shadow-md');
  
//         const taskDescription = document.createElement('h3');
//         taskDescription.classList.add('text-lg', 'font-semibold', 'text-gray-800');
//         taskDescription.textContent = task.description;
  
//         const taskTime = document.createElement('p');
//         taskTime.classList.add('text-gray-600', 'mb-2');
//         taskTime.textContent = `${task.time} | ${task.date}`;
  
//         taskElement.appendChild(taskDescription);
//         taskElement.appendChild(taskTime);
  
//         showToday.appendChild(taskElement);
    
//   });
// }
// catch(error)
// {
//   showToast("Error loading the task");
// }

// });


document.addEventListener('DOMContentLoaded', async()=>{
  const showTom = document.getElementById('showTom');
  if(!showTom)
  {
    console.error('The element #showToday is missing from the DOM.');
    return;
  }
  try
  {
    const user = await checkAuth();
    const userId = user.uid;
    console.log('User id',userId);
  
  // const todayDate = new Date().toISOString().split('T')[0];


  const today = new Date();
  const nextDate = new Date(today);
  nextDate.setDate(today.getDate() + 1); // Add 1 day
  const nextDateString = nextDate.toISOString().split('T')[0];
  const querySnapshot = await db.collection('tasks')
  
    .where('userId', '==', userId)
    .where('date','==',nextDateString)
    .get();
  if(querySnapshot.empty)
  {
    showTom.innerHTML = '<p>No Task,</p>';
    return;
  }
  showTom.innerHTML = ' ';

  querySnapshot.forEach(doc => {
    const task = doc.data();
    console.log('Task',task);

      const taskElement = document.createElement('div');
        taskElement.classList.add('bg-white', 'p-4', 'mb-3', 'rounded-lg', 'shadow-md');
  
        const taskDescription = document.createElement('h3');
        taskDescription.classList.add('text-lg', 'font-semibold', 'text-gray-800');
        taskDescription.textContent = task.description;
  
        const taskTime = document.createElement('p');
        taskTime.classList.add('text-gray-600', 'mb-2');
        taskTime.textContent = `${task.time} | ${task.date}`;
  
        taskElement.appendChild(taskDescription);
        taskElement.appendChild(taskTime);
  
        showTom.appendChild(taskElement);
    
  });
}
catch(error)
{
  showToast("Error loading the task");
}

});

document.addEventListener('DOMContentLoaded', async()=>{
  const show7 = document.getElementById('show7');
  if(!show7)
  {
    console.error('The element #showToday is missing from the DOM.');
    return;
  }
  try
  {
    const user = await checkAuth();
    const userId = user.uid;
    console.log('User id',userId);
  
  // const todayDate = new Date().toISOString().split('T')[0];


  const today = new Date();
  const nextDate = new Date(today);
  nextDate.setDate(today.getDate() + 6); // Add 1 day
  const nextDateString = nextDate.toISOString().split('T')[0];
  const querySnapshot = await db.collection('tasks')
  
    .where('userId', '==', userId)
    .where('date','==',nextDateString)
    .get();
  if(querySnapshot.empty)
  {
    show7.innerHTML = '<p>No Task,</p>';
    return;
  }
  show7.innerHTML = ' ';

  querySnapshot.forEach(doc => {
    const task = doc.data();
    console.log('Task',task);

      const taskElement = document.createElement('div');
        taskElement.classList.add('bg-white', 'p-4', 'mb-3', 'rounded-lg', 'shadow-md');
  
        const taskDescription = document.createElement('h3');
        taskDescription.classList.add('text-lg', 'font-semibold', 'text-gray-800');
        taskDescription.textContent = task.description;
  
        const taskTime = document.createElement('p');
        taskTime.classList.add('text-gray-600', 'mb-2');
        taskTime.textContent = `${task.time} | ${task.date}`;
  
        taskElement.appendChild(taskDescription);
        taskElement.appendChild(taskTime);
  
        show7.appendChild(taskElement);
    
  });
}
catch(error)
{
  showToast("Error loading the task");
}

});






// document.addEventListener('DOMContentLoaded', async()=>{
//   const next7 = document.getElementById('next7');
//   if(!next7)
//   {
//     console.error('The element #showToday is missing from the DOM.');
//     return;
//   }
//   try
//   {
//     const user = await checkAuth();
//     const userId = user.uid;
//     console.log('User id',userId);

//     const today = new Date(); // Get the current date
//     const nextDate = new Date(); 
//     nextDate.setDate(today.getDate() + 6); // Calculate the 7th day from today
    
//     const startDate = today.toISOString().split('T')[0]; // Format today's date as 'YYYY-MM-DD'
//     const endDate = nextDate.toISOString().split('T')[0]; // Format the 7th day's date as 'YYYY-MM-DD'
    
//     try {
//       // Fetch tasks with dates between startDate and endDate
//       const querySnapshot = await db.collection('tasks')
//         .where('userId', '==', userId)
//         .where('date', '>=', startDate)
//         .where('date', '<=', endDate)
//         .get();
    
//       // Process the tasks
//       querySnapshot.forEach(doc => {
//         const task = doc.data();
//         console.log(`Task for ${task.date}:`, task);
//       });
//     } catch (error) {
//       console.error("Error fetching tasks:", error);
//     }
    

    
  
//   if(querySnapshot.empty)
//   {
//     next7.innerHTML = '<p>No Task,</p>';
//     return;
//   }
//   next7.innerHTML = ' ';

//   querySnapshot.forEach(doc => {
//     const task = doc.data();
//     console.log('Task',task);

//       const taskElement1 = document.createElement('div');
//         taskElement1.classList.add('bg-red', 'p-4', 'mb-0', 'rounded-lg', 'shadow-md');
  
//         const taskDescription = document.createElement('h3');
//         taskDescription.classList.add('text-lg', 'font-semibold', 'text-gray-800');
//         taskDescription.textContent = task.description;
  
//         const taskTime = document.createElement('p');
//         taskTime.classList.add('text-gray-600', 'mb-2');
//         taskTime.textContent = `${task.time} | ${task.date}`;
  
//         taskElement1.appendChild(taskDescription);
//         taskElement1.appendChild(taskTime);
  
//         next7.appendChild(taskElement1);
    
//   });
// }
// catch(error)
// {
//   showToast("Error loading the task");
// }

// });




// document.addEventListener('DOMContentLoaded', async () => {
//   // const showToday = document.getElementById('showToday');
//   const next7 = document.getElementById('next7');

//   if (!next7) {
//     console.error('One or more elements are missing from the DOM.');
//     return;
//   }

//   try {
//     const user = await checkAuth();
//     if (!user) {
//       console.error('Authentication failed');
//       return;
//     }
//     const userId = user.uid;
//     console.log('User id', userId);

//     // const today = new Date(); // Get today's date in full format

//     // // Format today's date as 'YYYY-MM-DD'
//     // const startDateToday = today.toISOString().split('T')[0]; 

//     // const tomorrow = new Date(today);
//     // tomorrow.setDate(today.getDate() + 1); // Calculate tomorrow's date
//     // const startDateTomorrow = tomorrow.toISOString().split('T')[0]; 

//     // try {
//     //   // Fetch tasks for today (excluding tomorrow's tasks)
//     //   const todayQuerySnapshot = await db.collection('tasks')
//     //     .where('userId', '==', userId)
//     //     .where('date', '==', startDateToday)  // TODAY's date only
//     //     .get();

//     //   console.log('Tasks for Today:', todayQuerySnapshot.docs.length);
//     //   if (!todayQuerySnapshot.empty) {
//     //     showToday.innerHTML = '';
//     //     todayQuerySnapshot.forEach(doc => {
//     //       const task = doc.data();
//     //       console.log(`Task for ${task.date}:`, task);

//     //       const taskElement = document.createElement('div');
//     //       taskElement.classList.add('bg-blue', 'p-4', 'mb-2', 'rounded-lg', 'shadow-md');

//     //       const taskDescription = document.createElement('h3');
//     //       taskDescription.classList.add('text-lg', 'font-semibold', 'text-gray-800');
//     //       taskDescription.textContent = task.description;

//     //       const taskTime = document.createElement('p');
//     //       taskTime.classList.add('text-gray-600', 'mb-2');
//     //       taskTime.textContent = `${task.time} | ${task.date}`;

//     //       taskElement.appendChild(taskDescription);
//     //       taskElement.appendChild(taskTime);

//     //       showToday.appendChild(taskElement);
//     //     });
//     //   } else {
//     //     showToday.innerHTML = '<p>No Tasks for Today.</p>';
//     //   }

//       // Fetch tasks for tomorrow to the next 7 days with condition if 'yes'
//       // const endDateNext7 = new Date(today);
//       // endDateNext7.setDate(today.getDate() + 6); // 7th day from today
//       // const endDateFormattedNext7 = endDateNext7.toISOString().split('T')[0]; // 'YYYY-MM-DD'
//       const today = new Date();
//     const nextDate = new Date(today);
//     nextDate.setDate(today.getDate() + 6); // Add 1 day
//     const nextDateString = nextDate.toISOString().split('T')[0];
//       const next7QuerySnapshot = await db.collection('tasks')
//         .where('userId', '==', userId)
//         .where('date', '>=', startDateTomorrow)  // Tomorrow onwards
//         .where('date', '<=', endDateFormattedNext7)  // 7 days ahead from tomorrow
//         .where('day', '==', 'yes')  // Only show if 'yes' is selected
//         .get();

//       console.log('Tasks for Next 7 Days:', next7QuerySnapshot.docs.length);
//       if (!next7QuerySnapshot.empty) {
//         next7.innerHTML = '';
//         next7QuerySnapshot.forEach(doc => {
//           const task = doc.data();
//           console.log(`Task for ${task.date}:`, task);

//           const taskElement = document.createElement('div');
//           taskElement.classList.add('bg-green', 'p-4', 'mb-2', 'rounded-lg', 'shadow-md');

//           const taskDescription = document.createElement('h3');
//           taskDescription.classList.add('text-lg', 'font-semibold', 'text-gray-800');
//           taskDescription.textContent = task.description;

//           const taskTime = document.createElement('p');
//           taskTime.classList.add('text-gray-600', 'mb-2');
//           taskTime.textContent = `${task.time} | ${task.date}`;

//           taskElement.appendChild(taskDescription);
//           taskElement.appendChild(taskTime);

//           next7.appendChild(taskElement);
//         });
//       } else {
//         next7.innerHTML = '<p>No Tasks for the Next 7 Days.</p>';
//       }

//     } catch (error) {
//       console.error("Error fetching tasks:", error);
//       showToast("Error loading tasks");
//     }

//   // } catch (authError) {
//   //   console.error("Authentication error:", authError);
//   // }
// });




// document.addEventListener('DOMContentLoaded', async () => {
//   const showToday = document.getElementById('showToday');
//   const next7 = document.getElementById('next7');

//   if (!showToday) {
//     console.error('The element #showToday is missing from the DOM.');
//     return;
//   }
//   if (!next7) {
//     console.error('Element for displaying tasks is missing.');
//     return;
//   }

//   try {
//     const user = await checkAuth();  
//     const userId = user.uid;
//     console.log('User id', userId);

//     const todayDate = new Date().toISOString().split('T')[0];
// //     const defaultDate = '2025-01-17';  // Replace this with your desired default date
// // const todayDate = defaultDate;  // Use the default date instead of the current date

    

//     // Fetching today's tasks
//     try {
//       const todayQuerySnapshot = await db.collection('tasks')
//         .where('userId', '==', userId)
//         .where('date', '==', todayDate)
//         .get();
      
//       if (todayQuerySnapshot.empty) {
//         showToday.innerHTML = '<p>No Task,</p>';
//       } else {
//         todayQuerySnapshot.forEach(doc => {
//           const task = doc.data();
//           console.log('Task', task);

//           const taskElement = document.createElement('div');
//           taskElement.classList.add('bg-white', 'p-4', 'mb-3', 'rounded-lg', 'shadow-md');
          
//           const taskDescription = document.createElement('h3');
//           taskDescription.classList.add('text-lg', 'font-semibold', 'text-gray-800');
//           taskDescription.textContent = task.description;

//           const taskTime = document.createElement('p');
//           taskTime.classList.add('text-gray-600', 'mb-2');
//           taskTime.textContent = `${task.time} | ${task.date}`;

//           taskElement.appendChild(taskDescription);
//           taskElement.appendChild(taskTime);

//           showToday.appendChild(taskElement);
//         });
//       }
//     } catch (error) {
//       showToast("Error loading today's tasks");
//       console.error("Error fetching today's tasks:", error);
//     }

//     // Fetching next 7 days tasks
//     try 
//     {
//       next7.innerHTML = '';
//       const today = new Date();
//       console.log(today)
//       const dates = [];
//       for (let i = 0; i < 7; i++) {
//         const nextDate = new Date(today);
//         nextDate.setDate(today.getDate() + i);
//         dates.push(nextDate.toISOString().split('T')[0]);
//       }

//       for (let date of dates) {
//         const next7QuerySnapshot = await db.collection('tasks')
//           .where('userId', '==', userId)
//           .where('date', '==', date)
//           .where('day', '==', 'yes')
//           .get();

//         if (next7QuerySnapshot.empty) {
//           console.log(`No tasks found for ${date}.`);
//         } else {
//           next7QuerySnapshot.forEach(doc => {
//             const task = doc.data();
//             console.log(`Task for ${task.date}:`, task);

//             const taskElement = document.createElement('div');
//             taskElement.classList.add('bg-white', 'p-4', 'mb-2', 'rounded-lg', 'shadow-md');

//             const taskDescription = document.createElement('h3');
//             taskDescription.classList.add('text-lg', 'font-semibold', 'text-gray-800');
//             taskDescription.textContent = task.description;

//             const taskTime = document.createElement('p');
//             taskTime.classList.add('text-gray-600', 'mb-2');
//             taskTime.textContent = `${task.time} | ${task.date}`;

//             taskElement.appendChild(taskDescription);
//             taskElement.appendChild(taskTime);

//             next7.appendChild(taskElement);
//           });
//         }
//       }
//     } catch (error) {
//       console.error("Error fetching tasks:", error);
//       next7.innerHTML = '<p>Error loading tasks for the next 7 days.</p>';
//     }
//   } 
//   catch (error) {
//     if (error.code === 'permission-denied') {
//       console.error("Permission denied:", error);
//       showToday.innerHTML = '<p>Permission denied. Please check your Firestore rules or authentication status.</p>';
//       next7.innerHTML = '<p>Permission denied. Please check your Firestore rules or authentication status.</p>';
//     } else if (error.code === 'unavailable') {
//       console.error("Firestore service unavailable:", error);
//       showToday.innerHTML = '<p>Firestore service is currently unavailable. Please try again later.</p>';
//       next7.innerHTML = '<p>Firestore service is currently unavailable. Please try again later.</p>';
//     } else if (error.message.includes('index')) {
//       console.error("Firestore index error:", error);
//       showToday.innerHTML = '<p>There seems to be an issue with Firestore indexing. Please check the setup <a href="https://console.firebase.google.com/v1/r/project/to-do-list-6e94e/firestore/indexes?create_composite=true" target="_blank">here</a>.</p>';
//       next7.innerHTML = '<p>There seems to be an issue with Firestore indexing. Please check the setup <a href="https://console.firebase.google.com/v1/r/project/to-do-list-6e94e/firestore/indexes?create_composite=true" target="_blank">here</a>.</p>';
//     } else {
//       console.error("Error fetching tasks:", error);
//       showToday.innerHTML = '<p>Error loading today\'s tasks.</p>';
//       next7.innerHTML = '<p>Error loading tasks for the next 7 days.</p>';
//     }
//   }

//   console.log('Indexes used in query:', db.collection('tasks').orderBy('date').get()._snapshot.query.select);
// });




// document.addEventListener('DOMContentLoaded', async () => {
//   const showToday = document.getElementById('showToday');
//   const next7 = document.getElementById('next7');

//   if (!showToday) {
//     console.error('The element #showToday is missing from the DOM.');
//     return;
//   }
//   if (!next7) {
//     console.error('Element for displaying tasks is missing.');
//     return;
//   }

//   try {
//     const user = await checkAuth();  
//     const userId = user.uid;
//     console.log('User id', userId);

//     const todayDate = new Date().toISOString().split('T')[0];

//     // Fetching today's tasks
//     try {
//       const todayQuerySnapshot = await db.collection('tasks')
//         .where('userId', '==', userId)
//         .where('date', '==', todayDate)
//         .get();
      
//       if (todayQuerySnapshot.empty) {
//         showToday.innerHTML = '<p>No Task,</p>';
//       } else {
//         todayQuerySnapshot.forEach(doc => {
//           const task = doc.data();
//           console.log('Task', task);

//           const taskElement = document.createElement('div');
//           taskElement.classList.add('bg-white', 'p-4', 'mb-3', 'rounded-lg', 'shadow-md');
          
//           const taskDescription = document.createElement('h3');
//           taskDescription.classList.add('text-lg', 'font-semibold', 'text-gray-800');
//           taskDescription.textContent = task.description;

//           const taskTime = document.createElement('p');
//           taskTime.classList.add('text-gray-600', 'mb-2');
//           taskTime.textContent = `${task.time} | ${task.date}`;

//           // Adding delete button
//           const deleteButton = document.createElement('button');
//           deleteButton.classList.add('text-red-500', 'hover:underline');
//           deleteButton.textContent = 'Delete';
//           deleteButton.addEventListener('click', async () => {
//             try {
//               await db.collection('tasks').doc(doc.id).delete();
//               showToday.removeChild(taskElement);
//               console.log('Task deleted');
//             } catch (error) {
//               console.error("Error deleting task:", error);
//             }
//           });

//           taskElement.appendChild(taskDescription);
//           taskElement.appendChild(taskTime);
//           taskElement.appendChild(deleteButton);

//           showToday.appendChild(taskElement);
//         });
//       }
//     } catch (error) {
//       showToast("Error loading today's tasks");
//       console.error("Error fetching today's tasks:", error);
//     }

//     // Fetching next 7 days tasks
//     try 
//     {
//       next7.innerHTML = '';
//       const today = new Date();
//       console.log(today)
//       const dates = [];
//       for (let i = 0; i < 7; i++) {
//         const nextDate = new Date(today);
//         nextDate.setDate(today.getDate() + i);
//         dates.push(nextDate.toISOString().split('T')[0]);
//       }

//       for (let date of dates) {
//         const next7QuerySnapshot = await db.collection('tasks')
//           .where('userId', '==', userId)
//           .where('date', '==', date)
//           .where('day', '==', 'yes')
//           .get();

//         if (next7QuerySnapshot.empty) {
//           console.log(`No tasks found for ${date}.`);
//         } else {
//           next7QuerySnapshot.forEach(doc => {
//             const task = doc.data();
//             console.log(`Task for ${task.date}:`, task);

//             const taskElement = document.createElement('div');
//             taskElement.classList.add('bg-white', 'p-4', 'mb-2', 'rounded-lg', 'shadow-md');

//             const taskDescription = document.createElement('h3');
//             taskDescription.classList.add('text-lg', 'font-semibold', 'text-gray-800');
//             taskDescription.textContent = task.description;

//             const taskTime = document.createElement('p');
//             taskTime.classList.add('text-gray-600', 'mb-2');
//             taskTime.textContent = `${task.time} | ${task.date}`;

//             // Adding delete button
//             const deleteButton = document.createElement('button');
//             deleteButton.classList.add('text-red-500', 'hover:underline');
//             deleteButton.textContent = 'Delete';
//             deleteButton.addEventListener('click', async () => {
//               try {
//                 await db.collection('tasks').doc(doc.id).delete();
//                 next7.removeChild(taskElement);
//                 console.log('Task deleted');
//               } catch (error) {
//                 console.error("Error deleting task:", error);
//               }
//             });

//             taskElement.appendChild(taskDescription);
//             taskElement.appendChild(taskTime);
//             taskElement.appendChild(deleteButton);

//             next7.appendChild(taskElement);
//           });
//         }
//       }
//     } catch (error) {
//       console.error("Error fetching tasks:", error);
//       next7.innerHTML = '<p>Error loading tasks for the next 7 days.</p>';
//     }
//   } 
//   catch (error) {
//     if (error.code === 'permission-denied') {
//       console.error("Permission denied:", error);
//       showToday.innerHTML = '<p>Permission denied. Please check your Firestore rules or authentication status.</p>';
//       next7.innerHTML = '<p>Permission denied. Please check your Firestore rules or authentication status.</p>';
//     } else if (error.code === 'unavailable') {
//       console.error("Firestore service unavailable:", error);
//       showToday.innerHTML = '<p>Firestore service is currently unavailable. Please try again later.</p>';
//       next7.innerHTML = '<p>Firestore service is currently unavailable. Please try again later.</p>';
//     } else if (error.message.includes('index')) {
//       console.error("Firestore index error:", error);
//       showToday.innerHTML = '<p>There seems to be an issue with Firestore indexing. Please check the setup <a href="https://console.firebase.google.com/v1/r/project/to-do-list-6e94e/firestore/indexes?create_composite=true" target="_blank">here</a>.</p>';
//       next7.innerHTML = '<p>There seems to be an issue with Firestore indexing. Please check the setup <a href="https://console.firebase.google.com/v1/r/project/to-do-list-6e94e/firestore/indexes?create_composite=true" target="_blank">here</a>.</p>';
//     } else {
//       console.error("Error fetching tasks:", error);
//       showToday.innerHTML = '<p>Error loading today\'s tasks.</p>';
//       next7.innerHTML = '<p>Error loading tasks for the next 7 days.</p>';
//     }
//   }

//   console.log('Indexes used in query:', db.collection('tasks').orderBy('date').get()._snapshot.query.select);
// });







document.addEventListener('DOMContentLoaded', async () => {
  const showToday = document.getElementById('showToday');
  const next7 = document.getElementById('next7');

  if (!showToday) {
    console.error('The element #showToday is missing from the DOM.');
    return;
  }
  if (!next7) {
    console.error('Element for displaying tasks is missing.');
    return;
  }

  try {
    const user = await checkAuth();  
    const userId = user.uid;
    console.log('User id', userId);

    const todayDate = new Date().toISOString().split('T')[0];
    // const defaultDate = '2025-01-11';
    // const todayDate = defaultDate;

    // Fetching today's tasks
    try {
      const todayQuerySnapshot = await db.collection('tasks')
        .where('userId', '==', userId)
        .where('date', '==', todayDate)
        .get();
      
      if (todayQuerySnapshot.empty) {
        showToday.innerHTML = '<p>No Task.</p>';
      } else {
        todayQuerySnapshot.forEach(doc => {
          const task = doc.data();
          console.log('Task', task);

          const taskElement = document.createElement('div');
          taskElement.classList.add('bg-white', 'p-4', 'mb-3', 'rounded-lg', 'shadow-md');
          
          const taskDescription = document.createElement('h3');
          taskDescription.classList.add('text-lg', 'font-semibold', 'text-gray-800');
          taskDescription.textContent = task.description;

          const taskTime = document.createElement('p');
          taskTime.classList.add('text-gray-600', 'mb-2');
          taskTime.textContent = `${task.time} | ${task.date}`;

          // Checkbox for completing task
          const completeCheckbox = document.createElement('input');
          completeCheckbox.type = 'checkbox';
          completeCheckbox.checked = task.completed || false;
          completeCheckbox.classList.add('mr-2');

          completeCheckbox.addEventListener('change', async () => {
            try {
              await db.collection('tasks').doc(doc.id).update({ completed: completeCheckbox.checked });
              console.log('Task completion status updated');
            } catch (error) {
              console.error("Error updating task status:", error);
            }
          });

          // Adding delete button
          const deleteButton = document.createElement('button');
          deleteButton.classList.add('text-red-500', 'hover:underline');
          deleteButton.textContent = 'Delete';
          deleteButton.addEventListener('click', async () => {
            const confirmation = confirm('Are you sure you want to delete this task?');
            if (confirmation) {
              try {
                await db.collection('tasks').doc(doc.id).delete();
                showToday.removeChild(taskElement);
                console.log('Task deleted');
              } catch (error) {
                console.error("Error deleting task:", error);
              }
            }
          });

          taskElement.appendChild(completeCheckbox);
          taskElement.appendChild(taskDescription);
          taskElement.appendChild(taskTime);
          taskElement.appendChild(deleteButton);

          showToday.appendChild(taskElement);
        });
      }
    } catch (error) {
      console.error("Error fetching today's tasks:", error);
      showToday.innerHTML = '<p>Error loading today\'s tasks.</p>';
    }

    // Fetching next 7 days tasks
    try {
      next7.innerHTML = '';
      const today = new Date();
      const dates = [];
      for (let i = 0; i < 7; i++) {
        const nextDate = new Date(today);
        nextDate.setDate(today.getDate() + i);
        dates.push(nextDate.toISOString().split('T')[0]);
      }

      for (let date of dates) {
        const next7QuerySnapshot = await db.collection('tasks')
          .where('userId', '==', userId)
          .where('date', '==', date)
          .where('day', '==', 'yes')
          .get();

        if (next7QuerySnapshot.empty) {
          console.log(`No tasks found for ${date}.`);
        } else {
          next7QuerySnapshot.forEach(doc => {
            const task = doc.data();
            console.log(`Task for ${task.date}:`, task);

            const taskElement = document.createElement('div');
            taskElement.classList.add('bg-white', 'p-4', 'mb-2', 'rounded-lg', 'shadow-md');

            const taskDescription = document.createElement('h3');
            taskDescription.classList.add('text-lg', 'font-semibold', 'text-gray-800');
            taskDescription.textContent = task.description;

            const taskTime = document.createElement('p');
            taskTime.classList.add('text-gray-600', 'mb-2');
            taskTime.textContent = `${task.time} | ${task.date}`;

            // Checkbox for completing task
            const completeCheckbox = document.createElement('input');
            completeCheckbox.type = 'checkbox';
            completeCheckbox.checked = task.completed || false;
            completeCheckbox.classList.add('mr-2');

            completeCheckbox.addEventListener('change', async () => {
              try {
                await db.collection('tasks').doc(doc.id).update({ completed: completeCheckbox.checked });
                console.log('Task completion status updated');
              } catch (error) {
                console.error("Error updating task status:", error);
              }
            });

            // Adding delete button
            const deleteButton = document.createElement('button');
            deleteButton.classList.add('text-red-500', 'hover:underline');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', async () => {
              const confirmation = confirm('Are you sure you want to delete this task?');
              if (confirmation) {
                try {
                  await db.collection('tasks').doc(doc.id).delete();
                  next7.removeChild(taskElement);
                  console.log('Task deleted');
                } catch (error) {
                  console.error("Error deleting task:", error);
                }
              }
            });

            taskElement.appendChild(completeCheckbox);
            taskElement.appendChild(taskDescription);
            taskElement.appendChild(taskTime);
            taskElement.appendChild(deleteButton);

            next7.appendChild(taskElement);
          });
        }
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
      next7.innerHTML = '<p>Error loading tasks for the next 7 days.</p>';
    }
  } 
  catch (error) {
    if (error.code === 'permission-denied') {
      console.error("Permission denied:", error);
      showToday.innerHTML = '<p>Permission denied. Please check your Firestore rules or authentication status.</p>';
      next7.innerHTML = '<p>Permission denied. Please check your Firestore rules or authentication status.</p>';
    } else if (error.code === 'unavailable') {
      console.error("Firestore service unavailable:", error);
      showToday.innerHTML = '<p>Firestore service is currently unavailable. Please try again later.</p>';
      next7.innerHTML = '<p>Firestore service is currently unavailable. Please try again later.</p>';
    } else if (error.message.includes('index')) {
      console.error("Firestore index error:", error);
      showToday.innerHTML = '<p>There seems to be an issue with Firestore indexing. Please check the setup <a href="https://console.firebase.google.com/v1/r/project/to-do-list-6e94e/firestore/indexes?create_composite=true" target="_blank">here</a>.</p>';
      next7.innerHTML = '<p>There seems to be an issue with Firestore indexing. Please check the setup <a href="https://console.firebase.google.com/v1/r/project/to-do-list-6e94e/firestore/indexes?create_composite=true" target="_blank">here</a>.</p>';
    } else {
      console.error("Error fetching tasks:", error);
      showToday.innerHTML = '<p>Error loading today\'s tasks.</p>';
      next7.innerHTML = '<p>Error loading tasks for the next 7 days.</p>';
    }
  }

  console.log('Indexes used in query:', db.collection('tasks').orderBy('date').get()._snapshot.query.select);
});




// comp
document.addEventListener('DOMContentLoaded', async () => {
  const comp = document.getElementById('comp');
  if (!comp) {
    console.error('The element #comp is missing from the DOM.');
    return;
  }

  try {
    const user = await checkAuth();
    const userId = user.uid;

    // const todayDate = new Date().toISOString().split('T')[0];

    try {
      const compQuerySnapshot = await db.collection('tasks')
      .where('userId', '==', userId)
      // .where('date', '==', todayDate)
      .where('completed', '==', true)
        .get();

      if (compQuerySnapshot.empty) {
        comp.innerHTML = '<p>No completed tasks for today.</p>';
      } else {
        compQuerySnapshot.forEach(doc => {
          const task = doc.data();
          console.log('Completed Task:', task);

          const taskElement = document.createElement('div');
          taskElement.classList.add('bg-white', 'p-4', 'mb-3', 'rounded-lg', 'shadow-md');

          const taskDescription = document.createElement('h3');
          taskDescription.classList.add('text-lg', 'font-semibold', 'text-gray-800');
          taskDescription.textContent = task.description;

          const taskTime = document.createElement('p');
          taskTime.classList.add('text-gray-600', 'mb-2');
          taskTime.textContent = `${task.time} | ${task.date}`;

          // Append task elements
          taskElement.appendChild(taskDescription);
          taskElement.appendChild(taskTime);

          comp.appendChild(taskElement);
        });
      }
    } catch (error) {
      console.error("Error fetching completed tasks:", error);
      comp.innerHTML = '<p>Error loading completed tasks for today.</p>';
    }
  } 
  catch (error) {
    if (error.code === 'permission-denied') {
      console.error("Permission denied:", error);
      comp.innerHTML = '<p>Permission denied. Please check your Firestore rules or authentication status.</p>';
    } else if (error.code === 'unavailable') {
      console.error("Firestore service unavailable:", error);
      comp.innerHTML = '<p>Firestore service is currently unavailable. Please try again later.</p>';
    } else {
      console.error("Error fetching tasks:", error);
      comp.innerHTML = '<p>Error loading today\'s tasks.</p>';
    }
  }
  
});
