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
const errorDiv = document.getElementById("error");

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
  const fullName = document.getElementById("full").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      // Save user data in Firestore
      db.collection("users")
        .doc(user.uid)
        .set({
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
  const email = document.getElementById("l-email").value;
  const password = document.getElementById("l-password").value;

  auth
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      showToast("Login successful!", "success");
      window.location.href = "home.html";
    })
    .catch((error) => {
      showToast(error.message, "error");
    });
}

// add

document.addEventListener("DOMContentLoaded", () => {
  const taskDescription = document.getElementById("taskDescription");
  const taskDate = document.getElementById("taskDate");
  const taskTime = document.getElementById("taskTime");
  const addTaskButton = document.getElementById("addTaskButton");
  const taskRepeat = document.getElementById("repeatSelect");

  if (
    !taskDescription ||
    !taskDate ||
    !taskTime ||
    !addTaskButton ||
    !taskRepeat
  ) {
    console.error("One or more elements are missing from the DOM.");
    return;
  }

  const selectedDays = {};

  addTaskButton.addEventListener("click", () => {
    const description = taskDescription.value.trim();
    const date = taskDate.value;
    const time = taskTime.value;

    if (description === "" || date === "" || time === "") {
      showToast("Please fill in all fields.");
      console.error("Some fields are empty");
      return;
    }

    const userId = firebase.auth().currentUser?.uid;

    if (!userId) {
      showToast("User is not authenticated. Please log in.");
      return;
    }

    const dayOption = taskRepeat ? taskRepeat.value.trim() : "no";
    const selectedDate = new Date(date).toLocaleDateString();

    if (dayOption === "yes" && selectedDays[selectedDate]) {
      showToast("You have already added a task for this day.");
      console.error("Task already exists for this day");
      return;
    }

    db.collection("tasks")
      .add({
        description: description,
        date: date,
        time: time,
        userId: userId,
        day: dayOption,
        createdAt: new Date(),
      })
      .then(() => {
        showToast("Task added successfully!", "success");

        taskDescription.value = "";
        taskDate.value = "";
        taskTime.value = "";
        if (taskRepeat) taskRepeat.value = ""; // Clear repeat option

        if (dayOption === "yes") {
          selectedDays[selectedDate] = true;
        }
      })
      .catch((error) => {
        console.error("Firestore error:", error);
        showToast("Error adding task: " + error.message);
      });
  });

  console.log("taskDescription:", taskDescription);
  console.log("taskDate:", taskDate);
  console.log("taskTime:", taskTime);
  console.log("addTaskButton:", addTaskButton);
});

function logout() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      showToast("User logged out");
      // Optionally, redirect to login page
      window.location.href = "login.html"; // Adjust the URL to your login page
    })
    .catch((error) => {
      showToastr("Error logging out:", error);
    });
}

const checkAuth = () => {
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        resolve(user);
      } else {
        reject(new Error("User is not authenticated."));
      }
    });
  });
};

document.addEventListener("DOMContentLoaded", async () => {
  const showTom = document.getElementById("showTom");
  if (!showTom) {
    console.error("The element #showToday is missing from the DOM.");
    return;
  }
  try {
    const user = await checkAuth();
    const userId = user.uid;
    console.log("User id", userId);

    // const todayDate = new Date().toISOString().split('T')[0];

    const today = new Date();
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + 1); // Add 1 day
    const nextDateString = nextDate.toISOString().split("T")[0];
    const querySnapshot = await db
      .collection("tasks")

      .where("userId", "==", userId)
      .where("date", "==", nextDateString)
      .get();
    if (querySnapshot.empty) {
      showTom.innerHTML = "<p>No Task,</p>";
      return;
    }
    showTom.innerHTML = " ";

    querySnapshot.forEach((doc) => {
      const task = doc.data();
      console.log("Task", task);

      const taskElement = document.createElement("div");
      taskElement.classList.add(
        "bg-white",
        "p-4",
        "mb-3",
        "rounded-lg",
        "shadow-md"
      );

      const taskDescription = document.createElement("h3");
      taskDescription.classList.add(
        "text-lg",
        "font-semibold",
        "text-gray-800"
      );
      taskDescription.textContent = task.description;

      const taskTime = document.createElement("p");
      taskTime.classList.add("text-gray-600", "mb-2");
      taskTime.textContent = `${task.time} | ${task.date}`;

      taskElement.appendChild(taskDescription);
      taskElement.appendChild(taskTime);

      showTom.appendChild(taskElement);
    });
  } catch (error) {
    showToast("Error loading the task");
  }
});

document.addEventListener("DOMContentLoaded", async () => {
  const show7 = document.getElementById("show7");
  if (!show7) {
    console.error("The element #showToday is missing from the DOM.");
    return;
  }
  try {
    const user = await checkAuth();
    const userId = user.uid;
    console.log("User id", userId);

    const today = new Date();
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + 6); // Add 1 day
    const nextDateString = nextDate.toISOString().split("T")[0];
    const querySnapshot = await db
      .collection("tasks")

      .where("userId", "==", userId)
      .where("date", "==", nextDateString)
      .get();
    if (querySnapshot.empty) {
      show7.innerHTML = "<p>No Task,</p>";
      return;
    }
    show7.innerHTML = " ";

    querySnapshot.forEach((doc) => {
      const task = doc.data();
      console.log("Task", task);

      const taskElement = document.createElement("div");
      taskElement.classList.add(
        "bg-white",
        "p-4",
        "mb-3",
        "rounded-lg",
        "shadow-md"
      );

      const taskDescription = document.createElement("h3");
      taskDescription.classList.add(
        "text-lg",
        "font-semibold",
        "text-gray-800"
      );
      taskDescription.textContent = task.description;

      const taskTime = document.createElement("p");
      taskTime.classList.add("text-gray-600", "mb-2");
      taskTime.textContent = `${task.time} | ${task.date}`;

      taskElement.appendChild(taskDescription);
      taskElement.appendChild(taskTime);

      show7.appendChild(taskElement);
    });
  } catch (error) {
    showToast("Error loading the task");
  }
});

document.addEventListener("DOMContentLoaded", async () => {
  const showToday = document.getElementById("showToday");
  const next7 = document.getElementById("next7");

  if (!showToday || !next7) return;

  try {
    const user = await checkAuth();
    const userId = user.uid;
    const todayDate = new Date().toISOString().split("T")[0];

    const createTaskCard = (task, docId, container) => {
      const card = document.createElement("div");
      card.className =
        "w-[280px] bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all p-4";

      const desc = document.createElement("p");
      desc.className = "text-base font-medium text-gray-800 mb-2";
      desc.textContent = task.description;

      const dateTime = document.createElement("p");
      dateTime.className = "text-sm text-gray-500";
      dateTime.textContent = `${task.date} • ${task.time}`;

      const footer = document.createElement("div");
      footer.className = "flex justify-between items-center mt-4";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = task.completed || false;
      checkbox.className = "h-5 w-5 text-green-500 rounded border-gray-300";
      checkbox.addEventListener("change", async () => {
        await db.collection("tasks").doc(docId).update({
          completed: checkbox.checked,
        });
      });

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "🗑️";
      deleteBtn.title = "Delete task";
      deleteBtn.className = "text-gray-400 hover:text-red-500 text-lg";
      deleteBtn.addEventListener("click", async () => {
        if (confirm("Delete this task?")) {
          await db.collection("tasks").doc(docId).delete();
          container.removeChild(card);
        }
      });

      footer.appendChild(checkbox);
      footer.appendChild(deleteBtn);

      card.appendChild(desc);
      card.appendChild(dateTime);
      card.appendChild(footer);
      container.appendChild(card);
    };

    const todaySnap = await db
      .collection("tasks")
      .where("userId", "==", userId)
      .where("date", "==", todayDate)
      .get();

    showToday.innerHTML = todaySnap.empty
      ? `<div class="text-gray-400">No tasks for today.</div>`
      : "";

    todaySnap.forEach(doc => {
      createTaskCard(doc.data(), doc.id, showToday);
    });

    const dates = [];
    const now = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(now);
      date.setDate(now.getDate() + i);
      dates.push(date.toISOString().split("T")[0]);
    }

    next7.innerHTML = "";

    for (const date of dates) {
      const snap = await db
        .collection("tasks")
        .where("userId", "==", userId)
        .where("date", "==", date)
        .where("day", "==", "yes")
        .get();

      snap.forEach(doc => {
        createTaskCard(doc.data(), doc.id, next7);
      });
    }
  } catch (err) {
    console.error(err);
    showToday.innerHTML = `<div class="text-red-500">Error loading today's tasks.</div>`;
    next7.innerHTML = `<div class="text-red-500">Error loading next 7 days.</div>`;
  }
});


// comp
document.addEventListener("DOMContentLoaded", async () => {
  const comp = document.getElementById("comp");
  if (!comp) {
    console.error("The element #comp is missing from the DOM.");
    return;
  }

  try {
    const user = await checkAuth();
    const userId = user.uid;

    // const todayDate = new Date().toISOString().split('T')[0];

    try {
      const compQuerySnapshot = await db
        .collection("tasks")
        .where("userId", "==", userId)
        // .where('date', '==', todayDate)
        .where("completed", "==", true)
        .get();

      if (compQuerySnapshot.empty) {
        comp.innerHTML = "<p>No completed tasks for today.</p>";
      } else {
        compQuerySnapshot.forEach((doc) => {
          const task = doc.data();
          console.log("Completed Task:", task);

          const taskElement = document.createElement("div");
          taskElement.classList.add(
            "bg-white",
            "p-4",
            "mb-3",
            "rounded-lg",
            "shadow-md"
          );

          const taskDescription = document.createElement("h3");
          taskDescription.classList.add(
            "text-lg",
            "font-semibold",
            "text-gray-800"
          );
          taskDescription.textContent = task.description;

          const taskTime = document.createElement("p");
          taskTime.classList.add("text-gray-600", "mb-2");
          taskTime.textContent = `${task.time} | ${task.date}`;

          // Append task elements
          taskElement.appendChild(taskDescription);
          taskElement.appendChild(taskTime);

          comp.appendChild(taskElement);
        });
      }
    } catch (error) {
      console.error("Error fetching completed tasks:", error);
      comp.innerHTML = "<p>Error loading completed tasks for today.</p>";
    }
  } catch (error) {
    if (error.code === "permission-denied") {
      console.error("Permission denied:", error);
      comp.innerHTML =
        "<p>Permission denied. Please check your Firestore rules or authentication status.</p>";
    } else if (error.code === "unavailable") {
      console.error("Firestore service unavailable:", error);
      comp.innerHTML =
        "<p>Firestore service is currently unavailable. Please try again later.</p>";
    } else {
      console.error("Error fetching tasks:", error);
      comp.innerHTML = "<p>Error loading today's tasks.</p>";
    }
  }
});
