const API_BASE = "http://127.0.0.1:8000/api";

const loginScreen = document.getElementById("login-screen");
const dashboard = document.getElementById("dashboard");
const loginForm = document.getElementById("login-form");
const loginError = document.getElementById("login-error");

function getToken() {
  return localStorage.getItem("spendwise_token");
}

function setToken(token) {
  localStorage.setItem("spendwise_token", token);
}

function showDashboard() {
  loginScreen.style.display = "none";
  dashboard.style.display = "grid";
}

function showLogin() {
  loginScreen.style.display = "flex";
  dashboard.style.display = "none";
}

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  loginError.textContent = "";

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch(`${API_BASE}/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ username, password }),
    });

    if (!response.ok) {
      loginError.textContent = "Invalid username or password.";
      return;
    }

    const data = await response.json();
       setToken(data.token);
    showDashboard();
    loadExpenses();
  } catch (err) {
    loginError.textContent = "Could not reach the server.";
  }
});


const expenseList = document.getElementById("expense-list");
const expenseEmpty = document.getElementById("expense-empty");

async function loadExpenses() {
  try {
    const response = await fetch(`${API_BASE}/expenses/`, {
      headers: { Authorization: `Token ${getToken()}` },
    });

    if (response.status === 401) {
      // token invalid/expired — send back to login
      localStorage.removeItem("spendwise_token");
      showLogin();
      return;
    }

    const data = await response.json();
    renderExpenses(data.results);
  } catch (err) {
    console.error("Failed to load expenses:", err);
  }
}

function renderExpenses(expenses) {
  // clear out any existing cards (but keep the empty-state paragraph)
  expenseList.querySelectorAll(".card").forEach((card) => card.remove());

  if (expenses.length === 0) {
    expenseEmpty.style.display = "block";
    return;
  }

  expenseEmpty.style.display = "none";

  expenses.forEach((exp) => {
    const card = document.createElement("div");
    card.className = "card";
    card.tabIndex = 0;
    card.innerHTML = `
      <h2 class="card-title">${exp.category}</h2>
      <p class="card-amount">$${parseFloat(exp.amount).toFixed(2)}</p>
      <p class="card-meta">${exp.description}</p>
    `;
    expenseList.appendChild(card);
  });
}
// On page load, if we already have a token, skip straight to dashboard
if (getToken()) {
  showDashboard();
  loadExpenses();
} else {
  showLogin();
}
const addExpenseForm = document.getElementById("add-expense-form");

addExpenseForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const amount = document.getElementById("new-amount").value;
  const description = document.getElementById("new-description").value;
  const category = document.getElementById("new-category").value;

  try {
    const response = await fetch(`${API_BASE}/expenses/`, {
      method: "POST",
      headers: {
        Authorization: `Token ${getToken()}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ amount, description, category }),
    });

    if (!response.ok) {
      console.error("Failed to add expense");
      return;
    }

    addExpenseForm.reset();
    loadExpenses();
  } catch (err) {
    console.error("Error adding expense:", err);
  }
});
const logoutBtn = document.getElementById("logout-btn");

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("spendwise_token");
  showLogin();
});