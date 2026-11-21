
/* =========================
   GREETING - CLOCK & DATE
========================= */

function updateClock() {

    const now = new Date();

    // Mengambil elemen HTML
    const clock = document.getElementById("clock");
    const date = document.getElementById("date");
    const greeting = document.getElementById("greeting");

    // Menampilkan jam
    clock.textContent = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
    });

    // Menampilkan tanggal
    date.textContent = now.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    });

    // Menentukan sapaan berdasarkan waktu
    const hour = now.getHours();

    if (hour >= 5 && hour < 12) {
        greeting.textContent = "Good Morning!";
    } 
    else if (hour >= 12 && hour < 17) {
        greeting.textContent = "Good Afternoon!";
    } 
    else if (hour >= 17 && hour < 21) {
        greeting.textContent = "Good Evening!";
    } 
    else {
        greeting.textContent = "Good Night!";
    }
}

// Memperbarui jam setiap detik
updateClock();
setInterval(updateClock, 1000);


/* =========================
   FOCUS TIMER
========================= */

// Durasi awal 25 menit
let timeLeft = 25 * 60;

// Menyimpan interval timer
let timerInterval = null;

// Mengambil elemen HTML
const timerDisplay = document.getElementById("timer");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");

// Menampilkan waktu
function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    timerDisplay.textContent =
        String(minutes).padStart(2, "0") + ":" +
        String(seconds).padStart(2, "0");
}

// Tombol Start
startBtn.addEventListener("click", function() {

    if (timerInterval !== null) return;

    if (timeLeft <= 0) return;

    timerInterval = setInterval(function() {

        timeLeft--;

        updateTimerDisplay();

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerInterval = null;

            alert("Focus session completed!");
        }

    }, 1000);

});

// Tombol Stop
stopBtn.addEventListener("click", function() {

    clearInterval(timerInterval);
    timerInterval = null;

});

// Tombol Reset
resetBtn.addEventListener("click", function() {

    clearInterval(timerInterval);
    timerInterval = null;

    timeLeft = 25 * 60;

    updateTimerDisplay();

});

// Tampilan awal timer
updateTimerDisplay();


/* =========================
   TO-DO LIST
========================= */

// Mengambil elemen HTML
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// Mengambil data dari Local Storage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Menyimpan data tugas
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Menampilkan daftar tugas
function displayTasks() {

    taskList.innerHTML = "";

    tasks.forEach(function(task, index) {

        const li = document.createElement("li");

        // Checkbox selesai
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        checkbox.addEventListener("change", function() {
            tasks[index].completed = checkbox.checked;
            saveTasks();
            displayTasks();
        });

        // Nama tugas
        const span = document.createElement("span");
        span.textContent = task.name;

        if (task.completed) {
            span.classList.add("completed");
        }

        // Tombol Edit
        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";

        editBtn.addEventListener("click", function() {

            const newName = prompt(
                "Edit your task:",
                task.name
            );

            if (newName === null) return;

            if (newName.trim() === "") {
                alert("Task cannot be empty!");
                return;
            }

            tasks[index].name = newName.trim();

            saveTasks();
            displayTasks();
        });

        // Tombol Delete
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";

        deleteBtn.addEventListener("click", function() {

            if (confirm("Delete this task?")) {
                tasks.splice(index, 1);

                saveTasks();
                displayTasks();
            }

        });

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);

    });
}


/* =========================
   PREVENT DUPLICATE TASKS
========================= */

function addTask() {

    const taskName = taskInput.value.trim();

    // Memeriksa input kosong
    if (taskName === "") {
        alert("Please enter a task!");
        return;
    }

    // Memeriksa tugas yang sudah ada
    const duplicate = tasks.some(function(task) {

        return task.name.toLowerCase() ===
               taskName.toLowerCase();

    });

    // Menolak tugas duplikat
    if (duplicate) {
        alert("This task already exists!");
        taskInput.value = "";
        return;
    }

    // Menambahkan tugas baru
    tasks.push({
        name: taskName,
        completed: false
    });

    // Menyimpan data
    saveTasks();

    // Mengosongkan input
    taskInput.value = "";

    // Memperbarui daftar tugas
    displayTasks();

}


// Tombol Add
addBtn.addEventListener("click", addTask);

// Menambahkan tugas dengan tombol Enter
taskInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

// Menampilkan tugas saat website dibuka
displayTasks();


/* =========================
   QUICK LINKS
========================= */

// Mengambil elemen HTML
const linkName = document.getElementById("linkName");
const linkURL = document.getElementById("linkURL");
const addLinkBtn = document.getElementById("addLinkBtn");
const linkList = document.getElementById("linkList");

// Mengambil data Local Storage
let links = JSON.parse(localStorage.getItem("quickLinks")) || [];

// Menyimpan link
function saveLinks() {
    localStorage.setItem(
        "quickLinks",
        JSON.stringify(links)
    );
}

// Menampilkan link
function displayLinks() {

    linkList.innerHTML = "";

    links.forEach(function(link, index) {

        const container = document.createElement("div");
        container.className = "quick-link-item";

        const anchor = document.createElement("a");
        anchor.textContent = link.name;
        anchor.href = link.url;
        anchor.target = "_blank";
        anchor.rel = "noopener noreferrer";

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";

        deleteBtn.addEventListener("click", function() {

            links.splice(index, 1);

            saveLinks();
            displayLinks();

        });

        container.appendChild(anchor);
        container.appendChild(deleteBtn);

        linkList.appendChild(container);

    });

}

// Menambahkan link
function addLink() {

    const name = linkName.value.trim();
    let url = linkURL.value.trim();

    if (name === "" || url === "") {
        alert("Please complete all fields!");
        return;
    }

    if (!/^https?:\/\//i.test(url)) {
        url = "https://" + url;
    }

    try {
        const parsedURL = new URL(url);

        if (
            !["http:", "https:"].includes(parsedURL.protocol) ||
            !parsedURL.hostname.includes(".")
        ) {
            throw new Error("Invalid URL");
        }

        links.push({
            name: name,
            url: parsedURL.href
        });

        saveLinks();

        linkName.value = "";
        linkURL.value = "";

        displayLinks();

    } catch (error) {
        alert("Please enter a valid website URL!");
    }

}

// Tombol Add Link
addLinkBtn.addEventListener("click", addLink);

// Menampilkan link saat website dibuka
displayLinks();


/* =========================
   LIGHT / DARK MODE
========================= */

const themeToggle = document.getElementById("themeToggle");

// Memeriksa tema yang tersimpan
let savedTheme = localStorage.getItem("dashboardTheme");

// Fungsi menerapkan tema
function applyTheme(theme) {

    if (theme === "dark") {
        document.body.classList.add("dark-mode");
        themeToggle.textContent = "☀️ Light Mode";
    } else {
        document.body.classList.remove("dark-mode");
        themeToggle.textContent = "🌙 Dark Mode";
    }
}

// Menerapkan tema saat website dibuka
applyTheme(savedTheme || "light");

// Tombol pergantian tema
themeToggle.addEventListener("click", function() {

    const isDark = document.body.classList.contains("dark-mode");

    if (isDark) {
        applyTheme("light");
        localStorage.setItem("dashboardTheme", "light");
    } else {
        applyTheme("dark");
        localStorage.setItem("dashboardTheme", "dark");
    }

});


/* =========================
   CUSTOM NAME
========================= */

const nameInput = document.getElementById("nameInput");
const saveNameBtn = document.getElementById("saveNameBtn");
const welcomeText = document.getElementById("welcome");

// Mengambil nama yang tersimpan
let savedName = localStorage.getItem("userName") || "";

// Menampilkan nama
function displayName() {

    if (savedName !== "") {
        welcomeText.textContent =
            "Welcome to your dashboard, " + savedName + "!";
    } else {
        welcomeText.textContent =
            "Welcome to your dashboard!";
    }

}

// Mengisi input dengan nama sebelumnya
nameInput.value = savedName;

// Menampilkan nama saat website dibuka
displayName();

// Menyimpan nama
saveNameBtn.addEventListener("click", function() {

    const name = nameInput.value.trim();

    if (name === "") {
        alert("Please enter your name!");
        return;
    }

    savedName = name;

    localStorage.setItem("userName", savedName);

    displayName();

    alert("Name saved successfully!");

});
