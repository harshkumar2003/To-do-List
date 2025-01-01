// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBGi99JTciDVJMiwNoB6HMeCNnP59BCsCI",
    authDomain: "to-do-list-6e94e.firebaseapp.com",
    projectId: "to-do-list-6e94e",
    storageBucket: "to-do-list-6e94e.firebasestorage.app",
    messagingSenderId: "346598245710",
    appId: "1:346598245710:web:6b3eb869839a4e4e7e4a1f",
    measurementId: "G-939CGXSSWX"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// DOM elements
const tabs = document.querySelectorAll(".tab");
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");
const motivationalMessage = document.getElementById("motivationalMessage");

let currentDay = "Monday";

// Switch days
tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        currentDay = tab.dataset.day;
        document.querySelector(".tab.active").classList.remove("active");
        tab.classList.add("active");
        loadTasks();
    });
});

// Add task
addTaskBtn.addEventListener("click", () => {
    const task = taskInput.value.trim();
    if (task) {
        const taskRef = db.ref(`tasks/${currentDay}`).push();
        taskRef.set({ id: taskRef.key, task, completed: false });
        taskInput.value = "";
    }
});

// Load tasks
function loadTasks() {
    taskList.innerHTML = "";
    db.ref(`tasks/${currentDay}`).on("value", (snapshot) => {
        let totalTasks = 0;
        let completedTasks = 0;

        snapshot.forEach((child) => {
            const taskData = child.val();
            totalTasks++;
            if (taskData.completed) completedTasks++;

            const li = document.createElement("li");
            li.innerHTML = `
                <span>${taskData.task}</span>
                <input type="checkbox" ${taskData.completed ? "checked" : ""} onchange="toggleTask('${currentDay}', '${taskData.id}', this.checked)">
                <button onclick="deleteTask('${currentDay}', '${taskData.id}')">🗑️</button>
            `;
            taskList.appendChild(li);
        });

        updateProgress(totalTasks, completedTasks);
    });
}

// Update progress
function updateProgress(total, completed) {
    const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);
    progressText.textContent = `Progress: ${percentage}%`;
    progressFill.style.width = `${percentage}%`;
    motivationalMessage.classList.toggle("hidden", percentage < 100);
}

// Toggle task
function toggleTask(day, id, completed) {
    db.ref(`tasks/${day}/${id}`).update({ completed });
}

// Delete task
function deleteTask(day, id) {
    db.ref(`tasks/${day}/${id}`).remove();
}

// Load initial tasks
loadTasks();
