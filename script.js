console.log("Dashboard Shell loaded.");

// step 2
const appName = "Dashboard Shell";
let userCount = 128;

function formatCurrency(amount) {
  return "Rp" + amount.toLocaleString("id-ID");
}

console.log(appName, " Total users: ", userCount);
console.log(formatCurrency(421000));

// step 3
const statUsers = document.querySelector("#stat-users");
const statTransactions = document.querySelector("#stat-transactions");
const statAverage = document.querySelector("#stat-average");

console.log(statUsers, statTransactions, statAverage);

// step 4
function displayData() {
  statUsers.textContent = userCount;
  statTransactions.textContent = 45;
  statAverage.textContent = formatCurrency(421000);
}

displayData();

//step 5
const menuToggle = document.querySelector("#menu-toggle");
const sidebar = document.querySelector("#sidebar");

menuToggle.addEventListener("click", () => {
    sidebar.classList.toggle("sidebar-open");
});

const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach((navLink) => {
    navLink.addEventListener("click", (event) => {
        navLinks.forEach((l) => l.classList.remove("active"));
        event.currentTarget.classList.add("active");
    });
});
const btnRefresh = document.querySelector("#btn-refresh"); 
  
btnRefresh.addEventListener("click", () => { 
  userCount = Math.floor(Math.random() * 500); 
  displayData(); 
}); 
const visitorNameInput = document.querySelector("#visitor-name"); 
const greetingOutput = document.querySelector("#greeting-output"); 
  
// UNSAFE — innerHTML will execute any tag/script inside the input 
document.querySelector("#btn-greet-unsafe").addEventListener("click", () => { 
  greetingOutput.innerHTML = "Hello, " + visitorNameInput.value + "!"; 
}); 
  
// SAFE — textContent treats the input as plain text 
document.querySelector("#btn-greet-safe").addEventListener("click", () => { 
  greetingOutput.textContent = "Hello, " + visitorNameInput.value + "!"; 
}); 

//Session 4
async function fetchUsers() {
 const response = await fetch("https://jsonplaceholder.typicode.com/users");
 const data = await response.json();
 console.log(data);
}
fetchUsers();

//step 3
const stateLoading = document.querySelector("#state-loading"); 
const stateEmpty = document.querySelector("#state-empty"); 
const stateError = document.querySelector("#state-error"); 
const userList = document.querySelector("#user-list"); 
  
function showState(state) { 
  stateLoading.hidden = state !== "loading"; 
  stateEmpty.hidden = state !== "empty"; 
  stateError.hidden = state !== "error"; 
  userList.hidden = state !== "success"; 
} 
//step 4
function renderUsers(data) { 
  userList.textContent = ""; 
  
  data.forEach((user) => { 
    const li = document.createElement("li"); 
    li.textContent = user.name + " — " + user.email; 
    userList.appendChild(li); 
  }); 
} 
//Step 5 — Combining All States in One Fetch Function
async function loadUsers(query = "") { 
  showState("loading"); 
  
  try { 
    const url = "https://jsonplaceholder.typicode.com/users" + 
      (query ? "?username=" + encodeURIComponent(query) : ""); 
    const response = await fetch(url); 
  
    if (!response.ok) { 
      throw new Error("HTTP status: " + response.status); 
    } 
  
    const data = await response.json(); 
  
    if (data.length === 0) { 
      showState("empty"); 
      return; 
    } 
  
    renderUsers(data); 
    showState("success"); 
  } catch (error) { 
   console.error("Failed to load data:", error); 
    showState("error"); 
  } 
}
document.querySelector("#btn-load-users").addEventListener("click", () => { 
  loadUsers(); 
}); 
  
document.querySelector("#search-username").addEventListener("input", (event) => { 
  loadUsers(event.target.value.trim()); 
});

// Step 6 — Simulating an Error
async function loadUsersBroken() {
 showState("loading");
 try {
 const response = await fetch("https://jsonplaceholder.typicode.com/no-such-user");
 if (!response.ok) {
 throw new Error("HTTP status: " + response.status);
 }
 const data = await response.json();
 renderUsers(data);
 showState("success");
 } catch (error) {
 console.error("Failed to load data:", error);
 showState("error");
 }
}
document.querySelector("#btn-simulate-error").addEventListener("click", () => {
 loadUsersBroken();
});

//Step 7

document.querySelector("#btn-cors-demo").addEventListener("click", async () => {
 showState("loading");
 try {
    const response = await fetch("https://www.google.com");
    const data = await response.text();
    console.log(data);
    showState("success");
 } catch (error) {
    console.error("Failed (likely CORS):", error);
    showState("error");
 }
 });